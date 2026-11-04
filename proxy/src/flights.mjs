/* Flights: adsb.lol (primary) -> adsb.fi (fallback, 1 req/s) -> OpenSky (last resort). Normalised to the client's flight format. Pure/injectable. */
// adsb.lol's maximum radius is 250 nm (463 km), so a 0–45°N / 105–145°E box can't be covered gaplessly with free-plan request budgets (~50 circles).
// 10 circles cover the places that actually have aircraft: Taiwan + Strait + east coast (`core`, with adsb.fi fallback), Luzon / Philippines, the northern
// and southern South China Sea, Okinawa, Kyushu–Seto–Osaka, Tokyo–Nagoya and Hokkaido–Tohoku. ADS-B receivers are sparse over open ocean anyway.
export const ADSB_POINTS = [
  { lat: 25.3, lon: 121.0, core: true }, { lat: 22.6, lon: 120.8, core: true },
  { lat: 15.5, lon: 120.5 },   // Luzon / Manila
  { lat: 21.0, lon: 112.5 },   // Hong Kong / Pearl River Delta / Hainan / northern SCS
  { lat: 8.5, lon: 112.5 },    // southern SCS (sparse)
  { lat: 26.5, lon: 127.5 },   // Okinawa / Ryukyu
  { lat: 34.0, lon: 132.5 },   // Kyushu / Seto / Kansai
  { lat: 37.0, lon: 139.5 },   // Tokyo / Nagoya / Tohoku south
  { lat: 42.5, lon: 142.5 },   // Hokkaido / Tohoku north
];
export const ADSB_NM = 250;
export const FLIGHT_BOX = { lamin: 0, lomin: 105, lamax: 45, lomax: 145 }; // the one box the Worker serves (the client's query string is ignored: one cache key, no fan-out abuse)
export const CORE_BOX = { lamin: 18, lomin: 114, lamax: 29, lomax: 128 };    // the former Taiwan-focused box: always kept in full
export const MAX_FLIGHTS = 800;                                              // the client draws one mesh per aircraft; ~190 B each => ≲150 KB JSON (~30 KB gzip)
const KT_MS = 0.514444, FT_FPM = 1; // ft/min already

// ICAO 24-bit address blocks -> country (small table for the region; unknown -> "")
const BLOCKS = [
  [0x899000, 0x899FFF, "Taiwan"], [0x789000, 0x789FFF, "Hong Kong"], [0x780000, 0x7BFFFF, "China"], [0x840000, 0x87FFFF, "Japan"],
  [0x718000, 0x71FFFF, "South Korea"], [0x758000, 0x75FFFF, "Philippines"], [0x880000, 0x887FFF, "Thailand"], [0x888000, 0x88FFFF, "Vietnam"],
  [0x768000, 0x76FFFF, "Singapore"], [0x750000, 0x757FFF, "Malaysia"], [0x8A0000, 0x8A7FFF, "Indonesia"], [0x7C0000, 0x7FFFFF, "Australia"],
  [0xA00000, 0xAFFFFF, "United States"], [0x800000, 0x83FFFF, "India"], [0x400000, 0x43FFFF, "United Kingdom"], [0x3C0000, 0x3FFFFF, "Germany"],
  [0x380000, 0x3BFFFF, "France"], [0x480000, 0x487FFF, "Netherlands"], [0xC00000, 0xC3FFFF, "Canada"], [0x100000, 0x1FFFFF, "Russia"],
  [0x896000, 0x896FFF, "UAE"], [0x06A000, 0x06AFFF, "Qatar"], [0x4B8000, 0x4BFFFF, "Turkey"], [0x738000, 0x73FFFF, "Israel"], [0x710000, 0x717FFF, "Saudi Arabia"], [0x760000, 0x767FFF, "Pakistan"],
]; // first match wins (specific blocks before the enclosing ones)
export function hexCountry(hex) {
  const n = parseInt(String(hex || "").replace(/^~/, ""), 16);
  if (!isFinite(n)) return "";
  for (const [a, b, c] of BLOCKS) if (n >= a && n <= b) return c;
  return "";
}

/** "Suspected PLA aircraft" heuristic on one adsb.lol / adsb.fi object. Honest limits: most PLA aircraft never transmit ADS-B, and a
 *  transmitting one can carry any hex/callsign, so this is a LABEL FOR HUMANS ("疑似"), never an identification.
 *  - military flag: dbFlags bit 0 (adsb.lol/adsb.fi aircraft database says "military")
 *  - Chinese ICAO block 0x780000-0x7BFFFF (Hong Kong 0x789xxx and Taiwan 0x899xxx are carved out by hexCountry)
 *  - type designator typical of PLAAF/PLAN airframes (J-10/11/15/16/20/35, H-6, Y-8/9/20, KJ-xxx, JH-7, Z-8/9/10/18/20, WZ-, GJ-; Su-30/35 only together with a Chinese hex)
 *  - callsign pattern typical of PLA traffic (PLA…/CHN<digit>…); note CCA/CES/CSN… are civil airlines and never match.
 *  - hex in 0x7A1000-0x7A4FFF (see PLA_HEX_BLOCK): a block that is almost entirely military-registered airframes
 *  Flag when: (military ∧ China hex) ∨ (military ∧ PLA type) ∨ (China hex ∧ PLA type) ∨ (military-or-China-hex ∧ PLA callsign) ∨ hex in the PLA-prior block. Never from the generic Chinese hex range alone. */
const PLA_TYPE = /^(J-?(10|11|15|16|20|35)[A-Z]?|JH-?7[A-Z]?|H-?6[A-Z]?|TU-?16|Y-?(8|9|20)[A-Z]?|KJ-?\d{3,4}[A-Z]?|Z-?(8|9|10|18|19|20)[A-Z]?|WZ-?\d+|GJ-?\d+)$/i;
// ICAO type designators the tar1090 database uses for PLA airframes that are also common in civil/foreign fleets (Y-8/Y-9 = AN12, Il-76 incl. KJ-2000 / tankers, Mi-8/17, Z-9 = AS65 / AS35, ...):
// they only count together with a Chinese hex (TU16 = H-6 bomber is flown by nobody else; it is in PLA_TYPE).
const PLA_TYPE_CN = /^(AN12|IL76|MI8|MI17|MI171|AS65|AS35|MI38)$/i;
/** Hex block 0x7A1000-0x7A4FFF: in the tar1090-db snapshot used for this check (aircraft.csv, 2026-11) 375 of its 383 entries are military-flagged (Y-20, WZ-10, Mi-8, AS365, An-12/Y-8, Tu-16/H-6, Il-76...),
 *  against 68 of ~7,200 elsewhere in 0x780000-0x7BFFFF. A weak PRIOR that the airframe is PLA, not an identification. */
export const PLA_HEX_BLOCK = [0x7A1000, 0x7A4FFF];
export const inPlaBlock = (hex) => { const n = parseInt(String(hex || "").replace(/^~/, ""), 16); return isFinite(n) && n >= PLA_HEX_BLOCK[0] && n <= PLA_HEX_BLOCK[1]; };
const PLA_CALL = /^(PLA[A-Z]*\d*|PLAAF\d*|PLAN\d*|CHN\d+[A-Z]*)$/i;
export function plaSuspect(a) {
  if (!a || typeof a.hex !== "string") return null;
  const hex = a.hex.replace(/^~/, "").toLowerCase();
  const mil = (Number(a.dbFlags) & 1) === 1, cn = hexCountry(hex) === "China";
  const t = typeof a.t === "string" ? a.t.trim() : "", cs = typeof a.flight === "string" ? a.flight.trim() : "";
  const typ = PLA_TYPE.test(t) || (cn && (/^SU3[05]$/i.test(t) || PLA_TYPE_CN.test(t))), call = PLA_CALL.test(cs), blk = inPlaBlock(hex);
  const why = [];
  if (mil) why.push("mil");
  if (cn) why.push("cn-hex");
  if (typ) why.push("type");
  if (call) why.push("callsign");
  if (blk) why.push("pla-block");
  const hit = (mil && cn) || (mil && typ) || (cn && typ) || ((mil || cn) && call) || blk;
  return hit ? why : null;
}

const numOrNull = (v) => (typeof v === "number" && isFinite(v) ? v : null);

/** One adsb.lol / adsb.fi aircraft object -> client flight (or null: no position / on the ground). */
export function normalizeAdsb(a) {
  if (!a || typeof a.hex !== "string") return null;
  const lat = numOrNull(a.lat), lon = numOrNull(a.lon);
  if (lat == null || lon == null || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  if (a.alt_baro === "ground") return null;
  const hex = a.hex.replace(/^~/, "").toLowerCase();
  const alt = numOrNull(a.alt_baro) != null ? a.alt_baro : numOrNull(a.alt_geom);
  const gs = numOrNull(a.gs), vr = numOrNull(a.baro_rate) != null ? a.baro_rate : numOrNull(a.geom_rate);
  const trk = numOrNull(a.track) != null ? a.track : numOrNull(a.true_heading) != null ? a.true_heading : numOrNull(a.mag_heading);
  const cs = typeof a.flight === "string" ? a.flight.trim() : "";
  const pla = plaSuspect(a);
  return {
    id: hex, callsign: cs || (a.r ? String(a.r).trim() : "") || hex.toUpperCase(), country: hexCountry(hex),
    lat, lon, altFt: alt != null ? Math.round(alt) : null, speedKt: gs != null ? Math.round(gs) : null, vMs: gs != null ? gs * KT_MS : 0,
    hdg: trk != null ? trk : 0, vrFpm: vr != null ? Math.round(vr * FT_FPM) : null,
    reg: a.r ? String(a.r).trim() : undefined, type: a.t ? String(a.t).trim() : undefined,
    ...(pla ? { pla: true, plaWhy: pla } : {}),
  };
}

/** OpenSky /states/all JSON -> client flights (same mapping the client used to do itself). */
export function normalizeOpenSky(json) {
  const out = [];
  for (const s of (json && json.states) || []) {
    const lon = s[5], lat = s[6];
    if (lon == null || lat == null || s[8]) continue;
    const alt = s[13] != null ? s[13] : s[7];
    out.push({ id: s[0], callsign: (s[1] || "").trim() || String(s[0]).toUpperCase(), country: s[2] || "", lat, lon,
      altFt: alt != null ? Math.round(alt * 3.28084) : null, speedKt: s[9] != null ? Math.round(s[9] * 1.94384) : null, vMs: s[9] || 0,
      hdg: s[10] != null ? s[10] : 0, vrFpm: s[11] != null ? Math.round(s[11] * 196.85) : null });
  }
  return out;
}

export function dedupeByHex(lists) {
  const m = new Map();
  for (const l of lists) for (const f of l) { const prev = m.get(f.id); if (!prev) m.set(f.id, f); }
  return [...m.values()];
}

/** Cap the payload: suspected-PLA aircraft first, then everything inside the Taiwan core box, then the rest of the region by altitude (cruising traffic is stable
 *  between polls, so the picture doesn't flicker), ties by hex. */
export function thinFlights(list, max = MAX_FLIGHTS, core = CORE_BOX) {
  if (list.length <= max) return list;
  const rank = (f) => (f.pla ? 0 : inBox(f, core) ? 1 : 2);
  return list.slice().sort((a, b) => rank(a) - rank(b) || (rank(a) === 2 ? (b.altFt || 0) - (a.altFt || 0) : 0) || (a.id < b.id ? -1 : 1)).slice(0, max);
}

const inBox = (f, b) => f.lat >= b.lamin && f.lat <= b.lamax && f.lon >= b.lomin && f.lon <= b.lomax;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastFiAt = 0; // adsb.fi allows 1 request / second: serialise within an isolate
async function fiThrottle() { const wait = lastFiAt + 1100 - Date.now(); lastFiAt = Date.now() + Math.max(0, wait); if (wait > 0) await sleep(wait); }

async function getJson(fetchFn, url, ms = 8000, init = {}) {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetchFn(url, { signal: ctl.signal, headers: { Accept: "application/json", "User-Agent": "gods-eye-view/1.0 (+https://numenaslan-cell.github.io/gods-eye-mobile/)" }, ...init });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.json();
  } finally { clearTimeout(t); }
}

/**
 * Collect flights. opts: { fetch, box, max, openskyBase, lolBase, fiBase, now }.
 * Each circle (ADSB_POINTS) is fetched from adsb.lol in parallel; a failed `core` circle is retried on adsb.fi; if no circle yields data at all, OpenSky is used.
 * Runs inside the Hub Durable Object (30 s CPU budget), never in the 10 ms front Worker.
 */
export async function collectFlights(opts = {}) {
  const f = opts.fetch || fetch, box = opts.box || FLIGHT_BOX;
  const lol = opts.lolBase || "https://api.adsb.lol", fi = opts.fiBase || "https://opendata.adsb.fi";
  const used = new Set(), errors = [], lists = [];
  const lolRes = await Promise.all(ADSB_POINTS.map((p) =>
    getJson(f, `${lol}/v2/point/${p.lat}/${p.lon}/${ADSB_NM}`).then((j) => ({ p, ac: Array.isArray(j.ac) ? j.ac : [] })).catch((e) => ({ p, err: "adsb.lol " + (e.message || e) }))));
  for (const r of lolRes) {
    if (r.err) { errors.push(r.err); continue; }
    used.add("adsb.lol"); lists.push(r.ac.map(normalizeAdsb).filter(Boolean));
  }
  for (const r of lolRes) {
    if (!r.err || !r.p.core) continue; // adsb.fi (1 req/s) only backs up the Taiwan core circles
    await fiThrottle();
    try {
      const j = await getJson(f, `${fi}/api/v2/lat/${r.p.lat}/lon/${r.p.lon}/dist/${ADSB_NM}`);
      used.add("adsb.fi"); lists.push((Array.isArray(j.aircraft) ? j.aircraft : Array.isArray(j.ac) ? j.ac : []).map(normalizeAdsb).filter(Boolean));
    } catch (e) { errors.push("adsb.fi " + (e.message || e)); }
  }
  let flights = dedupeByHex(lists).filter((x) => inBox(x, box));
  if (!lists.length) { // last resort: OpenSky, Taiwan core box only (anonymous credits: area-based)
    try {
      const q = `lamin=${CORE_BOX.lamin}&lomin=${CORE_BOX.lomin}&lamax=${CORE_BOX.lamax}&lomax=${CORE_BOX.lomax}`;
      const j = await getJson(f, (opts.openskyBase || "https://opensky-network.org/api") + "/states/all?" + q, 10000);
      used.add("opensky"); flights = normalizeOpenSky(j);
    } catch (e) { errors.push("opensky " + (e.message || e)); }
  }
  if (!used.size) { const e = new Error("all flight sources failed: " + errors.join("; ")); e.errors = errors; throw e; }
  const total = flights.length; flights = thinFlights(flights, opts.max || MAX_FLIGHTS);
  return { source: [...used].join("+"), partial: errors.length > 0 && used.size > 0 ? errors : undefined, time: (opts.now || Date.now)(), count: flights.length, total, flights };
}

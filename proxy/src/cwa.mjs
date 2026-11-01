/* Taiwan Central Weather Administration (CWA, 交通部中央氣象署) open data: earthquakes, typhoons, warnings.
 * Needs the user's OWN free API key (https://opendata.cwa.gov.tw/ -> member -> API authorization), stored as Worker secret CWA_API_KEY.
 * Without it every function here is inert and the site falls back to USGS. The public "CWA-…" demo key must NOT be used in the product.
 * Licence: Open Government Data License v1.0 (attribution: 資料來源：交通部中央氣象署). */
export const CWA_BASE = "https://opendata.cwa.gov.tw/api/v1/rest/datastore";
export const WARNING_PHENOMENA = /颱風|豪雨|大雨|強風|濃霧|低溫|高溫|海嘯|地震|海上|陸上|大浪|長浪/;

const ms = (t) => { const x = Date.parse(t); return isFinite(x) ? x : null; };
const num = (v) => { const x = typeof v === "string" ? parseFloat(v) : v; return typeof x === "number" && isFinite(x) ? x : null; };

/** One E-A0015-001 / E-A0016-001 "Earthquake" record -> app quake. */
export function normalizeCwaQuake(e, kind) {
  const info = e && e.EarthquakeInfo, epi = info && info.Epicenter, mg = info && info.EarthquakeMagnitude;
  if (!info || !epi) return null;
  const t = ms(info.OriginTime), lat = num(epi.EpicenterLatitude), lon = num(epi.EpicenterLongitude), mag = mg ? num(mg.MagnitudeValue) : null;
  if (t == null || lat == null || lon == null || mag == null) return null;
  const areas = (e.Intensity && e.Intensity.ShakingArea) || [];
  const lvl = (a) => { const m = /^(\d)(弱|強)?級?/.exec(String((a && a.AreaIntensity) || "")); return m ? (+m[1]) * 2 + (m[2] === "弱" ? -1 : m[2] === "強" ? 1 : 0) : -1; };
  let best = null; for (const a of areas) if (!best || lvl(a) > lvl(best)) best = a;
  return {
    id: "cwa" + t, mag, depthKm: num(info.FocalDepth) != null ? num(info.FocalDepth) : 0, lat, lon, t,
    place: String(epi.Location || "Taiwan region").replace(/\s+/g, " ").trim(), url: e.Web || "", src: "CWA", kind,
    magType: mg.MagnitudeType || "", report: e.ReportContent || "", intensity: best ? (best.CountyName || best.AreaDesc || "") + " " + best.AreaIntensity : "",
    image: e.ReportImageURI || "",
  };
}
export function normalizeCwaQuakes(json, kind) {
  const list = (json && json.records && (json.records.Earthquake || json.records.earthquake)) || [];
  return list.map((e) => normalizeCwaQuake(e, kind)).filter(Boolean);
}
export function mergeQuakes(...lists) { // dedupe by id, newest first
  const m = new Map(); for (const l of lists) for (const q of l) if (!m.has(q.id)) m.set(q.id, q);
  return [...m.values()].sort((a, b) => b.t - a.t);
}

/** W-C0034-005 tropical cyclones. coordinate is "lon,lat". */
export function normalizeTyphoons(json) {
  const arr = (json && json.records && json.records.tropicalCyclones && json.records.tropicalCyclones.tropicalCyclone) || [];
  const co = (c) => { const p = String(c || "").split(",").map(parseFloat); return isFinite(p[0]) && isFinite(p[1]) ? { lon: p[0], lat: p[1] } : null; };
  const pickPred = (mp) => { const a = Array.isArray(mp) ? mp : []; const z = a.find((x) => x && /zh/i.test(x.lang || "")) || a[0]; return z && z.value ? String(z.value) : ""; };
  return (Array.isArray(arr) ? arr : [arr]).map((c) => {
    const fixes = (c.analysisData && c.analysisData.fix) || [], fx = Array.isArray(fixes) ? fixes : [fixes];
    const track = fx.map((f) => { const p = co(f.coordinate); return p && { t: ms(f.fixTime), lat: p.lat, lon: p.lon }; }).filter(Boolean).slice(-40);
    const last = fx[fx.length - 1] || {}, lp = co(last.coordinate);
    const fcRaw = (c.forecastData && c.forecastData.forecast) || (c.forecastData && c.forecastData.fix) || [], fc = Array.isArray(fcRaw) ? fcRaw : [fcRaw];
    const forecast = fc.map((f) => { const p = co(f.coordinate); return p && { hour: num(f.tau != null ? f.tau : f.forecastHour), lat: p.lat, lon: p.lon, maxWind: num(f.maxWindSpeed), pressure: num(f.pressure), probRadius: f.radiusOf70PercentProbability != null ? num(f.radiusOf70PercentProbability) : null }; }).filter(Boolean);
    return {
      name: c.typhoonName || "", cwaName: c.cwaTyphoonName || "", year: c.year || "", tyNo: c.cwaTyNo || "", tdNo: c.cwaTdNo || "",
      time: ms(last.fixTime), lat: lp ? lp.lat : null, lon: lp ? lp.lon : null, maxWind: num(last.maxWindSpeed), gust: num(last.maxGustSpeed), pressure: num(last.pressure),
      speedKmh: num(last.movingSpeed), direction: last.movingDirection || "", movement: pickPred(last.movingPrediction),
      r15: last.circleOf15Ms ? num(last.circleOf15Ms.radius) : null, r25: last.circleOf25Ms ? num(last.circleOf25Ms.radius) : null,
      track, forecast,
    };
  }).filter((t) => t.lat != null);
}

/** W-C0033-001 warnings by county. */
export function normalizeWarnings(json, now = Date.now()) {
  const locs = (json && json.records && (json.records.location || json.records.Location)) || [];
  const out = [];
  for (const l of Array.isArray(locs) ? locs : [locs]) {
    const hz = (l.hazardConditions && l.hazardConditions.hazards) || [];
    for (const h of Array.isArray(hz) ? hz : [hz]) {
      const info = h.info || {}, vt = h.validTime || {}, end = ms(vt.endTime);
      if (!info.phenomena || (end != null && end < now)) continue;
      out.push({ location: l.locationName || "", phenomena: info.phenomena, significance: info.significance || "", start: ms(vt.startTime), end });
    }
  }
  return out;
}
export function groupWarnings(list) { // one row per phenomenon+significance with the counties it covers
  const m = new Map();
  for (const w of list) { const k = w.phenomena + "|" + w.significance; const g = m.get(k) || { phenomena: w.phenomena, significance: w.significance, end: w.end, locations: [] }; if (!g.locations.includes(w.location)) g.locations.push(w.location); if (w.end && (!g.end || w.end > g.end)) g.end = w.end; m.set(k, g); }
  return [...m.values()];
}

const CWA_DATASETS = { quakeFelt: "E-A0015-001", quakeLocal: "E-A0016-001", typhoon: "W-C0034-005", warnings: "W-C0033-001" };
const redact = (msg, key) => String(msg || "").split(key || "\u0000").join("***").replace(/Authorization=[^&\s]+/gi, "Authorization=***");

async function cwaGet(env, dataset, f) {
  const base = env.CWA_URL || CWA_BASE; // CWA_URL: test-only override
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await f(`${base}/${dataset}?Authorization=${encodeURIComponent(env.CWA_API_KEY)}&format=JSON`, { signal: ctl.signal, headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error(dataset + " HTTP " + r.status);
    const j = await r.json();
    if (j && j.success === "false") throw new Error(dataset + " rejected");
    return j;
  } catch (e) { throw new Error(redact((e && e.message) || e, env.CWA_API_KEY)); }
  finally { clearTimeout(t); }
}

/** kind: "quakes" | "typhoon" | "warnings".  Inert (enabled:false -> client uses USGS) when the CWA_API_KEY secret is absent. */
export async function cwaData(env, kind, f = fetch) {
  if (!env.CWA_API_KEY) return { enabled: false, source: "usgs", reason: "CWA_API_KEY not configured", attribution: "USGS" };
  const base = { enabled: true, source: "cwa", attribution: "資料來源：交通部中央氣象署 (CWA Open Data)", time: Date.now() };
  if (kind === "quakes") {
    const [a, b] = await Promise.allSettled([cwaGet(env, CWA_DATASETS.quakeFelt, f), cwaGet(env, CWA_DATASETS.quakeLocal, f)]);
    if (a.status === "rejected" && b.status === "rejected") throw new Error(a.reason.message);
    return { ...base, quakes: mergeQuakes(a.status === "fulfilled" ? normalizeCwaQuakes(a.value, "significant") : [], b.status === "fulfilled" ? normalizeCwaQuakes(b.value, "local") : []), partial: a.status === "rejected" || b.status === "rejected" || undefined };
  }
  if (kind === "typhoon") return { ...base, typhoons: normalizeTyphoons(await cwaGet(env, CWA_DATASETS.typhoon, f)) };
  if (kind === "warnings") { const w = normalizeWarnings(await cwaGet(env, CWA_DATASETS.warnings, f)); return { ...base, warnings: groupWarnings(w) }; }
  throw new Error("unknown kind");
}

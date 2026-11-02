/* AIS helpers: merge aisstream.io messages into a per-MMSI map; China Coast Guard heuristic. Pure functions. */
// Taiwan and neighbouring waters. aisstream's terrestrial coverage right around Taiwan is almost empty (measured: 1 vessel / 2 min inside 20–27.5N 118–124.5E),
// while Hong Kong / S. China and Japan are well covered, so the box reaches out to include them.
export const AIS_BBOX = { lamin: 18.0, lomin: 108.0, lamax: 34.0, lomax: 132.0 };
export const AIS_TYPES = ["PositionReport", "StandardClassBPositionReport", "ExtendedClassBPositionReport", "ShipStaticData", "StaticDataReport"];

const num = (v) => (typeof v === "number" && isFinite(v) ? v : null);
const clean = (s) => (typeof s === "string" ? s.replace(/@+/g, " ").trim().replace(/\s+/g, " ") : "");

export function applyAis(map, msg, now) {
  const mt = msg && msg.MessageType, md = (msg && msg.MetaData) || {}, body = msg && msg.Message && msg.Message[mt];
  if (!mt || !body) return false;
  const mmsi = String(md.MMSI != null ? md.MMSI : body.UserID != null ? body.UserID : "");
  if (!/^\d{9}$/.test(mmsi)) return false;
  const s = map[mmsi] || (map[mmsi] = { mmsi });
  const nm = clean(md.ShipName); if (nm) s.name = nm;
  if (mt === "PositionReport" || mt === "StandardClassBPositionReport" || mt === "ExtendedClassBPositionReport") {
    const lat = num(body.Latitude != null ? body.Latitude : md.latitude != null ? md.latitude : md.Latitude);
    const lon = num(body.Longitude != null ? body.Longitude : md.longitude != null ? md.longitude : md.Longitude);
    if (lat == null || lon == null || Math.abs(lat) > 90 || Math.abs(lon) > 180 || (lat === 91 || lon === 181)) { return false; }
    s.lat = lat; s.lon = lon; s.t = now; s.src = s.src === "mpb" || s.src === "both" ? "both" : "ais";
    const sog = num(body.Sog); s.sog = sog != null && sog < 102.3 ? sog : null;      // 102.3 = not available
    const cog = num(body.Cog); s.cog = cog != null && cog < 360 ? cog : null;        // 360 = not available
    const hdg = num(body.TrueHeading); s.hdg = hdg != null && hdg < 360 ? hdg : null; // 511 = not available
    const nav = num(body.NavigationalStatus); if (nav != null) s.nav = nav;
    if (mt === "ExtendedClassBPositionReport") { const t = num(body.Type); if (t) s.type = t; const n2 = clean(body.Name); if (n2) s.name = n2; }
  } else if (mt === "ShipStaticData") {
    const t = num(body.Type); if (t) s.type = t;
    const n2 = clean(body.Name); if (n2) s.name = n2;
    const d = clean(body.Destination); if (d) s.dest = d.slice(0, 24);
  } else if (mt === "StaticDataReport") {
    const a = body.ReportA, b = body.ReportB;
    if (a) { const n2 = clean(a.Name); if (n2) s.name = n2; }
    if (b) { const t = num(b.ShipType); if (t) s.type = t; }
  }
  return true;
}

export const MAX_SHIPS_PUBLIC = 2500; // the client draws one mesh per ship: cap the payload, keep the interesting vessels first
export const MAX_SHIPS_STORED = 4000;

/** Lower = more interesting. CCG first, then commercial / special-purpose ships, then unknown, then fishing boats (moving before stationary). */
export function shipRank(s) {
  if (isCcg(s) || isPlan(s)) return 0;
  const t = s.type || 0, moving = s.sog != null && s.sog > 0.5;
  if (t === 30 || t === 0) return moving ? 3 : 4; // fishing / type unknown (mostly small boats)
  return 1 + (moving ? 0 : 0.5);
}

export function publicShips(map, now, keepMs, cap = MAX_SHIPS_PUBLIC) {
  const out = [];
  for (const s of Object.values(map)) {
    if (s.lat == null || !s.t || now - s.t > keepMs) continue;
    out.push({ mmsi: s.mmsi, name: s.name || null, lat: s.lat, lon: s.lon, sog: s.sog != null ? s.sog : null, cog: s.cog != null ? s.cog : null, hdg: s.hdg != null ? s.hdg : null, type: s.type || null, dest: s.dest || null, nav: s.nav != null ? s.nav : null, ageSec: Math.round((now - s.t) / 1000), ccg: isCcg(s), plan: isPlan(s), src: s.src || "ais", _r: shipRank(s) });
  }
  out.sort((a, b) => a._r - b._r || a.ageSec - b.ageSec);
  const list = out.slice(0, cap); for (const o of list) delete o._r;
  list.total = out.length;
  return list;
}

/** Keep the map small enough for one Durable Object value (< 2 MB): drop the least interesting / oldest vessels beyond `max`. */
export function trimShips(map, max = MAX_SHIPS_STORED) {
  const keys = Object.keys(map); if (keys.length <= max) return 0;
  keys.sort((a, b) => shipRank(map[a]) - shipRank(map[b]) || (map[b].t || 0) - (map[a].t || 0));
  for (const k of keys.slice(max)) delete map[k];
  return keys.length - max;
}

/* ---- MPB Taiwan AIS (交通部航港局 mpbais.motcmpb.gov.tw, undocumented GeoJSON) ---- */
export const MPB_BBOX = { lamin: 19.0, lomin: 116.0, lamax: 28.0, lomax: 126.0 };
// "2026/11/01 17:39:04" is Taipei local time (UTC+8)
export function parseMpbTime(str) {
  const m = /^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(String(str || "").trim());
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4] - 8, +m[5], +m[6]) : null;
}
/** GeoJSON feature -> compact ship record (or null when outside the box / invalid). Only the fields the app needs. */
export function normalizeMpb(f, box = MPB_BBOX) {
  const p = f && f.properties; if (!p) return null;
  const mmsi = String(p.MMSI || "").trim(); if (!/^\d{9}$/.test(mmsi)) return null;
  const lat = num(p.Latitude != null ? p.Latitude : f.geometry && f.geometry.coordinates && f.geometry.coordinates[1]);
  const lon = num(p.Longitude != null ? p.Longitude : f.geometry && f.geometry.coordinates && f.geometry.coordinates[0]);
  if (lat == null || lon == null || lat < box.lamin || lat > box.lamax || lon < box.lomin || lon > box.lomax) return null;
  const t = parseMpbTime(p.Record_Time); if (t == null) return null;
  const sog = num(p.SOG), cog = num(p.COG), nav = num(parseInt(p.Navigational_Status, 10)), type = num(p.Ship_and_Cargo_Type);
  const imo = String(p.IMO_Number || "").trim();
  const r = { mmsi, lat, lon, t, sog: sog != null && sog < 102.3 ? sog : null, cog: cog != null && cog < 360 ? cog : null, nav: nav != null && nav !== 15 ? nav : null, type: type || null };
  const name = clean(p.ShipName); if (name) r.name = name;
  if (/^\d{7}$/.test(imo) && imo !== "0000000") r.imo = imo;
  return r;
}
/** Merge one normalised MPB record into the per-MMSI map. aisstream data newer than the MPB record wins for position; static fields are filled from either. */
export function applyMpb(map, r, now) {
  if (!r || !/^\d{9}$/.test(String(r.mmsi))) return false;
  const lat = num(r.lat), lon = num(r.lon); let t = num(r.t);
  if (lat == null || lon == null || Math.abs(lat) > 90 || Math.abs(lon) > 180 || t == null) return false;
  if (t > now) t = now;
  const s = map[r.mmsi] || (map[r.mmsi] = { mmsi: String(r.mmsi) });
  const had = s.src === "ais" || s.src === "both";
  if (!s.t || t >= s.t || s.lat == null) { // MPB record is at least as fresh (or the only one)
    s.lat = lat; s.lon = lon; s.t = t;
    const sog = num(r.sog), cog = num(r.cog), nav = num(r.nav);
    s.sog = sog != null ? sog : null; s.cog = cog != null ? cog : null; if (nav != null) s.nav = nav;
  }
  const nm = clean(r.name); if (nm && !s.name) s.name = nm.slice(0, 40);
  const ty = num(r.type); if (ty && !s.type) s.type = ty;
  if (r.imo && /^\d{7}$/.test(String(r.imo))) s.imo = String(r.imo);
  s.src = had ? "both" : "mpb"; s.mpbAt = t;
  return true;
}

/**
 * Heuristic only (AIS has no "coast guard" flag): name looks like a China Coast Guard hull
 * (HAIJING / HAI JING / ZHONGGUO HAIJIAN / COAST GUARD / CCG nnnn / 海警), or law-enforcement type 55 under a Chinese MMSI prefix (412/413/414).
 * Ship_and_Cargo_Type 30 (fishing) never matches on the MMSI prefix alone, nor do HAIXUN (maritime-safety patrol) names — names like HAIJING still match whatever the type.
 */
export function isCcg(s) {
  const name = (s.name || "").toUpperCase();
  if (/(^|[^A-Z])(HAI ?JING|ZHONGGUO ?HAI ?(JING|JIAN)|CHINA ?COAST ?GUARD|CHINA ?COASTGUARD|CCG ?\d{3,5})([^A-Z]|$)/.test(name)) return true; // name matches always count
  if (/海警|海警局/.test(s.name || "")) return true;
  // MMSI-prefix-only match: law-enforcement type 55 under a Chinese MMSI prefix. Fishing boats (type 30) are explicitly excluded.
  if (s.type === 30) return false;
  if (/HAI ?XUN|海巡|海事/i.test(s.name || "")) return false; // HAIXUN = China Maritime Safety Administration patrol ships (also type 55), not the coast guard
  return s.type === 55 && /^41[234]/.test(s.mmsi || "");
}

/** Suspected PLA Navy vessel (heuristic, label for humans — "疑似共軍"). Matches:
 *  - names: HAIJUN / HAI JUN, 海軍 / 海军, 解放軍, "PLA NAVY", or "PLAN" followed by a hull number (e.g. "PLAN 989") — a bare word "PLAN" (yachts, "PLAN B") does not count;
 *  - MMSI prefix 412/413 together with AIS ship type 35 (military operations).
 *  Never a fishing-only match (type 30 is excluded from the MMSI path), and anything already flagged as China Coast Guard is not also PLAN. */
export function isPlan(s) {
  if (isCcg(s)) return false;
  const raw = s.name || "", name = raw.toUpperCase();
  if (/(^|[^A-Z])(HAI ?JUN|PLA ?NAVY|PLAN[ -]?\d{2,4})([^A-Z]|$)/.test(name)) return true;
  if (/海軍|海军|解放軍|解放军/.test(raw)) return true;
  if (s.type === 30) return false;
  return s.type === 35 && /^41[23]/.test(s.mmsi || "");
}

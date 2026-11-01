/* AIS helpers: merge aisstream.io messages into a per-MMSI map; China Coast Guard heuristic. Pure functions. */
export const AIS_BBOX = { lamin: 20.0, lomin: 118.0, lamax: 27.5, lomax: 124.5 };
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
    s.lat = lat; s.lon = lon; s.t = now;
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

export function publicShips(map, now, keepMs) {
  const out = [];
  for (const s of Object.values(map)) {
    if (s.lat == null || !s.t || now - s.t > keepMs) continue;
    out.push({ mmsi: s.mmsi, name: s.name || null, lat: s.lat, lon: s.lon, sog: s.sog != null ? s.sog : null, cog: s.cog != null ? s.cog : null, hdg: s.hdg != null ? s.hdg : null, type: s.type || null, dest: s.dest || null, nav: s.nav != null ? s.nav : null, ageSec: Math.round((now - s.t) / 1000), ccg: isCcg(s) });
  }
  out.sort((a, b) => a.ageSec - b.ageSec);
  return out.slice(0, 1500);
}

/**
 * Heuristic only (AIS has no "coast guard" flag): name looks like a China Coast Guard hull
 * (HAIJING / HAI JING / COAST GUARD / CCG nnnn), or law-enforcement type 55 under a Chinese MMSI prefix (412/413/414).
 */
export function isCcg(s) {
  const name = (s.name || "").toUpperCase();
  if (/(^|[^A-Z])(HAI ?JING|ZHONGGUO ?HAIJING|CHINA ?COAST ?GUARD|CHINA ?COASTGUARD|CCG ?\d{3,5})([^A-Z]|$)/.test(name)) return true;
  if (/海警/.test(s.name || "")) return true;
  return s.type === 55 && /^41[234]/.test(s.mmsi || "");
}

/**
 * Multi-source earthquake feed (pure functions).
 *   CWA (交通部中央氣象署, key, authoritative) > USGS > EMSC > GFZ GEOFON.
 * The three international feeds need no key, are CORS/egress-friendly from Cloudflare and answer in ~1–2 s; CWA's open-data API answers from Cloudflare too
 * (tested 2026-11-03: HTTP 401 JSON for a bad key from a plain AND a Taiwan-placed Worker, i.e. no WAF block at the network level).
 *   USGS   https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson          public domain (US gov)
 *   EMSC   https://www.seismicportal.eu/fdsnws/event/1/query?format=json            CC BY 4.0 — "Credit: EMSC-CSEM SeismicPortal" (no mirroring / bulk copying)
 *   GFZ    https://geofon.gfz-potsdam.de/fdsnws/event/1/query?format=text           CC BY 4.0 — GEOFON program of GFZ Helmholtz Centre
 * JMA (www.jma.go.jp/bosai/quake/data/list.json) and P2PQuake only carry Japan-domestic quakes (no Taiwan entry in 192 / 100 recent records) -> not used.
 */
export const QUAKE_REGION = { lamin: 20, lomin: 118, lamax: 27.5, lomax: 124.5 };
export const SRC_PRIORITY = ["CWA", "USGS", "EMSC", "GFZ"];
const num = (v) => { const x = typeof v === "string" ? parseFloat(v) : v; return typeof x === "number" && isFinite(x) ? x : null; };
export const inRegion = (q, b = QUAKE_REGION) => q.lat >= b.lamin && q.lat <= b.lamax && q.lon >= b.lomin && q.lon <= b.lomax;

export function quakeUrls(now, days = 3, b = QUAKE_REGION) {
  const st = new Date(now - days * 86400000).toISOString().slice(0, 19);
  return {
    USGS: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=100&minlatitude=${b.lamin}&maxlatitude=${b.lamax}&minlongitude=${b.lomin}&maxlongitude=${b.lomax}&starttime=${st}`,
    EMSC: `https://www.seismicportal.eu/fdsnws/event/1/query?format=json&orderby=time&limit=100&minlat=${b.lamin}&maxlat=${b.lamax}&minlon=${b.lomin}&maxlon=${b.lomax}&start=${st}`,
    GFZ: `https://geofon.gfz-potsdam.de/fdsnws/event/1/query?format=text&orderby=time&limit=100&minlatitude=${b.lamin}&maxlatitude=${b.lamax}&minlongitude=${b.lomin}&maxlongitude=${b.lomax}&starttime=${st}`,
  };
}

export function parseUsgs(json) {
  const out = [];
  for (const f of (json && json.features) || []) {
    const c = f.geometry && f.geometry.coordinates, p = f.properties || {};
    if (!c || p.mag == null || p.time == null || !f.id) continue;
    out.push({ id: "usgs:" + f.id, src: "USGS", t: p.time, lat: c[1], lon: c[0], depthKm: c[2] != null ? c[2] : 0, mag: p.mag, magType: p.magType || "", place: p.place || "Taiwan region", url: p.url || "" });
  }
  return out;
}
export function parseEmsc(json) {
  const out = [];
  for (const f of (json && json.features) || []) {
    const p = f.properties || {}, t = Date.parse(p.time), lat = num(p.lat), lon = num(p.lon), mag = num(p.mag);
    if (!isFinite(t) || lat == null || lon == null || mag == null) continue;
    const region = String(p.flynn_region || "Taiwan region").toLowerCase().replace(/\b[a-z]/g, (m) => m.toUpperCase());
    out.push({ id: "emsc:" + (p.unid || f.id), src: "EMSC", t, lat, lon, depthKm: num(p.depth) != null ? num(p.depth) : 0, mag, magType: p.magtype || "", place: region, url: p.unid ? "https://www.seismicportal.eu/eventdetails.html?unid=" + encodeURIComponent(p.unid) : "https://www.seismicportal.eu" });
  }
  return out;
}
/** GFZ FDSN text: #EventID|Time|Latitude|Longitude|Depth/km|Author|Catalog|Contributor|ContributorID|MagType|Magnitude|MagAuthor|EventLocationName|EventType */
export function parseGfz(text) {
  const out = [];
  for (const line of String(text || "").split(/\r?\n/)) {
    if (!line || line[0] === "#") continue;
    const c = line.split("|"); if (c.length < 13) continue;
    const t = Date.parse(c[1].endsWith("Z") ? c[1] : c[1] + "Z"), lat = num(c[2]), lon = num(c[3]), mag = num(c[10]);
    if (!isFinite(t) || lat == null || lon == null || mag == null || (c[13] && !/earthquake/i.test(c[13]))) continue;
    out.push({ id: "gfz:" + c[0], src: "GFZ", t, lat, lon, depthKm: num(c[4]) != null ? num(c[4]) : 0, mag: Math.round(mag * 10) / 10, magType: c[9] || "", place: c[12] || "Taiwan region", url: "https://geofon.gfz.de/eqinfo/event.php?id=" + encodeURIComponent(c[0]) });
  }
  return out;
}

/** Same physical event? Agencies differ by a few seconds and a few tens of km. */
export function sameEvent(a, b) { return Math.abs(a.t - b.t) <= 150000 && Math.abs(a.lat - b.lat) <= 1.5 && Math.abs(a.lon - b.lon) <= 1.5; }

/** lists: { CWA:[…], USGS:[…], EMSC:[…], GFZ:[…] } (any may be missing). CWA wins every field it has; the other agencies are kept as `srcs` + `others` (their own magnitudes). Newest first. */
export function mergeQuakeSources(lists, opts = {}) {
  const now = opts.now || Date.now(), keepMs = (opts.days || 7) * 86400000, out = [];
  for (const src of SRC_PRIORITY) {
    for (const q of lists[src] || []) {
      if (now - q.t > keepMs || q.t > now + 600000) continue;
      const hit = out.find((m) => sameEvent(m, q));
      if (hit) { if (!hit.srcs.includes(src)) { hit.srcs.push(src); hit.others.push({ src, mag: q.mag, id: q.id }); } continue; }
      out.push({ ...q, src: q.src || src, srcs: [src], others: [] });
    }
  }
  return out.sort((a, b) => b.t - a.t);
}

/** Quakes worth a push: M>=4.5 in the Taiwan region, < 6 h old, and not matching (sameEvent) any fingerprint already alerted — whichever agency reported first. */
export function pickAlertQuakes(merged, seen, now, box = QUAKE_REGION) {
  return merged.filter((q) => q.mag >= 4.5 && now - q.t <= 6 * 3600000 && inRegion(q, box) && !seen.some((s) => sameEvent(s, q))).sort((a, b) => a.t - b.t);
}
export const fingerprint = (q) => ({ t: q.t, lat: q.lat, lon: q.lon });

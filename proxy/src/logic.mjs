/* Pure helpers shared by the Worker and its tests. */
import { b64uDecode } from "./webpush.mjs";
const PUSH_HOST_RE = /(^|\.)(fcm\.googleapis\.com|push\.services\.mozilla\.com|push\.apple\.com|notify\.windows\.com)$/;
export const QUAKE_BOX = { lamin: 20, lomin: 118, lamax: 27.5, lomax: 124.5 };

export function validateSubscription(sub, allowLocal) {
  if (!sub || typeof sub.endpoint !== "string" || sub.endpoint.length > 600) return "bad subscription";
  let u; try { u = new URL(sub.endpoint); } catch { return "bad endpoint"; }
  if (!(allowLocal && u.hostname === "127.0.0.1") && (u.protocol !== "https:" || !PUSH_HOST_RE.test(u.hostname))) return "endpoint host not allowed";
  const k = sub.keys || {};
  try {
    if (b64uDecode(k.p256dh).length !== 65 || b64uDecode(k.auth).length !== 16) return "bad keys";
  } catch { return "bad keys"; }
  return null;
}

export function selectQuakes(features, seen, now, box = QUAKE_BOX) {
  const out = [];
  for (const f of features) {
    const c = f.geometry && f.geometry.coordinates, p = f.properties || {};
    if (!c || p.mag == null || p.mag < 4.5 || !f.id) continue;
    const [lon, lat, depth] = c;
    if (lat < box.lamin || lat > box.lamax || lon < box.lomin || lon > box.lomax) continue;
    if (seen.includes(f.id) || now - p.time > 6 * 3600000) continue;
    out.push({ id: f.id, mag: p.mag, place: p.place || "Taiwan region", depth: depth || 0, time: p.time, url: p.url });
  }
  return out.sort((a, b) => a.time - b.time);
}

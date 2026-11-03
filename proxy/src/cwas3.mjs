/* Taiwan CWA open data from CWA's own PUBLIC AWS S3 mirror (s3://cwaopendata, ap-northeast-1; AWS Open Data registry, no account, NO API KEY).
 * Why: opendata.cwa.gov.tw's WAF rejects Cloudflare egress IPs (even from a Worker placed in gcp:asia-east1) once a valid key is sent, but the S3 mirror is
 * plain AWS and is refreshed by CWA as new reports are issued. Used by the proxy every-2-minute cron with conditional GET (If-None-Match -> 304 = no work).
 *   Earthquake/E-A0015-001.zip  significant felt-quake reports (one XML per report)       -> kind "significant"
 *   Earthquake/E-A0016-001.zip  small-area felt-quake reports (M<4 / local)               -> kind "local"
 *   Warning/W-C0033-001.json    county warnings;   Warning/W-C0034-005.json  tropical cyclones (same schema as the REST API under cwaopendata.dataset)
 * Licence: Government Open Data License v1.0 — attribution "資料來源：交通部中央氣象署". */
import { normalizeTyphoons, normalizeWarnings, groupWarnings } from "./cwa.mjs";

export const S3_BASE = "https://cwaopendata.s3.ap-northeast-1.amazonaws.com";
export const S3_FILES = { felt: "Earthquake/E-A0015-001.zip", local: "Earthquake/E-A0016-001.zip", warnings: "Warning/W-C0033-001.json", typhoon: "Warning/W-C0034-005.json" };

const u16 = (b, o) => b[o] | (b[o + 1] << 8), u32 = (b, o) => (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0;
const dec = new TextDecoder("utf-8");

/** Central-directory entries of a zip held in memory: [{name, method, csize, usize, off}] (no zip64 / encryption; CWA's zips use deflate). */
export function zipEntries(b) {
  let e = -1; for (let i = b.length - 22; i >= Math.max(0, b.length - 70000); i--) if (b[i] === 0x50 && b[i + 1] === 0x4b && b[i + 2] === 5 && b[i + 3] === 6) { e = i; break; }
  if (e < 0) throw new Error("zip: no end-of-central-directory");
  const n = u16(b, e + 10); let p = u32(b, e + 16); const out = [];
  for (let i = 0; i < n; i++) {
    if (u32(b, p) !== 0x02014b50) throw new Error("zip: bad central directory");
    const nl = u16(b, p + 28), xl = u16(b, p + 30), cl = u16(b, p + 32);
    out.push({ method: u16(b, p + 10), csize: u32(b, p + 20), usize: u32(b, p + 24), off: u32(b, p + 42), name: dec.decode(b.subarray(p + 46, p + 46 + nl)) });
    p += 46 + nl + xl + cl;
  }
  return out;
}
export async function zipRead(b, ent) {
  if (u32(b, ent.off) !== 0x04034b50) throw new Error("zip: bad local header");
  const s = ent.off + 30 + u16(b, ent.off + 26) + u16(b, ent.off + 28), raw = b.subarray(s, s + ent.csize);
  if (ent.method === 0) return dec.decode(raw);
  if (ent.method !== 8) throw new Error("zip: unsupported method " + ent.method);
  const ds = new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return dec.decode(await new Response(ds).arrayBuffer());
}
/** entry file names end with the origin time in Taipei local time: CWA-EQ115075-2026-1101-162007-OD.xml / CWA-EC115000-2026-1102-102309-OD.xml */
export const entryTime = (name) => { const m = /-(\d{4})-(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})-OD\.xml$/.exec(name); return m ? Date.parse(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}+08:00`) : 0; };

const unesc = (s) => String(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const tag = (x, n) => { const m = new RegExp(`<${n}>([^<]*)</${n}>`).exec(x); return m ? unesc(m[1]).trim() : ""; };
const level = (s) => { const m = /^(\d)(弱|強)?級?/.exec(s || ""); return m ? (+m[1]) * 2 + (m[2] === "弱" ? -1 : m[2] === "強" ? 1 : 0) : -1; };

/** one CWA earthquake-report XML -> the same quake object the REST normaliser (cwa.mjs normalizeCwaQuake) produces */
export function parseQuakeXml(xml, kind) {
  const i = xml.indexOf("<EarthquakeInfo>"); if (i < 0) return null;
  const info = xml.slice(i), head = xml.slice(0, i);
  const t = Date.parse(tag(info, "OriginTime")), lat = parseFloat(tag(info, "EpicenterLatitude")), lon = parseFloat(tag(info, "EpicenterLongitude")), mag = parseFloat(tag(info, "MagnitudeValue"));
  if (!isFinite(t) || !isFinite(lat) || !isFinite(lon) || !isFinite(mag)) return null;
  let best = null; const re = /<CountyName>([^<]*)<\/CountyName>\s*<AreaIntensity>([^<]*)<\/AreaIntensity>/g; let m;
  while ((m = re.exec(xml))) if (!best || level(m[2]) > level(best[2])) best = m;
  const depth = parseFloat(tag(info, "FocalDepth"));
  return {
    id: "cwa" + t, mag, depthKm: isFinite(depth) ? depth : 0, lat, lon, t, place: tag(info, "Location").replace(/\s+/g, " ") || "Taiwan region", url: tag(head, "Web"), src: "CWA", kind,
    magType: tag(info, "MagnitudeType"), report: tag(head, "ReportContent"), intensity: best ? unesc(best[1]) + " " + unesc(best[2]) : "", image: tag(head, "ReportImageURI"),
  };
}
/** newest `limit` reports of a zip (by the origin time in each file name) */
export async function parseQuakeZip(buf, kind, limit = 5) {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  const ents = zipEntries(b).filter((e) => entryTime(e.name)).sort((x, y) => entryTime(y.name) - entryTime(x.name)).slice(0, limit), out = [];
  for (const e of ents) { const q = parseQuakeXml(await zipRead(b, e), kind); if (q) out.push(q); }
  return out;
}
/** same JSON as the REST API, wrapped differently: {cwaopendata:{dataset|Dataset:{...}}} -> {records:{...}} */
export const s3Records = (j) => { const r = j && j.cwaopendata; return { records: (r && (r.dataset || r.Dataset)) || {} }; };
export const s3Warnings = (j, now) => groupWarnings(normalizeWarnings(s3Records(j), now));
export const s3Typhoons = (j) => normalizeTyphoons(s3Records(j));

/** conditional GET of one mirror file. etags[key] = last ETag. Resolves {status:304} or {status:200, etag, buf}. */
export async function s3Get(key, etag, f = fetch) {
  const r = await f(`${S3_BASE}/${S3_FILES[key]}`, { headers: etag ? { "If-None-Match": etag } : {}, signal: AbortSignal.timeout(9000), cf: { cacheTtl: 0 } });
  if (r.status === 304) return { status: 304 };
  if (!r.ok) throw new Error(S3_FILES[key] + " HTTP " + r.status);
  return { status: 200, etag: r.headers.get("etag") || "", buf: new Uint8Array(await r.arrayBuffer()) };
}

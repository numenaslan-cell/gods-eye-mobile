/* Taiwan Coast Guard Administration (海洋委員會海巡署, CGA) press-release RSS -> items about the China Coast Guard (海警).
 * https://www.cga.gov.tw/GipOpen/wSite/rss?ctNode=2116&mp=9997 — "版權來自：海洋委員會海巡署"; treat as NON-COMMERCIAL, personal / portfolio use, attribution required.
 * Pure parsing (no DOM in Workers): the feed is ~240 KB, so call this inside the Durable Object, not in the 10 ms-CPU front Worker. */
export const CGA_RSS = "https://www.cga.gov.tw/GipOpen/wSite/rss?ctNode=2116&mp=9997";
const KEYWORD = "海警";

const unescapeXml = (s) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&amp;/g, "&");
const tag = (item, name) => { const m = new RegExp("<" + name + ">([\\s\\S]*?)</" + name + ">").exec(item); return m ? unescapeXml(m[1]).trim() : ""; };
const strip = (s) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export function parseCgaRss(xml, limit = 20) {
  const items = String(xml || "").split("<item>").slice(1).map((x) => x.split("</item>")[0]);
  const out = [];
  for (const it of items) {
    const title = strip(tag(it, "title")), desc = strip(tag(it, "description"));
    const inTitle = title.includes(KEYWORD), inDesc = desc.includes(KEYWORD);
    if (!inTitle && !inDesc) continue;
    let link = tag(it, "link").replace(/^http:\/\//, "https://");
    try { const u = new URL(link); if (!/(^|\.)cga\.gov\.tw$/.test(u.hostname)) link = ""; } catch { link = ""; }
    const t = Date.parse(tag(it, "pubDate")), i = desc.indexOf(KEYWORD);
    out.push({ title, link, t: isFinite(t) ? t : null, kind: inTitle ? "title" : "mention", snippet: inDesc ? desc.slice(Math.max(0, i - 20), i + 60).trim() : "" });
  }
  out.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "title" ? -1 : 1) || (b.t || 0) - (a.t || 0));
  return { scanned: items.length, items: out.slice(0, limit) };
}

export async function fetchCga(f = fetch, url = CGA_RSS) {
  const r = await f(url, { headers: { Accept: "application/rss+xml, text/xml", "User-Agent": "gods-eye-view/1.0 (+https://numenaslan-cell.github.io/gods-eye-mobile/)" }, cf: { cacheTtl: 1800, cacheEverything: true }, signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error("CGA RSS HTTP " + r.status);
  return { source: "海洋委員會海巡署 (CGA) RSS", time: Date.now(), ...parseCgaRss(await r.text()) };
}

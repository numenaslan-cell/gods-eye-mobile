/**
 * pla-intel — placed Cloudflare Worker that reads two official PLA-activity sources and returns them PARSED to the main Worker.
 *
 * Why it exists: www.mnd.gov.tw (Taiwan Ministry of National Defense) answers its daily-bulletin detail pages (HTTP 200) only from Taiwan-routed networks —
 * a default Cloudflare Worker, GitHub runners and Japan-placed Workers get "403 Access denied." — so this Worker is placed at `gcp:asia-east1` (Changhua).
 * www.mod.go.jp (Japan Joint Staff) answers from everywhere; it is read here too so that the whole scraper lives in one Worker (and so PDFs can be proxied to GitHub Actions for pdftotext).
 * Placement only applies to `fetch` handlers, so there is no `scheduled` here: the main Worker's cron calls it through the service binding INTEL (and GitHub Actions can trigger the main Worker's POST /api/pla/refresh).
 *
 * It has NO secrets and NO public route (workers_dev = false): only the main Worker can call it (service binding), and everything it serves is public data.
 *
 *   GET /health                -> {ok:true}
 *   GET /mnd/list              -> {days:[{id,date,title}]}                         MND bulletin list (newest first)
 *   GET /mnd/detail/:id        -> {day:{aircraft,adiz,plan,official,map,…}}         one parsed daily bulletin
 *   GET /js/index              -> {events:[…]}                                      Joint Staff press-release titles parsed (China-related only), first ~48 KB of the index
 *   GET /js/pdf/:id            -> application/pdf                                    proxies mod.go.jp/js/pdf/YYYY/pYYYYMMDD_NN.pdf (GitHub Actions fallback; run pdftotext there)
 */
import { parseMndList, parseMndDetail, parseJsIndex, MND_BASE, JS_INDEX, JS_BASE } from "../../../proxy/src/intel.mjs";

const UA = "Mozilla/5.0 (compatible; gods-eye-view/1.0; +https://numenaslan-cell.github.io/gods-eye-mobile/)";
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

async function get(url, opts = {}) {
  const r = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": opts.lang || "zh-TW,zh;q=0.9,ja;q=0.8,en;q=0.5", Accept: opts.accept || "text/html,application/xhtml+xml,*/*" }, signal: AbortSignal.timeout(opts.ms || 12000), cf: { cacheTtl: 0 } });
  return r;
}
/** Read at most `max` bytes of a text response (the Joint Staff index is ~1.6 MB; the newest entries are at the top). */
async function head(r, max) {
  const rd = r.body.getReader(), dec = new TextDecoder("utf-8"); let s = "", n = 0;
  while (n < max) { const { done, value } = await rd.read(); if (done) break; n += value.length; s += dec.decode(value, { stream: true }); }
  try { await rd.cancel(); } catch { /* ignore */ }
  return s;
}

export default {
  async fetch(request) {
    const u = new URL(request.url), p = u.pathname;
    try {
      if (p === "/health") return json({ ok: true, service: "pla-intel", placement: request.headers.get("cf-placement") || null });
      if (p === "/mnd/list") {
        const r = await get(MND_BASE + "news/plaact"); if (!r.ok) return json({ error: "MND list HTTP " + r.status }, 502);
        const days = parseMndList(await r.text()); if (!days.length) return json({ error: "MND list: no bulletins parsed (layout changed?)" }, 502);
        return json({ days });
      }
      let m;
      if ((m = /^\/mnd\/detail\/(\d{4,6})$/.exec(p))) {
        const r = await get(MND_BASE + "news/plaact/" + m[1]); if (!r.ok) return json({ error: "MND detail HTTP " + r.status }, 502);
        const day = parseMndDetail(await r.text(), m[1]); if (!day) return json({ error: "MND detail: no counts found in page " + m[1] }, 502);
        return json({ day });
      }
      if (p === "/js/index") {
        const r = await get(JS_INDEX, { lang: "ja,en;q=0.5" }); if (!r.ok) return json({ error: "Joint Staff index HTTP " + r.status }, 502);
        const events = parseJsIndex(await head(r, 48000)); if (!events.length) return json({ error: "Joint Staff index: no China-related releases parsed (layout changed?)" }, 502);
        return json({ events });
      }
      if ((m = /^\/js\/pdf\/(p\d{8}_\d{2})$/.exec(p))) {
        const r = await get(`${JS_BASE}/js/pdf/${m[1].slice(1, 5)}/${m[1]}.pdf`, { accept: "application/pdf", ms: 20000 }); if (!r.ok) return json({ error: "PDF HTTP " + r.status }, 502);
        return new Response(r.body, { headers: { "Content-Type": "application/pdf", "Cache-Control": "no-store" } });
      }
    } catch (e) { return json({ error: String((e && e.message) || e).slice(0, 200) }, 502); }
    return json({ error: "not found" }, 404);
  },
};

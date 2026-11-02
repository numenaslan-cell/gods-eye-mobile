/**
 * mpb-fetcher — placed Cloudflare Worker that pulls Taiwan MPB AIS and hands it to the main Worker.
 *
 * Why it exists: mpbais.motcmpb.gov.tw only answers from Taiwan-routed networks. GitHub-hosted runners and a default
 * Cloudflare Worker time out, but a Worker with `placement.region = "gcp:asia-east1"` (Changhua, Taiwan) runs in a nearby
 * Cloudflare data centre and the fetch succeeds (tested 2026-11-03: HTTP 200, ~3 MB, 200-450 ms).
 * Placement only applies to `fetch` handlers (not `scheduled`), so something else (GitHub Actions) calls POST /run.
 *
 * Routes
 *   GET  /health  -> {ok:true}                      (no auth, touches nothing)
 *   POST /run     -> fetch MPB, trim, POST to the main Worker /api/ships/ingest through the PROXY service binding.
 *                    Bearer INGEST_TOKEN required. 200 only when MPB gave > 0 ships AND the ingest answered 2xx; otherwise 502.
 * Bindings: service PROXY -> gods-eye-opensky-proxy, secret INGEST_TOKEN.
 */
import { normalizeMpb } from "../../../proxy/src/ais.mjs";

const MPB_URL = "https://mpbais.motcmpb.gov.tw/aismpb/tools/geojsonais.ashx";
const BOX = { lamin: 19, lomin: 116, lamax: 28, lomax: 126 };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

async function tokenOk(given, want) {
  if (!given || !want) return false;
  const enc = new TextEncoder(), [a, b] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(given)), crypto.subtle.digest("SHA-256", enc.encode(want))]);
  const x = new Uint8Array(a), y = new Uint8Array(b); let d = 0; for (let i = 0; i < x.length; i++) d |= x[i] ^ y[i]; return d === 0;
}

async function fetchMpb(tries = 3) {
  let last = "";
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(MPB_URL, { headers: { Referer: "https://mpbais.motcmpb.gov.tw/aismpb/", "User-Agent": "gods-eye-view/1.0 (+https://numenaslan-cell.github.io/gods-eye-mobile/)", Accept: "application/json" }, signal: AbortSignal.timeout(12000) });
      if (!r.ok) throw new Error("MPB HTTP " + r.status);
      const gj = await r.json(); const feats = Array.isArray(gj.features) ? gj.features : [];
      if (!feats.length) throw new Error("MPB returned no features (Referer rejected / IP blocked?)");
      return feats;
    } catch (e) { last = String((e && e.message) || e); }
  }
  throw new Error(last);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ ok: true, service: "mpb-fetcher" });
    if (url.pathname !== "/run") return json({ error: "not found" }, 404);
    if (request.method !== "POST") return json({ error: "use POST" }, 405);
    const m = /^Bearer (.+)$/.exec(request.headers.get("Authorization") || "");
    if (!(await tokenOk(m && m[1], env.INGEST_TOKEN))) return json({ error: "unauthorized" }, 401);
    const startedAt = new Date().toISOString(), t0 = Date.now(), out = { ok: false, startedAt, placement: request.headers.get("cf-placement") || null };
    try {
      const feats = await fetchMpb(); out.mpbMs = Date.now() - t0; out.features = feats.length;
      const by = new Map();
      for (const f of feats) { const x = normalizeMpb(f, BOX); if (x && (!by.has(x.mmsi) || by.get(x.mmsi).t < x.t)) by.set(x.mmsi, x); }
      const ships = [...by.values()]; out.ships = ships.length;
      if (!ships.length) return json({ ...out, error: "MPB: 0 ships in Taiwan box" }, 502);
      let newest = 0, oldest = Infinity; for (const s of ships) { if (s.t > newest) newest = s.t; if (s.t < oldest) oldest = s.t; }
      out.newestRecord = new Date(newest).toISOString(); out.oldestRecord = new Date(oldest).toISOString();
      const t1 = Date.now();
      const r = await env.PROXY.fetch("https://proxy/api/ships/ingest", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + env.INGEST_TOKEN }, body: JSON.stringify({ ships }) });
      out.ingestMs = Date.now() - t1; out.ingestStatus = r.status;
      const text = await r.text(); try { out.ingest = JSON.parse(text); } catch { out.ingest = text.slice(0, 200); }
      if (!r.ok) return json({ ...out, error: "ingest HTTP " + r.status }, 502);
      out.ok = true; out.totalMs = Date.now() - t0;
      return json(out);
    } catch (e) { return json({ ...out, error: String((e && e.message) || e).slice(0, 300), totalMs: Date.now() - t0 }, 502); }
  },
};

/**
 * (Minimal version — OpenSky proxy only, no bindings needed. The full Worker with AIS ships + Web Push alerts is
 * proxy/src/worker.mjs, deployed from proxy/dist/worker.js; see proxy/DEPLOY.md.)
 *
 * Optional tiny CORS proxy for the OpenSky Network REST API (Cloudflare Worker, free tier is enough).
 *
 * The public OpenSky endpoint does not reliably send `Access-Control-Allow-Origin` for third-party
 * origins (e.g. your GitHub Pages site), so browsers may block direct calls. Deploy this worker and set
 *   openskyBase: "https://<your-worker>.workers.dev/api"   in assets/config.js
 * (or open the app with ?opensky=https://<your-worker>.workers.dev/api).
 *
 * It only forwards GET /api/states/all and caches the response for 10 s (OpenSky's anonymous time
 * resolution) so many visitors share one upstream credit.
 */
const UPSTREAM = "https://opensky-network.org/api";
// Allowed browser origins (exact match). Localhost is allowed for development.
const ALLOWED_ORIGINS = ["https://numenaslan-cell.github.io"];
const LOCAL_RE = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const originOk = (o) => ALLOWED_ORIGINS.includes(o) || LOCAL_RE.test(o);

const corsFor = (origin) => (extra = {}) => ({
  "Access-Control-Allow-Origin": originOk(origin) ? origin : ALLOWED_ORIGINS[0],
  "Vary": "Origin",
  "Access-Control-Expose-Headers": "X-Rate-Limit-Remaining, X-Rate-Limit-Retry-After-Seconds",
  ...extra,
});

export default {
  async fetch(request) {
    const cors = corsFor(request.headers.get("Origin") || "");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors({ "Access-Control-Allow-Methods": "GET" }) });
    const url = new URL(request.url);
    if (request.method !== "GET" || url.pathname !== "/api/states/all") return new Response("Not found", { status: 404, headers: cors() });
    const upstream = await fetch(UPSTREAM + "/states/all" + url.search, { cf: { cacheTtl: 10, cacheEverything: true } });
    const headers = cors({ "Content-Type": upstream.headers.get("Content-Type") || "application/json", "Cache-Control": "public, max-age=10" });
    for (const h of ["X-Rate-Limit-Remaining", "X-Rate-Limit-Retry-After-Seconds"]) {
      const v = upstream.headers.get(h); if (v) headers[h] = v;
    }
    return new Response(upstream.body, { status: upstream.status, headers });
  },
};

/*
 * God's Eye View // ORB-7 — runtime configuration (edit freely, no build needed).
 * You can also override a few things from the URL:
 *   ?demo=1                 force DEMO DATA for both feeds
 *   ?opensky=https://my-worker.example.workers.dev/api   use your own OpenSky CORS proxy
 *   ?sats=stations          use the small CelesTrak "stations" group instead of "active"
 */
window.GODS_EYE_CONFIG = {
  // Base URL of the OpenSky REST API. The public endpoint does NOT reliably send CORS
  // headers for third-party origins, so on GitHub Pages you will most likely want to
  // point this at your own tiny proxy (see proxy/cloudflare-worker.js and README).
  openskyBase: "https://gods-eye-opensky-proxy.numenaslan.workers.dev/api",

  // Bounding box around Taiwan (degrees).
  bbox: { lamin: 21.5, lomin: 119, lamax: 26.5, lomax: 123 },

  // Flight refresh. Anonymous OpenSky gives only ~400 credits/day (1 credit per call
  // for this bbox), so the app backs off automatically on HTTP 429 / errors.
  flightRefreshMs: 15000,

  // CelesTrak TLE group. "active" = ~16k satellites (~2.7 MB, cached 2 h in localStorage).
  satGroup: "active",
  satRefreshMs: 5000,
  tleCacheMs: 2 * 60 * 60 * 1000,

  // Show generated demo data when a live feed is unavailable.
  demoFallback: true
};

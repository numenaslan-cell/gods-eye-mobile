/**
 * God's Eye View // ORB-7 — Cloudflare Worker (free plan).
 *
 *   GET  /api/flights      flights over 0-45N 105-145E (9 adsb.lol circles, <= 800 aircraft; adsb.fi/OpenSky fallbacks), collected in the Hub DO, 10 s Cache API
 *   GET  /api/states/all   OpenSky CORS proxy (10 s edge cache; legacy route, kept as the client's fallback)
 *   GET  /api/ships        AIS ships around Taiwan, relayed + aggregated from aisstream.io (key stays a Worker secret)
 *   GET  /api/push/config  { enabled, publicKey }  (VAPID public key for the browser)
 *   GET  /api/quakes | /api/typhoon | /api/warnings   CWA open data (secret CWA_API_KEY); {enabled:false} -> client falls back to USGS
 *   GET  /api/health       ship/MPB watchdog (503 when 0 ships or mpbAgeSec > 15 min); POST /api/ships/ingest-mpb raw MPB GeoJSON from mpb-fetcher (Bearer INGEST_TOKEN)
 *   GET  /api/quakes/live  merged quakes: CWA (authoritative, fetched every 2 min through the Taiwan-placed pla-intel Worker; GitHub Actions ingest is the backup) + USGS + EMSC + GFZ, deduped, each with its source(s)
 *   GET  /api/cga          CGA (海巡署) RSS items mentioning 海警, parsed in the Hub DO, cached 30 min
 *   GET  /api/pla          PLA-activity intel: Taiwan MND daily bulletins + Japan Joint Staff releases (scraped by the placed `pla-intel` Worker via service binding INTEL; PDF details posted by GitHub Actions)
 *   POST /api/pla/ingest | /api/pla/refresh | GET /api/pla/pdf/:id   Bearer INGEST_TOKEN (GitHub Actions)
 *   cron collector watchdog: if the GitHub Actions collector (aisstream + CWA backup) has not reported for 10 min AND secret GH_DISPATCH_TOKEN exists -> workflow_dispatch collector.yml (max 1 per 15 min). No token = no-op; /api/health.collector shows the state.
 *   POST /api/push/subscribe | /unsubscribe | /test   Web Push subscriptions (stored in KV)
 *   cron (every 2 min)     M4.5+ quakes near Taiwan, China Coast Guard vessel in AIS, upcoming ISS pass -> Web Push
 *
 * Bindings (see proxy/DEPLOY.md):  HUB (Durable Object, SQLite), SUBS (KV),
 *   secrets AISSTREAM_API_KEY, VAPID_PRIVATE_KEY, INGEST_TOKEN, optional CWA_API_KEY;  vars VAPID_PUBLIC_KEY, VAPID_SUBJECT (optional).
 * Everything degrades gracefully when a binding / secret is missing (the site then shows DEMO data / "push not configured").
 */
import createPasses from "../../assets/passes.js";
import satellite from "../../assets/vendor/satellite.min.js";
import { encryptPayload, vapidAuthHeader, b64uDecode } from "./webpush.mjs";
import { normalizeMpbCollection, applyAis, applyMpb, trimShips, publicShips, isCcg, ccgWhy, AIS_BBOX, AIS_TYPES } from "./ais.mjs";
import { plaPublic, pruneJsEvents, sanitizeJsDetail, sanitizeMndDay } from "./intel.mjs";
import { validateSubscription, selectQuakes } from "./logic.mjs";
import { collectFlights, FLIGHT_BOX } from "./flights.mjs";
import { cwaData, mergeQuakes } from "./cwa.mjs";
import { fetchCga } from "./cga.mjs";
import { parseQuakeZip, s3Get, s3Warnings, s3Typhoons } from "./cwas3.mjs";
import { quakeUrls, quakeUrlSets, mergeById, isFarQuake, parseUsgs, parseEmsc, parseGfz, mergeQuakeSources, pickAlertQuakes, fingerprint } from "./quakes.mjs";

const UPSTREAM = "https://opensky-network.org/api";
const SITE = "https://numenaslan-cell.github.io/gods-eye-mobile/";
const ALLOWED_ORIGINS = ["https://numenaslan-cell.github.io"];
const LOCAL_RE = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const originOk = (o) => ALLOWED_ORIGINS.includes(o) || LOCAL_RE.test(o);
const MAX_SUBS = 200;
const COLLECT_MS = 25000, STALE_MS = 90000, KEEP_MS = 30 * 60000;
const COLLECTOR_STALE_SEC = 10 * 60, GH_DISPATCH_MIN_MS = 15 * 60000; // GitHub Actions collector (aisstream + CWA REST backup): "stale" after 10 min; at most one workflow_dispatch per 15 min
const GH_REPO_DEFAULT = "numenaslan-cell/gods-eye-mobile", GH_WORKFLOW = "collector.yml";
const MPB_STALE_SEC = 15 * 60, MPB_HEAL_SEC = 7 * 60; // /api/health + notice at 15 min; the cron asks mpb-fetcher to run once a 5-min cycle was missed (7 min)

const corsFor = (origin) => (extra = {}) => ({
  "Access-Control-Allow-Origin": originOk(origin) ? origin : ALLOWED_ORIGINS[0],
  "Vary": "Origin",
  "Access-Control-Expose-Headers": "X-Rate-Limit-Remaining, X-Rate-Limit-Retry-After-Seconds",
  ...extra,
});
const json = (cors, obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), { status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "no-store", ...extra }) });

async function tokenOk(given, expected) { // constant-time compare via SHA-256 digests
  const d = async (x) => new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(x))));
  const [a, b] = await Promise.all([d(given), d(expected)]);
  let diff = 0; for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0 && !!given;
}

/* ------------------------------------------------------------------ front Worker */
export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsFor(origin);
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors({ "Access-Control-Allow-Methods": "GET, POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }) });
    const p = url.pathname;

    if (request.method === "GET" && p === "/api/flights") {
      // One fixed region (FLIGHT_BOX 0-45N 105-145E; query-string boxes are ignored => one cache key, no upstream fan-out abuse). The 10 adsb.lol circles are fetched
      // and parsed inside the Hub Durable Object (30 s CPU, single-flight, 8 s memo); this front Worker (10 ms CPU on the free plan) only streams bytes.
      const cache = typeof caches !== "undefined" ? caches.default : null;
      const key = new Request(url.origin + "/api/flights?v=2");
      if (cache) { const hit = await cache.match(key); if (hit) return new Response(hit.body, { status: 200, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=10", "X-Cache": "HIT" }) }); }
      const hubF = env.HUB ? env.HUB.get(env.HUB.idFromName("main")) : null;
      if (!hubF) return json(cors, { error: "no hub" }, 503);
      const r = await hubF.fetch("https://hub/flights");
      if (!r.ok) return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "no-store" }) });
      const res = new Response(r.body, { status: 200, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=10" }) });
      if (cache) { const put = cache.put(key, res.clone()); if (ctx && ctx.waitUntil) ctx.waitUntil(put); else await put; }
      return res;
    }
    if (request.method === "GET" && p === "/api/states/all") {
      let upstream;
      try { upstream = await fetch(UPSTREAM + "/states/all" + url.search, { cf: { cacheTtl: 10, cacheEverything: true } }); }
      catch (e) { return json(cors, { error: "upstream unreachable" }, 502); }
      const headers = cors({ "Content-Type": upstream.headers.get("Content-Type") || "application/json", "Cache-Control": "public, max-age=10" });
      for (const h of ["X-Rate-Limit-Remaining", "X-Rate-Limit-Retry-After-Seconds"]) { const v = upstream.headers.get(h); if (v) headers[h] = v; }
      return new Response(upstream.body, { status: upstream.status, headers });
    }

    const hub = env.HUB ? env.HUB.get(env.HUB.idFromName("main")) : null;

    if (request.method === "GET" && p === "/api/health") { // ship-data / MPB watchdog state; HTTP 503 when there are 0 ships or MPB is older than 15 min
      if (!hub) return json(cors, { ok: false, error: "no hub" }, 503);
      const r = await hub.fetch("https://hub/health");
      return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "no-store" }) });
    }
    if (request.method === "GET" && p === "/api/ships") {
      if (!hub || !(env.AISSTREAM_API_KEY || env.INGEST_TOKEN)) return json(cors, { error: "AIS not configured" }, 503);
      const r = await hub.fetch("https://hub/ships");
      // stream the body through untouched: re-parsing a few hundred KB of JSON would eat the 10 ms CPU budget of the free plan
      return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=20" }) });
    }
    if (request.method === "POST" && p === "/api/ships/ingest") {
      // Optional relay: a collector running on a non-datacenter IP (scripts/ais-collector.mjs) posts aisstream messages here,
      // because aisstream.io drops connections coming from datacenter / Cloudflare egress IPs. Bearer token = Worker secret INGEST_TOKEN.
      if (!hub || !env.INGEST_TOKEN) return json(cors, { error: "ingest not configured" }, 503);
      const given = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      if (!(await tokenOk(given, env.INGEST_TOKEN))) return json(cors, { error: "unauthorized" }, 401);
      const r = await hub.fetch("https://hub/ingest", { method: "POST", body: request.body, headers: { "Content-Type": "application/json" } });
      return json(cors, await r.json(), r.status);
    }
    if (request.method === "POST" && p === "/api/ships/ingest-mpb") {
      // Raw MPB GeoJSON (~3 MB) streamed straight through by the Taiwan-placed `mpb-fetcher` Worker. Parsing + normalising happens in the Durable Object
      // (30 s CPU), because a free-plan Worker's 10 ms CPU budget cannot parse 3 MB of JSON (that is exactly how mpb-fetcher died on 2026-11-03: exceededCpu).
      if (!hub || !env.INGEST_TOKEN) return json(cors, { error: "ingest not configured" }, 503);
      const given = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      if (!(await tokenOk(given, env.INGEST_TOKEN))) return json(cors, { error: "unauthorized" }, 401);
      const r = await hub.fetch("https://hub/ingest-mpb", { method: "POST", body: request.body, headers: { "Content-Type": "application/json" } });
      return json(cors, await r.json(), r.status);
    }
    if (request.method === "POST" && p === "/api/cwa/ingest") {
      // CWA's WAF ("Request Rejected") blocks Cloudflare egress IPs, so the collector (normal IP, scripts/ais-collector.mjs) fetches CWA with the owner's key
      // and posts the NORMALISED result here. Bearer INGEST_TOKEN, same as /api/ships/ingest.
      if (!hub || !env.INGEST_TOKEN) return json(cors, { error: "ingest not configured" }, 503);
      const given = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      if (!(await tokenOk(given, env.INGEST_TOKEN))) return json(cors, { error: "unauthorized" }, 401);
      const r = await hub.fetch("https://hub/cwa-ingest", { method: "POST", body: request.body, headers: { "Content-Type": "application/json" } });
      return json(cors, await r.json(), r.status);
    }
    if (request.method === "GET" && /^\/api\/(quakes|typhoon|warnings)$/.test(p)) {
      if (!hub || !(env.CWA_API_KEY || env.INGEST_TOKEN)) return json(cors, { enabled: false, source: "usgs", reason: "CWA_API_KEY not configured" }, 200, { "Cache-Control": "public, max-age=300" });
      const r = await hub.fetch("https://hub/cwa/" + p.slice("/api/".length)); // fetched + parsed inside the Durable Object (big JSON, 10 ms CPU on the free plan front Worker)
      return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=60" }) });
    }
    if (request.method === "GET" && p === "/api/quakes/live") {
      if (!hub) return json(cors, { error: "not configured" }, 503);
      const r = await hub.fetch("https://hub/quakes-live");
      return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=30" }) });
    }
    if (request.method === "GET" && p === "/api/cga") {
      if (!hub) return json(cors, { error: "not configured" }, 503);
      const r = await hub.fetch("https://hub/cga");
      return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=300" }) });
    }
    if (request.method === "GET" && p === "/api/pla") {
      if (!hub) return json(cors, { error: "not configured" }, 503);
      const r = await hub.fetch("https://hub/pla");
      return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=120" }) });
    }
    if ((request.method === "POST" && (p === "/api/pla/ingest" || p === "/api/pla/refresh")) || (request.method === "GET" && /^\/api\/pla\/pdf\/p\d{8}_\d{2}$/.test(p))) {
      // GitHub Actions: refresh now / post pdftotext-derived details / fetch a Joint Staff PDF through the Taiwan-placed Worker when the runner cannot reach mod.go.jp directly
      if (!hub || !env.INGEST_TOKEN) return json(cors, { error: "ingest not configured" }, 503);
      const given = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      if (!(await tokenOk(given, env.INGEST_TOKEN))) return json(cors, { error: "unauthorized" }, 401);
      if (p.startsWith("/api/pla/pdf/")) {
        if (!env.INTEL) return json(cors, { error: "INTEL binding missing" }, 503);
        const r = await env.INTEL.fetch("https://intel/js/pdf/" + p.slice("/api/pla/pdf/".length));
        return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": r.headers.get("Content-Type") || "application/octet-stream", "Cache-Control": "no-store" }) });
      }
      const r = await hub.fetch("https://hub/" + (p === "/api/pla/ingest" ? "pla-ingest" : "pla-refresh"), { method: "POST", body: request.body, headers: { "Content-Type": "application/json" } });
      return json(cors, await r.json(), r.status);
    }
    if (request.method === "GET" && p === "/api/push/config") {
      return json(cors, { enabled: !!(env.SUBS && hub && env.VAPID_PRIVATE_KEY && env.VAPID_PUBLIC_KEY), publicKey: env.VAPID_PUBLIC_KEY || null, aisEnabled: !!(env.AISSTREAM_API_KEY || env.INGEST_TOKEN), cwaEnabled: !!env.CWA_API_KEY }, 200, { "Cache-Control": "public, max-age=300" });
    }
    if (request.method === "POST" && /^\/api\/push\/(subscribe|unsubscribe|test)$/.test(p)) {
      if (origin && !originOk(origin)) return json(cors, { error: "origin not allowed" }, 403);
      if (!(env.SUBS && hub && env.VAPID_PRIVATE_KEY && env.VAPID_PUBLIC_KEY)) return json(cors, { error: "push not configured" }, 503);
      let body; try { body = await request.json(); } catch { return json(cors, { error: "bad json" }, 400); }
      const r = await hub.fetch("https://hub" + p.slice("/api/push".length), { method: "POST", body: JSON.stringify(body) });
      return json(cors, await r.json(), r.status);
    }
    return new Response("Not found", { status: 404, headers: cors() });
  },

  async scheduled(event, env, ctx) {
    if (!env.HUB) return;
    const hub = env.HUB.get(env.HUB.idFromName("main"));
    ctx.waitUntil(hub.fetch("https://hub/cron", { method: "POST" }).then((r) => r.json()).then(async (rep) => {
      // watchdog: MPB older than 7 min (a 5-min fetcher cycle was missed) -> ask the Taiwan-placed mpb-fetcher to run now (service binding FETCHER; same INGEST_TOKEN)
      if (!(rep && rep.mpb && rep.mpb.needHeal) || !env.FETCHER || !env.INGEST_TOKEN) return;
      let note;
      try { const r = await env.FETCHER.fetch("https://fetcher/run", { method: "POST", headers: { Authorization: "Bearer " + env.INGEST_TOKEN, "X-Trigger": "proxy-watchdog" }, signal: AbortSignal.timeout(40000) }); note = { status: r.status, ok: r.ok }; } catch (e) { note = { status: 0, ok: false, error: String((e && e.message) || e).slice(0, 100) }; }
      await hub.fetch("https://hub/mpb-note", { method: "POST", body: JSON.stringify(note) });
    }).catch(() => {}));
    ctx.waitUntil(hub.fetch("https://hub/collector-poll", { method: "POST" }).then((r) => r.json()).then(async (c) => {
      // GitHub's own `schedule` trigger is unreliable; fire the collector workflow from this (reliable) Cloudflare cron when it is overdue. Only with the owner's own fine-grained token (secret GH_DISPATCH_TOKEN, Actions: write on this repo).
      if (!c || !c.needDispatch || !env.GH_DISPATCH_TOKEN) return;
      let note;
      try {
        const r = await fetch("https://api.github.com/repos/" + (env.GH_REPO || GH_REPO_DEFAULT) + "/actions/workflows/" + GH_WORKFLOW + "/dispatches", { method: "POST", headers: { Authorization: "Bearer " + env.GH_DISPATCH_TOKEN, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "gods-eye-proxy-cron", "Content-Type": "application/json" }, body: JSON.stringify({ ref: "main" }), signal: AbortSignal.timeout(15000) });
        note = { status: r.status, ok: r.status === 204 }; await r.body?.cancel();
      } catch (e) { note = { status: 0, ok: false, error: String((e && e.message) || e).slice(0, 100) }; }
      await hub.fetch("https://hub/gh-note", { method: "POST", body: JSON.stringify(note) });
    }).catch(() => {}));
    ctx.waitUntil(hub.fetch("https://hub/quake-cron", { method: "POST" }).then((r) => r.text()).catch(() => {})); // separate invocation = separate 10 ms CPU budget
  },
};

/* ----------------------------------------------------- Durable Object: AIS + alerts */
export class Hub {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env;
    this.ships = {}; this.lastCollect = 0; this.lastAttempt = 0; this.lastError = ""; this.collecting = false; this.everCollected = false;
    ctx.blockConcurrencyWhile(async () => {
      const s = await ctx.storage.get(["ships", "lastCollect", "lastError", "diag", "cron", "mpbAt", "pla", "qk", "cwaIngest", "collectorAt", "aisAt", "ghd"]); this.collectorAt = s.get("collectorAt") || 0; this.aisAt = s.get("aisAt") || 0; this.ghd = s.get("ghd") || null; this.cwaIng = s.get("cwaIngest") || {}; this.qk = s.get("qk") || { src: {}, ev: {}, fs: {}, since: Date.now() }; this.pla = s.get("pla") || { mnd: { list: [], days: {} }, js: { events: [], details: {} } }; this.mpbAt = s.get("mpbAt") || 0; this.diag = s.get("diag") || null; this.cron = s.get("cron") || null;
      this.ships = s.get("ships") || {}; this.lastCollect = s.get("lastCollect") || 0; this.lastError = s.get("lastError") || "";
      this.everCollected = this.lastCollect > 0;
      await this.loadKnown(); this.markKnown();
    });
  }

  async fetch(request) {
    const path = new URL(request.url).pathname;
    try {
      if (path === "/ships") return this.shipsResponse();
      if (path === "/flights") return this.flightsResponse();
      if (path === "/ingest") return this.ingest(request);
      if (path === "/ingest-mpb") return this.ingestMpbRaw(request);
      if (path === "/mpb-note") { let b = {}; try { b = await request.json(); } catch { /* none */ } this.mpbHeal = { ...(this.mpbHeal || {}), at: Date.now(), ...b }; return new Response("{}"); }
      if (path === "/collector-poll") return new Response(JSON.stringify(this.collectorCheck(Date.now())), { headers: { "Content-Type": "application/json" } });
      if (path === "/health") return this.healthResponse();
      if (path === "/gh-note") { let b = {}; try { b = await request.json(); } catch { /* none */ } this.ghd = { at: Date.now(), status: b.status | 0, ok: !!b.ok, error: b.error ? String(b.error).slice(0, 100) : undefined }; await this.ctx.storage.put("ghd", this.ghd); return new Response("{}"); }
      if (path === "/cga") return this.cga();
      if (path === "/cwa-ingest") return this.cwaIngest(request);
      if (path === "/quakes-live") return new Response(this.quakesLiveBody(), { headers: { "Content-Type": "application/json" } });
      if (path === "/quake-cron") return new Response(JSON.stringify(await this.quakeCron()), { headers: { "Content-Type": "application/json" } });
      if (path === "/pla") return new Response(JSON.stringify(plaPublic(this.pla, Date.now())), { headers: { "Content-Type": "application/json" } });
      if (path === "/pla-ingest") return this.plaIngest(request);
      if (path === "/pla-refresh") { const rep = await this.plaRefresh(true); return new Response(JSON.stringify({ ok: true, report: rep, ...plaPublic(this.pla, Date.now()) }), { headers: { "Content-Type": "application/json" } }); }
      if (path.startsWith("/cwa/")) return this.cwa(path.slice(5));
      if (path === "/cron") {
        const pla = await this.plaRefresh(false).catch((e) => "err:" + String((e && e.message) || e).slice(0, 80));
        const report = await this.runAlerts(); if (pla) report.pla = pla;
        report.mpb = this.mpbCheck(Date.now()); report.ais = this.collectorCheck(Date.now());
        this.cron = { at: Date.now(), report }; await this.ctx.storage.put("cron", this.cron); // heartbeat, visible in /api/ships -> cron
        return new Response(JSON.stringify(report), { headers: { "Content-Type": "application/json" } });
      }
      let body = {}; try { body = await request.json(); } catch { /* none */ }
      if (path === "/subscribe") return this.subscribe(body);
      if (path === "/unsubscribe") return this.unsubscribe(body);
      if (path === "/test") return this.testPush(body);
    } catch (e) { return new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 500 }); }
    return new Response("{}", { status: 404 });
  }


  /* ---- CGA RSS (30 min cache, stale on failure) ---- */
  async cga() {
    const c = this.cgaCache, now = Date.now(), ok = (b) => new Response(b, { headers: { "Content-Type": "application/json" } });
    if (c && now - c.at < 1800000) return ok(c.body);
    try {
      const body = JSON.stringify(await fetchCga(fetch, this.env.CGA_URL || undefined));
      this.cgaCache = { at: now, body }; return ok(body);
    } catch (e) {
      if (c) return ok(c.body);
      return new Response(JSON.stringify({ error: String((e && e.message) || e).slice(0, 160) }), { status: 502, headers: { "Content-Type": "application/json" } });
    }
  }

  /* ---- CWA (needs secret CWA_API_KEY; the front Worker only routes here when it is set) ---- */
  async cwaIngest(request) {
    let b; try { b = await request.json(); } catch { return new Response(JSON.stringify({ error: "bad json" }), { status: 400 }); }
    const d = (b && b.cwa) || {}, now = Date.now(), got = [];
    const lim = { quakes: ["quakes", 100], typhoon: ["typhoons", 10], warnings: ["warnings", 60] };
    const ing = (await this.ctx.storage.get("cwaIngest")) || {};
    for (const [kind, [field, max]] of Object.entries(lim)) {
      const v = d[kind]; if (!v || v.source !== "cwa" || !Array.isArray(v[field])) continue;
      ing[kind] = { at: now, body: JSON.stringify({ enabled: true, source: "cwa", attribution: String(v.attribution || "").slice(0, 80), time: now, via: "collector", [field]: v[field].slice(0, max) }) };
      got.push(kind);
    }
    if (got.length) { this.cwaIng = ing; this.collectorAt = now; await this.ctx.storage.put({ cwaIngest: ing, collectorAt: now }); this.cwaCache = {}; }
    return new Response(JSON.stringify({ ok: true, stored: got }), { headers: { "Content-Type": "application/json" } });
  }

  async cwa(kind) {
    const ttl = { quakes: 60000, typhoon: 300000, warnings: 120000 }[kind];
    if (!ttl) return new Response("{}", { status: 404 });
    const J = (b, status = 200) => new Response(b, { status, headers: { "Content-Type": "application/json" } });
    if (!this.cwaIng) this.cwaIng = (await this.ctx.storage.get("cwaIngest")) || {};
    const ing = this.cwaIng[kind], now = Date.now();
    if (ing && now - ing.at < 20 * 60000) return J(ing.body); // fresh data posted by the collector
    if (!this.env.CWA_API_KEY) return ing ? J(ing.body) : J(JSON.stringify({ enabled: false, source: "usgs", reason: "no CWA data (CWA_API_KEY not configured)" }));
    this.cwaCache = this.cwaCache || {};
    const c = this.cwaCache[kind];
    if (c && now - c.at < ttl) return J(c.body);
    try { // direct fetch (works only from IPs CWA's WAF accepts; Cloudflare's egress IPs are currently rejected, hence the collector path above)
      const body = JSON.stringify(await cwaData(this.env, kind));
      this.cwaCache[kind] = { at: now, body };
      return J(body);
    } catch (e) {
      const stale = (ing && ing.body) || (c && c.body); // stale beats nothing
      if (stale) return J(stale);
      return J(JSON.stringify({ enabled: true, source: "cwa", error: String((e && e.message) || e).slice(0, 200) }), 502);
    }
  }

  async alarm() { await this.collect(); }

  async ingest(request) {
    let body; try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: "bad json" }), { status: 400 }); }
    const msgs = Array.isArray(body && body.messages) ? body.messages.slice(0, 8000) : [];
    const mpb = Array.isArray(body && body.ships) ? body.ships.slice(0, 8000) : []; // pre-normalised MPB (Taiwan AIS) records from the collector
    const now = Date.now(); let n = 0, m = 0;
    if (Array.isArray(body && body.messages)) { this.collectorAt = now; await this.ctx.storage.put("collectorAt", now); if (msgs.length) { this.aisAt = now; await this.ctx.storage.put("aisAt", now); } } // GitHub Actions collector heartbeat / aisstream freshness
    for (const x of msgs) if (applyAis(this.ships, x, now)) n++;
    for (const x of mpb) if (applyMpb(this.ships, x, now)) m++;
    for (const k of Object.keys(this.ships)) if (!this.ships[k].t || now - this.ships[k].t > KEEP_MS) delete this.ships[k];
    const dropped = trimShips(this.ships);
    await this.rememberCcg(now);
    this.lastCollect = now; this.lastError = ""; this.everCollected = true;
    this.diag = { source: "ingest", msgs: msgs.length, applied: n, mpb: mpb.length, mpbApplied: m, dropped, at: now };
    if (mpb.length) { this.mpbAt = now; await this.ctx.storage.put("mpbAt", now); }
    await this.ctx.storage.put({ ships: this.ships, lastCollect: this.lastCollect, lastError: "", diag: this.diag });
    return new Response(JSON.stringify({ ok: true, received: msgs.length, applied: n, mpb: m, tracked: Object.keys(this.ships).length }), { headers: { "Content-Type": "application/json" } });
  }

  /** raw MPB GeoJSON from mpb-fetcher -> normalise here (DO has the CPU) -> same path as the pre-normalised ingest */
  async ingestMpbRaw(request) {
    const J = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json" } });
    let gj; try { gj = await request.json(); } catch { return J({ error: "bad json (MPB body is not JSON — Referer rejected / IP blocked?)" }, 502); }
    const c = normalizeMpbCollection(gj);
    if (!c.features) return J({ error: "MPB returned no features (Referer rejected / IP blocked?)", features: 0 }, 502);
    if (!c.ships.length) return J({ error: "MPB: 0 ships in Taiwan box", features: c.features }, 502);
    const r = await this.ingest(new Request("https://hub/ingest", { method: "POST", body: JSON.stringify({ ships: c.ships }) }));
    const out = await r.json();
    return J({ ...out, features: c.features, ships: c.ships.length, newestRecord: new Date(c.newest).toISOString(), oldestRecord: new Date(c.oldest).toISOString() }, r.status);
  }

  /* ---- MPB freshness monitor (cron): exposes mpbAgeSec / stale flag and asks the placed fetcher to run when a cycle was missed ---- */
  mpbCheck(now) {
    const age = this.mpbAt ? Math.round((now - this.mpbAt) / 1000) : null, stale = age == null || age > MPB_STALE_SEC;
    const H = this.mpbHealth = this.mpbHealth || {};
    H.checkedAt = now; H.mpbAgeSec = age; H.stale = stale;
    if (stale) H.staleSince = H.staleSince || now; else H.staleSince = null;
    const needHeal = (age == null || age > MPB_HEAL_SEC) && now - ((this.mpbHeal && this.mpbHeal.at) || 0) > 240000;
    return { ageSec: age, stale, needHeal, staleSince: H.staleSince };
  }
  /* ---- GitHub Actions collector monitor: its cron is best-effort ("every 5 min" really runs every 40-75 min), so when a GH_DISPATCH_TOKEN secret exists the proxy cron triggers workflow_dispatch itself ---- */
  collectorCheck(now) {
    const age = this.collectorAt ? Math.round((now - this.collectorAt) / 1000) : null, stale = age == null || age > COLLECTOR_STALE_SEC, enabled = !!this.env.GH_DISPATCH_TOKEN;
    return { ageSec: age, aisAgeSec: this.aisAt ? Math.round((now - this.aisAt) / 1000) : null, stale, dispatchEnabled: enabled, needDispatch: enabled && stale && now - ((this.ghd && this.ghd.at) || 0) > GH_DISPATCH_MIN_MS, lastDispatch: this.ghd || null };
  }
  async healthResponse() {
    const now = Date.now(), h = this.mpbCheck(now), list = publicShips(this.ships, now, KEEP_MS);
    const bindings = { SUBS: !!this.env.SUBS, INTEL: !!this.env.INTEL, FETCHER: !!this.env.FETCHER, INGEST_TOKEN: !!this.env.INGEST_TOKEN }; // booleans only: a redeploy that drops a binding/secret shows up here
    const missing = Object.keys(bindings).filter((k) => !bindings[k]);
    const bad = list.length === 0 || h.stale || missing.length > 0;
    const body = { ok: !bad, time: now, bindings, missingBindings: missing, ships: { count: list.length, updatedAgeSec: this.lastCollect ? Math.round((now - this.lastCollect) / 1000) : null, mpbAgeSec: h.ageSec, mpbStale: h.stale, mpbStaleSinceSec: h.staleSince ? Math.round((now - h.staleSince) / 1000) : null, thresholdSec: MPB_STALE_SEC, selfHeal: this.mpbHeal || null }, collector: (({ ageSec, aisAgeSec, stale, dispatchEnabled, lastDispatch }) => ({ ageSec, aisAgeSec, stale, dispatchEnabled, lastDispatch }))(this.collectorCheck(now)), cron: this.cron || null };
    return new Response(JSON.stringify(body), { status: bad ? 503 : 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  }

  /* ---- remembered CCG MMSIs (KV `ccg:known`): a hull seen once with a CCG name stays "suspected CCG" even when it later broadcasts another/blank name ---- */
  async loadKnown() {
    this.known = {}; this.knownDirty = false; this.knownWrote = 0;
    if (!this.env.SUBS) return;
    try { this.known = (await this.env.SUBS.get("ccg:known", "json")) || {}; } catch { this.known = {}; }
  }
  markKnown() { for (const s of Object.values(this.ships)) { if (this.known[s.mmsi]) s.known = true; else delete s.known; } }
  async rememberCcg(now) {
    if (!this.env.SUBS) return;
    for (const s of Object.values(this.ships)) {
      if (ccgWhy({ ...s, known: false }) !== "name") { if (this.known[s.mmsi]) s.known = true; continue; }
      const k = this.known[s.mmsi];
      if (!k || now - k.t > 3 * 86400000 || (s.name && k.n !== s.name.slice(0, 30))) { this.known[s.mmsi] = { n: (s.name || "").slice(0, 30), t: now }; this.knownDirty = true; }
      s.known = true;
    }
    if (this.knownDirty && now - this.knownWrote > 5 * 60000) { // KV writes are scarce on the free plan: at most one per 5 min, only when something new / stale-by-3-days was seen
      const keys = Object.keys(this.known);
      for (const m of keys) if (now - this.known[m].t > 180 * 86400000) delete this.known[m];
      const left = Object.keys(this.known); if (left.length > 400) for (const m of left.sort((a, b) => this.known[a].t - this.known[b].t).slice(0, left.length - 400)) delete this.known[m];
      try { await this.env.SUBS.put("ccg:known", JSON.stringify(this.known)); this.knownDirty = false; this.knownWrote = now; } catch { /* retry on the next ingest */ }
    }
  }

  /* ---- multi-source earthquakes (every cron tick, own invocation) ---- */
  storeCwa(kind, obj, now) {
    const ing = this.cwaIng || {}; this.cwaIng = ing;
    const body = { ...obj, via: "s3" }; if (kind === "quakes" && Array.isArray(body.quakes)) body.quakes = body.quakes.slice(0, 100);
    ing[kind] = { at: now, body: JSON.stringify(body) }; this.cwaCache = {}; this._cwaParsed = null; this._qlive = null;
  }
  async quakeCron() {
    if (this.qkBusy) return { busy: true };
    this.qkBusy = true; const now = Date.now(), Q = this.qk, rep = {};
    try {
      if (!this.cwaIng) this.cwaIng = (await this.ctx.storage.get("cwaIngest")) || {};
      const jobs = [];
      const urlSets = quakeUrlSets(now); // [Taiwan box, any magnitude] + [wide region (SCS / W Pacific / Japan), M4.5+]
      for (const src of ["USGS", "EMSC", "GFZ"]) jobs.push((async () => {
        const S = Q.src[src] = Q.src[src] || {}, t0 = Date.now(); S.at = now;
        const one = async (u) => {
          const r = await fetch(u, { headers: { Accept: "application/json, text/plain", "User-Agent": "gods-eye-view/1.0 (+https://numenaslan-cell.github.io/gods-eye-mobile/)" }, signal: AbortSignal.timeout(9000), cf: { cacheTtl: 0 } });
          if (r.status === 204) return [];
          if (!r.ok) throw new Error("HTTP " + r.status);
          return src === "GFZ" ? parseGfz(await r.text()) : (src === "USGS" ? parseUsgs : parseEmsc)(await r.json());
        };
        try {
          const res = await Promise.allSettled(urlSets.map((u) => one(u[src])));
          if (res[0].status === "rejected") throw res[0].reason; // the Taiwan query is the one that must work; a failing wide query only drops the outer region for this tick
          const list = mergeById(res.filter((x) => x.status === "fulfilled").map((x) => x.value), 220);
          Q.ev[src] = list; S.okAt = Date.now(); S.err = res[1].status === "rejected" ? "wide: " + String((res[1].reason && res[1].reason.message) || res[1].reason).slice(0, 80) : null; S.n = list.length; S.ms = Date.now() - t0; rep[src] = list.length;
        } catch (e) { S.err = String((e && e.message) || e).slice(0, 100); rep[src] = "err:" + S.err; }
      })());
      jobs.push(this.cwaCron(now, Q, rep));
      await Promise.all(jobs);
      for (const src of Object.keys(Q.ev)) for (const q of Q.ev[src]) if (!Q.fs[q.id]) Q.fs[q.id] = now;
      for (const k of Object.keys(Q.fs)) if (now - Q.fs[k] > 5 * 86400000) delete Q.fs[k];
      this._qlive = null;
      await this.ctx.storage.put({ qk: Q, cwaIngest: this.cwaIng });
    } finally { this.qkBusy = false; }
    return rep;
  }
  /** CWA from its public AWS S3 mirror (no key, no WAF; see cwas3.mjs) with conditional GETs every tick: quakes (felt + small-area zips), warnings + typhoon every ~4 min.
   *  The GitHub Actions REST ingest stays as the backup (same cwaIngest slot; newest write wins). */
  async cwaCron(now, Q, rep) {
    const S = Q.src.CWA = Q.src.CWA || {}; S.at = now; S.etags = S.etags || {};
    const ing = this.cwaIng = this.cwaIng || {}, t0 = Date.now();
    const touch = (kind) => { if (ing[kind]) { ing[kind] = { ...ing[kind], at: Date.now() }; this.cwaCache = {}; this._cwaParsed = null; this._qlive = null; } }; // "checked, nothing new"
    try {
      const [a, b] = await Promise.allSettled([s3Get("felt", S.etags.felt), s3Get("local", S.etags.local)]);
      if (a.status === "rejected" && b.status === "rejected") throw a.reason;
      const fresh = [], got = {}; let partial = null;
      for (const [r, key, kind] of [[a, "felt", "significant"], [b, "local", "local"]]) {
        if (r.status === "rejected") { partial = String(r.reason && r.reason.message || r.reason).slice(0, 100); continue; }
        if (r.value.status === 200) { fresh.push(...await parseQuakeZip(r.value.buf, kind)); got[key] = r.value.etag; }
      }
      if (Object.keys(got).length) {
        let prev = []; try { prev = ing.quakes ? JSON.parse(ing.quakes.body).quakes || [] : []; } catch { /* ignore */ }
        const list = mergeQuakes(fresh, prev).filter((q) => now - q.t < 8 * 86400000).slice(0, 100);
        this.storeCwa("quakes", { enabled: true, source: "cwa", attribution: "資料來源：交通部中央氣象署 (CWA Open Data)", time: Date.now(), quakes: list, partial: partial ? true : undefined }, Date.now());
        Object.assign(S.etags, got); S.changedAt = Date.now(); rep.CWA = "new:" + fresh.length;
      } else { touch("quakes"); rep.CWA = "unchanged"; }
      S.okAt = Date.now(); S.err = partial; S.ms = Date.now() - t0; S.via = "s3";
    } catch (e) { S.err = String((e && e.message) || e).slice(0, 160); rep.CWA = "err:" + S.err; }
    if (now - (S.extraAt || 0) > 4 * 60000) {
      S.extraAt = now;
      for (const [kind, key] of [["warnings", "warnings"], ["typhoon", "typhoon"]]) {
        try {
          const r = await s3Get(key, S.etags[key]);
          if (r.status === 304) { touch(kind); rep[kind] = "unchanged"; }
          else {
            const j = JSON.parse(new TextDecoder().decode(r.buf)), base = { enabled: true, source: "cwa", attribution: "資料來源：交通部中央氣象署 (CWA Open Data)", time: Date.now() };
            this.storeCwa(kind, kind === "warnings" ? { ...base, warnings: s3Warnings(j, Date.now()) } : { ...base, typhoons: s3Typhoons(j) }, Date.now());
            S.etags[key] = r.etag; rep[kind] = "new";
          }
          if (S.extraErr && S.extraErr.startsWith(kind)) S.extraErr = null;
        } catch (e) { S.extraErr = kind + ": " + String((e && e.message) || e).slice(0, 100); rep[kind] = "err"; }
      }
    }
  }
  /** merged list (sync, from memory): CWA (cron or GitHub ingest, whichever is newer) + USGS + EMSC + GFZ */
  mergedQuakes(now = Date.now()) {
    const ing = this.cwaIng && this.cwaIng.quakes; let cwa = [];
    if (ing) { if (!this._cwaParsed || this._cwaParsed.at !== ing.at) { let l = []; try { l = JSON.parse(ing.body).quakes || []; } catch { /* ignore */ } this._cwaParsed = { at: ing.at, list: l }; } cwa = this._cwaParsed.list; }
    return mergeQuakeSources({ CWA: cwa, USGS: this.qk.ev.USGS, EMSC: this.qk.ev.EMSC, GFZ: this.qk.ev.GFZ }, { now });
  }
  quakesLiveBody() {
    const now = Date.now();
    if (this._qlive && now - this._qlive.at < 10000) return this._qlive.body;
    const Q = this.qk, ing = this.cwaIng && this.cwaIng.quakes, sources = {};
    let via = null; try { via = ing ? JSON.parse(ing.body).via || "collector" : null; } catch { /* ignore */ }
    for (const src of ["USGS", "EMSC", "GFZ"]) { const S = Q.src[src] || {}; const lat = []; for (const q of Q.ev[src] || []) if (q.t > Q.since && Q.fs[q.id]) lat.push(Math.round((Q.fs[q.id] - q.t) / 60000)); lat.sort((a, b) => a - b); sources[src] = { okAt: S.okAt || null, err: S.err || null, n: S.n != null ? S.n : null, firstSeenLagMin: lat.length ? lat : undefined }; }
    sources.CWA = { okAt: ing ? ing.at : null, via, cronOkAt: (Q.src.CWA || {}).okAt || null, err: (Q.src.CWA || {}).err || null, extraErr: (Q.src.CWA || {}).extraErr || null };
    const okAts = Object.values(sources).map((x) => x.okAt || 0), merged = this.mergedQuakes(now).slice(0, 220);
    const body = JSON.stringify({ time: now, updated: Math.max(0, ...okAts), sources, count: merged.length, quakes: merged });
    this._qlive = { at: now, body }; return body;
  }

  /* ---- PLA-activity intel: MND daily + Japan Joint Staff (scraped by the Taiwan-placed `pla-intel` Worker, service binding INTEL) ---- */
  async plaIngest(request) {
    let b; try { b = await request.json(); } catch { return new Response(JSON.stringify({ error: "bad json" }), { status: 400 }); }
    const P = this.pla, got = { js: 0, mnd: 0 };
    const det = b && b.js && b.js.details;
    if (det && typeof det === "object") for (const [id, d] of Object.entries(det).slice(0, 40)) {
      if (!/^p\d{8}_\d{2}$/.test(id)) continue; const c = sanitizeJsDetail(d); if (c) { P.js.details[id] = c; got.js++; }
    }
    const days = b && b.mnd && b.mnd.days;
    if (Array.isArray(days)) for (const d of days.slice(0, 20)) { const c = sanitizeMndDay(d); if (c) { P.mnd.days[c.id] = c; if (!P.mnd.list.some((x) => x.id === c.id)) P.mnd.list.push({ id: c.id, date: c.date }); got.mnd++; } }
    P.mnd.list.sort((a, b) => (a.date < b.date ? 1 : -1)); P.mnd.list = P.mnd.list.slice(0, 30);
    this.plaPrune(); await this.ctx.storage.put("pla", P);
    return new Response(JSON.stringify({ ok: true, stored: got }), { headers: { "Content-Type": "application/json" } });
  }
  plaPrune() {
    const P = this.pla, keepMnd = new Set(P.mnd.list.map((x) => x.id)), keepJs = new Set(P.js.events.map((e) => e.id));
    for (const k of Object.keys(P.mnd.days)) if (!keepMnd.has(k)) delete P.mnd.days[k];
    for (const k of Object.keys(P.js.details)) if (!keepJs.has(k)) delete P.js.details[k];
  }
  async intel(path) {
    const r = await this.env.INTEL.fetch("https://intel" + path);
    let j = null; try { j = await r.json(); } catch { /* not json */ }
    if (!r.ok || !j || j.error) throw new Error((j && j.error) || "INTEL HTTP " + r.status);
    return j;
  }
  /** Throttled refresh: MND list every 20 min (+ up to 3 missing detail pages per run), Joint Staff index every 30 min. Errors are recorded, never thrown (other data keeps being served). */
  async plaRefresh(force) {
    if (!this.env.INTEL) return { skipped: "no INTEL binding" };
    if (this.plaBusy) return { busy: true };
    this.plaBusy = true; const now = Date.now(), P = this.pla, rep = {};
    try {
      const M = P.mnd;
      const missing = () => M.list.filter((l) => !M.days[l.id] && (M.fail || {})[l.id] !== 9).map((l) => l.id);
      if (force || now - (M.listAt || 0) > 20 * 60000 || missing().length) {
        try {
          if (force || now - (M.listAt || 0) > 20 * 60000) { const j = await this.intel("/mnd/list"); M.list = j.days.slice(0, 14).map((d) => ({ id: d.id, date: d.date })); M.listAt = now; rep.mndList = M.list.length; }
          M.fail = M.fail || {}; rep.mnd = [];
          for (const id of missing().slice(0, force ? 5 : 3)) {
            try { const j = await this.intel("/mnd/detail/" + id); const d = sanitizeMndDay(j.day); if (d) { M.days[id] = d; delete M.fail[id]; rep.mnd.push(id); } }
            catch (e) { M.fail[id] = Math.min(9, (M.fail[id] || 0) + 1); if (M.fail[id] >= 6) M.fail[id] = 9; M.err = "detail " + id + ": " + String((e && e.message) || e).slice(0, 100); rep.mndErr = M.err; }
          }
          if (!rep.mndErr) { M.err = null; M.okAt = now; }
          else if (rep.mnd.length) M.okAt = now;
        } catch (e) { M.err = String((e && e.message) || e).slice(0, 120); rep.mndErr = M.err; }
      }
      const J = P.js;
      if (force || now - (J.at || 0) > 30 * 60000) {
        J.at = now;
        try {
          const j = await this.intel("/js/index"); J.events = pruneJsEvents(j.events, now); J.err = null; J.okAt = now; rep.js = J.events.length;
        } catch (e) { J.err = String((e && e.message) || e).slice(0, 120); rep.jsErr = J.err; }
      }
      if (Object.keys(rep).length) { this.plaPrune(); await this.ctx.storage.put("pla", P); }
    } finally { this.plaBusy = false; }
    return rep;
  }

  /* ---- AIS ---- */
  async shipsResponse() {
    const now = Date.now(), age = now - this.lastCollect;
    if (!this.collecting && now - this.lastAttempt > STALE_MS && age > STALE_MS && !(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(now + 50);
    const list = publicShips(this.ships, now, KEEP_MS);
    const warming = !this.everCollected && !this.lastError;
    return new Response(JSON.stringify({ time: now, updated: this.lastCollect, ageSec: this.lastCollect ? Math.round(age / 1000) : null, collecting: this.collecting, warming, error: this.lastError || null, diag: this.diag || null, cron: this.cron || null, mpbAgeSec: this.mpbAt ? Math.round((now - this.mpbAt) / 1000) : null, aisAgeSec: this.aisAt ? Math.round((now - this.aisAt) / 1000) : null, collectorAgeSec: this.collectorAt ? Math.round((now - this.collectorAt) / 1000) : null, mpbStale: !this.mpbAt || now - this.mpbAt > MPB_STALE_SEC * 1000, count: list.length, total: list.total || list.length, ships: list }), { status: this.lastError && !list.length ? 502 : 200 });
  }

  /** Flights for the whole region: single-flight + 8 s memo, stale copy (<= 5 min) when every source fails. Runs here (30 s CPU) because 10 circles of adsb.lol JSON are too much for the 10 ms front Worker. */
  async flightsResponse() {
    const H = { "Content-Type": "application/json" }, now = Date.now(), F = this._fl;
    if (F && now - F.at < 8000) return new Response(F.body, { headers: H });
    if (!this._flP) this._flP = (async () => { try { const body = JSON.stringify(await collectFlights({ box: FLIGHT_BOX, openskyBase: UPSTREAM })); this._fl = { at: Date.now(), body }; return null; } catch (e) { return String((e && e.message) || e).slice(0, 300); } finally { this._flP = null; } })();
    const err = await this._flP;
    if (!err && this._fl) return new Response(this._fl.body, { headers: H });
    if (this._fl && Date.now() - this._fl.at < 300000) return new Response(this._fl.body, { headers: H });
    return new Response(JSON.stringify({ error: err || "flights unavailable" }), { status: 502, headers: H });
  }

  async collect(ms = COLLECT_MS) {
    if (this.collecting) return;
    this.collecting = true; this.lastAttempt = Date.now();
    let error = ""; const diag = { msgs: 0, confirmed: false, close: "", ms: 0 }, t0 = Date.now();
    try {
      const key = this.env.AISSTREAM_API_KEY;
      if (!key) throw new Error("AISSTREAM_API_KEY missing");
      const res = await fetch((this.env.AIS_URL || "https://stream.aisstream.io/v0/stream").replace(/^wss:/, "https:").replace(/^ws:/, "http:"), { headers: { Upgrade: "websocket" } });
      const ws = res.webSocket;
      if (!ws) throw new Error("websocket upgrade failed (HTTP " + res.status + ")");
      ws.accept();
      await new Promise((resolve) => {
        const done = () => { try { ws.close(1000, "done"); } catch { /* closed */ } resolve(); };
        const timer = setTimeout(done, ms);
        ws.addEventListener("message", (ev) => {
          let text; try { text = typeof ev.data === "string" ? ev.data : new TextDecoder().decode(ev.data); } catch { return; }
          let msg; try { msg = JSON.parse(text); } catch { return; }
          if (msg.error) { error = String(msg.error).slice(0, 120); clearTimeout(timer); done(); return; }
          diag.msgs++; if (msg.MessageType === "SubscriptionConfirmation") diag.confirmed = true;
          applyAis(this.ships, msg, Date.now());
        });
        ws.addEventListener("close", (ev) => { diag.close = ev.code + (ev.reason ? " " + String(ev.reason).slice(0, 60) : ""); clearTimeout(timer); resolve(); });
        ws.addEventListener("error", () => { error = error || "websocket error"; clearTimeout(timer); resolve(); });
        ws.send(JSON.stringify({ APIKey: key, BoundingBoxes: [[[AIS_BBOX.lamin, AIS_BBOX.lomin], [AIS_BBOX.lamax, AIS_BBOX.lomax]]], FilterMessageTypes: AIS_TYPES }));
      });
    } catch (e) { error = String((e && e.message) || e).slice(0, 160); }
    const now = Date.now();
    for (const k of Object.keys(this.ships)) if (!this.ships[k].t || now - this.ships[k].t > KEEP_MS) delete this.ships[k];
    diag.ms = now - t0; this.diag = diag;
    if (!error && !diag.confirmed) error = "aisstream dropped the connection before confirming the subscription (" + (diag.close || "no close code") + ")";
    this.lastError = error; this.everCollected = true;
    if (!error) this.lastCollect = now; else this.lastCollect = this.lastCollect || 0;
    await this.ctx.storage.put({ ships: this.ships, lastCollect: this.lastCollect, lastError: this.lastError, diag: this.diag });
    this.collecting = false;
  }

  /* ---- subscriptions (KV) ---- */
  async subId(endpoint) {
    const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(endpoint));
    return [...new Uint8Array(d)].slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async index() { return (await this.env.SUBS.get("subs:index", "json")) || []; }

  async subscribe(body) {
    const sub = body && body.subscription, prefs = (body && body.prefs) || {};
    const v = validateSubscription(sub, this.env.ALLOW_LOCAL_PUSH === "1"); // ALLOW_LOCAL_PUSH is for local tests only
    if (v) return jres({ error: v }, 400);
    const idx = await this.index(), id = await this.subId(sub.endpoint);
    if (!idx.includes(id) && idx.length >= MAX_SUBS) return jres({ error: "subscriber limit reached" }, 429);
    let loc = null;
    if (body.loc && isFinite(body.loc.lat) && isFinite(body.loc.lon) && Math.abs(body.loc.lat) <= 90 && Math.abs(body.loc.lon) <= 180)
      loc = { lat: Math.round(body.loc.lat * 100) / 100, lon: Math.round(body.loc.lon * 100) / 100 }; // ~1 km: coarse on purpose
    const rec = { endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth }, prefs: { quake: !!prefs.quake, ccg: !!prefs.ccg, iss: !!prefs.iss }, loc, created: Date.now() };
    await this.env.SUBS.put("sub:" + id, JSON.stringify(rec));
    if (!idx.includes(id)) { idx.push(id); await this.env.SUBS.put("subs:index", JSON.stringify(idx)); }
    return jres({ ok: true, id, prefs: rec.prefs, hasLoc: !!loc });
  }
  async unsubscribe(body) {
    const ep = body && body.endpoint; if (typeof ep !== "string") return jres({ error: "endpoint required" }, 400);
    await this.removeSub(await this.subId(ep));
    return jres({ ok: true });
  }
  async removeSub(id) {
    const idx = (await this.index()).filter((x) => x !== id);
    await this.env.SUBS.put("subs:index", JSON.stringify(idx));
    await this.env.SUBS.delete("sub:" + id);
    await this.ctx.storage.delete("iss:" + id);
  }
  async testPush(body) {
    const ep = body && body.endpoint; if (typeof ep !== "string") return jres({ error: "endpoint required" }, 400);
    const id = await this.subId(ep), rec = await this.env.SUBS.get("sub:" + id, "json");
    if (!rec) return jres({ error: "not subscribed" }, 404);
    const last = (await this.ctx.storage.get("test:" + id)) || 0;
    if (Date.now() - last < 30000) return jres({ error: "wait 30 s between tests" }, 429);
    await this.ctx.storage.put("test:" + id, Date.now());
    const r = await this.send(id, rec, { title: "God's Eye 測試通知", body: "推播已啟用 ✅ Push alerts are working.", tag: "test", url: SITE });
    return jres({ ok: r === "ok", result: r });
  }

  /* ---- Web Push ---- */
  async send(id, rec, payload, opts = {}) {
    try {
      const body = await encryptPayload(new TextEncoder().encode(JSON.stringify({ icon: SITE + "icons/icon-192.png", badge: SITE + "icons/icon-192.png", ...payload })), b64uDecode(rec.keys.p256dh), b64uDecode(rec.keys.auth));
      const aud = new URL(rec.endpoint).origin;
      const auth = await vapidAuthHeader(aud, this.env.VAPID_SUBJECT || SITE, this.env.VAPID_PUBLIC_KEY, this.env.VAPID_PRIVATE_KEY);
      const res = await fetch(rec.endpoint, { method: "POST", headers: { Authorization: auth, "Content-Encoding": "aes128gcm", "Content-Type": "application/octet-stream", TTL: String(opts.ttl || 600), Urgency: opts.urgency || "normal" }, body });
      if (res.status === 404 || res.status === 410) { await this.removeSub(id); return "gone"; }
      return res.status >= 200 && res.status < 300 ? "ok" : "http-" + res.status;
    } catch (e) { return "error:" + String((e && e.message) || e).slice(0, 80); }
  }

  /* ---- alerts (cron) ---- */
  async runAlerts() {
    if (!this.env.SUBS || !this.env.VAPID_PRIVATE_KEY || !this.env.VAPID_PUBLIC_KEY) return { skipped: "push not configured" };
    const idx = await this.index();
    if (!idx.length) return { subs: 0 };
    const subs = (await Promise.all(idx.map(async (id) => [id, await this.env.SUBS.get("sub:" + id, "json")]))).filter((x) => x[1]);
    const want = (k) => subs.filter(([, s]) => s.prefs && s.prefs[k]);
    const report = { subs: subs.length, sent: 0 };
    const push = async (list, payload, opts) => { for (const [id, s] of list.slice(0, 40)) { if ((await this.send(id, s, payload, opts)) === "ok") report.sent++; } };

    if (want("quake").length) report.quakes = await this.checkQuakes(want("quake"), push).catch((e) => "err:" + e.message);
    if (want("ccg").length) report.ccg = await this.checkCcg(want("ccg"), push).catch((e) => "err:" + e.message);
    if (want("iss").length) report.iss = await this.checkIss(want("iss").filter(([, s]) => s.loc), push).catch((e) => "err:" + e.message);
    return report;
  }

  async checkQuakes(list, push) {
    // merged CWA + USGS + EMSC + GFZ (dedupe by time/location, CWA preferred). The "seen" memory stores event fingerprints (not per-agency ids), so the same quake
    // reported first by EMSC and later by CWA never alerts twice. First run only seeds the memory (no alert burst after a deploy).
    const now = Date.now(), live = this.mergedQuakes(now);
    let seen = await this.ctx.storage.get("quakeSeen2"); const first = !seen; seen = (seen || []).filter((s) => now - s.t < 8 * 3600000);
    const cand = pickAlertQuakes(live, seen, now);
    if (first) { await this.ctx.storage.put("quakeSeen2", cand.map(fingerprint)); return "seeded " + cand.length; }
    for (const q of cand) {
      const far = isFarQuake(q), label = far ? "（" + q.srcs.join("+") + "）" : q.src === "CWA" ? "（中央氣象署）" : "（" + q.src + " 速報，氣象署報告可能稍後發布）";
      await push(list, { title: (far ? "🌏 區域強震 M" : "🌏 台灣周邊地震 M") + q.mag.toFixed(1) + label, body: (q.report || q.place) + " · 深度 " + Math.round(q.depthKm) + " km · 來源 " + q.srcs.join("+"), tag: "quake-" + Math.round(q.t / 300000), url: q.url || SITE }, { urgency: "high", ttl: 3600 });
      seen.push(fingerprint(q));
    }
    if (cand.length) await this.ctx.storage.put("quakeSeen2", seen.slice(-100));
    return cand.length;
  }

  async checkCcg(list, push) {
    if (!this.env.AISSTREAM_API_KEY && !this.env.INGEST_TOKEN) return "no AIS key";
    if (this.env.AISSTREAM_API_KEY && !this.collecting && Date.now() - this.lastCollect > STALE_MS && Date.now() - this.lastAttempt > STALE_MS) await this.collect();
    const now = Date.now(), seen = (await this.ctx.storage.get("ccgSeen")) || {};
    let n = 0;
    for (const s of Object.values(this.ships)) {
      if (!s.t || now - s.t > 15 * 60000 || !isCcg(s)) continue;
      if (s.lat < 20 || s.lat > 27.5 || s.lon < 116 || s.lon > 124.5) continue; // alert only near Taiwan (incl. Kinmen/Matsu/Pratas); the AIS box is wider
      if (seen[s.mmsi] && now - seen[s.mmsi] < 12 * 3600000) continue;
      await push(list, { title: "⚓ 中國海警船出現在台灣周邊 AIS", body: (s.name || "MMSI " + s.mmsi) + " · MMSI " + s.mmsi + " · " + s.lat.toFixed(2) + "N " + s.lon.toFixed(2) + "E" + (s.sog != null ? " · " + s.sog.toFixed(1) + " kn" : "") + "（依 AIS 名稱／型態推測，非官方確認）", tag: "ccg-" + s.mmsi, url: SITE + "?ship=" + s.mmsi }, { urgency: "high", ttl: 3600 });
      seen[s.mmsi] = now; n++;
    }
    for (const k of Object.keys(seen)) if (now - seen[k] > 24 * 3600000) delete seen[k];
    if (n) await this.ctx.storage.put("ccgSeen", seen);
    return n;
  }

  async issTle() {
    let t = await this.ctx.storage.get("issTle");
    if (!t || Date.now() - t.t > 6 * 3600000) {
      try {
        const r = await fetch(this.env.CELESTRAK_URL || "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=tle");
        const lines = (await r.text()).split(/\r?\n/).filter(Boolean);
        const i = lines.findIndex((l) => l.startsWith("1 "));
        if (r.ok && i >= 0) { t = { t: Date.now(), l1: lines[i], l2: lines[i + 1] }; await this.ctx.storage.put("issTle", t); }
      } catch { /* keep the old one */ }
    }
    return t && Date.now() - t.t < 4 * 86400000 ? t : null;
  }

  async checkIss(list, push) {
    if (!list.length) return 0;
    const tle = await this.issTle(); if (!tle) return "no TLE";
    const rec = satellite.twoline2satrec(tle.l1, tle.l2), P = createPasses(satellite), now = Date.now();
    const cache = {}; let n = 0;
    for (const [id, s] of list) {
      const key = Math.round(s.loc.lat * 4) + "," + Math.round(s.loc.lon * 4); // 0.25 deg cells share one computation
      if (!(key in cache)) {
        const ps = P.findPasses(rec, { lat: s.loc.lat, lon: s.loc.lon, heightKm: 0.02 }, new Date(now), 0.5, { minEl: 15, stepSec: 20 });
        cache[key] = ps.find((p) => !p.ongoing && p.start.getTime() - now > 60000 && p.start.getTime() - now <= 7 * 60000) || null;
      }
      const p = cache[key]; if (!p) continue;
      const stamp = Math.round(p.start.getTime() / 60000);
      if ((await this.ctx.storage.get("iss:" + id)) === stamp) continue;
      await this.ctx.storage.put("iss:" + id, stamp);
      const mins = Math.max(1, Math.round((p.start.getTime() - now) / 60000));
      const t = p.start.toLocaleTimeString("zh-TW", { timeZone: "Asia/Taipei", hour12: false, hour: "2-digit", minute: "2-digit" });
      const r = await this.send(id, s, { title: "🛰️ ISS 約 " + mins + " 分鐘後過境", body: t + " 從" + P.compass(p.startAz) + "方升起 → 最高 " + Math.round(p.maxEl) + "° → " + P.compass(p.endAz) + "方落下 · " + (p.visible ? "肉眼可能看得到" : "天色／日照條件不佳，可能看不到"), tag: "iss-" + stamp, url: SITE + "?pass=iss" }, { urgency: "high", ttl: 600 });
      if (r === "ok") n++;
    }
    return n;
  }
}

/* ------------------------------------------------------------------ helpers (exported for tests) */
function jres(obj, status = 200) { return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } }); }

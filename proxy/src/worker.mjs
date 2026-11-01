/**
 * God's Eye View // ORB-7 — Cloudflare Worker (free plan).
 *
 *   GET  /api/flights      flights around Taiwan: adsb.lol -> adsb.fi -> OpenSky, normalised, 10 s Cache API
 *   GET  /api/states/all   OpenSky CORS proxy (10 s edge cache; legacy route, kept as the client's fallback)
 *   GET  /api/ships        AIS ships around Taiwan, relayed + aggregated from aisstream.io (key stays a Worker secret)
 *   GET  /api/push/config  { enabled, publicKey }  (VAPID public key for the browser)
 *   GET  /api/quakes | /api/typhoon | /api/warnings   CWA open data (secret CWA_API_KEY); {enabled:false} -> client falls back to USGS
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
import { applyAis, applyMpb, trimShips, publicShips, isCcg, AIS_BBOX, AIS_TYPES } from "./ais.mjs";
import { validateSubscription, selectQuakes } from "./logic.mjs";
import { collectFlights, FLIGHT_BOX } from "./flights.mjs";
import { cwaData } from "./cwa.mjs";

const UPSTREAM = "https://opensky-network.org/api";
const SITE = "https://numenaslan-cell.github.io/gods-eye-mobile/";
const ALLOWED_ORIGINS = ["https://numenaslan-cell.github.io"];
const LOCAL_RE = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const originOk = (o) => ALLOWED_ORIGINS.includes(o) || LOCAL_RE.test(o);
const MAX_SUBS = 200;
const COLLECT_MS = 25000, STALE_MS = 90000, KEEP_MS = 30 * 60000;

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
      const num = (k, d) => { const v = parseFloat(url.searchParams.get(k)); return isFinite(v) ? Math.round(v * 10) / 10 : d; };
      const box = { lamin: num("lamin", FLIGHT_BOX.lamin), lomin: num("lomin", FLIGHT_BOX.lomin), lamax: num("lamax", FLIGHT_BOX.lamax), lomax: num("lomax", FLIGHT_BOX.lomax) };
      const cache = typeof caches !== "undefined" ? caches.default : null;
      const key = new Request(url.origin + "/api/flights?" + [box.lamin, box.lomin, box.lamax, box.lomax].join(","));
      let body = null;
      if (cache) { const hit = await cache.match(key); if (hit) body = await hit.text(); }
      if (body == null) {
        try { body = JSON.stringify(await collectFlights({ box, openskyBase: UPSTREAM })); }
        catch (e) { return json(cors, { error: String((e && e.message) || e).slice(0, 300) }, 502); }
        if (cache) { const put = cache.put(key, new Response(body, { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=10" } })); if (ctx && ctx.waitUntil) ctx.waitUntil(put); else await put; }
      }
      return new Response(body, { status: 200, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=10" }) });
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
    if (request.method === "GET" && /^\/api\/(quakes|typhoon|warnings)$/.test(p)) {
      if (!env.CWA_API_KEY || !hub) return json(cors, { enabled: false, source: "usgs", reason: "CWA_API_KEY not configured" }, 200, { "Cache-Control": "public, max-age=300" });
      const r = await hub.fetch("https://hub/cwa/" + p.slice("/api/".length)); // fetched + parsed inside the Durable Object (big JSON, 10 ms CPU on the free plan front Worker)
      return new Response(r.body, { status: r.status, headers: cors({ "Content-Type": "application/json", "Cache-Control": "public, max-age=60" }) });
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
    ctx.waitUntil(hub.fetch("https://hub/cron", { method: "POST" }).then((r) => r.text()).catch(() => {}));
  },
};

/* ----------------------------------------------------- Durable Object: AIS + alerts */
export class Hub {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env;
    this.ships = {}; this.lastCollect = 0; this.lastAttempt = 0; this.lastError = ""; this.collecting = false; this.everCollected = false;
    ctx.blockConcurrencyWhile(async () => {
      const s = await ctx.storage.get(["ships", "lastCollect", "lastError", "diag", "cron", "mpbAt"]); this.mpbAt = s.get("mpbAt") || 0; this.diag = s.get("diag") || null; this.cron = s.get("cron") || null;
      this.ships = s.get("ships") || {}; this.lastCollect = s.get("lastCollect") || 0; this.lastError = s.get("lastError") || "";
      this.everCollected = this.lastCollect > 0;
    });
  }

  async fetch(request) {
    const path = new URL(request.url).pathname;
    try {
      if (path === "/ships") return this.shipsResponse();
      if (path === "/ingest") return this.ingest(request);
      if (path.startsWith("/cwa/")) return this.cwa(path.slice(5));
      if (path === "/cron") {
        const report = await this.runAlerts();
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


  /* ---- CWA (needs secret CWA_API_KEY; the front Worker only routes here when it is set) ---- */
  async cwa(kind) {
    const ttl = { quakes: 60000, typhoon: 300000, warnings: 120000 }[kind];
    if (!ttl) return new Response("{}", { status: 404 });
    this.cwaCache = this.cwaCache || {};
    const c = this.cwaCache[kind], now = Date.now();
    if (c && now - c.at < ttl) return new Response(c.body, { headers: { "Content-Type": "application/json" } });
    try {
      const body = JSON.stringify(await cwaData(this.env, kind));
      this.cwaCache[kind] = { at: now, body };
      return new Response(body, { headers: { "Content-Type": "application/json" } });
    } catch (e) {
      if (c) return new Response(c.body, { headers: { "Content-Type": "application/json" } }); // serve stale on upstream failure
      return new Response(JSON.stringify({ enabled: true, source: "cwa", error: String((e && e.message) || e).slice(0, 160) }), { status: 502, headers: { "Content-Type": "application/json" } });
    }
  }

  async alarm() { await this.collect(); }

  async ingest(request) {
    let body; try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: "bad json" }), { status: 400 }); }
    const msgs = Array.isArray(body && body.messages) ? body.messages.slice(0, 5000) : [];
    const mpb = Array.isArray(body && body.ships) ? body.ships.slice(0, 8000) : []; // pre-normalised MPB (Taiwan AIS) records from the collector
    const now = Date.now(); let n = 0, m = 0;
    for (const x of msgs) if (applyAis(this.ships, x, now)) n++;
    for (const x of mpb) if (applyMpb(this.ships, x, now)) m++;
    for (const k of Object.keys(this.ships)) if (!this.ships[k].t || now - this.ships[k].t > KEEP_MS) delete this.ships[k];
    const dropped = trimShips(this.ships);
    this.lastCollect = now; this.lastError = ""; this.everCollected = true;
    this.diag = { source: "ingest", msgs: msgs.length, applied: n, mpb: mpb.length, mpbApplied: m, dropped, at: now };
    if (mpb.length) { this.mpbAt = now; await this.ctx.storage.put("mpbAt", now); }
    await this.ctx.storage.put({ ships: this.ships, lastCollect: this.lastCollect, lastError: "", diag: this.diag });
    return new Response(JSON.stringify({ ok: true, received: msgs.length, applied: n, mpb: m, tracked: Object.keys(this.ships).length }), { headers: { "Content-Type": "application/json" } });
  }

  /* ---- AIS ---- */
  async shipsResponse() {
    const now = Date.now(), age = now - this.lastCollect;
    if (!this.collecting && now - this.lastAttempt > STALE_MS && age > STALE_MS && !(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(now + 50);
    const list = publicShips(this.ships, now, KEEP_MS);
    const warming = !this.everCollected && !this.lastError;
    return new Response(JSON.stringify({ time: now, updated: this.lastCollect, ageSec: this.lastCollect ? Math.round(age / 1000) : null, collecting: this.collecting, warming, error: this.lastError || null, diag: this.diag || null, cron: this.cron || null, mpbAgeSec: this.mpbAt ? Math.round((now - this.mpbAt) / 1000) : null, count: list.length, total: list.total || list.length, ships: list }), { status: this.lastError && !list.length ? 502 : 200 });
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
    if (this.env.CWA_API_KEY) { // CWA felt-earthquake reports (E-A0015-001) when the user's own key is configured; USGS otherwise / on failure
      try { return await this.checkQuakesCwa(list, push); } catch (e) { /* fall through to USGS */ }
    }
    const res = await fetch(this.env.USGS_URL || "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson", { cf: { cacheTtl: 60, cacheEverything: true } });
    if (!res.ok) throw new Error("USGS HTTP " + res.status);
    const seen = (await this.ctx.storage.get("quakeSeen")) || [];
    const fresh = selectQuakes((await res.json()).features || [], seen, Date.now());
    for (const q of fresh) {
      const when = new Date(q.time).toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false, month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
      await push(list, { title: "🌏 台灣周邊地震 M" + q.mag.toFixed(1), body: q.place + " · 深度 " + Math.round(q.depth) + " km · " + when + "（台北時間）", tag: "quake-" + q.id, url: q.url || SITE }, { urgency: "high", ttl: 3600 });
      seen.push(q.id);
    }
    if (fresh.length) await this.ctx.storage.put("quakeSeen", seen.slice(-100));
    return fresh.length;
  }

  async checkQuakesCwa(list, push) {
    const d = JSON.parse(await (await this.cwa("quakes")).text());
    if (!d.quakes) throw new Error(d.error || "cwa unavailable");
    const seen = (await this.ctx.storage.get("quakeSeen")) || [], now = Date.now();
    let n = 0;
    for (const q of d.quakes) {
      if (q.mag < 4.5 || now - q.t > 6 * 3600000 || seen.includes(q.id)) continue; // same M4.5+ / 6 h rule as the USGS path
      await push(list, { title: "🌏 台灣地震 M" + q.mag.toFixed(1) + "（中央氣象署）", body: (q.report || q.place) + " · 深度 " + Math.round(q.depthKm) + " km", tag: "quake-" + q.id, url: q.url || SITE }, { urgency: "high", ttl: 3600 });
      seen.push(q.id); n++;
    }
    if (n) await this.ctx.storage.put("quakeSeen", seen.slice(-100));
    return n;
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

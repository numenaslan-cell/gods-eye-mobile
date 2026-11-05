#!/usr/bin/env node
// One-shot collector for God's Eye View — run by .github/workflows/collector.yml every ~5 min (replaces the always-on scripts/ais-collector.mjs).
// Fetches Taiwan MPB AIS and CWA open data once, optionally listens to aisstream for AIS_SEC seconds, POSTs everything to the Worker ingest
// routes, then verifies the Worker now reports fresh data. Exits non-zero (=> the workflow run fails loudly) when MPB yields 0 ships,
// CWA yields nothing, any ingest answers non-2xx, or the Worker timestamps did not advance. aisstream is best-effort (it blocks many cloud IPs).
//
//   INGEST_TOKEN=… CWA_API_KEY=… [AISSTREAM_API_KEY=…] [AIS_SEC=60] [WORKER_URL=https://gods-eye-opensky-proxy.numenaslan.workers.dev] node scripts/collect-once.mjs
// Needs Node >= 22 (global WebSocket). Keys come from the environment only and are never logged.
import { normalizeMpb } from "../proxy/src/ais.mjs";
import { cwaData } from "../proxy/src/cwa.mjs";
import { appendFileSync } from "node:fs";

const TOKEN = (process.env.INGEST_TOKEN || "").trim(), CWA_KEY = (process.env.CWA_API_KEY || "").trim(), AIS_KEY = (process.env.AISSTREAM_API_KEY || "").trim();
const WORKER = ((process.env.WORKER_URL || "").trim() || "https://gods-eye-opensky-proxy.numenaslan.workers.dev").replace(/\/+$/, "");
const AIS_SEC = process.env.AIS_SEC === undefined ? 60 : +process.env.AIS_SEC;
const MPB_URL = process.env.MPB_URL || "https://mpbais.motcmpb.gov.tw/aismpb/tools/geojsonais.ashx";
const MB = (process.env.MPB_BBOX || "19,116,28,126").split(",").map(Number), MPB_BOX = { lamin: MB[0], lomin: MB[1], lamax: MB[2], lomax: MB[3] };
const BB = (process.env.BBOX || "0,105,45,145").split(",").map(Number); // fallback single box (lamin,lomin,lamax,lomax)
const CORE = (process.env.CORE_BBOX || "18,114,29,128").split(",").map(Number); // Taiwan core: preferred when the upload is capped
// Multiple aisstream boxes (semicolon-separated lamin,lomin,lamax,lomax). A single huge box under-samples the Yellow Sea / Bohai; split boxes pull traffic from each region.
const BOXES = (process.env.AIS_BOXES || "18,114,29,128;31,117,41,127;0,105,20,125;20,125,35,145;35,125,45,145").split(";").map((b) => b.split(",").map(Number)).filter((b) => b.length === 4 && b.every(Number.isFinite));
const YS = (process.env.YS_BBOX || "31,117,41,127").split(",").map(Number); // Yellow Sea + Bohai: reserved share of the upload cap
const MAX_MSGS = +(process.env.MAX_MSGS || 7500); // the Worker keeps at most 8000 messages per ingest
const TYPES = ["PositionReport", "StandardClassBPositionReport", "ExtendedClassBPositionReport", "ShipStaticData", "StaticDataReport"];
const log = (...a) => console.log(new Date().toISOString(), ...a);
const scrub = (s) => [TOKEN, CWA_KEY, AIS_KEY].filter(Boolean).reduce((t, k) => t.split(k).join("***"), String(s));
const errors = [], summary = {};
const fail = (m) => { errors.push(m); log("FAIL:", scrub(m)); };
if (!TOKEN) { console.error("INGEST_TOKEN is required"); process.exit(2); }

async function post(path, body, timeout = 60000) {
  const r = await fetch(WORKER + path, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + TOKEN }, body: JSON.stringify(body), signal: AbortSignal.timeout(timeout) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(path + " ingest HTTP " + r.status + " " + JSON.stringify(j));
  return j;
}
async function withRetry(fn, tries = 3) { let last; for (let i = 0; i < tries; i++) { try { return await fn(); } catch (e) { last = e; log("retry", i + 1, "->", scrub(e.message), e.cause ? "| cause: " + scrub((e.cause.code || "") + " " + (e.cause.message || e.cause)) : ""); await new Promise((r) => setTimeout(r, 3000 * (i + 1))); } } throw last; }

async function doMpb() {
  const ships = await withRetry(async () => {
    const r = await fetch(MPB_URL, { headers: { Referer: "https://mpbais.motcmpb.gov.tw/aismpb/", "User-Agent": "gods-eye-view/1.0 (+https://numenaslan-cell.github.io/gods-eye-mobile/)", Accept: "application/json" }, signal: AbortSignal.timeout(45000) });
    if (!r.ok) throw new Error("MPB HTTP " + r.status);
    const gj = await r.json(), feats = Array.isArray(gj.features) ? gj.features : [];
    if (!feats.length) throw new Error("MPB returned no features (Referer rejected / IP blocked?)");
    const by = new Map();
    for (const f of feats) { const x = normalizeMpb(f, MPB_BOX); if (x && (!by.has(x.mmsi) || by.get(x.mmsi).t < x.t)) by.set(x.mmsi, x); }
    summary.mpbFeatures = feats.length;
    return [...by.values()];
  });
  if (!ships.length) throw new Error("MPB: 0 ships in Taiwan box");
  const j = await withRetry(() => post("/api/ships/ingest", { ships }));
  summary.mpbShips = ships.length; summary.mpbIngest = j;
  log("mpb", summary.mpbFeatures, "features ->", ships.length, "ships ->", JSON.stringify(j));
}
async function doCwa() {
  if (!CWA_KEY) throw new Error("CWA_API_KEY not set");
  const out = {};
  for (const k of ["quakes", "typhoon", "warnings"]) { try { out[k] = await withRetry(() => cwaData({ CWA_API_KEY: CWA_KEY }, k), 2); } catch (e) { fail("cwa " + k + " failed: " + e.message); } }
  if (!Object.keys(out).length) throw new Error("all CWA datasets failed");
  const j = await withRetry(() => post("/api/cwa/ingest", { cwa: out }, 30000));
  summary.cwaStored = Object.keys(out); summary.cwaQuakes = ((out.quakes && out.quakes.quakes) || []).length; summary.cwaIngest = j;
  log("cwa ->", JSON.stringify(j), "quakes:", summary.cwaQuakes);
}
async function doAis() {
  if (!AIS_KEY || !(AIS_SEC > 0)) { log("aisstream skipped"); return; }
  const boxes = (BOXES.length ? BOXES : [BB]);
  const buf = new Map(); let total = 0, opened = false, confirmed = false, closed = "";
  const closes = [];
  // Listen per box sequentially so Yellow Sea / Bohai are not drowned by Japan/SCS traffic in one huge multiplexed subscription.
  const weights = boxes.map((b) => (b[0] === YS[0] && b[1] === YS[1] && b[2] === YS[2] && b[3] === YS[3] ? 2 : 1));
  const wSum = weights.reduce((a, b) => a + b, 0) || 1;
  for (let bi = 0; bi < boxes.length; bi++) {
    const box = boxes[bi], slice = Math.max(25, Math.floor(AIS_SEC * weights[bi] / wSum));
    const until = Date.now() + slice * 1000; let sessions = 0;
    log("aisstream box", bi + 1 + "/" + boxes.length, box.join(","), "for", slice + "s");
    while (Date.now() < until - 2000 && sessions < 3) {
      sessions++; closed = "";
      await new Promise((resolve) => {
        const ws = new WebSocket("wss://stream.aisstream.io/v0/stream");
        const done = () => { try { ws.close(); } catch { /* ignore */ } resolve(); };
        const timer = setTimeout(done, Math.max(1000, until - Date.now()));
        ws.onopen = () => {
          opened = true;
          ws.send(JSON.stringify({ APIKey: AIS_KEY, BoundingBoxes: [[[box[0], box[1]], [box[2], box[3]]]], FilterMessageTypes: TYPES }));
        };
        ws.onmessage = async (e) => {
          let m; try { m = JSON.parse(typeof e.data === "string" ? e.data : e.data.text ? await e.data.text() : Buffer.from(e.data).toString()); } catch { return; }
          if (m.error) { log("aisstream error:", scrub(m.error)); return; }
          if (m.MessageType === "SubscriptionConfirmation") { confirmed = true; return; }
          total++; const mm = m.MetaData && m.MetaData.MMSI; if (mm) buf.set(mm + ":" + m.MessageType, m);
        };
        ws.onclose = (e) => { closed = e.code + ""; clearTimeout(timer); resolve(); };
        ws.onerror = () => {};
      });
      closes.push((closed || "timer") + "@" + bi);
      if (Date.now() < until - 2000) await new Promise((r) => setTimeout(r, 1500 * sessions));
    }
  }
  closed = closes.join(",");
  summary.ais = { opened, confirmed, msgs: total, close: closed };
  if (!buf.size) { log("aisstream: no messages (opened", opened, "confirmed", confirmed, "close", closed + ") - best effort, not fatal"); return; }
  const lat = (m) => { const b = m.Message && m.Message[m.MessageType]; const v = b && b.Latitude != null ? b.Latitude : m.MetaData && (m.MetaData.latitude != null ? m.MetaData.latitude : m.MetaData.Latitude); return typeof v === "number" ? v : null; };
  const lon = (m) => { const b = m.Message && m.Message[m.MessageType]; const v = b && b.Longitude != null ? b.Longitude : m.MetaData && (m.MetaData.longitude != null ? m.MetaData.longitude : m.MetaData.Longitude); return typeof v === "number" ? v : null; };
  const inBox = (a, o, b) => a != null && o != null && a >= b[0] && a <= b[2] && o >= b[1] && o <= b[3];
  const pri = (m) => { const a = lat(m), o = lon(m); if (inBox(a, o, CORE)) return 0; if (inBox(a, o, YS)) return 1; return 2 + (a == null ? 1 : 0); };
  const SUS_NAME = /HAI ?JING|CHINA ?COAST ?GUARD|CCG ?\d{3,5}|PLA ?NAVY|PLAN[ -]?\d{2,4}|海警|海軍|海军|解放軍|解放军/i;
  const susSet = new Set();
  for (const m of buf.values()) {
    const mm = String((m.MetaData && m.MetaData.MMSI) || ""), st = m.Message && m.Message.ShipStaticData, nm = (st && st.Name) || (m.MetaData && m.MetaData.ShipName) || "";
    if (/^413875/.test(mm) || SUS_NAME.test(nm) || (st && st.Type === 35 && /^41[23]/.test(mm))) susSet.add(mm);
  }
  const priS = (m) => (susSet.has(String((m.MetaData && m.MetaData.MMSI) || "")) ? -2 : 0) + pri(m);
  let all = [...buf.values()]; const uniq = all.length;
  if (all.length > MAX_MSGS) {
    const ranked = all.map((m) => [priS(m), m]).sort((x, y) => x[0] - y[0]);
    const ysNeed = Math.min(Math.floor(MAX_MSGS * 0.25), ranked.filter((x) => inBox(lat(x[1]), lon(x[1]), YS)).length);
    const pick = new Set(ranked.filter((x) => inBox(lat(x[1]), lon(x[1]), YS)).slice(0, ysNeed).map((x) => x[1]));
    for (const [, m] of ranked) { if (pick.size >= MAX_MSGS) break; pick.add(m); }
    all = ranked.map((x) => x[1]).filter((m) => pick.has(m));
  }
  summary.ais.uniqueMsgs = uniq; summary.ais.suspects = susSet.size; summary.ais.sent = all.length;
  summary.ais.boxes = boxes.length;
  summary.ais.yellowSea = all.filter((m) => inBox(lat(m), lon(m), YS)).length;
  const j = await withRetry(() => post("/api/ships/ingest", { messages: all }));
  summary.ais.ingest = j; log("aisstream", total, "msgs ->", uniq, "unique ->", all.length, "sent (ys=" + summary.ais.yellowSea + ", boxes=" + boxes.length + ") ->", JSON.stringify(j));
}

async function verify() {
  const t0 = Date.now(), get = async (p) => (await fetch(WORKER + p, { signal: AbortSignal.timeout(30000), headers: { "Cache-Control": "no-cache" } })).json();
  const ships = await get("/api/ships?_=" + t0), q = await get("/api/quakes?_=" + t0);
  const shipAge = (Date.now() - ships.updated) / 1000, cwaAge = (Date.now() - q.time) / 1000;
  summary.worker = { shipsUpdatedAgeSec: Math.round(shipAge), shipsCount: ships.count, mpbAgeSec: ships.mpbAgeSec, cwaTimeAgeSec: Math.round(cwaAge), quakes: (q.quakes || []).length, via: q.via };
  log("worker freshness:", JSON.stringify(summary.worker));
  if (!(shipAge < 180)) fail("Worker /api/ships not fresh (updated " + Math.round(shipAge) + " s ago)");
  if (!(cwaAge < 180 + (AIS_SEC || 0))) fail("Worker /api/quakes not fresh (time " + Math.round(cwaAge) + " s ago)");
  if (!(ships.count > 0)) fail("Worker /api/ships returns 0 ships");
}

const tasks = [["cwa", doCwa], ["ais", doAis]];
if (process.env.MPB !== "0") tasks.unshift(["mpb", doMpb]); // MPB=0: skip MPB (mpbais.motcmpb.gov.tw times out from GitHub-hosted runners, see docs/DATA-SOURCES.md)
const res = await Promise.allSettled(tasks.map(([n, f]) => f().catch((e) => { if (n === "ais") { log("aisstream failed (non-fatal):", scrub(e.message)); summary.aisError = scrub(e.message); } else fail(n + ": " + e.message); })));
await verify().catch((e) => fail("verify: " + e.message));
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, "### Collector run " + new Date().toISOString() + "\n```json\n" + scrub(JSON.stringify({ summary, errors }, null, 1)) + "\n```\n");
}
if (errors.length) { console.error("::error::collector failed: " + scrub(errors.join(" | "))); process.exit(1); }
log("OK");

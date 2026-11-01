#!/usr/bin/env node
// AIS collector for God's Eye View — runs on a machine with a normal (non-datacenter) IP and relays aisstream.io data to the Worker.
//
// Why: aisstream.io drops WebSocket connections coming from Cloudflare / cloud egress IPs (close 1006, no confirmation), so the Worker cannot
// connect to it itself. This script connects instead and POSTs batches to  POST <WORKER>/api/ships/ingest  (Bearer INGEST_TOKEN).
//
//   AISSTREAM_API_KEY=...  INGEST_TOKEN=...  node scripts/ais-collector.mjs
//   optional: INGEST_URL (default https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/ships/ingest), FLUSH_SEC (30), BBOX="18,108,34,132"
//
// Second source (no key needed): Taiwan MPB AIS (交通部航港局 mpbais.motcmpb.gov.tw, undocumented GeoJSON, ~2.9 MB). It is fetched every MPB_SEC
// (default 120, minimum 90) seconds, trimmed to the Taiwan box (MPB_BBOX="19,116,28,126") and to the few fields the app needs, and POSTed as {ships:[…]}
// to the same ingest endpoint; the Worker merges it with the aisstream data by MMSI (fresher position wins, names / types are filled from either).
// Third source: Taiwan CWA open data (quakes E-A0015/E-A0016, typhoon W-C0034-005, warnings W-C0033-001). CWA's WAF rejects Cloudflare egress IPs
// ("Request Rejected"), so when CWA_API_KEY (the owner's own key) is set in the environment the collector fetches CWA every CWA_SEC (default 300, min 120) seconds,
// normalises it and POSTs {cwa:{quakes,typhoon,warnings}} to <INGEST_URL base>/api/cwa/ingest. The key is never sent to the Worker by this path or logged.
//   MPB=0               disable MPB          AISSTREAM_API_KEY unset  -> MPB only (no aisstream connection)
//
// Needs Node >= 22 (global WebSocket). Never commit the keys; pass them via the environment.
import { normalizeMpb } from "../proxy/src/ais.mjs";
import { cwaData } from "../proxy/src/cwa.mjs";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
const KEY = process.env.AISSTREAM_API_KEY;
let TOKEN = process.env.INGEST_TOKEN;
if (!TOKEN) { try { TOKEN = readFileSync(process.env.INGEST_TOKEN_FILE || homedir() + "/.config/gods-eye/ingest.token", "utf8").trim(); } catch { /* handled below */ } }
const MPB_ON = process.env.MPB !== "0", MPB_SEC = Math.max(90, +process.env.MPB_SEC || 120);
const MPB_URL = process.env.MPB_URL || "https://mpbais.motcmpb.gov.tw/aismpb/tools/geojsonais.ashx";
const MB = (process.env.MPB_BBOX || "19,116,28,126").split(",").map(Number), MPB_BOX = { lamin: MB[0], lomin: MB[1], lamax: MB[2], lomax: MB[3] };
const URL_ = process.env.INGEST_URL || "https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/ships/ingest";
const CWA_KEY = process.env.CWA_API_KEY, CWA_SEC = Math.max(120, +process.env.CWA_SEC || 300);
const CWA_INGEST = process.env.CWA_INGEST_URL || (process.env.INGEST_URL || "https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/ships/ingest").replace(/\/ships\/ingest$/, "/cwa/ingest");
const FLUSH = Math.max(10, +process.env.FLUSH_SEC || 30) * 1000;
const BB = (process.env.BBOX || "18,108,34,132").split(",").map(Number);
if (!TOKEN || (!KEY && !MPB_ON && !CWA_KEY)) { console.error("INGEST_TOKEN (or ~/.config/gods-eye/ingest.token) is required, plus AISSTREAM_API_KEY unless MPB is enabled"); process.exit(2); }
const TYPES = ["PositionReport", "StandardClassBPositionReport", "ExtendedClassBPositionReport", "ShipStaticData", "StaticDataReport"];
const log = (...a) => console.log(new Date().toISOString(), ...a);

let buf = new Map(), total = 0, backoff = 5000, ws = null, lastMsgAt = 0;
function connect() {
  ws = new WebSocket("wss://stream.aisstream.io/v0/stream");
  let opened = false;
  ws.onopen = () => { opened = true; ws.send(JSON.stringify({ APIKey: KEY, BoundingBoxes: [[[BB[0], BB[1]], [BB[2], BB[3]]]], FilterMessageTypes: TYPES })); };
  ws.onmessage = async (e) => {
    let m; try { m = JSON.parse(typeof e.data === "string" ? e.data : e.data.text ? await e.data.text() : Buffer.from(e.data).toString()); } catch { return; }
    if (m.error) { log("aisstream error:", String(m.error).split(KEY).join("***")); return; }
    if (m.MessageType === "SubscriptionConfirmation") { backoff = 5000; log("subscribed"); return; }
    lastMsgAt = Date.now(); total++;
    const mm = m.MetaData && m.MetaData.MMSI; if (!mm) return;
    buf.set(mm + ":" + m.MessageType, m); // keep only the latest message per vessel and type
  };
  ws.onclose = (e) => { log("closed", e.code, opened ? "" : "(never opened)"); setTimeout(connect, backoff); backoff = Math.min(backoff * 2, 60000); };
  ws.onerror = () => {};
}
async function flush() {
  if (!buf.size) return;
  const messages = [...buf.values()]; buf = new Map();
  try {
    const r = await fetch(URL_, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + TOKEN }, body: JSON.stringify({ messages }) });
    const j = await r.json().catch(() => ({}));
    log("flushed", messages.length, "->", r.status, JSON.stringify(j), "total msgs", total);
  } catch (err) { log("flush failed:", err.message); }
}
/* ---- MPB Taiwan AIS ---- */
let mpbFails = 0;
async function pollMpb() {
  let next = MPB_SEC * 1000;
  try {
    const r = await fetch(MPB_URL, { headers: { Referer: "https://mpbais.motcmpb.gov.tw/aismpb/", "User-Agent": "gods-eye-view/1.0 (+https://numenaslan-cell.github.io/gods-eye-mobile/)", Accept: "application/json" }, signal: AbortSignal.timeout(45000) });
    if (!r.ok) throw new Error("MPB HTTP " + r.status);
    const gj = await r.json(), feats = Array.isArray(gj.features) ? gj.features : [];
    if (!feats.length) throw new Error("MPB returned no features (Referer rejected?)");
    const byMmsi = new Map();
    for (const f of feats) { const x = normalizeMpb(f, MPB_BOX); if (x && (!byMmsi.has(x.mmsi) || byMmsi.get(x.mmsi).t < x.t)) byMmsi.set(x.mmsi, x); }
    const ships = [...byMmsi.values()];
    const pr = await fetch(URL_, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + TOKEN }, body: JSON.stringify({ ships }), signal: AbortSignal.timeout(60000) });
    const j = await pr.json().catch(() => ({}));
    log("mpb", feats.length, "features ->", ships.length, "ships in box ->", pr.status, JSON.stringify(j));
    if (!pr.ok) throw new Error("ingest HTTP " + pr.status);
    mpbFails = 0;
  } catch (err) { mpbFails++; next = Math.min(MPB_SEC * 1000 * 2 ** Math.min(mpbFails, 4), 15 * 60000); log("mpb failed (" + mpbFails + "):", err.message, "- retry in", Math.round(next / 1000), "s"); }
  setTimeout(pollMpb, next);
}
if (MPB_ON) pollMpb();

/* ---- Taiwan CWA open data (owner's key from the environment) ---- */
let cwaFails = 0;
async function pollCwa() {
  let next = CWA_SEC * 1000;
  try {
    const out = {};
    for (const k of ["quakes", "typhoon", "warnings"]) { try { out[k] = await cwaData({ CWA_API_KEY: CWA_KEY }, k); } catch (e) { log("cwa", k, "failed:", String(e.message).split(CWA_KEY).join("***")); } }
    if (!Object.keys(out).length) throw new Error("all CWA datasets failed");
    const r = await fetch(CWA_INGEST, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + TOKEN }, body: JSON.stringify({ cwa: out }), signal: AbortSignal.timeout(30000) });
    log("cwa ->", r.status, JSON.stringify(await r.json().catch(() => ({}))));
    if (!r.ok) throw new Error("cwa ingest HTTP " + r.status);
    cwaFails = 0;
  } catch (err) { cwaFails++; next = Math.min(CWA_SEC * 1000 * 2 ** Math.min(cwaFails, 3), 15 * 60000); log("cwa poll failed (" + cwaFails + "):", err.message, "- retry in", Math.round(next / 1000), "s"); }
  setTimeout(pollCwa, next);
}
if (CWA_KEY) pollCwa();
if (!KEY) log("AISSTREAM_API_KEY not set: no aisstream connection");

if (KEY) setInterval(flush, FLUSH);
setInterval(() => { if (ws && Date.now() - lastMsgAt > 5 * 60000 && ws.readyState === 1) { log("no data for 5 min, reconnecting"); ws.close(); } }, 60000);
if (KEY) connect();

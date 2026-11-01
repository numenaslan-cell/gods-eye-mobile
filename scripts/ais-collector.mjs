#!/usr/bin/env node
// AIS collector for God's Eye View — runs on a machine with a normal (non-datacenter) IP and relays aisstream.io data to the Worker.
//
// Why: aisstream.io drops WebSocket connections coming from Cloudflare / cloud egress IPs (close 1006, no confirmation), so the Worker cannot
// connect to it itself. This script connects instead and POSTs batches to  POST <WORKER>/api/ships/ingest  (Bearer INGEST_TOKEN).
//
//   AISSTREAM_API_KEY=...  INGEST_TOKEN=...  node scripts/ais-collector.mjs
//   optional: INGEST_URL (default https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/ships/ingest), FLUSH_SEC (30), BBOX="18,108,34,132"
//
// Needs Node >= 22 (global WebSocket). Never commit the keys; pass them via the environment.
const KEY = process.env.AISSTREAM_API_KEY, TOKEN = process.env.INGEST_TOKEN;
const URL_ = process.env.INGEST_URL || "https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/ships/ingest";
const FLUSH = Math.max(10, +process.env.FLUSH_SEC || 30) * 1000;
const BB = (process.env.BBOX || "18,108,34,132").split(",").map(Number);
if (!KEY || !TOKEN) { console.error("AISSTREAM_API_KEY and INGEST_TOKEN are required"); process.exit(2); }
const TYPES = ["PositionReport", "StandardClassBPositionReport", "ExtendedClassBPositionReport", "ShipStaticData", "StaticDataReport"];
const log = (...a) => console.log(new Date().toISOString(), ...a);

let buf = new Map(), total = 0, backoff = 5000, ws = null, lastMsgAt = 0;
function connect() {
  ws = new WebSocket("wss://stream.aisstream.io/v0/stream");
  let opened = false;
  ws.onopen = () => { opened = true; ws.send(JSON.stringify({ APIKey: KEY, BoundingBoxes: [[[BB[0], BB[1]], [BB[2], BB[3]]]], FilterMessageTypes: TYPES })); };
  ws.onmessage = async (e) => {
    let m; try { m = JSON.parse(typeof e.data === "string" ? e.data : e.data.text ? await e.data.text() : Buffer.from(e.data).toString()); } catch { return; }
    if (m.error) { log("aisstream error:", String(m.error).replace(KEY, "***")); return; }
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
setInterval(flush, FLUSH);
setInterval(() => { if (ws && Date.now() - lastMsgAt > 5 * 60000 && ws.readyState === 1) { log("no data for 5 min, reconnecting"); ws.close(); } }, 60000);
connect();

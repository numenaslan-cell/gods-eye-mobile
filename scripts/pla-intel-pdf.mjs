#!/usr/bin/env node
/**
 * GitHub Actions step (no box involved): make the Worker refresh its PLA intel, then add the parts that need `pdftotext`.
 *
 *  1. POST <WORKER_URL>/api/pla/refresh   -> the main Worker asks the Taiwan-placed `pla-intel` Worker (service binding) for the MND daily bulletins
 *                                            and the Japan Joint Staff release list (works from Cloudflare, not from a plain machine for MND).
 *  2. for each Joint Staff release that still lacks hull numbers (`needPdf`): download the PDF (directly from mod.go.jp; if the runner cannot reach it,
 *     through GET /api/pla/pdf/:id which is proxied by the placed Worker), run `pdftotext -layout`, parse it with proxy/src/intel.mjs (parseJsPdfText)
 *  3. POST <WORKER_URL>/api/pla/ingest {js:{details}}   (Bearer INGEST_TOKEN)
 *  4. verify GET /api/pla: Joint Staff index fresh (< 3 h), latest MND bulletin not older than yesterday (Taipei); exit 1 otherwise (red run + e-mail).
 *
 * env: INGEST_TOKEN (required), WORKER_URL (default https://gods-eye-opensky-proxy.numenaslan.workers.dev), MAX_PDF (default 12)
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseJsPdfText } from "../proxy/src/intel.mjs";

const base = (process.env.WORKER_URL || "https://gods-eye-opensky-proxy.numenaslan.workers.dev").replace(/\/+$/, "").replace(/\/api$/, "");
const token = process.env.INGEST_TOKEN;
if (!token) { console.error("INGEST_TOKEN missing"); process.exit(2); }
const auth = { Authorization: "Bearer " + token };
const maxPdf = +(process.env.MAX_PDF || 12);
let failed = 0; const fail = (m) => { failed++; console.log("::error::" + m); };
const tpe = (d = new Date()) => new Date(d.getTime() + 8 * 3600000).toISOString().slice(0, 10);

async function api(path, init = {}, ms = 45000) {
  const r = await fetch(base + path, { ...init, headers: { ...(init.headers || {}), ...auth }, signal: AbortSignal.timeout(ms) });
  return r;
}

// 1. refresh
let state = null;
try {
  const r = await api("/api/pla/refresh", { method: "POST", body: "{}", headers: { "Content-Type": "application/json" } }, 90000);
  const txt = await r.text(); if (!r.ok) throw new Error("HTTP " + r.status + " " + txt.slice(0, 200));
  state = JSON.parse(txt); console.log("refresh:", JSON.stringify(state.report), "errors:", JSON.stringify(state.errors));
} catch (e) { fail("refresh failed: " + (e && e.message)); }

// 2. PDFs
const need = ((state && state.needPdf) || []).slice(0, maxPdf), details = {}, via = { direct: 0, worker: 0 };
const dir = mkdtempSync(join(tmpdir(), "plapdf-"));
for (const id of need) {
  try {
    const url = `https://www.mod.go.jp/js/pdf/${id.slice(1, 5)}/${id}.pdf`;
    let buf = null;
    try { const r = await fetch(url, { headers: { "User-Agent": "gods-eye-view/1.0 (+https://numenaslan-cell.github.io/gods-eye-mobile/)" }, signal: AbortSignal.timeout(25000) }); if (r.ok) { buf = Buffer.from(await r.arrayBuffer()); via.direct++; } else console.log(id, "direct HTTP", r.status); }
    catch (e) { console.log(id, "direct failed:", e && e.message); }
    if (!buf) { const r = await api("/api/pla/pdf/" + id, {}, 40000); if (!r.ok) throw new Error("worker proxy HTTP " + r.status); buf = Buffer.from(await r.arrayBuffer()); via.worker++; }
    if (buf.length < 1000 || buf.slice(0, 4).toString() !== "%PDF") throw new Error("not a PDF (" + buf.length + " bytes)");
    const f = join(dir, id + ".pdf"); writeFileSync(f, buf);
    execFileSync("pdftotext", ["-layout", f, join(dir, id + ".txt")], { timeout: 30000 });
    const d = parseJsPdfText(readFileSync(join(dir, id + ".txt"), "utf8"));
    details[id] = d; console.log(id, "ships:", d.ships.map((s) => s.hull + (s.ship ? " " + s.ship : "")).join(", ") || "-", "| aircraft:", d.aircraft.join(",") || "-", "| seen:", d.seen || "-");
  } catch (e) { fail("PDF " + id + ": " + (e && e.message)); }
}
console.log("PDFs: wanted", need.length, "parsed", Object.keys(details).length, "via", JSON.stringify(via));

// 3. ingest
if (Object.keys(details).length) {
  try {
    const r = await api("/api/pla/ingest", { method: "POST", body: JSON.stringify({ js: { details } }), headers: { "Content-Type": "application/json" } });
    const t = await r.text(); console.log("ingest:", r.status, t.slice(0, 200)); if (!r.ok) fail("ingest HTTP " + r.status);
  } catch (e) { fail("ingest failed: " + (e && e.message)); }
}

// 4. verify
try {
  const r = await fetch(base + "/api/pla?_=" + Date.now(), { signal: AbortSignal.timeout(30000), headers: { "Cache-Control": "no-cache" } });
  const j = await r.json(); const now = Date.now();
  const latest = (j.mnd.days[0] || {}).date, yday = tpe(new Date(now - 86400000));
  console.log(`verify: MND days=${j.mnd.days.length} latest=${latest} (Taipei today ${tpe()}), JS events=${j.js.events.length} jsAge=${j.updated.js ? Math.round((now - j.updated.js) / 60000) + "m" : "never"}, needPdf=${j.needPdf.length}`);
  if (!j.updated.js || now - j.updated.js > 3 * 3600000) fail("Joint Staff index stale/never fetched (" + (j.errors.js || "no error recorded") + ")");
  if (!latest || latest < yday) fail("latest MND bulletin is " + latest + " (older than " + yday + "): " + (j.errors.mnd || "no error recorded"));
} catch (e) { fail("verify failed: " + (e && e.message)); }
process.exit(failed ? 1 : 0);

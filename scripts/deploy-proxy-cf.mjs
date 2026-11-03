#!/usr/bin/env node
// Prints the Cloudflare-MCP `execute` body (or run the PUT yourself) that deploys proxy/dist/worker.js with the COMPLETE binding list from
// proxy/deploy-metadata.json. Usage: node scripts/deploy-proxy-cf.mjs > /tmp/deploy-main.js   (then pass the file to the Cloudflare MCP `execute` tool)
import { readFileSync } from "node:fs";
const meta = JSON.parse(readFileSync(new URL("../proxy/deploy-metadata.json", import.meta.url), "utf8"));
for (const k of Object.keys(meta)) if (k.startsWith("_")) delete meta[k];
const code = readFileSync(new URL("../proxy/dist/worker.js", import.meta.url), "utf8");
process.stdout.write(`async () => {
  const code = ${JSON.stringify(code)};
  const metadata = ${JSON.stringify(meta)};
  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("worker.js", new Blob([code], { type: "application/javascript+module" }), "worker.js");
  const r = await cloudflare.request({ method: "PUT", path: \`/accounts/\${accountId}/workers/scripts/gods-eye-opensky-proxy\`, body: form });
  const st = await cloudflare.request({ method: "GET", path: \`/accounts/\${accountId}/workers/scripts/gods-eye-opensky-proxy/settings\` });
  const want = ${JSON.stringify(meta.bindings.map((b) => b.name))}, have = st.result.bindings.map((b) => b.name);
  return { modified: r.result && r.result.modified_on, bindings: st.result.bindings.map((b) => b.name + ":" + b.type), missing: want.filter((n) => !have.includes(n)) };
}
`);

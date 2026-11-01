# Deploying the Worker (AIS ships + Web Push alerts)

**Status: nothing in this file has been run.** The code is committed but *not* deployed; the live Worker
(`gods-eye-opensky-proxy`) is still the minimal OpenSky-only version, so the site shows DEMO ships until you do this.
Everything below stays on the **Cloudflare free plan** (no paid add-ons).

## What you need to provide (2 things)

| What | Where it comes from | Where it goes |
|---|---|---|
| **aisstream.io API key** | Sign in at <https://aisstream.io> with GitHub → *Account / API Keys* → create key (free) | Worker **secret** `AISSTREAM_API_KEY` |
| **VAPID key pair** (for Web Push) | Generate locally: `node scripts/gen-vapid.mjs` (no account needed) | private key → Worker **secret** `VAPID_PRIVATE_KEY`; public key → Worker **var** `VAPID_PUBLIC_KEY` |

The AIS key and the VAPID private key must never be committed or put in `assets/config.js`.
Without the AIS key: ships stay DEMO and the "CCG vessel" alert is inert (quake + ISS alerts still work).
Without VAPID keys: the Alerts tab shows "push not configured".

## Files / resources to deploy

1. **Script** `proxy/dist/worker.js` (ES module, built from `proxy/src/worker.mjs`) as script `gods-eye-opensky-proxy`.
   Rebuild after any source change:
   ```
   npx esbuild proxy/src/worker.mjs --bundle --format=esm --minify --target=es2022 --legal-comments=none --outfile=proxy/dist/worker.js
   node proxy/test/run.mjs      # 7 unit tests (RFC 8291 test vector, VAPID, AIS merge, CCG heuristic, quake filter, ...)
   ```
2. **Durable Object** class `Hub`, binding `HUB`, SQLite-backed (the free plan only allows SQLite DOs):
   migration `{"new_tag":"v1","new_sqlite_classes":["Hub"]}`.
3. **KV namespace** (e.g. `gods-eye-subs`) bound as `SUBS`.
4. **Secrets** `AISSTREAM_API_KEY`, `VAPID_PRIVATE_KEY`; **vars** `VAPID_PUBLIC_KEY`, optional `VAPID_SUBJECT` (`mailto:you@example.com`).
5. **Cron trigger** `*/2 * * * *` (free plan allows 5 crons per account).
6. Keep the `workers.dev` subdomain route enabled (the site calls `https://gods-eye-opensky-proxy.numenaslan.workers.dev/api`).

`proxy/worker.metadata.json` is the multipart `metadata` part for the upload call (fill in the two `<…>` placeholders).

### Via the Cloudflare API (what the connector's `execute` tool can do)
```
ACC=071deaac3442c40becead3de785e765d  NAME=gods-eye-opensky-proxy
POST /accounts/$ACC/storage/kv/namespaces                {"title":"gods-eye-subs"}          -> id
PUT  /accounts/$ACC/workers/scripts/$NAME                multipart: metadata=proxy/worker.metadata.json, worker.js=proxy/dist/worker.js (type application/javascript+module)
PUT  /accounts/$ACC/workers/scripts/$NAME/secrets        {"name":"AISSTREAM_API_KEY","text":"…","type":"secret_text"}
PUT  /accounts/$ACC/workers/scripts/$NAME/secrets        {"name":"VAPID_PRIVATE_KEY","text":"…","type":"secret_text"}
PUT  /accounts/$ACC/workers/scripts/$NAME/schedules      [{"cron":"*/2 * * * *"}]
```
(or with wrangler: `wrangler.toml` with `main="proxy/dist/worker.js"`, `[[durable_objects.bindings]] name="HUB" class_name="Hub"`,
`[[migrations]] tag="v1" new_sqlite_classes=["Hub"]`, `[[kv_namespaces]] binding="SUBS"`, `[triggers] crons=["*/2 * * * *"]`,
then `wrangler secret put AISSTREAM_API_KEY` / `VAPID_PRIVATE_KEY`.)

Then push the front-end commit to GitHub (Pages) — the service worker cache is `gods-eye-v2`, so clients pick up the new shell automatically.

## Smoke test after deploying
```
curl https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/push/config   # {"enabled":true,"publicKey":"B…","aisEnabled":true}
curl https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/ships         # {"warming":true,…} first, then ships after ~25 s
```
In the app: Alerts tab → enable → "Send test push". On iOS 16.4+ you must first *Share → Add to Home Screen* and open the app from the icon.

## How it works (free-plan design)
* `GET /api/ships` → front Worker → Durable Object `Hub` (singleton). If data is older than 90 s the DO opens an outbound WebSocket to
  `wss://stream.aisstream.io/v0/stream` for ~25 s (box `[[20,118],[27.5,124.5]]`, position + static messages), merges per MMSI, keeps 30 min.
  Heavy work runs in the DO (30 s CPU) so the Worker's 10 ms CPU limit is never an issue.
* Cron (every 2 min) only pokes the DO, which: fetches USGS `4.5_day.geojson` (new M4.5+ in the Taiwan box, ≤ 6 h old);
  if there are CCG subscribers, collects AIS and looks for a CCG-looking vessel (heuristic: name HAIJING / CHINA COAST GUARD / CCG nnnn / 海警,
  or ship type 55 with MMSI 412/413/414); computes the next ISS pass per subscriber location (0.25° cells, CelesTrak TLE cached 6 h) and pushes when it starts in 1–7 min.
  Dedupe state lives in DO storage, not KV.
* Web Push is hand-rolled on WebCrypto (RFC 8291 `aes128gcm` + RFC 8292 VAPID ES256), allow-listed push hosts only.
* Subscriptions: KV keys `sub:<id>` + `subs:index`; capped at 200. Only the push endpoint/keys, alert toggles and (for ISS only) a location rounded to 0.01° are stored. Expired endpoints (404/410) are deleted automatically.

## Free-plan limits to know
* KV: 1,000 writes/day (only subscribe/unsubscribe/cleanup write), 100k reads/day — fine for dozens of subscribers.
* Workers: 100k requests/day; DO: 100k requests/day, SQLite storage 5 GB; each ships request is cached 20 s at the edge.
* aisstream.io: max 3 concurrent connections per key, no SLA; terms of commercial use are unpublished — personal/portfolio use only unless they say otherwise.

## Test-only env overrides (never set in production)
`AIS_URL`, `USGS_URL`, `CELESTRAK_URL`, `ALLOW_LOCAL_PUSH` — used to run the Worker in local workerd against mocks.

## Not verified
Tested end-to-end only in local workerd against mocked aisstream / USGS / CelesTrak / push endpoints (the sandbox can't reach `*.workers.dev`,
and I have no aisstream key). Not yet tested against real aisstream data (vessel coverage near Taiwan, real CCG names/MMSI),
real FCM / Mozilla / Apple push services, or a real iPhone.

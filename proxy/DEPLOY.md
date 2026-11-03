# Deploying the Worker (AIS ships + Web Push alerts)

**Status (2026-11-01, Asia/Taipei): deployed** to account `071deaac3442c40becead3de785e765d` as `gods-eye-opensky-proxy`
(KV namespace `gods-eye-subs` = `b8a90c73b1a242a7b0b592c6624e9d8b`, Durable Object class `Hub` migration `v1`, cron `*/2 * * * *`).
Everything stays on the **Cloudflare free plan** (no paid add-ons).

> ### ⚠ aisstream.io drops connections from Cloudflare's IPs
> From the Worker/Durable Object, aisstream accepts the WebSocket upgrade and then closes it ~1–2 s later with code 1006 and no
> `SubscriptionConfirmation` (the same key + subscription works from a normal IP; this matches several open reports on
> github.com/aisstream/issues about datacenter IPs being dropped/throttled). So AIS is fed through a **collector on a non-datacenter IP**:
> `scripts/ais-collector.mjs` connects to aisstream and POSTs batches to `POST /api/ships/ingest` (Bearer `INGEST_TOKEN`, a Worker secret).
> The Worker itself still tries aisstream directly when no ingest data is fresh (harmless; it then reports the 1006 reason, and the site shows DEMO ships).
> ```
> AISSTREAM_API_KEY=… INGEST_TOKEN=… nohup node scripts/ais-collector.mjs >> ais-collector.log 2>&1 &    # Node >= 22
> ```
> Run it somewhere that stays on (home PC / Raspberry Pi / a VPS whose IP aisstream accepts). Ships stay in the Worker for 30 min after the collector stops.

## Earthquakes (CWA + USGS + EMSC + GFZ), typhoon, warnings — fresh every 2 minutes, no key, no local machine
The `*/2` cron calls the Hub's `/quake-cron` (its own invocation): it fetches USGS (FDSN geojson), EMSC (FDSN json) and GFZ (FDSN text) for 20–27.5°N 118–124.5°E, last 3 days, and **CWA's public S3 mirror**
`https://cwaopendata.s3.ap-northeast-1.amazonaws.com/` (`Earthquake/E-A0015-001.zip` + `E-A0016-001.zip` are zips of one XML per report — the Worker reads the zip central directory, inflates only the newest 5 entries and parses the XML with regexes;
`Warning/W-C0033-001.json`, `Warning/W-C0034-005.json` for warnings/typhoon every ~4 min). All S3 reads are conditional (`If-None-Match` → 304 = no work).
CWA's REST API (`opendata.cwa.gov.tw`) turns Cloudflare egress away with HTTP 200 + HTML "Request Rejected" even from a Worker placed in `gcp:asia-east1` (tested), so GitHub Actions (`CWA_API_KEY` secret, `scripts/collect-once.mjs`) remains the **backup**: its ingest writes the same `cwaIngest` slot (`POST /api/cwa/ingest`).
`GET /api/quakes/live` returns the merged, de-duplicated list (CWA authoritative; each quake carries `src`, `srcs[]`, `others[{src,mag}]`) plus per-source health (`sources.{USGS,EMSC,GFZ,CWA}.okAt|err|via`).
`GET /api/quakes|typhoon|warnings` still serve the CWA data as before (fresh for 20 min; the cron re-stamps it on every "nothing new" check).
Push quake alerts use the merged list and a per-event fingerprint (time/location), so one earthquake alerts once even if EMSC, USGS and CWA report it minutes apart. See `docs/DATA-SOURCES.md`.

## Second AIS source: Taiwan MPB (交通部航港局), no key
`scripts/ais-collector.mjs` also polls `https://mpbais.motcmpb.gov.tw/aismpb/tools/geojsonais.ashx` (needs `Referer: https://mpbais.motcmpb.gov.tw/aismpb/`, ~2.9 MB) every `MPB_SEC` (default 120 s, min 90 s),
trims it to 19–28°N 116–126°E and the needed fields, and POSTs `{ships:[…]}` to `/api/ships/ingest`; the Worker merges it with aisstream by MMSI. It is done in the collector, not the Worker, because of the free plan's 10 ms CPU limit.
The endpoint is undocumented and has no published licence — keep the polling rate low and attribute 交通部航港局.
`AISSTREAM_API_KEY` is optional for the collector now (MPB / CWA-only mode); the ingest token is read from `INGEST_TOKEN` or `~/.config/gods-eye/ingest.token`.

> **2026-11-03 update — MPB no longer needs a machine:** the `mpb-fetcher` Worker (`workers/mpb-fetcher/`, placed at `gcp:asia-east1`, service binding `PROXY` → this Worker, secret `INGEST_TOKEN`)
> fetches MPB and posts to `/api/ships/ingest`; GitHub Actions (`.github/workflows/collector.yml`) triggers it every 5 min. See `workers/mpb-fetcher/README.md`. `scripts/ais-collector.mjs` is only a manual fallback.

## PLA intel (MND daily + Japan Joint Staff) — `pla-intel` Worker, service binding `INTEL` (2026-11-03)
`workers/pla-intel/` (`placement.region = "gcp:asia-east1"`, **no secrets, workers.dev route disabled**) is the only thing that can read `mnd.gov.tw/news/plaact/<id>` (403 from every other egress); it also reads mod.go.jp.
The main Worker needs **one extra binding**: `{ "type": "service", "name": "INTEL", "service": "pla-intel", "environment": "production" }` (upload with `keep_bindings: ["secret_text"]` so the secrets survive; no migrations part when redeploying).
The Hub cron refreshes it (no extra cron). GitHub Actions `pla-intel.yml` (every 30 min, secrets `INGEST_TOKEN`, `WORKER_URL` already exist) adds PDF-derived hull numbers via `POST /api/pla/ingest`. Routes: `GET /api/pla`, Bearer: `POST /api/pla/refresh|ingest`, `GET /api/pla/pdf/:id`. Details: `workers/pla-intel/README.md`.
Also stored: KV key `ccg:known` (remembered CCG MMSIs). Deploy order: `pla-intel` first, then the main Worker.

## What you need to provide (2 things)

| What | Where it comes from | Where it goes |
|---|---|---|
| **aisstream.io API key** | Sign in at <https://aisstream.io> with GitHub → *Account / API Keys* → create key (free) | Worker **secret** `AISSTREAM_API_KEY` (and the collector's environment) |
| **Ingest token** | any random string (`head -c32 /dev/urandom \| od -An -tx1 \| tr -d ' \n'`) | Worker **secret** `INGEST_TOKEN` and the collector's environment |
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
4. **Secrets** `AISSTREAM_API_KEY`, `INGEST_TOKEN`, `VAPID_PRIVATE_KEY`; **vars** `VAPID_PUBLIC_KEY`, optional `VAPID_SUBJECT` (`mailto:you@example.com`).
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

## Monitoring
`GET /api/ships` includes `diag` (last AIS source/close reason) and `cron: {at, report}` — the cron heartbeat (`at` in ms since epoch, `report` = what the last run did, e.g. `{"subs":0}`).
Analytics: Cloudflare GraphQL `workersInvocationsAdaptive` / `durableObjectsInvocationsAdaptiveGroups` (`scheduled` events are not exposed in the `workersInvocationsScheduled` dataset for this plan, so use the heartbeat).

## Smoke test after deploying
```
curl https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/push/config   # {"enabled":true,"publicKey":"B…","aisEnabled":true}
curl https://gods-eye-opensky-proxy.numenaslan.workers.dev/api/ships         # {"warming":true,…} first, then ships after ~25 s
```
In the app: Alerts tab → enable → "Send test push". On iOS 16.4+ you must first *Share → Add to Home Screen* and open the app from the icon.

## How it works (free-plan design)
* `GET /api/ships` → front Worker → Durable Object `Hub` (singleton). If data is older than 90 s the DO opens an outbound WebSocket to
  `wss://stream.aisstream.io/v0/stream` for ~25 s (box 18–34°N 108–132°E: Taiwan **and neighbouring waters** — coverage inside Taiwan's own waters is almost empty on aisstream, 1 vessel / 2 min measured, while Hong Kong / S. China and Japan are well covered; position + static messages), merges per MMSI, keeps 30 min.
  Heavy work runs in the DO (30 s CPU) so the Worker's 10 ms CPU limit is never an issue.
* Cron (every 2 min) only pokes the DO, which: checks the merged quake list (new M4.5+ in the Taiwan box, ≤ 6 h old, not already alerted by fingerprint);
  if there are CCG subscribers, looks at the AIS vessels in the DO for a CCG-looking one inside 20–27.5°N 116–124.5°E (heuristic: name HAIJING / CHINA COAST GUARD / CCG nnnn / 海警,
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

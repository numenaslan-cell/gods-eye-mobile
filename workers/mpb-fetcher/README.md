# mpb-fetcher — Taiwan-placed Worker that feeds MPB AIS (~7,000 ships) into God's Eye View

`mpbais.motcmpb.gov.tw` (交通部航港局 MPB) only answers from Taiwan-routed networks: GitHub-hosted runners, a default Cloudflare Worker and 10 other regions
(Tokyo, Hong Kong, Singapore, US, Germany, UK, India, Indonesia, Vietnam — tested with check-host.net) all time out at connect.
A Cloudflare Worker with **`placement.region = "gcp:asia-east1"`** (Changhua, Taiwan) runs in a nearby Cloudflare data centre and the fetch works
(2026-11-03: unplaced Worker 3/3 timeouts after 20 s; placed Worker 6/6 HTTP 200, ~3 MB, 170–470 ms).

```
GitHub Actions cron (*/5)  ──POST /run (Bearer INGEST_TOKEN)──▶  mpb-fetcher  (placed, gcp:asia-east1)
                                                                      │  fetch MPB (Referer header), trim to 19–28°N 116–126°E, dedupe by MMSI
                                                                      └─ service binding PROXY ─▶ gods-eye-opensky-proxy  POST /api/ships/ingest  {ships:[…]}
```

* Placement only applies to a Worker's `fetch` handler (not `scheduled`), which is why a separate trigger (GitHub Actions) calls `POST /run`.
  A plain HTTP call between two workers.dev Workers of the same account fails with Cloudflare error 1042 — hence the service binding to the main Worker.
* `GET /health` → `{ok:true}` (no auth). `POST /run` → **200 only if MPB returned > 0 ships and the ingest answered 2xx**, otherwise 502 with an `error` field.
  Response example: `{"ok":true,"startedAt":"…Z","features":7972,"ships":7287,"newestRecord":"…Z","oldestRecord":"…Z","mpbMs":174,"ingestMs":1694,"ingest":{"ok":true,"mpb":7287,"tracked":4000},"totalMs":1868}`.
* Auth: `Authorization: Bearer <INGEST_TOKEN>` (the same secret as the main Worker; constant-time compare). Wrong/missing token → 401.
* The main Worker keeps at most 4,000 vessels (`trimShips`, ranked by interest then freshness) and serves ≤ 2,500 in `/api/ships`, so `tracked`/`count` are lower than `ships`.

## Build / deploy
```
npx esbuild workers/mpb-fetcher/src/index.mjs --bundle --format=esm --minify --target=es2022 --legal-comments=none --outfile=workers/mpb-fetcher/dist/worker.js
```
Upload `dist/worker.js` as script `mpb-fetcher` (multipart, `main_module: worker.js`, `compatibility_date: 2025-09-01`) with metadata
```json
{ "placement": { "region": "gcp:asia-east1" },
  "bindings": [ { "type": "service", "name": "PROXY", "service": "gods-eye-opensky-proxy", "environment": "production" },
                { "type": "secret_text", "name": "INGEST_TOKEN", "text": "<same value as the main Worker's INGEST_TOKEN>" } ] }
```
via `PUT /accounts/<id>/workers/scripts/mpb-fetcher`, then `POST …/scripts/mpb-fetcher/subdomain {"enabled":true}`. (`wrangler.toml` here mirrors this.)
Smoke test: `curl https://mpb-fetcher.numenaslan.workers.dev/health`; `curl -X POST -H "Authorization: Bearer $INGEST_TOKEN" https://mpb-fetcher.numenaslan.workers.dev/run`.

## Risks
MPB's endpoint is undocumented and geofenced; it could start rejecting Cloudflare ranges or the placement→data-centre mapping could change — the workflow then fails loudly (red run + e-mail).
Fallbacks: `scripts/ais-collector.mjs` on a Taiwan/residential IP, or an AWS Lambda (ap-east-2 Taipei) / GCP Cloud Run (asia-east1) job with the same logic.

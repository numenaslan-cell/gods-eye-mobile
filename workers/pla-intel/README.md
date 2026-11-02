# pla-intel — Taiwan-placed Worker that reads the official PLA-activity sources

| route (service binding `INTEL` only) | returns |
|---|---|
| `GET /health` | `{ok:true}` |
| `GET /mnd/list` | MND daily-bulletin list (`https://www.mnd.gov.tw/news/plaactlist`), newest first: `{days:[{id,date,title}]}` |
| `GET /mnd/detail/:id` | one bulletin parsed: `{day:{date, aircraft, adiz, crossed, plan, official, map, from, to, url}}` |
| `GET /js/index` | Japan Joint Staff press-release index (first 48 KB), China-related titles parsed: class, strait, direction, aircraft type |
| `GET /js/pdf/:id` | the PDF (`p20261102_04`), proxied for the GitHub Actions `pdftotext` step when the runner cannot reach mod.go.jp |

* **Why placed:** `mnd.gov.tw/news/plaact/<id>` answers `403 Access denied.` to a default Cloudflare Worker, GitHub runners and a Japan-placed Worker, and `200` to a Worker with `placement.region = "gcp:asia-east1"` (tested 2026-11-03; the first requests after a redeploy can still run un-placed and get 403 for ~1 min — the Hub retries, so that only delays the data).
  The MND list page, MND images and everything on mod.go.jp work from any egress.
* **No secrets, no public route** (`workers_dev = false`): only the main Worker's `INTEL` service binding reaches it, and everything it returns is public data. Placement only applies to `fetch`, so there is no `scheduled` here — the main Worker's Hub cron drives it.
* Parsers are pure functions in `proxy/src/intel.mjs` (unit-tested against real pages in `proxy/test/fixtures/`).
* **Build / deploy:** `npx esbuild workers/pla-intel/src/index.mjs --bundle --format=esm --minify --target=es2022 --legal-comments=none --outfile=workers/pla-intel/dist/worker.js`, upload as script `pla-intel` (multipart, `main_module: worker.js`, `compatibility_date: 2025-09-01`, metadata `{"placement":{"region":"gcp:asia-east1"}}`, no bindings), keep the workers.dev subdomain disabled (`POST …/scripts/pla-intel/subdomain {"enabled":false}`).
* Licence/attribution of what it relays: MND daily numbers as published (link back to the bulletin); Japan Joint Staff releases are PDL 1.0 — the app shows the 出典 line and says the data was processed.

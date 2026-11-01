# 資料來源與 CORS 測試記錄 / Data sources & CORS test log

測試日期 / Tested: 2026-11-01（Asia/Taipei）。測試環境：Linux 沙盒 `curl` 加上 `Origin: https://example.github.io` 標頭，並用 headless Chrome 實際載入頁面。
> 注意：沙盒網路無法連到 `opensky-network.org`（TLS 在連線階段被中斷），所以 OpenSky「即時回應」在本機無法親自驗證；其 CORS 結論依據官方文件與公開 issue。

| 端點 Endpoint | 結果 Result | 備註 Notes |
|---|---|---|
| `https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle` | ✅ HTTP 200，`access-control-allow-origin: *`，約 2.7 KB | 可從任何來源直接用 `fetch()` |
| `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle` | ✅ HTTP 200，`access-control-allow-origin: *`，約 2.67 MB（15,899 顆） | 在 headless Chrome 實測可載入、解析並用 SGP4 推算；短時間重複下載會被擋（實測遇到 HTTP 403），所以 App 會快取 2 小時並自動退回 `stations` 群組 |
| `https://opensky-network.org/api/states/all?lamin=21.5&lomin=119&lamax=26.5&lomax=123` | ⚠️ 無法在沙盒測試；**第三方來源的 CORS 不可靠** | 官方文件未承諾 CORS；公開 issue 與第三方測試顯示對非自家 origin 不送 `Access-Control-Allow-Origin`。匿名額度：每日 400 credits（此範圍 20 平方度＝1 credit/次），超過回 `429` + `X-Rate-Limit-Retry-After-Seconds` |
| `https://api.adsb.lol/v2/point/{lat}/{lon}/{nm}`、`https://opendata.adsb.fi/api/v2/lat/{lat}/lon/{lon}/dist/{nm}` | ✅ 可用（2026-11-01 在沙盒實測，回傳台灣周邊約 40–50 架）但**沒有** CORS 標頭 | 瀏覽器端不能直接用 → 由 Worker 的 `/api/flights` 代理（見下方「航班」）；`api.airplanes.live` 回 403（需申請） |

## 航班 / Flights（2026-11-01 起改版）

瀏覽器 → Worker `GET /api/flights` →（Cache API 10 秒）→ **adsb.lol**（主要）→ **adsb.fi**（備援）→ **OpenSky**（最後手段）。Worker 在伺服器端合併並轉成 App 既有的航班格式（`id, callsign, country, lat, lon, altFt, speedKt, vMs, hdg, vrFpm`），前端若連不到 `/api/flights` 會退回舊的 `/api/states/all`（OpenSky）。

| 來源 | 用法 | 授權 / 條款 |
|---|---|---|
| [adsb.lol](https://adsb.lol)（主要） | `https://api.adsb.lol/v2/point/{lat}/{lon}/{nm}`，nm 最大 250；用 2 個圓（25.3°N 121.0°E 與 22.6°N 120.8°E，各 250 nm）涵蓋台灣與周邊，依 `hex` 去重，再裁切到前端要求的範圍 | 資料以 **ODbL 1.0** 釋出（© adsb.lol contributors）。使用需**署名**並維持相同授權散布衍生資料庫；本站在介面頁尾與航班面板標示 |
| [adsb.fi](https://adsb.fi)（備援） | `https://opendata.adsb.fi/api/v2/lat/{lat}/lon/{lon}/dist/{nm}`；限制 **1 request/秒**（Worker 內以間隔 1.1 秒序列化，且只在某個圓 adsb.lol 失敗時才呼叫） | adsb.fi Open Data：**僅限非商業使用**，需署名 |
| [OpenSky Network](https://opensky-network.org)（最後手段） | `https://opensky-network.org/api/states/all`（匿名每日約 400 credits） | 見 OpenSky 使用條款（研究／非商業） |

* 地面航班（`alt_baro = "ground"`）與沒有位置的目標會被丟掉；高度＝氣壓高度（ft），缺值時用幾何高度；國別由 ICAO 24-bit 位址區段推得（小型對照表，未知則空白）。
* Worker 回應含 `source`（實際用到的來源，如 `adsb.lol` 或 `adsb.lol+adsb.fi`）、`partial`（有哪些來源失敗）。UI 的 FLT 徽章與面板會顯示實際來源。

## 中央氣象署（CWA）地震／颱風／警特報 — 需要使用者自己的 API key

**預設關閉**：Worker 只有在設定了 secret `CWA_API_KEY`（使用者自己的免費 key，只存在 Worker secret，不在 repo 或前端）時才會呼叫 CWA；沒有 key 時 `/api/quakes`、`/api/typhoon`、`/api/warnings` 回 `{"enabled":false,"source":"usgs"}`，前端就維持原本的 USGS 地震資料（推播也維持 USGS M4.5+）。**不使用 CWA 公開測試 key**，專案內也沒有任何 key。

| 資料集 | 用途 | Worker 路由 |
|---|---|---|
| `E-A0015-001` 顯著有感地震報告、`E-A0016-001` 小區域有感地震報告 | 近期地震（震央、規模、深度、最大震度、報告連結），兩者合併並以發震時間去重；與 USGS 30 天清單合併（同一事件優先採用 CWA） | `GET /api/quakes` |
| `W-C0034-005` 熱帶氣旋路徑 | 目前活動的颱風：位置、風速、氣壓、移動、過去軌跡與預報點 | `GET /api/typhoon` |
| `W-C0033-001` 天氣特報（各縣市） | 目前有效的警特報（依現象＋等級分組並列出縣市） | `GET /api/warnings` |

* 取得 key：<https://opendata.cwa.gov.tw/> 會員登入 →「取得授權碼」（免費）。設定：`wrangler secret put CWA_API_KEY`，或用 Cloudflare API `PUT /accounts/<id>/workers/scripts/gods-eye-opensky-proxy/secrets {"name":"CWA_API_KEY","text":"CWA-…","type":"secret_text"}`。**不需要重新部署程式**。
* 授權：政府資料開放授權條款第 1 版；請標示「資料來源：交通部中央氣象署」（啟用後 UI 會顯示）。
* **重要：CWA 的 WAF 會拒絕 Cloudflare 出口 IP**（從 Worker 直接呼叫回 HTTP 200 但內容是 HTML「Request Rejected」，與 aisstream 的情況類似）。所以實際資料流是：箱子上的收集器 `scripts/ais-collector.mjs`（環境變數 `CWA_API_KEY`，每 `CWA_SEC`＝300 秒）呼叫 CWA → 正規化 → `POST /api/cwa/ingest`（Bearer `INGEST_TOKEN`）→ Hub DO 儲存（20 分鐘內視為新鮮）→ `/api/quakes|typhoon|warnings`。Worker secret `CWA_API_KEY` 仍設定著，當收集器停止（資料超過 20 分鐘）時 Worker 會嘗試直接抓取（目前會被 WAF 擋，之後若 CWA 放行即自動生效），失敗則回傳舊資料。收集器停止且無資料時，前端自動退回 USGS。
* CWA JSON 很大（E-A0015-001 約 340 KB），所以在 Durable Object 內處理（地震 60 秒、警特報 120 秒、颱風 5 分鐘快取，上游失敗時回傳舊資料），前端 Worker 只做轉送；key 只放在 URL query（CWA 要求）且錯誤訊息一律遮蔽。
* 驗證狀況（2026-11-01）：四個資料集都用使用者自己的 key 對真實 API 測試過；解析以**真實回應樣本**（`proxy/test/fixtures/`，已縮減）做單元測試。注意：颱風資料集的實際 JSON 欄位是 PascalCase（`TropicalCyclones.TropicalCyclone[].AnalysisData.Fix[]`、`CoordinateLongitude/Latitude`），警特報的 `validTime` 沒有時區（視為台北時間 +08:00）；解析器兩種大小寫都接受。

## 共軍動態日報（PLA DAILY）與海巡署新聞（CCG 海警）

| 來源 | 用法 | 條款 / 注意 |
|---|---|---|
| **pla-tracker.skyfaring.net** `https://pla-tracker.skyfaring.net/data/records.csv`（**第三方**整理，原始資料來自**國防部**每日「共機、共艦動態」公布） | 前端直接 `fetch`（回應有 `access-control-allow-origin: *`，約 20 KB，快取 4 小時）。欄位：`date, aircraft_total, median_line_cross, cross_rate, aircraft_type, ships_total, activity_start, activity_end, special_event`（`special_event` 含多行引號文字，所以用完整的 CSV 解析器）。PLA DAILY 面板顯示最新一天的架次／逾越中線／艦艇數、近 7 日長條圖與「近 7 日平均 vs 前 7 日」趨勢；2 小時更新一次 | **非官方**、可能延遲或有誤，來源網站未見明確授權條款；面板與頁尾標示出處與「第三方整理，資料源自國防部」。不是預警 |
| **海洋委員會海巡署（CGA）新聞 RSS** `https://www.cga.gov.tw/GipOpen/wSite/rss?ctNode=2116&mp=9997` | Worker `GET /api/cga`：在 Durable Object 內抓取（約 240 KB、65 則）並以字串解析，30 分鐘快取（失敗時回傳舊資料），只保留**標題含「海警」**的項目，另外把**內文提到「海警」**的項目標示為 `mention` 附在後面（實測 2026-11-01：65 則裡沒有任何標題含「海警」，4 則內文提到，所以只看標題清單會一直是空的） | 版權屬海洋委員會海巡署（RSS 內標示「版權來自：海洋委員會海巡署」），**僅限非商業使用**、須標示出處；連結只允許 `cga.gov.tw`。這是新聞稿，不是即時船位；即時船位請看 SHIPS 的 AIS CCG 啟發式 |

## 船舶 AIS、推播與過境預測的資料來源 / Ships (AIS), push alerts & pass predictions

調查日期 / Researched: 2026-11-01（Asia/Taipei）。

| 來源 Source | 結論 Verdict | 備註 Notes |
|---|---|---|
| **aisstream.io**（採用 / chosen） | ✅ 免費 WebSocket、需 API key（以 GitHub 登入後在 Account 頁產生）、支援 bounding box | 官方文件：**不允許瀏覽器直連**（要求由自己的伺服器代理）、key 只能放伺服器端；同時連線數上限 3 條；訂閱須在 3 秒內送出；**無 SLA**、不保證補送。**截至調查日未找到公開的 Terms of Service／商業使用／署名條款**；→ 作品集／展示用途風險低；若要做**商業產品**，請先向 aisstream 取得書面許可。**實測（2026-11-01）**：台灣周邊 20–27.5°N 118–124.5°E 的地面接收站涵蓋率幾乎是空的（2 分鐘只收到 1 艘），香港／華南與日本一帶則很完整，所以 App 的 AIS 範圍放寬為 18–34°N 108–132°E。**另外 aisstream 會中斷來自 Cloudflare／雲端機房 IP 的 WebSocket（連上後 1–2 秒關閉，close 1006）**，所以改由一個跑在一般網路 IP 上的收集器 `scripts/ais-collector.mjs` 轉送到 Worker 的 `/api/ships/ingest`（見 `proxy/DEPLOY.md`）。 |
| AISHub | ⚠️ 免費，但採「資料交換」：必須自己架設 AIS 接收站並持續分享資料才能取得 API | 沒有接收站的人無法使用。 |
| **交通部航港局（MPB）「臺灣海域船舶即時資訊系統」**`https://mpbais.motcmpb.gov.tw/aismpb/tools/geojsonais.ashx`（2026-11-01 起採用，第二個船位來源） | ⚠️ 網站前端使用的端點，**未公開文件、沒有公開授權條款**，可能隨時變更或被擋；**不是**政府資料開放平台的正式 API | 必須帶標頭 `Referer: https://mpbais.motcmpb.gov.tw/aismpb/`，否則回空。實測（2026-11-01）回傳約 2.9 MB GeoJSON、約 7,500–7,900 艘；欄位 `MMSI, ShipName, IMO_Number, SOG, COG, Navigational_Status, Ship_and_Cargo_Type, Record_Time`（時間為台北時間 UTC+8）。因 Worker 免費方案的 CPU 上限（10 ms），**不由 Worker 抓取**，而是由收集器 `scripts/ais-collector.mjs` 每約 2 分鐘（`MPB_SEC`，下限 90 秒、失敗時指數退避）抓一次、裁切到台灣周邊（19–28°N 116–126°E）與必要欄位，再以 `{ships:[…]}` POST 到 `/api/ships/ingest`；Worker 以 MMSI 與 aisstream 資料合併（較新的位置為準，名稱／船型／IMO 互補，`src` 欄位標示 `ais`／`mpb`／`both`）。**請保持低頻率輪詢**；資料以「交通部航港局」為出處標示，商業或大量使用前應先向航港局確認。 |
| Digitraffic（芬蘭）、BarentsWatch（挪威） | ❌ 僅涵蓋各自海域 | 不適用台灣。 |
| MarineTraffic、VesselFinder、Datalastic 等 | ❌ 商業付費 API | 不符合「免費」限制。 |

**架構 Architecture：** 瀏覽器 → `GET /api/ships`（自己的 Cloudflare Worker）→ Durable Object `Hub`（彙整後存入 DO storage、保留 30 分鐘；最多儲存 4,000 艘、回應最多 2,500 艘，優先順序：CCG 疑似 > 貨／油／客輪等 > 移動中的漁船／未知型別 > 靜止者）。資料來源：收集器（aisstream ＋ MPB）→ `POST /api/ships/ingest`（Bearer `INGEST_TOKEN`）；Worker 自己直連 `wss://stream.aisstream.io/v0/stream` 只是備援（目前會被 aisstream 中斷）。API key 是 Worker secret `AISSTREAM_API_KEY`，從不出現在前端。沒有 key、尚未部署或請求失敗時，前端自動顯示橘色 **DEMO DATA**（沿真實航道生成的示範船隻）。

* 中國海警（CCG）判斷是**啟發式**：AIS 船名含 `HAIJING`／`HAI JING`／`ZHONGGUO HAIJIAN`／`CHINA COAST GUARD`（含無空格的 `CHINACOASTGUARD2302`）／`CCG nnnn`／`海警`（**名稱比對一律成立**），或「船型 55（執法）＋中國 MMSI 前綴 412/413/414」（**僅靠前綴的比對**）。僅靠前綴時：`Ship_and_Cargo_Type 30`（漁船）一律排除，名稱含 `HAIXUN`（海事局巡邏船，同為 type 55）也排除。AIS 沒有「海警」欄位，所以可能漏報或誤報；介面與推播內文都標示「非官方確認」。
* 地震：USGS `4.5_day.geojson`（公開、無 key），範圍 20–27.5°N、118–124.5°E、M ≥ 4.5、6 小時內的新事件。
* ISS／衛星過境：CelesTrak TLE（`stations`、`visual`；Worker 端只抓 ISS 的單筆 TLE，快取 6 小時）＋ satellite.js (SGP4)。「可能看得到」＝最高仰角 ≥ 10°、衛星受日照（圓柱地影模型）且觀測者太陽高度 ≤ −6°。這是預測，不保證（未計亮度、天氣、TLE 誤差）。
* Web Push：標準 Web Push（RFC 8030/8291/8292）；VAPID 私鑰只存在 Worker secret `VAPID_PRIVATE_KEY`。訂閱資料存 Cloudflare KV；ISS 提醒才會儲存「四捨五入到約 1 公里」的位置。iOS／iPadOS 需 16.4+ 且必須「加入主畫面」後從圖示開啟。

## App 的行為 / App behaviour

* 航班：先打 `openskyBase`（預設官方）。失敗（CORS／網路／逾時／429）→ 顯示橘色 **DEMO DATA** 徽章並用示範航班，之後以退避方式重試（60 s → 10 min；429 則依 `X-Rate-Limit-Retry-After-Seconds`，讀不到就 5 分鐘）。成功時每 15 秒更新（頁面在背景時暫停），並在兩次更新之間以航向與速度推算位置。
* 因為匿名每日只有 400 credits，持續 15 秒更新大約 100 分鐘就會用完；用完後會自動退避並顯示 DEMO DATA。想穩定運作請部署 `proxy/cloudflare-worker.js`（會把 10 秒內的請求合併成一次上游呼叫），再把 `assets/config.js` 的 `openskyBase` 指到你的 worker。目前已部署為 `https://gods-eye-opensky-proxy.numenaslan.workers.dev/api`（CORS 僅允許 `https://numenaslan-cell.github.io` 與 localhost；要換來源請改 `proxy/cloudflare-worker.js` 的 `ALLOWED_ORIGINS`）。
* 衛星：CelesTrak TLE（預設 `active`，約 1.6 萬顆）→ satellite.js (SGP4) 每 5 秒推算；顯示總數、台灣範圍（經緯度框 21.5–26.5°N、119–123°E）正上方的衛星、以及 ISS 位置。失敗則退回 `stations`，再失敗才用示範資料。

## 授權 / Licences of bundled third-party material

* satellite.js 6.0.2 — MIT（`assets/vendor/satellite.js-LICENSE.md`）
* React 18、three.js r171、lucide icons — MIT（打包在 `assets/app.bundle.js`；原始 artifact 的 bundle 回收而來）
* 地球貼圖 — NASA Earth Observatory：*Blue Marble Next Generation w/ Topography and Bathymetry*（日）、*Black Marble 2012*（夜）。NASA 影像一般屬公有領域，建議仍保留致謝。
* 航班資料 — OpenSky Network；衛星軌道資料 — CelesTrak（T.S. Kelso）。請遵守各自的使用條款，學術引用請見 OpenSky 官網。

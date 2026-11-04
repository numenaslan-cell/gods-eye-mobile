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
| [adsb.lol](https://adsb.lol)（主要） | `https://api.adsb.lol/v2/point/{lat}/{lon}/{nm}`，nm 最大 250；（2026-11-04 起）用 9 個圓（台灣 25.3°N 121.0°E、22.6°N 120.8°E 加上呂宋、香港、南海南部、沖繩、九州–關西、東京、北海道，各 250 nm，見下方「涵蓋範圍」）涵蓋 0–45°N、105–145°E，依 `hex` 去重，再裁切到固定範圍並限制 800 架 | 資料以 **ODbL 1.0** 釋出（© adsb.lol contributors）。使用需**署名**並維持相同授權散布衍生資料庫；本站在介面頁尾與航班面板標示 |
| [adsb.fi](https://adsb.fi)（備援） | `https://opendata.adsb.fi/api/v2/lat/{lat}/lon/{lon}/dist/{nm}`；限制 **1 request/秒**（Worker 內以間隔 1.1 秒序列化，且只在某個圓 adsb.lol 失敗時才呼叫） | adsb.fi Open Data：**僅限非商業使用**，需署名 |
| [OpenSky Network](https://opensky-network.org)（最後手段） | `https://opensky-network.org/api/states/all`（匿名每日約 400 credits） | 見 OpenSky 使用條款（研究／非商業） |

* 地面航班（`alt_baro = "ground"`）與沒有位置的目標會被丟掉；高度＝氣壓高度（ft），缺值時用幾何高度；國別由 ICAO 24-bit 位址區段推得（小型對照表，未知則空白）。
* **疑似 PLA 航空器（⚠️ PLA / 疑似）**：Worker 在 adsb.lol / adsb.fi 的原始物件上套用保守的啟發式（`proxy/src/flights.mjs` 的 `plaSuspect`）：`dbFlags` bit 0（資料庫標為軍用）∧ 中國 ICAO 位址區段 0x780000–0x7BFFFF（香港 0x789xxx、台灣 0x899xxx 排除），或軍用旗標／中國位址 ∧ 典型 PLA 機型（J-10/11/15/16/20/35、JH-7、H-6、Y-8/9/20、KJ-xxx、Z-8/9/10/18/19/20、WZ-、GJ-；Su-30/35 僅在中國位址時算）或 PLA 風格呼號（PLA…／CHN<數字>）。**只有位址、或只有民航呼號（CCA/CES/CSN…）永遠不會被標記**。命中者在回應中帶 `pla: true` 與 `plaWhy`，UI 以紅色標記、「⚠️ 疑似 PLA」徽章與說明顯示。這只是給人看的提示，不是辨識：多數共機根本不發 ADS-B，**官方數字以國防部每日公布為準**（PLA 分頁）。
* Worker 回應含 `source`（實際用到的來源，如 `adsb.lol` 或 `adsb.lol+adsb.fi`）、`partial`（有哪些來源失敗）。UI 的 FLT 徽章與面板會顯示實際來源。

## 中央氣象署（CWA）地震／颱風／警特報 — 公開 S3 鏡像（免 key）＋ REST 備援

**預設關閉**：Worker 只有在設定了 secret `CWA_API_KEY`（使用者自己的免費 key，只存在 Worker secret，不在 repo 或前端）時才會呼叫 CWA；沒有 key 時 `/api/quakes`、`/api/typhoon`、`/api/warnings` 回 `{"enabled":false,"source":"usgs"}`，前端就維持原本的 USGS 地震資料（推播也維持 USGS M4.5+）。**不使用 CWA 公開測試 key**，專案內也沒有任何 key。

| 資料集 | 用途 | Worker 路由 |
|---|---|---|
| `E-A0015-001` 顯著有感地震報告、`E-A0016-001` 小區域有感地震報告 | 近期地震（震央、規模、深度、最大震度、報告連結），兩者合併並以發震時間去重；與 USGS 30 天清單合併（同一事件優先採用 CWA） | `GET /api/quakes` |
| `W-C0034-005` 熱帶氣旋路徑 | 目前活動的颱風：位置、風速、氣壓、移動、過去軌跡與預報點 | `GET /api/typhoon` |
| `W-C0033-001` 天氣特報（各縣市） | 目前有效的警特報（依現象＋等級分組並列出縣市） | `GET /api/warnings` |

* 取得 key：<https://opendata.cwa.gov.tw/> 會員登入 →「取得授權碼」（免費）。設定：`wrangler secret put CWA_API_KEY`，或用 Cloudflare API `PUT /accounts/<id>/workers/scripts/gods-eye-opensky-proxy/secrets {"name":"CWA_API_KEY","text":"CWA-…","type":"secret_text"}`。**不需要重新部署程式**。
* 授權：政府資料開放授權條款第 1 版；請標示「資料來源：交通部中央氣象署」（啟用後 UI 會顯示）。
* **資料流（2026-11-03 改版，不再依賴任何本機）：** CWA 的 REST API（`opendata.cwa.gov.tw`）會拒絕 Cloudflare 出口 IP（HTTP 200 + HTML「Request Rejected」，**連放置在 `gcp:asia-east1` 的 Worker 也一樣**，已實測），所以 Worker 改讀氣象署自己公開的 **AWS S3 鏡像**（`https://cwaopendata.s3.ap-northeast-1.amazonaws.com/`，AWS Open Data，免帳號、免 key）：`Earthquake/E-A0015-001.zip`、`E-A0016-001.zip`（每份報告一個 XML 的 zip；Worker 讀 zip 目錄、只解壓最新 5 份並解析）、`Warning/W-C0033-001.json`、`Warning/W-C0034-005.json`（JSON，結構與 REST 相同但包在 `cwaopendata.dataset` 內）。Hub 每 2 分鐘（cron）用 `If-None-Match` 條件式請求檢查（304＝沒有新資料，不做任何解析），警特報／颱風約每 4 分鐘。實測 CWA 在發震後約 6 分鐘發布（例：2026-11-02 10:23:09 發震 → 10:28:48 發布 → S3 檔案 10:29:25 更新），我們再多延遲最多 2 分鐘。GitHub Actions（`CWA_API_KEY`，REST）仍每 30–60 分鐘 ingest 作為**備援**（同一個 `cwaIngest` 儲存槽，較新的寫入勝出）。
* CWA JSON 很大（E-A0015-001 約 340 KB），所以在 Durable Object 內處理（地震 60 秒、警特報 120 秒、颱風 5 分鐘快取，上游失敗時回傳舊資料），前端 Worker 只做轉送；key 只放在 URL query（CWA 要求）且錯誤訊息一律遮蔽。
* 驗證狀況（2026-11-01）：四個資料集都用使用者自己的 key 對真實 API 測試過；解析以**真實回應樣本**（`proxy/test/fixtures/`，已縮減）做單元測試。注意：颱風資料集的實際 JSON 欄位是 PascalCase（`TropicalCyclones.TropicalCyclone[].AnalysisData.Fix[]`、`CoordinateLongitude/Latitude`），警特報的 `validTime` 沒有時區（視為台北時間 +08:00）；解析器兩種大小寫都接受。

### 地震多來源評估與合併（2026-11-03）/ Earthquake sources: test results & merge rule

| 來源 | 台灣周邊涵蓋 | 實測延遲 | 授權 | 採用？ |
|---|---|---|---|---|
| **CWA E-A0015/E-A0016**（S3 鏡像） | 最完整：有感地震含 M<4 的小區域有感地震 | 發震後約 6 分鐘（CWA 發布時間）＋ ≤ 2 分鐘輪詢 | 政府資料開放授權條款第 1 版；「資料來源：交通部中央氣象署」 | ✅ 主要、**權威** |
| CWA REST API（有 key） | 同上 | — | 同上 | ⚠ 從 Cloudflare（含台灣放置 Worker）被 WAF 擋；只有 GitHub Actions 能用 → 備援 |
| USGS FDSN geojson | 約 M4.5+（國際目錄）；2026-11-04 起另加全範圍 0–45°N 105–145°E M4.5+ 查詢 | 未實測（通常發震後數分鐘）；每 2 分鐘輪詢 | 公有領域 | ✅ |
| EMSC-CSEM SeismicPortal FDSN | 約 M4.5+ | 未實測（通常發震後數分鐘）；每 2 分鐘輪詢 | CC BY 4.0（需標示、不得鏡像／大量複製） | ✅（UI 與 README 標示；WebSocket 未採用：免費 Worker 無法長連線，輪詢已足夠） |
| GFZ GEOFON FDSN text | 約 M4.5+ | 未實測（通常發震後數分鐘）；每 2 分鐘輪詢 | CC BY 4.0 | ✅ |
| JMA `list.json`、P2PQuake | 只涵蓋日本國內震度資訊，台灣周邊幾乎沒有 | — | — | ❌ 無用 |
| CWA 公開網頁／RSS／ExpTech | 網頁無穩定 JSON；RSS 授權禁止衍生；ExpTech 為非官方且被擋 | — | — | ❌ |

合併規則（`proxy/src/quakes.mjs`）：兩筆事件在 **±150 秒且緯度與經度各 ±1.5°** 內視為同一地震；來源優先順序 CWA > USGS > EMSC > GFZ，保留優先來源的規模／位置，並記錄 `src`、`srcs[]` 與其他機構的規模 `others[]`（UI 顯示「來源 CWA·USGS·EMSC」）。小於 M4.5 的地震只有氣象署有，因此氣象署資料延遲時，UI 會註明「僅顯示國際來源 (M4.5+)」。推播以事件指紋（時間／位置）去重，避免同一地震被不同機構先後回報而重複推送。

## 標記圖示與「疑似」警示標籤 / Marker shapes & suspect labels

* 航空器＝飛機剪影（機頭指向航向）；船舶＝尖艏船殼＋船艛剪影（艏指向航向 COG），依類別上色。兩者都是向量三角形網格（非點精靈），在 DPR 3 下邊緣銳利，並以螢幕固定像素大小繪製（放大時相對縮小）；近距離（< 1.4 個地球半徑）會隱藏靜止的漁船／未分類小船以免蓋住島嶼。
* **⚠️ 疑似海警**（CCG，紅）、**⚠️ 疑似共軍**（PLAN，洋紅紅）、**⚠️ 疑似共機**（PLA 航空器，紅）：永遠顯示的標籤＋脈動圈（HTML 疊層，標籤重疊時往上堆疊）。這些都是啟發式，不是官方辨識。
* **疑似共軍艦（`isPlan`，`proxy/src/ais.mjs`）**：名稱含「海軍／海军／解放軍」、`PLA NAVY`、`PLAN <艦號>`（單獨的 “PLAN” 不算，避免遊艇 “PLAN B”），或 MMSI 412/413 開頭且 AIS 船型 35（軍事）；拼音 `HAI JUN` 也是常見民間人名（疏浚船、貨船、漁船），因此只在船型 35（或船型未知且 MMSI 412/413）時才算。**漁船（type 30）永遠不會只靠 MMSI 被標記**；已判為 CCG 的不會重複判為 PLAN。多數共艦不發 AIS，官方數字以國防部日報為準。

## 地球影像 LOD（放大時的高解析圖磚）/ Globe imagery level-of-detail

整顆地球的底圖仍是內嵌的 NASA Blue Marble（日 4096×2048）／Black Marble（夜 2048×1024）。鏡頭拉近（距離 ≲ 2.1 個地球半徑）時，App 會在可視範圍上疊加 **NASA GIBS WMTS** 圖磚（EPSG:4326、`500m` tile matrix set、512 px、z4–z7，即每塊 18°–2.25°；z7 約 0.0044°/px ≈ 490 m）：

| 圖層 | 用途 | 網址範本 / 條款 |
|---|---|---|
| `BlueMarble_ShadedRelief_Bathymetry` | 日間 / THERM 的陸地與海底地形 | `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/BlueMarble_ShadedRelief_Bathymetry/default/500m/{z}/{row}/{col}.jpeg`；CORS `*`，可快取 3 天 |
| `VIIRS_CityLights_2012` | 夜間 / NVG 的城市燈光 | 同上，圖層換成 `VIIRS_CityLights_2012`；伺服器回 `no-store`，所以只保留在記憶體 LRU |

* 授權：NASA EOSDIS GIBS 影像可自由使用（NASA media usage guidelines，無需授權），請致謝：*"We acknowledge the use of imagery provided by services from NASA's Global Imagery Browse Services (GIBS), part of NASA's Earth Observing System Data and Information System (EOSDIS)."* UI 頁尾有 “NASA GIBS imagery” 連結。未使用 ESRI World Imagery（其條款對非商業作品集也要求另外標示／限制）。
* 手機效能：最多同時 18 塊、同時 6 個請求、最多 40 張貼圖的 LRU（淘汰時 `dispose()`）、被移出視野的圖磚網格立即釋放；白天只抓日圖、夜晚只抓夜圖、晨昏線附近兩者都抓；模式（DAY/NVG/THERM）與晨昏線著色與底圖共用同一段 shader。renderer 使用 `devicePixelRatio`（上限 3，若平均幀時間 > 42 ms 會自動降到 2 → 1.5）、各向異性過濾（≤16）與 mipmap、貼圖 `colorSpace = sRGB`。
* 失敗（離線、被擋、404）時單塊圖磚退回底圖，60 秒後才重試。

## 共軍動態日報（PLA DAILY）與海巡署新聞（CCG 海警）

| 來源 | 用法 | 條款 / 注意 |
|---|---|---|
| **pla-tracker.skyfaring.net** `https://pla-tracker.skyfaring.net/data/records.csv`（**第三方**整理，原始資料來自**國防部**每日「共機、共艦動態」公布） | 前端直接 `fetch`（回應有 `access-control-allow-origin: *`，約 20 KB，快取 4 小時）。欄位：`date, aircraft_total, median_line_cross, cross_rate, aircraft_type, ships_total, activity_start, activity_end, special_event`（`special_event` 含多行引號文字，所以用完整的 CSV 解析器）。PLA DAILY 面板顯示最新一天的架次／逾越中線／艦艇數、近 7 日長條圖與「近 7 日平均 vs 前 7 日」趨勢；2 小時更新一次 | **非官方**、可能延遲或有誤，來源網站未見明確授權條款；面板與頁尾標示出處與「第三方整理，資料源自國防部」。不是預警 |
| **海洋委員會海巡署（CGA）新聞 RSS** `https://www.cga.gov.tw/GipOpen/wSite/rss?ctNode=2116&mp=9997` | Worker `GET /api/cga`：在 Durable Object 內抓取（約 240 KB、65 則）並以字串解析，30 分鐘快取（失敗時回傳舊資料），只保留**標題含「海警」**的項目，另外把**內文提到「海警」**的項目標示為 `mention` 附在後面（實測 2026-11-01：65 則裡沒有任何標題含「海警」，4 則內文提到，所以只看標題清單會一直是空的） | 版權屬海洋委員會海巡署（RSS 內標示「版權來自：海洋委員會海巡署」），**僅限非商業使用**、須標示出處；連結只允許 `cga.gov.tw`。這是新聞稿，不是即時船位；即時船位請看 SHIPS 的 AIS CCG 啟發式 |

## 官方共軍動態：國防部每日動態 + 日本統合幕僚監部（2026-11-03 起）/ Official PLA activity

| 來源 | 內容 | 取得方式（實測 2026-11-03） | 條款 |
|---|---|---|---|
| **中華民國國防部** 「中共解放軍臺海周邊海、空域動態」 列表 `https://www.mnd.gov.tw/news/plaactlist`、內文 `https://www.mnd.gov.tw/news/plaact/<id>`、航跡示意圖 `https://www.mnd.gov.tw/NewUpload/YYYYMM/…jpg` | 每日（約 09:00 台北時間發布，統計 06:00→06:00）：共機架次（及「進入西南及東部空域／逾越中線」架次）、共艦艘數、**公務船**艘數、航跡示意圖 | **列表頁**一般 Worker 可抓；**內文頁**從一般 Cloudflare Worker／GitHub runner／日本放置的 Worker 會回 `403 Access denied.`，從 **`placement.region = "gcp:asia-east1"`（彰化）的 Worker 回 200**（無 key、無 JS、約 70 KB HTML、200–700 ms）。圖片連結只放連結，不內嵌 | 網站頁尾有「政府網站資料開放宣告」（我方理解為政府資料開放授權條款 第 1 版，**請以該頁為準**）；本 App 逐日數字原樣呈現並附出處連結。未對其網站做高頻抓取：列表 20 分鐘一次、內文每日一則 |
| **防衛省・統合幕僚監部** 「報道発表資料」 `https://www.mod.go.jp/js/press/index.html`（約 1.7 MB，最新在最上面）與 `https://www.mod.go.jp/js/pdf/YYYY/pYYYYMMDD_NN.pdf` | 中國海軍艦艇／軍機動向：**標題**即含級別、海峽、航向（例「ルーヤンⅢ、フユ／沖縄本島－宮古島間北西進」）、機型（例「WZ-7／沖宮」）；**PDF 內文**含**艦番号（艦號）**、確認時間／地點、無人機、緊急発進 | 一般 Worker 與 GitHub runner 皆可。Worker 只讀 index 前 48 KB（串流）以符合 10 ms CPU；PDF 內嵌壓縮 CID 字型，Worker 內解不了，所以由 **GitHub Actions `pdftotext`** 解析（`scripts/pla-intel-pdf.mjs`），結果 POST 到 `/api/pla/ingest`。艦號→艦名用靜態表 `proxy/src/plahulls.mjs`（Wikidata CC0 + Wikipedia 級別表 CC BY-SA，`scripts/gen-plan-hulls.mjs` 產生，只存「型號→艦號→英文名」） | **公共データ利用規約 第1.0版（PDL 1.0）**：可複製、散布、改作、商用，須標示出典、改作須註明為加工。App 在 PLA 分頁與頁尾標示「出典：防衛省・統合幕僚監部…（加工して作成）」，並聲明非省方背書 |

**架構：** 主 Worker 的 cron（每 2 分鐘喚醒 Hub）→ 透過 **service binding `INTEL`** 呼叫 `pla-intel`（放置於 `gcp:asia-east1`，**沒有 secret、沒有公開路由**，只有主 Worker 呼叫得到）取得 MND 列表／內文與 Joint Staff index（已解析成 JSON）→ Hub 節流（MND 列表 20 分鐘、Joint Staff 30 分鐘、每次最多補 3 則內文）→ 存在 Hub 的 DO storage → `GET /api/pla`（2 分鐘 edge 快取）。GitHub Actions（`pla-intel.yml`，每 30 分鐘）呼叫 `POST /api/pla/refresh`，再為新的 Joint Staff 公告下載 PDF（runner 連不上 mod.go.jp 時走 `GET /api/pla/pdf/:id` 由 Worker 代抓）→ `pdftotext` → `POST /api/pla/ingest`。兩條路任一條壞掉不會讓另一條停擺；**不依賴任何常駐機器**。
**只有 Cloudflare 的 `scheduled` 沒有 placement**，所以放置的 `pla-intel` 只有 `fetch` handler，由主 Worker 以 service binding 呼叫（與 `mpb-fetcher` 同樣的限制與做法）。

**「疑似共機」的 ICAO 先驗：** `0x7A1000–0x7A4FFF` 這段在 tar1090-db 快照（2026-11）裡 383 筆有 375 筆被標為軍用（Y-20、WZ-10、Mi-8、AS365、An-12/Y-8、Tu-16/H-6、Il-76…），整個 `0x780000–0x7BFFFF` 其餘約 7,200 筆只有 68 筆軍用。所以位址在這段就標「疑似」（理由會寫 `pla-block`），但這是**先驗不是辨識**；一般中國位址（國航等）單獨不標。另新增 `TU16`（轟-6 的 ICAO 型號）為 PLA 機型，`AN12`／`IL76`／`MI8`／`AS65` 等同時存在於民用的型號僅在中國位址下才算。

## 船舶 AIS、推播與過境預測的資料來源 / Ships (AIS), push alerts & pass predictions

調查日期 / Researched: 2026-11-01（Asia/Taipei）。

| 來源 Source | 結論 Verdict | 備註 Notes |
|---|---|---|
| **aisstream.io**（採用 / chosen） | ✅ 免費 WebSocket、需 API key（以 GitHub 登入後在 Account 頁產生）、支援 bounding box | 官方文件：**不允許瀏覽器直連**（要求由自己的伺服器代理）、key 只能放伺服器端；同時連線數上限 3 條；訂閱須在 3 秒內送出；**無 SLA**、不保證補送。**截至調查日未找到公開的 Terms of Service／商業使用／署名條款**；→ 作品集／展示用途風險低；若要做**商業產品**，請先向 aisstream 取得書面許可。**實測（2026-11-01）**：台灣周邊 20–27.5°N 118–124.5°E 的地面接收站涵蓋率幾乎是空的（2 分鐘只收到 1 艘），香港／華南與日本一帶則很完整，所以 App 的 AIS 範圍放寬為 18–34°N 108–132°E。**另外 aisstream 會中斷來自 Cloudflare／雲端機房 IP 的 WebSocket（連上後 1–2 秒關閉，close 1006）**，所以改由一個跑在一般網路 IP 上的收集器 `scripts/ais-collector.mjs` 轉送到 Worker 的 `/api/ships/ingest`（見 `proxy/DEPLOY.md`）。 |
| AISHub | ⚠️ 免費，但採「資料交換」：必須自己架設 AIS 接收站並持續分享資料才能取得 API | 沒有接收站的人無法使用。 |
| **交通部航港局（MPB）「臺灣海域船舶即時資訊系統」**`https://mpbais.motcmpb.gov.tw/aismpb/tools/geojsonais.ashx`（2026-11-01 起採用，第二個船位來源） | ⚠️ 網站前端使用的端點，**未公開文件、沒有公開授權條款**，可能隨時變更或被擋；**不是**政府資料開放平台的正式 API | 必須帶標頭 `Referer: https://mpbais.motcmpb.gov.tw/aismpb/`，否則回空。實測（2026-11-01）回傳約 2.9 MB GeoJSON、約 7,500–7,900 艘；欄位 `MMSI, ShipName, IMO_Number, SOG, COG, Navigational_Status, Ship_and_Cargo_Type, Record_Time`（時間為台北時間 UTC+8）。**2026-11-03 起由「放置在台灣的 Worker」`mpb-fetcher`（`workers/mpb-fetcher/`，`placement.region = "gcp:asia-east1"`）抓取**：MPB 只接受台灣路由的網路（GitHub runner、一般 Cloudflare Worker 與 JP/HK/SG/US/DE/UK/IN/ID/VN 等 10 個測點全部連線逾時），但放置在 asia-east1 附近資料中心的 Worker 可正常連線（實測 HTTP 200、約 3 MB、170–470 ms）。由 GitHub Actions 每 5 分鐘 `POST /run` 觸發，裁切到台灣周邊（19–28°N 116–126°E）與必要欄位後，經 service binding 以 `{ships:[…]}` POST 到主 Worker 的 `/api/ships/ingest`（舊的常駐收集器 `scripts/ais-collector.mjs` 僅保留作手動備援）；Worker 以 MMSI 與 aisstream 資料合併（較新的位置為準，名稱／船型／IMO 互補，`src` 欄位標示 `ais`／`mpb`／`both`）。**請保持低頻率輪詢**；資料以「交通部航港局」為出處標示，商業或大量使用前應先向航港局確認。 |
| Digitraffic（芬蘭）、BarentsWatch（挪威） | ❌ 僅涵蓋各自海域 | 不適用台灣。 |
| MarineTraffic、VesselFinder、Datalastic 等 | ❌ 商業付費 API | 不符合「免費」限制。 |

**架構 Architecture：** 瀏覽器 → `GET /api/ships`（自己的 Cloudflare Worker）→ Durable Object `Hub`（彙整後存入 DO storage、保留 30 分鐘；最多儲存 4,000 艘、回應最多 2,500 艘，優先順序：CCG 疑似 > 貨／油／客輪等 > 移動中的漁船／未知型別 > 靜止者）。資料來源：收集器（aisstream ＋ MPB）→ `POST /api/ships/ingest`（Bearer `INGEST_TOKEN`）；Worker 自己直連 `wss://stream.aisstream.io/v0/stream` 只是備援（目前會被 aisstream 中斷）。API key 是 Worker secret `AISSTREAM_API_KEY`，從不出現在前端。沒有 key、尚未部署或請求失敗時，前端自動顯示橘色 **DEMO DATA**（沿真實航道生成的示範船隻）。

* **（2026-11-03 更新，規則以此為準）** 中國海警（CCG）判斷規則 `ccgWhy()`（`proxy/src/ais.mjs`）：① 名稱：`HAIJING`／`ZHONGGUO HAIJIAN`／`CHINA COAST GUARD`（含 `CHINACOASTGUARD2302`）／`CCG nnnn`／`海警`；② `block`：MMSI 以 **413875** 開頭（實測海警船常用的區段，**觀察而非官方配賦**；漁船 type 30 與名稱含 HAIXUN 者不套用）；③ `known`：這個 MMSI 先前曾用海警船名出現過（Hub 把 MMSI 記在 KV `ccg:known`，最多 400 筆、180 天，寫入節流為 5 分鐘一次、僅在出現新 MMSI 或 3 天更新一次時寫）。**只有「type 55 + 412/413/414 前綴」而無上述證據的船不再叫海警**，改為較保守的「政府船舶」（`isGov()`，琥珀色、無警示標籤、不推播），例如 `XIA MEN HAI YANG 01`、HAIXUN 巡邏船。船名中的艦號可解出所屬分局（`decodeCcgHull()`：5 碼＝省級分局，例如 14530→福建；4 碼＝直屬局，例如 2xxx→寧波（二局）、3xxx→廣州、5xxx→三亞…）——依公開的編號規則，僅供參考。以下為舊版說明：AIS 船名含 `HAIJING`／`HAI JING`／`ZHONGGUO HAIJIAN`／`CHINA COAST GUARD`（含無空格的 `CHINACOASTGUARD2302`）／`CCG nnnn`／`海警`（**名稱比對一律成立**），或「船型 55（執法）＋中國 MMSI 前綴 412/413/414」（**僅靠前綴的比對**）。僅靠前綴時：`Ship_and_Cargo_Type 30`（漁船）一律排除，名稱含 `HAIXUN`（海事局巡邏船，同為 type 55）也排除。AIS 沒有「海警」欄位，所以可能漏報或誤報；介面與推播內文都標示「非官方確認」。
* 地震推播：台灣框 20–27.5°N、118–124.5°E 內 M ≥ 4.5、6 小時內的新事件（多來源去重）；全範圍 0–45°N、105–145°E 其他地區只推 M ≥ 6.5（2026-11-04 起）。
* ISS／衛星過境：CelesTrak TLE（`stations`、`visual`；Worker 端只抓 ISS 的單筆 TLE，快取 6 小時）＋ satellite.js (SGP4)。「可能看得到」＝最高仰角 ≥ 10°、衛星受日照（圓柱地影模型）且觀測者太陽高度 ≤ −6°。這是預測，不保證（未計亮度、天氣、TLE 誤差）。
* Web Push：標準 Web Push（RFC 8030/8291/8292）；VAPID 私鑰只存在 Worker secret `VAPID_PRIVATE_KEY`。訂閱資料存 Cloudflare KV；ISS 提醒才會儲存「四捨五入到約 1 公里」的位置。iOS／iPadOS 需 16.4+ 且必須「加入主畫面」後從圖示開啟。

## 涵蓋範圍 Coverage（2026-11-04 起：0–45°N、105–145°E）

由原本的台灣周邊（約 18–29°N、114–128°E）擴大到南海、西太平洋（到約 145°E）與日本（到 45°N）。**免費方案的限制**（Workers 免費方案每次呼叫 10 ms CPU、每次呼叫 50 個子請求；Durable Object 每次呼叫 30 s CPU）決定了下列做法：

| 圖層 | 做法 | 上限／限制 |
|---|---|---|
| 航班（adsb.lol） | adsb.lol 最大半徑 250 nm，無法無縫覆蓋 45°×40° 的範圍（需約 50 個圓）。改用 9 個圓：台灣北／南（原有，**僅這兩個**在失敗時退到 adsb.fi）、呂宋（15.5°N 120.5°E）、香港／珠江口（21.0°N 112.5°E）、南海南部（8.5°N 112.5°E，稀疏）、沖繩（26.5°N 127.5°E）、九州–關西（34.0°N 132.5°E）、東京（37.0°N 139.5°E）、北海道（42.5°N 142.5°E）。抓取與 JSON 解析改在 Hub Durable Object 內（單飛、8 秒記憶、失敗時回傳 5 分鐘內的舊資料；**每個圓各有快取**：台灣兩個核心圓 9 秒、其餘 7 個圓 45 秒，存在 Durable Object 儲存體（`flc:*`）所以 DO 被回收也不會丟，圓失敗（adsb.lol 對共用 IP 會回 429）時用該圓 3 分鐘內的舊資料並在 `partial` 註明「served from cache」，把上游請求壓到約每 10 秒 2+7/4.5 次），前端 Worker 只串流位元組；查詢字串中的範圍被忽略（固定一個快取鍵 `v=2`，避免被拿來放大上游請求） | 最多 **800** 架（約 190 B/架，gzip 後約 30 KB）：疑似共機優先、台灣核心區（18–29°N、114–128°E）全留、其餘依高度（巡航段穩定、畫面不閃）。圓與圓之間、海上沒有 ADS-B 接收站的地方本來就沒有資料 |
| 船舶（aisstream） | `AIS_BBOX` = 0–45°N、105–145°E（`proxy/src/ais.mjs`、`scripts/collect-once.mjs`、`scripts/ais-collector.mjs`、`.github/workflows/collector.yml`）。收集器每次上傳最多 7,500 則訊息（台灣核心區優先），Worker 每次最多接收 8,000 則 | 儲存 4,000 艘、回應 2,500 艘；排序＝疑似海警／共軍 > 政府船舶 > 貨／油／客輪（移動中先）> 漁船／未知；**台灣核心區以外同級船隻排後 0.25 級**，所以台灣周邊優先，日本／南海的商船仍會出現。**航港局 MPB 仍只有臺灣海域（`MPB_BBOX` 19–28°N、116–126°E），無法擴大** |
| 地震 | USGS／EMSC／GFZ 每個來源兩個查詢：台灣框 20–27.5°N、118–124.5°E（不限規模，與以前相同）＋全範圍 0–45°N、105–145°E（**M4.5+**，`limit=150`），依 id 合併；Worker 回應最多 220 筆。前端另直接查 USGS：台灣 M3+ 30 天、全範圍 M4.5+ 14 天（`limit=250`），地圖與清單最多 400 筆。**氣象署（CWA）仍只有台灣** | 全範圍只收 M4.5+，避免日本的小地震擠掉台灣的 M3 |
| 推播 | 仍以台灣為主：台灣框 M4.5+；全範圍其他地區只有 **M6.5+**（標題「🌏 區域強震」）。海警（CCG）推播仍只看台灣周邊（20–27.5°N、116–124.5°E） | 日本 M4.5–6.4 不會推播（測試 `pickAlertQuakes`） |
| 預設畫面 | 「東亞廣域」中心 22.5°N 125°E，鏡頭距離 4.0（手機）／3.1（寬螢幕）；「台灣上空」按鈕回到台灣。縮放範圍不變（最近 1.06、最遠 8） | |

`/api/health`：仍為「0 艘船、MPB 超過 15 分鐘、binding 缺漏」才回 503，擴大範圍不影響。

## App 的行為 / App behaviour

* 航班：先打 `openskyBase`（預設官方）。失敗（CORS／網路／逾時／429）→ 顯示橘色 **DEMO DATA** 徽章並用示範航班，之後以退避方式重試（60 s → 10 min；429 則依 `X-Rate-Limit-Retry-After-Seconds`，讀不到就 5 分鐘）。成功時每 15 秒更新（頁面在背景時暫停），並在兩次更新之間以航向與速度推算位置。
* 因為匿名每日只有 400 credits，持續 15 秒更新大約 100 分鐘就會用完；用完後會自動退避並顯示 DEMO DATA。想穩定運作請部署 `proxy/cloudflare-worker.js`（會把 10 秒內的請求合併成一次上游呼叫），再把 `assets/config.js` 的 `openskyBase` 指到你的 worker。目前已部署為 `https://gods-eye-opensky-proxy.numenaslan.workers.dev/api`（CORS 僅允許 `https://numenaslan-cell.github.io` 與 localhost；要換來源請改 `proxy/cloudflare-worker.js` 的 `ALLOWED_ORIGINS`）。
* 衛星：CelesTrak TLE（預設 `active`，約 1.6 萬顆）→ satellite.js (SGP4) 每 5 秒推算；顯示總數、台灣範圍（`twBox`，經緯度框 21.5–26.5°N、119–123°E）正上方的衛星、以及 ISS 位置。失敗則退回 `stations`，再失敗才用示範資料。

## 授權 / Licences of bundled third-party material

* satellite.js 6.0.2 — MIT（`assets/vendor/satellite.js-LICENSE.md`）
* React 18、three.js r171、lucide icons — MIT（打包在 `assets/app.bundle.js`；原始 artifact 的 bundle 回收而來）
* 地球貼圖 — NASA Earth Observatory：*Blue Marble Next Generation w/ Topography and Bathymetry*（日）、*Black Marble 2012*（夜）。NASA 影像一般屬公有領域，建議仍保留致謝。
* 航班資料 — OpenSky Network；衛星軌道資料 — CelesTrak（T.S. Kelso）。請遵守各自的使用條款，學術引用請見 OpenSky 官網。

## GitHub Actions 收集器 + 放置在台灣的 `mpb-fetcher` Worker（2026-11-03 起取代常駐收集器）

* **MPB 為何要用放置的 Worker：** `mpbais.motcmpb.gov.tw` 只接受台灣路由的網路。實測（2026-11-03）：GitHub-hosted runner（`UND_ERR_CONNECT_TIMEOUT`）、一般 Cloudflare Worker（3/3 次 20 秒逾時）、check-host.net 的東京／香港／新加坡／洛杉磯／亞特蘭大／法蘭克福／倫敦／孟買／雅加達／胡志明市節點（連線逾時，對照組 motc.gov.tw 與 example.com 皆可連）都連不上；但設定 **`placement.region = "gcp:asia-east1"`**（彰化）的 Worker 6/6 次成功（HTTP 200、約 3 MB、170–470 ms）。Cloudflare 的 placement 只影響 `fetch` handler（不含 `scheduled`），所以由 GitHub Actions 呼叫它。
* 流程：`collector.yml` 每 5 分鐘（`*/5 * * * *`，也可 `workflow_dispatch`）→ 步驟 1：`curl -X POST -H "Authorization: Bearer $INGEST_TOKEN" https://mpb-fetcher.numenaslan.workers.dev/run`（Worker 抓 MPB → 裁切 → service binding → 主 Worker `/api/ships/ingest`；**只有 MPB > 0 艘且 ingest 2xx 才回 200，否則 502**；重試 3 次）並檢查主 Worker 的 `mpbAgeSec ≤ 300`；步驟 2：`scripts/collect-once.mjs`（`MPB=0`）抓一次 CWA（地震／颱風／警報）並收聽 aisstream（從 runner 實測可用；舊範圍 60 秒約 40–46 則訊息，2026-11-04 擴大到 0–45°N、105–145°E 後 60 秒約 110 則，所以改收聽 `AIS_SEC=120` 秒），最後檢查 `/api/ships`（`updated`）與 `/api/quakes`（`time`）時間戳。步驟 2 在步驟 1 失敗時仍會執行（CWA／aisstream 保持新鮮），但整個 run 仍為紅燈。
* **失敗會大聲：** `mpb-fetcher` 非 2xx／0 艘／ingest 非 ok、`mpbAgeSec` 過舊、CWA 全部失敗、任一 ingest 非 2xx、或 Worker 時間戳沒更新，整個 run 會失敗（紅燈＋GitHub 通知信）；每次 run 的 Summary 頁有 JSON 摘要。aisstream 為 best-effort，失敗不致命。
* Secrets（Repo → Settings → Secrets）：`INGEST_TOKEN`（同時是 `mpb-fetcher` 的 Bearer 與其 Worker secret）、`CWA_API_KEY`、`AISSTREAM_API_KEY`、`WORKER_URL`。需要 Node ≥ 22，所以 workflow 用 Node 22。
* **限制：** GitHub 的排程是 best-effort，實際間隔常是 5–15 分鐘、尖峰時可能略過；排程只在預設分支執行；公開 repo 若 60 天無 commit 排程會被自動停用。最新資料時間：`/api/ships` → `updated`／`ageSec`／`mpbAgeSec`，`/api/quakes` → `time`。主 Worker 最多追蹤 4,000 艘（`trimShips`），`/api/ships` 最多回傳 2,500 艘，所以 `mpb-fetcher` 回報的 `ships`（約 7,000）會多於 `count`。
* **風險：** MPB 端點未公開、有地理封鎖，可能日後也擋 Cloudflare 位址，或 placement 對應的資料中心改變；屆時 workflow 會紅燈。備援：台灣／住宅 IP 上的 `scripts/ais-collector.mjs`，或 AWS Lambda（ap-east-2 台北）／GCP Cloud Run（asia-east1）同樣邏輯。

### 事故紀錄與監控：船舶資料中斷（2026-11-03 13:26–14:20 台北時間）
* **根因：** `mpb-fetcher` 在免費方案只有 10 ms CPU，解析 ~3 MB 的 MPB GeoJSON（約 8,000 筆）超過上限，從 05:26 UTC 起每次 `/run` 都以 `exceededCpu`（HTTP 503、空內容）結束；因為 Worker 在寫 KV 執行紀錄前就被中止，紀錄也停在 05:25。30 分鐘沒有新資料後，主 Worker 依 `KEEP_MS`＝30 分鐘把所有船隻視為過期，所以 `/api/ships` 變成 0（資料並非被部署清除；與 quake 部署無關，部署時間在其後）。
* **修正：** `mpb-fetcher` 不再解析，只把 MPB 回應串流到 `POST /api/ships/ingest-mpb`，由 Hub Durable Object（30 秒 CPU）解析、裁切、去重。
* **監控：** 代理 Worker 的 `*/2` cron 檢查 `mpbAgeSec`：超過 7 分鐘（錯過一個 5 分鐘週期）就透過 service binding `FETCHER` 自行呼叫 `mpb-fetcher /run`；超過 15 分鐘標記 `mpbStale`，`GET /api/health` 回 503（也回報遺失的 binding），`/api/ships` 帶 `mpbStale`；GitHub 收集器最後一步 `Health gate` 在 0 艘船、MPB 過舊或 binding 遺失時讓整個 run 變紅；前端在這些情況顯示「船舶資料暫時無法使用」提示而不是空地圖。
* **部署不再弄丟 binding：** `proxy/deploy-metadata.json` 是完整 binding 清單，`scripts/deploy-proxy-cf.mjs` 由它產生部署內容並檢查有無遺失（見 `proxy/DEPLOY.md`）。


## 資料新鮮度與辨識信心（2026-11-03）
* **新鮮度**：前端用 `/api/ships` 的 `mpbAgeSec`（航港局）、`/api/quakes/live` 的 `updated`（各來源最近成功時間的最大值）、`/api/pla` 的 `updated.mnd|js`（Worker 最後一次成功抓取）換算成「資料更新於 N 分鐘前」。琥珀色門檻：船舶 10 分、地震 10 分、MND 60 分、Joint Staff 90 分、aisstream 補充來源 60 分。
* **信心等級**（`src/app.js` 的 `shipConf` / `airConf`）：**確認** = 國防部／日本統合幕僚監部官方資料；**高信心** = 名稱符合 CCG／PLAN 規則（或曾以 CCG 名稱出現），或航空器同時符合 ≥ 2 個獨立訊號（軍籍旗標、中國 ICAO 位址、PLA 機型、PLA 呼號）；**推測** = 只靠 MMSI 413875xxx 號段、只靠 ICAO 0x7A1000–0x7A4FFF 位址段、MMSI 412/413＋船型 35，或「政府船舶」（AIS 55 類）推論。所有非「確認」都不是官方認定。


## 全海域共軍標示 / PLA marking across the whole area (2026-11-04)

**(a) 偵測到的（疑似）** — 與台灣周邊相同的規則，套用到整個 0–45°N、105–145°E 的 AIS 與 ADS-B：
* 船舶（`proxy/src/ais.mjs`）：MMSI 413875 號段、名稱含 CHINACOASTGUARD／HAI JING／海警 → 疑似海警；PLA NAVY／PLAN+舷號／海軍、或 MMSI 412/413 + AIS 類型 35 → 疑似共軍。船舶排序時一律最優先（`shipRank` 0），所以 4000／2500 的上限不會把它們擠掉；GitHub Actions 收集器（`scripts/collect-once.mjs`）精簡訊息時同樣把可疑 MMSI 排在最前面（`summary.ais.suspects`）。
* 航空器（`proxy/src/flights.mjs` 的 `plaSuspect`）：軍用旗標、中國 ICAO 段（0x780000–0x7BFFFF，排除香港／台灣）、PLA 機型、PLA／CHN 呼號、0x7A1000–0x7A4FFF 段，多訊號組合才標；`thinFlights` 讓疑似共機優先於 800 架上限。
* 信心標示不變：確認／高信心／推測；介面一律是「疑似」。
* **限制**：軍艦、軍機多半關閉 AIS／ADS-B，台灣以外 aisstream 與 adsb.lol 的接收站也比較稀疏，所以這一層本來就只是很小的子集。介面在船舶／航班／PLA 面板的圖例與「更新內容」都有說明。

**(b) 官方通報位置（概略）** — `◆`，信心「確認」（資料出自官方公告；位置本身是概略）：
* 來源：防衛省・統合幕僚監部「報道発表資料」（公共データ利用規約 第1.0版，PDL 1.0；經本站加工）。每則公告的 PDF 內有「○月○日 ○時ごろ、〇〇の〇〇約〇〇kmの海域」，由 `parseJsPdfText` 取出（`place`、`seen`）。
* 換算（`proxy/src/intel.mjs` 的 `geocodeJsPlace` / `jsGeo`，在 Worker 內完成，`/api/pla` 的每個事件多一個 `geo[]`）：參考地點表（約 60 個日本島嶼／岬角）＋ 8 方位 ＋ 距離 → 大約座標；不確定半徑 `max(30 km, 0.4·距離 + 10 km)`（8 方位誤差約 ±22.5°，距離四捨五入）。「AとBの間」取中點；航空機公告只公布通過的海域（沖宮、与那台、大隅海峡、対馬海峡…），取海域中心與海域半徑；只有「東シナ海」這種太籠統的不標。
* 範圍：近 7 日、最多 24 筆；日期愈舊愈淡。點標示開啟 PLA 面板的詳細卡（時間 JST、原文地點、換算方式、艦番号、機種、PDF 連結、「這是通報當時的位置，不是即時位置」）。
* 國防部（MND）每日通報只有「示意圖」圖片與數量，沒有可轉成座標的文字，所以**沒有**轉成標記（只在 PLA 面板連到原圖）。
* 評估後**未採用**：菲律賓海岸防衛隊／AMTI／SeaLight（公開報導與圖片，沒有機器可讀的資料與明確再散布條款）、海上保安庁尖閣周邊統計（HTML 表格只有隻數沒有位置）、防衛省空自緊急發進統計（季報 PDF，只有次數與方位圖）。

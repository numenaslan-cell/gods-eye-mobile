# 資料來源與 CORS 測試記錄 / Data sources & CORS test log

測試日期 / Tested: 2026-11-01（Asia/Taipei）。測試環境：Linux 沙盒 `curl` 加上 `Origin: https://example.github.io` 標頭，並用 headless Chrome 實際載入頁面。
> 注意：沙盒網路無法連到 `opensky-network.org`（TLS 在連線階段被中斷），所以 OpenSky「即時回應」在本機無法親自驗證；其 CORS 結論依據官方文件與公開 issue。

| 端點 Endpoint | 結果 Result | 備註 Notes |
|---|---|---|
| `https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle` | ✅ HTTP 200，`access-control-allow-origin: *`，約 2.7 KB | 可從任何來源直接用 `fetch()` |
| `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle` | ✅ HTTP 200，`access-control-allow-origin: *`，約 2.67 MB（15,899 顆） | 在 headless Chrome 實測可載入、解析並用 SGP4 推算；短時間重複下載會被擋（實測遇到 HTTP 403），所以 App 會快取 2 小時並自動退回 `stations` 群組 |
| `https://opensky-network.org/api/states/all?lamin=21.5&lomin=119&lamax=26.5&lomax=123` | ⚠️ 無法在沙盒測試；**第三方來源的 CORS 不可靠** | 官方文件未承諾 CORS；公開 issue 與第三方測試顯示對非自家 origin 不送 `Access-Control-Allow-Origin`。匿名額度：每日 400 credits（此範圍 20 平方度＝1 credit/次），超過回 `429` + `X-Rate-Limit-Retry-After-Seconds` |
| `https://api.adsb.lol/v2/point/…`、`https://opendata.adsb.fi/api/v2/…`（替代來源） | ❌ 可用但**沒有** CORS 標頭 | 瀏覽器端無法直接使用；`api.airplanes.live` 回 403（需申請） |

## 船舶 AIS、推播與過境預測的資料來源 / Ships (AIS), push alerts & pass predictions

調查日期 / Researched: 2026-11-01（Asia/Taipei）。

| 來源 Source | 結論 Verdict | 備註 Notes |
|---|---|---|
| **aisstream.io**（採用 / chosen） | ✅ 免費 WebSocket、需 API key（以 GitHub 登入後在 Account 頁產生）、支援 bounding box | 官方文件：**不允許瀏覽器直連**（要求由自己的伺服器代理）、key 只能放伺服器端；同時連線數上限 3 條；訂閱須在 3 秒內送出；**無 SLA**、不保證補送。**截至調查日未找到公開的 Terms of Service／商業使用／署名條款**；→ 作品集／展示用途風險低；若要做**商業產品**，請先向 aisstream 取得書面許可。台灣周邊的地面站涵蓋率未能在沒有 key 的情況下驗證。 |
| AISHub | ⚠️ 免費，但採「資料交換」：必須自己架設 AIS 接收站並持續分享資料才能取得 API | 沒有接收站的人無法使用。 |
| 交通部航港局「臺灣海域船舶即時資訊系統」`mpbais.motcmpb.gov.tw` | ⚠️ 網站前端使用的端點（未公開文件）；**不是**官方開放資料 API，也沒有公開授權條款 | 不採用：未公開、可能隨時變更，且不宜在作品集專案中依賴。航港局「政府資料開放平台」只有各商港進出港動態資料集，不是即時 AIS 船位。 |
| Digitraffic（芬蘭）、BarentsWatch（挪威） | ❌ 僅涵蓋各自海域 | 不適用台灣。 |
| MarineTraffic、VesselFinder、Datalastic 等 | ❌ 商業付費 API | 不符合「免費」限制。 |

**架構 Architecture：** 瀏覽器 → `GET /api/ships`（自己的 Cloudflare Worker）→ Durable Object `Hub`（以 alarm 觸發、每次約 25 秒連到 `wss://stream.aisstream.io/v0/stream`，只訂閱台灣周邊 20–27.5°N、118–124.5°E 的位置／靜態訊息，彙整後存入 DO storage，保留 30 分鐘）。API key 是 Worker secret `AISSTREAM_API_KEY`，從不出現在前端。沒有 key、尚未部署或請求失敗時，前端自動顯示橘色 **DEMO DATA**（沿真實航道生成的示範船隻）。

* 中國海警（CCG）判斷是**啟發式**：AIS 船名含 `HAIJING`／`HAI JING`／`CHINA COAST GUARD`／`CCG nnnn`／`海警`，或「船型 55（執法）＋中國 MMSI 前綴 412/413/414」。AIS 沒有「海警」欄位，所以可能漏報或誤報；介面與推播內文都標示「非官方確認」。
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

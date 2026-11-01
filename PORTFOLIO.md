# God's Eye View // ORB-7 — 作品集案例介紹

> **一句話介紹：** 手機優先的 3D 地球儀，把台灣周邊的真實航班、船舶（AIS）、地震／颱風／警特報、共機動態與約 15,900 顆真實衛星，用公開資料即時畫在手機上；前端是純靜態網頁，後端只有一支免費方案的 Cloudflare Worker。

* 🔗 **線上 Demo：** <https://numenaslan-cell.github.io/gods-eye-mobile/>
* 💻 **原始碼：** <https://github.com/numenaslan-cell/gods-eye-mobile>

![God's Eye View 手機版畫面（390×844）](screenshots/390x844.png)

## 想法與要解決的問題

公開的航班、船舶、氣象與衛星資料很多，但多半是原始 JSON／CSV／TLE 文字，一般人看不懂，也很難在手機上順暢瀏覽；而且各來源的 CORS、限流、IP 封鎖、授權條款都不同。這個專案想回答一個問題：**能不能只用公開資料、免費的雲端額度與瀏覽器，做出一個「打開網址就能看、手機單手能操作」的即時資料視覺化？**

做法是把多個公開資料源整合成儀表板式的 three.js 3D 地球；資料抓不到時不會變成空白畫面，而是明確標示並改用示範資料或備援來源。

> 介面風格是虛構的「諜報儀表板」，僅為展示用途；使用的皆為公開資料，不代表任何真實監控系統。船舶「疑似海警」標記是依 AIS 名稱／船型推測的啟發式結果，並非官方辨識；資料不得用於導航或安全相關用途。

## 主要功能

* 🌐 **手機優先的 3D 地球儀**（three.js）：日間 `DAY`／夜視 `NVG`／熱像 `THERM` 三種顯示模式，晝夜交界線依現在時間計算
* ✈️ **台灣周邊即時航班**：由 Worker `/api/flights` 以 [adsb.lol](https://adsb.lol)（ODbL）為主，某個範圍失敗時改用 adsb.fi，最後才用 OpenSky；以 2 個 250 海浬圓涵蓋台灣、依 `hex` 去重、10 秒邊緣快取。每 15 秒更新，兩次更新之間依航向與速度平滑推算；Flight HUD 顯示呼號、高度、速度、航向、升降率，可跟隨單一航班
* 🚢 **台灣周邊船舶（AIS）**：合併**交通部航港局（MPB）臺灣海域船舶即時資訊**與 aisstream.io，依 MMSI 合併；依貨輪／油輪／客輪／漁船／其他上色，**疑似中國海警（CCG）以紅色標示**並有專屬計數／切換鈕；CCG 判斷為名稱＋船型啟發式（名稱含 HAIJING／CHINA COAST GUARD／海警等一律算；僅靠 MMSI 前綴時排除漁船型別 30 與 HAIXUN 海事巡邏船）
* 🌏 **地震／颱風／警特報**：USGS 近 30 天 M3.0+ 地震；Worker 取得**中央氣象署（CWA）**有感地震報告、目前活動的颱風與各縣市警特報並疊加顯示；CWA 沒有資料時自動退回 USGS
* 🛡️ **PLA 分頁**：最新一天共機架次／逾越中線／共艦數與近 7 日趨勢（第三方整理自國防部日報，非官方），以及海巡署新聞 RSS 中提到「海警」的項目（30 分鐘快取）
* 🛰️ **約 15,900 顆真實衛星**（CelesTrak TLE，實測 `active` 群組 15,899 顆）：用 satellite.js (SGP4) 在瀏覽器內每 5 秒推算位置；台灣上空衛星清單與 ISS 一鍵追蹤
* 🔭 **過境預測**：依定位（預設台北）預測未來 72 小時 ISS、天宮與數顆亮星的過境（起／峰／止、最高仰角、是否可能看得到），並有「LOOK HERE」方位指引
* 🔔 **Web Push 提醒（頁面關閉也會收到）**：台灣周邊 M4.5+ 地震、AIS 出現疑似海警船、ISS 過境前約 5 分鐘；每種可分別開關
* 🔎 搜尋呼號、船名／MMSI、衛星名稱或座標；快速定位台北 101、桃園機場、台灣上空
* 📲 **PWA 可安裝**：manifest、圖示、Service Worker（只快取靜態檔，資料一律走網路）
* 🧯 **優雅的 Demo 退路**：CORS 被擋、斷網、逾時、HTTP 429 時，顯示橘色 **DEMO DATA** 徽章並改用示範資料，之後自動退避重試

## 技術堆疊

* 前端：JavaScript、React 18、three.js（3D 地球與自訂 shader）、手寫的行動優先 CSS、satellite.js 6.0.2（SGP4）
* 邊緣後端：Cloudflare Workers（免費方案）＋ Durable Object（SQLite，儲存船舶資料與提醒狀態）＋ KV（推播訂閱）＋ Cron Trigger（每 2 分鐘）＋ Cache API
* Web Push：以 WebCrypto 手寫 RFC 8291（aes128gcm）加密與 RFC 8292 VAPID（ES256）簽章，單元測試含 RFC 測試向量
* 資料收集器：Node.js 腳本（跑在一般網路 IP 的機器上），低頻率抓取 aisstream、航港局 MPB 與 CWA，再 POST 到 Worker
* 資料來源：adsb.lol、adsb.fi、OpenSky Network、aisstream.io、交通部航港局 MPB、中央氣象署開放資料、USGS、pla-tracker（第三方整理國防部日報）、海巡署 RSS、CelesTrak
* 測試與部署：Worker 邏輯 20 個單元測試（Node）；本機 workerd 端對端測試；headless Chrome 在 390×844 截圖驗證；GitHub Pages 靜態部署；貼圖為 NASA Blue Marble／Black Marble

## 解決的技術難題

1. **CORS 與資料代理**：多數來源（adsb.lol／adsb.fi、OpenSky）不對第三方網站開放 CORS。Worker 代理只允許本站與 localhost 來源，把各來源正規化成前端既有的航班格式，並以 Cache API 快取 10 秒，讓多位訪客共用一次上游請求；前端連不到新路由時還會退回舊的 OpenSky 路由。
2. **多來源備援與限流**：航班走 adsb.lol → adsb.fi（遵守其 1 request／秒）→ OpenSky 的逐段備援；前端遇錯誤以 60 秒起、指數退避、上限 10 分鐘重試，遇 429 優先採用伺服器回傳的等待時間。
3. **雲端 IP 被封鎖，改用收集器轉送（collector ingest）**：aisstream.io 會中斷來自 Cloudflare 的 WebSocket（連上後 1–2 秒關閉），中央氣象署的防火牆則對 Worker 的請求回「Request Rejected」。解法是讓跑在一般網路 IP 的收集器去抓這些來源，正規化後以 Bearer token 驗證的 `/api/*/ingest` 送進 Worker 的 Durable Object；航港局 MPB（需帶 Referer、約 2.9 MB GeoJSON）也走同一條路，每 2 分鐘一次、先裁切到台灣周邊與必要欄位。
4. **Worker 免費方案的 CPU 限制與船舶數量上限**：前端 Worker 每次請求 CPU 預算很小，所以大型 JSON（船舶、CWA、RSS）都放在 Durable Object 內解析並快取，前端 Worker 只做串流轉送。航港局回傳區域內約 7,000 多艘船，而前端每艘船是一個 3D 物件，因此 Worker 最多儲存 4,000 艘、回應最多 2,500 艘，排序為「疑似海警 > 貨／油／客輪等 > 移動中的漁船與未知型別 > 靜止者」。
5. **跨來源合併**：航港局與 aisstream 的船以 MMSI 合併——位置以較新者為準，名稱／船型／IMO 由任一方補齊，並標示資料來源（`ais`／`mpb`／`both`）；航港局時間為台北時間（UTC+8）需正確換算。
6. **Web Push 在免費方案上的做法**：訂閱存在 KV，Cron 每 2 分鐘喚醒 Durable Object 檢查地震、海警船與 ISS 過境，去重狀態存在 DO storage；推播內容用 WebCrypto 手刻加密與 VAPID 簽章（不依賴 Node 套件），只允許已知推播服務網域，過期的訂閱（404／410）自動清除。
7. **資料真實性與授權**：實測發現航港局端點未公開文件、adsb.fi 與海巡署 RSS 限非商業使用、aisstream 無公開條款，因此在介面與 `docs/DATA-SOURCES.md` 逐一標示出處與限制；CWA 金鑰只存在 Worker secret／收集器環境變數，不進 repo 與前端。
8. **TLE 快取與手機版面**：約 2.7 MB 的 `active` TLE 快取在 localStorage 2 小時（失敗時退回舊快取或 `stations`）；375–430 px 直式不橫向捲動、按鈕 ≥ 44 px、HUD 面板一次只展開一個，並處理 safe-area。

## 我可以幫你做什麼

* 📊 **客製化即時資料儀表板**：串接你的 API／公開資料，做成可在手機與桌機閱讀的即時儀表板
* 🗺️ **地圖／3D 地球視覺化**：地理資料、軌跡、移動物件的互動式呈現
* 📱 **行動優先網頁 App（PWA）**：可安裝、斷線時有退路、版面適應各種手機螢幕
* ☁️ **輕量後端／邊緣代理**：用 Cloudflare Workers 處理 CORS、快取與限流問題

GitHub：[numenaslan-cell](https://github.com/numenaslan-cell)

---

# English Version

**God's Eye View // ORB-7** — a mobile-first 3D globe that renders real flights, ships (AIS), earthquakes / typhoons / warnings, PLA daily activity and ~15,900 real satellites around Taiwan from open data. The front end is a static page; the only backend is one free-plan Cloudflare Worker.

* **Live demo:** <https://numenaslan-cell.github.io/gods-eye-mobile/>
* **Source:** <https://github.com/numenaslan-cell/gods-eye-mobile>

![Mobile screenshot, 390×844](screenshots/390x844.png)

### Idea
Public flight, ship, weather and satellite data is abundant but raw (JSON / CSV / TLE) and hard to explore on a phone — and every source has its own CORS, rate-limit, IP-blocking and licence quirks. This project merges several open feeds into a dashboard-style three.js globe that works from a plain URL and degrades gracefully (fallback sources, clearly labelled demo data). The "spy dashboard" styling is fictional and for demonstration only; the "suspected China Coast Guard" marker is a name/type heuristic, not an official identification, and nothing here is for navigation or safety use.

### Features
* Mobile-first three.js globe with **DAY / NVG / THERM** modes and a computed day–night terminator
* **Flights** via the Worker's `/api/flights`: [adsb.lol](https://adsb.lol) (ODbL) first, adsb.fi when a circle fails, OpenSky as last resort; two 250 nm circles cover Taiwan, deduped by `hex`, 10 s edge cache; 15 s client refresh with dead reckoning; flight HUD with follow mode
* **Ships (AIS):** Taiwan Maritime Port Bureau (MPB, 交通部航港局) feed merged with aisstream.io by MMSI; colour by ship class, **suspected China Coast Guard vessels highlighted in red** with their own counter / cycle button (heuristic: name matches such as HAIJING / CHINA COAST GUARD / 海警 always count; MMSI-prefix-only matches exclude fishing type 30 and HAIXUN maritime-safety patrol ships)
* **Earthquakes / typhoon / warnings:** USGS 30-day M3.0+ quakes, overlaid with Central Weather Administration (CWA) felt-quake reports, active typhoons and county warnings; falls back to USGS when no CWA data is available
* **PLA tab:** latest-day PLA aircraft / median-line crossings / ships plus a 7-day trend (third-party compilation of Taiwan MND daily reports — unofficial), and Taiwan Coast Guard Administration (CGA) news items that mention 海警 (30 min cache)
* **~15,900 real satellites** from CelesTrak TLEs (15,899 in `active` when tested), SGP4 in the browser every 5 s; satellites over Taiwan, one-tap ISS tracking
* **Pass predictions:** next 72 h of ISS / Tiangong / bright satellites for the user's location, with visibility and a "LOOK HERE" compass
* **Web Push alerts** (work with the page closed): M4.5+ quakes near Taiwan, suspected CCG vessel in AIS, ISS pass ~5 min ahead; each toggled separately
* Search by callsign, ship name / MMSI, satellite or coordinates; **installable PWA** (static-only service worker); **graceful DEMO DATA fallback**

### Tech stack
* Front end: JavaScript, React 18, three.js, satellite.js 6.0.2 (SGP4), hand-written mobile-first CSS
* Edge backend: Cloudflare Workers (free plan) + Durable Object (SQLite) + KV + Cron Trigger (every 2 min) + Cache API
* Web Push: hand-written RFC 8291 (aes128gcm) encryption and RFC 8292 VAPID (ES256) on WebCrypto, unit-tested with the RFC test vector
* Data collector: a Node.js script on a normal-IP machine that polls aisstream, the MPB feed and CWA at low frequency and posts to the Worker
* Data: adsb.lol, adsb.fi, OpenSky, aisstream.io, MPB, CWA open data, USGS, pla-tracker (third party), CGA RSS, CelesTrak
* Testing / deploy: 20 Node unit tests for the Worker logic, local workerd end-to-end runs, headless-Chrome screenshots at 390×844, GitHub Pages; NASA Blue/Black Marble textures

### Technical challenges solved
1. **CORS proxy** — most sources (adsb.lol / adsb.fi, OpenSky) don't allow third-party origins. The Worker allows only the site and localhost, normalises everything to the client's existing flight format and caches 10 s via the Cache API so visitors share one upstream call; the client falls back to the legacy OpenSky route if the new one is unreachable.
2. **Multi-source fallback and rate limits** — per-circle adsb.lol → adsb.fi (respecting its 1 req/s) → OpenSky; client backoff from 60 s to 10 min, honouring `X-Rate-Limit-Retry-After-Seconds` on 429.
3. **Cloudflare IPs blocked → collector ingest** — aisstream.io closes WebSockets from Cloudflare within 1–2 s, and CWA's firewall answers the Worker with "Request Rejected". A collector on a normal IP fetches those sources, normalises them and posts them to bearer-token-protected ingest routes feeding the Durable Object. The MPB feed (needs a Referer header, ~2.9 MB GeoJSON) takes the same path every 2 min, trimmed to the Taiwan box and the needed fields.
4. **Worker CPU limits and the ship cap** — the front Worker has a small per-request CPU budget, so big JSON (ships, CWA, RSS) is parsed and cached inside the Durable Object and merely streamed through. MPB returns 7,000+ ships in the box and the client draws one 3D object per ship, so the Worker stores at most 4,000 and serves at most 2,500, ranked: suspected CCG > cargo / tanker / passenger etc. > moving fishing / unknown > stationary.
5. **Cross-source merge** — MPB and aisstream ships are merged by MMSI: the fresher position wins, name / type / IMO are filled from either, and the origin (`ais` / `mpb` / `both`) is kept; MPB timestamps are Taipei time (UTC+8) and converted accordingly.
6. **Web Push on the free plan** — subscriptions in KV; a cron wakes the Durable Object every 2 min to check quakes, CCG vessels and ISS passes, with dedupe state in DO storage; payloads use hand-rolled WebCrypto encryption and VAPID signing, only allow-listed push hosts are accepted, and expired subscriptions (404 / 410) are removed.
7. **Data honesty and licensing** — the MPB endpoint is undocumented, adsb.fi and the CGA RSS are non-commercial, aisstream publishes no terms; each is credited in the UI and in `docs/DATA-SOURCES.md`. The CWA key lives only in a Worker secret / the collector's environment, never in the repo or the front end.
8. **TLE caching and mobile layout** — the ~2.7 MB `active` TLE set is cached in localStorage for 2 h (fallback: stale cache, then `stations`); 375–430 px portrait without horizontal scroll, ≥ 44 px touch targets, one HUD panel open at a time, safe-area handling.

### What I can build for you
* Custom **real-time dashboards** on top of your APIs or open data
* **Map and 3D globe visualizations** of geospatial and moving-object data
* **Mobile-first web apps / PWAs**
* Lightweight **edge backends** (Cloudflare Workers, Durable Objects, Web Push) for CORS, caching, rate limits and blocked-IP workarounds

GitHub: [numenaslan-cell](https://github.com/numenaslan-cell)

---

# 短版自我介紹（104／Tasker／LinkedIn）

資料視覺化接案｜自製手機優先 3D 地球儀，整合台灣周邊航班、船舶 AIS、地震／颱風警特報、共機動態與約 1.59 萬顆真實衛星，附 Web Push 提醒；前端靜態、後端為免費方案 Cloudflare Worker，可安裝成 PWA。可承接即時資料儀表板、地圖／3D 視覺化、邊緣代理與行動網頁 App。Demo：numenaslan-cell.github.io/gods-eye-mobile

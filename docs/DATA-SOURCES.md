# 資料來源與 CORS 測試記錄 / Data sources & CORS test log

測試日期 / Tested: 2026-11-01（Asia/Taipei）。測試環境：Linux 沙盒 `curl` 加上 `Origin: https://example.github.io` 標頭，並用 headless Chrome 實際載入頁面。
> 注意：沙盒網路無法連到 `opensky-network.org`（TLS 在連線階段被中斷），所以 OpenSky「即時回應」在本機無法親自驗證；其 CORS 結論依據官方文件與公開 issue。

| 端點 Endpoint | 結果 Result | 備註 Notes |
|---|---|---|
| `https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle` | ✅ HTTP 200，`access-control-allow-origin: *`，約 2.7 KB | 可從任何來源直接用 `fetch()` |
| `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle` | ✅ HTTP 200，`access-control-allow-origin: *`，約 2.67 MB（15,899 顆） | 在 headless Chrome 實測可載入、解析並用 SGP4 推算；短時間重複下載會被擋（實測遇到 HTTP 403），所以 App 會快取 2 小時並自動退回 `stations` 群組 |
| `https://opensky-network.org/api/states/all?lamin=21.5&lomin=119&lamax=26.5&lomax=123` | ⚠️ 無法在沙盒測試；**第三方來源的 CORS 不可靠** | 官方文件未承諾 CORS；公開 issue 與第三方測試顯示對非自家 origin 不送 `Access-Control-Allow-Origin`。匿名額度：每日 400 credits（此範圍 20 平方度＝1 credit/次），超過回 `429` + `X-Rate-Limit-Retry-After-Seconds` |
| `https://api.adsb.lol/v2/point/…`、`https://opendata.adsb.fi/api/v2/…`（替代來源） | ❌ 可用但**沒有** CORS 標頭 | 瀏覽器端無法直接使用；`api.airplanes.live` 回 403（需申請） |

## App 的行為 / App behaviour

* 航班：先打 `openskyBase`（預設官方）。失敗（CORS／網路／逾時／429）→ 顯示橘色 **DEMO DATA** 徽章並用示範航班，之後以退避方式重試（60 s → 10 min；429 則依 `X-Rate-Limit-Retry-After-Seconds`，讀不到就 5 分鐘）。成功時每 15 秒更新（頁面在背景時暫停），並在兩次更新之間以航向與速度推算位置。
* 因為匿名每日只有 400 credits，持續 15 秒更新大約 100 分鐘就會用完；用完後會自動退避並顯示 DEMO DATA。想穩定運作請部署 `proxy/cloudflare-worker.js`（會把 10 秒內的請求合併成一次上游呼叫），再把 `assets/config.js` 的 `openskyBase` 指到你的 worker。
* 衛星：CelesTrak TLE（預設 `active`，約 1.6 萬顆）→ satellite.js (SGP4) 每 5 秒推算；顯示總數、台灣範圍（經緯度框 21.5–26.5°N、119–123°E）正上方的衛星、以及 ISS 位置。失敗則退回 `stations`，再失敗才用示範資料。

## 授權 / Licences of bundled third-party material

* satellite.js 6.0.2 — MIT（`assets/vendor/satellite.js-LICENSE.md`）
* React 18、three.js r171、lucide icons — MIT（打包在 `assets/app.bundle.js`；原始 artifact 的 bundle 回收而來）
* 地球貼圖 — NASA Earth Observatory：*Blue Marble Next Generation w/ Topography and Bathymetry*（日）、*Black Marble 2012*（夜）。NASA 影像一般屬公有領域，建議仍保留致謝。
* 航班資料 — OpenSky Network；衛星軌道資料 — CelesTrak（T.S. Kelso）。請遵守各自的使用條款，學術引用請見 OpenSky 官網。

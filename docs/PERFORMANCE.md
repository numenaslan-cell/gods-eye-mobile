# 效能 / Performance (2026-11-04)

目標：約 20% 的載入 LCP 很差（有的 >10 秒），主因是 3D 地球與大型資料擋住第一次繪製。

## 做了什麼
- `index.html` 先放一個靜態骨架與 splash 文字（LCP 元素 = 第一次繪製），`gods-eye:last` 把上次的統計數字立刻填進去。
- 腳本用 `<link rel=preload>`，並在 LCP 候選項被觀察到之後才執行（2.5 秒逾時／rAF 後備）；`file://` 時才載入 base64 的 `textures.js`（1.3 MB，原本擋住首次 React 繪製）。
- three.js 場景初始化延後（rAF + setTimeout）。貼圖漸進式：1k WebP（51 KB + 20 KB）先上，閒置時再換 4096/2048 WebP（jpg 後備）。
- 衛星 TLE（2.7 MB）與過境計算改走 `Data.idle`；NASA GIBS 圖磚本來就只在放大時載入。
- preconnect 到 Worker；Worker API 回應走 gzip；`sw.js` v14。

## 量測（線上、手機）
| 指標 | 之前 | 之後 |
|---|---|---|
| Lighthouse mobile LCP | 7577 / 7535 / 7545 ms | 981 / 927 / 933 / 938 ms（= FCP） |
| Playwright（4x CPU、1.6 Mbps/150 ms）LCP | 6616–6640 ms | 756 / 708 / 724 ms |
| 前 ~12 秒傳輸量 | 1216 KB | 321 KB |
| LCP 元素 | `footer.ge-credit`（React 頁尾） | 骨架 splash `<p>` |
| Lighthouse 分數 | 0.36 | ~0.6 |

Lighthouse 的 TBT（~150 秒）在前後都一樣，是沙盒軟體 GL（swiftshader）造成的假象，不是真機數字。

## 限制
GitHub Pages 無法設定快取標頭（固定 10 分鐘）或 brotli。

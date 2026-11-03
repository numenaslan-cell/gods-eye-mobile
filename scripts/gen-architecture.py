# Run from the repo root: python3 scripts/gen-architecture.py  -> docs/architecture.svg ; PNG: headless Chrome screenshot of that SVG at 1330x640 (see README)
# generates docs/architecture.svg (hand-laid-out, no mermaid layout engine)
W,H=1330,640
o=[]
def esc(t): return t.replace("&","&amp;").replace("<","&lt;")
def box(x,y,w,h,lines,fill="#12202c",stroke="#2c4a60",tc="#e6f1f8",sub=None,bold=True,fs=13):
    o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>')
    n=len(lines); lh=fs+4; y0=y+h/2-(n-1)*lh/2+fs*0.35
    for i,l in enumerate(lines):
        wgt="700" if (i==0 and bold) else "400"; col=tc if i==0 else "#9fb7c8"
        o.append(f'<text x="{x+w/2}" y="{y0+i*lh}" text-anchor="middle" font-size="{fs if i==0 else fs-2}" font-weight="{wgt}" fill="{col}">{esc(l)}</text>')
def group(x,y,w,h,title,stroke="#35607a",fill="#0e1a24"):
    o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{fill}" stroke="{stroke}" stroke-width="1.5" stroke-dasharray="6 4"/>')
    o.append(f'<text x="{x+14}" y="{y+22}" font-size="14" font-weight="700" fill="#7fd1ff">{esc(title)}</text>')
def arrow(d,label=None,lx=0,ly=0,color="#5fb4e6",dash=False,anchor="middle"):
    da=' stroke-dasharray="6 4"' if dash else ''
    o.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="1.8"{da} marker-end="url(#ah)"/>')
    if label:
        for i,l in enumerate(label.split("\n")):
            o.append(f'<text x="{lx}" y="{ly+i*13}" text-anchor="{anchor}" font-size="11" fill="#ffd27f" stroke="#0b1620" stroke-width="3" paint-order="stroke">{esc(l)}</text>')
o.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="Noto Sans CJK TC, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif">')
o.append('<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#5fb4e6"/></marker></defs>')
o.append(f'<rect width="{W}" height="{H}" fill="#0b1620"/>')
o.append('<text x="20" y="26" font-size="17" font-weight="800" fill="#ffffff">God\'s Eye View — 系統架構 / Architecture</text>')
# columns titles
o.append('<text x="20" y="52" font-size="14" font-weight="700" fill="#7fd1ff">① 資料來源 Sources</text>')
# sources
S=[("交通部航港局 MPB",["AIS GeoJSON ~7,000 艘"]),("aisstream.io",["AIS WebSocket"]),("CWA S3 mirror",["地震 · 颱風 · 警特報"]),("USGS · EMSC · GFZ",["地震 FDSN"]),
   ("國防部 MND",["每日共機共艦通報"]),("日本統合幕僚監部",["Joint Staff 報道発表"]),("adsb.lol → adsb.fi",["→ OpenSky 航班"]),("CelesTrak",["衛星 TLE"]),("NASA GIBS",["Blue Marble 圖磚 / 貼圖"])]
ys=[]
for i,(t,sub) in enumerate(S):
    y=64+i*64; ys.append(y); box(20,y,210,50,[t]+sub,fill="#14283a")
sc=[y+25 for y in ys]
# middle workers
o.append('<text x="290" y="52" font-size="14" font-weight="700" fill="#7fd1ff">② Cloudflare Workers（免費方案）· ③ GitHub Actions</text>')
box(290,ys[0],230,50,["mpb-fetcher","台灣 placement · cron 5 分鐘"],fill="#1c3040",stroke="#f6821f")
box(290,ys[1]-8,230,76,["GitHub Actions","collector：aisstream + CWA 備援","pla-intel：Joint Staff PDF 艦號"],fill="#241f3a",stroke="#8b7bff",fs=13)
box(290,ys[4]-6,230,ys[5]-ys[4]+62,["pla-intel","台灣 placement · 無公開路由","抓 MND 與 Joint Staff"],fill="#1c3040",stroke="#f6821f")
# proxy container
group(600,64,400,520,"gods-eye-opensky-proxy",stroke="#f6821f")
box(620,96,360,70,["Worker 路由 API","/api/ships · /api/quakes/live","/api/pla · /api/health · /api/push"],fill="#1c3040",stroke="#f6821f")
box(620,196,360,84,["Durable Object「Hub」(SQLite)","船舶合併 · 地震多來源合併去重","PLA 狀態 · 推播去重"],fill="#1c3040",stroke="#f6821f")
box(620,310,170,56,["KV「SUBS」","推播訂閱"],fill="#1c3040",stroke="#f6821f")
box(810,310,170,56,["Cache API","航班 10 秒快取"],fill="#1c3040",stroke="#f6821f")
box(620,396,360,112,["Cron 每 2 分鐘 + watchdog","MPB 逾 7 分 → 呼叫 mpb-fetcher /run","收集器逾 10 分 → workflow_dispatch（需 token，選配）","地震 / PLA 輪詢 · 推播檢查 · ISS TLE"],fill="#2a2418",stroke="#ffb020")
o.append('<text x="620" y="528" font-size="11" fill="#9fb7c8">watchdog 狀態與新舊度公開於 /api/health 與 /api/ships（mpbAgeSec · aisAgeSec）</text>')
# right column
o.append('<text x="1070" y="52" font-size="14" font-weight="700" fill="#7fd1ff">④ 前端 · ⑤ 通知</text>')
box(1070,130,240,84,["GitHub Pages","手機 PWA · React + three.js","Service Worker（只快取靜態檔）"],fill="#14301f",stroke="#3dff9a")
box(1070,396,240,56,["Web Push","FCM / Mozilla / Apple"],fill="#14301f",stroke="#3dff9a")
box(1070,270,240,56,["手機使用者","390×844 · 可加入主畫面"],fill="#14301f",stroke="#3dff9a")
# arrows
arrow(f"M230,{sc[0]} H290")
arrow(f"M230,{sc[1]} H290")
arrow(f"M230,{sc[2]} H560 V224 H620","條件式 GET（cron）",400,sc[2]-6)
arrow(f"M230,{sc[3]} H540 V250 H620","cron 抓取",420,sc[3]-6)
arrow(f"M230,{sc[4]} H290"); arrow(f"M230,{sc[5]} H290")
arrow(f"M230,{sc[6]} H570 V150 H620","每次請求（Cache API）",360,sc[6]-6)
arrow(f"M230,{sc[7]} H585 V260 H620","ISS TLE（cron）· 6 小時快取",335,sc[7]-6)
arrow(f"M520,{ys[0]+25} H575 V120 H620","binding",532,ys[0]+12,anchor="start")
arrow(f"M520,{ys[1]+30} H590 V135 H620","POST",545,ys[1]+22,anchor="start")
arrow(f"M520,{ys[4]+55} H600 V175 H620",None)
o.append(f'<text x="528" y="{ys[4]+44}" font-size="11" fill="#ffd27f" stroke="#0b1620" stroke-width="3" paint-order="stroke">service binding INTEL</text>')
arrow("M700,396 V310 H700 M700,396 V370",None)  # placeholder removed below
o.pop()
# cron -> mpb-fetcher (dashed up-left) and -> GHA
arrow(f"M620,452 H560 V{ys[0]+40} H520","逾時重跑 /run",470,ys[0]+58,dash=True,color="#ffb020")
arrow(f"M620,436 H545 V{ys[1]+52} H520","workflow_dispatch",470,ys[1]+70,dash=True,color="#ffb020")
# hub <-> api
arrow("M800,166 V196",None); 
# outputs
arrow("M980,125 H1030 V160 H1070","JSON · CORS",1028,118)
arrow("M980,250 H1030 V424 H1070",None); o.append('<text x="1070" y="388" font-size="11" fill="#ffd27f" stroke="#0b1620" stroke-width="3" paint-order="stroke">地震 · 海警 · ISS 推播</text>')
arrow("M1190,214 V270"); arrow("M1190,396 V326")
arrow(f"M230,{sc[7]+8} H1050 V190 H1070",None,color="#5fb4e6")
o.append(f'<text x="760" y="{sc[7]+4}" font-size="11" fill="#ffd27f" stroke="#0b1620" stroke-width="3" paint-order="stroke">衛星 TLE（瀏覽器直連）</text>')
arrow(f"M230,{sc[8]} H1060 V200 H1070",None)
o.append(f'<text x="760" y="{sc[8]-6}" font-size="11" fill="#ffd27f" stroke="#0b1620" stroke-width="3" paint-order="stroke">圖磚 / 貼圖（瀏覽器直連）</text>')
for i,t in enumerate(["實線＝資料流 · 虛線＝watchdog / 觸發","aisstream 會拒絕 Cloudflare IP，","故改由 GitHub Actions 收集"]): o.append(f'<text x="1070" y="{520+i*17}" font-size="11" fill="#9fb7c8">{t}</text>')
o.append('</svg>')
open('docs/architecture.svg','w').write("\n".join(o))

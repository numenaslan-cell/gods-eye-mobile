/**
 * PLA-activity intelligence parsers (pure functions, no network): shared by the Worker (Hub DO, mnd/js scrapers) and the GitHub Actions PDF step.
 *
 *  - Taiwan MND (國防部) daily bulletin 「中共解放軍臺海周邊海、空域動態」: list page -> detail page -> aircraft / PLAN ships / official ships (公務船) + map image.
 *  - Japan Ministry of Defense Joint Staff (統合幕僚監部) press releases 「中国海軍艦艇の動向について」「中国軍機の動向について」:
 *      index HTML titles give class + strait + direction + aircraft type; the PDF text (pdftotext) gives hull numbers (艦番号), observation time and place.
 *      Licence: 公共データ利用規約 第1.0版 (PDL 1.0, CC BY-compatible) — attribute 防衛省・統合幕僚監部 and say the data was processed.
 * Everything here is descriptive official reporting, not an identification made by this app.
 */
import { PLAN_HULLS } from "./plahulls.mjs";

export const MND_BASE = "https://www.mnd.gov.tw/";
export const JS_BASE = "https://www.mod.go.jp";
export const JS_INDEX = JS_BASE + "/js/press/index.html";

const ent = (s) => String(s).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const strip = (html) => ent(String(html).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "").replace(/<(br|\/p|\/div|\/li|\/h\d)[^>]*>/gi, "\n").replace(/<[^>]+>/g, "")).replace(/[ \t\u00a0\u3000]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
const pad = (n) => String(n).padStart(2, "0");
const rocIso = (y, m, d) => (+y + 1911) + "-" + pad(m) + "-" + pad(d);

/* ------------------------------------------------------------------ Taiwan MND */
/** List page -> [{ id, date: "2026-11-02", title }] newest first (only the 「臺海周邊海、空域動態」 bulletins). */
export function parseMndList(html) {
  const out = [], re = /href="news\/plaact\/(\d+)"[^>]*>[\s\S]*?<div class="date[^"]*">(\d{3})\.(\d{2})\.(\d{2})<\/div>[\s\S]*?<div class="title[^"]*">([\s\S]*?)<\/div>/g;
  let m; while ((m = re.exec(html))) { const title = strip(m[5]); if (/動態/.test(title)) out.push({ id: m[1], date: rocIso(m[2], m[3], m[4]), title }); }
  return out;
}

/** Detail page -> one day's official counts. Returns null when the page has no 「共艦/共機」 sentence at all. */
export function parseMndDetail(html, id) {
  const s0 = html.indexOf("發布單位"), body = s0 >= 0 ? html.slice(Math.max(0, s0 - 300)) : html;
  const k = body.indexOf("關鍵字"), main = k > 0 ? body.slice(0, k) : body;
  const text = strip(main);
  const dm = /(\d{3})\.(\d{2})\.(\d{2})/.exec(text) || /(\d{3})\.(\d{2})\.(\d{2})/.exec(html);
  const win = /(\d{2,3})年\s*(\d{1,2})月\s*(\d{1,2})日[^0-9\n]{0,12}0*600時至\s*(\d{2,3})年\s*(\d{1,2})月\s*(\d{1,2})日/.exec(text);
  const num = (re) => { const m = re.exec(text); return m ? +m[1] : null; };
  const aircraftRaw = num(/共機\s*(\d+)\s*架次/), plan = num(/共艦\s*(\d+)\s*艘/), official = num(/公務船\s*(\d+)\s*艘/);
  if (aircraftRaw == null && plan == null && official == null) return null;
  const aircraft = aircraftRaw != null ? aircraftRaw : /未偵獲共機/.test(text) ? 0 : null;
  const par = /共機\s*\d+\s*架次\s*[（(]([^）)]*)[）)]/.exec(text);
  const adiz = par ? (/計\s*(\d+)\s*架/.exec(par[1]) || [])[1] : null;
  const maps = []; const imgRe = /(?:src|href)="((?:https?:\/\/www\.mnd\.gov\.tw\/)?NewUpload\/[^"]+\.(?:jpe?g|png))"/gi; let im;
  while ((im = imgRe.exec(main))) { let u = ent(im[1]); if (!/^https?:/.test(u)) u = MND_BASE + u; try { u = encodeURI(decodeURI(u)); } catch { /* keep */ } if (!maps.includes(u)) maps.push(u); }
  const note = text.split("\n").filter((l) => /^[三四五六七八]、/.test(l.trim())).join(" ").slice(0, 240) || null;
  const balloon = /空飄氣球[^。\n]*?(\d+)\s*顆/.exec(text);
  const date = dm ? rocIso(dm[1], dm[2], dm[3]) : null;
  return {
    id: String(id), date, aircraft, adiz: adiz != null ? +adiz : null, crossed: /逾越中線/.test(par ? par[1] : ""), plan, official,
    balloons: balloon ? +balloon[1] : null, note, map: maps.find((u) => /示意圖/.test(decodeURIComponentSafe(u))) || maps[0] || null,
    from: win ? rocIso(+win[1], win[2], win[3]) + "T06:00:00+08:00" : null, to: win ? rocIso(+win[4], win[5], win[6]) + "T06:00:00+08:00" : null,
    url: MND_BASE + "news/plaact/" + id,
  };
}
function decodeURIComponentSafe(u) { try { return decodeURIComponent(u); } catch { return u; } }

/* ------------------------------------------------------------------ Japan Joint Staff */
const nfkc = (s) => String(s).normalize("NFKC");
// class names as they appear in the Japanese reports (NFKC-normalised: Ⅲ -> III) -> English label + PLAN type code (for the hull -> ship name table)
export const JS_CLASSES = {
  "ルーヤンIII": ["Luyang III (Type 052D) destroyer", "052D"], "ルーヤンII": ["Luyang II (Type 052C) destroyer", "052C"], "ルーヤンI": ["Luyang I (Type 052B) destroyer", "052B"],
  "レンハイ": ["Renhai (Type 055) destroyer", "055"], "ジャンカイII": ["Jiangkai II (Type 054A) frigate", "054A"], "ジャンカイI": ["Jiangkai I (Type 054) frigate", "054"],
  "フチ": ["Fuchi (Type 903) replenishment ship", "903"], "フユ": ["Fuyu (Type 901) fast combat support ship", "901"], "ドンディアオ": ["Dongdiao (Type 815) intelligence ship", "815"],
  "ユージャオ": ["Yuzhao (Type 071) amphibious ship", "071"], "ジャンウェイII": ["Jiangwei II (Type 053H3) frigate", "053H"], "ルーフー": ["Luhu (Type 052) destroyer", "052"],
  "ジャンダオ": ["Jiangdao (Type 056) corvette", "056"], "ソブレメンヌイ": ["Sovremenny destroyer", "956"], "クズネツォフ": ["Kuznetsov-class carrier", "CV"], "海警船": ["China Coast Guard ship", ""],
};
const JS_STRAITS = [
  [/沖縄本島-宮古島間|沖宮/, "Miyako Strait (Okinawa–Miyako)"], [/大隅海峡/, "Osumi Strait"], [/奄美大島-横当島間/, "Amami–Yokoate gap"], [/与那国島-西表島間/, "Yonaguni–Iriomote gap"],
  [/対馬海峡/, "Tsushima Strait"], [/宗谷海峡/, "Soya Strait"], [/津軽海峡/, "Tsugaru Strait"], [/与那台/, "Yonaguni–Taiwan gap"], [/東シナ/, "East China Sea"], [/男女群島/, "Danjo Islands"], [/黄海/, "Yellow Sea"], [/渤海/, "Bohai Sea"],
];
const CV_EN = { "遼寧": "Liaoning", "山東": "Shandong", "福建": "Fujian" };
const carrierEn = (c) => { const m = /^空母「([^」]+)」(?:ほか(\d+)隻)?/.exec(c); return m ? "Aircraft carrier " + (CV_EN[m[1]] || m[1]) + (m[2] ? " + " + m[2] + " other ships" : "") : c; };
const JS_DIRS = { "北東": "NE", "北西": "NW", "南東": "SE", "南西": "SW", "北": "N", "南": "S", "東": "E", "西": "W" };
const strEn = (s) => { for (const [re, en] of JS_STRAITS) if (re.test(s)) return en; return ""; };

/** One press-release title -> structured fields. `kind`: ship | air (China-related only; returns null for anything else, e.g. Russia-only releases).
 *  A title can hold several groups, e.g. （ルーヤンⅢ、フユ／沖縄本島－宮古島間北西進）（ルーヤンⅢ、フチ／…南東進）: `groups[]` keeps them apart, `classes`/`types` are the unions. */
export function parseJsTitle(title) {
  const t = nfkc(title).replace(/[\s\u3000]+/g, " ").trim();
  const ship = /^中国(及びロシア)?海軍艦艇/.test(t), air = /^(中国軍機|中国及びロシア軍機|推定中国機)/.test(t);
  if (!ship && !air) return null;
  const ev = { kind: ship ? "ship" : "air", classes: [], types: [], groups: [] };
  if (/ロシア/.test(t)) ev.joint = true;
  const clsEn = (c) => (JS_CLASSES[c] ? JS_CLASSES[c][0] : /^空母/.test(c) ? carrierEn(c) : c);
  for (const gm of t.matchAll(/\(([^()]*)\)/g)) {
    const g = { classes: [], classEn: [], types: [], where: [], whereEn: [], dirs: [], notes: [] };
    const parts = gm[1].split("/").map((x) => x.trim()).filter(Boolean);
    if (ship) {
      // first part: classes (「、」 separated); a part with 間/海峡/沖… is the strait (+ direction); anything else (発着艦, 南シナ海へ, 中露共同航行 …) is a note
      for (const [i, p0] of parts.entries()) {
        const w = /間|海峡|沖|岬|水道|群島/.test(p0);
        if (i === 0 && !w) { for (const c of p0.split(/[、,]/)) if (c) { g.classes.push(c); g.classEn.push(clsEn(c)); } continue; }
        const p = p0.replace(/[ー―−]/g, "-");
        if (w) { const d = /(北東|北西|南東|南西|北|南|東|西)進/.exec(p); g.where.push(p.replace(/(北東|北西|南東|南西|北|南|東|西)進$/, "")); g.whereEn.push(strEn(p)); g.dirs.push(d ? JS_DIRS[d[1]] : ""); }
        else g.notes.push(p0);
      }
    } else {
      for (const p of parts) for (const tok of p.replace(/[ー―−]/g, "-").split(/[\s・,、]+/).filter(Boolean)) {
        if (/^(?:[A-Z]{1,3}-?\d{1,4}[A-Z]?|UAV)$/.test(tok)) { if (!g.types.includes(tok)) g.types.push(tok); } else if (strEn(tok)) { g.where.push(tok); g.whereEn.push(strEn(tok)); } else g.notes.push(tok);
      }
    }
    for (const c of g.classes) if (!ev.classes.includes(c)) ev.classes.push(c);
    for (const x of g.types) if (!ev.types.includes(x)) ev.types.push(x);
    ev.groups.push(g);
  }
  ev.classEn = ev.classes.map(clsEn);
  return ev;
}

/** Press-release index HTML (any prefix of the page is fine) -> China-related events, newest first.
 *  [{ id:"p20261102_03", date:"2026-11-02", title, pdf, kind, classes[], classEn[], types[], where[], whereEn[], dirs[], notes[] }] */
export function parseJsIndex(html) {
  const out = [], re = /<a[^>]+href="([^"]*\/js\/pdf\/(\d{4})\/(p\d{8}_\d{2})\.pdf)"[^>]*>\s*<time datetime="(\d{4}-\d{2}-\d{2})">[\s\S]*?<h5>([\s\S]*?)<\/h5>/g;
  let m; while ((m = re.exec(html))) {
    const title = strip(m[5]), f = parseJsTitle(title); if (!f) continue;
    out.push({ id: m[3], date: m[4], title, pdf: (/^https?:/.test(m[1]) ? m[1] : JS_BASE + m[1]), ...f });
  }
  return out;
}

/** PDF text (pdftotext output, any layout) -> { ships:[{cls,clsEn,type,name,hull,ship}], aircraft:[types], uav, scramble, seen, place }.
 *  Hull numbers are written 艦番号「１２１」 (full-width, may be wrapped across lines) — NFKC + whitespace removal first. */
export function parseJsPdfText(text) {
  const t = nfkc(text).replace(/\s+/g, "");
  const ships = [], seenKey = new Set();
  const re = /([ァ-ヶー]{2,12}(?:III|II|I)?)級([^()「」。、]{1,14}?)(?:「([^」]{1,8})」)?(?:\d+隻)?\(艦番号((?:「\d+」)+)\)/g;
  let m; while ((m = re.exec(t))) {
    const info = JS_CLASSES[m[1]];
    for (const h of m[4].match(/\d+/g)) {
      const key = m[1] + h; if (seenKey.has(key)) continue; seenKey.add(key);
      const code = info ? info[1] : "", nm = (PLAN_HULLS[code] || {})[h] || (code === "CV" && m[3] ? m[3] : "");
      ships.push({ cls: m[1], clsEn: info ? info[0] : "", type: m[2], hull: h, ...(m[3] ? { name: m[3] } : {}), ...(nm ? { ship: nm } : {}) });
    }
  }
  const aircraft = [...new Set([...t.matchAll(/([A-Z]{1,3}-\d{1,4}[A-Z]?)[^×(]{0,10}×\d+機/g)].map((x) => x[1]))];
  const sm = /令和(\d+)年(\d+)月(\d+)日\([月火水木金土日]\)(午前|午後|正午)?(?:(\d+)時)?(?:(\d+)分)?/.exec(t.slice(t.indexOf("(お知らせ)") >= 0 ? t.indexOf("(お知らせ)") : 0).replace(/^.*?令和\d+年\d+月\d+日統合幕僚監部/, "")) ;
  let seen = null;
  if (sm) { let h = sm[4] === "正午" ? 12 : sm[5] != null ? +sm[5] : null; if (h != null && sm[4] !== "正午") { if (sm[4] === "午後" && h < 12) h += 12; if (sm[4] === "午前" && h === 12) h = 0; } seen = (2018 + +sm[1]) + "-" + pad(sm[2]) + "-" + pad(sm[3]) + (h != null ? "T" + pad(h) + ":" + pad(sm[6] || 0) + ":00+09:00" : ""); }
  const pl = /海上自衛隊は、(.{2,70}?)において/.exec(t);
  return { ships, aircraft, uav: /推定中国無人機|無人機/.test(t), scramble: /緊急発進/.test(t), seen, place: pl ? pl[1] : null };
}

/** Attach the parsed-PDF detail (if any) to the title-level events and fill hull -> ship names. */
export function mergeJs(events, details) {
  return events.map((e) => { const d = details && details[e.id]; return d ? { ...e, ships: d.ships || [], aircraftDetail: d.aircraft || [], uav: d.uav || false, scramble: d.scramble || false, seen: d.seen || null, place: d.place || null } : e; });
}

/* ------------------------------------------------------------------ Japan Joint Staff -> approximate map position
 * The releases give the first sighting as "<reference place>(<prefecture>)の<8-point direction>約<N>kmの海域" (ships) and, for aircraft, only a passage name (沖宮 = Okinawa–Miyako gap …).
 * We turn that into an APPROXIMATE position (reference point + bearing + distance) with an uncertainty radius: the direction has 8 points (±22.5° => lateral error up to ~0.4·d) and the
 * distance is rounded, so r = max(30 km, 0.4·d + 10 km). Aircraft / ships without a distance get the centre of the named passage and the passage's radius. Never a track, never a fix. */
const GAZ = { // reference places in Japanese releases -> [lat, lon]
  "宮古島": [24.78, 125.33], "沖縄本島": [26.5, 127.95], "久米島": [26.35, 126.8], "与那国島": [24.47, 123.0], "西表島": [24.33, 123.8], "石垣島": [24.45, 124.2], "尖閣諸島": [25.75, 123.5], "魚釣島": [25.75, 123.47],
  "奄美大島": [28.3, 129.4], "横当島": [27.24, 128.99], "徳之島": [27.8, 128.95], "与論島": [27.04, 128.4], "沖永良部島": [27.37, 128.57], "口永良部島": [30.46, 130.2], "種子島": [30.6, 131.0], "屋久島": [30.35, 130.5], "トカラ列島": [29.5, 129.7],
  "都井岬": [31.37, 131.34], "佐多岬": [31.0, 130.66], "室戸岬": [33.25, 134.18], "足摺岬": [32.72, 133.02], "潮岬": [33.43, 135.76], "男女群島": [32.0, 128.4], "五島列島": [32.7, 128.8], "対馬": [34.4, 129.3], "壱岐": [33.78, 129.7], "隠岐": [36.2, 133.3], "隠岐諸島": [36.2, 133.3],
  "南大東島": [25.85, 131.23], "北大東島": [25.95, 131.3], "沖大東島": [24.47, 131.23], "沖ノ鳥島": [20.42, 136.08], "硫黄島": [24.78, 141.32], "父島": [27.1, 142.2], "八丈島": [33.1, 139.8], "伊豆大島": [34.75, 139.4],
  "佐渡島": [38.0, 138.4], "能登半島": [37.5, 137.3], "竜飛岬": [41.25, 140.35], "宗谷岬": [45.52, 141.94], "礼文島": [45.4, 141.04], "利尻島": [45.18, 141.24], "襟裳岬": [41.93, 143.25], "金華山": [38.28, 141.58], "犬吠埼": [35.71, 140.87], "御前崎": [34.6, 138.23], "潮岬沖": [33.43, 135.76],
  "鹿児島": [31.6, 130.55], "長崎": [32.75, 129.87], "福江島": [32.68, 128.84], "甑島": [31.75, 129.85], "馬毛島": [30.74, 130.99], "奄美": [28.3, 129.4], "沖縄": [26.5, 127.95],
  "済州島": [33.38, 126.55], "青島": [36.07, 120.38], "大連": [38.92, 121.6], "上海": [31.23, 121.47], "山東半島": [37.4, 122.5],
};
const DIR_DEG = { "北東": 45, "北西": 315, "南東": 135, "南西": 225, "北": 0, "南": 180, "東": 90, "西": 270 };
// passages named in the titles -> [centre lat, lon, radius km, English label]; used when there is no "N km from X" sentence (all aircraft releases)
export const JS_ZONES = [
  [/沖縄本島-宮古島間|沖宮/, [25.6, 126.3, 110, "Miyako Strait (Okinawa–Miyako gap)"]], [/大隅海峡/, [30.9, 131.0, 70, "Osumi Strait"]], [/奄美大島-横当島間/, [28.0, 129.2, 70, "Amami–Yokoate gap"]],
  [/与那国島-西表島間/, [24.4, 123.4, 55, "Yonaguni–Iriomote gap"]], [/与那台/, [24.3, 122.6, 80, "Yonaguni–Taiwan gap"]], [/対馬海峡/, [34.0, 129.5, 110, "Tsushima Strait"]],
  [/宗谷海峡/, [45.75, 142.0, 60, "Soya Strait"]], [/津軽海峡/, [41.5, 140.6, 50, "Tsugaru Strait"]], [/男女群島/, [32.0, 128.4, 60, "Danjo Islands"]],
  [/渤海/, [38.8, 120.0, 180, "Bohai Sea"]], [/黄海/, [35.5, 123.5, 300, "Yellow Sea"]], [/済州島/, [33.0, 126.5, 80, "Jeju area"]],
];
const R_KM = 6371;
export function destPoint(lat, lon, bearingDeg, km) {
  const φ1 = lat * Math.PI / 180, λ1 = lon * Math.PI / 180, θ = bearingDeg * Math.PI / 180, δ = km / R_KM;
  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
  const λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
  return [Math.round(φ2 * 180 / Math.PI * 100) / 100, Math.round(((λ2 * 180 / Math.PI + 540) % 360 - 180) * 100) / 100];
}
/** "宮古島(沖縄県)の南東約210kmの海域" -> { lat, lon, rKm, basis:"bearing", ref, dir, km } | null. Also handles "AとBの間" (midpoint). */
export function geocodeJsPlace(place) {
  const t = nfkc(place || "").replace(/\s+/g, "").replace(/\([^)]*\)/g, "");
  const m = /^(.{2,10}?)の(北東|北西|南東|南西|北|南|東|西)約?(\d{1,4})km/.exec(t);
  if (m && GAZ[m[1]]) {
    const km = +m[3], [la, lo] = GAZ[m[1]], [lat, lon] = destPoint(la, lo, DIR_DEG[m[2]], km);
    return { lat, lon, rKm: Math.round(Math.max(30, 0.4 * km + 10)), basis: "bearing", ref: m[1], dir: m[2], km };
  }
  const b = /^(.{2,8}?)と(.{2,8}?)の間/.exec(t);
  if (b && GAZ[b[1]] && GAZ[b[2]]) { const [a1, o1] = GAZ[b[1]], [a2, o2] = GAZ[b[2]]; return { lat: Math.round((a1 + a2) / 2 * 100) / 100, lon: Math.round((o1 + o2) / 2 * 100) / 100, rKm: 80, basis: "between", ref: b[1] + "–" + b[2] }; }
  return null;
}
/** One (index-level or PDF-merged) Joint Staff event -> approximate markers [{ lat, lon, rKm, basis, label }] (empty when nothing can be placed; the vague 東シナ海 alone is not placed). */
export function jsGeo(ev) {
  if (!ev) return [];
  if (ev.place) { const g = geocodeJsPlace(ev.place); if (g) return [{ lat: g.lat, lon: g.lon, rKm: g.rKm, basis: g.basis, label: g.basis === "bearing" ? g.ref + "の" + g.dir + "約" + g.km + "km" : g.ref }]; }
  const names = [...new Set(((ev.groups || []).flatMap((g) => g.where || [])).concat(nfkc(ev.title || "").match(/沖宮|与那台|東シナ/g) || []))], out = [];
  for (const w of names) for (const [re, z] of JS_ZONES) if (re.test(w)) { if (!out.some((o) => o.lat === z[0] && o.lon === z[1])) out.push({ lat: z[0], lon: z[1], rKm: z[2], basis: "zone", label: z[3] }); break; }
  return out.slice(0, 2);
}

/* ------------------------------------------------------------------ China Coast Guard hull numbers */
const CCG_LOCAL = { 11: ["江蘇", "Jiangsu"], 12: ["上海", "Shanghai"], 13: ["浙江", "Zhejiang"], 14: ["福建", "Fujian"], 21: ["廣東", "Guangdong"], 22: ["廣西", "Guangxi"], 23: ["海南", "Hainan"], 31: ["遼寧", "Liaoning"], 32: ["河北", "Hebei"], 33: ["天津", "Tianjin"], 34: ["山東", "Shandong"] };
const CCG_DIRECT = { 1: ["上海", "Shanghai (Bureau 1)"], 2: ["寧波", "Ningbo, Zhejiang (Bureau 2)"], 3: ["廣州", "Guangzhou (Bureau 3)"], 4: ["文昌", "Wenchang, Hainan (Bureau 4)"], 5: ["三亞", "Sanya, Hainan (Bureau 5)"], 6: ["青島", "Qingdao (Bureau 6)"] };
/** AIS name -> CCG hull number string, or null. CHINACOASTGUARD14530, "CHINA COAST GUARD 2901", "HAI JING 2102", "CCG 3305", 海警2901. */
export function ccgHull(name) {
  const n = String(name || "").toUpperCase();
  const m = /CHINA ?COAST ?GUAR[D]? ?(\d{3,5})|(?:HAI ?JING|CCG) ?(\d{3,5})/.exec(n) || /海警\s*(\d{3,5})/.exec(String(name || ""));
  return m ? m[1] || m[2] : null;
}
/** Hull number -> home bureau per the numbering scheme (5 digits: province bureau by the first two digits; 4 digits: directly-subordinate bureau by the first digit). Descriptive only. */
export function decodeCcgHull(hull) {
  const h = String(hull || "");
  if (/^\d{5}$/.test(h) && CCG_LOCAL[h.slice(0, 2)]) return { kind: "local", zh: CCG_LOCAL[h.slice(0, 2)][0] + "省/市分局", en: CCG_LOCAL[h.slice(0, 2)][1] + " provincial bureau", short: CCG_LOCAL[h.slice(0, 2)][1] };
  if (/^\d{4}$/.test(h) && CCG_DIRECT[h[0]]) return { kind: "direct", zh: "海警直屬局 " + CCG_DIRECT[h[0]][0], en: "Directly subordinate bureau — " + CCG_DIRECT[h[0]][1], short: CCG_DIRECT[h[0]][1].replace(/ \(Bureau \d\)/, "") };
  return null;
}

/* ------------------------------------------------------------------ state helpers (used by the Hub Durable Object; pure) */
export const PLA_ATTRIBUTION = {
  mnd: "中華民國國防部「中共解放軍臺海周邊海、空域動態」 (mnd.gov.tw) — Taiwan MND daily bulletin (data republished as-is: counts and map link).",
  js: "防衛省・統合幕僚監部「報道発表資料」 (mod.go.jp/js) — Japan Ministry of Defense Joint Staff press releases, 公共データ利用規約 第1.0版 (PDL 1.0). Titles/PDF figures were extracted and re-structured by this app (processed data), not endorsed by the Ministry.",
};
const str = (v, n) => (typeof v === "string" ? v.slice(0, n) : "");
const intOrNull = (v) => (Number.isInteger(v) && v >= 0 && v < 100000 ? v : null);

/** Validate/limit one PDF-derived detail object posted by GitHub Actions. */
export function sanitizeJsDetail(d) {
  if (!d || typeof d !== "object") return null;
  const ships = (Array.isArray(d.ships) ? d.ships : []).slice(0, 24).map((s) => ({ cls: str(s && s.cls, 24), clsEn: str(s && s.clsEn, 60), type: str(s && s.type, 24), hull: /^\d{1,4}$/.test(String(s && s.hull)) ? String(s.hull) : "", ...(s && s.name ? { name: str(s.name, 12) } : {}), ...(s && s.ship ? { ship: str(s.ship, 30) } : {}) })).filter((s) => s.hull || s.cls);
  return { ships, aircraft: (Array.isArray(d.aircraft) ? d.aircraft : []).slice(0, 12).map((x) => str(x, 12)).filter(Boolean), uav: !!d.uav, scramble: !!d.scramble, seen: str(d.seen, 30), place: str(d.place, 90) };
}
export function sanitizeMndDay(d) {
  if (!d || typeof d !== "object" || !/^\d{4,6}$/.test(String(d.id)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(d.date))) return null;
  const url = (u) => (typeof u === "string" && /^https:\/\/www\.mnd\.gov\.tw\//.test(u) ? u.slice(0, 300) : null);
  return { id: String(d.id), date: d.date, aircraft: intOrNull(d.aircraft), adiz: intOrNull(d.adiz), crossed: !!d.crossed, plan: intOrNull(d.plan), official: intOrNull(d.official), balloons: intOrNull(d.balloons), note: str(d.note, 240) || null, map: url(d.map), from: str(d.from, 30) || null, to: str(d.to, 30) || null, url: url(d.url) || MND_BASE + "news/plaact/" + d.id };
}
/** Fresh index events -> keep the last `keepDays` days, newest first, max `max`. */
export function pruneJsEvents(events, nowMs, keepDays = 45, max = 60) {
  const cut = new Date(nowMs - keepDays * 86400000).toISOString().slice(0, 10);
  return events.filter((e) => e && /^p\d{8}_\d{2}$/.test(e.id) && e.date >= cut).sort((a, b) => (a.id < b.id ? 1 : -1)).slice(0, max);
}
/** Ship events (and air events) that still lack PDF-derived detail, newest first. */
export function needPdf(events, details, limit = 12) {
  return events.filter((e) => !(details && details[e.id])).slice(0, limit).map((e) => e.id);
}
/** What GET /api/pla serves. */
export function plaPublic(P, now) {
  const mnd = P.mnd || {}, js = P.js || {};
  const days = (mnd.list || []).map((l) => (mnd.days || {})[l.id]).filter(Boolean).sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 14);
  const events = mergeJs(js.events || [], js.details || {}).map((e) => { const geo = jsGeo(e); return geo.length ? { ...e, geo } : e; });
  return {
    time: now, updated: { mnd: mnd.okAt || null, js: js.okAt || null }, errors: { mnd: mnd.err || null, js: js.err || null },
    mnd: { source: "國防部 MND", url: MND_BASE + "news/plaactlist", attribution: PLA_ATTRIBUTION.mnd, days },
    js: { source: "統合幕僚監部 (Japan Joint Staff)", url: JS_INDEX, licence: "PDL 1.0", attribution: PLA_ATTRIBUTION.js, events: events.slice(0, 40) },
    needPdf: needPdf(js.events || [], js.details || {}),
  };
}

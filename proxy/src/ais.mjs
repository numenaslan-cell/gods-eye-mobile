import { ccgHull, decodeCcgHull } from "./intel.mjs";
/* AIS helpers: merge aisstream.io messages into a per-MMSI map; China Coast Guard heuristic. Pure functions. */
// Coverage area (2026-11-04): South China Sea, Taiwan, the western Pacific out to 145E and Japan up to 45N. aisstream's terrestrial coverage right around Taiwan is almost empty
// (measured: 1 vessel / 2 min inside 20–27.5N 118–124.5E), while Hong Kong / S. China, the Philippines and Japan are well covered. MPB (Taiwan AIS) stays Taiwan-only (MPB_BBOX).
export const AIS_BBOX = { lamin: 0.0, lomin: 105.0, lamax: 45.0, lomax: 145.0 };
export const CORE_BBOX = { lamin: 18.0, lomin: 114.0, lamax: 29.0, lomax: 128.0 }; // Taiwan + Strait + east coast: its vessels outrank equally-interesting ones elsewhere when the list is capped
export const AIS_TYPES = ["PositionReport", "StandardClassBPositionReport", "ExtendedClassBPositionReport", "ShipStaticData", "StaticDataReport"];

const num = (v) => (typeof v === "number" && isFinite(v) ? v : null);
const clean = (s) => (typeof s === "string" ? s.replace(/@+/g, " ").trim().replace(/\s+/g, " ") : "");

export function applyAis(map, msg, now) {
  const mt = msg && msg.MessageType, md = (msg && msg.MetaData) || {}, body = msg && msg.Message && msg.Message[mt];
  if (!mt || !body) return false;
  const mmsi = String(md.MMSI != null ? md.MMSI : body.UserID != null ? body.UserID : "");
  if (!/^\d{9}$/.test(mmsi)) return false;
  const s = map[mmsi] || (map[mmsi] = { mmsi });
  const nm = clean(md.ShipName); if (nm) s.name = nm;
  if (mt === "PositionReport" || mt === "StandardClassBPositionReport" || mt === "ExtendedClassBPositionReport") {
    const lat = num(body.Latitude != null ? body.Latitude : md.latitude != null ? md.latitude : md.Latitude);
    const lon = num(body.Longitude != null ? body.Longitude : md.longitude != null ? md.longitude : md.Longitude);
    if (lat == null || lon == null || Math.abs(lat) > 90 || Math.abs(lon) > 180 || (lat === 91 || lon === 181)) { return false; }
    s.lat = lat; s.lon = lon; s.t = now; s.src = s.src === "mpb" || s.src === "both" ? "both" : "ais";
    const sog = num(body.Sog); s.sog = sog != null && sog < 102.3 ? sog : null;      // 102.3 = not available
    const cog = num(body.Cog); s.cog = cog != null && cog < 360 ? cog : null;        // 360 = not available
    const hdg = num(body.TrueHeading); s.hdg = hdg != null && hdg < 360 ? hdg : null; // 511 = not available
    const nav = num(body.NavigationalStatus); if (nav != null) s.nav = nav;
    if (mt === "ExtendedClassBPositionReport") { const t = num(body.Type); if (t) s.type = t; const n2 = clean(body.Name); if (n2) s.name = n2; }
  } else if (mt === "ShipStaticData") {
    const t = num(body.Type); if (t) s.type = t;
    const n2 = clean(body.Name); if (n2) s.name = n2;
    const d = clean(body.Destination); if (d) s.dest = d.slice(0, 24);
  } else if (mt === "StaticDataReport") {
    const a = body.ReportA, b = body.ReportB;
    if (a) { const n2 = clean(a.Name); if (n2) s.name = n2; }
    if (b) { const t = num(b.ShipType); if (t) s.type = t; }
  }
  return true;
}

export const MAX_SHIPS_PUBLIC = 2500; // the client draws one mesh per ship: cap the payload, keep the interesting vessels first
export const MAX_SHIPS_STORED = 4000;
export const FAR_SHARE = 0.4;            // share of each cap reserved for vessels outside the Taiwan core (MPB alone has ~8000 Taiwan ships and used to crowd out the region)
export const AIS_KEEP_MS = 3 * 3600000;  // aisstream-only vessels: the GitHub collector runs every ~40-75 min, so keep them longer than MPB ones
export const inCore = (s) => s.lat != null && s.lat >= CORE_BBOX.lamin && s.lat <= CORE_BBOX.lamax && s.lon >= CORE_BBOX.lomin && s.lon <= CORE_BBOX.lomax;
export const keepFor = (s, keepMs) => (s.src === "ais" ? Math.max(keepMs, AIS_KEEP_MS) : keepMs);
/** items sorted best-first; take `cap`, guaranteeing min(farCount, share·cap) slots to non-core items (CCG/PLAN rank 0 are always first). */
export function fairTake(items, cap, isFar, share = FAR_SHARE) {
  if (items.length <= cap) return items.slice();
  const far = items.filter(isFar), q = Math.min(far.length, Math.floor(cap * share)), pick = new Set(far.slice(0, q));
  for (const x of items) { if (pick.size >= cap) break; pick.add(x); }
  return items.filter((x) => pick.has(x));
}

/** Lower = more interesting. CCG first, then commercial / special-purpose ships, then unknown, then fishing boats (moving before stationary). */
export function shipRank(s) {
  if (isCcg(s) || isPlan(s)) return 0;
  if (isResearch(s)) return 0.4;
  if (isGov(s)) return 0.5;
  if (isLeisureOrFishing(s)) return 5; // filtered from public list; trim first if still in storage
  const t = s.type || 0, moving = s.sog != null && s.sog > 0.5;
  const far = s.lat != null && (s.lat < CORE_BBOX.lamin || s.lat > CORE_BBOX.lamax || s.lon < CORE_BBOX.lomin || s.lon > CORE_BBOX.lomax) ? 0.25 : 0; // outside the Taiwan core: a notch behind
  if (t === 0) return (moving ? 3 : 4) + far; // type unknown (mostly small boats)
  return 1 + (moving ? 0 : 0.5) + far;
}

export function publicShips(map, now, keepMs, cap = MAX_SHIPS_PUBLIC) {
  const out = [];
  for (const s of Object.values(map)) {
    if (s.lat == null || !s.t || now - s.t > keepFor(s, keepMs)) continue;
    if (isLeisureOrFishing(s)) continue; // fishing / sailing / pleasure: drop before the 2500 cap so slots go to cargo / CCG / PLAN / research
    const o = { mmsi: s.mmsi, name: s.name || null, lat: s.lat, lon: s.lon, sog: s.sog != null ? s.sog : null, cog: s.cog != null ? s.cog : null, hdg: s.hdg != null ? s.hdg : null, type: s.type || null, dest: s.dest || null, nav: s.nav != null ? s.nav : null, ageSec: Math.round((now - s.t) / 1000), ccg: isCcg(s), plan: isPlan(s), src: s.src || "ais", _r: shipRank(s) };
    const why = ccgWhy(s); if (why) { o.ccgBy = why; const hull = ccgHull(s.name); if (hull) { o.hull = hull; const b = decodeCcgHull(hull); if (b) { o.bureau = b.short; o.bureauKind = b.kind; } } }
    else if (isGov(s)) o.gov = true;
    const rw = researchWhy(s); if (rw) { o.research = true; o.researchBy = rw; }
    out.push(o);
  }
  out.sort((a, b) => a._r - b._r || a.ageSec - b.ageSec);
  // Always surface suspected PLAN / CCG / Chinese research across the whole coverage area, even when the 2500 cap is full of Taiwan MPB traffic.
  const must = out.filter((o) => o.ccg || o.plan || o.research);
  const rest = out.filter((o) => !(o.ccg || o.plan || o.research));
  const list = must.concat(fairTake(rest, Math.max(0, cap - must.length), (o) => !inCore(o)));
  for (const o of list) delete o._r;
  list.total = out.length;
  return list;
}

/** Keep the map small enough for one Durable Object value (< 2 MB): drop the least interesting / oldest vessels beyond `max`. */
export function trimShips(map, max = MAX_SHIPS_STORED) {
  let n = 0;
  for (const k of Object.keys(map)) if (isLeisureOrFishing(map[k])) { delete map[k]; n++; } // free slots: fishing / yachts never need storage
  const keys = Object.keys(map); if (keys.length <= max) return n;
  keys.sort((a, b) => shipRank(map[a]) - shipRank(map[b]) || (map[b].t || 0) - (map[a].t || 0));
  const keep = new Set(fairTake(keys, max, (k) => !inCore(map[k])));
  for (const k of keys) if (!keep.has(k)) { delete map[k]; n++; }
  return n;
}

/* ---- MPB Taiwan AIS (交通部航港局 mpbais.motcmpb.gov.tw, undocumented GeoJSON) ---- */
export const MPB_BBOX = { lamin: 19.0, lomin: 116.0, lamax: 28.0, lomax: 126.0 };
// "2026/11/01 17:39:04" is Taipei local time (UTC+8)
export function parseMpbTime(str) {
  const m = /^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(String(str || "").trim());
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4] - 8, +m[5], +m[6]) : null;
}
/** GeoJSON feature -> compact ship record (or null when outside the box / invalid). Only the fields the app needs. */
export function normalizeMpb(f, box = MPB_BBOX) {
  const p = f && f.properties; if (!p) return null;
  const mmsi = String(p.MMSI || "").trim(); if (!/^\d{9}$/.test(mmsi)) return null;
  const lat = num(p.Latitude != null ? p.Latitude : f.geometry && f.geometry.coordinates && f.geometry.coordinates[1]);
  const lon = num(p.Longitude != null ? p.Longitude : f.geometry && f.geometry.coordinates && f.geometry.coordinates[0]);
  if (lat == null || lon == null || lat < box.lamin || lat > box.lamax || lon < box.lomin || lon > box.lomax) return null;
  const t = parseMpbTime(p.Record_Time); if (t == null) return null;
  const sog = num(p.SOG), cog = num(p.COG), nav = num(parseInt(p.Navigational_Status, 10)), type = num(p.Ship_and_Cargo_Type);
  const imo = String(p.IMO_Number || "").trim();
  const r = { mmsi, lat, lon, t, sog: sog != null && sog < 102.3 ? sog : null, cog: cog != null && cog < 360 ? cog : null, nav: nav != null && nav !== 15 ? nav : null, type: type || null };
  const name = clean(p.ShipName); if (name) r.name = name;
  if (/^\d{7}$/.test(imo) && imo !== "0000000") r.imo = imo;
  return r;
}
/** Whole MPB GeoJSON FeatureCollection -> {features, ships[] (one per MMSI, newest record, inside `box`), newest, oldest}. Heavy (3 MB JSON): run it in the Durable Object, never in a 10 ms-CPU Worker. */
export function normalizeMpbCollection(gj, box = { lamin: 19, lomin: 116, lamax: 28, lomax: 126 }) {
  const feats = gj && Array.isArray(gj.features) ? gj.features : [], by = new Map();
  for (const f of feats) { const x = normalizeMpb(f, box); if (x) { const o = by.get(x.mmsi); if (!o || o.t < x.t) by.set(x.mmsi, x); } }
  const ships = [...by.values()]; let newest = 0, oldest = Infinity;
  for (const x of ships) { if (x.t > newest) newest = x.t; if (x.t < oldest) oldest = x.t; }
  return { features: feats.length, ships, newest: ships.length ? newest : null, oldest: ships.length ? oldest : null };
}
/** Merge one normalised MPB record into the per-MMSI map. aisstream data newer than the MPB record wins for position; static fields are filled from either. */
export function applyMpb(map, r, now) {
  if (!r || !/^\d{9}$/.test(String(r.mmsi))) return false;
  const lat = num(r.lat), lon = num(r.lon); let t = num(r.t);
  if (lat == null || lon == null || Math.abs(lat) > 90 || Math.abs(lon) > 180 || t == null) return false;
  if (t > now) t = now;
  const s = map[r.mmsi] || (map[r.mmsi] = { mmsi: String(r.mmsi) });
  const had = s.src === "ais" || s.src === "both";
  if (!s.t || t >= s.t || s.lat == null) { // MPB record is at least as fresh (or the only one)
    s.lat = lat; s.lon = lon; s.t = t;
    const sog = num(r.sog), cog = num(r.cog), nav = num(r.nav);
    s.sog = sog != null ? sog : null; s.cog = cog != null ? cog : null; if (nav != null) s.nav = nav;
  }
  const nm = clean(r.name); if (nm && !s.name) s.name = nm.slice(0, 40);
  const ty = num(r.type); if (ty && !s.type) s.type = ty;
  if (r.imo && /^\d{7}$/.test(String(r.imo))) s.imo = String(r.imo);
  s.src = had ? "both" : "mpb"; s.mpbAt = t;
  return true;
}

/**
 * Heuristic only (AIS has no "coast guard" flag). Why a vessel is labelled "suspected China Coast Guard" (first match wins; `ccgWhy` returns the reason code):
 *  - "name":  name looks like a CCG hull (HAIJING / HAI JING / ZHONGGUO HAIJIAN / COAST GUARD / CCG nnnn / 海警 …) — whatever the type
 *  - "block": MMSI 413875xxx — the sub-range of the Chinese 413 MID in which CCG ships have been seen to transmit (observed, not an official allocation; fishing type 30 excluded)
 *  - "known": this MMSI was previously seen with a CCG name (remembered in KV by the Worker; `s.known` is set by the caller) — e.g. it now broadcasts a blank/other name
 * A type-55 (law enforcement) vessel under a Chinese MMSI prefix (412/413/414) that matches none of the above is NOT called CCG any more — see `isGov` (generic "government vessel").
 */
export function ccgWhy(s) {
  const raw = s.name || "", name = raw.toUpperCase();
  if (/(^|[^A-Z])(HAI ?JING|ZHONGGUO ?HAI ?(JING|JIAN)|CHINA ?COAST ?GUARD|CHINA ?COASTGUARD|CCG ?\d{3,5})([^A-Z]|$)/.test(name) || /CHINACOASTGUARD\d*/.test(name)) return "name";
  if (/海警/.test(raw)) return "name";
  if (s.type === 30) return null;
  if (/HAI ?XUN|海巡|海事/i.test(raw)) return null; // HAIXUN = China Maritime Safety Administration patrol ships (also type 55), not the coast guard
  if (/^413875/.test(s.mmsi || "")) return "block";
  if (s.known) return "known";
  return null;
}
export function isCcg(s) { return ccgWhy(s) != null; }

/** Generic "government vessel" label: AIS type 55 (law enforcement) under a Chinese MMSI prefix (412/413/414) that is not matched by any CCG rule above (e.g. "XIA MEN HAI YANG 01", HAIXUN patrol ships).
 *  Softer than "suspected CCG" on purpose: type 55 alone also covers maritime-safety, fisheries-patrol and customs craft. Fishing type 30 never matches. */
export function isGov(s) {
  if (isCcg(s) || s.type === 30) return false;
  return s.type === 55 && /^41[234]/.test(s.mmsi || "");
}

/** Suspected PLA Navy vessel (heuristic, label for humans — "疑似共軍"). Matches:
 *  - names: 海軍 / 海军, 解放軍, "PLA NAVY", or "PLAN" followed by a hull number (e.g. "PLAN 989") — a bare word "PLAN" (yachts, "PLAN B") does not count; HAIJUN only together with type 35 (or unknown type + MMSI 412/413) because it is also a civilian given name;
 *  - MMSI prefix 412/413 together with AIS ship type 35 (military operations).
 *  Never a fishing-only match (type 30 is excluded from the MMSI path), and anything already flagged as China Coast Guard is not also PLAN. */
export function isPlan(s) {
  if (isCcg(s)) return false;
  const raw = s.name || "", name = raw.toUpperCase(), mmsi = s.mmsi || "";
  if (/(^|[^A-Z])(PLA ?NAVY|PLAN[ -]?\d{2,4}|PLANS ?\d{2,4})([^A-Z]|$)/.test(name)) return true;
  // pinyin "HAI JUN" is also a common civilian given name (dredgers, cargo, fishing: e.g. "LING HAI JUN 8006", "HAIJUN11") -> only with a military-ish signal
  if (/(^|[^A-Z])HAI ?JUN([^A-Z]|$)/.test(name)) return s.type === 35 || (!s.type && /^41[234]/.test(mmsi));
  if (/海軍|海军|解放軍|解放军|中國人民解放軍|中国人民解放军/.test(raw)) return true;
  if (s.type === 30 || s.type === 36 || s.type === 37) return false;
  if (/軍艦|军舰|驅逐|驱逐|護衛|护卫|護衛艦|护卫舰|驅逐艦|驱逐舰|兩棲|两栖/.test(raw) && /^41[234]/.test(mmsi)) return true;
  // AIS type 35 (military ops) under a Chinese MID — the main warship signal when the name is blank/encrypted
  return s.type === 35 && /^41[234]/.test(mmsi);
}

/** Fishing (30) / sailing (36) / pleasure craft (37), or an obvious fishing/yacht name when type is missing.
 *  Never drops vessels already flagged as suspected PLAN / CCG (a CCG hull can still broadcast type 30). */
const LEISURE_NAME = /漁船|渔船|釣魚|钓鱼|FISHING|FISHER\b|\bFV\b|YACHT|PLEASURE|SAILING|遊艇|游艇|帆船/;
const FISH_NAME_CN = /[浙閩粵瓊蘇魯遼冀津滬渝][\u4e00-\u9fff]{0,4}漁|MIN ?(?:LONG ?)?YU|ZHE ?YU|YUE ?YU|LU ?YU|SU ?YU|QIONG ?YU|JI ?YU|LIAO ?YU/;
export function isLeisureOrFishing(s) {
  if (isCcg(s) || isPlan(s)) return false;
  const t = s.type || 0;
  if (t === 30 || t === 36 || t === 37) return true;
  const raw = s.name || "", name = raw.toUpperCase();
  if (!raw) return false;
  if (LEISURE_NAME.test(raw) || LEISURE_NAME.test(name)) return true;
  if (FISH_NAME_CN.test(raw) || FISH_NAME_CN.test(name)) return true;
  return false;
}

/**
 * Chinese research / survey / oceanographic vessels (heuristic). Why a vessel is labelled (first match wins):
 *  - "fleet": known PRC research-fleet name (向阳红 / 科学 / 实验 / 探索 / XIANG YANG HONG / KEXUE / SHIYAN / TANSUO / DAYANG …)
 *  - "name": Chinese MMSI + RESEARCH / SURVEY / OCEANOGRAPHIC / 科考 / 科研 / 勘探 / 调查船 / 探测 …
 * Never also labelled CCG or PLAN (those take the ⚠️ slot). Type alone is never enough (AIS has no dedicated research code).
 */
const RESEARCH_FLEET = /XIANG ?YANG ?HONG|XIANGYANGHONG|向陽紅|向阳红|\bKE ?XUE\b|KEXUE|科學|科学號?|\bSHI ?YAN\b|SHIYAN|實驗|实验|\bTAN ?SUO\b|TANSUO|探索號?|\bDA ?YANG(?: ?YI ?HAO| ?HAO|\d)?\b|DAYANG ?HAO|大洋號?|DONG ?FANG ?HONG|東方紅|东方红|JIAO ?DIAN|蛟龍|蛟龙|YUAN ?WANG|遠望|远望|HAI ?YANG ?(?:DI ?ZHI|DIZHI|LIU)|海洋地質|海洋地质/;
const RESEARCH_WORD = /RESEARCH|SURVEY(?:OR)?|OCEANOGRAPHIC|科考|科研|勘探|調查船|调查船|探測|探测|考察船|海洋科學|海洋科学|OCEAN ?RESEARCHER|HAI ?KE\b|海科/;
export function researchWhy(s) {
  if (isCcg(s) || isPlan(s)) return null;
  const raw = s.name || "", name = raw.toUpperCase(), cn = /^41[234]/.test(s.mmsi || "");
  if (!raw) return null;
  if (RESEARCH_FLEET.test(raw) || RESEARCH_FLEET.test(name)) return "fleet";
  if (cn && (RESEARCH_WORD.test(raw) || RESEARCH_WORD.test(name))) return "name";
  // Taiwan "OCEAN RESEARCHER" series (MMSI 416…) is civilian academic — still useful to flag as research but not "Chinese research"; skip non-CN
  return null;
}
export function isResearch(s) { return researchWhy(s) != null; }

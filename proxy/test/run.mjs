// node proxy/test/run.mjs  — unit tests for the Worker's pure logic (no network, no Cloudflare runtime needed; Node >= 20).
import assert from "node:assert/strict";
import { encryptPayload, vapidAuthHeader, generateVapidKeys, b64uDecode, b64uEncode } from "../src/webpush.mjs";
import { normalizeMpbCollection, applyAis, applyMpb, normalizeMpb, parseMpbTime, trimShips, publicShips, isCcg, isPlan, isGov, ccgWhy, isLeisureOrFishing, isResearch, researchWhy } from "../src/ais.mjs";
import { selectQuakes, validateSubscription } from "../src/logic.mjs";
import { readFileSync } from "node:fs";
import { cwaData, normalizeCwaQuakes, normalizeTyphoons, normalizeWarnings, groupWarnings, mergeQuakes } from "../src/cwa.mjs";
import { parseCgaRss } from "../src/cga.mjs";
import { parseMndList, parseMndDetail, parseJsIndex, parseJsTitle, parseJsPdfText, ccgHull, decodeCcgHull, sanitizeJsDetail, sanitizeMndDay, pruneJsEvents, needPdf, plaPublic, geocodeJsPlace, jsGeo, destPoint } from "../src/intel.mjs";
import { parseQuakeZip, parseQuakeXml, zipEntries, entryTime, s3Warnings, s3Typhoons } from "../src/cwas3.mjs";
import { parseUsgs, parseEmsc, parseGfz, mergeQuakeSources, pickAlertQuakes, fingerprint, sameEvent, quakeUrls, quakeUrlSets, mergeById, isFarQuake } from "../src/quakes.mjs";
import { PLAN_HULLS } from "../src/plahulls.mjs";
import { collectFlights, normalizeAdsb, hexCountry, dedupeByHex, plaSuspect, inPlaBlock, thinFlights, ADSB_POINTS, FLIGHT_BOX } from "../src/flights.mjs";
let n = 0; const ok = (name, fn) => Promise.resolve(fn()).then(() => { n++; console.log("ok  " + name); });

await ok("RFC 8291 appendix-A test vector (aes128gcm payload encryption)", async () => {
  const asPriv = "yfWPiYE-n46HLnH0KqZOF1fJJU3MYrct3AELtAQ-oRw";
  const asPub = b64uDecode("BP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A8");
  const privateKey = await crypto.subtle.importKey("jwk", { kty: "EC", crv: "P-256", x: b64uEncode(asPub.slice(1, 33)), y: b64uEncode(asPub.slice(33)), d: asPriv }, { name: "ECDH", namedCurve: "P-256" }, false, ["deriveBits"]);
  const body = await encryptPayload(new TextEncoder().encode("When I grow up, I want to be a watermelon"),
    b64uDecode("BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcxaOzi6-AYWXvTBHm4bjyPjs7Vd8pZGH6SRpkNtoIAiw4"), b64uDecode("BTBZMqHH6r4Tts7J_aSIgg"),
    { asKeyPair: { privateKey, publicRaw: asPub }, salt: b64uDecode("DGv6ra1nlYgDCS1FRnbzlw") });
  const expected = ["DGv6ra1nlYgDCS1FRnbzlwAAEABBBP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27ml", "mlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A_yl95bQpu6cVPT", "pK4Mqgkf1CXztLVBSt2Ks3oZwbuwXPXLWyouBWLVWGNWQexSgSxsj_Qulcy4a-fN"].join(""); // RFC 8291 section 5, 86-octet header + 58-octet record = 144 octets
  assert.equal(b64uEncode(body), expected);
});

await ok("round trip: encrypt -> independent decrypt with node:crypto (UA side)", async () => {
  const { createECDH, createDecipheriv, hkdfSync } = await import("node:crypto");
  const ua = createECDH("prime256v1"); ua.generateKeys(); const uaPub = ua.getPublicKey(); const auth = crypto.getRandomValues(new Uint8Array(16));
  const msg = JSON.stringify({ title: "地震 M5.1", body: "測試 ✅" });
  const body = Buffer.from(await encryptPayload(new TextEncoder().encode(msg), new Uint8Array(uaPub), auth));
  const salt = body.subarray(0, 16), idlen = body[20], asPub = body.subarray(21, 21 + idlen), ct = body.subarray(21 + idlen);
  const ecdh = ua.computeSecret(asPub);
  const ikm = Buffer.from(hkdfSync("sha256", ecdh, auth, Buffer.concat([Buffer.from("WebPush: info\0"), uaPub, asPub]), 32));
  const cek = Buffer.from(hkdfSync("sha256", ikm, salt, "Content-Encoding: aes128gcm\0", 16)), nonce = Buffer.from(hkdfSync("sha256", ikm, salt, "Content-Encoding: nonce\0", 12));
  const d = createDecipheriv("aes-128-gcm", cek, nonce); d.setAuthTag(ct.subarray(ct.length - 16));
  const pt = Buffer.concat([d.update(ct.subarray(0, ct.length - 16)), d.final()]);
  assert.equal(pt[pt.length - 1], 2); assert.equal(pt.subarray(0, pt.length - 1).toString("utf8"), msg);
});

await ok("VAPID JWT is a valid ES256 signature over header.claims", async () => {
  const k = await generateVapidKeys(); const pub = b64uDecode(k.publicKey); assert.equal(pub.length, 65);
  const h = await vapidAuthHeader("https://fcm.googleapis.com", "https://example.org/", k.publicKey, k.privateKey, 1700000000);
  const m = /^vapid t=([^.]+)\.([^.]+)\.([^,]+), k=(.+)$/.exec(h); assert.ok(m); assert.equal(m[4], k.publicKey);
  const claims = JSON.parse(Buffer.from(m[2], "base64url")); assert.equal(claims.aud, "https://fcm.googleapis.com"); assert.equal(claims.exp, 1700000000 + 43200);
  const key = await crypto.subtle.importKey("raw", pub, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
  assert.ok(await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, key, b64uDecode(m[3]), new TextEncoder().encode(m[1] + "." + m[2])));
});

await ok("AIS merge: position + static data + n/a sentinels", () => {
  const map = {}, now = 1e12;
  applyAis(map, { MessageType: "PositionReport", MetaData: { MMSI: 412345678, ShipName: "HAIJING 2901  " }, Message: { PositionReport: { UserID: 412345678, Latitude: 25.12, Longitude: 122.01, Sog: 102.3, Cog: 360, TrueHeading: 511, NavigationalStatus: 0 } } }, now);
  applyAis(map, { MessageType: "ShipStaticData", MetaData: { MMSI: 412345678 }, Message: { ShipStaticData: { UserID: 412345678, Type: 55, Name: "HAIJING 2901@@@", Destination: "KEELUNG@@" } } }, now);
  applyAis(map, { MessageType: "PositionReport", MetaData: { MMSI: 416000001, ShipName: "EVER GIVEN" }, Message: { PositionReport: { UserID: 416000001, Latitude: 24.5, Longitude: 120.1, Sog: 12.4, Cog: 86.7, TrueHeading: 87 } } }, now);
  applyAis(map, { MessageType: "PositionReport", MetaData: { MMSI: 1 }, Message: { PositionReport: { Latitude: 91, Longitude: 181 } } }, now);
  const list = publicShips(map, now + 5000, 1800000);
  assert.equal(list.length, 2);
  const a = list.find((s) => s.mmsi === "412345678"), b = list.find((s) => s.mmsi === "416000001");
  assert.equal(a.name, "HAIJING 2901"); assert.equal(a.sog, null); assert.equal(a.cog, null); assert.equal(a.hdg, null); assert.equal(a.type, 55); assert.equal(a.dest, "KEELUNG"); assert.equal(a.ccg, true);
  assert.equal(b.sog, 12.4); assert.equal(b.ccg, false); assert.equal(b.ageSec, 5);
});

await ok("CCG heuristic", () => {
  assert.ok(isCcg({ name: "HAI JING 2102", mmsi: "412000000" })); assert.ok(isCcg({ name: "CHINA COAST GUARD 3305", mmsi: "1" })); assert.ok(!isCcg({ name: "x", type: 55, mmsi: "413999999" }) && isGov({ name: "x", type: 55, mmsi: "413999999" })); // type 55 alone is only a generic gov't vessel now
  assert.ok(!isCcg({ name: "EVER GIVEN", mmsi: "353000000", type: 70 })); assert.ok(!isCcg({ name: "TAIWAN CGA 118", type: 55, mmsi: "416000009" }));
});

await ok("quake selection: Taiwan box, M>=4.5, recency, dedupe", () => {
  const now = Date.UTC(2026, 10, 1, 8), f = (id, mag, lon, lat, ageMin) => ({ id, geometry: { coordinates: [lon, lat, 20] }, properties: { mag, place: "x", time: now - ageMin * 60000, url: "u" } });
  const out = selectQuakes([f("a", 5.2, 121.6, 24, 10), f("b", 4.4, 121.6, 24, 10), f("c", 6, 140, 35, 10), f("d", 5, 121, 24, 600), f("e", 4.8, 122, 23, 30)], ["e"], now);
  assert.deepEqual(out.map((q) => q.id), ["a"]);
});

await ok("subscription validation", () => {
  const key = (n) => b64uEncode(crypto.getRandomValues(new Uint8Array(n)));
  const good = { endpoint: "https://fcm.googleapis.com/fcm/send/abc", keys: { p256dh: key(65), auth: key(16) } };
  assert.equal(validateSubscription(good), null);
  assert.ok(validateSubscription({ ...good, endpoint: "https://evil.example/x" })); assert.ok(validateSubscription({ ...good, endpoint: "http://fcm.googleapis.com/x" }));
  assert.ok(validateSubscription({ ...good, keys: { p256dh: key(10), auth: key(16) } })); assert.ok(validateSubscription(null));
  assert.equal(validateSubscription({ ...good, endpoint: "https://web.push.apple.com/QAB" }), null); assert.equal(validateSubscription({ ...good, endpoint: "https://updates.push.services.mozilla.com/wpush/v2/x" }), null);
});

const jr = (obj, status = 200) => new Response(JSON.stringify(obj), { status });
await ok("flights: adsb.lol normalisation (ground skipped, units, callsign/reg fallback, country by ICAO block)", () => {
  const a = normalizeAdsb({ hex: "899123", flight: "CAL123  ", alt_baro: 35000, gs: 450, track: 90.5, baro_rate: -640, lat: 24.5, lon: 121.2, r: "B-18901", t: "A359" });
  assert.deepEqual([a.id, a.callsign, a.country, a.altFt, a.speedKt, a.hdg, a.vrFpm, a.lat], ["899123", "CAL123", "Taiwan", 35000, 450, 90.5, -640, 24.5]);
  assert.ok(Math.abs(a.vMs - 231.5) < 0.1);
  assert.equal(normalizeAdsb({ hex: "780dc5", alt_baro: "ground", lat: 24, lon: 121 }), null);
  assert.equal(normalizeAdsb({ hex: "780dc5", alt_baro: 100 }), null);
  const b = normalizeAdsb({ hex: "780dc5", r: "B-1656", alt_geom: 37625, lat: 24.85, lon: 118.55 });
  assert.equal(b.callsign, "B-1656"); assert.equal(b.altFt, 37625); assert.equal(b.speedKt, null); assert.equal(b.country, "China");
  assert.equal(hexCountry("840abc"), "Japan"); assert.equal(hexCountry("789123"), "Hong Kong"); assert.equal(hexCountry("~ffffff"), "");
  assert.equal(dedupeByHex([[{ id: "a", n: 1 }, { id: "b" }], [{ id: "a", n: 2 }]]).length, 2);
});
const lolAc = (hex, lat, lon) => ({ hex, flight: hex.toUpperCase(), alt_baro: 30000, gs: 400, track: 10, lat, lon });
await ok("flights: adsb.lol circles merged and deduped by hex; box crop applied (region 0-45N 105-145E); failed outer circles are only reported as partial", async () => {
  const calls = [];
  const f = async (u) => { calls.push(u); if (/point\/25\.3\/121/.test(u)) return jr({ ac: [lolAc("aaa111", 25, 121), lolAc("bbb222", 23, 121), lolAc("far999", 40, 140), lolAc("out111", 50, 140)] }); if (/point\/22\.6\/120\.8/.test(u)) return jr({ ac: [lolAc("bbb222", 23, 121), lolAc("ccc333", 22, 120)] }); throw new Error("unexpected " + u); };
  const r = await collectFlights({ fetch: f });
  assert.equal(r.source, "adsb.lol"); assert.deepEqual(r.flights.map((x) => x.id).sort(), ["aaa111", "bbb222", "ccc333", "far999"]); assert.equal(r.count, 4); assert.equal(r.total, 4); assert.equal(r.partial.length, ADSB_POINTS.length - 2);
  assert.ok(calls.every((u) => /^https:\/\/api\.adsb\.lol\/v2\/point\/[\d.]+\/[\d.]+\/250$/.test(u)));
});
await ok("flights: thinning keeps PLA suspects, then the Taiwan core box, then the highest outer traffic; 11 circles, at most 800 aircraft", () => {
  assert.equal(ADSB_POINTS.length, 11); assert.deepEqual(FLIGHT_BOX, { lamin: 0, lomin: 105, lamax: 45, lomax: 145 });
  const mk = (id, lat, lon, altFt, pla) => ({ id, lat, lon, altFt, ...(pla ? { pla: true } : {}) });
  const list = [mk("core1", 24, 121, 100), mk("out-hi", 36, 140, 38000), mk("out-lo", 35, 139, 2000), mk("pla", 40, 141, 0, true), mk("core2", 22, 120, 5000)];
  assert.deepEqual(thinFlights(list, 3).map((f) => f.id), ["pla", "core1", "core2"]);
  assert.deepEqual(thinFlights(list, 4).map((f) => f.id), ["pla", "core1", "core2", "out-hi"]);
  assert.equal(thinFlights(list, 10).length, 5);
  const big = Array.from({ length: 3000 }, (_, i) => mk("h" + i, 30 + (i % 10), 130 + (i % 10), i)); assert.equal(thinFlights(big).length, 800);
});
await ok("flights: per-circle cache — outer circles reused for 45 s, core for 9 s; a 429 circle is served from its last good copy (<= 3 min)", async () => {
  const cache = new Map(); let n = 0, fail = false;
  const f = async (u) => { n++; if (fail && !/point\/25\.3\//.test(u)) return jr({}, 429); return jr({ ac: [lolAc("a" + n, 25, 121)] }); };
  let t = 1000000; const now = () => t;
  await collectFlights({ fetch: f, cache, now }); assert.equal(n, ADSB_POINTS.length);
  t += 5000; await collectFlights({ fetch: f, cache, now }); assert.equal(n, ADSB_POINTS.length, "everything still fresh");
  t += 6000; await collectFlights({ fetch: f, cache, now }); assert.equal(n, ADSB_POINTS.length + 2, "only the 2 core circles refreshed after 11 s");
  t += 40000; fail = true; const r = await collectFlights({ fetch: f, cache, now }); assert.equal(r.source, "adsb.lol"); assert.ok(r.partial.some((e) => /429.*cache/.test(e)), "stale copies are reported"); assert.ok(r.count >= ADSB_POINTS.length);
});
await ok("flights: a failing core circle falls back to adsb.fi (aircraft key), no OpenSky call", async () => {
  const calls = [];
  const f = async (u) => { calls.push(u); if (/adsb\.lol.*25\.3/.test(u)) return jr({}, 429); if (/adsb\.lol/.test(u)) return jr({ ac: [lolAc("ccc333", 22, 120)] }); if (/adsb\.fi.*lat\/25\.3\/lon\/121\/dist\/250/.test(u)) return jr({ aircraft: [lolAc("aaa111", 25, 121)] }); throw new Error("unexpected " + u); };
  const r = await collectFlights({ fetch: f });
  assert.equal(r.source, "adsb.lol+adsb.fi"); assert.equal(r.count, 2); assert.ok(r.partial[0].includes("429")); assert.equal(calls.filter((u) => /adsb\.fi/.test(u)).length, 1, "only core circles fall back to adsb.fi"); assert.ok(!calls.some((u) => /opensky/.test(u)));
});
await ok("flights: everything else down -> OpenSky last resort; all down -> throws", async () => {
  const os = { states: [["71be1f", "KAL123 ", "South Korea", 0, 0, 121.5, 24.1, 10000, false, 230, 45, 2, null, 10500]] };
  const f = async (u) => { if (/opensky/.test(u)) return jr(os); throw new Error("net down"); };
  const r = await collectFlights({ fetch: f });
  assert.equal(r.source, "opensky"); assert.equal(r.flights[0].callsign, "KAL123"); assert.equal(r.flights[0].altFt, 34449); assert.equal(r.flights[0].speedKt, 447);
  await assert.rejects(collectFlights({ fetch: async () => { throw new Error("net down"); } }), /all flight sources failed/);
});

await ok("CCG heuristic: fishing (type 30) never matches on MMSI prefix alone; names still match; type 55 + prefix still matches", () => {
  assert.ok(!isCcg({ name: "MINLONGYU61687", mmsi: "412446258", type: 30 }));
  assert.ok(!isCcg({ name: "YU ZHENG 35306", mmsi: "412440933", type: 30 }));
  assert.ok(isCcg({ name: "HAIJING 2901", mmsi: "412000001", type: 30 }));           // name wins even if flagged fishing
  assert.ok(isCcg({ name: "ZHONGGUOHAIJIAN8039", mmsi: "412440999", type: 30 }));
  assert.ok(isCcg({ name: "中國海警 2901", mmsi: "1" })); assert.ok(isCcg({ name: "CHINA COAST GUARD", mmsi: "1", type: 30 }));
  assert.ok(!isCcg({ name: "", mmsi: "412440933", type: 55 }) && isGov({ name: "", mmsi: "412440933", type: 55 })); assert.ok(!isCcg({ name: "HAIXUN08186", mmsi: "413399510", type: 55 }) && isGov({ name: "HAIXUN08186", mmsi: "413399510", type: 55 })); assert.ok(isCcg({ name: "CHINACOASTGUARD2302", mmsi: "413875034", type: 55 })); assert.ok(!isCcg({ name: "", mmsi: "416000009", type: 55 })); assert.ok(!isCcg({ name: "JIN HAI SHUN 5", mmsi: "413696780", type: 80 }));
});

const mpbF = (o) => ({ type: "Feature", geometry: { type: "Point", coordinates: [o.Longitude, o.Latitude] }, properties: { IMO_Number: "", ShipName: "X  ", MMSI: "412446258", Navigational_Status: "0", SOG: 9.5, COG: 320.3, Ship_and_Cargo_Type: 70, Record_Time: "2026/11/01 17:39:04", ...o } });
await ok("MPB: Taipei-time parsing, bbox trim, field normalisation", () => {
  assert.equal(parseMpbTime("2026/11/01 17:39:04"), Date.UTC(2026, 10, 1, 9, 39, 4)); assert.equal(parseMpbTime("garbage"), null);
  const a = normalizeMpb(mpbF({ Latitude: 24.2, Longitude: 118.4, ShipName: "MINLONGYU61687      ", IMO_Number: "9123456", Ship_and_Cargo_Type: 30, Navigational_Status: "15", SOG: 102.3 }));
  assert.deepEqual([a.mmsi, a.name, a.imo, a.type, a.nav, a.sog, a.cog, a.t], ["412446258", "MINLONGYU61687", "9123456", 30, null, null, 320.3, Date.UTC(2026, 10, 1, 9, 39, 4)]);
  assert.equal(normalizeMpb(mpbF({ Latitude: 35, Longitude: 139 })), null);               // Tokyo: outside the box
  assert.equal(normalizeMpb(mpbF({ Latitude: 24, Longitude: 121, MMSI: "12" })), null);   // bad MMSI
  assert.equal(normalizeMpb(mpbF({ Latitude: 24, Longitude: 121, Record_Time: "" })), null);
  assert.equal(normalizeMpb(mpbF({ Latitude: 24, Longitude: 121, IMO_Number: "0" })).imo, undefined);
});
await ok("MPB + aisstream merge by MMSI: fresher position wins, statics filled from either, src tracked", () => {
  const map = {}, t0 = Date.UTC(2026, 10, 1, 9, 40);
  // aisstream first (received "now"), then an older MPB record for the same ship -> aisstream position stays, MPB fills the name/type/imo
  applyAis(map, { MessageType: "PositionReport", MetaData: { MMSI: 416000001 }, Message: { PositionReport: { UserID: 416000001, Latitude: 24.5, Longitude: 120.1, Sog: 12.4, Cog: 86.7 } } }, t0);
  applyMpb(map, { mmsi: "416000001", lat: 24.4, lon: 120.0, t: t0 - 120000, sog: 3, cog: 1, name: "EVER GIVEN", type: 71, imo: "9811000" }, t0);
  let s = map["416000001"]; assert.deepEqual([s.lat, s.lon, s.sog, s.name, s.type, s.imo, s.src], [24.5, 120.1, 12.4, "EVER GIVEN", 71, "9811000", "both"]);
  // a fresher MPB record overrides the position
  applyMpb(map, { mmsi: "416000001", lat: 24.6, lon: 120.2, t: t0 + 60000, sog: 11, cog: 90, name: "OTHER NAME" }, t0 + 61000);
  s = map["416000001"]; assert.deepEqual([s.lat, s.sog, s.name, s.src], [24.6, 11, "EVER GIVEN", "both"]);
  // MPB-only ship, future timestamps are clamped to now, invalid records rejected
  assert.ok(applyMpb(map, { mmsi: "412446258", lat: 24.2, lon: 118.4, t: t0 + 9e6, name: "MINLONGYU61687", type: 30 }, t0)); assert.equal(map["412446258"].t, t0); assert.equal(map["412446258"].src, "mpb");
  assert.ok(!applyMpb(map, { mmsi: "bad", lat: 1, lon: 1, t: 1 }, t0)); assert.ok(!applyMpb(map, { mmsi: "412446259", lat: NaN, lon: 1, t: 1 }, t0));
  // aisstream arriving after MPB marks it "both" too
  applyAis(map, { MessageType: "PositionReport", MetaData: { MMSI: 412446258 }, Message: { PositionReport: { UserID: 412446258, Latitude: 24.3, Longitude: 118.5, Sog: 8 } } }, t0 + 5000);
  assert.equal(map["412446258"].src, "both");
});
await ok("publicShips: drops fishing/yachts, keeps CCG (even type 30) + commercial; trimShips frees leisure first", () => {
  const map = {}, now = 1e12;
  for (let i = 0; i < 50; i++) map["41600" + String(1000 + i).padStart(4, "0")] = { mmsi: "41600" + String(1000 + i).padStart(4, "0"), lat: 24, lon: 121, t: now - i * 1000, type: 30, sog: 0 };           // stationary fishing -> filtered
  for (let i = 0; i < 5; i++) map["41610" + String(1000 + i).padStart(4, "0")] = { mmsi: "41610" + String(1000 + i).padStart(4, "0"), lat: 24, lon: 121, t: now - i * 1000, type: 37, sog: 2, name: "YACHT " + i };
  for (let i = 0; i < 10; i++) map["35300" + String(1000 + i).padStart(4, "0")] = { mmsi: "35300" + String(1000 + i).padStart(4, "0"), lat: 24, lon: 121, t: now - 600000 - i, type: 70, sog: 12 };  // moving cargo
  map["412000001"] = { mmsi: "412000001", name: "HAIJING 2901", lat: 25, lon: 122, t: now - 900000, type: 30, sog: 0 }; // CCG even if type 30
  map["412999001"] = { mmsi: "412999001", name: "XIANG YANG HONG 01", lat: 36, lon: 123, t: now - 1000, type: 90, sog: 8 };
  map["412999002"] = { mmsi: "412999002", name: "OCEAN SURVEYOR 1", lat: 35, lon: 122, t: now - 1000, type: 90, sog: 5 };
  const l = publicShips(map, now, 1800000, 12);
  assert.equal(l.total, 13); // 10 cargo + 1 CCG + 2 research; fishing/yachts dropped
  assert.equal(l[0].mmsi, "412000001"); assert.ok(l[0].ccg);
  assert.ok(l.some((x) => x.research && x.researchBy === "fleet"));
  assert.ok(l.some((x) => x.research && x.researchBy === "name"));
  assert.ok(l.every((x) => x.type !== 30 || x.ccg)); assert.ok(l.every((x) => x.type !== 37)); assert.ok(!("_r" in l[0]));
  const dropped = trimShips(map, 20); assert.ok(dropped >= 50); assert.equal(Object.keys(map).length, 13); assert.ok(map["412000001"] && map["353001000"] && map["412999001"]);
});

const fx = (n) => JSON.parse(readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
const TY = fx("cwa-W-C0034-005.json"), WN = fx("cwa-W-C0033-001.json"); // real API responses captured 2026-11-01 (trimmed)
await ok("CWA: real E-A0015-001 / E-A0016-001 samples normalise (felt + local), ids dedupe by origin time", () => {
  const a = normalizeCwaQuakes(fx("cwa-E-A0015-001.json"), "significant"), b = normalizeCwaQuakes(fx("cwa-E-A0016-001.json"), "local");
  assert.equal(a.length, 2); assert.equal(a[0].mag, 5.6); assert.equal(a[0].t, Date.parse("2026-11-01T16:20:07+08:00")); assert.equal(a[0].lat, 24.89); assert.equal(a[0].depthKm, 119.5);
  assert.ok(a[0].place.includes("宜蘭縣")); assert.ok(a[0].intensity.includes("3級")); assert.equal(a[0].src, "CWA"); assert.ok(a[0].url.startsWith("https://scweb.cwa.gov.tw/"));
  assert.notEqual(b[0].id, b[1].id); // E-A0016 reuses EarthquakeNo, so ids come from the origin time
  const m = mergeQuakes(a, b, a); assert.equal(m.length, 4); assert.ok(m[0].t > m[1].t);
});
await ok("CWA: typhoon (real W-C0034-005, PascalCase) + warnings (real W-C0033-001, offset-less Taipei times) normalise", () => {
  const t = normalizeTyphoons(TY)[0];
  assert.deepEqual([t.name, t.cwaName, t.lat, t.lon, t.maxWind, t.gust, t.pressure, t.r15, t.r25, t.track.length, t.forecast.length, t.forecast[0].hour, t.forecast[0].probRadius], ["IN-FA", "煙花", 22.6, 144.2, 40, 50, 950, 200, 80, 5, 3, 6, 30]);
  assert.ok(t.movement.includes("向西轉西北西")); assert.equal(t.time, Date.parse("2026-11-01T14:00:00+08:00"));
  const w = normalizeWarnings(WN, Date.parse("2026-11-02T12:00:00+08:00"));
  assert.equal(w.length, 2); assert.equal(w[0].end, Date.parse("2026-11-02T23:00:00+08:00")); assert.equal(normalizeWarnings(WN, Date.parse("2026-11-03T00:00:00+08:00")).length, 0);
  const g = groupWarnings(w); assert.equal(g.length, 1); assert.equal(g[0].phenomena, "陸上強風"); assert.equal(g[0].locations.length, 2);
  assert.equal(normalizeTyphoons({ records: { tropicalCyclones: { tropicalCyclone: [{ typhoonName: "X", analysisData: { fix: [{ fixTime: "2024-09-30T20:00:00+08:00", coordinate: "120.5,20.5", maxWindSpeed: "48" }] } }] } } })[0].lon, 120.5); // legacy camelCase shape
});
await ok("CWA gate: no CWA_API_KEY -> enabled:false (USGS fallback), never calls CWA; with a key -> uses it, key never leaks, partial failure tolerated", async () => {
  let calls = 0;
  const off = await cwaData({}, "quakes", async () => { calls++; throw new Error("must not be called"); });
  assert.equal(off.enabled, false); assert.equal(off.source, "usgs"); assert.equal(calls, 0);
  const urls = [];
  const f = async (u) => { urls.push(u); if (/E-A0015/.test(u)) return jr(fx("cwa-E-A0015-001.json")); if (/E-A0016/.test(u)) return jr({}, 500); if (/W-C0034/.test(u)) return jr(TY); if (/W-C0033/.test(u)) return jr(WN); throw new Error("unexpected"); };
  const env = { CWA_API_KEY: "SECRET-KEY-123" };
  const q = await cwaData(env, "quakes", f); assert.equal(q.enabled, true); assert.equal(q.quakes.length, 2); assert.equal(q.partial, true);
  assert.ok(urls.every((u) => u.startsWith("https://opendata.cwa.gov.tw/api/v1/rest/datastore/") && u.includes("Authorization=SECRET-KEY-123")));
  const realNow = Date.now; Date.now = () => Date.parse("2026-11-01T15:00:00+08:00"); // the real warning sample expires; pin "now" to the day it was captured so the test is not time-bomb
  try { assert.equal((await cwaData(env, "typhoon", f)).typhoons.length, 1); assert.equal((await cwaData(env, "warnings", f)).warnings[0].phenomena, "陸上強風"); } finally { Date.now = realNow; }
  await assert.rejects(cwaData(env, "quakes", async (u) => { throw new Error("boom " + u); }), (e) => !String(e.message).includes("SECRET-KEY-123"));
});

await ok("CGA RSS: title matches first, description mentions flagged, links forced to https cga.gov.tw, CDATA/entities decoded", () => {
  const rss = `<rss><channel><item><title>海巡新船成軍</title><link>http://www.cga.gov.tw/a</link><description><![CDATA[無關內容]]></description><pubDate>Thu, 09 Jul 2026 00:00:00 GMT</pubDate></item>
  <item><title>端午見證文明台灣與粗暴中國</title><link>http://www.cga.gov.tw/GipOpen/wSite/ct?xItem=1&amp;ctNode=2116</link><description><![CDATA[<p>中國海警船隻在金門水域侵擾，海巡隊全程監控。</p>]]></description><pubDate>Fri, 19 Jun 2026 00:00:00 GMT</pubDate></item>
  <item><title>海警船連續侵入金門禁止水域</title><link>http://evil.example/x</link><description>x</description><pubDate>Mon, 20 Jul 2026 00:00:00 GMT</pubDate></item></channel></rss>`;
  const r = parseCgaRss(rss); assert.equal(r.scanned, 3); assert.equal(r.items.length, 2);
  assert.equal(r.items[0].kind, "title"); assert.equal(r.items[0].link, ""); assert.equal(r.items[1].kind, "mention");
  assert.equal(r.items[1].link, "https://www.cga.gov.tw/GipOpen/wSite/ct?xItem=1&ctNode=2116"); assert.ok(r.items[1].snippet.includes("中國海警船隻")); assert.equal(r.items[1].t, Date.parse("2026-06-19T00:00:00Z"));
});
await ok("CGA RSS: real feed sample (2026-11-01, trimmed) parses", () => {
  const r = parseCgaRss(readFileSync(new URL("./fixtures/cga-rss-sample.xml", import.meta.url), "utf8"));
  assert.equal(r.scanned, 5); assert.equal(r.items.length, 2); assert.ok(r.items.every((x) => x.kind === "mention" && x.snippet.includes("海警") && x.link.startsWith("https://www.cga.gov.tw/")));
});
console.log(n + " tests passed");

// ---- suspected PLA aircraft heuristic ----
{
  const A = (o) => ({ hex: "780abc", lat: 25, lon: 122, alt_baro: 20000, ...o });
  assert.deepEqual(plaSuspect(A({ dbFlags: 1 })), ["mil", "cn-hex"], "military flag + China hex");
  assert.equal(plaSuspect(A({})), null, "China hex alone (Air China etc.) never flags");
  assert.equal(plaSuspect(A({ flight: "CCA123  ", t: "B738" })), null, "civil airline callsign + hex");
  assert.equal(plaSuspect(A({ dbFlags: 1, hex: "ae1234" })), null, "foreign military is not PLA");
  assert.deepEqual(plaSuspect(A({ dbFlags: 1, hex: "ae1234", t: "J11" })), ["mil", "type"], "mil + PLA airframe type");
  assert.equal(plaSuspect(A({ dbFlags: 1, hex: "ae1234", t: "CH47" })), null, "Chinook is not a PLA type");
  assert.equal(plaSuspect(A({ dbFlags: 1, hex: "899123" })), null, "Taiwan block is carved out");
  assert.equal(plaSuspect(A({ dbFlags: 1, hex: "789123" })), null, "Hong Kong block is carved out");
  assert.ok(plaSuspect(A({ hex: "7a0001", flight: "PLA123", t: "Y20" })), "cn hex + type + callsign");
  assert.equal(plaSuspect(A({ hex: "ae1234", t: "SU30" })), null, "Su-30 alone / non-China hex");
  assert.ok(plaSuspect(A({ t: "SU30" })), "Su-30 with China hex");
  const n = normalizeAdsb({ hex: "780abc", flight: "PLA9 ", lat: 24, lon: 123, alt_baro: 30000, gs: 400, track: 10, dbFlags: 1, t: "H6" });
  assert.equal(n.pla, true); assert.ok(n.plaWhy.includes("mil"));
  assert.equal("pla" in normalizeAdsb({ hex: "899123", lat: 24, lon: 121, alt_baro: 30000 }), false, "no pla key on normal traffic");
  console.log("ok pla heuristic");
}

// ---- PLAN (suspected PLA Navy) heuristic ----
{
  assert.ok(isPlan({ name: "PLAN 989", mmsi: "1" })); assert.ok(isPlan({ name: "HAIJUN 12", mmsi: "412000001", type: 35 })); assert.ok(isPlan({ name: "HAIJUN 12", mmsi: "412000001" }));
  assert.ok(!isPlan({ name: "LING HAI JUN 8006", mmsi: "413544450", type: 33 }), "civil dredger"); assert.ok(!isPlan({ name: "HAIJUN11", mmsi: "412756420", type: 99 })); assert.ok(!isPlan({ name: "HAIJUN 12", mmsi: "1" })); assert.ok(isPlan({ name: "中國海軍 17", mmsi: "1" }));
  assert.ok(isPlan({ name: "PLA NAVY", mmsi: "1" })); assert.ok(isPlan({ name: "x", type: 35, mmsi: "412123456" })); assert.ok(isPlan({ name: "x", type: 35, mmsi: "413123456" }));
  assert.ok(!isPlan({ name: "PLAN B", type: 37, mmsi: "319000000" }), "bare PLAN word (yacht) does not count");
  assert.ok(!isPlan({ name: "x", type: 35, mmsi: "366000000" }), "type 35 under a foreign MMSI is not PLAN");
  assert.ok(!isPlan({ name: "MINLONGYU61687", type: 30, mmsi: "412446258" }), "fishing never");
  assert.ok(!isPlan({ name: "x", type: 30, mmsi: "412446258" }) && !isPlan({ name: "x", type: 55, mmsi: "412446258" }), "MMSI prefix alone / type 55 never");
  assert.ok(!isPlan({ name: "HAI JING 2102", mmsi: "412000000" }), "CCG is not also PLAN");
  const m = { a: { mmsi: "412000111", name: "PLAN 989", lat: 24, lon: 122, t: 1000, type: 35, sog: 5 }, b: { mmsi: "412000112", name: "HAI JING 2901", lat: 24, lon: 122, t: 1000 } };
  const pub = publicShips(m, 2000, 60000); assert.equal(pub.find((x) => x.mmsi === "412000111").plan, true); assert.equal(pub.find((x) => x.mmsi === "412000112").plan, false); assert.equal(pub.find((x) => x.mmsi === "412000112").ccg, true);
  console.log("ok plan heuristic");
}

// ---- Phase 1: CCG rules, hull -> bureau, remembered MMSIs, aircraft prior ----
await ok("CCG: 413875 block rule, remembered MMSI (known), type55-only -> generic gov't vessel, fishing/HAIXUN excluded", () => {
  assert.equal(ccgWhy({ name: "", mmsi: "413875321", type: 55 }), "block"); assert.equal(ccgWhy({ name: "", mmsi: "413875321" }), "block", "block applies without a type too");
  assert.equal(ccgWhy({ name: "", mmsi: "413875321", type: 30 }), null, "fishing never by MMSI");
  assert.equal(ccgWhy({ name: "HAIXUN 01", mmsi: "413875321", type: 55 }), null, "HAIXUN (MSA patrol) is not CCG even inside the block");
  assert.equal(ccgWhy({ name: "CHINACOASTGUARD14530", mmsi: "413999000", type: 55 }), "name");
  assert.equal(ccgWhy({ name: "", mmsi: "412111111", type: 55, known: true }), "known"); assert.equal(ccgWhy({ name: "", mmsi: "412111111", type: 30, known: true }), null);
  const xm = { name: "XIA MEN HAI YANG 01", mmsi: "412000999", type: 55 };
  assert.ok(!isCcg(xm) && isGov(xm) && !isPlan(xm), "XIA MEN HAI YANG 01 (type 55, no CCG name): only a gov't vessel");
  assert.ok(!isGov({ name: "x", mmsi: "412000999", type: 30 })); assert.ok(!isGov({ name: "x", mmsi: "366000000", type: 55 })); assert.ok(!isGov({ name: "HAI JING 2102", mmsi: "412000999", type: 55 }), "CCG is not also gov");
  const pub = publicShips({ a: { mmsi: "412000999", name: "XIA MEN HAI YANG 01", type: 55, lat: 24, lon: 120, t: 1000 }, b: { mmsi: "413875001", name: "CHINACOASTGUARD14530", type: 55, lat: 24, lon: 120, t: 1000 }, c: { mmsi: "413875002", name: "", type: 55, lat: 24, lon: 121, t: 1000 } }, 2000, 60000);
  const A = pub.find((x) => x.mmsi === "412000999"), B = pub.find((x) => x.mmsi === "413875001"), C = pub.find((x) => x.mmsi === "413875002");
  assert.ok(A.gov && !A.ccg && !A.ccgBy); assert.ok(B.ccg && B.ccgBy === "name" && B.hull === "14530" && B.bureau === "Fujian"); assert.ok(C.ccg && C.ccgBy === "block" && !C.hull);
});
await ok("CCG hull number -> home bureau (5 digits: provincial bureau; 4 digits: directly-subordinate bureau)", () => {
  assert.equal(ccgHull("CHINACOASTGUARD14530"), "14530"); assert.equal(ccgHull("CHINA COAST GUARD 2901"), "2901"); assert.equal(ccgHull("HAI JING 2102"), "2102"); assert.equal(ccgHull("CCG 3305"), "3305"); assert.equal(ccgHull("海警2901"), "2901"); assert.equal(ccgHull("MINLONGYU61687"), null);
  assert.equal(decodeCcgHull("14530").short, "Fujian"); assert.equal(decodeCcgHull("21001").short, "Guangdong"); assert.equal(decodeCcgHull("34305").short, "Shandong"); assert.equal(decodeCcgHull("2901").kind, "direct"); assert.match(decodeCcgHull("2901").en, /Ningbo/); assert.match(decodeCcgHull("3305").en, /Guangzhou/); assert.match(decodeCcgHull("5901").en, /Sanya/);
  assert.equal(decodeCcgHull("99999"), null); assert.equal(decodeCcgHull("12"), null); assert.equal(decodeCcgHull("7901"), null);
});
await ok("aircraft: 0x7A1000-0x7A4FFF PLA-prior block, TU16 and Chinese-hex-only ICAO types", () => {
  assert.ok(inPlaBlock("7a1000") && inPlaBlock("7A4FFF") && inPlaBlock("~7a2345")); assert.ok(!inPlaBlock("7a0fff") && !inPlaBlock("7a5000") && !inPlaBlock("899123") && !inPlaBlock(""));
  assert.deepEqual(plaSuspect({ hex: "7a10c3" }), ["cn-hex", "pla-block"], "block alone flags (labelled heuristic in the UI)");
  assert.deepEqual(plaSuspect({ hex: "7a1234", dbFlags: 1, t: "TU16" }), ["mil", "cn-hex", "type", "pla-block"]);
  assert.deepEqual(plaSuspect({ hex: "780abc", t: "TU16" }), ["cn-hex", "type"], "TU16 = H-6 bomber");
  assert.deepEqual(plaSuspect({ hex: "780abc", t: "AN12" }), ["cn-hex", "type"]); assert.deepEqual(plaSuspect({ hex: "780abc", t: "IL76" }), ["cn-hex", "type"]);
  assert.equal(plaSuspect({ hex: "ae1234", dbFlags: 1, t: "IL76" }), null, "foreign Il-76/An-12 is not PLA"); assert.equal(plaSuspect({ hex: "ae1234", t: "AN12" }), null);
  assert.equal(plaSuspect({ hex: "780abc", t: "B738" }), null); assert.equal(plaSuspect({ hex: "7a5000" }), null, "outside the block, a Chinese hex alone never flags");
});

// ---- Phase 2: Taiwan MND daily bulletin ----
await ok("MND list + detail pages (real 2026-10/11 samples)", () => {
  const fx = (f) => readFileSync(new URL("./fixtures/" + f, import.meta.url), "utf8");
  const l = parseMndList(fx("mnd-list.html")); assert.ok(l.length >= 3); assert.deepEqual(l[0], { id: "88108", date: "2026-11-02", title: "中共解放軍臺海周邊海、空域動態" }); assert.ok(l[0].date > l[1].date);
  const d = parseMndDetail(fx("mnd-detail-88108.html"), "88108");
  assert.equal(d.date, "2026-11-02"); assert.equal(d.aircraft, 19); assert.equal(d.adiz, 4); assert.equal(d.crossed, false); assert.equal(d.plan, 7); assert.equal(d.official, 6);
  assert.equal(d.from, "2026-11-01T06:00:00+08:00"); assert.equal(d.to, "2026-11-02T06:00:00+08:00"); assert.match(d.map, /^https:\/\/www\.mnd\.gov\.tw\/NewUpload\/202611\/1151102_.+\.jpg$/); assert.ok(!/ /.test(d.map)); assert.equal(d.url, "https://www.mnd.gov.tw/news/plaact/88108");
  const z = parseMndDetail(fx("mnd-detail-88056.html"), "88056"); assert.equal(z.aircraft, 0); assert.equal(z.plan, 1); assert.equal(z.official, 5); assert.equal(z.map, null); assert.equal(z.adiz, null);
  const c = parseMndDetail(fx("mnd-detail-88068.html"), "88068"); assert.equal(c.aircraft, 3); assert.equal(c.adiz, 1); assert.equal(c.crossed, true); assert.equal(c.official, 9);
  assert.equal(parseMndDetail(fx("mnd-detail-88001.html"), "88001").aircraft, 8); assert.equal(parseMndDetail("<html>Access denied.</html>", "1"), null);
  assert.ok(sanitizeMndDay(d) && sanitizeMndDay({ ...d, map: "https://evil.example/x.jpg" }).map === null && sanitizeMndDay({ id: "x" }) === null);
});

// ---- Phase 2: Japan Joint Staff (PDL 1.0) ----
await ok("Joint Staff index titles -> class / strait / direction / aircraft type (real 2026-11 index head)", () => {
  const fx = (f) => readFileSync(new URL("./fixtures/" + f, import.meta.url), "utf8");
  const ev = parseJsIndex(fx("js-index-head.html")); assert.ok(ev.length >= 20); assert.ok(ev.every((e) => /^p\d{8}_\d{2}$/.test(e.id) && e.pdf.startsWith("https://www.mod.go.jp/js/pdf/")));
  assert.ok(ev[0].id > ev[1].id, "newest first");
  const a = ev.find((e) => e.id === "p20261102_04"); assert.equal(a.kind, "ship"); assert.deepEqual(a.classes, ["ルーヤンIII", "フユ", "フチ"]); assert.equal(a.groups.length, 2); assert.equal(a.groups[0].dirs[0], "NW"); assert.equal(a.groups[1].dirs[0], "SE"); assert.equal(a.groups[0].whereEn[0], "Miyako Strait (Okinawa–Miyako)"); assert.match(a.classEn[0], /Type 052D/);
  const b = ev.find((e) => e.id === "p20261102_03"); assert.deepEqual(b.groups[0].whereEn, ["Amami–Yokoate gap"]); assert.equal(b.groups[0].dirs[0], "SW"); assert.match(b.classEn[0], /Type 054A/);
  const c = ev.find((e) => e.id === "p20261102_05"); assert.equal(c.kind, "air"); assert.deepEqual(c.types, ["WZ-7"]); assert.equal(c.groups[0].whereEn[0], "Miyako Strait (Okinawa–Miyako)");
  const d = ev.find((e) => e.id === "p20261029_01"); assert.deepEqual(d.types, ["TB-001", "Y-9"]);
  const e = ev.find((x) => x.id === "p20261030_03"); assert.equal(e.groups[0].whereEn[0], "Osumi Strait"); assert.equal(e.groups[0].dirs[0], "W");
  assert.equal(parseJsIndex(fx("js-index-head.html")).find((x) => x.id === "p20261015_02").classEn[0], "Aircraft carrier Liaoning + 3 other ships");
  assert.equal(parseJsTitle("ロシア海軍艦艇の動向について（ステレグシチー級／対馬海峡）"), null, "Russia-only releases are not China-related");
  assert.equal(parseJsTitle("中国海軍艦艇の動向について（ルーヤンⅢ／宮古島－与那国島間）").classes[0], "ルーヤンIII");
});
await ok("Joint Staff PDF text (pdftotext) -> hull numbers + names, observation time/place, UAV/scramble flags", () => {
  const fx = (f) => readFileSync(new URL("./fixtures/" + f, import.meta.url), "utf8");
  const a = parseJsPdfText(fx("js-p20261102_04.txt")); assert.deepEqual(a.ships.map((s) => s.hull + ":" + s.ship), ["121:Qiqihar", "901:Hulunhu", "890:Chaohu"]); assert.equal(a.seen, "2026-11-01T12:00:00+09:00"); assert.match(a.place, /宮古島/); assert.equal(a.ships[0].cls, "ルーヤンIII"); assert.match(a.ships[1].clsEn, /Fuyu/);
  const b = parseJsPdfText(fx("js-p20261102_03.txt")); assert.equal(b.ships[0].hull, "532"); assert.equal(b.ships[0].ship, "Jingzhou");
  const c = parseJsPdfText(fx("js-p20261102_05.txt")); assert.deepEqual(c.aircraft, ["WZ-7"]); assert.ok(c.uav && c.scramble && c.ships.length === 0);
  const d = parseJsPdfText(fx("js-p20261014_01.txt")); assert.deepEqual(d.ships.map((s) => s.hull), ["16", "103", "104", "123"]); assert.equal(d.ships[0].ship, "Liaoning"); assert.equal(d.ships[0].name, "遼寧");
  assert.deepEqual(parseJsPdfText("nothing useful").ships, []);
  assert.equal(PLAN_HULLS["052D"]["121"], "Qiqihar"); assert.equal(PLAN_HULLS["055"]["102"], "Lhasa");
  const s = sanitizeJsDetail({ ships: [{ hull: "121", cls: "x".repeat(99), evil: 1 }, { hull: "abc" }], aircraft: ["Y-9"], uav: 1, place: "p" }); assert.equal(s.ships.length, 1); assert.equal(s.ships[0].cls.length, 24); assert.ok(!("evil" in s.ships[0])); assert.equal(s.uav, true);
});
await ok("PLA state helpers: prune window, needPdf, public payload carries attribution + licence", () => {
  const evs = [{ id: "p20261102_04", date: "2026-11-02" }, { id: "p20260801_01", date: "2026-08-01" }, { id: "bad", date: "2026-11-02" }];
  const kept = pruneJsEvents(evs, Date.parse("2026-11-03T00:00:00Z")); assert.deepEqual(kept.map((e) => e.id), ["p20261102_04"]);
  assert.deepEqual(needPdf(kept, {}), ["p20261102_04"]); assert.deepEqual(needPdf(kept, { p20261102_04: {} }), []);
  const P = { mnd: { list: [{ id: "1", date: "2026-11-02" }, { id: "2", date: "2026-11-01" }], days: { 1: { id: "1", date: "2026-11-02", aircraft: 19 } }, okAt: 5 }, js: { events: kept, details: {}, okAt: 6 } };
  const out = plaPublic(P, 10); assert.equal(out.mnd.days.length, 1); assert.equal(out.js.licence, "PDL 1.0"); assert.match(out.js.attribution, /統合幕僚監部/); assert.match(out.mnd.attribution, /國防部/); assert.deepEqual(out.needPdf, ["p20261102_04"]); assert.equal(out.updated.js, 6);
});

// ---- multi-source earthquakes ----
await ok("quakes: USGS / EMSC / GFZ real samples parse; same event merges across agencies, CWA wins and sources are recorded", () => {
  const fx = (f) => readFileSync(new URL("./fixtures/" + f, import.meta.url), "utf8");
  const U = parseUsgs(JSON.parse(fx("quake-usgs.json"))), E = parseEmsc(JSON.parse(fx("quake-emsc.json"))), G = parseGfz(fx("quake-gfz.txt"));
  assert.equal(U.length, 3); assert.equal(E.length, 3); assert.equal(G.length, 3);
  assert.equal(U[0].src, "USGS"); assert.equal(U[0].mag, 4.5); assert.equal(E[0].place, "Taiwan Region"); assert.match(E[0].url, /unid=20261102_0000041/); assert.equal(G[0].t, Date.parse("2026-11-02T02:23:07.490Z")); assert.equal(G[0].magType, "ML");
  const now = Date.parse("2026-11-03T06:00:00Z");
  const m3 = mergeQuakeSources({ USGS: U, EMSC: E, GFZ: G }, { now });
  assert.equal(m3.length, 3, "three real events, each reported by all three agencies"); assert.deepEqual(m3[0].srcs, ["USGS", "EMSC", "GFZ"]); assert.equal(m3[0].src, "USGS"); assert.equal(m3[0].others.length, 2);
  const cwa = [{ id: "cwa1", src: "CWA", t: Date.parse("2026-11-02T02:23:03Z"), lat: 24.3, lon: 122.2, mag: 4.4, depthKm: 40, place: "宜蘭縣政府東南方 62.1 公里", report: "r" }, { id: "cwa2", src: "CWA", t: Date.parse("2026-11-02T20:00:00Z"), lat: 23.9, lon: 121.6, mag: 3.2, depthKm: 8, place: "花蓮" }];
  const m = mergeQuakeSources({ CWA: cwa, USGS: U, EMSC: E, GFZ: G }, { now });
  assert.equal(m.length, 4); assert.equal(m[0].id, "cwa2"); const x = m.find((q) => q.id === "cwa1"); assert.equal(x.src, "CWA"); assert.equal(x.mag, 4.4); assert.deepEqual(x.srcs, ["CWA", "USGS", "EMSC", "GFZ"]); assert.deepEqual(x.others.map((o) => o.src), ["USGS", "EMSC", "GFZ"]);
  assert.ok(!sameEvent({ t: 0, lat: 24, lon: 121 }, { t: 200000, lat: 24, lon: 121 }) && !sameEvent({ t: 0, lat: 24, lon: 121 }, { t: 0, lat: 26, lon: 121 }));
  assert.equal(mergeQuakeSources({ USGS: U }, { now: Date.parse("2026-11-20T00:00:00Z") }).length, 0, "older than 7 days dropped");
  assert.match(quakeUrls(now).EMSC, /minlat=20&maxlat=27.5&minlon=118&maxlon=124.5&start=2026-10-31/);
  const [tw, wide] = quakeUrlSets(now); assert.ok(!/minmag/.test(tw.USGS + tw.EMSC + tw.GFZ), "Taiwan query: every magnitude");
  assert.match(wide.USGS, /minlatitude=0&maxlatitude=45&minlongitude=105&maxlongitude=145.*&minmagnitude=4.5$/); assert.match(wide.EMSC, /minlat=0&maxlat=45&minlon=105&maxlon=145&start=2026-10-31.*&minmag=4.5$/); assert.match(wide.GFZ, /minmagnitude=4.5$/);
  assert.deepEqual(mergeById([[{ id: "a", t: 2 }, { id: "b", t: 1 }], [{ id: "a", t: 2 }, { id: "c", t: 3 }]]).map((q) => q.id), ["c", "a", "b"]);
});
await ok("quake push dedupe: the same event first seen from EMSC, later from CWA, alerts once; M<4.5, old and out-of-region events never alert", () => {
  const now = Date.parse("2026-11-02T03:00:00Z"), t = Date.parse("2026-11-02T02:23:05Z");
  const emsc = [{ id: "emsc:1", src: "EMSC", t, lat: 24.28, lon: 122.22, mag: 4.5, depthKm: 34, place: "Taiwan Region" }];
  const a = pickAlertQuakes(mergeQuakeSources({ EMSC: emsc }, { now }), [], now); assert.equal(a.length, 1);
  const seen = a.map(fingerprint);
  const cwa = [{ id: "cwa1", src: "CWA", t: t + 4000, lat: 24.31, lon: 122.19, mag: 4.6, depthKm: 40, place: "宜蘭" }];
  assert.equal(pickAlertQuakes(mergeQuakeSources({ CWA: cwa, EMSC: emsc }, { now }), seen, now).length, 0, "CWA arrives later: no second alert");
  const other = [{ id: "cwa2", src: "CWA", t: t + 3600000, lat: 24.31, lon: 122.19, mag: 4.6, depthKm: 40, place: "宜蘭" }];
  assert.equal(pickAlertQuakes(mergeQuakeSources({ CWA: other }, { now: now + 3600000 + 60000 }), seen, now + 3600000 + 60000).length, 1, "a different event an hour later does alert");
  const small = [{ id: "c3", src: "CWA", t, lat: 24, lon: 121, mag: 4.4, depthKm: 5, place: "x" }, { id: "c4", src: "CWA", t: t - 7 * 3600000, lat: 24, lon: 121, mag: 5.5, depthKm: 5, place: "x" }, { id: "c5", src: "CWA", t, lat: 30, lon: 130, mag: 6, depthKm: 5, place: "x" }];
  assert.equal(pickAlertQuakes(mergeQuakeSources({ CWA: small }, { now }), [], now).length, 0, "M6.0 off Japan (30N 130E) and old / small Taiwan events never alert");
  const jp = [{ id: "j1", src: "USGS", t, lat: 36, lon: 140, mag: 5.8, depthKm: 30, place: "Honshu" }, { id: "j2", src: "USGS", t: t - 3600000, lat: 33, lon: 135, mag: 6.6, depthKm: 30, place: "Kii" }, { id: "j3", src: "USGS", t, lat: 52, lon: 160, mag: 7.1, depthKm: 30, place: "Kamchatka" }];
  const ja = pickAlertQuakes(mergeQuakeSources({ USGS: jp }, { now }), [], now); assert.deepEqual(ja.map((q) => q.id), ["j2"], "outside Taiwan only M6.5+ inside the wide region");
  assert.ok(isFarQuake(ja[0]) && !isFarQuake({ lat: 24, lon: 121 }));
});

await ok("CWA S3 mirror: zip central directory + deflate, newest report first, same quake shape as the REST normaliser", async () => {
  const fx = (f) => readFileSync(new URL("./fixtures/" + f, import.meta.url));
  const felt = await parseQuakeZip(fx("cwa-s3-felt.zip.bin"), "significant"), local = await parseQuakeZip(fx("cwa-s3-local.zip.bin"), "local");
  assert.equal(felt.length, 3); assert.deepEqual(felt.map((q) => q.mag), [5.6, 4.4, 4.5], "sorted by origin time desc (from the file name), not zip order");
  assert.equal(felt[0].t, Date.parse("2026-11-01T16:20:07+08:00")); assert.equal(felt[0].id, "cwa" + felt[0].t); assert.equal(felt[0].src, "CWA"); assert.equal(felt[0].kind, "significant");
  assert.equal(felt[0].place, "宜蘭縣政府東北東方 39.4 公里 (位於臺灣東部海域)"); assert.equal(felt[0].depthKm, 119.5); assert.equal(felt[0].intensity, "宜蘭縣 3級"); assert.match(felt[0].report, /規模5\.6有感地震/); assert.match(felt[0].url, /^https:\/\/scweb\.cwa\.gov\.tw/);
  assert.deepEqual(local.map((q) => q.mag), [4.8, 3.7]); assert.equal(local[1].kind, "local"); assert.equal(local[0].t, Date.parse("2026-11-02T10:23:09+08:00"));
  assert.equal(entryTime("CWA-EC115000-2026-1102-102309-OD.xml"), Date.parse("2026-11-02T10:23:09+08:00")); assert.equal(entryTime("README.txt"), 0);
  assert.equal(parseQuakeXml("<x/>", "local"), null);
  assert.equal(zipEntries(new Uint8Array(fx("cwa-s3-felt.zip.bin"))).length, 3);
  const m = mergeQuakeSources({ CWA: [...felt, ...local] }, { now: Date.parse("2026-11-03T06:00:00Z"), days: 7 });
  assert.equal(m.length, 4, "the 9/11 report is older than 7 days and dropped"); assert.equal(m[0].mag, 4.8);
});
await ok("CWA S3 mirror: warnings + typhoon JSON (cwaopendata.dataset wrapper) normalise like the REST API", () => {
  const fx = (f) => JSON.parse(readFileSync(new URL("./fixtures/" + f, import.meta.url), "utf8"));
  const w = s3Warnings(fx("cwa-s3-warnings.json"), Date.parse("2026-11-03T03:00:00Z"));
  assert.deepEqual(w.map((x) => x.phenomena + x.significance), ["陸上強風特報", "大雨特報"]); assert.deepEqual(w[0].locations, ["桃園市", "屏東縣", "澎湖縣"]);
  assert.equal(s3Warnings(fx("cwa-s3-warnings.json"), Date.parse("2026-11-04T00:00:00Z")).length, 0, "expired warnings dropped");
  const t = s3Typhoons(fx("cwa-s3-typhoon.json")); assert.equal(t.length, 1); assert.equal(t[0].name, "IN-FA"); assert.equal(t[0].cwaName, "煙花"); assert.ok(t[0].track.length > 10 && t[0].forecast.length > 3);
});

await ok("MPB raw collection (what mpb-fetcher now streams to the Durable Object): per-MMSI newest record, Taiwan box only, counts for the run log", () => {
  const f = (mmsi, lat, lon, rt, extra = {}) => ({ type: "Feature", geometry: { type: "Point", coordinates: [lon, lat] }, properties: { MMSI: mmsi, Latitude: lat, Longitude: lon, Record_Time: rt, ShipName: "X" + mmsi, ...extra } });
  const gj = { type: "FeatureCollection", features: [f("412000001", 24.1, 120.2, "2026/11/03 13:00:00"), f("412000001", 24.2, 120.3, "2026/11/03 13:05:00"), f("416000002", 25.0, 121.5, "2026/11/03 13:02:00"), f("431000003", 35.6, 139.7, "2026/11/03 13:03:00"), f("bad", 24, 121, "2026/11/03 13:03:00")] };
  const c = normalizeMpbCollection(gj);
  assert.equal(c.features, 5); assert.equal(c.ships.length, 2, "Tokyo + invalid MMSI dropped, duplicate MMSI merged");
  assert.equal(c.ships.find((s) => s.mmsi === "412000001").lat, 24.2, "newest record wins"); assert.ok(c.newest > c.oldest);
  assert.deepEqual(normalizeMpbCollection({}), { features: 0, ships: [], newest: null, oldest: null }); assert.equal(normalizeMpbCollection({ features: [f("431000003", 35.6, 139.7, "2026/11/03 13:03:00")] }).ships.length, 0);
});

await ok("collector watchdog: stale collector + token -> one workflow_dispatch per 15 min; no token -> never", async () => {
  const { Hub3 } = await import("../src/worker.mjs");
  const mk = (env) => { const store = new Map(); const ctx = { blockConcurrencyWhile: (f) => f(), storage: { get: async (k) => (Array.isArray(k) ? new Map() : store.get(k)), put: async (k, v) => { if (typeof k === "string") store.set(k, v); }, getAlarm: async () => null } }; return new Hub3(ctx, env); };
  await new Promise((r) => setTimeout(r, 5));
  const now = Date.now();
  const noTok = mk({}); assert.equal(noTok.collectorCheck(now).needDispatch, false); assert.equal(noTok.collectorCheck(now).stale, true); assert.equal(noTok.collectorCheck(now).dispatchEnabled, false);
  const h = mk({ GH_DISPATCH_TOKEN: "x" }); assert.equal(h.collectorCheck(now).needDispatch, true, "never reported + token -> dispatch");
  h.ghd = { at: now - 5 * 60000, ok: true }; assert.equal(h.collectorCheck(now).needDispatch, false, "throttled: dispatched 5 min ago");
  h.ghd = { at: now - 16 * 60000, ok: true }; assert.equal(h.collectorCheck(now).needDispatch, true);
  h.collectorAt = now - 120000; assert.equal(h.collectorCheck(now).needDispatch, false, "collector fresh (2 min)"); assert.equal(h.collectorCheck(now).ageSec, 120);
});

await ok("Joint Staff place -> approximate position: reference + 8-point bearing + km, uncertainty grows with distance; passages give zones; vague 東シナ alone is not placed", () => {
  const g = geocodeJsPlace("宮古島(沖縄県)の南東約210kmの海域");
  assert.equal(g.basis, "bearing"); assert.ok(Math.abs(g.lat - 23.44) < 0.05 && Math.abs(g.lon - 126.79) < 0.05, JSON.stringify(g)); assert.equal(g.rKm, 94);
  const [la, lo] = destPoint(24.78, 125.33, 90, 100); assert.ok(Math.abs(la - 24.76) < 0.05 && Math.abs(lo - 126.28) < 0.05, la + "," + lo);
  assert.equal(geocodeJsPlace("未知の島の北約10kmの海域"), null); assert.equal(geocodeJsPlace(null), null);
  assert.equal(geocodeJsPlace("都井岬(宮崎県)の南東約60kmの海域").rKm, 34, "min 30 km floor + 0.4 d");
  const z = jsGeo({ title: "中国軍機の動向について（Y-9 沖宮 東シナ）", groups: [{ where: ["沖宮", "東シナ"] }] }); assert.equal(z.length, 1); assert.equal(z[0].basis, "zone");
  assert.deepEqual(jsGeo({ title: "x", groups: [{ where: ["東シナ"] }] }), []);
  assert.equal(jsGeo({ place: "口永良部島(鹿児島県)の西約200kmの海域", groups: [] })[0].basis, "bearing");
  const pub = plaPublic({ mnd: { list: [], days: {} }, js: { events: [{ id: "p20261102_04", date: "2026-11-02", title: "t", kind: "ship", groups: [], place: "宮古島(沖縄県)の南東約210kmの海域" }], details: {} } }, Date.now());
  assert.ok(pub.js.events[0].geo && pub.js.events[0].geo[0].lat < 24);
});

await ok("leisure filter + Chinese research heuristic", () => {
  assert.ok(isLeisureOrFishing({ type: 30, mmsi: "416000001" }));
  assert.ok(isLeisureOrFishing({ type: 37, name: "SEA BREEZE", mmsi: "319000001" }));
  assert.ok(isLeisureOrFishing({ type: 0, name: "FISHING STAR", mmsi: "416000002" }));
  assert.ok(!isLeisureOrFishing({ type: 30, name: "HAIJING 2901", mmsi: "412000001" }), "CCG type 30 kept");
  assert.ok(!isLeisureOrFishing({ type: 70, mmsi: "353001000" }));
  assert.equal(researchWhy({ name: "XIANG YANG HONG 06", mmsi: "412123456", type: 90 }), "fleet");
  assert.equal(researchWhy({ name: "KEXUE", mmsi: "413000001", type: 90 }), "fleet");
  assert.equal(researchWhy({ name: "OCEAN SURVEYOR 1", mmsi: "412000222", type: 90 }), "name");
  assert.equal(researchWhy({ name: "NEW OCEANRESEARCHER3", mmsi: "416005696", type: 99 }), null, "Taiwan research not flagged as PRC");
  assert.ok(isPlan({ name: "x", type: 35, mmsi: "414123456" }), "type 35 + 414 MID is PLAN");
  assert.ok(isPlan({ name: "解放军海军", mmsi: "1" }));
});

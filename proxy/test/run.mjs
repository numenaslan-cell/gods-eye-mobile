// node proxy/test/run.mjs  — unit tests for the Worker's pure logic (no network, no Cloudflare runtime needed; Node >= 20).
import assert from "node:assert/strict";
import { encryptPayload, vapidAuthHeader, generateVapidKeys, b64uDecode, b64uEncode } from "../src/webpush.mjs";
import { applyAis, publicShips, isCcg } from "../src/ais.mjs";
import { selectQuakes, validateSubscription } from "../src/logic.mjs";
import { collectFlights, normalizeAdsb, hexCountry, dedupeByHex } from "../src/flights.mjs";
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
  assert.ok(isCcg({ name: "HAI JING 2102", mmsi: "412000000" })); assert.ok(isCcg({ name: "CHINA COAST GUARD 3305", mmsi: "1" })); assert.ok(isCcg({ name: "x", type: 55, mmsi: "413999999" }));
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
await ok("flights: both adsb.lol circles merged and deduped by hex; box crop applied", async () => {
  const calls = [];
  const f = async (u) => { calls.push(u); if (/point\/25\.3\/121/.test(u)) return jr({ ac: [lolAc("aaa111", 25, 121), lolAc("bbb222", 23, 121), lolAc("far999", 40, 140)] }); if (/point\/22\.6\/120\.8/.test(u)) return jr({ ac: [lolAc("bbb222", 23, 121), lolAc("ccc333", 22, 120)] }); throw new Error("unexpected " + u); };
  const r = await collectFlights({ fetch: f });
  assert.equal(r.source, "adsb.lol"); assert.deepEqual(r.flights.map((x) => x.id).sort(), ["aaa111", "bbb222", "ccc333"]); assert.equal(r.count, 3);
  assert.ok(calls.every((u) => /^https:\/\/api\.adsb\.lol\/v2\/point\/[\d.]+\/[\d.]+\/250$/.test(u)));
});
await ok("flights: a failing circle falls back to adsb.fi (aircraft key), no OpenSky call", async () => {
  const calls = [];
  const f = async (u) => { calls.push(u); if (/adsb\.lol.*25\.3/.test(u)) return jr({}, 429); if (/adsb\.lol/.test(u)) return jr({ ac: [lolAc("ccc333", 22, 120)] }); if (/adsb\.fi.*lat\/25\.3\/lon\/121\/dist\/250/.test(u)) return jr({ aircraft: [lolAc("aaa111", 25, 121)] }); throw new Error("unexpected " + u); };
  const r = await collectFlights({ fetch: f });
  assert.equal(r.source, "adsb.lol+adsb.fi"); assert.equal(r.count, 2); assert.ok(r.partial[0].includes("429")); assert.ok(!calls.some((u) => /opensky/.test(u)));
});
await ok("flights: everything else down -> OpenSky last resort; all down -> throws", async () => {
  const os = { states: [["71be1f", "KAL123 ", "South Korea", 0, 0, 121.5, 24.1, 10000, false, 230, 45, 2, null, 10500]] };
  const f = async (u) => { if (/opensky/.test(u)) return jr(os); throw new Error("net down"); };
  const r = await collectFlights({ fetch: f });
  assert.equal(r.source, "opensky"); assert.equal(r.flights[0].callsign, "KAL123"); assert.equal(r.flights[0].altFt, 34449); assert.equal(r.flights[0].speedKt, 447);
  await assert.rejects(collectFlights({ fetch: async () => { throw new Error("net down"); } }), /all flight sources failed/);
});
console.log(n + " tests passed");

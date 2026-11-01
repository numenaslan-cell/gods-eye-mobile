/* Minimal Web Push (RFC 8030 + VAPID RFC 8292 + aes128gcm RFC 8291) on WebCrypto — runs in Workers and Node >= 20. */
export const b64uEncode = (buf) => {
  const b = new Uint8Array(buf); let s = ""; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
export const b64uDecode = (str) => {
  if (typeof str !== "string" || !/^[A-Za-z0-9_-]+$/.test(str)) throw new Error("bad base64url");
  const s = atob(str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4));
  const out = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i); return out;
};
const concat = (...a) => { const n = a.reduce((x, y) => x + y.length, 0), o = new Uint8Array(n); let i = 0; for (const x of a) { o.set(x, i); i += x.length; } return o; };
const enc = new TextEncoder();

async function hkdf(salt, ikm, info, bytes) {
  const key = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt, info }, key, bytes * 8));
}

/**
 * RFC 8291 §3.4 / RFC 8188: encrypt `plaintext` for a user agent (p256dh = 65-byte uncompressed point, auth = 16 bytes).
 * `test` may inject { asKeyPair: {privateKey, publicRaw}, salt } to reproduce the RFC test vector.
 */
export async function encryptPayload(plaintext, uaPublic, authSecret, test) {
  const asKeys = test && test.asKeyPair ? test.asKeyPair : null;
  let asPriv, asPubRaw;
  if (asKeys) { asPriv = asKeys.privateKey; asPubRaw = asKeys.publicRaw; }
  else {
    const kp = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
    asPriv = kp.privateKey; asPubRaw = new Uint8Array(await crypto.subtle.exportKey("raw", kp.publicKey));
  }
  const uaKey = await crypto.subtle.importKey("raw", uaPublic, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const ecdh = new Uint8Array(await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, asPriv, 256));
  const salt = test && test.salt ? test.salt : crypto.getRandomValues(new Uint8Array(16));
  const ikm = await hkdf(authSecret, ecdh, concat(enc.encode("WebPush: info\0"), uaPublic, asPubRaw), 32);
  const cek = await hkdf(salt, ikm, enc.encode("Content-Encoding: aes128gcm\0"), 16);
  const nonce = await hkdf(salt, ikm, enc.encode("Content-Encoding: nonce\0"), 12);
  const aes = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  const padded = concat(plaintext, new Uint8Array([2])); // single, final record
  if (padded.length > 4096 - 17) throw new Error("payload too large");
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, aes, padded));
  const rs = new Uint8Array([0, 0, 0x10, 0]); // record size 4096, big endian
  return concat(salt, rs, new Uint8Array([asPubRaw.length]), asPubRaw, ct);
}

/** RFC 8292 `Authorization: vapid t=<jwt>, k=<public key>` (ES256). privateB64u = raw 32-byte P-256 private scalar. */
export async function vapidAuthHeader(audience, subject, publicB64u, privateB64u, nowSec) {
  const pub = b64uDecode(publicB64u);
  if (pub.length !== 65 || pub[0] !== 4) throw new Error("bad VAPID public key");
  const jwk = { kty: "EC", crv: "P-256", x: b64uEncode(pub.slice(1, 33)), y: b64uEncode(pub.slice(33, 65)), d: privateB64u, ext: true };
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const exp = (nowSec || Math.floor(Date.now() / 1000)) + 12 * 3600;
  const head = b64uEncode(enc.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const claims = b64uEncode(enc.encode(JSON.stringify({ aud: audience, exp, sub: subject })));
  const sig = new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, enc.encode(head + "." + claims))); // WebCrypto gives raw r||s (JWS format)
  return "vapid t=" + head + "." + claims + "." + b64uEncode(sig) + ", k=" + publicB64u;
}

/** Generate a VAPID key pair (used by scripts/gen-vapid.mjs). */
export async function generateVapidKeys() {
  const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign"]);
  const jwk = await crypto.subtle.exportKey("jwk", kp.privateKey);
  const pub = concat(new Uint8Array([4]), b64uDecode(jwk.x), b64uDecode(jwk.y));
  return { publicKey: b64uEncode(pub), privateKey: jwk.d };
}

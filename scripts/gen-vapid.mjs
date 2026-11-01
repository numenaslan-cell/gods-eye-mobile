// node scripts/gen-vapid.mjs  — prints a fresh VAPID key pair (Web Push). Keep the PRIVATE key secret: it only ever goes into the Worker secret VAPID_PRIVATE_KEY.
import { generateVapidKeys } from "../proxy/src/webpush.mjs";
const k = await generateVapidKeys();
console.log("VAPID_PUBLIC_KEY  (plain Worker var, safe to publish) = " + k.publicKey);
console.log("VAPID_PRIVATE_KEY (Worker SECRET — never commit)      = " + k.privateKey);

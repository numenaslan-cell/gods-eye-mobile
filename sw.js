/* Minimal service worker: cache the static app shell only. API calls (OpenSky / CelesTrak) always go to the network. */
const CACHE = "gods-eye-v1";
const SHELL = ["./", "index.html", "manifest.json", "assets/styles.css", "assets/config.js", "assets/live-data.js",
  "assets/app.bundle.js", "assets/textures.js", "assets/vendor/satellite.min.js", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // cross-origin (data APIs) -> network
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});

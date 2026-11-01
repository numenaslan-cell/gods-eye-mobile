/* Service worker: cache the static app shell only (API calls always go to the network) + Web Push alerts. */
const CACHE = "gods-eye-v3";
const SHELL = ["./", "index.html", "manifest.json", "assets/styles.css", "assets/config.js", "assets/live-data.js", "assets/passes.js", "assets/push.js",
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

/* ---- Web Push (payload is JSON: { title, body, tag, url, icon, badge }) ---- */
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "God's Eye View", {
    body: d.body || "", tag: d.tag || undefined, icon: d.icon || "icons/icon-192.png", badge: d.badge || "icons/icon-192.png",
    data: { url: d.url || self.registration.scope }, renotify: !!d.tag,
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cs) => {
    const own = target.indexOf(self.registration.scope) === 0;
    const same = cs.find((c) => c.url.indexOf(self.registration.scope) === 0);
    if (own && same && "focus" in same) return same.focus().then((c) => (c && "navigate" in c ? c.navigate(target) : c));
    return self.clients.openWindow(target);
  }));
});

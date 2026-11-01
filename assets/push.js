/*
 * God's Eye View // ORB-7 — Web Push client (window.GodsEyePush).
 * Talks to the Worker (cfg.proxyBase): GET /push/config, POST /push/subscribe | unsubscribe | test.
 * The VAPID *public* key comes from the Worker; the private key never leaves it.
 * iOS: Web Push only works for a site added to the Home Screen (iOS/iPadOS 16.4+).
 */
(function () {
  "use strict";
  var cfg = (window.GodsEyeData && window.GodsEyeData.config) || window.GODS_EYE_CONFIG || {};
  var KEY = "gods-eye:push";
  var saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { /* none */ }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* quota */ } }

  function b64uToBytes(s) { var p = (s + "====".slice((s.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/"), r = atob(p), o = new Uint8Array(r.length); for (var i = 0; i < r.length; i++) o[i] = r.charCodeAt(i); return o; }
  function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); }
  function standalone() { return (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true; }
  function supported() { return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window; }

  var serverCfg = null;
  function config() {
    if (serverCfg) return Promise.resolve(serverCfg);
    if (!cfg.proxyBase) return Promise.resolve({ enabled: false, reason: "no Worker configured" });
    return fetch(cfg.proxyBase + "/push/config", { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (j) { serverCfg = j; return j; }).catch(function (e) { return { enabled: false, reason: "Worker unreachable / push endpoint not deployed (" + ((e && e.message) || e) + ")" }; });
  }
  function post(path, body) {
    return fetch(cfg.proxyBase + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw new Error(j.error || "HTTP " + r.status); return j; });
    });
  }
  function registration() { return navigator.serviceWorker.ready; }
  function currentSub() { return registration().then(function (reg) { return reg.pushManager.getSubscription(); }); }

  function info() {
    return config().then(function (c) {
      var base = { supported: supported(), ios: isIOS(), standalone: standalone(), permission: "Notification" in window ? Notification.permission : "denied", server: c, prefs: saved.prefs || { quake: true, ccg: false, iss: true }, subscribed: false };
      if (!base.supported) return base;
      return currentSub().then(function (s) { base.subscribed = !!s && !!saved.subscribed; return base; }).catch(function () { return base; });
    });
  }

  function subscribe(prefs, loc) {
    return config().then(function (c) {
      if (!c.enabled || !c.publicKey) throw new Error(c.reason || "push not configured on the Worker");
      if (!supported()) throw new Error(isIOS() ? "On iPhone: Share → Add to Home Screen, then open the app from the Home Screen icon (iOS 16.4+)." : "Push is not supported in this browser");
      return Notification.requestPermission().then(function (perm) {
        if (perm !== "granted") throw new Error("notification permission " + perm);
        return registration();
      }).then(function (reg) {
        return reg.pushManager.getSubscription().then(function (s) { return s || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uToBytes(c.publicKey) }); });
      }).then(function (sub) {
        return post("/push/subscribe", { subscription: sub.toJSON(), prefs: prefs, loc: prefs.iss && loc ? { lat: loc.lat, lon: loc.lon } : null }).then(function (r) {
          saved = { subscribed: true, prefs: prefs }; persist(); return r;
        });
      });
    });
  }
  function update(prefs, loc) { return subscribe(prefs, loc); } // same endpoint -> the Worker overwrites the record
  function unsubscribe() {
    return currentSub().then(function (sub) {
      var p = sub ? post("/push/unsubscribe", { endpoint: sub.endpoint }).catch(function () {}) : Promise.resolve();
      return p.then(function () { return sub ? sub.unsubscribe() : true; });
    }).then(function () { saved.subscribed = false; persist(); });
  }
  function test() { return currentSub().then(function (sub) { if (!sub) throw new Error("not subscribed"); return post("/push/test", { endpoint: sub.endpoint }); }); }
  function savePrefs(prefs) { saved.prefs = prefs; persist(); }

  window.GodsEyePush = { info: info, subscribe: subscribe, update: update, unsubscribe: unsubscribe, test: test, savePrefs: savePrefs, supported: supported, isIOS: isIOS, standalone: standalone };
})();

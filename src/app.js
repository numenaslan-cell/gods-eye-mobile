/*
 * God's Eye View // ORB-7 — application layer (readable source).
 *
 * This file is concatenated after src/vendor.js (bundled React 18 + three.js r171 +
 * lucide icons + textures, recovered from the original artifact; minified identifiers
 * like `eG`, `PF`, `XE` below are those bundle exports). Run `node build.mjs` to
 * regenerate assets/app.bundle.js.
 */
(function () {
  "use strict";

  /* ---- aliases for the minified vendor exports ------------------------------ */
  var React = XE;                     // React (hooks)
  var createRoot = W4.createRoot;     // react-dom/client
  var T = {
    Vector3: f, Scene: eG, Color: mA, WebGLRenderer: PF, PerspectiveCamera: YM, OrbitControls: fF,
    AmbientLight: GZ, DirectionalLight: LZ, TextureLoader: YZ, SphereGeometry: _Y, ShaderMaterial: RM,
    Mesh: LM, Group: Gw, ConeGeometry: zK, MeshBasicMaterial: tY, BufferGeometry: KM,
    Float32BufferAttribute: xE, LineBasicMaterial: JK, Line: AZ, PointsMaterial: qK, Points: EZ,
    BackSide: UM, SRGB: IK, ACES: fG, Repeat: gG,
  };
  var TEX = window.GODS_EYE_TEXTURES || {};
  var DAY_TEX = TEX.day, NIGHT_TEX = TEX.night; // NASA Blue Marble / Black Marble (assets/textures/*.jpg), inlined by build.mjs
  var ICON = { Plane: SK, Satellite: PK, Plus: kK, Minus: TK, Search: uK, Radio: xK };

  var Data = window.GodsEyeData;
  var R_KM = 6371;
  var DEG = Math.PI / 180;

  /* ---- tiny JSX-less helper -------------------------------------------------- */
  function h(type, props) {
    var kids = [];
    for (var i = 2; i < arguments.length; i++) kids.push(arguments[i]);
    kids = kids.flat(Infinity).filter(function (k) { return k !== null && k !== undefined && k !== false; });
    var p = Object.assign({}, props || {});
    if (kids.length) p.children = kids.length === 1 ? kids[0] : kids;
    return React.createElement(type, p);
  }
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }

  /* ---- geometry helpers ------------------------------------------------------ */
  function latLonToVec(lat, lon, r) { // same lat/lon -> xyz mapping as the original artifact (matches the globe textures)
    var phi = ((90 - lat) * Math.PI) / 180, lam = ((lon + 180) * Math.PI) / 180;
    return new T.Vector3(-r * Math.sin(phi) * Math.cos(lam), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(lam));
  }
  function vecToLatLon(v) {
    var n = v.clone().normalize();
    var lat = Math.asin(Math.max(-1, Math.min(1, n.y))) / DEG;
    var lon = Math.atan2(n.z, -n.x) / DEG - 180;
    if (lon < -180) lon += 360;
    return { lat: lat, lon: lon };
  }
  function deadReckon(fl, nowMs) {
    var dt = Math.min(Math.max((nowMs - fl.t) / 1000, 0), 180);
    var hdg = fl.hdg * DEG, d = (fl.vMs * dt) / (R_KM * 1000); // angular distance
    var lat = fl.lat + (d * Math.cos(hdg)) / DEG;
    var lon = fl.lon + (d * Math.sin(hdg)) / DEG / Math.max(Math.cos(fl.lat * DEG), 0.05);
    if (lon > 180) lon -= 360; if (lon < -180) lon += 360;
    return { lat: Math.max(-89.5, Math.min(89.5, lat)), lon: lon };
  }
  function sunDirection(date) {
    // Low-precision subsolar point (good to ~1 degree) for a real day/night terminator.
    var start = Date.UTC(date.getUTCFullYear(), 0, 0);
    var doy = (date.getTime() - start) / 86400000;
    var decl = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10));
    var utcH = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
    var B = ((2 * Math.PI) / 365) * (doy - 81);
    var eqt = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // minutes
    var lon = -15 * (utcH - 12 + eqt / 60);
    return latLonToVec(decl, lon, 1).normalize();
  }
  function fmtN(n) { return n == null || !isFinite(n) ? "--" : Math.round(n).toLocaleString("en-US"); }
  function fmtLL(lat, lon) {
    return Math.abs(lat).toFixed(2) + (lat >= 0 ? "N " : "S ") + Math.abs(lon).toFixed(2) + (lon >= 0 ? "E" : "W");
  }
  function ago(ms) { if (!ms) return "--"; var s = Math.round((Date.now() - ms) / 1000); return s < 60 ? s + "s" : Math.round(s / 60) + "m"; }

  var PLACES = {
    taiwan: { lat: 23.7, lon: 121.0, narrow: 3.0, wide: 2.1, label: "台灣上空" },
    t101: { lat: 25.0339, lon: 121.5645, narrow: 1.12, wide: 1.1, label: "台北101" },
    tpe: { lat: 25.0777, lon: 121.2328, narrow: 1.12, wide: 1.1, label: "桃園機場" },
  };

  /* ===========================================================================
   *  Component
   * ========================================================================= */
  function App() {
    var canvasRef = React.useRef(null);
    var rootRef = React.useRef(null);
    var reticleRef = React.useRef(null);
    var api = React.useRef({}); // imperative scene handle

    var _mode = React.useState("DAY"), mode = _mode[0], setMode = _mode[1];
    var _tick = React.useState(0), setTick = _tick[1];
    var _sel = React.useState(null), selId = _sel[0], setSelId = _sel[1];
    var _follow = React.useState(false), follow = _follow[0], setFollow = _follow[1];
    var _layers = React.useState({ sats: true, flights: true }), layers = _layers[0], setLayers = _layers[1];
    var _hud = React.useState(function () { return window.innerHeight >= 760; }) /* short screens start collapsed */, hudOpen = _hud[0], setHudOpen = _hud[1];
    var _sp = React.useState(false), satOpen = _sp[0], setSatOpen = _sp[1];
    var _q = React.useState(""), query = _q[0], setQuery = _q[1];
    var _place = React.useState("taiwan"), place = _place[0], setPlace = _place[1];
    var _toast = React.useState(""), toast = _toast[0], setToast = _toast[1];
    var _view = React.useState({ lat: 23.7, lon: 121, altKm: 0 }), view = _view[0], setView = _view[1];

    var modeRef = React.useRef(mode); modeRef.current = mode;
    var selRef = React.useRef(selId); selRef.current = selId;
    var followRef = React.useRef(follow); followRef.current = follow;
    var layersRef = React.useRef(layers); layersRef.current = layers;
    var focusRef = React.useRef(null);

    /* ---- data subscription (throttled re-render) ---- */
    React.useEffect(function () {
      var pending = 0;
      var unsub = Data.subscribe(function () {
        if (pending) return;
        pending = setTimeout(function () { pending = 0; setTick(function (t) { return t + 1; }); }, 250);
      });
      Data.start();
      var iv = setInterval(function () { setTick(function (t) { return t + 1; }); }, 5000); // refresh "age" labels
      return function () { unsub(); clearInterval(iv); clearTimeout(pending); };
    }, []);

    var flights = Data.state.flights, sats = Data.state.sats;
    var list = flights.list;
    var selIdx = Math.max(0, list.findIndex(function (x) { return x.id === selId; }));
    var selected = list.length ? list[selIdx] : null;
    React.useEffect(function () { // keep a valid selection when the list changes
      if (!list.length) { if (selId !== null) setSelId(null); return; }
      if (!list.some(function (x) { return x.id === selId; })) setSelId(list[0].id);
    }, [flights.rev]);

    function showToast(msg) { setToast(msg); clearTimeout(showToast.t); showToast.t = setTimeout(function () { setToast(""); }, 2600); }

    function flyTo(lat, lon, dist, persistent) {
      focusRef.current = { kind: "point", lat: lat, lon: lon, dist: dist, persistent: !!persistent };
    }
    function isNarrow() { var r = rootRef.current; return !r || r.clientWidth < 700; }
    function goPlace(key) {
      var p = PLACES[key]; setPlace(key); setFollow(false);
      flyTo(p.lat, p.lon, isNarrow() ? p.narrow : p.wide);
    }
    function selectFlight(id, doFollow) {
      setSelId(id); setHudOpen(true); if (isNarrow()) setSatOpen(false);
      if (doFollow) { setFollow(true); focusRef.current = { kind: "flight", id: id }; }
    }
    function cycle(dir) {
      if (!list.length) return;
      var n = (selIdx + dir + list.length) % list.length;
      setSelId(list[n].id);
      if (followRef.current) focusRef.current = { kind: "flight", id: list[n].id };
    }
    function toggleFollow() {
      if (!selected) return;
      if (follow) { setFollow(false); focusRef.current = null; }
      else { setFollow(true); focusRef.current = { kind: "flight", id: selected.id }; }
    }
    function trackIss() {
      var iss = sats.iss; if (!iss) { showToast("ISS NOT AVAILABLE"); return; }
      setFollow(false); focusRef.current = { kind: "iss" }; setPlace("");
    }
    function zoom(dir) {
      var a = api.current; if (!a.camera) return;
      var len = a.camera.position.length();
      var next = Math.max(a.controls.minDistance, Math.min(a.controls.maxDistance, len * (dir > 0 ? 0.75 : 1.33)));
      a.camera.position.multiplyScalar(next / len);
      if (focusRef.current && focusRef.current.kind === "point") focusRef.current = null;
    }
    function runSearch(e) {
      e.preventDefault();
      var q = query.trim(); if (!q) return;
      var up = q.toUpperCase().replace(/\s+/g, "");
      var m = q.match(/^(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)$/);
      if (m) {
        var lat = parseFloat(m[1]), lon = parseFloat(m[2]);
        if (Math.abs(lat) <= 90 && Math.abs(lon) <= 180) { setPlace(""); setFollow(false); flyTo(lat, lon, 1.6); showToast("FLY TO " + fmtLL(lat, lon)); return; }
      }
      var fl = list.find(function (x) { return x.callsign.replace(/\s+/g, "") === up; }) ||
        list.find(function (x) { return x.callsign.replace(/\s+/g, "").indexOf(up) === 0; }) ||
        list.find(function (x) { return x.callsign.replace(/\s+/g, "").indexOf(up) >= 0 || x.id === q.toLowerCase(); });
      if (fl) { selectFlight(fl.id, true); setPlace(""); showToast("TRACKING " + fl.callsign); return; }
      if (/^ISS/.test(up)) { trackIss(); return; }
      var si = sats.names.findIndex(function (nm) { return nm.toUpperCase().indexOf(q.toUpperCase()) >= 0; });
      if (si >= 0 && sats.pos[si * 3 + 2] > 0) {
        setPlace(""); setFollow(false);
        flyTo(sats.pos[si * 3], sats.pos[si * 3 + 1], 1.7);
        showToast(sats.names[si]); return;
      }
      showToast("NO MATCH: " + q);
    }

    /* ---- three.js scene (created once) ---- */
    React.useEffect(function () {
      var canvas = canvasRef.current, root = rootRef.current;
      if (!canvas) return;
      var scene = new T.Scene();
      scene.background = new T.Color(0x02060a);
      var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = T.SRGB;
      renderer.toneMapping = T.ACES;
      var camera = new T.PerspectiveCamera(28, 1, 0.05, 100);
      var controls = new T.OrbitControls(camera, renderer.domElement);
      controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.08;
      controls.minDistance = 1.06; controls.maxDistance = 8; controls.zoomSpeed = 1.2; controls.rotateSpeed = 0.6;
      controls.target.set(0, 0, 0);
      // Smaller rotate/zoom speed when zoomed in close.
      controls.addEventListener("start", function () {
        var fk = focusRef.current;
        if (fk) { if (fk.kind !== "point" || fk.persistent) setFollow(false); focusRef.current = null; }
      });

      var ambient = new T.AmbientLight(0xffffff, 0.85); scene.add(ambient);
      var sun = new T.DirectionalLight(0xffffff, 2.2); sun.position.set(5, 2, 3); scene.add(sun);

      var loader = new T.TextureLoader();
      var dayMap = loader.load(DAY_TEX), nightMap = loader.load(NIGHT_TEX);
      [dayMap, nightMap].forEach(function (t) { t.colorSpace = T.SRGB; t.anisotropy = 8; t.wrapS = t.wrapT = T.Repeat; });
      var earthMat = new T.ShaderMaterial({
        uniforms: {
          dayMap: { value: dayMap }, nightMap: { value: nightMap }, sunDir: { value: sunDirection(new Date()) },
          brightness: { value: 1.25 }, mode: { value: 0 }, opacityNight: { value: 0.85 },
        },
        vertexShader: "varying vec2 vUv; varying vec3 vNormal; void main(){ vUv = uv; vNormal = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: [
          "uniform sampler2D dayMap; uniform sampler2D nightMap; uniform vec3 sunDir; uniform float brightness; uniform float mode;",
          "varying vec2 vUv; varying vec3 vNormal;",
          "void main(){",
          "  float sun = dot(normalize(vNormal), normalize(sunDir));", // world-space normal vs world-space sun
          "  float dayMix = smoothstep(-0.25, 0.45, sun);",
          "  vec3 dayC = texture2D(dayMap, vUv).rgb;",
          "  float dl = dot(dayC, vec3(0.299,0.587,0.114));",
          "  dayC = (dayC + vec3(0.025,0.07,0.17) * (1.0 - smoothstep(0.0, 0.22, dl))) * brightness;", // lift the near-black deep-ocean pixels
          "  vec3 nightC = texture2D(nightMap, vUv).rgb;",
          "  vec3 color = mix(nightC * 0.9, dayC, dayMix);",
          "  if(mode > 0.5 && mode < 1.5){ float lum = dot(color, vec3(0.299,0.587,0.114)); color = vec3(lum*0.2, lum*1.1, lum*0.3); }",
          "  if(mode > 1.5){ float lum = dot(dayC, vec3(0.3,0.59,0.11)); color = vec3(1.0 - lum) * vec3(1.0,0.6,0.2); color += nightC * 0.5; }",
          "  gl_FragColor = vec4(color, 1.0);",
          "}",
        ].join("\n"),
      });
      var earth = new T.Mesh(new T.SphereGeometry(1, 128, 128), earthMat); scene.add(earth);

      var glowMat = new T.ShaderMaterial({
        transparent: true, side: T.BackSide, uniforms: { mode: { value: 0 } },
        vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: "varying vec3 vN; uniform float mode; void main(){ float f = pow(1.0 - abs(dot(vN, vec3(0.0,0.0,1.0))), 4.0); vec3 col = mode < 0.5 ? vec3(0.15,0.45,1.0) : vec3(0.2,1.0,0.3); gl_FragColor = vec4(col, f * 0.5); }",
      });
      scene.add(new T.Mesh(new T.SphereGeometry(1.05, 64, 64), glowMat));

      // background stars
      var starGeo = new T.BufferGeometry(), sp = [];
      for (var i = 0; i < 2000; i++) {
        var rr = 20 + Math.random() * 30, a1 = Math.random() * Math.PI * 2, a2 = Math.acos(2 * Math.random() - 1);
        sp.push(rr * Math.sin(a2) * Math.cos(a1), rr * Math.sin(a2) * Math.sin(a1), rr * Math.cos(a2));
      }
      starGeo.setAttribute("position", new T.Float32BufferAttribute(sp, 3));
      scene.add(new T.Points(starGeo, new T.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: false })));

      // fixed place markers (Taipei 101, Taoyuan airport)
      var mk = [PLACES.t101, PLACES.tpe].map(function (p) { var v = latLonToVec(p.lat, p.lon, 1.003); return [v.x, v.y, v.z]; }).flat();
      var markerGeo = new T.BufferGeometry(); markerGeo.setAttribute("position", new T.Float32BufferAttribute(mk, 3));
      scene.add(new T.Points(markerGeo, new T.PointsMaterial({ color: 0x00e5ff, size: 7, sizeAttenuation: false })));

      // satellites
      var satGroup = new T.Group(); scene.add(satGroup);
      var satMat = new T.PointsMaterial({ color: 0x9fe8ff, size: 1.5, sizeAttenuation: false, transparent: true, opacity: 0.6 });
      var twMat = new T.PointsMaterial({ color: 0xc8ff00, size: 6, sizeAttenuation: false });
      var issMat = new T.PointsMaterial({ color: 0xff3b30, size: 10, sizeAttenuation: false });
      var satPts = new T.Points(new T.BufferGeometry(), satMat), twPts = new T.Points(new T.BufferGeometry(), twMat), issPts = new T.Points(new T.BufferGeometry(), issMat);
      satPts.frustumCulled = twPts.frustumCulled = issPts.frustumCulled = false;
      satGroup.add(satPts); satGroup.add(twPts); satGroup.add(issPts);

      // flights
      var flightGroup = new T.Group(); scene.add(flightGroup);
      var coneGeo = new T.ConeGeometry(0.006, 0.018, 3); coneGeo.rotateX(Math.PI / 2);
      var flMat = new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      var selMat = new T.MeshBasicMaterial({ color: 0xffe600 });
      var meshes = {}; // id -> {mesh, fl}
      var trailGeo = new T.BufferGeometry();
      var trailLine = new T.Line(trailGeo, new T.LineBasicMaterial({ color: 0xffe63b, transparent: true, opacity: 0.9 }));
      scene.add(trailLine);

      var lastFlightRev = -1, lastSatRev = -1, lastSelTrail = "", lastSunAt = 0, lastViewAt = 0;
      var tmpUp = new T.Vector3(), tmpDir = new T.Vector3(), tmpNorth = new T.Vector3(), tmpEast = new T.Vector3(), tmpTarget = new T.Vector3();

      function resize() {
        var w = root.clientWidth || window.innerWidth, hgt = root.clientHeight || window.innerHeight;
        var aspect = w / hgt;
        camera.aspect = aspect;
        camera.fov = aspect < 1 ? Math.min(62, (2 * Math.atan(Math.tan(14 * DEG) / aspect)) / DEG) : 28; // keep horizontal FOV on portrait phones
        applyViewOffset();
        renderer.setSize(w, hgt, false);
      }
      // Centre the globe in the part of the screen that is NOT covered by the HUD panels.
      var lastShift = null;
      function applyViewOffset() {
        var w = root.clientWidth || window.innerWidth, hgt = root.clientHeight || window.innerHeight, shift = 0;
        var bar = root.querySelector(".ge-bar"), dock = root.querySelector(".ge-dock"), chips = root.querySelector(".ge-chips");
        if (bar && chips) {
          var rr = root.getBoundingClientRect(), top = bar.getBoundingClientRect().bottom - rr.top;
          var bottom = (w < 700 && dock ? dock.getBoundingClientRect().top : chips.getBoundingClientRect().top) - rr.top;
          if (bottom - top > 120) shift = (top + bottom) / 2 - hgt / 2;
        }
        shift = Math.round(shift);
        if (shift === lastShift && camera.view && camera.view.enabled) return;
        lastShift = shift;
        if (shift) camera.setViewOffset(w, hgt, 0, -shift, w, hgt); else camera.clearViewOffset();
        camera.updateProjectionMatrix();
      }
      resize();
      var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
      if (ro) ro.observe(root); else window.addEventListener("resize", resize);

      // initial camera: look at Taiwan
      (function () {
        var p = PLACES.taiwan, d = root.clientWidth < 700 ? p.narrow : p.wide;
        camera.position.copy(latLonToVec(p.lat, p.lon, 1).normalize().multiplyScalar(d));
        controls.update();
      })();

      function syncFlights() {
        var st = Data.state.flights, seen = {};
        st.list.forEach(function (fl) {
          seen[fl.id] = 1;
          var e = meshes[fl.id];
          if (!e) { var m = new T.Mesh(coneGeo, flMat); flightGroup.add(m); e = meshes[fl.id] = { mesh: m, fl: fl }; }
          e.fl = fl;
        });
        Object.keys(meshes).forEach(function (id) { if (!seen[id]) { flightGroup.remove(meshes[id].mesh); delete meshes[id]; } });
      }

      function syncSats() {
        var st = Data.state.sats, pos = st.pos, n = pos.length / 3;
        var all = new Float32Array(n * 3), tw = [], overSet = {};
        st.over.forEach(function (o) { overSet[o.i] = 1; });
        for (var i = 0; i < n; i++) {
          var alt = pos[i * 3 + 2];
          if (alt < 0) continue;
          var r = 1 + Math.min(alt / R_KM, 1.2);
          var v = latLonToVec(pos[i * 3], pos[i * 3 + 1], r);
          all[i * 3] = v.x; all[i * 3 + 1] = v.y; all[i * 3 + 2] = v.z;
          if (overSet[i]) tw.push(v.x, v.y, v.z);
        }
        function setGeo(obj, arr) {
          var g = new T.BufferGeometry(); g.setAttribute("position", new T.Float32BufferAttribute(arr, 3));
          obj.geometry.dispose(); obj.geometry = g;
        }
        setGeo(satPts, all); setGeo(twPts, tw);
        var iss = st.iss, iv = iss ? latLonToVec(iss.lat, iss.lon, 1 + Math.min(iss.altKm / R_KM, 1.2)) : null;
        setGeo(issPts, iv ? [iv.x, iv.y, iv.z] : []);
      }

      function updateTrail(selFl, nowMs) {
        var key = selFl ? selFl.id + ":" + selFl.t : "";
        if (key === lastSelTrail && !selFl) return;
        lastSelTrail = key;
        if (!selFl) { trailGeo.setAttribute("position", new T.Float32BufferAttribute([], 3)); return; }
        // short backwards great-circle-ish trail along the reverse heading (~500 km)
        var pts = [], cur = deadReckon(selFl, nowMs), back = ((selFl.hdg + 180) % 360) * DEG;
        for (var k = 0; k < 40; k++) {
          var d = (k * 500) / 40 / R_KM;
          var la = cur.lat + (d * Math.cos(back)) / DEG, lo = cur.lon + (d * Math.sin(back)) / DEG / Math.max(Math.cos(cur.lat * DEG), 0.05);
          var v = latLonToVec(la, lo, 1.012); pts.push(v.x, v.y, v.z);
        }
        trailGeo.setAttribute("position", new T.Float32BufferAttribute(pts, 3));
      }

      var raf = 0, lastTrailAt = 0, lastOffsetAt = 0;
      function frame() {
        raf = requestAnimationFrame(frame);
        var nowMs = Date.now(), m = modeRef.current, lay = layersRef.current;
        var fst = Data.state.flights, sst = Data.state.sats;
        if (fst.rev !== lastFlightRev) { lastFlightRev = fst.rev; syncFlights(); }
        if (sst.rev !== lastSatRev) { lastSatRev = sst.rev; syncSats(); }
        if (nowMs - lastSunAt > 60000) { lastSunAt = nowMs; earthMat.uniforms.sunDir.value = sunDirection(new Date()); }

        // mode look
        var day = m === "DAY";
        renderer.toneMappingExposure = day ? 1.35 : m === "NVG" ? 1.1 : 0.95;
        ambient.intensity = day ? 0.85 : 0.35; sun.intensity = day ? 2.2 : 0.6;
        earthMat.uniforms.mode.value = day ? 0 : m === "NVG" ? 1 : 2;
        earthMat.uniforms.brightness.value = day ? 1.25 : 1;
        earthMat.uniforms.opacityNight.value = day ? 0.85 : 0.25;
        glowMat.uniforms.mode.value = m === "NVG" ? 1 : 0;
        var tint = m === "NVG" ? 0x4dff6a : m === "THERM" ? 0xffa040 : 0x9fe8ff;
        satMat.color.setHex(tint);

        satGroup.visible = lay.sats; flightGroup.visible = lay.flights; trailLine.visible = lay.flights;

        // flights: dead-reckon, orient, scale
        var camLen = camera.position.length();
        var k = Math.max(0.08, Math.min(1.0, 0.08 + (camLen - 1) * 0.5)); // aircraft markers shrink as you zoom in
        var selFl = null, selPos = null;
        for (var id in meshes) {
          var e = meshes[id], fl = e.fl, p = deadReckon(fl, nowMs);
          var v = latLonToVec(p.lat, p.lon, 1.012);
          e.mesh.position.copy(v);
          tmpUp.copy(v).normalize();
          tmpEast.set(0, 1, 0).cross(tmpUp).normalize();
          tmpNorth.copy(tmpUp).cross(tmpEast).normalize();
          var hr = fl.hdg * DEG;
          tmpDir.set(0, 0, 0).addScaledVector(tmpEast, Math.sin(hr)).addScaledVector(tmpNorth, Math.cos(hr)).normalize();
          tmpTarget.copy(v).add(tmpDir);
          e.mesh.up.copy(tmpUp); e.mesh.lookAt(tmpTarget);
          var isSel = id === selRef.current;
          e.mesh.material = isSel ? selMat : flMat;
          var s = isSel ? k * 2.2 : k;
          e.mesh.scale.set(s, s, s);
          if (isSel) { selFl = fl; selPos = { lat: p.lat, lon: p.lon, v: v }; }
        }
        if (nowMs - lastOffsetAt > 400) { lastOffsetAt = nowMs; applyViewOffset(); }
        if (nowMs - lastTrailAt > 1000) { lastTrailAt = nowMs; lastSelTrail = ""; updateTrail(selFl, nowMs); }

        // camera focus / follow
        var fk = focusRef.current;
        if (fk) {
          var tl = null, tdist = camLen;
          if (fk.kind === "point") { tl = fk; tdist = fk.dist; }
          else if (fk.kind === "flight") {
            var ee = meshes[fk.id]; if (ee) tl = deadReckon(ee.fl, nowMs);
          } else if (fk.kind === "iss" && sst.iss) { tl = sst.iss; tdist = Math.max(1.6, Math.min(camLen, 2.6)); }
          if (tl) {
            var dir = latLonToVec(tl.lat, tl.lon, 1).normalize(), cur = camera.position.clone().normalize();
            cur.lerp(dir, 0.1).normalize();
            var nd = camLen + (tdist - camLen) * 0.1;
            camera.position.copy(cur.multiplyScalar(nd));
            if (fk.kind === "point" && Math.abs(nd - tdist) < 0.01 && camera.position.clone().normalize().distanceTo(dir) < 0.004) focusRef.current = null;
          }
        }
        controls.update();

        // selected-aircraft reticle (screen space)
        var ret = reticleRef.current;
        if (ret) {
          if (selPos && lay.flights) {
            var pr = selPos.v.clone().project(camera);
            var facing = selPos.v.clone().normalize().dot(camera.position.clone().normalize()) > 1 / camera.position.length() - 0.02;
            if (facing && pr.z < 1) {
              ret.style.display = "block";
              ret.style.transform = "translate(" + ((pr.x * 0.5 + 0.5) * root.clientWidth) + "px," + ((-pr.y * 0.5 + 0.5) * root.clientHeight) + "px)";
            } else ret.style.display = "none";
          } else ret.style.display = "none";
        }

        // view readout ~4 Hz
        if (nowMs - lastViewAt > 400) {
          lastViewAt = nowMs;
          var ll = vecToLatLon(camera.position);
          setView(function (o) { return Math.abs(o.lat - ll.lat) < 0.01 && Math.abs(o.lon - ll.lon) < 0.01 && Math.abs(o.altKm - (camLen - 1) * R_KM) < 5 ? o : { lat: ll.lat, lon: ll.lon, altKm: (camLen - 1) * R_KM }; });
        }
        renderer.render(scene, camera);
      }
      frame();

      api.current = { camera: camera, controls: controls, renderer: renderer };
      return function () {
        cancelAnimationFrame(raf);
        if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
        controls.dispose(); renderer.dispose();
      };
    }, []);

    /* ---- render ---- */
    function badge(label, feed) {
      var st = feed.status;
      var txt = st === "live" ? "LIVE" : st === "demo" ? "DEMO DATA" : "LOADING";
      return h("span", { className: cx("ge-badge", "ge-badge-" + st), title: label + ": " + (feed.error || (st === "live" ? "live" : "loading")) },
        h("i", { className: "ge-dot" }), h("b", null, label), " ", txt);
    }
    var demoAny = flights.status === "demo" || sats.status === "demo";
    var over = sats.over;
    var iss = sats.iss;

    return h("div", { className: "ge-root", ref: rootRef },
      h("canvas", { className: "ge-canvas", ref: canvasRef, "aria-label": "3D globe" }),
      h("div", { className: "ge-vignette" }),
      h("div", { className: "ge-reticle", ref: reticleRef }, h("i", null), h("i", null), h("i", null), h("i", null)),

      h("div", { className: "ge-ui" },
        h("header", { className: "ge-top" },
          h("div", { className: "ge-tag" },
            h("b", { className: "ge-lime" }, "OPEN DATA"), h("span", { className: "ge-dim" }, "//"),
            h("span", null, "PUBLIC FEEDS"), h("span", { className: "ge-dim" }, "//"),
            h("b", { className: "ge-cyan" }, "DEMO UI")),
          h("div", { className: "ge-title" }, "GOD'S EYE VIEW // ORB-7")),

        h("div", { className: "ge-bar" },
          h("div", { className: "ge-stats", "aria-live": "polite" },
            h("span", null, h("i", { className: "ge-dot ge-lime-bg" }), "SATS ", h("b", null, fmtN(sats.total))),
            h("span", null, "OVER TW ", h("b", null, fmtN(over.length))),
            h("span", null, "FLIGHTS ", h("b", null, fmtN(flights.count)))),
          h("div", { className: "ge-badges" }, badge("FLT", flights), badge("SAT", sats)),
          h("div", { className: "ge-modes", role: "group", "aria-label": "Display mode" },
            ["DAY", "NVG", "THERM"].map(function (q) {
              return h("button", {
                key: q, type: "button", "data-mode": q, "data-active": mode === q, "aria-pressed": mode === q,
                className: cx("ge-btn", "ge-mode", mode === q && "is-on"),
                onClick: function () { setMode(q); },
              }, q);
            }))),

        h("div", { className: "ge-mid" },
          h("div", { className: "ge-tools" },
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.sats && "is-on"), "aria-pressed": layers.sats, "aria-label": "Toggle satellites", title: "Satellites", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { sats: !l.sats }); }); } }, h(ICON.Satellite, { size: 18 })),
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.flights && "is-on"), "aria-pressed": layers.flights, "aria-label": "Toggle flights", title: "Flights", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { flights: !l.flights }); }); } }, h(ICON.Plane, { size: 18 })),
            h("button", { type: "button", className: "ge-btn ge-tool", "aria-label": "Zoom in", onClick: function () { zoom(1); } }, h(ICON.Plus, { size: 18 })),
            h("button", { type: "button", className: "ge-btn ge-tool", "aria-label": "Zoom out", onClick: function () { zoom(-1); } }, h(ICON.Minus, { size: 18 }))),
          h("div", { className: "ge-view" }, "VIEW " + fmtLL(view.lat, view.lon) + " // ALT " + fmtN(view.altKm) + " km"),

          h("div", { className: "ge-dock" },
            h("section", { className: cx("ge-panel", hudOpen && "is-open") },
              h("button", { type: "button", className: "ge-panel-head", "aria-expanded": hudOpen, onClick: function () { var o = !hudOpen; setHudOpen(o); if (o && isNarrow()) setSatOpen(false); } },
                h("span", { className: "ge-lime ge-ph-title" }, "FLIGHT HUD"),
                h("span", { className: "ge-ph-sum" }, selected ? selected.callsign : "—"),
                h("span", { className: "ge-chev", "aria-hidden": true }, hudOpen ? "▾" : "▴")),
              hudOpen && h("div", { className: "ge-panel-body" },
                flights.status === "demo" && h("p", { className: "ge-note ge-warn" }, "DEMO DATA — OpenSky unreachable (" + (flights.error || "?") + "). Retrying…"),
                selected ? [
                  h("div", { className: "ge-pick", key: "pick" },
                    h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Previous aircraft", onClick: function () { cycle(-1); } }, "‹"),
                    h("div", { className: "ge-pick-mid" },
                      h("b", { className: "ge-cs" }, selected.callsign),
                      h("small", null, (selIdx + 1) + " / " + list.length + (selected.country ? " · " + selected.country : ""))),
                    h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Next aircraft", onClick: function () { cycle(1); } }, "›")),
                  h("dl", { className: "ge-grid", key: "grid" },
                    [["ALT", selected.altFt != null ? fmtN(selected.altFt) + " ft" : "--"],
                     ["SPD", selected.speedKt != null ? fmtN(selected.speedKt) + " kt" : "--"],
                     ["HDG", Math.round(selected.hdg) + "°"],
                     ["V/S", selected.vrFpm != null ? fmtN(selected.vrFpm) + " fpm" : "--"]].map(function (kv) {
                      return h("div", { key: kv[0] }, h("dt", null, kv[0]), h("dd", null, kv[1]));
                    })),
                  h("button", { key: "follow", type: "button", className: cx("ge-btn", "ge-wide", follow && "is-on"), "aria-pressed": follow, onClick: toggleFollow }, follow ? "● FOLLOWING" : "FOLLOW AIRCRAFT"),
                ] : h("p", { className: "ge-note" }, flights.status === "loading" ? "Contacting OpenSky…" : "NO AIRCRAFT IN RANGE"),
                h("p", { className: "ge-src" }, "OpenSky Network · updated " + ago(flights.updated) + " ago"))),

            h("section", { className: cx("ge-panel", satOpen && "is-open") },
              h("button", { type: "button", className: "ge-panel-head", "aria-expanded": satOpen, onClick: function () { var o = !satOpen; setSatOpen(o); if (o && isNarrow()) setHudOpen(false); } },
                h("span", { className: "ge-lime ge-ph-title" }, "SATELLITES"),
                h("span", { className: "ge-ph-sum" }, over.length + " OVER TAIWAN"),
                h("span", { className: "ge-chev", "aria-hidden": true }, satOpen ? "▾" : "▴")),
              satOpen && h("div", { className: "ge-panel-body" },
                sats.status === "demo" && h("p", { className: "ge-note ge-warn" }, "DEMO DATA — CelesTrak unreachable (" + (sats.error || "?") + ")."),
                iss && h("div", { className: "ge-iss" },
                  h("div", null, h("b", { className: "ge-red" }, iss.name), h("small", null, fmtLL(iss.lat, iss.lon) + " · " + fmtN(iss.altKm) + " km" + (iss.velKmS ? " · " + iss.velKmS.toFixed(2) + " km/s" : ""))),
                  h("button", { type: "button", className: "ge-btn ge-small", onClick: trackIss }, "TRACK ISS")),
                h("ul", { className: "ge-list" },
                  over.length ? over.slice(0, 40).map(function (o) {
                    return h("li", { key: o.i }, h("button", { type: "button", className: "ge-li", onClick: function () { setPlace(""); setFollow(false); flyTo(o.lat, o.lon, 1.7); } },
                      h("span", null, o.name), h("small", null, fmtN(o.altKm) + " km")));
                  }) : h("li", { className: "ge-note" }, "none overhead right now")),
                h("p", { className: "ge-src" }, "CelesTrak " + (sats.group || "") + " TLE · satellite.js SGP4" + (sats.tleAgeMin != null ? " · TLE age " + sats.tleAgeMin + "m" : ""))))),
        ),

        h("nav", { className: "ge-chips", "aria-label": "Locations" },
          ["t101", "tpe", "taiwan"].map(function (k) {
            return h("button", { key: k, type: "button", className: cx("ge-btn", "ge-chip", place === k && "is-on"), onClick: function () { goPlace(k); } }, PLACES[k].label);
          })),
        h("form", { className: "ge-search", onSubmit: runSearch, role: "search" },
          h("span", { className: "ge-search-ico", "aria-hidden": true }, h(ICON.Search, { size: 14 })),
          h("input", { type: "search", enterKeyHint: "search", autoComplete: "off", autoCapitalize: "characters", spellCheck: false, value: query, onChange: function (e) { setQuery(e.target.value); }, placeholder: "FLIGHT / SAT / LAT,LON", "aria-label": "Search flight, satellite or coordinates" }),
          h("button", { type: "submit", className: "ge-btn ge-go" }, "GO")),
        h("footer", { className: "ge-credit" },
          "DATA: ", h("a", { href: "https://opensky-network.org", target: "_blank", rel: "noopener noreferrer" }, "OpenSky Network"), " · ",
          h("a", { href: "https://celestrak.org", target: "_blank", rel: "noopener noreferrer" }, "CelesTrak"), " · ",
          h("a", { href: "https://github.com/shashwatak/satellite-js", target: "_blank", rel: "noopener noreferrer" }, "satellite.js"),
          demoAny && h("b", { className: "ge-amber" }, " · DEMO DATA ACTIVE"))),
      toast && h("div", { className: "ge-toast", role: "status" }, toast));
  }

  createRoot(document.getElementById("root")).render(h(React.StrictMode, null, h(App)));
})();

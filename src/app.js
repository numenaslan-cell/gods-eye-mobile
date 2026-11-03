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
    BackSide: UM, SRGB: IK, ACES: fG, Repeat: gG, Texture: $E,
  };
  var TEX = window.GODS_EYE_TEXTURES || {};
  var DAY_TEX = TEX.day, NIGHT_TEX = TEX.night; // NASA Blue Marble / Black Marble (assets/textures/*.jpg), inlined by build.mjs
  var ICON = { Plane: SK, Satellite: PK, Plus: kK, Minus: TK, Search: uK, Radio: xK };

  var Data = window.GodsEyeData;
  var R_KM = 6371;
  var DEG = Math.PI / 180;


  /* ---- earth shading shared by the base globe and the hi-res tile patches ---- */
  var SHADE_GLSL = [
    "vec3 shadeEarth(vec3 dayRaw, vec3 nightRaw, vec3 nrm, vec3 sunDir, float brightness, float mode){",
    "  float sun = dot(normalize(nrm), normalize(sunDir));", // world-space normal vs world-space sun
    "  float dayMix = smoothstep(-0.25, 0.45, sun);",
    "  vec3 dayC = dayRaw;",
    "  float dl = dot(dayC, vec3(0.299,0.587,0.114));",
    "  dayC = (dayC + vec3(0.025,0.07,0.17) * (1.0 - smoothstep(0.0, 0.22, dl))) * brightness;", // lift the near-black deep-ocean pixels
    "  vec3 nightC = nightRaw;",
    "  vec3 color = mix(nightC * 0.9, dayC, dayMix);",
    "  if(mode > 0.5 && mode < 1.5){ float lum = dot(color, vec3(0.299,0.587,0.114)); color = vec3(lum*0.2, lum*1.1, lum*0.3); }",
    "  if(mode > 1.5){ float lum = dot(dayC, vec3(0.3,0.59,0.11)); color = vec3(1.0 - lum) * vec3(1.0,0.6,0.2); color += nightC * 0.5; }",
    "  return color;",
    "}",
  ].join("\n");

  /* ---- LOD: NASA GIBS WMTS tile overlay ---------------------------------------------------------------
     When the camera is close, the visible part of the globe is covered with 512px tiles from NASA GIBS
     (EPSG:4326, "500m" matrix set, z4..z7 = 18deg..2.25deg per tile). Day = Blue Marble Shaded Relief +
     Bathymetry, night = VIIRS City Lights 2012. Each tile is a small SphereGeometry patch drawn just above
     the base globe with the same shading (day/night terminator, NVG, THERM). Tile count is capped, textures
     live in an LRU cache and are disposed on eviction. */
  var GIBS_BASE = "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/";
  var GIBS_DAY = "BlueMarble_ShadedRelief_Bathymetry", GIBS_NIGHT = "VIIRS_CityLights_2012";
  var TILE_MIN_Z = 4, TILE_MAX_Z = 7, TILE_MAX_VISIBLE = 18, TILE_MAX_TEX = 40, TILE_MAX_INFLIGHT = 6;
  var TILE_MAX_DIST = 2.1; // camera distance (globe radii) beyond which the 4096px base texture is enough

  // Pure helper (unit-testable): which tiles cover the view, and at which zoom level.
  // lat0/lon0: view centre in degrees; d: camera distance in globe radii; fovV/aspect: camera; px: canvas width in device px;
  // shiftFrac: view-offset (HUD shift) as a fraction of the canvas height.
  function groundHalfAngle(d, alpha) { // central angle (rad) from sub-camera point to where a ray at `alpha` off-axis hits the sphere
    var x = d * Math.sin(alpha);
    if (x >= 1) return Math.PI / 2;
    return Math.asin(x) - alpha;
  }
  function planTiles(lat0, lon0, d, fovVdeg, aspect, px, shiftFrac, maxTiles) {
    if (d > TILE_MAX_DIST) return null;
    var tv = Math.tan(fovVdeg * DEG / 2), th = tv * aspect;
    var hh = groundHalfAngle(d, Math.atan(tv * (1 + 2 * Math.abs(shiftFrac || 0)))) / DEG * 1.1;
    var hw = groundHalfAngle(d, Math.atan(th)) / DEG * 1.1;
    if (hw < 0.01) hw = 0.01;
    var dpp = (2 * hw) / Math.max(1, px); // degrees per device pixel across the view
    var z = Math.ceil(Math.log2(0.5625 / dpp)); z = Math.max(TILE_MIN_Z, Math.min(TILE_MAX_Z, z));
    if (Math.abs(lat0) > 75) return null;
    for (; z >= TILE_MIN_Z; z--) {
      var sz = 288 / Math.pow(2, z), nc = Math.round(360 / sz), nr = Math.round(180 / sz), out = [];
      var cosL = Math.max(0.25, Math.cos(Math.min(80, Math.abs(lat0) + hh) * DEG));
      var lonHalf = Math.min(180, hw / cosL);
      var r0 = Math.max(0, Math.floor((90 - Math.min(90, lat0 + hh)) / sz)), r1 = Math.min(nr - 1, Math.floor((90 - Math.max(-90, lat0 - hh)) / sz));
      var c0 = Math.floor((lon0 - lonHalf + 180) / sz), c1 = Math.floor((lon0 + lonHalf + 180) / sz);
      for (var r = r0; r <= r1; r++) for (var c = c0; c <= c1; c++) {
        var cc = ((c % nc) + nc) % nc;
        out.push({ z: z, r: r, c: cc, lat1: 90 - r * sz, lat0: 90 - (r + 1) * sz, lon0: -180 + c * sz, lon1: -180 + (c + 1) * sz,
          dist: Math.abs(90 - (r + 0.5) * sz - lat0) + Math.abs(-180 + (c + 0.5) * sz - lon0) * cosL });
      }
      if (out.length <= maxTiles) { out.sort(function (a, b) { return a.dist - b.dist; }); return out; }
    }
    return null;
  }

  function createTileLayer(opts) {
    var scene = opts.scene, renderer = opts.renderer, camera = opts.camera, uniforms = opts.uniforms;
    var group = new T.Group(); scene.add(group);
    var cache = {}, order = [];   // key -> {tex|null, state, t}; order = LRU of keys with textures
    var live = {};                // tile key -> {mesh, mat, geo}
    var inflight = 0, queue = [], stats = { visible: 0, z: 0, loaded: 0, requested: 0 };
    var maxAniso = Math.min(8, (renderer.capabilities && renderer.capabilities.getMaxAnisotropy && renderer.capabilities.getMaxAnisotropy()) || 4);
    var lastPlanAt = 0, lastSig = "", sigWanted = {};

    function url(layer, t) { return GIBS_BASE + layer + "/default/500m/" + t.z + "/" + t.r + "/" + t.c + ".jpeg"; }
    function ckey(layer, t) { return layer + "/" + t.z + "/" + t.r + "/" + t.c; }
    function touch(k) { var i = order.indexOf(k); if (i >= 0) order.splice(i, 1); order.push(k); }
    function evict() {
      while (order.length > TILE_MAX_TEX) {
        var k = order.shift(), e = cache[k];
        if (e && e.tex) e.tex.dispose();
        delete cache[k];
      }
    }
    function pump() {
      while (inflight < TILE_MAX_INFLIGHT && queue.length) {
        var job = queue.shift(), e = cache[job.key];
        if (!e || e.state !== "queued" || !sigWanted[job.key]) { if (e && e.state === "queued") delete cache[job.key]; continue; }
        start(job.key, job.src);
      }
    }
    function start(key, src) {
      var e = cache[key]; e.state = "loading"; inflight++;
      var img = new Image(); img.crossOrigin = "anonymous"; e.img = img;
      function done(ok) {
        inflight--; e.img = null;
        if (ok) {
          var tex = new T.Texture(img); tex.colorSpace = T.SRGB; tex.anisotropy = maxAniso; tex.needsUpdate = true;
          e.tex = tex; e.state = "ready"; touch(key); stats.loaded++; evict();
        } else { e.state = "failed"; e.t = Date.now(); }
        pump();
      }
      img.onload = function () { (img.decode ? img.decode().catch(function () {}) : Promise.resolve()).then(function () { done(true); }); };
      img.onerror = function () { done(false); };
      img.src = src;
    }
    function want(layer, t) {
      var key = ckey(layer, t); sigWanted[key] = 1;
      var e = cache[key];
      if (e) { if (e.state === "failed" && Date.now() - e.t > 60000) { delete cache[key]; e = null; } else { if (e.tex) touch(key); return e; } }
      stats.requested++;
      cache[key] = e = { state: "queued", tex: null };
      queue.push({ key: key, src: url(layer, t) });
      return e;
    }
    function makeMesh(t) {
      var segs = Math.max(6, Math.min(32, Math.round((t.lat1 - t.lat0) / 0.35)));
      var geo = new T.SphereGeometry(1.0006, segs, segs, (t.lon0 + 180) * DEG, (t.lon1 - t.lon0) * DEG, (90 - t.lat1) * DEG, (t.lat1 - t.lat0) * DEG);
      var mat = new T.ShaderMaterial({
        transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
        uniforms: {
          dayMap: uniforms.dayMap, nightMap: uniforms.nightMap, sunDir: uniforms.sunDir, brightness: uniforms.brightness, mode: uniforms.mode,
          dayTile: { value: null }, nightTile: { value: null }, hasDay: { value: 0 }, hasNight: { value: 0 }, fade: { value: 0 },
        },
        vertexShader: "varying vec2 vUv; varying vec2 vG; varying vec3 vNormal; void main(){ vUv = uv; vNormal = normalize(mat3(modelMatrix) * normal);" +
          " float ph = atan(position.z, -position.x); if(ph < 0.0) ph += 6.2831853; vG = vec2(ph / 6.2831853, asin(clamp(position.y / length(position), -1.0, 1.0)) / 3.14159265 + 0.5);" +
          " gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: [
          "uniform sampler2D dayMap; uniform sampler2D nightMap; uniform sampler2D dayTile; uniform sampler2D nightTile;",
          "uniform vec3 sunDir; uniform float brightness; uniform float mode; uniform float hasDay; uniform float hasNight; uniform float fade;",
          "varying vec2 vUv; varying vec2 vG; varying vec3 vNormal;",
          SHADE_GLSL,
          "void main(){",
          "  vec3 dayRaw = hasDay > 0.5 ? texture2D(dayTile, vUv).rgb : texture2D(dayMap, vG).rgb;",
          "  vec3 nightRaw = hasNight > 0.5 ? texture2D(nightTile, vUv).rgb : texture2D(nightMap, vG).rgb;",
          "  gl_FragColor = vec4(shadeEarth(dayRaw, nightRaw, vNormal, sunDir, brightness, mode), fade);",
          "}",
        ].join("\n"),
      });
      var mesh = new T.Mesh(geo, mat); mesh.frustumCulled = false; mesh.renderOrder = 1; mesh.visible = false;
      group.add(mesh);
      return { mesh: mesh, mat: mat, geo: geo, t: t, born: 0 };
    }
    function dropTile(k) { var o = live[k]; group.remove(o.mesh); o.geo.dispose(); o.mat.dispose(); delete live[k]; }

    // call every frame; cheap early-out unless the camera moved.
    function update(now, mode, sunDirVec, w, hgt, shiftPx) {
      now = performance.now(); // monotonic: fades/throttle must not depend on the wall clock
      var dist = camera.position.length(), cam = camera.position;
      var sig = Math.round(dist * 200) + "|" + Math.round(cam.x * 800) + "|" + Math.round(cam.y * 800) + "|" + Math.round(cam.z * 800) + "|" + mode;
      if (sig !== lastSig && now - lastPlanAt > 220) {
        lastPlanAt = now; lastSig = sig; sigWanted = {};
        var lat0 = Math.asin(Math.max(-1, Math.min(1, cam.y / dist))) / DEG, ph = Math.atan2(cam.z, -cam.x); if (ph < 0) ph += 2 * Math.PI;
        var lon0 = ph / DEG - 180;
        var px = w * renderer.getPixelRatio();
        var plan = planTiles(lat0, lon0, dist, camera.fov, camera.aspect, px, shiftPx / Math.max(1, hgt), TILE_MAX_VISIBLE);
        var keep = {};
        stats.visible = plan ? plan.length : 0; stats.z = plan && plan.length ? plan[0].z : 0;
        if (plan) plan.forEach(function (t) {
          var k = t.z + "/" + t.r + "/" + t.c; keep[k] = 1;
          var o = live[k] || (live[k] = makeMesh(t));
          var cl = (t.lat0 + t.lat1) / 2, cn = (t.lon0 + t.lon1) / 2, v = latLonToVec(cl, cn, 1);
          var sd = v.x * sunDirVec.x + v.y * sunDirVec.y + v.z * sunDirVec.z, any = mode !== "DAY";
          o.dayE = (sd > -0.5 || any) ? want(GIBS_DAY, t) : null;
          o.nightE = (sd < 0.55 || any) ? want(GIBS_NIGHT, t) : null;
        });
        Object.keys(live).forEach(function (k) { if (!keep[k]) dropTile(k); });
        // cancel queued work that is no longer wanted
        queue = queue.filter(function (j) { return sigWanted[j.key]; });
        pump();
      }
      Object.keys(live).forEach(function (k) {
        var o = live[k], u = o.mat.uniforms, de = o.dayE, ne = o.nightE;
        var hd = de && de.tex ? 1 : 0, hn = ne && ne.tex ? 1 : 0;
        if (u.hasDay.value !== hd) { u.hasDay.value = hd; u.dayTile.value = hd ? de.tex : null; }
        if (u.hasNight.value !== hn) { u.hasNight.value = hn; u.nightTile.value = hn ? ne.tex : null; }
        var needBoth = (de && !hd && de.state !== "failed") || (ne && !hn && ne.state !== "failed"); // wait for the textures this tile needs before showing it (no flash of base map)
        if (!needBoth && (hd || hn)) { if (!o.born) o.born = now; u.fade.value = Math.min(1, (now - o.born) / 350); o.mesh.visible = true; }
        else if (!o.born) o.mesh.visible = false;
      });
    }
    function dispose() {
      Object.keys(live).forEach(dropTile);
      Object.keys(cache).forEach(function (k) { var e = cache[k]; if (e.img) e.img.src = ""; if (e.tex) e.tex.dispose(); });
      cache = {}; order = []; queue = []; scene.remove(group);
    }
    return { update: update, dispose: dispose, stats: stats, group: group };
  }

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

  /* ---- small inline icons (lucide has no ship/bell/crosshair in this bundle) ---- */
  function svgIcon(path, size) {
    return h("svg", { width: size || 18, height: size || 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, path);
  }
  var ShipIcon = function (p) { return svgIcon([h("path", { key: 1, d: "M3 17l2 3h14l2-3-9-3-9 3z" }), h("path", { key: 2, d: "M12 14V4l5 6" }), h("path", { key: 3, d: "M12 4L7 10" })], p.size); };

  var QuakeIcon = function (p) { return svgIcon([h("path", { key: 1, d: "M2 12h4l3-8 4 16 3-8h6" })], p.size); };
  function quakeHex(m) { return m >= 6 ? 0xff3b30 : m >= 5 ? 0xff6a00 : m >= 4 ? 0xffb000 : 0xffe14d; }
  function quakeCss(m) { return "#" + quakeHex(m).toString(16).padStart(6, "0"); }
  var NEWS = [
    ["🚢 航港局船位不再依賴本機　", "由台灣區域的 Cloudflare Worker 每 5 分鐘抓取交通部航港局 MPB，不需要任何本機常駐。"],
    ["🪖 國防部每日通報 + 公務船　", "解放軍機艦每日架次、艦艇與「公務船」數量與地圖連結，顯示在 PLA 分頁。"],
    ["🇯🇵 日本統合幕僚監部　", "收錄日方公布的中國艦艇舷號與艦名、機種與海峽動向（PDL 1.0）。"],
    ["⚓ 海警（CCG）規則升級　", "新增 413875 等識別規則，並由舷號解讀所屬海警局（隸屬局）。"],
    ["🛳️ 「政府船舶」標示　", "對無法確認類型的 55 類目標，改用較保守的「政府船舶」標籤，不再硬判為軍艦或海警。"],
    ["✈️ 解放軍機 ICAO 位址區段　", "加入 0x7A1000–0x7A4FFF 位址段先驗，並補上運油機、運輸機等機型代碼。"],
    ["🌏 地震多來源即時合併　", "中央氣象署（含小規模地震）+ USGS + EMSC + GFZ，每 2 分鐘更新並去重，以氣象署為準；每筆標示來源，推播不重複。"],
  ];
  function srcLabel(q) { return (q.srcs && q.srcs.length ? q.srcs : [q.src || "USGS"]).join("·"); }
  function srcShort(q) { var a = q.srcs && q.srcs.length ? q.srcs : [q.src || "USGS"]; return a[0] + (a.length > 1 ? " +" + (a.length - 1) : ""); }
  function srcMags(q) { var all = [{ src: q.src || "USGS", mag: q.mag }].concat(q.others || []); return all.length > 1 ? all.map(function (o) { return o.src + " M" + Number(o.mag).toFixed(1); }).join(" · ") : ""; }
  function quakeAgo(t) { var m = Math.max(0, Math.round((Date.now() - t) / 60000)); return m < 60 ? m + " min ago" : m < 2880 ? Math.round(m / 60) + " h ago" : Math.round(m / 1440) + " d ago"; }

  /* ---- ship marker colours by class (distinct from the white aircraft cones) ---- */
  var SHIP_COLORS = { cargo: 0x2ee6ff, tanker: 0xff9f1c, pax: 0xd18bff, fish: 0x6dff8a, other: 0x9aa7b0, ccg: 0xff3b30, plan: 0xff0055, gov: 0xffb000 };
  var SHIP_CSS = { cargo: "#2ee6ff", tanker: "#ff9f1c", pax: "#d18bff", fish: "#6dff8a", other: "#9aa7b0", ccg: "#ff3b30", plan: "#ff0055", gov: "#ffb000" };

  /* ---- marker silhouettes (unit size, nose / bow = +z). Aircraft = plane with swept wings; ships = pointed hull with a deckhouse.
     Convex pieces are shared by the 3-D geometry (vector triangles -> razor sharp at any DPR) and the legend SVGs. ---- */
  var PLANE_PIECES = [
    { fill: 1, pts: [[0, 0.5], [0.06, 0.38], [0.06, -0.3], [0, -0.46], [-0.06, -0.3], [-0.06, 0.38]] },          // fuselage
    { fill: 1, pts: [[0.05, 0.12], [0.5, -0.16], [0.5, -0.25], [0.05, -0.07]] },                                  // right wing (swept back)
    { fill: 1, pts: [[-0.05, 0.12], [-0.5, -0.16], [-0.5, -0.25], [-0.05, -0.07]] },                              // left wing
    { fill: 1, pts: [[0.04, -0.32], [0.2, -0.46], [0.2, -0.51], [0.04, -0.42]] },                                 // right tailplane
    { fill: 1, pts: [[-0.04, -0.32], [-0.2, -0.46], [-0.2, -0.51], [-0.04, -0.42]] },                             // left tailplane
  ];
  var HULL_PIECES = [
    { fill: 1, pts: [[0, 0.5], [0.2, 0.14], [0.2, -0.5], [-0.2, -0.5], [-0.2, 0.14]] },                           // hull
    { fill: 0.42, pts: [[-0.11, 0.02], [0.11, 0.02], [0.11, -0.3], [-0.11, -0.3]], lift: 1 },                      // deckhouse (darker)
  ];
  function shapeGeometry(pieces, outline) { // flat triangle fans, both windings (visible from either side); optional dark halo behind
    var pos = [], col = [];
    function fan(pts, k, y, c) {
      for (var i = 1; i < pts.length - 1; i++) [0, i, i + 1].forEach(function (j) { pos.push(pts[j][0] * k, y, pts[j][1] * k); col.push(c, c, c); });
      for (var i2 = 1; i2 < pts.length - 1; i2++) [i2 + 1, i2, 0].forEach(function (j) { pos.push(pts[j][0] * k, y, pts[j][1] * k); col.push(c, c, c); });
    }
    if (outline) pieces.forEach(function (pc) { if (!pc.lift) fan(pc.pts, outline, -0.03, 0.04); });
    pieces.forEach(function (pc) { fan(pc.pts, 1, pc.lift ? 0.03 : 0, pc.fill); });
    var g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(pos, 3)); g.setAttribute("color", new T.Float32BufferAttribute(col, 3));
    return g;
  }
  function ShapeIcon(p) { // SVG legend icon of the same silhouette (x right, bow up)
    var sz = p.size || 14, pieces = p.kind === "plane" ? PLANE_PIECES : HULL_PIECES;
    return h("svg", { width: sz, height: sz, viewBox: "-0.62 -0.62 1.24 1.24", "aria-hidden": true, style: { flex: "none" } },
      pieces.map(function (pc, i) { return h("polygon", { key: i, points: pc.pts.map(function (q) { return q[0] + "," + (-q[1]); }).join(" "), fill: p.color, fillOpacity: pc.fill < 1 ? 0.45 : 1, stroke: "#02060a", strokeWidth: 0.07, strokeLinejoin: "round", paintOrder: "stroke" }); }));
  }
  var WARN_TAGS = { ccg: "⚠️ 疑似海警", plan: "⚠️ 疑似共軍", air: "⚠️ 疑似共機" };
  var CCG_WHY = { name: "the AIS name matches a China Coast Guard hull pattern", block: "the MMSI is in 413875xxx, a range where CCG ships have been seen transmitting (observed pattern, not an official allocation)", known: "this MMSI was earlier seen broadcasting a CCG name" };
  var DIR_EN = { N: "north", S: "south", E: "east", W: "west", NE: "north-east", NW: "north-west", SE: "south-east", SW: "south-west" };
  function ccgNote(sh) {
    var t = "⚠️ 疑似海警 — heuristic: " + (CCG_WHY[sh.ccgBy] || "guess from AIS name / MMSI") + ".";
    if (sh.hull && sh.bureau) t += " Hull no. " + sh.hull + (sh.bureauKind === "direct" ? " → directly-subordinate CCG bureau, " : " → home bureau (by the published numbering scheme): ") + sh.bureau + ".";
    return t + " Not an official identification.";
  }
  // Japan Joint Staff release -> { head, sub }  (class + strait + direction + hull numbers; all derived from the published title / PDF)
  function jsLine(ev) {
    var heads = [], bits = [];
    (ev.groups || []).forEach(function (g) {
      var what = ev.kind === "air" ? (g.types || []).join(" + ") : (g.classEn || g.classes || []).map(function (c) { return String(c).replace(/ (destroyer|frigate|replenishment ship|fast combat support ship|intelligence ship|amphibious ship|corvette)$/, ""); }).join(" + ");
      var where = (g.whereEn && g.whereEn[0]) || (g.where && g.where[0]) || "";
      var dir = g.dirs && g.dirs[0] ? " → " + (DIR_EN[g.dirs[0]] || g.dirs[0]) : "";
      var n = (g.notes || []).length ? " · " + g.notes.join(" ") : "";
      heads.push((what || "—") + (where ? " · " + where : "") + dir + n);
    });
    if (!heads.length) heads.push(ev.kind === "air" ? "PLA aircraft (details in release)" : "PLA Navy ships (details in release)");
    if (ev.ships && ev.ships.length) bits.push("hull " + ev.ships.map(function (x) { return x.hull + (x.ship ? " " + x.ship : ""); }).join(", "));
    if (ev.aircraftDetail && ev.aircraftDetail.length && ev.kind === "air") bits.push(ev.aircraftDetail.join(", "));
    if (ev.uav) bits.push("UAV"); if (ev.scramble) bits.push("緊急発進 (JASDF scramble)");
    if (ev.place) bits.push(ev.place);
    return { head: heads.join(" ; "), sub: ev.date + (ev.kind === "air" ? " · ✈ air" : " · ⚓ navy") + (bits.length ? " · " + bits.join(" · ") : "") };
  }

  /* ---- local-time helpers ---- */
  function hm(d) { return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }); }
  function dayHm(d) {
    var today = new Date(), same = d.toDateString() === today.toDateString();
    return (same ? "" : d.toLocaleDateString([], { weekday: "short" }) + " ") + hm(d);
  }
  function fmtDur(sec) { return Math.floor(sec / 60) + "m" + String(sec % 60).padStart(2, "0") + "s"; }
  function inMin(ms) { var m = Math.round(ms / 60000); return m < 60 ? m + " min" : Math.floor(m / 60) + "h" + String(m % 60).padStart(2, "0"); }

  /* ---- satellite passes (SGP4 via satellite.js, see assets/passes.js) ---- */
  var DEFAULT_OBSERVER = { lat: 25.033, lon: 121.565, src: "default", label: "TAIPEI (DEFAULT)" };
  var WATCH = ["ISS (ZARYA)", "CSS (TIANHE)", "HST", "AJISAI (EGS)", "TERRA", "AQUA", "ENVISAT", "ALOS (DAICHI)"]; // ISS, Tiangong, Hubble + big bright-list satellites
  var ALWAYS_LIST = { "ISS (ZARYA)": 1, "CSS (TIANHE)": 1 };
  function shortName(n) { return n === "CSS (TIANHE)" ? "CSS / TIANGONG" : n === "ISS (ZARYA)" ? "ISS" : n.replace(/ \(.*\)$/, ""); }
  var recsByName = {};

  function loadObserver() {
    try { var o = JSON.parse(localStorage.getItem("gods-eye:observer")); if (o && isFinite(o.lat) && isFinite(o.lon)) return o; } catch (e) { /* none */ }
    return DEFAULT_OBSERVER;
  }
  function computePasses(obs) {
    var P = window.GodsEyePasses;
    if (!P || typeof satellite === "undefined") return Promise.reject(new Error("satellite.js not loaded"));
    return Promise.all(["stations", "visual"].map(function (g) { return Data.loadTleEntries(g).catch(function () { return null; }); })).then(function (groups) {
      var found = {}, age = null;
      groups.forEach(function (g) {
        if (!g) return; age = Math.max(age == null ? 0 : age, g.ageMin);
        g.entries.forEach(function (e) { if (WATCH.indexOf(e[0]) >= 0 && !found[e[0]]) found[e[0]] = e; });
      });
      var names = Object.keys(found);
      if (!names.length) throw new Error("CelesTrak TLE unavailable (network / CORS / rate limit)");
      var now = new Date(), o = { lat: obs.lat, lon: obs.lon, heightKm: 0.02 }, all = [];
      names.forEach(function (nm) {
        var rec; try { rec = satellite.twoline2satrec(found[nm][1], found[nm][2]); } catch (e) { return; }
        if (!rec || rec.error) return; recsByName[nm] = rec;
        P.findPasses(rec, o, now, 72, { minEl: 10 }).forEach(function (p) {
          if (!ALWAYS_LIST[nm] && !p.visible) return; // only list bright-list satellites when they are actually likely visible
          var la = P.lookAngles(rec, o, p.peak), why = "";
          if (!p.visible && la) why = !la.sunlit ? "IN SHADOW" : la.sunEl > -6 ? "SKY BRIGHT" : "TOO LOW";
          all.push(Object.assign({ name: nm, key: nm + "@" + p.start.getTime(), why: why }, p));
        });
      });
      all.sort(function (a, b) { return a.start - b.start; });
      return { list: all.slice(0, 60), ageMin: age, computedAt: Date.now(), sats: names.length };
    });
  }

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
    var _layers = React.useState({ sats: true, flights: true, ships: true, quakes: true }), layers = _layers[0], setLayers = _layers[1];
    var _tab = React.useState(function () { return window.innerHeight >= 760 ? "hud" : null; }) /* short screens start collapsed */, tab = _tab[0], setTab = _tab[1];
    var _ss = React.useState(null), selShipId = _ss[0], setSelShipId = _ss[1];
    var _sf = React.useState(false), sFollow = _sf[0], setSFollow = _sf[1];
    var _sq = React.useState(null), selQuakeId = _sq[0], setSelQuakeId = _sq[1];
    var _inv = React.useState(0), inView = _inv[0], setInView = _inv[1];
    var _obs = React.useState(loadObserver), observer = _obs[0], setObserver = _obs[1];
    var _ps = React.useState({ status: "loading", list: [], error: "", ageMin: null }), passes = _ps[0], setPasses = _ps[1];
    var _sp = React.useState(null), selPassKey = _sp[0], setSelPassKey = _sp[1];
    var _look = React.useState(null), look = _look[0], setLook = _look[1];
    var _eo = React.useState(false), editObs = _eo[0], setEditObs = _eo[1];
    var _li = React.useState(""), manual = _li[0], setManual = _li[1];
    var _nt = React.useState(function () { try { return localStorage.getItem("gods-eye:notify") === "1"; } catch (e) { return false; } }), notifyOn = _nt[0], setNotifyOn = _nt[1];
    var _ph = React.useState(null), heading = _ph[0], setHeading = _ph[1];
    var _pi = React.useState(null), pushInfo = _pi[0], setPushInfo = _pi[1];
    var _pp = React.useState({ quake: true, ccg: false, iss: true }), pushPrefs = _pp[0], setPushPrefs = _pp[1];
    var _pm = React.useState(""), pushMsg = _pm[0], setPushMsg = _pm[1];
    var _pb = React.useState(false), pushBusy = _pb[0], setPushBusy = _pb[1];
    var _q = React.useState(""), query = _q[0], setQuery = _q[1];
    var _place = React.useState("taiwan"), place = _place[0], setPlace = _place[1];
    var _toast = React.useState(""), toast = _toast[0], setToast = _toast[1];
    var _view = React.useState({ lat: 23.7, lon: 121, altKm: 0 }), view = _view[0], setView = _view[1];

    var modeRef = React.useRef(mode); modeRef.current = mode;
    var selRef = React.useRef(selId); selRef.current = selId;
    var followRef = React.useRef(follow); followRef.current = follow;
    var layersRef = React.useRef(layers); layersRef.current = layers;
    var focusRef = React.useRef(null);
    var selShipRef = React.useRef(selShipId); selShipRef.current = selShipId;
    var selQuakeRef = React.useRef(selQuakeId); selQuakeRef.current = selQuakeId;
    var observerRef = React.useRef(observer); observerRef.current = observer;
    var passMarkRef = React.useRef(null);
    var inViewRef = React.useRef(0);
    var actionsRef = React.useRef({});
    var compassStopRef = React.useRef(null);
    var reticle2Ref = React.useRef(null);

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

    var flights = Data.state.flights, sats = Data.state.sats, ships = Data.state.ships, quakes = Data.state.quakes;
    var list = flights.list;
    var selIdx = Math.max(0, list.findIndex(function (x) { return x.id === selId; }));
    var selected = list.length ? list[selIdx] : null;
    React.useEffect(function () { // keep a valid selection when the list changes
      if (!list.length) { if (selId !== null) setSelId(null); return; }
      if (!list.some(function (x) { return x.id === selId; })) setSelId(list[0].id);
    }, [flights.rev]);

    var sList = ships.list;
    var selShip = selShipId ? sList.find(function (x) { return x.id === selShipId; }) || null : null;
    var ccgList = sList.filter(function (x) { return x.ccg; }), planList = sList.filter(function (x) { return x.plan; });
    var plaAir = list.filter(function (x) { return x.pla; });
    var selPass = selPassKey ? passes.list.find(function (x) { return x.key === selPassKey; }) || null : null;
    var pushIssActive = !!(pushInfo && pushInfo.subscribed && pushInfo.prefs && pushInfo.prefs.iss);

    function showToast(msg) { setToast(msg); clearTimeout(showToast.t); showToast.t = setTimeout(function () { setToast(""); }, 2600); }

    function flyTo(lat, lon, dist, persistent) {
      focusRef.current = { kind: "point", lat: lat, lon: lon, dist: dist, persistent: !!persistent };
    }
    function isNarrow() { var r = rootRef.current; return !r || r.clientWidth < 700; }
    function goPlace(key) {
      var p = PLACES[key]; setPlace(key); setFollow(false); setSFollow(false);
      flyTo(p.lat, p.lon, isNarrow() ? p.narrow : p.wide);
    }
    function selectFlight(id, doFollow) {
      setSelId(id); setTab("hud"); setSFollow(false);
      if (doFollow) { setFollow(true); focusRef.current = { kind: "flight", id: id }; }
    }
    function selectShip(id, doFollow) {
      setSelShipId(id); setTab("ships"); setFollow(false);
      if (doFollow) { setSFollow(true); focusRef.current = { kind: "ship", id: id }; }
    }
    function selectQuake(id, fly) {
      setSelQuakeId(id); setTab("quakes"); setFollow(false); setSFollow(false);
      var q = quakes.list.find(function (x) { return x.id === id; });
      if (q && fly) { setPlace(""); flyTo(q.lat, q.lon, isNarrow() ? 1.45 : 1.3, true); }
    }
    function cycleShip(dir, onlyCcg) {
      var pool = onlyCcg === "plan" ? planList : onlyCcg ? ccgList : sList; if (!pool.length) return;
      var i = pool.findIndex(function (x) { return x.id === selShipId; });
      var n = i < 0 ? (dir > 0 ? 0 : pool.length - 1) : (i + dir + pool.length) % pool.length;
      setSelShipId(pool[n].id);
      if (sFollow || onlyCcg) { setSFollow(true); setFollow(false); focusRef.current = { kind: "ship", id: pool[n].id }; }
    }
    function toggleShipFollow() {
      if (!selShip) return;
      if (sFollow) { setSFollow(false); focusRef.current = null; }
      else { setSFollow(true); setFollow(false); focusRef.current = { kind: "ship", id: selShip.id }; }
    }
    actionsRef.current = { selectFlight: selectFlight, selectShip: selectShip, selectQuake: selectQuake };
    function cyclePla() {
      if (!plaAir.length) return;
      var i = plaAir.findIndex(function (x) { return x.id === selId; });
      var n = plaAir[(i + 1) % plaAir.length];
      setSelId(n.id); setSFollow(false); setFollow(true); focusRef.current = { kind: "flight", id: n.id };
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
      else { setFollow(true); setSFollow(false); focusRef.current = { kind: "flight", id: selected.id }; }
    }
    function trackIss() {
      var iss = sats.iss; if (!iss) { showToast("ISS NOT AVAILABLE"); return; }
      setFollow(false); setSFollow(false); focusRef.current = { kind: "iss" }; setPlace("");
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
      var sh = /^\d{9}$/.test(up) ? sList.find(function (x) { return x.mmsi === up; }) :
        (sList.find(function (x) { return x.hasName && x.name.replace(/\s+/g, "") === up; }) ||
         (up.length >= 3 ? sList.find(function (x) { return x.hasName && x.name.replace(/\s+/g, "").indexOf(up) >= 0; }) : null));
      if (sh) { selectShip(sh.id, true); setPlace(""); showToast("TRACKING " + sh.name); return; }
      var si = sats.names.findIndex(function (nm) { return nm.toUpperCase().indexOf(q.toUpperCase()) >= 0; });
      if (si >= 0 && sats.pos[si * 3 + 2] > 0) {
        setPlace(""); setFollow(false);
        flyTo(sats.pos[si * 3], sats.pos[si * 3 + 1], 1.7);
        showToast(sats.names[si]); return;
      }
      showToast("NO MATCH: " + q);
    }

    /* ---- pass predictions: recompute when the observer changes, then every 30 min ---- */
    function recomputePasses() {
      setPasses(function (o) { return Object.assign({}, o, { status: "loading", error: "" }); });
      computePasses(observerRef.current).then(function (r) {
        setPasses({ status: "ready", list: r.list, error: "", ageMin: r.ageMin, computedAt: r.computedAt, sats: r.sats });
      }).catch(function (err) {
        setPasses({ status: "error", list: [], error: (err && err.message) || String(err), ageMin: null });
      });
    }
    React.useEffect(function () {
      var t = setTimeout(recomputePasses, 400); // let the first paint happen before the (cheap) SGP4 scan
      var iv = setInterval(recomputePasses, 30 * 60 * 1000);
      return function () { clearTimeout(t); clearInterval(iv); };
    }, [observer.lat, observer.lon]);

    /* ---- "look here": live az / el of the selected pass satellite, 1 Hz ---- */
    React.useEffect(function () {
      passMarkRef.current = null;
      if (!selPass) { setLook(null); return; }
      var P = window.GodsEyePasses, rec = recsByName[selPass.name]; if (!P || !rec) { setLook(null); return; }
      function tick() {
        var now = new Date(), o = { lat: observerRef.current.lat, lon: observerRef.current.lon, heightKm: 0.02 }, la = P.lookAngles(rec, o, now);
        if (!la) return;
        var pv = satellite.propagate(rec, now), gd = pv && pv.position ? satellite.eciToGeodetic(pv.position, satellite.gstime(now)) : null;
        if (gd) passMarkRef.current = { lat: satellite.degreesLat(gd.latitude), lon: satellite.degreesLong(gd.longitude), altKm: gd.height };
        setLook({ az: la.az, el: la.el, rangeKm: la.rangeKm, sunlit: la.sunlit, sunEl: la.sunEl });
      }
      tick(); var iv = setInterval(tick, 1000);
      return function () { clearInterval(iv); passMarkRef.current = null; };
    }, [selPassKey, passes.computedAt, observer.lat, observer.lon]);

    /* ---- optional compass: rotate the dial relative to where the phone points ---- */
    var compassOn = heading !== null;
    function toggleCompass() {
      if (compassOn) { setHeading(null); return; }
      function start() {
        var absEv = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
        var h = function (e) {
          var v = typeof e.webkitCompassHeading === "number" ? e.webkitCompassHeading : (e.absolute || absEv === "deviceorientationabsolute") && e.alpha != null ? (360 - e.alpha) % 360 : null;
          if (v != null) setHeading(v);
        };
        window.addEventListener(absEv, h, true); compassStopRef.current = function () { window.removeEventListener(absEv, h, true); };
        setHeading(0);
      }
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function")
        DeviceOrientationEvent.requestPermission().then(function (r) { if (r === "granted") start(); else showToast("COMPASS DENIED"); }).catch(function () { showToast("COMPASS UNAVAILABLE"); });
      else if (typeof DeviceOrientationEvent !== "undefined") start(); else showToast("NO COMPASS SENSOR");
    }
    React.useEffect(function () { if (heading === null && compassStopRef.current) { compassStopRef.current(); compassStopRef.current = null; } }, [heading === null]);

    function notifyNow(title, body, tag) {
      try {
        if (navigator.serviceWorker && navigator.serviceWorker.ready) navigator.serviceWorker.ready.then(function (reg) { reg.showNotification(title, { body: body, tag: tag, icon: "icons/icon-192.png", badge: "icons/icon-192.png" }); }).catch(function () { new Notification(title, { body: body, tag: tag }); });
        else new Notification(title, { body: body, tag: tag });
      } catch (e) { /* unsupported */ }
    }
    function setNotify(on) {
      if (!on) { setNotifyOn(false); try { localStorage.setItem("gods-eye:notify", "0"); } catch (e) { /* ignore */ } return; }
      if (!("Notification" in window)) { showToast("NOTIFICATIONS NOT SUPPORTED HERE"); return; }
      Notification.requestPermission().then(function (perm) {
        if (perm === "granted") { setNotifyOn(true); try { localStorage.setItem("gods-eye:notify", "1"); } catch (e) { /* ignore */ } showToast("NOTIFY ON · KEEP THIS PAGE/APP OPEN"); }
        else showToast("NOTIFICATIONS " + perm.toUpperCase());
      });
    }
    var notifiedRef = React.useRef({});
    React.useEffect(function () { // page-open reminders ~5 min before a pass (skipped when Web Push already covers ISS)
      if (!notifyOn || pushIssActive) return;
      function check() {
        var now = Date.now();
        passes.list.forEach(function (p) {
          var d = p.start.getTime() - now;
          if (d > 0 && d <= 5.5 * 60000 && !notifiedRef.current[p.key] && "Notification" in window && Notification.permission === "granted") {
            notifiedRef.current[p.key] = 1;
            notifyNow(shortName(p.name) + " in " + inMin(d), hm(p.start) + " · " + p.startDir + " → " + p.endDir + " · max " + Math.round(p.maxEl) + "°" + (p.visible ? " · likely visible" : ""), "pass-" + p.key);
          }
        });
      }
      check(); var iv = setInterval(check, 15000);
      return function () { clearInterval(iv); };
    }, [notifyOn, pushIssActive, passes.computedAt]);

    /* ---- Web Push state ---- */
    function refreshPush() {
      if (!window.GodsEyePush) return;
      window.GodsEyePush.info().then(function (i) { setPushInfo(i); setPushPrefs(i.prefs); });
    }
    React.useEffect(refreshPush, []);
    function pushAction(kind) {
      var Push = window.GodsEyePush; if (!Push || pushBusy) return;
      setPushBusy(true); setPushMsg("");
      var loc = { lat: Math.round(observer.lat * 100) / 100, lon: Math.round(observer.lon * 100) / 100 };
      var job = kind === "off" ? Push.unsubscribe().then(function () { return "ALERTS OFF"; })
        : kind === "test" ? Push.test().then(function (r) { return r.ok ? "TEST SENT — CHECK YOUR NOTIFICATIONS" : "TEST FAILED: " + (r.result || "?"); })
        : Push.subscribe(pushPrefs, loc).then(function () { return "ALERTS ON ✓"; });
      job.then(function (m) { setPushMsg(m); }).catch(function (e) { setPushMsg("ERROR: " + ((e && e.message) || e)); }).then(function () { setPushBusy(false); refreshPush(); });
    }
    function togglePref(k) {
      var next = Object.assign({}, pushPrefs); next[k] = !next[k]; setPushPrefs(next);
      if (window.GodsEyePush) window.GodsEyePush.savePrefs(next);
      if (pushInfo && pushInfo.subscribed && window.GodsEyePush) {
        window.GodsEyePush.update(next, { lat: Math.round(observer.lat * 100) / 100, lon: Math.round(observer.lon * 100) / 100 }).then(function () { setPushMsg("PREFERENCES SAVED"); refreshPush(); }).catch(function (e) { setPushMsg("ERROR: " + ((e && e.message) || e)); });
      }
    }

    /* ---- observer location ---- */
    function saveObserver(o) {
      setObserver(o); setSelPassKey(null); notifiedRef.current = {};
      try { localStorage.setItem("gods-eye:observer", JSON.stringify(o)); } catch (e) { /* ignore */ }
    }
    function useMyLocation() {
      if (!navigator.geolocation) { showToast("GEOLOCATION NOT AVAILABLE"); return; }
      showToast("LOCATING…");
      navigator.geolocation.getCurrentPosition(function (pos) {
        saveObserver({ lat: pos.coords.latitude, lon: pos.coords.longitude, src: "gps", label: "MY LOCATION" }); showToast("LOCATION SET");
      }, function (err) { showToast("LOCATION " + (err && err.code === 1 ? "DENIED — USING " : "FAILED — USING ") + observerRef.current.label); }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
    }
    function submitManual(e) {
      e.preventDefault();
      var m = manual.trim().match(/^(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)$/);
      if (!m || Math.abs(+m[1]) > 90 || Math.abs(+m[2]) > 180) { showToast("ENTER LAT,LON  e.g. 25.03,121.56"); return; }
      saveObserver({ lat: +m[1], lon: +m[2], src: "manual", label: "MANUAL" }); setEditObs(false); showToast("LOCATION SET");
    }
    function resetObserver() { saveObserver(DEFAULT_OBSERVER); setEditObs(false); }

    /* ---- deep links: ?ship=<MMSI> (push alert) and ?pass=iss ---- */
    var deepRef = React.useRef({ ship: new URLSearchParams(location.search).get("ship"), pass: new URLSearchParams(location.search).get("pass") });
    React.useEffect(function () {
      var d = deepRef.current;
      if (d.pass) { setTab("passes"); d.pass = null; }
      if (d.ship) {
        var sh = sList.find(function (x) { return x.mmsi === d.ship; });
        if (sh) { selectShip(sh.id, true); d.ship = null; }
        else if (ships.status !== "loading") d.ship = null;
      }
    }, [ships.rev]);

    /* ---- three.js scene (created once) ---- */
    React.useEffect(function () {
      var canvas = canvasRef.current, root = rootRef.current;
      if (!canvas) return;
      var scene = new T.Scene();
      scene.background = new T.Color(0x02060a);
      var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
      var dprCap = 3, maxDpr = function () { return Math.min(window.devicePixelRatio || 1, dprCap); };
      renderer.setPixelRatio(maxDpr());
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
        if (fk) { if (fk.kind !== "point" || fk.persistent) { setFollow(false); setSFollow(false); } focusRef.current = null; }
      });

      var ambient = new T.AmbientLight(0xffffff, 0.85); scene.add(ambient);
      var sun = new T.DirectionalLight(0xffffff, 2.2); sun.position.set(5, 2, 3); scene.add(sun);

      var loader = new T.TextureLoader();
      var dayMap = loader.load(DAY_TEX), nightMap = loader.load(NIGHT_TEX);
      var aniso = Math.min(16, (renderer.capabilities && renderer.capabilities.getMaxAnisotropy && renderer.capabilities.getMaxAnisotropy()) || 8);
      [dayMap, nightMap].forEach(function (t) { t.colorSpace = T.SRGB; t.anisotropy = aniso; t.generateMipmaps = true; t.wrapS = t.wrapT = T.Repeat; });
      var earthMat = new T.ShaderMaterial({
        uniforms: {
          dayMap: { value: dayMap }, nightMap: { value: nightMap }, sunDir: { value: sunDirection(new Date()) },
          brightness: { value: 1.25 }, mode: { value: 0 }, opacityNight: { value: 0.85 },
        },
        vertexShader: "varying vec2 vUv; varying vec3 vNormal; void main(){ vUv = uv; vNormal = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: [
          "uniform sampler2D dayMap; uniform sampler2D nightMap; uniform vec3 sunDir; uniform float brightness; uniform float mode;",
          "varying vec2 vUv; varying vec3 vNormal;",
          SHADE_GLSL,
          "void main(){",
          "  gl_FragColor = vec4(shadeEarth(texture2D(dayMap, vUv).rgb, texture2D(nightMap, vUv).rgb, vNormal, sunDir, brightness, mode), 1.0);",
          "}",
        ].join("\n"),
      });
      var earth = new T.Mesh(new T.SphereGeometry(1, 128, 128), earthMat); scene.add(earth);
      var tileLayer = createTileLayer({ scene: scene, renderer: renderer, camera: camera, uniforms: earthMat.uniforms });

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
      var planeGeo = shapeGeometry(PLANE_PIECES, 1.2);
      var flMat = new T.MeshBasicMaterial({ color: 0xffffff, vertexColors: true, transparent: true, opacity: 0.96, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
      var selMat = new T.MeshBasicMaterial({ color: 0xffe600, vertexColors: true });
      var flPlaMat = new T.MeshBasicMaterial({ color: 0xff3b30, vertexColors: true, transparent: true, opacity: 1 }); // suspected PLA aircraft (heuristic)
      var meshes = {}; // id -> {mesh, fl}
      var trailGeo = new T.BufferGeometry();
      var trailLine = new T.Line(trailGeo, new T.LineBasicMaterial({ color: 0xffe63b, transparent: true, opacity: 0.9 }));
      scene.add(trailLine);

      // ships: flat hull-shaped markers (bow = +Z), coloured by class — visually distinct from the white aircraft cones
      var shipGroup = new T.Group(); scene.add(shipGroup);
      var hullGeo = shapeGeometry(HULL_PIECES, 1.22);
      var shipMats = {}; Object.keys(SHIP_COLORS).forEach(function (k) { shipMats[k] = new T.MeshBasicMaterial({ color: SHIP_COLORS[k], vertexColors: true, transparent: true, opacity: k === "ccg" || k === "plan" ? 1 : 0.95, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }); });
      var shipSelMat = new T.MeshBasicMaterial({ color: 0xffffff, vertexColors: true });
      var shipMeshes = {}; // id -> {mesh, sh}
      // earthquakes: pulsing rings sized by magnitude + a solid core (rings/discs built by hand: the vendor bundle has no Ring/Circle geometry)
      var quakeGroup = new T.Group(); scene.add(quakeGroup);
      function discGeo(r0, r1, seg) {
        var g = new T.BufferGeometry(), a = [], i;
        function tri(p, q, w) { [p, q, w].forEach(function (v) { a.push(v[0], v[1], v[2]); }); [w, q, p].forEach(function (v) { a.push(v[0], v[1], v[2]); }); }
        for (i = 0; i < seg; i++) {
          var t0 = i / seg * 2 * Math.PI, t1 = (i + 1) / seg * 2 * Math.PI;
          var A = [Math.cos(t0) * r1, Math.sin(t0) * r1, 0], B = [Math.cos(t1) * r1, Math.sin(t1) * r1, 0];
          if (r0 > 0) { var C = [Math.cos(t0) * r0, Math.sin(t0) * r0, 0], D = [Math.cos(t1) * r0, Math.sin(t1) * r0, 0]; tri(A, B, C); tri(B, D, C); }
          else tri(A, B, [0, 0, 0]);
        }
        g.setAttribute("position", new T.Float32BufferAttribute(a, 3)); return g;
      }
      var qRingGeo = discGeo(0.8, 1, 40), qDotGeo = discGeo(0, 0.3, 20), qRingGeo2 = discGeo(0.9, 1, 40);
      var quakeMeshes = {}; // id -> {ring, ring2, dot, q}
      var lastQuakeRev = -1;
      var obsPts = new T.Points(new T.BufferGeometry(), new T.PointsMaterial({ color: 0xff2fd0, size: 9, sizeAttenuation: false })); obsPts.frustumCulled = false; scene.add(obsPts);
      var passPts = new T.Points(new T.BufferGeometry(), new T.PointsMaterial({ color: 0xff2fd0, size: 12, sizeAttenuation: false })); passPts.frustumCulled = false; scene.add(passPts);
      var lastObsKey = "", lastShipRev = -1, lastCountAt = 0;

      var lastFlightRev = -1, lastSatRev = -1, lastSelTrail = "", lastSunAt = 0, lastViewAt = 0;
      var tmpUp = new T.Vector3(), tmpDir = new T.Vector3(), tmpNorth = new T.Vector3(), tmpEast = new T.Vector3(), tmpTarget = new T.Vector3();

      function resize() {
        var w = root.clientWidth || window.innerWidth, hgt = root.clientHeight || window.innerHeight;
        var aspect = w / hgt;
        camera.aspect = aspect;
        camera.fov = aspect < 1 ? Math.min(62, (2 * Math.atan(Math.tan(14 * DEG) / aspect)) / DEG) : 28; // keep horizontal FOV on portrait phones
        applyViewOffset();
        if (renderer.getPixelRatio() !== maxDpr()) renderer.setPixelRatio(maxDpr());
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

      var warnFlightIds = [], warnShipIds = [];
      function syncFlights() {
        var st = Data.state.flights, seen = {};
        warnFlightIds = st.list.filter(function (x) { return x.pla; }).map(function (x) { return x.id; });
        st.list.forEach(function (fl) {
          seen[fl.id] = 1;
          var e = meshes[fl.id];
          if (!e) { var m = new T.Mesh(planeGeo, fl.pla ? flPlaMat : flMat); flightGroup.add(m); e = meshes[fl.id] = { mesh: m, fl: fl }; }
          e.fl = fl; if (e.mesh.material !== selMat) e.mesh.material = fl.pla ? flPlaMat : flMat;
        });
        Object.keys(meshes).forEach(function (id) { if (!seen[id]) { flightGroup.remove(meshes[id].mesh); delete meshes[id]; } });
      }

      function syncShips() {
        var st = Data.state.ships, seen = {};
        warnShipIds = st.list.filter(function (x) { return x.ccg || x.plan; }).map(function (x) { return x.id; });
        st.list.forEach(function (sh) {
          seen[sh.id] = 1;
          var e = shipMeshes[sh.id];
          if (!e) { var m = new T.Mesh(hullGeo, shipMats[sh.cls]); shipGroup.add(m); e = shipMeshes[sh.id] = { mesh: m, sh: sh }; }
          e.sh = sh; e.cls = sh.cls;
        });
        Object.keys(shipMeshes).forEach(function (id) { if (!seen[id]) { shipGroup.remove(shipMeshes[id].mesh); delete shipMeshes[id]; } });
      }

      function syncQuakes() {
        var st = Data.state.quakes, seen = {};
        st.list.forEach(function (q, i) {
          seen[q.id] = 1;
          var e = quakeMeshes[q.id];
          if (!e) {
            var col = quakeHex(q.mag);
            function mat(o) { return new T.MeshBasicMaterial({ color: col, transparent: true, opacity: o, depthWrite: false }); }
            var ring = new T.Mesh(qRingGeo, mat(0.9)), ring2 = new T.Mesh(qRingGeo2, mat(0.5)), dot = new T.Mesh(qDotGeo, mat(0.95));
            var v = latLonToVec(q.lat, q.lon, 1.004), out = v.clone().multiplyScalar(2);
            [ring, ring2, dot].forEach(function (m) { m.position.copy(v); m.lookAt(out); quakeGroup.add(m); });
            e = quakeMeshes[q.id] = { ring: ring, ring2: ring2, dot: dot, q: q, seed: i * 0.37, col: col };
          }
          e.q = q;
        });
        Object.keys(quakeMeshes).forEach(function (id) {
          if (seen[id]) return; var e = quakeMeshes[id];
          [e.ring, e.ring2, e.dot].forEach(function (m) { quakeGroup.remove(m); m.material.dispose(); }); delete quakeMeshes[id];
        });
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
      // always-visible warning tags (HTML overlay above the canvas): pulsing ring + "⚠️ 疑似海警 / 疑似共軍 / 疑似共機" label
      var warnLayer = document.createElement("div"); warnLayer.className = "ge-warnlayer"; warnLayer.setAttribute("aria-hidden", "true"); canvas.parentNode.insertBefore(warnLayer, canvas.nextSibling); // above the globe, below the HUD panels
      var warnEls = {}, tmpWv = new T.Vector3();
      function warnTag(key, kind, name) {
        var el = warnEls[key];
        if (!el) {
          el = warnEls[key] = document.createElement("div"); el.className = "ge-wtag ge-wtag-" + kind;
          el.innerHTML = '<i class="ge-wring"></i><i class="ge-wring ge-wring2"></i><span class="ge-wlab"></span><small class="ge-wname"></small>';
          el.children[2].textContent = WARN_TAGS[kind]; el.children[3].textContent = name || ""; warnLayer.appendChild(el);
        }
        return el;
      }
      function updateWarnTags(lay, camLen) {
        var used = {}, W = root.clientWidth, H = root.clientHeight, camN2 = camera.position.clone().normalize(), cands = [];
        function add(kind, id, mesh, name) {
          tmpWv.copy(mesh.position); var up = tmpWv.clone().normalize();
          if (up.dot(camN2) <= 1 / camLen - 0.02) return;
          var pr = tmpWv.project(camera); if (pr.z >= 1 || Math.abs(pr.x) > 1.08 || Math.abs(pr.y) > 1.08) return;
          cands.push({ key: kind + ":" + id, kind: kind, name: name, x: (pr.x * 0.5 + 0.5) * W, y: (-pr.y * 0.5 + 0.5) * H, d: pr.x * pr.x + pr.y * pr.y });
        }
        if (lay.ships) warnShipIds.forEach(function (id) { var e = shipMeshes[id]; if (e) add(e.sh.plan ? "plan" : "ccg", id, e.mesh, e.sh.name); });
        if (lay.flights) warnFlightIds.forEach(function (id) { var e = meshes[id]; if (e) add("air", id, e.mesh, e.fl.callsign); });
        var PRI = { plan: 0, ccg: 1, air: 2 };
        cands.sort(function (a, b) { return PRI[a.kind] - PRI[b.kind] || a.d - b.d; });
        var placed = [], showName = camLen < 1.8;
        cands.slice(0, 16).forEach(function (c, i) {
          var el = warnTag(c.key, c.kind, c.name); used[c.key] = 1;
          // stack overlapping labels upwards (each label ≈ 100 x 20 px, drawn 24 px above its ring); hide the label (keep the ring) if no free slot
          var lift = -1, w = 108, hgt = 29;
          for (var k2 = 0; k2 < 6 && lift < 0; k2++) {
            var bx0 = c.x - w / 2, by0 = c.y - 24 - hgt - k2 * (hgt + 2), ok = true;
            for (var q = 0; q < placed.length; q++) { var pb = placed[q]; if (bx0 < pb[2] && bx0 + w > pb[0] && by0 < pb[3] && by0 + hgt > pb[1]) { ok = false; break; } }
            if (ok) { lift = k2; placed.push([bx0, by0, bx0 + w, by0 + hgt]); }
          }
          el.style.transform = "translate(" + c.x.toFixed(1) + "px," + c.y.toFixed(1) + "px)";
          el.style.zIndex = 100 - i; if (el.style.display === "none") el.style.display = "";
          var lab = el.children[2], nm = el.children[3];
          lab.style.display = lift < 0 ? "none" : ""; lab.style.marginBottom = lift > 0 ? (lift * (hgt + 2)) + "px" : "0";
          nm.style.display = showName && lift === 0 ? "" : "none";
        });
        Object.keys(warnEls).forEach(function (k) { if (!used[k]) { warnEls[k].style.display = "none"; if (!warnEls[k].__t) warnEls[k].__t = Date.now(); else if (Date.now() - warnEls[k].__t > 30000) { warnLayer.removeChild(warnEls[k]); delete warnEls[k]; } } else warnEls[k].__t = 0; });
      }

      function frame() {
        raf = requestAnimationFrame(frame);
        var nowMs = Date.now(), m = modeRef.current, lay = layersRef.current;
        var fst = Data.state.flights, sst = Data.state.sats;
        if (fst.rev !== lastFlightRev) { lastFlightRev = fst.rev; syncFlights(); }
        if (sst.rev !== lastSatRev) { lastSatRev = sst.rev; syncSats(); }
        if (Data.state.ships.rev !== lastShipRev) { lastShipRev = Data.state.ships.rev; syncShips(); }
        if (Data.state.quakes.rev !== lastQuakeRev) { lastQuakeRev = Data.state.quakes.rev; syncQuakes(); }
        var oo = observerRef.current, oKey = oo.lat + "," + oo.lon;
        if (oKey !== lastObsKey) { lastObsKey = oKey; var ov = latLonToVec(oo.lat, oo.lon, 1.004); obsPts.geometry.dispose(); obsPts.geometry = new T.BufferGeometry(); obsPts.geometry.setAttribute("position", new T.Float32BufferAttribute([ov.x, ov.y, ov.z], 3)); }
        var pm = passMarkRef.current;
        if (pm && nowMs - (frame.lastPm || 0) > 500) { frame.lastPm = nowMs; var pv0 = latLonToVec(pm.lat, pm.lon, 1 + Math.min(pm.altKm / R_KM, 1.2)), pg = new T.BufferGeometry(); pg.setAttribute("position", new T.Float32BufferAttribute([pv0.x, pv0.y, pv0.z], 3)); passPts.geometry.dispose(); passPts.geometry = pg; }
        else if (!pm && frame.lastPm) { frame.lastPm = 0; passPts.geometry.dispose(); passPts.geometry = new T.BufferGeometry(); }
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

        satGroup.visible = lay.sats; flightGroup.visible = lay.flights; trailLine.visible = lay.flights; shipGroup.visible = lay.ships; quakeGroup.visible = lay.quakes;

        // flights: dead-reckon, orient, scale
        var camLen = camera.position.length();
        // markers have a constant on-screen size (css px), so they stay crisp and readable at every zoom and shrink relative to the map when you zoom in
        var upx = 2 * Math.tan(camera.fov * DEG / 2) * Math.max(0.02, camLen - 1) / Math.max(200, root.clientHeight || 800);
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
          e.mesh.material = isSel ? selMat : e.fl.pla ? flPlaMat : flMat;
          var s = upx * (isSel ? 28 : e.fl.pla ? 24 : 13 + 4 * Math.max(0, Math.min(1, (camLen - 1.15) / 1.85)));
          e.mesh.scale.set(s, s, s); e.mesh.renderOrder = e.fl.pla || isSel ? 6 : 3;
          if (isSel) { selFl = fl; selPos = { lat: p.lat, lon: p.lon, v: v }; }
        }
        // quakes: size by magnitude, two staggered expanding pulses; recent events (<24 h) pulse faster and brighter
        if (lay.quakes) {
          var kq = Math.max(0.3, Math.min(1.0, 0.25 + (camLen - 1) * 0.5)), selQ = selQuakeRef.current;
          for (var qid in quakeMeshes) {
            var qe = quakeMeshes[qid], qq = qe.q, base = (0.006 + 0.0055 * Math.max(0, qq.mag - 3)) * kq, isQ = qid === selQ;
            var fresh = nowMs - qq.t < 86400000, per = fresh ? 1800 : 3200;
            var ph1 = ((nowMs / per) + qe.seed) % 1, ph2 = (ph1 + 0.5) % 1;
            var s1 = base * (isQ ? 1.5 : 1) * (0.7 + ph1 * 1.5), s2 = base * (isQ ? 1.5 : 1) * (0.7 + ph2 * 1.5), sd = base * (isQ ? 1.5 : 1) * (fresh ? 0.9 : 0.7);
            qe.ring.scale.set(s1, s1, s1); qe.ring2.scale.set(s2, s2, s2); qe.dot.scale.set(sd, sd, sd);
            var dim = fresh ? 1 : 0.55;
            qe.ring.material.opacity = (1 - ph1) * 0.95 * dim; qe.ring2.material.opacity = (1 - ph2) * 0.95 * dim; qe.dot.material.opacity = 0.95 * dim;
            var want = isQ ? 0xffffff : qe.col;
            if (qe.dot.material.color.getHex() !== want) { qe.ring.material.color.setHex(want); qe.ring2.material.color.setHex(want); qe.dot.material.color.setHex(want); }
          }
        }
        // ships: dead-reckon, orient, scale; remember the on-screen ones
        var selSh = null, selShPos = null, camN = camera.position.clone().normalize(), onScreen = 0, doCount = nowMs - lastCountAt > 500;
        var zt = Math.max(0, Math.min(1, (camLen - 1.15) / 1.85)), shipPx = 6 + 3 * zt; // ships get smaller when zoomed in (declutter)
        var thin = camLen < 1.4; // close zoom: hide stationary fishing / unclassified boats so the island is not covered
        if (lay.ships) for (var sid in shipMeshes) {
          var se = shipMeshes[sid], sh = se.sh, sp = deadReckon(sh, nowMs), sv = latLonToVec(sp.lat, sp.lon, 1.008);
          se.mesh.position.copy(sv);
          tmpUp.copy(sv).normalize(); tmpEast.set(0, 1, 0).cross(tmpUp).normalize(); tmpNorth.copy(tmpUp).cross(tmpEast).normalize();
          var shr = sh.hdg * DEG;
          tmpDir.set(0, 0, 0).addScaledVector(tmpEast, Math.sin(shr)).addScaledVector(tmpNorth, Math.cos(shr)).normalize();
          tmpTarget.copy(sv).add(tmpDir); se.mesh.up.copy(tmpUp); se.mesh.lookAt(tmpTarget);
          var isSelS = sid === selShipRef.current;
          se.mesh.material = isSelS ? shipSelMat : shipMats[se.cls];
          var warnS = sh.ccg || sh.plan, ss2 = upx * (isSelS ? 20 : warnS ? 20 : shipPx); se.mesh.scale.set(ss2, ss2, ss2); se.mesh.renderOrder = warnS || isSelS ? 5 : 2;
          se.mesh.visible = !(thin && !warnS && !isSelS && sh.vMs === 0 && (sh.cls === "fish" || sh.cls === "other"));
          if (isSelS) { selSh = sh; selShPos = { lat: sp.lat, lon: sp.lon, v: sv }; }
          if (doCount && tmpUp.dot(camN) > 1 / camLen - 0.02) { var q = sv.clone().project(camera); if (q.z < 1 && Math.abs(q.x) <= 1 && Math.abs(q.y) <= 1) onScreen++; }
        }
        if (doCount) { lastCountAt = nowMs; if (onScreen !== inViewRef.current) { inViewRef.current = onScreen; setInView(onScreen); } }
        if (nowMs - lastOffsetAt > 400) { lastOffsetAt = nowMs; applyViewOffset(); }
        if (nowMs - lastTrailAt > 1000) { lastTrailAt = nowMs; lastSelTrail = ""; updateTrail(selFl, nowMs); }

        // camera focus / follow
        var fk = focusRef.current;
        if (fk) {
          var tl = null, tdist = camLen;
          if (fk.kind === "point") { tl = fk; tdist = fk.dist; }
          else if (fk.kind === "flight") {
            var ee = meshes[fk.id]; if (ee) tl = deadReckon(ee.fl, nowMs);
          } else if (fk.kind === "ship") {
            var se2 = shipMeshes[fk.id]; if (se2) { tl = deadReckon(se2.sh, nowMs); tdist = Math.max(1.2, Math.min(camLen, 1.7)); }
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

        updateWarnTags(lay, camLen);

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

        var ret2 = reticle2Ref.current;
        if (ret2) {
          if (selShPos && lay.ships) {
            var pr2 = selShPos.v.clone().project(camera);
            var facing2 = selShPos.v.clone().normalize().dot(camera.position.clone().normalize()) > 1 / camera.position.length() - 0.02;
            if (facing2 && pr2.z < 1) { ret2.style.display = "block"; ret2.style.transform = "translate(" + ((pr2.x * 0.5 + 0.5) * root.clientWidth) + "px," + ((-pr2.y * 0.5 + 0.5) * root.clientHeight) + "px)"; }
            else ret2.style.display = "none";
          } else ret2.style.display = "none";
        }

        // view readout ~4 Hz
        if (nowMs - lastViewAt > 400) {
          lastViewAt = nowMs;
          var ll = vecToLatLon(camera.position);
          setView(function (o) { return Math.abs(o.lat - ll.lat) < 0.01 && Math.abs(o.lon - ll.lon) < 0.01 && Math.abs(o.altKm - (camLen - 1) * R_KM) < 5 ? o : { lat: ll.lat, lon: ll.lon, altKm: (camLen - 1) * R_KM }; });
        }
        tileLayer.update(nowMs, m, earthMat.uniforms.sunDir.value, root.clientWidth || window.innerWidth, root.clientHeight || window.innerHeight, lastShift || 0);
        // adaptive resolution: if the GPU can't hold ~25 fps at the current pixel ratio, step it down (3 -> 2 -> 1.5)
        var ft = performance.now(); if (frame.ft) { var dt = ft - frame.ft; if (dt < 250) { frame.avg = (frame.avg || 33) * 0.95 + dt * 0.05; frame.n = (frame.n || 0) + 1; } }
        frame.ft = ft;
        if (frame.n > 90 && frame.avg > 42 && dprCap > 1.5 && !document.hidden) { dprCap = dprCap > 2 ? 2 : 1.5; frame.n = 0; frame.avg = 33; resize(); }
        renderer.render(scene, camera);
      }
      frame();

      // tap / click an aircraft or ship to select it (ignores drags)
      var downAt = null;
      function onDown(e) { downAt = { x: e.clientX, y: e.clientY, t: Date.now() }; }
      function onUp(e) {
        if (!downAt) return; var d = downAt; downAt = null;
        if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8 || Date.now() - d.t > 500) return;
        var rect = canvas.getBoundingClientRect(), mx = e.clientX - rect.left, my = e.clientY - rect.top, best = null, bestD = 28;
        var camN2 = camera.position.clone().normalize(), cl = camera.position.length(), nowMs2 = Date.now(), lay2 = layersRef.current;
        function consider(kind, id, lat, lon, r) {
          var v = latLonToVec(lat, lon, r); if (v.clone().normalize().dot(camN2) <= 1 / cl - 0.02) return;
          var q = v.project(camera); if (q.z >= 1) return;
          var dd = Math.hypot((q.x * 0.5 + 0.5) * rect.width - mx, (-q.y * 0.5 + 0.5) * rect.height - my);
          if (dd < bestD) { bestD = dd; best = { kind: kind, id: id }; }
        }
        if (lay2.flights) for (var fid in meshes) { var pf = deadReckon(meshes[fid].fl, nowMs2); consider("flight", fid, pf.lat, pf.lon, 1.012); }
        if (lay2.ships) for (var sid2 in shipMeshes) { var ps = deadReckon(shipMeshes[sid2].sh, nowMs2); consider("ship", sid2, ps.lat, ps.lon, 1.008); }
        if (lay2.quakes) for (var qid2 in quakeMeshes) { var qm = quakeMeshes[qid2].q; consider("quake", qid2, qm.lat, qm.lon, 1.004); }
        if (best) { if (best.kind === "quake") actionsRef.current.selectQuake(best.id, false); else if (best.kind === "ship") actionsRef.current.selectShip(best.id, false); else actionsRef.current.selectFlight(best.id, false); }
      }
      canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointerup", onUp);

      api.current = { camera: camera, controls: controls, renderer: renderer, tiles: tileLayer };
      return function () {
        cancelAnimationFrame(raf); if (warnLayer.parentNode) warnLayer.parentNode.removeChild(warnLayer);
        canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointerup", onUp);
        if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
        controls.dispose(); tileLayer.dispose(); renderer.dispose();
      };
    }, []);

    /* ---- render ---- */
    function badge(label, feed) {
      var st = feed.status;
      var txt = st === "live" ? "LIVE" : st === "demo" ? "DEMO DATA" : "LOADING";
      return h("span", { className: cx("ge-badge", "ge-badge-" + st), title: label + ": " + (feed.error || (st === "live" ? "live" : "loading")) },
        h("i", { className: "ge-dot" }), h("b", null, label), " ", txt);
    }
    var over = sats.over;
    var iss = sats.iss;
    /* ---- dock panels (one open at a time; tab strip at the bottom, next to the thumb) ---- */
    function row(k, v) { return h("div", { key: k }, h("dt", null, k), h("dd", null, v)); }
    function toggleBtn(label, on, onClick, key) {
      return h("button", { key: key || label, type: "button", className: cx("ge-btn", "ge-wide", on && "is-on"), "aria-pressed": !!on, onClick: onClick }, label);
    }

    function flightsBody() {
      return [
        flights.status === "demo" && h("p", { key: "w", className: "ge-note ge-warn" }, "DEMO DATA — flight feeds unreachable (" + (flights.error || "?") + "). Retrying…"),
        plaAir.length ? h("div", { key: "plaw", className: "ge-iss ge-plawarn" },
          h("div", null, h("b", null, "⚠️ 疑似共機 · " + plaAir.length), h("small", null, "SUSPECTED PLA AIRCRAFT ON ADS-B (heuristic)")),
          h("button", { type: "button", className: "ge-btn ge-small ge-ccg", onClick: cyclePla }, "⚠️ 疑似共機 " + plaAir.length)) : null,
        selected ? [
          h("div", { className: "ge-pick", key: "pick" },
            h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Previous aircraft", onClick: function () { cycle(-1); } }, "‹"),
            h("div", { className: "ge-pick-mid" },
              h("b", { className: "ge-cs", style: selected.pla ? { color: "#ff3b30" } : null }, (selected.pla ? "⚠️ " : "") + selected.callsign),
              h("small", null, (selIdx + 1) + " / " + list.length + (selected.country ? " · " + selected.country : "") + (selected.type ? " · " + selected.type : "") + (selected.pla ? " · ⚠️ 疑似共機" : ""))),
            h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Next aircraft", onClick: function () { cycle(1); } }, "›")),
          h("dl", { className: "ge-grid", key: "grid" },
            [["ALT", selected.altFt != null ? fmtN(selected.altFt) + " ft" : "--"],
             ["SPD", selected.speedKt != null ? fmtN(selected.speedKt) + " kt" : "--"],
             ["HDG", Math.round(selected.hdg) + "°"],
             ["V/S", selected.vrFpm != null ? fmtN(selected.vrFpm) + " fpm" : "--"]].map(function (kv) { return row(kv[0], kv[1]); })),
          selected.pla ? h("p", { key: "plan", className: "ge-note ge-warn" }, "⚠️ 疑似 PLA aircraft — heuristic: " + (selected.plaWhy || []).map(function (w) { return { mil: "ADS-B database marks it military", "cn-hex": "Chinese ICAO address block", type: "PLA-type airframe", callsign: "PLA-style callsign", "pla-block": "ICAO address inside 0x7A1000–0x7A4FFF, a block almost entirely military airframes (Y-20, WZ-10, Mi-8, Tu-16 …)" }[w] || w; }).join(" + ") + ". Not an official identification; most PLA aircraft do not broadcast ADS-B — the MND daily count (PLA tab) is the authoritative number.") : null,
          h("button", { key: "follow", type: "button", className: cx("ge-btn", "ge-wide", follow && "is-on"), "aria-pressed": follow, onClick: toggleFollow }, follow ? "● FOLLOWING" : "FOLLOW AIRCRAFT"),
        ] : h("p", { key: "n", className: "ge-note" }, flights.status === "loading" ? "Contacting flight feeds…" : "NO AIRCRAFT IN RANGE"),
        h("div", { key: "legend", className: "ge-legend" },
          h("span", null, h(ShapeIcon, { kind: "plane", color: "#ffffff", size: 15 }), "AIRCRAFT (nose = heading)"),
          h("span", null, h(ShapeIcon, { kind: "plane", color: "#ff3b30", size: 15 }), "⚠️ 疑似共機"),
          h("span", null, h(ShapeIcon, { kind: "hull", color: "#9aa7b0", size: 15 }), "SHIP (bow = course)")),
        h("p", { key: "s", className: "ge-src" }, "ADS-B via " + (flights.source || "adsb.lol") + " · adsb.lol data © adsb.lol contributors, ODbL 1.0 · fallback adsb.fi (non-commercial) / OpenSky · updated " + ago(flights.updated) + " ago"),
      ];
    }

    function shipsBody() {
      var bits = [];
      if (ships.unavailable) bits.push(h("p", { key: "un", className: "ge-note ge-warn" }, "⚠ 船舶資料暫時無法使用（" + (ships.unavailable === "stale" ? "MPB 約 " + ships.unavailableAge + " 分鐘未更新" : ships.unavailable === "empty" ? "目前沒有船位" : "連線失敗") + "）· Ship data temporarily unavailable — retrying automatically."));
      if (ships.status === "demo") bits.push(h("p", { key: "w", className: "ge-note ge-warn" }, "DEMO DATA — no live AIS (" + (ships.error || "?") + "). Demo ships follow real shipping lanes; retrying…"));
      if (ships.status === "loading") bits.push(h("p", { key: "l", className: "ge-note" }, ships.note || "Contacting AIS relay…"));
      bits.push(h("div", { key: "cnt", className: "ge-iss" },
        h("div", null, h("b", null, fmtN(inView) + " IN VIEW"), h("small", null, fmtN(ships.count) + " TRACKED IN REGION" + (ships.note ? " · " + ships.note : ""))),
        h("div", { style: { display: "flex", gap: "6px" } },
          ccgList.length ? h("button", { type: "button", className: "ge-btn ge-small ge-ccg", onClick: function () { cycleShip(1, true); } }, "⚠️ 疑似海警 " + ccgList.length) : null,
          planList.length ? h("button", { type: "button", className: "ge-btn ge-small ge-ccg ge-plan", onClick: function () { cycleShip(1, "plan"); } }, "⚠️ 疑似共軍 " + planList.length) : null)));
      if (selShip) {
        bits.push(h("div", { className: "ge-pick", key: "pick" },
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Previous ship", onClick: function () { cycleShip(-1); } }, "‹"),
          h("div", { className: "ge-pick-mid" },
            h("b", { className: "ge-cs", style: { color: SHIP_CSS[selShip.cls] } }, selShip.name),
            h("small", null, "MMSI " + selShip.mmsi + " · " + selShip.typeLabel)),
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Next ship", onClick: function () { cycleShip(1); } }, "›")));
        bits.push(h("dl", { className: "ge-grid", key: "grid" },
          [["SPD", selShip.sogKt != null ? selShip.sogKt.toFixed(1) + " kn" : "--"],
           ["CRS", selShip.cog != null ? Math.round(selShip.cog) + "°" : selShip.hdg ? Math.round(selShip.hdg) + "°" : "--"],
           ["DEST", selShip.dest || "--"],
           ["AGE", ago(selShip.t)]].map(function (kv) { return row(kv[0], kv[1]); })));
        bits.push(h("p", { key: "pos", className: "ge-note" }, fmtLL(selShip.lat, selShip.lon) + (selShip.ccg ? " · " + ccgNote(selShip) : selShip.gov ? " · 政府船舶 gov't vessel: AIS type 55 (law enforcement) under a Chinese MMSI. Could be coast guard, maritime-safety, fisheries-patrol or customs — unverified, not labelled 海警." : selShip.plan ? " · ⚠️ 疑似共軍: PLA Navy guess from AIS name / MMSI 412·413 + type 35 — not an official identification; most PLA ships do not transmit AIS" : "")));
        bits.push(h("button", { key: "follow", type: "button", className: cx("ge-btn", "ge-wide", sFollow && "is-on"), "aria-pressed": sFollow, onClick: toggleShipFollow }, sFollow ? "● FOLLOWING" : "FOLLOW SHIP"));
      } else {
        bits.push(h("div", { className: "ge-pick", key: "pick0" },
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Previous ship", onClick: function () { cycleShip(-1); } }, "‹"),
          h("div", { className: "ge-pick-mid" }, h("small", { className: "ge-hint" }, sList.length ? "TAP A SHIP ON THE GLOBE, USE ‹ ›, OR SEARCH NAME / MMSI" : ships.status === "loading" ? "WAITING FOR AIS…" : "NO VESSELS RECEIVED YET")),
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Next ship", onClick: function () { cycleShip(1); } }, "›")));
      }
      bits.push(h("div", { key: "legend", className: "ge-legend" },
        h("span", null, h(ShapeIcon, { kind: "plane", color: "#ffffff", size: 15 }), "AIRCRAFT"),
        [["cargo", "CARGO"], ["tanker", "TANKER"], ["pax", "PAX"], ["fish", "FISHING"], ["other", "OTHER"], ["ccg", "疑似海警"], ["plan", "疑似共軍"], ["gov", "政府船舶"]].map(function (c) {
          return h("span", { key: c[0] }, h(ShapeIcon, { kind: "hull", color: SHIP_CSS[c[0]], size: 15 }), c[1]);
        })));
      bits.push(h("p", { key: "src", className: "ge-src" }, "AIS: aisstream.io + 交通部航港局 (MPB) 臺灣海域船舶即時資訊, merged by MMSI via own Worker · updated " + ago(ships.updated) + " ago · not for navigation · 疑似海警 / 疑似共軍 flags are name / type / MMSI heuristics, not identifications; 政府船舶 = AIS type 55 only, unverified"));
      return bits;
    }


    function plaBody() {
      var pla = Data.state.pla, cga = Data.state.cga, intel = Data.state.intel, bits = [];
      var offDays = (intel.mnd || []).slice(0, 7).reverse(), O = intel.mnd && intel.mnd[0];
      if (intel.status === "loading" && !O) bits.push(h("p", { key: "il", className: "ge-note" }, "Loading MND / Joint Staff reports…"));
      if (intel.status === "error") bits.push(h("p", { key: "ie", className: "ge-note ge-warn" }, "MND / Joint Staff feed unavailable (" + (intel.error || "?") + "). Retrying…"));
      if (O) {
        var omax = Math.max.apply(null, offDays.map(function (d) { return d.aircraft || 0; }).concat([1]));
        bits.push(h("div", { key: "od", className: "ge-pla-date" }, h("b", null, "國防部 MND DAILY · OFFICIAL"), h("small", null, O.date + " · 06:00→06:00 (UTC+8)")));
        bits.push(h("dl", { key: "on", className: "ge-grid ge-pla-nums ge-pla-nums4" },
          [["AIRCRAFT", fmtN(O.aircraft)], ["IN SW/E ADIZ", fmtN(O.aircraft === 0 ? 0 : O.adiz)], ["PLAN SHIPS", fmtN(O.plan)], ["公務船 OFFICIAL", fmtN(O.official)]].map(function (kv) { return row(kv[0], kv[1]); })));
        bits.push(h("div", { key: "osp", className: "ge-spark", role: "img", "aria-label": "MND aircraft per day: " + offDays.map(function (d) { return d.aircraft; }).join(", ") },
          offDays.map(function (d) {
            return h("span", { key: d.id, className: "ge-spark-col" }, h("i", { style: { height: Math.max(4, Math.round((d.aircraft || 0) / omax * 100)) + "%" } }), h("em", null, d.aircraft == null ? "–" : d.aircraft), h("small", null, d.date.slice(5).replace("-", "/")));
          })));
        bits.push(h("p", { key: "onote", className: "ge-note" }, (O.crossed ? "⚠ MND: aircraft crossed the median line · " : "") + (O.balloons ? O.balloons + " balloons · " : "") + "公務船 = official (government) vessels reported near Taiwan. ",
          O.map ? h("a", { className: "ge-link", href: O.map, target: "_blank", rel: "noopener noreferrer" }, "航跡示意圖 / track map ↗") : "no track map (no aircraft) ", " ",
          h("a", { className: "ge-link", href: O.url, target: "_blank", rel: "noopener noreferrer" }, "MND report ↗")));
        bits.push(h("p", { key: "osrc", className: "ge-src" }, "Source: 中華民國國防部 (mnd.gov.tw) daily 「中共解放軍臺海周邊海、空域動態」, relayed unchanged via own Worker · fetched " + (intel.mndAt ? ago(intel.mndAt) + " ago" : "—") + "."));
      }
      if (intel.js && intel.js.length) {
        bits.push(h("div", { key: "jd", className: "ge-pla-date ge-pla-sep" }, h("b", null, "🇯🇵 JOINT STAFF · PLA NEAR JAPAN"), h("small", null, "統合幕僚監部 · " + intel.js.length + " releases")));
        bits.push(h("ul", { key: "ju", className: "ge-list ge-passes ge-cga" }, intel.js.slice(0, 12).map(function (ev) {
          var L = jsLine(ev);
          return h("li", { key: ev.id }, h("a", { className: "ge-li ge-pass", href: ev.pdf, target: "_blank", rel: "noopener noreferrer" },
            h("span", { className: "ge-pass-main" }, h("b", null, L.head), h("small", null, L.sub)), h("span", { "aria-hidden": true }, "↗")));
        })));
        bits.push(h("p", { key: "jsrc", className: "ge-src" }, "出典：防衛省・統合幕僚監部「報道発表資料」(mod.go.jp/js) — 公共データ利用規約 第1.0版 (PDL 1.0). Class / strait / direction / aircraft type extracted from the release titles, hull numbers from the PDFs, and hull→ship names from public Wikidata/Wikipedia tables; processed by this app (加工), not endorsed by the Ministry."));
      }
      if (pla.latest) {
        var L = pla.latest, max = Math.max.apply(null, pla.days.map(function (d) { return d.aircraft; }).concat([1]));
        var tr = pla.prev7 != null && pla.prev7 > 0 ? Math.round((pla.avg7 - pla.prev7) / pla.prev7 * 100) : null;
        bits.push(h("div", { key: "pd", className: "ge-pla-date ge-pla-sep" }, h("b", null, O ? "7-DAY TREND · THIRD-PARTY" : "PLA DAILY · THIRD-PARTY"), h("small", null, "pla-tracker · " + L.date)));
        if (!O) {
          bits.push(h("dl", { key: "pn", className: "ge-grid ge-pla-nums" },
            [["AIRCRAFT", fmtN(L.aircraft)], ["LINE CROSS", fmtN(L.cross)], ["SHIPS", fmtN(L.ships)]].map(function (kv) { return row(kv[0], kv[1]); })));
          bits.push(h("div", { key: "sp", className: "ge-spark", role: "img", "aria-label": "Aircraft per day, last 7 days: " + pla.days.map(function (d) { return d.aircraft; }).join(", ") },
            pla.days.map(function (d) {
              return h("span", { key: d.date, className: "ge-spark-col" }, h("i", { style: { height: Math.max(4, Math.round(d.aircraft / max * 100)) + "%" } }), h("em", null, d.aircraft), h("small", null, d.date.slice(5).replace("-", "/")));
            })));
        }
        bits.push(h("p", { key: "tr", className: "ge-note" }, "7-DAY AVG " + pla.avg7.toFixed(1) + " AIRCRAFT / " + pla.shipsAvg7.toFixed(1) + " SHIPS" + (tr != null ? " · " : ""),
          tr != null ? h("b", { className: tr > 0 ? "ge-amber" : "ge-lime" }, (tr > 0 ? "▲ +" : tr < 0 ? "▼ " : "► ") + tr + "% vs PRIOR 7 DAYS") : null));
        if (L.event && !O) bits.push(h("p", { key: "ev", className: "ge-note" }, L.event.slice(0, 120)));
      } else if (pla.status === "loading" && !O) bits.push(h("p", { key: "pl", className: "ge-note" }, "Loading PLA daily counts…"));
      else if (pla.status === "error" && !O) bits.push(h("p", { key: "pe", className: "ge-note ge-warn" }, "PLA daily data unavailable (" + (pla.error || "?") + "). Retrying…"));
      bits.push(h("p", { key: "au", className: "ge-note ge-plaauth" }, "The 國防部 (MND) daily count is the authoritative number. Most PLA aircraft and ships do NOT broadcast ADS-B / AIS, so the live map only ever shows a small, partial subset — the red ⚠️ PLA markers are 疑似 (suspected) guesses, never a count."));
      bits.push(h("div", { key: "pw", className: "ge-iss ge-plawarn" },
        h("div", null, h("b", null, "⚠️ " + plaAir.length + " 疑似 PLA ON ADS-B NOW"), h("small", null, "heuristic: military flag + Chinese ICAO block / type / callsign")),
        plaAir.length ? h("button", { type: "button", className: "ge-btn ge-small ge-ccg", onClick: function () { cyclePla(); } }, "SHOW") : null));
      bits.push(h("p", { key: "ps", className: "ge-src" }, "Trend line: third-party compilation (pla-tracker.skyfaring.net) of MND reports — unofficial, may lag or contain errors; not a warning."));
      bits.push(h("div", { key: "cg", className: "ge-pla-date ge-pla-sep" }, h("b", null, "CCG 海警 · CGA RELEASES"), h("small", null, cga.scanned ? "latest " + cga.scanned + " items" : "")));
      if (cga.status === "loading") bits.push(h("p", { key: "cl", className: "ge-note" }, "Loading 海巡署 RSS…"));
      if (cga.status === "error") bits.push(h("p", { key: "ce", className: "ge-note ge-warn" }, "CGA RSS unavailable (" + (cga.error || "?") + ")."));
      if (cga.status === "live") bits.push(cga.items.length ? h("ul", { key: "cu", className: "ge-list ge-passes ge-cga" }, cga.items.map(function (it, i) {
        return h("li", { key: i }, h("a", { className: "ge-li ge-pass", href: it.link || "https://www.cga.gov.tw/", target: "_blank", rel: "noopener noreferrer" },
          h("span", { className: "ge-pass-main" }, h("b", null, it.title), h("small", null, (it.t ? new Date(it.t).toISOString().slice(0, 10) : "") + (it.kind === "mention" ? " · mentions 海警: …" + it.snippet + "…" : " · title match"))), h("span", { "aria-hidden": true }, "↗")));
      })) : h("p", { key: "cn", className: "ge-note" }, "No 海巡署 press release among the latest " + cga.scanned + " mentions 海警."));
      bits.push(h("p", { key: "cs", className: "ge-src" }, "海洋委員會海巡署 (CGA) news RSS, titles / text containing 海警 — non-commercial use, © CGA. Not a live vessel feed (see SHIPS for the AIS CCG heuristic)."));
      return bits;
    }

    function satsBody() {
      return [
        sats.status === "demo" && h("p", { key: "w", className: "ge-note ge-warn" }, "DEMO DATA — CelesTrak unreachable (" + (sats.error || "?") + ")."),
        iss && h("div", { key: "iss", className: "ge-iss" },
          h("div", null, h("b", { className: "ge-red" }, iss.name), h("small", null, fmtLL(iss.lat, iss.lon) + " · " + fmtN(iss.altKm) + " km" + (iss.velKmS ? " · " + iss.velKmS.toFixed(2) + " km/s" : ""))),
          h("button", { type: "button", className: "ge-btn ge-small", onClick: trackIss }, "TRACK ISS")),
        h("ul", { key: "ul", className: "ge-list" },
          over.length ? over.slice(0, 40).map(function (o) {
            return h("li", { key: o.i }, h("button", { type: "button", className: "ge-li", onClick: function () { setPlace(""); setFollow(false); flyTo(o.lat, o.lon, 1.7); } },
              h("span", null, o.name), h("small", null, fmtN(o.altKm) + " km")));
          }) : h("li", { className: "ge-note" }, "none overhead right now")),
        h("p", { key: "s", className: "ge-src" }, "CelesTrak " + (sats.group || "") + " TLE · satellite.js SGP4" + (sats.tleAgeMin != null ? " · TLE age " + sats.tleAgeMin + "m" : "")),
      ];
    }

    function passesBody() {
      var bits = [];
      var nowD = new Date();
      bits.push(h("div", { key: "obs", className: "ge-iss" },
        h("div", null, h("b", { className: "ge-lime" }, "📍 " + observer.label), h("small", null, fmtLL(observer.lat, observer.lon) + " · next 72 h")),
        h("button", { type: "button", className: "ge-btn ge-small", onClick: useMyLocation }, "MY LOCATION")));
      bits.push(h("div", { key: "obsbtns", className: "ge-two" },
        h("button", { type: "button", className: cx("ge-btn", editObs && "is-on"), onClick: function () { setEditObs(!editObs); } }, "SET LAT,LON"),
        h("button", { type: "button", className: "ge-btn", onClick: resetObserver, disabled: observer.src === "default" }, "RESET: TAIPEI")));
      if (editObs) bits.push(h("form", { key: "man", className: "ge-search ge-manual", onSubmit: submitManual },
        h("input", { type: "text", inputMode: "decimal", autoComplete: "off", value: manual, onChange: function (e) { setManual(e.target.value); }, placeholder: "25.03,121.56", "aria-label": "Observer latitude, longitude" }),
        h("button", { type: "submit", className: "ge-btn ge-go" }, "SET")));
      if (passes.status === "loading" && !passes.list.length) bits.push(h("p", { key: "ld", className: "ge-note" }, "Computing passes (SGP4)…"));
      if (passes.status === "error") bits.push(h("div", { key: "er", className: "ge-iss" }, h("p", { className: "ge-note ge-warn" }, "PASS PREDICTION UNAVAILABLE — " + passes.error), h("button", { type: "button", className: "ge-btn ge-small", onClick: recomputePasses }, "RETRY")));

      if (selPass && look) {
        var above = look.el > 0, rot = look.az - (heading || 0);
        bits.push(h("div", { key: "look", className: "ge-look" },
          h("div", { className: "ge-dial", "aria-hidden": true },
            h("i", { className: "ge-dial-n", style: { transform: "rotate(" + (-(heading || 0)) + "deg)" } }, "N"),
            h("i", { className: cx("ge-dial-arrow", !above && "is-below"), style: { transform: "rotate(" + rot + "deg)" } })),
          h("div", { className: "ge-look-txt" },
            h("b", { className: above ? "ge-lime" : "ge-dim" }, above ? "LOOK " + window.GodsEyePasses.compass(look.az) + " · " + Math.round(look.az) + "°" : "BELOW HORIZON"),
            h("span", null, "ELEV " + Math.round(look.el) + "° · " + fmtN(look.rangeKm) + " km"),
            h("small", null, above ? (look.sunlit ? "sunlit" : "in Earth's shadow") + " · sky sun " + Math.round(look.sunEl) + "°" : "rises " + hm(selPass.start) + " " + selPass.startDir + " (in " + inMin(Math.max(0, selPass.start - nowD)) + ")")),
          h("div", { className: "ge-look-btns" },
            h("button", { type: "button", className: cx("ge-btn", "ge-small", compassOn && "is-on"), onClick: toggleCompass }, "COMPASS"),
            h("button", { type: "button", className: "ge-btn ge-small", onClick: function () { setSelPassKey(null); } }, "CLEAR"))));
      }

      if (passes.list.length) bits.push(h("ul", { key: "pl", className: "ge-list ge-passes" }, passes.list.map(function (p) {
        var on = selPassKey === p.key, live = p.start <= nowD && p.end >= nowD;
        return h("li", { key: p.key }, h("button", { type: "button", className: cx("ge-li", "ge-pass", on && "is-on"), "aria-pressed": on, onClick: function () { setSelPassKey(on ? null : p.key); } },
          h("span", { className: "ge-pass-main" },
            h("b", null, shortName(p.name)), " ", dayHm(p.start) + "–" + hm(p.end) + (live ? " · NOW" : ""),
            h("small", null, "peak " + hm(p.peak) + " " + Math.round(p.maxEl) + "° · " + p.startDir + " → " + p.endDir + " · " + fmtDur(p.durSec))),
          h("em", { className: p.visible ? "ge-vis" : "ge-novis" }, p.visible ? "VISIBLE" : p.why || "—")));
      })));
      else if (passes.status === "ready") bits.push(h("p", { key: "none", className: "ge-note" }, "No passes in the next 72 h for this location."));

      bits.push(pushIssActive
        ? h("p", { key: "ntf", className: "ge-note" }, "🔔 ISS pass alerts are delivered by Web Push (Alerts tab) even when this page is closed.")
        : h("button", { key: "ntf", type: "button", className: cx("ge-btn", "ge-wide", notifyOn && "is-on"), "aria-pressed": notifyOn, onClick: function () { setNotify(!notifyOn); } }, notifyOn ? "🔔 NOTIFY 5 MIN BEFORE: ON (KEEP PAGE OPEN)" : "🔔 NOTIFY ME 5 MIN BEFORE A PASS"));
      bits.push(h("p", { key: "src", className: "ge-src" }, "CelesTrak TLE (stations + visual groups" + (passes.ageMin != null ? ", age " + passes.ageMin + "m" : "") + ") · satellite.js SGP4 · VISIBLE = max ≥10°, sunlit, observer sun ≤ −6°. ISS & Tiangong always listed; HST/AJISAI/TERRA/AQUA/ENVISAT/ALOS only when visible. Predictions, not guarantees."));
      return bits;
    }

    function quakesBody() {
      var bits = [], selQ = selQuakeId ? quakes.list.find(function (x) { return x.id === selQuakeId; }) : null;
      var day = quakes.list.filter(function (x) { return Date.now() - x.t < 86400000; }).length;
      var big = quakes.list.reduce(function (m, x) { return x.mag > m ? x.mag : m; }, 0);
      if (quakes.status === "demo") bits.push(h("p", { key: "w", className: "ge-note ge-warn" }, "DEMO DATA — quake feeds unreachable (" + (quakes.error || "?") + "). Retrying…"));
      if (quakes.status === "loading") bits.push(h("p", { key: "l", className: "ge-note" }, "Contacting CWA / USGS / EMSC / GFZ…"));
      bits.push(h("div", { key: "cnt", className: "ge-iss" },
        h("div", null, h("b", null, fmtN(quakes.count) + " QUAKES · 30 DAYS"), h("small", null, "M3.0+ · " + fmtN(day) + " IN LAST 24 H" + (big ? " · MAX M" + big.toFixed(1) : "")))));
      if (selQ) bits.push(h("div", { key: "sel", className: "ge-quake-sel" },
        h("b", { style: { color: quakeCss(selQ.mag) } }, "M" + selQ.mag.toFixed(1) + " · " + selQ.place),
        h("small", null, new Date(selQ.t).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }) + " (local) · " + quakeAgo(selQ.t) + " · depth " + (selQ.depthKm != null ? Math.round(selQ.depthKm) + " km" : "--") + " · " + fmtLL(selQ.lat, selQ.lon)),
        selQ.url && !selQ.demo ? h("a", { href: selQ.url, target: "_blank", rel: "noopener noreferrer" }, selQ.src === "CWA" ? "CWA 地震報告 ↗" : selQ.src === "EMSC" ? "EMSC EVENT PAGE ↗" : selQ.src === "GFZ" ? "GFZ EVENT PAGE ↗" : "USGS EVENT PAGE ↗") : null,
        h("small", null, "來源 SOURCE: " + srcLabel(selQ) + (srcMags(selQ) ? " · " + srcMags(selQ) : "") + (selQ.src === "CWA" ? " · 以氣象署為準" : ""))));
      var cwa = Data.state.cwa;
      if (cwa && cwa.enabled) {
        cwa.warnings.slice(0, 6).forEach(function (w, i) {
          bits.push(h("p", { key: "cw" + i, className: "ge-note ge-warn" }, "⚠ " + w.phenomena + w.significance + " · " + w.locations.slice(0, 5).join("、") + (w.locations.length > 5 ? " +" + (w.locations.length - 5) : "")));
        });
        cwa.typhoons.slice(0, 3).forEach(function (t, i) {
          bits.push(h("p", { key: "ct" + i, className: "ge-note" }, "🌀 " + (t.cwaName || t.name) + " " + t.name + " · " + t.lat.toFixed(1) + "N " + t.lon.toFixed(1) + "E" + (t.maxWind != null ? " · " + t.maxWind + " m/s" : "") + (t.pressure != null ? " · " + t.pressure + " hPa" : "") + (t.movement ? " · " + t.movement : "")));
        });
      }
      if (quakes.list.length) bits.push(h("ul", { key: "ql", className: "ge-list ge-passes ge-quakes" }, quakes.list.slice(0, 40).map(function (q) {
        var on = selQuakeId === q.id;
        return h("li", { key: q.id }, h("button", { type: "button", className: cx("ge-li", "ge-pass", on && "is-on"), "aria-pressed": on, onClick: function () { if (on) setSelQuakeId(null); else selectQuake(q.id, true); } },
          h("em", { className: "ge-mag", style: { background: quakeCss(q.mag) } }, "M" + q.mag.toFixed(1)),
          h("span", { className: "ge-pass-main" },
            h("b", null, q.place),
            h("small", null, new Date(q.t).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }) + " · " + quakeAgo(q.t) + " · " + (q.depthKm != null ? Math.round(q.depthKm) + " km deep" : "depth --") + " · " + srcShort(q)))));
      })));
      else if (quakes.status === "live") bits.push(h("p", { key: "none", className: "ge-note" }, "No M3.0+ earthquakes recorded around Taiwan in the last 30 days."));
      bits.push(h("p", { key: "src", className: "ge-src" }, "來源 " + (quakes.source || "USGS") + "（合併去重，同一事件以 CWA 優先；每 2 分鐘更新 · live feed refreshes every 2 min）· 資料來源：交通部中央氣象署 CWA · USGS (public domain) · EMSC-CSEM (CC BY 4.0) · GFZ GEOFON (CC BY 4.0) · 20–27.5°N 118–124.5°E · updated " + ago(quakes.updated) + " ago" + (quakes.sources && quakes.sources.CWA && !quakes.sources.CWA.okAt ? " · ⚠ CWA 暫時無資料，目前僅顯示國際來源 (M4.5+)" : "") + " · rings sized by magnitude; brighter = last 24 h. Preliminary data, not an official warning (see Taiwan CWA)."));
      return bits;
    }

    function newsBody() {
      var bits = [h("p", { key: "h", className: "ge-note" }, "最近更新 · 2026-11-03（台北時間）")];
      NEWS.forEach(function (n, i) { bits.push(h("p", { key: "n" + i, className: "ge-news" }, h("b", null, n[0]), n[1])); });
      bits.push(h("p", { key: "s", className: "ge-src" }, "⚠ 軍艦、海警、軍機標示皆為依公開資料與規則推測的啟發式判斷，非官方認定。完整說明見 GitHub README 與 docs/DATA-SOURCES.md。"));
      return bits;
    }

    function alertsBody() {
      var bits = [], pi = pushInfo, srv = pi && pi.server, enabled = srv && srv.enabled;
      var sub = !!(pi && pi.subscribed);
      if (!pi) return [h("p", { key: "l", className: "ge-note" }, "Checking push support…")];
      if (!pi.supported) bits.push(h("p", { key: "u", className: "ge-note ge-warn" }, pi.ios ? "iPhone / iPad: Web Push works only after Share → “Add to Home Screen” (iOS/iPadOS 16.4+), then open God's Eye from the Home Screen icon." : "This browser does not support Web Push."));
      else if (pi.ios && !pi.standalone) bits.push(h("p", { key: "i", className: "ge-note ge-warn" }, "On iPhone, open this app from its Home Screen icon (Share → Add to Home Screen, iOS 16.4+) — push is not available in a normal Safari tab."));
      if (!enabled) bits.push(h("p", { key: "c", className: "ge-note ge-warn" }, "PUSH NOT ACTIVE ON THE SERVER YET — " + ((srv && srv.reason) || "the Worker has no VAPID keys / KV configured") + ". The toggles below work once it is deployed."));
      if (pi.permission === "denied") bits.push(h("p", { key: "d", className: "ge-note ge-warn" }, "Notifications are blocked for this site in your browser settings."));
      bits.push(h("p", { key: "h", className: "ge-note" }, "Get notified even when the page is closed:"));
      bits.push(toggleBtn("🌏 EARTHQUAKE M4.5+ NEAR TAIWAN (CWA / USGS / EMSC)", pushPrefs.quake, function () { togglePref("quake"); }, "q"));
      bits.push(toggleBtn("⚓ CHINA COAST GUARD VESSEL IN LIVE AIS (HEURISTIC)", pushPrefs.ccg, function () { togglePref("ccg"); }, "c2"));
      bits.push(toggleBtn("🛰️ ISS PASS ~5 MIN BEFORE (" + observer.label + ")", pushPrefs.iss, function () { togglePref("iss"); }, "i2"));
      bits.push(h("div", { key: "act", className: "ge-two" },
        !sub ? h("button", { type: "button", className: "ge-btn is-on", disabled: pushBusy || !pi.supported, onClick: function () { pushAction("on"); } }, pushBusy ? "…" : "ENABLE ALERTS")
             : h("button", { type: "button", className: "ge-btn", disabled: pushBusy, onClick: function () { pushAction("test"); } }, "SEND TEST"),
        sub ? h("button", { type: "button", className: "ge-btn", disabled: pushBusy, onClick: function () { pushAction("off"); } }, "TURN OFF") : h("button", { type: "button", className: "ge-btn", disabled: true }, "NOT SUBSCRIBED")));
      if (pushMsg) bits.push(h("p", { key: "m", className: "ge-note ge-lime", role: "status" }, pushMsg));
      bits.push(h("p", { key: "p", className: "ge-src" }, "Privacy: ISS alerts store your location rounded to ~1 km on the Worker (Cloudflare KV) — only if the ISS toggle is on; the push endpoint is deleted when you turn alerts off. CCG detection is a name/type/MMSI heuristic on public AIS, not an official identification. Alerts are best-effort, not safety-critical."));
      return bits;
    }

    var TABS = [
      { id: "hud", label: "FLIGHTS", sum: fmtN(flights.count), body: flightsBody },
      { id: "ships", label: "SHIPS", sum: fmtN(ships.count), body: shipsBody },
      { id: "quakes", label: "QUAKES", sum: fmtN(quakes.count), body: quakesBody },
      { id: "pla", label: "PLA", sum: Data.state.intel.mnd.length ? String(Data.state.intel.mnd[0].aircraft == null ? "—" : Data.state.intel.mnd[0].aircraft) : Data.state.pla.latest ? String(Data.state.pla.latest.aircraft) : "—", body: plaBody },
      { id: "sats", label: "SATS", sum: String(over.length), body: satsBody },
      { id: "passes", label: "PASSES", sum: (function () { var n = passes.list.find(function (p) { return p.end > Date.now(); }); return n ? hm(n.start) : "—"; })(), body: passesBody },
      { id: "news", label: "NEW", sum: "11/3", body: newsBody },
      { id: "alerts", label: "ALERTS", sum: pushInfo && pushInfo.subscribed ? "ON" : "OFF", body: alertsBody },
    ];
    var curTab = TABS.find(function (t) { return t.id === tab; });

    var demoAny = flights.status === "demo" || sats.status === "demo" || ships.status === "demo" || quakes.status === "demo";

    return h("div", { className: "ge-root", ref: rootRef },
      h("canvas", { className: "ge-canvas", ref: canvasRef, "aria-label": "3D globe" }),
      h("div", { className: "ge-vignette" }),
      h("div", { className: "ge-reticle", ref: reticleRef }, h("i", null), h("i", null), h("i", null), h("i", null)),
      h("div", { className: "ge-reticle ge-reticle-ship", ref: reticle2Ref }, h("i", null), h("i", null), h("i", null), h("i", null)),

      h("div", { className: "ge-ui" },
        ships.unavailable && h("div", { className: "ge-shipnotice", role: "status" }, h("b", null, "⚠ 船舶資料暫時無法使用 · SHIP DATA TEMPORARILY UNAVAILABLE"),
          h("small", null, (ships.unavailable === "stale" || (ships.unavailable === "empty" && ships.unavailableAge >= 15)) ? "航港局（MPB）資料已約 " + ships.unavailableAge + " 分鐘未更新，圖上船隻可能不是最新。系統會自動重試。" : ships.unavailable === "empty" ? "目前沒有收到任何船位，並非海上沒有船。系統會自動重試。" : "無法連到船位服務，系統會自動重試。")),
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
            h("span", null, "FLIGHTS ", h("b", null, fmtN(flights.count))),
            h("span", null, "SHIPS ", h("b", null, fmtN(ships.count)))),
          h("div", { className: "ge-badges" }, badge("FLT", flights), badge("AIS", ships), badge("SAT", sats)),
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
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.ships && "is-on"), "aria-pressed": layers.ships, "aria-label": "Toggle ships", title: "Ships", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { ships: !l.ships }); }); } }, h(ShipIcon, { size: 18 })),
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.quakes && "is-on"), "aria-pressed": layers.quakes, "aria-label": "Toggle earthquakes", title: "Earthquakes", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { quakes: !l.quakes }); }); } }, h(QuakeIcon, { size: 18 })),
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.flights && "is-on"), "aria-pressed": layers.flights, "aria-label": "Toggle flights", title: "Flights", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { flights: !l.flights }); }); } }, h(ICON.Plane, { size: 18 })),
            h("button", { type: "button", className: "ge-btn ge-tool", "aria-label": "Zoom in", onClick: function () { zoom(1); } }, h(ICON.Plus, { size: 18 })),
            h("button", { type: "button", className: "ge-btn ge-tool", "aria-label": "Zoom out", onClick: function () { zoom(-1); } }, h(ICON.Minus, { size: 18 }))),
          h("div", { className: "ge-view" }, "VIEW " + fmtLL(view.lat, view.lon) + " // ALT " + fmtN(view.altKm) + " km"),

          h("div", { className: "ge-dock" },
            h("section", { className: cx("ge-panel", curTab && "is-open") },
              curTab && h("div", { className: "ge-panel-body", role: "tabpanel", id: "ge-tabpanel" }, curTab.body()),
              h("div", { className: "ge-tabs", role: "tablist", "aria-label": "Panels" },
                TABS.map(function (t) {
                  return h("button", { key: t.id, type: "button", role: "tab", "aria-selected": tab === t.id, "aria-controls": "ge-tabpanel", className: cx("ge-tab", tab === t.id && "is-on"), onClick: function () { setTab(tab === t.id ? null : t.id); } },
                    h("b", null, t.label), h("small", null, t.sum));
                }))))
        ),

        h("nav", { className: "ge-chips", "aria-label": "Locations" },
          ["t101", "tpe", "taiwan"].map(function (k) {
            return h("button", { key: k, type: "button", className: cx("ge-btn", "ge-chip", place === k && "is-on"), onClick: function () { goPlace(k); } }, PLACES[k].label);
          })),
        h("form", { className: "ge-search", onSubmit: runSearch, role: "search" },
          h("span", { className: "ge-search-ico", "aria-hidden": true }, h(ICON.Search, { size: 14 })),
          h("input", { type: "search", enterKeyHint: "search", autoComplete: "off", autoCapitalize: "characters", spellCheck: false, value: query, onChange: function (e) { setQuery(e.target.value); }, placeholder: "FLIGHT / SHIP / SAT / LAT,LON", "aria-label": "Search flight, ship name or MMSI, satellite or coordinates" }),
          h("button", { type: "submit", className: "ge-btn ge-go" }, "GO")),
        h("footer", { className: "ge-credit" },
          "DATA: ", h("a", { href: "https://adsb.lol", target: "_blank", rel: "noopener noreferrer" }, "adsb.lol (ODbL)"), " · ",
          h("a", { href: "https://adsb.fi", target: "_blank", rel: "noopener noreferrer" }, "adsb.fi"), " · ",
          h("a", { href: "https://opensky-network.org", target: "_blank", rel: "noopener noreferrer" }, "OpenSky"), " · ",
          h("a", { href: "https://aisstream.io", target: "_blank", rel: "noopener noreferrer" }, "aisstream.io"), " · ",
          h("a", { href: "https://mpbais.motcmpb.gov.tw/aismpb/", target: "_blank", rel: "noopener noreferrer" }, "交通部航港局 MPB"), " · ",
          h("a", { href: "https://www.mnd.gov.tw/news/plaactlist", target: "_blank", rel: "noopener noreferrer" }, "國防部 MND"), " · ",
          h("a", { href: "https://www.mod.go.jp/js/", target: "_blank", rel: "noopener noreferrer" }, "防衛省統合幕僚監部 (PDL 1.0)"), " · ",
          h("a", { href: "https://pla-tracker.skyfaring.net", target: "_blank", rel: "noopener noreferrer" }, "PLA tracker"), " · ",
          h("a", { href: "https://www.cga.gov.tw", target: "_blank", rel: "noopener noreferrer" }, "海巡署 CGA"), " · ",
          h("a", { href: "https://celestrak.org", target: "_blank", rel: "noopener noreferrer" }, "CelesTrak"), " · ",
          h("a", { href: "https://earthquake.usgs.gov", target: "_blank", rel: "noopener noreferrer" }, "USGS"), " · ",
          h("a", { href: "https://www.seismicportal.eu", target: "_blank", rel: "noopener noreferrer" }, "EMSC-CSEM (CC BY 4.0)"), " · ",
          h("a", { href: "https://geofon.gfz.de", target: "_blank", rel: "noopener noreferrer" }, "GFZ GEOFON (CC BY 4.0)"), " · ",
          h("a", { href: "https://opendata.cwa.gov.tw", target: "_blank", rel: "noopener noreferrer" }, "交通部中央氣象署 CWA"), " · ",
          h("a", { href: "https://earthdata.nasa.gov/gibs", target: "_blank", rel: "noopener noreferrer" }, "NASA GIBS imagery"), " · ",
          h("a", { href: "https://github.com/shashwatak/satellite-js", target: "_blank", rel: "noopener noreferrer" }, "satellite.js"),
          demoAny && h("b", { className: "ge-amber" }, " · DEMO DATA ACTIVE"))),
      toast && h("div", { className: "ge-toast", role: "status" }, toast));
  }

  createRoot(document.getElementById("root")).render(h(React.StrictMode, null, h(App)));
})();

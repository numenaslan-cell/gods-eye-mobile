/*
 * God's Eye View // ORB-7 — live public data layer (client-side, no API keys).
 *
 *  Flights    : adsb.lol (ODbL) -> adsb.fi -> OpenSky Network, merged + normalised by the Cloudflare Worker (/api/flights)
 *  Satellites : CelesTrak GP/TLE https://celestrak.org/  + satellite.js (SGP4)
 *  Ships (AIS): aisstream.io + Taiwan MPB AIS (交通部航港局), merged by MMSI in the Cloudflare Worker (keys / collector token never reach the browser)
 *
 * Exposes window.GodsEyeData = { state, subscribe(fn), start(), config }.
 * Every feed has a status: "loading" | "live" | "demo".  "demo" means generated
 * placeholder data is shown instead (the UI displays a visible DEMO DATA badge).
 */
(function () {
  "use strict";

  var DEFAULTS = {
    openskyBase: "https://opensky-network.org/api",
    bbox: { lamin: 21.5, lomin: 119, lamax: 26.5, lomax: 123 },
    flightRefreshMs: 15000,
    proxyBase: "",            // Worker base ("https://<worker>.workers.dev/api"): AIS ships + push alerts. "" = derive from openskyBase
    shipRefreshMs: 30000,
    satGroup: "active",
    satRefreshMs: 5000,
    tleCacheMs: 2 * 60 * 60 * 1000,
    demoFallback: true,
  };
  var cfg = Object.assign({}, DEFAULTS, window.GODS_EYE_CONFIG || {});
  var qs = new URLSearchParams(location.search);
  if (qs.get("opensky")) cfg.openskyBase = qs.get("opensky").replace(/\/+$/, "");
  if (qs.get("sats")) cfg.satGroup = qs.get("sats");
  if (qs.get("proxy")) cfg.proxyBase = qs.get("proxy").replace(/\/+$/, "");
  if (!cfg.proxyBase && !/opensky-network\.org/.test(cfg.openskyBase)) cfg.proxyBase = cfg.openskyBase.replace(/\/+$/, "");
  var FORCE_DEMO = qs.get("demo") === "1";

  var R_EARTH_KM = 6371;
  var listeners = [];
  var state = {
    flights: { status: "loading", list: [], count: 0, updated: 0, rev: 0, error: "", source: "adsb.lol", nextTry: 0 },
    ships: { unavailable: "", unavailableAge: 0, mpbAt: 0, aisAt: 0, collectorAt: 0, dataAt: 0, status: "loading", list: [], count: 0, updated: 0, rev: 0, error: "", source: "aisstream.io", nextTry: 0, note: "" },
    quakes: { status: "loading", list: [], count: 0, updated: 0, rev: 0, error: "", source: "USGS", sources: null, liveUpdated: 0, nextTry: 0 },
    // Taiwan CWA (交通部中央氣象署) extras: only populated when the Worker has the owner's CWA_API_KEY secret (GET /quakes says enabled:true); otherwise USGS only
    // PLA daily activity (third-party CSV built from Taiwan MND daily reports) and CGA (海巡署) RSS items about the China Coast Guard (海警)
    pla: { status: "loading", error: "", latest: null, days: [], avg7: null, prev7: null, updated: 0, rev: 0, source: "pla-tracker.skyfaring.net" },
    intel: { status: "loading", error: "", mnd: [], js: [], mndAt: 0, jsAt: 0, needPdf: 0, updated: 0, rev: 0, source: "國防部 MND + 統合幕僚監部 (via own Worker)" },
    cga: { status: "loading", error: "", items: [], scanned: 0, updated: 0, rev: 0, source: "海巡署 CGA RSS" },
    cwa: { enabled: false, checked: 0, typhoons: [], warnings: [], updated: 0 },
    sats: {
      status: "loading", total: 0, names: [], pos: new Float32Array(0), over: [], iss: null,
      updated: 0, rev: 0, error: "", source: "CelesTrak", group: cfg.satGroup, tleAgeMin: null,
    },
  };

  function emit(kind) { listeners.slice().forEach(function (fn) { try { fn(kind, state); } catch (e) { console.error(e); } }); }
  function subscribe(fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (x) { return x !== fn; }); }; }
  function fetchTimeout(url, ms, opts) {
    var ctl = new AbortController();
    var t = setTimeout(function () { ctl.abort(); }, ms);
    return fetch(url, Object.assign({ signal: ctl.signal }, opts || {})).finally(function () { clearTimeout(t); });
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* ------------------------------------------------------------------ flights */
  var flightTimer = 0, flightFailures = 0;

  function parseOpenSky(json) {
    var now = Date.now();
    var out = [];
    (json.states || []).forEach(function (s) {
      var lon = s[5], lat = s[6];
      if (lon == null || lat == null || s[8]) return; // skip ground / no position
      var alt = s[13] != null ? s[13] : s[7];
      out.push({
        id: s[0],
        callsign: (s[1] || "").trim() || s[0].toUpperCase(),
        country: s[2] || "",
        lat: lat, lon: lon,
        altFt: alt != null ? Math.round(alt * 3.28084) : null,
        speedKt: s[9] != null ? Math.round(s[9] * 1.94384) : null,
        vMs: s[9] || 0,
        hdg: s[10] != null ? s[10] : 0,
        vrFpm: s[11] != null ? Math.round(s[11] * 196.85) : null,
        t: now,
      });
    });
    out.sort(function (a, b) { return a.callsign < b.callsign ? -1 : a.callsign > b.callsign ? 1 : 0; });
    return out;
  }

  function demoFlights() {
    var now = Date.now(), b = cfg.bbox, list = [];
    list.push({ id: "demo-jal103", callsign: "JAL103", country: "Japan", lat: 25.08, lon: 121.23, altFt: 38400, speedKt: 492, vMs: 253, hdg: 272, vrFpm: 0, t: now });
    list.push({ id: "demo-pla1", callsign: "PLA1234", country: "China", lat: 24.9, lon: 120.1, altFt: 21000, speedKt: 410, vMs: 211, hdg: 95, vrFpm: 0, t: now, type: "H6", pla: true, plaWhy: ["mil", "cn-hex", "type"] }); // demo only: exercises the suspected-PLA UI
    var carriers = ["CAL", "EVA", "CPA", "JAL", "ANA", "CSN", "UAL", "SIA", "TTW", "MDA"];
    for (var i = 0; i < 45; i++) {
      var v = rnd(130, 260);
      list.push({
        id: "demo-tw-" + i, callsign: carriers[i % carriers.length] + (100 + Math.floor(Math.random() * 899)),
        country: "Demo", lat: rnd(b.lamin, b.lamax), lon: rnd(b.lomin, b.lomax),
        altFt: Math.round(rnd(8000, 39000)), speedKt: Math.round(v * 1.94384), vMs: v,
        hdg: rnd(0, 360), vrFpm: 0, t: now,
      });
    }
    list.sort(function (a, b) { return a.callsign < b.callsign ? -1 : 1; });
    return list;
  }

  function setFlights(status, list, error) {
    var f = state.flights;
    f.status = status; f.list = list; f.count = list.length; f.updated = Date.now(); f.rev++;
    f.error = error || "";
    emit("flights");
  }

  function scheduleFlights(ms) {
    clearTimeout(flightTimer);
    state.flights.nextTry = Date.now() + ms;
    flightTimer = setTimeout(pollFlights, ms);
  }

  // Primary: the Worker's /flights (adsb.lol -> adsb.fi -> OpenSky, normalised server side, 10 s edge cache).
  function fetchFlightsProxy() {
    var b = cfg.bbox, now = Date.now();
    var url = cfg.proxyBase + "/flights?lamin=" + b.lamin + "&lomin=" + b.lomin + "&lamax=" + b.lamax + "&lomax=" + b.lomax;
    return fetchTimeout(url, 14000, { cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then(function (j) {
      if (!j || !Array.isArray(j.flights)) throw new Error("bad flights payload");
      var list = j.flights.map(function (f) { f.t = now; if (f.vMs == null) f.vMs = 0; return f; });
      list.sort(function (a, c) { return a.callsign < c.callsign ? -1 : a.callsign > c.callsign ? 1 : 0; });
      return { list: list, source: sourceLabel(j.source), remaining: NaN };
    });
  }
  function sourceLabel(src) {
    var m = { "adsb.lol": "adsb.lol", "adsb.fi": "adsb.fi", "opensky": "OpenSky Network" };
    return String(src || "").split("+").map(function (x) { return m[x] || x; }).join(" + ") || "adsb.lol";
  }
  // Legacy / last resort in the browser: OpenSky REST (via the Worker's /states/all CORS proxy).
  function fetchFlightsOpenSky() {
    var b = cfg.bbox;
    var url = cfg.openskyBase + "/states/all?lamin=" + b.lamin + "&lomin=" + b.lomin + "&lamax=" + b.lamax + "&lomax=" + b.lomax;
    return fetchTimeout(url, 12000, { cache: "no-store" }).then(function (res) {
      if (res.status === 429) {
        var wait = parseInt(res.headers.get("X-Rate-Limit-Retry-After-Seconds"), 10);
        var e = new Error("HTTP 429 (OpenSky anonymous rate limit)"); e.wait = (isFinite(wait) ? wait : 300) * 1000; throw e;
      }
      if (!res.ok) throw new Error("HTTP " + res.status);
      var remaining = parseInt(res.headers.get("X-Rate-Limit-Remaining"), 10);
      return res.json().then(function (j) { return { list: parseOpenSky(j), source: "OpenSky Network", remaining: remaining }; });
    });
  }

  function pollFlights() {
    if (document.hidden) { scheduleFlights(cfg.flightRefreshMs); return; }
    var p = cfg.proxyBase ? fetchFlightsProxy().catch(function (e) { console.warn("[flights] worker route failed, falling back to OpenSky:", e && e.message); return fetchFlightsOpenSky(); }) : fetchFlightsOpenSky();
    p.then(function (r) {
      flightFailures = 0;
      state.flights.source = r.source;
      setFlights("live", r.list, "");
      // If the credit counter is readable (CORS-exposed) and low, slow down.
      scheduleFlights(isFinite(r.remaining) && r.remaining < 40 ? 120000 : cfg.flightRefreshMs);
    }).catch(function (err) {
      flightFailures++;
      var msg = err && err.name === "AbortError" ? "timeout" : (err && err.message) || String(err);
      // A blocked CORS request surfaces as a bare TypeError "Failed to fetch".
      if (/failed to fetch|networkerror|load failed/i.test(msg)) msg = "network / CORS blocked";
      var wait = err && err.wait ? err.wait : Math.min(60000 * Math.pow(2, flightFailures - 1), 600000);
      if (cfg.demoFallback) setFlights("demo", state.flights.status === "demo" && state.flights.list.length ? state.flights.list : demoFlights(), msg);
      else setFlights("demo", [], msg);
      scheduleFlights(wait);
    });
  }


  /* -------------------------------------------------------------------- ships (AIS) */
  var shipTimer = 0, shipFailures = 0;
  var TYPE_LABELS = { 30: "FISHING", 31: "TOWING", 32: "TOWING (LARGE)", 33: "DREDGING", 34: "DIVING OPS", 35: "MILITARY", 36: "SAILING", 37: "PLEASURE CRAFT", 50: "PILOT", 51: "SEARCH & RESCUE", 52: "TUG", 53: "PORT TENDER", 54: "ANTI-POLLUTION", 55: "LAW ENFORCEMENT", 58: "MEDICAL", 59: "SPECIAL CRAFT" };
  function shipTypeLabel(t) {
    if (!t) return "UNKNOWN";
    if (TYPE_LABELS[t]) return TYPE_LABELS[t];
    if (t >= 40 && t < 50) return "HIGH-SPEED CRAFT";
    if (t >= 60 && t < 70) return "PASSENGER";
    if (t >= 70 && t < 80) return "CARGO";
    if (t >= 80 && t < 90) return "TANKER";
    return t >= 20 && t < 30 ? "WING IN GROUND" : "OTHER";
  }
  // marker colour class: ccg | plan | cargo | tanker | pax | fish | other
  function shipClass(sh) {
    var t = sh.type || 0;
    if (sh.ccg) return "ccg";
    if (sh.plan) return "plan";
    if (sh.gov) return "gov";
    if (t >= 70 && t < 80) return "cargo";
    if (t >= 80 && t < 90) return "tanker";
    if (t >= 60 && t < 70) return "pax";
    if (t === 30) return "fish";
    return "other";
  }
  function mapShip(s, now) {
    var course = s.cog != null ? s.cog : s.hdg != null ? s.hdg : 0, moving = s.sog != null && s.sog > 0.5;
    var o = {
      id: s.mmsi, mmsi: s.mmsi, name: s.name || ("MMSI " + s.mmsi), hasName: !!s.name,
      lat: s.lat, lon: s.lon, sogKt: s.sog, cog: s.cog, hdg: course, vMs: moving ? s.sog * 0.514444 : 0,
      type: s.type || 0, dest: s.dest || "", ccg: !!s.ccg, plan: !!s.plan, gov: !!s.gov, ccgBy: s.ccgBy || "", hull: s.hull || "", bureau: s.bureau || "", bureauKind: s.bureauKind || "", src: s.src || "ais", t: now - (s.ageSec || 0) * 1000,
    };
    o.typeLabel = o.ccg ? "CCG (HEURISTIC)" : o.plan ? "PLAN (HEURISTIC)" : o.gov ? "GOV'T VESSEL (AIS TYPE 55)" : shipTypeLabel(o.type); o.cls = shipClass(o);
    return o;
  }
  function parseShips(json) {
    var now = Date.now(), out = (json.ships || []).filter(function (s) { return s && s.lat != null && s.lon != null && s.mmsi; }).map(function (s) { return mapShip(s, now); });
    out.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
    return out;
  }
  // Demo ships follow real shipping lanes around Taiwan (kept at sea, never on the island). Clearly labelled DEMO.
  var LANES = [ // [lat0, lon0, lat1, lon1]
    [21.9, 119.7, 25.6, 119.9], [25.7, 119.95, 22.0, 119.55], [22.3, 122.4, 25.9, 122.6], [25.9, 122.7, 22.4, 122.2],
    [21.6, 118.6, 21.8, 122.8], [25.95, 120.6, 25.8, 123.4], [22.6, 120.0, 22.2, 118.8],
  ];
  function demoShips() {
    var now = Date.now(), list = [], names = ["DEMO CARGO", "DEMO TANKER", "DEMO FERRY", "DEMO FISHER", "DEMO CARGO", "DEMO TUG"], types = [71, 81, 61, 30, 72, 52];
    for (var i = 0; i < 46; i++) {
      var ln = LANES[i % LANES.length], f = Math.random(), kn = i % 6 === 3 ? rnd(2, 5) : rnd(8, 19), rev = i % 2 === 1;
      var lat = ln[0] + (ln[2] - ln[0]) * f + rnd(-0.12, 0.12), lon = ln[1] + (ln[3] - ln[1]) * f + rnd(-0.12, 0.12);
      var brg = Math.atan2((ln[3] - ln[1]) * Math.cos(lat * Math.PI / 180), ln[2] - ln[0]) * 180 / Math.PI;
      brg = (brg + (rev ? 180 : 0) + 360) % 360;
      list.push(mapShip({ mmsi: String(900000000 + i), name: names[i % 6] + " " + (i + 1), lat: lat, lon: lon, sog: kn, cog: brg, type: types[i % 6], dest: ["KAOHSIUNG", "KEELUNG", "TAICHUNG", "HONG KONG", "BUSAN", "SHANGHAI"][i % 6], ageSec: 0 }, now));
    }
    list.sort(function (a, b) { return a.name < b.name ? -1 : 1; });
    return list;
  }
  function setShips(status, list, error, note) {
    var s = state.ships;
    s.status = status; s.list = list; s.count = list.length; s.updated = Date.now(); s.rev++; s.error = error || ""; s.note = note || "";
    emit("ships");
  }
  function scheduleShips(ms) {
    clearTimeout(shipTimer);
    state.ships.nextTry = Date.now() + ms;
    shipTimer = setTimeout(pollShips, ms);
  }
  function shipsToDemo(msg, wait) {
    shipFailures++;
    state.ships.unavailable = "offline"; state.ships.unavailableAge = 0;
    if (cfg.demoFallback) setShips("demo", state.ships.status === "demo" && state.ships.list.length ? state.ships.list : demoShips(), msg);
    else setShips("demo", [], msg);
    scheduleShips(wait || Math.min(60000 * Math.pow(2, shipFailures - 1), 600000));
  }
  function pollShips() {
    if (document.hidden) { scheduleShips(cfg.shipRefreshMs); return; }
    if (!cfg.proxyBase) { shipsToDemo("AIS proxy not configured", 600000); return; }
    fetchTimeout(cfg.proxyBase + "/ships", 15000, { cache: "no-store" }).then(function (res) {
      if (res.status === 503) throw new Error("AIS feed not configured on the Worker yet");
      if (res.status === 404) throw new Error("AIS endpoint not deployed yet");
      return res.json().then(function (j) { if (!res.ok) throw new Error(j && j.error ? "AIS: " + j.error : "HTTP " + res.status); return j; });
    }).then(function (j) {
      shipFailures = 0;
      if (j.warming) { setShips("loading", [], "", "AIS relay warming up…"); scheduleShips(20000); return; }
      var list = parseShips(j);
      // clear "ship data temporarily unavailable" signal for the UI: nothing to draw, or the MPB (Taiwan AIS) feed behind it has stopped (> 15 min)
      var nowMs = Date.now(), sh0 = state.ships; // data-freshness timestamps (ms) for the UI: MPB (primary), aisstream + collector (GitHub Actions, best-effort), server collect time
      sh0.mpbAt = j.mpbAgeSec != null ? nowMs - j.mpbAgeSec * 1000 : 0; sh0.aisAt = j.aisAgeSec != null ? nowMs - j.aisAgeSec * 1000 : 0;
      sh0.collectorAt = j.collectorAgeSec != null ? nowMs - j.collectorAgeSec * 1000 : 0; sh0.dataAt = j.ageSec != null ? nowMs - j.ageSec * 1000 : 0;
      state.ships.unavailableAge = j.mpbAgeSec != null ? Math.round(j.mpbAgeSec / 60) : 0;
      state.ships.unavailable = !list.length ? "empty" : (j.mpbStale || (j.mpbAgeSec != null && j.mpbAgeSec > 900)) ? "stale" : "";
      setShips("live", list, "", j.error ? "stale: " + j.error : (j.total > list.length ? "TOP " + list.length + " OF " + j.total : (j.ageSec != null ? "feed " + j.ageSec + "s old" : "")));
      scheduleShips(cfg.shipRefreshMs);
    }).catch(function (err) {
      var msg = err && err.name === "AbortError" ? "timeout" : (err && err.message) || String(err);
      if (/failed to fetch|networkerror|load failed/i.test(msg)) msg = "network / CORS blocked";
      shipsToDemo(msg);
    });
  }

  /* ---------------------------------------------------------------- earthquakes (CWA + USGS + EMSC + GFZ) */
  var quakeTimer = 0, quakeFailures = 0;
  var QK = { minLat: 20, maxLat: 27.5, minLon: 118, maxLon: 124.5, days: 30, minMag: 3 };
  function mapQuake(f) {
    var p = f.properties || {}, c = (f.geometry && f.geometry.coordinates) || [];
    if (p.mag == null || c[0] == null || c[1] == null) return null;
    return { id: f.id, mag: p.mag, depthKm: c[2], lat: c[1], lon: c[0], t: p.time, place: p.place || "Taiwan region", url: p.url || "", demo: !!f.demo };
  }
  function demoQuakes() {
    var now = Date.now(), H = 3600000, d = [[23.85, 121.75, 5.3, 18, 0.7, "DEMO · 28 km SE of Hualien City"], [24.6, 122.1, 4.6, 33, 5, "DEMO · 40 km E of Yilan"], [22.9, 121.4, 4.1, 12, 11, "DEMO · 20 km N of Taitung"], [23.2, 120.6, 3.6, 8, 26, "DEMO · 12 km NE of Chiayi"], [24.1, 123.2, 4.4, 22, 50, "DEMO · offshore east of Taiwan"], [22.3, 121.0, 3.2, 40, 90, "DEMO · south of Taiwan"]];
    return d.map(function (q, i) { return mapQuake({ id: "demo" + i, demo: true, properties: { mag: q[2], time: now - q[4] * H, place: q[5] }, geometry: { coordinates: [q[1], q[0], q[3]] } }); });
  }
  function setQuakes(status, list, error) {
    var s = state.quakes;
    s.status = status; s.list = list; s.count = list.length; s.updated = Date.now(); s.rev++; s.error = error || "";
    emit("quakes");
  }
  function scheduleQuakes(ms) { clearTimeout(quakeTimer); state.quakes.nextTry = Date.now() + ms; quakeTimer = setTimeout(pollQuakes, ms); }
  function quakesToDemo(msg) {
    quakeFailures++;
    setQuakes("demo", cfg.demoFallback ? demoQuakes() : [], msg);
    scheduleQuakes(Math.min(60000 * Math.pow(2, quakeFailures - 1), 600000));
  }
  // CWA overlay (only with the owner's CWA_API_KEY on the Worker). Resolves to [] when disabled / unavailable; never rejects.
  function cwaQuakes() {
    var c = state.cwa;
    if (!cfg.proxyBase || (c.checked && !c.enabled && Date.now() - c.checked < 3600000)) return Promise.resolve([]);
    return fetchTimeout(cfg.proxyBase + "/quakes", 10000, { cache: "no-store" }).then(function (res) { return res.ok ? res.json() : null; }).then(function (j) {
      c.checked = Date.now(); c.enabled = !!(j && j.enabled && j.quakes);
      if (!c.enabled) return [];
      return j.quakes.map(function (q) { return { id: q.id, mag: q.mag, depthKm: q.depthKm, lat: q.lat, lon: q.lon, t: q.t, place: q.place, url: q.url || "", demo: false, src: "CWA", report: q.report || "" }; });
    }).catch(function () { return []; });
  }
  function cwaExtras() {
    var c = state.cwa; if (!c.enabled || !cfg.proxyBase) return;
    Promise.all(["/typhoon", "/warnings"].map(function (p) {
      return fetchTimeout(cfg.proxyBase + p, 10000, { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
    })).then(function (r) {
      if (r[0] && r[0].typhoons) c.typhoons = r[0].typhoons;
      if (r[1] && r[1].warnings) c.warnings = r[1].warnings;
      c.updated = Date.now(); state.quakes.rev++; emit("quakes");
    });
  }
  // Multi-source live feed from the Worker (GET /api/quakes/live): CWA (authoritative, incl. small local quakes) + USGS + EMSC + GFZ, merged and
  // de-duplicated server-side every 2 min. Resolves to null when unavailable (older Worker / offline); never rejects.
  function liveQuakes() {
    if (!cfg.proxyBase) return Promise.resolve(null);
    return fetchTimeout(cfg.proxyBase + "/quakes/live", 10000, { cache: "no-store" }).then(function (res) { return res.ok ? res.json() : null; }).then(function (j) {
      if (!j || !j.quakes || !j.sources) return null;
      var c = state.cwa; c.checked = Date.now(); c.enabled = !!(j.sources.CWA && j.sources.CWA.okAt);
      return { sources: j.sources, time: j.time, updated: j.updated, quakes: j.quakes.map(function (q) { return { id: q.id, mag: q.mag, depthKm: q.depthKm, lat: q.lat, lon: q.lon, t: q.t, place: q.place, url: q.url || "", demo: false, src: q.src, srcs: q.srcs || [q.src], others: q.others || [], report: q.report || "", magType: q.magType || "" }; }) };
    }).catch(function () { return null; });
  }
  var qHist = null, qHistAt = 0, qLive = null, lastExtras = 0;
  function sameQ(a, b) { return Math.abs(a.t - b.t) <= 180000 && Math.abs(a.lat - b.lat) <= 1.5 && Math.abs(a.lon - b.lon) <= 1.5; }
  // 30-day USGS M3+ history, with every event the live feed already knows replaced by the live (multi-source) record
  function buildQuakes() {
    var live = qLive ? qLive.quakes.filter(function (q) { return q.lat >= QK.minLat && q.lat <= QK.maxLat && q.lon >= QK.minLon && q.lon <= QK.maxLon && q.mag >= QK.minMag && Date.now() - q.t < QK.days * 86400000; }) : [];
    var hist = (qHist || []).filter(function (u) { return !live.some(function (q) { return sameQ(q, u); }); }).map(function (u) { u.src = "USGS"; u.srcs = ["USGS"]; u.others = []; return u; });
    var out = hist.concat(live).sort(function (a, b) { return b.t - a.t; });
    var names = {}; out.forEach(function (q) { (q.srcs || []).forEach(function (n) { names[n] = 1; }); });
    state.quakes.source = ["CWA", "USGS", "EMSC", "GFZ"].filter(function (n) { return names[n]; }).join(" + ") || "USGS";
    state.quakes.sources = qLive ? qLive.sources : null; state.quakes.liveUpdated = qLive ? qLive.updated : 0;
    return out;
  }
  function pollQuakes() {
    if (document.hidden) { scheduleQuakes(60000); return; }
    var needHist = !qHist || Date.now() - qHistAt > 300000;
    var start = new Date(Date.now() - QK.days * 86400000).toISOString().slice(0, 19);
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=200&minmagnitude=" + QK.minMag +
      "&minlatitude=" + QK.minLat + "&maxlatitude=" + QK.maxLat + "&minlongitude=" + QK.minLon + "&maxlongitude=" + QK.maxLon + "&starttime=" + start;
    var liveP = liveQuakes(), histErr = null;
    var histP = !needHist ? Promise.resolve() : fetchTimeout(url, 15000, { cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("USGS HTTP " + res.status);
      return res.json();
    }).then(function (j) { qHist = (j.features || []).map(mapQuake).filter(Boolean); qHistAt = Date.now(); }).catch(function (err) { histErr = err; });
    Promise.all([liveP, histP]).then(function (r) {
      var live = r[0];
      if (live) qLive = live;
      else if (!qLive) {
        // no multi-source feed: fall back to the older CWA overlay (/quakes) on top of the USGS history
        return cwaQuakes().then(function (cwa) { qLive = cwa.length ? { sources: null, updated: Date.now(), quakes: cwa.map(function (q) { q.srcs = ["CWA"]; q.others = []; return q; }) } : null; return finish(); });
      }
      return finish();
      function finish() {
        if (qHist || qLive) {
          quakeFailures = 0;
          setQuakes("live", buildQuakes(), "");
          if (Date.now() - lastExtras > 300000) { lastExtras = Date.now(); cwaExtras(); }
          scheduleQuakes(60000);
          return;
        }
        var msg = histErr && histErr.name === "AbortError" ? "timeout" : (histErr && histErr.message) || "unreachable";
        if (/failed to fetch|networkerror|load failed/i.test(msg)) msg = "network / CORS blocked";
        quakesToDemo(msg);
      }
    });
  }

  /* --------------------------------------------------------------- satellites */
  var satrecs = [], satNames = [], satTimer = 0, demoOrbits = null;
  var TW = cfg.bbox;

  function tleUrl(group) { return "https://celestrak.org/NORAD/elements/gp.php?GROUP=" + encodeURIComponent(group) + "&FORMAT=tle"; }

  function parseTle(text) {
    var lines = text.split(/\r?\n/), out = [], i = 0;
    while (i + 2 < lines.length) {
      if (lines[i + 1].charAt(0) === "1" && lines[i + 2].charAt(0) === "2") {
        out.push([lines[i].trim(), lines[i + 1], lines[i + 2]]); i += 3;
      } else i++;
    }
    return out;
  }

  function cacheGet(group) {
    try { var o = JSON.parse(localStorage.getItem("gods-eye:tle:" + group)); return o && o.text ? o : null; } catch (e) { return null; }
  }
  function cachePut(group, text) {
    try { localStorage.setItem("gods-eye:tle:" + group, JSON.stringify({ t: Date.now(), text: text })); } catch (e) { /* quota */ }
  }

  function loadTle(group) {
    var c = cacheGet(group);
    if (c && Date.now() - c.t < cfg.tleCacheMs) return Promise.resolve({ text: c.text, ageMin: Math.round((Date.now() - c.t) / 60000) });
    return fetchTimeout(tleUrl(group), 45000).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    }).then(function (text) {
      if (!parseTle(text.slice(0, 600)).length) throw new Error("unexpected CelesTrak response");
      cachePut(group, text);
      return { text: text, ageMin: 0 };
    }).catch(function (err) {
      if (c) return { text: c.text, ageMin: Math.round((Date.now() - c.t) / 60000), stale: true };
      throw err;
    });
  }

  function buildSatrecs(entries) {
    return new Promise(function (resolve) {
      var recs = [], names = [], i = 0, CH = 2500;
      (function step() {
        var end = Math.min(i + CH, entries.length);
        for (; i < end; i++) {
          try {
            var r = satellite.twoline2satrec(entries[i][1], entries[i][2]);
            if (r && !r.error) { recs.push(r); names.push(entries[i][0]); }
          } catch (e) { /* skip bad TLE */ }
        }
        if (i < entries.length) setTimeout(step, 0); else resolve({ recs: recs, names: names });
      })();
    });
  }

  function inTaiwan(lat, lon) { return lat >= TW.lamin && lat <= TW.lamax && lon >= TW.lomin && lon <= TW.lomax; }

  function propagateAll() {
    var now = new Date(), gmst = satellite.gstime(now), n = satrecs.length;
    var pos = new Float32Array(n * 3), over = [], iss = null;
    for (var i = 0; i < n; i++) {
      var pv;
      try { pv = satellite.propagate(satrecs[i], now); } catch (e) { pv = null; }
      if (!pv || !pv.position || typeof pv.position.x !== "number" || !isFinite(pv.position.x)) { pos[i * 3 + 2] = -1; continue; }
      var gd = satellite.eciToGeodetic(pv.position, gmst);
      var lat = satellite.degreesLat(gd.latitude), lon = satellite.degreesLong(gd.longitude);
      pos[i * 3] = lat; pos[i * 3 + 1] = lon; pos[i * 3 + 2] = gd.height;
      if (inTaiwan(lat, lon)) over.push({ i: i, name: satNames[i], lat: lat, lon: lon, altKm: gd.height });
      if (!iss && /^ISS \(ZARYA\)/.test(satNames[i])) {
        var v = pv.velocity;
        iss = { i: i, name: "ISS (ZARYA)", lat: lat, lon: lon, altKm: gd.height, velKmS: v ? Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) : null };
      }
    }
    over.sort(function (a, b) { return a.altKm - b.altKm; });
    return { pos: pos, over: over, iss: iss };
  }

  function setSats(status, total, names, res, extra) {
    var s = state.sats;
    s.status = status; s.total = total; s.names = names; s.pos = res.pos; s.over = res.over; s.iss = res.iss;
    s.updated = Date.now(); s.rev++;
    Object.assign(s, extra || {});
    emit("sats");
  }

  function demoPropagate() {
    if (!demoOrbits) {
      demoOrbits = [];
      for (var i = 0; i < 838; i++) {
        var alt = rnd(400, 1200);
        demoOrbits.push({ inc: rnd(30, 98) * Math.PI / 180, raan: rnd(0, 2 * Math.PI), ph: rnd(0, 2 * Math.PI), alt: alt, per: 2 * Math.PI * Math.sqrt(Math.pow(R_EARTH_KM + alt, 3) / 398600.4418) });
      }
      demoOrbits[0] = { inc: 51.6 * Math.PI / 180, raan: 1.2, ph: 0.4, alt: 420, per: 5560, iss: true };
    }
    var t = Date.now() / 1000, n = demoOrbits.length, pos = new Float32Array(n * 3), over = [], iss = null, names = [];
    for (var k = 0; k < n; k++) {
      var o = demoOrbits[k], u = o.ph + 2 * Math.PI * t / o.per;
      var lat = Math.asin(Math.sin(o.inc) * Math.sin(u));
      var lon = o.raan + Math.atan2(Math.cos(o.inc) * Math.sin(u), Math.cos(u)) - 7.2921159e-5 * t;
      var la = lat * 180 / Math.PI, lo = ((lon * 180 / Math.PI + 540) % 360) - 180;
      pos[k * 3] = la; pos[k * 3 + 1] = lo; pos[k * 3 + 2] = o.alt;
      names.push(o.iss ? "ISS (DEMO)" : "DEMO-SAT-" + k);
      if (inTaiwan(la, lo)) over.push({ i: k, name: names[k], lat: la, lon: lo, altKm: o.alt });
      if (o.iss) iss = { i: k, name: "ISS (DEMO)", lat: la, lon: lo, altKm: o.alt, velKmS: 7.66 };
    }
    return { pos: pos, over: over, iss: iss, names: names };
  }

  function satTick() {
    clearTimeout(satTimer);
    if (!document.hidden) {
      if (state.sats.status === "live" && satrecs.length) {
        var r = propagateAll();
        setSats("live", satrecs.length, satNames, r);
      } else if (state.sats.status === "demo" && cfg.demoFallback) {
        var d = demoPropagate();
        setSats("demo", d.names.length, d.names, d);
      }
    }
    satTimer = setTimeout(satTick, cfg.satRefreshMs);
  }

  function goSatDemo(msg) {
    state.sats.error = msg;
    state.sats.status = "demo";
    var d = cfg.demoFallback ? demoPropagate() : { pos: new Float32Array(0), over: [], iss: null, names: [] };
    setSats("demo", d.names.length, d.names, d, { error: msg });
  }

  function startSats() {
    if (FORCE_DEMO) { goSatDemo("demo mode (?demo=1)"); satTick(); return; }
    if (typeof satellite === "undefined") { goSatDemo("satellite.js not loaded"); satTick(); return; }
    var groups = cfg.satGroup === "stations" ? ["stations"] : [cfg.satGroup, "stations"];
    (function tryGroup(idx) {
      loadTle(groups[idx]).then(function (r) {
        return buildSatrecs(parseTle(r.text)).then(function (b) {
          if (!b.recs.length) throw new Error("no valid TLEs");
          satrecs = b.recs; satNames = b.names;
          state.sats.group = groups[idx];
          var res = propagateAll();
          setSats("live", satrecs.length, satNames, res, { error: r.stale ? "using stale cached TLE" : "", tleAgeMin: r.ageMin, group: groups[idx] });
          satTick();
        });
      }).catch(function (err) {
        var msg = err && err.name === "AbortError" ? "timeout" : (err && err.message) || String(err);
        if (/failed to fetch|networkerror|load failed/i.test(msg)) msg = "network / CORS blocked";
        if (idx + 1 < groups.length) tryGroup(idx + 1);
        else { goSatDemo(msg); satTick(); setTimeout(startSats, 5 * 60 * 1000); }
      });
    })(0);
  }


  /* ------------------------------------------------- PLA daily stats (third-party CSV, CORS *) + CGA RSS (via Worker) */
  var PLA_CSV = "https://pla-tracker.skyfaring.net/data/records.csv";
  function parseCsv(text) { // RFC 4180-ish: quoted fields may contain commas, doubled quotes and newlines
    var rows = [], row = [], f = "", q = false, i = 0, c;
    text = String(text || "").replace(/^\uFEFF/, "");
    for (; i < text.length; i++) {
      c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(f); f = ""; if (row.length > 1 || row[0] !== "") rows.push(row); row = []; }
      else f += c;
    }
    if (f !== "" || row.length) { row.push(f); rows.push(row); }
    if (!rows.length) return [];
    var head = rows[0].map(function (x) { return x.trim(); });
    return rows.slice(1).map(function (r) { var o = {}; head.forEach(function (k, j) { o[k] = r[j] != null ? r[j] : ""; }); return o; });
  }
  function plaStats(rows) {
    var n = function (v) { var x = parseFloat(v); return isFinite(x) ? x : null; };
    var days = rows.filter(function (r) { return /^\d{4}-\d{2}-\d{2}$/.test(r.date) && n(r.aircraft_total) != null; })
      .map(function (r) { return { date: r.date, aircraft: n(r.aircraft_total), cross: n(r.median_line_cross), ships: n(r.ships_total), event: (r.special_event || "").replace(/\s+/g, " ").trim() }; })
      .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    if (!days.length) return null;
    var avg = function (a) { return a.length ? a.reduce(function (s, d) { return s + d.aircraft; }, 0) / a.length : null; };
    var last7 = days.slice(-7), prev7 = days.slice(-14, -7);
    return { latest: days[days.length - 1], days: last7, avg7: avg(last7), prev7: prev7.length === 7 ? avg(prev7) : null, shipsAvg7: last7.reduce(function (s, d) { return s + (d.ships || 0); }, 0) / last7.length };
  }
  function pollPla() {
    var p = state.pla;
    fetchTimeout(PLA_CSV, 15000).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); }).then(function (t) {
      var st = plaStats(parseCsv(t)); if (!st) throw new Error("no rows");
      p.status = "live"; p.error = ""; p.latest = st.latest; p.days = st.days; p.avg7 = st.avg7; p.prev7 = st.prev7; p.shipsAvg7 = st.shipsAvg7; p.updated = Date.now(); p.rev++; emit("pla");
      setTimeout(pollPla, 2 * 3600000);
    }).catch(function (err) {
      p.status = p.latest ? "live" : "error"; p.error = err && err.name === "AbortError" ? "timeout" : (err && err.message) || String(err); p.rev++; emit("pla");
      setTimeout(pollPla, 10 * 60000);
    });
  }
  function pollCga() {
    var c = state.cga;
    if (!cfg.proxyBase) { c.status = "error"; c.error = "Worker not configured"; c.rev++; emit("cga"); return; }
    fetchTimeout(cfg.proxyBase + "/cga", 15000, { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error(r.status === 404 ? "route not deployed yet" : "HTTP " + r.status); return r.json(); }).then(function (j) {
      c.status = "live"; c.error = ""; c.items = j.items || []; c.scanned = j.scanned || 0; c.updated = Date.now(); c.rev++; emit("cga");
      setTimeout(pollCga, 30 * 60000);
    }).catch(function (err) {
      c.status = c.items.length ? "live" : "error"; c.error = err && err.name === "AbortError" ? "timeout" : (err && err.message) || String(err); c.rev++; emit("cga");
      setTimeout(pollCga, 10 * 60000);
    });
  }

  // Official PLA-activity intel: Taiwan MND daily bulletin + Japan Joint Staff releases, scraped by the pla-intel Worker and served by the main Worker (/api/pla).
  function pollIntel() {
    var c = state.intel;
    if (!cfg.proxyBase) { c.status = "error"; c.error = "Worker not configured"; c.rev++; emit("intel"); return; }
    fetchTimeout(cfg.proxyBase + "/pla", 15000, { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error(r.status === 404 ? "route not deployed yet" : "HTTP " + r.status); return r.json(); }).then(function (j) {
      c.status = "live"; c.error = ""; c.mnd = (j.mnd && j.mnd.days) || []; c.js = (j.js && j.js.events) || []; c.mndAt = (j.updated && j.updated.mnd) || 0; c.jsAt = (j.updated && j.updated.js) || 0;
      c.errors = j.errors || {}; c.needPdf = (j.needPdf || []).length; c.updated = Date.now(); c.rev++; emit("intel");
      setTimeout(pollIntel, 15 * 60000);
    }).catch(function (err) {
      c.status = c.mnd.length || c.js.length ? "live" : "error"; c.error = err && err.name === "AbortError" ? "timeout" : (err && err.message) || String(err); c.rev++; emit("intel");
      setTimeout(pollIntel, 10 * 60000);
    });
  }

  /* -------------------------------------------------------------------- start */
  var started = false;
  function start() {
    if (started) return; started = true;
    if (FORCE_DEMO) { setFlights("demo", demoFlights(), "demo mode (?demo=1)"); setShips("demo", demoShips(), "demo mode (?demo=1)"); setQuakes("demo", demoQuakes(), "demo mode (?demo=1)"); }
    else { pollFlights(); pollShips(); pollQuakes(); }
    pollPla(); pollCga(); pollIntel();
    startSats();
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && !FORCE_DEMO && Date.now() >= state.flights.nextTry - 1000) pollFlights();
      if (!document.hidden && !FORCE_DEMO && Date.now() >= state.ships.nextTry - 1000) pollShips();
      if (!document.hidden && !FORCE_DEMO && Date.now() >= state.quakes.nextTry - 1000) pollQuakes();
    });
  }

  // TLE entries [[name, line1, line2], ...] for a CelesTrak group (localStorage-cached 2 h, shared with the satellite layer).
  function loadTleEntries(group) {
    return loadTle(group).then(function (r) { return { entries: parseTle(r.text), ageMin: r.ageMin, stale: !!r.stale }; });
  }

  window.GodsEyeData = { _test: { parseCsv: parseCsv, plaStats: plaStats }, state: state, subscribe: subscribe, start: start, config: cfg, R_EARTH_KM: R_EARTH_KM, loadTleEntries: loadTleEntries, shipTypeLabel: shipTypeLabel };
})();

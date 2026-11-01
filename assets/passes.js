/*
 * God's Eye View // ORB-7 — satellite pass prediction core (SGP4 via satellite.js).
 *
 * Shared by the browser (window.GodsEyePasses) and the Cloudflare Worker push cron
 * (bundled with esbuild, see proxy/). Pure functions, no DOM, no network.
 *
 *   var P = createPasses(satellite);
 *   P.findPasses(satrec, {lat, lon, heightKm}, startDate, hours, {minEl: 10})
 *   P.lookAngles(satrec, observer, date)   // az / el / range / sunlit / observer sun elevation
 *
 * "Likely visible" = at some moment of the pass the satellite is >= 10 deg above the horizon,
 * sunlit (cylindrical Earth-shadow model) and the observer's Sun is <= -6 deg (civil twilight or darker).
 * It is a prediction from public TLEs, not a guarantee (brightness/weather/TLE age are not modelled).
 */
(function (root) {
  "use strict";
  var DEG = Math.PI / 180, RE = 6378.137;
  var DIRS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

  function createPasses(sat) {
    function compass(azDeg) { return DIRS[Math.round((((azDeg % 360) + 360) % 360) / 22.5) % 16]; }

    // Low-precision Sun (Meeus) -> unit vector in the ECI (true-equator-of-date approx.) frame.
    function sunUnit(date) {
      var n = date.getTime() / 86400000 + 2440587.5 - 2451545.0;
      var L = 280.460 + 0.9856474 * n, g = (357.528 + 0.9856003 * n) * DEG;
      var lam = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * DEG, eps = (23.439 - 0.0000004 * n) * DEG;
      return { x: Math.cos(lam), y: Math.cos(eps) * Math.sin(lam), z: Math.sin(eps) * Math.sin(lam) };
    }
    function sunElevation(date, obs, gmst) { // observer's Sun elevation in degrees
      var ecf = sat.geodeticToEcf({ latitude: obs.lat * DEG, longitude: obs.lon * DEG, height: obs.heightKm || 0 });
      var eci = sat.ecfToEci(ecf, gmst != null ? gmst : sat.gstime(date));
      var m = Math.sqrt(eci.x * eci.x + eci.y * eci.y + eci.z * eci.z), s = sunUnit(date);
      return Math.asin((eci.x * s.x + eci.y * s.y + eci.z * s.z) / m) / DEG;
    }
    function isSunlit(eci, date) { // cylindrical shadow
      var s = sunUnit(date), d = eci.x * s.x + eci.y * s.y + eci.z * s.z;
      if (d >= 0) return true;
      var px = eci.x - d * s.x, py = eci.y - d * s.y, pz = eci.z - d * s.z;
      return Math.sqrt(px * px + py * py + pz * pz) > RE;
    }

    function sample(satrec, obs, date) {
      var pv; try { pv = sat.propagate(satrec, date); } catch (e) { return null; }
      if (!pv || !pv.position || typeof pv.position.x !== "number" || !isFinite(pv.position.x)) return null;
      var gmst = sat.gstime(date);
      var la = sat.ecfToLookAngles({ latitude: obs.lat * DEG, longitude: obs.lon * DEG, height: obs.heightKm || 0 }, sat.eciToEcf(pv.position, gmst));
      return { az: la.azimuth / DEG, el: la.elevation / DEG, rangeKm: la.rangeSat, eci: pv.position, gmst: gmst };
    }

    function lookAngles(satrec, obs, date) {
      var s = sample(satrec, obs, date); if (!s) return null;
      return { az: ((s.az % 360) + 360) % 360, el: s.el, rangeKm: s.rangeKm, sunlit: isSunlit(s.eci, date), sunEl: sunElevation(date, obs, s.gmst) };
    }

    function refineCross(satrec, obs, t0, t1, rising) { // bisection on el=0 between two times (ms)
      for (var i = 0; i < 12; i++) {
        var tm = (t0 + t1) / 2, s = sample(satrec, obs, new Date(tm));
        if (!s) break;
        if ((s.el > 0) === rising) t1 = tm; else t0 = tm;
      }
      return rising ? t1 : t0;
    }
    function refinePeak(satrec, obs, t0, t1) { // ternary search of max elevation
      var best = { t: t0, el: -90 };
      for (var i = 0; i < 18; i++) {
        var a = t0 + (t1 - t0) / 3, b = t1 - (t1 - t0) / 3, sa = sample(satrec, obs, new Date(a)), sb = sample(satrec, obs, new Date(b));
        if (!sa || !sb) break;
        if (sa.el < sb.el) t0 = a; else t1 = b;
      }
      var tm = (t0 + t1) / 2, s = sample(satrec, obs, new Date(tm));
      if (s) best = { t: tm, el: s.el, az: s.az };
      return best;
    }

    /*
     * Passes whose max elevation >= opts.minEl (default 10) between startDate and startDate+hours.
     * Each: { start, peak, end (Date), startAz, peakAz, endAz, startDir, endDir, maxEl, durSec, visible, ongoing }
     */
    function findPasses(satrec, obs, startDate, hours, opts) {
      opts = opts || {};
      var minEl = opts.minEl != null ? opts.minEl : 10, step = (opts.stepSec || 20) * 1000;
      var t0 = startDate.getTime(), tEnd = t0 + hours * 3600000, out = [];
      var inPass = false, p = null, prevT = t0, prevEl = null;
      for (var t = t0; t <= tEnd + step; t += step) {
        var s = sample(satrec, obs, new Date(t));
        if (!s) { inPass = false; p = null; prevEl = null; prevT = t; continue; }
        var up = s.el > 0;
        if (up && !inPass) {
          inPass = true;
          var ongoing = prevEl == null; // already above horizon at the very start of the window
          var ts = ongoing ? t : refineCross(satrec, obs, prevT, t, true);
          var s0 = sample(satrec, obs, new Date(ts)) || s;
          p = { startMs: ts, startAz: s0.az, maxEl: s.el, maxMs: t, vis: false, ongoing: ongoing };
        }
        if (inPass) {
          if (s.el > p.maxEl) { p.maxEl = s.el; p.maxMs = t; }
          if (s.el >= 10 && !p.vis) {
            var d = new Date(t);
            if (isSunlit(s.eci, d) && sunElevation(d, obs, s.gmst) <= -6) p.vis = true;
          }
        }
        if (!up && inPass) {
          inPass = false;
          var te = refineCross(satrec, obs, prevT, t, false);
          var pk = refinePeak(satrec, obs, Math.max(p.startMs, p.maxMs - step), Math.min(te, p.maxMs + step));
          var se = sample(satrec, obs, new Date(te)) || s;
          if (pk.el >= minEl && p.startMs <= tEnd) {
            out.push({
              start: new Date(p.startMs), peak: new Date(pk.t), end: new Date(te),
              startAz: ((p.startAz % 360) + 360) % 360, peakAz: ((pk.az % 360) + 360) % 360, endAz: ((se.az % 360) + 360) % 360,
              startDir: compass(p.startAz), endDir: compass(se.az), peakDir: compass(pk.az),
              maxEl: pk.el, durSec: Math.round((te - p.startMs) / 1000), visible: p.vis, ongoing: p.ongoing,
            });
          }
          p = null;
        }
        prevT = t; prevEl = s.el;
        if (!inPass && t > tEnd) break;
      }
      return out;
    }

    return { findPasses: findPasses, lookAngles: lookAngles, compass: compass, sunElevation: sunElevation, sunUnit: sunUnit, isSunlit: isSunlit };
  }

  if (typeof module === "object" && module.exports) module.exports = createPasses;
  else if (root && root.satellite) root.GodsEyePasses = createPasses(root.satellite);
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this);

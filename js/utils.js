/* ==========================================================================
   utils.js — Small shared helpers (loaded on every page)
   ========================================================================== */
(function () {
  "use strict";

  /** Escape text before putting it into innerHTML. */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** "2026-10-15" -> "15 October 2026" (en-IN). */
  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  }

  /** Read a nested value from window.SITE, e.g. get("school.phones.0"). */
  function get(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, window.SITE);
  }

  /**
   * Photo markup. If `src` is empty a neutral placeholder is rendered instead.
   * opts: { src, alt, person, cls, lazy }
   */
  function photo(opts) {
    var cls = opts.cls || "";
    if (opts.src) {
      return (
        '<img class="photo ' + cls + '" src="' + esc(opts.src) + '" alt="' + esc(opts.alt) + '"' +
        (opts.lazy === false ? "" : ' loading="lazy"') + ' decoding="async">'
      );
    }
    return (
      '<div class="photo-ph ' + cls + '" role="img" aria-label="' + esc(opts.alt) + '">' +
      window.icon(opts.person ? "user-round" : "image") +
      "</div>"
    );
  }

  /** Returns  class="<cls> reveal" style="--delay:Xs"  for staggered scroll-reveal. */
  function rv(cls, index, step) {
    var delay = ((index || 0) * (step == null ? 0.08 : step)).toFixed(2);
    return 'class="' + (cls ? cls + " " : "") + 'reveal" style="--delay:' + delay + 's"';
  }

  /** School logo: real image if SITE.school.logo is set, otherwise the "SX" badge. */
  function logo(extra) {
    var sc = window.SITE.school;
    if (sc.logo) {
      return '<img class="logo logo--img ' + extra + '" src="' + esc(sc.logo) + '" alt="' + esc(sc.name) + ' logo">';
    }
    return '<span class="logo ' + extra + '" aria-hidden="true">SX</span>';
  }

  
  function bindData(root) {
    (root || document).querySelectorAll("[data-bind]").forEach(function (el) {
      var v = get(el.getAttribute("data-bind"));
      if (v != null) el.textContent = v;
    });
    (root || document).querySelectorAll("[data-href]").forEach(function (el) {
      var v = get(el.getAttribute("data-href"));
      if (v) el.setAttribute("href", v);
    });
    (root || document).querySelectorAll("[data-src]").forEach(function (el) {
      var v = get(el.getAttribute("data-src"));
      if (v) el.setAttribute("src", v);
    });
  }

  window.U = { esc: esc, formatDate: formatDate, get: get, photo: photo, rv: rv, logo: logo, bindData: bindData };
})();

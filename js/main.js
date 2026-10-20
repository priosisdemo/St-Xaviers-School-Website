/* ==========================================================================
   main.js — Boot file. Runs last on every page.
   ========================================================================== */
(function () {
  "use strict";
  window.hydrateIcons(document); // <i data-icon="..."> -> inline SVG
  window.U.bindData(document);   // [data-bind] / [data-href] -> values from data.js
  window.Anim.initReveal(document);
  window.Anim.initCounters(document);
})();

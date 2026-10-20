/* ==========================================================================
   animations.js — Scroll-reveal + animated number counters
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /** Fade/slide elements in as they enter the viewport. */
  function initReveal(root) {
    var items = (root || document).querySelectorAll(".reveal:not([data-reveal-init])");
    items.forEach(function (el) { el.setAttribute("data-reveal-init", ""); });
    if (reduce || !hasIO) {
      items.forEach(function (el) { el.classList.remove("reveal"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          io.unobserve(el);
          el.classList.add("is-visible");
          // After the entrance finishes, drop reveal classes so hover effects (.lift) work normally.
          var done = function () { el.classList.remove("reveal", "is-visible"); el.style.removeProperty("--delay"); };
          el.addEventListener("transitionend", function onEnd(e) {
            if (e.target === el && e.propertyName === "opacity") { el.removeEventListener("transitionend", onEnd); done(); }
          });
          setTimeout(done, 1800);
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  /** <span data-count="2000" data-suffix="+"> counts up once visible. */
  function initCounters(root) {
    var els = (root || document).querySelectorAll("[data-count]");
    function fmt(n, el) { return n.toLocaleString("en-IN") + (el.getAttribute("data-suffix") || ""); }
    function run(el) {
      var target = Number(el.getAttribute("data-count"));
      if (reduce) { el.textContent = fmt(target, el); return; }
      var start = performance.now(), duration = 1800;
      (function tick(now) {
        var t = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 2.2); // ease-out
        el.textContent = fmt(Math.round(target * eased), el);
        if (t < 1) requestAnimationFrame(tick);
      })(start);
    }
    els.forEach(function (el) { el.textContent = fmt(0, el); });
    if (!hasIO) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { io.unobserve(entry.target); run(entry.target); }
      });
    });
    els.forEach(function (el) { io.observe(el); });
  }

  window.Anim = { initReveal: initReveal, initCounters: initCounters, reduceMotion: reduce };
})();

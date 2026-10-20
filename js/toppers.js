/* ==========================================================================
   toppers.js — Toppers cards. Mobile: auto-scrolling snap carousel with dots.
   sm and up: normal grid.
   ========================================================================== */
(function () {
  "use strict";

  var host = document.getElementById("toppers");
  if (!host) return;

  var data = window.SITE.toppers;
  var U = window.U;
  var list = data.list;
  var n = list.length;
  var active = 0, holdUntil = 0, touching = false;

  var title = document.getElementById("toppers-title");
  if (title) title.textContent = data.title;

  host.innerHTML = list.map(function (t, i) {
    return '<div ' + U.rv("topper lift", i % 4, 0.08) + ">" +
      U.photo({ src: t.photo, alt: t.name + " (photo placeholder)", person: true, cls: "rounded-full" }) +
      '<p class="topper__name">' + U.esc(t.name) + "</p>" +
      '<p class="topper__pct">' + window.icon("award") + U.esc(t.percent) + "</p></div>";
  }).join("");

  var dotsHost = document.getElementById("toppers-dots");
  dotsHost.innerHTML = list.map(function (t, i) {
    return '<button class="dot' + (i === 0 ? " is-active" : "") + '" type="button" aria-label="Show ' + U.esc(t.name) + '"></button>';
  }).join("");
  var dots = dotsHost.querySelectorAll(".dot");

  function scrollTo(i) {
    var card = host.children[i];
    if (card) host.scrollTo({ left: card.offsetLeft - (host.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  }

  function markActive(i) {
    active = i;
    dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
  }

  host.addEventListener("scroll", function () {
    var centre = host.scrollLeft + host.clientWidth / 2, best = 0, dist = Infinity;
    Array.prototype.forEach.call(host.children, function (ch, i) {
      var d = Math.abs(ch.offsetLeft + ch.offsetWidth / 2 - centre);
      if (d < dist) { dist = d; best = i; }
    });
    markActive(best);
  }, { passive: true });

  dots.forEach(function (d, i) {
    d.addEventListener("click", function () { scrollTo(i); holdUntil = Date.now() + 3000; });
  });

  function release() { touching = false; holdUntil = Date.now() + 3000; }
  host.addEventListener("touchstart", function () { touching = true; }, { passive: true });
  host.addEventListener("touchend", release, { passive: true });
  host.addEventListener("touchcancel", release, { passive: true });

  if (!window.Anim.reduceMotion) {
    setInterval(function () {
      if (touching || Date.now() < holdUntil) return;
      if (!window.matchMedia("(max-width: 639px)").matches) return;
      scrollTo((active + 1) % n);
    }, 3000);
  }
})();

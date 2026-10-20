/* ==========================================================================
   hero-slider.js — Home page hero: crossfading background slides, progress
   bars, prev / pause / next buttons, swipe, pause-on-hover.
   ========================================================================== */
(function () {
  "use strict";

  var hero = document.getElementById("hero");
  if (!hero) return;

  var slides = window.SITE.heroSlides;
  var esc = window.U.esc;
  var DURATION = 6000;
  var reduce = window.Anim.reduceMotion;
  var n = slides.length;

  var index = 0, paused = false, hover = false, touching = false, elapsed = 0;
  var touchX = null, raf = 0, last = 0;

  /* ----- build markup ----- */
  var imgs = slides.map(function (s, i) {
    return '<img class="hero__slide' + (i === 0 ? " is-active" : "") + '" src="' + esc(s.src) + '" alt="" aria-hidden="true"' +
      ' width="1920" height="1088"' + (i === 0 ? ' fetchpriority="high"' : ' decoding="async"') + ">";
  }).join("");
  hero.insertAdjacentHTML("afterbegin", imgs + '<div class="hero__overlay" aria-hidden="true"></div>');

  var tabs = slides.map(function (s, i) {
    return '<button class="hero__tab" role="tab" type="button" aria-selected="' + (i === 0) + '" aria-label="Slide ' + (i + 1) + ": " + esc(s.label) + '">' +
      '<span class="hero__bar"><span class="hero__fill"></span></span>' +
      '<span class="hero__tab-label">0' + (i + 1) + '<span class="long"> · ' + esc(s.label) + "</span></span></button>";
  }).join("");

  hero.insertAdjacentHTML(
    "beforeend",
    '<div class="hero__controls-wrap"><div class="container hero__controls">' +
      '<div class="hero__tabs" role="tablist" aria-label="Hero slides">' + tabs + "</div>" +
      '<div class="hero__btns">' +
      '<button class="hero__btn" type="button" data-act="prev" aria-label="Previous slide">' + window.icon("chevron-left") + "</button>" +
      '<button class="hero__btn" type="button" data-act="toggle" aria-label="Pause slideshow">' + window.icon("pause") + "</button>" +
      '<button class="hero__btn" type="button" data-act="next" aria-label="Next slide">' + window.icon("chevron-right") + "</button>" +
      "</div></div></div>"
  );

  var slideEls = hero.querySelectorAll(".hero__slide");
  var tabEls = hero.querySelectorAll(".hero__tab");
  var fills = hero.querySelectorAll(".hero__fill");
  var toggleBtn = hero.querySelector('[data-act="toggle"]');

  function halted() { return reduce || paused || hover || touching; }

  function paint(progress) {
    slideEls.forEach(function (el, i) { el.classList.toggle("is-active", i === index); });
    tabEls.forEach(function (el, i) { el.setAttribute("aria-selected", String(i === index)); });
    fills.forEach(function (el, i) {
      var fill = i < index ? 1 : i === index ? (reduce ? 1 : progress) : 0;
      el.style.transform = "scaleX(" + fill + ")";
    });
  }

  function go(i) {
    index = ((i % n) + n) % n;
    elapsed = 0;
    paint(0);
  }

  function tick(t) {
    if (halted()) { raf = 0; return; }
    elapsed += t - last;
    last = t;
    if (elapsed >= DURATION) { elapsed = 0; index = (index + 1) % n; }
    paint(elapsed / DURATION);
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (raf || halted()) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function setPaused(value) {
    paused = value;
    toggleBtn.innerHTML = window.icon(paused ? "play" : "pause");
    toggleBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    start();
  }

  /* ----- events ----- */
  tabEls.forEach(function (el, i) { el.addEventListener("click", function () { go(i); }); });
  hero.querySelector('[data-act="prev"]').addEventListener("click", function () { go(index - 1); });
  hero.querySelector('[data-act="next"]').addEventListener("click", function () { go(index + 1); });
  toggleBtn.addEventListener("click", function () { setPaused(!paused); });

  hero.addEventListener("mouseenter", function () { hover = true; });
  hero.addEventListener("mouseleave", function () { hover = false; start(); });
  hero.addEventListener("touchstart", function (e) {
    touching = true;
    touchX = e.touches[0] ? e.touches[0].clientX : null;
  }, { passive: true });
  hero.addEventListener("touchend", function (e) {
    touching = false;
    if (touchX !== null) {
      var dx = (e.changedTouches[0] ? e.changedTouches[0].clientX : touchX) - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    }
    start();
  }, { passive: true });
  hero.addEventListener("touchcancel", function () { touching = false; start(); }, { passive: true });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { last = performance.now(); } });

  paint(0);
  start();

  /* hero text entrance animation */
  requestAnimationFrame(function () { hero.classList.add("is-ready"); });
})();

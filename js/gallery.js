/* ==========================================================================
   gallery.js — Category filter + masonry grid + keyboard-friendly lightbox
   ========================================================================== */
(function () {
  "use strict";

  var grid = document.getElementById("gallery-grid");
  if (!grid) return;

  var S = window.SITE, U = window.U;
  var tabsHost = document.getElementById("gallery-tabs");
  var box = document.getElementById("lightbox");
  var boxBody = document.getElementById("lightbox-body");

  document.body.appendChild(box); // keep the lightbox above header + WhatsApp button

  var tab = "All";
  var items = [];
  var openIndex = null;
  var opener = null;

  /* ----- tabs ----- */
  var categories = ["All"].concat(S.galleryCategories);
  tabsHost.innerHTML = categories.map(function (c) {
    return '<button class="tab" role="tab" type="button" data-cat="' + U.esc(c) + '" aria-selected="' + (c === "All") + '">' + U.esc(c) + "</button>";
  }).join("");
  tabsHost.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    tab = btn.getAttribute("data-cat");
    tabsHost.querySelectorAll(".tab").forEach(function (b) { b.setAttribute("aria-selected", String(b === btn)); });
    render();
  });

  /* ----- grid ----- */
  function render() {
    items = S.gallery.filter(function (g) { return tab === "All" || g.category === tab; });
    grid.innerHTML = items.map(function (g, i) {
      return '<div ' + U.rv("masonry__item", i % 3, 0.06) + ">" +
        '<button class="gallery-btn lift" type="button" data-i="' + i + '" aria-label="Open ' + U.esc(g.alt) + '">' +
        U.photo({ src: g.src, alt: g.alt, cls: g.tall ? "ratio-34" : "ratio-43" }) +
        '<span class="caption">' + U.esc(g.category) + " · " + U.esc(g.alt) + "</span></button></div>";
    }).join("");
    window.Anim.initReveal(grid);
  }

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".gallery-btn");
    if (!btn) return;
    opener = btn;
    show(Number(btn.getAttribute("data-i")));
  });

  /* ----- lightbox ----- */
  function show(i) {
    openIndex = (i + items.length) % items.length;
    var g = items[openIndex];
    boxBody.innerHTML = U.photo({ src: g.src, alt: g.alt, lazy: false }) + '<p class="lightbox__caption">' + U.esc(g.alt) + "</p>";
    box.classList.add("is-open");
    box.setAttribute("aria-label", g.alt);
    document.body.style.overflow = "hidden";
    box.querySelector(".lightbox__close").focus();
  }

  function close() {
    box.classList.remove("is-open");
    openIndex = null;
    document.body.style.overflow = "";
    if (opener) opener.focus();
  }

  box.addEventListener("click", function (e) {
    if (e.target.closest(".lightbox__close") || e.target === box) return close();
    if (e.target.closest(".lightbox__nav--prev")) return show(openIndex - 1);
    if (e.target.closest(".lightbox__nav--next")) return show(openIndex + 1);
  });
  document.addEventListener("keydown", function (e) {
    if (openIndex === null) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(openIndex - 1);
    if (e.key === "ArrowRight") show(openIndex + 1);
  });

  render();
})();

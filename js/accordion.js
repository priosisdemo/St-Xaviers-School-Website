/* ==========================================================================
   accordion.js — FAQ accordion (one open at a time, can collapse)
   Data: SITE.admission.faqs
   ========================================================================== */
(function () {
  "use strict";

  var host = document.getElementById("faq");
  if (!host) return;
  var U = window.U;

  host.innerHTML = window.SITE.admission.faqs.map(function (f, i) {
    return '<div class="accordion__item">' +
      '<h3><button class="accordion__trigger" type="button" id="faq-t' + i + '" aria-expanded="false" aria-controls="faq-p' + i + '">' +
      "<span>" + U.esc(f.q) + "</span>" + window.icon("chevron-down") + "</button></h3>" +
      '<div class="accordion__panel" id="faq-p' + i + '" role="region" aria-labelledby="faq-t' + i + '">' +
      '<div class="accordion__inner"><p>' + U.esc(f.a) + "</p></div></div></div>";
  }).join("");

  host.addEventListener("click", function (e) {
    var trigger = e.target.closest(".accordion__trigger");
    if (!trigger) return;
    var willOpen = trigger.getAttribute("aria-expanded") !== "true";
    host.querySelectorAll(".accordion__trigger").forEach(function (t) {
      var open = t === trigger && willOpen;
      t.setAttribute("aria-expanded", String(open));
      document.getElementById(t.getAttribute("aria-controls")).classList.toggle("is-open", open);
    });
  });
})();

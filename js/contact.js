/* ==========================================================================
   contact.js — Summer/Winter timings switch + "Send via WhatsApp" form
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var S = window.SITE;

  /* ----- timings switch ----- */
  var switchHost = document.getElementById("season-switch");
  var out = {
    school: document.getElementById("hours-school"),
    office: document.getElementById("hours-office"),
    recess: document.getElementById("hours-recess")
  };

  function setSeason(season) {
    var h = S.hours[season];
    out.school.textContent = h.school;
    out.office.textContent = h.office;
    out.recess.textContent = S.hours.recess;
    switchHost.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-selected", String(b.getAttribute("data-season") === season));
    });
  }
  switchHost.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-season]");
    if (btn) setSeason(btn.getAttribute("data-season"));
  });
  setSeason("summer");

  /* ----- form -> WhatsApp ----- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var message = form.elements.message.value.trim();
    var text = "Hello, I am " + name + " (Phone: " + phone + ").\n\n" + message;
    window.open("https://wa.me/" + S.school.whatsappNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  });
})();

/* ==========================================================================
   layout.js — Shared header, mobile menu, footer and WhatsApp button.
   Menu ya footer badalna ho to sirf data.js (nav / links) ya yahan edit karein;
   har page par apne-aap lag jaata hai.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  var esc = window.U.esc;

  function currentPage() {
    var file = location.pathname.split("/").pop() || "index.html";
    return file === "post.html" ? "blog.html" : file; // blog post -> Blog highlighted
  }

  var logo = window.U.logo;

  function navLinks(page) {
    return S.nav
      .map(function (n) {
        var current = n.href === page ? ' aria-current="page"' : "";
        return '<a href="' + n.href + '"' + current + ">" + esc(n.label) + "</a>";
      })
      .join("");
  }

  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var page = currentPage();
    host.outerHTML =
      '<header class="site-header" id="site-header">' +
      '<div class="container site-header__bar">' +
      '<a class="brand" href="index.html">' + logo("") +
      '<span class="brand__text"><span class="brand__name">' + esc(S.school.name) + "</span>" +
      '<span class="brand__sub">CBSE Affiliation No. ' + esc(S.school.affiliationNo) + "</span></span></a>" +
      '<nav class="main-nav" aria-label="Main">' + navLinks(page) + "</nav>" +
      '<button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">' +
      window.icon("menu") + "</button></div>" +
      '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile"><div class="container" style="padding-inline:0">' +
      navLinks(page) + "</div></nav></header>";

    var header = document.getElementById("site-header");
    var toggle = header.querySelector(".menu-toggle");
    var panel = header.querySelector(".mobile-nav");

    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = window.icon(open ? "x" : "menu");
      header.classList.toggle("is-solid", open || window.scrollY > 20);
    }
    toggle.addEventListener("click", function () { setOpen(!panel.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (e) { if (e.matches) setOpen(false); });

    function onScroll() {
      header.classList.toggle("is-solid", window.scrollY > 20 || panel.classList.contains("is-open"));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function socialLink(href, label, iconName) {
    return '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer" aria-label="' + label + '">' +
      window.icon(iconName, "icon-sm") + "</a>";
  }

  function footerLink(href, label, external) {
    return '<li><a class="footer-link" href="' + esc(href) + '"' +
      (external ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + label + "</a></li>";
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var sc = S.school, ln = S.links;
    host.outerHTML =
      '<footer class="site-footer"><div class="container footer-grid">' +
      "<div>" +
      '<div class="footer-brand">' + logo("logo--lg") + "<p>" + esc(sc.name) + "</p></div>" +
      '<p class="footer-about">' + esc(sc.tagline) + ". A CBSE-Affiliated, co-educational, English-medium school from " +
      esc(sc.classes) + ". " + esc(sc.group) + ".</p>" +
      '<div class="socials">' +
      socialLink(ln.facebook, "Facebook", "facebook") +
      socialLink(ln.instagram, "Instagram", "instagram") +
      socialLink(ln.youtube, "YouTube", "youtube") +
      "</div></div>" +
      '<div class="footer-col"><h3>Links</h3><ul>' +
      footerLink("index.html", "Home") + footerLink("about.html", "About Us") +
      footerLink("gallery.html", "Gallery") + footerLink("admission.html", "Admission") +
      footerLink("contact.html", "Contact Us") + "</ul></div>" +
      '<div class="footer-col"><h3>Others</h3><ul>' +
      footerLink("blog.html", "Blog") + footerLink("terms.html", "Terms &amp; Conditions") +
      footerLink("privacy.html", "Privacy Policy") +
      footerLink("mandatory-public-disclosure.html", "Mandatory Public Disclosure") +
      footerLink(ln.login, "Parent / Teacher Login", true) + footerLink(ln.app, "School App", true) +
      footerLink(ln.results, "CBSE Results", true) + "</ul></div>" +
      '<div class="footer-col"><h3>Contact</h3>' +
      '<p class="footer-contact">' + window.icon("map-pin") + esc(sc.address) + "</p>" +
      '<a class="footer-contact footer-contact--link" href="' + esc(sc.phoneHref) + '">' +
      window.icon("phone") + esc(sc.phones[0]) + "</a></div>" +
      "</div>" +
      '<div class="footer-bottom">© ' + new Date().getFullYear() + " " + esc(sc.name) + ". All rights reserved.</div>" +
      "</footer>" +
      '<a class="whatsapp-fab" href="https://wa.me/' + esc(sc.whatsappNumber) +
      '" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">' +
      window.icon("message-circle") + "</a>";
  }

  renderHeader();
  renderFooter();
})();

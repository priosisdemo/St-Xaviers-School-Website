/* ==========================================================================
   pages.js — Renders the data-driven lists on each page.
   Har function tabhi chalta hai jab uska container (id) page par ho.
   Data: js/data.js
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE, U = window.U, icon = window.icon;
  var $ = function (id) { return document.getElementById(id); };

  /* ----- About: large logo ----- */
  var aboutLogo = $("about-logo");
  if (aboutLogo) aboutLogo.innerHTML = U.logo("logo--xl");

  /* ----- Home: counters ----- */
  var stats = $("stats");
  if (stats) {
    stats.innerHTML = S.stats.map(function (s, i) {
      return '<div ' + U.rv("stat", i, 0.1) + '><p class="stat__value"><span data-count="' + s.value + '" data-suffix="' + U.esc(s.suffix) + '">' +
        s.value + U.esc(s.suffix) + '</span></p><p class="stat__label">' + U.esc(s.label) + "</p></div>";
    }).join("");
  }

  /* ----- Home: facilities (compact cards) ----- */
  var fac = $("facilities");
  if (fac) {
    fac.innerHTML = S.facilities.map(function (f, i) {
      return '<div ' + U.rv("facility lift", i) + '><span class="facility__icon">' + icon(f.icon) + "</span>" +
        "<h3>" + U.esc(f.title) + "</h3><p>" + U.esc(f.short) + "</p></div>";
    }).join("");
  }

  /* ----- Services: facilities (detailed cards) ----- */
  var facLg = $("facilities-detailed");
  if (facLg) {
    facLg.innerHTML = S.facilities.map(function (f, i) {
      return '<div ' + U.rv("facility facility--lg lift", i) + '><span class="facility__icon">' + icon(f.icon) + "</span>" +
        "<h2>" + U.esc(f.title) + "</h2><p>" + U.esc(f.description) + "</p></div>";
    }).join("");
  }

  /* ----- Home: notices ----- */
  var notices = $("notices");
  if (notices) {
    notices.innerHTML = S.notices.map(function (n, i) {
      return '<li ' + U.rv("notice lift", i) + '><span class="notice__icon">' + icon("calendar-days") + "</span>" +
        '<div><p class="notice__date">' + U.formatDate(n.date) + '</p><p class="notice__title">' + U.esc(n.title) + "</p></div></li>";
    }).join("");
  }

  /* ----- About: leadership + teachers ----- */
  var leaders = $("leadership");
  if (leaders) {
    leaders.innerHTML = S.leadership.map(function (l, i) {
      return '<div ' + U.rv("leader lift", i, 0.1) + ">" +
        U.photo({ src: l.photo, alt: l.name, person: true }) +
        "<div><h3>" + U.esc(l.name) + '</h3><p class="leader__role">' + U.esc(l.role) + "</p>" +
        '<p class="leader__msg">' + icon("quote") + "<span>" + U.esc(l.message) + "</span></p></div></div>";
    }).join("");
  }
  var teachers = $("teachers");
  if (teachers) {
    teachers.innerHTML = S.teachers.map(function (t, i) {
      return '<div ' + U.rv("teacher lift", i % 4, 0.06) + ">" +
        U.photo({ src: t.photo, alt: t.name + " (photo placeholder)", person: true }) +
        '<div class="teacher__info"><p class="teacher__name">' + U.esc(t.name) + '</p><p class="teacher__subject">' + U.esc(t.subject) + "</p></div></div>";
    }).join("");
  }

  /* ----- Admission ----- */
  var steps = $("steps");
  if (steps) {
    steps.innerHTML = S.admission.steps.map(function (s, i) {
      return '<li ' + U.rv("step lift", i) + '><span class="step__num">0' + (i + 1) + "</span><h3>" + U.esc(s.title) + "</h3><p>" + U.esc(s.text) + "</p></li>";
    }).join("");
  }
  var docs = $("documents");
  if (docs) {
    docs.innerHTML = S.admission.documents.map(function (d) { return "<li>" + icon("circle-check") + "<span>" + U.esc(d) + "</span></li>"; }).join("");
  }
  var streams = $("streams");
  if (streams) {
    streams.innerHTML = S.school.streams.map(function (s) { return '<span class="chip">' + U.esc(s) + "</span>"; }).join("");
  }

  /* ----- Blog list ----- */
  var blog = $("blog-grid");
  if (blog) {
    blog.innerHTML = S.posts.map(function (p, i) {
      return '<div ' + U.rv("", i % 4) + '><a class="post-card lift" href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
        U.photo({ src: p.image, alt: p.title + " cover image", cls: "ratio-169" }) +
        '<div class="post-card__body"><p class="post-card__date">' + U.formatDate(p.date) + "</p><h2>" + U.esc(p.title) + "</h2><p>" + U.esc(p.excerpt) + "</p></div></a></div>";
    }).join("");
  }

  /* ----- Single blog post (post.html?slug=...) ----- */
  var post = $("post");
  if (post) {
    var slug = new URLSearchParams(location.search).get("slug");
    var p = S.posts.filter(function (x) { return x.slug === slug; })[0];
    if (!p) {
      document.title = "Post not found | " + S.school.name;
      post.innerHTML = '<a class="back-link" href="blog.html">' + icon("arrow-left") + 'Back to Blog</a>' +
        '<h1>Post not found</h1><div class="article__body"><p>This post does not exist or has been moved.</p></div>';
      var robots = document.createElement("meta");
      robots.name = "robots"; robots.content = "noindex";
      document.head.appendChild(robots);
    } else {
      var title = p.title + " | " + S.school.name;
      document.title = title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", p.excerpt);
      [["og:title", title], ["og:description", p.excerpt]].forEach(function (pair) {
        var m = document.querySelector('meta[property="' + pair[0] + '"]');
        if (m) m.setAttribute("content", pair[1]);
      });
      post.innerHTML =
        '<a class="back-link" href="blog.html">' + icon("arrow-left") + "Back to Blog</a>" +
        '<p class="article__date">' + U.formatDate(p.date) + "</p><h1>" + U.esc(p.title) + "</h1>" +
        U.photo({ src: p.image, alt: p.title + " cover image", cls: "ratio-169", lazy: false }) +
        '<div class="article__body">' + p.body.map(function (b) { return "<p>" + U.esc(b) + "</p>"; }).join("") + "</div>";
    }
  }

  /* ----- Mandatory Public Disclosure ----- */
  var rows = $("disclosure-rows");
  if (rows) {
    var sc = S.school;
    rows.innerHTML = [
      ["Name of the School", sc.name], ["Affiliation No.", sc.affiliationNo], ["School Code", sc.schoolCode],
      ["UDISE Code", sc.udise], ["Complete Address", sc.address], ["Principal", sc.principal], ["Contact", sc.phones[0]]
    ].map(function (r) { return '<tr><th scope="row">' + U.esc(r[0]) + "</th><td>" + U.esc(r[1]) + "</td></tr>"; }).join("");

    var note = $("disclosure-note");
    if (S.links.disclosurePdf) {
      note.innerHTML = '<a class="btn btn--on-light" href="' + U.esc(S.links.disclosurePdf) + '">Download full disclosure (PDF)</a>';
    } else {
      note.textContent = "The complete disclosure document will be added here soon.";
    }
  }
})();

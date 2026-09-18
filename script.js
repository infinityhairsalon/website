(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after choosing a link (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 860px)").matches) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Gentle scroll-reveal, respects reduced motion
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".menu-card, .policy-card, .contact-card, .trust-strip li, .location-card"
  );

  if (!prefersReduced && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) { observer.observe(el); });
  }
})();

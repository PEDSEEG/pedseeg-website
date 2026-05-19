(function () {
  "use strict";

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Highlight current nav link
  const path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-menu a").forEach(function (link) {
    const linkPath = link.getAttribute("href").replace(/\/$/, "") || "/";
    if (linkPath === path) {
      link.setAttribute("aria-current", "page");
    }
  });

  // Contact form success state: when redirected back with ?sent=1,
  // show the thank-you message, hide the form, and clean up the URL.
  if (window.location.search.indexOf("sent=1") !== -1) {
    const successBox = document.getElementById("form-success");
    const contactForm = document.getElementById("contact-form");
    if (successBox) {
      successBox.style.display = "block";
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (contactForm) {
      contactForm.style.display = "none";
    }
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
})();

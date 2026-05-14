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
})();

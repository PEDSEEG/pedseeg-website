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

  // Highlight current nav link: the longest link path that matches, so a
  // case page lights up "Cases" and /es/casos/ lights "Caso del mes", not "Inicio".
  const path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
  let best = null;
  let bestLen = -1;
  document.querySelectorAll(".nav-menu li:not(.nav-lang) a").forEach(function (link) {
    const linkPath = link.getAttribute("href").replace(/\/$/, "") || "/";
    const matches = linkPath === path || (linkPath !== "/" && path.indexOf(linkPath + "/") === 0);
    if (matches && linkPath.length > bestLen) {
      best = link;
      bestLen = linkPath.length;
    }
  });
  if (best) best.setAttribute("aria-current", "page");

  // An explicit switch to English counts as declining the Spanish offer.
  document.querySelectorAll('a[hreflang="en"]').forEach(function (a) {
    a.addEventListener("click", function () {
      try { window.localStorage.setItem("palnet-es-banner", "dismissed"); } catch (e) { /* ignore */ }
    });
  });

  // Visitors whose browser's first language is Spanish, on an English page:
  // offer the Spanish version (the page's own hreflang="es" twin, else /es/).
  (function offerSpanish() {
    const pageLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    if (pageLang.indexOf("en") !== 0) return;
    const first = String((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase();
    if (first.indexOf("es") !== 0) return;
    try {
      if (window.localStorage.getItem("palnet-es-banner") === "dismissed") return;
    } catch (e) { /* storage blocked: just show it */ }

    let target = "/es/";
    const alt = document.querySelector('link[rel="alternate"][hreflang="es"]');
    if (alt) {
      try { target = new URL(alt.getAttribute("href"), window.location.href).pathname; } catch (e) { /* keep /es/ */ }
    }

    const bar = document.createElement("div");
    bar.className = "lang-banner";
    bar.setAttribute("lang", "es");
    bar.innerHTML =
      '<div class="container"><span>¿Prefiere leer en español? ' +
      '<a href="' + target + '">Ver PALNET en español →</a></span>' +
      '<button type="button" aria-label="Cerrar">×</button></div>';
    bar.querySelector("button").addEventListener("click", function () {
      bar.remove();
      try { window.localStorage.setItem("palnet-es-banner", "dismissed"); } catch (e) { /* ignore */ }
    });
    const header = document.querySelector(".site-header");
    if (header && header.parentNode) header.parentNode.insertBefore(bar, header);
  })();

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

# pedseeg.com — PALNET website

Public-facing site for the Pediatric Anesthesia Learning Network for EEG Technologies (PALNET). Hand-written static HTML/CSS/JS — no framework, no build step.

## File layout

```
pedseeg-website/
  index.html               # Home
  about/index.html         # About
  leadership/index.html    # Leadership committee
  education/index.html     # Education: videos, interactive tools, OR tables, literature
  cases/index.html         # Case of the Month
  cases/sample/index.html  # Case format sample (noindex)
  events/index.html        # Workshops + site-visit model
  events/genoa-2026/index.html  # Genoa 2026 workshop
  members/index.html       # Member institution directory
  sponsors/index.html      # Partners and collaborators
  contact/index.html       # Contact form (Netlify Forms)

  es/                      # Spanish twins of the 11 English pages:
    index.html             #   /es/
    nosotros/              #   /about/
    equipo/                #   /leadership/
    formacion/             #   /education/
    casos/  casos/ejemplo/  #   /cases/  /cases/sample/
    eventos/  eventos/genova-2026/  #   /events/  /events/genoa-2026/
    miembros/              #   /members/
    colaboradores/         #   /sponsors/
    contacto/              #   /contact/

  assets/
    css/styles.css         # Single stylesheet, CSS variables
    js/main.js             # Mobile nav, active link, Spanish-language offer, registration deadlines
    images/                # logo, committee photos, partner logos, table images, video thumbnails
    pdfs/                  # Table PDFs

  netlify.toml             # Netlify build + headers config
  _redirects               # Netlify redirects (www → apex is in netlify.toml)
  _headers                 # Netlify response headers
  robots.txt
  sitemap.xml
```

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Browse through every page; nav links use clean URLs (`/about/` etc.) which the Python server handles automatically. Nothing is counted in analytics on `localhost` (see below).

## Editing content

Every page is a self-contained `.html` file. To edit content, open the file and edit the markup directly. The header (`<header class="site-header">`) and footer (`<footer class="site-footer">`) are duplicated on each page — when changing nav links or footer info, update all 11 English pages and all 11 Spanish pages under `/es/` (Spanish nav and footer; copy from any `es` page). Every page has an EN | ES switch (`.lang-switch`) whose link must match that page's `<link rel="alternate" hreflang>` twin.

**`hreflang` on a link means "switch to this language".** Only language-switch links carry it (the EN | ES switch, the case-page language links and the footer "PALNET in English" link). `main.js` treats a click on any `hreflang="en"` link as declining the Spanish-language offer. A content link from a Spanish page to English-only material, such as a link marked "(en inglés)", never carries `hreflang`.

To add a case to the Case of the Month list, copy the markup in `.github/templates/case-list-item.html` into `/cases/` and `/es/casos/`, newest case first.

Theme colors are CSS variables at the top of `assets/css/styles.css`. To recolor the site, change `--accent` and friends in one place.

## Analytics

[GoatCounter](https://www.goatcounter.com/) (no cookies). Every page loads `count.js` at the end of `<body>`, with this guard on the line immediately before it:

```html
<script>if (location.hostname !== "pedseeg.com") window.goatcounter = Object.assign(window.goatcounter || {}, { no_onload: true, no_events: true });</script>
```

The guard stops page views and click events from being counted anywhere except `pedseeg.com` (deploy previews, `*.netlify.app`, `localhost`). GoatCounter records the path, not the host, so preview visits could not be filtered out afterwards. Every new page needs the guard before its `count.js` tag.

Click events (`data-goatcounter-click`) on the Education page:

| Event name | What it counts |
|---|---|
| `edu-video-ext-1` … `edu-video-ext-6` | The six EEG for Anesthesia video tiles (YouTube), in page order |
| `edu-channel` | Links to the EEG for Anesthesia channel |
| `edu-tool-wavecombinator`, `edu-tool-rotation3d`, `edu-tool-eegsandbox`, `edu-tool-edfviewer` | SmartTIVA interactive tools |
| `edu-pdf-<basename>` | Table PDF downloads |
| `edu-png-<basename>` | Table image downloads |
| `edu-png-view-<basename>` | Taps on a table figure to view the image |

`<basename>` is the file name without its extension, e.g. `edu-pdf-propofol-depth`. The Spanish page uses the same names with an `es-` prefix, e.g. `es-edu-channel`. Document a new event name here in the same commit that adds it.

## Deploying

1. Create a GitHub repo and push this directory.
2. In Netlify, "Add new site" → "Import from Git" → select the repo.
3. Build settings: leave **Build command** empty; **Publish directory** = `.` (root).
4. Deploy. Netlify gives you a `*.netlify.app` preview URL — confirm everything works.
5. In Netlify, add `pedseeg.com` and `www.pedseeg.com` as custom domains.
6. At Squarespace (domain registrar), update DNS:
   - A record (apex `@`) → Netlify's load-balancer IP (Netlify shows the current value)
   - CNAME (`www`) → your `*.netlify.app` subdomain
7. Wait for DNS propagation. Netlify auto-provisions a Let's Encrypt cert.
8. Enable "Force HTTPS" in Netlify domain settings.

## Contact form

The contact form uses **Netlify Forms**. As long as the form keeps `data-netlify="true"` and a hidden `form-name` input, Netlify auto-detects it on deploy. Submissions appear in the Netlify dashboard. To get email notifications:

1. Netlify → Forms → Settings → Notifications → add an email recipient.
2. Spam protection is built in via the honeypot field; consider adding reCAPTCHA later if needed.

## Accessibility / SEO checklist

Before launch:

- [ ] Run [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) on each page; target 90+ Performance / Accessibility / Best Practices / SEO.
- [ ] Run [axe DevTools](https://www.deque.com/axe/devtools/) and fix any critical issues.
- [ ] Submit the sitemap to Google Search Console.
- [ ] Verify HTTPS, www→apex redirect, and that every nav link works on every page.
- [ ] Test the contact form with a real submission and confirm the email arrives.

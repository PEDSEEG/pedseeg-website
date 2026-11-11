# pedseeg.com — PALNET website

Public-facing site for the Pediatric Anesthesia Learning Network for EEG Technologies (PALNET). Hand-written static HTML/CSS/JS — no framework, no build step.

## File layout

```
pedseeg-website/
  index.html               # Home
  about/index.html         # About
  leadership/index.html    # Leadership committee
  education/index.html     # Education hub: the learning path (videos, interactive tools, papers)
  education/tables/index.html   # Tables for the OR
  education/library/index.html  # Library: papers vetted by PALNET teachers
  cases/index.html         # Case of the Month
  cases/sample/index.html  # Case format sample (noindex)
  events/index.html        # Workshops + site-visit model
  events/genoa-2026/index.html  # Genoa 2026 workshop
  members/index.html       # Member institution directory
  sponsors/index.html      # Partners and collaborators
  contact/index.html       # Contact form (Netlify Forms)
  404.html                 # Bilingual "page not found" page (EN and ES blocks, noindex)

  es/                      # Spanish twins of the 13 English pages:
    index.html             #   /es/
    nosotros/              #   /about/
    equipo/                #   /leadership/
    formacion/             #   /education/
    formacion/tablas/  formacion/biblioteca/  #   /education/tables/  /education/library/
    casos/  casos/ejemplo/  #   /cases/  /cases/sample/
    eventos/  eventos/genova-2026/  #   /events/  /events/genoa-2026/
    miembros/              #   /members/
    colaboradores/         #   /sponsors/
    contacto/              #   /contact/

  assets/
    css/styles.css         # Single stylesheet, CSS variables
    js/main.js             # Mobile nav, active link, Spanish-language offer, registration deadlines, copy-link buttons
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

Every page is a self-contained `.html` file. To edit content, open the file and edit the markup directly. The header (`<header class="site-header">`) and footer (`<footer class="site-footer">`) are duplicated on each page — when changing nav links or footer info, update all 13 English pages and all 13 Spanish pages under `/es/` (Spanish nav and footer; copy from any `es` page), plus the bilingual `404.html` (English header and footer). Every page has an EN | ES switch (`.lang-switch`) whose link must match that page's `<link rel="alternate" hreflang>` twin.

**`hreflang` on a link means "switch to this language".** Only language-switch links carry it (the EN | ES switch, the case-page language links and the footer "PALNET in English" link). `main.js` treats a click on any `hreflang="en"` link as declining the Spanish-language offer. A content link from a Spanish page to English-only material, such as a link marked "(en inglés)", never carries `hreflang`.

To add a case to the Case of the Month list, copy the markup in `.github/templates/case-list-item.html` into `/cases/` and `/es/casos/`, newest case first.

Theme colors are CSS variables at the top of `assets/css/styles.css`. To recolor the site, change `--accent` and friends in one place.

## Education pages

Live Education URLs (each English page has its Spanish twin):

| English | Spanish |
|---|---|
| `/education/` (learning-path hub) | `/es/formacion/` |
| `/education/tables/` (Tables for the OR) | `/es/formacion/tablas/` |
| `/education/library/` (Library) | `/es/formacion/biblioteca/` |

Old links to `/education/#tables` and `/education/#literature` (and `/es/formacion/#tables`, `/es/formacion/#literature`) are forwarded to the Tables and Library pages by a short inline script in each hub's `<head>`, which holds that language's map. The hub keeps `id="tables"`, `id="literature"` and `id="simulations"` for visitors without JavaScript.

**Slugs and ids**
- English slugs are topic words, never numbers, so steps can be reordered without breaking a URL.
- Spanish slugs are Spanish words folded to ASCII (no accents, no ñ), e.g. `/es/formacion/biblioteca/`.
- Ids (anchors, section and card ids) are English in every language, e.g. `#tables`, so the same fragment works on both twins. Table card ids equal the asset basenames, e.g. `#propofol-depth`.
- A published slug never changes. If one ever has to, add a 301 in `_redirects`.

**When a step gets its own page**

A step gets its own page when its PALNET text is approved and it holds a cleared, PALNET-made teaching asset other than a table. Until then it stays a hub card.

**Adding a step**, in each language (English and Spanish in the same commit):
- the hub card and the path map on the hub;
- the Prev/Next links and the top "Next" line of its two neighbours;
- `sitemap.xml` (both twins, with en/es/x-default alternates);
- the forwarder map in the hub's `<head>`, if the step takes over an old hub anchor.

A new page also needs its own title, meta description and og tags, reciprocal `hreflang` en/es/x-default links, the EN | ES switch pointing to its twin, the nav and footer copied from a page of the same language, the Education bar (hub excepted), `main.js`, and the GoatCounter snippet with the guard (see Analytics).

**Phone-length budget.** Measure on every Education build with headless Chrome at 390×844 and 375×667, after fonts and images have loaded:
- the English pages with the browser language set to Spanish first, so the Spanish-offer banner shows;
- the Spanish pages.

The hub's `<main>` must be 4,220 px tall or less (five 844 px screens) in both languages, and no page may scroll sideways. The Tables and Library pages have no limit; their heights are recorded so that growth shows up.

| `<main>` height (px), 390×844 / 375×667 | English | Spanish |
|---|---|---|
| Hub | 3,800 / 3,929 | 4,049 / 4,158 |
| Tables | 7,268 / 7,423 | 7,904 / 8,628 |
| Library | 5,863 / 6,026 | 6,019 / 6,206 |

**Unapproved content stays off GitHub and Netlify.** The repository, its pull requests and its deploy previews are all public. Content that has not been approved never goes on a branch, a deploy preview, a branch name, a commit message, a PR title or body, or a preview comment. Commit it only after it has been approved.

## Analytics

[GoatCounter](https://www.goatcounter.com/) (no cookies). Every page loads `count.js` at the end of `<body>`, with this guard on the line immediately before it:

```html
<script>if (location.hostname !== "pedseeg.com") window.goatcounter = Object.assign(window.goatcounter || {}, { no_onload: true, no_events: true });</script>
```

The guard stops page views and click events from being counted anywhere except `pedseeg.com` (deploy previews, `*.netlify.app`, `localhost`). GoatCounter records the path, not the host, so preview visits could not be filtered out afterwards. Every new page needs the guard before its `count.js` tag.

Click events (`data-goatcounter-click`) on the Education pages:

| Event name | What it counts |
|---|---|
| `edu-video-ext-1` … `edu-video-ext-6` | Hub: the six EEG for Anesthesia video links (YouTube), in page order |
| `edu-tool-wavecombinator`, `edu-tool-rotation3d`, `edu-tool-eegsandbox`, `edu-tool-edfviewer` | Hub: SmartTIVA interactive tools |
| `edu-pdf-<basename>` | Tables page: table PDF downloads |
| `edu-png-<basename>` | Tables page: table image downloads |
| `edu-png-view-<basename>` | Tables page: taps on a table figure to view the image |

`<basename>` is the file name without its extension, e.g. `edu-pdf-propofol-depth`. The Spanish pages use the same names with an `es-` prefix, e.g. `es-edu-pdf-propofol-depth`. Document a new event name here in the same commit that adds it.

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

# pedseeg.com — PALNET website

Public-facing site for the Pediatric Anesthesia Learning Network for Emerging Technology (PALNET). Hand-written static HTML/CSS/JS — no framework, no build step.

## File layout

```
pedseeg-website/
  index.html               # Home
  about/index.html         # About
  leadership/index.html    # Leadership committee
  education/index.html     # Lectures, videos, literature
  events/index.html        # Workshops + site-visit model
  members/index.html       # Member institution directory
  sponsors/index.html      # Sponsors + collaborators
  contact/index.html       # Contact form (Netlify Forms)

  assets/
    css/styles.css         # Single stylesheet, CSS variables
    js/main.js             # Mobile nav toggle, active-link highlighting
    images/                # logo, committee headshots, sponsor logos
    pdfs/                  # Slide decks, papers

  netlify.toml             # Netlify build + headers config
  _redirects               # Netlify redirects (www → apex handled here too)
  _headers                 # Netlify response headers
  robots.txt
  sitemap.xml
```

## Local preview

```bash
cd ~/Desktop/AI\ Projects/pedseeg-website
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Browse through every page; nav links use clean URLs (`/about/` etc.) which the Python server handles automatically.

## Editing content

Every page is a self-contained `.html` file. To edit content, open the file and edit the markup directly. The header (`<header class="site-header">`) and footer (`<footer class="site-footer">`) are duplicated on each page — when changing nav links or footer info, update all 8 pages.

Theme colors are CSS variables at the top of `assets/css/styles.css`. To recolor the site, change `--accent` and friends in one place.

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

## What still needs real content

The pages are written with substantive content based on PALNET's existing materials, but a few things are placeholders to be filled in by the team:

- **Committee headshots** — `/assets/images/committee/` is empty. The leadership page renders coloured circles with initials as a fallback. Drop in `dk.jpg`, `iy.jpg`, etc. and swap the `<div class="person-photo">` with `<div class="person-photo"><img src="..."></div>`.
- **Sponsor logos** — currently shown as text boxes. Replace each `<div class="sponsor-logo-box">Medtronic</div>` with `<div class="sponsor-logo-box"><img src="/assets/images/sponsors/medtronic.svg" alt="Medtronic logo"></div>` once official logos are sourced (with permission).
- **YouTube videos** — the Education page has commented-out `<iframe>` blocks. When the ABCEEG and EEG-Guided TIVA lectures are uploaded (recommend `youtube-nocookie.com` embeds), uncomment and paste the video ID.
- **Slide deck PDFs** — `/assets/pdfs/ABCEEG-slides.pdf` and `/assets/pdfs/EEG-Guided-TIVA-slides.pdf` need to be added (or links removed if not OK to host publicly).
- **Full member directory** — the current member list is partial. Update `members/index.html` once Julia confirms the complete 2026 roster.
- **Contact email** — every page references `contact@pedseeg.com`. Configure this in Google Workspace and route to the right person on the leadership committee.
- **OG default image** — `/assets/images/logo.jpg` is used as the social-card image; consider creating a custom 1200×630 OG image for better social previews.

## Accessibility / SEO checklist

Before launch:

- [ ] Run [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) on each page; target 90+ Performance / Accessibility / Best Practices / SEO.
- [ ] Run [axe DevTools](https://www.deque.com/axe/devtools/) and fix any critical issues.
- [ ] Submit the sitemap to Google Search Console.
- [ ] Verify HTTPS, www→apex redirect, and that every nav link works on every page.
- [ ] Test the contact form with a real submission and confirm the email arrives.

## Future ideas (not built)

- Embedded world map showing member institutions (Leaflet + simple GeoJSON)
- Newsletter signup (Mailchimp/Buttondown)
- Members-only section with login (would need an auth provider — Auth0 or Netlify Identity)
- Spanish-language version for CSPA / Latin America
- Privacy-friendly analytics (Plausible, ~$9/mo) — currently no analytics installed

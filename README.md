# Empower Estates Network — Website

Static marketing site for Empower Estates Network LLC, live at
[empowerestatesnetwork.com](https://empowerestatesnetwork.com).

## Stack

- Plain HTML/CSS/JS — no build step.
- Hosted on **Netlify**, deployed automatically from the `main` branch of this repo.
- Contact/lead forms use **Netlify Forms** (`data-netlify="true"`); submissions appear in the Netlify dashboard under Forms.
- Animations: GSAP 3.12 + ScrollTrigger; carousels: Swiper 11 (both loaded from CDNs with Subresource Integrity hashes).
- Security headers are configured in `_headers` (Netlify header file).

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero video, featured properties, home-value form |
| `buy.html` | Buyer services + private-listings contact form |
| `sell.html` | Seller services + offer form |
| `Careers.html` | Internships/careers + application form (resume upload) |
| `about.html` | Founders / company story |
| `privacyinformation.html`, `termsofservice.html` | Legal |
| `404.html` | Custom not-found page (picked up automatically by Netlify) |

Shared assets: `variables.css`, `global-v2.css` (site-wide styles), per-page stylesheets,
`app.js` (nav + basic interactions), `animations.js` (GSAP scroll effects),
`motion-enhanced.js` (cursor, reveals, Netlify form AJAX + toast).

## Local development

```bash
# from the repo root — any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

Note: Netlify form submissions do not work locally (the POST endpoint only exists on Netlify).

## Deploying

Push to `main` — Netlify builds and deploys automatically.

## Updating CDN libraries

Script/stylesheet tags for Swiper and GSAP pin exact versions with `integrity` hashes.
To upgrade, change the version in the URL and regenerate the hash:

```bash
curl -s <new-cdn-url> | openssl dgst -sha384 -binary | openssl base64 -A
```

© EEN 2025. All Rights Reserved.

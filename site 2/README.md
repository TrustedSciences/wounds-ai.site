# Wound Solutions AI website (redesign)

This is a static redesign of woundsolutions.ai using a sand-and-ink theme. It has no build step, so any static host can serve it: GitHub Pages, Netlify, Cloudflare Pages or the client's own server.

## Structure

| Page | File | Source of content |
|---|---|---|
| Home | `index.html` | Current home page |
| Who we are | `about.html` | Current /about/ |
| Solutions (overview, WoundRounds, Wound QA) | `solutions.html` | Current /services/ |
| Solutions › How it fits together | `platform.html` + `assets/flow.js` | Interactive flow: WoundRounds → Wound Solutions AI → Clinical Wound Assessments |
| Solutions › WoundEye | `woundeye.html` | WoundEye sales demo training deck |
| Solutions › WoundEye for health plans | `woundeye-health-plans.html` | Medicare Advantage flyer and member story |
| Solutions › Pressure ulcer study | `pressure-ulcer-study.html` | Current /pressure-ulcer-study/ |
| Solutions › Wounds and liability | `wound-liability.html` | "Litigation in Post-Acute & Long-Term Care" research doc |
| Contact | `contact.html` | Current /contact/ |
| Privacy, Terms | `privacy.html`, `terms.html` | Placeholders. Copy the current legal text in before launch |

`assets/img/` holds web-optimised WebP copies of the woundrounds.com photography. The Solutions drop-down and the footer link out to www.woundrounds.com.

`assets/styles.css` holds the whole theme. All the colors and fonts are variables at the top of that file. `assets/site.js` runs the menu, the Solutions drop-down and the contact form.

## Typography

- Headings and reading text use **Cambria**. Where Cambria isn't installed, the page falls back to Caladea, a free font with the same measurements as Cambria, loaded from Google Fonts.
- Labels, navigation and buttons use **Atkinson Hyperlegible**, a sans typeface designed for low-vision readers.

## Publish on a temporary domain (GitHub Pages)

1. Create a repository and push the contents of this folder to `main`.
2. Go to Settings › Pages › Build and deployment, and set the source to `main`, folder `/ (root)`.
3. The site goes live at `https://<user>.github.io/<repo>/`. All links are relative, so the site works under a sub-path.

## Hand over to the client's domain

1. Add a `CNAME` file containing `www.woundsolutions.ai`, or set the domain in Settings › Pages.
2. At the DNS provider, point `www` at `<user>.github.io` with a CNAME record. Point the bare domain at GitHub's A records.
3. Add 301 redirects from the old WordPress paths to the new pages: `/about/` → `about.html`, `/services/` → `solutions.html`, `/pressure-ulcer-study/` → `pressure-ulcer-study.html`, `/contact/` → `contact.html`. GitHub Pages can't do server redirects. Use a host that can, such as Netlify `_redirects` or Cloudflare, or add small `about/index.html` pages with a meta refresh.

## Before launch: checklist

- [ ] **Contact form.** The form currently opens the visitor's email app, addressed to information@ or hello@woundeye.com. Connect it to a form service (Formspree, Netlify Forms or HubSpot) in `assets/site.js`.
- [ ] **Logo.** `assets/img/wsa-logo.webp` is the logo from the current site. Swap in a vector (SVG) version if the client has one.
- [ ] **Client-reported results** on `solutions.html` (79%, 71%, 62%, 46%, 8–10 hours, 35%). These come from the current site, which publishes no methodology. Get substantiation before relaunch.
- [ ] **Home-page stats.** The live site shows "0 Years / 0s Organizations / 0 Million Assessments", which looks like a rendering bug. The redesign leaves these out. Supply the real figures if you want them back.
- [ ] **Pressure ulcer study poster PDF.** Add the PDF to `assets/` and link it.
- [ ] **Privacy and Terms.** Copy in the current text.
- [ ] **Compliance review** of the WoundEye pages. The copy follows the deck's "say / don't say" list: no diagnosis claims, no FDA-clearance claims, no "fully HIPAA compliant", and "mobile device" rather than "phone". The FDA disclaimer appears on every page.
- [ ] **Photography licences.** `hero-carer.webp` and `nurses-tablet.webp` come from the current woundsolutions.ai (Adobe Stock 281864876 and 610434123). The other photos in `assets/img/` are copied from woundrounds.com: the clinicians, bedside, office and tablet images, plus the four leadership headshots. Confirm the client's stock licence covers use on a second domain. The CSS lightly warms the photos to suit the sand palette (`.photo img` in `styles.css`).
- [ ] **Analytics and cookie consent**, if the client uses them.

## Editing

Edit the HTML files directly. The header and footer appear on every page, so a change to either has to be made in each file. To change them everywhere at once, edit `build/build.py` and run `python3 build/build.py`, which regenerates every page from one template. Note that this overwrites the HTML files.

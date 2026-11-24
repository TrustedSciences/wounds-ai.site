# woundeye-ai.com

Rebuild of [woundeye.com](https://www.woundeye.com), deployed with Netlify at **https://www.woundeye-ai.com**.

## Structure

```
.
├── index.html        # Home page
├── 404.html          # Custom "not found" page
├── css/styles.css    # Site styles
├── js/main.js        # Site scripts
├── images/           # Photos, logos, icons
├── assets/docs/      # PDFs and other downloads
├── robots.txt
└── netlify.toml      # Netlify settings (publish dir, redirects, headers)
```

New pages go in the root as `page-name.html` (or `page-name/index.html` for clean URLs).

## Deployment

Netlify watches the `main` branch. Every push to `main` redeploys the live site automatically;
pull requests get their own preview URL.

- No build step — plain HTML/CSS/JS.
- Domain: `www.woundeye-ai.com` (primary), `woundeye-ai.com` redirects to it.

## Local preview

Open `index.html` in a browser, or run `npx serve .` from this folder.

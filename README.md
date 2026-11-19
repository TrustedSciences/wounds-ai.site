# Compared with Olio Health — wounds-ai.com/compare-olio

Static page comparing Wound Solutions AI with Olio Health, with the site's full
header (including the **Compare** dropdown), breadcrumb and footer.

## Publish

Put this `compare-olio` folder at the root of the site repository so the page is
served at **https://wounds-ai.com/compare-olio**. No build step or dependencies.
All menu links are absolute (`https://wounds-ai.com/...`), so the page also works
on its own, e.g. on GitHub Pages.

## Add the link to the Compare menu on the other pages

The live site's other pages don't know about this page yet. In the site's shared
header, add this item to the **Compare** dropdown, after "Compared with PointClickCare":

```html
<li><a href="/compare-olio">Compared with Olio Health</a></li>
```

Match the markup/classes your existing menu items use. Optionally add the same link
to the footer under "Compare platforms".

## Notes

- The logo is a text wordmark ("Wound Solutions AI"). Swap in your logo image tag
  if you prefer.
- Re-check the cited vendor pages before publishing; public materials change.
  Olio figures are vendor-reported and cited as published.

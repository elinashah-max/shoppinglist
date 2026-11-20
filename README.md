# Pin & Tell

A Pinterest-inspired shopping discovery site with curated edits, retailer searches, and a personal board for favorites and links from Pinterest, TikTok, and stores.

## Run locally

From the repository root, run `python3 -m http.server 8000 --directory dist`, then open http://localhost:8000. There is no build step or dependency installation.

The catalog lives in `dist/catalog.js`, with editorial images in `dist/assets/`. The shopping links lead to retailer searches for similar items. Favorites and manually added links are stored in the visitor’s browser.

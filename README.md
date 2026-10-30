# For you, bbe ♡

A responsive pink love letter with eight questions, a No button that hops between six fixed spots inside a rectangle, and a heart-confetti finale. Plain HTML, CSS, and JavaScript; no build or dependencies. Each Yes advances one screen and resets the buttons. Works with touch, mouse, and keyboard, and respects reduced-motion preferences.

## Add your pictures

Place two pictures in `assets/`, then edit the `photos` object at the top of `script.js`:

```js
const photos = { left: 'assets/us-1.jpg', right: 'assets/us-2.jpg' };
```

The two supplied photos are included. If photo paths are cleared, decorative illustrated cards are displayed. Images are cropped to fit the frames. Photos uploaded to a public GitHub repository and public Pages site will be publicly visible.

## Preview

Open `index.html` in your browser, or run `python3 -m http.server 4173` from this directory and visit http://localhost:4173.

## GitHub Pages

1. Commit and push these files to the repository’s `main` branch.
2. In GitHub, open **Settings → Pages → Build and deployment**, and choose **GitHub Actions** as the source.
3. Run **Actions → Deploy to GitHub Pages → Run workflow**, or push a new commit to `main`.
4. The deployment action reports the website URL (normally https://supun2001.github.io/sorry-bbe/ for this repository).

If using another default branch, update `.github/workflows/pages.yml` accordingly. All local asset paths are relative, so the site works under the repository subpath. Google Fonts is optional; system fallbacks work without it. No answers are stored or transmitted.

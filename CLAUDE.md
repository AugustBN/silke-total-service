# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Silke Total Service** — have‑ og ejendomsservice i Midtjylland (garden & property maintenance, central Jutland). Danish-language, public-facing brochure site.

## Stack & commands

This is a **plain static site** — vanilla HTML, CSS, and JS. There is no `package.json`, no bundler, no build step, no test runner.

- **Run locally:** open [index.html](index.html) directly in a browser, or serve the directory: `python3 -m http.server 8000` then visit `http://localhost:8000/`.
- **Deploy:** copy the repo root to any static host. Only `index.html`, `pages/`, `assets/`, `styles.css`, `script.js` need to ship. The `silke-total-service-design-system/` and `tools/` directories are dev-only.

`tools/ffmpeg` and `tools/ffprobe` are vendored binaries used to (re)encode the scroll-scrub video at [assets/videos/haek-scroll-scrub.mp4](assets/videos/haek-scroll-scrub.mp4). Don't commit large binary outputs back into `assets/videos/` without checking size.

## Architecture

Single shared stylesheet and single shared script power every page:

- [index.html](index.html) — homepage (hero, services grid, before/after compare slider, area, reviews, CTA, footer).
- [pages/service.html](pages/service.html) — Hækklipning service page; hosts the **scroll-scrubbed video** section (`#scrollvid`).
- [pages/om-os.html](pages/om-os.html), [pages/omraade.html](pages/omraade.html), [pages/kontakt.html](pages/kontakt.html) — secondary pages. `kontakt.html` has the multi-step quote form.
- [styles.css](styles.css) — design tokens (`:root` CSS vars) + every component class. Class prefixes are namespaced per section: `sth-` header, `sthero-` hero, `stsg-` service grid, `stba-`/`stcs-` before/after, `stas-` area, `strv-` reviews, `stcta-` CTA band, `stft-` footer, `stb-*` shared button/eyebrow primitives, `stqf-` quote form, `scrollvid-` video.
- [script.js](script.js) — one IIFE that progressively enhances anything it finds in the DOM. Each block is gated on the presence of an element ID, so adding a page is just adding the right markup.

### Key behaviors in [script.js](script.js)

1. **Header logo morph** ([script.js:8-53](script.js#L8-L53)): on scroll, the inline SVG `#logo-path` lerps from a blue waterdrop to a green leaf and the header gains `.sth-solid` past 80px. Pages that should skip this (interior pages with a solid header from load) add class `sth-static` to `<header>` — see [pages/service.html:13](pages/service.html#L13).
2. **Before/after compare slider** ([script.js:62-122](script.js#L62-L122)): wraps `#compare`. Auto-animates with a sine wave until first pointer interaction, then becomes drag-controlled.
3. **Scroll-scrubbed video** ([script.js:128-210](script.js#L128-L210)): `#scrollvid` is a tall section with a sticky `<video>`. `currentTime` is bound to scroll progress through a rAF lerp (factor `0.15`) so it feels smooth. **iOS / coarse-pointer / `prefers-reduced-motion` users get an autoplay-loop fallback** because Safari refuses to seek smoothly — don't remove this branch.
4. **Quote form** ([script.js:212-232](script.js#L212-L232)): `#quote-form` with `.stqf-pill` toggles concatenated into a hidden `services` input. Submit is intercepted and replaced with a `#quote-done` confirmation — there is no real backend wired up.

### Brand & content rules

This site is the production implementation of the design system in [silke-total-service-design-system/](silke-total-service-design-system/). Read [silke-total-service-design-system/project/README.md](silke-total-service-design-system/project/README.md) before changing visuals or copy. Hard rules from that doc:

- Danish copy only, **vi/du** register (informal). No "De".
- **No emoji.** Use Lucide-derived SVG icons in [assets/](assets/).
- **No overpromises** — avoid "altid", "100 %", "garanti", "bedst i…". Prefer concrete claims ("fast pris før vi starter").
- Forest green on cream. Bricolage Grotesque (display) + DM Sans (body), both via Google Fonts `@import` at the top of [styles.css](styles.css).
- Restrained motion: fade + small translate, ~600ms; no parallax, no springs, no bouncing.
- Border radius caps at 12px (16px absolute max).
- Sentence case everywhere except tiny eyebrow labels and the wordmark.

### Known placeholders

The site ships with **dummy contact data** — phone shows `-- -- -- --` in [index.html](index.html) and the footer; email is `--`. The only real external link is the Facebook page (`facebook.com/profile.php?id=61574788933190`). Reviews are tagged `eksempel` because they're not real testimonials. Don't invent real values; ask the user before filling these in.

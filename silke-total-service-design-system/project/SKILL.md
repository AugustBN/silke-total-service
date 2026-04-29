---
name: silke-total-service-design
description: Use this skill to generate well-branded interfaces and assets for Silke Total Service (have‑ og ejendomsservice i Midtjylland), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files. Key files:

- `README.md` — voice, tone, visual foundations, iconography, what-to-ask-the-client.
- `colors_and_type.css` — all design tokens (CSS vars). Import this in any HTML output.
- `assets/` — logo wordmark + circular mark, service icons (Lucide-derived), reference photos.
- `preview/` — small specimen cards for each foundation (colors, type, spacing, components).
- `ui_kits/website/` — full website UI kit: `index.html` (homepage), `pages/*.html`, JSX components, and `site.css` (component styles built on the tokens).

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need into the output and create static HTML files for the user to view. The website kit is a working starting point — clone it, swap copy, drop in real photos, and iterate.

If working on production code, the brand rules are: forest green on cream cream, Bricolage Grotesque (display) + DM Sans (body), Danish-only copy in informal "vi/du" register, no emoji, no overpromises, real photography over illustration, restrained motion (fade + small translate, 600ms), 12px max border radius. See `README.md` for the full ruleset.

If the user invokes this skill without other guidance, ask them what they want to build (homepage variant? new service page? print flyer? social media post?), ask 2–3 follow-ups (audience, length, services involved), then act as an expert designer who outputs HTML artifacts or production code as needed.

Heads-up — there are open items the client should resolve before going live:
- The wordmark in `assets/logo-wordmark.svg` is a placeholder.
- Phone/email/CVR/address are dummy values.
- Reviews are marked "eksempel" — not real testimonials.
- Two service icons (græsslåning, vinduesrens) are flagged as near-matches in `README.md`.

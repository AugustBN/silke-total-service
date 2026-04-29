# Silke Total Service — Website UI Kit

A high-fidelity recreation of the marketing site for Silke Total Service. All components live in this folder; `index.html` is the interactive homepage. Linked pages cover the requested scope.

## Pages

- `index.html` — homepage (hero, services, before/after strip, area, reviews, CTA, footer)
- `pages/service.html` — service detail (Hækklipning)
- `pages/om-os.html` — om os
- `pages/kontakt.html` — request a quote (formular)
- `pages/omraade.html` — service area / coverage map

## Components (`*.jsx`)

- `Header.jsx` — sticky navigation, mobile menu, top CTA
- `Hero.jsx` — full-bleed photo hero with title + dual CTA
- `ServiceGrid.jsx` — 6-up service cards using brand icons
- `BeforeAfter.jsx` — work strip / portfolio band using real photos
- `AreaSection.jsx` — service area with town list
- `ReviewsSection.jsx` — customer quotes
- `CTASection.jsx` — closing call-to-action band
- `Footer.jsx` — forest-green footer with contact info
- `QuoteForm.jsx` — 3-step inline quote form
- `PrimitiveButton.jsx` — buttons + link primitives shared

## Visual fidelity notes

- Uses tokens from `../../colors_and_type.css`.
- Imagery is the three reference photos. Where the design needs more variety, photos are reused with crops to keep the kit honest about its source set.
- No invented testimonials are attributed to real people — quotes are clearly marked as "eksempel".

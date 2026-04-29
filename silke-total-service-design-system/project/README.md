# Silke Total Service — Design System

> Have‑ og ejendomsservice i Midtjylland.

A design system for **SilkeTotalService**, a garden and property maintenance service operating in central Jutland (Midtjylland), Denmark. The system is built to support a marketing website that serves both private homeowners and property managers / housing associations, in Danish.

---

## Sources & references

This system was built from a very small starting point. There was **no codebase, Figma file, or existing logo** to work from. What we had:

- **Company description** (from the user): *"SilkeTotalService: Have‑ og ejendomsservice i midtjylland"* — a website for property and garden services, e.g. haveordning, hækklipning, fliserens, vinduesrens, etc.
- **Reference photos** in `assets/`:
  - `reference-hedge.png` — freshly trimmed beech hedge mid-job with a green tarp.
  - `reference-bushes.png` — privet/laurel hedge at the bare-soil base, sunlit grass.
  - `reference-collage.png` — collage of nine work shots (ladder hedge trim, paving driveways, pressure washing, kneeling prune, lawn vistas).
- A **Facebook page** mentioned by the user with before/after photos. *Not provided as a link, so not directly inspected.* If you have access, share screenshots or a URL so I can tighten the system.

> **⚠ Caveats — please read.** Because no real brand assets were provided, the logo wordmark, color palette, typography choices, and any UI copy in this system are **my best inference**. They are designed to be quickly swappable. See the bottom of this file for what to verify with the client.

---

## Services represented

The marketing site (and therefore the UI kit) covers six core services. These should be the navigation anchors and the "what we do" grid on the homepage.

| Service | DA | Notes |
|---|---|---|
| Garden maintenance | **Haveordning** | Recurring care — flagship offering |
| Hedge trimming | **Hækklipning** | Reference photo material; very visible service |
| Lawn mowing | **Græsslåning** | Recurring; can be bundled with haveordning |
| Paving cleaning | **Fliserens** | Seasonal; before/after photos work well |
| Window cleaning | **Vinduesrens** | Recurring; B2B + B2C |
| Snow clearing | **Snerydning** | Winter contract / on-call |

The site should make it easy for two audiences to self-identify quickly:

- **Privatkunder** (private homeowners)
- **Erhverv & boligforeninger** (businesses & housing associations)

---

## Index

```
.
├── README.md                  ← this file
├── SKILL.md                   ← agent skill manifest
├── colors_and_type.css        ← all design tokens (CSS vars)
├── fonts/                     ← (Google Fonts loaded via @import in CSS)
├── assets/
│   ├── logo-wordmark.svg      ← placeholder wordmark (NEEDS CLIENT REVIEW)
│   ├── logo-mark.svg          ← circular badge mark
│   ├── reference-hedge.png    ← original reference photo
│   ├── icon-*.svg             ← service icons (Lucide-derived, see ICONOGRAPHY)
│   └── pattern-*.svg          ← background motifs
├── preview/                   ← design-system tab cards
│   └── *.html
└── ui_kits/
    └── website/
        ├── README.md
        ├── index.html         ← interactive homepage
        ├── *.jsx              ← components
        └── pages/
            ├── service.html   ← Hækklipning service detail
            ├── om-os.html     ← About
            ├── kontakt.html   ← Quote request form
            └── omraade.html   ← Service area / coverage
```

---

## Content fundamentals

The voice is **friendly local craftsperson + reliable professional**. Imagine the conversation you'd have with someone who has known your hedges for ten years — warm, but punctual and tidy. The user explicitly asked: friendly and inviting, but also professional and reliable, and **never overpromising**.

### Voice rules

- **Pronoun:** Use **"vi"** (we) for the company and **"du"** (informal you) for the customer. Danish service brands lean informal; "De" would feel dated and cold. Headings can drop the pronoun entirely when it tightens the line.
- **Length:** Short sentences. Short paragraphs. Headlines under 8 words where possible.
- **Casing:** Sentence case throughout — including buttons and nav. ALL CAPS only on tiny eyebrow labels (e.g. "SERVICE I MIDTJYLLAND") and the wordmark.
- **No oversell.** Avoid "altid", "100 %", "garanti", "bedst i Midtjylland", "altid til tiden". Instead: "vi aftaler en fast tid", "vi rydder op efter os", "du får en fast pris før vi går i gang".
- **No emoji.** The brand is a working business — emoji breaks the trust register. Use icons instead.
- **Concrete over abstract.** "Hækken klippes ned til 1,80 m" beats "professionel højdetilpasning". Prices, frequencies, what's included — be specific.
- **Names of services in Danish, always.** Don't say "hedge cutting" — say "hækklipning". This is a Danish-language brand for a Danish-speaking audience.

### Examples

✅ **Good**

- *Hækken trænger til en tur. Vi kommer forbi.*
- *Vi klipper, samler op og kører væk. Du får en have der ser ud, som du gerne vil have den.*
- *Få en fast pris inden vi starter — uden bindinger.*
- *Ring 30 XX XX XX. Vi svarer typisk samme dag.*

❌ **Avoid**

- *Vi er altid de bedste til hækklipning i hele Midtjylland!* (overpromise + ALL CAPS energy)
- *Premium total service excellence* (English / corporate)
- *🌿 Din have fortjener det bedste! 🌳* (emoji + cliché)
- *Vores team af certificerede eksperter…* (corporate distance)

### Microcopy bank (use these patterns)

- **Calls to action:** "Få et tilbud", "Bestil et besøg", "Ring og spørg", "Send en besked"
- **Reassurance line under forms:** "Vi vender tilbage indenfor 1–2 hverdage."
- **Empty states / placeholders:** "Skriv kort hvad du har brug for — fx ‘100 m bøgehæk, klippes 2× om året’"
- **Service area phrasing:** "Vi kører primært i …" *(not "Vi dækker hele Jylland" — concrete > sweeping)*

---

## Visual foundations

The visual system is rooted in the reference photo: a sunlit beech hedge against blue sky, with a working green tarp on warm asphalt. **Deep, slightly desaturated green is the protagonist.** Sky blue is a sparing accent. Cream/off-white is the canvas. Everything else is earned.

### Color

The full token set lives in `colors_and_type.css`. Headlines:

- **Forest** `#1F3A2C` — primary brand green, almost black-green. Headlines, primary buttons, footer.
- **Hedge** `#3B6B45` — mid green for accents, hover states, link underlines.
- **Spring** `#7FA66B` — fresh green, used sparingly for highlights (small badges, success states).
- **Sky** `#A8C8DD` — washed-out spring sky blue, used as a tertiary accent and on background panels.
- **Cream** `#F5F1E8` — primary page background. Warmer than white, evokes paper / stucco wall.
- **Bone** `#FFFDF7` — surface / card background.
- **Bark** `#3A2E22` — body text. Warmer than pure black.
- **Stone** `#8A8578` — secondary text, borders.

The combination is **warm-cool**: cool greens in the foreground, warm cream in the background. Avoid pure white and pure black anywhere — it shatters the warmth.

### Type

- **Display:** **Bricolage Grotesque** (variable, opsz 12–96). A humanist grotesque with optical-size variation that grows softer at large sizes. Reads as modern Scandinavian — confident, capable, friendly without going boutique. Used for h1/h2/h3.
- **Body & UI:** **DM Sans**. Clean humanist geometric — readable, friendly, warmer than Inter. Weights 400/500/700.
- **Eyebrow / labels:** DM Sans 500, tracked +0.08em, ALL CAPS, small.

> **⚠ Font substitution flag.** No fonts were provided by the client. Both Bricolage Grotesque and DM Sans are loaded from Google Fonts. The pairing is chosen to read as modern-Scandinavian-trades (think the typographic register of brands like Too Good To Go, Pleo, Vipps) — confident and capable but warm. **If the client has existing print materials, vehicle livery, or signage, please share photos so I can match.**

### Spacing & rhythm

Spacing scale uses a 4px base, exposed as `--space-1` through `--space-16`:

```
4 8 12 16 24 32 48 64 96 128
```

Section padding on desktop: `--space-12` (96px) top/bottom. Mobile: `--space-8` (48px). Generous — let things breathe like a well-kept lawn.

### Backgrounds, imagery & motifs

- **Photography is the hero.** Real before/after, real hedges, real vans, real teams. **No stock people in suits.** No illustrations of trees. Imagery should be warm and slightly green-leaning, mid-afternoon light. Avoid winter desaturated unless on the snerydning page.
- **Full-bleed photo hero** on homepage and service pages.
- **Rough hand-cut paper edge motif** (subtle SVG, `assets/pattern-edge.svg`) used as a divider between sections. Keeps the brand grounded — paper, hands, working with your hands.
- No gradients. No glassmorphism. No drop shadows on photographs. No emoji.
- A single **fine-line botanical hairline** (a single beech-leaf silhouette) is allowed as a small mark in footers and section dividers. Used like a punctuation mark, not as decoration.

### Animation

- **Restrained.** Fade + 4–8px translate on scroll-in (`cubic-bezier(0.22, 1, 0.36, 1)`, 600ms). That's the system motion.
- Hover states: 150ms ease-out, color only (no scale).
- No bounces. No springs. No parallax. No video backgrounds.

### States

- **Hover** on buttons: background steps **darker** by ~8% L (forest → near-black green). Text stays.
- **Hover** on links: underline thickens from 1px to 2px, color shifts to `--hedge`.
- **Press:** translate Y +1px. No shrink/scale.
- **Focus ring:** 2px `--spring` outline with 2px offset. Visible, never removed.
- **Disabled:** 40% opacity. Cursor not-allowed.

### Borders, radii, shadows

- **Radii:** 4px on inputs and small chips, 8px on buttons, 12px on cards, 0px on full-bleed photo containers. **Never above 16px** — the brand isn't bubbly.
- **Borders:** 1px solid `--stone` at 25% opacity for card edges. Buttons have no border (filled) or 1.5px solid (ghost).
- **Shadows:** Used sparingly. One elevation level only:
  - `--shadow-card`: `0 1px 2px rgba(31, 58, 44, 0.06), 0 8px 24px rgba(31, 58, 44, 0.05)` — gentle, green-tinted.
- No inner shadows. No glow.

### Layout rules

- **Max content width:** 1200px (`--container-max`), centered with `--space-6` gutter (24px).
- **12-column grid** on desktop, **4-column** on mobile, 24px gutters.
- **Sticky header**, transparent over hero, solid `--cream` after 80px scroll (background only animates, no slide).
- **Footer is forest**: `--forest` background, cream text — anchors the page.

### Transparency & blur

- Header background uses a subtle backdrop-blur (10px) when transitioning over the hero, dropping to opaque cream after.
- Otherwise no blur. No translucent cards. No frosted overlays.

### Cards

A card is: `--bone` background, 12px radius, 1px `--stone-25` border, `--shadow-card`, internal padding `--space-6` (24px). That's the recipe — don't deviate. Service cards add a small icon at top, an h3, two body lines, and a "Læs mere →" link. No "explore plus button" or arrow circles.

---

## Iconography

- **Icon library:** **Lucide** (`https://unpkg.com/lucide@latest`). Stroke-based, 1.5px stroke, 24×24 viewBox, rounded line caps. Matches the friendly-but-clean brief and is freely available.
- **Why Lucide:** consistent stroke weight, large catalog, and the rounded caps read as "approachable craftsmanship" rather than "tech startup".
- **Service icons (`assets/icon-*.svg`)** are Lucide icons copied in and lightly mapped to our services. Specifically:
  - `icon-haveordning.svg` → Lucide `sprout`
  - `icon-haekklipning.svg` → Lucide `scissors`
  - `icon-graesslaaning.svg` → Lucide `wind` (no perfect match — flag)
  - `icon-fliserens.svg` → Lucide `sparkles`
  - `icon-vinduesrens.svg` → Lucide `square` (custom small modification — flag)
  - `icon-snerydning.svg` → Lucide `snowflake`
- **No emoji. No unicode glyphs as icons.** A "→" arrow inside a button is fine; that's typography, not an icon.
- **No SVGs are hand-drawn for this system.** Every icon is either copied from Lucide or marked as a placeholder needing client input.

> **⚠ Substitution flag — graesslaaning + vinduesrens.** Lucide doesn't have a perfect "lawnmower" or "squeegee". I've used near-matches; if these feel off, I can swap to a custom SVG once the client confirms the visual direction.

---

## Logo

**No logo was provided.** The wordmark in `assets/logo-wordmark.svg` is a placeholder built from Fraunces + a single beech-leaf mark, designed to be plausible as the real thing while leaving room for the client's actual identity.

> **⚠ This must be replaced before going live.** It's set up to be drop-in swappable — the SVG sits at `assets/logo-wordmark.svg` and is referenced from the header component.

---

## UI kits

- `ui_kits/website/index.html` — interactive homepage (hero · services · work strip · area · reviews · CTA · footer).
- `ui_kits/website/pages/service.html` — service detail (Hækklipning).
- `ui_kits/website/pages/om-os.html` — Om os.
- `ui_kits/website/pages/kontakt.html` — Kontakt with a 3-step quote form.
- `ui_kits/website/pages/omraade.html` — Område / coverage with a stylised Midtjylland map.

Component JSX files live next to the kit's `site.css`. They are deliberately cosmetic — fast to read, fast to swap.

## What I need from you (to make this perfect)

This is the part where I need your help. The system is opinionated but it's working from very limited input. Please:

1. **Logo** — share the real one if it exists, or tell me to keep iterating on the placeholder.
2. **Photos** — the Facebook before/after photos. Even 5 of them changes the feel of the homepage entirely.
3. **A real phone number, email, address, and service area** — so I can replace the dummy data.
4. **Any existing copy** — taglines, "om os" text, prices, frequencies. Anything you've written for marketing already.
5. **Approval (or pushback) on:**
   - The forest-green-on-cream palette
   - Fraunces + DM Sans pairing
   - The "vi / du" voice register and the no-emoji / no-overpromise rule
6. **CVR number** (for the footer — Danish business legal requirement).

Once those land I can tighten everything and we'll have a system that actually represents Silke Total Service.

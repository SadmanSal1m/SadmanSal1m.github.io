# DESIGN.md

## Conceptual thesis

**The portfolio itself is almost uncoloured. Every drop of colour on the page belongs to a product.**

Sadman's proof is three genuinely different mobile products. So the site is built as a small exhibition: a quiet porcelain-and-ink shell, one continuous "rail" that runs through the whole page like a gallery guide-line, and three rooms — Play (NaqiVerse), Operate (AIMARA), Cook (Grocs) — each of which temporarily takes over the page's accent, surface and motion language using the **real palette extracted from that app's own source and screenshots**. The signature hero is a three-device constellation sitting on the same rail.

This implements the supplied leading concept ("Three Pocket Worlds — Systems in Motion") with two grounded corrections from the source material, recorded here per the brief's conflict rule:

1. **AIMARA is crimson, not mineral blue.** The shipped theme (`variables.scss`) is built on `#C8102E` crimson over `#141414` graphite. The brief's "mineral blue" was a *possible* world; the real one is stronger and more distinctive (crimson signal on smoked graphite avoids every generic cyber-blue cliché).
2. **Grocs is basil-noir and rice-paper, not tomato-and-olive.** The current build (screenshots outrank the older README) ships six themes — basil noir (default), dragonfruit, ultraviolet, deep sea, oat milk, rice paper — a near-black surface with a mint-basil accent and a lowercase wordmark. The Grocs room uses the app's own *rice paper* light surface with basil ink accents and noir device frames.

## Three explored directions

**A. "Three Pocket Worlds — Editorial Exhibition"** (leading concept, corrected as above). Quiet porcelain/ink shell, one rail motif, three product rooms with real product palettes, 3D device constellation hero that resolves into the work section.

**B. "Engineering Ledger."** Flat broadsheet: hairline rules, mono marginalia, screenshots pinned like specimens, no 3D. Extremely clear and fast; typography does all the work.

**C. "Signal Garden."** Dark systems-diagram world; animated packet paths connect hero to projects; every project is a node on a network.

| Criterion | A | B | C |
| --- | --- | --- | --- |
| Memorability | 9 | 6 | 7 |
| Relevance to the work | 9 | 7 | 6 |
| Client clarity | 8 | 9 | 5 |
| Conversion potential | 8 | 7 | 5 |
| Accessibility | 8 | 9 | 6 |
| Mobile suitability | 8 | 9 | 6 |
| Performance feasibility | 7 | 10 | 6 |
| Originality | 9 | 6 | 6 |
| **Total** | **66** | **63** | **47** |

**Chosen: A**, borrowing B's typographic discipline (hairlines, mono marginalia, restrained flat sections) for everything outside the hero and the three rooms. C's one good idea (a travelling signal packet) survives as AIMARA's small delight. Self-check against the generic-default test: a generic answer to this brief would be a dark page, Space Grotesk, purple/blue accent, tilted phone mockups in a grid, and counters. Direction A shares none of those; its base is a *near-monochrome light* shell whose only colours are extracted from the three real apps, and its signature (rail + constellation) encodes the actual content structure.

## Signature interaction

The **rail-and-constellation**: a single hairline that begins as the elliptical orbit under three floating device slabs in the hero, then runs down the page as the exhibition guide-line with numbered stations (01 PLAY · 02 OPERATE · 03 COOK — numbering is honest: the work section is an ordered walk). On scroll, the hero devices drift along the rail and hand off to the DOM device frames of the first room; the rail carries a scroll-progress node the whole way. Pointer moves the constellation a few degrees; hover/focus on a device (or on its always-present DOM chip) lifts it and reveals title + one-line value; select previews a real screenshot large. Mobile replaces the canvas with the same DeviceFrame components in a lightly tilted static cluster; reduced motion gets a static composition and crossfades. Every project name/link exists in HTML regardless of WebGL.

## Colour logic

Shell (semantic tokens; all colour below is derived from app sources — file references in comments in `theme.css`):

- `--porcelain` #F3F1EB (warm plaster, slightly grey — deliberately off the AI-cream cliché)
- `--porcelain-deep` #EAE7DF (tinted panels)
- `--ink` #14181B · `--ink-soft` #4C5257 · `--ink-faint` #8A8F92
- `--line` rgba(20,24,27,.14) hairlines · on ink: rgba(243,241,235,.16)

Rooms (each sets `--accent`, `--accent-ink`, `--room-surface`, `--room-wash`):

- **NaqiVerse** — blush `#E27FA6`, amber `#E8A33D`, butter `#FFD66B`, ember `#3A1A14` (from `src/theme/colors.ts` + Ember screenshots). Room surface: porcelain washed `#FAF1EC`.
- **AIMARA** — crimson `#C8102E`, rose `#ED6377`, graphite `#141414`, smoke `#1E1E20` (from `variables.scss`). Room surface: graphite.
- **Grocs** — basil `#33A860`, mint `#57CE86`, noir `#0C1620`, rice `#F4F2EA` (from `palettes.ts` + theme-picker screenshot). Room surface: rice paper; device frames noir.

Contrast: every text/surface pair ships with a unit test asserting WCAG AA (≥ 4.5:1 body, ≥ 3:1 large); accents are never used for body text on light without their `-ink` deepened variants (`#8C1622` crimson-ink, `#1C6E38` basil-ink, `#8C3B12` amber-ink, `#B0416F` blush-ink).

## Type hierarchy

- **Display: Outfit** (variable, optical size high for display cuts) — headlines, room titles, big numerals. Weights 500–700, tracking −0.5 to −1.5 % at display sizes, leading 0.98–1.05.
- **Body: Outfit** (variable) — 17 px/1.55 (mobile 16), `max-width: 65ch`, weights 400/600.
- **Utility: Outfit** — eyebrows, captions, meta rows, tags, figures. 11–13 px, uppercase eyebrows at +0.14 em tracking; `tabular-nums` for data.

Scale: 12 / 13.5 / 15 / 17 / 21 / 28 / clamp(34→56) / clamp(44→92). Max two families per block; kerning + `optimizeLegibility` on; curly quotes, real dashes and `&hairsp;`-free spacing enforced site-wide.

## Spacing system

4 px base. Section rhythm `clamp(4.5rem, 10vw, 8.5rem)`; intra-block steps 8/12/16/24/32/48. Content grid: 12-col, max 1200 px, 24 px gutters; the rail owns a fixed 56 px left gutter ≥ 1024 px. Generous negative space around the headline, the takeaway lines, and both CTA moments.

## Material and texture rules

Paper grain (SVG turbulence, 2.5 % opacity, `mix-blend: multiply`) on porcelain; 3.5 % lighten grain on ink. No CSS backdrop-blur anywhere; "smoked glass" exists only as the AIMARA device *material* (3D/photographic), never as UI chrome. One drop shadow in the whole system: the grounded device shadow. Everything else is hairlines and fills.

## Border-radius logic (varied geometry, encoded)

- Chrome, cards, rules, diagrams: **2 px** (editorial, sharp).
- Buttons: **10 px** (touchable, distinct from chrome).
- Tags/chips: **999 px** (small, orbital — echoes the rail nodes).
- Device frames: **7.5 % of width** continuous corners (the one lush radius: "the product lives in the device").

## Shadows and depth

Devices: `0 24px 48px -24px rgb(20 24 27 / .35)` + tight contact shade. 3D: single `ContactShadows`. Nothing else casts.

## Motion principles

One orchestrated moment (hero settle → rail draw), then quiet. Durations 380–700 ms, `cubic-bezier(.22,.8,.24,1)`; hover lifts ≤ 6 px; magnetic pull ≤ 10 px, desktop pointer-fine only. Scroll reveals are staggered translate-8px+fade used *sparingly* and only where sequence matters; no scroll-jacking; native anchors preserved. Per-room delights: NaqiVerse — one draggable, softly springy fruit sprite (real `circle*.png` asset); AIMARA — a packet travelling a sanitised channel diagram; Grocs — a recipe card whose ingredient chips sort themselves into pantry/shopping. All are decorative, skipped under reduced motion, never carry information.

## Responsive behaviour

Breaks at 640 / 768 / 1024 / 1280. ≥ 1024: rail gutter + canvas hero. < 1024: rail becomes tick-labelled eyebrows + a 2 px top progress bar; hero becomes the DeviceFrame cluster (static tilt, swipeable on touch); room device clusters stack with overlap reduced; meta rows wrap to definition pairs. Touch targets ≥ 44 px; no hover-only content anywhere.

## Reduced-motion behaviour

`prefers-reduced-motion` (and the visible "Static mode" control in the footer, persisted) → canvas never mounts; crossfades ≤ 200 ms replace all transforms; delights render as static illustrations; videos (if ever added) show poster + controls. Designed, not degraded: the static hero is a composed cluster, not an empty box.

## Screenshot presentation rules

Real pixels only, never redrawn; abstract bezels (no trademark hardware); max tilt 6° and any tilted shot is one click/tap from a flat lightbox view; captions connect each screen to a decision; AIMARA gallery carries the anonymisation note; 8–12 screens per room ordered as product journeys; AVIF/WebP with responsive sizes and intrinsic dimensions (zero CLS).

## 3D quality levels

- **High** (desktop, `PerformanceMonitor` happy): transmission on the NaqiVerse slab, env reflections, contact shadows, DPR ≤ 1.75.
- **Medium**: standard materials + env, DPR ≤ 1.25.
- **Low**: flat-lit standard materials, no shadows, DPR 1.
- **Static**: DOM DeviceFrame cluster (also the mobile, reduced-motion, WebGL-fail and Save-Data state, and user-selectable).
`frameloop="demand"`; invalidate on pointer/scroll only; suspend off-viewport and on `document.hidden`; shared geometry/materials; screen textures are dedicated ≤ 512 px WebP files, never the gallery images.

## Explicit anti-patterns (checked against final build)

No rotating globe · no chrome blobs · no astronaut · no particle fields · no purple-on-white gradient · no glass-card fields · no fake terminal · no developer-desk scene · no logo wall · no stock photography · no copied Awwwards layout · no Inter/Roboto/Arial/Space Grotesk/system-default type · no skill bars · no animated vanity counters · no pill-wrapped nav items · no identical-card project grid · no hover-only or canvas-only information · no intro gate before content.

## React Bits usage (§15 audit)

Catalogue reviewed against this system; **two** free components adapted (source vendored with licence header per the project's documented installation model, re-tokened to this design):
1. **Magnet** — restrained magnetic response on the two primary desktop CTAs only.
2. **MagnetLines** — pointer-reactive line field, re-coloured to crimson-on-graphite at low opacity, as the AIMARA case-study hero texture (the "signal field").
If licence verification fails at vendoring time, equivalent effects are written from scratch and this section is updated — the visual spec above stands either way.

## Wireframes

Desktop home:
```
|rail| MOBILE PRODUCTS · REAL-TIME SYSTEMS · APPLIED AI          [Work Services About Resume | Hire me]
|  ● | Mobile products, real-time                ┌─────────────────────────────┐
|  | | systems and applied AI —                  │      ◜ orbit rail ◝         │
|  | | built end to end.                         │   [NQ]    [AM]▲   [GR]      │
|  | | One supporting sentence.                  │  slab     slab    slab      │
|  | | [Explore selected work] [Hire on Fiverr]  └─────────────────────────────┘
|  | | (chips: NaqiVerse · AIMARA · Grocs)   GitHub ↗
|  ├─ proof rail: 3 products · SE + AI (IIUM) · JIIICaS Gold · published CV research
|01|— PLAY ————————————————————————————————————————————————————————————————
|  | NaqiVerse           [device][device]     tags · takeaway · View case study →
|02|— OPERATE (ink surface) ——————————————————————————————————————————————
|  | AIMARA …
|03|— COOK (rice surface) ————————————————————————————————————————————————
|  | Grocs …
|  |— Services (4, each → proof)   — How I work (5)   — Capability map (6 groups)
|  |— Experience & recognition timeline   — About preview (monogram)
|  ●— Final CTA (ink): "Have a mobile product… ?"  [Hire me]  [GitHub] [Copy email]
```
Mobile home: same order; rail → top progress bar; hero = tilted DeviceFrame cluster above copy; chapters stack; meta rows become stacked pairs.

Desktop project page:
```
|rail| ← Work        AIMARA — AI-Assisted Aftersales Operations Platform
|  ● | promise · category/role/platform meta · [confidentiality label]
|  | | [hero device composition on room surface]
|  | | At-a-glance (problem / contribution / stack / proof)
|  | | Context → Challenge → Core experience (journey w/ captions)
|  | | What I built (5 lanes) → Key decisions (3–5) → Under the hood (SVG) [+details]
|  | | Screen gallery (lightbox, flat view) → Quality/privacy/a11y → Current proof
|  | | Technology → What this enables for clients → Next project ↓
```
Mobile project page: single column, gallery becomes swipe row + lightbox, diagram scales with horizontal scroll guard.

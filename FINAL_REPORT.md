# Final Report — Sadman Taseen Portfolio

Built autonomously as a full production package: site, content, privacy-edited
media, tests, documentation and a complete Fiverr starter pack. This report
states exactly what was verified in this environment, what is delivered
ready-to-run, and what needs the owner's hand before deploy.

---

## What was delivered

**The site.** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript,
with motion, React Three Fiber and Radix UI. Eleven routes, all prerendered:
home, three case studies (`/work/naqiverse`, `/work/aimara`, `/work/grocs`),
about, resume, 404, sitemap, robots, icons. The concept is "one exhibition,
three rooms": a porcelain gallery shell (Bricolage Grotesque / Hanken
Grotesk / Spline Sans Mono, hairline borders, film grain, a scroll rail with
numbered stations) that re-themes per project — blush for NaqiVerse, crimson
on graphite for AIMARA, basil on rice for Grocs — via `data-room` /
`data-surface` tokens only.

**The hero.** A real-time 3D constellation of the three products (R3F,
demand frameloop — renders during the opening settle and on pointer
movement, near-zero cost idle; PMREM room environment, no network assets;
quality self-degrades via PerformanceMonitor). It mounts only on ≥1024 px
viewports with WebGL and no Save-Data; everyone else — including
reduced-motion and the site's own "Motion: Static" footer toggle, persisted
and applied pre-paint — gets a composed static constellation with the same
accessible project-chip navigation, which is always in the DOM.

**Case studies.** A fourteen-section template driven entirely by typed
content: hero with role/platform meta (and a confidentiality banner +
anonymisation note for AIMARA), at-a-glance grid, context, challenge, a
captioned screenshot walkthrough, work by lane, decisions *with their
trade-offs*, an accessible hand-drawn SVG architecture diagram per project,
deeper technical notes, a keyboard-complete lightbox gallery, quality and
current-proof lists, technology rationale, "what this enables for you" with
a hire aside, and next-station navigation. Plus the compact DentXpert
research module, services, process, capability map, timeline, about preview
and final CTA on the home page.

**Honest-by-construction content.** All copy lives in `src/content/` and was
written strictly from the audited sources (`docs/SOURCE_OF_TRUTH.md`,
`docs/CONTENT_AUDIT.md`). Unverifiable claims from source READMEs were
excluded; unknown facts (Devco dates, IIUM year, publication venue) are
omitted, not guessed, and tracked in `docs/CONTENT_GAPS.md`. While no Fiverr
URL exists, every hire CTA falls back to email with a "Fiverr profile coming
soon" note; setting `fiverrUrl` flips all of them at once.

**Privacy-edited media.** 29 curated screenshots published as EXIF-stripped
WebP with a typed manifest and blur placeholders. AIMARA and NaqiVerse
screens carry gradient-matched inpainting with redrawn text and avatars —
synthetic channel names, handles, emails and message bodies; the complete
mapping and technique live in `docs/PRIVACY_REDACTION_CHECKLIST.md`, and
every published image's provenance and exact edits are ledgered in
`ASSET_MANIFEST.md`. Pre-redaction originals are deliberately absent from
the repo. OG cards for all six sharable routes plus the apple icon are
generated in the brand style by `tools/og/build-og.py`.

**Fiverr pack** (`fiverr-assets/`). Nine 1280×769 gig images (three per
project, brand style, low text), profile bio + tagline + skills, three
portfolio project descriptions with tags and upload order, three gig
directions with package scope skeletons (no prices, per instruction), and a
55-second showreel storyboard using only real screens.

**Tests and docs.** Vitest unit suites; Playwright e2e suites + config;
README with an owner's pre-deploy checklist; design rationale in
`docs/DESIGN.md`; this report.

## What was verified here (all green)

Production build: 11/11 routes prerender. ESLint: clean under the strict
React-compiler ruleset. TypeScript: clean. Unit tests: 37/37 — WCAG AA
contrast computed from the *actual* tokens in `globals.css` (this caught a
real failure: the faint-text token measured 3.30:1 and was darkened to
5.03:1), content honesty guards (no lorem, no banned superlatives, no
store/user-count claims, AIMARA's anonymisation note present), media wiring
(every referenced id exists on disk with real dimensions and alt text), and
hire-CTA fallback logic. Live server smoke: every route 200, unknown slug
404, correct title/canonical/h1/skip-link/landmarks/JSON-LD/OG per route.
Link crawl: 409 internal links and image URLs scanned, zero broken (the only
non-200s anywhere are absolute URLs on the intentional placeholder domain,
which disappear the moment `NEXT_PUBLIC_SITE_URL` is set).

## What could not be verified here, and why

Browser-based checks — Playwright e2e, axe, Lighthouse — require a browser
download that this sandbox's network policy blocks. The e2e suite (routes,
skip link, mobile menu, lightbox keyboard behaviour, motion-toggle
persistence, reduced-motion hero fallback) is therefore delivered
ready-to-run, not pre-run: `pnpm exec playwright install chromium`, then
`pnpm build && pnpm test:e2e`. The 3D hero was likewise verified by build,
lint and code review rather than by rendering. I'd treat one local e2e run
and a Lighthouse pass on `/` as the last gate before sharing the URL.

## Owner actions before deploy

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`); add the Fiverr URL to
`src/content/profile.ts` when it exists; confirm the three gap facts in
`docs/CONTENT_GAPS.md` and add them to `src/content/sections.ts`; sign off
AIMARA naming (toggle in `src/content/projects/aimara.ts` if full anonymity
is preferred); optionally add a real portrait. Each item is also in the
README checklist.

— Built end to end in one continuous session; every claim above corresponds
to a command that ran in this repository.

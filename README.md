# Salim Sadman — Portfolio

A production portfolio for **Md Salim Sadman Taseen**, software & app developer.
Three deep case studies — NaqiVerse, AIMARA, Grocs — plus a compact DentXpert
research module, built as "one long exhibition with three rooms": a porcelain
gallery shell whose colour, surface and motion re-theme per project.

Stack: **Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript ·
motion · React Three Fiber · Radix UI**. Fonts are self-hosted
(`@fontsource-variable`: Outfit, Outfit, Outfit).

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000

pnpm lint         # ESLint (strict React-compiler rules)
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest unit suite (contrast, content honesty, media wiring)
pnpm build        # production build (all routes prerender)
pnpm start        # serve the production build
pnpm test:e2e     # Playwright (see "Testing" below)
```

Python 3 + Pillow are only needed to *re-run asset pipelines* — never at
build/deploy time.

---

## Before you deploy — the owner's checklist

1. **Set the site URL.** Copy `.env.example` → `.env.local` (or set the
   variable in Vercel) with the real domain. Metadata, sitemap, robots and
   JSON-LD all derive from it. A unit test reminds you while the placeholder
   remains.
2. **Add the Fiverr URL when it exists.** `src/content/profile.ts` →
   `fiverrUrl`. While it is `null`, every hire CTA honestly falls back to
   email with a "Fiverr profile coming soon" note; set the URL and all CTAs
   switch automatically (behaviour is unit-tested).
3. **Confirm the facts marked in `docs/CONTENT_GAPS.md`** — Devco employment
   dates, IIUM graduation year, and the DentXpert publication venue are
   deliberately *omitted* rather than guessed. Add them in
   `src/content/sections.ts` when confirmed.
4. **AIMARA branding sign-off.** The case study currently names AIMARA with
   an anonymisation note, per the brief. To publish it fully anonymised
   instead, flip `AIMARA_BRANDING.useBrandName` in
   `src/content/projects/aimara.ts` — copy adjusts everywhere.
5. **Portrait (optional).** The site intentionally uses an "ST" monogram.
   Drop a real photo into `public/media/portrait.webp` and swap it into
   `AboutPreview` / `about/page.tsx` if desired.

## Deploying (Vercel)

Import the repo → framework auto-detected → add `NEXT_PUBLIC_SITE_URL` →
deploy. No other configuration. Any Node 20+ host running `pnpm build &&
pnpm start` works equally.

---

## Editing content

Everything editorial lives in `src/content/`:

| File | Owns |
|---|---|
| `profile.ts` | Name, email, hero copy, proof rail, final CTA, site config, hire-CTA logic |
| `projects/{naqiverse,aimara,grocs}.ts` | The full case studies: copy, shots, decisions, tech, galleries |
| `sections.ts` | Services, process, capability map, timeline, DentXpert module |
| `media.gen.ts` | **Generated** — never edit by hand |

Copy conventions the tests enforce: no lorem, no unverifiable superlatives,
no store/user-count claims, every shot has real alt text, AIMARA keeps its
anonymisation note. See `tests/unit/content.test.ts` — it is the honesty
contract in executable form.

## Asset pipelines (Python + Pillow)

| Command | Regenerates |
|---|---|
| `pnpm media` | `public/media/**` WebPs + `src/content/media.gen.ts` from `media-src/` (not in repo — owner holds originals; see `ASSET_MANIFEST.md`) |
| `pnpm og` | Open Graph cards (`public/media/og/*.png`) + `src/app/apple-icon.png` |
| `pnpm fiverr` | `fiverr-assets/gig-images/*.png` |

`ASSET_MANIFEST.md` records every published image, its source and the exact
privacy edits applied. `docs/PRIVACY_REDACTION_CHECKLIST.md` documents the
redaction rules and synthetic-name mapping.

## Design system

`src/app/globals.css` is the whole token system: porcelain/ink shell, three
room palettes (blush, crimson-on-graphite, basil-on-rice) with AA-safe `-ink`
text variants, hairline borders, the grain overlay, the device frame, the
rail gutter. Rooms re-theme via `data-room` / `data-surface` attributes —
components never hard-code project colours. Rationale and references:
`docs/DESIGN.md`.

**Motion policy:** everything animated respects `prefers-reduced-motion`
*and* a user-facing "Motion: Full/Static" footer toggle (persisted, applied
pre-paint). The 3D hero mounts only on wide viewports with WebGL and no
Save-Data; everyone else gets a composed static constellation. The R3F
canvas runs a demand frameloop — it renders during the opening settle and on
pointer movement, and costs ~nothing idle.

## Testing

- **Unit (runs everywhere):** `pnpm test` — WCAG AA contrast computed from
  the real tokens in `globals.css`; content honesty guards; media wiring;
  hire-CTA fallback logic.
- **E2E (run locally):** `pnpm exec playwright install chromium` once, then
  `pnpm build && pnpm test:e2e` — routes, skip link, mobile menu, lightbox
  keyboard behaviour, motion-toggle persistence, reduced-motion hero
  fallback. Browser download is blocked in some CI sandboxes (including the
  one this repo was built in), which is why the suite is delivered
  ready-to-run rather than pre-run.
- Suggested local extras before big releases: Lighthouse (target ≥95 across
  categories on `/`) and `axe` DevTools on each route.

## Repository map

```
src/app/            routes, globals.css, icons, sitemap, robots
src/components/     ui, hero (3D + static), home sections, case template,
                    rail, motion provider, vendored React Bits (licensed)
src/content/        ALL copy + typed media manifest
tools/              Python pipelines (media, OG, Fiverr images)
tests/unit          Vitest suites (run in CI)
tests/e2e           Playwright suites (run locally)
docs/               design + audit + privacy documentation
fiverr-assets/      complete Fiverr starter pack (images + copy)
ASSET_MANIFEST.md   image provenance ledger
FINAL_REPORT.md     build report and verification status
```

Vendored `Magnet` / `MagnetLines` come from [React Bits](https://reactbits.dev)
(MIT + Commons Clause) with license headers retained; used for the hero CTA
magnetism and the 404 artwork, both disabled under reduced motion.

## Publish free on GitHub Pages

The site compiles to a fully static export (`output: "export"`), so GitHub Pages hosts it for free.

1. Create a new **public** repository on GitHub named exactly `sadmansal1m.github.io` (using your username makes the site live at the root URL with no path prefix).
2. From this folder, push the code:

   ```powershell
   git init
   git add -A
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/sadmansal1m/sadmansal1m.github.io.git
   git push -u origin main
   ```

3. On GitHub: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds on every push to `main` with `NEXT_PUBLIC_SITE_URL=https://sadmansal1m.github.io`, so canonicals, Open Graph URLs and the sitemap come out correct. First deploy takes about two minutes; the link is then live for anyone: **https://sadmansal1m.github.io/**

Notes: `next dev` works exactly as before; to preview the production export locally run `pnpm build` then `npx serve out`. If you ever prefer a project repo instead (e.g. `sadman-portfolio`), add `basePath: "/sadman-portfolio"` to `next.config.ts` and the site will live under that subpath. A custom domain later is just Settings → Pages → Custom domain plus a DNS CNAME.

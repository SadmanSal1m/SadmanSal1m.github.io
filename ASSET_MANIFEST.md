# Asset Manifest — every published image, its source and its edits

All screenshots originate from the owner's `app_ss` capture set (kept off-repo
because pre-redaction originals contain PII; the owner holds them). Published
derivatives below are EXIF-stripped, resized to ≤1080 px width, and re-encoded
as WebP q88 by `tools/media/build-media.py`. Redaction technique and the full
synthetic-name mapping: `docs/PRIVACY_REDACTION_CHECKLIST.md`.

| Media id | Published file | Size | Privacy edits applied | Alt/caption defined in |
|---|---|---|---|---|
| `naqiverse/01-home` | `public/media/naqiverse/01-home.webp` | 498×1080 | Owner handle SadmanSal1m kept (self); no third-party PII | `src/content/projects/naqiverse.ts` |
| `naqiverse/02-profile` | `public/media/naqiverse/02-profile.webp` | 498×1080 | Friend code → NAQ-DEMO | `src/content/projects/naqiverse.ts` |
| `naqiverse/03-leaderboard` | `public/media/naqiverse/03-leaderboard.webp` | 498×1080 | Player handles → pixelfox / lunabyte / driftwood / kayzen (gradient-matched card fills) | `src/content/projects/naqiverse.ts` |
| `naqiverse/04-friends` | `public/media/naqiverse/04-friends.webp` | 498×1080 | Friend handles + codes replaced with synthetic set | `src/content/projects/naqiverse.ts` |
| `naqiverse/05-stats` | `public/media/naqiverse/05-stats.webp` | 498×1080 | EXIF strip + resize only | `src/content/projects/naqiverse.ts` |
| `naqiverse/06-leaderboard-row` | `public/media/naqiverse/06-leaderboard-row.webp` | 498×1080 | Handle swap as on the leaderboard | `src/content/projects/naqiverse.ts` |
| `naqiverse/07-badges` | `public/media/naqiverse/07-badges.webp` | 498×1080 | EXIF strip + resize only | `src/content/projects/naqiverse.ts` |
| `naqiverse/08-theme-shop` | `public/media/naqiverse/08-theme-shop.webp` | 498×1080 | EXIF strip + resize only | `src/content/projects/naqiverse.ts` |
| `naqiverse/09-settings` | `public/media/naqiverse/09-settings.webp` | 498×1080 | EXIF strip + resize only | `src/content/projects/naqiverse.ts` |
| `naqiverse/10-about` | `public/media/naqiverse/10-about.webp` | 498×1080 | EXIF strip + resize only | `src/content/projects/naqiverse.ts` |
| `aimara/01-login` | `public/media/aimara/01-login.webp` | 394×827 | Email replaced with ops.admin@example.com (gradient-matched fill, redrawn text) | `src/content/projects/aimara.ts` |
| `aimara/02-channels-empty` | `public/media/aimara/02-channels-empty.webp` | 392×821 | Account email replaced with ops.admin@example.com | `src/content/projects/aimara.ts` |
| `aimara/03-channels` | `public/media/aimara/03-channels.webp` | 390×824 | Channel names → Harbour / Fleet North / Duty Roster; avatars redrawn (HR/FN/DR); previews rewritten; sender → Amira | `src/content/projects/aimara.ts` |
| `aimara/04-new-channel` | `public/media/aimara/04-new-channel.webp` | 391×818 | No PII present — EXIF strip + resize only | `src/content/projects/aimara.ts` |
| `aimara/05-chat-privacy` | `public/media/aimara/05-chat-privacy.webp` | 391×824 | Participant → Amira; header avatar redrawn; bubble names swapped | `src/content/projects/aimara.ts` |
| `aimara/06-dashboard` | `public/media/aimara/06-dashboard.webp` | 392×814 | Channel chips → Harbour / Fleet North / Duty Roster; metrics untouched | `src/content/projects/aimara.ts` |
| `aimara/07-starred` | `public/media/aimara/07-starred.webp` | 393×825 | Author → Farid; starred message body replaced with neutral ops text; channel names swapped | `src/content/projects/aimara.ts` |
| `grocs/01-welcome` | `public/media/grocs/01-welcome.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/02-starter-index` | `public/media/grocs/02-starter-index.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/03-themes` | `public/media/grocs/03-themes.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/04-privacy` | `public/media/grocs/04-privacy.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/05-on-device-ai` | `public/media/grocs/05-on-device-ai.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/06-home` | `public/media/grocs/06-home.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/07-add` | `public/media/grocs/07-add.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/08-recipes` | `public/media/grocs/08-recipes.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/09-pantry` | `public/media/grocs/09-pantry.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/10-shopping` | `public/media/grocs/10-shopping.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `grocs/11-you` | `public/media/grocs/11-you.webp` | 1080×2340 | No PII — EXIF strip + resize only | `src/content/projects/grocs.ts` |
| `dentxpert/01-model-selection` | `public/media/dentxpert/01-model-selection.webp` | 1080×2280 | No PII — EXIF strip + resize only | `src/content/sections.ts` |

## Non-screenshot imagery

| Asset | Source | Notes |
|---|---|---|
| `public/media/naqiverse/fruit-{1,3,5}.png` | NaqiVerse repo `assets/images/suika/img/circle*.png` | Owner's own game art; resized to 96 px for the draggable delight (aria-hidden). |
| `public/media/og/*.png` | Generated by `tools/og/build-og.py` | Drawn from tokens + already-redacted screens. |
| `fiverr-assets/gig-images/*.png` | Generated by `tools/build-fiverr-images.py` | Same redacted screens, Fiverr 1280×769. |
| `src/app/icon.svg`, `src/app/apple-icon.png` | Hand-drawn / generated | ST monogram. |

## Verification
- `pnpm test` → media-wiring suite asserts every referenced id exists on disk with real dimensions and alt text.
- Redaction visual QA sheets were reviewed during production (technique notes in the checklist doc).
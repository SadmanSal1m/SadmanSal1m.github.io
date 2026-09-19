# CONTENT_AUDIT.md

Audit of everything supplied, what was used, and what was deliberately kept out.

## Supplied material

| Item | Contents | Decision |
| --- | --- | --- |
| `naqverse-master_1_.zip` | Full Expo/RN source for NaqiVerse (v3), Firebase config, docs, store-policy pages | Used for feature verification and brand colour extraction. `google-services.json`, `GoogleService-Info.plist`, `firebaserc` treated as secrets-adjacent — never copied, quoted or referenced publicly. |
| `Compiled-AIMARA-project-main.zip` | Ionic Angular app slice (`admin-mobile-edit-delete-UI`) with backend (FastAPI), Supabase dir, Terraform, plus `gcp-siem` Terraform incl. `terraform.tfvars` | Used for feature verification only. Terraform, tfvars, push logs, backend code never copied into the portfolio project. No endpoint, key, project id or infrastructure value appears anywhere in the site. |
| `grocs.zip` | Full Grocs source, README, docs, seed tooling | Used for architecture and feature verification; README design-system section superseded by current screenshots where they conflict. |
| `DentXpert-master.zip` | Flutter app source | Used only to confirm the stack for the research module. |
| `app_ss.zip` | 35 screenshots: naqiverse ×10, AImara ×7, grocs ×12, dentxpert ×6 | Curated per the rules below; full per-image decisions in ASSET_MANIFEST.md and PRIVACY_REDACTION_CHECKLIST.md. |
| `Md Salim Sadman Taseen_CV.pdf` | **Not present in this upload.** | Résumé page built exclusively from the owner-confirmed positioning points in the brief. CV-only claims (language counts, "14 dimensions") were already embargoed by the brief and are not published. Logged in CONTENT_GAPS.md. |
| `CAS_S2645077.pdf` / immigration / financial documents | Not present | Nothing of this nature exists in the project; guard rule recorded anyway. |
| Screen recordings | Not present | No video is used; media slots note in README explains how to add loops later. |
| Portrait / profile folder | Not present | Original typographic monogram used. No portrait is generated or implied. |

## Claim-classification summary

Full table lives in SOURCE_OF_TRUTH.md. Headline outcomes:

- Every homepage and case-study claim is [SRC], [SS] or [OWNER].
- Nothing classified [GAP] or [INF] appears in public copy.
- No clients, testimonials, ratings, store status, downloads, users, revenue, conversion numbers, performance numbers, team sizes, unverified dates, business outcomes, or invented awards appear anywhere.
- "Impact"-style sections are replaced with: What I built · What shipped · Engineering proof · Product decisions · Quality measures · What the current build demonstrates.

## Conflicts found and how they were resolved

1. **NaqVerse vs NaqiVerse.** README uses the old spelling; `app.json` and every current screenshot say **NaqiVerse**. Screenshots win. The name is stored once in `src/content/projects/naqiverse.ts`.
2. **Grocs design system.** Repo README describes an "Editorial Kitchen" (Fraunces, warm paper); current screenshots show a different shipped system (lowercase `grocs.` wordmark, six themes named basil noir / dragonfruit / ultraviolet / deep sea / oat milk / rice paper, dark default). Screenshots win: public copy says "a token-driven theme system with six switchable palettes, light and dark" and makes no typeface claims.
3. **NaqiVerse achievement count.** README says 12 achievements; current build shows "136 of 517 unlocked". Current build wins; public copy avoids a hard number.
4. **AIMARA language count.** CV reportedly says 124; snapshot ships 23. Neither number is published — copy says "multilingual translation and language detection".
5. **AIMARA feature slice.** Several owner-confirmed features (Safe Mode review window, self-destructing messages, read receipts) are absent from the supplied slice. They are published only in feature-list form, attributed to the product rather than demonstrated, and never used as the case study's centrepiece proof.
6. **Grocs test counts.** README says 11 suites / 67 tests; the snapshot contains 13 test files in 8 folders. Public copy says "a contrast- and behaviour-enforcing test suite" without a count.

## Standing exclusions (enforced in copy and assets)

Real names other than the owner's, user handles of other people, email addresses other than the published contact, phone numbers, company identifiers from AIMARA operations (DEVCO, PetAir, RedRusa), case details, attachments, referee details, API keys, tokens, service accounts, Terraform values, backend endpoints, Firebase identifiers, the Berlin font files in the AIMARA archive (licence unverified — never redistributed), and any MSc-admission mention.

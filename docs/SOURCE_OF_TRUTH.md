# SOURCE_OF_TRUTH.md

Every public claim on the site traces to this file. Classification codes:

- **[SRC]** — VERIFIED IN SOURCE (found in the supplied repository snapshot)
- **[SS]** — VERIFIED BY SCREENSHOT (visible in the supplied app screenshots)
- **[OWNER]** — confirmed positioning supplied in the product owner's written brief
- **[GAP]** — USER CONFIRMATION REQUIRED (recorded in CONTENT_GAPS.md, not published)
- **[INF]** — INFERENCE — DO NOT PUBLISH

Source priority applied when items conflict: current screenshots → repository → CV/brief → notes → inference. Conflicts are logged in CONTENT_GAPS.md and resolved conservatively.

---

## Profile

| Claim | Basis |
| --- | --- |
| Name: Md Salim Sadman Taseen; display name Sadman Taseen | [OWNER] |
| Title: Mobile Product Engineer — Cross-Platform, Full-Stack & Applied AI | [OWNER] |
| Email: sadmantaseen1030@gmail.com | [OWNER] + [SS] (visible in DentXpert profile screen) |
| GitHub: github.com/sadmansal1m | [OWNER] |
| Fiverr URL | [GAP] — not yet supplied; config fallback active |
| BSc Computer Science (Hons), Software Engineering & AI, IIUM, CGPA 3.52/4.00 | [OWNER] |
| Devco internship, continued part-time | [OWNER] (dates: [GAP]) |
| JIIICaS 2024 Gold Award (DentXpert) | [OWNER] |
| Published research: "Deep Learning Approach for Dental Anomalies X-ray Imaging using YOLOv8" | [OWNER] |
| Multiple Dean's List appearances | [OWNER] (semesters: [GAP]) |
| Portrait photo | [GAP] — none supplied; typographic monogram used instead |
| MSc admission | [INF] — explicitly excluded by owner until approved |

## Project 01 — NaqiVerse

| Claim | Basis |
| --- | --- |
| Current product name spelled "NaqiVerse" | [SS] (home header, about screen) + [SRC] (`app.json` → `"name": "NaqiVerse"`); README's older "NaqVerse" spelling superseded — stored once in `content/projects/naqiverse.ts` |
| Expo + React Native + TypeScript, Expo Router | [SRC] `package.json`, `app/` routes |
| Five games: Fruit Merge (Suika), Blocqi (Block Blast), Sudoku, 2048, Snake | [SRC] `src/games/`, README table + [SS] home list |
| Matter.js physics for Fruit Merge | [SRC] `matter-js` dep, `src/games/suika/engine.ts` |
| Pure logic modules separated from presentation | [SRC] `logic.ts` per game, README architecture section |
| Shared game-screen chrome (header, pause, game-over, streaks, achievements) | [SRC] `src/components/game/GameScreen` per README |
| Local persistence and offline play (AsyncStorage; Sudoku autosave) | [SRC] deps + README |
| Optional Google and Apple sign-in | [SRC] `@react-native-google-signin`, `expo-apple-authentication` |
| Firebase Auth + Firestore, cloud profile | [SRC] `firebase` dep, `src/firebase/*` services, `firestore.rules` |
| Leaderboards (overall + per game, seasonal) | [SRC] `leaderboardService.ts` + [SS] leaderboard screens ("Season 1 resets in…") |
| Friends, friend codes, friend requests | [SRC] `friendsService.ts`, `friendCodes.ts` + [SS] Friends screen |
| Blocking and reporting | [SRC] `blockService.ts`, `reportService.ts` + [SS] leaderboard row sheet ("Report user", "Block user") |
| Daily missions/challenges, "Today's Pick" | [SRC] `challengesService.ts`, `src/daily/` + [SS] "Featured today", "Daily" chip |
| Naqoins and XP; levels, ranks and seasonal progression | [SRC] `src/rewards/`, `src/progression/` + [SS] settings ("Naqoins — 6,985 to spend"), profile (Level 14, XP bar) |
| Achievements (12 per README; 517 shown in current build) | [SS] badges screen "136 of 517 unlocked" — current build count used; README "12" superseded (see CONTENT_GAPS) → published copy avoids a hard number: "a deep achievement system" |
| Theme shop with unlockable palettes | [SS] Theme Shop screen (Blush owned; Berry, Violet purchasable; current: Ember) + [SRC] `cardSkin.ts`, themes |
| Statistics, streaks, favourite game | [SS] stats screens + [SRC] stores |
| Sound, haptics, reduced-motion preferences | [SS] settings toggles + [SRC] `expo-haptics`, settings store |
| Reanimated micro-interactions, Zustand state | [SRC] deps |
| Store availability / downloads / users / revenue | [GAP] — not claimed anywhere |

## Project 02 — AIMARA

Confidentiality label used everywhere: "Confidential work project · screens use anonymised demo data". The supplied repository is a working slice (`admin-mobile-edit-delete-UI` + `gcp-siem`); the owner's brief confirms full-product scope. Basis per feature:

| Claim | Basis |
| --- | --- |
| Ionic Angular + Capacitor, FastAPI backend, Supabase | [SRC] `package.json`, `backend/app.py`, deps |
| Multi-tenant organisation & channel architecture, role-based access, RLS foundations | [OWNER] + [SRC] (supabase dir, auth/user services) |
| Real-time WebSocket communication | [SRC] `websocket.service.ts`, `socket.io-client` |
| Channel-based chat: editing, deletion, forwarding, reactions, labels/favourites | [SRC] chat service + keyword scan (forward ×15, reaction ×8 files) + [SS] chat screens |
| Scheduled messages | [SRC] keyword scan ×17 files + [SS] dashboard "scheduled messages" copy |
| Read receipts, self-destructing messages | [OWNER] (not present in supplied slice — see CONTENT_GAPS; published with feature-list wording, not case-study centrepiece) |
| Archived channels; auto-archive after creation window | [SS] "Auto-archives 7 days after creation", archive tab, "This channel was archived by an admin. Its history is preserved." + [SRC] archive ×7 files |
| Channel privacy tiers: Standard / Low Privacy (stable handles) / High Privacy (end-to-end encrypted) | [SS] New Channel sheet + [SS] chat showing anonymised member handles |
| Approval-based block/unblock, edit, deletion, freeze/unfreeze, channel deletion | [SRC] freeze ×13 files + [OWNER] |
| Agora-powered calls; call notes, status, scheduled calls | [SRC] `agora.service.ts`, `agora-rtc-sdk-ng`, `agora-token` + [SS] dashboard call items |
| Dashboard previews for tasks, calls, scheduled messages; overdue tracking | [SS] dashboard screen + [SRC] `dashboard.service.ts` |
| Cases and records; attachments and document viewers | [SRC] `cases.service.ts`, `records.service.ts`, `ngx-extended-pdf-viewer`, `mammoth`, `pdfjs-dist` |
| User and department management | [SRC] `users.service.ts`, user-management page |
| Push notifications | [SRC] `push-notification.service.ts`, `@capacitor-firebase/messaging`, `backend/push_service.py` |
| Social feed: posting, likes, visibility, statistics | [SRC] `social.service.ts`, social page, `backend/social_production.py`, `chart.js` |
| Audio transcription | [SRC] transcription keyword ×7 files + [OWNER] |
| Language detection and multilingual translation | [SRC] `language.service.ts`, `language.model.ts` — **count not published** (snapshot lists 23; CV claims 124 → conflict logged) |
| AI paraphrasing | [SRC] `paraphrase.model.ts` |
| AI Safe Mode (message review/polish with an edit/cancel window before publishing) | [OWNER] (not in supplied slice) — published as feature description without vendor/model naming |
| Biometric sign-in and app locking | [SRC] `biometric.service.ts`, `app-lock.service.ts`, `@capgo/capacitor-native-biometric` |
| Encrypted local storage | [SRC] `encrypted-storage.service.ts` |
| Root/jailbreak detection | [SRC] `@basecom-gmbh/capacitor-jailbreak-root-detection`, `device-security.service.ts` |
| Privacy-screen protection | [SRC] `@capacitor-community/privacy-screen`, `screen-security.service.ts` |
| Document redaction | [SRC] `backend/redaction.py`, redact ×12 files |
| Forensic image and PDF watermarking | [SRC] `backend/watermark.py` |
| Resumable uploads | [SRC] `tus-js-client`, `resumable-upload.service.ts` (tus ×45 files) |
| Google Cloud deployment | [SRC] `Dockerfile`, `terraform/`, `gcp-siem/` (contents never copied or quoted) |
| Post-quantum crypto groundwork | [SRC] `backend/pqc_encryption.py` — published cautiously as "post-quantum encryption groundwork in the backend" |
| "124 languages", "14 communication dimensions" | [GAP] — never published, per owner instruction |

## Project 03 — Grocs

| Claim | Basis |
| --- | --- |
| Expo + React Native, local-first; no account, backend, ads or telemetry | [SRC] README + deps + [SS] onboarding privacy screens |
| Capture from URLs, pasted text, screenshots, local video, manual entry, share sheet | [SRC] capture services + [SS] "add" screen tiles |
| URL normalisation; JSON-LD Recipe; Microdata; YouTube-description; public social captions; readability heuristics; honest fallbacks | [SRC] `UrlCaptureService.ts` strategy chain per README |
| Capture job state machine queued → processing → needs_review → saved; human review enforced | [SRC] README + pipeline + [SS] "you review every draft before it's saved" |
| On-device ML Kit OCR; rule-based structuring | [SRC] `@react-native-ml-kit/text-recognition` + [SS] "Active: OCR" |
| Optional whisper.rn transcription for audio files | [SRC] `whisper.rn` dep + README limitation note |
| SmolVLM2 adapter + validated output contract — adapter only | [SRC] `docs/smolvlm2-integration.md`, README — published exactly as adapter-level |
| SQLite local database; FTS5 search with fallback | [SRC] `expo-sqlite`, README |
| Bundled starter index of 2,500 curated records | [SRC] README + [SS] onboarding "a starter index of 2,500 recipes" |
| Optional full index of 168,442 records (sideloaded) | [SRC] README + [SS] "add the full 168k-record index later… or never" |
| Pantry tracking; expiry-aware matching; missing-ingredient calc; categorised shopping list | [SRC] `src/matching/`, README scoring weights + [SS] pantry/shopping tabs |
| User-owned JSON backup | [SRC] README + [SS] "your data — backup, restore" |
| Token-driven theme system, six switchable palettes, light and dark | [SS] theme picker: basil noir, dragonfruit, ultraviolet, deep sea, oat milk, rice paper — "Six moods, light and dark" + [SRC] three-layer `src/theme/` architecture |
| Contrast + design-token tests; 13 test files across 8 suites folders (README: 11 suites / 67 tests) | [SRC] `__tests__/` — published as "a token contrast + behaviour test suite" without a hard count (see CONTENT_GAPS) |
| "Editorial Kitchen" naming, Fraunces/Outfit, paper-and-ink specifics | [GAP] — repo README conflicts with current screenshots; not published |
| OpenRecipes attribution (CC BY 3.0) surfaced in-app | [SRC] README + [SS] "attribution & licences — OpenRecipes, models, frameworks" |

## DentXpert (research module)

| Claim | Basis |
| --- | --- |
| YOLOv8-based dental caries detection; final-year project; real-time detection from dental imagery | [OWNER] + [SS] model-selection screen ("Yolo v8 Model 1/2/3") |
| Evaluated with precision, recall, mAP | [OWNER] |
| JIIICaS 2024 Gold Award | [OWNER] |
| Publication title as listed | [OWNER] |
| Flutter + Firebase implementation | [SRC] `pubspec.yaml`, repo structure |


## Owner updates (2026-08-04, revision 5)
| Claim | Basis |
| --- | --- |
| Role title: Software & App Developer (replaces Mobile Product Engineer) | [OWNER] |
| 100+ case studies / client and personal projects delivered | [OWNER] (stated for the about stats; individual titles not enumerated) |
| 20+ mobile games created | [OWNER] |
| 4 published research papers | [OWNER] (only the YOLOv8 dental paper title supplied; other titles [GAP]) |

| Fiverr profile URL: https://www.fiverr.com/xperteyes_ (username @xperteyes_) | [OWNER] + [SS] (client profile screenshot, 2026-08-04) — closes the earlier Fiverr URL [GAP] |

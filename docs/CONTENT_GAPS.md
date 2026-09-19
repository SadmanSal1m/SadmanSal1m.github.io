# CONTENT_GAPS.md

Items that need owner input before they can appear (or appear more strongly) on the site. Nothing below is currently published.

## Blocking the "Hire me" upgrade
1. **Fiverr profile URL.** Set `fiverrUrl` in `src/content/profile.ts`. Until then every "Hire me" CTA falls back to a labelled email action ("Fiverr profile coming soon — email me").

## Facts awaiting confirmation
2. **Devco dates.** Internship start, transition to part-time. Timeline currently shows the relationship without dates.
3. **IIUM graduation year** (or "expected" wording). Currently undated.
4. **Dean's List semesters/years.** Currently "multiple appearances", undated.
5. **Publication venue + year + link/DOI.** Title is owner-confirmed; venue/date withheld until confirmed. If it is the JIIICaS 2024 proceedings, one line of confirmation unlocks it.
6. **CV file.** Referenced by the brief but not uploaded in this run. Supplying it lets the résumé page be cross-checked line by line.

## Numbers deliberately withheld
7. **AIMARA supported-language count.** CV: 124; supplied snapshot: 23. Publish only after the production list is confirmed.
8. **"14 communication dimensions."** No implementation or documentation supplied.
9. **NaqiVerse achievement count.** README: 12; current build UI: 517 total. Confirm which to state, or keep the current descriptive wording.
10. **Grocs test counts.** README: 11 suites / 67 tests; snapshot: 13 test files. Confirm before publishing a number.

## Branding / permission checkpoints
11. **AIMARA naming.** The brief's default title ("AIMARA — AI-Assisted Aftersales Operations Platform") is used with the confidentiality label. If branding approval is withdrawn, flip `useBrandName: false` in `src/content/projects/aimara.ts` to switch every instance to "AI-Assisted Aftersales Platform".
12. **Portrait.** None supplied; monogram in place. Drop an approved image at `public/media/profile/portrait.webp` and set `portrait` in `profile.ts`.
13. **MSc admission.** Excluded until the owner approves a public wording.
14. **NaqiVerse store status.** No store claim is made. If the app goes live, add the store links to `naqiverse.ts`.

## Nice-to-have material
15. Screen recordings for short muted loops (none supplied).
16. Additional AIMARA screens showing records/cases/calls with demo data — the current set covers login, channels, chat, channel creation, dashboard and starred messages only.
17. A higher-resolution NaqiVerse export (current screenshots are 498 × 1080).

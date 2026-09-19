# PRIVACY_REDACTION_CHECKLIST.md

Rules applied to every asset before it entered `public/media/`, and the per-image record. Originals stay in `media-src/` (outside the public delivery folder) and are excluded from the deployable build. All delivery images are re-encoded (metadata stripped) and resized.

## Global rules
- [x] No real personal names other than the owner's own name/handle.
- [x] No email addresses other than the published contact address.
- [x] No phone numbers, physical addresses, case details, attachments or documents.
- [x] No operational company identifiers from AIMARA data (DEVCO, PetAir, RedRusa) — replaced in pixels with synthetic organisations.
- [x] Sensitive text replaced with opaque, style-matched synthetic content — never blur-only.
- [x] No API keys, tokens, endpoints, Firebase identifiers, Terraform values (checked: none visible in any screenshot).
- [x] No CAS/passport/visa/financial/immigration material (none supplied; none used).
- [x] No referee information (none supplied; résumé states "References available on request").
- [x] EXIF/metadata stripped on re-encode for every delivered image.
- [x] AIMARA gallery carries a visible "anonymised demo data" note in the UI.
- [x] The Berlin font files inside the AIMARA archive are not redistributed (licence unverified).
- [x] No screenshot is redrawn to imply a feature that does not exist; edits are limited to identity replacement.

## AIMARA (7 supplied → 7 published, 5 edited)
| # | Screen | Findings | Action |
| --- | --- | --- | --- |
| A1 | Login | Demo account email visible | Replace email text with `ops.admin@example.com` (opaque, style-matched) |
| A2 | Channels — empty state | Clean | Publish as-is |
| A3 | Channels — list | Real org channel names (DEVCO, PetAir), colleague first name, preview texts | Replace channel names, avatars' initials, sender name and previews with synthetic organisations ("Harbour Ops", "Fleet North", "Client Onboarding", "Duty Roster") |
| A4 | Chat — privacy channel | Member handles are the app's own anonymised stable handles (feature, not leak); test messages only | Publish as-is |
| A5 | New channel sheet | Members already synthetic (`ivya@example.com`, "Client") | Publish as-is |
| A6 | Dashboard — tasks/calls | Org names in task rows (DEVCO, PetAir, RedRusa) | Replace org labels with synthetic organisations |
| A7 | Starred messages | Two real first names/handles; one informal internal message | Replace both names and the second message body with synthetic equivalents |

## NaqiVerse (10 supplied → 10 published, 5 edited)
| # | Screen | Findings | Action |
| --- | --- | --- | --- |
| N1 | Home | Owner's own handle only | Publish as-is |
| N2 | Profile | Owner's handle | Publish as-is |
| N3 | Leaderboard | Other players' handles (4) | Replace with synthetic handles, keep owner's row |
| N4 | Friends | Friends' handles (3) + owner's friend code | Replace handles; friend code → `NAQ-DEMO` |
| N5 | Stats | Other players' handles in leaderboard block | Replace |
| N6 | Leaderboard row sheet | Alt-account handle | Replace |
| N7 | Badges | Clean | Publish as-is |
| N8 | Theme Shop | Clean | Publish as-is |
| N9 | Settings | Owner's handle | Publish as-is |
| N10 | About | Clean | Publish as-is |

## Grocs (12 supplied → 10 published, 0 edited)
No personal data present in any Grocs screenshot (fresh-install onboarding and empty states). Two near-duplicate onboarding frames dropped for curation, not privacy.

## DentXpert (6 supplied → 1 published)
| Screen | Findings | Action |
| --- | --- | --- |
| Model selection | Clean | Published (sole DentXpert visual, per "compact module" rule) |
| Results grid | Photographs of a real person's mouth (health-adjacent imagery) | **Excluded** |
| Home / Profile | Owner's photo + email inside UI chrome | Excluded (low-res; portrait not approved as such) |
| Clinics | Real clinic names, addresses, phone numbers, staff photo | **Excluded** |
| Learn | Clean but off-story | Excluded for focus |

## Repository hygiene
- [x] Nothing from `gcp-siem/`, `terraform/`, `backend/`, `supabase/`, `push_log.txt`, `google-services.json`, `GoogleService-Info.plist`, `firebaserc`, `firestore.rules` copied into the portfolio repo.
- [x] Portfolio repo contains no `.env` values — only `.env.example`.
- [x] `media-src/` (unedited originals) is git-ignored and excluded from deployment.

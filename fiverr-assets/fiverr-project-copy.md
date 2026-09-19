# Fiverr Portfolio — Project Entries

Fiverr portfolio projects take a title, a description (up to 1,200 chars — these
sit at 700–950), up to 5 images/videos, and tags. Use the images from
`gig-images/` in the order given. Each description follows the shape buyers
scan for: the need → what I did → how → where it stands.

---

## Upload order (matters — first project is the profile's face)

1. **AIMARA** — enterprise proof first; it signals trust and complexity.
2. **Grocs** — the AI story, currently the most marketable skill.
3. **NaqiVerse** — consumer polish and range.

---

## 1 · AIMARA — Secure enterprise messaging & operations platform

**Title:** Secure enterprise messaging & operations platform (Ionic Angular + FastAPI)

**Images, in order:** `aimara-1-secure-chat.png`, `aimara-2-operations.png`, `aimara-3-governance.png`

**Description (~930 chars):**

A company needed its aftersales teams off consumer chat apps and onto
something it could govern: private channels, approvals, audit trails, and AI
help that never acts on its own. I was the product engineer on the mobile
client and its integrations. I built the real-time messaging experience
(channels, threads, mentions, forwarding, scheduled and self-destructing
messages), the operations layer (live dashboards, case and record management,
channel freeze/archive workflows with approvals), and the device security
wrap — biometric lock, encrypted local storage, root detection and privacy
screening. AI features — translation, paraphrasing, message polish — run
behind a human review window, so a person confirms every AI suggestion before
it sends. Stack: Ionic Angular, Capacitor, FastAPI, Supabase Postgres with
row-level security, Agora for calls, FCM push. Screens shown are anonymised
with the client's structure intact.

**Tags:** enterprise app, secure messaging, ionic, fastapi, real-time

---

## 2 · Grocs — Local-first AI recipe & pantry companion

**Title:** Grocs — AI recipe capture app, 100% on-device (React Native + Expo)

**Images, in order:** `grocs-1-capture.png`, `grocs-2-private.png`, `grocs-3-pantry.png`

**Description (~860 chars):**

Recipe apps usually want an account, a subscription, and your data. Grocs is
the opposite: a kitchen companion where everything — recipes, pantry,
preferences, even the AI — lives on the device. I designed and built it end
to end. Paste a link, share a screenshot, or point it at a cooking video, and
a capture pipeline (OCR + on-device language model) turns it into a
structured recipe — every import passes through a review screen before it's
saved, because AI output should be checked, not trusted. A weighted matcher
scores recipes against what's actually in your pantry and drafts the
shopping list for what's missing. Ships with a 2,500-recipe starter index
(168k available offline), full-text search via SQLite FTS5, six themes, and
no account, ads or tracking. Stack: React Native, Expo, TypeScript, SQLite,
on-device ML.

**Tags:** react native, ai app, ocr, offline first, mobile app

---

## 3 · NaqiVerse — Five-game mobile arcade

**Title:** NaqiVerse — five complete games in one cross-platform app (React Native)

**Images, in order:** `naqiverse-1-games.png`, `naqiverse-2-progression.png`, `naqiverse-3-polish.png`

**Description (~800 chars):**

One app, five finished games: a physics fruit-merge (Matter.js), block
puzzle, Sudoku, 2048 and Snake — each with its own mechanics, sharing one
progression system I designed around a clean rule: game logic lives in pure
TypeScript modules with no UI code, so every game plugs into the same shell
for pause, game-over, streaks and achievements. Players earn XP and coins,
unlock 32 achievements, climb weekly leaderboards, add friends by code, and
spend coins on themes. The social layer is strictly optional — everything
works fully offline, and progress autosaves locally. Includes global/friends
leaderboards with Firebase, block/report moderation, haptics, sound design
and a coin economy. Stack: React Native, Expo, TypeScript, Zustand, Matter.js,
Firebase (optional layer).

**Tags:** mobile game, react native, expo, game development, cross platform

---

### After uploading
- Set AIMARA as the featured/first project.
- Reuse each description's first sentence as the image caption where Fiverr
  asks for one.
- When the portfolio site is live, append "Full case study: [URL]" to each
  description — Fiverr allows portfolio links in project descriptions.

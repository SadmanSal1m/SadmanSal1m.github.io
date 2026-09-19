# Fiverr Showreel — 55-Second Storyboard

A gig video lifts conversion more than any other asset. Fiverr specs: 16:9,
under 75 seconds, under 50 MB, and the first 3 seconds decide everything.
This storyboard uses **only real screens** already in `public/media/` — no
mockups, no stock. Screen-record the phone frames from the portfolio site
itself, or animate the WebP stills with slow pans (Ken Burns) in CapCut /
DaVinci Resolve.

**Music:** calm, confident, ~90 BPM instrumental (no lyrics). Cut on beat.
**Text style:** match the site — cream background, near-black text, mono
caption line. **Voiceover:** optional; the text version works silently, which
matters because most Fiverr videos autoplay muted.

| # | Time | Visual (real asset) | On-screen text | Note |
|---|------|--------------------|----------------|------|
| 1 | 0:00–0:03 | Cream card, name sets in | **I build mobile products end to end.** — Salim Sadman | The 3-second hook. Nothing else on screen. |
| 2 | 0:03–0:08 | `naqiverse/01-home` slow pan → `03-leaderboard` | Five games. One app. | Blush accent bar left. |
| 3 | 0:08–0:14 | `naqiverse/05-stats` → `07-badges` → `08-theme-shop`, quick cuts on beat | Progression · Leaderboards · Coin economy | Show breadth fast. |
| 4 | 0:14–0:17 | Cut to black beat, then `aimara/01-login` | Enterprise-grade. | Tone shift: crimson on graphite. |
| 5 | 0:17–0:24 | `aimara/05-chat-privacy` pan, then `06-dashboard` | Secure real-time messaging · Live operations | Let the privacy-channel chat breathe ~4s. |
| 6 | 0:24–0:29 | `aimara/04-new-channel` → `07-starred` | Governance built in: roles, approvals, audit | |
| 7 | 0:29–0:32 | Cut, `grocs/01-welcome` | And AI — done right. | Basil green enters. |
| 8 | 0:32–0:40 | `grocs/07-add` → `08-recipes` → `05-on-device-ai` | Capture recipes from links, screenshots, video — 100% on-device | The differentiator; give it the longest hold. |
| 9 | 0:40–0:46 | `grocs/09-pantry` → `10-shopping` | Pantry-aware. Shopping list writes itself. | |
| 10 | 0:46–0:51 | Three-up: one phone per project (use the three `textures/` images) | React Native · Ionic Angular · FastAPI · On-device ML | The range shot. |
| 11 | 0:51–0:55 | Cream end card | **Let's build yours.** · [Fiverr username] · portfolio URL | Hold 4s. No fade-to-black before the CTA. |

**Optional voiceover script (~50s, calm pace):**
> "I'm Sadman — I build mobile products end to end. Five complete games in
> one app, with progression, leaderboards and a coin economy. A secure
> enterprise platform — real-time messaging, live dashboards, governed
> workflows. And AI done right: a recipe app that captures from links,
> screenshots and video, running entirely on your device. Interface, systems
> and AI — one engineer, whole product. Let's build yours."

**Export:** 1920×1080, H.264, ~10 Mbps. Check the muted-autoplay experience
before uploading.

---

# What's in this folder

| File | Purpose |
|------|---------|
| `gig-images/` | 9 gallery images, 1280×769 (Fiverr's recommended size), 3 per project, in the portfolio's design language. |
| `fiverr-profile-bio.md` | Display name, tagline, 600-char seller description, skills, education. |
| `fiverr-project-copy.md` | Three portfolio project entries with descriptions, tags, image order and upload order. |
| `fiverr-gig-ideas.md` | Three gig directions with titles, overview copy, package scope skeletons, buyer requirements, FAQ seeds. No prices — set those at publish time. |
| `fiverr-showreel-storyboard.md` | This file — a 55-second video plan using only real screens. |

**Suggested setup order:** profile bio → portfolio projects (AIMARA, Grocs,
NaqiVerse) → Gig 1 → showreel video → Gigs 2–3. Add the live portfolio URL
everywhere a link is allowed once deployed.

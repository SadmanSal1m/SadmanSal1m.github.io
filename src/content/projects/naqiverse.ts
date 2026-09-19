import type { Project } from "./types";

/** Current product spelling, verified against app.json and the shipped build.
 *  The repository README's older "NaqVerse" spelling is superseded. */
export const NAQIVERSE_NAME = "NaqiVerse";

export const naqiverse: Project = {
  slug: "naqiverse",
  station: "Play",
  index: "02",
  name: NAQIVERSE_NAME,
  title: "NaqiVerse, A Cozy Multi Game Mobile Universe",
  promise:
    "Five complete casual games brought together through one playful, coherent mobile product.",
  category: "Consumer mobile game hub",
  role: "Design, engineering and systems, end to end",
  platform: "iOS + Android · Expo / React Native",
  tags: ["5 game engines", "Matter.js physics", "Leaderboards & friends", "Progression economy", "Theme shop"],
  takeaway:
    "Relevant for multi feature consumer apps, game systems, offline persistence and social progression.",
  heroShot: "naqiverse/01-home",
  heroAlt:
    "NaqiVerse home screen in the warm Ember theme: player level ring, daily streak, a featured 2048 card and the game list with Fruit Merge, Blocqi and Sudoku.",
  atAGlance: {
    problem:
      "Five different game loops usually mean five different apps, or one app that feels like a folder of prototypes.",
    contribution:
      "One codebase where each game is a pure logic module inside shared product systems: persistence, progression, economy, social play and theming.",
    stack: ["Expo", "React Native", "TypeScript", "Matter.js", "Zustand", "Reanimated", "Firebase"],
    proof:
      "The shipped build runs five complete games, seasonal leaderboards, friends, achievements, a Naqoins economy and a theme shop, playable fully offline.",
  },
  context: [
    "NaqiVerse is a cozy little universe of five casual games, Fruit Merge (a Suika style physics game), Blocqi, Sudoku, 2048 and Snake, wrapped in soft colour, springy taps and gentle celebrations.",
    "It plays completely offline out of the box. Signing in with Google or Apple is optional and unlocks the online layer: a cloud profile, global and per game leaderboards, friends with shareable codes, and seasonal resets.",
  ],
  challenge: [
    "The real difficulty is not any single game, it is making five unrelated game loops feel like one product. A physics sandbox, a grid puzzle, a logic game, a swipe game and an arcade game each want different input, timing and celebration models.",
    "On top of that sit product systems that must work across all five at once: scoring that feeds one progression track, achievements that evaluate any game's events, persistence that survives app kills mid puzzle, and a social layer that stays entirely optional.",
  ],
  journey: [
    {
      media: "naqiverse/01-home",
      alt: "Home screen with level ring, daily streak counter, a featured game card and the full game list.",
      caption:
        "Home is a hub, not a menu, level, streak and a rotating daily pick give a reason to open the app before choosing a game.",
    },
    {
      media: "naqiverse/02-profile",
      alt: "Player profile with avatar, level 14 progress bar, and counters for games, wins, day streak, achievements, XP and Naqoins.",
      caption:
        "Every game reports into one profile: XP, levels, ranks and the Naqoins balance are shared systems, not per game bolt ons.",
    },
    {
      media: "naqiverse/03-leaderboard",
      alt: "Seasonal leaderboard with an Overall tab, per game tabs, a rank-1 summary card and a ranked player list.",
      caption:
        "Leaderboards are seasonal and filterable per game, the season banner shows the reset countdown so competition stays fresh.",
    },
    {
      media: "naqiverse/04-friends",
      alt: "Friends screen with a shareable friend code, an add friend field and a list of three friends with levels and points.",
      caption:
        "Friend codes make adding people one short string, no contact access, no phone numbers.",
    },
    {
      media: "naqiverse/06-leaderboard-row",
      alt: "A player detail sheet showing best score per game, plus Report user and Block user actions.",
      caption:
        "Safety is built into the social layer: any player can be reported or blocked straight from their leaderboard row.",
    },
    {
      media: "naqiverse/08-theme-shop",
      alt: "Theme shop where palettes such as Blush, Berry and Violet are previewed and unlocked with Naqoins.",
      caption:
        "Naqoins earned by playing are spent in the theme shop, the economy loops back into how the whole app looks.",
    },
  ],
  built: [
    {
      lane: "Interface",
      items: [
        "A shared design system, palette, type scale, spacing, gradients and shadow tokens, driving every screen",
        "Home hub with daily pick, stats, badges, friends, leaderboard, theme shop and settings screens",
        "Springy Reanimated micro interactions and celebration moments tuned per game",
      ],
    },
    {
      lane: "Game engineering",
      items: [
        "Five games, each as a pure logic module (no React) with a thin presentation layer",
        "A Matter.js physics core for Fruit Merge with sprite mapped fruit tiers and per tier merge sounds",
        "A shared GameScreen shell handling headers, pause, game over, streaks and achievement evaluation",
      ],
    },
    {
      lane: "Data & persistence",
      items: [
        "Local first persistence for scores, streaks, settings and mid game state, Sudoku resumes exactly where you left off",
        "Optional Firebase Auth + Firestore cloud profile behind Google and Apple sign in",
      ],
    },
    {
      lane: "Social & economy",
      items: [
        "Seasonal overall and per game leaderboards with rank tiers",
        "Friends via shareable codes, friend requests, blocking and reporting",
        "Naqoins + XP economy, level rewards, daily missions and an unlockable theme shop",
      ],
    },
    {
      lane: "Quality & comfort",
      items: [
        "Reduced motion, haptics and sound toggles; labelled controls throughout",
        "Store policy groundwork: privacy policy, data deletion page and data-safety documentation in the repo",
      ],
    },
  ],
  decisions: [
    {
      title: "Pure logic modules, thin views",
      body:
        "Every game's rules live in a logic.ts with no React imports; the screen component only renders state and forwards input.",
      tradeoff:
        "More upfront structure per game, but game rules became unit testable, and adding the fifth game cost far less than the first.",
    },
    {
      title: "One shared GameScreen shell",
      body:
        "Headers, pause sheets, game over celebrations, streak updates and achievement checks are one wrapper; a game only supplies { paused, onGameOver }.",
      tradeoff:
        "The shell must stay generic, so a game wanting truly custom chrome has to opt out, a cost accepted for coherence across five games.",
    },
    {
      title: "Offline first, social optional",
      body:
        "Everything plays without an account; sign in only unlocks cloud profile, leaderboards and friends. Local state is the source of truth.",
      tradeoff:
        "Two persistence paths to keep in sync, but no player is ever forced through an account wall to play.",
    },
    {
      title: "An economy that feeds the interface",
      body:
        "Naqoins earned anywhere are spent on themes that restyle the entire app, so progression has a visible, personal payoff.",
      tradeoff:
        "Every screen must render correctly under every purchasable palette, the design tokens carry that guarantee.",
    },
  ],
  underTheHood:
    "The architecture is a hub of product systems around five isolated game cores. Zustand stores own settings, stats, achievements and onboarding; the Firebase layer is a strictly optional ring around local state.",
  deepDetail: [
    "Fruit Merge runs a dedicated Matter.js engine module (suika/engine.ts) with an image sprite renderer mapped over eleven fruit tiers; drop and merge events feed the shared audio map.",
    "Achievement evaluation subscribes to game over events from the shared shell, so new achievements never require touching game code.",
    "Progression is split into xpUtils, levelTiers and levelRewards modules; seasonal leaderboard resets are handled server side in the Firebase layer with a visible countdown in the client.",
    "Blocking and reporting are first class Firebase services (blockService, reportService), and blocked players disappear from both leaderboards and friends.",
  ],
  gallery: [
    { media: "naqiverse/01-home", alt: "NaqiVerse home hub in the Ember theme.", caption: "Home hub, level, streak, daily pick, game list." },
    { media: "naqiverse/02-profile", alt: "Player profile with progression counters.", caption: "One profile aggregates all five games." },
    { media: "naqiverse/03-leaderboard", alt: "Seasonal leaderboard with rank tiers.", caption: "Seasonal, per game leaderboards." },
    { media: "naqiverse/04-friends", alt: "Friends list with shareable code.", caption: "Friend codes, social without contacts access." },
    { media: "naqiverse/05-stats", alt: "Stats screen with totals, leaderboard preview and per game bests.", caption: "Streaks, totals and per game bests." },
    { media: "naqiverse/06-leaderboard-row", alt: "Player sheet with report and block actions.", caption: "Report and block, one tap from any row." },
    { media: "naqiverse/07-badges", alt: "Badges screen with filters and reward tracks.", caption: "A deep achievement system with Naqoin rewards." },
    { media: "naqiverse/08-theme-shop", alt: "Theme shop with unlockable palettes.", caption: "The theme shop closes the economy loop." },
    { media: "naqiverse/09-settings", alt: "Settings with sound, haptics, reduced motion and reminders.", caption: "Comfort settings, including reduced motion." },
    { media: "naqiverse/10-about", alt: "About sheet describing the five games.", caption: "The universe, in its own words." },
  ],
  quality: [
    "Reduced motion, haptics and sound preferences are user facing settings, not developer flags.",
    "Interactive controls carry labels; game boards support multiple input styles (Snake takes swipes or an on screen D-pad).",
    "Social safety: reporting and blocking ship in the same release as leaderboards and friends.",
    "Privacy groundwork in the repository: privacy policy, data deletion page, Play data-safety notes and third party notices.",
    "Screenshots on this page: other players' handles and the friend code are replaced with synthetic values.",
  ],
  proofNow: [
    "The supplied build runs all five games end to end with persistence, progression, economy, achievements and theming.",
    "The online layer, cloud profile, seasonal leaderboards, friends, blocking, reporting, is implemented against Firebase Auth + Firestore with security rules in the repo.",
    "No store availability, download or player numbers are claimed; none have been supplied for verification.",
  ],
  tech: [
    { name: "Expo + React Native + TypeScript", why: "one typed codebase for iOS and Android, with Expo Router for file based navigation" },
    { name: "Matter.js", why: "real 2D physics for the Suika style merge game" },
    { name: "Zustand", why: "small, predictable stores for settings, stats, achievements and onboarding" },
    { name: "Reanimated", why: "springy 60fps micro interactions that run on the UI thread" },
    { name: "Firebase Auth + Firestore", why: "an optional online ring, profile, leaderboards, friends, kept outside the offline core" },
    { name: "AsyncStorage", why: "local first persistence including mid game autosave" },
  ],
  enables: [
    "Consumer apps that juggle many features without collapsing into a folder of screens",
    "Game or gamified systems: scoring, streaks, achievements, seasons and soft currency economies",
    "Offline first products with a cleanly optional account and cloud layer",
    "Social features shipped responsibly, friends, leaderboards, blocking and reporting together",
  ],
  links: [{ label: "Download on the App Store", href: "https://apps.apple.com/my/app/naqiverse/id6779031756", note: "iOS" }],
  next: "aimara",
};

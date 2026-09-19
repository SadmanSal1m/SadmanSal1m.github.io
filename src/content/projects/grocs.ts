import type { Project } from "./types";

export const grocs: Project = {
  slug: "grocs",
  station: "Cook",
  index: "04",
  name: "Grocs",
  title: "Grocs, A Local First Recipe and Pantry Companion",
  promise:
    "A private kitchen companion that turns scattered recipes into meals users can cook with what they already have.",
  category: "Consumer utility · local first",
  role: "Product, architecture and engineering, end to end",
  platform: "iOS + Android · Expo / React Native · SQLite",
  tags: ["Local first, no account", "5-source recipe capture", "On device OCR", "FTS5 search · 168k index", "Pantry aware matching"],
  takeaway:
    "Relevant for local first products, content extraction, on device AI, SQLite search and privacy conscious architecture.",
  heroShot: "grocs/07-add",
  heroAlt:
    "Grocs add recipe screen in the basil noir theme, offering capture from a link, pasted text, screenshot or photo, saved video, or manual entry, with a warning that AI capture can make mistakes.",
  atAGlance: {
    problem:
      "Recipes live in the messiest corners of the internet, links, captions, screenshots, videos, and 'just save it' apps quietly ship everything to a server.",
    contribution:
      "The whole product: a deterministic first extraction pipeline, a human review state machine, on device AI, SQLite full text search over a bundled index, and pantry aware meal matching, with no account and no backend.",
    stack: ["Expo", "React Native", "TypeScript", "SQLite + FTS5", "ML Kit OCR", "whisper.rn"],
    proof:
      "The shipped build captures from five source types, enforces review before save, ships a 2,500-record starter index (full 168k index installable), and matches recipes against the pantry, entirely on device.",
  },
  context: [
    "Grocs is a kitchen companion that answers two questions: where do my scattered recipes go, and what can I cook right now with what I already have?",
    "It is local first as a hard rule, stated in the app itself: no account, no sync server, no ads, no telemetry. The network is touched in exactly three user initiated cases, fetching a page you pasted, downloading an optional model, opening a source link.",
  ],
  challenge: [
    "Recipe sources are hostile input. Some pages carry clean schema.org data; most are a soup of markup, captions, login walls and video descriptions. A pipeline that pretends otherwise either fabricates recipes or fails silently.",
    "The constraint that shaped everything: keep the honesty of the pipeline visible. Every uncertain extraction must say so, land in review, and never reach the library without a human pass, while the whole system runs offline on a phone.",
  ],
  journey: [
    {
      media: "grocs/01-welcome",
      alt: "Grocs welcome screen: save recipes from anywhere, cook what you already have, no ads, no stories, your recipes stay yours.",
      caption: "The promise is the privacy model: the first screen commits to no ads and user owned recipes before asking anything.",
    },
    {
      media: "grocs/04-privacy",
      alt: "Onboarding screen titled where your data lives, stating that recipes, pantry, screenshots and videos stay on the device.",
      caption: "Local first is explained in plain words during onboarding, an architecture decision presented as a user promise.",
    },
    {
      media: "grocs/05-on-device-ai",
      alt: "Onboarding screen for optional on device AI models, around 75 MB each, installable now or later, with a heads up that AI capture can make mistakes.",
      caption: "AI is opt in and on device: models are optional downloads, removable any time, and arrive with an honest mistakes warning.",
    },
    {
      media: "grocs/07-add",
      alt: "Add screen with five capture routes: from a link, paste text, screenshot or photo, saved video, write it myself.",
      caption: "Five ways in, one rule out: every capture route feeds the same reviewed pipeline, including 'write it myself, no AI involved'.",
    },
    {
      media: "grocs/08-recipes",
      alt: "Recipes tab showing 0 saved and 2,500 in the index, with search and status filters, plus index records from named sources.",
      caption: "Your library and the community index stay visibly separate: index records keep their source and never pretend to be full recipes.",
    },
    {
      media: "grocs/09-pantry",
      alt: "Pantry tab with all, pantry, fridge and freezer filters and an empty state inviting the first item.",
      caption: "The pantry is the other half of the product, what you have drives what Grocs suggests you cook.",
    },
    {
      media: "grocs/10-shopping",
      alt: "Shopping tab where missing ingredients from any recipe can be added in one tap.",
      caption: "The gap between a recipe and your pantry becomes a categorised shopping list in one tap.",
    },
  ],
  built: [
    {
      lane: "Extraction pipeline",
      items: [
        "A best-evidence-first strategy chain: URL normalisation → JSON-LD Recipe → Microdata → YouTube description → public social captions → readability heuristics",
        "Honest failure modes with their own copy, login walls route to paste/screenshot; bare video links route to on device capture",
        "A capture-job state machine: queued → processing → needs_review → saved, with failed → queued on retry",
      ],
    },
    {
      lane: "On device AI",
      items: [
        "ML Kit OCR for screenshots and video keyframes, feeding a rule based structurer",
        "whisper.rn transcription wired for audio files; models managed with size and free space checks, resumable installs and one tap removal",
        "A SmolVLM2 vision adapter with a validated output contract, deliberately shipped as adapter only, and described that way",
      ],
    },
    {
      lane: "Data & search",
      items: [
        "SQLite with migrations and typed repositories; FTS5 full text search with a fallback path",
        "A bundled 2,500-record starter index; the optional full index (168,442 records) installs from Settings and removes in one tap",
        "Every index record keeps its source name, URL and licence, attribution is seeded into the database itself",
      ],
    },
    {
      lane: "Matching & lists",
      items: [
        "Canonicalised ingredients matched pantry-to-recipe with a weighted score: match 0.45 · uses-expiring 0.25 · missing-count 0.15 · time 0.10 · preference 0.05",
        "Staples (salt, pepper, water, oil, sugar) never block 'can cook now'",
        "Missing ingredients become a categorised shopping list in one tap; backup is a single user owned JSON export",
      ],
    },
    {
      lane: "Design system & quality",
      items: [
        "A three layer token architecture (primitives → semantic → component) with six switchable palettes, light and dark",
        "A test suite that enforces token contrast and pipeline behaviour, including that nothing reaches 'saved' without review",
      ],
    },
  ],
  decisions: [
    {
      title: "Deterministic first, AI second",
      body:
        "Structured data (JSON-LD, Microdata) is always preferred; OCR and heuristics only run when evidence is weaker, and their output is flagged.",
      tradeoff:
        "More strategies to maintain than one model call, but clean sources stay perfect, and AI mistakes are contained to where AI actually ran.",
    },
    {
      title: "A human gate the code enforces",
      body:
        "The needs_review state is not a suggestion: the transition to saved is only reachable through the review screen, and tests pin that behaviour.",
      tradeoff:
        "One extra screen on every AI touched capture. Chosen deliberately, a wrong temperature in a recipe is a real world failure, not a UI bug.",
    },
    {
      title: "Ship a small index, make the big one optional",
      body:
        "2,500 curated records bundle into the app; the 532 MB full index is a user initiated install with one tap removal that never touches personal recipes.",
      tradeoff:
        "Power users take one extra step, in exchange, the app stays a small download and the user decides what half a gigabyte of storage is worth.",
    },
    {
      title: "State the privacy model inside the product",
      body:
        "Local first is written into onboarding and Settings in plain language, including the three exact cases where the network is touched.",
      tradeoff:
        "The copy makes promises the architecture must keep forever, which is precisely the discipline a privacy product needs.",
    },
    {
      title: "Adapters over vapourware",
      body:
        "The SmolVLM2 vision provider ships as an adapter with a validated output contract and written wiring docs, and the app never pretends the capability is live.",
      tradeoff:
        "A less impressive feature list today, in exchange for a codebase and a marketing story that agree with each other.",
    },
  ],
  underTheHood:
    "Every input, link, text, image, video, share sheet, becomes a capture job in a four state machine, and only the review screen can move a job to saved. Around that core sit the deterministic parsers, the optional on device models, the SQLite/FTS5 store and the pantry matcher.",
  deepDetail: [
    "URL capture normalises first (youtu.be, Shorts and mobile links become canonical; tracking parameters are stripped) so downstream strategies see one shape of URL.",
    "YouTube extraction lifts the video description from the watch page's player response, the 'recipe in the description' norm, with oEmbed as a title/author fallback.",
    "The matcher canonicalises both pantry items and recipe ingredients before scoring, so 'scallions' and 'spring onions' meet in the middle.",
    "The icon system is generated: in app icons are produced from master sheets by repo tooling, and unknown icon names resolve to a safe fallback that logs once instead of crashing.",
    "Known limits are documented, not hidden: native OCR/ASR/share-sheet need a dev build rather than Expo Go; remote video streams are not downloaded or transcribed; walled gardens are not logged into.",
  ],
  gallery: [
    { media: "grocs/01-welcome", alt: "Welcome screen with the core promise.", caption: "The promise: save from anywhere, cook what you have." },
    { media: "grocs/02-starter-index", alt: "Onboarding card describing the 2,500-recipe starter index.", caption: "2,500 records bundled; the 168k index is optional." },
    { media: "grocs/03-themes", alt: "Theme picker with six palettes: basil noir, dragonfruit, ultraviolet, deep sea, oat milk, rice paper.", caption: "Six token driven palettes, light and dark." },
    { media: "grocs/04-privacy", alt: "Where your data lives, local first explanation.", caption: "The privacy model, in the product's own words." },
    { media: "grocs/05-on-device-ai", alt: "Optional on device AI setup.", caption: "Models are optional, on device, removable." },
    { media: "grocs/06-home", alt: "Home with welcome card and add-a-recipe action.", caption: "Home: one clear first action." },
    { media: "grocs/07-add", alt: "Five capture routes into one pipeline.", caption: "Five ways in, one reviewed pipeline out." },
    { media: "grocs/08-recipes", alt: "Recipes tab separating saved recipes from the index.", caption: "Library and index, visibly separate." },
    { media: "grocs/09-pantry", alt: "Pantry with location filters.", caption: "Pantry, fridge, freezer, what you have." },
    { media: "grocs/10-shopping", alt: "Shopping list built from missing ingredients.", caption: "The gap becomes a shopping list." },
    { media: "grocs/11-you", alt: "Settings hub with appearance, on device AI, data, privacy and attribution.", caption: "Data, privacy and attribution as first class settings." },
  ],
  quality: [
    "Contrast is enforced by tests over the token layer, not by eyeballing, palettes cannot ship a failing pair.",
    "The review gate is pinned by tests: no capture path can write to the library without the human pass.",
    "Attribution is architectural: OpenRecipes records (CC BY 3.0) carry their source and licence in the database and in a Settings screen.",
    "AI honesty is product copy: 'AI capture can make mistakes. Review ingredients, quantities, temperatures, and cooking times before saving or cooking.'",
    "48 dp touch targets and an 8-pt spacing grid are design system law in the app.",
  ],
  proofNow: [
    "The shipped build demonstrates the full loop: five capture routes, review gated saving, index search, pantry, shopping list, themes, backup and attribution.",
    "The documented repository carries the state machine, the parser chain, the model manager and the token architecture exactly as described here.",
    "Store availability and usage are not claimed; SmolVLM2 is stated as adapter level, and remote video/audio extraction is stated as out of scope.",
  ],
  tech: [
    { name: "Expo + React Native + TypeScript", why: "one typed codebase, with the native modules (OCR, whisper, share intent) behind a dev build" },
    { name: "SQLite + FTS5", why: "real relational storage and full text search that works on a phone with no server" },
    { name: "ML Kit OCR", why: "on device text recognition for screenshots and video keyframes" },
    { name: "whisper.rn", why: "on device speech to text for audio files, as an optional model" },
    { name: "Deterministic parsers", why: "JSON-LD, Microdata and heuristic extractors that keep AI out of the easy cases" },
    { name: "expo-share-intent", why: "capture from any app's share sheet straight into the pipeline" },
  ],
  enables: [
    "Local first and privacy conscious products where 'no server' is a feature, stated and kept",
    "Content extraction from messy real world sources with honest fallbacks",
    "On device AI done responsibly: optional models, visible warnings, human review gates",
    "Serious client side data work, SQLite schemas, migrations, FTS5 search, bundled datasets",
    "Design systems with enforced accessibility, not aspirational guidelines",
  ],
  next: "policywatch",
};

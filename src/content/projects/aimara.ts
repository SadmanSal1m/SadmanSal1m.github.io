import type { Project } from "./types";

/** Branding switch, if permission to use the AIMARA name is withdrawn,
 *  set useBrandName to false and every instance flips to the neutral title. */
export const AIMARA_BRANDING = {
  useBrandName: true,
  brandName: "AIMARA",
  neutralName: "AI Assisted Aftersales Platform",
};

const NAME = AIMARA_BRANDING.useBrandName
  ? AIMARA_BRANDING.brandName
  : AIMARA_BRANDING.neutralName;

export const aimara: Project = {
  slug: "aimara",
  station: "Operate",
  index: "03",
  name: NAME,
  title: AIMARA_BRANDING.useBrandName
    ? "AIMARA, AI Assisted Aftersales Operations Platform"
    : "AI Assisted Aftersales Operations Platform",
  promise:
    "A secure mobile operations environment for realtime communication, cases, calls, records and AI assisted messaging.",
  category: "Enterprise operations · confidential work project",
  role: "Software & app developering across client, backend and security layers",
  platform: "Android · Ionic Angular + Capacitor · FastAPI · Supabase",
  confidential: "Confidential work project · screens use anonymised demo data",
  anonymisedNote:
    "All names, organisations and message content in these screens are synthetic. Sensitive text was replaced in pixels, not blurred.",
  tags: ["Realtime chat", "Channel governance", "Agora calls", "AI Safe Mode", "Device level security"],
  takeaway:
    "Relevant for operational apps, secure messaging, realtime dashboards, AI assistance and complex admin workflows.",
  heroShot: "aimara/05-chat-privacy",
  heroAlt:
    "AIMARA chat in a privacy channel: member names appear as stable anonymised handles, with system notices for archive and reactivation events.",
  atAGlance: {
    problem:
      "Aftersales operations run on sensitive conversations, cases, calls, records and decisions that ordinary chat apps neither govern nor protect.",
    contribution:
      "Client side product engineering across the Ionic Angular app and its FastAPI/Supabase backend: realtime messaging, channel governance, dashboards, calls integration and the device security layer.",
    stack: ["Ionic Angular", "Capacitor", "FastAPI", "Supabase", "WebSockets", "Agora"],
    proof:
      "The supplied working build demonstrates login, governed channels with three privacy tiers, realtime chat, approval workflows, an operations dashboard and starred-message recall, with security services (biometrics, app lock, root detection, privacy screen, encrypted storage) wired through the client.",
  },
  context: [
    "AIMARA is an operations environment for teams whose day runs on conversations that matter: aftersales cases, scheduled calls, records and the decisions around them. It brings chat, calls, tasks and records into one governed mobile workspace.",
    "It is a confidential work project. Everything shown here uses anonymised demo data, and the write up sticks to what the supplied build and code demonstrate.",
  ],
  challenge: [
    "Operational chat is not consumer chat. Messages relate to cases and records; destructive actions need approvals; some channels must hide member identities even from each other; and the device itself is part of the threat model.",
    "The engineering challenge was to keep all of that governance from suffocating the experience, the app still has to feel like fast, ordinary messaging while every action passes through roles, approvals and security services.",
  ],
  journey: [
    {
      media: "aimara/01-login",
      alt: "AIMARA admin sign in with email and code fields and a Connected to Admin Server status.",
      caption:
        "Entry is deliberately narrow: admin accounts are provisioned, not self registered, and the client confirms its server binding on the login screen.",
    },
    {
      media: "aimara/04-new-channel",
      alt: "New Channel sheet offering Standard, Low Privacy and High Privacy types, with auto archive after seven days and member search.",
      caption:
        "Governance starts at creation: three channel privacy tiers, Standard, Low Privacy with stable anonymised handles, High Privacy with end to end encryption, plus automatic archiving.",
    },
    {
      media: "aimara/03-channels",
      alt: "Channel list with unread and unreplied filters, archive tab, and per channel status notices.",
      caption:
        "The list is triage, not history: Unread and Unreplied filters, archive state and lifecycle notices keep operational load visible.",
    },
    {
      media: "aimara/05-chat-privacy",
      alt: "A privacy tier chat where members appear as stable anonymised handles, with archive and reactivation system notices inline.",
      caption:
        "In Low Privacy channels the app's own anonymisation shows members as stable handles, identity control as a product feature, not an afterthought.",
    },
    {
      media: "aimara/06-dashboard",
      alt: "Operations dashboard with an Upcoming section and an Overdue list of calls and tasks tied to channels and assignees.",
      caption:
        "The dashboard turns conversation into operations: upcoming and overdue calls, tasks and scheduled messages, each tied to a channel and an assignee.",
    },
    {
      media: "aimara/07-starred",
      alt: "Starred Messages sheet listing saved messages with sender and timestamp over an archived chat.",
      caption:
        "Starred messages give operators recall, key commitments resurface without scrolling through history.",
    },
  ],
  built: [
    {
      lane: "Interface",
      items: [
        "Channel list with unread/unreplied/archive triage, rich chat surface, dashboard, social feed, and user & department management screens",
        "Approval driven flows for block, unblock, edit, delete, freeze, unfreeze and channel deletion",
        "Document viewing for PDFs and Office files inside the app",
      ],
    },
    {
      lane: "Realtime & communication",
      items: [
        "WebSocket driven messaging with editing, deletion, forwarding, reactions, labels and favourites",
        "Scheduled messages and channel lifecycle notices rendered inline",
        "Agora powered calls with tokens minted server side; call notes, status and scheduled calls on the dashboard",
      ],
    },
    {
      lane: "Backend & data",
      items: [
        "FastAPI services behind the client; Supabase for data and auth with row level security foundations",
        "Resumable uploads via the tus protocol for unreliable mobile networks",
        "Push notifications through Firebase Cloud Messaging",
      ],
    },
    {
      lane: "AI assistance",
      items: [
        "Language detection and multilingual translation services in the client",
        "AI paraphrasing of drafts, modelled and typed end to end",
        "An AI Safe Mode that reviews and polishes outgoing messages, with a review/edit/cancel window before anything is published",
        "Audio transcription for voice content",
      ],
    },
    {
      lane: "Security engineering",
      items: [
        "Biometric sign in and application locking",
        "Encrypted local storage; root and jailbreak detection; privacy-screen protection against overlays and screenshots",
        "Server side document redaction and forensic image/PDF watermarking",
        "Post quantum encryption groundwork in the backend",
      ],
    },
  ],
  decisions: [
    {
      title: "Privacy tiers as a channel property",
      body:
        "Rather than one global privacy switch, every channel is created as Standard, Low Privacy (members appear under stable anonymised handles) or High Privacy (end to end encrypted).",
      tradeoff:
        "Three behaviour sets to test everywhere identity appears, accepted, because sensitivity genuinely varies per conversation, not per company.",
    },
    {
      title: "Approvals on destructive actions",
      body:
        "Blocking, edits, deletions, freezes and channel removal route through approval workflows instead of executing instantly.",
      tradeoff:
        "Slower in the moment than consumer chat, the point. In an operations record, an unreviewable delete is a liability.",
    },
    {
      title: "Archive as preservation, not disposal",
      body:
        "Channels auto archive on a schedule and can be reactivated; the history is preserved and the state change is announced inside the conversation itself.",
      tradeoff:
        "More lifecycle states in the client, but the audit story stays intact and nothing silently disappears.",
    },
    {
      title: "A review window in front of AI",
      body:
        "Safe Mode never publishes on its own: polished messages sit in a pending window where the sender can edit or cancel before anything leaves the device.",
      tradeoff:
        "A deliberate pause in the send flow, chosen so AI assistance never becomes AI authorship in a compliance sensitive channel.",
    },
    {
      title: "Treat the device as hostile",
      body:
        "Biometric lock, encrypted storage, root detection and privacy-screen protection run in the client, because in field operations the phone itself is an attack surface.",
      tradeoff:
        "Extra friction on compromised devices by design; the security layer is capability gated so legitimate devices stay smooth.",
    },
  ],
  underTheHood:
    "One governed loop: the Ionic Angular client talks to FastAPI over REST and WebSockets; Supabase holds identity and data behind row level security; Agora carries live calls with server minted tokens; and the AI services sit behind a human review window. Device security services wrap the whole client.",
  deepDetail: [
    "Client services are cleanly separated in Angular, chat, dashboard, cases, records, users, language, agora, websocket, resumable upload, each a typed injectable, which is what kept a feature set this wide navigable.",
    "Uploads use the tus resumable protocol so a dropped connection resumes instead of restarting, the difference between usable and unusable on field networks.",
    "The security layer is composed of independent Capacitor services: native biometrics, app lock, encrypted storage, jailbreak/root detection and privacy screen, failures degrade specific capabilities rather than the whole app.",
    "Server side, redaction and watermarking run in the FastAPI layer so originals never round trip to the client unprotected; a post quantum encryption module is present as groundwork.",
    "Cloud deployment configuration (containers, infrastructure as code and SIEM groundwork) exists in the repository; its values are intentionally not reproduced anywhere on this site.",
  ],
  gallery: [
    { media: "aimara/01-login", alt: "Admin sign in with server binding status.", caption: "Provisioned admin entry with server binding." },
    { media: "aimara/02-channels-empty", alt: "Empty channels state with Welcome to AImara message.", caption: "First run state, triage filters ready." },
    { media: "aimara/03-channels", alt: "Channel triage list with filters and lifecycle notices.", caption: "Unread / Unreplied / Archive triage." },
    { media: "aimara/04-new-channel", alt: "Channel creation with three privacy tiers.", caption: "Three privacy tiers, set at creation." },
    { media: "aimara/05-chat-privacy", alt: "Chat with anonymised stable handles.", caption: "Low Privacy: stable anonymised handles." },
    { media: "aimara/06-dashboard", alt: "Operations dashboard with overdue calls and tasks.", caption: "Conversation turned into operations." },
    { media: "aimara/07-starred", alt: "Starred messages sheet.", caption: "Recall for the messages that matter." },
  ],
  quality: [
    "Anonymisation on this page is pixel replacement with synthetic content, never blur, which can be reversed.",
    "Nothing from the project's infrastructure, endpoints, keys, identifiers, Terraform values, appears on this site.",
    "Feature claims follow the supplied working build and code first; capabilities confirmed by the product owner but absent from this slice are described as product features, never demonstrated as proof.",
    "The client's security posture is layered: authentication, biometric lock, encrypted storage, device attestation and screen protection are separate services, so one failure does not disable the rest.",
  ],
  proofNow: [
    "The supplied build demonstrates provisioned login, governed channel creation with privacy tiers, realtime chat, triage, dashboard operations and starred recall.",
    "The codebase carries the full service architecture, chat, cases, records, users, language, calls, uploads, security, as typed Angular services against a FastAPI/Supabase backend.",
    "No customer names, deployment scale or usage figures are claimed; this is a confidential work project.",
  ],
  tech: [
    { name: "Ionic Angular + Capacitor", why: "a mature enterprise client framework with native device bridges for the security layer" },
    { name: "FastAPI", why: "typed Python services for messaging, media, redaction, watermarking and push" },
    { name: "Supabase (Postgres + RLS)", why: "relational data and auth with row level security as the tenancy foundation" },
    { name: "WebSockets", why: "live message delivery and presence" },
    { name: "Agora", why: "production grade realtime voice with server minted, expiring tokens" },
    { name: "tus resumable uploads", why: "media transfer that survives field network drops" },
    { name: "Firebase Cloud Messaging", why: "push delivery on Android" },
  ],
  enables: [
    "Operations and field service apps where chat, tasks, calls and records are one workflow",
    "Secure messaging with governance: roles, approvals, archives and audit friendly lifecycles",
    "Realtime dashboards driven by the same events as the conversation",
    "AI features deployed responsibly, assistance with a human review window, not auto publishing",
    "Mobile security engineering: biometrics, encrypted storage, device attestation, screen protection",
  ],
  next: "grocs",
};

import type { RoomId } from "./projects/types";

/* ---------------- Services (each links back to concrete proof) ---------------- */
export interface Service {
  id: string;
  title: string;
  body: string;
  proof: { label: string; href: string; room: RoomId }[];
}

export const services: Service[] = [
  {
    id: "mobile",
    title: "Cross platform mobile application development",
    body: "Complete iOS and Android products from one codebase, navigation, state, persistence, native modules and the release plumbing around them.",
    proof: [
      { label: "Computer vision on device, DentXpert", href: "/work/dentxpert", room: "dentxpert" },
      { label: "Local first architecture, Grocs", href: "/work/grocs", room: "grocs" },
    ],
  },
  {
    id: "ai",
    title: "AI, OCR, language and intelligent feature integration",
    body: "On device and API based intelligence with the guardrails that make it shippable: review windows, honest warnings and validated outputs.",
    proof: [
      { label: "Reviewed capture pipeline, Grocs", href: "/work/grocs#decisions", room: "grocs" },
      { label: "AI Safe Mode with a review window, AIMARA", href: "/work/aimara#decisions", room: "aimara" },
    ],
  },
  {
    id: "realtime",
    title: "Realtime chat, dashboards and operational systems",
    body: "WebSocket messaging, live calls, governed channels and dashboards that turn conversation into operations.",
    proof: [
      { label: "Governed realtime operations, AIMARA", href: "/work/aimara", room: "aimara" },
      { label: "Seasonal leaderboards & friends, NaqiVerse", href: "/work/naqiverse#built", room: "naqiverse" },
    ],
  },
  {
    id: "fullstack",
    title: "Full stack product implementation and app modernisation",
    body: "Backends, databases, security layers and upload pipelines behind the screens, plus bringing existing apps up to modern architecture.",
    proof: [
      { label: "FastAPI + Supabase + device security, AIMARA", href: "/work/aimara#hood", room: "aimara" },
      { label: "SQLite, FTS5 and a 168k index, Grocs", href: "/work/grocs#hood", room: "grocs" },
    ],
  },
  {
    id: "webapps",
    title: "Web applications with background work, security and explainable AI",
    body: "Next.js and TypeScript products with the parts that make them real: scheduled workers, safe outbound fetching, diff engines, rules engines, and AI that explains evidence instead of replacing it.",
    proof: [
      { label: "Monitoring, workers and diffs, PolicyWatch", href: "/work/policywatch", room: "policywatch" },
      { label: "Explainable security analysis, ScamLens", href: "/work/scamlens", room: "scamlens" },
    ],
  },
  {
    id: "saas",
    title: "Multi tenant SaaS platforms with roles, audit logs and public pages",
    body: "Organisations, memberships and role based access enforced on the server; typed timelines and audit logs; public views built so private data cannot leak.",
    proof: [
      { label: "Tenancy, RBAC and a status page, IncidentKit", href: "/work/incidentkit", room: "incidentkit" },
      { label: "Timeline and postmortems from the record, IncidentKit", href: "/work/incidentkit#built", room: "incidentkit" },
    ],
  },
];

/* ---------------- How I work ---------------- */
export const process = [
  {
    step: "Understand the product and constraints",
    body: "What the product must do, for whom, under which privacy, platform and budget realities, written down before anything is designed.",
  },
  {
    step: "Design the experience and the system",
    body: "Screens and state machines together. An interface that ignores its data model is a mockup, not a design.",
  },
  {
    step: "Build in testable increments",
    body: "Vertical slices that run end to end early, with the risky parts, realtime, native modules, AI, pulled forward, not saved for last.",
  },
  {
    step: "Validate across devices and edge cases",
    body: "Offline, mid action kills, hostile inputs, small screens, reduced motion. The edge cases are where products earn trust.",
  },
  {
    step: "Prepare for deployment and handover",
    body: "Store policy pages, environment configuration, documentation and a codebase the next person can actually pick up.",
  },
] as const;

/* ---------------- Technical capability map ---------------- */
export interface CapabilityGroup {
  group: string;
  summary: string;
  items: string[];
}

export const capabilities: CapabilityGroup[] = [
  {
    group: "Web",
    summary: "Web applications that do real work",
    items: ["Next.js + React", "TypeScript", "PostgreSQL", "Background workers and queues", "Safe outbound fetching (SSRF protection)", "Diff and rules engines", "Static hosting: GitHub Pages, Cloudflare"],
  },
  {
    group: "Mobile",
    summary: "Cross platform apps that feel native",
    items: ["React Native + Expo", "Ionic Angular + Capacitor", "Flutter", "Expo Router navigation", "Reanimated & gesture systems", "Native modules: biometrics, OCR, share intents"],
  },
  {
    group: "Frontend",
    summary: "Interfaces built on systems, not one offs",
    items: ["TypeScript", "Angular", "React", "Design token architectures", "State: Zustand, RxJS", "Accessibility: reduced motion, labels, contrast"],
  },
  {
    group: "Backend & data",
    summary: "The services behind the screens",
    items: ["FastAPI (Python)", "Supabase / Postgres with row level security", "SQLite + FTS5 on device", "Firebase Auth + Firestore", "Resumable uploads (tus)", "Cloud deployment on GCP"],
  },
  {
    group: "Realtime communication",
    summary: "Live systems people rely on",
    items: ["WebSockets", "Agora voice calls with token minting", "Push notifications (FCM)", "Presence, receipts and lifecycle events"],
  },
  {
    group: "Applied AI",
    summary: "Intelligence with guardrails",
    items: ["On device OCR (ML Kit)", "Speech to text (whisper.rn)", "YOLOv8 computer vision", "Language detection & translation services", "LLM assisted drafting behind review windows", "Validated output contracts"],
  },
  {
    group: "Quality & delivery",
    summary: "How it stays shippable",
    items: ["Unit tests over logic and design tokens", "State machine enforced flows", "Privacy engineering & data hygiene", "Store policy groundwork", "Documentation people can follow"],
  },
];

/* ---------------- Experience & recognition ---------------- */
export interface TimelineItem {
  when: string; // verified dates only; empty string when unconfirmed
  what: string;
  detail: string;
  kind: "education" | "work" | "award" | "research";
}

export const timeline: TimelineItem[] = [
  {
    when: "",
    what: "Independent web and mobile development (ongoing)",
    detail: "Four years of client and personal projects: web applications and mobile apps shipped end to end, most recently PolicyWatch, ScamLens and IncidentKit.",
    kind: "work",
  },
  {
    when: "2026 – 2027",
    what: "MSc Advanced Computer Science, Glasgow Caledonian University London",
    detail: "Postgraduate study in London alongside independent web and mobile work.",
    kind: "education",
  },
  {
    when: "Oct 2024 – Jul 2026",
    what: "Software Engineer, Devco (internship, then part time)",
    detail: "Hands on product engineering on a confidential enterprise platform: realtime systems, mobile security and AI assisted features (see the AIMARA case study). Completed July 2026.",
    kind: "work",
  },
  {
    when: "",
    what: "BSc Computer Science (Honours), IIUM, 2020 – 2025",
    detail: "Software Engineering & AI specialisation, International Islamic University Malaysia. CGPA 3.52 / 4.00, with multiple Dean's List appearances.",
    kind: "education",
  },
  {
    when: "",
    what: "Published computer vision research",
    detail: "\u201cDeep Learning Approach for Dental Anomalies X-ray Imaging using YOLOv8\u201d, realtime detection from dental imagery, evaluated with precision, recall and mAP.",
    kind: "research",
  },
  {
    when: "2024",
    what: "JIIICaS Gold Award, DentXpert",
    detail: "Gold Award at JIIICaS 2024 for DentXpert, a YOLOv8 based dental caries detection system built as a final year project.",
    kind: "award",
  },
];

/* ---------------- DentXpert research module ---------------- */

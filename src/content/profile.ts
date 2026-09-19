/** Central profile configuration, every page reads identity, links and
 *  hero copy from here. Update this file, not the components. */

export const profile = {
  fullName: "Md Salim Sadman Taseen",
  displayName: "Salim Sadman",
  title: "Software Engineer · Web & Mobile",
  descriptor: "Web Applications · Mobile Apps · Applied AI",
  email: "sadmantaseen1030@gmail.com",
  github: "https://github.com/sadmansal1m",

  /** Set the Fiverr profile URL here when available. While null, every
   *  "Hire me" CTA gracefully falls back to a labelled email action. */
  fiverrUrl: "https://www.fiverr.com/xperteyes_" as string | null,
  upworkUrl: "https://www.upwork.com/freelancers/~01a4caa85343981881",

  /** Optional approved portrait, e.g. "/media/profile/portrait.webp".
   *  While null, the typographic monogram is used. Never a generated face. */
  portrait: null as string | null,

  hero: {
    eyebrow: "Web applications · Mobile apps · Applied AI",
    headline: "Web and Mobile products, realtime systems and AI, built end to end",
    support:
      "I design and build the whole thing: the web applications and mobile apps people use, the backend services, data and background workers underneath, and the AI features that have to be safe to automate. Four years of websites and web applications, two years of production engineering.",
    primaryCta: "Explore Projects",
    hireCta: "Hire me on Fiverr",
    hireFallbackCta: "Hire me by email",
    hireFallbackNote: "Fiverr profile coming soon",
  },

  proofRail: [
    "MSc Advanced Computer Science, Glasgow Caledonian University London",
    "BSc Computer Science (Hons) · Software Engineering & AI, IIUM",
    "Three live web applications, three shipped mobile apps",
    "JIIICaS 2024 Gold Award · published computer vision research",
  ],

  about: {
    short:
      "I'm a software engineer in London, studying for an MSc in Advanced Computer Science at Glasgow Caledonian University London after a BSc in Software Engineering and AI. I like whole products more than isolated screens: the same hands that shape a page or an interface should understand the state machine, the database and the failure modes behind it. The seven case studies here are that belief shipped as web applications and mobile apps, on top of four years of client and personal builds.",
    location: "London, UK",
  },

  finalCta: {
    heading: "Have a web application, a mobile product or an AI feature to build?",
    body: "I take on builds end to end, from the first page or screen to the backend, data and the intelligent parts.",
  },
} as const;

/** Pure so tests can exercise both branches. */
export function computeHire(fiverrUrl: string | null, email: string) {
  return {
    href: fiverrUrl ?? `mailto:${email}?subject=Project%20enquiry`,
    label: fiverrUrl ? profile.hero.hireCta : profile.hero.hireFallbackCta,
    isFiverr: Boolean(fiverrUrl),
  };
}

export function hireHref(): string {
  return computeHire(profile.fiverrUrl, profile.email).href;
}
export function hireLabel(): string {
  return profile.fiverrUrl ? profile.hero.hireCta : profile.hero.hireFallbackCta;
}
export function hireIsFiverr(): boolean {
  return Boolean(profile.fiverrUrl);
}

export const site = {
  name: "Salim Sadman, Software Engineer, Web & Mobile",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sadman.tech",
  description:
    "Portfolio of Salim Sadman, software engineer in London. Web applications and mobile apps built end to end, with applied AI where it earns its place. Case studies: PolicyWatch, ScamLens, IncidentKit, DentXpert, NaqiVerse, AIMARA and Grocs.",
} as const;

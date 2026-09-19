import type { MediaId } from "../media.gen";

export type RoomId = "dentxpert" | "naqiverse" | "aimara" | "grocs" | "policywatch" | "scamlens" | "incidentkit";
/** Rooms whose screenshots are web pages: rendered in a browser frame instead of a phone. */
export const BROWSER_ROOMS: ReadonlySet<RoomId> = new Set<RoomId>(["policywatch", "scamlens", "incidentkit"]);

export interface Shot {
  media: MediaId;
  alt: string;
  caption: string;
}

export interface BuiltLane {
  lane: string;
  items: string[];
}

export interface Decision {
  title: string;
  body: string;
  tradeoff: string;
}

export interface TechItem {
  name: string;
  why: string;
}

export interface Project {
  slug: RoomId;
  station: string; // exhibition station label, e.g. "Play"
  index: string; // "01"
  name: string;
  title: string; // full public title
  promise: string; // one line value
  category: string;
  role: string;
  platform: string;
  confidential?: string; // confidentiality label when relevant
  anonymisedNote?: string;
  tags: string[];
  takeaway: string; // client oriented takeaway
  heroShot: MediaId;
  heroAlt: string;
  atAGlance: {
    problem: string;
    contribution: string;
    stack: string[];
    proof: string;
  };
  context: string[];
  challenge: string[];
  journey: Shot[]; // core experience sequence (subset ordering of gallery)
  built: BuiltLane[];
  decisions: Decision[];
  underTheHood: string; // intro paragraph above the diagram
  deepDetail: string[]; // progressive disclosure technical notes
  gallery: Shot[];
  quality: string[]; // quality, privacy and accessibility evidence
  proofNow: string[]; // outcome / current proof (verified only)
  tech: TechItem[];
  enables: string[]; // what this experience enables for clients
  next: RoomId;
  links?: { label: string; href: string; note?: string }[]; // live app, store listing, repo
}

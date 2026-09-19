import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { projects } from "@/content/projects";
import { MEDIA, type MediaId } from "@/content/media.gen";
import { computeHire, profile, site } from "@/content/profile";
import { capabilities, services, timeline } from "@/content/sections";

/** These tests encode the project's honesty rules. If future edits introduce
 *  lorem ipsum, an unverifiable superlative, a dead media reference or a
 *  claim the source audit rejected, the suite fails. */

const BANNED = [
  "lorem ipsum",
  "124 languages", // audit: unverified README claim — must not appear
  "14 dimension", // audit: unverified matcher claim
  "world-class",
  "world class",
  "guaranteed",
  "100% secure",
  "unhackable",
  "military-grade",
  "best in the world",
  "cutting-edge", // tone rule: banned marketing filler
  "revolutionary",
  "5-star",
  "downloads on the app store",
];

function allStrings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => allStrings(x, out));
  return out;
}

describe("truthfulness guards", () => {
  const corpus = allStrings({ projects, profile, services, capabilities, timeline })
    .join("\n")
    .toLowerCase();

  for (const phrase of BANNED) {
    it(`never says “${phrase}”`, () => {
      expect(corpus).not.toContain(phrase);
    });
  }

  it("does not claim store availability or user counts anywhere", () => {
    expect(corpus).not.toMatch(/\b(available|live)\s+on\s+the\s+(app|play)\s*store\b/);
    expect(corpus).not.toMatch(/\b\d[\d,.]*\s*\+?\s*(users|downloads|clients|customers)\b/);
  });

  it("AIMARA case carries the anonymisation note and confidentiality banner", () => {
    const am = projects.find((p) => p.slug === "aimara")!;
    expect(am.anonymisedNote).toBeTruthy();
    expect(am.confidential).toBeTruthy();
  });
});

describe("media wiring", () => {
  const pub = path.join(__dirname, "../../public");
  const ids = new Set(Object.keys(MEDIA));

  it("every MEDIA entry points at a real file with real dimensions", () => {
    for (const [id, m] of Object.entries(MEDIA)) {
      expect(existsSync(path.join(pub, m.src)), `${id} → ${m.src}`).toBe(true);
      expect(m.width).toBeGreaterThan(0);
      expect(m.height).toBeGreaterThan(0);
      expect(m.blurDataURL.startsWith("data:image/")).toBe(true);
    }
  });

  it("every shot referenced by content exists in MEDIA and has alt + caption", () => {
    const shots = projects.flatMap((p) => [...p.journey, ...p.gallery]);
    for (const s of shots) {
      expect(ids.has(s.media), `missing media id ${s.media}`).toBe(true);
      expect(s.alt.trim().length, `empty alt for ${s.media}`).toBeGreaterThan(8);
      expect(s.caption.trim().length, `empty caption for ${s.media}`).toBeGreaterThan(8);
    }
    for (const p of projects) {
      expect(ids.has(p.heroShot)).toBe(true);
      expect(p.heroAlt.trim().length).toBeGreaterThan(8);
    }
  });

  it("gallery ids are unique within each project", () => {
    for (const p of projects) {
      const seen = p.gallery.map((g) => g.media);
      expect(new Set(seen).size).toBe(seen.length);
    }
  });
});

describe("hire CTA (Fiverr URL configured; fallback path still verified)", () => {
  it("without a Fiverr URL: mailto + honest label", () => {
    const h = computeHire(null, profile.email);
    expect(h.isFiverr).toBe(false);
    expect(h.href).toContain(`mailto:${profile.email}`);
    expect(h.label).toBe(profile.hero.hireFallbackCta);
  });
  it("with a Fiverr URL: external link + Fiverr label", () => {
    const h = computeHire("https://www.fiverr.com/example", profile.email);
    expect(h.isFiverr).toBe(true);
    expect(h.href).toBe("https://www.fiverr.com/example");
    expect(h.label).toBe(profile.hero.hireCta);
  });
  it("live config points at the owner's Fiverr profile", () => {
    const h = computeHire(profile.fiverrUrl, profile.email);
    expect(h.isFiverr).toBe(true);
    expect(h.href).toBe("https://www.fiverr.com/xperteyes_");
    expect(profile.upworkUrl).toBe("https://www.upwork.com/freelancers/~01a4caa85343981881");
  });
  it("site config points at the live domain", () => {
    expect(site.url).toBe("https://sadman.tech");
  });
  it.skip("site config still uses the placeholder domain (owner must set before deploy)", () => {
    // Not a failure — an executable reminder. Flip this test when the domain is real.
    expect(site.url).toContain("example");
  });
});

describe("structure invariants", () => {
  it("seven projects, stations 01–07, next-links form a cycle", () => {
    expect(projects).toHaveLength(7);
    expect(projects.map((p) => p.index)).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
    const slugs = new Set(projects.map((p) => p.slug));
    for (const p of projects) {
      expect(slugs.has(p.next)).toBe(true);
      expect(p.next).not.toBe(p.slug);
    }
  });
  it("every project has the full case-study skeleton", () => {
    for (const p of projects) {
      expect(p.journey.length).toBeGreaterThanOrEqual(4);
      expect(p.gallery.length).toBeGreaterThanOrEqual(4);
      expect(p.decisions.length).toBeGreaterThanOrEqual(3);
      expect(p.built.length).toBeGreaterThanOrEqual(3);
      expect(p.tech.length).toBeGreaterThanOrEqual(4);
      expect(p.quality.length).toBeGreaterThanOrEqual(4);
      expect(p.enables.length).toBeGreaterThanOrEqual(3);
      for (const d of p.decisions) expect(d.tradeoff.trim().length).toBeGreaterThan(20);
    }
  });
  it("each media id used on the resume/home hero exists", () => {
    const heroIds: MediaId[] = ["naqiverse/01-home", "aimara/05-chat-privacy", "grocs/08-recipes"];
    for (const id of heroIds) expect(MEDIA[id]).toBeTruthy();
  });
});

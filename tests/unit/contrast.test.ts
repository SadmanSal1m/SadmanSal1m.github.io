import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/** WCAG 2.x relative luminance + contrast ratio, computed over the *actual*
 *  tokens parsed from globals.css — so a colour tweak that breaks AA fails CI,
 *  not a code review. */

function srgb(c: number) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function luminance(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}
export function contrast(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const css = readFileSync(path.join(__dirname, "../../src/app/globals.css"), "utf8");
function token(name: string): string {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --${name} not found as a hex value in globals.css`);
  return m[1];
}
/** Ink-surface text tokens are rgba() over the surface — composite them the
 *  way the browser will before measuring contrast. */
function rgbaToken(name: string): [number, number, number, number] {
  const m = css.match(new RegExp(`--${name}:\\s*rgba\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*([\\d.]+)\\)`));
  if (!m) throw new Error(`token --${name} not found as rgba in globals.css`);
  return [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])];
}
function composite(fg: [number, number, number, number], bgHex: string): string {
  const bg = bgHex.replace("#", "");
  const b = [0, 1, 2].map((i) => parseInt(bg.slice(i * 2, i * 2 + 2), 16));
  const out = [0, 1, 2].map((i) => Math.round(fg[i] * fg[3] + b[i] * (1 - fg[3])));
  return out.map((c) => c.toString(16).padStart(2, "0")).join("");
}

function lightToken(name: string): string {
  const idx = css.indexOf('[data-theme="light"]');
  const m = css.slice(idx).match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`light token --${name} not found`);
  return m[1];
}

const AA = 4.5;
const AA_LARGE = 3;

describe("WCAG AA contrast — dark theme (default)", () => {
  const porcelain = token("porcelain");
  it("body ink on porcelain", () => expect(contrast(token("ink"), porcelain)).toBeGreaterThanOrEqual(7));
  it("soft ink on porcelain", () => expect(contrast(token("ink-soft"), porcelain)).toBeGreaterThanOrEqual(AA));
  it("faint ink (small labels) on porcelain", () =>
    expect(contrast(token("ink-faint"), porcelain)).toBeGreaterThanOrEqual(AA));
  it("faint ink on the blush wash", () =>
    expect(contrast(token("ink-faint"), token("nq-wash"))).toBeGreaterThanOrEqual(AA));
  it("NaqiVerse accent-ink on porcelain and wash", () => {
    expect(contrast(token("nq-blush-ink"), porcelain)).toBeGreaterThanOrEqual(AA);
    expect(contrast(token("nq-blush-ink"), token("nq-wash"))).toBeGreaterThanOrEqual(AA);
  });
  it("Grocs accent-ink on porcelain and rice", () => {
    expect(contrast(token("gr-basil-ink"), porcelain)).toBeGreaterThanOrEqual(AA);
    expect(contrast(token("gr-basil-ink"), token("gr-rice"))).toBeGreaterThanOrEqual(AA);
  });
  it("AIMARA crimson-ink on porcelain (used as text accent)", () =>
    expect(contrast(token("am-crimson-ink"), porcelain)).toBeGreaterThanOrEqual(AA));
});

describe("WCAG AA contrast — ink surfaces", () => {
  const graphite = token("am-graphite");
  const inkSurface = token("ink-surface");
  const onInk = token("on-ink");
  const soft = rgbaToken("on-surface-soft-ink");
  const faint = rgbaToken("on-surface-faint-ink");
  it("on-ink text on graphite and the ink surface", () => {
    expect(contrast(onInk, graphite)).toBeGreaterThanOrEqual(7);
    expect(contrast(onInk, inkSurface)).toBeGreaterThanOrEqual(7);
  });
  it("soft on-ink text composites to AA on both dark surfaces", () => {
    expect(contrast(composite(soft, graphite), graphite)).toBeGreaterThanOrEqual(AA);
    expect(contrast(composite(soft, inkSurface), inkSurface)).toBeGreaterThanOrEqual(AA);
  });
  it("faint on-ink labels composite to AA on both dark surfaces", () => {
    expect(contrast(composite(faint, graphite), graphite)).toBeGreaterThanOrEqual(AA);
    expect(contrast(composite(faint, inkSurface), inkSurface)).toBeGreaterThanOrEqual(AA);
  });
  it("AIMARA rose accent (text) on graphite", () =>
    expect(contrast(token("am-rose"), graphite)).toBeGreaterThanOrEqual(AA));
});

describe("decorative-only colours still clear large-text floor", () => {
  it("raw room accents vs their surfaces (never used for small text)", () => {
    expect(contrast(token("am-crimson"), lightToken("porcelain"))).toBeGreaterThanOrEqual(AA_LARGE);
    expect(contrast(token("gr-basil"), token("gr-noir"))).toBeGreaterThanOrEqual(AA_LARGE);
    expect(contrast(token("nq-blush"), token("am-graphite"))).toBeGreaterThanOrEqual(AA_LARGE);
  });
});

describe("WCAG AA contrast — light theme (opt in)", () => {
  const porcelain = lightToken("porcelain");
  it("body and faint ink on light porcelain", () => {
    expect(contrast(lightToken("ink"), porcelain)).toBeGreaterThanOrEqual(7);
    expect(contrast(lightToken("ink-faint"), porcelain)).toBeGreaterThanOrEqual(AA);
  });
  it("room accent inks hold AA on light surfaces", () => {
    expect(contrast(lightToken("nq-blush-ink"), lightToken("nq-wash"))).toBeGreaterThanOrEqual(AA);
    expect(contrast(lightToken("dx-teal-ink"), lightToken("dx-wash"))).toBeGreaterThanOrEqual(AA);
    expect(contrast(lightToken("gr-basil-ink"), lightToken("gr-rice"))).toBeGreaterThanOrEqual(AA);
    expect(contrast(lightToken("am-crimson-ink"), porcelain)).toBeGreaterThanOrEqual(AA);
  });
});

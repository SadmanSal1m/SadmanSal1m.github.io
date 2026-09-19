"use client";

import { TECH_ICONS } from "@/content/icons.gen";
import { useTheme } from "./theme-provider";

/** Rough perceptual luminance of a brand hex, for legibility overrides. */
function lum(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Two counter scrolling rows of official brand icons (Simple Icons, CC0) in
 *  their real colors. Every row carries the full set so a copy never repeats
 *  inside the visible strip; brands too dark for dark mode (or too light for
 *  light mode) fall back to the ink token. */
export function SkillsMarquee() {
  const { theme } = useTheme();
  const fill = (hex: string) => {
    const L = lum(hex);
    if (theme === "dark" && L < 0.16) return "var(--ink)";
    if (theme === "light" && L > 0.82) return "var(--ink)";
    return `#${hex}`;
  };
  const rows: [typeof TECH_ICONS, typeof TECH_ICONS] = [TECH_ICONS, [...TECH_ICONS].reverse()];
  return (
    <div aria-label="Toolset" className="mx-auto max-w-4xl space-y-5">
      {rows.map((row, ri) => (
        <div key={ri} className="marquee">
          <ul className="marquee-track items-center" data-dir={ri === 1 ? "rtl" : undefined} style={{ gap: "3rem" }}>
            {[...row, ...row].map((item, i) => (
              <li
                key={`${item.label}-${i}`}
                aria-hidden={i >= row.length || undefined}
                title={item.label}
                className="opacity-85 transition-opacity hover:opacity-100"
              >
                <svg role="img" aria-label={item.label} viewBox="0 0 24 24" width="32" height="32" fill={fill(item.hex)}>
                  <path d={item.path} />
                </svg>
                <span className="sr-only">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

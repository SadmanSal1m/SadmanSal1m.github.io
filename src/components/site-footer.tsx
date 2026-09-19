"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/content/profile";
import { useMotionPolicy } from "./motion-provider";

export function SiteFooter() {
  const { staticMode, toggleStatic } = useMotionPolicy();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <footer data-surface="ink" className="grain bg-[color:var(--surface)] text-[color:var(--on-surface)]">
      <div className="container-x flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-[600]">{profile.displayName}</p>
          <p className="mt-1 font-mono text-[0.75rem] tracking-[0.1em] text-[color:var(--on-surface-faint)]">
            {profile.title.toUpperCase()} · {profile.about.location.toUpperCase()}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.92rem]">
            <a className="link-quiet" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button onClick={copyEmail} className="link-quiet font-mono text-[0.75rem]" type="button">
              {copied ? "Copied ✓" : "Copy email"}
            </button>
            <a className="link-quiet" href={profile.github} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            {profile.fiverrUrl ? (
              <a className="link-quiet" href={profile.fiverrUrl} target="_blank" rel="noreferrer noopener">
                Fiverr
              </a>
            ) : null}
            <a className="link-quiet" href={profile.upworkUrl} target="_blank" rel="noreferrer noopener">
              Upwork
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <nav aria-label="Footer" className="flex gap-5 font-mono text-[0.78rem]">
            <Link className="link-quiet" href="/#work">
              Work
            </Link>
            <Link className="link-quiet" href="/about">
              About
            </Link>
            <Link className="link-quiet" href="/resume">
              Resume
            </Link>
          </nav>
          <button
            type="button"
            onClick={toggleStatic}
            aria-pressed={staticMode}
            className="rounded-full border border-[color:var(--line-c)] px-4 py-1.5 font-mono text-[0.7rem] tracking-[0.08em] text-[color:var(--on-surface-soft)] hover:border-[color:var(--on-surface-faint)]"
          >
            Motion: {staticMode ? "Static" : "Full"}, switch
          </button>
          <p className="font-mono text-[0.68rem] text-[color:var(--on-surface-faint)]">
            © {new Date().getFullYear()} {profile.fullName}. Set in Outfit.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { profile, hireIsFiverr } from "@/content/profile";
import { projects } from "@/content/projects";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { Magnetic } from "@/components/magnetic";
import { HeroBackdrop, ShuffleHeadline } from "@/components/effects";
import { HeroMount } from "./hero-mount";

const CHIP_ACCENT: Record<string, string> = {
  dentxpert: "var(--dx-teal)",
  naqiverse: "var(--nq-blush)",
  aimara: "var(--am-crimson)",
  grocs: "var(--gr-basil)",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32">
      <HeroBackdrop />
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{profile.hero.eyebrow}</Eyebrow>
          <ShuffleHeadline text={profile.hero.headline} className="mx-auto mt-4 text-[clamp(2.3rem,5.4vw,4.1rem)]" />
          <p className="mx-auto mt-5 max-w-xl text-[color:var(--ink-soft)]">{profile.hero.support}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <ButtonLink href="#work">{profile.hero.primaryCta}</ButtonLink>
            </Magnetic>
          </div>
          {!hireIsFiverr() ? (
            <p className="mt-2 font-mono text-[0.68rem] tracking-[0.1em] text-[color:var(--ink-faint)]">
              {profile.hero.hireFallbackNote.toUpperCase()}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-10 lg:mt-6">
        <HeroMount />
      </div>

      {/* Always-in-DOM project chips, the accessible counterpart of the constellation */}
      <nav aria-label="Featured projects" className="container-x -mt-2 pb-14">
        <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-2 lg:grid-cols-4">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col gap-1 rounded-[10px] border border-[color:var(--line)] bg-[color:var(--porcelain)] px-4 py-3 transition-colors hover:border-[color:var(--line-strong)]"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: CHIP_ACCENT[p.slug] }}
                  />
                  <span className="font-display text-[0.98rem] font-[600]">{p.name}</span>
                </span>
                <span className="pl-[18px] font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)] transition-colors group-hover:text-[color:var(--ink)]">
                  {p.station} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

import Link from "next/link";
import { profile, hireHref, hireIsFiverr, hireLabel } from "@/content/profile";
import { services, process, capabilities, timeline } from "@/content/sections";
import { Eyebrow, SectionHeading, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FinalCtaBg, Portrait, Spotlight, StarCta } from "@/components/effects";
import { SkillsMarquee } from "@/components/skills-marquee";
import { HireSplit } from "@/components/hire-split";

/* ---------------- proof rail ---------------- */
export function ProofRail() {
  return (
    <section aria-label="Highlights" className="hairline-t hairline-b">
      <ul className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5">
        {profile.proofRail.map((item) => (
          <li key={item} className="font-mono text-[0.72rem] tracking-[0.1em] text-[color:var(--ink-soft)]">
            {item.toUpperCase()}
          </li>
        ))}
      </ul>
    </section>
  );
}


/* ---------------- services ---------------- */
export function Services() {
  const spots = ["rgba(226, 127, 166, 0.16)", "rgba(102, 208, 198, 0.16)", "rgba(238, 189, 110, 0.16)", "rgba(127, 224, 168, 0.16)"];
  return (
    <section id="services" className="hairline-t scroll-mt-16">
      <div className="container-x section-pad">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you"
          lede="Four ways to engage, each pointing at shipped proof, not promises."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Spotlight spotlightColor={spots[i % spots.length]} className="h-full">
                <div className="flex h-full flex-col">
                  <div className="flex items-baseline gap-4">
                    <p className="font-mono text-[0.7rem] tracking-[0.16em] text-[color:var(--ink-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <span aria-hidden="true" className="h-px flex-1 bg-[color:var(--line)]" />
                  </div>
                  <h3 className="mt-4 text-[1.28rem] leading-snug">{s.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--ink-soft)]">{s.body}</p>
                  <ul className="mt-auto space-y-1.5 pt-6">
                    {s.proof.map((pr) => (
                      <li key={pr.href} data-room={pr.room}>
                        <Link
                          href={pr.href}
                          className="link-quiet font-mono text-[0.76rem]"
                          style={{ color: "var(--accent-ink)" }}
                        >
                          {pr.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <StarCta href={hireHref()}>
            <span className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[0.84rem]">Start a project →</span>
          </StarCta>
          <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">
            {hireLabel()}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- process ---------------- */
export function Process() {
  return (
    <section className="hairline-t">
      <div className="container-x section-pad">
        <SectionHeading eyebrow="How I work" title="From constraint to handover" />
        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {process.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 0.05}>
              <p className="font-mono text-[0.8rem] text-[color:var(--ink-faint)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-[1.02rem] leading-snug">{step.step}</h3>
              <p className="mt-2 text-[0.88rem] text-[color:var(--ink-soft)]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- capability map ---------------- */
export function CapabilityMap() {
  return (
    <section className="hairline-t">
      <div className="container-x section-pad">
        <SectionHeading
          eyebrow="Technical capability"
          title="The map, not the bar chart"
          lede="Grouped by what each capability is for. Open a group for the specifics."
        />
        <div className="mt-10">
          <SkillsMarquee />
        </div>
        <div className="mt-12 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <details key={c.group} className="group hairline-b py-4 open:pb-6">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="font-display text-[1.05rem] font-[600]">{c.group}</span>
                  <span className="mt-0.5 block text-[0.85rem] text-[color:var(--ink-soft)]">{c.summary}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.9rem] text-[color:var(--ink-faint)] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[color:var(--line)] px-3 py-1 font-mono text-[0.7rem] text-[color:var(--ink-soft)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- timeline ---------------- */
export function Timeline() {
  return (
    <section className="hairline-t">
      <div className="container-x section-pad">
        <SectionHeading eyebrow="Experience & recognition" title="The path so far" />
        <ol className="mt-12 max-w-2xl space-y-9 border-l border-[color:var(--line)] pl-7">
          {timeline.map((t) => (
            <Reveal as="li" key={t.what} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31.5px] top-1.5 h-2 w-2 rounded-full bg-[color:var(--ink)]"
              />
              <p className="font-mono text-[0.7rem] tracking-[0.12em] text-[color:var(--ink-faint)]">
                {(t.when ? `${t.when} · ` : "") + t.kind.toUpperCase()}
              </p>
              <h3 className="mt-1 text-[1.08rem]">{t.what}</h3>
              <p className="mt-1.5 text-[0.92rem] text-[color:var(--ink-soft)]">{t.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- about preview ---------------- */
export function AboutPreview() {
  return (
    <section className="hairline-t">
      <div className="container-x section-pad !py-20">
        <div className="grid items-center gap-10 md:grid-cols-[120px_1fr]">
          <Portrait size={120} className="h-[120px] w-[120px]" />
          <div>
            <Eyebrow>About</Eyebrow>
            <p className="mt-3 max-w-2xl text-[1.06rem] leading-relaxed">{profile.about.short}</p>
            <Link href="/about" className="link-quiet mt-4 inline-block font-mono text-[0.8rem]">
              More about how I work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- final CTA ---------------- */
export function FinalCta() {
  return (
    <section data-surface="ink" className="grain relative overflow-hidden bg-[color:var(--surface)] text-[color:var(--on-surface)]">
      <FinalCtaBg />
      <div className="container-x section-pad relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[clamp(1.9rem,4vw,3rem)]">{profile.finalCta.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[color:var(--on-surface-soft)]">{profile.finalCta.body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <HireSplit variant="inverted" />
            <ButtonLink href={`mailto:${profile.email}`} variant="line" className="!text-[color:var(--on-surface)]">
              {profile.email}
            </ButtonLink>
          </div>
          {!hireIsFiverr() ? (
            <p className="mt-3 font-mono text-[0.68rem] tracking-[0.1em] text-[color:var(--on-surface-faint)]">
              {profile.hero.hireFallbackNote.toUpperCase()}, EMAIL REACHES ME TODAY
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

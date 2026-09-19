import Link from "next/link";
import type { Project } from "@/content/projects/types";
import { projectBySlug } from "@/content/projects";
import { hireHref, hireIsFiverr, hireLabel, profile } from "@/content/profile";
import { DeviceFrame, Eyebrow, SectionHeading, Tag } from "@/components/ui";
import { BROWSER_ROOMS } from "@/content/projects/types";
import { Reveal } from "@/components/reveal";
import { Gallery } from "./gallery";
import { ArchDiagram } from "./diagrams";

/** The case-study template. One structure, three very different rooms
 *  surface, accent and imagery all come from the project itself. */
export function CasePage({ p }: { p: Project }) {
  const dark = p.slug === "aimara";
  const next = projectBySlug[p.next];

  return (
    <article
      data-room={p.slug}
      data-surface={dark ? "ink" : undefined}
      className={`grain bg-[color:var(--surface)] text-[color:var(--on-surface)] ${
        p.slug === "naqiverse" ? "bg-[color:var(--nq-wash)]" : p.slug === "dentxpert" ? "bg-[color:var(--dx-wash)]" : ""
      }`}
    >
      {/* 01, hero */}
      <header className="container-x pt-32 lg:pt-36">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>
              <span style={{ color: "var(--accent-ink)" }}>{p.index}</span> · {p.station.toUpperCase()}{" "}
              {p.category.toUpperCase()}
            </Eyebrow>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">{p.title}</h1>
            <p className="mt-5 max-w-xl text-[1.12rem] text-[color:var(--on-surface-soft)]">{p.promise}</p>

            <dl className="mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Role</dt>
                <dd className="mt-1 text-[0.92rem]">{p.role}</dd>
              </div>
              <div>
                <dt className="eyebrow">Platform</dt>
                <dd className="mt-1 text-[0.92rem]">{p.platform}</dd>
              </div>
            </dl>

            {p.confidential ? (
              <p
                className="mt-6 inline-flex max-w-xl items-start gap-2 rounded-[2px] border px-4 py-3 text-[0.85rem]"
                style={{ borderColor: "var(--accent)", color: "var(--on-surface-soft)" }}
              >
                <span aria-hidden="true" style={{ color: "var(--accent-ink)" }}>
                  ◆
                </span>
                {p.confidential}
              </p>
            ) : null}
          </div>

          <Reveal className={`mx-auto w-full ${BROWSER_ROOMS.has(p.slug) ? "max-w-[620px]" : "max-w-[300px]"}`}>
            <DeviceFrame id={p.heroShot} alt={p.heroAlt} room={p.slug} sizes={BROWSER_ROOMS.has(p.slug) ? "560px" : "300px"} priority className={BROWSER_ROOMS.has(p.slug) ? "w-full max-w-[560px]" : ""} />
          </Reveal>
        </div>
      </header>

      {/* 02, at a glance */}
      <section aria-label="At a glance" className="container-x mt-16">
        <div className="grid gap-px overflow-hidden rounded-[2px] border border-[color:var(--line-c)] bg-[color:var(--line-c)] md:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["The problem", p.atAGlance.problem],
              ["My contribution", p.atAGlance.contribution],
              ["Core stack", null],
              ["Proof it works", p.atAGlance.proof],
            ] as const
          ).map(([label, body]) => (
            <div key={label} className="bg-[color:var(--surface)] p-6">
              <h2 className="eyebrow">{label}</h2>
              {body ? (
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[color:var(--on-surface-soft)]">{body}</p>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.atAGlance.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 03 + 04, context & challenge */}
      <section className="container-x section-pad !pb-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="What it is" title="Context" />
            <div className="mt-5 space-y-4 text-[color:var(--on-surface-soft)]">
              {p.context.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading eyebrow="What made it hard" title="The challenge" />
            <div className="mt-5 space-y-4 text-[color:var(--on-surface-soft)]">
              {p.challenge.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05, experience journey */}
      <section className="container-x section-pad !pt-10" aria-label="Experience walkthrough">
        <SectionHeading
          eyebrow="The experience"
          title="A walk through the product"
          lede={p.anonymisedNote ?? undefined}
        />
        <div className="mt-14 space-y-16 lg:space-y-20">
          {p.journey.map((shot, i) => (
            <Reveal
              as="figure"
              key={shot.media}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="mx-auto w-full max-w-[250px]">
                <DeviceFrame id={shot.media} alt={shot.alt} room={p.slug} sizes="250px" />
              </div>
              <figcaption className="max-w-md">
                <p className="font-mono text-[0.72rem] tracking-[0.14em] text-[color:var(--on-surface-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[1.05rem] leading-relaxed">{shot.caption}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06, what I built */}
      <section id="built" className="container-x section-pad hairline-t scroll-mt-20">
        <SectionHeading eyebrow="What I built" title="The work, lane by lane" />
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {p.built.map((lane) => (
            <Reveal key={lane.lane}>
              <h3 className="text-[1.05rem]" style={{ color: "var(--accent-ink)" }}>
                {lane.lane}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {lane.items.map((item) => (
                  <li key={item.slice(0, 32)} className="flex gap-2.5 text-[0.9rem] text-[color:var(--on-surface-soft)]">
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 07, decisions */}
      <section id="decisions" className="container-x section-pad hairline-t scroll-mt-20">
        <SectionHeading
          eyebrow="Engineering decisions"
          title="Decisions and their trade-offs"
          lede="Real decisions cost something. Each of these names its price."
        />
        <div className="mt-10 space-y-0 border-t border-[color:var(--line-c)]">
          {p.decisions.map((d, i) => (
            <Reveal key={d.title} className="grid gap-3 border-b border-[color:var(--line-c)] py-7 lg:grid-cols-[220px_1fr_1fr] lg:gap-10">
              <h3 className="text-[1.02rem] leading-snug">
                <span className="mr-2 font-mono text-[0.72rem] text-[color:var(--on-surface-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {d.title}
              </h3>
              <p className="text-[0.92rem] text-[color:var(--on-surface-soft)]">{d.body}</p>
              <p className="text-[0.92rem] text-[color:var(--on-surface-soft)]">
                <span className="eyebrow mr-2" style={{ color: "var(--accent-ink)" }}>
                  Trade-off
                </span>
                {d.tradeoff}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 08, under the hood */}
      <section id="hood" className="container-x section-pad hairline-t scroll-mt-20">
        <SectionHeading eyebrow="Under the hood" title="How the system holds together" lede={p.underTheHood} />
        <div className="mt-10 max-w-4xl">
          <ArchDiagram room={p.slug} />
        </div>
        <details className="group mt-8 max-w-3xl rounded-[2px] border border-[color:var(--line-c)] p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[0.8rem] tracking-[0.06em] [&::-webkit-details-marker]:hidden">
            Deeper technical notes
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <ul className="mt-4 space-y-3">
            {p.deepDetail.map((note) => (
              <li key={note.slice(0, 32)} className="flex gap-2.5 text-[0.9rem] text-[color:var(--on-surface-soft)]">
                <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                {note}
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* 09, gallery */}
      <section className="container-x section-pad hairline-t" aria-label="Screenshot gallery">
        <SectionHeading
          eyebrow="Gallery"
          title="Every screen, up close"
          lede={
            p.anonymisedNote ??
            "Real screenshots from the shipped build, open any of them for a closer look."
          }
        />
        <div className="mt-10">
          <Gallery shots={p.gallery} room={p.slug} />
        </div>
      </section>

      {/* 10 + 11, quality & proof */}
      <section className="container-x section-pad hairline-t">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Quality, privacy, accessibility" title="Evidence of care" />
            <ul className="mt-6 space-y-3">
              {p.quality.map((q) => (
                <li key={q.slice(0, 32)} className="flex gap-2.5 text-[0.92rem] text-[color:var(--on-surface-soft)]">
                  <span aria-hidden="true" style={{ color: "var(--accent-ink)" }}>
                    ✓
                  </span>
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading eyebrow="Where it stands" title="Outcome and current proof" />
            <ul className="mt-6 space-y-3">
              {p.proofNow.map((q) => (
                <li key={q.slice(0, 32)} className="flex gap-2.5 text-[0.92rem] text-[color:var(--on-surface-soft)]">
                  <span aria-hidden="true" className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                  {q}
                </li>
              ))}
            </ul>
            {p.links?.filter((l) => l.href).length ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {p.links.filter((l) => l.href).map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-[10px] border border-[color:var(--line-strong,var(--line-c))] px-4 py-2.5 font-mono text-[0.82rem] tracking-[0.02em] transition-colors hover:bg-[color:var(--on-surface)]/8">
                      {l.label} ↗{l.note ? <span className="text-[color:var(--on-surface-faint)]">{l.note}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* 12, technologies */}
      <section className="container-x section-pad hairline-t">
        <SectionHeading eyebrow="Technologies" title="Chosen for reasons" />
        <dl className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {p.tech.map((t) => (
            <div key={t.name} className="hairline-b pb-5">
              <dt className="font-mono text-[0.82rem] tracking-[0.02em]">{t.name}</dt>
              <dd className="mt-1.5 text-[0.88rem] text-[color:var(--on-surface-soft)]">{t.why}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 13, what this enables + CTA */}
      <section className="container-x section-pad hairline-t">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeading eyebrow="For your project" title="What this experience enables" />
            <ul className="mt-6 max-w-xl space-y-3">
              {p.enables.map((e) => (
                <li key={e.slice(0, 32)} className="flex gap-2.5 text-[0.95rem]">
                  <span aria-hidden="true" style={{ color: "var(--accent-ink)" }}>
                    →
                  </span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-[2px] border border-[color:var(--line-c)] p-7">
            <p className="font-display text-[1.3rem] font-[600] leading-snug">
              Building something in this territory?
            </p>
            <p className="mt-3 text-[0.9rem] text-[color:var(--on-surface-soft)]">
              I take on work like this end to end, interface, systems and the hard parts in between.
            </p>
            <a
              href={hireHref()}
              {...(hireIsFiverr() ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="mt-5 inline-flex rounded-[10px] px-5 py-3 font-mono text-[0.82rem] text-[color:var(--surface)]"
              style={{ background: "var(--on-surface)" }}
            >
              {hireLabel()}
            </a>
            {!hireIsFiverr() ? (
              <p className="mt-2 font-mono text-[0.66rem] tracking-[0.1em] text-[color:var(--on-surface-faint)]">
                {profile.hero.hireFallbackNote.toUpperCase()}
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      {/* 14, next project */}
      <nav aria-label="Next project" className="hairline-t">
        <Link
          href={`/work/${next.slug}`}
          className="container-x group flex items-center justify-between gap-6 py-12"
        >
          <div>
            <p className="eyebrow">Next station · {next.index}</p>
            <p className="mt-2 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-[600]">{next.name}</p>
            <p className="mt-1 max-w-lg text-[0.92rem] text-[color:var(--on-surface-soft)]">{next.promise}</p>
          </div>
          <span
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[color:var(--line-c)] text-xl transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </nav>
    </article>
  );
}

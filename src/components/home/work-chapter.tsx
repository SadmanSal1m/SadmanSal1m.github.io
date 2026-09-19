import Link from "next/link";
import type { Project } from "@/content/projects/types";
import { DeviceFrame, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ChapterBg, DeviceSwap } from "@/components/effects";
import { NaqiFruit, AimaraSignal, GrocsSort, DentCaries, PolicyToasts, ScamLookAlike, IncidentFolder } from "./delights";
import { BROWSER_ROOMS } from "@/content/projects/types";

const SURFACE: Record<Project["slug"], { surface?: "ink"; className: string; shots: [number, number, number] }> = {
  dentxpert: { className: "bg-[color:var(--dx-wash)]", shots: [1, 0, 3] },
  naqiverse: { className: "bg-[color:var(--nq-wash)]", shots: [0, 5, 2] }, // home + theme shop
  aimara: { surface: "ink", className: "", shots: [3, 4, 1] }, // chat privacy + dashboard shown via journey idx
  grocs: { className: "", shots: [4, 3, 1] },
  policywatch: { surface: "ink", className: "", shots: [0, 2, 3] },
  scamlens: { className: "bg-[color:var(--sl-wash)]", shots: [0, 1, 2] },
  incidentkit: { surface: "ink", className: "", shots: [0, 3, 1] },
};

const DELIGHT: Partial<Record<Project["slug"], React.ReactNode>> = {
  dentxpert: <DentCaries />,
  naqiverse: <NaqiFruit />,
  aimara: <AimaraSignal />,
  grocs: <GrocsSort />,
  policywatch: <PolicyToasts />,
  scamlens: <ScamLookAlike />,
  incidentkit: <IncidentFolder />,
};

export function WorkChapter({ p }: { p: Project }) {
  const conf = SURFACE[p.slug];
  const shotA = p.journey[conf.shots[0]];
  const shotB = p.journey[conf.shots[1]];
  const shotC = p.journey[conf.shots[2]] ?? p.journey[0];
  const web = BROWSER_ROOMS.has(p.slug);

  return (
    <section
      id={p.slug}
      data-room={p.slug}
      data-surface={conf.surface}
      data-rail-station={p.station}
      data-rail-index={p.index}
      className={`grain relative overflow-hidden scroll-mt-16 bg-[color:var(--surface)] text-[color:var(--on-surface)] ${conf.className}`}
    >
      <ChapterBg room={p.slug} />
      <div className="container-x section-pad">
        <div className={`grid items-center gap-12 lg:gap-16 ${web ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
          <div className={p.slug === "grocs" ? "lg:order-2" : ""}>
            <Reveal>
              <Eyebrow>
                <span style={{ color: "var(--accent-ink)" }}>{p.index}</span> · {p.station.toUpperCase()}{" "}
                {p.category.toUpperCase()}
              </Eyebrow>
              <h2 className="mt-3 text-[clamp(2rem,4.4vw,3.3rem)]">{p.name}</h2>
              <p className="mt-4 max-w-xl text-[1.08rem] text-[color:var(--on-surface-soft)]">{p.promise}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <ul className="mt-7 flex max-w-xl flex-wrap gap-x-5 gap-y-2">
                {p.tags.map((t) => (
                  <li key={t} className="flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.04em]">
                    <span aria-hidden="true" style={{ color: "var(--accent-ink)" }}>
                      ✓
                    </span>
                    <span className="text-[color:var(--on-surface-soft)]">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl border-l-2 pl-4 text-[0.95rem] text-[color:var(--on-surface-soft)]" style={{ borderColor: "var(--accent)" }}>
                {p.takeaway}
              </p>
              <div className="mt-7 flex items-center gap-5">
                <Link
                  href={`/work/${p.slug}`}
                  className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 font-mono text-[0.82rem] tracking-[0.02em] text-[color:var(--surface)]"
                  style={{ background: "var(--on-surface)" }}
                >
                  Read the case study →
                </Link>
                {DELIGHT[p.slug] ? <div className="delight-slot hidden flex-1 items-center sm:flex">{DELIGHT[p.slug]}</div> : null}
              </div>
            </Reveal>
          </div>

          <Reveal className={`${p.slug === "grocs" ? "lg:order-1" : ""}`}>
            {web ? (
              <div className="grid gap-5 lg:hidden">
                <DeviceFrame id={shotA.media} alt={shotA.alt} room={p.slug} sizes="92vw" className="w-full -rotate-1" />
                <DeviceFrame id={shotB.media} alt={shotB.alt} room={p.slug} sizes="92vw" className="w-[92%] justify-self-end rotate-1" />
              </div>
            ) : (
              <div className="flex items-end justify-center gap-[6%] lg:hidden">
                <DeviceFrame id={shotA.media} alt={shotA.alt} room={p.slug} sizes="(min-width:1024px) 250px, 42vw" className="w-[46%] max-w-[250px] -rotate-2" />
                <DeviceFrame id={shotB.media} alt={shotB.alt} room={p.slug} sizes="(min-width:1024px) 220px, 38vw" className="w-[42%] max-w-[225px] translate-y-6 rotate-3" />
              </div>
            )}
            <div className={`relative hidden lg:block ${web ? "h-[520px]" : "h-[600px]"}`}>
              <DeviceSwap variant={web ? "browser" : "phone"}>
                {[shotA, shotB, shotC].map((sh) => (
                  <DeviceFrame key={sh.media} id={sh.media} alt={sh.alt} room={p.slug} sizes={web ? "600px" : "252px"} className={web ? "w-[600px]" : "w-[252px]"} />
                ))}
              </DeviceSwap>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

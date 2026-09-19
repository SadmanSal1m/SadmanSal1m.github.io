import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { timeline } from "@/content/sections";
import { Eyebrow } from "@/components/ui";
import { CursorTrail, Portrait, StarCta } from "@/components/effects";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Md Salim Sadman Taseen, software & app developer. Cross platform apps, realtime systems and applied AI, built end to end.",
  alternates: { canonical: "/resume" },
};

/* Small building blocks so the whole page reads as one system. */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--porcelain-deep)] p-6">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-[color:var(--line)] px-3.5 py-1.5 font-mono text-[0.72rem] tracking-[0.03em] text-[color:var(--ink-soft)]">
      {children}
    </li>
  );
}

function Entry({
  role,
  meta,
  bullets,
}: {
  role: string;
  meta: string;
  bullets: string[];
}) {
  return (
    <article className="relative border-l border-[color:var(--line)] pl-6">
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border border-[color:var(--line-strong)] bg-[color:var(--porcelain)]"
      />
      <h3 className="text-[1.08rem]">{role}</h3>
      <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">{meta}</p>
      <ul className="mt-3 max-w-2xl space-y-2 text-[0.93rem] leading-relaxed text-[color:var(--ink-soft)]">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

const TOOLKIT = [
  "React Native · Expo",
  "Flutter · Dart",
  "Ionic · Angular",
  "TypeScript",
  "FastAPI · Python",
  "Supabase · Postgres",
  "Firebase",
  "YOLOv8 · computer vision",
  "Realtime messaging",
  "Device security",
];

export default function ResumePage() {
  const recognition = timeline.filter((t) => t.kind === "award" || t.kind === "research");
  return (
    <div className="container-x pb-24 pt-32 lg:pt-36">
      <CursorTrail />
      {/* identity strip */}
      <header className="flex flex-col gap-6 rounded-[16px] border border-[color:var(--line)] bg-[color:var(--porcelain-deep)] p-6 sm:flex-row sm:items-center sm:p-8">
        <Portrait size={88} className="h-[88px] w-[88px] rounded-full" />
        <div className="min-w-0">
          <Eyebrow>Resume</Eyebrow>
          <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)]">{profile.fullName}</h1>
          <p className="mt-1 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-[color:var(--ink-faint)]">
            {profile.title} · {profile.about.location}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.78rem]">
            <a className="link-quiet" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="link-quiet" href={profile.github} target="_blank" rel="noreferrer noopener">
              github.com/sadmansal1m
            </a>
            {profile.fiverrUrl ? (
              <a className="link-quiet" href={profile.fiverrUrl} target="_blank" rel="noreferrer noopener">
                fiverr.com/xperteyes_
              </a>
            ) : null}
            <a className="link-quiet" href={profile.upworkUrl} target="_blank" rel="noreferrer noopener">
              upwork.com/freelancers
            </a>
          </p>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* sidebar */}
        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Panel title="Core toolkit">
            <ul className="flex flex-wrap gap-2">
              {TOOLKIT.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </ul>
          </Panel>
          <Panel title="Recognition">
            <ul className="space-y-3 text-[0.9rem] leading-relaxed text-[color:var(--ink-soft)]">
              {recognition.map((t) => (
                <li key={t.what}>
                  <span className="text-[color:var(--ink)]">{t.what}.</span> {t.detail}
                </li>
              ))}
              <li>
                <span className="text-[color:var(--ink)]">Dean&rsquo;s List, multiple semesters.</span> CGPA 3.52 / 4.00.
              </li>
            </ul>
          </Panel>
          <Panel title="How I work">
            <ul className="space-y-2 text-[0.9rem] leading-relaxed text-[color:var(--ink-soft)]">
              <li>Whole products end to end: interface, state, backend, data, release.</li>
              <li>Realtime and security treated as product features, not afterthoughts.</li>
              <li>Applied AI shipped with guardrails and human review.</li>
            </ul>
          </Panel>
        </div>

        {/* main column */}
        <div className="space-y-12">
          <section>
            <Eyebrow>Experience</Eyebrow>
            <div className="mt-6 space-y-10">
              <Entry
                role="Software Engineer, Devco"
                meta="Internship, then part time · Oct 2024 – Jul 2026"
                bullets={[
                  "Product engineering on a confidential enterprise operations platform (AIMARA): realtime messaging, channel governance, dashboards and approval workflows in Ionic Angular.",
                  "Implemented client side security layers, biometric lock, encrypted storage, root detection, privacy screen, and integrations for calls, resumable uploads and push.",
                  "Built AI assisted features (translation, paraphrasing, message polish) behind a human review window.",
                ]}
              />
              <Entry
                role="Independent Developer, Web & Mobile"
                meta="Client and personal projects · four years, ongoing"
                bullets={[
                  "Web applications (PolicyWatch, ScamLens, IncidentKit) and mobile apps shipped end to end for clients and for myself, across Next.js and React, React Native with Expo, Flutter and Ionic Angular.",
                  "Full ownership every time: product thinking, interface, backend services, data and release. The seven case studies on this site are the deepest examples from that wider body of work.",
                ]}
              />
            </div>
          </section>

          <section>
            <Eyebrow>Education</Eyebrow>
            <div className="mt-6 space-y-10">
              <Entry
                role="MSc Advanced Computer Science"
                meta="Glasgow Caledonian University London · 2026 – 2027 (expected)"
                bullets={["Postgraduate study in London, alongside independent web and mobile work."]}
              />
              <Entry
                role="BSc Computer Science (Honours)"
                meta="International Islamic University Malaysia · 2020 – 2025"
                bullets={[
                  "Software Engineering and Artificial Intelligence specialisation. CGPA 3.52 / 4.00 with multiple Dean's List appearances.",
                  "Final year project, DentXpert, carried through to a Gold Award and a published paper.",
                ]}
              />
            </div>
          </section>

          <section>
            <Eyebrow>Research</Eyebrow>
            <div className="mt-6">
              <Entry
                role="Deep Learning Approach for Dental Anomalies X-ray Imaging using YOLOv8"
                meta="Published · evaluated with precision, recall and mAP"
                bullets={[
                  "Realtime detection from dental imagery across three YOLOv8 variants, the research foundation behind the DentXpert application.",
                ]}
              />
            </div>
          </section>

          <div className="pt-2">
            <StarCta href={`mailto:${profile.email}`}>
              <span className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[0.84rem]">Email me →</span>
            </StarCta>
          </div>
        </div>
      </div>
    </div>
  );
}

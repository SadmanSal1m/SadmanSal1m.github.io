import type { Metadata } from "next";
import Link from "next/link";
import { profile, hireHref, hireIsFiverr, hireLabel } from "@/content/profile";
import { Eyebrow } from "@/components/ui";
import { CursorTrail, Decrypted, Shiny, Stat, Tilted } from "@/components/effects";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Salim Sadman, a software & app developer who builds cross platform apps, realtime systems and applied-AI features end to end.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-x pb-24 pt-32 lg:pt-36">
      <CursorTrail />
      <header className="max-w-2xl">
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-4 text-[clamp(2.1rem,4.6vw,3.4rem)]">
          <Decrypted text="I build whole products, not isolated screens." speed={12} />
        </h1>
        <p className="mt-4 font-mono text-[0.82rem] tracking-[0.06em]">
          <Shiny text="Interface, systems and applied AI. One pair of hands, end to end." />
        </p>
      </header>

      <div className="mt-12 grid gap-14 lg:grid-cols-[280px_1fr]">
        <div className="mx-auto h-[350px] w-[280px] lg:mx-0">
          <Tilted
            imageSrc="/media/portrait/portrait-tall.webp"
            altText="Portrait of Salim Sadman"
            captionText="Salim Sadman"
            containerHeight="350px"
            containerWidth="280px"
            imageHeight="350px"
            imageWidth="280px"
            rotateAmplitude={11}
            scaleOnHover={1.06}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>

        <div className="max-w-2xl space-y-5 text-[1.04rem] leading-relaxed">
          <p>
            I&rsquo;m Md Salim Sadman Taseen, Sadman, a software engineer in London. I&rsquo;m studying for an MSc in
            Advanced Computer Science at Glasgow Caledonian University London, after a BSc in Software Engineering
            and AI at the International Islamic University Malaysia. I care about whole products: the page or
            interface people touch, the systems underneath it, and the judgement that connects the two.
          </p>
          <p>
            The work featured here spans web applications, consumer apps, enterprise platforms and applied AI, and
            each case study walks through the thinking as much as the result. Around them sits four years of client
            and personal projects, and two years of production engineering at Devco.
          </p>
          <p>
            A few habits carry across everything: keep the logic testable, design the unglamorous states, treat
            accessibility as part of the craft, and leave documentation the next person can actually follow.
          </p>
          <p>
            Outside client work I study how intelligent systems should behave and turn those questions into small
            experiments, which is how a university project became award winning, published research.
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-8 border-t border-[color:var(--line)] pt-10 sm:grid-cols-4">
        <Stat to={100} suffix="+" label="featured case studies" />
        <Stat to={20} suffix="+" label="mobile games created" />
        <div>
          <p className="font-display text-[2.1rem] font-[640] leading-none" style={{ color: "var(--ink)" }}>
            Gold Award
          </p>
          <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">
            JIIICaS 2024
          </p>
        </div>
        <Stat to={4} label="published research papers" />
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-[color:var(--line)] pt-10">
        <a
          href={hireHref()}
          {...(hireIsFiverr() ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          className="inline-flex rounded-[10px] bg-[color:var(--ink)] px-5 py-3 font-mono text-[0.82rem] text-[color:var(--porcelain)]"
        >
          {hireLabel()}
        </a>
        <a className="link-quiet font-mono text-[0.8rem]" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="link-quiet font-mono text-[0.8rem]" href={profile.github} target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
        <Link className="link-quiet font-mono text-[0.8rem]" href="/resume">
          Resume →
        </Link>
      </div>
    </div>
  );
}

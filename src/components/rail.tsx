"use client";

import { useEffect, useRef, useState } from "react";

interface Station {
  id: string;
  index: string;
  label: string;
  topPct: number;
  active: boolean;
}

/** The exhibition rail: a fixed hairline down the left gutter on desktop
 *  (a 2px progress bar on mobile), with numbered station ticks that track
 *  [data-rail-station] sections and a node that follows scroll progress.
 *  Rendered as a complementary nav, fully keyboard operable. */
export function Rail() {
  const [stations, setStations] = useState<Station[]>([]);
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rail-station]"));
    if (!els.length) return;

    function measure() {
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(span > 0 ? Math.min(1, Math.max(0, y / span)) : 0);
      setStations(
        els.map((el) => {
          const top = el.offsetTop;
          const rect = el.getBoundingClientRect();
          const active = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.35;
          return {
            id: el.id,
            index: el.dataset.railIndex ?? "",
            label: el.dataset.railStation ?? "",
            topPct: span > 0 ? Math.min(0.96, Math.max(0.06, top / doc.scrollHeight)) : 0,
            active,
          };
        }),
      );
    }

    function onScroll() {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(measure);
    }
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!stations.length) return null;

  return (
    <>
      {/* mobile: quiet top progress */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent lg:hidden">
        <div
          className="h-full bg-[color:var(--ink)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* desktop rail */}
      <nav aria-label="Work stations" className="rail-gutter">
        <div className="pointer-events-auto absolute inset-y-6 left-[27px] w-px bg-[color:var(--line)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[24px] h-[7px] w-[7px] rounded-full bg-[color:var(--ink)] transition-[top] duration-150"
          style={{ top: `calc(${6 + progress * 88}% )` }}
        />
        {stations.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group pointer-events-auto absolute left-0 flex w-[56px] -translate-y-1/2 flex-col items-center gap-1"
            style={{ top: `${s.topPct * 100}%` }}
          >
            <span
              className={`h-px w-[18px] transition-colors ${
                s.active ? "bg-[color:var(--ink)]" : "bg-[color:var(--line-strong)]"
              }`}
            />
            <span
              className={`font-mono text-[0.62rem] tracking-[0.12em] transition-colors ${
                s.active ? "text-[color:var(--ink)]" : "text-[color:var(--ink-faint)] group-hover:text-[color:var(--ink-soft)]"
              }`}
            >
              {s.index}
            </span>
            <span className="sr-only">{s.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}

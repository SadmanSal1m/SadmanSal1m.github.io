"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile, hireHref } from "@/content/profile";
import { useMotionPolicy } from "./motion-provider";

const EASE = [0.22, 0.8, 0.24, 1] as const;

/** "Hire Me" morphs, slowly and smoothly, into Fiverr and Upwork inside the
 *  exact same footprint; clicking anywhere else (or Escape) folds it back.
 *  Geometry and type mirror ButtonLink so it sits flush beside Explore Work.
 *  Hover dimming runs through Framer (whileHover) rather than a CSS opacity
 *  transition, so the two systems never fight over the same property, which
 *  is what caused the settle then blink artifact. Without JavaScript the
 *  initial anchor still goes straight to Fiverr. */
export function HireSplit({
  variant = "solid",
  size = "md",
}: {
  variant?: "solid" | "inverted";
  size?: "md" | "sm";
}) {
  const { reduced } = useMotionPolicy();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const fill =
    variant === "solid"
      ? "bg-[color:var(--ink)] text-[color:var(--porcelain)]"
      : "bg-[color:var(--porcelain)] text-[color:var(--ink)]";
  // Mirrors btnBase: rounded-[10px] · font-mono 0.85rem · py-3 ≈ 45px tall.
  const box = size === "sm" ? "h-[36px] w-[150px]" : "h-[45px] w-[168px]";
  const font = size === "sm" ? "text-[0.78rem]" : "text-[0.85rem]";
  const shared = `inline-flex items-center justify-center rounded-[10px] font-mono ${font} tracking-[0.02em] ${fill}`;
  const dur = reduced ? 0 : 0.55;

  const links = [
    { label: "Fiverr", href: profile.fiverrUrl ?? hireHref() },
    { label: "Upwork", href: profile.upworkUrl },
  ];

  return (
    <div ref={ref} className={`relative ${box}`}>
      <AnimatePresence initial={false}>
        {!open ? (
          <motion.a
            key="hire"
            href={hireHref()}
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            aria-expanded={false}
            aria-haspopup="true"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            whileHover={{ opacity: 0.9 }}
            transition={{ duration: dur, ease: EASE }}
            className={`absolute inset-0 ${shared}`}
          >
            Hire Me
          </motion.a>
        ) : (
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur * 0.7, ease: EASE }}
            className="absolute inset-0 flex gap-1.5"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, x: i === 0 ? 22 : -22, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : 0.06 }}
                className={`flex-1 ${shared}`}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

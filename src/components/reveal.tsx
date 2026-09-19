"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useMotionPolicy } from "./motion-provider";

const EASE = "cubic-bezier(0.22, 0.8, 0.24, 1)";

/** Gentle enter-on-scroll: fail-visible by design.
 *  Server HTML ships fully visible (no inline opacity:0), so content survives
 *  disabled/slow/crashed JavaScript and full-page screenshot tools. On the
 *  client, only elements still below the fold at mount opt into the fade;
 *  anything already on screen never blinks. Reduced motion and the site's
 *  static mode skip the animation entirely. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "figure";
  className?: string;
}) {
  const { reduced } = useMotionPolicy();
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  useEffect(() => {
    if (reduced) return;
    const prm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prm) return;
    const el = ref.current;
    if (!el) return;
    // Arm the reveal only for elements that start below the viewport -
    // visible content is left untouched, so there is no hide-then-show flash.
    const raf = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) setArmed(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const hidden = armed && !reduced && !inView;

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(14px)" : "none",
        transition: armed
          ? `opacity 0.55s ${EASE} ${delay}s, transform 0.55s ${EASE} ${delay}s`
          : undefined,
      }}
    >
      {children}
    </Tag>
  );
}

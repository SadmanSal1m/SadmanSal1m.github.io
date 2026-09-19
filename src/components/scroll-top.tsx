"use client";

import { useEffect, useState } from "react";
import { useMotionPolicy } from "./motion-provider";

/** Subtle glass "back to top" button, bottom right, fading in once half the
 *  page has been scrolled. Carries is-fixed to escape the grain child rule. */
export function ScrollTop() {
  const { reduced } = useMotionPolicy();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const travel = Math.max(1, doc.scrollHeight - window.innerHeight);
      setShow(window.scrollY > Math.max(320, travel * 0.5));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
      style={{ zIndex: 40 }}
      className={`glass-chrome is-fixed bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--line)] text-[color:var(--ink-soft)] transition-all duration-300 hover:text-[color:var(--ink)] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 12V2M7 2L2.5 6.5M7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

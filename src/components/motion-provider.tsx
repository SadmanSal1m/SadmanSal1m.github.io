"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";

/** Motion policy for the whole site.
 *  - Respects prefers-reduced-motion automatically (MotionConfig reducedMotion="user").
 *  - Adds a user-facing "Static mode" (footer toggle) persisted in localStorage,
 *    applied pre-paint by an inline script in layout.tsx via html[data-motion]. */

interface MotionCtx {
  staticMode: boolean;
  reduced: boolean; // static mode OR prefers-reduced-motion
  toggleStatic: () => void;
}

const Ctx = createContext<MotionCtx>({ staticMode: false, reduced: false, toggleStatic: () => {} });

export function useMotionPolicy() {
  return useContext(Ctx);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [staticMode, setStaticMode] = useState(false);
  const [prm, setPrm] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrm(mq.matches);
    const raf = requestAnimationFrame(() => {
      setStaticMode(document.documentElement.dataset.motion === "static");
      sync();
    });
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
    };
  }, []);

  const toggleStatic = useCallback(() => {
    setStaticMode((cur) => {
      const next = !cur;
      document.documentElement.dataset.motion = next ? "static" : "full";
      try {
        localStorage.setItem("motion-pref", next ? "static" : "full");
      } catch {}
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ staticMode, reduced: staticMode || prm, toggleStatic }}>
      <MotionConfig reducedMotion={staticMode ? "always" : "user"}>{children}</MotionConfig>
    </Ctx.Provider>
  );
}

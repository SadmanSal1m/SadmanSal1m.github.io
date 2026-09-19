"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState } from "react";
import { DeviceFrame } from "@/components/ui";
import { useMotionPolicy } from "@/components/motion-provider";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/** If WebGL init or the scene throws on some GPU/driver combo, degrade
 *  silently to the static constellation instead of blanking the hero. */
class HeroBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <HeroStatic /> : this.props.children;
  }
}

/** Composed static constellation: used on mobile, reduced motion, static mode,
 *  Save-Data, or when WebGL is unavailable. Same three products, same orbit. */
export function HeroStatic() {
  return (
    <div className="relative mx-auto w-full max-w-[820px]" aria-hidden="true">
      <svg viewBox="0 0 820 200" className="absolute inset-x-0 bottom-2 w-full" fill="none" aria-hidden="true">
        <ellipse cx="410" cy="100" rx="385" ry="78" stroke="var(--ink)" strokeOpacity="0.28" />
      </svg>
      <div className="relative flex items-end justify-center gap-[4%] px-2 pb-10">
        <DeviceFrame
          id="naqiverse/01-home"
          alt=""
          room="naqiverse"
          sizes="(min-width:1024px) 220px, 30vw"
          priority
          className="w-[30%] max-w-[225px] -rotate-[7deg] translate-y-3"
        />
        <DeviceFrame
          id="aimara/05-chat-privacy"
          alt=""
          room="aimara"
          sizes="(min-width:1024px) 240px, 32vw"
          priority
          className="z-10 w-[32%] max-w-[245px] -translate-y-2"
        />
        <DeviceFrame
          id="grocs/08-recipes"
          alt=""
          room="grocs"
          sizes="(min-width:1024px) 220px, 30vw"
          priority
          className="w-[30%] max-w-[225px] rotate-[7deg] translate-y-3"
        />
      </div>
    </div>
  );
}

export function HeroMount() {
  const { reduced } = useMotionPolicy();
  const [use3d, setUse3d] = useState<boolean | null>(null);

  useEffect(() => {
    let raf = 0;
    const decide = () => {
      if (reduced) {
        setUse3d(false);
        return;
      }
      const wide = window.matchMedia("(min-width: 1024px)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
      webgl = false;
    }
      setUse3d(wide && webgl && !saveData);
    };
    raf = requestAnimationFrame(decide);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (use3d === null) {
    // first paint before capability check resolves: keep layout stable
    return <div className="h-[380px] lg:h-[440px]" aria-hidden="true" />;
  }
  if (!use3d) return <HeroStatic />;
  return (
    <HeroBoundary>
      <div className="relative h-[440px] w-full" aria-hidden="true">
        <HeroScene />
      </div>
    </HeroBoundary>
  );
}

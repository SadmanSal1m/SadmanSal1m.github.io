"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMotionPolicy } from "./motion-provider";
import { useTheme } from "./theme-provider";
import type { RoomId } from "@/content/projects/types";

type Loose = React.ComponentType<Record<string, unknown>>;
const DotField = dynamic(() => import("./vendor/DotField"), { ssr: false }) as unknown as Loose;
const PlasmaWave = dynamic(() => import("./vendor/PlasmaWave"), { ssr: false }) as unknown as Loose;
const Shuffle = dynamic(() => import("./vendor/Shuffle"), { ssr: false }) as unknown as Loose;
const Waves = dynamic(() => import("./vendor/Waves"), { ssr: false }) as unknown as Loose;
const Particles = dynamic(() => import("./vendor/Particles"), { ssr: false }) as unknown as Loose;
const LightRays = dynamic(() => import("./vendor/LightRays"), { ssr: false }) as unknown as Loose;
const MagnetLinesDyn = dynamic(() => import("./vendor/MagnetLines"), { ssr: false }) as unknown as Loose;
const SideRaysDyn = dynamic(() => import("./vendor/SideRays"), { ssr: false }) as unknown as Loose;
const MoltenMetalDyn = dynamic(() => import("./vendor/MoltenMetal"), { ssr: false }) as unknown as Loose;
const DeviceSwapInner = dynamic(() => import("./device-swap-inner"), { ssr: false }) as unknown as Loose;
const SpotlightCardDyn = dynamic(() => import("./vendor/SpotlightCard"), { ssr: false }) as unknown as Loose;
const TiltedCardDyn = dynamic(() => import("./vendor/TiltedCard"), { ssr: false }) as unknown as Loose;
const CountUpDyn = dynamic(() => import("./vendor/CountUp"), { ssr: false }) as unknown as Loose;
const ShinyTextDyn = dynamic(() => import("./vendor/ShinyText"), { ssr: false }) as unknown as Loose;
const ClickSparkDyn = dynamic(() => import("./vendor/ClickSpark"), { ssr: false }) as unknown as Loose;
const StarBorderDyn = dynamic(() => import("./vendor/StarBorder"), { ssr: false }) as unknown as Loose;
const DecryptedTextDyn = dynamic(() => import("./vendor/DecryptedText"), { ssr: false }) as unknown as Loose;
const SplashCursorDyn = dynamic(() => import("./vendor/SplashCursor"), { ssr: false }) as unknown as Loose;
const ColorBendsDyn = dynamic(() => import("./vendor/ColorBends"), { ssr: false }) as unknown as Loose;

/** Decorative canvases must never take the page down: any renderer failure
 *  simply removes the garnish. */
class EffectBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Capability gate for canvas effects: reasonable width, motion allowed. */
function useEffectsAllowed(minWidth = 768) {
  const { reduced } = useMotionPolicy();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setOk(!reduced && window.matchMedia(`(min-width: ${minWidth}px)`).matches);
    });
    return () => cancelAnimationFrame(raf);
  }, [reduced, minWidth]);
  return ok;
}

/** Landing backdrop: PlasmaWave glow with an interactive DotField over it
 *  (both React Bits), tinted for whichever theme is active. */
export function HeroBackdrop() {
  const ok = useEffectsAllowed();
  const { theme } = useTheme();
  if (!ok) return null;
  const dark = theme === "dark";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <EffectBoundary>
        <div className={`absolute inset-0 ${dark ? "opacity-55" : "opacity-30"}`}>
          <PlasmaWave
            colors={dark ? ["#ff8fb8", "#4dd6c9"] : ["#e27fa6", "#33a860"]}
            timeScale={0.22}
            speed1={0.02}
            speed2={0.016}
            focalLength={0.95}
            bend1={0.8}
            bend2={0.45}
            dir2={-1}
            rotationDeg={-8}
          />
        </div>
        <div className="absolute inset-0">
          <DotField
            dotRadius={2}
            dotSpacing={16}
            bulgeStrength={58}
            cursorRadius={440}
            glowRadius={170}
            bulgeOnly
            gradientFrom={dark ? "rgba(242, 239, 233, 0.15)" : "rgba(20, 24, 27, 0.22)"}
            gradientTo={dark ? "rgba(242, 239, 233, 0.05)" : "rgba(20, 24, 27, 0.08)"}
            glowColor="rgba(226, 127, 166, 0.16)"
          />
        </div>
      </EffectBoundary>
    </div>
  );
}

/** Plasma wave wash behind the final call to action (React Bits PlasmaWave). */
export function FinalCtaBg() {
  const ok = useEffectsAllowed();
  if (!ok) return null;
  return (
    <div aria-hidden="true" className="fx-bg opacity-70">
      <EffectBoundary>
        <PlasmaWave
          colors={["#ff8fb8", "#3fbf7a"]}
          timeScale={0.28}
          speed1={0.024}
          speed2={0.02}
          focalLength={0.85}
          bend1={1}
          bend2={0.55}
          dir2={-1}
          rotationDeg={6}
        />
      </EffectBoundary>
    </div>
  );
}

/** The hero headline through React Bits Shuffle; plain h1 under reduced
 *  motion, static mode, or before the client mounts. */
export function ShuffleHeadline({ text, className }: { text: string; className: string }) {
  const { reduced } = useMotionPolicy();
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const raf = requestAnimationFrame(() => {
      try {
        if (sessionStorage.getItem("hero-shuffled")) return;
        sessionStorage.setItem("hero-shuffled", "1");
      } catch {}
      setPlay(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  if (!play || reduced) return <h1 className={className}>{text}</h1>;
  return (
    <EffectBoundary>
      <Shuffle
        text={text}
        tag="h1"
        className={className}
        textAlign="center"
        shuffleDirection="right"
        duration={0.95}
        shuffleTimes={1}
        animationMode="evenodd"
        stagger={0.05}
        ease="power2.out"
        threshold={0.05}
        triggerOnce
                respectReducedMotion
      />
    </EffectBoundary>
  );
}

/** Room specific React Bits backgrounds for the app showcase chapters.
 *  Chosen to fit each room: LightRays suits AIMARA's dark operations room,
 *  Waves suits Grocs' calm kitchen, Particles suits NaqiVerse's playroom, and
 *  a teal DotField suits DentXpert's clinical scan aesthetic. */
export function ChapterBg({ room }: { room: RoomId }) {
  const ok = useEffectsAllowed(1024);
  const { theme } = useTheme();
  if (!ok) return null;
  const inner =
    room === "policywatch" ? (
      <div className="absolute inset-0 opacity-[0.55]">
        <MoltenMetalDyn color1="#0b2140" color2="#2f7fc4" color3="#bfe0ff" speed={0.28} scale={4.2} detail={3} glow={1.5} coreSize={0.1} swirl={1} fold={-0.2} blackPoint={0.06} brightness={1.25} colorMode="frost" grain grainIntensity={0.05} mouseInteraction mouseStrength={0.25} opacity={1} />
      </div>
    ) : room === "scamlens" ? (
      <div className="absolute inset-0 flex items-center justify-center opacity-55">
        <MagnetLinesDyn rows={11} columns={17} containerSize="min(140vw, 1400px)" lineColor={theme === "dark" ? "rgba(255, 178, 88, 0.55)" : "rgba(184, 96, 12, 0.5)"} lineWidth="0.14vmin" lineHeight="2.2vmin" baseAngle={-25} />
      </div>
    ) : room === "incidentkit" ? (
      <div className="absolute inset-0 opacity-70">
        <SideRaysDyn speed={2} rayColor1="#3cc896" rayColor2="#ff8a7a" intensity={1.5} spread={2} origin="top-right" tilt={0} saturation={1.3} blend={0.7} falloff={1.7} opacity={0.9} />
      </div>
    ) : room === "aimara" ? (
      <div className="absolute inset-0 opacity-65">
        <LightRays
          raysOrigin="top-center"
          raysColor="#e27fa6"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.7}
          followMouse
          mouseInfluence={0.06}
          fadeDistance={1}
          saturation={1}
        />
      </div>
    ) : room === "grocs" ? (
      <div className="absolute inset-0 opacity-75">
        <Waves lineColor={theme === "dark" ? "rgba(127, 224, 168, 0.13)" : "rgba(38, 122, 68, 0.13)"} backgroundColor="transparent" xGap={14} yGap={40} waveAmpX={26} waveAmpY={14} />
      </div>
    ) : room === "naqiverse" ? (
      <div className="absolute inset-0 opacity-70">
        <Particles
          particleColors={["#e58fb1", "#f2c14e", "#8fb7e5", "#7fd4a5"]}
          particleCount={150}
          particleBaseSize={70}
          particleSpread={10}
          speed={0.08}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.6}
        />
      </div>
    ) : (
      <div className={`absolute inset-0 ${theme === "dark" ? "opacity-60" : "opacity-35"}`}>
        <ColorBendsDyn
          colors={theme === "dark" ? ["#66d0c6", "#2fa89e", "#0d5f59"] : ["#1f8e86", "#0d5f59", "#66d0c6"]}
          rotation={100}
          autoRotate={2}
          speed={0.12}
          scale={1.1}
          frequency={0.9}
          warpStrength={1}
          mouseInfluence={0.6}
          parallax={0.4}
          noise={0.06}
          iterations={2}
          intensity={theme === "dark" ? 1.2 : 1}
          bandWidth={6}
          transparent
        />
      </div>
    );
  return (
    <div aria-hidden="true" className="fx-bg overflow-hidden">
      <EffectBoundary>{inner}</EffectBoundary>
    </div>
  );
}

/** App showcase device stack (React Bits CardSwap): three screens per project
 *  cycling with an elastic drop. Server rendered device frames arrive as
 *  children; below lg or under reduced motion the static pair renders instead
 *  (handled by the caller), so this only mounts where it can shine. */
export function DeviceSwap({ children, variant = "phone" }: { children: React.ReactNode[]; variant?: "phone" | "browser" }) {
  const ok = useEffectsAllowed(1024);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!mounted || !ok) {
    return <div className="flex h-full items-center justify-center">{children[0]}</div>;
  }
  return (
    <EffectBoundary>
      <DeviceSwapInner variant={variant}>{children}</DeviceSwapInner>
    </EffectBoundary>
  );
}

/** The owner's portrait, cropped from a supplied photograph. */
export function Portrait({ size = 150, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/media/portrait/portrait-square.webp"
      alt="Portrait of Salim Sadman"
      width={size}
      height={size}
      className={`rounded-[14px] object-cover ${className}`}
      priority={false}
    />
  );
}


/** Site wide click sparks (React Bits ClickSpark); pure garnish, off under
 *  reduced motion. */
export function SparkLayer({ children }: { children: React.ReactNode }) {
  const { reduced } = useMotionPolicy();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!mounted || reduced) return <>{children}</>;
  return (
    <EffectBoundary>
      <ClickSparkDyn sparkColor="#e27fa6" sparkSize={9} sparkRadius={18} sparkCount={7} duration={450}>
        {children}
      </ClickSparkDyn>
    </EffectBoundary>
  );
}

/** Thin, typed doorways to the vendored bits for server components. */
export function Spotlight({ children, className = "", spotlightColor }: { children: React.ReactNode; className?: string; spotlightColor?: string }) {
  return (
    <EffectBoundary>
      <SpotlightCardDyn className={className} spotlightColor={spotlightColor}>
        {children}
      </SpotlightCardDyn>
    </EffectBoundary>
  );
}

export function Tilted(props: Record<string, unknown>) {
  return (
    <EffectBoundary>
      <TiltedCardDyn {...props} />
    </EffectBoundary>
  );
}

export function Stat({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[2.1rem] font-[640] leading-none" style={{ color: "var(--ink)" }}>
        <EffectBoundary>
          <CountUpDyn to={to} from={0} duration={1.4} separator="," className="inline-block" />
        </EffectBoundary>
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">{label}</p>
    </div>
  );
}

export function Shiny({ text, className = "" }: { text: string; className?: string }) {
  return (
    <EffectBoundary>
      <ShinyTextDyn text={text} speed={4.5} className={className} />
    </EffectBoundary>
  );
}

export function StarCta({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <EffectBoundary>
      <StarBorderDyn as="a" href={href} color="#e27fa6" speed="6s" className="inline-block">
        {children}
      </StarBorderDyn>
    </EffectBoundary>
  );
}

export function Decrypted({ text, className = "", speed = 16 }: { text: string; className?: string; speed?: number }) {
  return (
    <EffectBoundary>
      <DecryptedTextDyn text={text} animateOn="view" sequential revealDirection="start" speed={speed} className={className} parentClassName={className} encryptedClassName="opacity-50" />
    </EffectBoundary>
  );
}


/** Fluid cursor trail (React Bits SplashCursor) for the about and resume
 *  pages. Fine pointers and full motion only; sits above content but never
 *  captures clicks. */
export function CursorTrail() {
  const ok = useEffectsAllowed(1024);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setFine(window.matchMedia("(pointer: fine)").matches));
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!ok || !fine) return null;
  // Portal to <body> and escape the grain child rule: nothing between the
  // viewport and this canvas, so it tracks the cursor at any scroll depth.
  return createPortal(
    <div aria-hidden="true" className="is-fixed pointer-events-none fixed inset-0" style={{ zIndex: 35 }}>
      <EffectBoundary>
        <SplashCursorDyn
          SPLAT_RADIUS={0.14}
          SPLAT_FORCE={4200}
          DENSITY_DISSIPATION={5}
          VELOCITY_DISSIPATION={2.6}
          COLOR_UPDATE_SPEED={7}
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          TRANSPARENT
        />
      </EffectBoundary>
    </div>,
    document.body
  );
}

"use client";

import Magnet from "@/components/vendor/Magnet";
import { useMotionPolicy } from "@/components/motion-provider";

/** A restrained magnetic hover for the two or three highest-value CTAs.
 *  Disabled entirely under reduced motion / static mode. */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const { reduced } = useMotionPolicy();
  return (
    <Magnet disabled={reduced} padding={36} magnetStrength={7}>
      {children}
    </Magnet>
  );
}

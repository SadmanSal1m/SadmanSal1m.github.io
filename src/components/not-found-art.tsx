"use client";

import MagnetLines from "@/components/vendor/MagnetLines";
import { useMotionPolicy } from "@/components/motion-provider";

/** The 404's little exhibit: a field of hairlines that lean toward the
 *  pointer, the rail motif, scattered. Static grid under reduced motion. */
export function NotFoundArt() {
  const { reduced } = useMotionPolicy();
  if (reduced) {
    return (
      <div aria-hidden="true" className="grid w-[220px] grid-cols-6 gap-3 opacity-50">
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} className="h-6 w-px justify-self-center bg-[color:var(--ink)] [transform:rotate(24deg)]" />
        ))}
      </div>
    );
  }
  return (
    <MagnetLines
      rows={6}
      columns={6}
      containerSize="220px"
      lineColor="var(--ink)"
      lineWidth="1px"
      lineHeight="24px"
      baseAngle={24}
      className="opacity-60"
    />
  );
}

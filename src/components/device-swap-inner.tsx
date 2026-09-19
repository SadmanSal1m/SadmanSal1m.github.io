"use client";

// Static imports so CardSwap's cloneElement refs land on the real forwardRef
// Card (a ref routed through next/dynamic never reaches the DOM node, which
// left GSAP with nothing to position). This whole module is itself loaded
// dynamically from effects.tsx, so gsap stays out of the initial bundle.
import CardSwapRaw, { Card as CardRaw } from "./vendor/CardSwap";

type Loose = React.ComponentType<Record<string, unknown>>;
const CardSwap = CardSwapRaw as unknown as Loose;
const Card = CardRaw as unknown as Loose;

export default function DeviceSwapInner({ children, variant = "phone" }: { children: React.ReactNode[]; variant?: "phone" | "browser" }) {
  const browser = variant === "browser";
  return (
    <CardSwap
      width={browser ? 600 : 252}
      height={browser ? 404 : 548}
      cardDistance={browser ? 46 : 54}
      verticalDistance={browser ? 44 : 62}
      delay={4200}
      skewAmount={browser ? 3 : 5}
      easing="elastic"
      pauseOnHover
    >
      {children.map((c, i) => (
        <Card key={i}>{c}</Card>
      ))}
    </CardSwap>
  );
}

import Image from "next/image";
import Link from "next/link";
import { MEDIA, type MediaId } from "@/content/media.gen";
import { BROWSER_ROOMS, type RoomId } from "@/content/projects/types";

/* ---------- typographic primitives ---------- */

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <header id={id} className="max-w-2xl scroll-mt-28">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(1.75rem,3.6vw,2.75rem)]">{title}</h2>
      {lede ? <p className="mt-4 text-[color:var(--on-surface-soft)]">{lede}</p> : null}
    </header>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[color:var(--line-c)] px-3 py-1 font-mono text-[0.7rem] tracking-[0.06em] text-[color:var(--on-surface-soft)]">
      {children}
    </span>
  );
}

/* ---------- media ---------- */

const SHELLS: Record<RoomId | "neutral", string> = {
  dentxpert: "#0c211f",
  naqiverse: "#2a1410",
  aimara: "#0c0c0d",
  grocs: "#0c1620",
  neutral: "#101214",
  policywatch: "#0b1a2a",
  scamlens: "#0a1730",
  incidentkit: "#0b1412",
};

export function MediaImg({
  id,
  alt,
  sizes = "(min-width: 1024px) 320px, 60vw",
  priority = false,
  className = "",
}: {
  id: MediaId;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const m = MEDIA[id];
  return (
    <Image
      src={m.src}
      alt={alt}
      width={m.width}
      height={m.height}
      placeholder="blur"
      blurDataURL={m.blurDataURL}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

/** Phone bezel around a screenshot, the one lush radius in the system. */
export function DeviceFrame({
  id,
  alt,
  room = "neutral",
  sizes,
  priority,
  className = "",
}: {
  id: MediaId;
  alt: string;
  room?: RoomId | "neutral";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (room !== "neutral" && BROWSER_ROOMS.has(room)) {
    return (
      <div className={`browser ${className}`} style={{ "--device-shell": SHELLS[room] } as React.CSSProperties}>
        <div className="browser-bar" aria-hidden><span /><span /><span /><i /></div>
        <MediaImg id={id} alt={alt} sizes={sizes} priority={priority} className="browser-screen h-auto w-full" />
      </div>
    );
  }
  return (
    <div className={`device ${className}`} style={{ "--device-shell": SHELLS[room] } as React.CSSProperties}>
      <MediaImg id={id} alt={alt} sizes={sizes} priority={priority} className="device-screen h-auto w-full" />
    </div>
  );
}

/* ---------- buttons ---------- */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 font-mono text-[0.82rem] tracking-[0.02em] transition-colors duration-200 focus-visible:outline-2";

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "line";
  external?: boolean;
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "bg-[color:var(--on-surface)] text-[color:var(--surface)] hover:opacity-90"
      : "border border-[color:var(--line-strong,var(--line-c))] text-[color:var(--on-surface)] hover:bg-[color:var(--on-surface)]/8";
  const props = external ? { target: "_blank", rel: "noreferrer noopener" } : {};
  return (
    <Link href={href} {...props} className={`${btnBase} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMotionPolicy } from "@/components/motion-provider";
import dynamic from "next/dynamic";
type Loose = React.ComponentType<Record<string, unknown>>;
const ShuffleDyn = dynamic(() => import("@/components/vendor/Shuffle"), { ssr: false }) as unknown as Loose;
const CallChipDyn = dynamic(() => import("@/components/vendor/CallChip"), { ssr: false }) as unknown as Loose;
const SwipeToastDyn = dynamic(() => import("@/components/vendor/SwipeToast"), { ssr: false }) as unknown as Loose;
const FolderFloatDyn = dynamic(() => import("@/components/vendor/FolderFloat"), { ssr: false }) as unknown as Loose;

/* Small, decorative, skippable. Each delight is aria-hidden garnish -
 * every fact it hints at exists as real text nearby. */

/* 01 · NaqiVerse: springy draggable fruit from the real Suika sprite sheet */
export function NaqiFruit() {
  const { reduced } = useMotionPolicy();
  const fruits = [
    { src: "/media/naqiverse/fruit-1.png", size: 42, x: 0 },
    { src: "/media/naqiverse/fruit-3.png", size: 58, x: 54 },
    { src: "/media/naqiverse/fruit-5.png", size: 76, x: 126 },
  ];
  return (
    <div aria-hidden="true" className="relative h-24 w-[220px] select-none">
      {fruits.map((f, i) =>
        reduced ? (
          <Image
            key={f.src}
            src={f.src}
            alt=""
            width={f.size}
            height={f.size}
            className="absolute bottom-0"
            style={{ left: f.x }}
          />
        ) : (
          <motion.div
            key={f.src}
            drag
            dragSnapToOrigin
            dragElastic={0.5}
            dragTransition={{ bounceStiffness: 420, bounceDamping: 14 }}
            whileDrag={{ scale: 1.08, rotate: i % 2 ? 6 : -6 }}
            whileHover={{ y: -4 }}
            className="absolute bottom-0 cursor-grab active:cursor-grabbing"
            style={{ left: f.x, width: f.size, height: f.size }}
          >
            <Image src={f.src} alt="" width={f.size} height={f.size} draggable={false} />
          </motion.div>
        ),
      )}
    </div>
  );
}

/* 02 · AIMARA: a message packet travelling the governed path. It only ever moves along the
 * connectors; inside a box the box lights up instead. Tap a box to start a full loop from it. */
const AM_NODES = [
  { label: "CLIENT", x: 1, w: 72 },
  { label: "FASTAPI", x: 114, w: 72 },
  { label: "RLS DB", x: 227, w: 72 },
] as const;
const AM_LOOP: Record<number, number[]> = { 0: [0, 1, 2, 1, 0], 1: [1, 2, 1, 0, 1], 2: [2, 1, 0, 1, 2] };
export function AimaraSignal() {
  const { reduced } = useMotionPolicy();
  const [at, setAt] = useState(0);
  const [to, setTo] = useState<number | null>(null);
  const dir = useRef(1);
  const route = useRef<number[]>([]);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (to === null) {
      t = setTimeout(() => {
        let next: number;
        if (route.current.length) next = route.current.shift()!;
        else {
          if (at === 2) dir.current = -1;
          if (at === 0) dir.current = 1;
          next = at + dir.current;
        }
        setStep((v) => v + 1);
        setTo(next);
      }, 420);
    } else {
      t = setTimeout(() => {
        setAt(to);
        setTo(null);
      }, 560);
    }
    return () => clearTimeout(t);
  }, [at, to, reduced]);
  const start = (i: number) => {
    route.current = AM_LOOP[i].slice(1);
    setTo(null);
    setAt(i);
  };
  const edge = (i: number, towards: number) => (towards > i ? AM_NODES[i].x + AM_NODES[i].w : AM_NODES[i].x);
  const from = to === null ? null : at;
  return (
    <figure className="w-[300px]" aria-label="Message path: client, FastAPI, row level security database. Tap a box to start a loop there.">
      <svg viewBox="0 0 300 64" className="w-full">
        <g fill="none" stroke="currentColor" strokeOpacity="0.45">
          <path d="M73 32h41M186 32h41" />
        </g>
        {AM_NODES.map((n, i) => {
          const lit = to === null && at === i;
          return (
            <g key={n.label} role="button" tabIndex={0} aria-label={`Start the packet at ${n.label}`} className="cursor-pointer outline-none" onClick={() => start(i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); start(i); } }}>
              <motion.rect x={n.x} y={18} width={n.w} height={28} rx={6} fill="var(--am-rose)" stroke="currentColor" animate={{ fillOpacity: lit ? 0.18 : 0, strokeOpacity: lit ? 0.9 : 0.45 }} transition={{ duration: 0.25 }} />
              <text x={n.x + n.w / 2} y={36} textAnchor="middle" fill="currentColor" fillOpacity="0.85" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.08em">{n.label}</text>
            </g>
          );
        })}
        {reduced ? (
          <circle cx="93" cy="32" r="3.5" fill="var(--am-rose)" />
        ) : from !== null && to !== null ? (
          <motion.circle key={step} cy={32} r={3.5} fill="var(--am-rose)" initial={{ cx: edge(from, to), opacity: 0 }} animate={{ cx: edge(to, from), opacity: [0, 1, 1, 0] }} transition={{ duration: 0.56, ease: "easeInOut", opacity: { times: [0, 0.15, 0.85, 1] } }} />
        ) : null}
      </svg>
      <figcaption className="mt-1 font-mono text-[0.6rem] tracking-[0.12em] text-[color:var(--on-surface-faint)]">
        GOVERNED PATH · TAP A BOX TO START THERE
      </figcaption>
    </figure>
  );
}

/* 03 · Grocs: ingredient chips sorting into pantry / shopping */
const ITEMS = [
  { name: "eggs", have: true },
  { name: "basil", have: true },
  { name: "cream", have: false },
  { name: "garlic", have: true },
  { name: "lemon", have: false },
];

export function GrocsSort() {
  const { reduced } = useMotionPolicy();
  const [sorted, setSorted] = useState(false);
  const order = sorted ? [...ITEMS.filter((i) => i.have), ...ITEMS.filter((i) => !i.have)] : ITEMS;
  return (
    <div className="w-[300px]" aria-label="Ingredients matched against the pantry">
      <div className="flex h-[58px] content-start flex-wrap items-start gap-1.5">
        {order.map((i, idx) => (
          <motion.span key={i.name} layout={!reduced} transition={{ type: "spring", stiffness: 380, damping: 26 }} className={`rounded-full border px-2.5 py-1 font-mono text-[0.64rem] ${sorted && !i.have ? "border-[color:var(--gr-basil-ink)] text-[color:var(--gr-basil-ink)]" : "border-[color:var(--line-c)] text-[color:var(--on-surface-soft)]"}`}>
            {sorted && !i.have && idx === order.findIndex((x) => !x.have) ? "→ " : ""}
            {i.name}
          </motion.span>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.1em] text-[color:var(--on-surface-faint)]">
        <span>{sorted ? "3 IN PANTRY · 2 TO BUY" : "5 INGREDIENTS · 1 RECIPE"}</span>
        <button type="button" onClick={() => setSorted((v) => !v)} className="rounded-full border border-[color:var(--line-c)] px-2.5 py-1 tracking-[0.1em] text-[color:var(--on-surface-soft)] hover:border-[color:var(--on-surface-soft)]">
          {sorted ? "RESET" : "MATCH PANTRY"}
        </button>
      </div>
    </div>
  );
}




/* 01b · DentXpert: the detection call itself, as a React Bits CallChip: scanning, timed, done */
export function DentCaries() {
  const { reduced } = useMotionPolicy();
  const [status, setStatus] = useState<"running" | "done" | "idle">(reduced ? "done" : "running");
  useEffect(() => {
    if (reduced) return;
    const wait = status === "running" ? 2600 : status === "done" ? 2200 : 700;
    const next = status === "running" ? "done" : status === "done" ? "idle" : "running";
    const t = setTimeout(() => setStatus(next), wait);
    return () => clearTimeout(t);
  }, [status, reduced]);
  return (
    <figure aria-label="YOLOv8 detecting caries, timed">
      <CallChipDyn icon="scan" name="yolov8" argument="detecting caries" status={status} expectedMs={2600} size={38} radius={12} color="var(--on-surface)" surfaceColor="color-mix(in srgb, var(--on-surface) 9%, transparent)" progressColor="var(--accent)" progressOpacity={0.22} doneColor="var(--accent-ink)" washOpacity={0.2} showTimer />
      <figcaption className="mt-2 font-mono text-[0.6rem] tracking-[0.12em] text-[color:var(--on-surface-faint)]">
        {status === "done" ? "RESULT SHOWN AS A CHECK TO ACT ON, NOT A DIAGNOSIS" : status === "idle" ? "NEXT ANGLE QUEUED" : "FIVE ANGLES · THREE MODEL SIZES · ON DEVICE"}
      </figcaption>
    </figure>
  );
}

/* 05 · PolicyWatch: the notifications, as stacked React Bits SwipeToasts (swipe down to dismiss) */
const PW_CHANGES = [
  ["CloudCo", "Privacy Policy · data retention 90 → 365 days"],
  ["Streamly", "Terms of Service · cancellation window 30 → 14 days"],
  ["DevAPI", "Pricing · free tier 10,000 → 5,000 requests"],
  ["ShopMart", "Refund Policy · returns 30 → 14 days"],
  ["Bankly", "Terms · arbitration clause added"],
  ["FitTrack", "Privacy Policy · new third party sharing section"],
] as const;
export function PolicyToasts() {
  const { reduced } = useMotionPolicy();
  const [toasts, setToasts] = useState<{ id: number; site: string; what: string }[]>(() => [{ id: 0, site: PW_CHANGES[0][0], what: PW_CHANGES[0][1] }]);
  const n = useRef(1);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      const [site, what] = PW_CHANGES[n.current % PW_CHANGES.length];
      const id = n.current++;
      setToasts((list) => [...list.slice(-1), { id, site, what }]);
    }, 3400);
    return () => clearInterval(t);
  }, [reduced]);
  return (
    <div className="pw-stack" aria-label="Example change notifications, swipe down to dismiss">
      {toasts.map((t, i) => (
        <div key={t.id} className="pw-toast" data-back={i < toasts.length - 1 ? "" : undefined}>
          <SwipeToastDyn inline title={`Caution: Policy changed for ${t.site}`} description={t.what} duration={reduced ? 0 : 6000} width={320} radius={10} slideMs={380} background="color-mix(in srgb, var(--on-surface) 10%, var(--surface))" color="var(--on-surface)" fuseColor="var(--accent)" onClose={() => setToasts((list) => list.filter((x) => x.id !== t.id))} />
        </div>
      ))}
    </div>
  );
}

/* 06 · ScamLens: the kinds of thing it catches, one at a time (React Bits Shuffle on each change) */
const SL_EXAMPLES = [
  ["https://paypa1-secure-login.example", "LOOK-ALIKE CHARACTER · 1 FOR L", "high"],
  ["https://micros0ft-verify.example", "LOOK-ALIKE CHARACTER · 0 FOR O", "high"],
  ["https://paypal.com.account-review.example.net", "DECEPTIVE SUBDOMAIN · REAL DOMAIN IS example.net", "high"],
  ["http://192.0.2.10/login", "IP ADDRESS INSTEAD OF A DOMAIN · NO HTTPS", "high"],
  ["https://xn--pple-43d.com", "PUNYCODE · RENDERS LIKE apple.com", "high"],
  ["https://arnazon.example/orders/refund", "LOOK-ALIKE · rn READS AS m", "medium"],
  ["From: HSBC Bank <alerts@hsbc-secure-mail.example>", "DISPLAY NAME VS ADDRESS · NOT hsbc.co.uk", "medium"],
  ["Reply-To: refunds@mail-247.example", "REPLY-TO DIFFERS FROM THE SENDER", "medium"],
  ["Your account will be closed in 24 hours", "URGENCY + THREAT", "medium"],
  ["Pay the release fee in gift cards", "GIFT CARD PAYMENT REQUEST", "high"],
  ["Confirm your password to keep access", "CREDENTIAL REQUEST", "high"],
  ["Keep this confidential, do not call your bank", "SECRECY PRESSURE", "medium"],
  ["bit.ly/3xQ9… → unknown destination", "SHORTENED LINK HIDES THE TARGET", "low"],
  ["DKIM=fail  SPF=softfail  DMARC=none", "AUTHENTICATION FAILED FOR THE CLAIMED DOMAIN", "high"],
] as const;
export function ScamLookAlike() {
  const { reduced } = useMotionPolicy();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % SL_EXAMPLES.length), 3400);
    return () => clearInterval(t);
  }, [reduced]);
  const [text, why, sev] = SL_EXAMPLES[i];
  const tone = sev === "high" ? "var(--sl-amber)" : sev === "medium" ? "var(--on-surface)" : "var(--on-surface-faint)";
  return (
    <figure className="w-[300px]" aria-label="Examples of indicators ScamLens flags">
      <button type="button" onClick={() => setI((v) => (v + 1) % SL_EXAMPLES.length)} className="flex w-full items-center gap-2 rounded-md border border-[color:var(--line-c)] px-2.5 py-1.5 text-left font-mono text-[0.7rem] tracking-[0.02em] text-[color:var(--on-surface)]" aria-label="Next example">
        <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: tone }} />
        <span className="min-w-0 flex-1 truncate">
          {reduced ? text : <ShuffleDyn key={i} text={text} tag="span" shuffleDirection="right" duration={0.3} animationMode="evenodd" stagger={0.012} triggerOnce respectReducedMotion />}
        </span>
      </button>
      <figcaption className="mt-1.5 flex items-center justify-between gap-3 font-mono text-[0.58rem] tracking-[0.08em] text-[color:var(--on-surface-faint)]">
        <span className="truncate" style={{ color: tone }}>{why}</span>
        <span className="shrink-0">{i + 1}/{SL_EXAMPLES.length} · TAP</span>
      </figcaption>
    </figure>
  );
}

/* 07 · IncidentKit: the incident folder (React Bits FolderFloat, physics on) */
const IK_INCIDENTS = ["INC-0042 Checkout 500s", "INC-0041 DB pool exhausted", "INC-0039 Payments timeout", "INC-0037 Token refresh loop", "INC-0035 Email delayed"];
export function IncidentFolder() {
  const { reduced } = useMotionPolicy();
  return (
    <div className="relative" aria-label="Incidents folder">
      <FolderFloatDyn items={IK_INCIDENTS} label="Incidents" sublabel="5 open" trigger="hover" closeOnSelect={false} physics={!reduced} drift={0.5} folderColor="#123d33" frontColor="#1b5a49" paperColor="#e6fff6" itemColor="#0d1613" itemTextColor="#c9ffe9" labelColor="#e6fff6" width={150} height={84} radius={12} spread={150} lift={20} tilt={7} flapAngle={34} restAngle={16} openDuration={520} stagger={45} bounce={0.3} />
    </div>
  );
}

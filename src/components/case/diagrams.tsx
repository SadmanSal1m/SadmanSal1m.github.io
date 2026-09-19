import type { RoomId } from "@/content/projects/types";

/* Hand-drawn-by-code architecture diagrams. Each is a real <figure> with a
 * text figcaption; the SVG itself is labelled and uses currentColor +
 * room accents so it re-themes with its surface. Mono labels, hairline boxes. */

const box = "fill-none stroke-current [stroke-opacity:0.55]";
const boxSoft = "fill-none stroke-current [stroke-opacity:0.3]";
const lbl = { fontFamily: "var(--font-mono)", letterSpacing: "0.06em" } as const;

function Arrow({ d }: { d: string }) {
  return <path d={d} className="stroke-current [stroke-opacity:0.5]" fill="none" markerEnd="url(#arr)" />;
}

function Defs() {
  return (
    <defs>
      <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L8 4L0 8" fill="none" className="stroke-current [stroke-opacity:0.55]" />
      </marker>
    </defs>
  );
}

export function NaqiverseDiagram() {
  return (
    <figure>
      <svg viewBox="0 0 720 300" role="img" aria-labelledby="nq-d-t" className="w-full text-current">
        <title id="nq-d-t">
          NaqiVerse architecture: five pure game-logic modules feed one shared GameScreen shell and shared stores;
          an optional Firebase ring provides profile, leaderboards and friends.
        </title>
        <Defs />
        {/* game modules */}
        {["Fruit Merge · Matter.js", "Blocqi", "Sudoku", "2048", "Snake"].map((g, i) => (
          <g key={g}>
            <rect x="16" y={18 + i * 52} width="168" height="36" rx="4" className={box} />
            <text x="30" y={40 + i * 52} fontSize="11" style={lbl} className="fill-current">
              {g}
            </text>
            <text x="30" y={18 + i * 52 - 4} fontSize="8" style={lbl} className="fill-current opacity-55">
              logic.ts: no React
            </text>
            <Arrow d={`M184 ${36 + i * 52} H 236`} />
          </g>
        ))}
        {/* shell */}
        <rect x="238" y="60" width="170" height="176" rx="4" className={box} />
        <text x="256" y="86" fontSize="12" style={lbl} className="fill-current">
          GameScreen shell
        </text>
        {["pause / resume", "game-over + celebrate", "streaks", "achievement events"].map((t, i) => (
          <text key={t} x="256" y={110 + i * 22} fontSize="9.5" style={lbl} className="fill-current opacity-70">
            {t}
          </text>
        ))}
        <Arrow d="M408 148 H 458" />
        {/* stores */}
        <rect x="460" y="52" width="118" height="192" rx="4" className={box} />
        <text x="474" y="76" fontSize="11" style={lbl} className="fill-current">
          Zustand stores
        </text>
        {["settings", "stats + XP", "achievements", "economy"].map((t, i) => (
          <text key={t} x="474" y={100 + i * 22} fontSize="9.5" style={lbl} className="fill-current opacity-70">
            {t}
          </text>
        ))}
        <text x="474" y="196" fontSize="9.5" style={lbl} className="fill-current opacity-70">
          AsyncStorage ⤓
        </text>
        <text x="474" y="212" fontSize="8" style={lbl} className="fill-current opacity-55">
          local-first autosave
        </text>
        {/* optional firebase ring */}
        <rect x="596" y="30" width="112" height="238" rx="8" strokeDasharray="5 5" className={boxSoft} />
        <text x="610" y="54" fontSize="10" style={lbl} fill="var(--accent-ink)">
          optional · online
        </text>
        {["Firebase Auth", "cloud profile", "leaderboards", "friends + codes", "block / report"].map((t, i) => (
          <text key={t} x="610" y={82 + i * 24} fontSize="9.5" style={lbl} className="fill-current opacity-70">
            {t}
          </text>
        ))}
        <Arrow d="M578 148 H 594" />
      </svg>
      <figcaption className="mt-3 max-w-2xl text-[0.85rem] text-[color:var(--on-surface-soft)]">
        Five isolated game cores, one product: logic modules feed the shared shell and stores; everything online is a
        strictly optional ring.
      </figcaption>
    </figure>
  );
}

export function AimaraDiagram() {
  return (
    <figure>
      <svg viewBox="0 0 720 320" role="img" aria-labelledby="am-d-t" className="w-full text-current">
        <title id="am-d-t">
          AIMARA architecture: an Ionic Angular client wrapped in device-security services talks to FastAPI over REST
          and WebSockets; Supabase with row-level security holds data; Agora carries calls with server-minted tokens;
          AI services sit behind a human review window.
        </title>
        <Defs />
        {/* client with security wrap */}
        <rect x="14" y="24" width="218" height="272" rx="8" strokeDasharray="5 5" stroke="var(--accent)" fill="none" strokeOpacity="0.75" />
        <text x="28" y="46" fontSize="9.5" style={lbl} fill="var(--accent-ink)">
          device security wrap
        </text>
        <text x="28" y="60" fontSize="8" style={lbl} className="fill-current opacity-60">
          biometrics · app lock · encrypted storage
        </text>
        <text x="28" y="72" fontSize="8" style={lbl} className="fill-current opacity-60">
          root detection · privacy screen
        </text>
        <rect x="30" y="84" width="186" height="196" rx="4" className={box} />
        <text x="46" y="108" fontSize="12" style={lbl} className="fill-current">
          Ionic Angular client
        </text>
        {["chat · channels", "dashboard · cases", "records · users", "language · paraphrase", "resumable upload (tus)"].map(
          (t, i) => (
            <text key={t} x="46" y={132 + i * 22} fontSize="9.5" style={lbl} className="fill-current opacity-70">
              {t}
            </text>
          ),
        )}
        {/* fastapi */}
        <Arrow d="M232 130 H 292" />
        <Arrow d="M292 166 H 232" />
        <text x="238" y="122" fontSize="8.5" style={lbl} className="fill-current opacity-60">
          REST
        </text>
        <text x="240" y="182" fontSize="8.5" style={lbl} className="fill-current opacity-60">
          WS live
        </text>
        <rect x="294" y="84" width="150" height="196" rx="4" className={box} />
        <text x="310" y="108" fontSize="12" style={lbl} className="fill-current">
          FastAPI
        </text>
        {["messaging", "media + redaction", "watermarking", "push (FCM)", "PQC groundwork"].map((t, i) => (
          <text key={t} x="310" y={132 + i * 22} fontSize="9.5" style={lbl} className="fill-current opacity-70">
            {t}
          </text>
        ))}
        {/* supabase */}
        <Arrow d="M444 132 H 504" />
        <rect x="506" y="84" width="120" height="110" rx="4" className={box} />
        <text x="520" y="108" fontSize="11" style={lbl} className="fill-current">
          Supabase
        </text>
        {["Postgres + RLS", "auth", "storage"].map((t, i) => (
          <text key={t} x="520" y={130 + i * 20} fontSize="9.5" style={lbl} className="fill-current opacity-70">
            {t}
          </text>
        ))}
        {/* agora */}
        <Arrow d="M444 236 H 504" />
        <rect x="506" y="212" width="120" height="68" rx="4" className={box} />
        <text x="520" y="236" fontSize="11" style={lbl} className="fill-current">
          Agora calls
        </text>
        <text x="520" y="256" fontSize="9" style={lbl} className="fill-current opacity-70">
          server-minted tokens
        </text>
        {/* AI + review gate */}
        <rect x="644" y="84" width="62" height="196" rx="4" strokeDasharray="5 5" className={boxSoft} />
        <text x="675" y="110" fontSize="10" style={lbl} textAnchor="middle" className="fill-current">
          AI
        </text>
        {["translate", "paraphrase", "safe mode", "transcribe"].map((t, i) => (
          <text key={t} x="675" y={134 + i * 20} fontSize="8.5" style={lbl} textAnchor="middle" className="fill-current opacity-70">
            {t}
          </text>
        ))}
        <rect x="648" y="228" width="54" height="34" rx="4" stroke="var(--accent)" fill="none" strokeOpacity="0.9" />
        <text x="675" y="243" fontSize="7.5" style={lbl} textAnchor="middle" fill="var(--accent-ink)">
          human
        </text>
        <text x="675" y="254" fontSize="7.5" style={lbl} textAnchor="middle" fill="var(--accent-ink)">
          review
        </text>
        <Arrow d="M626 120 H 642" />
      </svg>
      <figcaption className="mt-3 max-w-2xl text-[0.85rem] text-[color:var(--on-surface-soft)]">
        One governed loop: security-wrapped client, typed FastAPI services, row-level-secured data, tokened calls: and
        AI that must pass a human window before anything publishes.
      </figcaption>
    </figure>
  );
}

export function GrocsDiagram() {
  const weights = [
    ["match", 0.45],
    ["expiring", 0.25],
    ["missing", 0.15],
    ["time", 0.1],
    ["pref", 0.05],
  ] as const;
  return (
    <figure>
      <svg viewBox="0 0 720 300" role="img" aria-labelledby="gr-d-t" className="w-full text-current">
        <title id="gr-d-t">
          Grocs capture pipeline: five sources enter a state machine: queued, processing, needs review, saved: where
          only the review screen reaches saved; SQLite with FTS5 stores recipes, and a weighted matcher scores them
          against the pantry.
        </title>
        <Defs />
        {/* sources */}
        {["link", "text", "image", "video", "manual"].map((s, i) => (
          <g key={s}>
            <rect x="16" y={22 + i * 46} width="82" height="30" rx="4" className={boxSoft} />
            <text x="57" y={41 + i * 46} fontSize="9.5" style={lbl} textAnchor="middle" className="fill-current opacity-80">
              {s}
            </text>
            <Arrow d={`M98 ${37 + i * 46} H 138`} />
          </g>
        ))}
        {/* state machine */}
        {(
          [
            ["queued", 140],
            ["processing", 258],
            ["needs_review", 396],
            ["saved", 560],
          ] as const
        ).map(([s, x]) => (
          <g key={s}>
            <rect
              x={x}
              y="104"
              width={s === "needs_review" ? 132 : 96}
              height="44"
              rx="22"
              stroke={s === "needs_review" ? "var(--accent)" : "currentColor"}
              strokeOpacity={s === "needs_review" ? 0.95 : 0.55}
              fill="none"
            />
            <text
              x={x + (s === "needs_review" ? 66 : 48)}
              y="130"
              fontSize="10.5"
              style={lbl}
              textAnchor="middle"
              fill={s === "needs_review" ? "var(--accent-ink)" : "currentColor"}
            >
              {s}
            </text>
          </g>
        ))}
        <Arrow d="M236 126 H 256" />
        <Arrow d="M354 126 H 394" />
        <Arrow d="M528 126 H 558" />
        <text x="536" y="118" fontSize="8" style={lbl} fill="var(--accent-ink)">
          human
        </text>
        <text x="536" y="128" fontSize="8" style={lbl} fill="var(--accent-ink)">
          gate
        </text>
        {/* failed retry loop */}
        <path d="M306 148 v 30 h -118 v -30" fill="none" className="stroke-current [stroke-opacity:0.4]" markerEnd="url(#arr)" strokeDasharray="4 4" />
        <text x="248" y="192" fontSize="8.5" style={lbl} textAnchor="middle" className="fill-current opacity-60">
          failed → retry
        </text>
        {/* store */}
        <rect x="560" y="176" width="146" height="56" rx="4" className={box} />
        <text x="576" y="198" fontSize="10.5" style={lbl} className="fill-current">
          SQLite + FTS5
        </text>
        <text x="576" y="216" fontSize="8.5" style={lbl} className="fill-current opacity-65">
          2,500 bundled · 168k optional
        </text>
        <Arrow d="M608 148 V 174" />
        {/* matcher weights */}
        <text x="16" y="262" fontSize="10" style={lbl} className="fill-current">
          pantry matcher: weighted score
        </text>
        {weights.map(([w, v], i) => (
          <g key={w}>
            <rect x={16 + i * 118} y="272" width={100 * v * 2} height="8" fill="var(--accent)" fillOpacity="0.85" />
            <rect x={16 + i * 118} y="272" width="100" height="8" className={boxSoft} />
            <text x={16 + i * 118} y="294" fontSize="8.5" style={lbl} className="fill-current opacity-70">
              {w} {v}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 max-w-2xl text-[0.85rem] text-[color:var(--on-surface-soft)]">
        The review gate is structural: saved is only reachable through a human pass. Below, the real matcher weights -
        match 0.45, uses-expiring 0.25, missing-count 0.15, time 0.10, preference 0.05.
      </figcaption>
    </figure>
  );
}

export function DentxpertDiagram() {
  return (
    <figure>
      <svg viewBox="0 0 720 260" role="img" aria-labelledby="dx-d-t" className="w-full text-current">
        <title id="dx-d-t">
          DentXpert flow: a guided capture step collects at least five photos from five angles, a selected YOLOv8
          tier runs detection, annotated results come back for review, and Firebase carries accounts and content.
        </title>
        <Defs />
        <rect x="16" y="70" width="150" height="120" rx="4" className={box} />
        <text x="32" y="96" fontSize="11" style={lbl} className="fill-current">guided capture</text>
        {["5+ photos", "5 angles", "quality gate"].map((t, i) => (
          <text key={t} x="32" y={120 + i * 22} fontSize="9.5" style={lbl} className="fill-current opacity-70">{t}</text>
        ))}
        <Arrow d="M166 130 H 214" />
        {["Lite", "Pro", "Ultra"].map((t, i) => (
          <g key={t}>
            <rect x="216" y={54 + i * 56} width="150" height="42" rx="4" stroke={i === 2 ? "var(--accent)" : "currentColor"} strokeOpacity={i === 2 ? 0.9 : 0.55} fill="none" />
            <text x="232" y={80 + i * 56} fontSize="10.5" style={lbl} fill={i === 2 ? "var(--accent-ink)" : "currentColor"}>YOLOv8 {t}</text>
          </g>
        ))}
        <text x="232" y="230" fontSize="8.5" style={lbl} className="fill-current opacity-60">evaluated: precision, recall, mAP</text>
        <Arrow d="M366 130 H 414" />
        <rect x="416" y="70" width="150" height="120" rx="4" className={box} />
        <text x="432" y="96" fontSize="11" style={lbl} className="fill-current">annotated results</text>
        {["review, not diagnosis", "→ Learn library", "→ clinic directory"].map((t, i) => (
          <text key={t} x="432" y={120 + i * 22} fontSize="9.5" style={lbl} className="fill-current opacity-70">{t}</text>
        ))}
        <rect x="596" y="70" width="110" height="120" rx="4" strokeDasharray="5 5" className={boxSoft} />
        <text x="612" y="96" fontSize="10.5" style={lbl} className="fill-current">Firebase</text>
        {["auth", "profiles", "content"].map((t, i) => (
          <text key={t} x="612" y={120 + i * 22} fontSize="9.5" style={lbl} className="fill-current opacity-70">{t}</text>
        ))}
        <Arrow d="M566 130 H 594" />
      </svg>
      <figcaption className="mt-3 max-w-2xl text-[0.85rem] text-[color:var(--on-surface-soft)]">
        Coverage in, honesty out: the capture gate feeds a chosen YOLOv8 tier, and results always route onward to
        learning or real care.
      </figcaption>
    </figure>
  );
}

function FlowDiagram({ label, boxes }: { label: string; boxes: string[] }) {
  const w = 132, gap = 14;
  return (
    <svg viewBox={`0 0 ${boxes.length * (w + gap)} 76`} className="h-auto w-full" role="img" aria-label={label}>
      {boxes.map((b, i) => (
        <g key={b} transform={`translate(${i * (w + gap)} 8)`}>
          <rect x="0" y="0" width={w} height="60" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.5" />
          <text x={w / 2} y="35" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="currentColor">{b}</text>
          {i < boxes.length - 1 && <path d={`M${w} 30 h${gap}`} stroke="currentColor" strokeOpacity="0.6" />}
        </g>
      ))}
    </svg>
  );
}
function PolicywatchDiagram() {
  return <FlowDiagram label="PolicyWatch: scheduler, queue, protected fetch, extract and normalise, hash, diff, notify" boxes={["SCHEDULER", "QUEUE", "SAFE FETCH", "EXTRACT", "NORMALISE", "HASH", "DIFF", "NOTIFY"]} />;
}
function ScamlensDiagram() {
  return <FlowDiagram label="ScamLens: input parser, normaliser, rules engine, aggregator, optional AI, results; input discarded" boxes={["INPUT", "NORMALISE", "URL RULES", "EMAIL RULES", "TEXT RULES", "AGGREGATE", "RESULTS"]} />;
}
function IncidentkitDiagram() {
  return <FlowDiagram label="IncidentKit: interface, API with organisation scope, PostgreSQL, event and audit service, public status query" boxes={["UI", "API · ORG SCOPE", "RBAC", "POSTGRES", "EVENTS + AUDIT", "PUBLIC STATUS"]} />;
}

export function ArchDiagram({ room }: { room: RoomId }) {
  if (room === "policywatch") return <PolicywatchDiagram />;
  if (room === "scamlens") return <ScamlensDiagram />;
  if (room === "incidentkit") return <IncidentkitDiagram />;
  if (room === "dentxpert") return <DentxpertDiagram />;
  if (room === "naqiverse") return <NaqiverseDiagram />;
  if (room === "aimara") return <AimaraDiagram />;
  return <GrocsDiagram />;
}

"use client";

import { useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { Shot } from "@/content/projects/types";
import type { RoomId } from "@/content/projects/types";
import { DeviceFrame, MediaImg } from "@/components/ui";

/** Screenshot gallery: a plain, readable grid of framed shots; any shot opens
 *  a lightbox (Radix Dialog, focus-trapped, Esc closes) with ←/→ navigation,
 *  a position counter and the shot's caption. */
export function Gallery({ shots, room }: { shots: Shot[]; room: RoomId }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const step = useCallback(
    (d: number) => setIdx((i) => (i + d + shots.length) % shots.length),
    [shots.length],
  );

  const cur = shots[idx];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {shots.map((s, i) => (
          <li key={s.media}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                onClick={() => setIdx(i)}
                className="group block w-full text-left"
                aria-label={`Open screenshot ${i + 1} of ${shots.length}: ${s.caption}`}
              >
                <DeviceFrame
                  id={s.media}
                  alt={s.alt}
                  room={room}
                  sizes="(min-width:1024px) 220px, 44vw"
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
                <span className="mt-2.5 block text-[0.8rem] leading-snug text-[color:var(--on-surface-soft)]">
                  {s.caption}
                </span>
              </button>
            </Dialog.Trigger>
          </li>
        ))}
      </ul>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#0c0e10]/88" />
        <Dialog.Content
          className="fixed inset-0 z-[71] flex flex-col items-center justify-center p-4 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          <Dialog.Title className="sr-only">Screenshot viewer</Dialog.Title>
          <Dialog.Description className="sr-only">
            Use the left and right arrow keys to move between screenshots. Escape closes the viewer.
          </Dialog.Description>

          <div className="relative flex max-h-[76vh] items-center justify-center">
            <MediaImg
              id={cur.media}
              alt={cur.alt}
              sizes="(min-width:1024px) 380px, 82vw"
              className="max-h-[76vh] w-auto rounded-[14px]"
            />
          </div>

          <p className="mt-4 max-w-md text-center text-[0.88rem] leading-snug text-[#f3f1eb]/85">{cur.caption}</p>
          <p className="mt-1 font-mono text-[0.7rem] tracking-[0.14em] text-[#f3f1eb]/55">
            {String(idx + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
          </p>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3 sm:px-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-[#f3f1eb]/30 text-[#f3f1eb] hover:bg-[#f3f1eb]/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-[#f3f1eb]/30 text-[#f3f1eb] hover:bg-[#f3f1eb]/10"
            >
              →
            </button>
          </div>

          <Dialog.Close
            aria-label="Close viewer"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[#f3f1eb]/30 text-[#f3f1eb] hover:bg-[#f3f1eb]/10"
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

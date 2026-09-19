"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import * as Dialog from "@radix-ui/react-dialog";
import { profile } from "@/content/profile";
import { HireSplit } from "./hire-split";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line)] text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
    >
      {theme === "dark" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M4.9 4.9l1.9 1.9M17.2 17.2l1.9 1.9M19.1 4.9l-1.9 1.9M6.8 17.2l-1.9 1.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
      )}
    </button>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const hire = <HireSplit size="sm" />;

  return (
    <header
      style={{ zIndex: 50 }}
      className={`glass-chrome is-fixed inset-x-0 top-0 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_-18px_rgba(0,0,0,0.5)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="font-display text-[1.05rem] font-[620] tracking-[-0.01em]">
          {profile.displayName}
          <span className="ml-3 hidden font-mono text-[0.68rem] font-normal uppercase tracking-[0.14em] text-[color:var(--ink-faint)] md:inline">
            Software Engineer · Web & Mobile
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="link-quiet font-mono text-[0.8rem] tracking-[0.04em]">
              {n.label}
            </Link>
          ))}
          {hire}
          <ThemeToggle />
        </nav>

        {/* mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          {hire}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-[color:var(--line)]"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
                <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-[color:var(--ink)]/30" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[78vw] max-w-xs bg-[color:var(--porcelain)] p-6 shadow-2xl focus:outline-none">
                <Dialog.Title className="eyebrow">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                  {NAV.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-2 py-3 font-display text-xl font-[600] hover:bg-[color:var(--porcelain-deep)]"
                    >
                      {n.label}
                    </Link>
                  ))}
                  <div className="mt-4 px-2 py-2">
                    <HireSplit size="sm" />
                  </div>
                </nav>
                <Dialog.Close
                  aria-label="Close menu"
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-[10px] border border-[color:var(--line)]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

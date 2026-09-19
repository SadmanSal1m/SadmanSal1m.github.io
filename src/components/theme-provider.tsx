"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
const Ctx = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(Ctx);
}

/** Dark by default; the pre paint script in layout reads the persisted
 *  preference so first paint never flashes. This provider just mirrors and
 *  toggles it. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (document.documentElement.dataset.theme === "light") setTheme("light");
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  const toggleTheme = () => {
    setTheme((cur) => {
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme-pref", next);
      } catch {}
      return next;
    });
  };
  return <Ctx.Provider value={{ theme, toggleTheme }}>{children}</Ctx.Provider>;
}

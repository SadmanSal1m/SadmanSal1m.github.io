"use client";

import { usePathname } from "next/navigation";

/** Route level entrance: the page starts as nothing and fades slowly into
 *  content. Driven by CSS gated on html.js, so no JavaScript still means a
 *  fully visible page; keyed on the pathname so client navigations replay it. */
export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}

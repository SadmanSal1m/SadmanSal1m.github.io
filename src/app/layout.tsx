import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "./globals.css";
import { site, profile } from "@/content/profile";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageFade } from "@/components/page-fade";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollTop } from "@/components/scroll-top";
import { SparkLayer } from "@/components/effects";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: "%s · Salim Sadman",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/media/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3f1eb",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.displayName,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: site.url,
  sameAs: [
    "https://www.fiverr.com/xperteyes_",
    "https://www.upwork.com/freelancers/~01a4caa85343981881",
    profile.github,
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-motion="full" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Apply persisted motion preference before first paint (no flash, no hydration drift) */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              'var d=document.documentElement;d.classList.add("js");try{if(localStorage.getItem("motion-pref")==="static")d.dataset.motion="static";if(localStorage.getItem("theme-pref")==="light")d.dataset.theme="light"}catch(e){}',
          }}
        />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="grain">
        <MotionProvider>
          <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">
            <SparkLayer>
              <PageFade>{children}</PageFade>
            </SparkLayer>
          </main>
          <SiteFooter />
          <ScrollTop />
        </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

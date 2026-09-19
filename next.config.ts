import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: every route is SSG, so the whole site
  // compiles to plain files in out/. Images are pre-sized webp with manual
  // blur placeholders, so the optimizer isn't needed.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Dev only: allow opening the dev server via the LAN IP (and phones on the
  // same WiFi). Update the IP if your machine's address changes. Without this,
  // Next blocks cross origin requests to /_next/* with 403 and no JS loads.
  allowedDevOrigins: ["192.168.1.102"],
  /* config options here */
};

export default nextConfig;

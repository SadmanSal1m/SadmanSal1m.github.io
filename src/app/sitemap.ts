export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: now, priority: 0.9 })),
    { url: `${site.url}/about`, lastModified: now, priority: 0.6 },
    { url: `${site.url}/resume`, lastModified: now, priority: 0.6 },
  ];
}

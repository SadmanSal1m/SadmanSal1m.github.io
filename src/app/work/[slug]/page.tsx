import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CasePage } from "@/components/case/case-page";
import { site } from "@/content/profile";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.promise,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.promise,
      images: [{ url: `/media/og/${p.slug}.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "MobileApplication",
    operatingSystem: p.platform,
    description: p.promise,
    url: `${site.url}/work/${p.slug}`,
    author: { "@type": "Person", name: "Md Salim Sadman Taseen" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CasePage p={p} />
    </>
  );
}

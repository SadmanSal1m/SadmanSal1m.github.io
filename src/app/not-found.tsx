import Link from "next/link";
import { projects } from "@/content/projects";
import { NotFoundArt } from "@/components/not-found-art";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-start justify-center pb-24 pt-32">
      <div className="mb-8"><NotFoundArt /></div>
      <p className="eyebrow">404, off the rail</p>
      <h1 className="mt-4 max-w-xl text-[clamp(2rem,4.6vw,3.2rem)]">
        This station doesn&rsquo;t exist. The exhibition continues elsewhere.
      </h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-[10px] bg-[color:var(--ink)] px-5 py-3 font-mono text-[0.82rem] text-[color:var(--porcelain)]">
          Back to start
        </Link>
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="rounded-[10px] border border-[color:var(--line-strong)] px-5 py-3 font-mono text-[0.82rem]">
            {p.index} · {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

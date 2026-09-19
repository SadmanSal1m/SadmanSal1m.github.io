import { Hero } from "@/components/hero/hero";
import { WorkChapter } from "@/components/home/work-chapter";
import {
  ProofRail,
  Services,
  Process,
  CapabilityMap,
  Timeline,
  AboutPreview,
  FinalCta,
} from "@/components/home/sections";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofRail />
      <div id="work" className="scroll-mt-16">
        {projects.map((p) => (
          <WorkChapter key={p.slug} p={p} />
        ))}
      </div>
      <Services />
      <Process />
      <CapabilityMap />
      <Timeline />
      <AboutPreview />
      <FinalCta />
    </>
  );
}

import { dentxpert } from "./projects/dentxpert";
import { naqiverse } from "./projects/naqiverse";
import { aimara } from "./projects/aimara";
import { grocs } from "./projects/grocs";
import { policywatch } from "./projects/policywatch";
import { scamlens } from "./projects/scamlens";
import { incidentkit } from "./projects/incidentkit";
import type { Project, RoomId } from "./projects/types";

export const projects: Project[] = [dentxpert, naqiverse, aimara, grocs, policywatch, scamlens, incidentkit];

export const projectBySlug: Record<RoomId, Project> = { dentxpert, naqiverse, aimara, grocs, policywatch, scamlens, incidentkit };

export function getProject(slug: string): Project | undefined {
  return (projectBySlug as Record<string, Project>)[slug];
}

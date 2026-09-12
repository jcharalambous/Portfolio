import type { ComponentType } from "react";
import type { SectionId } from "@/content/sections";
import { About } from "./about/about";
import { Approach } from "./approach/approach";
import { Contact } from "./contact/contact";
import { Hero } from "./hero/hero";
import { Projects } from "./projects/projects";
import { Skills } from "./skills/skills";
import { Work } from "./work/work";

/** One component per section id. Typed so the list and the components cannot drift. */
export const sectionComponents: Record<SectionId, ComponentType> = {
  top: Hero,
  about: About,
  work: Work,
  projects: Projects,
  approach: Approach,
  skills: Skills,
  contact: Contact,
};

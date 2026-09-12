import { Reveal } from "@/components/ui/reveal";
import { skillsContent } from "@/content/skills";
import { SectionShell } from "../section-shell";
import { SkillGroup } from "./skill-group";

const COLUMNS = 3;

export function Skills() {
  const { heading, groups } = skillsContent;

  return (
    <SectionShell id="skills" heading={heading}>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => (
          <Reveal key={group.title} delay={(index % COLUMNS) * 60} threshold={0.15}>
            <SkillGroup group={group} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

import { workContent } from "@/content/work";
import { SectionShell } from "../section-shell";
import { Timeline } from "./timeline";

export function Work() {
  return (
    <SectionShell id="work" heading={workContent.heading}>
      <Timeline entries={workContent.entries} />
    </SectionShell>
  );
}

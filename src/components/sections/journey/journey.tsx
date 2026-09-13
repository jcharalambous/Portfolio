import { Reveal } from "@/components/ui/reveal";
import { journeyContent } from "@/content/journey";
import { SectionShell } from "../section-shell";
import { Carousel } from "./carousel";

/** Lessons from the career so far, one square each, with the story behind each in a window. */
export function Journey() {
  const { heading, intro, lessons, ...labels } = journeyContent;

  return (
    <SectionShell id="journey" heading={heading} intro={intro}>
      <Reveal threshold={0.15}>
        <Carousel lessons={lessons} labels={labels} />
      </Reveal>
    </SectionShell>
  );
}

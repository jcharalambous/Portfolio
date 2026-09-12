import { aboutContent } from "@/content/about";
import { siteConfig } from "@/lib/site";
import { SectionShell } from "../section-shell";
import { Facts } from "./facts";
import { LocalClock } from "./local-clock";
import { Terminal } from "./terminal";

export function About() {
  const { heading, terminal, facts, localTimeLabel } = aboutContent;

  return (
    <SectionShell id="about" heading={heading}>
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)] lg:gap-10">
        <Terminal title={terminal.title} script={terminal.script} />
        <Facts
          facts={facts}
          trailing={{ label: localTimeLabel, value: <LocalClock timeZone={siteConfig.timeZone} /> }}
        />
      </div>
    </SectionShell>
  );
}

import type { ReactNode } from "react";
import { sections, type SectionId } from "@/content/sections";

type Props = {
  id: SectionId;
  /** Falls back to the section's label from the list. */
  heading?: string;
  intro?: string;
  children?: ReactNode;
};

/** The frame every section except the hero sits in: anchor id, kicker, heading, optional intro. */
export function SectionShell({ id, heading, intro, children }: Props) {
  const { label } = sections.find((section) => section.id === id)!;

  return (
    <section id={id} className="flex min-h-screen flex-col justify-center">
      <header>
        <p className="text-ink-muted">{label}</p>
        <h2>{heading ?? label}</h2>
        {intro && <p>{intro}</p>}
      </header>
      {children}
    </section>
  );
}

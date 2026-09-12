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
    <section
      id={id}
      className="flex min-h-screen flex-col justify-center border-t border-line-soft px-(--gutter) py-24"
    >
      <header className="mb-12">
        <p className="mb-2.5 text-kicker text-ink-muted">{label}</p>
        <h2 className="max-w-[18ch] text-balance text-heading">{heading ?? label}</h2>
        {intro && <p className="mt-[18px] max-w-[50ch] text-lede text-ink-muted">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

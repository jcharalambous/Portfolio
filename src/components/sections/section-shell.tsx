import type { ReactNode } from "react";
import { sections, type SectionId } from "@/content/sections";

type Props = {
  id: SectionId;
  /** Falls back to the section's label from the list. */
  heading?: string;
  intro?: string;
  /** Where the content sits in the screen. Most sections centre; a long one starts at the top. */
  align?: "center" | "start";
  children?: ReactNode;
};

const alignment = {
  center: "justify-center py-24",
  start: "justify-start pt-[140px] pb-10 max-stack:pb-20",
};

/** The frame every section except the hero sits in: anchor id, kicker, heading, optional intro. */
export function SectionShell({ id, heading, intro, align = "center", children }: Props) {
  const { label } = sections.find((section) => section.id === id)!;

  return (
    <section
      id={id}
      className={`flex min-h-svh flex-col border-t border-line-soft px-(--gutter) ${alignment[align]}`}
    >
      <header className="mb-12">
        <p className="mb-2.5 text-kicker text-ink-muted">{label}</p>
        <h2 className="max-w-[18ch] text-heading text-balance">{heading ?? label}</h2>
        {intro && <p className="mt-[18px] max-w-[50ch] text-lede text-ink-muted">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

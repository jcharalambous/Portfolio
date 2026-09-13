import type { ReactNode } from "react";
import { sections, type SectionId } from "@/content/sections";

type Props = {
  id: SectionId;
  /** Falls back to the section's label from the list. */
  heading?: ReactNode;
  intro?: string;
  /** Where the content sits in the screen. Most sections centre; a long one starts at the top. */
  align?: "center" | "start";
  /** The finale's heading is display size. */
  size?: "heading" | "display";
  children?: ReactNode;
};

const alignment = {
  center: "justify-center py-24",
  start: "justify-start pt-[140px] pb-10 max-stack:pb-20",
};

const headingSize = {
  heading: "max-w-[18ch] text-heading",
  display: "text-display",
};

/** The frame every section except the hero sits in: anchor id, kicker, heading, optional intro. */
export function SectionShell({
  id,
  heading,
  intro,
  align = "center",
  size = "heading",
  children,
}: Props) {
  const { label } = sections.find((section) => section.id === id)!;

  return (
    <section
      id={id}
      className={`relative flex min-h-svh flex-col border-t border-line-soft px-(--gutter) ${alignment[align]}`}
    >
      <header className="mb-12">
        <p className="mb-2.5 text-kicker text-ink-muted">{label}</p>
        <h2 className={`${headingSize[size]} text-balance`}>{heading ?? label}</h2>
        {intro && <p className="mt-[18px] max-w-[50ch] text-lede text-ink-muted">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

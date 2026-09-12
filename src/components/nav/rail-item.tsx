import type { Section } from "@/content/sections";

export type RailItemState = "done" | "active" | "upcoming";

type Props = {
  section: Section;
  state: RailItemState;
};

const dotByState: Record<RailItemState, string> = {
  upcoming: "border-white/35 bg-page",
  done: "border-white/55 bg-white/55",
  active: "scale-[1.35] border-white bg-white",
};

/*
 * Small screens: the link is a 44px tap target with the dot in the middle.
 * Side rail: the dot hangs on the line to the left of the label.
 */
const link =
  "group pointer-events-auto relative outline-none max-stack:flex max-stack:size-11 max-stack:items-center max-stack:justify-center stack:block stack:py-1";
const onLine =
  "stack:absolute stack:top-1/2 stack:-left-[26px] stack:-translate-x-1/2 stack:-translate-y-1/2";
const label =
  "block text-[13px] leading-tight tracking-tight transition-[color,transform] duration-300 ease-strong group-hover:translate-x-[3px] group-hover:text-ink motion-reduce:transition-none motion-reduce:transform-none max-stack:hidden max-wide:absolute max-wide:top-1/2 max-wide:left-3.5 max-wide:-translate-y-1/2 max-wide:whitespace-nowrap max-wide:opacity-0 max-wide:group-hover:translate-x-1 max-wide:group-hover:-translate-y-1/2 max-wide:group-hover:opacity-100";
const meta =
  "block overflow-hidden text-[11px] leading-snug text-ink-faint transition-[max-height,opacity,transform,margin-top] duration-[400ms] ease-strong motion-reduce:transition-none max-wide:hidden";

/** One link in the rail: its node, the label, and the meta line shown while active. */
export function RailItem({ section, state }: Props) {
  const active = state === "active";

  return (
    <li className="relative">
      <a
        href={`#${section.id}`}
        aria-label={section.label}
        aria-current={active ? "location" : undefined}
        className={`${link} focus-visible:[&>span:first-child]:shadow-[0_0_0_3px] focus-visible:[&>span:first-child]:shadow-link/60`}
      >
        <span
          aria-hidden="true"
          className={`size-[11px] rounded-full border-[1.5px] transition-[transform,background-color,border-color] duration-300 ease-strong group-hover:border-white motion-reduce:transition-none ${onLine} ${dotByState[state]} ${active ? "group-hover:scale-[1.45]" : "group-hover:scale-125"}`}
        />
        {active && (
          <span
            aria-hidden="true"
            className={`absolute top-1/2 left-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white opacity-0 animate-pulse-ring motion-reduce:animate-none stack:left-auto ${onLine}`}
          />
        )}
        <span className={`${label} ${active ? "text-ink max-wide:opacity-100" : "text-ink-muted"}`}>
          {section.label}
        </span>
        <span
          className={`${meta} ${active ? "mt-1 max-h-12 opacity-100" : "mt-0 max-h-0 -translate-y-[3px] opacity-0"}`}
        >
          {section.meta}
        </span>
      </a>
    </li>
  );
}

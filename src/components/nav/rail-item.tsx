import type { Section } from "@/content/sections";

export type RailItemState = "done" | "active" | "upcoming";

type Props = {
  section: Section;
  state: RailItemState;
};

/** The node's look per state, its growth on hover, and a slight settle while pressed. */
const dotByState: Record<RailItemState, string> = {
  upcoming: "border-white/35 bg-page group-hover:scale-125 group-active:scale-110",
  done: "border-white/55 bg-white/55 group-hover:scale-125 group-active:scale-110",
  active: "scale-[1.35] border-white bg-white group-hover:scale-[1.45] group-active:scale-[1.3]",
};

/*
 * Small screens: the link is a 44px tap target with the dot in the middle.
 * Side rail: the dot hangs on the line to the left of the label.
 */
const link =
  "group pointer-events-auto relative outline-none max-stack:flex max-stack:size-11 max-stack:items-center max-stack:justify-center stack:block stack:py-1";
const onLine =
  "stack:absolute stack:top-1/2 stack:-left-[26px] stack:-translate-x-1/2 stack:-translate-y-1/2";
const dot =
  "size-[11px] rounded-full border-[1.5px] transition-[scale,background-color,border-color] duration-200 ease-strong group-hover:border-white motion-reduce:transition-[background-color,border-color]";
const label =
  "block text-caption leading-tight tracking-tight transition-[color,translate] duration-200 ease-strong group-hover:translate-x-[3px] group-hover:text-ink motion-reduce:transition-colors motion-reduce:transform-none max-stack:hidden max-wide:absolute max-wide:top-1/2 max-wide:left-3.5 max-wide:-translate-y-1/2 max-wide:whitespace-nowrap max-wide:opacity-0 max-wide:group-hover:translate-x-1 max-wide:group-hover:-translate-y-1/2 max-wide:group-hover:opacity-100";
/* The meta line opens as a grid row, so the motion covers exactly its height. */
const meta =
  "grid transition-[grid-template-rows,opacity,translate] duration-[400ms] ease-strong motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:translate-y-0 max-wide:hidden";
const metaOpen = "grid-rows-[1fr] translate-y-0 opacity-100";
const metaClosed = "grid-rows-[0fr] -translate-y-[3px] opacity-0";

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
        <span aria-hidden="true" className={`${dot} ${onLine} ${dotByState[state]}`} />
        {active && (
          <span
            aria-hidden="true"
            className={`absolute top-1/2 left-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-white opacity-0 motion-reduce:animate-none ${onLine}`}
          />
        )}
        <span className={`${label} ${active ? "text-ink max-wide:opacity-100" : "text-ink-muted"}`}>
          {section.label}
        </span>
        <span className={`${meta} ${active ? metaOpen : metaClosed}`}>
          <span className="block min-h-0 overflow-hidden">
            <span className="block pt-1 text-micro leading-snug text-ink-faint">
              {section.meta}
            </span>
          </span>
        </span>
      </a>
    </li>
  );
}

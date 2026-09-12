import { Reveal } from "@/components/ui/reveal";
import type { WorkEntry } from "@/content/work";

type Props = {
  entry: WorkEntry;
  /** Position in the list, for the stagger. */
  index: number;
};

/** One job on the timeline: its marker on the line, dates, title, paragraphs and tags. */
export function TimelineEntry({ entry, index }: Props) {
  const { role, org, from, to, current, minor, body, tags } = entry;

  return (
    <Reveal delay={Math.min(index, 3) * 60} className={`relative ${minor ? "pb-10" : "pb-14"} last:pb-0`}>
      <span
        aria-hidden="true"
        className={`absolute top-2 -left-10 size-[13px] translate-x-[-50%] translate-x-[6.5px] rounded-full border-[1.5px] ${
          current
            ? "border-live bg-live shadow-[0_0_0_4px_rgba(48,209,88,0.15),0_0_16px_rgba(48,209,88,0.5)]"
            : "border-white/55 bg-white/55"
        }`}
      />
      <p className="mb-1.5 text-xs tracking-[0.02em] text-ink-muted tabular-nums">
        {from} — {current ? <b className="font-medium text-live">{to}</b> : to}
      </p>
      <h3 className={`leading-[1.2] font-semibold tracking-[-0.015em] ${minor ? "text-[19px]" : "text-[21px] lg:text-2xl"}`}>
        {role}
        <small className={`mt-0.5 block font-normal tracking-[-0.005em] text-ink-muted ${minor ? "text-[15px]" : "text-[17px]"}`}>
          {org}
        </small>
      </h3>
      <div className="mt-3.5">
        {body.map((paragraph, i) => (
          <p
            key={i}
            className={`mb-3 max-w-[60ch] leading-[1.47] tracking-[-0.005em] text-ink-muted last:mb-0 ${minor ? "text-[15px]" : "text-[17px]"}`}
          >
            {paragraph.lead && <strong className="font-medium text-ink">{paragraph.lead}</strong>}
            {paragraph.text}
          </p>
        ))}
        {tags && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.07] px-2.5 py-[5px] text-xs text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

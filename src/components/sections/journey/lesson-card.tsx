import type { Lesson } from "@/content/journey";

type Props = {
  lesson: Lesson;
  /** Position in the journey, shown as a two-digit chapter number. */
  index: number;
  /** In the middle of the track: full size, and a press opens the story. */
  active: boolean;
  readLabel: string;
  onOpen: () => void;
  /** A press on a card to either side brings it to the middle instead. */
  onCentre: () => void;
};

/* The side cards sit back, smaller and dimmer; the one in the middle comes forward. Reduced motion keeps the dimming and drops the scaling. */
const frame =
  "group relative w-(--card) shrink-0 scale-[0.86] snap-center opacity-50 transition-[scale,opacity] duration-300 ease-strong data-active:scale-100 data-active:opacity-100 motion-reduce:scale-100 motion-reduce:transition-opacity motion-reduce:duration-200";
const face =
  "flex aspect-square flex-col justify-between rounded-[22px] border border-ink/10 bg-ink/4 p-6 transition-[scale,border-color,background-color] duration-200 ease-strong group-hover:border-ink/22 group-hover:bg-ink/6 group-active:scale-[0.98] group-active:duration-100 group-data-active:border-ink/16";
const hint =
  "mt-4 inline-flex items-center gap-1.5 text-caption font-medium text-link opacity-0 transition-opacity duration-300 ease-strong group-data-active:opacity-100";

/** One lesson as a square on the track. The whole square is the button. */
export function LessonCard({ lesson, index, active, readLabel, onOpen, onCentre }: Props) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li data-active={active || undefined} className={frame}>
      <article className={face}>
        <p className="flex justify-between font-mono text-xs tracking-[0.08em] text-ink-muted uppercase">
          <span>{number}</span>
          <span>{lesson.setting}</span>
        </p>
        <div>
          <h3 className="text-title leading-[1.15] font-semibold tracking-[-0.02em] text-ink">
            {lesson.title}
          </h3>
          <p className="mt-2 text-body-sm leading-[1.45] tracking-[-0.005em] text-ink-muted">
            {lesson.teaser}
          </p>
          <span className={hint}>
            {readLabel}
            <span className="transition-transform duration-[320ms] ease-strong group-hover:translate-x-[3px] motion-reduce:transform-none">
              →
            </span>
          </span>
        </div>
      </article>
      {/* A keyboard press (detail 0) opens whichever card it lands on, so nobody has to press twice. */}
      <button
        type="button"
        aria-label={`${readLabel}: ${lesson.title}`}
        aria-current={active || undefined}
        onClick={(event) => (active || event.detail === 0 ? onOpen() : onCentre())}
        className="absolute inset-0 rounded-[22px] outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link"
      />
    </li>
  );
}

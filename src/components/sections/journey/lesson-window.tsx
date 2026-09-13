"use client";

import { useEffect, useId, useRef } from "react";
import type { Lesson } from "@/content/journey";

type Props = {
  /** The story on show. Stays put while the window closes, so nothing goes blank mid-fade. */
  lesson: Lesson | null;
  index: number;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  lessonLabel: string;
};

/*
 * A modal, so it stays centred and scales from there. Opening takes 240ms, closing 150ms;
 * `display` and `overlay` transition discretely so the exit can play before it is gone.
 * Reduced motion keeps the fade and drops the scaling.
 */
const window_ =
  "m-auto w-[min(92vw,44rem)] scale-[0.96] overflow-hidden rounded-[18px] border border-line bg-page-soft text-ink opacity-0 shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-[opacity,scale,display,overlay] transition-discrete duration-150 ease-strong open:scale-100 open:opacity-100 open:duration-[240ms] starting:open:scale-[0.96] starting:open:opacity-0 motion-reduce:scale-100 motion-reduce:transition-[opacity,display,overlay] backdrop:bg-black/55 backdrop:opacity-0 backdrop:backdrop-blur-[6px] backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-150 backdrop:ease-strong open:backdrop:opacity-100 open:backdrop:duration-[240ms] starting:open:backdrop:opacity-0 reduced-transparency:backdrop:bg-black/80 reduced-transparency:backdrop:backdrop-blur-none";

/** The story behind a card, in a window with a working red close button. */
export function LessonWindow({ lesson, index, open, onClose, closeLabel, lessonLabel }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // A press on the dim backdrop lands on the dialog itself, not on anything inside it.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className={window_}
    >
      <div className="flex h-10 items-center gap-2 border-b border-line-soft bg-ink/4 px-3.5 text-xs text-ink-muted">
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="group -m-2 grid size-7 place-items-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-link"
        >
          <span className="size-3 rounded-full bg-traffic-red transition-[scale] duration-160 ease-strong group-hover:scale-110 group-active:scale-95" />
        </button>
        <span aria-hidden="true" className="size-3 rounded-full bg-ink/15" />
        <span aria-hidden="true" className="size-3 rounded-full bg-ink/15" />
        <span className="flex-1 truncate text-center tabular-nums">
          {lesson && `${String(index + 1).padStart(2, "0")} · ${lesson.setting}`}
        </span>
        <span aria-hidden="true" className="w-13" />
      </div>
      {lesson && (
        <div
          tabIndex={0}
          className="max-h-[calc(85svh-2.5rem)] overflow-y-auto overscroll-contain px-7 py-7 outline-none sm:px-10 sm:py-9"
        >
          <h3
            id={titleId}
            className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.025em] text-balance"
          >
            {lesson.title}
          </h3>
          <div className="mt-6 flex max-w-[60ch] flex-col gap-4">
            {lesson.story.map((paragraph, i) => (
              <p key={i} className="text-body leading-[1.55] tracking-[-0.005em] text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <aside className="mt-9 border-t border-line pt-6">
            <p className="font-mono text-xs tracking-[0.08em] text-ink-muted uppercase">
              {lessonLabel}
            </p>
            <p className="mt-3 text-title leading-[1.3] font-semibold tracking-[-0.02em] text-ink">
              {lesson.lesson}
            </p>
          </aside>
        </div>
      )}
    </dialog>
  );
}

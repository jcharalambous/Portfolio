"use client";

import { useState, type KeyboardEvent } from "react";
import type { Lesson } from "@/content/journey";
import { ArrowButton } from "./arrow-button";
import { LessonCard } from "./lesson-card";
import { LessonWindow } from "./lesson-window";
import { useCarousel } from "./use-carousel";

type Labels = {
  readLabel: string;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
  lessonLabel: string;
};

type Props = {
  lessons: readonly Lesson[];
  labels: Labels;
};

/*
 * A snapping track, padded so the first and last cards can sit in the middle, with the
 * edges faded out. On a phone it runs to the screen edges so the next card shows past
 * the middle one. The scrollbar is hidden: the arrows, a swipe or the arrow keys move it.
 */
const track =
  "flex gap-4 overflow-x-auto px-[calc(50%-var(--card)/2)] py-2 [--card:min(22rem,62vw)] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [scrollbar-width:none] snap-x snap-mandatory max-stack:-mx-(--gutter) stack:gap-6 stack:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [&::-webkit-scrollbar]:hidden";
/* Below `stack` the arrows sit in a row under the track; beside it, they float over its faded edges. */
const arrows = "mt-6 flex justify-center gap-3 stack:contents";
const arrow = "stack:absolute stack:top-1/2 stack:-translate-y-1/2";

/** The lessons as squares on a track, and the window that opens the story behind the middle one. */
export function Carousel({ lessons, labels }: Props) {
  const { trackRef, active, go } = useCarousel(lessons.length);
  const [reading, setReading] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const read = (index: number) => {
    setReading(index);
    setOpen(true);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = Math.min(Math.max(active + step, 0), lessons.length - 1);
    go(next);
    trackRef.current?.children[next]?.querySelector("button")?.focus({ preventScroll: true });
  };

  return (
    <div className="relative">
      <ul ref={trackRef} onKeyDown={onKeyDown} className={track}>
        {lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.title}
            lesson={lesson}
            index={index}
            active={index === active}
            readLabel={labels.readLabel}
            onOpen={() => read(index)}
            onCentre={() => go(index)}
          />
        ))}
      </ul>
      <div className={arrows}>
        <ArrowButton
          direction="previous"
          label={labels.previousLabel}
          disabled={active === 0}
          onClick={() => go(active - 1)}
          className={`${arrow} stack:-left-3`}
        />
        <ArrowButton
          direction="next"
          label={labels.nextLabel}
          disabled={active === lessons.length - 1}
          onClick={() => go(active + 1)}
          className={`${arrow} stack:-right-3`}
        />
      </div>
      <LessonWindow
        lesson={reading === null ? null : lessons[reading]}
        index={reading ?? 0}
        open={open}
        onClose={() => setOpen(false)}
        closeLabel={labels.closeLabel}
        lessonLabel={labels.lessonLabel}
      />
    </div>
  );
}

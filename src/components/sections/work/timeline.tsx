"use client";

import { useRef } from "react";
import type { WorkEntry } from "@/content/work";
import { TimelineEntry } from "./timeline-entry";
import { useDrawProgress } from "./use-draw-progress";

type Props = {
  entries: readonly WorkEntry[];
};

/** The entries down a vertical line that lights up as the reader scrolls past. */
export function Timeline({ entries }: Props) {
  const block = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  useDrawProgress(block, (progress) => {
    if (line.current) line.current.style.transform = `scaleY(${progress})`;
  });

  return (
    <div ref={block} className="relative max-w-[760px] pl-10">
      <div aria-hidden="true" className="absolute top-2.5 bottom-2.5 left-1.5 w-px bg-line" />
      <div
        ref={line}
        aria-hidden="true"
        className="absolute top-2.5 left-1.5 h-full w-px origin-top scale-y-0 bg-linear-to-b from-white to-white/35"
      />
      {entries.map((entry, index) => (
        <TimelineEntry key={`${entry.org}-${entry.from}`} entry={entry} index={index} />
      ))}
    </div>
  );
}

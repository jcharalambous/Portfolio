"use client";

import { useRef, useState } from "react";
import { sections } from "@/content/sections";
import { fillOffset } from "@/lib/scroll/fill-offset";
import { itemCentres } from "@/lib/scroll/item-centres";
import { siteConfig } from "@/lib/site";
import { RailItem, type RailItemState } from "./rail-item";
import { RailProgress } from "./rail-progress";
import { useIdle } from "./use-idle";
import { useSectionPosition } from "./use-section-position";

const ids = sections.map((section) => section.id);

function stateFor(index: number, active: number): RailItemState {
  if (index < active) return "done";
  if (index === active) return "active";
  return "upcoming";
}

/** Fixed left-hand nav: a node per section on a line that fills as the reader scrolls. */
export function Rail() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const idle = useIdle({ initialDelay: 3000, delay: 2200 });

  useSectionPosition(ids, ({ index, progress }) => {
    setActive(index);
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    fill.style.height = `${fillOffset(itemCentres(list), index, progress)}px`;
  });

  return (
    <nav
      aria-label="Sections"
      data-idle={idle || undefined}
      className="pointer-events-none fixed inset-y-0 left-0 z-50 flex w-rail-compact flex-col justify-center pl-[26px] transition-opacity duration-500 ease-out hover:opacity-100 hover:duration-200 focus-within:opacity-100 data-idle:opacity-40 wide:w-rail wide:pl-10"
    >
      <a
        href="#top"
        className="pointer-events-auto absolute top-6 left-[26px] text-xs font-semibold tracking-tight text-ink wide:left-10"
      >
        {siteConfig.name}
      </a>
      <div className="relative pl-[26px]">
        <RailProgress ref={fillRef} />
        <ol ref={listRef} className="flex flex-col gap-[22px]">
          {sections.map((section, index) => (
            <RailItem
              key={section.id}
              section={section}
              state={stateFor(index, active)}
            />
          ))}
        </ol>
      </div>
    </nav>
  );
}

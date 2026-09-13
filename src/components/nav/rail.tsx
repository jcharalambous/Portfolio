"use client";

import { useRef, useState } from "react";
import { sections } from "@/content/sections";
import { fillOffset } from "@/lib/scroll/fill-offset";
import { itemCentres } from "@/lib/scroll/item-centres";
import { siteConfig } from "@/lib/site/config";
import { RailItem, type RailItemState } from "./rail-item";
import { RailProgress } from "./rail-progress";
import { useAddressSync } from "./use-address-sync";
import { useAnchorLanding } from "./use-anchor-landing";
import { useHasScrolled } from "./use-has-scrolled";
import { useIdle } from "./use-idle";
import { useSectionPosition } from "./use-section-position";

const ids = sections.map((section) => section.id);

function stateFor(index: number, active: number): RailItemState {
  if (index < active) return "done";
  if (index === active) return "active";
  return "upcoming";
}

/**
 * Section nav. On small screens it is a bar of dots along the bottom, a translucent
 * layer the page scrolls under. From the `stack` breakpoint up it is a fixed rail on
 * the left: a node per section on a line that fills as the reader scrolls. It dims
 * slowly once the reader has settled and comes back at once on any scroll.
 */
export function Rail() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const idle = useIdle({ initialDelay: 3000, delay: 2200 });
  // The address only starts following once the reader scrolls. Before that the
  // browser owns it: a link to /#projects must still land on Projects.
  useAnchorLanding(ids);
  const hasScrolled = useHasScrolled();
  useAddressSync(hasScrolled ? (active === 0 ? null : sections[active].id) : undefined);

  useSectionPosition(ids, ({ index, progress }) => {
    setActive(index);
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const lit = fillOffset(itemCentres(list), index, progress);
    fill.style.transform = `scaleY(${lit / (fill.offsetHeight || 1)})`;
  });

  return (
    <nav
      aria-label="Sections"
      data-idle={idle || undefined}
      className="pointer-events-none fixed z-50 flex transition-opacity duration-200 ease-strong focus-within:opacity-100 hover:opacity-100 data-idle:opacity-40 max-stack:inset-x-0 max-stack:bottom-0 max-stack:h-14 max-stack:items-center max-stack:justify-center max-stack:bg-page/80 max-stack:backdrop-blur-md max-stack:before:pointer-events-none max-stack:before:absolute max-stack:before:inset-x-0 max-stack:before:bottom-full max-stack:before:h-8 max-stack:before:bg-linear-to-t max-stack:before:from-page/70 max-stack:before:to-transparent max-stack:before:content-[''] contrast-more:max-stack:border-t contrast-more:max-stack:border-line contrast-more:max-stack:bg-page stack:inset-y-0 stack:left-0 stack:w-rail-compact stack:flex-col stack:justify-center stack:pl-[26px] wide:w-rail wide:pl-10 reduced-transparency:max-stack:bg-page reduced-transparency:max-stack:backdrop-blur-none data-idle:[&:not(:hover)]:duration-500"
    >
      <a
        href="#top"
        className="pointer-events-auto absolute top-6 left-[26px] text-xs font-semibold tracking-tight whitespace-nowrap text-ink max-stack:hidden wide:left-10"
      >
        {siteConfig.name}
      </a>
      <div className="relative stack:pl-[26px]">
        <RailProgress ref={fillRef} />
        <ol ref={listRef} className="flex max-stack:flex-row stack:flex-col stack:gap-[22px]">
          {sections.map((section, index) => (
            <RailItem key={section.id} section={section} state={stateFor(index, active)} />
          ))}
        </ol>
      </div>
    </nav>
  );
}

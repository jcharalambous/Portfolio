import type { Ref } from "react";

type Props = {
  /** The lit line. The rail sets its vertical scale directly, outside React renders. */
  ref: Ref<HTMLDivElement>;
};

/** The vertical line behind the nodes, and the lit part that grows as the reader scrolls. Side rail only. */
export function RailProgress({ ref }: Props) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-y-2 left-0 w-px bg-line max-stack:hidden" />
      {/* Full length and scaled down from the top: a transform, so no scroll frame touches layout. */}
      <div
        ref={ref}
        aria-hidden="true"
        className="absolute inset-y-2 left-0 w-px origin-top scale-y-0 bg-linear-to-b from-white/35 to-white shadow-[0_0_12px_rgba(255,255,255,0.35)] max-stack:hidden"
      />
    </>
  );
}

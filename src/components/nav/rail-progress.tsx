import type { Ref } from "react";

type Props = {
  /** The fill element. The rail sets its height directly, outside React renders. */
  ref: Ref<HTMLDivElement>;
};

/** The vertical line behind the nodes, and the lit part that grows as the reader scrolls. */
export function RailProgress({ ref }: Props) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-y-2 left-0 w-px bg-line" />
      <div
        ref={ref}
        aria-hidden="true"
        className="absolute top-2 left-0 h-0 w-px bg-linear-to-b from-white/35 to-white shadow-[0_0_12px_rgba(255,255,255,0.35)]"
      />
    </>
  );
}

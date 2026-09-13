/** The ↗ on an outward link. Nudges up and right while the `group` parent is hovered. */
export function NudgeArrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-[320ms] ease-strong group-hover:translate-x-[3px] group-hover:-translate-y-[3px] motion-reduce:transform-none"
    >
      ↗
    </span>
  );
}

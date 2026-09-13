/** Two links of a chain, slightly apart at rest. They click together while the `group` parent is hovered. */
const half =
  "transition-transform duration-[420ms] ease-strong group-hover:translate-0 motion-reduce:transition-none";

export function ChainIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 shrink-0 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className={`${half} -translate-x-0.5 -translate-y-0.5`}
        d="M10 13a4 4 0 0 1 0-5.7l2-2a4 4 0 0 1 5.7 5.7l-1 1"
      />
      <path
        className={`${half} translate-x-0.5 translate-y-0.5`}
        d="M14 11a4 4 0 0 1 0 5.7l-2 2a4 4 0 0 1-5.7-5.7l1-1"
      />
    </svg>
  );
}

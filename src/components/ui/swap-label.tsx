type Props = {
  label: string;
  /** Slides up to replace the label while the `group` parent is hovered. */
  hint: string;
};

const slide = "transition-[translate,opacity] duration-[320ms] ease-strong";

/** A label and its hint share one cell, so the button is as wide as the wider of the two from the start. */
export function SwapLabel({ label, hint }: Props) {
  return (
    <span className="grid h-[1.2em] overflow-hidden text-center leading-[1.2em] [&>span]:[grid-area:1/1]">
      <span
        className={`${slide} group-hover:-translate-y-full group-hover:opacity-0 motion-reduce:group-hover:translate-y-0`}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`${slide} translate-y-full whitespace-nowrap opacity-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0`}
      >
        {hint}
      </span>
    </span>
  );
}

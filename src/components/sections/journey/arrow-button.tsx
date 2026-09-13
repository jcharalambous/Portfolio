type Props = {
  direction: "previous" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
  className?: string;
};

const paths = {
  previous: "M10 3 5 8l5 5",
  next: "m6 3 5 5-5 5",
};

/* A translucent chip over the track's faded edge. Colour eases; the press is quick. */
const chip =
  "grid size-11 place-items-center rounded-full border border-ink/12 bg-page/70 text-ink backdrop-blur-md [transition:background-color_200ms_ease,border-color_200ms_ease,opacity_200ms_ease,scale_160ms_var(--ease-strong)] hover:border-ink/22 hover:bg-ink/10 active:scale-[0.94] active:duration-100 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link reduced-transparency:bg-page reduced-transparency:backdrop-blur-none";

/** One of the two arrows beside the track. Dims at the end of the line. */
export function ArrowButton({ direction, label, disabled, onClick, className }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`${chip} ${className ?? ""}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={paths[direction]} />
      </svg>
    </button>
  );
}

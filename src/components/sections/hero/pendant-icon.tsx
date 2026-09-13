type Props = {
  lit: boolean;
  /** Plays one swing, as if the cord had just been pulled. */
  swinging: boolean;
};

/** A pendant bulb on a cord from the top edge. Glows warm while the lights are on. */
export function PendantIcon({ lit, swinging }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 124"
      className={`h-[124px] w-12 origin-top fill-none stroke-current text-ink-muted transition-colors duration-300 ease-strong group-hover:text-ink ${swinging ? "animate-swing motion-reduce:animate-none" : ""}`}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id="pendant-glow">
          <stop offset="0" stopColor="#ffd60a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffd60a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* The glow sits behind the glass and fades in with it. */}
      <circle
        cx="24"
        cy="98"
        r="24"
        fill="url(#pendant-glow)"
        className={`stroke-none transition-opacity duration-300 ease-strong ${lit ? "opacity-100" : "opacity-0"}`}
      />
      <line x1="24" y1="0" x2="24" y2="66" />
      <rect x="18" y="66" width="12" height="10" rx="2" className="fill-page" />
      <path
        d="M19 76c0 6-6 9-6 18a11 11 0 0 0 22 0c0-9-6-12-6-18Z"
        className={`transition-[fill,stroke] duration-300 ease-strong ${lit ? "fill-[#ffd60a] stroke-[#ffd60a]" : "fill-page"}`}
      />
      {lit && <path d="M21 98l2-4 2 4 2-4" className="stroke-[#7a5c00]" />}
    </svg>
  );
}

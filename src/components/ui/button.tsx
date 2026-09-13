import type { ComponentProps } from "react";

// Colour changes ease; the press is a quick strong ease-out, and pressing is faster than letting go.
const base =
  "inline-flex items-center justify-center rounded-full [transition:background-color_200ms_ease,border-color_200ms_ease,transform_160ms_var(--ease-strong)] active:scale-[0.97] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link";

const variants = {
  /** The blue pill. */
  primary: "bg-accent text-white hover:bg-accent-hover",
  /** Quiet, for secondary actions beside a primary one. */
  ghost:
    "border border-white/[0.12] bg-white/[0.06] text-ink hover:border-white/[0.22] hover:bg-white/10",
};

const sizes = {
  md: "px-[22px] py-3 text-body leading-[1.2] tracking-[-0.02em]",
  sm: "px-5 py-[11px] text-body-sm leading-[1.2] tracking-[-0.01em]",
};

type Look = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function look({ variant = "primary", size = "md" }: Look) {
  return cx(base, variants[variant], sizes[size]);
}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ComponentProps<"button"> & Look) {
  return <button type={type} className={cx(look({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, ...props }: ComponentProps<"a"> & Look) {
  return <a className={cx(look({ variant, size }), className)} {...props} />;
}

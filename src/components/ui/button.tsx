import type { ComponentProps } from "react";

const pill =
  "inline-flex items-center justify-center rounded-full bg-accent px-[22px] py-3 text-[17px] leading-[1.2] tracking-[-0.02em] text-white transition-[background-color,transform] duration-200 ease-out hover:bg-accent-hover active:scale-[0.97] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-link";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({ className, type = "button", ...props }: ComponentProps<"button">) {
  return <button type={type} className={cx(pill, className)} {...props} />;
}

export function ButtonLink({ className, ...props }: ComponentProps<"a">) {
  return <a className={cx(pill, className)} {...props} />;
}

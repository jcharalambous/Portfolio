import type { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={["mx-auto w-full max-w-3xl px-6", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

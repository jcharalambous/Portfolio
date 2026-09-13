"use client";

import type { ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { emailAddress, mailto } from "@/lib/email/address";

type Props = {
  className?: string;
  /** Link text. Defaults to the address itself. */
  children?: ReactNode;
};

/** A mailto link whose address only exists once the page runs in the browser. */
export function EmailLink({ className, children }: Props) {
  const hydrated = useHydrated();
  return (
    <a href={hydrated ? mailto() : undefined} className={className}>
      {children ?? (hydrated ? emailAddress() : "")}
    </a>
  );
}

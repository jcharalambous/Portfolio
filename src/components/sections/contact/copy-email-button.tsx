"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { emailAddress } from "@/lib/email/address";

type Props = {
  label: string;
  copiedLabel: string;
};

/** How long the button says "Copied" before going back. */
const CONFIRM_MS = 1800;

const swap =
  "flex items-center justify-center gap-2 transition-[translate,opacity] duration-[260ms] ease-strong motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:translate-y-0";

/** Copies the address to the clipboard and says so for a moment, with a tick that draws itself. */
export function CopyEmailButton({ label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), CONFIRM_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function copy() {
    // Say so at once, on the press. The clipboard write finishes on its own.
    setCopied(true);
    navigator.clipboard.writeText(emailAddress()).catch(() => {
      // Clipboard access can be refused; the address is still on screen to select.
    });
  }

  return (
    <Button
      variant="ghost"
      onClick={copy}
      aria-live="polite"
      data-copied={copied || undefined}
      className="relative min-w-32 overflow-hidden data-copied:border-live/45 data-copied:bg-live/15 data-copied:hover:bg-live/15"
    >
      <span
        aria-hidden={copied}
        className={`${swap} ${copied ? "-translate-y-[30%] opacity-0" : ""}`}
      >
        {label}
      </span>
      <span
        aria-hidden={!copied}
        className={`${swap} absolute inset-0 ${copied ? "" : "translate-y-[30%] opacity-0"}`}
      >
        {copiedLabel}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-[18px] fill-none stroke-live"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className={`[stroke-dasharray:24] [stroke-dashoffset:24] ${copied ? "animate-draw motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]" : ""}`}
            d="M5 12.5l4.5 4.5L19 7"
          />
        </svg>
      </span>
    </Button>
  );
}

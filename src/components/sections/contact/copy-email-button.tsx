"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { emailAddress } from "@/lib/email";

type Props = {
  label: string;
  copiedLabel: string;
};

/** How long the button says "Copied" before going back. */
const CONFIRM_MS = 1800;

/** Copies the address to the clipboard and says so for a moment. */
export function CopyEmailButton({ label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), CONFIRM_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(emailAddress());
    } catch {
      // Clipboard access can be refused; the address is still on screen to select.
    }
    setCopied(true);
  }

  return (
    <Button
      size="sm"
      onClick={copy}
      aria-live="polite"
      className={`relative min-w-32 overflow-hidden ${copied ? "bg-live hover:bg-live" : ""}`}
    >
      <span
        aria-hidden={copied}
        className={`block transition-[transform,opacity] duration-[450ms] ease-strong motion-reduce:transition-none ${copied ? "-translate-y-full opacity-0" : ""}`}
      >
        {label}
      </span>
      <span
        aria-hidden={!copied}
        className={`absolute inset-0 grid place-items-center transition-[transform,opacity] duration-[450ms] ease-strong motion-reduce:transition-none ${copied ? "" : "translate-y-full opacity-0"}`}
      >
        {copiedLabel}
      </span>
    </Button>
  );
}

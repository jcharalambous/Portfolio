"use client";

import { useRef } from "react";
import type { TerminalLine } from "@/content/about";
import { useInView } from "@/hooks/use-in-view";
import { useTypewriter } from "./use-typewriter";

type Props = {
  title: string;
  script: readonly TerminalLine[];
};

const prompt = "text-ink before:text-prompt before:content-['$_']";

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-0.5 animate-blink bg-ink motion-reduce:animate-none"
    />
  );
}

/** A terminal window that types out the bio once it scrolls into view. */
export function Terminal({ title, script }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  const { line, chars, done } = useTypewriter(script, {
    start: inView,
    instant:
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[18px] border border-white/[0.09] bg-white/[0.035] font-mono text-sm leading-[1.65] shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.07] bg-white/[0.04] px-3.5 text-xs text-ink-muted">
        <span aria-hidden="true" className="size-3 rounded-full bg-traffic-red" />
        <span aria-hidden="true" className="size-3 rounded-full bg-traffic-amber" />
        <span aria-hidden="true" className="size-3 rounded-full bg-traffic-green" />
        <span className="flex-1 truncate text-center">{title}</span>
        <span aria-hidden="true" className="w-13" />
      </div>
      <div className="px-5 pt-[18px] pb-5 lg:min-h-[380px]">
        {script.map((entry, i) => {
          if (i > line) return null;
          const text = i < line || done ? entry.text : entry.text.slice(0, chars);
          const typing = i === line && !done;
          return entry.kind === "command" ? (
            <p key={i} className={prompt}>
              {text}
              {typing && <Cursor />}
            </p>
          ) : (
            <p
              key={i}
              className={`mb-3.5 whitespace-pre-wrap ${entry.bright ? "text-ink" : "text-ink/70"}`}
            >
              {text}
            </p>
          );
        })}
        {done && (
          <p className={prompt}>
            <Cursor />
          </p>
        )}
      </div>
    </div>
  );
}

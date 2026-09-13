"use client";

import { useRef } from "react";
import type { TerminalLine } from "@/content/about";
import { useInView } from "@/hooks/use-in-view";
import { useTypewriter } from "./use-typewriter";

type Props = {
  title: string;
  script: readonly TerminalLine[];
};

const prompt = "text-window-ink before:text-prompt before:content-['$_']";

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-0.5 animate-blink bg-window-ink motion-reduce:animate-none"
    />
  );
}

/** One line of the script: a command on a prompt, or a block of output. */
function Line({ entry, text, typing }: { entry: TerminalLine; text: string; typing: boolean }) {
  return entry.kind === "command" ? (
    <p className={prompt}>
      {text}
      {typing && <Cursor />}
    </p>
  ) : (
    <p
      className={`mb-3.5 whitespace-pre-wrap ${entry.bright ? "text-window-ink" : "text-window-ink/70"}`}
    >
      {text}
    </p>
  );
}

/**
 * A terminal window that types out the bio when it scrolls into view, and
 * clears when it leaves. The window is its finished size from the start: an
 * invisible copy of the whole script sits under the typed one, so typing never
 * moves anything below it.
 */
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
      className="overflow-hidden rounded-[18px] border border-window-line bg-window font-mono text-sm leading-[1.65] text-window-ink shadow-[0_30px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      <div className="flex h-10 items-center gap-2 border-b border-window-line bg-window-ink/4 px-3.5 text-xs text-window-ink/60">
        <span aria-hidden="true" className="size-3 rounded-full bg-traffic-red" />
        <span aria-hidden="true" className="size-3 rounded-full bg-traffic-amber" />
        <span aria-hidden="true" className="size-3 rounded-full bg-traffic-green" />
        <span className="flex-1 truncate text-center">{title}</span>
        <span aria-hidden="true" className="w-13" />
      </div>
      <div className="grid px-5 pt-[18px] pb-5 [&>*]:[grid-area:1/1]">
        <div aria-hidden="true" className="invisible">
          {script.map((entry, i) => (
            <Line key={i} entry={entry} text={entry.text} typing={false} />
          ))}
          <p className={prompt} />
        </div>
        <div>
          {script.map((entry, i) => {
            if (i > line) return null;
            const text = i < line || done ? entry.text : entry.text.slice(0, chars);
            return <Line key={i} entry={entry} text={text} typing={i === line && !done} />;
          })}
          {done && (
            <p className={prompt}>
              <Cursor />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

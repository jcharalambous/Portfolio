import type { ReactNode } from "react";
import type { Fact } from "@/content/about";

type Props = {
  facts: readonly Fact[];
  /** An extra row rendered last, for values that need the browser (the clock). */
  trailing?: { label: string; value: ReactNode };
};

const row =
  "grid grid-cols-[110px_1fr] items-baseline gap-4 border-t border-white/[0.08] py-4 last:border-b";

/** Label and value rows: status, where, current role, education, stack. */
export function Facts({ facts, trailing }: Props) {
  return (
    <dl className="flex flex-col pt-1.5">
      {facts.map((fact) => (
        <div key={fact.label} className={row}>
          <dt className="text-xs tracking-[0.02em] text-ink-muted">{fact.label}</dt>
          <dd className="text-[17px] leading-[1.35] tracking-[-0.01em] text-ink">
            {fact.live && (
              <span
                aria-hidden="true"
                className="mr-2 inline-block size-[7px] translate-y-[-1px] rounded-full bg-live shadow-[0_0_10px] shadow-live"
              />
            )}
            {fact.value}
            {fact.detail && (
              <small className="mt-0.5 block text-sm text-ink-muted">{fact.detail}</small>
            )}
          </dd>
        </div>
      ))}
      {trailing && (
        <div className={row}>
          <dt className="text-xs tracking-[0.02em] text-ink-muted">{trailing.label}</dt>
          <dd className="text-[17px] leading-[1.35] tracking-[-0.01em] text-ink">
            {trailing.value}
          </dd>
        </div>
      )}
    </dl>
  );
}

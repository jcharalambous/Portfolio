import { ButtonLink } from "@/components/ui/button";
import { NudgeArrow } from "@/components/ui/nudge-arrow";
import { SwapLabel } from "@/components/ui/swap-label";
import type { ContactLink } from "@/content/contact";
import { ChainIcon } from "./chain-icon";
import { CodeRain } from "./code-rain";

type Props = {
  link: ContactLink;
};

/** GitHub or LinkedIn as a pill. The label swaps for a hint on hover, and each does one small thing of its own. */
export function LinkButton({ link }: Props) {
  const rain = link.flourish === "rain";

  return (
    <ButtonLink
      variant="ghost"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative isolate gap-3 overflow-hidden ${rain ? "hover:border-live/45 hover:bg-black/60" : ""}`}
    >
      {rain && <CodeRain />}
      {link.flourish === "chain" && <ChainIcon />}
      <SwapLabel label={link.label} hint={link.hint} />
      <NudgeArrow />
    </ButtonLink>
  );
}

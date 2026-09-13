import { siteConfig } from "@/lib/site";
import { heroContent } from "./hero";

export type ContactLink = {
  label: string;
  /** What the label becomes while the button is hovered. */
  hint: string;
  href: string;
  /** The one small thing the button does on hover. */
  flourish: "rain" | "chain";
};

const href = (label: string) => siteConfig.links.find((link) => link.label === label)!.href;

export const contactContent = {
  /** Two lines. The second is an outline until the email button is hovered. */
  headline: { lead: "Let's build", outline: "something." },
  intro:
    "Open to senior engineering roles, in Hertfordshire or London. If you've read this far, I'd like to hear from you.",
  /** The email button's label once the mail client is opening. */
  openingLabel: "Opening Mail",
  copyLabel: "Copy",
  copiedLabel: "Copied",
  links: [
    { label: "GitHub", hint: "See the code", href: href("GitHub"), flourish: "rain" },
    { label: "LinkedIn", hint: "Let's connect", href: href("LinkedIn"), flourish: "chain" },
  ] satisfies ContactLink[],
  /** Shown in the footer beside the copyright. */
  credit: heroContent.scene.credit,
};

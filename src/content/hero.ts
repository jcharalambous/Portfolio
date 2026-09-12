import { siteConfig } from "@/lib/site";

export const heroContent = {
  kicker: siteConfig.role,
  /** One entry per line, as the particle headline draws it. */
  headlineLines: [
    "I build things",
    "for the web, and",
    "the infrastructure",
    "that keeps them",
    "running.",
  ],
  /** The same sentence as plain text, for screen readers and search engines. */
  headline: "I build things for the web, and the infrastructure that keeps them running.",
  supporting: {
    before: "Currently at ",
    company: "Vending Sense",
    after: ", where the business runs on a platform I proposed, built and maintain.",
  },
  primaryCta: { label: "See the work", href: "#projects" },
  secondaryCta: { label: "More about me", href: "#about" },
  /** Self-hosted from public/spline. See the README there for provenance. */
  scene: {
    src: "/spline/nexbot.splinecode",
    /** A still of the same scene, shown instead of the live one on small screens. */
    poster: "/spline/nexbot-poster.png",
    credit: {
      model: "NEXBOT",
      author: "ahmedkhaledemara0909",
      href: "https://spline.design",
      licence: "CC BY 4.0",
    },
  },
};

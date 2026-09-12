/** Page sections in scroll order. The nav and the page both read this, so they cannot drift. */
export const sections = [
  { id: "top", label: "Intro", meta: "Software engineer, Hertfordshire" },
  { id: "about", label: "About", meta: "How I got here" },
  { id: "work", label: "Work", meta: "VendingSense, 2025 – present" },
  { id: "projects", label: "Projects", meta: "Unity, and what it replaced" },
  { id: "approach", label: "Approach", meta: "Decisions and what they cost" },
  { id: "skills", label: "Skills", meta: "Languages, frameworks, tools" },
  { id: "contact", label: "Contact", meta: "Open to senior roles" },
] as const;

export type Section = (typeof sections)[number];
export type SectionId = Section["id"];

export type Project = {
  /** URL segment, e.g. "my-app" becomes /projects/my-app */
  slug: string;
  title: string;
  /** One or two sentences shown on cards and in metadata. */
  summary: string;
  /** Longer description shown on the project page. */
  description: string;
  highlights: string[];
  tags: string[];
  year: number;
  featured?: boolean;
  links?: { label: string; href: string }[];
};

// Example entries. Replace with your own work.
export const projects: Project[] = [
  {
    slug: "example-project",
    title: "Example project",
    summary: "A short summary of what this project is and why it matters.",
    description:
      "A few sentences about the problem, the approach you took and the outcome. Keep it concrete.",
    highlights: [
      "What you built and the stack you used",
      "A measurable result or something you learned",
    ],
    tags: ["Next.js", "TypeScript"],
    year: 2026,
    featured: true,
    links: [{ label: "Source", href: "https://github.com/jcharalambous" }],
  },
  {
    slug: "another-project",
    title: "Another project",
    summary: "Second example entry so the list and cards have something to show.",
    description: "Replace this with a real project.",
    highlights: ["Delete this entry when you add your own"],
    tags: ["React"],
    year: 2025,
  },
];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(limit = 3): Project[] {
  const featured = getAllProjects().filter((p) => p.featured);
  return (featured.length > 0 ? featured : getAllProjects()).slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

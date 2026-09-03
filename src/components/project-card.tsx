import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative rounded-2xl border border-black/[.08] p-6 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:hover:bg-white/[.04]">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {project.year}
        </span>
      </div>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-black/[.06] px-2.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-white/[.08] dark:text-zinc-300"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

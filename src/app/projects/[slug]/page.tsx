import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { getProject, projects } from "@/lib/projects";

// Only slugs from generateStaticParams exist. Anything else is a real 404 at
// the routing level, so the status code is 404 rather than a streamed 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Container>
      <PageHeader title={project.title} description={project.summary} />
      <div className="max-w-2xl space-y-8 pb-24">
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        {project.highlights.length > 0 && (
          <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-zinc-500 dark:text-zinc-400">Year</dt>
          <dd className="font-mono text-black dark:text-zinc-50">{project.year}</dd>
          <dt className="text-zinc-500 dark:text-zinc-400">Built with</dt>
          <dd className="text-black dark:text-zinc-50">{project.tags.join(", ")}</dd>
        </dl>

        <div className="flex flex-wrap gap-4">
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-black underline underline-offset-4 dark:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        <ButtonLink href="/projects" variant="secondary">
          All projects
        </ButtonLink>
      </div>
    </Container>
  );
}

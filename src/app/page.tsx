import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { ButtonLink } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <Container>
      <section className="py-24 sm:py-32">
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
          {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/projects">View projects</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="pb-24">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Featured projects
          </h2>
          <div className="mt-6 grid gap-4">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

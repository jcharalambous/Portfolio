import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I have built.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container>
      <PageHeader title="Projects" description="Things I have built." />
      <div className="grid gap-4 pb-24">
        {projects.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        )}
      </div>
    </Container>
  );
}

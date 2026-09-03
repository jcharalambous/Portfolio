import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "A little about me and what I work on.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader title="About" description="A little about me and what I work on." />
      <div className="prose-zinc max-w-2xl space-y-4 pb-24 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        <p>Replace this with a short bio: who you are, what you do and what you care about.</p>
        <p>A second paragraph for background, current focus or what you are looking for next.</p>
      </div>
    </Container>
  );
}

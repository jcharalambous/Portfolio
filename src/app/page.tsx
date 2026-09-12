import { sections } from "@/content/sections";

// Placeholder sections so the rail has something to track. Each is replaced as it is designed.
export default function Home() {
  return (
    <main>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen items-center justify-center text-ink-muted"
        >
          {section.label}
        </section>
      ))}
    </main>
  );
}

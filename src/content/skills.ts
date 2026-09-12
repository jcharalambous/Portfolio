export type SkillGroup = {
  title: string;
  items: string[];
};

/* Ordered from the code outwards: languages, the app, its data, where it runs, how it is watched, checked and connected, then how it is designed. */
export const skillsContent = {
  heading: "What I reach for, and where I've used it.",
  groups: [
    { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS", "Bash"] },
    { title: "Backend", items: ["FastAPI", "Django", "Flask", "Express", "SQLAlchemy", "Pydantic"] },
    { title: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
    {
      title: "Data & messaging",
      items: ["PostgreSQL", "MySQL", "SQLite", "Supabase", "Firebase", "Redis", "Redis Pub/Sub", "Redis Streams", "RabbitMQ"],
    },
    {
      title: "Infrastructure",
      items: ["Docker", "Portainer", "Nginx", "Linux", "Networking", "AWS", "CI/CD pipelines", "GitHub Actions"],
    },
    { title: "Observability", items: ["Prometheus", "Grafana", "Loki", "Sentry"] },
    {
      title: "Testing & quality",
      items: ["Pytest", "Jest", "Vitest", "Playwright", "Ruff", "ESLint", "Prettier"],
    },
    { title: "Integration & AI", items: ["HubSpot API", "Google APIs", "OpenAI API", "Claude API", "MCP"] },
    {
      title: "How I build",
      items: ["Domain-driven design", "Hexagonal architecture", "Event-driven systems", "Test-first", "RBAC"],
    },
  ] satisfies SkillGroup[],
};

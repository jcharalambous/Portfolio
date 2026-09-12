export type WorkEntry = {
  role: string;
  org: string;
  from: string;
  to: string;
  /** Still going: the marker is lit and "to" is highlighted. */
  current?: boolean;
  /** Smaller treatment for entries that matter less. */
  minor?: boolean;
  /** Paragraphs. A `lead` is set in bold at the start of the paragraph. */
  body: { lead?: string; text: string }[];
  tags?: string[];
};

export const workContent = {
  heading: "Where I've ended up, and how.",
  entries: [
    {
      role: "Software Engineer",
      org: "Vending Sense",
      from: "Feb 2025",
      to: "Present",
      current: true,
      body: [
        {
          lead: "Started and led the engineering function.",
          text: " Built the company's internal SaaS platforms, including Unity, its core system.",
        },
        {
          text: "Inherited a stack of business-critical automations built on Make, a low-code tool, failing around two runs in five. Rebuilt them as Python services on FastAPI, containerised with Docker and Portainer, with Prometheus and Grafana for observability. Failures went from routine to rare — and visible when they happen.",
        },
        {
          text: "Brought the company onto sane security foundations: centralised password management, security training, IT infrastructure ownership. Drove AI adoption from essentially zero to daily use across the business.",
        },
      ],
      tags: ["Python", "FastAPI", "Next.js", "Docker", "Portainer", "Prometheus", "Grafana", "HubSpot"],
    },
    {
      role: "Network Architect & Engineer",
      org: "Self-employed",
      from: "Jul 2024",
      to: "Dec 2024",
      body: [
        {
          text: "Contract infrastructure work across national petrol forecourt sites. Site surveys, fibre installation planning, data cabinet and switch configuration.",
        },
      ],
    },
    {
      role: "BSc (Hons) Computer Science",
      org: "Nottingham Trent University · First-Class Honours",
      from: "2021",
      to: "2024",
      minor: true,
      body: [
        {
          text: "Ran coding sessions for fellow students across second and third year as a peer mentor.",
        },
      ],
    },
    {
      role: "IT & Network Engineer",
      org: "Infinite Projects",
      from: "Sep 2017",
      to: "Sep 2019",
      minor: true,
      body: [
        {
          text: "Managed client networks end to end — monitoring, maintenance, on-site and remote support.",
        },
      ],
    },
  ] satisfies WorkEntry[],
};

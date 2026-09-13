export type Lesson = {
  /** Where in the story this happened. Shown small on the card, above the title. */
  setting: string;
  title: string;
  /** One line on the card. */
  teaser: string;
  /** Paragraphs in the window. */
  story: string[];
  /** The takeaway, set apart at the end of the window. */
  lesson: string;
};

/* Lessons about the craft, not about any one system. In the order they were learned; each starts with something breaking, and names the pattern last. */
export const journeyContent = {
  heading: "I hit the wall, go and find out, and come back.",
  intro:
    "Six lessons from building software, in the order I learned them. Each one starts with something breaking.",
  readLabel: "Read the story",
  previousLabel: "Previous lesson",
  nextLabel: "Next lesson",
  closeLabel: "Close",
  lessonLabel: "The lesson",
  lessons: [
    {
      setting: "Resilience",
      title: "Nobody designs for failure",
      teaser: "The first system I inherited failed two runs in five. Not through bad luck.",
      story: [
        "The first thing I inherited in my career was a set of business-critical automations that failed roughly two runs in five. Everyone had got used to it. When I read the code, the failures weren't random at all: there was no resilience anywhere. No retries, no validation at the boundary, no tolerance for a record that wasn't quite the shape expected.",
        "And most of those records were real. People type what they type. A form filled in by a busy sales team will never match the schema in your head, and a system that falls over each time is a system that blames its users.",
        "So I learned to design for failure first. Clean the data at the edge before it touches anything. Retry with backoff and jitter. Put circuit breakers around the things that go away and come back. Make failures rare, and loud when they do happen.",
      ],
      lesson: "Build for the people who actually exist, not the ones you'd like.",
    },
    {
      setting: "Frameworks",
      title: "I hated its opinions",
      teaser:
        "Three frameworks in one backend. Every move was forced by something specific breaking.",
      story: [
        "I've rewritten the same backend twice. The first framework was too primitive for what the system was becoming. The second was opinionated, and I resented it: the ORM, the serializers, the way it wanted everything done. Then I realised most of its opinions were right, and most of mine were wrong. Clean architecture, disciplined naming, one obvious way to do things: I learned those from a framework I disliked, and they've come with me everywhere since.",
        "The second move was forced too. Many people reading and writing the same data at once, and an async story that was bolted on. By the time I'd swapped out the ORM and the serializers, I'd thrown away the batteries I came for, so the honest choice was a framework built async and API-first from the start.",
        "Neither move was about the new thing being shiny. Each one had a specific trigger I could name, and I still can.",
      ],
      lesson: "Move when something breaks, not when something's new.",
    },
    {
      setting: "Simplicity",
      title: "Code I couldn't read",
      teaser: "I built my first big system to be impressive. Months later I couldn't work out why.",
      story: [
        "Everyone starting out wants to write the kind of code they imagine the big companies write, and assumes that means complex. I fell into it. Abstractions I didn't need yet, indirection for flexibility nobody had asked for, layers I'd have struggled to justify if anyone had asked. It felt like writing senior code.",
        "The cost arrived months later, when I came back to it. I couldn't read it. I genuinely couldn't reconstruct why I'd made some of those decisions, because the reasons had never really existed. There were paths in there doing nothing at all, and I'd defended them without knowing it.",
        "Over-engineering a hard problem is at least legible when you return to it; the difficulty is right there, explaining itself. Over-engineering an easy one leaves something you can't decode and can't safely delete. I write test-first now, largely for that reason: design the use case, write the failing test, write the minimum that passes it. Every line not written is a line that never needs testing, maintaining or defending.",
      ],
      lesson: "Complexity only earns its place when the problem is complex.",
    },
    {
      setting: "Architecture",
      title: "Learn it when it hurts",
      teaser:
        "I'd read about clean architecture for years. It only stuck once something of mine started to buckle.",
      story: [
        "I'd read the books. Domain-driven design, ports and adapters, events between modules. None of it stuck, because none of it was solving a problem I actually had.",
        "Then a system I'd built grew fast, and I could see it was going to collapse under its own weight. The same books read completely differently. I separated the domain from the plumbing and put adapters between them. Modules raised events instead of calling each other. Access control became two layers, permissions bound to endpoints and grouped into roles, so an access change is a permission edit and not a code change.",
        "The proof came later. When a whole new kind of client arrived, an AI layer that needed the same domain, it was just another adapter onto the same core. Nothing had to move.",
      ],
      lesson: "Architecture learned under pressure is the kind that stays.",
    },
    {
      setting: "Infrastructure",
      title: "Seven months",
      teaser: "Self-hosting over the cloud, decided with a calculator rather than a preference.",
      story: [
        "Several services, several front ends, three environments each. Before deciding where any of it would run, I sat down with the cloud provider's calculator and ran the numbers properly.",
        "A one-off server running Docker and Portainer cost less than seven months of the projected compute. No Kubernetes, because there were no clusters to orchestrate, and adopting it to look current is worth less than not needing it.",
        "What it costs is honest too. Uptime is now mine rather than theirs. At that scale the availability requirement didn't justify the premium, and I took on the operational responsibility knowingly. That's a trade, not a free win, and being able to say so is the point.",
      ],
      lesson: "A trade you take knowingly beats a win you can't explain.",
    },
    {
      setting: "Observability",
      title: "One incident, three artefacts",
      teaser: "Every metric on my dashboards exists because something broke.",
      story: [
        "Monitoring went in later than it should have, and deliberately not everywhere. Every metric on the board exists because an incident demanded it.",
        "A failure in production means three things are missing, not one: a metric, an alert, and a test. Each incident produces all three, and then that class of failure is closed for good.",
        "The dashboard reflects real failure modes rather than imagined ones, but it's reactive by design. It can't warn me about something that hasn't happened yet. I know that, and I'd still rather have ten honest metrics than a hundred speculative ones.",
      ],
      lesson: "Ten honest metrics beat a hundred speculative ones.",
    },
  ] satisfies Lesson[],
};

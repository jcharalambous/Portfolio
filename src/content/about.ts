export type TerminalLine =
  | { kind: "command"; text: string }
  | { kind: "output"; text: string; bright?: boolean };

export type Fact = {
  label: string;
  value: string;
  detail?: string;
  /** Shown with a live indicator. */
  live?: boolean;
};

export const aboutContent = {
  heading: "Who's behind it.",
  terminal: {
    title: "john — zsh",
    script: [
      { kind: "command", text: "whoami" },
      { kind: "output", text: "john charalambous", bright: true },
      { kind: "command", text: "cat about.md" },
      {
        kind: "output",
        text: "I've been taking things apart since I was a kid, mostly to find out whether I could put them back together. At thirteen I wrote a magic 8-ball program, and it was the first time something clicked — I wasn't especially good at school, but I could clearly do this. That turned into a first-class computer science degree and, later, a department I started and led at my current company, with no senior above me to learn from. Everything I know, I went and found.\n\nThese days the work I like most is the kind that makes me question my own judgement. Architecture, mostly — decisions that seem fine for eighteen months and then quietly collapse under their own weight. I'd rather find the flaw in my own design than have someone else find it in production.",
      },
      { kind: "command", text: "cat next.md" },
      {
        kind: "output",
        text: "What I want next is a team where I can keep growing toward staff level while helping the people coming up behind me. I didn't have a mentor. I've since learned I understand things best when I'm explaining them to someone else, and I'd like to be the person I didn't have.",
      },
      { kind: "command", text: "cat elsewhere.md" },
      {
        kind: "output",
        text: "I travel as much as I can. I like seeing how differently people solve the same problems, and how fast the world is moving in fields I'll never work in.",
      },
    ] satisfies TerminalLine[],
  },
  facts: [
    { label: "Status", value: "Open to senior roles", live: true },
    { label: "Based", value: "Hertfordshire, UK", detail: "London commuter belt" },
    { label: "Currently", value: "Software Engineer, Vending Sense", detail: "Feb 2025 – present" },
    {
      label: "Education",
      value: "BSc (Hons) Computer Science",
      detail: "First-Class Honours · Nottingham Trent",
    },
    { label: "Stack", value: "Python · FastAPI · Next.js · Docker · Postgres" },
  ] satisfies Fact[],
  localTimeLabel: "Local time",
};

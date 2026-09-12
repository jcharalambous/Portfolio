import { sectionComponents } from "@/components/sections";
import { sections } from "@/content/sections";

export default function Home() {
  return (
    <main>
      {sections.map(({ id }) => {
        const Section = sectionComponents[id];
        return <Section key={id} />;
      })}
    </main>
  );
}

import type { SkillGroup as Group } from "@/content/skills";

type Props = {
  group: Group;
};

/** One titled list of skills. */
export function SkillGroup({ group }: Props) {
  return (
    <div>
      <h3 className="mb-3.5 border-b border-white/10 pb-3 font-mono text-xs font-medium tracking-[0.08em] text-ink-muted uppercase">
        {group.title}
      </h3>
      <ul className="flex flex-col gap-[9px]">
        {group.items.map((item) => (
          <li
            key={item}
            className="relative pl-4 text-[17px] tracking-[-0.01em] text-ink before:absolute before:top-[0.62em] before:left-0 before:size-[5px] before:rounded-full before:bg-white/[0.28] before:transition-[background-color,box-shadow] before:duration-300 before:content-[''] hover:before:bg-link hover:before:shadow-[0_0_8px] hover:before:shadow-link"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

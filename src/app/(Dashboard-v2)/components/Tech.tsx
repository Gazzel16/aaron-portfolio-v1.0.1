"use client";

interface TechProps {
  tech: {
    title?: string;
    stacks?: string[];
    isFeatured?: boolean;
  };
}

export default function Tech({ tech }: TechProps) {
  const { title, stacks } = tech;

  return (
    <div className="bg-white">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {stacks?.map((stack, index) => (
          <span
            key={index}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1 font-mono text-sm text-zinc-700"
          >
            {stack}
          </span>
        ))}
      </div>
    </div>
  );
}

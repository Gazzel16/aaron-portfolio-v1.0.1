"use client"

interface TechProps {
  tech: {
    title?: string;
    stacks?: string[];
  };
}

export default function Tech({ tech }: TechProps) {
  const { title, stacks } = tech;

  return (
    <div className="p-5 bg-white border border-zinc-300 rounded-2xl shadow-sm hover:shadow-md transition-all">
      {/* Category Title */}
      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
        {title}
      </h3>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2">
        {stacks?.map((stack, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-500 text-xs font-semibold rounded-full border border-blue-100"
          >
            {stack}
          </span>
        ))}
      </div>
    </div>
  )
}
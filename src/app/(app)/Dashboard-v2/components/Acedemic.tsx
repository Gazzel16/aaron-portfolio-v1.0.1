"use client";

interface AcademicProps {
  acedmic: {
    title?: string;
    school?: string;
    course?: string;
    isFeatured?: boolean;
  };
}

export default function Academic({ acedmic }: AcademicProps) {
  const { title, school, course } = acedmic;

  return (
    <div className="flex flex-col gap-1 border-b border-zinc-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <h3 className="font-mono text-xs lowercase text-zinc-400">{title}</h3>

      {course && (
        <p className="text-sm font-medium leading-snug text-zinc-800">
          {course}
        </p>
      )}

      <p className="font-mono text-sm text-zinc-500">{school}</p>
    </div>
  );
}

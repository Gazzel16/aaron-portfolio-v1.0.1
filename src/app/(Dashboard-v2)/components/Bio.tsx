"use client";

interface BioProps {
  paragraphs: string[];
}

export default function Bio({ paragraphs }: BioProps) {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-sm leading-relaxed text-zinc-600"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

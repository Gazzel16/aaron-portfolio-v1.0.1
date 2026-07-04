"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface WorkProps {
  work: {
    title?: string;
    company?: string;
    date?: string;
    details?: string[];
    links?: { label: string; href: string }[];
    isFeatured?: boolean;
  };
}

export default function Work({ work }: WorkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, company, date, details, links } = work;
  const hasExpandableContent =
    (details && details.length > 0) || (links && links.length > 0);

  return (
    <div
      onClick={hasExpandableContent ? () => setIsOpen(!isOpen) : undefined}
      className={`flex flex-col gap-1 border-b border-zinc-100 py-4 first:pt-0 last:border-b-0 last:pb-0 ${
        hasExpandableContent ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="font-mono text-xs lowercase text-zinc-400">{title}</h3>

          {company && (
            <p className="text-sm font-medium leading-snug text-zinc-800">
              {company}
            </p>
          )}

          {date && <p className="font-mono text-sm text-zinc-500">{date}</p>}
        </div>

        {hasExpandableContent && (
          <ChevronRight
            className={`mt-1 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        )}
      </div>

      {isOpen && details && details.length > 0 && (
        <ul className="mt-3 space-y-2 border-t border-zinc-100 pt-3">
          {details.map((detail, index) => (
            <li
              key={index}
              className="text-sm leading-relaxed text-zinc-600"
            >
              {detail}
            </li>
          ))}
        </ul>
      )}

      {isOpen && links && links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3 border-t border-zinc-100 pt-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-xs uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

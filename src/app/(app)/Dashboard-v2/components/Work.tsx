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
  variant?: "default" | "dark";
}

export default function Work({ work, variant = "default" }: WorkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, company, date, details, links } = work;
  const hasExpandableContent =
    (details && details.length > 0) || (links && links.length > 0);

  const isDark = variant === "dark";
  const dividerClass = isDark ? "border-white/10" : "border-zinc-200/50";
  const companyClass = isDark
    ? "text-sm font-medium leading-snug text-zinc-100"
    : "text-sm font-medium leading-snug text-zinc-800";
  const dateClass = isDark
    ? "font-mono text-sm text-zinc-400"
    : "font-mono text-sm text-zinc-500";
  const detailClass = isDark
    ? "text-sm leading-relaxed text-zinc-300"
    : "text-sm leading-relaxed text-zinc-600";
  const linkClass = isDark
    ? "font-mono text-xs uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-200"
    : "font-mono text-xs uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600";

  return (
    <div
      onClick={hasExpandableContent ? () => setIsOpen(!isOpen) : undefined}
      className={`flex flex-col gap-1 border-b ${dividerClass} py-4 first:pt-0 last:border-b-0 last:pb-0 ${
        hasExpandableContent ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="font-mono text-xs lowercase text-zinc-400">{title}</h3>

          {company && <p className={companyClass}>{company}</p>}

          {date && <p className={dateClass}>{date}</p>}
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
        <ul className={`mt-3 space-y-2 border-t ${dividerClass} pt-3`}>
          {details.map((detail, index) => (
            <li key={index} className={detailClass}>
              {detail}
            </li>
          ))}
        </ul>
      )}

      {isOpen && links && links.length > 0 && (
        <div className={`mt-3 flex flex-wrap gap-3 border-t ${dividerClass} pt-3`}>
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={linkClass}
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

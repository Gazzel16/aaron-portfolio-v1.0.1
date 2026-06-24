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
  };
}

export default function Work({ work }: WorkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, company, date, details, links } = work;

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div
      onClick={handleToggle}
      className="cursor-pointer group relative flex flex-col gap-1 p-4 rounded-xl hover:bg-zinc-50 transition-all duration-300"
    >
      <div className="flex items-center">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
            {title}
          </h3>

          {company && (
            <p className="text-base font-medium text-blue-600 leading-tight">
              {company}
            </p>
          )}

          <p className="text-sm text-zinc-500 font-normal">{date}</p>
        </div>

        <div className="ml-auto text-sm text-blue-500 hover:underline">
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {/* 5. Conditionally render details based on state */}
      {isOpen && details && details.length > 0 && (
        <ul className="mt-4 list-disc list-inside space-y-2 border-l-2 border-zinc-100 pl-2 animate-in fade-in slide-in-from-top-1">
          {details.map((detail, index) => (
            <li key={index} className="text-sm text-zinc-600">
              {detail}
            </li>
          ))}
        </ul>
      )}
      {isOpen && links && links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // prevents toggling the card when clicking the link
              className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="absolute left-[-17px] top-6 h-2 w-2 rounded-full bg-zinc-300 group-hover:bg-blue-500 transition-colors" />
    </div>
  );
}

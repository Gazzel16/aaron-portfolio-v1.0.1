"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type WorkItem = {
  title: string;
  company: string;
  date: string;
  details?: string[];
  links?: { label: string; href: string }[];
};

type ExperienceAccordionProps = {
  items: WorkItem[];
};

export default function ExperienceAccordion({
  items,
}: ExperienceAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#1c2430]/10 border-y border-[#1c2430]/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const details = (item.details ?? []).filter((d) => d.trim().length > 0);

        return (
          <div key={`${item.title}-${item.company}-${item.date}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-4 py-4 text-left"
            >
              <div className="min-w-0 space-y-1">
                <span className="block font-[family-name:var(--font-book-sans)] text-sm font-semibold tracking-[-0.01em] text-[#1c2430] sm:text-base">
                  {item.title}
                </span>
                <span className="block font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.12em] text-[#5c6b5e]">
                  {item.company}
                </span>
                <span className="block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#8a9488]">
                  {item.date}
                </span>
              </div>

              <span
                aria-hidden
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-[#1c2430]/20 text-[#1c2430] transition-transform duration-300 ${
                  isOpen
                    ? "rotate-45 bg-[#1c2430] text-[#f4f5f2]"
                    : "bg-transparent"
                }`}
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 pb-5">
                  {details.length > 0 && (
                    <ul className="space-y-3">
                      {details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex gap-3 font-[family-name:var(--font-book-sans)] text-sm leading-relaxed text-[#4a554c]"
                        >
                          <span
                            aria-hidden
                            className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[#2d4a3e]"
                          />
                          <span>{detail.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.links && item.links.length > 0 && (
                    <div className="flex flex-wrap gap-x-5 gap-y-2 pl-4">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

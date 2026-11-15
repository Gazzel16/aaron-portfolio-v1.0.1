"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type ServiceItem = {
  Title: string;
  description: string;
};

type ServicesAccordionProps = {
  items: ServiceItem[];
};

export default function ServicesAccordion({ items }: ServicesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#1c2430]/10 border-y border-[#1c2430]/10">
      {items.map((service, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={service.Title}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[#2d4a3e]"
            >
              <span className="font-[family-name:var(--font-book-sans)] text-sm font-semibold tracking-[-0.01em] text-[#1c2430] sm:text-base">
                {service.Title}
              </span>
              <span
                aria-hidden
                className={`flex h-7 w-7 shrink-0 items-center justify-center border border-[#1c2430]/20 text-[#1c2430] transition-transform duration-300 ${
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
                <p className="pb-5 font-[family-name:var(--font-book-sans)] text-sm leading-relaxed text-[#4a554c]">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

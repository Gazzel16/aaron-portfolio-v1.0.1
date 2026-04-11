"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface WorkProps {
  work: {
    title?: string;
    company?: string;
    date?: string;
    details?: string[];
  };
}

export default function Work({ work }: WorkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, company, date, details } = work;

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

      <div className="absolute left-[-17px] top-6 h-2 w-2 rounded-full bg-zinc-300 group-hover:bg-blue-500 transition-colors" />
    </div>
  );
}

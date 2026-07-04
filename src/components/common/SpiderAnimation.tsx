"use client";

import { cn } from "@/lib/utils";

interface SpiderAnimationProps {
  className?: string;
}

function MiniSpider() {
  return (
    <svg
      viewBox="0 0 56 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-8 shrink-0 overflow-visible"
    >
      <g className="profile-spider-legs-a">
        <path
          d="M22 15 L10 22 M20 17 L8 28 M34 17 L46 28 M36 15 L48 22"
          stroke="#71717a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g className="profile-spider-legs-b">
        <path
          d="M24 16 L16 26 M22 18 L12 28 M32 18 L44 28 M34 16 L42 26"
          stroke="#a1a1aa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <ellipse cx="28" cy="19" rx="7" ry="5" fill="#52525b" opacity="0.85" />
      <ellipse cx="28" cy="14" rx="5" ry="4" fill="#71717a" />
      <circle cx="26" cy="13" r="0.9" fill="#d4d4d8" />
      <circle cx="30" cy="13" r="0.9" fill="#d4d4d8" />
      <circle cx="26.2" cy="13" r="0.35" fill="#3f3f46" />
      <circle cx="30.2" cy="13" r="0.35" fill="#3f3f46" />
    </svg>
  );
}

const SPIDER_UNITS = [1, 2, 3] as const;

export default function SpiderAnimation({ className }: SpiderAnimationProps) {
  return (
    <div
      className={cn(
        "relative h-9 w-[7.75rem] select-none overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-zinc-200" />

      {SPIDER_UNITS.map((unit) => (
        <div
          key={unit}
          className={`profile-spider-wave-unit-${unit} absolute bottom-0`}
        >
          <MiniSpider />
        </div>
      ))}
    </div>
  );
}

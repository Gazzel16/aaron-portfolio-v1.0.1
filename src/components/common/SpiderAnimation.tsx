"use client";

import { cn } from "@/lib/utils";

interface SpiderAnimationProps {
  className?: string;
}

type SpiderVariant = "gray" | "black-red" | "brown-black";

const SPIDER_COLORS: Record<
  SpiderVariant,
  {
    legsA: string;
    legsB: string;
    body: string;
    head: string;
    eye: string;
    pupil: string;
  }
> = {
  gray: {
    legsA: "#71717a",
    legsB: "#a1a1aa",
    body: "#52525b",
    head: "#71717a",
    eye: "#d4d4d8",
    pupil: "#3f3f46",
  },
  "black-red": {
    legsA: "#18181b",
    legsB: "#dc2626",
    body: "#09090b",
    head: "#dc2626",
    eye: "#fecaca",
    pupil: "#18181b",
  },
  "brown-black": {
    legsA: "#78350f",
    legsB: "#18181b",
    body: "#92400e",
    head: "#18181b",
    eye: "#d6d3d1",
    pupil: "#1c1917",
  },
};

const SPIDER_UNITS = [1, 2, 3] as const;

const SPIDER_VARIANTS: Record<(typeof SPIDER_UNITS)[number], SpiderVariant> = {
  1: "gray",
  2: "black-red",
  3: "brown-black",
};

function MiniSpider({ variant }: { variant: SpiderVariant }) {
  const colors = SPIDER_COLORS[variant];

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
          stroke={colors.legsA}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g className="profile-spider-legs-b">
        <path
          d="M24 16 L16 26 M22 18 L12 28 M32 18 L44 28 M34 16 L42 26"
          stroke={colors.legsB}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <ellipse
        cx="28"
        cy="19"
        rx="7"
        ry="5"
        fill={colors.body}
        opacity="0.85"
      />
      <ellipse cx="28" cy="14" rx="5" ry="4" fill={colors.head} />
      <circle cx="26" cy="13" r="0.9" fill={colors.eye} />
      <circle cx="30" cy="13" r="0.9" fill={colors.eye} />
      <circle cx="26.2" cy="13" r="0.35" fill={colors.pupil} />
      <circle cx="30.2" cy="13" r="0.35" fill={colors.pupil} />
    </svg>
  );
}

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
          <MiniSpider variant={SPIDER_VARIANTS[unit]} />
        </div>
      ))}
    </div>
  );
}

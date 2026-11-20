"use client";

import type { CSSProperties, ReactNode } from "react";

export type GoruFormId =
  | "goru"
  | "cat"
  | "dog"
  | "robot"
  | "rocket"
  | "spider"
  | "coffee";

type GoruFormAvatarProps = {
  form: GoruFormId;
  building?: boolean;
  className?: string;
};

function Part({
  step,
  building,
  children,
}: {
  step: number;
  building?: boolean;
  children: ReactNode;
}) {
  return (
    <g
      className={building ? "goru-build-part" : undefined}
      style={
        building
          ? ({ ["--goru-part"]: step } as CSSProperties)
          : undefined
      }
    >
      {children}
    </g>
  );
}

export default function GoruFormAvatar({
  form,
  building = false,
  className = "",
}: GoruFormAvatarProps) {
  if (form === "goru") {
    return (
      <img
        src="/logo2.svg"
        alt=""
        className={`pointer-events-none h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(28,36,48,0.32)] ${building ? "goru-build-logo" : ""} ${className}`}
        draggable={false}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 96 96"
      className={`pointer-events-none h-full w-full drop-shadow-[0_10px_22px_rgba(28,36,48,0.32)] ${building ? "goru-build-svg" : ""} ${className}`}
      aria-hidden
      key={`${form}-${building ? "build" : "idle"}`}
    >
      {form === "cat" && (
        <g fill="none">
          <Part step={1} building={building}>
            <ellipse cx="48" cy="58" rx="22" ry="16" fill="#71717a" />
          </Part>
          <Part step={2} building={building}>
            <circle cx="48" cy="40" r="16" fill="#71717a" />
          </Part>
          <Part step={3} building={building}>
            <path d="M34 30l-6-14 12 8z" fill="#71717a" />
            <path d="M62 30l6-14-12 8z" fill="#71717a" />
          </Part>
          <Part step={4} building={building}>
            <circle cx="42" cy="38" r="3" fill="#fafaf7" />
            <circle cx="54" cy="38" r="3" fill="#fafaf7" />
            <circle cx="43" cy="38" r="1.2" fill="#1c2430" />
            <circle cx="55" cy="38" r="1.2" fill="#1c2430" />
          </Part>
          <Part step={5} building={building}>
            <path
              d="M48 44c-2 3-6 5-10 4M48 44c2 3 6 5 10 4"
              stroke="#a1a1aa"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Part>
          <Part step={6} building={building}>
            <path
              d="M70 50c10-2 14 10 6 14"
              stroke="#a1a1aa"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </Part>
        </g>
      )}

      {form === "dog" && (
        <g fill="none">
          <Part step={1} building={building}>
            <rect x="42" y="72" width="5" height="10" rx="2" fill="#3f3f46" />
            <rect x="54" y="72" width="5" height="10" rx="2" fill="#3f3f46" />
          </Part>
          <Part step={2} building={building}>
            <ellipse cx="48" cy="60" rx="24" ry="15" fill="#52525b" />
          </Part>
          <Part step={3} building={building}>
            <circle cx="56" cy="42" r="15" fill="#52525b" />
          </Part>
          <Part step={4} building={building}>
            <path d="M68 36l12-6 2 8-10 4z" fill="#71717a" />
            <ellipse cx="36" cy="54" rx="6" ry="4" fill="#71717a" />
          </Part>
          <Part step={5} building={building}>
            <circle cx="62" cy="40" r="3" fill="#fafaf7" />
            <circle cx="63" cy="40" r="1.2" fill="#1c2430" />
          </Part>
          <Part step={6} building={building}>
            <path
              d="M28 48c-10-6-14 6-6 12"
              stroke="#71717a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </Part>
        </g>
      )}

      {form === "robot" && (
        <g fill="none">
          <Part step={1} building={building}>
            <rect x="30" y="74" width="10" height="10" rx="2" fill="#3f3f46" />
            <rect x="56" y="74" width="10" height="10" rx="2" fill="#3f3f46" />
          </Part>
          <Part step={2} building={building}>
            <rect x="28" y="40" width="40" height="34" rx="4" fill="#52525b" />
          </Part>
          <Part step={3} building={building}>
            <rect x="34" y="48" width="28" height="18" rx="2" fill="#71717a" />
          </Part>
          <Part step={4} building={building}>
            <rect x="38" y="30" width="20" height="12" rx="2" fill="#52525b" />
            <line
              x1="48"
              y1="30"
              x2="48"
              y2="20"
              stroke="#71717a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Part>
          <Part step={5} building={building}>
            <circle cx="42" cy="57" r="3.5" fill="#93c5fd" />
            <circle cx="54" cy="57" r="3.5" fill="#93c5fd" />
          </Part>
          <Part step={6} building={building}>
            <circle cx="48" cy="18" r="3.5" fill="#93c5fd" />
          </Part>
        </g>
      )}

      {form === "rocket" && (
        <g fill="none">
          <Part step={1} building={building}>
            <path
              d="M40 78c2 8 8 12 8 12s6-4 8-12"
              fill="#f59e0b"
              opacity="0.9"
            />
          </Part>
          <Part step={2} building={building}>
            <path d="M32 66l-8 12h48l-8-12H32z" fill="#52525b" />
          </Part>
          <Part step={3} building={building}>
            <path d="M48 14l16 52H32L48 14z" fill="#71717a" />
          </Part>
          <Part step={4} building={building}>
            <path d="M48 14l-10 26 10 5 10-5-10-26z" fill="#93c5fd" />
          </Part>
          <Part step={5} building={building}>
            <circle cx="48" cy="40" r="5" fill="#fafaf7" opacity="0.85" />
          </Part>
          <Part step={6} building={building}>
            <circle cx="48" cy="40" r="2" fill="#93c5fd" />
          </Part>
        </g>
      )}

      {form === "spider" && (
        <g fill="none" strokeLinecap="round">
          <Part step={1} building={building}>
            <ellipse cx="48" cy="52" rx="14" ry="12" fill="#52525b" />
          </Part>
          <Part step={2} building={building}>
            <circle cx="48" cy="40" r="9" fill="#71717a" />
          </Part>
          <Part step={3} building={building}>
            <path d="M20 40c10 4 18 8 28 8" stroke="#71717a" strokeWidth="3" />
            <path d="M76 40c-10 4-18 8-28 8" stroke="#71717a" strokeWidth="3" />
          </Part>
          <Part step={4} building={building}>
            <path d="M20 56c10-2 18 0 28 4" stroke="#a1a1aa" strokeWidth="3" />
            <path d="M76 56c-10-2-18 0-28 4" stroke="#a1a1aa" strokeWidth="3" />
          </Part>
          <Part step={5} building={building}>
            <path d="M24 28c8 10 16 16 24 20" stroke="#71717a" strokeWidth="3" />
            <path d="M72 28c-8 10-16 16-24 20" stroke="#71717a" strokeWidth="3" />
          </Part>
          <Part step={6} building={building}>
            <circle cx="44" cy="38" r="2" fill="#fafaf7" />
            <circle cx="52" cy="38" r="2" fill="#fafaf7" />
            <circle cx="44.5" cy="38" r="0.8" fill="#1c2430" />
            <circle cx="52.5" cy="38" r="0.8" fill="#1c2430" />
          </Part>
        </g>
      )}

      {form === "coffee" && (
        <g fill="none" stroke="#1c2430" strokeWidth="2.5" strokeLinecap="round">
          <Part step={1} building={building}>
            <line x1="48" y1="58" x2="38" y2="74" />
            <line x1="48" y1="58" x2="58" y2="74" />
          </Part>
          <Part step={2} building={building}>
            <line x1="48" y1="36" x2="48" y2="58" />
          </Part>
          <Part step={3} building={building}>
            <line x1="48" y1="42" x2="34" y2="50" />
            <line x1="48" y1="42" x2="62" y2="50" />
          </Part>
          <Part step={4} building={building}>
            <circle cx="48" cy="28" r="8" />
          </Part>
          <Part step={5} building={building}>
            <path
              d="M64 34h10c4 0 6 3 6 6s-2 6-6 6H64z"
              fill="#f4f5f2"
              stroke="#1c2430"
            />
          </Part>
          <Part step={6} building={building}>
            <path
              d="M68 28c2-4 2-8 0-10M74 28c2-4 2-8 0-10"
              stroke="#8a9488"
            />
          </Part>
        </g>
      )}
    </svg>
  );
}

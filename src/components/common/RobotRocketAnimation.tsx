"use client";

interface RobotRocketAnimationProps {
  compact?: boolean;
}

export default function RobotRocketAnimation({
  compact = false,
}: RobotRocketAnimationProps) {
  return (
    <div
      className={`relative select-none overflow-hidden ${
        compact ? "h-28 w-40" : "h-40 w-48 lg:w-56"
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 224 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* planets */}
        <g className="profile-tech-planet profile-tech-planet-1">
          <circle cx="44" cy="34" r="10" fill="#71717a" />
          <ellipse cx="44" cy="34" rx="14" ry="4" fill="none" stroke="#a1a1aa" strokeWidth="1.5" opacity="0.6" />
        </g>
        <g className="profile-tech-planet profile-tech-planet-2">
          <circle cx="188" cy="42" r="8" fill="#93c5fd" />
          <circle cx="185" cy="40" r="2" fill="#fafafa" opacity="0.5" />
        </g>
        <g className="profile-tech-planet profile-tech-planet-3">
          <circle cx="112" cy="22" r="6" fill="#52525b" />
          <circle cx="110" cy="20" r="1.5" fill="#d4d4d8" opacity="0.7" />
        </g>

        <line
          x1="16"
          y1="132"
          x2="208"
          y2="132"
          stroke="#e4e4e7"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* robot */}
        <g className="profile-tech-robot">
          <rect x="36" y="96" width="40" height="36" rx="4" fill="#52525b" />
          <rect x="42" y="104" width="28" height="20" rx="2" fill="#71717a" />
          <circle cx="50" cy="114" r="3" fill="#93c5fd" className="profile-tech-eye" />
          <circle cx="62" cy="114" r="3" fill="#93c5fd" className="profile-tech-eye" />
          <rect x="48" y="88" width="16" height="10" rx="2" fill="#52525b" />
          <line
            x1="56"
            y1="88"
            x2="56"
            y2="78"
            stroke="#71717a"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="56" cy="76" r="3" fill="#93c5fd" className="profile-tech-antenna" />
          <rect x="40" y="132" width="8" height="10" rx="2" fill="#3f3f46" />
          <rect x="64" y="132" width="8" height="10" rx="2" fill="#3f3f46" />
          <g className="profile-tech-arm">
            <rect x="76" y="108" width="14" height="6" rx="2" fill="#71717a" />
            <circle cx="92" cy="111" r="5" fill="#52525b" />
          </g>
        </g>

        {/* rocket smoke */}
        <g className="profile-tech-smoke">
          <circle cx="158" cy="128" r="6" fill="#d4d4d8" opacity="0.5" />
          <circle cx="168" cy="130" r="4" fill="#d4d4d8" opacity="0.35" />
          <circle cx="148" cy="130" r="4" fill="#d4d4d8" opacity="0.35" />
        </g>

        {/* rocket */}
        <g className="profile-tech-rocket">
          <path
            d="M160 72l12 44h-24l12-44z"
            fill="#71717a"
          />
          <path
            d="M160 72l-8 20 8 4 8-4-8-20z"
            fill="#93c5fd"
          />
          <path d="M148 112l-6 8h28l-6-8H148z" fill="#52525b" />
          <path d="M152 116h16v4h-16v-4z" fill="#3f3f46" />
          <circle cx="160" cy="92" r="4" fill="#fafafa" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

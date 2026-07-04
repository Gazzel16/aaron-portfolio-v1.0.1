"use client";

interface CatAndDogAnimationProps {
  compact?: boolean;
}

export default function CatAndDogAnimation({
  compact = false,
}: CatAndDogAnimationProps) {
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
        {/* clouds */}
        <g className="profile-play-cloud profile-play-cloud-1">
          <ellipse cx="48" cy="36" rx="22" ry="10" fill="#f4f4f5" />
          <ellipse cx="62" cy="32" rx="16" ry="9" fill="#fafafa" />
          <ellipse cx="34" cy="32" rx="14" ry="8" fill="#e4e4e7" />
        </g>
        <g className="profile-play-cloud profile-play-cloud-2">
          <ellipse cx="168" cy="28" rx="20" ry="9" fill="#f4f4f5" />
          <ellipse cx="182" cy="24" rx="14" ry="8" fill="#fafafa" />
          <ellipse cx="154" cy="26" rx="12" ry="7" fill="#e4e4e7" />
        </g>
        <g className="profile-play-cloud profile-play-cloud-3">
          <ellipse cx="112" cy="48" rx="18" ry="8" fill="#f4f4f5" opacity="0.85" />
          <ellipse cx="124" cy="45" rx="12" ry="7" fill="#fafafa" opacity="0.9" />
        </g>

        {/* ground line */}
        <line
          x1="16"
          y1="132"
          x2="208"
          y2="132"
          stroke="#e4e4e7"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* yarn ball */}
        <g className="profile-play-ball origin-center">
          <circle cx="112" cy="118" r="10" fill="#93c5fd" />
          <path
            d="M106 114c2 2 6 2 8 0M108 120c3-1 5-1 8 1"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* dog */}
        <g className="profile-play-dog">
          <ellipse cx="52" cy="124" rx="22" ry="12" fill="#52525b" />
          <circle cx="68" cy="108" r="11" fill="#52525b" />
          <circle cx="72" cy="106" r="2.5" fill="#fafafa" />
          <circle cx="73" cy="106" r="1" fill="#27272a" />
          <path
            d="M76 104l6-4 2 3-5 3z"
            fill="#71717a"
          />
          <ellipse cx="44" cy="118" rx="5" ry="3" fill="#71717a" />
          <rect x="58" y="128" width="4" height="8" rx="2" fill="#3f3f46" />
          <rect x="66" y="128" width="4" height="8" rx="2" fill="#3f3f46" />
          <path
            d="M40 112c-6-4-10 2-6 8"
            stroke="#71717a"
            strokeWidth="3"
            strokeLinecap="round"
            className="profile-play-tail"
          />
        </g>

        {/* cat */}
        <g className="profile-play-cat">
          <ellipse cx="168" cy="124" rx="18" ry="11" fill="#71717a" />
          <circle cx="154" cy="108" r="10" fill="#71717a" />
          <path d="M148 100l-4-8 6 4z" fill="#71717a" />
          <path d="M160 100l4-8-6 4z" fill="#71717a" />
          <circle cx="157" cy="107" r="2" fill="#fafafa" />
          <circle cx="158" cy="107" r="0.8" fill="#27272a" />
          <circle cx="151" cy="107" r="2" fill="#fafafa" />
          <circle cx="152" cy="107" r="0.8" fill="#27272a" />
          <path
            d="M148 112c-2 2-4 6-2 10"
            stroke="#a1a1aa"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="160" y="128" width="3.5" height="7" rx="1.5" fill="#52525b" />
          <rect x="168" y="128" width="3.5" height="7" rx="1.5" fill="#52525b" />
          <path
            d="M182 114c5-3 8 4 3 8"
            stroke="#a1a1aa"
            strokeWidth="3"
            strokeLinecap="round"
            className="profile-play-tail"
          />
        </g>
      </svg>
    </div>
  );
}

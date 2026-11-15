"use client";

interface BearRoarAnimationProps {
  roaring?: boolean;
  className?: string;
}

export default function BearRoarAnimation({
  roaring = false,
  className = "",
}: BearRoarAnimationProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      data-roaring={roaring ? "true" : "false"}
      aria-hidden="true"
    >
      {/* roar shock lines */}
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        aria-hidden
      >
        <g className={`profile-bear-roar-burst ${roaring ? "is-roaring" : ""}`}>
          <path
            d="M168 70 L198 54 M170 100 L200 100 M168 130 L196 146"
            stroke="#2d4a3e"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
          <path
            d="M32 70 L2 54 M30 100 L0 100 M32 130 L4 146"
            stroke="#2d4a3e"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
        </g>
      </svg>

      <div
        className={`profile-bear-head relative h-full w-full ${roaring ? "is-roaring" : ""}`}
      >
        <img
          src="/mammal.svg"
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

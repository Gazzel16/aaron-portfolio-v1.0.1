"use client";

interface BearRoarAnimationProps {
  flying?: boolean;
  className?: string;
}

export default function BearRoarAnimation({
  flying = false,
  className = "",
}: BearRoarAnimationProps) {
  return (
    <div
      className={`profile-logo-stage relative flex items-center justify-center select-none ${className}`}
      data-flying={flying ? "true" : "false"}
      aria-hidden="true"
    >
      {/* wind / speed streaks */}
      <svg
        viewBox="0 0 220 160"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        aria-hidden
      >
        <g className={`profile-logo-wind ${flying ? "is-flying" : ""}`}>
          <path
            d="M28 118 L8 132 M48 128 L18 148 M72 136 L46 154"
            stroke="#2d4a3e"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M192 118 L212 132 M172 128 L202 148 M148 136 L174 154"
            stroke="#2d4a3e"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      </svg>

      <div
        aria-hidden
        className={`profile-logo-shadow absolute bottom-1 left-1/2 h-3 w-[55%] -translate-x-1/2 rounded-[100%] bg-[#1c2430]/15 blur-[2px] ${flying ? "is-flying" : ""}`}
      />

      <div
        className={`profile-logo-fly relative h-full w-full ${flying ? "is-flying" : ""}`}
      >
        <div className={`profile-logo-flip h-full w-full ${flying ? "is-flying" : ""}`}>
          <img
            src="/logo2.svg"
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

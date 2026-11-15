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
      className={`relative select-none ${className}`}
      data-roaring={roaring ? "true" : "false"}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        {/* roar shock lines — both sides, sharp */}
        <g className={`profile-bear-roar-burst ${roaring ? "is-roaring" : ""}`}>
          <path
            d="M162 72 L192 58 M164 100 L196 100 M162 128 L190 142"
            stroke="#2d4a3e"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
          <path
            d="M38 72 L8 58 M36 100 L4 100 M38 128 L10 142"
            stroke="#2d4a3e"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
        </g>

        <g className={`profile-bear-head ${roaring ? "is-roaring" : ""}`}>
          {/* outer silhouette */}
          <path
            fill="#1c2430"
            d="M100 14
               L118 28 L136 18 L142 40 L164 36 L158 58 L180 64 L168 84
               L186 100 L168 116 L180 136 L158 142 L164 164 L142 160
               L136 182 L118 172 L100 186 L82 172 L64 182 L58 160
               L36 164 L42 142 L20 136 L32 116 L14 100 L32 84
               L20 64 L42 58 L36 36 L58 40 L64 18 L82 28 Z"
          />

          {/* face plate */}
          <path
            fill="#fafaf7"
            d="M100 42
               L124 52 L138 74 L142 100 L136 128 L118 148
               L100 156 L82 148 L64 128 L58 100 L62 74 L76 52 Z"
          />

          {/* ears */}
          <path fill="#1c2430" d="M62 48 L52 28 L78 42 Z" />
          <path fill="#1c2430" d="M138 48 L148 28 L122 42 Z" />
          <path fill="#fafaf7" d="M64 46 L58 34 L74 42 Z" />
          <path fill="#fafaf7" d="M136 46 L142 34 L126 42 Z" />

          {/* eyes — slit when roaring */}
          {roaring ? (
            <>
              <path fill="#1c2430" d="M68 86 L94 80 L94 86 L72 94 Z" />
              <path fill="#1c2430" d="M132 86 L106 80 L106 86 L128 94 Z" />
            </>
          ) : (
            <>
              <path fill="#1c2430" d="M70 88 L92 82 L92 92 L74 98 Z" />
              <path fill="#1c2430" d="M130 88 L108 82 L108 92 L126 98 Z" />
            </>
          )}

          {/* brows — heavier when roaring */}
          <path
            className={`profile-bear-brow ${roaring ? "is-roaring" : ""}`}
            d={roaring ? "M64 74 L96 66" : "M66 76 L94 70"}
            stroke="#1c2430"
            strokeWidth={roaring ? 5 : 4}
            strokeLinecap="square"
          />
          <path
            className={`profile-bear-brow ${roaring ? "is-roaring" : ""}`}
            d={roaring ? "M136 74 L104 66" : "M134 76 L106 70"}
            stroke="#1c2430"
            strokeWidth={roaring ? 5 : 4}
            strokeLinecap="square"
          />

          {/* muzzle */}
          <path fill="#1c2430" d="M100 96 L112 112 L100 118 L88 112 Z" />

          {/* mouth — closed mark vs fierce void (no tongue) */}
          {!roaring ? (
            <path
              fill="#1c2430"
              d="M78 128 L100 136 L122 128 L118 142 L100 150 L82 142 Z"
            />
          ) : (
            <g className="profile-bear-jaw is-roaring">
              {/* upper teeth bar — geometric, not cute */}
              <path
                fill="#1c2430"
                d="M72 118 L128 118 L124 128 L100 134 L76 128 Z"
              />
              {/* open void */}
              <path
                fill="#1c2430"
                d="M76 128 L100 136 L124 128 L134 158 L100 176 L66 158 Z"
              />
              {/* lower jaw plate */}
              <path
                fill="#2d4a3e"
                d="M80 150 L100 158 L120 150 L124 166 L100 174 L76 166 Z"
              />
            </g>
          )}

          {/* cheek structure */}
          <path
            d="M70 110 L78 128"
            stroke="#1c2430"
            strokeWidth="3"
            strokeLinecap="square"
          />
          <path
            d="M130 110 L122 128"
            stroke="#1c2430"
            strokeWidth="3"
            strokeLinecap="square"
          />
        </g>
      </svg>
    </div>
  );
}

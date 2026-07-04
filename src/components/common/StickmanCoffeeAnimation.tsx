"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BUBBLE_TEXT = "lets grab a coffee?";
const CHAR_MS = 75;
const HOLD_MS = 700;
const HIDDEN_MS = 1500;

interface StickmanCoffeeAnimationProps {
  className?: string;
}

export default function StickmanCoffeeAnimation({
  className,
}: StickmanCoffeeAnimationProps) {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(BUBBLE_TEXT);
      setVisible(true);
      setTyping(false);
      return;
    }

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
    };

    const hideAndWait = () => {
      setVisible(false);
      setTyping(false);
      setText("");
      schedule(startTyping, HIDDEN_MS);
    };

    const startTyping = () => {
      setVisible(true);
      setTyping(true);
      setText("");

      let index = 0;
      const typeNext = () => {
        index += 1;
        setText(BUBBLE_TEXT.slice(0, index));

        if (index < BUBBLE_TEXT.length) {
          schedule(typeNext, CHAR_MS);
        } else {
          setTyping(false);
          schedule(hideAndWait, HOLD_MS);
        }
      };

      typeNext();
    };

    startTyping();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <div
      className={cn(
        "relative h-10 w-12 shrink-0 select-none overflow-visible",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 transition-opacity duration-300",
          visible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="relative whitespace-nowrap rounded-full border border-zinc-200 bg-white/95 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-400">
          <span className="invisible">{BUBBLE_TEXT}</span>
          <span className="absolute inset-0 flex items-center px-2.5">
            {text}
            {typing && (
              <span className="profile-coffee-cursor ml-px inline-block">|</span>
            )}
          </span>
          <span
            className={cn(
              "absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-b border-r border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
              !visible && "opacity-0",
            )}
          />
        </div>
      </div>

      <svg
        viewBox="0 0 56 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
          {/* head */}
          <circle
            cx="30"
            cy="11"
            r="4.5"
            stroke="#52525b"
            strokeWidth="1.75"
          />
          {/* torso — slight lean back while seated */}
          <path
            d="M30 15.5 L26 29"
            stroke="#52525b"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* seated legs — horizontal thighs, vertical shins */}
          <path
            d="M26 29 L36 29 L36 40 M26 29 L19 31 L17 40"
            stroke="#52525b"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* resting arm on lap */}
          <path
            d="M28 20 L22 28"
            stroke="#71717a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* drinking arm + cup (static) */}
          <path
            d="M31 18 L33 13"
            stroke="#71717a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="31.5"
            y="8.5"
            width="4.5"
            height="4.5"
            rx="0.75"
            stroke="#78350f"
            strokeWidth="1.25"
            fill="#92400e"
            fillOpacity="0.55"
          />
          <path
            d="M36 10.5 L37.25 10.5"
            stroke="#78350f"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <g className="profile-coffee-steam">
            <path
              className="profile-coffee-steam-wisp"
              d="M33 7.5 C32.5 6 34 4.5 33.5 2.5"
              stroke="#71717a"
              strokeWidth="1.35"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              className="profile-coffee-steam-wisp profile-coffee-steam-wisp-delay-1"
              d="M35 7 C34.5 5.5 36 3.5 35.5 1.5"
              stroke="#71717a"
              strokeWidth="1.35"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              className="profile-coffee-steam-wisp profile-coffee-steam-wisp-delay-2"
              d="M31.5 7.25 C31 5.75 32.5 4 32 2"
              stroke="#a1a1aa"
              strokeWidth="1.15"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
      </svg>
    </div>
  );
}

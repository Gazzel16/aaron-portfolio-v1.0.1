"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "░▒▓█ ent@#*+/<>";

function delayForChar(char: string, index: number) {
  if (char === "." || char === "!" || char === "?") return 160;
  if (char === "," || char === ";" || char === ":") return 90;
  if (char === " ") return 36;
  if (index % 11 === 0) return 70;
  return 18 + (index % 4) * 5;
}

export type GlitchTypeTextProps = {
  text: string;
  className?: string;
  onComplete?: () => void;
};

export default function GlitchTypeText({
  text,
  className = "",
  onComplete,
}: GlitchTypeTextProps) {
  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setRevealed(text.length);
      setTyping(false);
      onComplete?.();
      return;
    }

    setRevealed(0);
    setTyping(true);

    let index = 0;
    let timer: number | undefined;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setRevealed(index);

      if (index >= text.length) {
        setTyping(false);
        onComplete?.();
        return;
      }

      const nextChar = text[index] ?? "";
      timer = window.setTimeout(() => tick(), delayForChar(nextChar, index));
    };

    timer = window.setTimeout(() => tick(), 40);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [text, onComplete]);

  const chars = text.slice(0, revealed).split("");

  return (
    <p
      className={`book-intro-copy ${className}`}
      data-typing={typing ? "true" : "false"}
      aria-live="polite"
    >
      {chars.map((char, i) => {
        const isLatest = i === revealed - 1 && typing;
        const glitchGlyph =
          isLatest &&
          char.trim() !== "" &&
          GLITCH_CHARS[(i * 3) % GLITCH_CHARS.length];

        return (
          <span
            key={`${i}-${char}`}
            className={`book-intro-glyph ${isLatest ? "is-resolving" : ""}`}
            data-char={char === " " ? "space" : undefined}
          >
            {char === " " ? "\u00a0" : char}
            {glitchGlyph ? (
              <span className="book-intro-glyph-ghost" aria-hidden>
                {glitchGlyph}
              </span>
            ) : null}
          </span>
        );
      })}
      {typing && <span className="book-intro-caret" aria-hidden />}
    </p>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Syne } from "next/font/google";
import BearRoarAnimation from "@/components/common/BearRoarAnimation";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-book-sans",
});

const SESSION_KEY = "book-intro-seen";
const GLITCH_CHARS = "░▒▓█ ent@#*+/<>";

type BookIntroPhase = "idle" | "fly" | "type" | "hold" | "exit";

export type BookIntroProps = {
  description: string;
  oncePerSession?: boolean;
  onComplete?: () => void;
};

function delayForChar(char: string, index: number) {
  if (char === "." || char === "!" || char === "?") return 160;
  if (char === "," || char === ";" || char === ":") return 90;
  if (char === " ") return 36;
  if (index % 11 === 0) return 70; // signal stutter
  return 18 + (index % 4) * 5;
}

export default function BookIntro({
  description,
  oncePerSession = true,
  onComplete,
}: BookIntroProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<BookIntroPhase>("idle");
  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState(false);

  const finish = useCallback(() => {
    if (oncePerSession) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }
    document.body.style.overflow = "";
    setVisible(false);
    onComplete?.();
  }, [oncePerSession, onComplete]);

  useEffect(() => {
    setMounted(true);

    if (oncePerSession) {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "1") {
          onComplete?.();
          return;
        }
      } catch {
        // ignore
      }
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setVisible(true);
    document.body.style.overflow = "hidden";

    if (reduceMotion) {
      setRevealed(description.length);
      setPhase("hold");
      const done = window.setTimeout(() => finish(), 2000);
      return () => {
        window.clearTimeout(done);
        document.body.style.overflow = "";
      };
    }

    const tFly = window.setTimeout(() => setPhase("fly"), 400);
    const tType = window.setTimeout(() => setPhase("type"), 2400);

    return () => {
      window.clearTimeout(tFly);
      window.clearTimeout(tType);
      document.body.style.overflow = "";
    };
  }, [description, finish, oncePerSession, onComplete]);

  useEffect(() => {
    if (phase !== "type") return;

    setRevealed(0);
    setTyping(true);

    let index = 0;
    let timer: number | undefined;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setRevealed(index);

      if (index >= description.length) {
        setTyping(false);
        setPhase("hold");
        return;
      }

      const nextChar = description[index] ?? "";
      timer = window.setTimeout(() => tick(), delayForChar(nextChar, index));
    };

    timer = window.setTimeout(() => tick(), 40);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [phase, description]);

  // Hold the finished plate for 2s, then fade to dashboard
  useEffect(() => {
    if (phase !== "hold") return;
    const tExit = window.setTimeout(() => setPhase("exit"), 2000);
    return () => window.clearTimeout(tExit);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const tDone = window.setTimeout(() => finish(), 450);
    return () => window.clearTimeout(tDone);
  }, [phase, finish]);

  if (!mounted || !visible) return null;

  const flying = phase === "fly";
  const glitching = phase === "idle" || phase === "fly";
  const chars = description.slice(0, revealed).split("");

  return createPortal(
    <div
      className={`${syne.variable} book-intro-root fixed inset-0 z-[300] flex items-center justify-center bg-[#e8ebe6]`}
      data-phase={phase}
      data-glitch={glitching ? "hard" : "soft"}
      data-typing={typing ? "true" : "false"}
      role="dialog"
      aria-modal="true"
      aria-label="Introduction"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(45,74,62,0.08),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(28,36,48,0.06),transparent_45%)]"
      />

      {/* TV screen glitch layers */}
      <div
        aria-hidden
        className="book-intro-tv pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="book-intro-tv-rgb" />
        <div className="book-intro-tv-tear" />
        <div className="book-intro-tv-scanlines" />
        <div className="book-intro-tv-noise" />
        <div className="book-intro-tv-vignette" />
      </div>

      <div className="relative z-[2] flex max-w-md flex-col items-center px-6 text-center">
        <BearRoarAnimation
          flying={flying}
          className="mb-5 h-40 w-56 sm:h-48 sm:w-72"
        />

        <p
          className="book-intro-copy min-h-[3.2em] max-w-[32ch] font-[family-name:var(--font-book-sans)] text-base leading-relaxed text-[#1c2430] sm:text-lg"
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
      </div>
    </div>,
    document.body,
  );
}

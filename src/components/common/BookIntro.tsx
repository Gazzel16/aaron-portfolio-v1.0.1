"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Instrument_Serif, Syne } from "next/font/google";
import BearRoarAnimation from "@/components/common/BearRoarAnimation";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-book-display",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-book-sans",
});

const SESSION_KEY = "book-intro-seen";

type BookIntroPhase = "closed" | "open" | "roar" | "type" | "hold" | "exit";
type DoorsState = "closed" | "opening" | "open";

export type BookIntroProps = {
  title: string;
  subtitle: string;
  oncePerSession?: boolean;
  onComplete?: () => void;
};

export default function BookIntro({
  title,
  subtitle,
  oncePerSession = true,
  onComplete,
}: BookIntroProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<BookIntroPhase>("closed");
  const [doors, setDoors] = useState<DoorsState>("closed");
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [typingTarget, setTypingTarget] = useState<"title" | "subtitle" | null>(
    null,
  );

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
      setTypedTitle(title);
      setTypedSubtitle(subtitle);
      setDoors("open");
      setPhase("hold");
      const done = window.setTimeout(() => finish(), 2000);
      return () => {
        window.clearTimeout(done);
        document.body.style.overflow = "";
      };
    }

    const tOpen = window.setTimeout(() => {
      setPhase("open");
      setDoors("opening");
    }, 280);
    const tDoorsPark = window.setTimeout(() => setDoors("open"), 1950);
    const tRoar = window.setTimeout(() => setPhase("roar"), 2000);
    const tType = window.setTimeout(() => setPhase("type"), 3800);

    return () => {
      window.clearTimeout(tOpen);
      window.clearTimeout(tDoorsPark);
      window.clearTimeout(tRoar);
      window.clearTimeout(tType);
      document.body.style.overflow = "";
    };
  }, [finish, oncePerSession, onComplete, subtitle, title]);

  useEffect(() => {
    if (phase !== "type") return;

    setTypedTitle("");
    setTypedSubtitle("");
    setTypingTarget("title");

    let titleIndex = 0;
    let subtitleIndex = 0;
    let subtitleTimer: number | undefined;

    const titleTimer = window.setInterval(() => {
      titleIndex += 1;
      setTypedTitle(title.slice(0, titleIndex));
      if (titleIndex >= title.length) {
        window.clearInterval(titleTimer);
        setTypingTarget("subtitle");
        subtitleTimer = window.setInterval(() => {
          subtitleIndex += 1;
          setTypedSubtitle(subtitle.slice(0, subtitleIndex));
          if (subtitleIndex >= subtitle.length) {
            window.clearInterval(subtitleTimer);
            setTypingTarget(null);
            setPhase("hold");
          }
        }, 22);
      }
    }, 55);

    return () => {
      window.clearInterval(titleTimer);
      if (subtitleTimer) window.clearInterval(subtitleTimer);
    };
  }, [phase, title, subtitle]);

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

  const roaring = phase === "roar";

  return createPortal(
    <div
      className={`${instrumentSerif.variable} ${syne.variable} book-intro-root fixed inset-0 z-[300] flex items-center justify-center bg-[#e8ebe6]`}
      data-phase={phase}
      data-doors={doors}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} introduction`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(45,74,62,0.08),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(28,36,48,0.06),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"
      />

      <div className="relative z-0 flex max-w-md flex-col items-center px-6 text-center">
        <BearRoarAnimation
          roaring={roaring}
          className="mb-5 h-40 w-40 sm:h-48 sm:w-48"
        />

        <h1 className="min-h-[1.1em] font-[family-name:var(--font-book-display)] text-[clamp(2.25rem,6vw,3.25rem)] leading-[1] tracking-[-0.02em] text-[#1c2430]">
          {typedTitle}
          {typingTarget === "title" && (
            <span className="book-intro-caret" aria-hidden />
          )}
        </h1>
        <p className="mt-4 min-h-[3.2em] max-w-[30ch] font-[family-name:var(--font-book-sans)] text-sm leading-relaxed text-[#4a554c] sm:text-base">
          {typedSubtitle}
          {typingTarget === "subtitle" && (
            <span className="book-intro-caret" aria-hidden />
          )}
        </p>
      </div>

      <div className="book-intro-stage pointer-events-none absolute inset-0 z-10 flex">
        <div className="book-intro-door book-intro-door-left relative h-full w-1/2 bg-[#f4f5f2] shadow-[8px_0_28px_-12px_rgba(28,36,48,0.35)]">
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-px bg-[#1c2430]/15"
          />
          <div
            aria-hidden
            className="absolute inset-y-[18%] right-3 w-2.5 rounded-full bg-[#1c2430]/12"
          />
          <div className="flex h-full items-center justify-center">
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#8a9488]">
              Portfolio
            </span>
          </div>
        </div>
        <div className="book-intro-door book-intro-door-right relative h-full w-1/2 bg-[#fafaf7] shadow-[-8px_0_28px_-12px_rgba(28,36,48,0.35)]">
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-px bg-[#1c2430]/15"
          />
          <div
            aria-hidden
            className="absolute inset-y-[18%] left-3 w-2.5 rounded-full bg-[#1c2430]/12"
          />
          <div className="flex h-full items-center justify-center">
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#8a9488]">
              Version III
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

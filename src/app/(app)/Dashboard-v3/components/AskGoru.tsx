"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import GlitchTypeText from "@/components/common/GlitchTypeText";

const EDGE = 16;
const CHAT_BTN = 48;
const GAP = 12;

type GoruQa = {
  id: string;
  question: string;
  answer: string;
};

const GORU_QA: GoruQa[] = [
  {
    id: "how-are-you",
    question: "How are you Goru?",
    answer:
      "Feeling fierce and well-caffeinated. Ready to roar through Aaron's work with you.",
  },
  {
    id: "feeling",
    question: "What are you feeling today Goru?",
    answer:
      "Curious. There's a stack of projects nearby and my paws are twitching to show them off.",
  },
  {
    id: "who-aaron",
    question: "Who is Aaron?",
    answer:
      "Aaron Mercado — a builder who turns ideas into working solutions through technology. I'm his mascot sidekick.",
  },
  {
    id: "portfolio",
    question: "What should I explore first?",
    answer:
      "Start with Projects for the builds, then Experience for the journey. Or poke the chat bubble if you want specifics.",
  },
  {
    id: "name",
    question: "Why are you called Goru?",
    answer:
      "Short for the growl that started this whole brand. Think friendly guardian, not grumpy bear.",
  },
];

export default function AskGoru() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [answerDone, setAnswerDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const active = GORU_QA.find((item) => item.id === activeId) ?? null;

  const handleAnswerComplete = useCallback(() => {
    setAnswerDone(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      const launcher = document.getElementById("ask-goru-launcher");
      if (launcher?.contains(target)) return;
      setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setActiveId(null);
      setAnswerDone(false);
    }
  }, [open]);

  useEffect(() => {
    setAnswerDone(false);
  }, [activeId]);

  return (
    <>
      <button
        id="ask-goru-launcher"
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="ask-goru-float fixed z-[240] flex h-12 w-12 items-center justify-center bg-transparent p-0"
        style={{ right: EDGE + CHAT_BTN + GAP, bottom: EDGE }}
        aria-label={open ? "Close Ask Goru" : "Ask Goru"}
        aria-expanded={open}
      >
        <img
          src="/logo2.svg"
          alt=""
          className="h-12 w-12 object-contain drop-shadow-[0_8px_18px_rgba(28,36,48,0.28)]"
          draggable={false}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          className="fixed z-[241] flex w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden border border-[#1c2430]/15 bg-[#fafaf7] shadow-[0_24px_80px_-24px_rgba(28,36,48,0.45)]"
          style={{
            right: EDGE,
            bottom: EDGE + CHAT_BTN + GAP,
          }}
          role="dialog"
          aria-label="Ask Goru"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#1c2430]/10 bg-[#f4f5f2] px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src="/logo2.svg"
                alt=""
                className="h-8 w-8 shrink-0 object-contain"
                draggable={false}
              />
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#5c6b5e]">
                  Mascot
                </p>
                <p className="truncate font-[family-name:var(--font-book-sans)] text-sm font-semibold text-[#1c2430]">
                  Ask Goru
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-[#5c6b5e] transition-colors hover:text-[#1c2430]"
              aria-label="Close Ask Goru"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[min(22rem,50vh)] space-y-3 overflow-y-auto px-3 py-3">
            {!active ? (
              <ul className="space-y-2">
                {GORU_QA.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className="w-full border border-[#1c2430]/12 bg-white px-3 py-2.5 text-left font-[family-name:var(--font-book-sans)] text-sm leading-snug text-[#1c2430] transition-colors hover:border-[#2d4a3e]/45"
                    >
                      {item.question}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="ask-goru-answer space-y-4">
                <div>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#5c6b5e]">
                    You asked
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--font-book-sans)] text-sm font-medium text-[#1c2430]">
                    {active.question}
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#5c6b5e]">
                    Goru says
                  </p>
                  <GlitchTypeText
                    key={active.id}
                    text={active.answer}
                    className="mt-1.5 font-[family-name:var(--font-book-sans)] text-sm leading-relaxed text-[#4a554c]"
                    onComplete={handleAnswerComplete}
                  />
                </div>
                {answerDone && (
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="w-full border border-[#1c2430]/15 bg-[#1c2430] px-3 py-2.5 font-[family-name:var(--font-book-sans)] text-sm font-medium text-[#fafaf7] transition-colors hover:bg-[#2d4a3e]"
                  >
                    Ask again
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

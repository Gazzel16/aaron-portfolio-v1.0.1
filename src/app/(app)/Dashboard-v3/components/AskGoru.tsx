"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import GlitchTypeText from "@/components/common/GlitchTypeText";
import GoruFormAvatar, {
  type GoruFormId,
} from "@/app/(app)/Dashboard-v3/components/GoruFormAvatar";

const EDGE = 16;
const CHAT_BTN = 48;
const GAP = 12;
const LAUNCHER = 96;
const PANEL_WIDTH = 320;
const DRAG_THRESHOLD = 6;

type GoruQa = {
  id: string;
  question: string;
  answer: string;
};

type GoruTalent = {
  id: "dance" | "invisible" | "spin" | "mega" | "glitch";
  label: string;
  blurb: string;
  durationMs: number;
};

type GoruMorph = {
  id: GoruFormId;
  label: string;
  blurb: string;
};

type PanelTab = "talents" | "ask" | "morph";

const PANEL_OPTIONS: { id: PanelTab; label: string; hint: string }[] = [
  {
    id: "talents",
    label: "Goru's Talent",
    hint: "Dance, vanish, mega & more",
  },
  {
    id: "ask",
    label: "Ask Goru",
    hint: "Pick a question for Goru",
  },
  {
    id: "morph",
    label: "Turn into",
    hint: "Cat, robot, rocket & friends",
  },
];

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

const GORU_TALENTS: GoruTalent[] = [
  {
    id: "dance",
    label: "Can dance",
    blurb: "Groove mode engaged.",
    durationMs: 2800,
  },
  {
    id: "invisible",
    label: "Can go invisible",
    blurb: "Now you see me…",
    durationMs: 2600,
  },
  {
    id: "spin",
    label: "Can spin",
    blurb: "Barrel roll!",
    durationMs: 1800,
  },
  {
    id: "mega",
    label: "Can go mega",
    blurb: "Big bear energy.",
    durationMs: 2400,
  },
  {
    id: "glitch",
    label: "Can glitch",
    blurb: "Signal unstable.",
    durationMs: 2200,
  },
];

const GORU_MORPHS: GoruMorph[] = [
  { id: "goru", label: "Back to Goru", blurb: "Classic form." },
  { id: "cat", label: "Turn into a cat", blurb: "Soft paws mode." },
  { id: "dog", label: "Turn into a dog", blurb: "Good boy protocol." },
  { id: "robot", label: "Turn into a robot", blurb: "Beep. Build. Repeat." },
  { id: "rocket", label: "Turn into a rocket", blurb: "Liftoff!" },
  { id: "spider", label: "Turn into a spider", blurb: "Wall-crawler vibes." },
  { id: "coffee", label: "Turn into coffee buddy", blurb: "Let's grab a cup." },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function AskGoru() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<PanelTab | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [answerDone, setAnswerDone] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [talent, setTalent] = useState<GoruTalent["id"] | null>(null);
  const [talentNote, setTalentNote] = useState<string | null>(null);
  const [form, setForm] = useState<GoruFormId>("goru");
  const [morphing, setMorphing] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const talentTimer = useRef<number | null>(null);
  const morphTimer = useRef<number | null>(null);
  const formRef = useRef<GoruFormId>("goru");
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const active = GORU_QA.find((item) => item.id === activeId) ?? null;
  const activeOption = PANEL_OPTIONS.find((item) => item.id === tab) ?? null;

  const handleAnswerComplete = useCallback(() => {
    setAnswerDone(true);
  }, []);

  const clearTalentTimer = useCallback(() => {
    if (talentTimer.current) {
      window.clearTimeout(talentTimer.current);
      talentTimer.current = null;
    }
  }, []);

  const castTalent = useCallback(
    (next: GoruTalent) => {
      clearTalentTimer();
      setTalent(next.id);
      setTalentNote(next.blurb);
      talentTimer.current = window.setTimeout(() => {
        setTalent(null);
        setTalentNote(null);
        talentTimer.current = null;
      }, next.durationMs);
    },
    [clearTalentTimer],
  );

  const morphInto = useCallback((next: GoruMorph) => {
    if (morphTimer.current) {
      window.clearTimeout(morphTimer.current);
      morphTimer.current = null;
    }

    // Hide the panel while Goru performs the morph
    setOpen(false);
    setTab(null);
    setActiveId(null);
    setAnswerDone(false);

    const finishMorphFx = () => {
      setMorphing(false);
      setTalentNote(null);
      morphTimer.current = null;
    };

    if (next.id === "goru") {
      setMorphing(true);
      setTalentNote(next.blurb);
      setForm("goru");
      morphTimer.current = window.setTimeout(finishMorphFx, 900);
      return;
    }

    // Step-by-step body build (~1.8s), hold, then back to Goru at 3s
    setMorphing(true);
    setTalentNote("Assembling…");
    setForm(next.id);

    const noteTimer = window.setTimeout(() => {
      setTalentNote(next.blurb);
    }, 1800);

    morphTimer.current = window.setTimeout(() => {
      window.clearTimeout(noteTimer);
      setMorphing(true);
      setTalentNote("Back to Goru.");
      setForm("goru");
      morphTimer.current = window.setTimeout(finishMorphFx, 900);
    }, 3000);
  }, []);

  useEffect(
    () => () => {
      clearTalentTimer();
      if (morphTimer.current) window.clearTimeout(morphTimer.current);
    },
    [clearTalentTimer],
  );

  const placeDefault = useCallback(() => {
    if (typeof window === "undefined") return;
    setPos({
      x: window.innerWidth - EDGE - CHAT_BTN - GAP - LAUNCHER,
      y: window.innerHeight - EDGE - LAUNCHER,
    });
    setReady(true);
  }, []);

  useEffect(() => {
    placeDefault();
    const onResize = () => {
      setPos((current) => ({
        x: clamp(current.x, EDGE, window.innerWidth - LAUNCHER - EDGE),
        y: clamp(current.y, EDGE, window.innerHeight - LAUNCHER - EDGE),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeDefault]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      if (
        !dragRef.current.moved &&
        (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)
      ) {
        dragRef.current.moved = true;
        setDragging(true);
      }
      setPos({
        x: clamp(
          dragRef.current.originX + dx,
          EDGE,
          window.innerWidth - LAUNCHER - EDGE,
        ),
        y: clamp(
          dragRef.current.originY + dy,
          EDGE,
          window.innerHeight - LAUNCHER - EDGE,
        ),
      });
    };

    const onUp = () => {
      if (!dragRef.current) return;
      const didDrag = dragRef.current.moved;
      dragRef.current = null;
      setDragging(false);
      if (!didDrag) {
        // Don't open the panel while a Turn into form is active
        setOpen((value) => {
          if (!value && formRef.current !== "goru") return false;
          return !value;
        });
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
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
      setTab(null);
    }
  }, [open]);

  useEffect(() => {
    setAnswerDone(false);
  }, [activeId]);

  const selectTab = (next: PanelTab) => {
    setTab(next);
    setActiveId(null);
    setAnswerDone(false);
  };

  const backToChips = () => {
    setTab(null);
    setActiveId(null);
    setAnswerDone(false);
  };

  const startDrag = (event: React.PointerEvent) => {
    event.preventDefault();
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x,
      originY: pos.y,
      moved: false,
    };
  };

  if (!ready) return null;

  const panelLeft = clamp(
    pos.x + LAUNCHER - PANEL_WIDTH,
    EDGE,
    Math.max(EDGE, window.innerWidth - PANEL_WIDTH - EDGE),
  );
  const panelBottomSpace = window.innerHeight - pos.y + GAP;
  const openUpward = pos.y > window.innerHeight * 0.45;

  return (
    <>
      <button
        id="ask-goru-launcher"
        type="button"
        onPointerDown={startDrag}
        className={`ask-goru-float fixed z-[240] flex cursor-grab items-center justify-center bg-transparent p-0 active:cursor-grabbing ${dragging ? "is-dragging" : ""} ${talent ? `talent-${talent}` : ""} ${morphing ? "is-morphing" : ""}`}
        style={{ left: pos.x, top: pos.y, width: LAUNCHER, height: LAUNCHER }}
        aria-label={open ? "Close Ask Goru" : "Ask Goru"}
        aria-expanded={open}
        data-talent={talent ?? undefined}
        data-form={form}
      >
        <GoruFormAvatar form={form} building={morphing && form !== "goru"} />
      </button>

      {talentNote && (
        <div
          className="ask-goru-talent-note pointer-events-none fixed z-[242] px-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#2d4a3e]"
          style={{
            left: clamp(pos.x, EDGE, window.innerWidth - 140),
            top: Math.max(EDGE, pos.y - 22),
          }}
        >
          {talentNote}
        </div>
      )}

      {open && (
        <div
          ref={panelRef}
          className="fixed z-[241] flex w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden border border-[#1c2430]/15 bg-[#fafaf7] shadow-[0_24px_80px_-24px_rgba(28,36,48,0.45)]"
          style={{
            left: panelLeft,
            width: Math.min(PANEL_WIDTH, window.innerWidth - EDGE * 2),
            ...(openUpward
              ? { bottom: panelBottomSpace }
              : { top: pos.y + LAUNCHER + GAP }),
          }}
          role="dialog"
          aria-label="Ask Goru"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#1c2430]/10 bg-[#f4f5f2] px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="h-8 w-8 shrink-0">
                <GoruFormAvatar form={form} />
              </div>
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#5c6b5e]">
                  Mascot
                </p>
                <p className="truncate font-[family-name:var(--font-book-sans)] text-sm font-semibold text-[#1c2430]">
                  {activeOption?.label ?? "What should Goru do?"}
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

          <div className="max-h-[min(26rem,55vh)] space-y-3 overflow-y-auto px-3 py-3">
            {tab === null && (
              <div className="space-y-3">
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#5c6b5e]">
                  Choose a performance
                </p>
                <div className="flex flex-col gap-2" role="tablist">
                  {PANEL_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      onClick={() => selectTab(item.id)}
                      className="w-full border border-[#1c2430]/12 bg-white px-3 py-3 text-left transition-colors hover:border-[#2d4a3e]/45"
                    >
                      <span className="block font-[family-name:var(--font-book-sans)] text-sm font-semibold text-[#1c2430]">
                        {item.label}
                      </span>
                      <span className="mt-1 block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#8a9488]">
                        {item.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tab !== null && (
              <button
                type="button"
                onClick={backToChips}
                className="inline-flex items-center gap-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#5c6b5e] transition-colors hover:text-[#1c2430]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Change performance
              </button>
            )}

            {tab === "talents" && (
              <ul className="grid grid-cols-1 gap-2">
                {GORU_TALENTS.map((item) => {
                  const casting = talent === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => castTalent(item)}
                        className={`w-full border px-3 py-2.5 text-left transition-colors ${
                          casting
                            ? "border-[#2d4a3e] bg-[#2d4a3e] text-[#fafaf7]"
                            : "border-[#1c2430]/12 bg-white text-[#1c2430] hover:border-[#2d4a3e]/45"
                        }`}
                      >
                        <span className="block font-[family-name:var(--font-book-sans)] text-sm font-medium">
                          {item.label}
                        </span>
                        <span
                          className={`mt-0.5 block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] ${
                            casting ? "text-[#fafaf7]/70" : "text-[#8a9488]"
                          }`}
                        >
                          {casting ? "Casting…" : "Tap to cast"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {tab === "morph" && (
              <ul className="grid grid-cols-1 gap-2">
                {GORU_MORPHS.map((item) => {
                  const selected = form === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => morphInto(item)}
                        className={`flex w-full items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? "border-[#2d4a3e] bg-[#2d4a3e] text-[#fafaf7]"
                            : "border-[#1c2430]/12 bg-white text-[#1c2430] hover:border-[#2d4a3e]/45"
                        }`}
                      >
                        <span className="h-10 w-10 shrink-0">
                          <GoruFormAvatar form={item.id} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-[family-name:var(--font-book-sans)] text-sm font-medium">
                            {item.label}
                          </span>
                          <span
                            className={`mt-0.5 block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] ${
                              selected ? "text-[#fafaf7]/70" : "text-[#8a9488]"
                            }`}
                          >
                            {selected ? "Active form" : "Tap to morph"}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {tab === "ask" && !active && (
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
            )}

            {tab === "ask" && active && (
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

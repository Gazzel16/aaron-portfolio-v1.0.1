"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Minus, Send, X } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const PANEL_WIDTH = 340;
const PANEL_HEIGHT = 460;
const EDGE = 16;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi — I'm Aaron's portfolio assistant. Ask about his skills, projects, experience, or how to get in touch.",
    },
  ]);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const placeDefault = useCallback(() => {
    if (typeof window === "undefined") return;
    setPos({
      x: window.innerWidth - PANEL_WIDTH - EDGE,
      y: window.innerHeight - PANEL_HEIGHT - EDGE,
    });
    setReady(true);
  }, []);

  useEffect(() => {
    placeDefault();
    const onResize = () => {
      setPos((current) => ({
        x: clamp(current.x, EDGE, window.innerWidth - PANEL_WIDTH - EDGE),
        y: clamp(current.y, EDGE, window.innerHeight - PANEL_HEIGHT - EDGE),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeDefault]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, loading]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      setPos({
        x: clamp(
          dragRef.current.originX + dx,
          EDGE,
          window.innerWidth - PANEL_WIDTH - EDGE,
        ),
        y: clamp(
          dragRef.current.originY + dy,
          EDGE,
          window.innerHeight - PANEL_HEIGHT - EDGE,
        ),
      });
    };

    const onUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const startDrag = (event: React.PointerEvent) => {
    if ((event.target as HTMLElement).closest("button")) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x,
      originY: pos.y,
    };
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to reply");
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.reply as string,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!ready) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed z-[240] flex h-12 w-12 items-center justify-center border border-[#1c2430]/15 bg-[#1c2430] text-[#fafaf7] shadow-[0_12px_40px_-16px_rgba(28,36,48,0.55)] transition-colors hover:bg-[#2d4a3e]"
          style={{ right: EDGE, bottom: EDGE }}
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div
          className="fixed z-[240] flex flex-col overflow-hidden border border-[#1c2430]/15 bg-[#fafaf7] shadow-[0_24px_80px_-24px_rgba(28,36,48,0.45)]"
          style={{
            left: pos.x,
            top: pos.y,
            width: PANEL_WIDTH,
            height: PANEL_HEIGHT,
          }}
        >
          <div
            onPointerDown={startDrag}
            className="flex cursor-grab items-center justify-between gap-3 border-b border-[#1c2430]/10 bg-[#f4f5f2] px-3 py-2.5 active:cursor-grabbing"
          >
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#5c6b5e]">
                Portfolio chat
              </p>
              <p className="truncate font-[family-name:var(--font-book-sans)] text-sm font-semibold text-[#1c2430]">
                Ask about Aaron
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-[#5c6b5e] transition-colors hover:text-[#1c2430]"
                aria-label="Minimize chat"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-[#5c6b5e] transition-colors hover:text-[#1c2430]"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-[#1c2430] text-[#fafaf7]"
                    : "bg-[#f4f5f2] text-[#4a554c]"
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#8a9488]">
                Thinking…
              </p>
            )}
            {error && (
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#8a4a4a]">
                {error}
              </p>
            )}
          </div>

          <form
            className="flex items-end gap-2 border-t border-[#1c2430]/10 bg-[#fafaf7] p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send();
                }
              }}
              rows={2}
              placeholder="Ask a question…"
              className="min-h-[2.75rem] flex-1 resize-none border border-[#1c2430]/15 bg-white px-3 py-2 font-[family-name:var(--font-book-sans)] text-sm text-[#1c2430] outline-none placeholder:text-[#8a9488] focus:border-[#2d4a3e]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#1c2430] text-[#fafaf7] transition-colors hover:bg-[#2d4a3e] disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

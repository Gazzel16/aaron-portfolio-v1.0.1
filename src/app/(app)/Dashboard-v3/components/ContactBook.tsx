"use client";

import { FormEvent, useState } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const SOCIAL = {
  email: "aaron.dev2898@gmail.com",
  github: "https://github.com/Gazzel16",
  linkedin: "https://www.linkedin.com/in/aaron-mercado-163b02369/",
  location: "Manila · Remote, Philippines",
} as const;

export default function ContactBook() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Failed to send message.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="book-spread relative grid w-full grid-cols-1 shadow-[0_24px_80px_-24px_rgba(28,36,48,0.35)] lg:grid-cols-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1c2430]/20 to-transparent lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#1c2430]/[0.06] to-transparent lg:block"
      />

      {/* Left — letter / form */}
      <article className="book-page-left relative flex min-h-[60svh] flex-col justify-between bg-[#f4f5f2] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:rounded-l-[2px] lg:pl-14 lg:pr-16 lg:shadow-[inset_-18px_0_28px_-20px_rgba(28,36,48,0.12)]">
        <header className="flex items-start justify-between gap-4">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
            No. 06 — The Contact
          </p>
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
            Folio 09
          </span>
        </header>

        <div className="my-auto space-y-8 py-10 lg:py-6">
          <div>
            <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
              Dear Visitor,
            </p>
            <h2 className="max-w-[18ch] font-[family-name:var(--font-book-display)] text-[clamp(1.65rem,3.2vw,2.25rem)] leading-[1.15] tracking-[-0.02em] text-[#1c2430]">
              Have a project in mind?
            </h2>
            <p className="mt-4 max-w-[34ch] font-[family-name:var(--font-book-sans)] text-sm leading-relaxed text-[#5c6b5e]">
              Drop me a line and I&apos;ll write back shortly.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#8a9488]">
                Name
              </span>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border-0 border-b border-[#1c2430]/20 bg-transparent px-0 py-2 font-[family-name:var(--font-book-sans)] text-sm text-[#1c2430] outline-none transition-colors placeholder:text-[#8a9488] focus:border-[#2d4a3e]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#8a9488]">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-0 border-b border-[#1c2430]/20 bg-transparent px-0 py-2 font-[family-name:var(--font-book-sans)] text-sm text-[#1c2430] outline-none transition-colors placeholder:text-[#8a9488] focus:border-[#2d4a3e]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#8a9488]">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full resize-none border-0 border-b border-[#1c2430]/20 bg-transparent px-0 py-2 font-[family-name:var(--font-book-sans)] text-sm text-[#1c2430] outline-none transition-colors placeholder:text-[#8a9488] focus:border-[#2d4a3e]"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="border border-[#1c2430] bg-[#1c2430] px-4 py-2.5 font-[family-name:var(--font-book-sans)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4f5f2] transition-colors hover:border-[#2d4a3e] hover:bg-[#2d4a3e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Seal & Send"}
              </button>

              {status === "success" && (
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#2d4a3e]">
                  Letter sent
                </p>
              )}
              {status === "error" && (
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.04em] text-red-700">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>

        <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
            Correspondence
          </span>
          <span className="font-[family-name:var(--font-book-display)] text-2xl italic text-[#2d4a3e]/70">
            06
          </span>
        </footer>
      </article>

      {/* Right — calling card */}
      <article className="book-page-right relative flex min-h-[52svh] flex-col justify-between bg-[#fafaf7] px-8 py-10 sm:px-12 sm:py-14 lg:min-h-[70svh] lg:rounded-r-[2px] lg:pl-16 lg:pr-14 lg:shadow-[inset_18px_0_28px_-20px_rgba(28,36,48,0.1)]">
        <header className="flex items-start justify-between gap-4">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
            Calling Card
          </p>
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
            Folio 10
          </span>
        </header>

        <div className="my-auto flex justify-center py-10 lg:py-6">
          <div className="torn-paper relative w-full max-w-[340px] rotate-[1.75deg] px-7 py-8 sm:px-8 sm:py-9">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.08%22/%3E%3C/svg%3E')]"
            />

            <div className="relative space-y-6">
              <div>
                <p className="mb-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
                  Torn from the ledger
                </p>
                <h2 className="font-[family-name:var(--font-book-display)] text-[clamp(1.85rem,3.5vw,2.6rem)] leading-[0.95] tracking-[-0.02em] text-[#1c2430]">
                  Aaron Mercado
                </h2>
                <p className="mt-2 font-[family-name:var(--font-book-sans)] text-sm text-[#5c6b5e]">
                  Full Stack Developer
                </p>
              </div>

              <div className="h-px w-full bg-[#1c2430]/15" />

              <ul className="space-y-3.5">
                <li>
                  <a
                    href={`mailto:${SOCIAL.email}`}
                    className="group flex items-center gap-3 font-[family-name:var(--font-book-sans)] text-sm text-[#4a554c] transition-colors hover:text-[#2d4a3e]"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#2d4a3e]" />
                    <span className="border-b border-transparent transition-colors group-hover:border-[#2d4a3e]/40">
                      {SOCIAL.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 font-[family-name:var(--font-book-sans)] text-sm text-[#4a554c]">
                  <MapPin className="h-4 w-4 shrink-0 text-[#2d4a3e]" />
                  {SOCIAL.location}
                </li>
              </ul>

              <div className="flex flex-wrap gap-x-5 gap-y-3 pt-1">
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#1c2430] transition-colors hover:text-[#2d4a3e]"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#1c2430] transition-colors hover:text-[#2d4a3e]"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${SOCIAL.email}`}
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#1c2430] transition-colors hover:text-[#2d4a3e]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex items-end justify-between border-t border-[#1c2430]/10 pt-5">
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#8a9488]">
            Available for work
          </span>
          <span className="font-[family-name:var(--font-book-display)] text-2xl italic text-[#2d4a3e]/70">
            fin
          </span>
        </footer>
      </article>
    </div>
  );
}

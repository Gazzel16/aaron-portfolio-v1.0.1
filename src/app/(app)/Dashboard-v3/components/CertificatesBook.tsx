"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Instrument_Serif, Syne } from "next/font/google";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-book-display",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-book-sans",
});

type CertificateItem = {
  title: string;
  role: string;
  date: string;
  image?: string;
  isFeatured?: boolean;
};

type CertificatesBookProps = {
  certificates: CertificateItem[];
};

const navBtn =
  "flex h-9 w-9 items-center justify-center border border-[#1c2430]/20 bg-[#fafaf7] text-[#1c2430] transition-colors hover:border-[#2d4a3e] hover:text-[#2d4a3e]";

export default function CertificatesBook({
  certificates,
}: CertificatesBookProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const active = activeIndex !== null ? certificates[activeIndex] : null;
  const open = activeIndex !== null && !!active;
  const hasMultiple = certificates.length > 1;
  const folioNumber =
    activeIndex !== null
      ? String(activeIndex + 1).padStart(2, "0")
      : "01";

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? certificates.length - 1 : current - 1;
    });
  }, [certificates.length]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === certificates.length - 1 ? 0 : current + 1;
    });
  }, [certificates.length]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, goPrev, goNext]);

  const dialog =
    open && mounted && active
      ? createPortal(
          <div
            className={`${instrumentSerif.variable} ${syne.variable} fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6`}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} certificate`}
          >
            <button
              type="button"
              aria-label="Close certificate"
              className="absolute inset-0 bg-[#1c2430]/40 backdrop-blur-[2px]"
              onClick={close}
            />

            <div
              className="book-spread relative z-10 grid h-[min(78vh,640px)] w-full max-w-5xl grid-cols-1 overflow-hidden shadow-[0_28px_90px_-20px_rgba(28,36,48,0.55)] lg:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-8 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1c2430]/25 to-transparent lg:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#1c2430]/[0.07] to-transparent lg:block"
              />

              {/* Left page — photobooth plate */}
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#f4f5f2] p-5 sm:p-7 lg:rounded-l-[2px] lg:shadow-[inset_-18px_0_28px_-20px_rgba(28,36,48,0.12)]">
                <header className="mb-4 flex shrink-0 items-start justify-between gap-4">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                    Certificate · Plate
                  </p>
                  <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                    {folioNumber} / {String(certificates.length).padStart(2, "0")}
                  </span>
                </header>

                <div className="flex min-h-0 flex-1 items-center justify-center">
                  {active.image ? (
                    <figure className="relative w-full max-w-[300px] rotate-[-1.5deg] bg-[#fafaf7] p-3 shadow-[0_12px_40px_-16px_rgba(28,36,48,0.35)] ring-1 ring-[#1c2430]/15 sm:max-w-[340px]">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#1c2430]/5">
                        <Image
                          src={active.image}
                          alt={active.title}
                          fill
                          className="object-contain object-center"
                          quality={100}
                          sizes="(max-width: 640px) 300px, 340px"
                        />
                      </div>
                      <figcaption className="pt-3 pb-1 text-center">
                        <span className="font-[family-name:var(--font-book-display)] text-base tracking-[-0.02em] text-[#1c2430] sm:text-lg">
                          {active.title}
                        </span>
                      </figcaption>
                    </figure>
                  ) : (
                    <p className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.16em] text-[#8a9488]">
                      No plate on file
                    </p>
                  )}
                </div>
              </div>

              {/* Right page — description */}
              <aside className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#fafaf7] lg:rounded-r-[2px] lg:shadow-[inset_18px_0_28px_-20px_rgba(28,36,48,0.1)]">
                <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#1c2430]/10 px-5 py-3 lg:px-7">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                    Folio · {folioNumber}
                  </p>

                  <div className="flex shrink-0 items-center gap-2">
                    {hasMultiple && (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          className={navBtn}
                          aria-label="Previous certificate"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          className={navBtn}
                          aria-label="Next certificate"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={close}
                      className={navBtn}
                      aria-label="Close certificate"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col justify-center px-5 py-6 lg:px-7">
                  <p className="mb-3 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    Credential
                  </p>
                  <h2 className="font-[family-name:var(--font-book-display)] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.02em] text-[#1c2430]">
                    {active.title}
                  </h2>
                  <p className="mt-4 font-[family-name:var(--font-book-sans)] text-base leading-relaxed text-[#4a554c]">
                    {active.role}
                  </p>
                  <p className="mt-6 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#8a9488]">
                    {active.date}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#1c2430]/10 px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#8a9488] lg:px-7">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span>Esc close</span>
                    {hasMultiple && <span>← / → folio</span>}
                  </div>
                  <span>{folioNumber}</span>
                </div>
              </aside>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <ul className="divide-y divide-[#1c2430]/10 border-y border-[#1c2430]/10">
        {certificates.map((cert, index) => (
          <li
            key={`${cert.title}-${cert.date}-${index}`}
            className="py-5 first:pt-4 last:pb-4"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-1 gap-4">
                {cert.image ? (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group relative h-16 w-24 shrink-0 overflow-hidden border border-[#1c2430]/15 bg-[#f4f5f2]"
                    aria-label={`View ${cert.title} certificate`}
                  >
                    <Image
                      src={cert.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="96px"
                    />
                  </button>
                ) : (
                  <span className="mt-1 font-[family-name:var(--font-book-display)] text-lg italic text-[#2d4a3e]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}

                <div className="min-w-0 space-y-1">
                  <h3 className="font-[family-name:var(--font-book-sans)] text-base font-semibold tracking-[-0.01em] text-[#1c2430]">
                    {cert.title}
                  </h3>
                  <p className="font-[family-name:var(--font-book-sans)] text-sm text-[#4a554c]">
                    {cert.role}
                  </p>
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#8a9488]">
                    {cert.date}
                  </p>
                </div>
              </div>

              {cert.image && (
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="shrink-0 self-start font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#1c2430] transition-colors hover:text-[#2d4a3e]"
                >
                  <span className="border-b border-[#1c2430]/30 pb-0.5">
                    View certificate
                  </span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {dialog}
    </>
  );
}

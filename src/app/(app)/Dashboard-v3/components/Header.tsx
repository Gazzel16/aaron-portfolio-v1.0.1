"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#Home" },
  { label: "About", href: "#About" },
  { label: "Experience", href: "#Experience" },
  { label: "Skills", href: "#Skills" },
  { label: "Services", href: "#Services" },
  { label: "Projects", href: "#Projects" },
  { label: "Certificates", href: "#Certificates" },
  { label: "Contact", href: "#Contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      const offset = 120;
      let current = "Home";
      for (const link of navLinks) {
        const id = link.href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    setOpen(false);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-[#1c2430]/10 bg-[#e8ebe6]/90 shadow-[0_8px_30px_-18px_rgba(28,36,48,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-[4.5rem] max-w-6xl items-center px-4 sm:px-6 lg:justify-between lg:gap-4 lg:px-8">
        <a
          href="#Home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#Home");
          }}
          className="absolute left-1/2 z-10 -translate-x-1/2 font-[family-name:var(--font-book-display)] text-xl tracking-[-0.02em] text-[#1c2430] transition-opacity hover:opacity-70 sm:text-[1.35rem] lg:static lg:translate-x-0"
        >
          Aaron Mercado
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className={`font-[family-name:var(--font-book-sans)] text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                active === link.href.slice(1)
                  ? "text-[#2d4a3e]"
                  : "text-[#5c6b5e] hover:text-[#1c2430]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-[family-name:var(--font-book-sans)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4f5f2] transition-colors sm:inline-flex"
          >
            <span className="border border-[#1c2430] bg-[#1c2430] px-3.5 py-2 transition-colors hover:bg-[#2d4a3e] hover:border-[#2d4a3e]">
              Resume
            </span>
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-[#1c2430] transition-transform duration-300 ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-[#1c2430] transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-[#1c2430] transition-transform duration-300 ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-[#1c2430]/10 bg-[#e8ebe6]/98 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className={`font-[family-name:var(--font-book-sans)] px-2 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-colors ${
                active === link.href.slice(1)
                  ? "text-[#2d4a3e]"
                  : "text-[#4a554c]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit font-[family-name:var(--font-book-sans)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4f5f2]"
          >
            <span className="border border-[#1c2430] bg-[#1c2430] px-3.5 py-2.5">
              Resume
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}

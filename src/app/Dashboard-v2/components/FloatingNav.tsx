"use client";
import { Compass } from "lucide-react";

const navLinks = [
  { name: "About", id: "about" },
  { name: "Education", id: "education" },
  { name: "Work", id: "work" },
  { name: "Stacks", id: "stacks" },
  { name: "Projects", id: "projects" },
  { name: "Certificates", id: "certs" },
];

export default function FloatingNav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-6 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 z-50">
      <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 p-1.5 px-4 shadow-lg backdrop-blur-md ring-1 ring-zinc-950/5">
        
        {/* Navigation Label / Icon */}
        <div className="flex items-center gap-2 border-r border-zinc-200 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100">
            <Compass className="h-4 w-4 text-zinc-500 animate-spin-slow" />
          </div>
          <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Menu
          </span>
        </div>

        {/* Links Area */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="group relative px-3 py-1.5 transition-all"
            >
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-tight text-zinc-500 transition-colors group-hover:text-zinc-900 md:text-xs">
                {link.name}
              </span>
              
              {/* Hover Background Pill - Subtle Gray */}
              <div className="absolute inset-0 scale-90 rounded-full bg-zinc-100 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
              
              {/* Active-style Dot */}
              <div className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-zinc-400 opacity-0 transition-all group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {/* Status indicator - Grayscale version */}
        <div className="hidden sm:flex items-center gap-2 border-l border-zinc-200 pl-3">
           <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
           <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">System Ready</span>
        </div>
      </div>
    </nav>
  );
}
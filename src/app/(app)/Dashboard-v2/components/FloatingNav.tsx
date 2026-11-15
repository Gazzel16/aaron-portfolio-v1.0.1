"use client";
import { Compass } from "lucide-react";

const navLinks = [
  { name: "About", id: "about" },
  { name: "Education", id: "education" },
  { name: "Work", id: "work" },
  { name: "Stacks", id: "stacks" },
  { name: "Projects", id: "projects" },
  { name: "Certs", id: "certs" },
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
    <nav className="fixed top-6 right-4 md:right-10 z-50 group">
      {/* - Changed w-12 to a base width
          - Mobile: group-hover:w-[calc(100vw-2rem)] (stretches to screen width)
          - Desktop: group-hover:max-w-3xl
      */}
      <div className="flex items-center overflow-hidden rounded-full border border-zinc-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out w-11 group-hover:w-[calc(100vw-2.5rem)] md:group-hover:w-max md:group-hover:max-w-4xl ring-1 ring-zinc-950/5">
        
        {/* Icon (Always Visible) */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100">
          <Compass className="h-4 w-4 text-zinc-500 animate-spin-slow" />
        </div>

        {/* Expandable Content Area */}
        <div className="flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap overflow-x-auto no-scrollbar">
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-r border-zinc-200 pr-3 mr-2 ml-3 shrink-0">
            Menu
          </span>

          {/* Links - Added shrink-0 to buttons to keep them on one line */}
          <div className="flex items-center gap-1 shrink-0">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group/btn relative px-2.5 py-1.5 transition-all shrink-0"
              >
                <span className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-tight text-zinc-500 transition-colors group-hover/btn:text-zinc-900">
                  {link.name}
                </span>
                <div className="absolute inset-0 scale-90 rounded-full bg-zinc-100 opacity-0 transition-all group-hover/btn:scale-100 group-hover/btn:opacity-100" />
              </button>
            ))}
          </div>

          {/* Status - Fixed Responsive Behavior */}
          <div className="flex items-center gap-2 border-l border-zinc-200 pl-3 ml-2 pr-2 shrink-0">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0" />
             <span className="text-[10px] font-bold text-zinc-400 uppercase whitespace-nowrap">
               Ready
             </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
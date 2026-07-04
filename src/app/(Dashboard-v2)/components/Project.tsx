"use client";

import GlassGradientBackground from "@/components/common/GlassGradientBackground";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

interface ProjectProps {
  proj: {
    title?: string;
    status?: string;
    image?: string[];
    video?: string | string[];
    description?: string;
    stacks?: string[];
    links?: { label: string; href: string }[];
    logo?: string;
    isFeatured?: boolean;
    hasBackground?: boolean;
    hasImage?: boolean;
  };
}

export default function Project({ proj }: ProjectProps) {
  const [expanded, setExpanded] = useState(false);

  const {
    title,
    status,
    description,
    stacks,
    image = [],
    links = [],
    logo,
    hasBackground,
  } = proj;

  const isDark = hasBackground === true;
  const previewSrc = logo ?? image[0];

  const cardClass = isDark
    ? "relative flex flex-col h-full border border-white/10 bg-zinc-950/40 backdrop-blur-xl ring-1 ring-white/5 hover:scale-[1.02] transition duration-200 rounded-xl overflow-hidden"
    : "flex flex-col h-full border border-zinc-200 bg-white hover:scale-[1.02] transition duration-200 rounded-xl overflow-hidden";
  const titleClass = isDark
    ? "text-sm font-medium leading-snug text-zinc-100"
    : "text-sm font-medium leading-snug text-zinc-800";
  const descriptionClass = isDark
    ? "text-sm leading-relaxed text-zinc-300"
    : "text-sm leading-relaxed text-zinc-600";
  const previewClass = isDark
    ? "h-14 w-14 shrink-0 rounded-xl border border-white/10 bg-white shadow-sm"
    : "h-14 w-14 shrink-0 rounded-xl border border-zinc-200 bg-white shadow-sm";
  const stackClass = isDark
    ? "rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-sm text-zinc-200"
    : "rounded-lg border border-zinc-200 bg-white px-3 py-1 font-mono text-sm text-zinc-700";
  const linkClass = isDark
    ? "font-mono text-xs uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-200"
    : "font-mono text-xs uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600";
  const expandButtonClass = isDark
    ? "mt-1 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-200"
    : "mt-1 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-600";

  return (
    <div className="group h-full flex flex-col m-2">
      <Card className={cardClass}>
        {isDark && <GlassGradientBackground variant="dark" />}

        <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-4 pb-2">
          {previewSrc && (
            <img
              src={previewSrc}
              alt={logo ? `${title} logo` : title}
              className={`${previewClass} ${logo ? "object-contain p-2" : "object-cover"}`}
            />
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h3 className={titleClass}>{title}</h3>
            {status && (
              <p className="font-mono text-xs lowercase text-zinc-400">
                {status}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative z-10 p-4 pt-0 flex flex-col flex-1 gap-2">
          <div>
            <p
              className={`${descriptionClass} transition-all duration-200 ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {description}
            </p>

            {description && description.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={expandButtonClass}
              >
                {expanded ? "show less" : "show more"}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {stacks?.map((tech, index) => (
              <span key={index} className={stackClass}>
                {tech}
              </span>
            ))}
          </div>

          {links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-3">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  className={linkClass}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

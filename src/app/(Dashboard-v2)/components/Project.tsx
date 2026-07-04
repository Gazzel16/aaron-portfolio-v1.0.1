"use client";

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
  } = proj;

  const previewSrc = logo ?? image[0];

  return (
    <div className="group h-full flex flex-col m-2">
      <Card className="flex flex-col h-full border border-zinc-200 bg-white hover:scale-[1.02] transition duration-200 rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-start gap-3 p-4 pb-2">
          {previewSrc && (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm">
              <img
                src={previewSrc}
                alt={logo ? `${title} logo` : title}
                className={`h-full w-full ${logo ? "object-contain p-2" : "object-cover"}`}
              />
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h3 className="text-sm font-medium leading-snug text-zinc-800">
              {title}
            </h3>
            {status && (
              <p className="font-mono text-xs lowercase text-zinc-400">
                {status}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-2">
          <div>
            <p
              className={`text-sm leading-relaxed text-zinc-600 transition-all duration-200 ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {description}
            </p>

            {description && description.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-1 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-600"
              >
                {expanded ? "show less" : "show more"}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {stacks?.map((tech, index) => (
              <span
                key={index}
                className="rounded-lg border border-zinc-200 bg-white px-3 py-1 font-mono text-sm text-zinc-700"
              >
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
                  className="font-mono text-xs uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
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

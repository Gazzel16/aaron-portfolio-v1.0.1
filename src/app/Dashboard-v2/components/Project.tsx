"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, Play } from "lucide-react";
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
    video = [],
    links = [],
  } = proj;

  const videoArray = Array.isArray(video) ? video : [video].filter(Boolean);

  const allMedia = [
    ...videoArray.map((src) => ({ type: "video", src })),
    ...image.map((src) => ({ type: "image", src })),
  ];

  return (
    <div className="group h-full flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          {/* ✅ SIMPLE CARD */}
          <Card className="flex flex-col h-full border border-zinc-200 bg-white hover:scale-[1.02] transition duration-200 rounded-xl overflow-hidden cursor-pointer">
            {/* 🔹 SIMPLE IMAGE PREVIEW */}
            {image[0] && (
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-100">
                <img
                  src={image[0]}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-zinc-900">
                  {title}
                </CardTitle>

                {status && (
                  <span
                    className={`text-[10px] px-2 py-1 rounded-md font-medium ${
                      status.toLowerCase().includes("side")
                        ? "bg-blue-50 text-blue-600"
                        : status.toLowerCase().includes("personal")
                          ? "bg-zinc-100 text-zinc-600"
                          : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {status}
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-2">
              <div>
                <p
                  className={`text-xs text-zinc-500 leading-relaxed transition-all duration-200 ${
                    expanded ? "" : "line-clamp-2"
                  }`}
                >
                  {description}
                </p>

                {description && description.length > 120 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // ❗ prevent dialog opening
                      setExpanded(!expanded);
                    }}
                    className="text-[11px] text-blue-500 mt-1 hover:underline"
                  >
                    {expanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>

              {/* 🔹 STACKS */}
              <div className="flex flex-wrap gap-1 pt-1">
                {stacks?.map((tech, index) => (
                  <span
                    key={index}
                    className="text-[10px] px-2 py-[2px] rounded-md bg-zinc-100 text-zinc-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* 🔹 LINK */}
              {links.length > 0 && (
                <Link
                  href={links[0].href}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-blue-500 mt-2"
                >
                  {links[0].label}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>

        {/* 🔥 YOUR ORIGINAL DIALOG (UNCHANGED) */}
        <DialogContent className="max-w-[90vw] md:max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>{title} Media Gallery</DialogTitle>
          </DialogHeader>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {allMedia.map((media, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  {media.type === "video" ? (
                    <video
                      src={media.src as string}
                      controls
                      className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
                    />
                  ) : (
                    <img
                      src={media.src as string}
                      alt={title}
                      className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>

            {allMedia.length > 1 && (
              <>
                <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 bg-white/20 text-white hover:bg-white/40 border-none" />
                <CarouselNext className="hidden md:flex -right-12 h-12 w-12 bg-white/20 text-white hover:bg-white/40 border-none" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}

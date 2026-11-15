"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Instrument_Serif, Syne } from "next/font/google";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-book-display",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-book-sans",
});

export type ProjectGalleryItem = {
  title?: string;
  status?: string;
  image?: string[];
  video?: string | string[];
  description?: string;
  stacks?: string[];
  hasImageAndVideo?: boolean;
};

type GalleryMediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

function normalizeVideos(video?: string | string[]): string[] {
  if (!video) return [];
  return Array.isArray(video) ? video : [video];
}

export function getProjectMedia(project: ProjectGalleryItem): GalleryMediaItem[] {
  const images = (project.image ?? []).map((src) => ({
    type: "image" as const,
    src,
  }));
  const videos = normalizeVideos(project.video).map((src) => ({
    type: "video" as const,
    src,
  }));
  return [...images, ...videos];
}

export function projectHasGalleryMedia(project: ProjectGalleryItem): boolean {
  return getProjectMedia(project).length > 0;
}

interface ProjectImageGalleryProps {
  projects: ProjectGalleryItem[];
  projectIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectIndexChange: (index: number) => void;
  mediaMaxWidth?: string;
  mediaMaxHeight?: string;
  variant?: "dark" | "book";
}

export default function ProjectImageGallery({
  projects,
  projectIndex,
  open,
  onOpenChange,
  onProjectIndexChange,
  mediaMaxWidth = "min(100%, 800px)",
  mediaMaxHeight = "min(55vh, 560px)",
  variant = "dark",
}: ProjectImageGalleryProps) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const isBook = variant === "book";

  const project = projects[projectIndex];
  const media = project ? getProjectMedia(project) : [];
  const hasMultipleProjects = projects.length > 1;
  const hasMultipleMedia = media.length > 1;
  const currentMedia = media[mediaIndex];

  const goToPrevMedia = useCallback(() => {
    setMediaIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  }, [media.length]);

  const goToNextMedia = useCallback(() => {
    setMediaIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  }, [media.length]);

  const goToPrevProject = useCallback(() => {
    onProjectIndexChange(
      projectIndex === 0 ? projects.length - 1 : projectIndex - 1,
    );
    setMediaIndex(0);
  }, [onProjectIndexChange, projectIndex, projects.length]);

  const goToNextProject = useCallback(() => {
    onProjectIndexChange(
      projectIndex === projects.length - 1 ? 0 : projectIndex + 1,
    );
    setMediaIndex(0);
  }, [onProjectIndexChange, projectIndex, projects.length]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        return;
      }

      if (event.shiftKey && hasMultipleProjects) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToPrevProject();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goToNextProject();
        }
        return;
      }

      if (hasMultipleMedia) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToPrevMedia();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goToNextMedia();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    open,
    hasMultipleMedia,
    hasMultipleProjects,
    goToPrevMedia,
    goToNextMedia,
    goToPrevProject,
    goToNextProject,
    onOpenChange,
  ]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setMediaIndex(0);
  }, [projectIndex]);

  if (!open || !project || media.length === 0 || !currentMedia) return null;

  const projectNumber = String(projectIndex + 1).padStart(2, "0");
  const mediaNumber = String(mediaIndex + 1).padStart(2, "0");
  const mediaTotal = String(media.length).padStart(2, "0");
  const mediaStyle = {
    maxWidth: mediaMaxWidth,
    maxHeight: mediaMaxHeight,
    width: "auto",
    height: "auto",
  };

  const navBtn = isBook
    ? "flex h-9 w-9 items-center justify-center border border-[#1c2430]/20 bg-[#fafaf7] text-[#1c2430] transition-colors hover:border-[#2d4a3e] hover:text-[#2d4a3e]"
    : "flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white";

  const mediaNavBtn = isBook
    ? "absolute z-10 flex h-10 w-10 items-center justify-center border border-[#1c2430]/15 bg-[#fafaf7]/90 text-[#1c2430] backdrop-blur-sm transition-colors hover:bg-[#fafaf7]"
    : "absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-300 transition-colors hover:bg-black/60 hover:text-white";

  const bookDialog = isBook ? (
      <div
        className={`${instrumentSerif.variable} ${syne.variable} fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6`}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} media gallery`}
      >
        <button
          type="button"
          aria-label="Close gallery"
          className="absolute inset-0 bg-[#1c2430]/40 backdrop-blur-[2px]"
          onClick={() => onOpenChange(false)}
        />

        <div
          className="book-spread relative z-10 grid h-[min(78vh,640px)] w-full max-w-6xl grid-cols-1 overflow-hidden shadow-[0_28px_90px_-20px_rgba(28,36,48,0.55)] lg:grid-cols-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-8 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1c2430]/25 to-transparent lg:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#1c2430]/[0.07] to-transparent lg:block"
          />

          {/* Left page — media */}
          <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#f4f5f2] p-4 sm:p-6 lg:rounded-l-[2px] lg:shadow-[inset_-18px_0_28px_-20px_rgba(28,36,48,0.12)]">
            <header className="mb-3 flex shrink-0 items-start justify-between gap-4">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                Gallery · Plate {mediaNumber}
              </p>
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a9488]">
                {mediaNumber} / {mediaTotal}
              </span>
            </header>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#1c2430]/[0.04]">
              {hasMultipleMedia && (
                <button
                  type="button"
                  onClick={goToPrevMedia}
                  className={cn(mediaNavBtn, "left-3")}
                  aria-label="Previous item"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <div className="flex h-full w-full items-center justify-center p-2 sm:p-4">
                {currentMedia.type === "video" ? (
                  <video
                    key={currentMedia.src}
                    src={currentMedia.src}
                    controls
                    playsInline
                    className="h-full w-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    key={currentMedia.src}
                    src={currentMedia.src}
                    alt={`${project.title} screenshot ${mediaIndex + 1}`}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>

              {hasMultipleMedia && (
                <button
                  type="button"
                  onClick={goToNextMedia}
                  className={cn(mediaNavBtn, "right-3")}
                  aria-label="Next item"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {hasMultipleMedia && (
              <div className="mt-3 flex shrink-0 gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {media.map((item, index) => (
                  <button
                    key={`${item.type}-${item.src}-${index}`}
                    type="button"
                    onClick={() => setMediaIndex(index)}
                    className={cn(
                      "relative h-12 w-16 shrink-0 overflow-hidden border bg-[#fafaf7] transition-opacity",
                      index === mediaIndex
                        ? "border-[#2d4a3e] opacity-100"
                        : "border-[#1c2430]/15 opacity-55 hover:opacity-100",
                    )}
                  >
                    {item.type === "video" ? (
                      <>
                        <video
                          src={item.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-[#1c2430]/35">
                          <Play className="h-3.5 w-3.5 fill-[#fafaf7] text-[#fafaf7]" />
                        </span>
                      </>
                    ) : (
                      <img
                        src={item.src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right page — description */}
          <aside className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#fafaf7] lg:rounded-r-[2px] lg:shadow-[inset_18px_0_28px_-20px_rgba(28,36,48,0.1)]">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#1c2430]/10 px-5 py-3 lg:px-7">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-[#5c6b5e]">
                Folio · {projectNumber}
              </p>

              <div className="flex shrink-0 items-center gap-2">
                {hasMultipleProjects && (
                  <>
                    <button
                      type="button"
                      onClick={goToPrevProject}
                      className={navBtn}
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextProject}
                      className={navBtn}
                      aria-label="Next project"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className={navBtn}
                  aria-label="Close gallery"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              key={project.title}
              className="flex min-h-0 flex-1 flex-col overflow-hidden px-5 py-5 lg:px-7"
            >
              {project.status && (
                <p className="mb-2 shrink-0 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                  {project.status}
                </p>
              )}

              <h2 className="mb-3 shrink-0 break-words font-[family-name:var(--font-book-display)] text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.12] tracking-[-0.02em] text-[#1c2430]">
                {project.title}
              </h2>

              {project.description && (
                <p className="min-h-0 flex-1 overflow-hidden break-words font-[family-name:var(--font-book-sans)] text-sm leading-[1.65] text-[#4a554c] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:8]">
                  {project.description}
                </p>
              )}

              {project.stacks && project.stacks.length > 0 && (
                <div className="mt-4 shrink-0 border-t border-[#1c2430]/10 pt-4">
                  <p className="mb-2 font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
                    Built with
                  </p>
                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {project.stacks.slice(0, 10).map((stack) => (
                      <li
                        key={stack}
                        className="flex items-center gap-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#4a554c]"
                      >
                        <span
                          aria-hidden
                          className="inline-block h-1 w-1 shrink-0 rounded-full bg-[#2d4a3e]"
                        />
                        {stack}
                      </li>
                    ))}
                    {project.stacks.length > 10 && (
                      <li className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#8a9488]">
                        +{project.stacks.length - 10}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#1c2430]/10 px-5 py-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#8a9488] lg:px-7">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span>Esc close</span>
                {hasMultipleMedia && <span>← / → plates</span>}
                {hasMultipleProjects && <span>Shift + ← / → folio</span>}
              </div>
              <span className="font-[family-name:var(--font-book-display)] text-xl italic text-[#2d4a3e]/60">
                {projectNumber}
              </span>
            </div>
          </aside>
        </div>
      </div>
  ) : null;

  const darkDialog = !isBook ? (
    <div
      className="fixed inset-0 z-[200] flex h-full flex-col bg-black font-[family-name:var(--font-geist-sans)] lg:flex-row"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} media gallery`}
    >
      <div className="flex min-h-0 min-w-0 flex-col p-4 lg:w-[58%] lg:flex-none lg:p-8">
        <div className="relative flex min-h-[38vh] flex-1 items-center justify-center overflow-hidden rounded-xl bg-zinc-950 lg:min-h-0">
          {hasMultipleMedia && (
            <button
              type="button"
              onClick={goToPrevMedia}
              className={cn(mediaNavBtn, "left-4")}
              aria-label="Previous item"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
            {currentMedia.type === "video" ? (
              <video
                key={currentMedia.src}
                src={currentMedia.src}
                controls
                playsInline
                style={mediaStyle}
                className="object-contain"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                key={currentMedia.src}
                src={currentMedia.src}
                alt={`${project.title} screenshot ${mediaIndex + 1}`}
                style={mediaStyle}
                className="object-contain"
              />
            )}
          </div>

          {hasMultipleMedia && (
            <button
              type="button"
              onClick={goToNextMedia}
              className={cn(mediaNavBtn, "right-4")}
              aria-label="Next item"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {hasMultipleMedia && (
            <div className="absolute bottom-4 right-4 rounded-md border border-zinc-700 bg-black/80 px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-xs tracking-wide text-zinc-300">
              {mediaNumber} / {mediaTotal}
            </div>
          )}
        </div>

        {hasMultipleMedia && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {media.map((item, index) => (
              <button
                key={`${item.type}-${item.src}-${index}`}
                type="button"
                onClick={() => setMediaIndex(index)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-zinc-950 transition-colors",
                  index === mediaIndex
                    ? "border-white"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play className="h-5 w-5 fill-white text-white" />
                    </span>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="flex h-full min-h-0 w-full min-w-0 flex-col border-t border-zinc-800 bg-black lg:w-[42%] lg:min-w-[360px] lg:max-w-[520px] lg:border-l lg:border-t-0">
        <div className="flex shrink-0 flex-col gap-4 border-b border-zinc-800/60 p-6 pb-4 lg:p-8 lg:pb-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.2em] text-zinc-400">
              Project • {projectNumber}
            </p>

            <div className="flex shrink-0 items-center gap-2">
              {hasMultipleProjects && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevProject}
                    className={navBtn}
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextProject}
                    className={navBtn}
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={navBtn}
                aria-label="Close gallery"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <h2 className="break-words text-2xl font-semibold leading-tight tracking-tight text-white lg:text-3xl">
            {project.title}
          </h2>
        </div>

        <div
          key={project.title}
          className="min-h-[140px] flex-1 overflow-y-auto px-6 py-4 lg:px-8"
        >
          {project.description && (
            <p className="mb-6 break-words text-sm leading-relaxed text-zinc-400">
              {project.description}
            </p>
          )}

          {project.stacks && project.stacks.length > 0 && (
            <div className="mb-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
                Built with
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stacks.map((stack) => (
                  <span
                    key={stack}
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-1 font-mono text-sm text-zinc-700"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 border-t border-zinc-800/60 px-6 py-4 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-zinc-500 lg:px-8">
          <span>Esc close</span>
          {hasMultipleMedia && <span>← / → gallery</span>}
          {hasMultipleProjects && <span>Shift + ← / → project</span>}
        </div>
      </aside>
    </div>
  ) : null;

  if (typeof document === "undefined") return null;

  return createPortal(isBook ? bookDialog : darkDialog, document.body);
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export default function ProjectImageGallery({
  projects,
  projectIndex,
  open,
  onOpenChange,
  onProjectIndexChange,
  mediaMaxWidth = "min(100%, 800px)",
  mediaMaxHeight = "min(55vh, 560px)",
}: ProjectImageGalleryProps) {
  const [mediaIndex, setMediaIndex] = useState(0);

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
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
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

  return (
    <div
      className="fixed inset-0 z-[100] flex h-full flex-col bg-[#0a0a0a] font-[family-name:var(--font-geist-sans)] lg:flex-row"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} media gallery`}
    >
      <div className="flex min-h-0 min-w-0 flex-col p-4 lg:w-[58%] lg:flex-none lg:p-8">
        <div className="relative flex min-h-[38vh] flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#111111] lg:min-h-0">
          {hasMultipleMedia && (
            <button
              type="button"
              onClick={goToPrevMedia}
              className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-300 transition-colors hover:bg-black/60 hover:text-white"
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
              className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-300 transition-colors hover:bg-black/60 hover:text-white"
              aria-label="Next item"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {hasMultipleMedia && (
            <div className="absolute bottom-4 right-4 rounded-md border border-emerald-500/30 bg-black/70 px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-xs tracking-wide text-emerald-400">
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
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-[#111111] transition-colors",
                  index === mediaIndex
                    ? "border-red-500"
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

      <aside className="flex h-full min-h-0 w-full min-w-0 flex-col border-t border-zinc-800 bg-[#0a0a0a] lg:w-[42%] lg:min-w-[360px] lg:max-w-[520px] lg:border-l lg:border-t-0">
        <div className="flex shrink-0 flex-col gap-4 border-b border-zinc-800/60 p-6 pb-4 lg:p-8 lg:pb-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.2em] text-red-400">
              Project • {projectNumber}
            </p>

            <div className="flex shrink-0 items-center gap-2">
              {hasMultipleProjects && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevProject}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextProject}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
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
              <p className="mb-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.25em] text-emerald-500/80">
                Built with
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stacks.map((stack) => (
                  <span
                    key={stack}
                    className="rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 font-[family-name:var(--font-geist-mono)] text-xs text-emerald-400"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 border-t border-zinc-800/60 px-6 py-4 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-emerald-600/70 lg:px-8">
          <span>Esc close</span>
          {hasMultipleMedia && <span>← / → gallery</span>}
          {hasMultipleProjects && <span>Shift + ← / → project</span>}
        </div>
      </aside>
    </div>
  );
}

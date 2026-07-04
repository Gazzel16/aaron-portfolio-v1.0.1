"use client";

import { useMemo, useState } from "react";
import Project from "@/app/(Dashboard-v2)/components/Project";
import ProjectImageGallery, {
  projectHasGalleryMedia,
  type ProjectGalleryItem,
} from "@/components/common/ProjectImageGallery";

interface ProjectListProps {
  items: ProjectGalleryItem[];
  layout?: "list" | "grid";
  mediaMaxWidth?: string;
  mediaMaxHeight?: string;
}

const DEFAULT_MEDIA_MAX_WIDTH = "min(100%, 800px)";
const DEFAULT_MEDIA_MAX_HEIGHT = "min(55vh, 560px)";

export default function ProjectList({
  items,
  layout = "list",
  mediaMaxWidth = DEFAULT_MEDIA_MAX_WIDTH,
  mediaMaxHeight = DEFAULT_MEDIA_MAX_HEIGHT,
}: ProjectListProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryProjectIndex, setGalleryProjectIndex] = useState(0);

  const galleryProjects = useMemo(
    () => items.filter(projectHasGalleryMedia),
    [items],
  );

  const openGallery = (project: ProjectGalleryItem) => {
    const index = galleryProjects.findIndex(
      (item) => item.title === project.title,
    );
    if (index === -1) return;
    setGalleryProjectIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 items-start gap-2 sm:grid-cols-2"
            : "flex flex-col"
        }
      >
        {items.map((item, index) => (
          <Project
            key={index}
            proj={item}
            onViewImages={() => openGallery(item)}
          />
        ))}
      </div>

      <ProjectImageGallery
        projects={galleryProjects}
        projectIndex={galleryProjectIndex}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        onProjectIndexChange={setGalleryProjectIndex}
        mediaMaxWidth={mediaMaxWidth}
        mediaMaxHeight={mediaMaxHeight}
      />
    </>
  );
}

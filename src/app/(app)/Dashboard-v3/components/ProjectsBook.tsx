"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProjectImageGallery, {
  projectHasGalleryMedia,
  type ProjectGalleryItem,
} from "@/components/common/ProjectImageGallery";
import NdaDialog from "@/app/(app)/Dashboard-v2/components/NdaDialog";

type ProjectFilter =
  | "all"
  | "company"
  | "comission"
  | "personal"
  | "contract"
  | "capstone";

type ProjectItem = ProjectGalleryItem & {
  logo?: string;
  links?: { label: string; href: string }[];
  isCompanyProject?: boolean;
  isComissionProject?: boolean;
  isPersonalProject?: boolean;
  isContractProject?: boolean;
  isCapstoneProject?: boolean;
  isFeatured?: boolean;
};

type ProjectsBookProps = {
  projects: ProjectItem[];
};

const FILTER_TABS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "all" },
  { id: "company", label: "company" },
  { id: "comission", label: "comission" },
  { id: "personal", label: "personal" },
  { id: "contract", label: "contract" },
  { id: "capstone", label: "capstone" },
];

const FILTER_FLAG: Record<
  Exclude<ProjectFilter, "all">,
  keyof Pick<
    ProjectItem,
    | "isCompanyProject"
    | "isComissionProject"
    | "isPersonalProject"
    | "isContractProject"
    | "isCapstoneProject"
  >
> = {
  company: "isCompanyProject",
  comission: "isComissionProject",
  personal: "isPersonalProject",
  contract: "isContractProject",
  capstone: "isCapstoneProject",
};

function matchesFilter(project: ProjectItem, filter: ProjectFilter): boolean {
  if (filter === "all") return true;
  return project[FILTER_FLAG[filter]] === true;
}

function projectKey(project: ProjectItem, index: number) {
  return `${project.title ?? "project"}::${project.status ?? ""}::${index}`;
}

function isSameProject(a: ProjectItem, b: ProjectItem) {
  return a.title === b.title && a.status === b.status;
}

function ProjectDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(true);
  const canToggle = text.length > 120;

  return (
    <div>
      <p
        className={`font-[family-name:var(--font-book-sans)] text-sm leading-relaxed text-[#4a554c] transition-[max-height] duration-200 ${
          expanded || !canToggle ? "" : "line-clamp-2"
        }`}
      >
        {text}
      </p>
      {canToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#2d4a3e] transition-opacity hover:opacity-70"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}

export default function ProjectsBook({ projects }: ProjectsBookProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryProjectIndex, setGalleryProjectIndex] = useState(0);
  const [ndaOpen, setNdaOpen] = useState(false);
  const [ndaTitle, setNdaTitle] = useState<string | undefined>();

  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [projects, activeFilter],
  );

  const galleryProjects = useMemo(
    () => filteredProjects.filter(projectHasGalleryMedia),
    [filteredProjects],
  );

  const openGallery = (project: ProjectItem) => {
    const index = galleryProjects.findIndex((item) =>
      isSameProject(item, project),
    );
    if (index === -1) return;
    setGalleryProjectIndex(index);
    setGalleryOpen(true);
  };

  const openNda = (title?: string) => {
    setNdaTitle(title);
    setNdaOpen(true);
  };

  return (
    <div className="space-y-5">
      <div
        role="tablist"
        aria-label="Project filters"
        className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[#1c2430]/10 pb-4"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === tab.id}
            onClick={() => {
              setActiveFilter(tab.id);
              setGalleryOpen(false);
            }}
            className={`font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] transition-colors ${
              activeFilter === tab.id
                ? "text-[#2d4a3e]"
                : "text-[#8a9488] hover:text-[#1c2430]"
            }`}
          >
            <span
              className={`pb-0.5 ${
                activeFilter === tab.id
                  ? "border-b border-[#2d4a3e]"
                  : "border-b border-transparent"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#8a9488]">
          No projects in this category yet.
        </p>
      ) : (
      <ul className="divide-y divide-[#1c2430]/10 border-y border-[#1c2430]/10">
        {filteredProjects.map((project, index) => {
          const hasGallery = projectHasGalleryMedia(project);
          const stacks = project.stacks ?? [];
          const visibleStacks = stacks.slice(0, 4);
          const extraStacks = Math.max(stacks.length - visibleStacks.length, 0);

          return (
            <li key={projectKey(project, index)} className="py-5 first:pt-4 last:pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 gap-4">
                  {project.logo ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#1c2430]/10 bg-white p-1.5">
                      <img
                        src={project.logo}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <span className="mt-1 font-[family-name:var(--font-book-display)] text-lg italic text-[#2d4a3e]/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}

                  <div className="min-w-0 space-y-2">
                    <div>
                      <h3 className="font-[family-name:var(--font-book-sans)] text-base font-semibold tracking-[-0.01em] text-[#1c2430]">
                        {project.title}
                      </h3>
                      {project.status && (
                        <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#8a9488]">
                          {project.status}
                          {project.isCompanyProject ? " · NDA" : ""}
                        </p>
                      )}
                    </div>

                    {project.description && (
                      <ProjectDescription text={project.description} />
                    )}

                    {visibleStacks.length > 0 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {visibleStacks.map((stack) => (
                          <span
                            key={stack}
                            className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#5c6b5e]"
                          >
                            {stack}
                          </span>
                        ))}
                        {extraStacks > 0 && (
                          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#8a9488]">
                            +{extraStacks}
                          </span>
                        )}
                      </div>
                    )}

                    {project.links && project.links.length > 0 && (
                      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                        {project.links.map((link) =>
                          project.isCompanyProject ? (
                            <button
                              key={link.href + link.label}
                              type="button"
                              onClick={() => openNda(project.title)}
                              className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                            >
                              {link.label} →
                            </button>
                          ) : (
                            <Link
                              key={link.href + link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#2d4a3e] transition-opacity hover:opacity-70"
                            >
                              {link.label} →
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {hasGallery && (
                  <button
                    type="button"
                    onClick={() => openGallery(project)}
                    className="shrink-0 self-start font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#1c2430] transition-colors hover:text-[#2d4a3e]"
                  >
                    <span className="border-b border-[#1c2430]/30 pb-0.5">
                      View gallery
                    </span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      )}

      <ProjectImageGallery
        projects={galleryProjects}
        projectIndex={galleryProjectIndex}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        onProjectIndexChange={setGalleryProjectIndex}
        variant="book"
      />

      <NdaDialog
        open={ndaOpen}
        onOpenChange={setNdaOpen}
        projectTitle={ndaTitle}
      />
    </div>
  );
}

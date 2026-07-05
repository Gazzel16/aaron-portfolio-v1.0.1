"use client";

import { useMemo, useState } from "react";
import ProjectList from "@/app/(Dashboard-v2)/components/ProjectList";
import { cn } from "@/lib/utils";

type ProjectFilter =
  | "all"
  | "company"
  | "comission"
  | "personal"
  | "contract"
  | "capstone";

type ProjectFilterItem = {
  title?: string;
  isCompanyProject?: boolean;
  isComissionProject?: boolean;
  isPersonalProject?: boolean;
  isContractProject?: boolean;
  isCapstoneProject?: boolean;
  [key: string]: unknown;
};

const TABS: { id: ProjectFilter; label: string }[] = [
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
    ProjectFilterItem,
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

function matchesFilter(
  project: ProjectFilterItem,
  filter: ProjectFilter,
): boolean {
  if (filter === "all") return true;
  return project[FILTER_FLAG[filter]] === true;
}

interface ProjectPageContentProps {
  items: ProjectFilterItem[];
}

export default function ProjectPageContent({ items }: ProjectPageContentProps) {
  const [activeTab, setActiveTab] = useState<ProjectFilter>("all");

  const filteredItems = useMemo(
    () => items.filter((item) => matchesFilter(item, activeTab)),
    [items, activeTab],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-md px-3 py-1.5 font-mono text-xs lowercase tracking-wide transition-colors",
              activeTab === tab.id
                ? "bg-zinc-900 text-white"
                : "text-zinc-400 hover:text-zinc-600",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <ProjectList items={filteredItems} layout="grid" />
      ) : (
        <p className="font-mono text-sm lowercase text-zinc-400">
          no projects in this category yet.
        </p>
      )}
    </div>
  );
}

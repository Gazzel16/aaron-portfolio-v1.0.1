"use client";

import { useEffect, useState } from "react";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionResponse = {
  year: number;
  years: number[];
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
};

const BOOK_SCALE = [
  "#e4e7e2",
  "#c5cbc3",
  "#8a9488",
  "#5c6b5e",
  "#2d4a3e",
];

function getBookColor(count: number) {
  if (count === 0) return BOOK_SCALE[0];
  if (count <= 2) return BOOK_SCALE[1];
  if (count <= 5) return BOOK_SCALE[2];
  if (count <= 9) return BOOK_SCALE[3];
  return BOOK_SCALE[4];
}

export default function GithubContributionBook() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/github-contributions?year=${year}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error ?? "Failed to load");
        }
        return json as ContributionResponse;
      })
      .then((payload) => {
        if (!cancelled) {
          setData(payload);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load contributions",
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [year]);

  if (error && !data) {
    return (
      <p className="mt-6 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#8a9488]">
        {error}
      </p>
    );
  }

  if (!data && loading) {
    return (
      <p className="mt-6 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#8a9488]">
        Loading contributions…
      </p>
    );
  }

  if (!data) return null;

  const years = data.years.length > 0 ? data.years : [year];

  return (
    <div className="mt-8 w-full space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-[family-name:var(--font-book-sans)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a3e]">
          Commits · {data.totalContributions}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {years.map((y) => {
            const isActive = y === year;
            return (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                disabled={loading && isActive}
                className={`font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  isActive
                    ? "text-[#2d4a3e]"
                    : "text-[#8a9488] hover:text-[#1c2430]"
                }`}
              >
                <span
                  className={`pb-0.5 ${
                    isActive
                      ? "border-b border-[#2d4a3e]"
                      : "border-b border-transparent"
                  }`}
                >
                  {y}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`w-full transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}
      >
        <div className="flex w-full gap-[2px] sm:gap-[3px]">
          {data.weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="flex min-w-0 flex-1 flex-col gap-[2px] sm:gap-[3px]"
            >
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
                  className="aspect-square w-full ring-1 ring-[#1c2430]/8 sm:aspect-auto sm:h-[11px] lg:h-[12px]"
                  style={{
                    backgroundColor: getBookColor(day.contributionCount),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.14em] text-[#8a9488]">
        <span>Less</span>
        {BOOK_SCALE.map((color) => (
          <span
            key={color}
            className="inline-block h-2.5 w-2.5 ring-1 ring-[#1c2430]/10"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>

      {error ? (
        <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#8a9488]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

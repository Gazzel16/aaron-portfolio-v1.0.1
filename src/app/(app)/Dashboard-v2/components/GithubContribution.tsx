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

const GRAY_SCALE = [
  "#f4f4f5", // 0 — empty
  "#d4d4d8", // 1 — light gray
  "#a1a1aa", // 2 — gray
  "#52525b", // 3 — dark gray
  "#18181b", // 4 — black
];

function getGrayColor(count: number) {
  if (count === 0) return GRAY_SCALE[0];
  if (count <= 2) return GRAY_SCALE[1];
  if (count <= 5) return GRAY_SCALE[2];
  if (count <= 9) return GRAY_SCALE[3];
  return GRAY_SCALE[4];
}

export default function GithubContribution() {
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
    return <p className="text-sm text-zinc-500">{error}</p>;
  }

  if (!data && loading) {
    return <p className="text-sm text-zinc-500">Loading contributions…</p>;
  }

  if (!data) return null;

  const years = data.years.length > 0 ? data.years : [year];

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {years.map((y) => {
          const isActive = y === year;
          return (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              disabled={loading && isActive}
              className={`rounded-md px-2.5 py-1 font-mono text-xs tracking-wide transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
              }`}
            >
              {y}
            </button>
          );
        })}
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
                  className="aspect-square w-full rounded-[2px] ring-1 ring-black/5 sm:aspect-auto sm:h-[15px]"
                  style={{
                    backgroundColor: getGrayColor(day.contributionCount),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-wide text-zinc-400">
        <span>Less</span>
        {GRAY_SCALE.map((color) => (
          <span
            key={color}
            className="inline-block h-[11px] w-[11px] rounded-[2px] ring-1 ring-black/5"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>

      {error ? <p className="text-sm text-zinc-500">{error}</p> : null}
    </div>
  );
}

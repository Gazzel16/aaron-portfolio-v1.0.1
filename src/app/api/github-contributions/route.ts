import { NextRequest, NextResponse } from "next/server";

const query = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      createdAt
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

function buildYears(createdAt: string): number[] {
  const startYear = new Date(createdAt).getUTCFullYear();
  const currentYear = new Date().getUTCFullYear();
  const years: number[] = [];

  for (let year = currentYear; year >= startYear; year -= 1) {
    years.push(year);
  }

  return years;
}

function yearRange(year: number) {
  const from = `${year}-01-01T00:00:00.000Z`;
  const to = `${year}-12-31T23:59:59.999Z`;
  return { from, to };
}

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

/** Ensure Jan–Dec grid even when GitHub omits future days for the current year. */
function padWeeksToFullYear(
  weeks: ContributionWeek[],
  year: number,
): ContributionWeek[] {
  const padded = weeks.map((week) => ({
    contributionDays: [...week.contributionDays],
  }));

  const lastWeek = padded[padded.length - 1];
  const lastDay = lastWeek?.contributionDays[lastWeek.contributionDays.length - 1];
  if (!lastDay) return padded;

  let cursor = new Date(`${lastDay.date}T00:00:00.000Z`);
  const end = new Date(`${year}-12-31T00:00:00.000Z`);

  while (cursor < end) {
    cursor = new Date(cursor);
    cursor.setUTCDate(cursor.getUTCDate() + 1);

    const date = cursor.toISOString().slice(0, 10);
    const emptyDay: ContributionDay = {
      date,
      contributionCount: 0,
      color: "#ebedf0",
    };

    const activeWeek = padded[padded.length - 1];
    if (activeWeek.contributionDays.length < 7) {
      activeWeek.contributionDays.push(emptyDay);
    } else {
      padded.push({ contributionDays: [emptyDay] });
    }
  }

  return padded;
}

export async function GET(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? "Gazzel16";
  const currentYear = new Date().getUTCFullYear();
  const yearParam = request.nextUrl.searchParams.get("year");
  const requestedYear = yearParam ? Number(yearParam) : currentYear;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not set" },
      { status: 500 },
    );
  }

  if (!Number.isInteger(requestedYear) || requestedYear < 2008) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  const { from, to } = yearRange(requestedYear);

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { login: username, from, to },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: res.status },
    );
  }

  const json = await res.json();

  if (json.errors?.length) {
    return NextResponse.json(
      { error: json.errors[0]?.message ?? "GitHub GraphQL error" },
      { status: 502 },
    );
  }

  const user = json.data?.user;
  const calendar = user?.contributionsCollection?.contributionCalendar;

  if (!user || !calendar) {
    return NextResponse.json(
      { error: "User or contributions not found" },
      { status: 404 },
    );
  }

  const years = buildYears(user.createdAt);

  if (!years.includes(requestedYear)) {
    return NextResponse.json(
      { error: `No contribution data for ${requestedYear}` },
      { status: 400 },
    );
  }

  return NextResponse.json({
    year: requestedYear,
    years,
    totalContributions: calendar.totalContributions,
    weeks: padWeeksToFullYear(calendar.weeks, requestedYear),
  });
}

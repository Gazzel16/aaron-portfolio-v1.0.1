"use client";

import * as React from "react";
import { Pie, PieChart as RechartsPie, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // adjust path
import { fetchRolesRanking } from "@/store/slices/roles/role-slice"; // adjust path

const data = [
  { role: "viewer", count: 3 },
  { role: "recruiter", count: 1 },
  { role: "hr", count: 1 },
];

const chartConfig = {
  count: { label: "Users" },
  // Recruiter -> Blue
  recruiter: {
    label: "Recruiter",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  // Viewer -> Green
  viewer: {
    label: "Viewer",
    color: "hsl(142.1 76.2% 36.3%)",
  },
  // HR -> Pink
  hr: {
    label: "HR",
    color: "hsl(330 81% 60%)",
  },
} satisfies ChartConfig;

export default function RolePieChart() {
  const dispatch = useDispatch<AppDispatch>();
  const { roleRankings, loading, error } = useSelector(
    (state: RootState) => state.roles,
  );

  useEffect(() => {
    dispatch(fetchRolesRanking());
  }, [dispatch]);

  // Transform API data for Recharts
  const chartData =
    roleRankings?.map((item) => ({
      role: item.role.toLowerCase(), // ensure role matches your color mapping
      count: item.count,
      fill: `var(--color-${item.role.toLowerCase()})`,
    })) || [];

  return (
    <Card className="flex flex-col border-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Role Distribution</CardTitle>
        <CardDescription>Current User Split</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartsPie>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="role"
              innerRadius={60}
              strokeWidth={8}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </RechartsPie>
        </ChartContainer>
      </CardContent>

      {/* Legend with custom colors */}
      <div className="flex flex-row justify-center gap-4 pb-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-600" />
          <span>Recruiters</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-600" />
          <span>Viewers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-pink-500" />
          <span>HR</span>
        </div>
      </div>
    </Card>
  );
}

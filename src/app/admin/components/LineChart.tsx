"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { RootState, AppDispatch } from "@/store/store";
import { fetchRolesCountByDate } from "@/store/slices/roles/role-slice";

const chartConfig = {
  count: {
    label: "Total Roles",
    color: "#4F46E5", // Using a solid indigo for better visibility
  },
} satisfies ChartConfig;

export default function LineChart() {
  const dispatch = useDispatch<AppDispatch>();

  const { roleCountsByDate } = useSelector(
    (state: RootState) => state.roles
  );

  useEffect(() => {
    dispatch(fetchRolesCountByDate());
  }, [dispatch]);

  // Handle empty state gracefully so we don't get the "floating dot"
  if (!roleCountsByDate || roleCountsByDate.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400 italic text-sm">
        No data available for the selected period.
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={roleCountsByDate}
          margin={{ top: 10, left: -20, right: 10, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tickMargin={12}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
          />
          <ChartTooltip
            cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Line
            dataKey="count"
            type="monotone" // 'monotone' is often cleaner than 'natural' for single dots
            stroke="var(--color-count)"
            strokeWidth={3}
            dot={{ fill: "var(--color-count)", r: 4, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
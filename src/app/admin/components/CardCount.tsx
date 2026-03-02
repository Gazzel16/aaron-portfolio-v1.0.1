"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "@/store/slices/roles/role-slice"; 
import { RootState, AppDispatch } from "@/store/store";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"; // Standard shadcn paths
import { Users, UserCheck, Eye, Briefcase } from "lucide-react";

export default function CardCount() {
  const dispatch = useDispatch<AppDispatch>();
  const { roles, loading } = useSelector((state: RootState) => state.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // Derive counts locally from state
  const stats = [
    {
      title: "HR",
      value: roles.filter((r) => r.role === "hr").length,
      icon: <Briefcase className="h-4 w-4 text-blue-600" />,
      description: "Internal management",
    },
    {
      title: "Recruiters",
      value: roles.filter((r) => r.role === "recruiter").length,
      icon: <UserCheck className="h-4 w-4 text-emerald-600" />,
      description: "Active hiring",
    },
    {
      title: "Viewers",
      value: roles.filter((r) => r.role === "viewer").length,
      icon: <Eye className="h-4 w-4 text-purple-600" />,
      description: "Read-only access",
    },
  ];

  return (
    // Changed: Removed p-8 and added w-full to ensure it spans the whole screen
    <div className="w-full space-y-4">

      {/* Changed: Use grid-cols-3 so each card takes exactly 1/3 of the full width */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 w-full">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm border-slate-200 w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
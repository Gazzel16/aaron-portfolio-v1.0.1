"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, UserSearch, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store"; // adjust path
import { createRole } from "@/store/slices/roles/role-slice"; // adjust path

interface RoleDialogProps {
  selected: string | null;
  onSelect: (id: string) => void;
  onConfirm: (name: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function RoleDialog({
  selected,
  onSelect,
  onConfirm,
  open,
  setOpen,
}: RoleDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.roles);
  const [name, setName] = useState("");

  const roles = [
    { id: "HR", label: "HR", icon: Briefcase },
    { id: "Recruiter", label: "Recruiter", icon: UserSearch },
    { id: "Viewer", label: "Viewer", icon: Eye },
  ];

  const handleConfirm = async () => {
    if (!selected || name.trim().length < 2) return;

    try {
      await dispatch(
        createRole({ name: name.trim(), role: selected.toLowerCase() }),
      ).unwrap();
      setOpen(false);
      setName("");
    } catch (err) {
      console.error("Failed to create role:", err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[450px] [&>button]:hidden" // Hides the default X button
        onPointerDownOutside={(e) => e.preventDefault()} // Prevents clicking outside to close
        onEscapeKeyDown={(e) => e.preventDefault()} // Prevents ESC key from closing
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Welcome!
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            Please set up your profile to continue.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-4">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-primary">
              1. Choose Role
            </Label>
            <div className="grid gap-2">
              {roles.map((role) => (
                <Button
                  key={role.id}
                  variant="outline"
                  type="button"
                  onClick={() => onSelect(role.id)}
                  className={cn(
                    "h-12 justify-start gap-3 px-4 transition-all duration-200",
                    selected === role.id
                      ? "border-primary bg-primary/10 ring-1 ring-primary shadow-sm"
                      : "hover:bg-accent",
                  )}
                >
                  <role.icon
                    className={cn(
                      "h-4 w-4",
                      selected === role.id
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  />
                  <span className={selected === role.id ? "font-semibold" : ""}>
                    {role.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div
            className={cn(
              "space-y-3 transition-all duration-500",
              !selected
                ? "opacity-30 pointer-events-none grayscale"
                : "opacity-100",
            )}
          >
            <Label
              htmlFor="name"
              className="text-[10px] uppercase tracking-widest font-bold text-primary"
            >
              2. Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 focus-visible:ring-primary"
              autoComplete="off"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full h-11 text-md font-medium"
            disabled={!selected || name.trim().length < 2 || loading}
            onClick={handleConfirm}
          >
            {loading ? "Creating..." : "Get Started"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

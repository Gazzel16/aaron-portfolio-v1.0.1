"use client"

import React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Briefcase, UserSearch, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoleDialogProps {
  selected: string | null
  onSelect: (id: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export default function RoleDialog({ selected, onSelect, open, setOpen }: RoleDialogProps) {
  const roles = [
    { id: "HR", label: "HR", icon: Briefcase },
    { id: "Recruiter", label: "Recruiter", icon: UserSearch },
    { id: "Viewer", label: "Viewer", icon: Eye },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="sm:max-w-[350px]" 
        // Prevents closing by clicking outside if no role is selected
        onPointerDownOutside={(e) => !selected && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Who are you?</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant="outline"
              onClick={() => onSelect(role.id)}
              className={cn(
                "h-14 justify-start gap-4 px-4 text-lg transition-all",
                selected === role.id && "border-primary bg-primary/5 ring-1 ring-primary"
              )}
            >
              <role.icon className={cn(
                "h-5 w-5", 
                selected === role.id ? "text-primary" : "text-muted-foreground"
              )} />
              {role.label}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button 
            className="w-full" 
            disabled={!selected} 
            onClick={() => setOpen(false)}
          >
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
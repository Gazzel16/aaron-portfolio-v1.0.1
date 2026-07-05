"use client";

import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NdaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle?: string;
}

export default function NdaDialog({
  open,
  onOpenChange,
  projectTitle,
}: NdaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-zinc-500" />
            <DialogTitle>Confidential Project</DialogTitle>
          </div>
          <DialogDescription className="text-left text-sm leading-relaxed text-zinc-600">
            {projectTitle ? (
              <>
                <span className="font-medium text-zinc-800">{projectTitle}</span>{" "}
                is covered by a non-disclosure agreement. Live demos, source code,
                and detailed project information cannot be shared publicly.
              </>
            ) : (
              <>
                This project is covered by a non-disclosure agreement. Live demos,
                source code, and detailed project information cannot be shared
                publicly.
              </>
            )}{" "}
            I am happy to discuss the general scope of my responsibilities and
            the technical skills I applied during an interview or direct
            conversation.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Understood
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

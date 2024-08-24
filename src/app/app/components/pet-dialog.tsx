"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

function PetDialog({
  children,
  formText,
  formAction,
}: {
  children: React.ReactNode;
  formText: string;
  formAction: "add" | "edit";
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formText}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <PetForm
          buttonText={formText}
          actionType={formAction}
          onFormSubmission={() => {
            flushSync(() => {
              setIsOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PetDialog;

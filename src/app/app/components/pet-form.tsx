"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PET_DEFAULT_IMAGE } from "@/lib/constants";
import {
  petFormSchema,
  PetFormType,
} from "@/lib/validation/pet-form-validation";
import { usePetStore } from "@/store/pet-store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PetFormProps = {
  buttonText: string;
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

function PetForm({ buttonText, actionType, onFormSubmission }: PetFormProps) {
  const selectedPet = usePetStore((state) => state.selectedPet());
  const { handleAddPet, handleEditPet } = usePetStore();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PetFormType>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      className="space-y-3 flex flex-col"
      action={async (formData: FormData) => {
        const isValid = await trigger();
        if (!isValid) return;

        onFormSubmission();

        const newPet = getValues();
        newPet.imageURL = newPet.imageURL || PET_DEFAULT_IMAGE;

        // console.log(newPet);

        if (actionType === "edit" && selectedPet) {
          handleEditPet(newPet, selectedPet.id);
        } else if (actionType === "add") {
          handleAddPet(newPet);
        }
      }}
    >
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input id="ownerName" {...register("ownerName")} />
        {errors.ownerName && (
          <p className="text-red-500 text-sm">{errors.ownerName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageURL">Image URL</Label>
        <Input id="imageURL" {...register("imageURL")} />
        {errors.imageURL && (
          <p className="text-red-500 text-sm">{errors.imageURL.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input id="age" {...register("age")} />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" {...register("notes")} />
        {errors.notes && (
          <p className="text-red-500 text-sm">{errors.notes.message}</p>
        )}
      </div>

      <Button type="submit" className="mt-5 self-end">
        {buttonText}
      </Button>
    </form>
  );
}

export default PetForm;

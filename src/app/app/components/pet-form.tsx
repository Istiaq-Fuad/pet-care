"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePetStore } from "@/store/pet-store";
import React from "react";

type PetFormProps = {
  buttonText: string;
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

function PetForm({ buttonText, actionType, onFormSubmission }: PetFormProps) {
  const selectedPet = usePetStore((state) => state.selectedPet());
  const { handleAddPet, handleEditPet } = usePetStore();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   // const data = Object.fromEntries(formData.entries());

  //   const newPet = {
  //     name: formData.get("name") as string,
  //     ownerName: formData.get("ownerName") as string,
  //     imageURL:
  //       (formData.get("imageURL") as string) ||
  //       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  //     age: parseInt(formData.get("age") as string),
  //     notes: formData.get("notes") as string,
  //   };

  //   // console.log(newPet);
  //   if (actionType === "edit" && selectedPet) {
  //     handleEditPet(newPet, selectedPet.id);
  //   } else if (actionType === "add") {
  //     handleAddPet(newPet);
  //   }

  //   onFormSubmission();
  // };

  return (
    <form
      className="space-y-3 flex flex-col"
      action={async (formData: FormData) => {
        onFormSubmission();

        const newPet = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageURL:
            (formData.get("imageURL") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: parseInt(formData.get("age") as string),
          notes: formData.get("notes") as string,
        };

        if (actionType === "edit" && selectedPet) {
          handleEditPet(newPet, selectedPet.id);
        } else if (actionType === "add") {
          handleAddPet(newPet);
        }
      }}
    >
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input
          type="text"
          id="ownerName"
          name="ownerName"
          defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageURL">Image URL</Label>
        <Input
          type="text"
          id="imageURL"
          name="imageURL"
          defaultValue={actionType === "edit" ? selectedPet?.imageURL : ""}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input
          type="text"
          id="age"
          name="age"
          defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
        />
      </div>

      <Button type="submit" className="mt-5 self-end">
        {buttonText}
      </Button>
    </form>
  );
}

export default PetForm;

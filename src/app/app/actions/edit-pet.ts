"use server";

import prisma from "@/lib/db";
import { PetEssential } from "@/lib/types";
import { petFormSchema } from "@/lib/validation/pet-form-validation";
import { revalidatePath } from "next/cache";

export default async function editPet(newPet: PetEssential, petId: string) {
  const validatedPet = petFormSchema.safeParse(newPet);

  if (!validatedPet.success) {
    return { message: "Invalid pet data" };
  }

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Could not edit pet" };
  }

  revalidatePath("/app", "layout");
}

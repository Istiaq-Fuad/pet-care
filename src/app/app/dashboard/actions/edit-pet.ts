"use server";

import prisma from "@/lib/db";
import { PetEssential } from "@/lib/types";
import {
  petFormSchema,
  petIdSchema,
} from "@/lib/validation/pet-form-validation";
import { revalidatePath } from "next/cache";

export default async function editPet(newPet: unknown, petId: unknown) {
  const validatedPet = petFormSchema.safeParse(newPet);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId || !validatedPet.success) {
    return { message: "Invalid pet data" };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Could not edit pet" };
  }

  revalidatePath("/app", "layout");
}

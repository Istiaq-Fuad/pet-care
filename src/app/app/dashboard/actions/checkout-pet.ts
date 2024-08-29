"use server";

import prisma from "@/lib/db";
import { petIdSchema } from "@/lib/validation/pet-form-validation";
import { revalidatePath } from "next/cache";

export default async function checkoutPet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return { message: "Invalid pet id" };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return { message: "Could not checkout pet" };
  }

  revalidatePath("/app", "layout");
}

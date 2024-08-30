"use server";

import prisma from "@/lib/db";
import { readUserSession } from "@/lib/server-utils";
import { petIdSchema } from "@/lib/validation/pet-form-validation";
import { revalidatePath } from "next/cache";

export default async function checkoutPet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  const session = await readUserSession();

  if (!validatedPetId.success) {
    return { message: "Invalid pet id" };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return { message: "Could not checkout pet" };
  }

  revalidatePath("/app", "layout");
}

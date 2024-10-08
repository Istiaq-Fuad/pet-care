"use server";

import prisma from "@/lib/db";
import { readUserSession } from "@/lib/server-utils";
import { PetEssential } from "@/lib/types";
import { petFormSchema } from "@/lib/validation/pet-form-validation";
import { revalidatePath } from "next/cache";

export default async function addPet(newPet: unknown) {
  const validatedPet = petFormSchema.safeParse(newPet);
  const session = await readUserSession();

  if (!validatedPet.success) {
    return { message: "Invalid pet data" };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return { message: "Could not add pet" };
  }

  revalidatePath("/app", "layout");
}

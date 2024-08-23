"use server";

import prisma from "@/lib/db";
import { PetEssential } from "@/lib/types";
import { revalidatePath } from "next/cache";

export default async function editPet(newPet: PetEssential, petId: string) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPet,
    });
  } catch (error) {
    return { message: "Could not edit pet" };
  }

  revalidatePath("/app", "layout");
}

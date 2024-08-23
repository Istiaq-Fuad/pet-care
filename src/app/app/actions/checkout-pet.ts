"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function checkoutPet(petId: string) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return { message: "Could not checkout pet" };
  }

  revalidatePath("/app", "layout");
}

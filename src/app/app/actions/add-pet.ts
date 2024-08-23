"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function addPet(newPet: Omit<Pet, "id">) {
  try {
    await prisma.pet.create({
      data: newPet,
    });
  } catch (error) {
    return { message: "Could not add pet" };
  }

  revalidatePath("/app", "layout");
}

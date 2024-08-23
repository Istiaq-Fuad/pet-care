"use server";

import prisma from "@/lib/db";
import { PetEssential } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function addPet(newPet: PetEssential) {
  try {
    await prisma.pet.create({
      data: newPet,
    });
  } catch (error) {
    return { message: "Could not add pet" };
  }

  revalidatePath("/app", "layout");
}

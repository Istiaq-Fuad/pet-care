import { Pet } from "@/generated/prisma/client";

export type PetEssential = Omit<
  Pet,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

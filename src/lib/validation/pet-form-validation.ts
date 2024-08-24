import { z } from "zod";
import { PET_DEFAULT_IMAGE } from "../constants";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  ownerName: z
    .string()
    .trim()
    .min(1, "Owner name is required")
    .max(50, "Owner name must be less than 50 characters"),
  imageURL: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      "Image url must be a valid url"
    )
    .default(PET_DEFAULT_IMAGE),
  age: z.coerce
    .number()
    .int()
    .positive("Age is required and must be a positive number"),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be less than 1000 characters")
    .default(""),
  // .transform((val) => val || ""),
});

export type PetFormType = z.infer<typeof petFormSchema>;

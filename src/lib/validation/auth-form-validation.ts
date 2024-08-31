import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  //   password: z.string().min(8, "Password must be at least 8 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export type AuthFormType = z.infer<typeof authFormSchema>;

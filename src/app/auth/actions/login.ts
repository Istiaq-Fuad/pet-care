"use server";

import { auth } from "@/lib/auth";
import {
  authFormSchema,
  AuthFormType,
} from "@/lib/validation/auth-form-validation";
import { APIError } from "better-auth/api";

export default async function logIn(authData: unknown) {
  const validatedAuthData = authFormSchema.safeParse(authData);

  if (!validatedAuthData.success) {
    // Convert Zod errors to a more usable format
    const fieldErrors = validatedAuthData.error.issues.reduce((acc, err) => {
      const field = err.path.join(".") as keyof AuthFormType;
      acc[field] = err.message;
      return acc;
    }, {} as Partial<Record<keyof AuthFormType, string>>);

    return { ...fieldErrors };
  }

  const { email, password } = validatedAuthData.data;

  try {
    await auth.api.signInEmail({ body: { email, password } });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        default: "Invalid credentials",
      };
    }

    throw error;
  }
}

"use server";

import { signIn } from "@/lib/auth";
import {
  authFormSchema,
  AuthFormType,
} from "@/lib/validation/auth-form-validation";
import { AuthError } from "next-auth";

export default async function logIn(authData: unknown) {
  const validatedAuthData = authFormSchema.safeParse(authData);

  if (!validatedAuthData.success) {
    // Convert Zod errors to a more usable format
    const fieldErrors = validatedAuthData.error.errors.reduce((acc, err) => {
      const field = err.path.join(".") as keyof AuthFormType;
      acc[field] = err.message;
      return acc;
    }, {} as Partial<Record<keyof AuthFormType, string>>);

    return { ...fieldErrors };
  }

  try {
    await signIn("credentials", validatedAuthData.data, );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            default: "Invalid credentials",
          };

        default:
          return {
            default: "Couldn't sign in",
          };
      }
    }

    throw error;
  }
}

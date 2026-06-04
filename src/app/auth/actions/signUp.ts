"use server";

import { auth } from "@/lib/auth";
import {
  authFormSchema,
  AuthFormType,
} from "@/lib/validation/auth-form-validation";
import { APIError } from "better-auth/api";

export default async function signUp(authData: unknown) {
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
    await auth.api.signUpEmail({
      // Better Auth requires a name; derive it from the email local-part.
      body: { name: email.split("@")[0], email, password },
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.body?.code === "USER_ALREADY_EXISTS") {
        return {
          email: "Email already exists",
        };
      }
      return {
        default: "Couldn't create user",
      };
    }

    throw error;
  }
}

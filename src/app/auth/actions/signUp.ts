"use server";

import { signIn } from "@/lib/auth-no-edge";
import prisma from "@/lib/db";
import {
  authFormSchema,
  AuthFormType,
} from "@/lib/validation/auth-form-validation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import { z } from "zod";

export default async function signUp(authData: unknown) {
  // if (!(formData instanceof FormData)) {
  //   return {
  //     message: "Invalid form data",
  //   };
  // }

  // const formDataObj = Object.fromEntries(formData.entries());
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

  const { email, password } = validatedAuthData.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          email: "Email already exists",
        };
      }
    }
    return {
      default: "Couldn't create user",
    };
  }

  await signIn("credentials", validatedAuthData.data);
}

"use server";

import { signIn } from "@/lib/auth";

export default async function logIn(formData: FormData) {
  await signIn("credentials", formData);
}

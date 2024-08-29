"use server";

import { signIn } from "@/lib/auth";

export default async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());

  await signIn("credentials", authData);
}

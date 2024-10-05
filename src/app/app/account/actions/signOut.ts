"use server";

import { signOut } from "@/lib/auth-no-edge";

export default async function logOut() {
  await signOut({ redirectTo: "/" });
}

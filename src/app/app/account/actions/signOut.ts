"use server";

import { signOut } from "@/lib/auth";

export default async function logOut() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    return {
      message: "Couldn't sign out",
    };
  }
}

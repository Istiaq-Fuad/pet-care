import "server-only";
import { auth } from "./auth-no-edge";
import { redirect } from "next/navigation";

export async function readUserSession() {
  const session = await auth();

  // console.log(session);
  if (!session?.user) {
    redirect("auth/login");
  }

  return session;
}

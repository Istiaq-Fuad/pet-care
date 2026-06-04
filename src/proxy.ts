import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Next.js 16: the `middleware` convention is renamed to `proxy` and runs on the
// Node.js runtime — which lets us read the full Better Auth session (incl. the
// custom `hasAccess` field) from the database here.
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  const isLoggedIn = Boolean(session?.user);
  const hasAccess = Boolean(session?.user.hasAccess);

  const { pathname, origin } = request.nextUrl;
  const isTryingToAccessApp = pathname.includes("/app");
  const isTryingToAccessAuth = pathname.includes("/auth");
  const isTryingToAccessPayment = pathname.includes("/payment");

  if (!isLoggedIn && isTryingToAccessApp) {
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (
    isLoggedIn &&
    (isTryingToAccessAuth || isTryingToAccessApp) &&
    !hasAccess
  ) {
    return NextResponse.redirect(new URL("/payment", origin));
  }

  if (isLoggedIn && isTryingToAccessApp && hasAccess) {
    return NextResponse.next();
  }

  if (isLoggedIn && isTryingToAccessAuth) {
    return NextResponse.redirect(new URL("/app/dashboard", origin));
  }

  if (isLoggedIn && hasAccess && isTryingToAccessPayment) {
    return NextResponse.redirect(new URL("/app/dashboard", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

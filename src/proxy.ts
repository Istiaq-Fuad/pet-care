import NextAuth from "next-auth";
import { nextAuthEdgeConfig } from "./lib/auth-edge";

// Next.js 16: the `middleware` convention is renamed to `proxy` and runs on the
// Node.js runtime (edge is not supported here). Running on Node lets us safely
// import the Prisma client, which loads Node built-ins (node:path/url/process).
export const proxy = NextAuth(nextAuthEdgeConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

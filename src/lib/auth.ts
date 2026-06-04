import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/db";

// On Vercel, production reads the configured URL; preview deployments derive
// their (per-deploy) host from VERCEL_URL so cookies are set on the right host.
// Local/other hosts fall back to the configured URL.
const baseURL =
  process.env.VERCEL === "1"
    ? process.env.VERCEL_ENV === "production"
      ? process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      : `https://${process.env.VERCEL_URL}`
    : process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET,
  baseURL,
  // Accept Vercel preview origins (e.g. petsoft-git-*.vercel.app).
  trustedOrigins: ["https://*.vercel.app"],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      // Lifetime-access flag, flipped by the Stripe webhook. Not settable by
      // the client on sign-up.
      hasAccess: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
    },
  },
  // Must be the last plugin: lets server actions set/clear the session cookie.
  plugins: [nextCookies()],
});

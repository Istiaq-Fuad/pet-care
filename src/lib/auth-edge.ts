import Credentials from "next-auth/providers/credentials";
import { authFormSchema } from "./validation/auth-form-validation";
import prisma from "./db";
import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const nextAuthEdgeConfig = {
  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);

      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      const isTryingToAccessAuth = request.nextUrl.pathname.includes("/auth");
      const isTryingToAccessPayment =
        request.nextUrl.pathname.includes("/payment");

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (
        isLoggedIn &&
        (isTryingToAccessAuth || isTryingToAccessApp) &&
        !auth?.user.hasAccess
      ) {
        // console.log("test");
        return NextResponse.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
        return true;
      }

      if (isLoggedIn && isTryingToAccessAuth) {
        // console.log("test2");
        return NextResponse.redirect(
          new URL("/app/dashboard", request.nextUrl)
        );
      }

      if (isLoggedIn && auth?.user.hasAccess && isTryingToAccessPayment) {
        return NextResponse.redirect(
          new URL("/app/dashboard", request.nextUrl)
        );
      }

      return true;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user && user.id) {
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === "update") {
        const userFromDb = await prisma.user.findUnique({
          where: {
            id: token.userId,
          },
        });

        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
          // console.log(userFromDb.hasAccess);
        }
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (session.user && token.userId) {
        session.user.id = token.userId;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },

  providers: [],
} satisfies NextAuthConfig;

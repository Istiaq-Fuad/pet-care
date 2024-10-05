import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { authFormSchema } from "./validation/auth-form-validation";

const config = {
  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = authFormSchema.safeParse(credentials);
        if (validatedCredentials.error) {
          console.log("Invalid credentials");
          return null;
        }

        const { email, password } = validatedCredentials.data;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          console.log("Invalid email address");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          console.log("Password didn't match");
          return null;
        }

        return user;
      },
    }),
  ],
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
        return NextResponse.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
        return true;
      }

      if (isLoggedIn && (isTryingToAccessAuth || isTryingToAccessPayment)) {
        return NextResponse.redirect(
          new URL("/app/dashboard", request.nextUrl)
        );
      }

      // if (!isLoggedIn && !isTryingToAccessApp) {
      //   console.log(4);
      //   return true;
      // }

      // if (isLoggedIn) {
      //   return NextResponse.redirect(
      //     new URL("/app/dashboard", request.nextUrl)
      //   );
      // }

      // if (isLoggedIn && !isTryingToAccessApp) {
      //   console.log(5);
      //   return true;
      // }

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
          console.log(userFromDb.hasAccess);
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
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);

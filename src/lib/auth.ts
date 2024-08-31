import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
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

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn && isTryingToAccessAuth) {
        return NextResponse.redirect(
          new URL("/app/dashboard", request.nextUrl)
        );
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn) {
        return NextResponse.redirect(
          new URL("/app/dashboard", request.nextUrl)
        );
      }

      return false;
    },
    jwt: async ({ user, token }) => {
      if (user && user.id) {
        token.userId = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);

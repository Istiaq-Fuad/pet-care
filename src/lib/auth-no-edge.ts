import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { authFormSchema } from "./validation/auth-form-validation";
import { nextAuthEdgeConfig } from "./auth-edge";

const config = {
  ...nextAuthEdgeConfig,
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
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);

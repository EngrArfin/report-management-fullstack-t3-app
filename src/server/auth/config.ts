import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      staffId?: string;
      role?: string;
      designation?: string;
      zone?: string;
    } & DefaultSession["user"];
  }

  interface User {
    staffId?: string;
    role?: string;
    designation?: string;
    zone?: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 */
export const authConfig = {
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Staff ID or Email",
      credentials: {
        identifier: { label: "Staff ID or Email", type: "text", placeholder: "e.g. 572816 or admin@company.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || typeof credentials.identifier !== "string") {
          return null;
        }

        const identifier = credentials.identifier.trim();

        // Find user by staffId or email
        const user = await db.user.findFirst({
          where: {
            OR: [
              { staffId: identifier },
              { email: identifier },
            ],
          },
        });

        if (!user || user.status === "INACTIVE") {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          staffId: user.staffId,
          role: user.role,
          designation: user.designation,
          zone: user.zone,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.staffId = user.staffId;
        token.role = user.role;
        token.designation = user.designation;
        token.zone = user.zone;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: (token.id as string) ?? session.user.id,
        staffId: token.staffId as string | undefined,
        role: token.role as string | undefined,
        designation: token.designation as string | undefined,
        zone: token.zone as string | undefined,
      },
    }),
  },
} satisfies NextAuthConfig;

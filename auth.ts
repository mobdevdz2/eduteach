import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        console.log({credentials})
        const user = await db.select().from(users).where(eq(users.email, credentials.email as string)).limit(1);
        
        if (!user || user.length === 0 || !user[0].passwordHash) {
          return null;
        }

        const isValid = await compare(credentials.password, (user[0].passwordHash || '') as string);

        if (!isValid) {
          return null;
        }

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
        };
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
});
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise, { getDb } from "@/lib/mongodb";
import argon2 from "argon2";
import { User } from "@/types/User";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const db = await getDb();
        const user = await db
          .collection("ida_users")
          .findOne<User>({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await argon2.verify(
          user.password,
          credentials.password
        );
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          apiKey: user.apiKey,
        };
      },
    }),
  ],
  pages: {},
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // This is only called on first login or when user is available
      if (user) {
        token.apiKey = (user as unknown as User).apiKey;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.apiKey = token.apiKey;
      }

      return session;
    },
  },
};

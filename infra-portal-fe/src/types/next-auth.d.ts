// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    apiKey?: string; // Add apiKey to the session object
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiKey?: string;
  }
}

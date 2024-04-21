import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { env } from "../../env.mjs";
// import { db } from "@/lib/db";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // CognitoProvider({
    //     clientId: env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    //     clientSecret: env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
    //     issuer: env.NEXT_PUBLIC_COGNITO_ISSUER,
    // }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // The user argument is only passed the first time this callback is called on a new session, after the user signs in
      if (user) {
        // Add a new prop on token for user data
        token.data = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = profile.id;
      }
      return Promise.resolve(token);
    },
    async session({ session }) {
      // Assign user data from JWT to session user
      return Promise.resolve(session);
    },
    async signIn({ account, profile }) {
      if (!profile?.email) throw new Error("No profile detected");
      if (!account?.provider) throw new Error("Google failed?");
      console.log("SIGN IN CALLBACK");
      console.log("ACCOUNT:", account);
      console.log("PROFILE:", profile);

      // const user = await db.user.upsert({
      //     where: {
      //         email: profile.email,
      //     },
      //     create: {
      //         email: profile.email,
      //         name: profile.name,
      //         avatar: profile.picture,
      //     },
      //     update: {
      //         name: profile.name,
      //         avatar: profile!.picture,
      //     },
      // });
      return true;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/register",
  },
};

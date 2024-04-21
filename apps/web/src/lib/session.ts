import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { User } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  // if (!authUserSession) throw new Error("unauthorized");
  return authUserSession?.user;
};

// Use it in server contexts
export function useAuth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

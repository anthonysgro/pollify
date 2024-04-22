// /* eslint-disable no-unused-vars */
// import { DefaultSession } from "next-auth";

// // see: https://next-auth.js.org/getting-started/typescript
// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */

//   interface Session {
//     user: {
//       id?: string;
//     } & DefaultSession["user"];
//   }

//   /** The OAuth profile returned from your provider */
//   interface Profile {
//     id?: string; // from db
//     iss?: string;
//     azp?: string;
//     aud?: string;
//     sub?: string;
//     email_verified?: boolean;
//     at_hash?: string;
//     picture?: string;
//     given_name?: string;
//     family_name?: string;
//     locale?: string;
//     iat?: number;
//     exp?: number;
//   }
// }

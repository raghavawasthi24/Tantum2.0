// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//             profile(profile) {
//                 return {
//                     id: profile.sub,
//                     name: profile.name,
//                     email: profile.email,
//                     image: profile.picture,
//                 }
//             },
//         })
//     ],
// };

// export const handler = NextAuth(authOptions);

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

 const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials");
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });


        if (res.status == 200) {
          const user = await res.json();
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }): Promise<any> {
      if (user) return { ...token, ...user };
      // console.log("token is srtrar", token, "user hhggh yuguyfuf yugyu", user);

      // console.log("time", new Date().getTime())

  if (new Date().getTime() < new Date(token.token.expiryDate).getTime()
  ) {
    return token;
  }

      return null;
    },

    async session({ token, session }) {
      // console.log(token);
      session.user = token;
      session.token = token.token;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

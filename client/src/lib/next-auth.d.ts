import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };

    token: {
      accessToken: string;
      expiryDate: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;

    token: {
      accessToken: string;
      expiryDate: number;
    };
  }
}

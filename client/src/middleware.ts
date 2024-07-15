import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/publishRide"],
};


export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for:", request.nextUrl.pathname);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Token:", token);

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    console.log("Redirecting to /auth/login");
    return NextResponse.redirect(url);
  }

  console.log("Allowing request to proceed");
  return NextResponse.next();
}

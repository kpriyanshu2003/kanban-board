import { verifyJwtToken } from "./util/jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const redirectUrl = new URL("/auth/login", request.url);
  redirectUrl.searchParams.set("redirect", request.url);

  const verifiedToken =
    token && (await verifyJwtToken(token).catch((err) => console.log(err)));

  if (!verifiedToken) return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/kanban", "/task"],
};

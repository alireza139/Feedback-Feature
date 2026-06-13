import { NextResponse } from "next/server";

export function proxy(req) {

  const cookie = req.cookies.get("admin_session")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
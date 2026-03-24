import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/create-password",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isPublic = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken && !refreshToken && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if ((accessToken || refreshToken) && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

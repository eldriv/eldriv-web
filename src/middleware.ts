import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";

const ADMIN_API_PREFIX = "/api/admin";
const ADMIN_LOGIN_PATH = "/api/admin/login";
const ADMIN_LOGOUT_PATH = "/api/admin/logout";

const requiresAuth = (pathname: string) =>
  pathname.startsWith(ADMIN_API_PREFIX) &&
  pathname !== ADMIN_LOGIN_PATH &&
  pathname !== ADMIN_LOGOUT_PATH;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The /admin page itself renders both the login form and the dashboard, so
  // it never gets blocked at the edge — the page decides what to show based on
  // the user's auth state. Only the admin API endpoints get gated here.
  if (!requiresAuth(pathname)) return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthed = await verifyAdminToken(token);
  if (isAuthed) return NextResponse.next();

  return new NextResponse(
    JSON.stringify({ error: "Unauthorized" }),
    { status: 401, headers: { "content-type": "application/json" } }
  );
}

export const config = {
  matcher: ["/api/admin/:path*"],
};

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tiny "am I authenticated" probe used by the /admin page on first paint.
 * The middleware already gates this route, so reaching the handler at all
 * means the cookie is valid.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ authenticated: true });
}

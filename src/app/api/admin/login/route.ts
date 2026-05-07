import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  cookieSerializationOptions,
  isCorrectPassword,
  signAdminToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const password =
    typeof body.password === "string" ? body.password : undefined;

  let ok = false;
  try {
    ok = await isCorrectPassword(password);
  } catch (err) {
    console.error("[/api/admin/login] config error", err);
    return NextResponse.json(
      { error: "Admin auth is not configured on the server." },
      { status: 500 }
    );
  }

  if (!ok) {
    // Soft delay to make brute-force a little less attractive.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const token = await signAdminToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: cookieSerializationOptions.ttlSeconds,
  });
  return response;
}

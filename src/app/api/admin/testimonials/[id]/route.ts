import { NextResponse, type NextRequest } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import {
  rowToAdmin,
  type DbTestimonialRow,
  type TestimonialStatus,
} from "@/lib/testimonials-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: readonly TestimonialStatus[] = [
  "pending",
  "approved",
  "rejected",
] as const;

const isStatus = (value: unknown): value is TestimonialStatus =>
  typeof value === "string" && (STATUSES as readonly string[]).includes(value);

interface RouteContext {
  params: { id: string };
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (!isStatus(body.status)) {
    return NextResponse.json(
      { error: "status must be 'pending', 'approved', or 'rejected'." },
      { status: 400 }
    );
  }
  const nextStatus = body.status;

  try {
    await ensureSchema();
    const rows = (await sql<DbTestimonialRow[]>`
      UPDATE testimonials
      SET status = ${nextStatus},
          reviewed_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as unknown as DbTestimonialRow[];

    const row = rows[0];
    if (!row) {
      return NextResponse.json(
        { error: "Testimonial not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ testimonial: rowToAdmin(row) });
  } catch (err) {
    console.error("[/api/admin/testimonials/[id] PATCH]", err);
    return NextResponse.json(
      { error: "Could not update testimonial." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    await ensureSchema();
    const rows = (await sql<{ id: string }[]>`
      DELETE FROM testimonials
      WHERE id = ${id}
      RETURNING id
    `) as unknown as { id: string }[];

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Testimonial not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/admin/testimonials/[id] DELETE]", err);
    return NextResponse.json(
      { error: "Could not delete testimonial." },
      { status: 500 }
    );
  }
}

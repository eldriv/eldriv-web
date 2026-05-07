import { NextResponse, type NextRequest } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import {
  rowToAdmin,
  type AdminTestimonial,
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

const isStatus = (value: string | null): value is TestimonialStatus =>
  !!value && (STATUSES as readonly string[]).includes(value);

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ensureSchema();
    const status = request.nextUrl.searchParams.get("status");

    const rows = (
      isStatus(status)
        ? ((await sql<DbTestimonialRow[]>`
            SELECT *
            FROM testimonials
            WHERE status = ${status}
            ORDER BY created_at DESC
          `) as unknown as DbTestimonialRow[])
        : ((await sql<DbTestimonialRow[]>`
            SELECT *
            FROM testimonials
            ORDER BY
              CASE status
                WHEN 'pending'  THEN 0
                WHEN 'approved' THEN 1
                WHEN 'rejected' THEN 2
              END,
              created_at DESC
          `) as unknown as DbTestimonialRow[])
    );

    const items: AdminTestimonial[] = rows.map(rowToAdmin);
    const counts = await sql<
      { status: TestimonialStatus; count: string }[]
    >`
      SELECT status, COUNT(*)::text AS count
      FROM testimonials
      GROUP BY status
    `;

    const summary: Record<TestimonialStatus, number> = {
      pending: 0,
      approved: 0,
      rejected: 0,
    };
    for (const row of counts) summary[row.status] = Number(row.count);

    return NextResponse.json({ testimonials: items, counts: summary });
  } catch (err) {
    console.error("[/api/admin/testimonials GET]", err);
    return NextResponse.json(
      { error: "Failed to load testimonials." },
      { status: 500 }
    );
  }
}

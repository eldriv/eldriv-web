import { NextResponse, type NextRequest } from "next/server";
import { ensureSchema, isDatabaseConfigured, sql } from "@/lib/db";
import {
  rowToPublic,
  type DbTestimonialRow,
  type PublicTestimonial,
} from "@/lib/testimonials-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUOTE = 400;
const MAX_NAME = 80;
const MAX_TITLE = 100;
const MAX_PROJECT_TITLE = 120;
const MAX_PROJECT_HREF = 500;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB cap on data URLs

const generateId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `t_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const sanitize = (
  value: unknown,
  max: number,
  required: boolean
): string | null => {
  if (typeof value !== "string") {
    if (required) return null;
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) return required ? null : null;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
};

const sanitizeOptional = (value: unknown, max: number): string | null =>
  sanitize(value, max, false);

const isAcceptableImageDataUrl = (value: string): boolean => {
  if (!value.startsWith("data:image/")) return false;
  // Rough byte estimate — base64 expands by ~4/3, so multiplying by 0.75
  // gives the approximate decoded size. Enforce the same 2MB ceiling the
  // modal uses on the client so we don't accept payloads it would reject.
  if (value.length * 0.75 > MAX_IMAGE_BYTES) return false;
  return true;
};

export async function GET(): Promise<NextResponse> {
  // The public list should never break the public page — if the database
  // isn't configured yet, just return an empty list and let the site fall
  // back to the seed testimonials baked into the carousel.
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ testimonials: [], configured: false });
  }
  try {
    await ensureSchema();
    const rows = (await sql<DbTestimonialRow[]>`
      SELECT *
      FROM testimonials
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `) as unknown as DbTestimonialRow[];

    const items: PublicTestimonial[] = rows.map(rowToPublic);
    return NextResponse.json({ testimonials: items, configured: true });
  } catch (err) {
    console.error("[/api/testimonials GET]", err);
    return NextResponse.json(
      { error: "Failed to load testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Submissions are temporarily unavailable. Please try again later.",
      },
      { status: 503 }
    );
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

  // Honeypot — real visitors leave this empty; bots fill every field.
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  if (honeypot) {
    // Pretend success so the bot moves on, but skip the insert entirely.
    return NextResponse.json({ ok: true, status: "pending" });
  }

  const name = sanitize(body.name, MAX_NAME, true);
  const quote = sanitize(body.quote, MAX_QUOTE, true);
  const title = sanitizeOptional(body.title, MAX_TITLE);
  const projectTitle = sanitizeOptional(
    body.projectTitle,
    MAX_PROJECT_TITLE
  );
  const projectHref = sanitizeOptional(body.projectHref, MAX_PROJECT_HREF);
  const imageUrl = sanitizeOptional(body.imageUrl, MAX_IMAGE_BYTES);

  if (!name || !quote) {
    return NextResponse.json(
      { error: "Name and testimonial are required." },
      { status: 400 }
    );
  }
  if (quote.length < 10) {
    return NextResponse.json(
      {
        error:
          "Please share a few more words — testimonials should be at least 10 characters.",
      },
      { status: 400 }
    );
  }
  if (imageUrl && !isAcceptableImageDataUrl(imageUrl)) {
    return NextResponse.json(
      { error: "Photo must be a JPG/PNG/WebP/GIF data URL under 2 MB." },
      { status: 400 }
    );
  }

  try {
    await ensureSchema();
    const id = generateId();
    await sql`
      INSERT INTO testimonials (
        id, quote, name, title, image_url,
        project_title, project_href,
        status, source
      ) VALUES (
        ${id}, ${quote}, ${name}, ${title}, ${imageUrl},
        ${projectTitle}, ${projectHref},
        'pending', 'user'
      )
    `;
    return NextResponse.json({ ok: true, id, status: "pending" });
  } catch (err) {
    console.error("[/api/testimonials POST]", err);
    return NextResponse.json(
      { error: "Could not save your testimonial. Please try again." },
      { status: 500 }
    );
  }
}

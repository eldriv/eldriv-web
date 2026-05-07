export type TestimonialStatus = "pending" | "approved" | "rejected";
export type TestimonialSource = "seed" | "user";

/**
 * Public shape returned to the website carousel. Mirrors the on-disk shape
 * used in `seedTestimonials` so the section can merge them without branching.
 */
export type PublicTestimonial = {
  id: string;
  quote: string;
  name: string;
  title?: string;
  imageUrl?: string;
  projectTitle?: string;
  projectHref?: string;
  source?: TestimonialSource;
  createdAt?: string;
};

export type AdminTestimonial = PublicTestimonial & {
  status: TestimonialStatus;
  reviewedAt?: string;
};

export type DbTestimonialRow = {
  id: string;
  quote: string;
  name: string;
  title: string | null;
  image_url: string | null;
  project_title: string | null;
  project_href: string | null;
  status: TestimonialStatus;
  source: TestimonialSource;
  created_at: Date | string;
  reviewed_at: Date | string | null;
};

const toIso = (value: Date | string | null | undefined): string | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString();
  return new Date(value).toISOString();
};

const undef = (value: string | null | undefined): string | undefined =>
  value === null || value === undefined || value === "" ? undefined : value;

export const rowToPublic = (row: DbTestimonialRow): PublicTestimonial => ({
  id: row.id,
  quote: row.quote,
  name: row.name,
  title: undef(row.title),
  imageUrl: undef(row.image_url),
  projectTitle: undef(row.project_title),
  projectHref: undef(row.project_href),
  source: row.source,
  createdAt: toIso(row.created_at),
});

export const rowToAdmin = (row: DbTestimonialRow): AdminTestimonial => ({
  ...rowToPublic(row),
  status: row.status,
  reviewedAt: toIso(row.reviewed_at),
});

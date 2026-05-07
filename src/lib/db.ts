import "server-only";
import postgres, { type Sql } from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __eldrivPg: Sql | undefined;
  // eslint-disable-next-line no-var
  var __eldrivPgSchemaReady: Promise<void> | undefined;
}

const getConnectionString = (): string | undefined =>
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  undefined;

export const isDatabaseConfigured = (): boolean =>
  Boolean(getConnectionString());

const isLocalConnection = (connectionString: string): boolean => {
  try {
    const url = new URL(connectionString);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1";
  } catch {
    return false;
  }
};

/**
 * Returns the lazily-initialized, module-scoped postgres client. Throws a
 * clear error when no DATABASE_URL is configured so callers can decide
 * whether to surface a 500 or fall back to an empty result.
 */
export const getSql = (): Sql => {
  if (globalThis.__eldrivPg) return globalThis.__eldrivPg;
  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment (e.g. a Neon Postgres connection string)."
    );
  }
  globalThis.__eldrivPg = postgres(connectionString, {
    // Keep things conservative for serverless — many short-lived workers each grab one connection.
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
    // Hosted Postgres (Render, Neon, Supabase, etc.) requires TLS. Local
    // Postgres usually doesn't, so only opt-in to SSL for non-localhost URLs.
    ssl: isLocalConnection(connectionString) ? false : "require",
  });
  return globalThis.__eldrivPg;
};

/**
 * Convenience proxy so existing call sites can keep using `sql\`SELECT ...\``
 * and `sql.unsafe(...)`. Lazily resolves the underlying client on first use.
 *
 * The proxy target must itself be callable; empty-object targets cause
 * `sql\`...\`` to throw `is not a function`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sqlTarget = function sqlTarget(): any {
  // Never actually invoked — the apply trap below takes over.
  throw new Error("sqlTarget should not be called directly");
};

export const sql: Sql = new Proxy(sqlTarget as unknown as Sql, {
  get(_target, prop) {
    const client = getSql();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (client as any)[prop as keyof Sql];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof value === "function" ? (value as any).bind(client) : value;
  },
  apply(_target, _thisArg, args) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = getSql() as unknown as (...a: any[]) => any;
    return client(...args);
  },
}) as Sql;

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS testimonials (
    id            TEXT PRIMARY KEY,
    quote         TEXT NOT NULL,
    name          TEXT NOT NULL,
    title         TEXT,
    image_url     TEXT,
    project_title TEXT,
    project_href  TEXT,
    status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'rejected')),
    source        TEXT NOT NULL DEFAULT 'user'
                  CHECK (source IN ('seed', 'user')),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    reviewed_at   TIMESTAMPTZ
  );
`;

const SCHEMA_INDEX_SQL = `
  CREATE INDEX IF NOT EXISTS testimonials_status_created_at_idx
  ON testimonials (status, created_at DESC);
`;

/**
 * Ensures the schema exists. Idempotent and memoized per process so we only
 * pay for the round-trip on the first call after a cold start.
 */
export const ensureSchema = (): Promise<void> => {
  if (!globalThis.__eldrivPgSchemaReady) {
    globalThis.__eldrivPgSchemaReady = (async () => {
      await sql.unsafe(SCHEMA_SQL);
      await sql.unsafe(SCHEMA_INDEX_SQL);
    })().catch((err) => {
      // If the bootstrap fails we want subsequent requests to retry rather
      // than caching the rejected promise forever.
      globalThis.__eldrivPgSchemaReady = undefined;
      throw err;
    });
  }
  return globalThis.__eldrivPgSchemaReady;
};

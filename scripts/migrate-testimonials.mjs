import fs from "fs";
import postgres from "postgres";

const loadEnv = (path) => {
  if (!fs.existsSync(path)) return;
  for (const line of fs.readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
};

loadEnv(".env");
loadEnv(".env.migrate");

const oldUrl = process.env.OLD_DATABASE_URL;
const newUrl = process.env.DATABASE_URL;

if (!oldUrl) {
  console.error("OLD_DATABASE_URL is not set.");
  process.exit(1);
}
if (!newUrl) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const connect = (url) =>
  postgres(url, {
    max: 1,
    ssl: "require",
    connect_timeout: 15,
    prepare: false,
  });

const oldDb = connect(oldUrl);
const newDb = connect(newUrl);

try {
  console.log("Connecting to old Render database...");
  const rows = await oldDb`SELECT * FROM testimonials ORDER BY created_at ASC`;
  console.log(`Found ${rows.length} testimonial(s) to migrate.`);

  if (rows.length === 0) {
    console.log("Nothing to migrate.");
    process.exit(0);
  }

  console.log("Connecting to Neon...");
  await newDb.unsafe(`
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
  `);

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const existing = await newDb`SELECT id FROM testimonials WHERE id = ${row.id}`;
    if (existing.length > 0) {
      skipped++;
      continue;
    }

    await newDb`
      INSERT INTO testimonials (
        id, quote, name, title, image_url,
        project_title, project_href,
        status, source, created_at, reviewed_at
      ) VALUES (
        ${row.id}, ${row.quote}, ${row.name}, ${row.title}, ${row.image_url},
        ${row.project_title}, ${row.project_href},
        ${row.status}, ${row.source}, ${row.created_at}, ${row.reviewed_at}
      )
    `;
    inserted++;
  }

  const counts = await newDb`
    SELECT status, COUNT(*)::int AS count
    FROM testimonials
    GROUP BY status
    ORDER BY status
  `;

  console.log(`Migration complete: ${inserted} inserted, ${skipped} skipped (already existed).`);
  console.log("Neon counts:", counts);
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exit(1);
} finally {
  await oldDb.end({ timeout: 2 }).catch(() => {});
  await newDb.end({ timeout: 2 }).catch(() => {});
}

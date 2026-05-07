This repository contains my personal website portfolio, built with [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install the dependencies:
```bash
make install
``` 

then, run the development server:

```bash
make dev
```
> **NOTE:** The `Makefile` has the ability to detect the available package manager.  
> It checks for `bun`, `pnpm`, or `yarn`, and falls back to `npm` if none of the others are found.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Live
- [See the Live result](https://eldriv-portfolio.netlify.app)

## Testimonials backend

The testimonials carousel and `/admin` moderation dashboard are powered by a
small Postgres-backed API. To enable them locally and on Netlify, set the
following environment variables (see `.env.example`):

| Variable             | Description                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`       | Postgres connection string. Neon's free tier is recommended; any Postgres works (Supabase, Railway, etc.).            |
| `ADMIN_PASSWORD`     | Single password you'll type into `/admin` to moderate submissions.                                                   |
| `ADMIN_AUTH_SECRET`  | Random string (>=16 chars) used to sign the admin auth cookie. Rotate to force every existing admin session to log out. |

The `testimonials` table is created automatically on first request — no
separate migration step is required. Visit [`/admin`](http://localhost:3000/admin)
to sign in and approve, reject, or delete submissions. Approved entries
appear in the public carousel for every visitor.


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.





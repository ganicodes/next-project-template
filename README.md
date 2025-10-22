# next-project-template

A small Next.js (App Router) starter template with TypeScript, Tailwind CSS, and a set of opinionated UI components.

This repository contains a minimal app scaffolded from Create Next App and extended with:

- App Router-based pages under `app/`
- Reusable UI primitives in `components/ui/`
- Ready-made `Login` and `Signup` forms in `components/`
- Tailwind CSS for styling and `class-variance-authority`, `clsx`, and `tailwind-merge` helpers for class composition
- TypeScript support

If you just opened the repo, this README helps you start the dev server, configure authentication (NextAuth + Prisma), and run local migrations.

## Quick start

Prerequisites

- Node 18+ (or compatible)
- pnpm (recommended) — npm/yarn also work

Install dependencies and run the dev server:

```bash
# install deps (recommended)
pnpm install

# start dev server
pnpm dev

# build for production
pnpm build

# run production server (after build)
pnpm start

# run linter
pnpm lint
```

Open http://localhost:3000 in your browser.

## Project layout

- `app/` – Next.js App Router entrypoints (pages, API routes under `app/api/`).
- `components/` – Reusable UI components and composed forms. Notable files:
  - `components/login-form.tsx` — login form UI
  - `components/signup-form.tsx` — signup form UI
  - `components/ui/` — low-level UI primitives (Button, Card, Field, Input, Label, Separator)
- `lib/` – helpers (for example `lib/prisma.ts`)
- `prisma/` – Prisma schema
- `public/` — static assets

## Authentication (NextAuth + Prisma)

This template includes scaffolding for NextAuth with a Prisma adapter and an SQLite database for local development.

What was provided

- `prisma/schema.prisma` — data models for `User`, `Account`, `Session`, `VerificationToken`.
- `lib/prisma.ts` — Prisma client singleton.
- `app/api/auth/[...nextauth]/route.ts` — NextAuth route configured with Google and Credentials providers and the Prisma adapter.
- `app/api/auth/signup/route.ts` — a convenience API to create users with hashed passwords.
- `components/login-form.tsx` and `components/signup-form.tsx` updated to call NextAuth/sign-up flows.

Environment variables
Create a `.env.local` file at the project root. Example:

```env
# NextAuth
NEXTAUTH_SECRET=replace_with_a_random_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth (Google example)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database (SQLite local dev)
DATABASE_URL="file:./dev.db"
```

Security note: use a strong random string for `NEXTAUTH_SECRET` in production.

Local setup (first time)

```bash
# 1. Install deps
pnpm install

# 2. Generate Prisma client
npx prisma generate

# 3. Run migrations to create the SQLite database and tables
npx prisma migrate dev --name init

# 4. (Optional) Open Prisma Studio to inspect the DB
npx prisma studio

# 5. Start the dev server
pnpm dev
```

Using the app

- Go to `/signup` to create a new user (the signup form POSTs to `/api/auth/signup`).
- After signing up the UI will automatically sign in using the Credentials provider and redirect to `/`.
- To sign in with Google click the Google button on the signin page — configure OAuth credentials and consent screen in Google Cloud Console and add the client ID/secret to `.env.local`.
- Default NextAuth sign-in page is available at `/api/auth/signin` if you want to use NextAuth pages.

Prisma tips

- If you change your Prisma schema, run `npx prisma migrate dev` to update migrations and your DB.
- To quickly reset the local DB (dev only):

```bash
npx prisma migrate reset
# or
rm prisma/dev.db && npx prisma migrate dev --name init
```

Upgrade notes & common issues

- bcrypt native builds: on some platforms installing `bcrypt` can require a native toolchain. If you encounter install/build issues, switch to the pure-JS `bcryptjs` package and update imports.
- If you change NextAuth versions, consult the NextAuth migration guide — the app router route signature and import paths may differ across major versions.

Testing the flow locally

1. Ensure `.env.local` has `DATABASE_URL` and `NEXTAUTH_SECRET`.
2. Run migrations and start dev server.
3. Visit `http://localhost:3000/signup` and create an account.
4. Confirm that a `User` row exists in Prisma Studio and that signing in works.

Deployment notes

- Add the same environment variables to your host (Vercel, Netlify, etc.).
- Set `NEXTAUTH_URL` to the production URL (for example `https://your-app.vercel.app`).
- If using a managed DB in production (Postgres, MySQL), update `DATABASE_URL` accordingly and run migrations against that database.

Further improvements (optional)

- Add session type augmentation so `session.user.id` is typed across the app.
- Add a top-level header that shows `Sign in` / `Sign out` depending on auth state via `useSession`.
- Add email verification / password reset flows.
- Add OAuth providers you need (GitHub, Twitter, etc.).

Contributing

- Keep UI primitives small and composable.
- Add tests for API routes and auth flows if you plan to maintain the template.

Troubleshooting

- If dev server fails to start, check Node version and installed packages. Remove `node_modules` and reinstall (`pnpm install`) if needed.
- If Prisma client generation fails, make sure `npx prisma generate` runs after `pnpm install`.

---

If you'd like, I can:

- add a small authenticated header component and protect routes;
- add session/type augmentation for TypeScript;
- switch the auth scaffold to a non-database (provider-only) setup.

Tell me which and I will implement it next.

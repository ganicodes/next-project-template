# next-project-template

A small Next.js (App Router) starter template with TypeScript, Tailwind CSS, and a set of opinionated UI components.

This repository contains a minimal app scaffolded from Create Next App and extended with:

- App Router-based pages under `app/`
- Reusable UI primitives in `components/ui/`
- Ready-made `Login` and `Signup` forms in `components/`
- Tailwind CSS for styling and `class-variance-authority`, `clsx`, and `tailwind-merge` helpers for class composition
- TypeScript support

If you just opened the repo, this README will help you start the dev server, understand the layout, and point out the obvious next steps (adding auth backend, env variables, tests, etc.).

## Quick start

Prerequisites (assumptions): Node 18+ and pnpm are recommended (this repo includes a `pnpm-lock.yaml`). If you prefer npm or yarn, the scripts are equivalent.

Install dependencies and run the dev server (pnpm recommended):

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

## What you'll find in this project

- `app/` – Next.js App Router entrypoints. Example pages include `app/page.tsx`, `app/login/page.tsx`, and `app/signup/page.tsx`.
- `components/` – Reusable UI components and composed forms. Notable files:
  - `components/login-form.tsx` — login form UI (email/password + Google button placeholder)
  - `components/signup-form.tsx` — signup form UI (name, email, password, confirm)
  - `components/ui/` — low-level UI primitives (Button, Card, Field, Input, Label, Separator) used across the app.
- `lib/utils.ts` — small helper `cn()` that combines `clsx` and `tailwind-merge` for safer className composition.
- `public/` — static assets (SVGs used in the homepage)

The styling system uses Tailwind CSS (configured in the repo) and leverages Radix UI primitives for accessibility where appropriate.

## Key implementation notes

- TypeScript: the project is typed. Keep components as `React.FC` or typed function components for consistency.
- Fonts: `app/layout.tsx` uses `next/font/google` to load the Geist fonts and assigns CSS variables for use across the app.
- Forms: the `LoginForm` and `SignupForm` are purely presentational. They currently submit to no backend — you can wire them to an API route, a third-party auth provider (NextAuth, Supabase, Firebase), or a server action.

## Auth (NextAuth) — recommended setup

You chose NextAuth. Below are simple steps to integrate NextAuth with this Next.js App Router project.

1. Install packages:

```bash
pnpm add next-auth @next-auth/prisma-adapter
# and your chosen provider(s), e.g. for Google:
pnpm add @next-auth/google-provider
```

2. Add environment variables (example `.env.local`):

```env
# NextAuth
NEXTAUTH_SECRET=replace_with_a_random_secret
NEXTAUTH_URL=http://localhost:3000

# Example OAuth provider (Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

3. Create the App Router-compatible auth route: add `app/api/auth/[...nextauth]/route.ts` and export the NextAuth handler (I can scaffold this for you). For example, the file will export a default handler using NextAuth and your chosen providers.

4. Optionally add a database: NextAuth supports many adapters (Prisma is common). If you add Prisma, set `DATABASE_URL` in `.env.local` and run `prisma migrate`.

5. Update the `LoginForm`/`SignupForm` to call the NextAuth signIn/signUp flows or use client components that call `signIn('google')`.

If you want, I can create a working scaffold (route file, provider config, and a small Prisma schema) — tell me whether you'd like the database-backed setup (Prisma + PostgreSQL or SQLite for dev) or a stateless provider-only setup.

## Deployment — Vercel

You chose Vercel. Quick notes to deploy:

- Vercel is the recommended host for Next.js. Connect the repository to Vercel, and it will detect Next.js and set the build command automatically.
- Ensure environment variables from above are added to your Vercel project settings (NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_URL if used).
- For production, set `NEXTAUTH_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`).

Vercel will run `pnpm install` and `pnpm build` by default (it respects the lockfile). If you run into issues, set the build command to `pnpm build` and the install command to `pnpm install` in the project settings.

## Scripts

The following npm scripts are available (see `package.json`):

- `dev` — start Next.js in development (uses Turbopack in this template)
- `build` — build the production app
- `start` — start the production server after building
- `lint` — run ESLint

Run them with `pnpm <script>` (or `npm run <script>` / `yarn <script>`).

## How to wire authentication (next steps)

The repository includes login and signup forms but no backend. Typical options to add authentication:

- NextAuth.js (recommended) — supports OAuth, email, and many providers
- Supabase or Firebase for a managed auth+DB solution
- Custom API routes and a database for full control

If you want, I can scaffold a NextAuth integration now (headless provider-only, or with Prisma/SQLite for dev). Which would you prefer?

## Contributing & development tips

- Keep UI primitives in `components/ui/` small and reusable.
- Use the `cn()` helper from `lib/utils.ts` for composing classNames.
- Add unit or integration tests if you expect to maintain behavior across releases.

## Troubleshooting

- If the dev server fails to start, ensure you have a compatible Node version (Node 18+ recommended). If you see dependency errors, remove `node_modules` and reinstall with `pnpm install`.

---

I've updated the README with your preferences (pnpm, NextAuth, Vercel). I left a prompt asking whether you'd like a scaffolded NextAuth integration (provider-only or database-backed). Let me know and I'll add it; if you want the scaffold, I'll mark the corresponding todo as in-progress and start creating files.

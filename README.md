# BALÖDER

## Unified BAL ID authentication

BALÖDER is a BAL ID OAuth client. It no longer owns password, email verification, password reset, Google login, or the underlying Supabase Auth user. `/auth/login` starts authorization code + PKCE against BAL ID and creates only a namespaced BALÖDER product profile.

The migration `20260822193000_namespace_and_bal_id_oauth` preserves existing rows while moving BALÖDER tables from `public` into the `baloder` PostgreSQL schema and renaming `users` to `baloder_profile_info`. Apply this migration only after reviewing a database backup:

```bash
pnpm prisma migrate deploy
```

Register BALÖDER as a confidential client in Supabase Authentication → OAuth Server with these exact redirect URLs:

- Local: `http://localhost:3000/auth/callback`
- Production: `https://YOUR-BALODER-DOMAIN/auth/callback`

Copy `.env.example` to `.env.local` and use the same Supabase project/physical database as BAL ID. A BALÖDER deletion removes only BALÖDER product data; it never deletes the central BAL ID identity.

The BALÖDER website is built with Next.js and pnpm.

## BAL Asistan

The Bornova Anadolu Lisesi AI assistant is available at `/asistan` and is
served from the same BALÖDER application. It uses a verified BAL-specific
knowledge base, contextual BM25 selection, a Gemini model chain, cached default
questions, and the BALÖDER database for usage, feedback, and suggestions.

Assistant routes:

- `/asistan` - chat interface
- `/asistan/hakkinda` - project and technology information
- `/asistan/oneriler` - suggestions and corrections
- `/asistan/admin` - protected feedback and suggestion view

For local development:

```bash
pnpm install
pnpm dev
```

The default local command uses Turbopack through Next.js. `pnpm dev:turbo`
is kept as an equivalent explicit alias.

The production canonical URL for the assistant is `https://www.balogrenci.org/asistan`.
Assistant storage uses the separate `BAL_ASISTAN_DATABASE_URL` connection;
the main BALÖDER `DATABASE_URL` remains reserved for the BALÖDER application.

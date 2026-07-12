# BALÖDER

The BALÖDER website is built with Next.js and pnpm.

## BAL Asistan

The Bornova Anadolu Lisesi AI assistant is available at `/asistan` and is
served from the same BALÖDER application. It uses BAL-specific source data,
retrieval, Gemini models with Groq fallback, cached default questions, and
the BALÖDER database for usage, feedback, and suggestions.

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

The default local command uses webpack for reliable Windows development with
pnpm. `pnpm dev:turbo` is available on systems with symlink support.

The production canonical URL for the assistant is `https://balogrenci.org/asistan`.
Assistant storage uses the separate `BAL_ASISTAN_DATABASE_URL` connection;
the main BALÖDER `DATABASE_URL` remains reserved for the BALÖDER application.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project layout

- `src/app/` holds routes and Next.js special files only.
- `src/components/` holds shared UI. `src/components/ui/` is for primitives such as `Button`.
- `src/styles/` holds all CSS. `globals.css` is the entry; `tokens/` holds one `@theme` file per concern (colours, typography, motion, layout); `base.css` holds element rules. Components use Tailwind utilities, never their own stylesheets.
- `src/hooks/` holds React hooks used by more than one section, such as `useInView`.
- `src/lib/` holds non-UI code, one folder per concern. `site/config.ts` is site identity and URL.
- Import with the `@/` alias, for example `@/components/ui/button`.
- Prettier formats everything (`npm run format`), with the Tailwind plugin ordering class names. CI fails on unformatted files.
- Unit tests sit next to the code as `*.test.ts` or `*.test.tsx` and run with `npm test` (Vitest). Browser tests live in `e2e/` and run with `npm run test:e2e` (Playwright) against a production build on port 3100. Never kill processes by name to clean up; a dev server may be running.

# charalambous.network

John Charalambous's portfolio. One scrolling page: a particle headline and a 3D robot up top, then About, Work, Projects, Journey, Skills and Contact, with a rail down the left that follows you.

Live at [charalambous.network](https://charalambous.network), deployed by Vercel from `main`.

The site is dark by design. A pendant bulb in the top right of the hero switches on a light mode, remembered in a cookie; when it comes on, the robot turns away from the glare.

Journey is six lessons on a carousel of squares: the arrows, a swipe or the arrow keys move them through the middle, and the middle one opens its story in a window.

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS v4, with the design's colours, type scale and motion as theme tokens
- Vitest for unit tests, Playwright for browser tests
- A self-hosted Spline viewer for the robot

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. To view on a phone on the same network, the Mac's address is allowed in `next.config.ts`; update it if it changes.

## Scripts

| Command                  | What it does                                                     |
| ------------------------ | ---------------------------------------------------------------- |
| `npm run dev`            | Development server with hot reload                               |
| `npm run build`          | Production build                                                 |
| `npm start`              | Serve the production build                                       |
| `npm test`               | Unit tests (Vitest)                                              |
| `npm run test:e2e`       | Browser tests against a production build on port 3100            |
| `npm run lint`           | ESLint                                                           |
| `npm run format`         | Prettier, including Tailwind class ordering                      |
| `npm run vendor:spline`  | Re-copy the Spline viewer and scene into `public/spline`         |
| `npm run capture:poster` | Re-capture the still of the robot shown on phones (site running) |

CI runs lint, format check, unit tests, build and browser tests on every push and pull request.

## Layout

```
src/
  app/          routes and Next.js special files only
  components/   UI; sections/ has one folder per section, ui/ has shared primitives
  content/      the words, one file per section
  hooks/        React hooks shared by more than one section
  lib/          non-UI code: site identity, the particle engine, scroll maths
  styles/       Tailwind entry and one @theme file per concern
  proxy.ts      Content Security Policy with a per-request nonce
```

The section list in `src/content/sections.ts` drives both the rail and the page, so they cannot drift.

## Deployment

Vercel builds `main`. The site URL for metadata is taken from Vercel's production domain; set `NEXT_PUBLIC_SITE_URL` to override it (see `.env.example`).

Security headers are set in `next.config.ts`; the Content Security Policy, which needs a fresh nonce per request, is set in `src/proxy.ts`.

## Credits

Robot model: NEXBOT by ahmedkhaledemara0909 (Spline community), CC BY 4.0. See `public/spline/README.md` for how the viewer and scene are vendored.

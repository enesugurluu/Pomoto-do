# Repository Guidelines

## Project Structure & Module Organization
The Next.js app lives under `Pomoto-do/` and uses the App Router. Route folders such as `app/landing`, `app/pomodoro`, `app/pro-dashboard`, `app/projects`, `app/settings`, and `app/tasks` provide feature-specific screens, while shared layout logic sits in `app/layout.tsx` and `app/page.tsx`. Reusable feature components live in `components/`, with atomic primitives consolidated in `components/ui/`. Hooks reside in `hooks/`, cross-cutting utilities in `lib/utils.ts`, Tailwind globals in `styles/`, and static assets (logos, mockups, avatars) in `public/`.

## Build, Test, and Development Commands
Install dependencies with `pnpm install`. Run the development server via `pnpm dev` for hot-reloading during feature work. Use `pnpm build` to compile an optimized production bundle and surface type errors. Serve the compiled build with `pnpm start`. Lint and type-check the codebase using `pnpm lint`, which delegates to Next.js ESLint defaults.

## Coding Style & Naming Conventions
Write components in TypeScript (`.tsx`) using 2-space indentation, double-quoted imports, and named exports when practical. Leverage the `@/` base path alias for internal modules. Component files follow PascalCase (for example, `PomodoroTimer.tsx`), route directories stay kebab-case (`app/pro-dashboard`), and helper modules adopt camelCase. Compose styling with Tailwind classes; limit custom CSS to `styles/globals.css`. Prefix hooks with `use` and colocate feature-specific variants near their route or component.

## Testing Guidelines
Automated tests are not yet configured. When introducing coverage, prefer React Testing Library with Vitest for component behavior, place specs alongside the source (e.g., `component.test.tsx`), and document any manual QA performed in the pull request. Coordinate with maintainers before adding new tooling to ensure shared agreement on the stack.

## Commit & Pull Request Guidelines
Craft concise, imperative commit subjects (`Add pomodoro reset control`) and include explanatory bodies when the intent is non-obvious. Work on topic branches per feature or fix. Pull requests should describe the change, list affected routes or components, and attach screenshots for UI updates. Link relevant issues, call out configuration steps, and note any follow-up work needed for reviewers.

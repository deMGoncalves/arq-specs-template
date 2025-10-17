# Repository Guidelines

## Project Structure & Module Organization

The React 18 UI lives in `src/` with screens under `src/pages`, shared components in `src/components`, hooks and utilities in `src/hooks` and `src/lib`, and context providers in `src/context`. Specs sit in `specs/` (arc42, C4, ADR); keep numbered references intact and avoid importing runtime code into this folder. Place assets beside their owning module and keep `index.html` plus `src/main.jsx` as the single Vite entry.

## Build, Test, and Development Commands

- `bun install` — install dependencies from the lockfile; prefer reinstalling over patching drifts.
- `bun run dev` — start the Vite dev server.
- `bun run build` — produce the production bundle.
- `bun run preview` — serve the built assets.
- `bun run lint:specs` — validate architectural documents for consistency.

## Coding Style & Naming Conventions

Use ES modules with double quotes and two-space indents. Components use PascalCase; hooks start with `use`; context providers end in `Provider`. Keep Tailwind classes inline unless duplication emerges. Favor early returns, a single function call per line, and keep primitives wrapped as value objects when domain rules exist. Avoid magic numbers, flag args, and speculative abstractions.

## Testing Guidelines

Vitest with React Testing Library runs via `bun test`. Place feature tests alongside the page or component, e.g., `src/pages/__tests__/ExamplePage.test.jsx`. Log manual verification steps in PRs and add screenshots for UI updates. Raise or uphold coverage targets whenever instrumentation is added.

## Commit & Pull Request Guidelines

Follow Conventional Commits used in history (e.g., `docs:` or `chore:`) and reference relevant spec folders or rule IDs when the change touches them. PRs should clarify intent, separate runtime and spec changes, link related ADRs, and list reproduction plus manual-check steps. Confirm the branch rebases cleanly before requesting review and note any residual risks.

## Architecture & Collaboration Tips

Respect SOLID boundaries and direct dependencies toward stable modules. Prefer consumer-driven data access, capture rationale only when choices may surprise, and clean adjacent issues you touch. If uncertainty arises, review the appropriate ADR in `specs/` before introducing new patterns.

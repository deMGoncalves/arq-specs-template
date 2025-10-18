# Repository Guidelines

## Project Structure & Module Organization

- React 18 UI resides in `src/`; screens in `src/pages`, shared UI in `src/components`, hooks in `src/hooks`, and cross-cutting utilities in `src/lib`.
- Context providers live in `src/context`. Keep provider names descriptive and suffixed with `Provider`.
- Specs are in `specs/` (arc42, C4, ADR). Do not import runtime code here; maintain existing numbering and references.
- Place assets beside their owning module. `index.html` and `src/main.jsx` remain the sole Vite entry points.

## Build, Test, and Development Commands

- `bun install` — sync dependencies from `bun.lockb`; reinstall instead of patching.
- `bun run dev` — start the Vite dev server with HMR.
- `bun run build` — produce the optimized production bundle.
- `bun run preview` — serve the latest build locally.
- `bun run lint:specs` — lint architectural documents for consistency regressions.

## Coding Style & Naming Conventions

- Use ES modules, double quotes, and two-space indentation; keep one statement per line.
- Components use PascalCase, hooks begin with `use`, context providers end with `Provider`. Example: `src/context/SessionProvider.jsx`.
- Keep Tailwind classes inline until duplication warrants abstraction.
- Favor early returns, avoid flag arguments, and replace magic numbers with named value objects when domain rules apply.

## Testing Guidelines

- Run all tests with `bun test`; the suite uses Vitest and React Testing Library.
- Co-locate feature tests (e.g., `src/pages/__tests__/ExamplePage.test.jsx`) and mirror the target file name.
- Capture manual verification steps when submitting UI changes and raise coverage thresholds if instrumentation is added.

## Commit & Pull Request Guidelines

- Follow Conventional Commits, e.g., `feat: add session timeout banner`. Reference affected spec IDs when modifying `specs/`.
- PRs must separate runtime and spec diffs, describe intent, list reproduction steps, include screenshots for UI, and call out residual risks.
- Confirm your branch rebases cleanly before requesting review and link related ADR discussions when deviating from defaults.

## Security & Environment Practices

- Never commit secrets or `.env` files; prefer local `.env.example` updates if configuration changes.
- Address dependency alerts promptly and document mitigations in the relevant ADR when architectural trade-offs are involved.

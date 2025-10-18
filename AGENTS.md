# Repository Guidelines

## Project Structure & Module Organization
- React 18 app lives in `src/` with pages under `src/pages`, shared UI in `src/components`, hooks in `src/hooks`, and utilities in `src/lib`.
- Context providers belong in `src/context` and must end with `Provider` (e.g., `WorkspaceProvider.jsx`); review existing providers before wiring new state.
- Specs sit in `specs/`; keep numbering intact and never import runtime code there.
- Assets stay with their owning module; Vite entry points remain `src/main.jsx` and `index.html`.

## Build, Test, and Development Commands
- `bun install` installs dependencies from `bun.lockb`; prefer reinstalling over manual edits.
- `bun run dev` starts Vite with HMR; use for local iteration.
- `bun run build` generates the optimized production bundle; follow with `bun run preview` to serve the latest build.
- `bun run lint:specs` validates architectural documents; run after editing anything in `specs/`.

## Coding Style & Naming Conventions
- Use ES modules, double quotes, and two-space indentation; keep one statement per line.
- Components follow PascalCase, hooks start with `use`, and providers end with `Provider`.
- Keep Tailwind classes inline until repetition warrants extraction.

## Testing Guidelines
- Test with `bun test`; the suite uses Vitest and React Testing Library.
- Co-locate feature tests beside targets, e.g., `src/pages/__tests__/ExamplePage.test.jsx`.
- Document manual verification steps for UI changes and raise coverage thresholds when adding instrumentation.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat: add session timeout banner`); reference spec IDs when touching `specs/`.
- Keep runtime and spec diffs in separate PRs; outline intent, reproduction steps, screenshots for UI updates, and residual risks.
- Rebase before requesting review and link ADR threads when deviating from defaults.

## Security & Configuration Tips
- Never commit secrets or `.env`; update `.env.example` for new variables.
- Address dependency alerts quickly and record trade-offs in ADRs when necessary.

## Agent Workflow Notes
- Validate changes with `bun run dev` and `bun test` before handing off.
- Stage only relevant files; do not revert user changes.
- Avoid destructive commands (`git reset --hard`, `git checkout --`) unless explicitly requested.

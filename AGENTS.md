# Repository Guidelines

## Project Structure & Module Organization

- React 18 client lives under `src/`. Pages sit in `src/pages`, shared UI in `src/components`, reusable hooks in `src/hooks`, and cross-cutting utilities in `src/lib`.
- Context providers reside in `src/context` and end with `Provider`, for example `WorkspaceProvider.jsx`.
- Specs (arc42, C4, ADR) stay in `specs/`; keep numbering intact and never import runtime modules there.
- Assets belong beside their owning module. `src/main.jsx` and `index.html` remain the only Vite entry points.

## Build, Test, and Development Commands

- `bun install` — install dependencies from `bun.lockb`. Prefer reinstalling over manual edits.
- `bun run dev` — launch Vite with HMR for local development.
- `bun run build` — produce the optimized production bundle.
- `bun run preview` — serve the latest build artefacts.
- `bun run lint:specs` — verify architectural documents for consistency.

## Coding Style & Naming Conventions

- Use ES modules, double quotes, and two-space indentation. Keep one statement per line.
- Components use PascalCase, hooks start with `use`, and context providers end with `Provider`.
- Keep Tailwind class names inline until duplication warrants abstraction. Favor early returns and avoid flag arguments.

## Testing Guidelines

- Run the full suite with `bun test`. The project uses Vitest plus React Testing Library.
- Co-locate feature tests next to their targets (e.g., `src/pages/__tests__/ExamplePage.test.jsx`) and mirror the file name.
- Document manual verification steps when shipping UI updates and raise coverage thresholds if instrumentation is added.

## Commit & Pull Request Guidelines

- Follow Conventional Commits (e.g., `feat: add session timeout banner`). Reference spec IDs when touching `specs/`.
- PRs must separate runtime and spec diffs, explain intent, outline reproduction steps, include screenshots for UI, and call out residual risks.
- Rebase before requesting review and link ADR threads when diverging from defaults.

## Security & Configuration Tips

- Never commit secrets or `.env` files. Update `.env.example` instead if configuration changes.
- Address dependency alerts quickly and record mitigations in the relevant ADR when trade-offs are involved.

## Agent Workflow Notes

- Review existing context in `WorkspaceProvider.jsx` before wiring new features.
- Validate changes locally with `bun run dev` and `bun test`, then stage only relevant files to keep diffs focused.

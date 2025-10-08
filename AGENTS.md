# Repository Guidelines

## Project Structure & Module Organization
The repository is documentation-first. Specs live in `specs/` across the 12 arc42 sections that drive SDD. Use `specs/02_constraints/patterns/` for governance rules, `specs/05_building-blocks/containers/` for C4 containers, and nested component directories (`CMP-`) for level-3 artifacts. Keep `09_decisions/adrs/` synchronized with any new pattern or structural change, and refresh summary files such as `specs/README.md` when updating statuses.

## Build, Test, and Development Commands
There is no compile step; contributors work directly with Markdown. Run `markdownlint '**/*.md'` to enforce formatting consistency (install via `npm install -g markdownlint-cli` if not already available). Use `rg 'Última Atualização' specs` to verify timestamps and `find specs -name '*.md' | sort` to review generated artifacts before submission.

## Coding Style & Naming Conventions
Prefer ATX headings (`#` style) and keep one top-level heading per document. Follow the prefix-number-name pattern already in the tree, e.g., `ACT-001_nome.md`, `CNT-003_backend-api.md`, `CMP-010_component-name.md`. File names use lowercase kebab-case after the numeric token. Within specs, bold field labels (e.g., **Contexto**) and avoid HTML unless required for tables.

## Testing Guidelines
Treat linting plus manual cross-reference checks as the quality gate. Ensure every new component or pattern links back to its parent (`⬆️ Parent`) and forward to governing ADRs or quality rules (`📝 ADR`, `🎯 Quality`). When adding scenarios under `06_runtime/scenarios/`, mirror the numbering found in the main runtime view and validate navigation paths by opening them locally.

## Commit & Pull Request Guidelines
Use Conventional Commits (`docs:`, `feat:`, `fix:`) and reference impacted artifacts, e.g., `docs(02): atualiza regra SRP`. Branch names should be descriptive (`docs/add-runtime-scenario`). Pull requests must explain the motivation, list touched spec sections, and include before/after notes for critical tables or diagrams. Link related issues and attach screenshots when editing visual assets.

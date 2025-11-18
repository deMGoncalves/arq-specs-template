# Claude Commands - Arc42 Documentation Commands

**Version**: 1.0.0
**Last Updated**: 2025-11-17

---

## 📋 Overview

This directory contains **15 slash commands** for creating and maintaining Arc42 specification documents. These commands are designed to be used by the **analyst**, **architect**, and **developer** skills during the 7-phase workflow.

---

## 🎯 Purpose

These commands provide **standardized, automated workflows** for documenting every aspect of an Arc42 architecture:

- **Vision & Context** - Product vision, stakeholders, actors, systems
- **Constraints & Stack** - Technical constraints, technology stack, ADRs
- **Building Blocks** - Containers, components, patterns
- **Runtime** - Features, flows, scenarios, state machines
- **Infrastructure** - Deployment, quality, observability
- **Governance** - Code implementation, statistics, imports

---

## 📂 Available Commands (15 Total)

### **Phase 1-2: Vision & Constraints**

| Command | Description | Arc42 Chapters | Used By |
|---------|-------------|----------------|---------|
| `/vision` | Defines vision, goals, scope, stakeholders, actors, systems | 1, 3, 12 | analyst |
| `/stack` | Defines tech stack, constraints, solution strategy, ADRs | 2, 4, 9, 12 | architect, analyst |

### **Phase 3: Building Blocks**

| Command | Description | Arc42 Chapters | Used By |
|---------|-------------|----------------|---------|
| `/actor` | Documents external actors (personas/users) or systems | 3, 12 | analyst |
| `/container` | Documents high-level building blocks (services, apps, DBs) | 5, 12 | analyst |
| `/component` | Documents code modules/components within containers | 5, 12 | analyst |
| `/plan` | Creates building block view + runtime scenarios | 5, 6, 12 | analyst |
| `/rule` | Creates/updates code patterns (coding rules) | 2, 12 | architect |

### **Phase 3: Runtime & Features**

| Command | Description | Arc42 Chapters | Used By |
|---------|-------------|----------------|---------|
| `/feature` | Creates BDD scenarios for features (runtime view) | 6, 12 | analyst |
| `/flow` | Documents runtime journeys, state machines, background jobs | 6, 12 | analyst |

### **Phase 3-4: Infrastructure & Quality**

| Command | Description | Arc42 Chapters | Used By |
|---------|-------------|----------------|---------|
| `/build` | Defines deployment, pipelines, quality requirements, SLOs | 7, 10, 12 | analyst, architect |
| `/cross` | Documents crosscutting concepts (security, domain model, etc.) | 8, 12 | architect |

### **Phase 2-3: Decisions**

| Command | Description | Arc42 Chapters | Used By |
|---------|-------------|----------------|---------|
| `/adr` | Registers architectural decisions (ADR) | 9, 12 | architect, analyst |

### **Phase 4: Implementation**

| Command | Description | Arc42 Chapters | Used By |
|---------|-------------|----------------|---------|
| `/code` | Orchestrates code implementation aligned with all specs | 11 | developer |

### **Meta Commands**

| Command | Description | Arc42 Chapters | Used By |
|---------|-------------|----------------|---------|
| `/import` | Imports external document and orchestrates all commands | 1-12 | analyst |
| `/stats` | Generates dashboard showing spec health and gaps | 1-12 | analyst, architect |

---

## 🔄 Command Integration with Skills

### **Analyst Skill** (Phase 1: Discovery, Phase 3: Specification)

**Phase 1 - Discovery:**
- User provides feature request
- Analyst creates `proposal.md`

**Phase 3 - Specification:**
When creating `spec.md`, the analyst **orchestrates** these commands:

```markdown
1. `/vision` - Creates introduction, context, actors, systems
2. `/stack` - Defines constraints, tech stack, solution strategy
3. `/plan` - Creates building blocks + runtime view
4. `/feature` - Adds BDD scenarios for each feature
5. `/flow` - Documents state machines and background jobs
6. `/build` - Defines deployment and quality requirements
7. `/cross` - Documents crosscutting concerns
```

### **Architect Skill** (Phase 2: Architecture - HIGH complexity only)

When creating `design.md`, the architect uses:

```markdown
1. `/stack` - Defines tech stack and first ADRs
2. `/adr` - Creates additional ADRs for key decisions
3. `/rule` - Defines coding patterns
4. `/cross` - Documents architectural concepts
5. `/build` - Defines infrastructure strategy
```

### **Developer Skill** (Phase 4: Implementation)

```markdown
1. `/code` - Reads all specs/, evaluates code gaps, implements changes
```

### **Meta Usage**

```markdown
# Import external document
/import path/to/requirements.md

# Check spec health
/stats
```

---

## 📝 Command Format

All commands follow Claude Code's Markdown format:

```markdown
---
description: Brief command description
---

# Command Name

## User Input
{{args}}

## Goal
What this command achieves

## Operating Constraints
Rules and restrictions

## Execution Steps
Step-by-step procedure

## Context
Templates, artifacts, references
```

---

## 🎨 Output Format

All commands generate:

1. **Updated Arc42 files** - Created/modified documents in `specs/`
2. **Glossary updates** - New terms added to `specs/12_glossary/012_glossary.md`
3. **Summary report** - Checklist of changes and verification steps

Example output:

```text
✅ ACTOR DOCUMENTADO

Atualizações:
• specs/03_context/actors/ACT-001_admin.md
• specs/03_context/003_context-and-scope.md
• specs/12_glossary/012_glossary.md

Resumo:
- Criado ator Admin com permissões de sistema
- Atualizado contexto com novo ator
- Adicionados 3 termos ao glossário

Verificações sugeridas:
- bun run lint:specs
```

---

## 📚 Arc42 Chapter Mapping

| Arc42 Chapter | Commands | Purpose |
|---------------|----------|---------|
| **1. Introduction** | `/vision` | Product vision, goals, stakeholders |
| **2. Constraints** | `/stack`, `/rule` | Technical constraints, patterns |
| **3. Context** | `/vision`, `/actor` | Business context, actors, systems |
| **4. Solution Strategy** | `/stack` | Tech stack, architecture approach |
| **5. Building Blocks** | `/container`, `/component`, `/plan` | System decomposition |
| **6. Runtime** | `/feature`, `/flow`, `/plan` | Scenarios, events, state machines |
| **7. Deployment** | `/build` | Infrastructure, environments, pipelines |
| **8. Crosscutting** | `/cross` | Domain model, security, patterns |
| **9. Decisions** | `/adr`, `/stack` | ADRs and rationale |
| **10. Quality** | `/build` | Quality scenarios, SLOs, metrics |
| **11. Risks** | `/code` | Technical debt, risks |
| **12. Glossary** | ALL | Ubiquitous language |

---

## 🔍 Usage Examples

### Example 1: Start New Project
```bash
# User: "Create project for e-commerce platform"
/vision Create e-commerce platform for small businesses with inventory, orders, payments
```

**Output**: Creates `001_introduction-and-goals.md`, `003_context-and-scope.md`, actors, systems, glossary

### Example 2: Define Tech Stack
```bash
# User: "Use Node.js, PostgreSQL, Redis"
/stack Node.js 20 LTS for backend, PostgreSQL 15 for database, Redis for caching, Docker for containers
```

**Output**: Creates constraints, solution strategy, ADR-001, updates glossary

### Example 3: Document Component
```bash
# User: "Document OrderService component"
/component OrderService in order-management container, handles order creation, validation, and state transitions
```

**Output**: Creates `CMP-001_order-service.md`, updates container if needed, updates glossary

### Example 4: Add Feature
```bash
# User: "Add checkout flow"
/feature User completes checkout with payment processing, inventory reservation, and order confirmation
```

**Output**: Creates `SCN-001_checkout.md` with BDD scenarios, updates runtime view, updates glossary

### Example 5: Implement Code
```bash
# User: "Implement all specs"
/code
```

**Output**: Reads all specs, evaluates gaps, implements code, updates risks/debt document

### Example 6: Check Health
```bash
# User: "How complete are my specs?"
/stats
```

**Output**: Dashboard with coverage %, placeholders, risks, suggested actions

---

## ⚙️ Technical Details

### ID Conventions

All artifacts use 3-digit IDs (001-999):

- **Actors**: `ACT-XXX`
- **Systems**: `SYS-XXX`
- **Containers**: `CNT-XXX`
- **Components**: `CMP-XXX`
- **Scenarios**: `SCN-XXX`
- **ADRs**: `ADR-XXX`
- **Patterns**: `CATEGORY-XXX` (e.g., `CRIACIONAL-001`)
- **Risks**: `R-XXX`
- **Technical Debt**: `TD-XXX`

### Slug Format

- **Style**: kebab-case
- **Rules**: lowercase, hyphens, no accents
- **Max length**: 50-60 characters
- **Examples**: `email-validator`, `admin-user`, `use-postgresql`

### Metadata

All documents maintain:

- **Status**: 🔴 Draft, 🟡 In Progress, 🟢 Active
- **Created**: YYYY-MM-DD
- **Last Updated**: YYYY-MM-DD
- **Version**: Semantic versioning (e.g., 1.0, 1.1, 2.0)
- **Responsible**: Team/person

### Template References

All commands reference templates in `.claude/templates/`:

- `.claude/templates/arc42/` - 12 Arc42 chapter templates
- `.claude/templates/c4/` - C4 model templates
- `.claude/templates/bdd/` - BDD scenario templates
- `.claude/templates/adr/` - ADR templates

---

## 🛠️ Implementation Notes

### Sequential Execution

Some commands orchestrate others:

- `/import` → executes `/vision` → `/stack` → `/plan` → `/feature` → `/build`
- `/plan` → can invoke `/container` and `/component` as needed

### Glossary Synchronization

**CRITICAL**: All commands **MUST** update the glossary when introducing:
- New terms
- Domain concepts
- Technical acronyms
- Events, states, entities
- Metrics, SLIs, SLOs

### Template Compliance

Commands ensure:
- ✅ No `[PREENCHER]` placeholders left
- ✅ All template sections filled
- ✅ Glossary updated
- ✅ IDs sequential and unique
- ✅ Links valid and relative
- ✅ Metadata current
- ✅ Portuguese technical language

---

## 🧪 Quality Checks

All commands follow these rules:

1. **Read template first** - Always consult `.claude/templates/` before editing
2. **Preserve structure** - Keep headings, tables, metadata format
3. **No placeholders** - Replace all `[PREENCHER]` with real content
4. **Update dates** - Set `**Última atualização**` to current date (YYYY-MM-DD)
5. **Sequential IDs** - Use next available number (max + 1)
6. **Cross-references** - Link to related artifacts
7. **Glossary sync** - Add new terms alphabetically
8. **Validation** - Suggest `bun run lint:specs` after changes

---

## 🔗 Related Documentation

- **Main Workflow**: `.claude/skills/README.md` - 7-phase workflow
- **Skills**: `.claude/skills/[skill-name]/README.md` - Individual skill docs
- **Templates**: `.claude/templates/README.md` - Template documentation
- **Constitution**: `.claude/constitution.md` - Core principles
- **Arc42**: https://arc42.org/
- **C4 Model**: https://c4model.com/
- **BDD**: https://cucumber.io/docs/bdd/

---

## ⚠️ Important Notes

### For AI Agents

1. **Always** update glossary when introducing new terms
2. **Preserve** existing IDs when updating documents
3. **Maintain** chronological order in history sections
4. **Reference** related artifacts (containers, ADRs, scenarios)
5. **Validate** links point to existing files
6. **Use** Portuguese Brazilian technical language
7. **Follow** template structure exactly
8. **Report** changes in standard format

### For Human Users

1. Commands are designed for **AI agent execution**
2. Use commands via **analyst**, **architect**, or **developer** skills
3. Commands ensure **consistency** across 12 Arc42 chapters
4. All outputs are **markdown files** in `specs/`
5. Run `bun run lint:specs` to validate after changes
6. Review generated files for accuracy and completeness

---

## 📊 Command Dependency Graph

```
/import (orchestrator)
  ├── /vision
  ├── /stack
  │   └── /adr
  ├── /plan
  │   ├── /container
  │   └── /component
  ├── /feature
  ├── /flow
  └── /build

/code (reads all specs/)
/stats (audits all specs/)

Independent:
  - /actor
  - /rule
  - /cross
  - /adr
```

---

## 🚀 Quick Reference

### Most Common Workflows

**New Feature (LOW/MEDIUM complexity):**
```
analyst → /vision → /plan → /feature → /build
```

**New Feature (HIGH complexity):**
```
analyst → /vision
architect → /stack → /adr → /rule → /cross
analyst → /plan → /feature → /build
developer → /code
```

**Update Architecture:**
```
architect → /adr → /stack → /cross
```

**Document Existing Code:**
```
analyst → /vision → /plan
developer → /code
```

**Import External Spec:**
```
analyst → /import path/to/spec.md
```

**Health Check:**
```
analyst → /stats
```

---

## 📖 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-17 | Initial version with all 15 commands |

---

**Maintained by**: Specification-Driven Workflow System v2.0.0
**License**: See project root

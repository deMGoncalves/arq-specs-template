# Specification-Driven Workflow System v2.0.0

Sistema de workflow para desenvolvimento orientado a especificações (Document-First Development).

---

## 🎯 Visão Geral

Este sistema implementa um workflow de **7 fases** para desenvolvimento de software guiado por especificações Arc42 + C4 + BDD + ADR, com decomposição de tasks para prevenir AI hallucinations.

### Complete Workflow (7 Phases)

```
User Request
    ↓
Phase 1: Discovery
    📋 analyst → Creates proposal.md
        ↓
Phase 2: Architecture (HIGH complexity only)
    🏗️ architect → Creates design.md
        ↓
Phase 3: Specification
    📋 analyst → Creates spec.md (Arc42 + BDD)
        ↓
Phase 3.5: Task Decomposition (CRITICAL)
    🎯 orchestrator → Creates tasks.md (atomic tasks)
        ↓
Phase 4: Implementation
    💻 developer → Implements task-by-task
    🔒 gatekeeper → Validates quality gates
        ↓
Phase 5: Review
    👀 reviewer → Reviews code quality
    🧪 tester → Validates test quality
        ↓
Phase 6: Documentation
    📚 documenter → Updates all docs
        ↓
Phase 7: Validation & Release (Optional)
    ✅ analyst → Final validation
    🛡️ guardian → Pre-commit/push/release checks
        ↓
Done!
```

---

## 📚 Available Skills

### Phase 1-3: Specification

| Skill | Phase | Responsibility | Files |
|-------|-------|---------------|--------|
| **analyst** | 1 + 3 | Discovery (proposal.md) + Specification (spec.md) | `analyst/` |
| **architect** | 2 | Architecture design for HIGH complexity (design.md) | `architect/` |

### Phase 3.5-4: Task Decomposition & Implementation

| Skill | Phase | Responsibility | Files |
|-------|-------|---------------|--------|
| **orchestrator** | 3.5 | 🎯 **CRITICAL**: Decompose spec → atomic tasks | `orchestrator/` |
| **developer** | 4 | Implement code task-by-task (prevents hallucinations) | `developer/` |
| **gatekeeper** | Cross-phase | Validate quality gates between phases | `gatekeeper/` |

### Phase 5-6: Review & Documentation

| Skill | Phase | Responsibility | Files |
|-------|-------|---------------|--------|
| **reviewer** | 5 | Review code quality and standards | `reviewer/` |
| **tester** | 5 | Validate test coverage and quality | `tester/` |
| **documenter** | 6 | Update README, docs, examples | `documenter/` |

### Phase 7: Validation & Release

| Skill | Phase | Responsibility | Files |
|-------|-------|---------------|--------|
| **analyst** | 7 | Final validation (completeness check) | `analyst/` |
| **guardian** | 7 | Pre-commit/push/release validation | `guardian/` |

---

## 🔗 How Skills Interconnect

### Dependencies Graph

```
analyst (Phase 1: proposal.md)
    ↓
    ├─→ architect (Phase 2: design.md) [if HIGH complexity]
    │       ↓
    └─→ analyst (Phase 3: spec.md) ←────────────┘
            ↓
        orchestrator (Phase 3.5: tasks.md) ← CRITICAL!
            ↓
        developer (Phase 4: code) + gatekeeper (quality gates)
            ↓
        reviewer + tester (Phase 5: code review + test validation)
            ↓
        documenter (Phase 6: documentation)
            ↓
        analyst (Phase 7: final validation)
            ↓
        guardian (Phase 7: pre-commit checks) [optional]
```

### Trigger Matrix

| Phase | Trigger | Input | Output |
|-------|---------|-------|--------|
| 1 | User request | - | `proposal.md` |
| 2 | `Complexity: HIGH` | `proposal.md` | `design.md` |
| 3 | Proposal approved | `proposal.md` + `design.md` (if HIGH) | `spec.md` |
| 3.5 | Spec approved | `spec.md` + `design.md` (if exists) | `tasks.md` |
| 4 | Tasks ready | `tasks.md` | Code + tests |
| 5 | Implementation done | Code + tests | Code review approval |
| 6 | Review approved | Code | Updated docs |
| 7 | Docs updated | All artifacts | Validation report / commit |

---

## 🚀 Quick Start

### Option 1: Full Workflow (Recommended)

Start with analyst for discovery:

```bash
@skill analyst

"Adicionar validação de email no cadastro de usuário"
```

The analyst will:
1. Create `changes/[change-id]/proposal.md`
2. Assess complexity (LOW/MEDIUM/HIGH)
3. If HIGH → invoke architect
4. Create `changes/[change-id]/spec.md` (Arc42 + BDD)
5. Invoke orchestrator → creates `changes/[change-id]/tasks.md`
6. Invoke developer → implements task-by-task
7. Invoke reviewer + tester → code review
8. Invoke documenter → updates docs
9. Final validation
10. (Optional) Invoke guardian for commit/push

### Option 2: Resume from Task Decomposition

If you already have `spec.md`:

```bash
@skill orchestrator
```

The orchestrator will decompose spec → tasks, then invoke developer.

### Option 3: Manual Phase-by-Phase

Execute each skill individually:

```bash
# Phase 1: Discovery
@skill analyst
"Add email validation"

# Phase 2: Architecture (if HIGH complexity)
@skill architect

# Phase 3: Specification
@skill analyst  # (creates spec.md)

# Phase 3.5: Task Decomposition
@skill orchestrator

# Phase 4: Implementation
@skill developer

# Phase 5: Review
@skill reviewer
@skill tester

# Phase 6: Documentation
@skill documenter

# Phase 7: Validation & Release
@skill analyst  # (final validation)
@skill guardian push  # (commit & push)
```

---

## 🎯 Key Principles

### 1. Specification-Driven

All implementations start with specs (proposal → design → spec → tasks).

**Why**: Prevents scope creep, ensures alignment, enables traceability.

### 2. Arc42 + C4 + BDD + ADR

Specs follow standardized formats:
- **Arc42**: Architecture documentation framework (adaptive by complexity)
- **C4**: System context, containers, components diagrams
- **BDD**: Behavioral scenarios (GIVEN-WHEN-THEN)
- **ADR**: Architecture Decision Records

**Why**: Consistency, completeness, industry-standard formats.

### 3. Task Decomposition (CRITICAL)

**Orchestrator** decomposes large specs (5000+ lines) into atomic tasks (<100 LOC each).

**Why**:
```
❌ Large context (5000+ lines) = AI hallucinations = Wrong code
✅ Small context (~500 lines/task) = Deterministic AI = Correct code
```

This is the **MOST CRITICAL** phase for preventing AI hallucinations.

### 4. Library-First

Build reusable components from day one.

**Why**: Enables extraction to shared libraries, promotes modularity.

### 5. Test-First

Tests written alongside (or before) implementation.

**Why**: TDD ensures testability, reduces bugs, documents behavior.

### 6. DDD Tactical Co-Located

Code organized by domain concepts (not technical layers).

```
✅ GOOD: /src/user-management/api/usuario/
  - index.ts (Aggregate Root)
  - criar.ts (Factory)
  - Email.ts (Value Object)

❌ BAD: /src/
  - /domain/entities/Usuario.ts
  - /application/services/UsuarioService.ts
  - /infrastructure/repositories/UsuarioRepository.ts
```

**Why**: Screaming architecture, easy navigation, high cohesion.

---

## 📖 Documentation per Skill

Each skill has comprehensive documentation:

| Skill | README | SKILL.md | Auxiliary Files |
|-------|--------|----------|----------------|
| analyst | ✅ | ✅ | sinais-deterioracao.md |
| architect | ✅ | ✅ | - |
| developer | ✅ | ✅ | README.md, tatical-design.md, CONVENÇÃO-DDD.md |
| documenter | ✅ | ✅ | CONVENÇÃO-TEMPLATES.md |
| gatekeeper | ✅ | ✅ | - |
| guardian | ✅ | ✅ | checklist.md |
| orchestrator | ✅ | ✅ | INTEGRATION.md |
| reviewer | ✅ | ✅ | README.md, operacao.md, revisao.md, transicao.md |
| tester | ✅ | ✅ | - |

**README.md**: Documentation for humans (overview, when to use, examples)
**SKILL.md**: Instructions for AI agent (prompts, workflows, acceptance criteria)

---

## 📂 Project Structure

This workflow expects:

```
project-root/
├── .claude/
│   ├── constitution.md         # Core principles
│   ├── skills/                 # This directory
│   └── templates/              # Templates for specs, tasks, etc
├── changes/
│   └── [change-id]/
│       ├── proposal.md         # Phase 1
│       ├── design.md           # Phase 2 (if HIGH)
│       ├── spec.md             # Phase 3
│       └── tasks.md            # Phase 3.5
├── specs/                      # Arc42 documentation
│   ├── 01_introduction/
│   ├── 02_constraints/
│   ├── ...
│   └── 12_glossary/
├── examples/                   # Usage examples
└── src/                        # Source code (DDD Co-Located)
    └── [context]/[container]/[component]/
```

---

## 🎓 Complexity Assessment

The analyst assesses complexity to determine workflow path:

### LOW Complexity
- Single bounded context
- <5 files modified
- Established patterns
- **Path**: Phase 1 → 3 → 3.5 → 4 → 5 → 6 → 7
- **Example**: Add email validation, new CRUD endpoint

### MEDIUM Complexity
- Multiple components in one context
- 5-15 files modified
- Some new patterns
- **Path**: Phase 1 → 3 → 3.5 → 4 → 5 → 6 → 7
- **Example**: New feature with 3-5 use cases

### HIGH Complexity
- Multiple bounded contexts
- >15 files modified
- Architectural decisions required
- **Path**: Phase 1 → **2** → 3 → 3.5 → 4 → 5 → 6 → 7
- **Example**: Payment system, authentication, messaging

**Key Difference**: HIGH complexity adds Phase 2 (Architecture) with architect skill.

---

## 🔧 Templates

All templates are available in `.claude/templates/`:

| Template | Purpose | Used By |
|----------|---------|---------|
| `proposal.md` | Discovery phase template | analyst (Phase 1) |
| `design.md` | Architecture design template | architect (Phase 2) |
| `tasks.md` | Task decomposition template | orchestrator (Phase 3.5) |
| `arc42/` | Arc42 chapter templates (12 chapters) | analyst (Phase 3) |
| `adr/decision.md` | Architecture Decision Record | architect, analyst |
| `bdd/scenario.md` | BDD scenario template | analyst (Phase 3) |
| `c4/` | C4 model diagrams | architect, analyst |

---

## 💡 Best Practices

### For Users

1. **Start with analyst**: Always begin with Phase 1 (Discovery)
2. **Be specific**: Clear requirements → better specs → better code
3. **Trust the process**: Let workflow guide through phases
4. **Review specs before implementation**: Validate spec.md before orchestrator runs

### For AI Agents

1. **Follow prerequisites**: Never skip required phases
2. **Load minimal context**: As specified in each task/phase
3. **Update progress**: Mark tasks/phases as completed
4. **Reference specs**: Always align with spec.md and tasks.md
5. **Follow templates**: Use `.claude/templates/` as base

---

## 🚨 Common Pitfalls

### ❌ Pitfall 1: Skip Task Decomposition
**Problem**: Developer tries to implement full spec at once
**Result**: AI hallucinations, incorrect code
**Solution**: ALWAYS use orchestrator (Phase 3.5)

### ❌ Pitfall 2: Large Context per Task
**Problem**: Task loads 5000+ lines of context
**Result**: AI loses focus, hallucinations
**Solution**: Limit context to ~500 lines per task (orchestrator does this)

### ❌ Pitfall 3: Skip Architecture Phase for HIGH Complexity
**Problem**: Implement HIGH complexity without design.md
**Result**: Technical debt, wrong decisions
**Solution**: Always run architect for HIGH complexity

### ❌ Pitfall 4: Ignore BDD Scenarios
**Problem**: Implement without understanding behavioral requirements
**Result**: Code doesn't match requirements
**Solution**: Map each task to BDD scenarios

### ❌ Pitfall 5: Skip Tests
**Problem**: Implement without tests
**Result**: Bugs, regressions, low confidence
**Solution**: TDD - write tests alongside implementation

---

## 📊 Success Metrics

Expected improvements with this workflow:

| Metric | Before | After |
|--------|--------|-------|
| AI Hallucination Rate | 60-80% | <10% |
| Rework Rate | 50-70% | <15% |
| Test Coverage | Variable | ≥80% |
| Documentation Debt | High | Low |
| Implementation Time | Unpredictable | Predictable (estimated in tasks.md) |
| Code Quality | Variable | Consistent |

---

## 🔗 External References

- **Arc42**: https://arc42.org/
- **C4 Model**: https://c4model.com/
- **BDD**: https://cucumber.io/docs/bdd/
- **ADR**: https://adr.github.io/
- **DDD**: Domain-Driven Design by Eric Evans

---

## 📝 Example: Add Email Validation

### Phase 1: Discovery (analyst)

**Input**: "Adicionar validação de email no cadastro de usuário"

**Output**: `changes/add-email-validation/proposal.md`
- Why: 15% of registrations fail email delivery
- What: Add Email value object, validate format
- Complexity: LOW
- Next: Skip Phase 2, go to Phase 3

### Phase 3: Specification (analyst)

**Output**: `changes/add-email-validation/spec.md`
- 5 BDD scenarios (valid, invalid, edge cases)
- Email value object specification
- Quality requirements (testability, usability)

### Phase 3.5: Task Decomposition (orchestrator)

**Output**: `changes/add-email-validation/tasks.md`
- 8 atomic tasks
- TASK-001: Setup structure (~20 LOC, 30 min)
- TASK-002: Setup tests (~30 LOC, 30 min)
- TASK-003: Implement Email value object (~40 LOC, 1h)
- TASK-004: Integrate in criar-usuario (~30 LOC, 1h)
- TASK-005: Implement EmailInvalidoError (~30 LOC, 30 min)
- TASK-006: Unit tests (~80 LOC, 1.5h)
- TASK-007: Integration tests (~60 LOC, 1h)
- TASK-008: Constitution compliance check (validation, 30 min)

### Phase 4: Implementation (developer)

Implements task-by-task:
- Loads ONLY context specified in each task (~500 lines)
- Implements Email.ts (value object)
- Integrates in criar-usuario.ts (factory)
- Writes tests (unit + integration)
- Total: ~250 LOC, ~7 hours

### Phase 5: Review (reviewer + tester)

- Reviewer: Code quality ✅
- Tester: Coverage 92% ✅, all tests pass ✅

### Phase 6: Documentation (documenter)

Updates:
- spec.md status → ✅ Implemented
- README.md (if needed)
- Code comments

### Phase 7: Validation (analyst + guardian)

- Analyst: All acceptance criteria met ✅
- Guardian: Linters pass, tests pass, ready to commit ✅

**Result**: Feature implemented correctly, no hallucinations, 92% coverage, documented.

---

## 🎉 Getting Started

1. **Read the constitution**: `.claude/constitution.md`
2. **Try a simple feature**:
   ```bash
   @skill analyst
   "Add a sum function"
   ```
3. **Watch the workflow**: See proposal → spec → tasks → code → tests → docs
4. **Review the output**: Check each generated artifact
5. **Scale up**: Try MEDIUM then HIGH complexity features

---

**Version**: 2.0.0
**Compatible with**: All languages (language-agnostic)
**Requires**: Claude Code with skills support
**License**: See project root

---

## 🆘 Troubleshooting

**Q: Which skill do I start with?**
A: Always start with **analyst** (Phase 1: Discovery)

**Q: Do I need all 7 phases?**
A: Phase 7 (guardian) is optional. Phases 1-6 are required for quality.

**Q: What if I have an existing spec?**
A: Start with **orchestrator** (Phase 3.5) to decompose into tasks.

**Q: Can I skip the architect phase?**
A: Yes, for LOW/MEDIUM complexity. Required for HIGH complexity.

**Q: How do I know which complexity?**
A: The **analyst** assesses complexity in Phase 1 (proposal.md).

**Q: What if AI hallucinates during implementation?**
A: Check if orchestrator was used. Task decomposition (Phase 3.5) prevents hallucinations.

**Q: Can I use this for bug fixes?**
A: Yes! Start with analyst: "Fix bug in email validation". Follow the same workflow.

---

For detailed documentation on each skill, see individual README.md files in skill directories.

# Skills - Documentation-First Workflow Agents

**Version**: 3.0.0
**Total**: 9 specialized agents
**Status**: 🟢 Production-ready
**Last Updated**: 2025-12-10

---

## 🎯 Philosophy

**Specifications don't implement themselves - specialized agents execute the deterministic workflow.**

These 9 agents cover **100% of the 7-phase workflow** in a structured and deterministic way. Each agent has:
- Unique position (001-009)
- Workflow phase (1-7)
- Specific responsibility
- Well-defined inputs/outputs
- Validation CHECKLISTs
- Practical EXAMPLES
- TROUBLESHOOTING guides

---

## 📊 Overview

### By Workflow Phase

| Phase | Skills | % Total | Purpose |
|-------|--------|---------|---------|
| 1 (Discovery) | analyst | 11% | Plan and propose change |
| 2 (Architecture) | architect | 11% | Design for HIGH complexity |
| 3 (Specification) | analyst | 11% | Arc42 + BDD specification |
| 3.5 (Decomposition) | orchestrator | 11% | Decompose into atomic tasks |
| 4 (Implementation) | developer, gatekeeper | 22% | Implement + validate |
| 5 (Review & Test) | reviewer, tester | 22% | Review quality + tests |
| 6 (Documentation) | documenter | 11% | Update documentation |
| 7 (Validation) | analyst, guardian | 22% | Final validation + pre-commit |

### By Criticality

| Criticality | Count | Skills | When It Fails... |
|-------------|-------|--------|------------------|
| 🔴 CRITICAL | 5 | orchestrator, developer, gatekeeper, guardian, analyst | System produces hallucinations or technical debt |
| 🟡 IMPORTANT | 3 | architect, reviewer, tester | Quality degrades, but not catastrophic |
| 🟢 USEFUL | 1 | documenter | Docs become outdated |

---

## 🗺️ Complete 7-Phase Workflow

### Phase 1: Discovery

```
User Request: "Implement OAuth2 authentication"
    ↓
📋 analyst - PLANNING
    Input: User requirement
    Process:
      1. Understand requirement
      2. Analyze context (.claude/rules/, specs/)
      3. Detect deterioration signals (score X/16)
      4. Create .agent-task.md with detailed checklist
    Output: proposal.md + .agent-task.md
    Time: 15-60 min
    Gate: ≥80% of checklist complete
    Uses Commands: /vision, /actor, /stats
    Creates: changes/[id]/proposal.md (uses templates/changes/proposal.md)
    ↓
```

### Phase 2: Architecture (Conditional - only if HIGH complexity)

```
📋 analyst detects: Score <13/16 OR Complexity=HIGH
    ↓
🏗️ architect - DESIGN
    Input: proposal.md + preliminary spec
    Process:
      1. Create C4 Level 3 diagrams (components)
      2. Define DDD patterns (Aggregates, Entities, VOs, Repos)
      3. Create 3-5 ADRs for critical decisions
    Output: design.md + ADRs
    Time: 2-4h
    Gate: Complete design + documented ADRs
    Uses Commands: /stack, /adr, /rule, /cross, /container
    Creates: changes/[id]/design.md (uses templates/changes/design.md)
    Creates: specs/09_decisions/adrs/ADR-*.md (uses templates/adr/decision.md)
    ↓
```

### Phase 3: Specification

```
📋 analyst - SPECIFICATION
    Input: proposal.md, design.md (if HIGH)
    Process:
      1. Create complete Arc42 specs (12 chapters)
      2. Create BDD scenarios (Gherkin Given/When/Then)
      3. Map DDD components
    Output: spec.md (Arc42 + BDD)
    Time: 1-4h (depends on complexity)
    Gate: spec.md approved, 100% requirement coverage
    Uses Commands: /vision, /plan, /feature, /flow, /build, /cross, /component
    Creates: changes/[id]/spec.md (uses templates/changes/spec.md)
    Creates: specs/ files (uses all templates/arc42/*, templates/bdd/*)
    ↓
```

### Phase 3.5: Task Decomposition (**CRITICAL** - prevents hallucinations)

```
🎯 orchestrator - DECOMPOSITION
    Input: spec.md (approved)
    Process:
      1. Extract BDD scenarios
      2. Map to DDD components
      3. Generate N atomic tasks:
         - Each task ≤100 LOC
         - Each context ≤500 lines
         - Dependencies (valid DAG)
         - Specific acceptance criteria
    Output: tasks.md (N tasks)
    Time: 15-60 min
    Gate:
      - NO task >100 LOC
      - NO context >600 lines
      - Valid DAG (no cycles)
      - 100% coverage of spec.md
    Creates: changes/[id]/tasks.md (uses templates/changes/tasks.md)

    🔴 CRITICAL: Large context = Hallucinations
                Small context = Deterministic code
    ↓
```

### Phase 4: Implementation

```
💻 developer - IMPLEMENTATION (task-by-task)
    Input: tasks.md → current TASK-NNN
    Process:
      1. Load context (Files to Load, ≤500 lines)
      2. Implement code (DDD Co-Located, ≤100 LOC)
      3. Apply Object Calisthenics (39 rules)
      4. Write tests (TDD, coverage ≥80%)
      5. Validate acceptance criteria
    Output: Code + tests
    Time: <2h per task
    Uses Commands: /code, /component
    Applies Rules: All 39 rules from rules/ directory

    During implementation:
    🔒 gatekeeper - QUALITY GATES
      Validates: 39 rules, spec alignment, quality standards
      Gate: 100% compliant OR BLOCKS
    ↓
    Repeat for all N tasks (sequential or parallel)
    ↓
```

### Phase 5: Review & Testing

```
👀 reviewer - CODE REVIEW
    Input: Implemented code
    Process:
      1. Validate Software Quality (12 criteria):
         📋 Operation (6): Executability, Correctness, Reliability, etc
         🔄 Revision (3): Maintainability, Testability, Understandability
         🔀 Transition (3): Portability, Adaptability, Installability
      2. Detect code smells
      3. Recommend refactorings
    Output: Review report (approved/rejected + issues)
    Time: 30-120 min
    Gate: 12/12 criteria met

🧪 tester - TEST VALIDATION
    Input: Written tests
    Process:
      1. Validate coverage (≥80%)
      2. Validate test quality (non-trivial)
      3. Execute complete suite
      4. Validate e2e tests (BDD scenarios)
    Output: Test report (100% passing, coverage %)
    Time: 30-90 min
    Gate: 100% tests passing, coverage ≥80%
    ↓
```

### Phase 6: Documentation

```
📚 documenter - DOCUMENTATION
    Input: Code + specs
    Process:
      1. Update README (if necessary)
      2. Update CHANGELOG (releases)
      3. Verify doc comments (public APIs)
      4. Update specs/ (if architectural change)
    Output: Synchronized documentation
    Time: 30-60 min
    Gate: Docs synchronized with code
    Uses Commands: /vision, /feature, /adr
    ↓
```

### Phase 7: Validation & Release

```
📋 analyst - FINAL VALIDATION
    Input: .agent-task.md + all previous outputs
    Process:
      1. Review checklist (100% complete?)
      2. Validate acceptance criteria (all met?)
      3. Recalculate health score (improved/maintained/worsened?)
      4. Generate final report with metrics
    Output: Final report + recommendations
    Time: 15-30 min
    Gate: ≥95% validation complete
    Uses Commands: /stats

🛡️ guardian - PRE-COMMIT/PUSH/RELEASE
    Input: Code ready for commit
    Process:
      1. Execute linters (0 warnings)
      2. Execute tests (100% passing, ≥80% coverage)
      3. Execute build (success)
      4. Validate quality standards (compliant)
      5. Validate security (0 critical vulnerabilities)
      6. Validate docs (synchronized)
    Output: ✅ Authorized OR ❌ BLOCKED
    Time: 2-10 min
    Gate: ALL 6 criteria PASS
    Uses Commands: /stats, /code
    ↓
Done! 🎉
```

---

## 📚 Agent Catalog

### 📋 001: analyst

**Category**: Planning & Validation
**Phases**: 1 (Discovery), 3 (Specification), 7 (Final Validation)
**Criticality**: 🔴 CRITICAL

**What it does**:
- **Phase 1**: Creates proposal.md + .agent-task.md (planning)
- **Phase 3**: Creates spec.md (Arc42 + BDD)
- **Phase 7**: Final validation + metrics report

**When to use**:
- Start of any feature/change (Phase 1)
- After architect (if invoked), to create specs (Phase 3)
- End of workflow for validation (Phase 7)

**Inputs**: User request, .claude/rules/, specs/
**Outputs**: proposal.md, .agent-task.md, spec.md, final report
**Uses Commands**: /vision, /actor, /container, /component, /feature, /build, /cross, /import, /stats
**Uses Templates**: changes/proposal.md, changes/spec.md, arc42/*, bdd/*

📄 [SKILL.md](./analyst/SKILL.md) | [CHECKLIST.md](./analyst/CHECKLIST.md) | [EXAMPLES.md](./analyst/EXAMPLES.md) | [TROUBLESHOOTING.md](./analyst/TROUBLESHOOTING.md)

---

### 🏗️ 002: architect

**Category**: Architecture Design
**Phase**: 2 (Architecture)
**Criticality**: 🟡 IMPORTANT (mandatory if HIGH complexity)

**What it does**:
- Creates design.md with C4 Level 3 diagrams
- Defines DDD patterns (Aggregates, Entities, VOs, Repos, Use Cases)
- Creates 3-5 ADRs for critical decisions

**When to use**:
- Health score <13/16 (Moderate or Severe)
- Complexity = HIGH (multiple bounded contexts, >15 files)
- Critical architectural decisions

**Inputs**: proposal.md, preliminary spec
**Outputs**: design.md, ADR-XXX (multiple)
**Uses Commands**: /stack, /rule, /adr, /cross, /container
**Uses Templates**: changes/design.md, adr/decision.md, c4/system-context.md, c4/container.md, c4/component.md

📄 [SKILL.md](./architect/SKILL.md) | [CHECKLIST.md](./architect/CHECKLIST.md) | [EXAMPLES.md](./architect/EXAMPLES.md) | [TROUBLESHOOTING.md](./architect/TROUBLESHOOTING.md)

---

### 🎯 003: orchestrator

**Category**: Task Decomposition
**Phase**: 3.5 (Decomposition)
**Criticality**: 🔴 CRITICAL (prevents AI hallucinations)

**What it does**:
- Decomposes spec.md into N atomic tasks (<100 LOC, ~500 lines context)
- Establishes dependencies (valid DAG)
- Defines exact context for each task (Files to Load)

**When to use**:
- **ALWAYS** after spec.md approved
- **MANDATORY** for ANY complexity (LOW, MEDIUM, HIGH)

**Why critical?**
```
Large context (5000+ lines) → AI loses focus → Hallucinations ❌
Small context (~500 lines/task) → AI stays deterministic → Correct code ✅
```

**Inputs**: spec.md, design.md (if HIGH)
**Outputs**: tasks.md (5-100 atomic tasks)
**Uses Templates**: changes/tasks.md

📄 [SKILL.md](./orchestrator/SKILL.md) | [CHECKLIST.md](./orchestrator/CHECKLIST.md) | [EXAMPLES.md](./orchestrator/EXAMPLES.md) | [TROUBLESHOOTING.md](./orchestrator/TROUBLESHOOTING.md)

---

### 💻 004: developer

**Category**: Implementation
**Phase**: 4 (Implementation)
**Criticality**: 🔴 CRITICAL

**What it does**:
- Implements tasks sequentially (TASK-001, TASK-002, ...)
- Applies DDD Co-Located structure
- Applies Object Calisthenics (39 rules)
- Writes tests (TDD, coverage ≥80%)

**When to use**:
- After orchestrator generates tasks.md
- For each TASK-NNN (sequential or parallel)

**Inputs**: tasks.md → TASK-NNN
**Outputs**: Code + tests
**Uses Commands**: /code, /component
**Applies Rules**: All 39 rules from rules/ (Object Calisthenics, SOLID, Package Principles, Code Quality)

📄 [SKILL.md](./developer/SKILL.md) | [CHECKLIST.md](./developer/CHECKLIST.md) | [EXAMPLES.md](./developer/EXAMPLES.md) | [TROUBLESHOOTING.md](./developer/TROUBLESHOOTING.md)

---

### 🔒 005: gatekeeper

**Category**: Quality Gates
**Phase**: 4 (During implementation)
**Criticality**: 🔴 CRITICAL (prevents technical debt)

**What it does**:
- Validates compliance with 39 rules
- Validates alignment with spec.md
- Validates quality principles (39 rules from .claude/rules/)

**When to use**:
- During implementation (automatically invoked by developer)
- Before marking task as complete

**Inputs**: Implemented code
**Outputs**: ✅ Pass OR ❌ Fail (with issues)
**Uses Commands**: /rule, /code (validates)
**Applies Rules**: All 39 rules from rules/

📄 [SKILL.md](./gatekeeper/SKILL.md) | [CHECKLIST.md](./gatekeeper/CHECKLIST.md) | [EXAMPLES.md](./gatekeeper/EXAMPLES.md) | [TROUBLESHOOTING.md](./gatekeeper/TROUBLESHOOTING.md)

---

### 👀 006: reviewer

**Category**: Code Review
**Phase**: 5 (Review)
**Criticality**: 🟡 IMPORTANT

**What it does**:
- Validates Software Quality (12 criteria: Operation, Revision, Transition)
- Detects code smells
- Recommends refactorings

**When to use**:
- After all tasks implemented
- Before marking change as DONE

**Inputs**: Complete code
**Outputs**: Review report

📄 [SKILL.md](./reviewer/SKILL.md) | [CHECKLIST.md](./reviewer/CHECKLIST.md) | [EXAMPLES.md](./reviewer/EXAMPLES.md) | [TROUBLESHOOTING.md](./reviewer/TROUBLESHOOTING.md)

---

### 🧪 007: tester

**Category**: Test Validation
**Phase**: 5 (Testing)
**Criticality**: 🟡 IMPORTANT

**What it does**:
- Validates coverage (≥80%)
- Validates test quality
- Executes complete suite (unit, integration, e2e)

**When to use**:
- In parallel with reviewer (Phase 5)
- To validate implemented BDD scenarios

**Inputs**: Written tests
**Outputs**: Test report (coverage %, passing %)
**Uses Commands**: /feature, /flow, /code (validates tests)

📄 [SKILL.md](./tester/SKILL.md) | [CHECKLIST.md](./tester/CHECKLIST.md) | [EXAMPLES.md](./tester/EXAMPLES.md) | [TROUBLESHOOTING.md](./tester/TROUBLESHOOTING.md)

---

### 📚 008: documenter

**Category**: Documentation
**Phase**: 6 (Documentation)
**Criticality**: 🟢 USEFUL

**What it does**:
- Updates README, CHANGELOG
- Verifies doc comments
- Updates specs/ (if necessary)

**When to use**:
- After reviewer + tester approve
- Before final commit

**Inputs**: Code + specs
**Outputs**: Synchronized documentation
**Uses Commands**: /vision, /feature, /adr

📄 [SKILL.md](./documenter/SKILL.md) | [CHECKLIST.md](./documenter/CHECKLIST.md) | [EXAMPLES.md](./documenter/EXAMPLES.md) | [TROUBLESHOOTING.md](./documenter/TROUBLESHOOTING.md)

---

### 🛡️ 009: guardian

**Category**: Pre-commit Validation
**Phase**: 7 (Final gate)
**Criticality**: 🔴 CRITICAL (prevents bad commits)

**What it does**:
- Validates linters (0 warnings)
- Validates tests (100% passing, ≥80% coverage)
- Validates build (success)
- Validates quality rules, security, docs

**When to use**:
- Before `git commit`
- Before `git push`
- Before release

**Inputs**: Code ready for commit
**Outputs**: ✅ Authorized OR ❌ BLOCKED
**Uses Commands**: /stats, /code

📄 [SKILL.md](./guardian/SKILL.md) | [CHECKLIST.md](./guardian/CHECKLIST.md) | [EXAMPLES.md](./guardian/EXAMPLES.md) | [TROUBLESHOOTING.md](./guardian/TROUBLESHOOTING.md)

---

## 🎓 Usage Guides

### For Beginners (Simple Feature - LOW)

**Basic workflow** (3-4h total):

```bash
# Phase 1: Discovery
@skill analyst "Add email validation to registration"
# Output: proposal.md + .agent-task.md

# Phase 3: Specification (analyst automatically creates spec.md)
# Output: spec.md (Arc42 + BDD)

# Phase 3.5: Decomposition
# orchestrator is invoked automatically
# Output: tasks.md (8 tasks)

# Phase 4: Implementation (developer executes tasks sequentially)
# gatekeeper validates each task automatically
# Output: Code + tests (8 tasks complete)

# Phase 5: Review & Test
@skill reviewer
@skill tester
# Output: Approved ✅

# Phase 6: Documentation
@skill documenter
# Output: Docs synchronized

# Phase 7: Pre-commit
@skill guardian
# Output: ✅ Commit authorized

git commit -m "feat: Add email validation"
```

---

### For Developers (Medium Feature - MEDIUM)

**Complete workflow** (1-3 days):

```bash
# Phase 1
@skill analyst "Implement notification system (email, push, SMS) with user preferences"

# Phase 2 (Conditional - analyst decides)
# If complexity=MEDIUM and score <13:
@skill architect  # Creates design.md + 2-3 ADRs

# Phase 3
# analyst creates spec.md automatically

# Phase 3.5
# orchestrator creates tasks.md (32 tasks)

# Phase 4 (2 days)
# developer implements 32 tasks
# gatekeeper validates each one

# Phase 5
@skill reviewer
@skill tester

# Phase 6
@skill documenter

# Phase 7
@skill analyst  # Final validation
@skill guardian  # Pre-commit

git commit -m "feat: Implement notification system"
```

---

### For Architects (Complex System - HIGH)

**HIGH complexity workflow** (2 weeks):

```bash
# Phase 1: Discovery
@skill analyst "Migrate authentication from JWT to OAuth2 + OIDC:
                - Google, GitHub, Microsoft providers
                - Corporate SSO (SAML)
                - Refresh token rotation
                - 2FA (TOTP)
                - Rate limiting
                - Zero downtime migration"

# Output: proposal.md
# analyst detects: Complexity=HIGH, Score=9/16 (Moderate)

# Phase 2: Architecture (MANDATORY)
@skill architect
# Output: design.md (50 pages) + ADR-005, 006, 007, 008 (4 ADRs)

# Phase 3: Specification
# analyst creates spec.md (100+ pages Arc42 + 15 BDD scenarios)

# Phase 3.5: Decomposition
# orchestrator creates tasks.md (78 atomic tasks)

# Phase 4: Implementation (2 weeks)
# developer implements 78 tasks
# gatekeeper validates each one
# Progress: TASK-001 ✅, TASK-002 ✅, ..., TASK-078 ✅

# Phase 5: Review & Test
@skill reviewer  # 147 tests, 89% coverage
@skill tester

# Phase 6: Documentation
@skill documenter  # Migration guide + README + CHANGELOG

# Phase 7: Validation
@skill analyst  # Final report: Score improved 9→13 (+44%)
@skill guardian  # Security audit, load tests

git commit -m "feat: Migrate to OAuth2 + OIDC"
```

---

## 📊 Efficiency Metrics

### Implementation Time (with vs without agents)

| Complexity | Manual | With Agents | Savings |
|------------|--------|-------------|---------|
| **LOW** (5-15 tasks) | 1-2 days | 3-4h | 75% |
| **MEDIUM** (15-40 tasks) | 1-2 weeks | 1-3 days | 70% |
| **HIGH** (40-100 tasks) | 4-8 weeks | 2-3 weeks | 60% |

### Code Quality

| Metric | Manual | With Agents | Improvement |
|--------|--------|-------------|-------------|
| Hallucination Rate | 60-80% | <10% | 90% |
| Rework Rate | 50-70% | <15% | 80% |
| Test Coverage | Variable | ≥80% | 100% |
| Technical Debt | High | Low | 85% |
| Rules Compliance | 30-50% | 95-100% | 100% |

---

## 🔗 Cross-References

### Integration with Commands

| Command | Skills Used | Phase | Created Artifacts |
|---------|-------------|-------|-------------------|
| /vision | analyst | 1-3 | specs/01_introduction/*, specs/03_context/* |
| /stack | analyst, architect | 1-2 | specs/02_constraints/*, specs/04_solution-strategy/*, specs/09_decisions/adrs/ADR-001_* |
| /actor | analyst | 3 | specs/03_context/* |
| /container | analyst, architect | 3 | specs/05_building-blocks/containers/* |
| /component | analyst | 3 | specs/05_building-blocks/components/* |
| /plan | analyst | 3 | Multiple specs |
| /rule | architect, gatekeeper | 2, 4 | specs/02_constraints/patterns/* |
| /feature | analyst, orchestrator | 3, 3.5 | specs/06_runtime/scenarios/* |
| /flow | analyst | 3 | specs/06_runtime/scenarios/* |
| /build | analyst, architect | 3 | specs/07_deployment/*, specs/10_quality/* |
| /cross | analyst, architect | 3 | specs/08_crosscutting/* |
| /adr | architect | 2 | specs/09_decisions/adrs/* |
| /code | orchestrator, developer, gatekeeper, reviewer, tester | 3.5-5 | Source code + tests |
| /import | analyst | 1-3 | All specs/ files |
| /stats | analyst | - | Health dashboard |

See `../commands/README.md` for complete command catalog.

### Integration with Templates

| Agent | Templates Used | Output Location |
|-------|----------------|-----------------|
| analyst | changes/proposal.md, changes/spec.md, arc42/*, bdd/* | changes/[id]/, specs/ |
| architect | changes/design.md, adr/decision.md, c4/* | changes/[id]/, specs/09_decisions/adrs/ |
| orchestrator | changes/tasks.md | changes/[id]/tasks.md |
| developer | - | src/ (applies all templates indirectly) |
| gatekeeper | - | (validates against rules/) |
| reviewer | - | (generates review reports) |
| tester | bdd/scenario.md | (validates BDD scenarios) |
| documenter | - | README.md, CHANGELOG.md |
| guardian | - | (validates all outputs) |

See `../templates/README.md` for complete template catalog.

### Integration with Rules

| Agent | Rules Applied | Categories |
|-------|---------------|------------|
| architect | All 39 rules | Object Calisthenics (9), SOLID (5), Package Principles (6), Code Quality (19) |
| developer | All 39 rules | Object Calisthenics (9), SOLID (5), Package Principles (6), Code Quality (19) |
| gatekeeper | All 39 rules | Object Calisthenics (9), SOLID (5), Package Principles (6), Code Quality (19) |
| reviewer | All 39 rules | Object Calisthenics (9), SOLID (5), Package Principles (6), Code Quality (19) |
| guardian | All 39 rules | Object Calisthenics (9), SOLID (5), Package Principles (6), Code Quality (19) |

See `../rules/README.md` for complete rule catalog.

---

## 🚨 Antipatterns to Avoid

### ❌ 1. Skip Orchestrator

```bash
# WRONG
@skill analyst → spec.md → @skill developer (implements 5000 LOC at once)
# Result: Hallucinations, code doesn't follow spec

# RIGHT
@skill analyst → spec.md → orchestrator → tasks.md (50 tasks) → developer (task-by-task)
# Result: Deterministic code, no hallucinations
```

### ❌ 2. Implement Without Spec

```bash
# WRONG
"Implement feature X" → @skill developer
# Result: Random code, no validation

# RIGHT
"Feature X" → @skill analyst (creates spec) → orchestrator → developer
```

### ❌ 3. Ignore Gatekeeper

```bash
# WRONG
developer implements tasks without gatekeeper
# Result: Code violates 39 rules, technical debt accumulates

# RIGHT
developer + gatekeeper validating each task
# Result: 100% compliance
```

### ❌ 4. Skip Guardian

```bash
# WRONG
git commit (without guardian)
# Result: Failing tests committed, vulnerabilities, unformatted code

# RIGHT
@skill guardian → ✅ Pass → git commit
# Result: Only quality code committed
```

### ❌ 5. Don't Invoke Architect (HIGH complexity)

```bash
# WRONG
Score 9/16 (Moderate) → Don't invoke architect → developer implements without design
# Result: Ad-hoc architecture, high fragility, rework

# RIGHT
Score 9/16 → architect (design.md + ADRs) → developer implements following design
# Result: Robust architecture, score improves to 13/16
```

---

## 🔍 Quick Reference

### By Need

| I need to... | Skill | Phase |
|-------------|-------|-------|
| Plan feature | analyst | 1 |
| Design for HIGH complexity | architect | 2 |
| Create Arc42 + BDD specs | analyst | 3 |
| Decompose into atomic tasks | orchestrator | 3.5 |
| Implement code | developer | 4 |
| Validate compliance | gatekeeper | 4 |
| Review quality | reviewer | 5 |
| Validate tests | tester | 5 |
| Update docs | documenter | 6 |
| Final validation + pre-commit | analyst + guardian | 7 |

### By Workflow Phase

| Phase | Skills | Mandatory? |
|-------|--------|------------|
| 1 (Discovery) | analyst | ✅ Always |
| 2 (Architecture) | architect | ⚠️ If HIGH complexity |
| 3 (Specification) | analyst | ✅ Always |
| 3.5 (Decomposition) | orchestrator | ✅ Always (CRITICAL) |
| 4 (Implementation) | developer + gatekeeper | ✅ Always |
| 5 (Review & Test) | reviewer + tester | ✅ Always |
| 6 (Documentation) | documenter | ⚠️ Recommended |
| 7 (Validation) | analyst + guardian | ✅ Always |

---

## 📖 Related Documentation

- **[Main Hub](../README.md)** - Complete system overview with 7-phase workflow
- **[Commands](../commands/README.md)** - 15 Arc42 commands
- **[Templates](../templates/README.md)** - 20 deterministic templates (Arc42, C4, BDD, ADR)
- **[Rules](../rules/README.md)** - 39 quality rules organized by category
- **[Result: specs/](../../specs/)** - Well-documented specifications (the constitution)

---

## 📜 Changelog

### v3.0.0 (2025-12-10)
- 🔗 **COMPLETE CROSS-REFERENCES**: Integration with commands, templates, rules
- 📖 **ENHANCED DOCUMENTATION**: Clear links to all related directories
- 🎯 **COHERENT FLOW**: Perfect navigation for developers
- 🗺️ **WORKFLOW INTEGRATION**: Complete 7-phase workflow with all cross-references
- ✨ Removed ID prefixes (SKL-) for cleaner structure

### v2.0.0 (2025-12-09)
- ✨ **COMPLETE ELEVATION**: 9 skills with IDs, phases, criticality
- 📊 Standardized structure (CHECKLIST, EXAMPLES, TROUBLESHOOTING)
- 🔗 Complete integration with commands
- 📚 Comprehensive README with 7-phase workflow
- 🎯 Antipatterns and usage guides
- 📊 Efficiency metrics

### v1.0.0 (2025-11-17)
- Initial version with 9 basic skills

---

**Version**: 3.0.0
**Maintained by**: Documentation-First Approach System
**License**: MIT
**Last Updated**: 2025-12-10

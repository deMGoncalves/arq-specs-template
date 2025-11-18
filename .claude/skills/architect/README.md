# Architect Skill - Documentation

**🏗️ The Architecture Designer**

Responsible for creating technical design for HIGH complexity changes BEFORE specification.

---

## 📁 Files in This Skill

```
architect/
├── SKILL.md         # Architect agent instructions
└── README.md        # This file - documentation for humans
```

---

## 🎯 Purpose

The Architect skill is responsible for **Phase 2: Architecture (Design)**, creating `design.md` with:

- **Architecture Decisions (ADRs)**: Evaluate alternatives, document trade-offs
- **DDD Component Design**: Map bounded contexts, aggregates, entities, value objects
- **C4 Model Diagrams**: Visualize system context, containers, components
- **Quality Validation**: Ensure testability, performance, security

**When to Use:**
- ✅ Complexity = HIGH (proposal.md indicates)
- ✅ Multiple bounded contexts affected
- ✅ Significant architectural decisions required
- ✅ External integrations or infrastructure changes

**When NOT to Use:**
- ❌ Complexity = LOW or MEDIUM (skip to Specification phase)
- ❌ Single component change with established patterns

---

## 🔗 Workflow Position

```
Phase 1: Discovery
    analyst (creates proposal.md)
        ↓
Phase 2: Architecture (HIGH complexity ONLY)
    architect ← YOU ARE HERE
        ↓
Phase 3: Specification
    analyst (creates spec.md, references design.md)
        ↓
Phase 3.5: Task Decomposition
    orchestrator (creates tasks.md)
```

---

## 📖 Quick Start

### Invocation

When `proposal.md` has:
```markdown
Complexity: HIGH
Requires Design Phase: YES
```

Invoke the Architect:
```
@skill architect
```

### Inputs Required

1. `changes/[change-id]/proposal.md` - Approved proposal
2. `.claude/constitution.md` - Project principles
3. `specs/` - Current specifications (context)

### Outputs Produced

1. `changes/[change-id]/design.md` - Complete design document
2. ADRs for each significant decision
3. C4 diagrams (if needed)
4. DDD component mapping

---

## 🔄 Related Skills

### Prerequisites (must complete before):
- **analyst** - Creates `proposal.md` with complexity assessment

### Follows this skill (typical flow):
- **analyst** - Creates `spec.md` referencing `design.md`
- **orchestrator** - Decomposes spec + design into tasks

### Works with (parallel/collaborative):
- None (Architect works independently in Phase 2)

---

## 📊 Key Outputs

### design.md Structure

```markdown
# Design: [Change ID]

## Overview
[2-3 sentence summary]

## Architecture Decisions (ADRs)
[Each significant decision with alternatives evaluated]

## DDD Components
[Bounded contexts, aggregates, entities, value objects]

## C4 Diagrams
[System context, containers, components as needed]

## Quality Attributes
[Performance, security, testability considerations]

## Implementation Notes
[Guidance for Developer skill]
```

---

## ✅ Success Criteria

A good `design.md` should:

- [ ] Address all complexity concerns from `proposal.md`
- [ ] Document 2+ alternatives for each major decision
- [ ] Map all DDD components (contexts, aggregates, entities, value objects)
- [ ] Include C4 diagrams for cross-component changes
- [ ] Follow `constitution.md` principles (DDD Tactical Co-Located)
- [ ] Provide clear implementation guidance
- [ ] Be reviewable by tech lead

---

## 🎓 Design Principles

### 1. Evaluate Alternatives
Never accept first solution. Always evaluate minimum 2 alternatives with pros/cons.

### 2. Document Trade-offs
Every architectural decision has trade-offs. Document them explicitly.

### 3. DDD Tactical Structure
Follow Co-Located structure:
```
/src/[context]/[container]/[component]/
  - index.ts (Aggregate Root)
  - criar.ts (Factory)
  - persistir.ts (Repository)
  - [action].ts (Use Cases)
  - [ValueObject].ts
  - [Entity].ts
  - [Event].ts
  - [component].spec.ts
```

### 4. Testability First
Design must enable easy testing. If design is hard to test, refine it.

### 5. Performance Budgets
For performance-critical features, define budgets (latency, throughput, memory).

---

## 📚 References

- **constitution.md** - DDD Tactical Co-Located principles
- **Arc42 templates** - `.claude/templates/arc42/04_solution-strategy.md`
- **ADR templates** - `.claude/templates/adr/decision.md`
- **C4 Model templates** - `.claude/templates/c4/`

---

## 🔍 Common Patterns

### Pattern 1: Integration with External Service
```
ADR: Choose sync vs async communication
DDD: Anti-Corruption Layer (ACL) to isolate external service
C4: System Context diagram showing integration
```

### Pattern 2: New Bounded Context
```
ADR: Bounded context boundaries and communication patterns
DDD: Define aggregate roots, entities, value objects
C4: Container diagram showing new context
```

### Pattern 3: Cross-Cutting Concern
```
ADR: Implement as aspect, middleware, or decorator
DDD: Map to which aggregates it affects
C4: Component diagram showing concern across components
```

---

**Version**: 2.0.0
**Created**: 2025-11-17
**Last Updated**: 2025-11-17

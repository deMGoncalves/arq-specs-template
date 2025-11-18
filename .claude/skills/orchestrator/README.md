# Orchestrator Skill - Documentation

**🎯 The Task Decomposition Engine (CRITICAL)**

The MOST CRITICAL skill in the workflow. Decomposes large specifications into atomic tasks to prevent AI hallucinations.

---

## 📁 Files in This Skill

```
orchestrator/
├── SKILL.md          # Orchestrator agent instructions
├── README.md         # This file - documentation for humans
└── INTEGRATION.md    # Integration patterns with other skills
```

---

## 🎯 Purpose

The Orchestrator skill is responsible for **Phase 3.5: Task Decomposition**, the **MOST CRITICAL** phase for deterministic code generation.

**Core Function**: Transform large specifications (5000+ lines) into atomic tasks (<100 LOC each, ~500 lines context per task).

**Why CRITICAL:**
```
❌ Large context (5000+ lines) = AI loses focus = Hallucinations = Wrong code
✅ Small context (~500 lines/task) = AI stays focused = Deterministic = Correct code
```

**What it produces:**
- `changes/[change-id]/tasks.md` with atomic tasks
- Each task: <100 LOC, <2 hours, explicit dependencies
- Each task: defined context to load (~500 lines)
- Each task: clear acceptance criteria

---

## 🔗 Workflow Position

```
Phase 1: Discovery
    analyst (creates proposal.md)
        ↓
Phase 2: Architecture (HIGH complexity only)
    architect (creates design.md)
        ↓
Phase 3: Specification
    analyst (creates spec.md with BDD scenarios)
        ↓
Phase 3.5: Task Decomposition (CRITICAL)
    orchestrator ← YOU ARE HERE
        ↓
Phase 4: Implementation
    developer (implements task-by-task)
```

---

## 📖 Quick Start

### Invocation

After `spec.md` is approved, invoke the Orchestrator:
```
@skill orchestrator
```

### Inputs Required

1. `changes/[change-id]/spec.md` - Approved specification
2. `changes/[change-id]/proposal.md` - Original proposal (context)
3. `changes/[change-id]/design.md` - Design (if HIGH complexity)
4. `.claude/constitution.md` - Project principles

### Outputs Produced

1. `changes/[change-id]/tasks.md` - Complete task breakdown with:
   - Atomic tasks (<100 LOC each)
   - Explicit dependencies
   - Acceptance criteria
   - Context to load (~500 lines per task)
   - BDD scenario mapping

---

## 🔄 Related Skills

### Prerequisites (must complete before):
- **analyst** - Creates `spec.md` with BDD scenarios
- **architect** - Creates `design.md` (if HIGH complexity)

### Follows this skill (typical flow):
- **developer** - Implements code task-by-task following `tasks.md`
- **gatekeeper** - Validates quality gates during implementation

### Works with (parallel/collaborative):
- **analyst** - May consult for clarifications on spec
- **architect** - May consult for design clarifications

---

## 🧠 Task Decomposition Algorithm

### Step 1: Parse BDD Scenarios

Extract all scenarios from `spec.md`:
```markdown
Scenario 1: Register user with valid email (Happy Path)
Scenario 2: Reject invalid email format (Error Case)
Scenario 3: Normalize email to lowercase (Edge Case)
```

### Step 2: Map to DDD Components

For each scenario, identify required DDD components:
```
Scenario 1 requires:
- Value Object: Email (validation logic)
- Factory: criar-usuario (uses Email)
- Entity: Usuario (contains Email)
- Event: UsuarioCriado
```

### Step 3: Generate Atomic Tasks

Break components into atomic tasks:
```
TASK-001: Setup - Verify DDD structure
TASK-002: Setup - Configure tests
TASK-003: Implement Email value object (~40 LOC)
TASK-004: Integrate Email in criar-usuario (~30 LOC)
TASK-005: Implement EmailInvalidoError (~30 LOC)
TASK-006: Unit tests for Email (~80 LOC)
TASK-007: Integration tests for criar-usuario (~60 LOC)
TASK-008: Constitution compliance check
```

### Step 4: Establish Dependencies

```
TASK-003 depends on: TASK-001, TASK-002
TASK-004 depends on: TASK-003
TASK-005 depends on: TASK-003, TASK-004
TASK-006 depends on: TASK-002, TASK-003, TASK-005
TASK-007 depends on: TASK-002, TASK-004, TASK-005
TASK-008 depends on: ALL previous tasks
```

### Step 5: Define Context per Task

**CRITICAL**: Limit context to ~500 lines per task:

```markdown
### TASK-003: Implement Email value object

**Context to Load** (~450 lines):
- constitution.md (DDD Tactical section) - ~150 lines
- proposal.md - ~100 lines
- spec.md (APENAS Email Validation scenarios) - ~150 lines
- tasks.md (APENAS TASK-003) - ~50 lines

**Do NOT Load**:
- Full spec.md (5000+ lines would cause hallucinations)
- Other tasks from tasks.md
- Full codebase
```

---

## ✅ Success Criteria

A good `tasks.md` should:

- [ ] Break spec into atomic tasks (<100 LOC each)
- [ ] Each task takes <2 hours to implement
- [ ] Explicit dependencies between tasks
- [ ] Clear acceptance criteria for each task
- [ ] Context limited to ~500 lines per task
- [ ] BDD scenarios mapped to tasks
- [ ] DDD components identified per task
- [ ] Phases defined (Setup, Core, Errors, Tests, Quality)
- [ ] Progress tracker included
- [ ] Estimated LOC and time per task

---

## 📊 Task Phases

### Phase 0: Setup & Infrastructure
```
TASK-001: Verify directory structure
TASK-002: Setup test framework
```
**Purpose**: Ensure foundation is ready before implementation.

### Phase 1: Core Requirements (Happy Path)
```
TASK-003: Implement Email value object
TASK-004: Integrate Email in criar-usuario
```
**Purpose**: Implement main functionality (BDD happy path scenarios).

### Phase 2: Error Handling
```
TASK-005: Implement EmailInvalidoError
```
**Purpose**: Handle error scenarios (BDD error case scenarios).

### Phase 3: Tests
```
TASK-006: Unit tests for Email
TASK-007: Integration tests for criar-usuario
```
**Purpose**: Comprehensive test coverage (BDD verification).

### Phase 4: Quality & Compliance
```
TASK-008: Constitution compliance check
```
**Purpose**: Validate implementation against principles.

---

## 🎓 Task Decomposition Principles

### 1. Atomic Tasks
Each task must be independently completable in <2 hours.

### 2. Explicit Dependencies
Never assume. Always state dependencies explicitly.

### 3. Small Context
**CRITICAL**: Limit context to ~500 lines per task to prevent hallucinations.

### 4. Clear Acceptance Criteria
Each task must have checkboxes that can be objectively verified.

### 5. BDD Traceability
Each task should reference which BDD scenarios it addresses.

### 6. DDD Component Mapping
Each task should state which DDD components it implements/modifies.

---

## 🚨 Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: Large Tasks
```
❌ TASK-001: Implement email validation feature (~250 LOC)
✅ TASK-001: Implement Email value object (~40 LOC)
✅ TASK-002: Integrate Email in criar-usuario (~30 LOC)
```

### ❌ Anti-Pattern 2: Unclear Dependencies
```
❌ TASK-003: Implement Email (no dependencies listed)
✅ TASK-003: Implement Email
   Dependencies: TASK-001 (structure), TASK-002 (tests)
```

### ❌ Anti-Pattern 3: Large Context
```
❌ Context to Load: Full spec.md (5000 lines)
✅ Context to Load: spec.md (APENAS Email scenarios, ~150 lines)
```

### ❌ Anti-Pattern 4: Vague Acceptance Criteria
```
❌ - [ ] Email validation works
✅ - [ ] Email constructor throws EmailInvalidoError for invalid format
✅ - [ ] Email constructor normalizes to lowercase
✅ - [ ] Email.equals() compares by value
```

### ❌ Anti-Pattern 5: No BDD Mapping
```
❌ TASK-003: Implement Email value object
✅ TASK-003: Implement Email value object
   BDD Scenario: "Register user with valid email" (partial)
```

---

## 📚 Template Reference

Use `.claude/templates/tasks.md` as the base template for generating tasks.

Key sections:
- Progress Tracker (updated after each task)
- Task breakdown by phase
- Context to load per task
- Execution notes
- Success criteria

---

## 🔍 Example: Email Validation Feature

### Input: spec.md (300 lines, 5 BDD scenarios)

### Output: tasks.md with 8 atomic tasks

```
Phase 0: Setup
  TASK-001: Verify DDD structure (~20 LOC, 30 min)
  TASK-002: Setup tests (~30 LOC, 30 min)

Phase 1: Core
  TASK-003: Implement Email value object (~40 LOC, 1h)
  TASK-004: Integrate Email in criar-usuario (~30 LOC, 1h)

Phase 2: Errors
  TASK-005: Implement EmailInvalidoError (~30 LOC, 30 min)

Phase 3: Tests
  TASK-006: Unit tests for Email (~80 LOC, 1.5h)
  TASK-007: Integration tests for criar-usuario (~60 LOC, 1h)

Phase 4: Quality
  TASK-008: Constitution compliance check (validation only, 30 min)
```

**Total**: 8 tasks, ~250 LOC, ~7 hours

---

## 💡 Pro Tips

### Tip 1: Start with BDD Scenarios
BDD scenarios are the source of truth. Map each scenario to tasks.

### Tip 2: DDD Components Guide Tasks
One task per DDD component (value object, entity, factory, etc.).

### Tip 3: Always Include Setup & Quality
Phase 0 (Setup) and Phase 4 (Quality) are mandatory for all features.

### Tip 4: Test Tasks Separate from Implementation
Don't combine implementation + tests in one task. Separate for clarity.

### Tip 5: Context is King
The "Context to Load" section is the MOST CRITICAL part of each task.

---

**Version**: 2.0.0
**Created**: 2025-11-17
**Last Updated**: 2025-11-17

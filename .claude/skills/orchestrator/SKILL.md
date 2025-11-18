# Orchestrator Skill

**Version**: 2.0.0
**Phase**: 3.5 Task Decomposition
**Responsibility**: Decompose specifications into atomic implementation tasks

---

## Purpose

O Orchestrator é responsável pela **Phase 3.5: Task Decomposition**, a fase MAIS CRÍTICA para prevenir AI hallucinations.

**Core Function**: Transformar specs (grandes, 5000+ lines) em tasks atômicas (pequenas, <100 LOC, ~500 lines context cada).

**Why Critical**:
- Large context (5000+ lines) → AI loses focus → hallucinations
- Small context (~500 lines per task) → AI stays deterministic → correct implementation
- Tasks with explicit dependencies → no missed steps
- Tasks with acceptance criteria → verifiable completion

---

## Related Skills

### Prerequisites (must complete before):
- **analyst** - Creates `spec.md` with BDD scenarios (Phase 3)
- **architect** - Creates `design.md` if HIGH complexity (Phase 2, optional)

### Follows this skill (typical flow):
- **developer** - Implements code task-by-task using `tasks.md` (Phase 4)

### Works with (parallel/collaborative):
- **analyst** - May consult for spec clarifications
- **architect** - May consult for design clarifications (if HIGH complexity)

---

## When to Use

### Trigger
- spec.md aprovado (passed Gate 2: Specification Format)
- BEFORE implementation begins
- REQUIRED for ALL changes (LOW, MEDIUM, HIGH complexity)

### Input Required
- `changes/[change-id]/spec.md` (approved)
- `changes/[change-id]/proposal.md` (context)
- `changes/[change-id]/design.md` (if HIGH complexity)
- `.claude/constitution.md` (principles)

### Output Produced
- `changes/[change-id]/tasks.md` with complete task breakdown

---

## Task Decomposition Engine

### Algorithm Overview

```typescript
/**
 * Task Decomposition Engine
 *
 * Input: spec.md with BDD scenarios
 * Output: tasks.md with atomic tasks
 *
 * Strategy:
 * 1. Parse BDD scenarios from spec.md
 * 2. Map scenarios to DDD components
 * 3. Generate tasks for each component
 * 4. Add setup, error handling, test, and quality tasks
 * 5. Establish dependencies
 * 6. Define context to load (prevent hallucinations)
 */

interface BDDScenario {
  name: string;
  feature: string;
  given: string[];
  when: string[];
  then: string[];
  type: 'happy-path' | 'error-case' | 'edge-case';
}

interface DDDComponent {
  type: 'aggregate' | 'entity' | 'value-object' | 'factory' | 'repository' | 'use-case' | 'event';
  name: string;
  boundedContext: string;
  container: string;
  component: string;
}

interface Task {
  id: string;              // TASK-001
  phase: number;           // 0 (Setup), 1 (Core), 2 (Errors), 3 (Tests), 4 (Quality)
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  title: string;
  description: string;
  estimatedLOC: number;    // < 100
  estimatedTime: string;   // < 2 hours
  dependencies: string[];  // [TASK-001, TASK-002]
  bddScenarios: string[];  // Which scenarios this task addresses
  dddComponents: DDDComponent[];
  acceptanceCriteria: string[];
  contextToLoad: {         // CRITICAL: Limit context to ~500 lines
    files: string[];
    sections: string[];
    estimatedLines: number;
  };
}

function decomposeSpec(spec: Spec): Task[] {
  const tasks: Task[] = [];

  // Phase 0: Setup & Infrastructure (ALWAYS)
  tasks.push(createSetupTasks(spec));

  // Phase 1: Core Requirements (BDD scenarios → DDD components → Tasks)
  const bddScenarios = parseBDDScenarios(spec);
  const happyPathScenarios = bddScenarios.filter(s => s.type === 'happy-path');

  for (const scenario of happyPathScenarios) {
    const dddComponents = mapScenarioToComponents(scenario);
    const componentTasks = createComponentTasks(dddComponents, scenario);
    tasks.push(...componentTasks);
  }

  // Phase 2: Error Handling (error scenarios → error tasks)
  const errorScenarios = bddScenarios.filter(s => s.type === 'error-case');
  for (const scenario of errorScenarios) {
    const errorTask = createErrorTask(scenario);
    tasks.push(errorTask);
  }

  // Phase 3: Tests (test tasks for each component)
  const testTasks = createTestTasks(tasks);
  tasks.push(...testTasks);

  // Phase 4: Quality & Compliance
  tasks.push(createQualityTasks(spec));

  // Establish dependencies
  establishDependencies(tasks);

  return tasks;
}

function mapScenarioToComponents(scenario: BDDScenario): DDDComponent[] {
  /**
   * Maps BDD scenario to DDD Tactical components
   *
   * Pattern:
   * 1. Identify aggregate from scenario name/actions
   * 2. Factory: criar-[entity]
   * 3. Repository: persistir-[entity]
   * 4. Use Case: [action]-[entity]
   * 5. Entity: [Entity]
   * 6. Value Objects: extracted from GIVEN/WHEN
   * 7. Domain Events: extracted from THEN (past tense)
   */

  const components: DDDComponent[] = [];

  // Extract entity/aggregate name
  const entity = extractEntityName(scenario);

  // 1. Factory (criar)
  components.push({
    type: 'factory',
    name: `criar-${entity}`,
    boundedContext: extractBoundedContext(scenario),
    container: 'api', // or from design.md
    component: entity
  });

  // 2. Repository (persistir)
  components.push({
    type: 'repository',
    name: `persistir-${entity}`,
    boundedContext: extractBoundedContext(scenario),
    container: 'api',
    component: entity
  });

  // 3. Use Case (action)
  const action = extractAction(scenario); // e.g., "registrar", "atualizar"
  components.push({
    type: 'use-case',
    name: `${action}-${entity}`,
    boundedContext: extractBoundedContext(scenario),
    container: 'api',
    component: entity
  });

  // 4. Entity
  components.push({
    type: 'entity',
    name: capitalize(entity),
    boundedContext: extractBoundedContext(scenario),
    container: 'api',
    component: entity
  });

  // 5. Value Objects (from GIVEN fields)
  const valueObjects = extractValueObjects(scenario);
  components.push(...valueObjects);

  // 6. Domain Events (from THEN side effects)
  const events = extractDomainEvents(scenario);
  components.push(...events);

  return components;
}

function createComponentTasks(components: DDDComponent[], scenario: BDDScenario): Task[] {
  /**
   * Create tasks for each DDD component
   * Order: Factory → Repository → Use Case (dependencies flow)
   */

  const tasks: Task[] = [];
  let taskNumber = getNextTaskNumber();

  // Task for Factory
  const factory = components.find(c => c.type === 'factory');
  if (factory) {
    tasks.push({
      id: `TASK-${String(taskNumber++).padStart(3, '0')}`,
      phase: 1,
      priority: 'P1',
      title: `Implementar factory ${factory.name}.ts`,
      description: `Criar factory que constrói entidade ${factory.component}`,
      estimatedLOC: 60,
      estimatedTime: '1.5 hours',
      dependencies: ['TASK-001', 'TASK-002'], // Setup tasks
      bddScenarios: [scenario.name],
      dddComponents: [factory],
      acceptanceCriteria: [
        `Função ${factory.name} implementada`,
        'Inputs validados',
        'Value objects criados',
        'Entity criada com ID',
        'Domain events gerados',
        `BDD Partial: ${extractGivenWhen(scenario)}`
      ],
      contextToLoad: {
        files: [
          'constitution.md (DDD section)',
          'proposal.md',
          'design.md (if exists)',
          `spec.md (APENAS requirement: ${scenario.feature})`,
          `tasks.md (APENAS ${tasks[tasks.length - 1]?.id || 'this task'})`
        ],
        sections: ['DDD Tactical', 'Semantic Naming', 'Value Objects'],
        estimatedLines: 500
      }
    });
  }

  // Task for Repository
  const repo = components.find(c => c.type === 'repository');
  if (repo) {
    const factoryTaskId = tasks[tasks.length - 1].id;
    tasks.push({
      id: `TASK-${String(taskNumber++).padStart(3, '0')}`,
      phase: 1,
      priority: 'P1',
      title: `Implementar repository ${repo.name}.ts`,
      description: `Criar repository para persistir ${repo.component}`,
      estimatedLOC: 80,
      estimatedTime: '2 hours',
      dependencies: [factoryTaskId],
      bddScenarios: [scenario.name],
      dddComponents: [repo],
      acceptanceCriteria: [
        `Função ${repo.name} implementada`,
        'Conexão com banco de dados',
        'Verificação de unique constraints',
        'Insert com transaction',
        'Error handling para duplicates',
        `BDD Partial: Entity persiste no banco`
      ],
      contextToLoad: {
        files: [
          'constitution.md (Integration-First Testing)',
          'proposal.md',
          'design.md (database schema)',
          `spec.md (APENAS requirement: ${scenario.feature})`,
          `tasks.md (APENAS this task)`,
          `${factory.name}.ts (implementation)`
        ],
        sections: ['Database Schema', 'Transactions', 'Error Handling'],
        estimatedLines: 600
      }
    });
  }

  // Task for Use Case (orchestrates factory + repository)
  const useCase = components.find(c => c.type === 'use-case');
  if (useCase) {
    const repoTaskId = tasks[tasks.length - 1].id;
    const factoryTaskId = tasks[tasks.length - 2].id;
    tasks.push({
      id: `TASK-${String(taskNumber++).padStart(3, '0')}`,
      phase: 1,
      priority: 'P1',
      title: `Implementar use case ${useCase.name}.ts`,
      description: 'Orquestrar todo o fluxo do use case',
      estimatedLOC: 100,
      estimatedTime: '2 hours',
      dependencies: [factoryTaskId, repoTaskId],
      bddScenarios: [scenario.name],
      dddComponents: [useCase],
      acceptanceCriteria: [
        `Função ${useCase.name} implementada`,
        `Chama ${factory?.name} e ${repo?.name}`,
        'Publica domain events no event bus',
        'Side effects executados (emails, notifications)',
        'Logs estruturados (INFO level)',
        'Retorna output correto',
        `BDD Complete: GIVEN-WHEN-THEN completo for ${scenario.name}`
      ],
      contextToLoad: {
        files: [
          'constitution.md',
          'proposal.md',
          'design.md',
          `spec.md (APENAS requirement com TODOS scenarios)`,
          `tasks.md (APENAS this task)`,
          `${factory?.name}.ts (implementation)`,
          `${repo?.name}.ts (implementation)`
        ],
        sections: ['Use Case Pattern', 'Domain Events', 'Side Effects'],
        estimatedLines: 800
      }
    });
  }

  return tasks;
}
```

---

## Workflow (Phase 3.5)

### Step 1: Load Context (~10 min)
```bash
# Read required files:
- changes/[change-id]/spec.md (FULL - to extract BDD scenarios)
- changes/[change-id]/proposal.md (context)
- changes/[change-id]/design.md (if HIGH complexity)
- constitution.md (principles, especially DDD Tactical)

# Understand:
- What are the BDD scenarios?
- What DDD components are implied?
- What is the complexity level?
```

### Step 2: Parse BDD Scenarios (~15 min)
```markdown
# Extract all BDD scenarios from spec.md Chapter 6 (Runtime View)

For each scenario, identify:
1. Feature name
2. Scenario name
3. Type: happy-path / error-case / edge-case
4. GIVEN (preconditions)
5. WHEN (action)
6. THEN (expected results + side effects)

Example parsing:
Feature: User Registration
  Scenario: Register new user with valid data (HAPPY-PATH)
    Given: valid email, password, name
    When: POST /api/v1/users
    Then: 201 Created, user ID returned, UsuarioCriado event, welcome email

  Scenario: Reject duplicate email (ERROR-CASE)
    Given: user exists with email
    When: POST /api/v1/users with same email
    Then: 409 Conflict, error message
```

### Step 3: Map to DDD Components (~20 min)
```markdown
# For each HAPPY-PATH scenario, map to DDD Tactical components:

Scenario: "Register new user with valid data"
→ Aggregate: Usuario
→ Factory: criar-usuario.ts
→ Repository: persistir-usuario.ts
→ Use Case: registrar-usuario.ts
→ Entity: Usuario.ts
→ Value Objects: Email.ts, Senha.ts, Nome.ts
→ Events: UsuarioCriado.ts

# Apply DDD Co-Located structure:
src/user-management/api/usuario/
  - criar-usuario.ts
  - persistir-usuario.ts
  - registrar-usuario.ts
  - Usuario.ts
  - Email.ts
  - Senha.ts
  - Nome.ts
  - UsuarioCriado.ts
  - usuario.spec.ts
```

### Step 4: Generate Task Breakdown (~30 min)
```markdown
# Use tasks.md template from .claude/templates/tasks.md

Phase 0: Setup & Infrastructure (ALWAYS - 2 tasks)
  TASK-001: Criar estrutura DDD Co-Located
  TASK-002: Setup de testes e configuração

Phase 1: Core Requirements (from happy-path scenarios)
  For each scenario:
    TASK-00X: Implementar factory criar-[entity].ts
    TASK-00Y: Implementar repository persistir-[entity].ts
    TASK-00Z: Implementar use case [action]-[entity].ts

Phase 2: Error Handling (from error-case scenarios)
  For each error scenario:
    TASK-00N: Implementar erro [ErrorType]

Phase 3: Tests
  TASK-00M: Unit tests para criar-[entity].ts
  TASK-00P: Unit tests para persistir-[entity].ts
  TASK-00Q: Integration tests para [action]-[entity].ts
  TASK-00R: Coverage validation

Phase 4: Quality & Compliance
  TASK-00S: Constitution compliance check
  TASK-00T: Code review self-check

# Total: ~10-15 tasks for typical MEDIUM complexity
```

### Step 5: Define Dependencies (~15 min)
```markdown
# Establish task dependencies (critical for correct order):

TASK-001 (Setup) → blocks all other tasks
TASK-002 (Tests setup) → blocks all test tasks

TASK-003 (Factory) → depends on TASK-001
TASK-004 (Repository) → depends on TASK-003
TASK-005 (Use Case) → depends on TASK-003, TASK-004

TASK-006 (Error handling) → depends on TASK-005
TASK-007 (Unit tests) → depends on TASK-003, TASK-002
...

# Dependency chain example:
TASK-001 → TASK-003 → TASK-004 → TASK-005 → TASK-006
         → TASK-002 → TASK-007
```

### Step 6: Define Context Management (~20 min)
```markdown
# FOR EACH TASK, specify EXACTLY what context to load

THIS IS CRITICAL TO PREVENT HALLUCINATIONS

Example for TASK-003 (Factory):
**Context to Load** (~500 lines):
- constitution.md (DDD section) - ~200 lines
- proposal.md - ~100 lines
- design.md (if exists) - ~150 lines
- spec.md (APENAS the Requirement for this scenario) - ~100 lines
- tasks.md (APENAS TASK-003) - ~50 lines

**Do NOT Load**:
- Other requirements from spec.md
- Other tasks from tasks.md
- Full codebase
- Implementation of other tasks

**Why**: Keep context small (~500-800 lines) = deterministic AI output
```

### Step 7: Write Acceptance Criteria (~20 min)
```markdown
# For each task, define VERIFIABLE acceptance criteria

Example TASK-005 (Use Case):
- [ ] Função registrar-usuario implementada
- [ ] Chama criar-usuario e persistir-usuario
- [ ] Publica domain events no event bus
- [ ] Side effects executados (emails, notifications)
- [ ] Logs estruturados (INFO level)
- [ ] Retorna output correto
- [ ] BDD Complete: GIVEN-WHEN-THEN verified
  - GIVEN: valid user data
  - WHEN: registrar-usuario is called
  - THEN: user created + event published + email sent
- [ ] Integration test passing
- [ ] Coverage >= 80%

# Each criterion must be:
- Specific (not vague)
- Testable (can verify)
- Mapped to BDD scenario
```

### Step 8: Create tasks.md (~15 min)
```bash
# Create file:
changes/[change-id]/tasks.md

# Use template:
.claude/templates/tasks.md

# Fill in:
- Change ID
- Total tasks count
- Estimated LOC
- Progress tracker
- All tasks from phases 0-4
- Execution notes
- Context management rules (CRITICAL section)
```

### Step 9: Validate Tasks (~10 min)
```markdown
# Self-validation checklist:

Task Quality:
- [ ] All tasks < 100 LOC?
- [ ] All tasks < 2 hours estimated?
- [ ] All tasks have clear title and description?
- [ ] All tasks have dependencies listed?
- [ ] All tasks have acceptance criteria?

BDD Coverage:
- [ ] Every BDD scenario covered by tasks?
- [ ] Happy paths → Core tasks?
- [ ] Error cases → Error handling tasks?
- [ ] Side effects → Acceptance criteria?

Context Management:
- [ ] Every task has "Context to Load" section?
- [ ] Context per task < 800 lines?
- [ ] "Do NOT Load" section present?
- [ ] Rationale explained?

DDD Mapping:
- [ ] Tasks follow DDD Tactical structure?
- [ ] Factory → Repository → Use Case order?
- [ ] Semantic naming used (not technical suffixes)?

Dependency Chain:
- [ ] Setup tasks at the beginning?
- [ ] Core tasks after setup?
- [ ] Test tasks have test setup dependency?
- [ ] Quality tasks at the end?
- [ ] No circular dependencies?
```

### Step 10: Submit to Developer
```markdown
# tasks.md is ready when:
- [ ] All validation checks pass
- [ ] tasks.md file created in changes/[change-id]/
- [ ] Developer can start with TASK-001 immediately
- [ ] Each task is atomic and self-contained
- [ ] Context management prevents hallucinations

# Handoff to Developer:
"tasks.md is ready. Start with TASK-001 (Setup).
Load ONLY the context specified in the task.
Mark task complete ONLY when ALL acceptance criteria met.
Do NOT skip tasks or work out of order."
```

---

## Best Practices

### Task Sizing
✅ **DO**:
- Keep tasks < 100 LOC
- Keep tasks < 2 hours
- One task = one component or one clear responsibility
- Break large use cases into subtasks

❌ **DON'T**:
- Create tasks > 100 LOC ("Implement entire feature")
- Create vague tasks ("Fix bugs", "Improve code")
- Combine multiple components in one task

### Context Management (MOST CRITICAL)
✅ **DO**:
```markdown
**Context to Load** (~500 lines):
- constitution.md (DDD section only) - ~200 lines
- proposal.md - ~100 lines
- spec.md (ONLY this requirement) - ~150 lines
- tasks.md (ONLY this task) - ~50 lines

**Do NOT Load**:
- Full spec.md
- All tasks
- Full codebase
- Other implementations
```

❌ **DON'T**:
```markdown
**Context to Load**:
- Everything
- Full spec.md (5000 lines)
- All code files
- (This causes hallucinations!)
```

### Acceptance Criteria
✅ **DO**:
- Map to specific BDD scenario steps
- Make verifiable and testable
- Include side effects (events, notifications)
- Reference constitution compliance

❌ **DON'T**:
- Write vague criteria ("Works correctly")
- Skip error handling criteria
- Forget to mention BDD scenario completion

### Dependencies
✅ **DO**:
- Follow natural order: Factory → Repository → Use Case
- Setup tasks block all implementation tasks
- Test tasks depend on test setup
- Quality tasks depend on all previous tasks

❌ **DON'T**:
- Create circular dependencies
- Allow parallel tasks that should be sequential
- Skip setup dependencies

---

## Examples

### Example 1: Simple Task Breakdown (LOW Complexity)

**Input**: spec.md with 2 BDD scenarios for email validation feature

**Output**: tasks.md with 8 tasks

```
Phase 0: Setup (2 tasks)
  TASK-001: Criar estrutura DDD Co-Located (30 min, ~20 LOC)
  TASK-002: Setup de testes (45 min, ~50 LOC)

Phase 1: Core (2 tasks)
  TASK-003: Implementar Email value object (1h, ~40 LOC)
  TASK-004: Integrar validação em criar-usuario (1h, ~30 LOC)

Phase 2: Errors (1 task)
  TASK-005: Implementar EmailInvalidoError (1h, ~30 LOC)

Phase 3: Tests (2 tasks)
  TASK-006: Unit tests para Email value object (1.5h, ~80 LOC)
  TASK-007: Coverage validation (30 min, N/A)

Phase 4: Quality (1 task)
  TASK-008: Constitution compliance check (30 min, N/A)

Total: 8 tasks, ~250 LOC, ~7 hours
```

### Example 2: Medium Task Breakdown (MEDIUM Complexity)

**Input**: spec.md with 6 BDD scenarios for user registration feature

**Output**: tasks.md with 13 tasks

```
Phase 0: Setup (2 tasks)
  TASK-001: Criar estrutura DDD Co-Located
  TASK-002: Setup de testes

Phase 1: Core (6 tasks)
  TASK-003: Implementar factory criar-usuario.ts
  TASK-004: Implementar repository persistir-usuario.ts
  TASK-005: Implementar use case registrar-usuario.ts
  TASK-006: Implementar Email value object
  TASK-007: Implementar Senha value object
  TASK-008: Implementar Nome value object

Phase 2: Errors (3 tasks)
  TASK-009: Implementar EmailDuplicadoError
  TASK-010: Implementar SenhaFracaError
  TASK-011: Implementar DadosInvalidosError

Phase 3: Tests (4 tasks)
  TASK-012: Unit tests para criar-usuario
  TASK-013: Unit tests para persistir-usuario
  TASK-014: Integration tests para registrar-usuario
  TASK-015: Coverage validation

Phase 4: Quality (2 tasks)
  TASK-016: Constitution compliance check
  TASK-017: Code review self-check

Total: 17 tasks, ~800 LOC, ~25 hours
```

---

## Anti-Patterns

### ❌ Tasks Too Large
```
BAD:
TASK-003: Implement entire user registration system
- Estimated LOC: 500 lines
- Estimated time: 8 hours

PROBLEM: Too large, will cause hallucinations
```

### ❌ Vague Context
```
BAD:
**Context to Load**:
- Read relevant files
- Understand the codebase

PROBLEM: Developer will load too much context → hallucinations
```

### ❌ Missing Dependencies
```
BAD:
TASK-004: Implement repository
Dependencies: None

PROBLEM: Repository depends on entity/factory, will fail or be incorrect
```

### ❌ No BDD Mapping
```
BAD:
TASK-005: Implement use case
Acceptance Criteria:
- [ ] Code works
- [ ] Tests pass

PROBLEM: No connection to BDD scenario, can't verify correctness
```

---

## Constitution Compliance

O Orchestrator deve **SEMPRE** seguir:

### Article I.3: Task Decomposition (NON-NEGOTIABLE)
- ✅ Every specification SHALL be decomposed into atomic tasks
- ✅ Each task < 100 LOC, < 2 hours
- ✅ Each task has explicit dependencies
- ✅ Each task has verifiable acceptance criteria
- ✅ Each task traces to BDD scenario
- ✅ **This prevents AI hallucinations** (large context = bad, small context = good)

### Article I.7: DDD Tactical Structure
- ✅ Tasks follow DDD Co-Located pattern
- ✅ Semantic naming in tasks (criar, persistir, not Factory, Repository)
- ✅ One directory per aggregate
- ✅ Co-located files

---

## Success Criteria

Task decomposition is complete when:

- [ ] `tasks.md` created in `changes/[change-id]/`
- [ ] All BDD scenarios mapped to tasks
- [ ] All tasks < 100 LOC
- [ ] All tasks < 2 hours estimated
- [ ] All tasks have dependencies
- [ ] All tasks have acceptance criteria
- [ ] All tasks have "Context to Load" section (~500 lines each)
- [ ] Setup tasks (Phase 0) present
- [ ] Core tasks (Phase 1) cover happy paths
- [ ] Error tasks (Phase 2) cover error scenarios
- [ ] Test tasks (Phase 3) ensure quality
- [ ] Quality tasks (Phase 4) validate compliance
- [ ] Progress tracker initialized
- [ ] Ready for Developer (Phase 4: Implementation)

---

**Last Updated**: 2025-11-17
**Template Version**: 2.0.0
**Maintained By**: Architecture Team
**Critical Mission**: PREVENT AI HALLUCINATIONS through small, focused task context

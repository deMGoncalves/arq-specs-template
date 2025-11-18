# Implementation Tasks: [Change ID]

**Template ID**: TPL-WORKFLOW-003
**Version**: 2.0.0
**Category**: Workflow
**Used By**: orchestrator (Phase 3.5: Task Decomposition)
**Last Updated**: 2025-11-17

---

**Change**: [change-id]
**Capability**: [capability-name]
**Generated**: YYYY-MM-DD
**Total Tasks**: XX
**Estimated LOC**: ~XXX lines

---

## 📊 Progress Tracker

- **Total**: [ ] 0/XX tasks completed (0%)
- **Phase 0**: [ ] 0/2 (Setup)
- **Phase 1**: [ ] 0/X (Core Requirements)
- **Phase 2**: [ ] 0/X (Error Handling)
- **Phase 3**: [ ] 0/X (Tests)
- **Phase 4**: [ ] 0/X (Quality)

**Status**: 🟡 In Progress | 🟢 Complete | 🔴 Blocked

---

## Phase 0: Setup & Infrastructure

**Purpose**: Preparar estrutura base antes da implementação

### TASK-001: Criar estrutura DDD Co-Located
**Priority**: P0 (Blocker)
**Estimated LOC**: ~20 lines
**Estimated Time**: 30 min
**Dependencies**: None

**Description**:
Criar estrutura de diretórios seguindo DDD Tático Co-Located conforme constitution.md

**File Structure**:
```
src/[context]/[container]/[component]/
  - index.ts              # Aggregate root (export)
  - criar-[entity].ts     # Factory
  - persistir-[entity].ts # Repository
  - [action]-[entity].ts  # Use case
  - [Entity].ts           # Entity
  - [ValueObject].ts      # Value objects
  - [Event].ts            # Domain events
  - [component].spec.ts   # Tests
```

**Acceptance Criteria**:
- [ ] Diretórios criados conforme DDD Co-Located
- [ ] Arquivos vazios com exports criados
- [ ] Index.ts exporta interfaces públicas
- [ ] Estrutura validada contra `.claude/skills/development/tatical-design.md`

**Context to Load** (~200 lines):
- constitution.md (DDD section)
- tatical-design.md

---

### TASK-002: Setup de testes e configuração
**Priority**: P0 (Blocker)
**Estimated LOC**: ~50 lines
**Estimated Time**: 45 min
**Dependencies**: TASK-001

**Description**:
Configurar framework de testes e setup inicial

**Files to Create**:
- `src/[path]/[component].spec.ts`
- Update `vitest.config.ts` or `jest.config.js` if needed

**Acceptance Criteria**:
- [ ] Framework de testes configurado
- [ ] Tests podem ser executados: `npm test`
- [ ] Coverage configurado: `npm run coverage`
- [ ] Primeiro test "smoke" passando

**Context to Load** (~300 lines):
- constitution.md (Test-First section)
- proposal.md
- Test framework docs (if needed)

---

## Phase 1: Core Requirements

**Purpose**: Implementar requisitos principais mapeados dos BDD scenarios

### Requirement: [Nome do Requirement]

**BDD Scenarios Mapeados**:
1. Scenario: "[Nome do Scenario 1]" → TASK-003, TASK-004, TASK-005
2. Scenario: "[Nome do Scenario 2]" → TASK-006
3. Scenario: "[Nome do Scenario 3]" → TASK-007

---

### TASK-003: Implementar factory criar-[entity].ts
**Priority**: P1
**Estimated LOC**: ~60 lines
**Estimated Time**: 1.5 hours
**Dependencies**: TASK-001, TASK-002
**BDD Scenario**: "[Nome do Scenario]" (partial)

**Description**:
Criar factory que constrói entidade [Entity] a partir de dados brutos

**Implementation Guide**:
```typescript
// src/[path]/criar-[entity].ts

interface Criar[Entity]Input {
  field1: string;
  field2: string;
}

interface Criar[Entity]Output {
  entity: [Entity];
  eventos: DomainEvent[];
}

export function criar[Entity](input: Criar[Entity]Input): Criar[Entity]Output {
  // 1. Validar inputs
  // 2. Criar value objects
  // 3. Criar entidade
  // 4. Gerar domain events
  // 5. Retornar entity + eventos
}
```

**Acceptance Criteria**:
- [ ] Função `criar[Entity]` implementada
- [ ] Inputs validados (formato, requisitos mínimos)
- [ ] Value objects criados
- [ ] Entidade criada com ID (uuid)
- [ ] Domain events gerados
- [ ] **BDD Partial**: GIVEN válido → Entity criado
- [ ] Unit test: `describe('criar[Entity]')` passando
- [ ] No hardcoded values (use config/env)

**Context to Load** (~500 lines):
- constitution.md (DDD section)
- proposal.md
- design.md (if exists)
- spec.md (APENAS o Requirement correspondente)
- tasks.md (APENAS TASK-003)

**Do NOT Load**:
- Other requirements from spec.md
- Other tasks
- Implementation of other tasks

---

### TASK-004: Implementar repository persistir-[entity].ts
**Priority**: P1
**Estimated LOC**: ~80 lines
**Estimated Time**: 2 hours
**Dependencies**: TASK-003
**BDD Scenario**: "[Nome do Scenario]" (partial)

**Description**:
Criar repository para persistir [Entity] no banco de dados

**Implementation Guide**:
```typescript
// src/[path]/persistir-[entity].ts

interface Persistir[Entity]Input {
  entity: [Entity];
}

interface Persistir[Entity]Output {
  entityId: string;
  success: boolean;
}

export async function persistir[Entity](
  input: Persistir[Entity]Input
): Promise<Persistir[Entity]Output> {
  // 1. Conectar com banco de dados
  // 2. Verificar unique constraints
  // 3. Inserir registro (com transaction)
  // 4. Retornar entityId
}
```

**Acceptance Criteria**:
- [ ] Função `persistir[Entity]` implementada
- [ ] Conexão com banco de dados (via config)
- [ ] Verificação de unique constraints
- [ ] Insert com transaction
- [ ] Error handling para duplicates
- [ ] **BDD Partial**: Entity persiste no banco
- [ ] Integration test: `describe('persistir[Entity]')` passando
- [ ] Test usa real database (or testcontainers)

**Context to Load** (~600 lines):
- constitution.md (Integration-First Testing)
- proposal.md
- design.md (database schema)
- spec.md (APENAS o Requirement)
- tasks.md (APENAS TASK-004)
- TASK-003 implementation (para entender Entity structure)

---

### TASK-005: Implementar use case [action]-[entity].ts
**Priority**: P1
**Estimated LOC**: ~100 lines
**Estimated Time**: 2 hours
**Dependencies**: TASK-003, TASK-004
**BDD Scenario**: "[Nome do Scenario]" (complete)

**Description**:
Orquestrar todo o fluxo do use case

**Implementation Guide**:
```typescript
// src/[path]/[action]-[entity].ts

interface [Action][Entity]Input {
  field1: string;
  field2: string;
}

interface [Action][Entity]Output {
  entityId: string;
  field1: string;
  status: string;
}

export async function [action][Entity](
  input: [Action][Entity]Input
): Promise<[Action][Entity]Output> {
  // 1. Criar entity (TASK-003)
  // 2. Persistir entity (TASK-004)
  // 3. Publicar domain events
  // 4. Side effects (notifications, etc)
  // 5. Logs estruturados
  // 6. Retornar resultado
}
```

**Acceptance Criteria**:
- [ ] Função `[action][Entity]` implementada
- [ ] Chama `criar[Entity]` e `persistir[Entity]`
- [ ] Publica domain events no event bus
- [ ] Side effects executados (emails, notifications)
- [ ] Logs estruturados (INFO level)
- [ ] Retorna output correto
- [ ] **BDD Complete**: GIVEN-WHEN-THEN completo
  - GIVEN: [pré-condições]
  - WHEN: [ação]
  - THEN: [resultado + side effects]
- [ ] Integration test: `describe('[action][Entity]')` passando
- [ ] Test coverage >= 80%

**Context to Load** (~800 lines):
- constitution.md
- proposal.md
- design.md
- spec.md (APENAS o Requirement - com TODOS scenarios)
- tasks.md (APENAS TASK-005)
- TASK-003 + TASK-004 implementations

---

## Phase 2: Error Handling

**Purpose**: Implementar cenários de erro mapeados dos BDD scenarios

### TASK-006: Implementar erro [ErrorType]
**Priority**: P2
**Estimated LOC**: ~40 lines
**Estimated Time**: 1 hour
**Dependencies**: TASK-005
**BDD Scenario**: "[Nome do Error Scenario]"

**Description**:
Tratar erro quando [condição de erro]

**Implementation**:
- Criar classe de erro: `[Error]Error`
- Adicionar tratamento em componente apropriado
- Propagar erro até use case
- Retornar resposta HTTP apropriada (400, 404, 409, 422, etc)

**Acceptance Criteria**:
- [ ] `[Error]Error` implementado (extends Error)
- [ ] Erro lançado quando condição detectada
- [ ] Use case captura e trata erro
- [ ] **BDD Complete**:
  - GIVEN: [condição de erro]
  - WHEN: [ação]
  - THEN: [erro correto + mensagem clara]
- [ ] Test: `describe('[ErrorType] error')` passando
- [ ] Error message é user-friendly

**Context to Load** (~600 lines):
- constitution.md
- proposal.md
- spec.md (APENAS o Error Scenario)
- tasks.md (APENAS TASK-006)
- Relevant use case implementation

---

## Phase 3: Tests

**Purpose**: Garantir cobertura e qualidade dos testes

### TASK-007: Unit tests para criar-[entity].ts
**Priority**: P2
**Estimated LOC**: ~150 lines
**Estimated Time**: 2 hours
**Dependencies**: TASK-003

**Test Cases**:
- [ ] Should create entity with valid inputs
- [ ] Should throw error for invalid input1
- [ ] Should throw error for invalid input2
- [ ] Should generate domain events
- [ ] Should generate unique ID
- [ ] [Add more based on requirements]

**Acceptance Criteria**:
- [ ] All test cases implemented
- [ ] All tests passing
- [ ] Coverage for criar-[entity].ts >= 90%
- [ ] Edge cases covered

---

### TASK-008: Unit tests para persistir-[entity].ts
**Priority**: P2
**Estimated LOC**: ~120 lines
**Estimated Time**: 2 hours
**Dependencies**: TASK-004

**Test Cases**:
- [ ] Should persist entity to database
- [ ] Should throw error for duplicate
- [ ] Should use database transaction
- [ ] Should rollback on error
- [ ] Should return entityId on success

---

### TASK-009: Integration tests para [action]-[entity].ts
**Priority**: P2
**Estimated LOC**: ~200 lines
**Estimated Time**: 2.5 hours
**Dependencies**: TASK-005, TASK-006

**Test Cases**:
- [ ] End-to-end: Happy path (all scenarios)
- [ ] End-to-end: Error scenarios
- [ ] Event bus: Domain events published
- [ ] Side effects: Executed correctly
- [ ] Logs: Generated correctly

---

### TASK-010: Coverage validation
**Priority**: P2
**Estimated LOC**: N/A
**Estimated Time**: 30 min
**Dependencies**: TASK-007, TASK-008, TASK-009

**Acceptance Criteria**:
- [ ] Total coverage >= 80% (or constitution target)
- [ ] All BDD scenarios have corresponding tests
- [ ] All edge cases covered
- [ ] Run: `npm run coverage` - passes
- [ ] No untested critical paths

---

## Phase 4: Quality & Compliance

**Purpose**: Validar conformidade e qualidade final

### TASK-011: Constitution compliance check
**Priority**: P3
**Estimated LOC**: N/A
**Estimated Time**: 1 hour
**Dependencies**: All previous tasks

**Validation Checklist**:
- [ ] DDD Co-Located structure followed
- [ ] Semantic naming (no technical suffixes)
- [ ] Test-First followed (if TDD in constitution)
- [ ] Integration tests in realistic environment
- [ ] No hardcoded values (use config)
- [ ] All quality gates criteria met
- [ ] No constitution violations

**If violations found**:
- Document each violation
- Create tasks to fix
- Do NOT proceed until fixed

---

### TASK-012: Code review self-check
**Priority**: P3
**Estimated LOC**: N/A
**Estimated Time**: 30 min
**Dependencies**: TASK-011

**Checklist**:
- [ ] Linters pass (0 errors, 0 warnings)
- [ ] Build succeeds
- [ ] All tests pass
- [ ] No TODO/FIXME/HACK comments
- [ ] Code follows .claude/rules/
- [ ] No console.log (use proper logging)
- [ ] No commented-out code
- [ ] Ready for peer review

---

## 📝 Execution Notes

### Task Execution Order

1. **Always start with TASK-001** (blocks all others)
2. **Follow dependency chain strictly**
3. **Mark task as [x] ONLY when ALL acceptance criteria met**
4. **If blocked, document blocker and notify**

### Context Management (CRITICAL for avoiding hallucinations)

**When implementing TASK-XXX, Developer should load ONLY**:
- `constitution.md` (full)
- `proposal.md` (full)
- `design.md` (full, if exists)
- `spec.md` (**APENAS** the Requirement mentioned in task)
- `tasks.md` (**APENAS** the current task)
- Previous task implementations (if dependencies)

**Do NOT load**:
- Other requirements from spec.md
- Other tasks from tasks.md
- Implementation of unrelated tasks
- Full codebase context

**Why**: This keeps context small (~500-800 lines) and focused = deterministic output without hallucinations.

### Progress Tracking

Update progress tracker at top of file after each task completion:
```
- **Total**: [x] 3/12 tasks completed (25%)
```

### Commit Strategy (Optional)

- Commit after each task: `git commit -m "feat: [task-id] [task title]"`
- Or commit after each phase
- Or single commit at end

Choose based on your workflow preference.

### Blocked Tasks

If a task is blocked:
1. Mark as 🔴 Blocked in task title
2. Document blocker in task notes
3. Create new task to unblock if needed
4. Work on non-blocked tasks in parallel

---

## 🎯 Success Criteria

This tasks.md is complete when:

- [ ] All tasks marked as [x]
- [ ] All acceptance criteria satisfied
- [ ] Total test coverage >= target
- [ ] Build passes
- [ ] Linters pass
- [ ] Constitution compliance validated
- [ ] Code review self-check passed
- [ ] Ready for peer review (Reviewer skill)

---

**Generated by**: Orchestrator (Task Decomposition Engine)
**Algorithm**: BDD Scenarios → DDD Components → Atomic Tasks
**Template Version**: 2.0.0

---

## Related Templates

### Prerequisites
- **spec.md** (Arc42 chapters) - Complete specification must exist (Phase 3)
- **design.md** (TPL-WORKFLOW-002) - Architecture design (if HIGH complexity, Phase 2)
- **bdd/scenario.md** (TPL-BDD-001) - BDD scenarios to decompose

### Follows This Template
- **Developer implements** - Task-by-task implementation (Phase 4)
- **Gatekeeper validates** - Quality gates between tasks (Phase 4)

### See Also
- **constitution.md** - DDD tactical patterns guide task structure
- **orchestrator/SKILL.md** - Decomposition algorithm details
- **developer/SKILL.md** - Implementation instructions per task

---

## Workflow Integration

**Phase**: 3.5 (Task Decomposition)

**Primary Skill**: orchestrator

**Trigger**: spec.md (Arc42 + BDD) completed and approved

**Output Location**: `changes/[change-id]/tasks.md`

**Prerequisites**:
- spec.md exists with BDD scenarios and Arc42 architecture
- design.md exists (if HIGH complexity)
- Specification approved by analyst

**Critical Purpose**:
This phase **prevents AI hallucinations** by:
- Decomposing large specs (5000+ lines) into atomic tasks (<100 LOC each)
- Limiting context per task to ~500 lines (deterministic AI behavior)
- Creating clear acceptance criteria per task
- Mapping tasks to DDD components and BDD scenarios

**Next Steps**:
1. **Developer implements** - Execute tasks sequentially (Phase 4)
2. **Gatekeeper validates** - Check quality gates between tasks
3. **Reviewer + Tester validate** - After all tasks complete (Phase 5)

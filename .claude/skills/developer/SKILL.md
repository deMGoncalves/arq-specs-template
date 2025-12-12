# Developer Skill

**Version**: 3.0.0
**Phase**: 4. Implementation
**Responsibility**: Implement code task-by-task following atomic decomposition

---

## Purpose

O Developer é responsável pela **Phase 4: Implementation**, implementando código **task-by-task** conforme decomposição feita pelo Orchestrator.

**Core Function**: Implementar cada task atomicamente, carregando APENAS o contexto especificado em cada task.

**Why Task-by-Task is CRITICAL**:
- ❌ Implementing full spec at once = Large context (5000+ lines) = AI hallucinations = Incorrect code
- ✅ Implementing task-by-task = Small context (~500 lines per task) = Deterministic AI = Correct code
- ✅ Each task has explicit acceptance criteria = Verifiable completion
- ✅ Dependencies ensure correct order = No missed steps

**NON-NEGOTIABLE**: NEVER implement full spec at once. ALWAYS implement task-by-task.

---

## Related Skills

### Prerequisites (must complete before):
- **orchestrator** - Creates `tasks.md` with atomic task breakdown (Phase 3.5)

### Follows this skill (typical flow):
- **gatekeeper** - Validates quality gates during implementation
- **reviewer** - Reviews code quality after implementation (Phase 5)
- **tester** - Validates test quality after implementation (Phase 5)

### Works with (parallel/collaborative):
- **gatekeeper** - Validates at task boundaries (after each task or phase)

---

## Tools & References

### Commands Used
- **Phase 4 (Implementation)**:
  - `/code` - Main command for code implementation
  - `/component` - Reference component structure (C4 L3)

### Templates Created
- **Phase 4 (Implementation)**: None (creates source code, not templates)
  - Creates files in `src/` following DDD Co-Located structure
  - Creates tests in `*.spec.ts` or `*.test.ts`

### Rules Applied
- **ALL 39 Rules** during implementation:

  **Object Calisthenics (001-009)**:
  - 001: Max 1 indentation level
  - 002: No ELSE clause
  - 003: Wrap primitives in value objects
  - 004: First-class collections
  - 005: One dot per line
  - 006: No abbreviations
  - 007: Max 200 lines per class
  - 008: No getters/setters
  - 009: Tell, Don't Ask

  **SOLID (010-014)**:
  - 010: Single Responsibility Principle
  - 011: Open/Closed Principle
  - 012: Liskov Substitution Principle
  - 013: Interface Segregation Principle
  - 014: Dependency Inversion Principle

  **Package Principles (015-020)**:
  - 015: Release-Reuse Equivalence
  - 016: Common Closure Principle
  - 017: Common Reuse Principle
  - 018: Acyclic Dependencies Principle
  - 019: Stable Dependencies Principle
  - 020: Stable Abstractions Principle

  **Code Quality (021-039)**:
  - 021: DRY (Don't Repeat Yourself)
  - 022: KISS (Keep It Simple)
  - 023: YAGNI (You Aren't Gonna Need It)
  - 024: No magic constants
  - 025: No "The Blob" anti-pattern
  - 026: Comment quality (why, not what)
  - 027: Domain error handling
  - 028: Async exception handling
  - 029: Immutability (Object.freeze)
  - 030: No unsafe functions (eval, etc.)
  - 031: Use absolute imports
  - 032: Test coverage ≥80%
  - 033: Max 3 parameters per function
  - 034: Consistent naming
  - 035: No misleading names
  - 036: Isolate side effects
  - 037: No boolean flags
  - 038: Command-Query Separation
  - 039: Boy Scout Rule (leave it better)

---

## When to Use

### Trigger
- tasks.md created and approved
- Ready to start Phase 4 (Implementation)
- ALWAYS start with TASK-001 (never skip)

### Input Required
- `changes/[change-id]/tasks.md` (with all tasks)
- Context specified in CURRENT task ONLY

### Output Produced
- Code implementation for each task
- Tests for each task (TDD)
- Updated progress in tasks.md

---

## Workflow (Task-by-Task)

### Step 1: Load Current Task Context ONLY (~5 min)

```markdown
# CRITICAL: Load ONLY the context specified in the current task

Example for TASK-003:
**Context to Load** (~500 lines):
- specs/ (quality rules, architectural principles) (DDD section) - ~200 lines
- proposal.md - ~100 lines
- design.md (if exists) - ~150 lines
- spec.md (APENAS the Requirement for this scenario) - ~100 lines
- tasks.md (APENAS TASK-003) - ~50 lines

**Do NOT Load**:
- Full spec.md (5000+ lines)
- Other tasks from tasks.md
- Full codebase
- Other implementations

# Why this matters:
Large context = AI loses focus = hallucinations = wrong code
Small context = AI stays focused = correct code
```

**How to Load Context**:
1. Open tasks.md
2. Find current task (e.g., TASK-003)
3. Read "Context to Load" section
4. Load ONLY those files/sections
5. DO NOT load anything else

### Step 2: Understand Task (~10 min)

```markdown
# Read current task completely:

Task ID: TASK-003
Title: Implementar factory criar-usuario.ts
Description: Criar factory que constrói entidade Usuario
Estimated LOC: ~60 lines
Estimated Time: 1.5 hours
Dependencies: TASK-001, TASK-002 (both must be completed)
BDD Scenario: "Register new user with valid data"
DDD Components: Factory (criar-usuario)

Acceptance Criteria:
- [ ] Função criar-usuario implementada
- [ ] Inputs validados (email, senha, nome)
- [ ] Value objects criados (Email, Senha, Nome)
- [ ] Entity Usuario criada com ID (UUID)
- [ ] Domain events gerados (UsuarioCriado)
- [ ] BDD Partial: GIVEN valid data → Usuario created
- [ ] Unit test: describe('criar-usuario') passando

# Questions to answer:
1. What does this task do? (Factory that creates Usuario entity)
2. What are the inputs? (email, senha, nome)
3. What are the outputs? (Usuario entity + UsuarioCriado event)
4. What validations needed? (email format, senha strength, nome length)
5. What value objects? (Email, Senha, Nome)
6. What dependencies? (TASK-001, TASK-002 must be done)
```

### Step 3: Verify Dependencies (~2 min)

```markdown
# Before starting, verify dependencies are completed:

For TASK-003:
Dependencies: TASK-001, TASK-002

Check:
- [ ] TASK-001 (Setup DDD structure) completed?
- [ ] TASK-002 (Test setup) completed?

If dependencies NOT completed:
- STOP immediately
- Do NOT proceed with this task
- Complete dependencies first
- Return to Step 1 with dependency task

If dependencies completed:
- Proceed to Step 4
```

### Step 4: Write Test First (TDD) (~20-30 min)

```markdown
# NON-NEGOTIABLE: Test-First Development

Write test BEFORE implementation.

Example for TASK-003 (criar-usuario):

File: src/user-management/api/usuario/usuario.spec.ts

describe('criar-usuario', () => {
  it('should create user with valid data', () => {
    // GIVEN: valid inputs
    const input = {
      email: 'user@example.com',
      senha: 'SecurePass123!',
      nome: 'João Silva'
    };

    // WHEN: criar-usuario is called
    const result = criarUsuario(input);

    // THEN: user is created
    expect(result.usuario).toBeDefined();
    expect(result.usuario.id).toMatch(/^[0-9a-f-]{36}$/); // UUID
    expect(result.usuario.email.valor).toBe('user@example.com');
    expect(result.usuario.nome.valor).toBe('João Silva');

    // AND: domain event is generated
    expect(result.eventos).toHaveLength(1);
    expect(result.eventos[0].tipo).toBe('UsuarioCriado');
  });

  it('should throw error for invalid email', () => {
    const input = {
      email: 'invalid-email',
      senha: 'SecurePass123!',
      nome: 'João Silva'
    };

    expect(() => criarUsuario(input)).toThrow('Email inválido');
  });

  // Add more test cases for senha validation, nome validation, etc.
});

# Run test (should FAIL - RED):
npm test usuario.spec.ts

# Expected: Test fails because criar-usuario doesn't exist yet
```

### Step 5: Implement Code (GREEN) (~40-60 min)

```markdown
# Implement the MINIMUM code to make tests pass

File: src/user-management/api/usuario/criar-usuario.ts

import { v4 as uuidv4 } from 'uuid';
import { Usuario } from './Usuario';
import { Email } from './Email';
import { Senha } from './Senha';
import { Nome } from './Nome';
import { UsuarioCriado } from './UsuarioCriado';

interface CriarUsuarioInput {
  email: string;
  senha: string;
  nome: string;
}

interface CriarUsuarioOutput {
  usuario: Usuario;
  eventos: DomainEvent[];
}

export function criarUsuario(input: CriarUsuarioInput): CriarUsuarioOutput {
  // 1. Validate inputs by creating value objects
  const email = new Email(input.email); // Will throw if invalid
  const senha = new Senha(input.senha); // Will throw if invalid
  const nome = new Nome(input.nome);   // Will throw if invalid

  // 2. Generate UUID for entity
  const id = uuidv4();

  // 3. Create Usuario entity
  const usuario = new Usuario({
    id,
    email,
    senha,
    nome,
    criadoEm: new Date()
  });

  // 4. Generate domain event
  const evento = new UsuarioCriado({
    usuarioId: id,
    email: email.valor,
    nome: nome.valor,
    ocorridoEm: new Date()
  });

  // 5. Return usuario + eventos
  return {
    usuario,
    eventos: [evento]
  };
}

# Run test again (should PASS - GREEN):
npm test usuario.spec.ts

# Expected: All tests pass
```

### Step 6: Refactor (REFACTOR) (~10-15 min)

```markdown
# Refactor code to improve quality while keeping tests GREEN

Refactoring checklist:
- [ ] Remove duplication
- [ ] Improve naming
- [ ] Extract complex logic into functions
- [ ] Add comments where needed
- [ ] Ensure code follows specs/ (quality rules, architectural principles) principles

# After each refactor, run tests:
npm test usuario.spec.ts

# Tests must STAY green after refactoring
```

### Step 7: Verify Acceptance Criteria (~10 min)

```markdown
# Check ALL acceptance criteria for current task:

For TASK-003:
- [x] Função criar-usuario implementada ✅
- [x] Inputs validados (email, senha, nome) ✅
- [x] Value objects criados (Email, Senha, Nome) ✅
- [x] Entity Usuario criada com ID (UUID) ✅
- [x] Domain events gerados (UsuarioCriado) ✅
- [x] BDD Partial: GIVEN valid data → Usuario created ✅
- [x] Unit test: describe('criar-usuario') passando ✅

# If ANY criterion is NOT met:
- Task is NOT complete
- Continue implementation
- Return to Step 5

# If ALL criteria are met:
- Task is complete
- Proceed to Step 8
```

### Step 8: Update Progress (~5 min)

```markdown
# Update tasks.md progress tracker:

## 📊 Progress Tracker

- **Total**: [x] 1/12 tasks completed (8%)
- **Phase 0**: [x] 2/2 (Setup) ← TASK-001, TASK-002 done
- **Phase 1**: [x] 1/6 (Core Requirements) ← TASK-003 done
- **Phase 2**: [ ] 0/2 (Error Handling)
- **Phase 3**: [ ] 0/3 (Tests)
- **Phase 4**: [ ] 0/2 (Quality)

**Status**: 🟡 In Progress

# Mark current task as completed in task list:

### TASK-003: Implementar factory criar-usuario.ts ✅ COMPLETED
**Priority**: P1
**Estimated LOC**: ~60 lines
**Actual LOC**: 58 lines
**Estimated Time**: 1.5 hours
**Actual Time**: 1.3 hours
...
```

### Step 9: Move to Next Task (~0 min)

```markdown
# Identify next task from tasks.md:

Next task: TASK-004 (Implementar repository persistir-usuario.ts)
Dependencies: TASK-003 (just completed ✅)

# Return to Step 1 with TASK-004
# Load ONLY the context for TASK-004
# DO NOT load context from TASK-003 or other tasks
```

### Step 10: Repeat Until All Tasks Complete

```markdown
# Continue task-by-task until:
- [ ] All Phase 0 tasks complete (Setup)
- [ ] All Phase 1 tasks complete (Core Requirements)
- [ ] All Phase 2 tasks complete (Error Handling)
- [ ] All Phase 3 tasks complete (Tests)
- [ ] All Phase 4 tasks complete (Quality & Compliance)

# Total progress: 12/12 tasks completed (100%)
# Status: 🟢 Complete

# Then proceed to Phase 5 (Review)
```

---

## Constitution Compliance

O Developer deve **SEMPRE** seguir:

### Article I.3: Task Decomposition (NON-NEGOTIABLE)
- ✅ Implement task-by-task (NOT full spec at once)
- ✅ Load ONLY context specified in current task
- ✅ Complete ALL acceptance criteria before marking task done
- ✅ Follow dependency chain strictly
- ✅ This prevents AI hallucinations

### Article I.5: Test-First Imperative (NON-NEGOTIABLE)
- ✅ Write test BEFORE implementation
- ✅ RED → GREEN → REFACTOR cycle
- ✅ Tests are executable acceptance criteria
- ✅ Integration-first testing (use real DB, real services)

### Article I.6: Integration-First Testing
- ✅ Prefer integration tests over unit tests with heavy mocking
- ✅ Use real database (or testcontainers)
- ✅ Use real message queue (or in-memory mode)
- ✅ Mock only external dependencies outside your control

### Article I.7: DDD Tactical Structure
- ✅ Follow DDD Co-Located pattern
- ✅ Semantic naming (criar, persistir, NOT Factory, Repository)
- ✅ Screaming Architecture (structure reveals business intent)
- ✅ Value Objects are immutable
- ✅ Domain Events are past tense
- ✅ Aggregates are small and cohesive

---

## DDD Tactical Guidelines

### Directory Structure (Co-Located)

```
src/[bounded-context]/[container]/[component]/
  ├── index.ts                 # Aggregate root (public exports)
  ├── criar-[entity].ts        # Factory
  ├── persistir-[entity].ts    # Repository
  ├── [action]-[entity].ts     # Use case (e.g., registrar-usuario)
  ├── [Entity].ts              # Entity (aggregate root)
  ├── [ValueObject].ts         # Value objects (Email, CPF, Nome)
  ├── [Event].ts               # Domain events (UsuarioCriado - past tense)
  └── [component].spec.ts      # Tests

Example:
src/user-management/api/usuario/
  ├── index.ts                 # Export public API
  ├── criar-usuario.ts         # Factory
  ├── persistir-usuario.ts     # Repository
  ├── registrar-usuario.ts     # Use case
  ├── Usuario.ts               # Entity
  ├── Email.ts                 # Value object
  ├── Senha.ts                 # Value object
  ├── Nome.ts                  # Value object
  ├── UsuarioCriado.ts         # Domain event
  └── usuario.spec.ts          # Tests
```

### Naming Conventions

✅ **DO** (Semantic Business Names):
- `criar-usuario.ts` (not `UserFactory.ts`)
- `persistir-usuario.ts` (not `UserRepository.ts`)
- `registrar-usuario.ts` (not `RegisterUserUseCase.ts`)
- `Usuario.ts` (entity)
- `Email.ts` (value object)
- `UsuarioCriado.ts` (domain event - past tense)

❌ **DON'T** (Technical Suffixes):
- `UserFactory.ts`
- `UserRepository.ts`
- `UserService.ts`
- `UserDTO.ts`

### Value Objects

```typescript
// Email.ts - Value Object
export class Email {
  private readonly _valor: string;

  constructor(valor: string) {
    // Validation in constructor
    if (!this.isValid(valor)) {
      throw new Error('Email inválido');
    }
    this._valor = valor.toLowerCase();
  }

  get valor(): string {
    return this._valor;
  }

  private isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Value objects are compared by value
  equals(other: Email): boolean {
    return this._valor === other._valor;
  }
}

// Value Objects are:
// - Immutable (no setters)
// - Self-validating (validation in constructor)
// - Compared by value (not by ID)
```

### Entities

```typescript
// Usuario.ts - Entity (Aggregate Root)
export class Usuario {
  private readonly _id: string;
  private _email: Email;
  private _senha: Senha;
  private _nome: Nome;
  private readonly _criadoEm: Date;

  constructor(props: {
    id: string;
    email: Email;
    senha: Senha;
    nome: Nome;
    criadoEm: Date;
  }) {
    this._id = props.id;
    this._email = props.email;
    this._senha = props.senha;
    this._nome = props.nome;
    this._criadoEm = props.criadoEm;

    // Validate invariants
    this.validate();
  }

  // Getters (expose state)
  get id(): string { return this._id; }
  get email(): Email { return this._email; }
  get nome(): Nome { return this._nome; }

  // Business methods (encapsulate behavior)
  alterarEmail(novoEmail: Email): UsuarioAlterado {
    this._email = novoEmail;
    return new UsuarioAlterado({ usuarioId: this._id, novoEmail });
  }

  // Protect invariants
  private validate(): void {
    if (!this._id) throw new Error('ID é obrigatório');
    if (!this._email) throw new Error('Email é obrigatório');
    if (!this._senha) throw new Error('Senha é obrigatória');
    if (!this._nome) throw new Error('Nome é obrigatório');
  }
}

// Entities:
// - Have identity (ID)
// - Can change state (mutable attributes)
// - Protect invariants
// - Encapsulate business logic
```

### Domain Events

```typescript
// UsuarioCriado.ts - Domain Event
export class UsuarioCriado {
  readonly tipo: string = 'UsuarioCriado';  // Event type
  readonly usuarioId: string;
  readonly email: string;
  readonly nome: string;
  readonly ocorridoEm: Date;

  constructor(props: {
    usuarioId: string;
    email: string;
    nome: string;
    ocorridoEm: Date;
  }) {
    this.usuarioId = props.usuarioId;
    this.email = props.email;
    this.nome = props.nome;
    this.ocorridoEm = props.ocorridoEm;
  }
}

// Domain Events:
// - Named in past tense (UsuarioCriado, PedidoConfirmado)
// - Immutable (readonly fields)
// - Contain minimal data needed by subscribers
// - Timestamp when event occurred
```

---

## Best Practices

### Context Management (CRITICAL)

✅ **DO**:
```markdown
# Load ONLY what current task specifies
TASK-003 Context:
- specs/ (quality rules, architectural principles) (DDD section) - ~200 lines
- proposal.md - ~100 lines
- spec.md (APENAS requirement) - ~100 lines
- tasks.md (APENAS TASK-003) - ~50 lines
Total: ~450 lines

# This keeps AI focused and deterministic
```

❌ **DON'T**:
```markdown
# Load everything (causes hallucinations)
- Full spec.md (5000+ lines)
- All tasks.md (1000+ lines)
- Entire codebase (10000+ lines)
Total: 16000+ lines

# This causes AI to lose focus and hallucinate
```

### Test-First

✅ **DO**:
1. Write test first (RED)
2. Write minimal code to pass (GREEN)
3. Refactor while keeping tests green (REFACTOR)
4. Run tests after each change

❌ **DON'T**:
- Write code before tests
- Write tests after implementation
- Skip tests
- Skip refactoring

### Task Completion

✅ **DO**:
- Mark task complete ONLY when ALL acceptance criteria met
- Verify each criterion individually
- Update progress tracker
- Move to next task

❌ **DON'T**:
- Mark task complete with incomplete criteria
- Skip acceptance criteria verification
- Work on multiple tasks in parallel
- Skip dependency verification

### Integration-First Testing

✅ **DO**:
```typescript
// Integration test with real database
describe('persistir-usuario (integration)', () => {
  let db: Database;

  beforeEach(async () => {
    db = await createTestDatabase(); // Real DB
  });

  afterEach(async () => {
    await db.close();
  });

  it('should persist user to database', async () => {
    const usuario = criarUsuario({ ... });

    await persistirUsuario({ usuario });

    // Verify in actual database
    const saved = await db.query('SELECT * FROM users WHERE id = ?', [usuario.id]);
    expect(saved).toBeDefined();
  });
});
```

❌ **DON'T**:
```typescript
// Unit test with mocks (less valuable)
describe('persistir-usuario (mocked)', () => {
  it('should call database.insert', () => {
    const mockDb = { insert: jest.fn() };
    const usuario = criarUsuario({ ... });

    persistirUsuario({ usuario, db: mockDb });

    expect(mockDb.insert).toHaveBeenCalled(); // Only tests mock, not real behavior
  });
});
```

---

## Anti-Patterns

### ❌ Implementing Full Spec at Once

```
BAD:
"Let me implement the entire user registration system"
- Loads full spec.md (5000 lines)
- Tries to implement all features at once
- No clear acceptance criteria
- High chance of hallucinations

PROBLEM: Too much context = AI loses focus = incorrect code
```

### ❌ Skipping Tests

```
BAD:
1. Write all implementation code
2. Skip writing tests
3. "Tests can be added later"

PROBLEM: No way to verify correctness, high chance of bugs
```

### ❌ Ignoring Task Dependencies

```
BAD:
TASK-004 depends on TASK-003
But Developer starts TASK-004 before TASK-003 is complete

PROBLEM: TASK-004 will fail or be incorrect because it depends on TASK-003 output
```

### ❌ Loading Too Much Context

```
BAD:
"Let me load the entire codebase to understand everything"
- Loads 50+ files
- 10000+ lines of context
- Multiple unrelated modules

PROBLEM: AI gets confused, hallucinates, produces incorrect code
```

---

## Success Criteria

Developer work is complete when:

- [ ] All tasks from tasks.md completed
- [ ] All acceptance criteria met for each task
- [ ] All tests passing (TDD followed)
- [ ] Constitution compliance validated
- [ ] DDD Tactical structure followed
- [ ] Code ready for Phase 5 (Review)

---

## Example: Complete Task Flow

### Example Task: TASK-003

**Context to Load** (~500 lines):
- specs/ (quality rules, architectural principles) (DDD section)
- proposal.md
- spec.md (APENAS User Registration requirement)
- tasks.md (APENAS TASK-003)

**Step 1**: Read TASK-003
- Title: Implementar factory criar-usuario.ts
- Estimated LOC: 60 lines
- Dependencies: TASK-001 ✅, TASK-002 ✅

**Step 2**: Write test first (RED)
```typescript
// usuario.spec.ts
describe('criar-usuario', () => {
  it('should create user with valid data', () => {
    const result = criarUsuario({
      email: 'user@example.com',
      senha: 'SecurePass123!',
      nome: 'João Silva'
    });

    expect(result.usuario.id).toBeDefined();
    expect(result.eventos).toHaveLength(1);
  });
});

// Run: npm test → FAILS (criar-usuario doesn't exist)
```

**Step 3**: Implement (GREEN)
```typescript
// criar-usuario.ts
export function criarUsuario(input: CriarUsuarioInput): CriarUsuarioOutput {
  const email = new Email(input.email);
  const senha = new Senha(input.senha);
  const nome = new Nome(input.nome);
  const id = uuidv4();

  const usuario = new Usuario({ id, email, senha, nome, criadoEm: new Date() });
  const evento = new UsuarioCriado({ usuarioId: id, email: email.valor, nome: nome.valor, ocorridoEm: new Date() });

  return { usuario, eventos: [evento] };
}

// Run: npm test → PASSES
```

**Step 4**: Verify acceptance criteria
- [x] Função criar-usuario implementada ✅
- [x] Inputs validados ✅
- [x] Value objects criados ✅
- [x] Entity criada com ID ✅
- [x] Domain events gerados ✅
- [x] BDD Partial verified ✅
- [x] Unit test passing ✅

**Step 5**: Update progress
```markdown
Progress: 3/12 tasks (25%)
TASK-003: ✅ COMPLETED
Next: TASK-004
```

**Step 6**: Move to next task
- Unload TASK-003 context
- Load TASK-004 context ONLY
- Repeat process

---

**Last Updated**: 2025-11-17
**Template Version**: 2.0.0
**Maintained By**: Development Team
**Critical Mission**: PREVENT AI HALLUCINATIONS through task-by-task implementation with small context

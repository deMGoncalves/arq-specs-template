# Developer - Exemplos de Uso

**ID**: SKL-004
**Fase**: 4
**Criticidade**: 🔴 CRITICAL

---

## Exemplo: Implementar TASK-001 (Email Value Object)

### Input: tasks.md

```markdown
## TASK-001: Implement Email Value Object
**LOC**: 45 | **Time**: 45min

**Files to Load**: (480 lines)
- spec.md (SCN-001: 80 lines)
- .claude/rules/003_encapsulate-primitives.md (60 lines)
- .claude/rules/029_error-handling.md (80 lines)
- .claude/templates/ddd-value-object.md (100 lines)
- examples/value-objects/ (160 lines)

**Acceptance Criteria**:
1. Email class encapsulates string primitive
2. Regex RFC 5322 implemented
3. Returns Result<Email, ValidationError>
4. Private constructor, factory method

**Dependencies**: TASK-000 (Setup)
```

### Process: Implementation

#### Passo 1: Carregar Contexto

```bash
# Ler Files to Load
- spec.md (linhas 1-80)
- .claude/rules/003_encapsulate-primitives.md
- .claude/rules/029_error-handling.md
- .claude/templates/ddd-value-object.md
- examples/value-objects/CPF.ts (exemplo existente)

Context total: 480 lines ✅ (<500)
```

#### Passo 2: Implementar Código

```typescript
// src/validation/email/Email.ts

export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Result<Email, ValidationError> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regex.test(value)) {
      return Result.fail(new ValidationError("InvalidEmail"));
    }
    
    return Result.ok(new Email(value));
  }

  getValue(): string {
    return this.value;
  }
}
```

**LOC**: 18 ✅ (<45 estimado)

#### Passo 3: Escrever Testes

```typescript
// src/validation/email/Email.spec.ts

describe("Email", () => {
  it("should accept valid email", () => {
    const result = Email.create("john@example.com");
    expect(result.isSuccess()).toBe(true);
  });

  it("should reject email without @", () => {
    const result = Email.create("invalid");
    expect(result.isFailure()).toBe(true);
    expect(result.error.message).toBe("InvalidEmail");
  });

  // ... 10 more tests
});
```

**Cobertura**: 95% ✅ (>80%)

#### Passo 4: Validar Acceptance Criteria

```markdown
- [x] Email class encapsulates string primitive ✅
- [x] Regex RFC 5322 implemented ✅
- [x] Returns Result<Email, ValidationError> ✅
- [x] Private constructor, factory method ✅
```

### Output: Task Completa

```markdown
✅ TASK-001 COMPLETA

**Evidências**:
- Código: src/validation/email/Email.ts (18 LOC)
- Testes: src/validation/email/Email.spec.ts (12 tests, 100% passing)
- Cobertura: 95%
- Lint: 0 warnings
- Tempo real: 35min (estimado: 45min)

**Próxima task**: TASK-002 (Email Factory)
```

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

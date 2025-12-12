# Orchestrator - Exemplos de Uso

**ID**: SKL-003
**Categoria**: 🎯 Task Decomposition
**Fase**: 3.5
**Criticidade**: 🔴 CRITICAL

---

## 🎯 Propósito

Demonstrar decomposição de specs em tasks atômicas para diferentes complexidades.

---

## 📊 Exemplo 1: Feature Simples (LOW) - Validação de Email

### Input: spec.md (Resumido)

```markdown
# Spec - Email Validation

## SCN-001: Validate Email Format

**Feature**: Email validation
**Priority**: P1

### Scenario: Valid email accepted
**Given**: User enters "john@example.com"
**When**: Validation is performed
**Then**: Email is accepted

### Scenario: Invalid email rejected
**Given**: User enters "invalid"
**When**: Validation is performed
**Then**: Error "InvalidEmail" is returned

## DDD Components

- **Value Object**: Email
- **Factory**: criar-email
- **Use Case**: validar-email
```

**LOC Total**: ~200 lines

### Output: tasks.md (Gerado pelo Orchestrator)

```markdown
# Tasks - Email Validation

**Total Tasks**: 8
**Estimated Time**: 3-4 hours
**Max LOC/task**: 65

---

## TASK-000: Setup
**Phase**: 0 | **Priority**: P0 | **LOC**: 20 | **Time**: 15min

**Description**: Create DDD directory structure

**Files to Load**: (100 lines)
- spec.md (section 1-50)
- .claude/templates/ddd-structure.md (50 lines)

**Acceptance Criteria**:
1. src/validation/email/ directory created
2. index.ts, Email.ts, criar-email.ts stubs created

**Dependencies**: None

---

## TASK-001: Implement Email Value Object
**Phase**: 1 | **Priority**: P0 | **LOC**: 45 | **Time**: 45min

**Description**: Create Email value object with validation logic

**Files to Load**: (480 lines)
- spec.md (SCN-001: 80 lines)
- .claude/rules/003_encapsulate-primitives.md (60 lines)
- .claude/rules/029_error-handling.md (80 lines)
- .claude/templates/ddd-value-object.md (100 lines)
- src/validation/email/index.ts (20 lines)
- examples/value-objects/ (140 lines)

**Acceptance Criteria**:
1. Email class encapsulates string primitive
2. Regex RFC 5322 implemented
3. Returns Result<Email, ValidationError>
4. Private constructor, factory method

**Dependencies**: TASK-000

---

## TASK-002: Implement Email Factory
**Phase**: 1 | **Priority**: P0 | **LOC**: 30 | **Time**: 30min

**Description**: Create criar-email factory function

**Files to Load**: (450 lines)
- spec.md (SCN-001: 80 lines)
- TASK-001 (Email.ts: 45 lines)
- .claude/rules/016_factory-pattern.md (70 lines)
- .claude/templates/ddd-factory.md (100 lines)
- examples/factories/ (155 lines)

**Acceptance Criteria**:
1. Function criar-email(value: string) implemented
2. Calls Email.create() internally
3. Returns Result<Email, ValidationError>

**Dependencies**: TASK-001

---

## TASK-003: Implement validar-email Use Case
**Phase**: 1 | **Priority**: P1 | **LOC**: 40 | **Time**: 30min

**Description**: Create validar-email use case

**Files to Load**: (500 lines)
- spec.md (SCN-001, SCN-002: 120 lines)
- TASK-002 (criar-email.ts: 30 lines)
- .claude/rules/010_srp.md (60 lines)
- .claude/templates/ddd-use-case.md (120 lines)
- examples/use-cases/ (170 lines)

**Acceptance Criteria**:
1. Function validar-email(input: string) implemented
2. Uses criar-email factory
3. Returns Result<void, ValidationError>

**Dependencies**: TASK-002

---

## TASK-004: Unit Tests - Email Value Object
**Phase**: 3 | **Priority**: P0 | **LOC**: 50 | **Time**: 45min

**Description**: Write unit tests for Email

**Files to Load**: (420 lines)
- spec.md (SCN-001, SCN-002: 120 lines)
- TASK-001 (Email.ts: 45 lines)
- .claude/rules/035_test-coverage.md (80 lines)
- examples/tests/ (175 lines)

**Acceptance Criteria**:
1. 5 tests for valid emails (john@example.com, user+tag@domain.co.uk, etc)
2. 5 tests for invalid emails (sem @, sem domínio, espaços, etc)
3. 2 edge case tests (unicode, max length)
4. Coverage ≥90%

**Dependencies**: TASK-001

---

## TASK-005: Integration Tests - Use Case
**Phase**: 3 | **Priority**: P1 | **LOC**: 35 | **Time**: 30min

**Description**: Write integration tests for validar-email

**Files to Load**: (450 lines)
- spec.md (SCN-001, SCN-002: 120 lines)
- TASK-003 (validar-email.ts: 40 lines)
- TASK-004 (Email.spec.ts: 50 lines - examples)
- .claude/rules/036_integration-tests.md (70 lines)
- examples/tests/ (170 lines)

**Acceptance Criteria**:
1. 3 tests for happy path
2. 3 tests for error cases
3. Coverage ≥80%

**Dependencies**: TASK-003, TASK-004

---

## TASK-006: Apply Object Calisthenics
**Phase**: 4 | **Priority**: P1 | **LOC**: 15 | **Time**: 20min

**Description**: Refactor to follow Object Calisthenics rules

**Files to Load**: (350 lines)
- .claude/rules/001-009_object-calisthenics.md (180 lines)
- TASK-001 to TASK-003 (115 lines)
- gatekeeper validation report (55 lines)

**Acceptance Criteria**:
1. Max 1 level indentation (Rule 001)
2. No ELSE clause (Rule 002)
3. Primitives encapsulated (Rule 003)
4. SRP applied (Rule 010)

**Dependencies**: TASK-003

---

## TASK-007: Documentation and Lint
**Phase**: 4 | **Priority**: P2 | **LOC**: 10 | **Time**: 15min

**Description**: Add doc comments and fix lint

**Files to Load**: (280 lines)
- .claude/rules/034_naming.md (60 lines)
- .claude/rules/038_documentation.md (80 lines)
- TASK-001 to TASK-003 (115 lines)
- README.md template (25 lines)

**Acceptance Criteria**:
1. Doc comments em funções públicas
2. Lint 0 warnings (eslint/clippy)
3. README atualizado

**Dependencies**: TASK-006

---

## Execution Order (Topological)

1. TASK-000 (Setup)
2. TASK-001 (Email VO)
3. TASK-002 (Factory) [parallel with TASK-004]
4. TASK-004 (Email tests)
5. TASK-003 (Use Case)
6. TASK-005 (Integration tests)
7. TASK-006 (Refactoring)
8. TASK-007 (Docs)

**Parallelization**: TASK-002 and TASK-004 can run in parallel after TASK-001

---

**Metrics**:
- Total tasks: 8 ✅ (within 5-15 range for LOW)
- Max LOC/task: 50 ✅ (<100)
- Max context/task: 500 lines ✅ (~500)
- Coverage: 100% of spec.md ✅
```

---

## 📊 Exemplo 2: Sistema Médio (MEDIUM) - Notification Service

### Input: spec.md (Resumido)

```markdown
# Spec - Notification System

## SCN-015: Send Order Notification
- Email + Push notification
## SCN-016: Send Payment Notification
- Email only
## SCN-017: Send Delivery Notification
- SMS + Push

## DDD Components (15 components)

**Aggregates** (2):
- NotificationManager
- UserPreferences

**Entities** (3):
- Notification
- Template
- Channel

**Value Objects** (4):
- EmailAddress, PhoneNumber, NotificationContent, ChannelType

**Factories** (2):
- criar-notification, criar-template

**Repositories** (2):
- NotificationRepository, TemplateRepository

**Use Cases** (2):
- enviar-notification, gerenciar-preferencias
```

**LOC Total**: ~1500 lines

### Output: tasks.md (Resumido)

```markdown
# Tasks - Notification System

**Total Tasks**: 32
**Estimated Time**: 2-3 days
**Max LOC/task**: 85

## Distribution by Phase

- Phase 0 (Setup): 3 tasks
- Phase 1 (Core): 18 tasks (Aggregates, Entities, VOs, Factories, Repos, Use Cases)
- Phase 2 (Errors): 4 tasks (Custom errors, validation)
- Phase 3 (Tests): 5 tasks (Unit, integration, e2e)
- Phase 4 (Quality): 2 tasks (Refactoring, docs)

## Sample Tasks

### TASK-005: Implement NotificationManager Aggregate
**LOC**: 80 | **Context**: 490 lines | **Time**: 1h

**Files to Load**:
- spec.md (SCN-015, 016, 017: 180 lines)
- design.md (NotificationManager section: 120 lines)
- .claude/rules/010_srp.md, 025_aggregate-pattern.md (130 lines)
- examples/aggregates/ (60 lines)

**Acceptance Criteria**:
1. NotificationManager aggregate root created
2. Encapsulates Notification entities
3. Enforces invariants (max 100 notifications per user)
4. Emits domain events (NotificationSent, NotificationFailed)

**Dependencies**: TASK-002 (Notification entity), TASK-003 (NotificationContent VO)

---

### TASK-018: Implement EmailChannel
**LOC**: 70 | **Context**: 480 lines

**Files to Load**:
- spec.md (Email channel requirements: 90 lines)
- design.md (Strategy pattern for channels: 110 lines)
- .claude/rules/017_strategy-pattern.md (80 lines)
- TASK-015 (NotificationChannel trait: 40 lines)
- examples/adapters/ (160 lines)

**Acceptance Criteria**:
1. EmailChannel implements NotificationChannel trait
2. Integrates with external email API (SendGrid/AWS SES)
3. Retry logic with exponential backoff (3 attempts)
4. Returns Result<(), NotificationError>

**Dependencies**: TASK-015 (NotificationChannel trait)

---

## Metrics

- Total tasks: 32 ✅ (within 15-40 range for MEDIUM)
- Max LOC/task: 85 ✅ (<100)
- Max context/task: 490 lines ✅ (~500)
- Coverage: 100% of 3 BDD scenarios ✅
- Coverage: 100% of 15 DDD components ✅
```

---

## 📊 Exemplo 3: Sistema Complexo (HIGH) - OAuth2 Migration

### Input: spec.md (Resumido)

```markdown
# Spec - OAuth2 Migration

## BDD Scenarios (8)
- SCN-020: Google OAuth2 login
- SCN-021: GitHub OAuth2 login
- SCN-022: Microsoft OAuth2 login
- SCN-023: SAML SSO
- SCN-024: Refresh token rotation
- SCN-025: 2FA with TOTP
- SCN-026: Rate limiting
- SCN-027: Audit log

## DDD Components (35+ components)

**Bounded Contexts** (2):
- Authentication
- Authorization

**Aggregates** (5):
- AuthSession, OAuth2Provider, SamlProvider, TotpSecret, AuditLog

**Entities** (8):
- User, AccessToken, RefreshToken, AuthorizationCode, SamlAssertion, TotpBackupCode, RateLimitBucket, AuditEntry

**Value Objects** (10):
- UserId, TokenValue, TokenExpiry, Scopes, ClientId, RedirectUri, CodeChallenge, TotpCode, IpAddress, UserAgent

**Factories** (4):
- criar-auth-session, criar-oauth2-provider, criar-totp-secret, criar-audit-entry

**Repositories** (4):
- AuthSessionRepository, TokenRepository, ProviderRepository, AuditLogRepository

**Use Cases** (4):
- iniciar-oauth2-flow, trocar-codigo-por-token, renovar-token, validar-2fa
```

**LOC Total**: ~5000 lines

### Output: tasks.md (Resumido)

```markdown
# Tasks - OAuth2 Migration

**Total Tasks**: 78
**Estimated Time**: 2 weeks
**Max LOC/task**: 95

## Distribution by Phase

- Phase 0 (Setup): 5 tasks
- Phase 1 (Core): 45 tasks
- Phase 2 (Errors): 10 tasks
- Phase 3 (Tests): 15 tasks
- Phase 4 (Quality): 3 tasks

## Critical Path (Sequential tasks)

TASK-000 (Setup)
  → TASK-001 (User entity)
    → TASK-010 (AuthSession aggregate)
      → TASK-025 (OAuth2Provider aggregate)
        → TASK-040 (iniciar-oauth2-flow use case)
          → TASK-050 (Integration tests)
            → TASK-070 (E2E tests)
              → TASK-075 (Refactoring)

**Critical path**: 8 tasks (10% of total) → 90% can run in parallel!

## Sample Tasks

### TASK-040: Implement iniciar-oauth2-flow Use Case
**LOC**: 90 | **Context**: 500 lines | **Time**: 2h

**Files to Load**:
- spec.md (SCN-020, 021, 022: 220 lines)
- design.md (OAuth2 flow diagram: 150 lines)
- RFC 6749 (OAuth2 spec summary: 80 lines)
- TASK-025 (OAuth2Provider aggregate: 90 lines)
- .claude/rules/010_srp.md, 029_error-handling.md (140 lines)

**Acceptance Criteria**:
1. Generates authorization URL with PKCE
2. Stores code_verifier securely
3. Redirects user to provider
4. Returns Result<AuthorizationUrl, OAuth2Error>

**Dependencies**: TASK-025 (OAuth2Provider), TASK-015 (CodeChallenge VO)

---

### TASK-055: Implement Refresh Token Rotation
**LOC**: 85 | **Context**: 495 lines | **Time**: 1.5h

**Files to Load**:
- spec.md (SCN-024: 100 lines)
- design.md (Token rotation strategy: 120 lines)
- ADR-006 (Token rotation decision: 90 lines)
- RFC 6819 (Security considerations: 80 lines)
- TASK-012 (RefreshToken entity: 60 lines)
- .claude/rules/030_security.md (145 lines)

**Acceptance Criteria**:
1. Old refresh token is invalidated
2. New refresh token is issued
3. Token family is tracked (detect reuse attacks)
4. Returns Result<(AccessToken, RefreshToken), TokenError>

**Dependencies**: TASK-012 (RefreshToken), TASK-011 (AccessToken)

---

## Metrics

- Total tasks: 78 ✅ (within 40-100 range for HIGH)
- Max LOC/task: 95 ✅ (<100)
- Max context/task: 500 lines ✅ (~500)
- Coverage: 100% of 8 BDD scenarios ✅
- Coverage: 100% of 35+ DDD components ✅
- Parallelization: 90% (70/78 tasks) ✅
```

---

## 🎓 Lições Aprendidas

### LOW Complexity
- **8 tasks**: Fácil de gerenciar
- **Context pequeno**: ~300-400 lines/task
- **Sem architect**: Design inline

### MEDIUM Complexity
- **32 tasks**: Requer orchestrator
- **Context otimizado**: ~450-490 lines/task
- **Design.md ajuda**: Reduz ambiguidade

### HIGH Complexity
- **78 tasks**: orchestrator CRÍTICO
- **Context no limite**: 495-500 lines/task
- **90% parallelization**: Maximiza velocidade
- **ADRs múltiplas**: Documentam decisões complexas

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

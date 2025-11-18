# Analyst Skill

**Version**: 2.0.0
**Phases**: 1. Discovery + 3. Specification
**Responsibility**: Requirements analysis, proposal creation, and behavioral specification

---

## Purpose

O Analyst é responsável por duas fases críticas do workflow:

1. **Phase 1 (Discovery)**: Analisar mudanças propostas e criar `proposal.md`
2. **Phase 3 (Specification)**: Criar especificações detalhadas em `spec.md` usando Arc42 + C4 + BDD + ADR

---

## Related Skills

### Prerequisites (must complete before):
- None (Analyst is the entry point for Phase 1: Discovery)

### Follows this skill (typical flow):
- **Phase 1 → architect** - If complexity = HIGH, create `design.md` (Phase 2)
- **Phase 1 → analyst** - If complexity = LOW/MEDIUM, skip to Specification (Phase 3)
- **Phase 3 → orchestrator** - After spec.md approved, decompose into tasks (Phase 3.5)

### Works with (parallel/collaborative):
- **architect** - May consult during Phase 2 for design clarifications
- **orchestrator** - Provides spec.md as input for task decomposition

---

## Phase 1: Discovery (Proposal Creation)

### Trigger
- Usuário ou time propõe uma nova feature/mudança
- Pode ser formal (documento) ou informal (conversa, issue)

### Responsibilities

#### 1. Understand the Why (~15 min)
```markdown
# Entenda o problema/oportunidade:
- Qual dor o usuário/negócio está sentindo?
- Qual oportunidade estamos perdendo?
- O que acontece se NÃO fizermos isso?
- Qual o impacto esperado?

# Faça perguntas clarificadoras:
- Quem é o usuário afetado?
- Qual o volume/escala esperado?
- Há constraints de tempo, custo, ou tecnologia?
```

#### 2. Define What Changes (~20 min)
```markdown
# Liste mudanças propostas de forma concisa:
- O que será adicionado?
- O que será modificado?
- O que será removido?
- Há breaking changes?

# Identifique affected specs:
- Quais capabilities em specs/ serão afetadas?
- Há novas capabilities a criar?

# Identifique affected code:
- Quais bounded contexts serão afetados?
- Quais módulos/componentes?
```

#### 3. Assess Complexity (~15 min)
```markdown
# Avalie a complexidade da mudança:

LOW:
- Mudança simples, poucos arquivos (<5)
- Um único bounded context
- Padrões já estabelecidos no projeto
- Sem design significativo necessário
- Exemplo: adicionar validação de campo, novo endpoint CRUD

MEDIUM:
- Mudança moderada, múltiplos arquivos (5-15)
- Múltiplos componentes dentro de um bounded context
- Alguns padrões novos, mas arquitetura clara
- Design leve pode ajudar
- Exemplo: nova feature com 3-5 use cases, integração simples

HIGH:
- Mudança significativa, muitos arquivos (>15)
- Múltiplos bounded contexts ou integrações externas
- Decisões arquiteturais importantes
- Trade-offs técnicos a avaliar
- Requer fase de Architecture (design.md)
- Exemplo: sistema de pagamento, autenticação, mensageria
```

#### 4. Identify Breaking Changes (~10 min)
```markdown
# Verifique se há quebra de compatibilidade:

Breaking changes podem ser:
- Mudança em API pública (endpoints, request/response)
- Mudança em database schema (remove columns, change types)
- Mudança em contratos de integração
- Remoção de features existentes

Se breaking:
- Documente o que quebra
- Defina migration guide
- Defina timeline de deprecação
```

#### 5. Decide Next Steps (~5 min)
```markdown
# Decida o fluxo:

Complexity = LOW ou MEDIUM:
→ Prosseguir para Phase 3 (Specification) diretamente
→ Skip Phase 2 (Architecture)

Complexity = HIGH:
→ Requer Phase 2 (Architecture) antes de Specification
→ Architect criará design.md com ADRs, C4 diagrams, DDD design
```

### Workflow (Phase 1)

#### Step 1: Gather Context
```bash
# Read relevant context:
- User request/issue
- constitution.md (principles)
- specs/ (existing capabilities)
- src/ (current architecture, optional)
```

#### Step 2: Create proposal.md
```bash
# Location:
changes/[change-id]/proposal.md

# Use template:
.claude/templates/proposal.md
```

#### Step 3: Fill Proposal Sections

**Section: Why**
- 1-2 sentences describing problem/opportunity
- Context: specific problem, impact, stakeholder feedback

**Section: What Changes**
- Concise list of changes (ADDED/MODIFIED/REMOVED)
- Mark breaking changes explicitly
- Details: scope, integrations affected

**Section: Impact**
- Affected specs (list from specs/)
- Affected code (list from src/)
- Complexity assessment (LOW/MEDIUM/HIGH)
- Breaking changes (YES/NO)

**Section: Next Steps**
- Requires Design Phase? (YES/NO)
- Justification if YES
- List affected capabilities

**Section: Approval**
- Identify stakeholders
- Leave for approval

#### Step 4: Request Approval
```markdown
# Submeter proposal.md para:
- Product Owner (se mudança de negócio)
- Tech Lead (sempre)
- Team (para awareness)

# Aguardar aprovação antes de prosseguir
```

### Output (Phase 1)

**File Created**: `changes/[change-id]/proposal.md`

**Content**:
- ✅ Why section complete (problem/opportunity clear)
- ✅ What Changes section complete (lista de mudanças)
- ✅ Complexity assessed (LOW/MEDIUM/HIGH)
- ✅ Breaking changes identified
- ✅ Next steps defined
- ✅ Stakeholders identified

**Decision Made**:
- If Complexity = HIGH → Proceed to Phase 2 (Architect)
- If Complexity = LOW/MEDIUM → Proceed to Phase 3 (Analyst - Specification)

---

## Phase 3: Specification (spec.md Creation)

### Trigger
- proposal.md aprovado
- Se HIGH complexity: design.md também aprovado (Gate 1)
- Se LOW/MEDIUM complexity: prosseguir direto após proposal

### Responsibilities

#### 1. Create Capability Specs
```markdown
# Para cada capability afetada, criar ou atualizar:
specs/[capability]/spec.md

# Seguir formato:
- Arc42 (adaptive by complexity)
- C4 Model (diagrams)
- BDD Scenarios (GIVEN-WHEN-THEN)
- ADRs (if not covered by design.md)
- OpenSpec Delta format (ADDED/MODIFIED/REMOVED/RENAMED)
```

#### 2. Apply Arc42 Structure (Adaptive)
```markdown
# LOW Complexity - Mínimo obrigatório:
- Chapter 6: Runtime View (comportamento)
- Chapter 10: Quality Requirements (requisitos)

# MEDIUM Complexity - Expandido:
- Chapter 3: Context & Scope
- Chapter 5: Building Blocks (estrutura)
- Chapter 6: Runtime View
- Chapter 8: Concepts (patterns)
- Chapter 9: Architecture Decisions (ADRs se não em design.md)
- Chapter 10: Quality Requirements

# HIGH Complexity - Completo:
- Todos 12 chapters do Arc42
- Referência design.md para decisões arquiteturais
```

#### 3. Write BDD Scenarios
```markdown
# Para cada requirement, escrever scenarios BDD:

Feature: [Nome da Feature]

Background:
  [Contexto comum a todos scenarios]

Scenario: [Nome do Scenario - Happy Path]
  Given [pré-condição clara e específica]
    And [pré-condição adicional se necessário]
  When [ação do usuário ou sistema]
    And [ação adicional se necessário]
  Then [resultado esperado verificável]
    And [resultado adicional]
    And [side effect: event, notification, etc]

Scenario: [Nome do Scenario - Error Case]
  Given [pré-condição que leva a erro]
  When [ação que trigga erro]
  Then [erro específico é retornado]
    And [mensagem user-friendly]
    And [estado do sistema preservado]

# Guidelines:
- Scenarios devem ser executáveis (podem virar integration tests)
- Use linguagem de negócio (ubiquitous language)
- Seja específico em dados (não "algum", "qualquer", "vários")
- Cada scenario testa UMA coisa
- Cubra happy paths e error cases
```

#### 4. Apply OpenSpec Delta Format
```markdown
# Para cada elemento da spec, marcar:

## ADDED: [Section Name]
[Conteúdo novo que não existia antes]

## MODIFIED: [Section Name]
**Before**:
[Como era antes]

**After**:
[Como fica depois]

**Reason**:
[Por que mudou]

## REMOVED: [Section Name]
**Before**:
[O que existia]

**Reason**:
[Por que foi removido]

## RENAMED: [Section Name]
**Before**: [old-name]
**After**: [new-name]
**Reason**: [Justificativa]
```

### Workflow (Phase 3)

#### Step 1: Load Context (~10 min)
```bash
# Required:
- changes/[change-id]/proposal.md (full)
- constitution.md (full)
- specs/[capability]/spec.md (if updating existing)

# Optional:
- changes/[change-id]/design.md (if HIGH complexity)
- src/[bounded-context]/ (to understand current state)
```

#### Step 2: Create or Update Spec (~2-4 hours depending on complexity)

**For NEW capability**:
```bash
# Create new spec:
mkdir -p specs/[capability-name]
touch specs/[capability-name]/spec.md

# Use Arc42 structure
# Start with template (can be created if needed)
```

**For EXISTING capability**:
```bash
# Update existing spec:
specs/[capability-name]/spec.md

# Apply delta format:
# - Mark ADDED sections
# - Mark MODIFIED sections (show before/after)
# - Mark REMOVED sections
# - Mark RENAMED sections
```

#### Step 3: Write Arc42 Chapters

**Chapter 1: Introduction and Goals** (if needed)
- What is this capability?
- Quality goals
- Stakeholders

**Chapter 3: Context and Scope** (MEDIUM/HIGH)
- Business context
- Technical context
- External interfaces

**Chapter 5: Building Block View** (MEDIUM/HIGH)
- DDD structure (bounded contexts, aggregates)
- Components and their responsibilities
- Reference design.md if exists

**Chapter 6: Runtime View** (ALWAYS - most important)
- BDD scenarios (GIVEN-WHEN-THEN)
- Sequence diagrams if helpful
- Error scenarios

**Chapter 8: Cross-cutting Concepts** (MEDIUM/HIGH)
- Domain model
- Patterns used
- Error handling strategy

**Chapter 9: Architecture Decisions** (MEDIUM/HIGH)
- ADRs if not in design.md
- Or reference design.md ADRs

**Chapter 10: Quality Requirements** (ALWAYS)
- Performance requirements
- Security requirements
- Testability requirements
- Compliance requirements

**Other chapters**: As needed based on complexity

#### Step 4: Write BDD Scenarios (~1-2 hours)
```gherkin
# For each requirement, write comprehensive scenarios

# Example:
Feature: User Registration

Background:
  Given the system is running
    And the database is empty

Scenario: Register new user with valid data
  Given a valid email "user@example.com"
    And a valid password "SecurePass123!"
    And a valid name "João Silva"
  When I send POST /api/v1/users with this data
  Then the response status is 201 Created
    And the response contains the user ID
    And the user is stored in the database
    And the event "UsuarioCriado" is published
    And a welcome email is sent to "user@example.com"

Scenario: Reject registration with duplicate email
  Given a user already exists with email "user@example.com"
  When I send POST /api/v1/users with email "user@example.com"
  Then the response status is 409 Conflict
    And the response contains error code "EMAIL_ALREADY_EXISTS"
    And the response contains message "Email já está em uso"
    And no new user is created
    And no event is published

Scenario: Reject registration with invalid email format
  Given an invalid email "not-an-email"
  When I send POST /api/v1/users with this email
  Then the response status is 422 Unprocessable Entity
    And the response contains error code "INVALID_EMAIL"
    And the response contains message "Email inválido"

# Cover:
# - Happy paths (main flow)
# - Error cases (validation, business rules, technical errors)
# - Edge cases (empty, null, boundary values)
# - Side effects (events, notifications, logs)
```

#### Step 5: Apply Delta Format (~30 min)
```markdown
# Se updating existing spec, aplique delta format:

Example:

## MODIFIED: 6.1 User Registration Flow

**Before**:
User registration only required email and password.

**After**:
User registration now requires email, password, name, and CPF.
CPF is validated using Validator service.

**Reason**:
LGPD compliance requires full name and CPF for brazilian users.

**BDD Scenarios Affected**:
- Scenario "Register with valid data" - MODIFIED (added CPF field)
- Scenario "Reject registration with invalid CPF" - ADDED
```

#### Step 6: Validate Spec (~30 min)
```markdown
# Self-validation checklist:

Arc42 Compliance:
- [ ] Required chapters present (based on complexity)?
- [ ] Chapters have meaningful content (not placeholder)?
- [ ] References design.md if HIGH complexity?

BDD Scenarios:
- [ ] Each requirement has >= 1 scenario?
- [ ] Happy paths covered?
- [ ] Error cases covered?
- [ ] Scenarios are specific (no vague terms)?
- [ ] Scenarios are executable (clear GIVEN-WHEN-THEN)?
- [ ] Side effects documented (events, notifications)?

Delta Format:
- [ ] All changes marked (ADDED/MODIFIED/REMOVED/RENAMED)?
- [ ] MODIFIED sections show before/after?
- [ ] Reasons for changes documented?

Constitution Compliance:
- [ ] Follows Arc42 + C4 + BDD + ADR foundation?
- [ ] DDD Tactical structure respected?
- [ ] Test-First considerations documented?

Quality:
- [ ] Spec is clear and unambiguous?
- [ ] Technical and business stakeholders can understand?
- [ ] Ready for task decomposition (Phase 3.5)?
```

#### Step 7: Submit to Gate 2
```markdown
# Submit spec.md for validation:
- Gatekeeper validates Gate 2: Specification Format
- Automated checks: Arc42 compliance, BDD format, Delta format
- If rejected: fix issues and resubmit
- If approved: proceed to Phase 3.5 (Task Decomposition)
```

### Output (Phase 3)

**Files Created/Updated**:
- `specs/[capability]/spec.md` (new or updated)
- Following Arc42 structure (adaptive by complexity)
- With BDD scenarios for all requirements
- With OpenSpec delta format (if updating)

**Content Checklist**:
- ✅ Arc42 chapters (appropriate for complexity)
- ✅ BDD scenarios (comprehensive, executable)
- ✅ Delta format applied (if updating)
- ✅ C4 diagrams referenced (from design.md or inline)
- ✅ ADRs referenced (from design.md or inline)
- ✅ Quality requirements defined
- ✅ Ready for task decomposition

---

## Interaction with Other Skills

### Phase 1 (Discovery)
**Analyst → Stakeholders**: Create proposal.md → Request approval
**Analyst → Architect**: If HIGH complexity → Trigger Phase 2

### Phase 2 (Architecture) - Optional
**Architect → Gatekeeper**: design.md → Gate 1 validation
**Architect → Analyst**: design.md approved → Trigger Phase 3

### Phase 3 (Specification)
**Analyst → Gatekeeper**: spec.md → Gate 2 validation
**Analyst → Orchestrator**: spec.md approved → Trigger Phase 3.5 (Task Decomposition)

---

## Best Practices

### For Proposal (Phase 1)

✅ **DO**:
- Be concise in "Why" section (1-2 sentences + context)
- List changes clearly (use bullet points)
- Assess complexity honestly (don't underestimate)
- Identify breaking changes explicitly
- Involve stakeholders early

❌ **DON'T**:
- Write vague problem statements ("improve system")
- Skip complexity assessment
- Hide breaking changes
- Start implementation before approval

### For Specification (Phase 3)

✅ **DO**:
- Apply Arc42 adaptively (don't over-document LOW complexity)
- Write specific BDD scenarios (not vague)
- Use ubiquitous language (business terms)
- Cover error cases, not just happy paths
- Reference design.md for HIGH complexity

❌ **DON'T**:
- Write all 12 Arc42 chapters for simple changes
- Write vague scenarios ("some data", "valid input")
- Skip error scenarios
- Duplicate content from design.md (reference it)
- Write specs that can't be decomposed into tasks

### For BDD Scenarios

✅ **DO**:
```gherkin
# Specific, executable, testable
Scenario: Register user with valid CPF
  Given a valid CPF "123.456.789-00"
    And a valid email "user@example.com"
  When I register a new user
  Then the user is created with ID
    And the event "UsuarioCriado" is published
    And a welcome email is sent
```

❌ **DON'T**:
```gherkin
# Vague, not executable, not testable
Scenario: Register user
  Given some valid data
  When user registers
  Then it works
```

---

## Constitution Compliance

O Analyst deve **SEMPRE** seguir:

### Article I: Core Principles
1. ✅ **Specification-Driven**: Specs antes de implementação
2. ✅ **Arc42 + C4 + BDD + ADR**: Base estrutural (NON-NEGOTIABLE)
3. ✅ **Task Decomposition**: Specs devem ser decomponíveis em tasks atômicas
4. ✅ **Test-First**: BDD scenarios são base para testes

### Article II: Architectural Constraints
- Specs seguem Arc42 (adaptive by complexity)
- BDD scenarios são executáveis
- Delta format para mudanças em specs existentes

---

## Quality Criteria

### Gate 2: Specification Format (Automated Validation)

**Arc42 Compliance**:
- [ ] Required chapters present (based on complexity)
- [ ] Chapter 6 (Runtime View) has BDD scenarios
- [ ] Chapter 10 (Quality Requirements) defined

**BDD Format**:
- [ ] All scenarios follow GIVEN-WHEN-THEN format
- [ ] Scenarios are specific (no vague terms)
- [ ] Error cases covered
- [ ] Side effects documented

**Delta Format** (if updating):
- [ ] All changes marked (ADDED/MODIFIED/REMOVED/RENAMED)
- [ ] MODIFIED sections show before/after
- [ ] Reasons documented

**Decomposability**:
- [ ] Spec can be broken into atomic tasks (<100 LOC each)
- [ ] Requirements map to DDD components
- [ ] Dependencies clear

---

## Examples

### Example 1: LOW Complexity Proposal
```markdown
# Proposal: add-email-validation

## Why
Users can currently register with invalid email formats, causing delivery failures.

## What Changes
- [x] Add email format validation in criar-usuario.ts
- [x] Return 422 error for invalid emails

## Impact
- Affected specs: specs/user-management/
- Affected code: src/user-management/api/usuario/
- Complexity: LOW
- Breaking: NO

## Next Steps
- Requires Design Phase: NO
- Proceed to Specification (Phase 3)
```

### Example 2: HIGH Complexity Proposal
```markdown
# Proposal: add-payment-gateway

## Why
We need to accept credit card payments to monetize the platform.

## What Changes
- [x] Integrate with Stripe API
- [x] Add payment bounded context
- [x] Implement webhook handling
- [x] Add transaction history
- [x] BREAKING: Add payment_status to orders

## Impact
- Affected specs: specs/payments/ (NEW), specs/orders/ (MODIFIED)
- Affected code: src/payments/ (NEW), src/orders/ (MODIFIED)
- Complexity: HIGH
- Breaking: YES (adds required field to orders)

## Next Steps
- Requires Design Phase: YES
  - Need to decide: Stripe vs PayPal vs Mercado Pago
  - Need to design: Event-driven architecture for webhooks
  - Need to define: Retry strategy, security, PCI compliance
- Proceed to Architecture (Phase 2)
```

---

## Success Criteria

### Phase 1 (Discovery) Complete When:
- [ ] `proposal.md` created in `changes/[change-id]/`
- [ ] Why, What, Impact sections complete
- [ ] Complexity assessed
- [ ] Breaking changes identified
- [ ] Next steps clear
- [ ] Stakeholders approved proposal

### Phase 3 (Specification) Complete When:
- [ ] `spec.md` created/updated in `specs/[capability]/`
- [ ] Arc42 chapters present (appropriate for complexity)
- [ ] BDD scenarios comprehensive (happy paths + errors)
- [ ] Delta format applied (if updating)
- [ ] Constitution compliant
- [ ] Gate 2 validation passed
- [ ] Ready for task decomposition (Phase 3.5)

---

**Last Updated**: 2025-11-17
**Template Version**: 2.0.0
**Maintained By**: Requirements Team

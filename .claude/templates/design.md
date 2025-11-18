# Design: [Change ID]

**Template ID**: TPL-WORKFLOW-002
**Version**: 2.0.0
**Category**: Workflow
**Used By**: architect (Phase 2: Architecture)
**Last Updated**: 2025-11-17

---

**Change ID**: [change-id]
**Created**: YYYY-MM-DD
**Author**: [Architect/Team]
**Status**: 🟡 Draft | 🟢 Approved | 🔴 Rejected | 🔵 Under Review

---

## Overview

[Visão geral da solução arquitetural em 2-3 sentenças. Descreva a essência da solução técnica.]

**Problem Statement**: [Qual problema arquitetural estamos resolvendo?]

**Solution Summary**: [Como estamos resolvendo em alto nível?]

---

## Architecture Decisions (ADRs)

### ADR-001: [Título da Decisão Principal]

**Status**: 🟡 Proposed | 🟢 Accepted | 🔴 Rejected | 🔵 Superseded

**Context**:
[Por que precisamos tomar esta decisão? Que fatores técnicos, de negócio, ou de time influenciam esta decisão?]

**Decision**:
[O que decidimos fazer? Seja específico e claro.]

**Consequences**:

**Positive**:
- Benefício 1
- Benefício 2
- Benefício 3

**Negative**:
- Trade-off 1
- Trade-off 2
- Trade-off 3

**Risks**:
- Risco 1 → Mitigation: [Como mitigar]
- Risco 2 → Mitigation: [Como mitigar]

**Alternatives Considered**:

1. **[Alternativa 1]**
   - Pros: [Lista]
   - Cons: [Lista]
   - Why rejected: [Razão clara]

2. **[Alternativa 2]**
   - Pros: [Lista]
   - Cons: [Lista]
   - Why rejected: [Razão clara]

**References**:
- [Link para documentação externa, se aplicável]
- [Discussão do time, RFC, etc]

---

### ADR-002: [Segunda Decisão]

[Repita estrutura acima para cada decisão significativa]

---

### ADR-003: [Terceira Decisão]

[...]

---

## C4 Model Diagrams

### C1: System Context

**Purpose**: Mostrar o sistema em seu ambiente, com sistemas externos e atores.

```
[Diagrama PlantUML, Mermaid, ou descrição textual estruturada]

Example (Mermaid):
graph LR
    A[Usuario] -->|HTTPS| B[Nossa Aplicacao]
    B -->|API| C[Payment Gateway]
    B -->|SQL| D[Database]
    B -->|Events| E[Message Queue]
```

**Systems**:
- **Nossa Aplicação**: [Descrição e responsabilidades]
- **Sistema Externo 1**: [Descrição e integração]
- **Sistema Externo 2**: [Descrição e integração]

**Actors**:
- **Usuario**: [Tipo de usuário e interações]
- **Admin**: [Tipo de usuário e interações]

---

### C2: Container Diagram

**Purpose**: Mostrar os containers (applications, databases, services) e como se comunicam.

```
[Diagrama ou descrição textual]

Example:
graph LR
    A[Web App] -->|HTTPS| B[API Gateway]
    B -->|gRPC| C[User Service]
    B -->|gRPC| D[Payment Service]
    C -->|SQL| E[User DB]
    D -->|SQL| F[Payment DB]
    C -->|Pub| G[Event Bus]
    D -->|Sub| G
```

**Containers**:
- **[Container 1]**:
  - Technology: [e.g., Node.js, Go, Python]
  - Responsibility: [O que este container faz]
  - Communication: [Como se comunica com outros]

- **[Container 2]**:
  - Technology: [...]
  - Responsibility: [...]
  - Communication: [...]

**Data Stores**:
- **[Database 1]**: [PostgreSQL, MongoDB, etc] - [Propósito]
- **[Cache]**: [Redis, Memcached] - [Propósito]
- **[Message Queue]**: [RabbitMQ, Kafka] - [Propósito]

**Protocols**:
- Container 1 → Container 2: [REST/gRPC/GraphQL/Events]
- Container 2 → Database: [SQL/NoSQL protocol]

---

### C3: Component Diagram

**Purpose**: Mostrar os componentes dentro dos containers afetados.

```
[Diagrama focado nos componentes DDD]

Example (para User Service container):
User Service
├── API Layer
│   └── UserController (REST endpoints)
├── Application Layer
│   ├── criar-usuario (use case)
│   ├── atualizar-usuario (use case)
│   └── autenticar-usuario (use case)
├── Domain Layer
│   ├── Usuario (entity/aggregate)
│   ├── Email (value object)
│   ├── CPF (value object)
│   └── UsuarioCriado (domain event)
└── Infrastructure Layer
    ├── persistir-usuario (repository)
    └── UserEventPublisher
```

**Components by Bounded Context**:

#### [Bounded Context 1]
- **Aggregates**: [Lista com descrição breve]
- **Entities**: [Lista]
- **Value Objects**: [Lista]
- **Domain Events**: [Lista - past tense]
- **Use Cases**: [Lista - formato: verbo-substantivo]
- **Repositories**: [Lista - formato: persistir-entidade]

#### [Bounded Context 2]
[...]

---

### C4: Code Diagram (Optional)

**Purpose**: Apenas para lógica muito complexa que requer visualização de código.

[Raramente necessário. Use apenas se realmente agregar valor.]

---

## DDD Tactical Design

### Bounded Contexts Affected

#### Context: [Nome do Bounded Context]

**Purpose**: [Por que este bounded context existe? Qual subdomínio representa?]

**Ubiquitous Language**:
- **[Termo 1]**: [Definição no contexto do negócio]
- **[Termo 2]**: [Definição no contexto do negócio]
- **[Termo 3]**: [Definição no contexto do negócio]

**Aggregates**:

##### [Aggregate Name]
- **Root Entity**: [Nome da entidade raiz]
- **ID**: [Tipo do ID - UUID, auto-increment, composite]
- **Invariants**:
  - [Regra de negócio 1 que SEMPRE deve ser verdade]
  - [Regra de negócio 2 que SEMPRE deve ser verdade]
- **Child Entities**: [Lista, se aplicável]
- **Value Objects**: [Lista]

**Entities**:
- **[Entity 1]**: [Descrição breve e atributos principais]
- **[Entity 2]**: [Descrição breve e atributos principais]

**Value Objects**:
- **[ValueObject 1]**: [Propósito e validações]
- **[ValueObject 2]**: [Propósito e validações]

**Domain Events** (past tense):
- **[Event]Criado**: Quando? Payload: [campos]
- **[Event]Atualizado**: Quando? Payload: [campos]
- **[Event]Removido**: Quando? Payload: [campos]

**Repositories**:
- **persistir-[entity]**: [Responsabilidade]
- **buscar-[entity]**: [Responsabilidade]
- **atualizar-[entity]**: [Responsabilidade]

**Use Cases**:
- **criar-[entity]**: [Fluxo: input → criar entity → persistir → publish events → output]
- **atualizar-[entity]**: [Fluxo]
- **[action]-[entity]**: [Fluxo]

---

### Estrutura de Diretórios (DDD Co-Located)

```
src/
└── [bounded-context]/          # e.g., user-management
    └── [container]/            # e.g., api
        └── [component]/        # e.g., usuario
            ├── index.ts                 # Aggregate root (public exports)
            ├── criar-usuario.ts         # Factory/Use case
            ├── persistir-usuario.ts     # Repository
            ├── atualizar-usuario.ts     # Use case
            ├── autenticar-usuario.ts    # Use case
            ├── Usuario.ts               # Entity (aggregate root)
            ├── Email.ts                 # Value object
            ├── CPF.ts                   # Value object
            ├── Nome.ts                  # Value object
            ├── UsuarioCriado.ts         # Domain event
            ├── UsuarioAtualizado.ts     # Domain event
            └── usuario.spec.ts          # Tests (integration-first)
```

**Naming Conventions**:
- ✅ Semantic actions: `criar`, `persistir`, `autenticar` (business language)
- ❌ Technical suffixes: `UserFactory`, `UserRepository`, `UserService`
- ✅ PascalCase for entities and value objects: `Usuario`, `Email`
- ✅ kebab-case for files: `criar-usuario.ts`
- ✅ Past tense for events: `UsuarioCriado`, NOT `UsuarioCriando` or `UserCreated`

---

## Technical Considerations

### Database Schema Changes

#### New Tables
```sql
-- [TableName]
CREATE TABLE [table_name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  [column1] VARCHAR(255) NOT NULL,
  [column2] INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_[table]_[column] ON [table_name]([column]);
```

#### Modified Tables
```sql
-- [TableName]
ALTER TABLE [existing_table] ADD COLUMN [new_column] VARCHAR(100);
ALTER TABLE [existing_table] ADD CONSTRAINT [...];
```

#### Removed Tables
```sql
-- [TableName] - BREAKING CHANGE
-- Migration strategy: [Como migrar dados existentes]
DROP TABLE [table_name];
```

**Migration Strategy**:
1. [Step 1 - e.g., Add new columns]
2. [Step 2 - e.g., Migrate data]
3. [Step 3 - e.g., Remove old columns]

**Rollback Plan**:
[Como reverter as migrations se necessário]

---

### API Changes

#### New Endpoints
```
POST /api/v1/[resource]
GET /api/v1/[resource]/:id
PUT /api/v1/[resource]/:id
DELETE /api/v1/[resource]/:id
```

**Request/Response Formats**:
```typescript
// POST /api/v1/usuarios
interface CreateUserRequest {
  email: string;      // format: email
  nome: string;       // min: 3, max: 100
  cpf: string;        // format: 000.000.000-00
}

interface CreateUserResponse {
  id: string;         // UUID
  email: string;
  nome: string;
  status: string;     // "active" | "pending"
  createdAt: string;  // ISO 8601
}
```

#### Modified Endpoints
```
MODIFIED: PUT /api/v1/[resource]/:id
- Added field: [field_name]
- Removed field: [field_name] - BREAKING
- Changed type: [field_name] from X to Y - BREAKING
```

#### Deprecated Endpoints
```
DEPRECATED: GET /api/v1/old-endpoint
- Replacement: GET /api/v2/new-endpoint
- Deprecation timeline: Remove in 6 months (YYYY-MM-DD)
- Migration guide: [Link ou descrição]
```

**Versioning Strategy**:
- [ ] No breaking changes → Same version
- [ ] Breaking changes → New version (v2, v3)
- [ ] Deprecation period: [X months]

**Error Responses**:
```typescript
interface ErrorResponse {
  error: {
    code: string;       // e.g., "VALIDATION_ERROR"
    message: string;    // User-friendly message
    details?: object;   // Additional context
  }
}
```

---

### Performance Implications

**Expected Load**:
- Requests per second: [estimativa]
- Database queries per request: [estimativa]
- Average response time target: [e.g., <200ms p95]

**Bottlenecks Identified**:
1. [Potencial bottleneck 1]
   - Impact: [Descrição]
   - Mitigation: [Como resolver]

**Caching Strategy**:
- **What to cache**: [Dados que raramente mudam]
- **Cache invalidation**: [Quando invalidar]
- **TTL**: [Tempo de vida]
- **Technology**: [Redis, in-memory, CDN]

**Database Optimization**:
- **Indexes**: [Listar indexes críticos]
- **Query optimization**: [Estratégias específicas]
- **Connection pooling**: [Configuração]

**Monitoring**:
- Metrics to track: [Response time, error rate, throughput]
- Alerts: [Quando alertar - thresholds]

---

### Security Considerations

**Authentication**:
- Method: [JWT, OAuth2, Session-based]
- Token lifetime: [e.g., 1 hour]
- Refresh strategy: [Como refresh tokens]

**Authorization**:
- Model: [RBAC, ABAC, custom]
- Roles: [Lista de roles e permissões]
- Enforcement: [Onde e como checar permissões]

**Data Encryption**:
- **In-transit**: TLS 1.3, HTTPS only
- **At-rest**: [Database encryption, field-level encryption]
- **PII fields**: [Listar campos sensíveis e tratamento]

**Input Validation**:
- All inputs validated at API boundary
- Sanitization: [XSS prevention, SQL injection prevention]
- Rate limiting: [Requests per minute por IP/user]

**Secrets Management**:
- Storage: [Vault, AWS Secrets Manager, env vars]
- Rotation: [Frequência de rotação]
- Access control: [Quem pode acessar]

**Compliance**:
- [ ] LGPD/GDPR considerations addressed
- [ ] PII data handling documented
- [ ] Data retention policy defined
- [ ] Audit logging in place

---

### Testability Strategy

**Test Pyramid**:
```
        /\
       /E2E\         10% - E2E tests (critical user flows)
      /------\
     /Integration\   70% - Integration tests (realistic environment)
    /--------------\
   /  Unit Tests    \ 20% - Unit tests (business logic only)
```

**Integration-First Testing**:
- Use real database (or testcontainers)
- Use real message queue (or testcontainers)
- Mock only external services outside our control

**Test Environment**:
- **Database**: [PostgreSQL via Docker, testcontainers]
- **Message Queue**: [RabbitMQ in-memory mode]
- **External APIs**: [Mocked via WireMock, nock]

**Test Data Strategy**:
- **Setup**: [Como criar test data]
- **Cleanup**: [Como limpar após tests]
- **Fixtures**: [Usar fixtures ou factories?]

**BDD Scenario Mapping**:
Each BDD scenario from spec.md will have a corresponding integration test:
```typescript
// spec.md: Scenario "Criar usuario com dados validos"
// Test: usuario.spec.ts
describe('criar-usuario', () => {
  it('should create user with valid data (BDD)', async () => {
    // GIVEN: valid user data
    // WHEN: criar-usuario is called
    // THEN: user is created + event published + returns user ID
  });
});
```

**Coverage Target**: >= 80% (or constitution target)

---

## Dependencies

### Internal Dependencies
- **Modules**: [Lista de módulos internos que esta mudança depende]
- **APIs**: [APIs internas que esta mudança consome]
- **Shared Libraries**: [Bibliotecas compartilhadas]

### External Dependencies
- **New Dependencies**:
  - `[package-name]@[version]` - [Purpose] - [License]
  - `[package-name]@[version]` - [Purpose] - [License]
- **Updated Dependencies**:
  - `[package-name]` from [old-version] to [new-version] - [Reason]

**Dependency Approval Checklist**:
- [ ] No known security vulnerabilities
- [ ] License compatible with project
- [ ] Bundle size impact acceptable
- [ ] Actively maintained (last update < 6 months)
- [ ] Has sufficient test coverage
- [ ] Team has expertise or training plan

---

## Deployment Considerations

**Deployment Strategy**:
- [ ] Rolling update (zero downtime)
- [ ] Blue-green deployment
- [ ] Canary release
- [ ] Feature flags

**Rollback Plan**:
1. [Step 1 if deployment fails]
2. [Step 2 to rollback]
3. [Step 3 to restore data if needed]

**Database Migrations**:
- [ ] Forward-compatible (can run before code)
- [ ] Backward-compatible (can rollback after code)
- [ ] Data migration scripts tested
- [ ] Rollback scripts prepared

**Environment Variables**:
```bash
# New env vars required
NEW_FEATURE_ENABLED=true
EXTERNAL_API_KEY=xxx
DATABASE_POOL_SIZE=20
```

**Infrastructure Changes**:
- [ ] New services to deploy
- [ ] New databases to provision
- [ ] New queues to create
- [ ] Scaling changes needed

---

## Open Questions

[Liste questões ainda não resolvidas que precisam de decisão ou discussão]

- [ ] **Q1**: [Questão sobre tecnologia X]
  - **Owner**: [Quem vai responder]
  - **Deadline**: [Quando precisamos decidir]
  - **Impact**: [O que bloqueia se não resolver]

- [ ] **Q2**: [Questão sobre integração Y]
  - **Owner**: [...]
  - **Deadline**: [...]
  - **Impact**: [...]

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| [Descrição do risco 1] | HIGH/MED/LOW | HIGH/MED/LOW | [Como mitigar] |
| [Descrição do risco 2] | HIGH/MED/LOW | HIGH/MED/LOW | [Como mitigar] |
| [Descrição do risco 3] | HIGH/MED/LOW | HIGH/MED/LOW | [Como mitigar] |

---

## Timeline Estimate

**Total Estimated Effort**: [X story points / Y hours / Z days]

**Breakdown**:
- Phase 3 (Specification): [X hours]
- Phase 3.5 (Task Decomposition): [X hours]
- Phase 4 (Implementation): [X hours]
  - Setup: [X hours]
  - Core features: [X hours]
  - Error handling: [X hours]
  - Tests: [X hours]
- Phase 5 (Review): [X hours]
- Phase 6 (Documentation): [X hours]

**Assumptions**:
- [Lista de assumptions que afetam estimativa]

---

## Constitution Compliance Validation

### Core Principles ✓
- [x] Specification-Driven: Design antes de spec detalhado
- [x] Arc42 + C4 + BDD + ADR: Design usa C4 + ADR
- [x] Library-First: Design permite modularidade e reuso
- [x] Test-First: Testability strategy definida
- [x] Integration-First Testing: Estratégia de testes realistas
- [x] DDD Tactical: DDD Co-Located aplicado corretamente

### Architectural Constraints ✓
- [x] Code Organization: DDD Tactical Co-Located seguido
- [x] Quality Standards: Coverage target definido
- [x] Performance Requirements: Performance implications avaliadas
- [x] Security Requirements: Security considerations endereçadas

### Compliance Notes
[Qualquer desvio da constitution deve ser justificado aqui com ADR]

---

## Next Steps

1. **Review Design**
   - [ ] Self-review completo (Architect)
   - [ ] Tech Lead review
   - [ ] Team walkthrough (se necessário)

2. **Gate 1: Design Approval**
   - [ ] Submit to Gatekeeper for validation
   - [ ] Address feedback if rejected
   - [ ] Get approval to proceed

3. **Proceed to Specification**
   - [ ] Analyst cria spec.md detalhado baseado neste design
   - [ ] spec.md usa Arc42 + BDD scenarios
   - [ ] spec.md referencia este design.md

4. **Task Decomposition**
   - [ ] Orchestrator decompõe spec em tasks.md
   - [ ] Tasks seguem este design
   - [ ] Tasks mapeiam para componentes DDD deste design

---

## References

### External Documentation
- [Link para documentação de tecnologia X]
- [Link para RFC ou proposta relacionada]
- [Link para ADRs anteriores relacionados]

### Internal Documentation
- `proposal.md` - Proposta original
- `constitution.md` - Princípios do projeto
- `specs/[related-capability]/` - Specs relacionadas

---

**Approval**:
- [ ] Architect: [Nome] - [Data]
- [ ] Tech Lead: [Nome] - [Data]
- [ ] Gatekeeper: [Gate 1 Status] - [Data]

---

**Change Log**:
- YYYY-MM-DD: Initial design created
- YYYY-MM-DD: Updated after Tech Lead feedback
- YYYY-MM-DD: Approved by Gatekeeper (Gate 1)

---

## Related Templates

### Prerequisites
- **proposal.md** (TPL-WORKFLOW-001) - Proposal approved with HIGH complexity assessment

### Follows This Template
- **Arc42 templates** (TPL-ARC42-*) - Analyst creates detailed spec.md using Arc42 chapters (Phase 3)
- **C4 templates** (TPL-C4-*) - System context, container, component diagrams
- **adr/decision.md** (TPL-ADR-001) - Document each ADR separately

### See Also
- **constitution.md** - DDD tactical patterns and principles
- **tasks.md** (TPL-WORKFLOW-003) - Task decomposition after specification

---

## Workflow Integration

**Phase**: 2 (Architecture)

**Primary Skill**: architect

**Trigger**: proposal.md approved with **Complexity = HIGH**

**Output Location**: `changes/[change-id]/design.md`

**Prerequisites**:
- proposal.md approved
- HIGH complexity identified (multiple bounded contexts, >15 files, architectural decisions needed)

**Next Steps**:
1. **Gatekeeper validates** design quality (Gate 1: Architecture)
2. **Analyst creates spec.md** - Detailed specification using Arc42 + BDD (Phase 3)
3. **Orchestrator creates tasks.md** - Task decomposition (Phase 3.5)
4. **Developer implements** - Task-by-task implementation (Phase 4)

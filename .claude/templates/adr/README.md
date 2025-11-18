# Templates ADR - Architecture Decision Records

**Versão**: 2.1.0
**Última Atualização**: 2025-11-17
**Status**: 🟢 Ativo

---

## Visão Geral

Este diretório contém **templates ADR (Architecture Decision Records)** para documentar decisões arquiteturais importantes.

### O Que é ADR?

**ADR** é um documento que captura uma decisão arquitetural significativa, incluindo:
- **Context**: Por que a decisão foi necessária
- **Decision**: O que foi decidido
- **Consequences**: Impactos positivos e negativos
- **Alternatives**: Opções consideradas e rejeitadas

**Por que ADR?**:
- ✅ **Rastreabilidade**: Entender decisões históricas
- ✅ **Onboarding**: Novos devs entendem "por quê"
- ✅ **Evita retrabalho**: Não refazer decisões já avaliadas
- ✅ **Transparência**: Decisões visíveis para todo o time
- ✅ **Determinístico**: IA entende contexto de decisões

---

## Template ADR

**Arquivo**: `decision.md`

### Estrutura Completa

```markdown
# ADR-XXX: [Título da Decisão]

**Status**: 🔵 Proposed | ✅ Accepted | ⚠️ Deprecated | 🔄 Superseded
**Date**: YYYY-MM-DD
**Deciders**: [Lista de pessoas/times envolvidos]
**Supersedes**: [ADR-YYY se aplicável]
**Superseded by**: [ADR-ZZZ se aplicável]

---

## Context

[Descrição da situação que motivou a decisão]

**Problema**:
[Qual problema estamos tentando resolver?]

**Requisitos**:
- [Requisito 1]
- [Requisito 2]
- [Requisito 3]

**Constraints**:
- [Restrição técnica 1]
- [Restrição organizacional 2]

---

## Decision

[Decisão tomada - clara e objetiva]

**Implementação**:
[Como a decisão será implementada, se relevante]

---

## Consequences

### Positive

- ✅ [Consequência positiva 1]
- ✅ [Consequência positiva 2]
- ✅ [Consequência positiva 3]

### Negative

- ❌ [Consequência negativa 1 - trade-off]
- ❌ [Consequência negativa 2 - limitação]

### Neutral

- ℹ️ [Mudança que não é boa nem ruim]

### Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| R-XXX | [Descrição do risco] | Low/Med/High | Low/Med/High | [Plano de mitigação] |

---

## Alternatives Considered

### Alternative 1: [Nome da alternativa]

**Description**: [Descrição breve]

**Pros**:
- ✅ [Vantagem 1]
- ✅ [Vantagem 2]

**Cons**:
- ❌ [Desvantagem 1]
- ❌ [Desvantagem 2]

**Decision**: ❌ Rejected | ⚠️ Considered
**Reason**: [Por que foi rejeitada]

### Alternative 2: [Nome da alternativa]

[Repetir estrutura acima]

---

## Implementation Notes

**Affected Components**:
- [CNT-XXX: Container afetado]
- [CMP-YYY: Componente afetado]

**Migration Plan** (se aplicável):
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Timeline**: [Prazo de implementação]

---

## Related Artifacts

- **Arc42 Chapter 4**: Solution Strategy
- **Arc42 Chapter 9**: Architectural Decisions
- **ADRs**: [Lista de ADRs relacionados]
- **Scenarios**: [SCN-XXX afetados]

---

## References

- [Link para documentação 1]
- [Link para benchmark 2]
- [Link para discussão 3]

---

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | YYYY-MM-DD | Initial decision | [Nome] |
| 1.1 | YYYY-MM-DD | Updated consequences | [Nome] |
```

---

## Princípios ADR Determinísticos

### 1. Context é Rei

**❌ Ruim (sem contexto)**:
```markdown
# ADR-001: Use PostgreSQL

We will use PostgreSQL.
```

**✅ Bom (contexto completo)**:
```markdown
# ADR-001: Use PostgreSQL as Primary Database

## Context

We need to choose a database for our e-commerce platform.

Requirements:
- ACID transactions (payment processing)
- Complex queries (reporting, analytics)
- Strong consistency (inventory management)
- Mature ecosystem (hiring, support)
- Max budget: $5k/month

Constraints:
- Must support multi-tenancy
- Team has experience with relational databases
- Must run on AWS (company policy)

## Decision

We will use PostgreSQL 15 as our primary database.
```

### 2. Consequências Honestas

**❌ Ruim (só positivo)**:
```markdown
Consequences:
- ✅ Fast
- ✅ Scalable
- ✅ Reliable
```

**✅ Bom (trade-offs explícitos)**:
```markdown
Consequences:

Positive:
- ✅ ACID compliance ensures data consistency
- ✅ Rich query capabilities (JSON, full-text, geospatial)
- ✅ Large ecosystem (ORMs, tools, hosting options)

Negative:
- ❌ Vertical scaling limitations (need sharding >10M rows)
- ❌ Write-heavy workloads may require optimization
- ❌ No built-in multi-tenancy (requires schema design)

Risks:
- R-001: Single point of failure → Multi-AZ deployment
- R-002: Performance at scale → Read replicas, caching
```

### 3. Alternativas Documentadas

**❌ Ruim (sem alternativas)**:
```markdown
We chose PostgreSQL.
```

**✅ Bom (alternativas avaliadas)**:
```markdown
## Alternatives Considered

### MongoDB

Pros:
- ✅ Flexible schema
- ✅ Horizontal scaling built-in

Cons:
- ❌ Eventual consistency unacceptable for payments
- ❌ Complex queries difficult (aggregation pipelines)

Decision: ❌ Rejected
Reason: ACID compliance is non-negotiable for e-commerce

### MySQL

Pros:
- ✅ Similar to PostgreSQL
- ✅ Good performance

Cons:
- ❌ Less feature-rich (no JSON, limited full-text)
- ❌ Licensing concerns (Oracle ownership)

Decision: ⚠️ Considered
Reason: PostgreSQL offers more features for similar cost

### DynamoDB

Pros:
- ✅ Fully managed (AWS)
- ✅ Unlimited scale

Cons:
- ❌ Complex queries difficult (key-value model)
- ❌ Vendor lock-in (AWS only)
- ❌ Cost unpredictable at scale

Decision: ❌ Rejected
Reason: Query complexity and vendor lock-in
```

---

## Exemplos Práticos

### Exemplo 1: Escolha de Banco de Dados

```markdown
# ADR-001: Use PostgreSQL as Primary Database

**Status**: ✅ Accepted
**Date**: 2025-11-15
**Deciders**: Tech Lead, Senior Engineers, DevOps

## Context

E-commerce platform requires persistent storage.

Requirements:
- ACID transactions (payment integrity)
- Complex queries (inventory, orders, analytics)
- Strong consistency (avoid overselling)
- Mature ecosystem (hiring, tools)

Constraints:
- AWS only (company policy)
- Budget: $5k/month (production)
- Team experience: SQL databases

## Decision

Use PostgreSQL 15 (RDS Multi-AZ) as primary database.

## Consequences

Positive:
- ✅ ACID ensures payment integrity
- ✅ Rich queries (joins, aggregations, JSON)
- ✅ Proven at scale (Instagram, Uber)

Negative:
- ❌ Vertical scaling limits (shard after 10M+ rows)
- ❌ Write bottlenecks under extreme load

Risks:
- R-001: DB failure → Multi-AZ + automated backups
- R-002: Slow queries → Indexes + query optimization

## Alternatives

- MongoDB: Rejected (eventual consistency)
- MySQL: Considered (less features)
- DynamoDB: Rejected (vendor lock-in)
```

### Exemplo 2: Arquitetura de Microsserviços

```markdown
# ADR-002: Adopt Microservices Architecture

**Status**: ✅ Accepted
**Date**: 2025-11-16
**Deciders**: CTO, Tech Leads, Architecture Team

## Context

Monolithic app causing deployment bottlenecks.

Problems:
- Deploy entire app for small changes
- Scaling is all-or-nothing
- Tech stack locked (Node.js only)
- Onboarding difficult (large codebase)

Goals:
- Independent deployments
- Technology flexibility
- Team autonomy

## Decision

Decompose monolith into microservices (domain-driven).

Services:
- Auth Service (user authentication)
- Product Service (catalog, search)
- Order Service (checkout, fulfillment)
- Payment Service (Stripe integration)

## Consequences

Positive:
- ✅ Independent deployments (faster iterations)
- ✅ Team autonomy (own service end-to-end)
- ✅ Technology flexibility (Go, Node.js, etc)
- ✅ Fault isolation (1 service down ≠ system down)

Negative:
- ❌ Operational complexity (10x services)
- ❌ Distributed tracing required
- ❌ Inter-service communication overhead
- ❌ Data consistency challenges (eventual)

Risks:
- R-003: Service mesh complexity → Start simple, add as needed
- R-004: Network failures → Circuit breakers, retries

## Alternatives

- Modular Monolith: Considered (simpler) but doesn't solve deployment bottleneck
- Serverless: Rejected (vendor lock-in, cold starts)
```

### Exemplo 3: Autenticação OAuth2

```markdown
# ADR-003: Use OAuth 2.0 with Auth0

**Status**: ✅ Accepted
**Date**: 2025-11-17
**Deciders**: Security Team, Tech Lead

## Context

Need authentication for web + mobile apps.

Requirements:
- Secure (industry standard)
- Social login (Google, Facebook)
- MFA support
- No password storage (security)

Constraints:
- GDPR compliant
- Budget: $500/month
- Launch in 2 months

## Decision

Use OAuth 2.0 with Auth0 as identity provider.

## Consequences

Positive:
- ✅ No password storage (Auth0 handles it)
- ✅ Social login built-in (5 providers)
- ✅ MFA included (TOTP, SMS)
- ✅ Fast implementation (2 weeks vs 2 months)

Negative:
- ❌ Vendor lock-in (Auth0 specific)
- ❌ Cost scales with users ($500 → $2k at 50k users)
- ❌ Requires internet (no offline auth)

Risks:
- R-005: Auth0 downtime → SLA 99.99%, monitor health
- R-006: Cost increase → Migrate to Keycloak if >50k users

## Alternatives

- Custom JWT: Rejected (reinvent wheel, security risks)
- Keycloak: Considered (self-hosted) but requires DevOps resources
- Firebase Auth: Rejected (vendor lock-in, mobile-focused)
```

---

## Ciclo de Vida de ADRs

### Status Flow

```
🔵 Proposed → ✅ Accepted → ⚠️ Deprecated → 🔄 Superseded
```

**Proposed**: Decisão sendo discutida
**Accepted**: Decisão aprovada e implementada
**Deprecated**: Decisão não mais recomendada (mas ainda em uso)
**Superseded**: Decisão substituída por outra (ver ADR-XXX)

### Quando Criar ADR

**✅ Criar ADR para**:
- Escolha de tecnologias principais (database, language, framework)
- Padrões arquiteturais (microservices, event-driven, CQRS)
- Decisões de segurança (OAuth, encryption)
- Integrações externas (Stripe, SendGrid)
- Mudanças que afetam múltiplos times

**❌ NÃO criar ADR para**:
- Decisões táticas locais (nomeação de variável)
- Escolhas reversíveis facilmente (library menor)
- Padrões de código já estabelecidos
- Bugs fixes

---

## Integração com Workflow

### Phase 2: Architecture (architect)

Architect cria ADRs para decisões HIGH complexity:

```bash
/adr Use PostgreSQL as primary database with RDS Multi-AZ deployment
```

Output: `specs/09_decisions/adr/ADR-001_use-postgresql.md`

### Phase 3: Specification (analyst)

Analyst referencia ADRs em specs:

```markdown
## Solution Strategy (Arc42 Cap 4)

Technology Stack:
- Database: PostgreSQL 15 (see ADR-001)
- Auth: OAuth 2.0 + Auth0 (see ADR-003)
```

---

## Ferramentas ADR

### Recomendadas

1. **adr-tools** (https://github.com/npryce/adr-tools)
   - CLI para criar/gerenciar ADRs
   - Templates automáticos

2. **Log4brains** (https://github.com/thomvaill/log4brains)
   - Web UI para ADRs
   - Busca e navegação

3. **Manual (este template)**
   - Copiar template
   - Preencher e commitar

---

## Referências

### Internas
- **Arc42 Templates**: `.claude/templates/arc42/README.md`
- **Commands**: `.claude/commands/adr.md` (comando `/adr`)
- **Constitution**: `.claude/constitution.md` (governance)

### Externas
- **ADR GitHub**: https://adr.github.io/
- **ADR Tools**: https://github.com/npryce/adr-tools
- **Michael Nygard's Blog**: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions

---

**Mantido por**: Sistema de Workflow de Especificações Determinísticas v2.1.0
**Licença**: Ver raiz do projeto

---

**ADR = Decisões arquiteturais documentadas e rastreáveis.** 📋

# Templates Arc42 - 12 Capítulos de Documentação Arquitetural

**Versão**: 2.1.0
**Última Atualização**: 2025-11-17
**Status**: 🟢 Ativo

---

## Visão Geral

Este diretório contém **12 templates Arc42** para documentação completa de arquitetura de software.

### O Que é Arc42?

**Arc42** é um framework open-source para documentação de arquitetura de software, criado por Dr. Gernot Starke e Dr. Peter Hruschka.

**Por que Arc42?**:
- ✅ **Estrutura comprovada**: Usado em milhares de projetos
- ✅ **Completo**: Cobre todos os aspectos de arquitetura
- ✅ **Adaptável**: Ajustável por complexidade (LOW/MEDIUM/HIGH)
- ✅ **Reconhecível**: IA foi treinada em exemplos Arc42
- ✅ **Open-source**: Gratuito e bem documentado

---

## 12 Capítulos Arc42

### Estrutura Hierárquica

```
Arc42 (12 Capítulos)
│
├── PARTE 1: CONTEXTO E OBJETIVOS
│   ├── 01. Introduction & Goals        (Visão, requisitos, stakeholders)
│   ├── 02. Constraints                 (Restrições técnicas/organizacionais)
│   └── 03. Context & Scope             (Limites do sistema, C4 Level 1)
│
├── PARTE 2: SOLUÇÃO ARQUITETURAL
│   ├── 04. Solution Strategy           (Stack, padrões arquiteturais)
│   ├── 05. Building Blocks             (Decomposição, C4 Level 2/3)
│   ├── 06. Runtime View                (Cenários, BDD, sequências)
│   ├── 07. Deployment View             (Infraestrutura, CI/CD)
│   └── 08. Crosscutting Concepts       (Segurança, logs, padrões)
│
├── PARTE 3: DECISÕES E QUALIDADE
│   ├── 09. Architectural Decisions     (ADRs, decisões importantes)
│   ├── 10. Quality Requirements        (Performance, segurança, SLAs)
│   └── 11. Risks & Technical Debt      (Riscos, débito técnico)
│
└── PARTE 4: GLOSSÁRIO
    └── 12. Glossary                    (Terminologia do domínio)
```

---

## Aplicação Adaptativa por Complexidade

### Complexidade LOW

**Cenários**:
- Features simples (<5 arquivos modificados)
- Padrões já estabelecidos
- Sem decisões arquiteturais

**Capítulos Obrigatórios**:
- **06. Runtime View**: Cenários BDD da feature
- **10. Quality Requirements**: Requisitos de qualidade específicos

**Capítulos Opcionais/Referência**:
- Demais capítulos servem como contexto (já documentados)

**Exemplo**: "Adicionar validação de email no cadastro"

---

### Complexidade MEDIUM

**Cenários**:
- Features moderadas (5-15 arquivos modificados)
- Alguns novos padrões
- Múltiplos componentes em um contexto

**Capítulos Obrigatórios**:
- **03. Context**: Atores e sistemas afetados
- **05. Building Blocks**: Containers/componentes modificados
- **06. Runtime View**: Cenários BDD completos
- **08. Crosscutting**: Padrões transversais (se novos)
- **09. Decisions**: ADRs para decisões importantes
- **10. Quality**: Requisitos de qualidade

**Capítulos Opcionais**:
- 01, 02, 04, 07, 11, 12 (contexto/referência)

**Exemplo**: "Implementar sistema de notificações por email e SMS"

---

### Complexidade HIGH

**Cenários**:
- Features complexas (>15 arquivos modificados)
- Múltiplos bounded contexts
- Decisões arquiteturais significativas
- Novos padrões arquiteturais

**Capítulos Obrigatórios**:
- **TODOS** (01-12)

**Workflow**:
1. Analyst cria proposal.md
2. **Architect** cria design.md (Phase 2)
3. Analyst cria spec.md com todos os 12 capítulos (Phase 3)

**Exemplo**: "Implementar sistema de pagamentos com Stripe, webhooks e conciliação"

---

## Capítulo 01: Introduction & Goals

**Propósito**: Visão geral do sistema e objetivos

**Arquivo**: `01_introduction.md`

### Seções Principais

```markdown
# 01. Introduction & Goals

## 1.1 Requirements Overview
- Requisitos funcionais (RF-XXX)
- Requisitos não-funcionais (RNF-XXX)

## 1.2 Quality Goals
Top 3-5 objetivos de qualidade:
1. Performance (< 200ms p95)
2. Segurança (OWASP Top 10)
3. Disponibilidade (99.9% uptime)

## 1.3 Stakeholders
| Papel | Expectativa | Preocupação |
|-------|-------------|-------------|
| Product Manager | Features entregues | Prazos |
| Tech Lead | Qualidade técnica | Débito técnico |
| Usuários Finais | Usabilidade | Performance |
```

**Quando usar**: Início de projeto ou mudança de visão

**Relaciona com**: Capítulos 3 (Context), 10 (Quality)

---

## Capítulo 02: Constraints

**Propósito**: Restrições que limitam decisões arquiteturais

**Arquivo**: `02_constraints.md`

### Seções Principais

```markdown
# 02. Constraints

## 2.1 Technical Constraints
| ID | Restrição | Razão |
|----|-----------|-------|
| TC-001 | Node.js 20+ | Compatibilidade com libraries |
| TC-002 | PostgreSQL | Mandatório pela empresa |
| TC-003 | AWS only | Contrato existente |

## 2.2 Organizational Constraints
| ID | Restrição | Razão |
|----|-----------|-------|
| OC-001 | Deploy sexta proibido | Política de TI |
| OC-002 | Orçamento: R$ 50k | Aprovação da diretoria |

## 2.3 Conventions
- Nomenclatura: DDD Co-Located
- Commits: Conventional Commits
- Code Review: Obrigatório (2 aprovações)
```

**Quando usar**: Ao definir stack tecnológico

**Relaciona com**: Capítulo 4 (Solution Strategy)

---

## Capítulo 03: Context & Scope (C4 Level 1)

**Propósito**: Limites do sistema e integrações externas

**Arquivo**: `03_context.md`

### Seções Principais

```markdown
# 03. Context & Scope

## 3.1 Business Context
[Diagrama C4 Level 1]

## 3.2 Actors
- **ACT-001**: Admin User
  - Gerencia sistema via painel admin
  - Permissões: CRUD completo

## 3.3 External Systems
- **SYS-001**: Auth0 (OAuth 2.0 provider)
- **SYS-002**: Stripe (Payment processor)
- **SYS-003**: SendGrid (Email service)

## 3.4 Integration Patterns
- REST API (JSON over HTTPS)
- Webhooks (event notifications)
- WebSocket (real-time updates)
```

**Quando usar**: Ao documentar integrações ou adicionar atores

**Relaciona com**: Capítulo 5 (Building Blocks)

**Comandos**: `/vision`, `/actor`

---

## Capítulo 04: Solution Strategy

**Propósito**: Decisões arquiteturais de alto nível

**Arquivo**: `04_solution-strategy.md`

### Seções Principais

```markdown
# 04. Solution Strategy

## 4.1 Technology Stack
| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Backend | Node.js 20 + TypeScript | Tipagem forte, ecosystem |
| Frontend | React 18 + Vite | Performance, DX |
| Database | PostgreSQL 15 | ACID, queries complexas |
| Cache | Redis 7 | Performance, sessions |

## 4.2 Architectural Patterns
- **Microservices**: Escalabilidade independente
- **Event-Driven**: Desacoplamento entre serviços
- **CQRS**: Separação read/write (se necessário)

## 4.3 Top-Level Decomposition
[Diagrama de alto nível mostrando principais containers]

## 4.4 Achieving Quality Goals
| Objetivo | Estratégia |
|----------|-----------|
| Performance < 200ms | Caching (Redis), DB indexes, CDN |
| Disponibilidade 99.9% | Multi-AZ, auto-scaling, health checks |
| Segurança | OAuth2, HTTPS, rate limiting |
```

**Quando usar**: Ao definir stack ou padrões arquiteturais

**Relaciona com**: Capítulos 2 (Constraints), 9 (Decisions)

**Comandos**: `/stack`

---

## Capítulo 05: Building Blocks (C4 Level 2/3)

**Propósito**: Decomposição do sistema em containers e componentes

**Arquivo**: `05_building-blocks.md`

### Seções Principais

```markdown
# 05. Building Blocks

## 5.1 Whitebox Overall System
[Diagrama C4 Level 2 - Containers]

## 5.2 Containers

### CNT-001: API Gateway
**Propósito**: REST API, rate limiting, authentication
**Tecnologia**: Node.js + Express
**Interfaces**:
- Input: HTTPS REST (JSON)
- Output: Backend services (gRPC)

### CNT-002: Auth Service
**Propósito**: Autenticação e autorização
**Tecnologia**: Node.js + JWT + bcrypt
**Dependencies**: PostgreSQL, Redis

## 5.3 Components (Level 3)

### CMP-001: UserAuthenticator
**Responsabilidades**:
- Validar credenciais
- Gerar JWT tokens
- Invalidar sessions

**Interfaces**:
```typescript
interface UserAuthenticator {
  authenticate(email: Email, password: Password): Promise<AuthToken>;
  validateToken(token: string): Promise<User | null>;
  logout(token: string): Promise<void>;
}
```
```

**Quando usar**: Ao adicionar containers ou componentes

**Relaciona com**: Capítulo 6 (Runtime)

**Comandos**: `/container`, `/component`, `/plan`

---

## Capítulo 06: Runtime View (BDD Scenarios)

**Propósito**: Comportamento observável do sistema

**Arquivo**: `06_runtime.md`

### Seções Principais

```markdown
# 06. Runtime View

## 6.1 Runtime Scenarios

### SCN-001: User Login
```gherkin
Feature: User Authentication

Scenario: Login with valid credentials
  Given user exists with email "user@example.com"
  And password is "StrongPass123"
  When user submits login form
  Then user is authenticated
  And JWT token is created (expires 24h)
  And user sees dashboard
  And log: INFO "User logged in: {userId}"

Scenario: Login with invalid password
  Given user exists with email "user@example.com"
  And provided password is incorrect
  When user submits login form
  Then response is 401 INVALID_CREDENTIALS
  And attempt is logged (rate limiting)
  And after 5 attempts, account locked for 15min
```

## 6.2 Sequence Diagrams
[Diagrama de sequência para fluxo principal]

## 6.3 State Machines
[Diagrama de estados se aplicável]
```

**Quando usar**: Ao implementar features

**Relaciona com**: Capítulo 10 (Quality)

**Comandos**: `/feature`, `/flow`

---

## Capítulo 07: Deployment View

**Propósito**: Infraestrutura, deployment, CI/CD

**Arquivo**: `07_deployment.md`

### Seções Principais

```markdown
# 07. Deployment View

## 7.1 Infrastructure
- **Cloud Provider**: AWS
- **Regions**: us-east-1 (primary), us-west-2 (backup)
- **Compute**: ECS Fargate (containers)
- **Database**: RDS PostgreSQL (Multi-AZ)
- **Cache**: ElastiCache Redis (cluster mode)
- **CDN**: CloudFront

## 7.2 Environments
| Env | Purpose | URL |
|-----|---------|-----|
| dev | Development | https://dev.example.com |
| staging | QA testing | https://staging.example.com |
| production | Live | https://example.com |

## 7.3 CI/CD Pipeline
**Tool**: GitHub Actions

**Stages**:
1. Lint → 2. Test → 3. Build → 4. Deploy

**Deployment Strategy**: Blue-Green
**Rollback**: Automatic if health check fails

## 7.4 Monitoring
- **Logs**: CloudWatch Logs (structured JSON)
- **Metrics**: Prometheus + Grafana
- **Tracing**: Jaeger (OpenTelemetry)
- **Alerts**: PagerDuty
```

**Quando usar**: Ao planejar infraestrutura

**Relaciona com**: Capítulo 10 (Quality)

**Comandos**: `/build`

---

## Capítulo 08: Crosscutting Concepts

**Propósito**: Conceitos transversais (segurança, logging, etc.)

**Arquivo**: `08_crosscutting.md`

### Seções Principais

```markdown
# 08. Crosscutting Concepts

## 8.1 Security
- **Authentication**: OAuth 2.0 (Auth0)
- **Authorization**: RBAC (Role-Based Access Control)
- **Encryption**: TLS 1.3 (in-transit), AES-256 (at-rest)
- **Secrets**: AWS Secrets Manager
- **Rate Limiting**: 1000 req/min per user

## 8.2 Observability
- **Structured Logging**: JSON (Winston)
- **Correlation ID**: X-Request-ID header
- **Metrics**: Counters, Gauges, Histograms
- **Distributed Tracing**: OpenTelemetry

## 8.3 Error Handling
- **HTTP Errors**: RFC 7807 (Problem Details)
- **Error Codes**: Hierarchical (AUTH_001, PAYMENT_002)
- **Retry**: Exponential backoff (max 3 attempts)
- **Circuit Breaker**: Hystrix pattern

## 8.4 Domain Model (DDD)
[Domain entities, value objects, aggregates]

## 8.5 Internationalization
- **Supported Languages**: pt-BR, en-US, es-ES
- **Library**: i18next
- **Storage**: JSON files per locale
```

**Quando usar**: Ao documentar padrões transversais

**Relaciona com**: Todos os capítulos

**Comandos**: `/cross`

---

## Capítulo 09: Architectural Decisions (ADRs)

**Propósito**: Documentar decisões arquiteturais importantes

**Arquivo**: `09_decisions.md`

### Seções Principais

```markdown
# 09. Architectural Decisions

## 9.1 Decision Log

| ID | Date | Title | Status |
|----|------|-------|--------|
| ADR-001 | 2025-11-15 | Use PostgreSQL as primary database | ✅ Accepted |
| ADR-002 | 2025-11-16 | Implement microservices architecture | ✅ Accepted |
| ADR-003 | 2025-11-17 | Use OAuth2 for authentication | 🔵 Proposed |

## 9.2 ADRs

### ADR-001: Use PostgreSQL as Primary Database
**Status**: Accepted
**Context**: Need relational database with ACID compliance
**Decision**: Use PostgreSQL 15
**Consequences**:
- ✅ ACID transactions
- ✅ Mature ecosystem
- ❌ Vertical scaling limitations

**Alternatives**: MongoDB (rejected), MySQL (considered)

[Ver arquivo completo: specs/09_decisions/adr/ADR-001_use-postgresql.md]
```

**Quando usar**: Ao tomar decisões arquiteturais

**Relaciona com**: Capítulo 4 (Solution Strategy)

**Comandos**: `/adr`

---

## Capítulo 10: Quality Requirements

**Propósito**: Atributos de qualidade e como medi-los

**Arquivo**: `10_quality.md`

### Seções Principais

```markdown
# 10. Quality Requirements

## 10.1 Quality Tree
[Árvore de qualidade com prioridades]

## 10.2 Quality Scenarios

### Performance
**Scenario**: User login under normal load
**Metric**: Response time p95 < 200ms, p99 < 500ms
**Measurement**: APM tools (New Relic, DataDog)
**Current**: p95: 150ms, p99: 300ms ✅

### Security
**Scenario**: System resists OWASP Top 10 attacks
**Metric**: 0 critical vulnerabilities
**Measurement**: SAST/DAST tools, penetration tests
**Current**: 0 critical ✅, 2 medium ⚠️

### Availability
**Scenario**: System available 99.9% of time
**Metric**: Uptime 99.9% (43 min downtime/month)
**Measurement**: Uptime monitoring (Pingdom)
**Current**: 99.95% (last 3 months) ✅

## 10.3 SLIs, SLOs, SLAs

| Service | SLI | SLO | SLA |
|---------|-----|-----|-----|
| API Gateway | Latency p95 | < 200ms | < 300ms |
| Auth Service | Success rate | > 99.9% | > 99.5% |
| Database | Query time p95 | < 50ms | < 100ms |
```

**Quando usar**: Ao definir requisitos não-funcionais

**Relaciona com**: Capítulos 1 (Goals), 7 (Deployment)

**Comandos**: `/build`

---

## Capítulo 11: Risks & Technical Debt

**Propósito**: Riscos identificados e débito técnico

**Arquivo**: `11_risks.md`

### Seções Principais

```markdown
# 11. Risks & Technical Debt

## 11.1 Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| R-001 | Database failure | Medium | High | Multi-AZ, automated backups |
| R-002 | DDoS attack | Low | High | CloudFlare, rate limiting |
| R-003 | Third-party API downtime | High | Medium | Circuit breaker, fallback |

## 11.2 Technical Debt

| ID | Description | Cost | Priority | Plan |
|----|-------------|------|----------|------|
| TD-001 | Auth service missing e2e tests | 3 days | High | Sprint 5 |
| TD-002 | Duplicated validation logic | 1 day | Medium | Sprint 6 |
| TD-003 | Non-structured logs | 2 days | Low | Backlog |

## 11.3 Risk Management

**High Priority Risks**:
- R-001: Database failure
  - **Action**: Implement automated failover (Due: Sprint 4)
  - **Owner**: DevOps team

**Technical Debt Paydown Plan**:
- Sprint 5: TD-001 (High priority)
- Sprint 6: TD-002 (Medium priority)
- Backlog: TD-003 (Low priority)
```

**Quando usar**: Durante todo o projeto (tracking contínuo)

**Relaciona com**: Capítulos 4 (Strategy), 10 (Quality)

**Comandos**: `/code` (atualiza risks automaticamente)

---

## Capítulo 12: Glossary

**Propósito**: Terminologia do domínio (Ubiquitous Language)

**Arquivo**: `12_glossary.md`

### Seções Principais

```markdown
# 12. Glossary

## 12.1 Business Terms

| Term | Definition | Context |
|------|------------|---------|
| User | Pessoa que usa o sistema | Authentication |
| Order | Solicitação de compra com itens e pagamento | E-commerce |
| Cart | Coleção temporária de itens antes da compra | E-commerce |

## 12.2 Technical Terms

| Term | Definition | Context |
|------|------------|---------|
| JWT | JSON Web Token - autenticação stateless | Authentication |
| CQRS | Command Query Responsibility Segregation | Architecture |
| Event Sourcing | Armazenar eventos ao invés de estado | Architecture |

## 12.3 Acronyms

| Acronym | Full Name | Meaning |
|---------|-----------|---------|
| API | Application Programming Interface | Interface de programação |
| SLA | Service Level Agreement | Acordo de nível de serviço |
| RTO | Recovery Time Objective | Tempo máximo para recuperação |
| RPO | Recovery Point Objective | Perda máxima de dados aceitável |

## 12.4 Domain Events

| Event | When | Payload |
|-------|------|---------|
| user.registered | User completes registration | {userId, email, timestamp} |
| order.placed | User completes checkout | {orderId, userId, total, items} |
| payment.processed | Payment confirmed | {paymentId, orderId, amount, status} |
```

**Quando usar**: Durante todo o projeto (atualização contínua)

**Relaciona com**: Todos os capítulos (referenciado por todos)

**Comandos**: TODOS os comandos atualizam o glossário

---

## Como Usar os Templates Arc42

### 1. Copiar Templates

```bash
# Copiar todos os 12 capítulos
cp .claude/templates/arc42/*.md specs/arc42/

# Ou copiar individualmente
cp .claude/templates/arc42/01_introduction.md specs/01_introduction/introduction.md
```

### 2. Preencher por Complexidade

**LOW**: Preencher apenas capítulos 6, 10
**MEDIUM**: Preencher capítulos 3, 5, 6, 8, 9, 10
**HIGH**: Preencher todos (1-12)

### 3. Substituir Placeholders

Buscar `[PREENCHER]`, `[TODO]`, `[TBD]` e substituir por valores reais.

### 4. Validar

```bash
# Via linter (se configurado)
npm run lint:specs

# Via comando stats
/stats
```

### 5. Entregar para IA

```markdown
Você: "Implemente esta spec: [cole spec.md preenchida]"

IA: [gera EXATAMENTE o que você especificou]
```

---

## Referências

### Internas
- **Templates Root**: `.claude/templates/README.md`
- **C4 Templates**: `.claude/templates/c4/README.md`
- **BDD Templates**: `.claude/templates/bdd/README.md`
- **ADR Templates**: `.claude/templates/adr/README.md`
- **Main README**: `.claude/README.md`

### Externas
- **Arc42 Official**: https://arc42.org/
- **Arc42 Documentation**: https://docs.arc42.org/
- **Arc42 Examples**: https://arc42.org/examples
- **Arc42 GitHub**: https://github.com/arc42

---

## Histórico de Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0.0 | 2025-11-15 | Templates iniciais Arc42 |
| 2.0.0 | 2025-11-17 | Integração com workflow de 7 fases |
| 2.1.0 | 2025-11-17 | Adicionados 15 comandos Arc42 |

---

**Mantido por**: Sistema de Workflow de Especificações Determinísticas v2.1.0
**Licença**: Ver raiz do projeto

---

**Arc42 = Arquitetura documentada de forma completa e determinística.** 📐

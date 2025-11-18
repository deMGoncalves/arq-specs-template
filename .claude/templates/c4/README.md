# Templates C4 Model - Visualização de Arquitetura em 4 Níveis

**Versão**: 2.1.0
**Última Atualização**: 2025-11-17
**Status**: 🟢 Ativo

---

## Visão Geral

Este diretório contém **templates C4 Model** para visualização hierárquica de arquitetura de software.

### O Que é C4 Model?

**C4 Model** é um framework de diagramação criado por Simon Brown que usa 4 níveis de abstração para documentar arquitetura de software:

1. **C1 - System Context**: Sistema e suas integrações externas
2. **C2 - Container**: Aplicações, serviços, bancos de dados
3. **C3 - Component**: Módulos e componentes dentro de containers
4. **C4 - Code**: Classes e interfaces (raramente usado)

**Por que C4?**:
- ✅ **Hierárquico**: Zoom progressivo (contexto → containers → componentes)
- ✅ **Simples**: Usa notação básica (boxes and arrows)
- ✅ **Consistente**: Padrão de nomenclatura clara
- ✅ **Amplamente adotado**: Usado por milhares de empresas
- ✅ **Integrável**: Complementa Arc42 perfeitamente

---

## 4 Níveis de Abstração

```
C1: System Context (Mais abstrato)
  ↓
C2: Container (Zoom in)
  ↓
C3: Component (Zoom in)
  ↓
C4: Code (Mais concreto - raramente usado)
```

---

## C1 - System Context

**Template**: `system-context.md`

**Propósito**: Visão de alto nível mostrando sistema e suas integrações

### O Que Mostrar

```
[External User] → [Your System] → [External System]
```

**Elementos**:
- **Sistema principal**: O que você está construindo
- **Atores externos**: Usuários, admins, outros sistemas
- **Sistemas externos**: APIs, databases, serviços de terceiros

### Exemplo

```
┌─────────────┐
│   Usuario   │ (Pessoa)
└──────┬──────┘
       │
       ↓
┌─────────────────────────────┐
│   Sistema E-commerce        │ (Sistema)
│                             │
│ Plataforma de vendas online │
└──────┬──────────────┬───────┘
       │              │
       ↓              ↓
┌──────────┐   ┌─────────────┐
│  Stripe  │   │  SendGrid   │ (Sistemas Externos)
│ Pagamento│   │    Email    │
└──────────┘   └─────────────┘
```

### Template Markdown

```markdown
# System Context - [Nome do Sistema]

## C1 Diagram

**Legend**:
- **Blue boxes**: Your system
- **Gray boxes**: External systems
- **Stick figures**: Actors (users)

## Actors

### ACT-001: End User
**Type**: Person
**Description**: Cliente que compra produtos
**Interactions**: Navegação, compra, checkout

## External Systems

### SYS-001: Stripe
**Type**: External System
**Technology**: REST API (HTTPS)
**Purpose**: Processar pagamentos com cartão
**Protocol**: REST API (JSON)

### SYS-002: SendGrid
**Type**: External System
**Technology**: SMTP + REST API
**Purpose**: Enviar emails transacionais
**Protocol**: SMTP (TLS 1.3)

## Integration Patterns

| From | To | Protocol | Data Format |
|------|----| ---------|-------------|
| User | E-commerce | HTTPS | HTML/JSON |
| E-commerce | Stripe | HTTPS | JSON |
| E-commerce | SendGrid | HTTPS | JSON |
```

**Quando usar**: Início de projeto, ao definir integrações

**Relaciona com**: Arc42 Capítulo 3 (Context & Scope)

**Comandos**: `/vision`

---

## C2 - Container

**Template**: `container.md`

**Propósito**: Decomposição do sistema em aplicações, serviços, bancos de dados

### O Que Mostrar

```
Sistema
├── Web App (React)
├── API Gateway (Node.js)
├── Auth Service (Node.js)
├── Database (PostgreSQL)
└── Cache (Redis)
```

**Elementos**:
- **Web Applications**: SPAs, mobile apps
- **Backend Services**: APIs, microsserviços
- **Databases**: PostgreSQL, MongoDB, etc
- **Message Queues**: RabbitMQ, Kafka
- **Cache**: Redis, Memcached

### Exemplo

```markdown
# Container - CNT-001: API Gateway

**ID**: CNT-001
**Name**: API Gateway
**Type**: Backend Service
**Technology**: Node.js 20 + Express + TypeScript
**Status**: 🟢 Active

## Purpose

Ponto de entrada único para todas as requisições HTTP externas.

## Responsibilities

- Roteamento de requisições para serviços backend
- Autenticação via JWT
- Rate limiting (1000 req/min por usuário)
- Request/response logging
- Error handling centralizado

## Interfaces

### Input (Public API)

**Protocol**: HTTPS REST
**Format**: JSON
**Authentication**: JWT Bearer Token

Endpoints:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/users/:id`
- `POST /api/orders`

### Output (Internal APIs)

**Protocol**: gRPC (HTTP/2)
**Format**: Protocol Buffers

Services:
- `auth-service:50051`
- `order-service:50052`
- `user-service:50053`

## Dependencies

| Container | Purpose | Protocol |
|-----------|---------|----------|
| CNT-002: Auth Service | Autenticação | gRPC |
| CNT-003: Order Service | Pedidos | gRPC |
| CNT-004: Redis Cache | Session storage | Redis Protocol |

## Quality Attributes

- **Performance**: p95 < 100ms (excluding backend calls)
- **Scalability**: Horizontal (10+ instances)
- **Availability**: 99.9% uptime
- **Security**: HTTPS only (TLS 1.3), rate limiting

## Deployment

- **Environment**: Docker container (ECS Fargate)
- **Resources**: 1 vCPU, 2 GB RAM
- **Auto-scaling**: CPU > 70%
- **Health Check**: `GET /health` (200 OK)
```

**Quando usar**: Ao adicionar novos serviços, apps ou databases

**Relaciona com**: Arc42 Capítulo 5 (Building Blocks)

**Comandos**: `/container`, `/plan`

---

## C3 - Component

**Template**: `component.md`

**Propósito**: Decomposição de containers em módulos e componentes

### O Que Mostrar

```
CNT-001: Auth Service
├── CMP-001: UserAuthenticator
├── CMP-002: TokenManager
├── CMP-003: PasswordHasher
└── CMP-004: UserRepository
```

**Elementos**:
- **Controllers**: Endpoints HTTP
- **Services**: Lógica de negócio
- **Repositories**: Acesso a dados
- **Value Objects**: Email, Password, etc
- **Entities**: Aggregates DDD

### Exemplo

```markdown
# Component - CMP-001: UserAuthenticator

**ID**: CMP-001
**Name**: UserAuthenticator
**Container**: CNT-002 (Auth Service)
**Type**: Service Component
**Technology**: TypeScript class
**Status**: 🟢 Active

## Purpose

Responsável pela autenticação de usuários via email + senha.

## Responsibilities

- Validar credenciais de usuário
- Gerar JWT tokens após autenticação bem-sucedida
- Invalidar tokens (logout)
- Rate limiting de tentativas de login

## Public Interface

```typescript
interface UserAuthenticator {
  /**
   * Autentica usuário com email e senha
   * @throws InvalidCredentialsError se credenciais inválidas
   * @throws AccountLockedError se conta bloqueada (muitas tentativas)
   */
  authenticate(email: Email, password: Password): Promise<AuthToken>;

  /**
   * Valida token JWT
   * @returns User se token válido, null se inválido/expirado
   */
  validateToken(token: string): Promise<User | null>;

  /**
   * Invalida token (logout)
   */
  logout(token: string): Promise<void>;
}
```

## Dependencies

| Component | Purpose | Type |
|-----------|---------|------|
| CMP-004: UserRepository | Buscar usuário por email | Repository |
| CMP-003: PasswordHasher | Verificar hash de senha | Service |
| CMP-002: TokenManager | Gerar/validar JWT | Service |

## Internal Structure

```
UserAuthenticator (Service)
├── authenticate() → public
│   ├── UserRepository.findByEmail()
│   ├── PasswordHasher.verify()
│   ├── TokenManager.generate()
│   └── log event "user.logged_in"
│
├── validateToken() → public
│   ├── TokenManager.validate()
│   └── UserRepository.findById()
│
└── logout() → public
    ├── TokenManager.invalidate()
    └── log event "user.logged_out"
```

## Quality Attributes

- **Performance**: authenticate() < 200ms (p95)
- **Security**: Rate limit 5 attempts/15min per IP
- **Testability**: 90% coverage (unit + integration)

## Implementation Notes

**File**: `src/auth/api/usuario/autenticar-usuario.ts`

**Pattern**: DDD Co-Located
```
src/auth/api/usuario/
├── index.ts (Aggregate root)
├── autenticar-usuario.ts (This component)
├── criar-usuario.ts
├── Email.ts (Value Object)
├── Senha.ts (Value Object)
└── UsuarioAutenticado.ts (Domain Event)
```

**Tests**: `src/auth/api/usuario/autenticar-usuario.spec.ts`
```

**Quando usar**: Ao detalhar implementação de um container

**Relaciona com**: Arc42 Capítulo 5 (Building Blocks)

**Comandos**: `/component`, `/plan`

---

## C4 - Code (Raramente Usado)

**Propósito**: Classes e interfaces detalhadas

**Por que raramente usado?**:
- Nível muito baixo (equivale ao código-fonte)
- Melhor documentar via código comentado
- Alto custo de manutenção (desatualiza rápido)

**Quando usar**:
- Algoritmos complexos que precisam visualização
- Padrões de design que beneficiam de diagrama UML
- Onboarding de desenvolvedores júnior

**Alternativa recomendada**: Comentários de código + TSDoc/JSDoc

---

## Integração C4 + Arc42

### Mapeamento C4 → Arc42

| C4 Level | Arc42 Chapter | Template |
|----------|---------------|----------|
| C1 - System Context | 03. Context & Scope | `system-context.md` |
| C2 - Container | 05. Building Blocks | `container.md` |
| C3 - Component | 05. Building Blocks | `component.md` |
| C4 - Code | - (código-fonte) | - |

### Workflow de Documentação

```
1. Arc42 Cap 3 (Context) → C1 Diagram
   - Define atores e sistemas externos
   - Usa template system-context.md

2. Arc42 Cap 5 (Building Blocks) → C2 Diagram
   - Define containers (serviços, apps, DBs)
   - Usa template container.md para cada container

3. Arc42 Cap 5 (Building Blocks) → C3 Diagram
   - Define componentes dentro de containers
   - Usa template component.md para cada componente

4. Implementation (Phase 4) → Código
   - Developer implementa componentes
   - Código documenta C4 level
```

---

## Princípios de Diagramação C4

### 1. Abstrações Claras

**❌ Ruim**: Misturar níveis
```
[User] → [LoginController] → [PostgreSQL]
         (C3)                  (C2)
```

**✅ Bom**: Um nível por diagrama
```
C2 Diagram:
[User] → [API Gateway] → [Auth Service] → [Database]

C3 Diagram (Auth Service):
[LoginController] → [UserAuthenticator] → [UserRepository]
```

### 2. Tecnologia Explícita

**❌ Ruim**: Genérico
```
[Database]
```

**✅ Bom**: Específico
```
[Database]
PostgreSQL 15
Multi-AZ, 100GB
```

### 3. Comunicação Clara

**❌ Ruim**: Linha sem contexto
```
[Service A] -----> [Service B]
```

**✅ Bom**: Protocolo + formato
```
[Service A] --[gRPC/Protobuf]--> [Service B]
```

---

## Ferramentas para Diagramas C4

### Recomendadas

1. **Structurizr** (https://structurizr.com/)
   - Diagrams as Code (DSL)
   - Sincronização automática

2. **PlantUML C4 Extension** (https://github.com/plantuml-stdlib/C4-PlantUML)
   - Text-based diagrams
   - Integra com CI/CD

3. **Draw.io / Diagrams.net** (https://draw.io)
   - Visual editor
   - Templates C4 disponíveis

4. **Mermaid** (https://mermaid.js.org/)
   - Markdown-based
   - Integra com GitHub/GitLab

### Exemplo Structurizr DSL

```dsl
workspace {
    model {
        user = person "End User"
        ecommerce = softwareSystem "E-commerce Platform" {
            api = container "API Gateway" "Node.js + Express"
            auth = container "Auth Service" "Node.js + JWT"
            db = container "Database" "PostgreSQL 15"
        }
        stripe = softwareSystem "Stripe" "External"

        user -> ecommerce "Uses"
        ecommerce -> stripe "Processes payments"
        api -> auth "Authenticates via gRPC"
        auth -> db "Reads/writes"
    }

    views {
        systemContext ecommerce "C1" {
            include *
            autolayout lr
        }

        container ecommerce "C2" {
            include *
            autolayout lr
        }
    }
}
```

---

## Como Usar Templates C4

### 1. Começar com C1 (System Context)

```bash
cp .claude/templates/c4/system-context.md specs/03_context/context.md
# Preencher atores e sistemas externos
```

### 2. Decompor em C2 (Containers)

```bash
cp .claude/templates/c4/container.md specs/05_building_blocks/containers/CNT-001_api-gateway.md
cp .claude/templates/c4/container.md specs/05_building_blocks/containers/CNT-002_auth-service.md
# Preencher cada container
```

### 3. Detalhar com C3 (Components)

```bash
cp .claude/templates/c4/component.md specs/05_building_blocks/components/CMP-001_user-authenticator.md
# Preencher cada componente
```

### 4. Validar Hierarquia

```
Verificar:
- Cada container em C2 referencia containers em C1
- Cada componente em C3 referencia container pai em C2
- Dependencies são válidas (IDs existem)
```

---

## Exemplos Práticos

### Exemplo 1: Sistema de Chat

**C1 - System Context**:
```
[Users] → [Chat System] → [Auth0, Twilio, AWS S3]
```

**C2 - Containers**:
```
Chat System
├── Web App (React)
├── Mobile App (React Native)
├── WebSocket Gateway (Node.js)
├── Message Service (Go)
├── Database (PostgreSQL)
└── File Storage (AWS S3)
```

**C3 - Components (WebSocket Gateway)**:
```
WebSocket Gateway
├── ConnectionManager
├── MessageRouter
├── PresenceTracker
└── RateLimiter
```

### Exemplo 2: Sistema de E-commerce

**C1 - System Context**:
```
[Customers] → [E-commerce Platform] → [Stripe, SendGrid, Analytics]
```

**C2 - Containers**:
```
E-commerce Platform
├── Web Frontend (Next.js)
├── API Gateway (Node.js)
├── Product Service (Node.js)
├── Order Service (Go)
├── Payment Service (Node.js)
├── Database (PostgreSQL)
└── Cache (Redis)
```

**C3 - Components (Order Service)**:
```
Order Service
├── OrderController (HTTP)
├── OrderProcessor (Business Logic)
├── InventoryReserver
├── PricingCalculator
├── OrderRepository (Data Access)
└── OrderEventPublisher (Event Bus)
```

---

## Referências

### Internas
- **Arc42 Templates**: `.claude/templates/arc42/README.md`
- **BDD Templates**: `.claude/templates/bdd/README.md`
- **ADR Templates**: `.claude/templates/adr/README.md`
- **Templates Root**: `.claude/templates/README.md`

### Externas
- **C4 Model Official**: https://c4model.com/
- **Structurizr**: https://structurizr.com/
- **PlantUML C4**: https://github.com/plantuml-stdlib/C4-PlantUML
- **C4 Examples**: https://c4model.com/#examples

---

## Histórico de Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0.0 | 2025-11-15 | Templates iniciais C4 |
| 2.0.0 | 2025-11-17 | Integração com Arc42 e workflow |
| 2.1.0 | 2025-11-17 | Exemplos práticos adicionados |

---

**Mantido por**: Sistema de Workflow de Especificações Determinísticas v2.1.0
**Licença**: Ver raiz do projeto

---

**C4 = Visualização hierárquica e clara de arquitetura.** 📊

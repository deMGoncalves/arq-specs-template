# 04. Estratégia de Solução

**ID do Template**: TPL-ARC42-04
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 4 (Estratégia de Solução)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-04

---

## Decisões Tecnológicas

### Stack Backend

**Escolha**: Node.js + TypeScript + Express

**Fundamentação**:
- Expertise do time (5 desenvolvedores, 3+ anos de experiência)
- Desenvolvimento rápido (ecossistema NPM)
- Código compartilhado com frontend (TypeScript)

**Trade-offs**:
- ✅ Desenvolvimento rápido
- ✅ Ecossistema grande
- ❌ Tarefas CPU-intensivas mais lentas que Go/Rust

---

### Stack Frontend

**Escolha**: React + TypeScript + Next.js

**Fundamentação**:
- Expertise do time
- Requisitos de SEO (SSR via Next.js)
- Reusabilidade de componentes

---

### Banco de Dados

**Escolha**: PostgreSQL 14+

**Fundamentação**:
- Conformidade ACID (necessária para transações)
- Suporte JSON (JSONB)
- Expertise do time

**Trade-offs**:
- ✅ Consistência forte
- ✅ Capacidades ricas de query
- ❌ Escalabilidade horizontal requer sharding

---

### Caching

**Escolha**: Redis

**Fundamentação**:
- Rápido (in-memory)
- Estruturas de dados (sorted sets para rankings)
- Pub/sub (para features em tempo real)

---

### Busca

**Escolha**: Elasticsearch

**Fundamentação**:
- Busca full-text
- Filtragem por facetas
- Pontuação de relevância

---

## Padrões Arquiteturais

### Padrão 1: Monolito Modular

**Decisão**: Começar com monolito modular, NÃO microsserviços

**Fundamentação**:
- Time pequeno (5 desenvolvedores)
- Cronograma apertado (6 meses)
- Operações mais simples
- Pode dividir depois (módulos mapeiam para serviços futuros)

**Estrutura**:
```
src/
├── modules/
│   ├── auth/          # Módulo de autenticação
│   ├── products/      # Catálogo de produtos
│   ├── cart/          # Carrinho de compras
│   ├── orders/        # Processamento de pedidos
│   └── payments/      # Integração de pagamentos
```

---

### Padrão 2: Arquitetura em Camadas

**Camadas**:
1. **Apresentação** (rotas de API, controllers)
2. **Aplicação** (casos de uso, orquestração)
3. **Domínio** (lógica de negócio, entidades)
4. **Infraestrutura** (banco de dados, APIs externas)

**Regras**:
- Dependências apontam para dentro (Infraestrutura → Domínio, NÃO Domínio → Infraestrutura)
- Domínio NÃO tem dependências externas

---

### Padrão 3: Orientado a Eventos (Assíncrono)

**Usar para**: Operações não críticas, assíncronas

**Eventos**:
- `order.created` → Enviar email de confirmação
- `payment.succeeded` → Atualizar status do pedido
- `product.updated` → Invalidar cache

**Implementação**: Event bus interno (EventEmitter) + webhooks externos

---

## Estratégia de Decomposição

### Limites de Módulos

Módulos baseados em **bounded contexts** (DDD):

#### 1. Módulo Auth
- **Responsabilidade**: Autenticação de usuários, autorização
- **Deps Externas**: Auth0
- **Dados**: Usuários, sessões, tokens

#### 2. Módulo Products
- **Responsabilidade**: Catálogo de produtos, busca
- **Deps Externas**: Elasticsearch, S3 (imagens)
- **Dados**: Produtos, categorias, inventário

#### 3. Módulo Cart
- **Responsabilidade**: Gestão de carrinho de compras
- **Deps Externas**: Redis (armazenamento de sessão)
- **Dados**: Itens do carrinho (temporários)

#### 4. Módulo Orders
- **Responsabilidade**: Processamento de pedidos, rastreamento
- **Deps Externas**: Nenhuma (domínio core)
- **Dados**: Pedidos, itens de pedido, histórico de status

#### 5. Módulo Payments
- **Responsabilidade**: Processamento de pagamentos
- **Deps Externas**: Stripe
- **Dados**: Payment intents, transações

---

## Estratégia de Atributos de Qualidade

### Performance

**Meta**: p95 < 200ms, p99 < 500ms

**Estratégias**:
- **Caching**: Redis (catálogo de produtos, sessões de usuário)
- **Banco de Dados**: Índices em colunas frequentemente consultadas
- **API**: Paginação (limite 100 itens/página)
- **CDN**: CloudFront para assets estáticos

---

### Escalabilidade

**Meta**: 100K usuários concorrentes, 10K req/s

**Estratégias**:
- **Horizontal**: Servidores de app stateless (escalar com ECS)
- **Banco de Dados**: Read replicas (3x), connection pooling
- **Cache**: Cluster Redis (sharding)
- **CDN**: CloudFront (descarregar conteúdo estático)

---

### Disponibilidade

**Meta**: 99,9% de uptime (~8,7h downtime/ano)

**Estratégias**:
- **Multi-AZ**: Deploy em 2 zonas de disponibilidade
- **Health checks**: Health checks ELB a cada 30s
- **Auto-recuperação**: ECS reinicia containers falhos
- **Degradação graciosa**: Modo somente leitura se BD indisponível

---

### Segurança

**Estratégias**:
- **Auth**: OAuth 2.0 (Auth0), tokens JWT (2h TTL)
- **Criptografia**: TLS 1.3 (em trânsito), AES-256 (em repouso)
- **Validação de input**: Schemas Joi, prevenção de SQL injection
- **Rate limiting**: 1000 req/hora por usuário
- **Secrets**: AWS Secrets Manager (sem chaves hardcoded)

---

## Decisões Principais

### Decisão 1: Monolito Modular vs Microsserviços

**Escolha**: Monolito Modular

**Fundamentação**: Time pequeno, prazo apertado, simplicidade operacional

**Consequências**:
- ✅ Desenvolvimento mais rápido
- ✅ Deploy mais simples
- ❌ Escalabilidade independente limitada

**Futuro**: Pode dividir em microsserviços quando o time crescer (módulos → serviços)

---

### Decisão 2: PostgreSQL vs NoSQL

**Escolha**: PostgreSQL

**Fundamentação**: Requisitos ACID (pagamentos), queries complexas (relatórios)

**Consequências**:
- ✅ Consistência forte
- ✅ Queries relacionais
- ❌ Complexidade de escalabilidade horizontal

---

### Decisão 3: Build vs Buy (Auth, Payment)

**Escolha**: Buy (Auth0, Stripe)

**Fundamentação**: Time-to-market, segurança, conformidade

**Consequências**:
- ✅ Lançamento mais rápido (economizou 3 meses)
- ✅ Melhor segurança (serviços comprovados)
- ❌ Vendor lock-in
- ❌ Custos mensais (R$ 5K/mês)

---

## Diagrama de Arquitetura (Alto Nível)

```
┌─────────────────────────────────────────────────┐
│           Load Balancer (ALB)                   │
└───────────────────┬─────────────────────────────┘
                    │
      ┌─────────────┴─────────────┐
      │                           │
      ↓                           ↓
┌──────────────┐          ┌──────────────┐
│ App Server   │          │ App Server   │
│  (Node.js)   │          │  (Node.js)   │
│              │          │              │
│  - Auth      │          │  - Auth      │
│  - Products  │          │  - Products  │
│  - Cart      │          │  - Cart      │
│  - Orders    │          │  - Orders    │
│  - Payments  │          │  - Payments  │
└──────┬───────┘          └──────┬───────┘
       │                         │
       └─────────┬───────────────┘
                 │
      ┌──────────┼──────────┐
      │          │          │
      ↓          ↓          ↓
┌──────────┐ ┌───────┐ ┌─────────────┐
│PostgreSQL│ │ Redis │ │Elasticsearch│
│(Primário)│ │(Cache)│ │   (Busca)   │
└──────────┘ └───────┘ └─────────────┘
```

---

**Anterior**: [03. Contexto](03_context.md) | **Próximo**: [05. Building Blocks](05_building-blocks.md)

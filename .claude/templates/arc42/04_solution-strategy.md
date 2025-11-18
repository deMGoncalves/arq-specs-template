# 04. Solution Strategy

**Template ID**: TPL-ARC42-04
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 4 (Solution Strategy)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-04

---

## Technology Decisions

### Backend Stack

**Choice**: Node.js + TypeScript + Express

**Rationale**:
- Team expertise (5 developers, 3+ years experience)
- Fast development (NPM ecosystem)
- Shared code with frontend (TypeScript)

**Trade-offs**:
- ✅ Rapid development
- ✅ Large ecosystem
- ❌ CPU-intensive tasks slower than Go/Rust

---

### Frontend Stack

**Choice**: React + TypeScript + Next.js

**Rationale**:
- Team expertise
- SEO requirements (SSR via Next.js)
- Component reusability

---

### Database

**Choice**: PostgreSQL 14+

**Rationale**:
- ACID compliance (required for transactions)
- JSON support (JSONB)
- Team expertise

**Trade-offs**:
- ✅ Strong consistency
- ✅ Rich query capabilities
- ❌ Horizontal scaling requires sharding

---

### Caching

**Choice**: Redis

**Rationale**:
- Fast (in-memory)
- Data structures (sorted sets for rankings)
- Pub/sub (for real-time features)

---

### Search

**Choice**: Elasticsearch

**Rationale**:
- Full-text search
- Faceted filtering
- Relevance scoring

---

## Architectural Patterns

### Pattern 1: Modular Monolith

**Decision**: Start with modular monolith, NOT microservices

**Rationale**:
- Small team (5 developers)
- Tight timeline (6 months)
- Simpler operations
- Can split later (modules map to future services)

**Structure**:
```
src/
├── modules/
│   ├── auth/          # Authentication module
│   ├── products/      # Product catalog
│   ├── cart/          # Shopping cart
│   ├── orders/        # Order processing
│   └── payments/      # Payment integration
```

---

### Pattern 2: Layered Architecture

**Layers**:
1. **Presentation** (API routes, controllers)
2. **Application** (use cases, orchestration)
3. **Domain** (business logic, entities)
4. **Infrastructure** (database, external APIs)

**Rules**:
- Dependencies point inward (Infrastructure → Domain, NOT Domain → Infrastructure)
- Domain has NO external dependencies

---

### Pattern 3: Event-Driven (Async)

**Use for**: Non-critical, async operations

**Events**:
- `order.created` → Send confirmation email
- `payment.succeeded` → Update order status
- `product.updated` → Invalidate cache

**Implementation**: Internal event bus (EventEmitter) + external webhooks

---

## Decomposition Strategy

### Module Boundaries

Modules based on **bounded contexts** (DDD):

#### 1. Auth Module
- **Responsibility**: User authentication, authorization
- **External Deps**: Auth0
- **Data**: Users, sessions, tokens

#### 2. Products Module
- **Responsibility**: Product catalog, search
- **External Deps**: Elasticsearch, S3 (images)
- **Data**: Products, categories, inventory

#### 3. Cart Module
- **Responsibility**: Shopping cart management
- **External Deps**: Redis (session storage)
- **Data**: Cart items (temporary)

#### 4. Orders Module
- **Responsibility**: Order processing, tracking
- **External Deps**: None (core domain)
- **Data**: Orders, order items, status history

#### 5. Payments Module
- **Responsibility**: Payment processing
- **External Deps**: Stripe
- **Data**: Payment intents, transactions

---

## Quality Attributes Strategy

### Performance

**Target**: p95 < 200ms, p99 < 500ms

**Strategies**:
- **Caching**: Redis (product catalog, user sessions)
- **Database**: Indexes on frequently queried columns
- **API**: Pagination (limit 100 items/page)
- **CDN**: CloudFront for static assets

---

### Scalability

**Target**: 100K concurrent users, 10K req/s

**Strategies**:
- **Horizontal**: Stateless app servers (scale with ECS)
- **Database**: Read replicas (3x), connection pooling
- **Cache**: Redis cluster (sharding)
- **CDN**: CloudFront (offload static content)

---

### Availability

**Target**: 99.9% uptime (~8.7h downtime/year)

**Strategies**:
- **Multi-AZ**: Deploy across 2 availability zones
- **Health checks**: ELB health checks every 30s
- **Auto-recovery**: ECS restarts failed containers
- **Graceful degradation**: Read-only mode if DB unavailable

---

### Security

**Strategies**:
- **Auth**: OAuth 2.0 (Auth0), JWT tokens (2h TTL)
- **Encryption**: TLS 1.3 (in-transit), AES-256 (at-rest)
- **Input validation**: Joi schemas, SQL injection prevention
- **Rate limiting**: 1000 req/hour per user
- **Secrets**: AWS Secrets Manager (no hardcoded keys)

---

## Top Decisions

### Decision 1: Modular Monolith vs Microservices

**Choice**: Modular Monolith

**Rationale**: Small team, tight deadline, operational simplicity

**Consequences**:
- ✅ Faster development
- ✅ Simpler deployment
- ❌ Limited independent scalability

**Future**: Can split into microservices when team grows (modules → services)

---

### Decision 2: PostgreSQL vs NoSQL

**Choice**: PostgreSQL

**Rationale**: ACID requirements (payments), complex queries (reports)

**Consequences**:
- ✅ Strong consistency
- ✅ Relational queries
- ❌ Horizontal scaling complexity

---

### Decision 3: Build vs Buy (Auth, Payment)

**Choice**: Buy (Auth0, Stripe)

**Rationale**: Time-to-market, security, compliance

**Consequences**:
- ✅ Faster launch (saved 3 months)
- ✅ Better security (proven services)
- ❌ Vendor lock-in
- ❌ Monthly costs ($5K/mo)

---

## Architecture Diagram (High-Level)

```
┌─────────────────────────────────────────────────┐
│              Load Balancer (ALB)                │
└───────────────────┬─────────────────────────────┘
                    │
      ┌─────────────┴─────────────┐
      │                           │
      ↓                           ↓
┌──────────────┐          ┌──────────────┐
│  App Server  │          │  App Server  │
│   (Node.js)  │          │   (Node.js)  │
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
│ (Primary)│ │(Cache)│ │  (Search)   │
└──────────┘ └───────┘ └─────────────┘
```

---

**Previous**: [03. Context](03_context.md) | **Next**: [05. Building Blocks](05_building-blocks.md)

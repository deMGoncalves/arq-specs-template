# Container: [Container Name]

**Template ID**: TPL-C4-002
**ID**: CNT-[XXX]
**Version**: 2.0.0
**Category**: C4 Model
**Level**: C4 Level 2 (Container)
**Type**: Container (C4 Level 2)
**Status**: [Draft | Active | Deprecated]
**Used By**: analyst (Phase 3: Specification), architect (Phase 2: Design)
**Last Updated**: 2025-11-17

---

## Overview

**Name**: [Container Name]

**Purpose**: [One-line description of what this container does]

**Example**:
> API Server that provides RESTful endpoints for product catalog, shopping cart, and order management.

---

## Technology Stack

**Primary Technology**: [Language/Framework/Platform]

**Version**: [Version number]

**Runtime**: [Environment details]

**Example**:
- **Primary**: Node.js + TypeScript + Express
- **Version**: Node.js 20.x, TypeScript 5.x
- **Runtime**: AWS ECS Fargate (2 vCPU, 4GB RAM)

---

## Responsibilities

List the main responsibilities of this container:

1. **[Responsibility 1]**: [Description]
2. **[Responsibility 2]**: [Description]
3. **[Responsibility 3]**: [Description]

**Example**:
1. **API Endpoints**: Expose REST API for clients (web, mobile)
2. **Business Logic**: Execute business rules and validations
3. **Data Access**: Query and persist data to database
4. **External Integration**: Call external APIs (Stripe, Auth0, SendGrid)

---

## Dependencies

### Internal Dependencies (Other Containers)

| Container ID | Name | Relationship | Protocol |
|--------------|------|--------------|----------|
| [CNT-XXX] | [Name] | [Type] | [Protocol] |

**Example**:

| Container ID | Name | Relationship | Protocol |
|--------------|------|--------------|----------|
| CNT-003 | PostgreSQL Database | Data storage | PostgreSQL wire protocol |
| CNT-004 | Redis Cache | Caching | Redis protocol |
| CNT-005 | Background Worker | Async jobs | Internal event bus |

---

### External Dependencies (External Systems)

| System | Purpose | Protocol | SLA | Fallback |
|--------|---------|----------|-----|----------|
| [Name] | [Purpose] | [Protocol] | [SLA] | [Strategy] |

**Example**:

| System | Purpose | Protocol | SLA | Fallback |
|--------|---------|----------|-----|----------|
| Auth0 | Authentication | HTTPS/OIDC | 99.9% | Cached tokens (2h) |
| Stripe | Payments | HTTPS/REST | 99.99% | Queue payments, retry |
| SendGrid | Email | HTTPS/REST | 99.95% | Queue emails, non-blocking |
| AWS S3 | File storage | HTTPS/S3 API | 99.9% | CDN cache, placeholders |

---

## Interfaces

### Inbound (APIs Exposed)

#### API 1: [Name]

**Protocol**: [HTTP/REST | WebSocket | gRPC | GraphQL]

**Base URL**: `[URL]`

**Authentication**: [Method]

**Endpoints**:

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| [GET] | [/path] | [Description] | [Yes/No] |

**Example**:

**Protocol**: HTTP/REST (JSON)

**Base URL**: `https://api.example.com/v1`

**Authentication**: JWT Bearer token (optional for public endpoints)

**Endpoints**:

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | /products | List products (paginated) | No |
| GET | /products/{id} | Get product details | No |
| POST | /cart | Add item to cart | Yes |
| GET | /cart | View cart | Yes |
| POST | /orders | Create order | Yes |
| GET | /orders/{id} | Get order status | Yes |

**Rate Limits**:
- Anonymous: 100 req/hour
- Authenticated: 1,000 req/hour

**Error Format** (RFC 7807):
```json
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Failed",
  "status": 400,
  "detail": "Email format is invalid",
  "instance": "/users"
}
```

---

### Outbound (APIs Consumed)

List external APIs this container calls:

| API | Purpose | Endpoint | Auth |
|-----|---------|----------|------|
| [Name] | [Purpose] | [URL] | [Method] |

**Example**:

| API | Purpose | Endpoint | Auth |
|-----|---------|----------|------|
| Auth0 | Verify JWT | `https://auth.example.com/userinfo` | Bearer token |
| Stripe | Create payment | `https://api.stripe.com/v1/payment_intents` | API Key |
| SendGrid | Send email | `https://api.sendgrid.com/v3/mail/send` | API Key |

---

## Data Model

### Database Tables (if applicable)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| [table_name] | [Purpose] | [Columns] |

**Example**:

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| products | Product catalog | id, sku, name, price, stock |
| orders | Customer orders | id, user_id, status, total, created_at |
| order_items | Order line items | id, order_id, product_id, quantity, price |
| users | User accounts | id, email, created_at |

**Schema Details**: See `docs/database/schema.md`

---

### Cache Keys (if applicable)

| Key Pattern | Purpose | TTL |
|-------------|---------|-----|
| [pattern] | [Purpose] | [Duration] |

**Example**:

| Key Pattern | Purpose | TTL |
|-------------|---------|-----|
| `product:{id}` | Cached product details | 1 hour |
| `cart:{userId}` | User shopping cart | 24 hours |
| `session:{token}` | User session | 2 hours |

---

## Configuration

### Environment Variables

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| [VAR_NAME] | [Description] | [Yes/No] | [Value] | [Example] |

**Example**:

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| PORT | HTTP port | No | 3000 | 8080 |
| DATABASE_URL | PostgreSQL connection string | Yes | - | `postgresql://...` |
| REDIS_URL | Redis connection string | Yes | - | `redis://...` |
| AUTH0_DOMAIN | Auth0 domain | Yes | - | `example.auth0.com` |
| STRIPE_API_KEY | Stripe secret key | Yes | - | `sk_live_...` |
| LOG_LEVEL | Logging level | No | info | debug |

---

## Deployment

### Infrastructure

**Platform**: [AWS ECS | Kubernetes | Docker | VM]

**Scaling**:
- **Min Instances**: [X]
- **Max Instances**: [Y]
- **Auto-scale Trigger**: [Metric] > [Threshold]

**Resources**:
- **CPU**: [X] vCPU
- **Memory**: [Y] GB
- **Disk**: [Z] GB

**Example**:

**Platform**: AWS ECS Fargate

**Scaling**:
- **Min Instances**: 2
- **Max Instances**: 20
- **Auto-scale Trigger**: CPU > 70% or Memory > 80%

**Resources**:
- **CPU**: 2 vCPU
- **Memory**: 4 GB
- **Disk**: 10 GB (ephemeral)

---

### Networking

**Ports**:
- [Port]: [Purpose]

**Example**:
- 3000: HTTP API
- 9090: Metrics (Prometheus)

**Load Balancer**:
- Type: Application Load Balancer (ALB)
- Health Check: GET /health every 30s
- Timeout: 5s

---

### Monitoring

**Logs**:
- **Format**: JSON (structured)
- **Destination**: CloudWatch Logs
- **Retention**: 7 days

**Metrics**:
- **CPU Usage**: % utilization
- **Memory Usage**: % utilization
- **Request Rate**: req/s
- **Error Rate**: errors/s
- **Response Time**: p50, p95, p99

**Alerts**:
- Error rate > 1% → PagerDuty
- Response time p95 > 1s → Slack
- CPU > 90% → Email

---

## Quality Attributes

### Performance

- **Response Time**: p95 < [X]ms, p99 < [Y]ms
- **Throughput**: [X] req/s
- **Concurrent Connections**: [X]

**Example**:
- **Response Time**: p95 < 200ms, p99 < 500ms
- **Throughput**: 5,000 req/s
- **Concurrent Connections**: 10,000

---

### Availability

- **SLA**: [X]% uptime
- **RTO**: < [X] minutes
- **RPO**: < [X] minutes

**Example**:
- **SLA**: 99.9% uptime (~43 min downtime/month)
- **RTO**: < 5 minutes (auto-restart)
- **RPO**: N/A (stateless)

---

### Security

- **TLS**: Version [X]
- **Authentication**: [Method]
- **Input Validation**: [Yes/No]
- **Rate Limiting**: [Limits]
- **Secrets Management**: [Method]

**Example**:
- **TLS**: 1.3 (enforced)
- **Authentication**: JWT Bearer tokens
- **Input Validation**: Joi schemas on all inputs
- **Rate Limiting**: 1,000 req/hour per user
- **Secrets Management**: AWS Secrets Manager

---

## Components

List main components within this container (C4 Level 3):

| Component ID | Name | Purpose |
|--------------|------|---------|
| [CMP-XXX] | [Name] | [Purpose] |

**Example**:

| Component ID | Name | Purpose |
|--------------|------|---------|
| CMP-001 | Auth Service | Handle authentication/authorization |
| CMP-002 | Product Service | Manage product catalog |
| CMP-003 | Cart Service | Manage shopping carts |
| CMP-004 | Order Service | Process orders |
| CMP-005 | Payment Service | Integrate with Stripe |

**Details**: See `specs/05_building-blocks/components/CMP-*`

---

## Testing

### Test Strategy

- **Unit Tests**: [X]% coverage
- **Integration Tests**: [Scope]
- **E2E Tests**: [Critical paths]

**Example**:
- **Unit Tests**: 80% coverage (business logic)
- **Integration Tests**: API endpoints + database
- **E2E Tests**: Checkout flow (happy path)

### Test Data

- **Development**: Fake data (Faker.js)
- **Staging**: Anonymized production data
- **Production**: Real data

---

## Migration Notes

### From Version [X] to [Y]

- **Breaking Changes**: [List]
- **Migration Steps**: [Steps]
- **Rollback Plan**: [Plan]

**Example**:

### From v1.0 to v2.0

- **Breaking Changes**:
  - API: `/api/v1/products` → `/api/v2/products`
  - Response format changed (camelCase → snake_case)

- **Migration Steps**:
  1. Deploy v2.0 alongside v1.0 (both versions running)
  2. Update clients to use `/api/v2`
  3. Monitor for 1 week
  4. Deprecate `/api/v1` (return 410 Gone)

- **Rollback Plan**: Traffic back to v1.0 via ALB rules

---

## Related Documents

- [Architecture Overview](../../arc42/01_introduction.md)
- [Component Details](../components/CMP-*)
- [API Documentation](docs/api.md)
- [Runbook](docs/runbook.md)

---

## Related Templates

### Prerequisites
- **system-context.md** (TPL-C4-001) - System Context diagram must exist first

### Follows This Template
- **component.md** (TPL-C4-003) - Zoom into containers to show components (C4 Level 3)

### Part Of
- **arc42/05_building-blocks.md** (TPL-ARC42-05) - Arc42 Chapter 5: Building Blocks

### See Also
- **arc42/04_solution-strategy.md** (TPL-ARC42-04) - Solution strategy and technology choices
- **arc42/07_deployment.md** (TPL-ARC42-07) - Deployment view
- **design.md** (TPL-WORKFLOW-002) - Architecture design document

---

## Workflow Integration

**Phase**: 2 (Architecture) or 3 (Specification)

**Primary Skill**:
- **analyst** - Creates as part of spec.md (Phase 3)
- **architect** - Creates as part of design.md for HIGH complexity (Phase 2)

**Output Location**:
- `changes/[change-id]/design.md` (if Phase 2)
- `specs/05_building-blocks/containers/CNT-*.md` (if Phase 3)

**Prerequisites**:
- System Context diagram created (C4 Level 1)
- System boundaries defined

**Next Steps**:
- Create Component diagrams for complex containers (C4 Level 3)
- Define runtime scenarios (Arc42 Chapter 6)

---

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2025-11-17 | Template Standardization | Added Template ID, Related Templates, Workflow Integration |
| 1.0.0 | [Date] | [Name] | Initial version |

---

**Parent**: [05. Building Blocks](../../arc42/05_building-blocks.md)
**Type**: Container (C4 Level 2)

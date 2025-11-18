# 03. Context and Scope

**Template ID**: TPL-ARC42-03
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 3 (Context and Scope)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-03
**Status**: [Draft | In Review | Approved]

---

## Overview

This chapter describes the system context - how it fits into its environment and what its boundaries are. This is **C4 Level 1** (System Context).

---

## Business Context

### C4 Level 1: System Context Diagram

```
┌─────────────┐
│   End User  │
│  (Browser)  │
└──────┬──────┘
       │ HTTPS
       ↓
┌─────────────────────────────────────┐
│                                     │
│      [System Name]                  │
│                                     │
│   [Brief description]               │
│                                     │
└──────┬──────────────┬───────────────┘
       │              │
       │              │ HTTPS/REST
       ↓              ↓
┌──────────────┐  ┌─────────────┐
│    Auth0     │  │   Stripe    │
│  (OAuth 2.0) │  │  (Payment)  │
└──────────────┘  └─────────────┘
```

**Example (E-Commerce Platform)**:
```
         ┌─────────────┐                    ┌──────────────┐
         │  Customer   │                    │  Admin User  │
         │   (Web)     │                    │   (Web)      │
         └──────┬──────┘                    └──────┬───────┘
                │ HTTPS                            │ HTTPS
                │                                  │
                ↓                                  ↓
         ┌──────────────────────────────────────────────┐
         │                                              │
         │       E-Commerce Platform                    │
         │                                              │
         │  Browse products, manage cart,               │
         │  checkout, track orders                      │
         │                                              │
         └────┬──────┬──────┬───────┬──────────┬────────┘
              │      │      │       │          │
     ┌────────┘      │      │       │          └────────┐
     │               │      │       │                   │
     ↓               ↓      ↓       ↓                   ↓
┌─────────┐   ┌─────────┐ ┌────────┐ ┌──────────┐ ┌─────────┐
│  Auth0  │   │ Stripe  │ │SendGrid│ │   AWS    │ │Analytics│
│(OAuth2.0)│  │(Payment)│ │(Email) │ │   S3     │ │(Mixpanel)│
└─────────┘   └─────────┘ └────────┘ └──────────┘ └─────────┘
```

---

## Actors (Users)

### Primary Actors

#### ACT-001: [Actor Name]

**Type**: [Human | System | Device]

**Description**: [Who/what is this actor]

**Goals**:
- [Goal 1]
- [Goal 2]

**Interactions**:
- [Interaction 1]: [Description]
- [Interaction 2]: [Description]

**Authentication**: [Method]

**Authorization**: [Permissions/roles]

---

**Example:**

#### ACT-001: End Customer

**Type**: Human (Web Browser)

**Description**: Person shopping on the e-commerce platform

**Goals**:
- Find products quickly
- Complete purchase securely
- Track order status

**Interactions**:
- Browse product catalog (read)
- Search products (read)
- Add items to cart (write)
- Complete checkout (write)
- View order history (read)

**Authentication**: Optional (guest checkout) or OAuth 2.0 (registered user)

**Authorization**:
- Read: Public products
- Write: Own cart, own orders

---

#### ACT-002: Administrator

**Type**: Human (Web Browser)

**Description**: Staff managing inventory, orders, customers

**Goals**:
- Manage product inventory
- Process orders
- Handle customer support

**Interactions**:
- CRUD products
- View all orders
- Update order status
- View customer data

**Authentication**: OAuth 2.0 (required)

**Authorization**:
- Role: Admin
- Permissions: Full access

---

### Secondary Actors

#### ACT-003: [External System]

**Example:**

#### ACT-003: Inventory System (Legacy)

**Type**: System (REST API)

**Description**: Legacy ERP system tracking warehouse inventory

**Interactions**:
- System calls inventory API to check stock
- Inventory system sends stock updates via webhook

**Protocol**: REST (JSON over HTTPS)

**Authentication**: API Key

---

## External Systems

### SYS-001: [System Name]

**Type**: [Service | Database | API]

**Provider**: [Company/organization]

**Purpose**: [What it does for us]

**Protocol**: [Communication method]

**SLA**: [Uptime guarantee]

**Data Flow**: [What data is exchanged]

**Dependency Level**: [Critical | High | Medium | Low]

**Fallback Strategy**: [What happens if unavailable]

---

**Example:**

### SYS-001: Auth0

**Type**: Authentication Service

**Provider**: Auth0 (Okta)

**Purpose**: User authentication and authorization (OAuth 2.0)

**Protocol**: HTTPS/REST + OIDC

**SLA**: 99.9% uptime

**Data Flow**:
- **To Auth0**: Login requests, token refresh
- **From Auth0**: JWT tokens, user profile

**Dependency Level**: Critical

**Fallback Strategy**:
- Cached tokens (2h TTL)
- Graceful degradation (read-only mode)
- Manual fallback to database auth (emergency only)

---

### SYS-002: Stripe

**Type**: Payment Gateway

**Provider**: Stripe, Inc.

**Purpose**: Process credit card payments

**Protocol**: HTTPS/REST

**SLA**: 99.99% uptime

**Data Flow**:
- **To Stripe**: Payment intents, customer data (tokenized)
- **From Stripe**: Payment status, webhooks (payment.succeeded)

**Dependency Level**: Critical

**Fallback Strategy**:
- Queue payments (retry up to 24h)
- Show maintenance message to users
- Manual payment processing (fallback)

---

### SYS-003: SendGrid

**Type**: Email Service

**Provider**: Twilio SendGrid

**Purpose**: Transactional emails (order confirmation, password reset)

**Protocol**: HTTPS/REST

**SLA**: 99.95% uptime

**Data Flow**:
- **To SendGrid**: Email templates, recipient list, variables
- **From SendGrid**: Delivery status, webhooks (delivered, bounced)

**Dependency Level**: Medium

**Fallback Strategy**:
- Queue emails (retry with exponential backoff)
- Log failures for manual follow-up
- System remains operational (email not blocking)

---

### SYS-004: AWS S3

**Type**: Object Storage

**Provider**: Amazon Web Services

**Purpose**: Store product images, user uploads

**Protocol**: HTTPS/REST (S3 API)

**SLA**: 99.9% uptime

**Data Flow**:
- **To S3**: Image uploads (multipart)
- **From S3**: Image URLs (via CloudFront CDN)

**Dependency Level**: High

**Fallback Strategy**:
- CDN cache (CloudFront, 24h TTL)
- Placeholder images if S3 unavailable
- Retry uploads in background

---

## Interfaces

### Technical Interfaces

#### INT-001: [Interface Name]

**Protocol**: [HTTP/REST | WebSocket | gRPC | Message Queue]

**Format**: [JSON | XML | Protocol Buffers]

**Authentication**: [Method]

**Endpoints**: [List or link to API doc]

**Rate Limits**: [Limits]

---

**Example:**

#### INT-001: Public REST API

**Protocol**: HTTPS/REST

**Format**: JSON

**Authentication**:
- Public endpoints: None
- Protected endpoints: JWT Bearer token

**Base URL**: `https://api.example.com/v1`

**Endpoints**:
```
GET    /products              # List products
GET    /products/{id}         # Get product details
POST   /cart                  # Add to cart
GET    /cart                  # View cart
POST   /orders                # Create order
GET    /orders/{id}           # Get order status
```

**Rate Limits**:
- Anonymous: 100 req/hour
- Authenticated: 1000 req/hour

**Error Format** (RFC 7807):
```json
{
  "type": "https://api.example.com/errors/rate-limit",
  "title": "Rate limit exceeded",
  "status": 429,
  "detail": "You have exceeded 100 requests per hour",
  "instance": "/products"
}
```

---

#### INT-002: Webhooks (Incoming)

**Protocol**: HTTPS/POST

**Format**: JSON

**Authentication**: HMAC-SHA256 signature verification

**Sources**:
- Stripe: `payment.succeeded`, `payment.failed`
- SendGrid: `delivered`, `bounced`, `opened`

**Endpoint**: `https://api.example.com/webhooks/{provider}`

**Retry Policy**:
- Exponential backoff: 1s, 2s, 4s, 8s, 16s
- Max attempts: 5
- Timeout: 30s

---

### Data Interfaces

#### Data Exchange with External Systems

**Format**: [JSON | CSV | XML]

**Frequency**: [Real-time | Hourly | Daily]

**Volume**: [Records per day]

**Example:**

**Inventory Sync**:
- **Direction**: Inventory System → Platform
- **Format**: JSON
- **Frequency**: Real-time (webhook) + nightly batch
- **Volume**: ~10K updates/day
- **Schema**:
```json
{
  "sku": "LAPTOP-001",
  "quantity": 50,
  "updated_at": "2025-11-15T10:30:00Z"
}
```

---

## Communication Patterns

### Pattern 1: Request/Response

**Used for**: API calls (REST)

**Characteristics**:
- Synchronous
- Client waits for response
- Timeout: 30s

**Example**: User searches for products → API returns results

---

### Pattern 2: Event-Driven (Webhooks)

**Used for**: Asynchronous notifications

**Characteristics**:
- Asynchronous
- Eventual consistency
- Retry with exponential backoff

**Example**: Stripe payment succeeds → Webhook → Order confirmed

---

### Pattern 3: Batch Processing

**Used for**: Non-urgent bulk operations

**Characteristics**:
- Scheduled (cron)
- Large volume
- Low priority

**Example**: Nightly inventory sync from ERP

---

## Data Flow Overview

### Checkout Flow Example

```
Customer          Platform         Auth0         Stripe        SendGrid
   │                 │              │              │              │
   │  Add to cart    │              │              │              │
   ├────────────────>│              │              │              │
   │                 │              │              │              │
   │  Checkout       │              │              │              │
   ├────────────────>│              │              │              │
   │                 │  Verify JWT  │              │              │
   │                 ├─────────────>│              │              │
   │                 │<─────────────┤              │              │
   │                 │  (valid)     │              │              │
   │                 │              │              │              │
   │                 │  Create Payment Intent      │              │
   │                 ├──────────────────────────>  │              │
   │                 │<──────────────────────────┤  │              │
   │                 │  (client_secret)           │              │
   │                 │              │              │              │
   │  Enter card     │              │              │              │
   │  (Stripe.js)    │              │              │              │
   ├─────────────────────────────────────────────>│              │
   │                 │              │  (payment)   │              │
   │                 │              │              │              │
   │                 │<─────────────────────────── ┤              │
   │<────────────────┤  Webhook: payment.succeeded │              │
   │  (success)      │              │              │              │
   │                 │              │              │              │
   │                 │  Send confirmation email    │              │
   │                 ├──────────────────────────────────────────>│
   │                 │              │              │              │
   │<────────────────┤  Order confirmation                        │
   │  (email)        │              │              │              │
```

---

## Boundary Decisions

### What's Inside the System

✅ **Responsibilities of this system**:
- Product catalog management
- Shopping cart logic
- Order processing workflow
- User session management
- Business logic

### What's Outside the System

❌ **Not our responsibility**:
- User authentication (Auth0)
- Payment processing (Stripe)
- Email delivery (SendGrid)
- Image storage (AWS S3)
- Analytics (Mixpanel)

**Rationale**: Focus on core business logic, leverage best-in-class services for infrastructure concerns.

---

## Risks and Mitigation

| External Dependency | Risk | Probability | Impact | Mitigation |
|---------------------|------|-------------|--------|------------|
| Auth0 outage | Users can't login | Low | High | Cached tokens, read-only mode |
| Stripe outage | Can't process payments | Low | Critical | Queue payments, manual fallback |
| SendGrid outage | Emails not sent | Medium | Low | Queue and retry, non-blocking |
| S3 outage | Images unavailable | Low | Medium | CDN cache, placeholder images |

---

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | [Date] | [Name] | Initial version |

---

**Previous**: [02. Constraints](02_constraints.md) | **Next**: [04. Solution Strategy](04_solution-strategy.md)

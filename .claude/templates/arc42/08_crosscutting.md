# 08. Crosscutting Concepts

**Template ID**: TPL-ARC42-08
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 8 (Crosscutting Concepts)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-08

---

## Security

### Authentication

- **Method**: OAuth 2.0 (Auth0)
- **Tokens**: JWT, 2h TTL, refresh tokens
- **Storage**: HTTP-only cookies (web), secure storage (mobile)

### Authorization

- **Model**: RBAC (Role-Based Access Control)
- **Roles**: Guest, Customer, Admin
- **Implementation**: Middleware checks JWT claims

### Encryption

- **In-Transit**: TLS 1.3
- **At-Rest**: AES-256
- **Secrets**: AWS Secrets Manager

---

## Logging & Observability

### Structured Logging

```json
{
  "timestamp": "2025-11-15T10:30:00Z",
  "level": "info",
  "message": "Order created",
  "orderId": "ORD-001",
  "userId": "USR-123",
  "correlationId": "abc-def-ghi"
}
```

### Log Levels

- **ERROR**: System errors (500s)
- **WARN**: Business errors (400s), degraded performance
- **INFO**: Important business events
- **DEBUG**: Detailed execution (dev only)

### Correlation

- **X-Request-ID**: Trace requests across services
- **Propagation**: Pass in all internal calls

---

## Error Handling

### Error Response Format (RFC 7807)

```json
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Failed",
  "status": 400,
  "detail": "Email format is invalid",
  "instance": "/users",
  "invalid_fields": [{ "field": "email", "reason": "Invalid format" }]
}
```

### Error Codes

- **AUTH_001**: Invalid credentials
- **AUTH_002**: Token expired
- **PRODUCT_001**: Product not found
- **CART_001**: Cart empty
- **PAYMENT_001**: Payment failed

---

## Data Validation

### Input Validation

- **Library**: Joi (Node.js)
- **Validation**: All API inputs
- **Fail-fast**: Return 400 immediately

### Example

```typescript
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
```

---

## Transaction Management

### Database Transactions

- **Level**: Read Committed
- **Scope**: Use cases (application layer)
- **Rollback**: On any error

### Distributed Transactions

- **Pattern**: Saga (choreography)
- **Compensation**: Compensating transactions
- **Example**: Order → Payment (if payment fails, cancel order)

---

## Caching Strategy

### Layers

1. **CDN**: Static assets (CloudFront, 24h)
2. **Application**: API responses (Redis, 5min)
3. **Database**: Query results (Redis, 1h)

### Cache Invalidation

- **TTL**: Time-based expiration
- **Events**: Explicit invalidation on updates

---

## Internationalization (i18n)

### Supported Languages

- English (en-US) - Default
- Portuguese (pt-BR)
- Spanish (es-ES)

### Implementation

- **Library**: i18next
- **Format**: JSON files per language
- **Detection**: Accept-Language header

---

## Testing Strategy

### Test Pyramid

```
        /  \
       /E2E \      10% - End-to-end (critical paths)
      /------\
     /Integr. \    20% - Integration (API, DB)
    /----------\
   /   Unit     \  70% - Unit (business logic)
  /--------------\
```

### Coverage Requirements

- **Unit**: 80% minimum
- **Integration**: Critical paths
- **E2E**: Happy paths

---

**Previous**: [07. Deployment](07_deployment.md) | **Next**: [09. Decisions](09_decisions.md)

# Component: [Component Name]

**Template ID**: TPL-C4-003
**ID**: CMP-[XXX]
**Version**: 2.0.0
**Category**: C4 Model
**Level**: C4 Level 3 (Component)
**Type**: Component (C4 Level 3)
**Container**: [CNT-XXX] [Container Name]
**Status**: [Draft | Active | Deprecated]
**Used By**: analyst (Phase 3: Specification), architect (Phase 2: Design)
**Last Updated**: 2025-11-17

---

## Overview

**Name**: [Component Name]

**Purpose**: [One-line description of what this component does]

**Example**:
> Authentication Service that handles user login, token generation, and authorization checks.

---

## Responsibilities

List the main responsibilities of this component:

1. **[Responsibility 1]**: [Description]
2. **[Responsibility 2]**: [Description]
3. **[Responsibility 3]**: [Description]

**Example**:
1. **User Login**: Validate credentials against Auth0
2. **Token Generation**: Issue JWT tokens with appropriate claims
3. **Authorization**: Check user permissions for protected resources
4. **Token Refresh**: Handle token refresh flow

---

## Technology

**Language**: [Programming language]

**Framework/Library**: [Framework]

**Pattern**: [Design pattern]

**Example**:
- **Language**: TypeScript
- **Framework**: None (pure Node.js)
- **Pattern**: Layered (Controller → Service → Repository)

---

## Public Interface

### Class/Module Definition

```typescript
// Example interface
interface AuthService {
  login(email: string, password: string): Promise<Result<AuthToken>>;
  refresh(refreshToken: string): Promise<Result<AuthToken>>;
  verify(token: string): Promise<Result<UserClaims>>;
  logout(token: string): Promise<Result<void>>;
}
```

---

### Methods/Functions

#### Method 1: [Name]

**Signature**: `[method signature]`

**Purpose**: [What it does]

**Parameters**:
- `[param1]`: [Type] - [Description]
- `[param2]`: [Type] - [Description]

**Returns**: `[Return type]` - [Description]

**Errors**:
- `[Error1]`: [When it occurs]
- `[Error2]`: [When it occurs]

**Example**:

#### Method: login

**Signature**: `login(email: string, password: string): Promise<Result<AuthToken>>`

**Purpose**: Authenticate user and generate JWT token

**Parameters**:
- `email`: string - User email address
- `password`: string - User password (plain text, will be verified against hash)

**Returns**: `Promise<Result<AuthToken>>` - Success with token OR error

**Errors**:
- `INVALID_CREDENTIALS`: Email or password incorrect
- `ACCOUNT_LOCKED`: Too many failed login attempts
- `ACCOUNT_DISABLED`: User account is disabled

**Behavior**:
```gherkin
Given user exists with email "user@example.com"
And password is "SecurePass123"
When login(email, password) is called
Then verify credentials with Auth0
And generate JWT token (2h TTL)
And return success with token
```

---

#### Method 2: refresh

**Signature**: `refresh(refreshToken: string): Promise<Result<AuthToken>>`

**Purpose**: Exchange refresh token for new access token

**Parameters**:
- `refreshToken`: string - Valid refresh token

**Returns**: New access token OR error

**Errors**:
- `INVALID_REFRESH_TOKEN`: Token is invalid or expired
- `REFRESH_TOKEN_REVOKED`: Token has been revoked

---

#### Method 3: verify

**Signature**: `verify(token: string): Promise<Result<UserClaims>>`

**Purpose**: Verify JWT token and extract claims

**Parameters**:
- `token`: string - JWT token to verify

**Returns**: User claims (userId, email, roles) OR error

**Errors**:
- `TOKEN_EXPIRED`: Token has expired
- `INVALID_TOKEN`: Token signature is invalid

---

#### Method 4: logout

**Signature**: `logout(token: string): Promise<Result<void>>`

**Purpose**: Revoke token (add to blacklist)

**Parameters**:
- `token`: string - Token to revoke

**Returns**: Success OR error

**Errors**:
- `TOKEN_ALREADY_REVOKED`: Token is already revoked

---

## Dependencies

### Internal Dependencies

List other components this component depends on:

| Component ID | Name | Usage |
|--------------|------|-------|
| [CMP-XXX] | [Name] | [How it's used] |

**Example**:

| Component ID | Name | Usage |
|--------------|------|-------|
| CMP-010 | User Repository | Fetch user data from database |
| CMP-011 | Cache Service | Cache tokens to reduce Auth0 calls |

---

### External Dependencies

List external services/libraries this component depends on:

| Dependency | Purpose | Version |
|------------|---------|---------|
| [Name] | [Purpose] | [Version] |

**Example**:

| Dependency | Purpose | Version |
|------------|---------|---------|
| Auth0 SDK | OAuth 2.0 integration | ^3.0.0 |
| jsonwebtoken | JWT generation/verification | ^9.0.0 |
| bcrypt | Password hashing | ^5.1.0 |

---

## Data Structures

### Input/Output Types

```typescript
// Example types
interface LoginRequest {
  email: string;      // Format: email, max 255 chars
  password: string;   // Min 8 chars
}

interface AuthToken {
  accessToken: string;   // JWT token
  refreshToken: string;  // Refresh token
  expiresIn: number;     // Seconds until expiration (7200)
  tokenType: "Bearer";
}

interface UserClaims {
  userId: string;     // UUID
  email: string;
  roles: string[];    // ["customer"] | ["admin"]
  iat: number;        // Issued at (Unix timestamp)
  exp: number;        // Expires at (Unix timestamp)
}
```

---

## Error Handling

### Error Codes

| Code | Description | HTTP Status | Recovery |
|------|-------------|-------------|----------|
| [CODE] | [Description] | [Status] | [Strategy] |

**Example**:

| Code | Description | HTTP Status | Recovery |
|------|-------------|-------------|----------|
| AUTH_001 | Invalid credentials | 401 | Retry with correct credentials |
| AUTH_002 | Token expired | 401 | Refresh token |
| AUTH_003 | Account locked | 403 | Contact support OR wait 1 hour |
| AUTH_004 | Invalid refresh token | 401 | Re-authenticate |

---

## Business Logic

### Business Rules

1. **[Rule 1]**: [Description]
2. **[Rule 2]**: [Description]

**Example**:
1. **Password Requirements**: Min 8 chars, 1 uppercase, 1 number, 1 special char
2. **Token Expiration**: Access tokens expire after 2 hours
3. **Account Lockout**: Lock account after 5 failed login attempts within 15 minutes
4. **Refresh Token**: Valid for 30 days, can only be used once

---

### Validation Rules

```typescript
// Example validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).required()
});
```

---

## State Management

**Stateless**: [Yes/No]

**If stateful**:
- State storage: [Where state is stored]
- State lifecycle: [When created/destroyed]

**Example**:
**Stateless**: Yes (JWT tokens are self-contained)

**Exception**: Token blacklist (revoked tokens) stored in Redis with TTL

---

## Performance

### Caching Strategy

| Data | Cache | TTL | Invalidation |
|------|-------|-----|--------------|
| [What] | [Where] | [Duration] | [When] |

**Example**:

| Data | Cache | TTL | Invalidation |
|------|-------|-----|--------------|
| User claims | Redis | 2 hours | Token expiration |
| Auth0 public keys | Memory | 24 hours | Manual or TTL |
| Revoked tokens | Redis | Token TTL | Automatic (TTL) |

---

### Performance Targets

- **Response Time**: p95 < [X]ms
- **Throughput**: [X] operations/s

**Example**:
- **Response Time**: p95 < 50ms (verify), p95 < 200ms (login)
- **Throughput**: 1,000 verifications/s, 100 logins/s

---

## Security

### Authentication

How this component authenticates:
- [Method]

### Authorization

How this component authorizes:
- [Method]

### Data Protection

- **Sensitive Data**: [What data is sensitive]
- **Protection**: [How it's protected]

**Example**:

### Authentication
- Calls Auth0 API with client credentials
- Verifies JWT signature using Auth0 public keys

### Authorization
- Checks JWT claims for required roles
- Example: Admin endpoints require `roles: ["admin"]`

### Data Protection
- **Sensitive Data**: Passwords, tokens, user emails
- **Protection**:
  - Passwords: Never stored (Auth0 handles)
  - Tokens: HTTP-only cookies (web), secure storage (mobile)
  - Emails: Encrypted at rest (database-level)
  - Logs: Redact sensitive fields

---

## Testing

### Unit Tests

**Coverage**: [X]%

**Key Test Cases**:
1. [Test case 1]
2. [Test case 2]

**Example**:

**Coverage**: 90%

**Key Test Cases**:
1. Login with valid credentials → success with token
2. Login with invalid password → AUTH_001 error
3. Login with locked account → AUTH_003 error
4. Verify valid token → success with claims
5. Verify expired token → AUTH_002 error
6. Refresh with valid token → success with new token
7. Refresh with revoked token → AUTH_004 error

---

### Integration Tests

**Scope**: [What is tested]

**Example**:
- Login flow end-to-end (including Auth0 call)
- Token verification against Auth0 public keys
- Token refresh flow
- Account lockout after 5 failed attempts

---

### Mocking Strategy

**Mocked Dependencies**:
- [Dependency 1]: [Mock strategy]

**Example**:
- **Auth0 API**: Mocked with test doubles (return pre-defined responses)
- **Redis**: Use in-memory Redis instance for tests
- **Database**: Use test database with fixtures

---

## Configuration

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| [PARAM] | [Type] | [Yes/No] | [Value] | [Description] |

**Example**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| AUTH0_DOMAIN | string | Yes | - | Auth0 tenant domain |
| AUTH0_CLIENT_ID | string | Yes | - | Auth0 application client ID |
| AUTH0_CLIENT_SECRET | string | Yes | - | Auth0 application secret |
| JWT_SECRET | string | Yes | - | Secret for JWT signing (if self-signed) |
| TOKEN_EXPIRATION | number | No | 7200 | Access token expiration (seconds) |
| REFRESH_TOKEN_EXPIRATION | number | No | 2592000 | Refresh token expiration (30 days) |
| MAX_LOGIN_ATTEMPTS | number | No | 5 | Max failed logins before lockout |
| LOCKOUT_DURATION | number | No | 3600 | Account lockout duration (seconds) |

---

## Observability

### Logs

**Key Events to Log**:
- [Event 1]: [Log level]
- [Event 2]: [Log level]

**Example**:
- User login success: INFO `{"event": "login_success", "userId": "USR-123"}`
- User login failed: WARN `{"event": "login_failed", "email": "user@example.com", "reason": "invalid_password"}`
- Account locked: ERROR `{"event": "account_locked", "email": "user@example.com"}`
- Token verified: DEBUG `{"event": "token_verified", "userId": "USR-123"}`

---

### Metrics

**Key Metrics**:
- [Metric 1]: [Description]
- [Metric 2]: [Description]

**Example**:
- `auth.login.success`: Counter (successful logins)
- `auth.login.failed`: Counter (failed logins by reason)
- `auth.token.verified`: Counter (token verifications)
- `auth.token.expired`: Counter (expired token attempts)
- `auth.lockout`: Counter (account lockouts)
- `auth.login.duration`: Histogram (login latency)

---

## Code Structure

### File Organization

```
src/components/auth/
├── index.ts                # Public exports
├── auth.service.ts         # Main service
├── auth.controller.ts      # HTTP controllers
├── auth.types.ts           # TypeScript types
├── auth.validator.ts       # Input validation
├── auth.errors.ts          # Custom errors
├── auth.test.ts            # Unit tests
└── auth.integration.test.ts # Integration tests
```

---

### Key Classes/Functions

```typescript
// Example structure
export class AuthService {
  constructor(
    private auth0Client: Auth0Client,
    private userRepository: UserRepository,
    private cache: CacheService
  ) {}

  async login(email: string, password: string): Promise<Result<AuthToken>> {
    // Implementation
  }

  async refresh(refreshToken: string): Promise<Result<AuthToken>> {
    // Implementation
  }

  async verify(token: string): Promise<Result<UserClaims>> {
    // Implementation
  }

  async logout(token: string): Promise<Result<void>> {
    // Implementation
  }

  private async checkLockout(email: string): Promise<boolean> {
    // Check if account is locked
  }

  private async incrementFailedAttempts(email: string): Promise<void> {
    // Increment failed login counter
  }
}
```

---

## Migration Notes

### Breaking Changes

- [Version X → Y]: [Description]

**Example**:
- **v1.0 → v2.0**: Changed token format from opaque to JWT
  - Migration: Invalidate all v1.0 tokens, users must re-authenticate

---

## Related Documents

- [Container: API Server](../containers/CNT-001_api-server.md)
- [Scenario: User Login](../../arc42/06_runtime/scenarios/SCN-001_login.md)
- [ADR: Use Auth0](../../arc42/09_decisions/adr/ADR-003_use-auth0.md)

---

## Related Templates

### Prerequisites
- **container.md** (TPL-C4-002) - Parent container must be defined first
- **system-context.md** (TPL-C4-001) - System context provides overall structure

### Follows This Template
- None (C4 Level 3 is typically the lowest level, C4 Level 4 is optional code-level)

### Part Of
- **arc42/05_building-blocks.md** (TPL-ARC42-05) - Arc42 Chapter 5: Building Blocks (detailed view)

### See Also
- **bdd/scenario.md** (TPL-BDD-001) - BDD scenarios map to component behavior
- **arc42/06_runtime.md** (TPL-ARC42-06) - Runtime view shows component interactions
- **tasks.md** (TPL-WORKFLOW-003) - Implementation tasks decomposed from components

---

## Workflow Integration

**Phase**: 2 (Architecture) or 3 (Specification)

**Primary Skill**:
- **analyst** - Creates as part of spec.md (Phase 3)
- **architect** - Creates as part of design.md for HIGH complexity (Phase 2)

**Output Location**:
- `changes/[change-id]/design.md` (if Phase 2)
- `specs/05_building-blocks/components/CMP-*.md` (if Phase 3)

**Prerequisites**:
- Container diagram created (C4 Level 2)
- Component responsibilities identified

**Next Steps**:
- Define BDD scenarios for component behavior
- Create task decomposition (orchestrator → tasks.md)
- Implement components (developer)

---

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2025-11-17 | Template Standardization | Added Template ID, Related Templates, Workflow Integration |
| 1.0.0 | [Date] | [Name] | Initial version |

---

**Parent**: [CNT-XXX] [Container Name]
**Type**: Component (C4 Level 3)

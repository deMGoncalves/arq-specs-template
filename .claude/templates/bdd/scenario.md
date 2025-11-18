# Scenario: [Scenario Name]

**Template ID**: TPL-BDD-001
**Version**: 2.0.0
**Category**: BDD
**Used By**: analyst (Phase 3: Specification - Runtime scenarios)
**Last Updated**: 2025-11-17

---

**ID**: SCN-[XXX]
**Feature**: [Feature Name]
**Priority**: [Critical | High | Medium | Low]
**Status**: [Draft | Implemented | Tested | Deprecated]
**Last Updated**: [YYYY-MM-DD]

---

## Feature Description

**Feature**: [Feature name]

**As a** [role]
**I want** [capability]
**So that** [benefit]

**Example**:

**Feature**: User Login

**As a** registered customer
**I want** to log in to my account
**So that** I can access my order history and saved preferences

---

## Scenarios

### Scenario 1: [Happy Path]

```gherkin
Scenario: [Scenario name]
  Given [initial context]
  And [additional context]
  When [action]
  Then [expected outcome]
  And [additional outcome]
```

**Example**:

```gherkin
Scenario: Successful login with valid credentials
  Given user exists with email "user@example.com"
  And password is "SecurePass123"
  And account is not locked
  When user submits login form
  Then user is authenticated
  And JWT token is issued with 2-hour expiration
  And user sees dashboard
  And login success event is logged
```

---

### Scenario 2: [Error Case 1]

```gherkin
Scenario: [Scenario name]
  Given [initial context]
  When [action]
  Then [expected error]
  And [side effects]
```

**Example**:

```gherkin
Scenario: Login fails with invalid password
  Given user exists with email "user@example.com"
  And password is incorrect
  When user submits login form
  Then login fails with error "Invalid credentials"
  And user remains unauthenticated
  And failed login attempt is logged
  And failed attempt counter is incremented
```

---

### Scenario 3: [Error Case 2]

**Example**:

```gherkin
Scenario: Login is blocked when account is locked
  Given user exists with email "user@example.com"
  And account has 5 failed login attempts
  And account is locked until 10:00 AM
  And current time is 9:30 AM
  When user submits login form with valid password
  Then login fails with error "Account temporarily locked"
  And user sees message "Try again after 10:00 AM"
  And lockout event is logged
```

---

### Scenario 4: [Edge Case 1]

**Example**:

```gherkin
Scenario: Login unlocks account after lockout period expires
  Given user account was locked at 9:00 AM (1 hour lockout)
  And current time is 10:05 AM (lockout expired)
  And user provides valid credentials
  When user submits login form
  Then account is unlocked automatically
  And user is authenticated successfully
  And failed attempt counter is reset to 0
```

---

### Scenario 5: [Edge Case 2]

**Example**:

```gherkin
Scenario: Login with email in different case
  Given user exists with email "user@example.com"
  And user provides email "USER@EXAMPLE.COM" (uppercase)
  And password is correct
  When user submits login form
  Then email is normalized to lowercase
  And user is authenticated successfully
```

---

## Scenario Outline (Data-Driven)

For scenarios with multiple input combinations:

```gherkin
Scenario Outline: [Scenario name]
  Given [context with <placeholder>]
  When [action with <placeholder>]
  Then [outcome with <placeholder>]

Examples:
  | placeholder1 | placeholder2 | expected_result |
  | value1       | value2       | result1         |
  | value3       | value4       | result2         |
```

**Example**:

```gherkin
Scenario Outline: Login validation errors
  Given user provides email "<email>"
  And user provides password "<password>"
  When user submits login form
  Then validation fails with error "<error>"

Examples:
  | email              | password      | error                          |
  | invalid-email      | SecurePass123 | Invalid email format           |
  | user@example.com   | short         | Password must be at least 8 chars |
  | user@example.com   |               | Password is required           |
  |                    | SecurePass123 | Email is required              |
```

---

## Background (Common Setup)

If multiple scenarios share the same setup:

```gherkin
Background:
  Given [common setup]
  And [common setup]

Scenario: [Scenario 1]
  When [action]
  Then [outcome]

Scenario: [Scenario 2]
  When [different action]
  Then [different outcome]
```

**Example**:

```gherkin
Background:
  Given database is seeded with test users
  And authentication service is running
  And rate limiter is configured to 100 req/hour

Scenario: Successful login
  When user submits valid credentials
  Then user is authenticated

Scenario: Failed login
  When user submits invalid credentials
  Then login fails
```

---

## API Contract (Technical Details)

### Endpoint

**Method**: [HTTP method]
**Path**: [URL path]
**Authentication**: [Required/Optional]

**Example**:

**Method**: POST
**Path**: `/api/v1/auth/login`
**Authentication**: Not required (public endpoint)

---

### Request

```json
{
  "field1": "type (constraints)",
  "field2": "type (constraints)"
}
```

**Example**:

```json
{
  "email": "string (format: email, max 255 characters)",
  "password": "string (min 8 characters)"
}
```

**Validation Rules**:
- `email`: Required, valid email format, max 255 chars
- `password`: Required, min 8 chars

---

### Response (Success)

**Status**: [HTTP status code]

```json
{
  "field1": "type",
  "field2": "type"
}
```

**Example**:

**Status**: 200 OK

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 7200,
  "tokenType": "Bearer"
}
```

---

### Response (Errors)

| Status | Error Code | Description | Example |
|--------|------------|-------------|---------|
| [Code] | [ERR_CODE] | [Description] | [Example message] |

**Example**:

| Status | Error Code | Description | Example |
|--------|------------|-------------|---------|
| 400 | VALIDATION_ERROR | Invalid input | "Email format is invalid" |
| 401 | INVALID_CREDENTIALS | Wrong email/password | "Invalid credentials" |
| 403 | ACCOUNT_LOCKED | Too many failed attempts | "Account temporarily locked" |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests | "Try again in 30 minutes" |
| 500 | INTERNAL_ERROR | Server error | "An error occurred. Try again later" |

**Error Response Format** (RFC 7807):

```json
{
  "type": "https://api.example.com/errors/invalid-credentials",
  "title": "Invalid Credentials",
  "status": 401,
  "detail": "The email or password provided is incorrect",
  "instance": "/api/v1/auth/login"
}
```

---

## Side Effects

Document all side effects of this feature:

### State Changes

| What | Before | After |
|------|--------|-------|
| [Entity] | [State] | [State] |

**Example**:

| What | Before | After |
|------|--------|-------|
| User session | Not logged in | Logged in (JWT issued) |
| Failed login counter | N | N+1 (if failed) OR 0 (if success) |
| Account status | Active | Locked (after 5 failed attempts) |

---

### Events Published

| Event Name | When | Payload |
|------------|------|---------|
| [event.name] | [Condition] | [Data] |

**Example**:

| Event Name | When | Payload |
|------------|------|---------|
| `user.login.success` | Successful login | `{userId, email, timestamp, ip}` |
| `user.login.failed` | Failed login | `{email, reason, timestamp, ip}` |
| `user.account.locked` | Account locked | `{userId, email, unlockAt, timestamp}` |

---

### External Calls

| Service | Call | When |
|---------|------|------|
| [Service] | [Action] | [Condition] |

**Example**:

| Service | Call | When |
|---------|------|------|
| Auth0 | Verify credentials | Every login attempt |
| Redis | Increment counter | Failed login |
| Redis | Set lockout | 5 failed attempts |
| SendGrid | Send alert email | Account locked |
| Analytics | Track event | Successful login |

---

### Database Changes

| Table | Operation | When |
|-------|-----------|------|
| [table] | [INSERT/UPDATE/DELETE] | [Condition] |

**Example**:

| Table | Operation | When |
|-------|-----------|------|
| login_attempts | INSERT | Every login attempt |
| users | UPDATE (last_login_at) | Successful login |
| audit_log | INSERT | Every login attempt |

---

## Performance

### Expected Performance

- **Response Time**: p95 < [X]ms, p99 < [Y]ms
- **Throughput**: [X] req/s
- **Concurrent Users**: [X]

**Example**:
- **Response Time**: p95 < 200ms, p99 < 500ms
- **Throughput**: 100 logins/s
- **Concurrent Users**: 1,000

---

### Load Testing

**Scenario**: [Description]
**Expected**: [Behavior under load]

**Example**:

**Scenario**: 1,000 concurrent logins (sustained for 5 minutes)
**Expected**:
- All requests complete successfully
- p95 < 300ms (degraded but acceptable)
- No rate limit errors for valid users
- Database connections remain < 100

---

## Security

### Authentication

- [Security measure 1]
- [Security measure 2]

**Example**:
- Password transmitted over HTTPS only (TLS 1.3)
- Password never logged or stored in plain text
- Failed attempts logged with IP for abuse detection

---

### Authorization

- [Authorization rule 1]
- [Authorization rule 2]

**Example**:
- N/A (public endpoint, but creates authenticated session)

---

### Vulnerabilities Mitigated

| Vulnerability | Mitigation |
|---------------|------------|
| [OWASP category] | [How mitigated] |

**Example**:

| Vulnerability | Mitigation |
|---------------|------------|
| Brute force | Account lockout after 5 attempts |
| Credential stuffing | Rate limiting (100 req/hour per IP) |
| Timing attacks | Constant-time password comparison |
| Session fixation | Generate new session ID on login |

---

## Testing

### Unit Tests

Key test cases:
- [ ] Valid credentials → success
- [ ] Invalid password → error
- [ ] Invalid email format → validation error
- [ ] Missing fields → validation error
- [ ] Account locked → error
- [ ] Lockout expires → success

---

### Integration Tests

- [ ] End-to-end login flow (API → Auth0 → Database → Response)
- [ ] Account lockout after 5 failed attempts
- [ ] Lockout expires after 1 hour
- [ ] Failed counter resets after successful login

---

### E2E Tests (UI)

- [ ] User can log in via web form
- [ ] Error messages display correctly
- [ ] Locked account shows appropriate message
- [ ] Dashboard loads after successful login

---

## Acceptance Criteria

This scenario is accepted when:

- [ ] All scenarios pass (happy path + error cases + edge cases)
- [ ] Unit tests: 100% coverage for login logic
- [ ] Integration tests pass
- [ ] E2E tests pass (critical paths)
- [ ] Performance: p95 < 200ms
- [ ] Security: No vulnerabilities found
- [ ] Documentation: API docs updated
- [ ] Code review: Approved by 2 developers

---

## Related Documents

- [Component: Auth Service](../../05_building-blocks/components/CMP-001_auth-service.md)
- [ADR: Use Auth0](../09_decisions/adr/ADR-003_use-auth0.md)
- [Quality: Security Requirements](../../10_quality.md)

---

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2025-11-17 | Template Standardization | Added Template ID, Related Templates, Workflow Integration |
| 1.0.0 | [Date] | [Name] | Initial version |

---

## Related Templates

### Prerequisites
- **arc42/01_introduction.md** (TPL-ARC42-01) - Feature context and requirements
- **arc42/03_context.md** (TPL-ARC42-03) - System boundaries and external systems

### Part Of
- **arc42/06_runtime.md** (TPL-ARC42-06) - Arc42 Chapter 6: Runtime View

### Follows This Template
- **tasks.md** (TPL-WORKFLOW-003) - Orchestrator decomposes scenarios into tasks
- **component.md** (TPL-C4-003) - Components implement scenario behavior

### See Also
- **c4/component.md** (TPL-C4-003) - Components involved in scenario
- **adr/decision.md** (TPL-ADR-001) - Architecture decisions affecting behavior
- **arc42/10_quality.md** (TPL-ARC42-10) - Quality scenarios

---

## Workflow Integration

**Phase**: 3 (Specification)

**Primary Skill**: analyst

**Part Of**: Complete spec.md document (Arc42 Chapter 6: Runtime View)

**Output Location**: `specs/06_runtime/scenarios/SCN-*.md`

**Prerequisites**:
- System context defined (C4 Level 1)
- Components identified (C4 Level 3)
- Business requirements understood (Arc42 Chapter 1)

**Purpose**:
- Define system behavior from user perspective
- Provide testable acceptance criteria
- Map features to implementation tasks
- Enable BDD (Behavior-Driven Development)

**Next Steps**:
1. **Orchestrator decomposes** - Scenarios → Atomic tasks (Phase 3.5)
2. **Developer implements** - TDD based on scenarios (Phase 4)
3. **Tester validates** - Scenarios become test cases (Phase 5)

---

**Parent**: [06. Runtime View](../../arc42/06_runtime.md)
**Type**: BDD Scenario (Behavior Specification)

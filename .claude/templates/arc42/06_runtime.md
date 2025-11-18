# 06. Runtime View

**Template ID**: TPL-ARC42-06
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 6 (Runtime View)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-06

This chapter documents **runtime behavior** using **BDD scenarios** (Given-When-Then).

Use separate files for each scenario:
- `specs/06_runtime/scenarios/SCN-001_[name].md`

See template: [BDD Scenario Template](../../bdd/scenario.md)

---

## Scenario List

| ID | Name | Priority | Status |
|----|------|----------|--------|
| SCN-001 | User Login | Critical | ✅ Implemented |
| SCN-002 | Product Search | High | ✅ Implemented |
| SCN-003 | Checkout Flow | Critical | 🚧 In Progress |
| SCN-004 | Order Tracking | Medium | ⏸️ Planned |

**Details**: See `specs/06_runtime/scenarios/SCN-*`

---

## Example Scenario (Inline)

### SCN-001: User Login

```gherkin
Feature: User Login

Scenario: Successful login with valid credentials
  Given user exists with email "user@example.com"
  And password is "SecurePass123"
  When user submits login form
  Then user is authenticated
  And JWT token is issued
  And user sees dashboard
  And session expires after 2 hours

Scenario: Login fails with invalid password
  Given user exists with email "user@example.com"
  And password is incorrect
  When user submits login form
  Then login fails
  And user sees error "Invalid credentials"
  And failed attempt is logged
  And account locks after 5 failed attempts
```

---

## Sequence Diagrams

### Checkout Flow

```
Customer     API      Auth0    Stripe   SendGrid   Database
   │          │         │        │         │          │
   │ Checkout │         │        │         │          │
   ├─────────>│         │        │         │          │
   │          │ Verify  │        │         │          │
   │          ├────────>│        │         │          │
   │          │<────────┤        │         │          │
   │          │         │        │         │          │
   │          │ Create Payment   │         │          │
   │          ├─────────────────>│         │          │
   │          │<─────────────────┤         │          │
   │          │         │        │         │          │
   │ Pay      │         │        │         │          │
   ├──────────┴─────────┴───────>│         │          │
   │          │         │ Webhook│         │          │
   │          │<─────────────────┤         │          │
   │          │         │        │         │          │
   │          │ Save Order       │         │          │
   │          ├─────────────────────────────────────>│
   │          │         │        │         │          │
   │          │ Send Email       │         │          │
   │          ├─────────────────────────>│            │
   │<─────────┤         │        │         │          │
   │ Success  │         │        │         │          │
```

---

**Previous**: [05. Building Blocks](05_building-blocks.md) | **Next**: [07. Deployment](07_deployment.md)

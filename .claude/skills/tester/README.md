# Tester Skill - Documentation

**🧪 The Test Validator**

Responsible for validating test quality, coverage, and correctness during the review phase.

---

## 📁 Files in This Skill

```
tester/
├── SKILL.md         # Tester agent instructions
└── README.md        # This file - documentation for humans
```

---

## 🎯 Purpose

The Tester skill is responsible for **Phase 5: Testing Validation** (alongside reviewer), ensuring:

- **Test Coverage**: ≥80% coverage for new/modified code
- **Test Quality**: Tests follow BDD scenarios and test the right things
- **Test Correctness**: All tests pass and are deterministic
- **Edge Cases**: Edge cases and error scenarios are covered
- **Integration Tests**: Integration tests verify complete flows

**When to Use:**
- ✅ After developer completes implementation
- ✅ Alongside reviewer in Phase 5
- ✅ Before documentation phase
- ✅ When test quality is questionable

**When NOT to Use:**
- ❌ Before implementation is complete
- ❌ Before developer has written tests
- ❌ During active development (let developer finish first)

---

## 🔗 Workflow Position

```
Phase 4: Implementation
    developer (implements code + tests)
        ↓
Phase 5: Review
    reviewer (reviews code quality)
    +
    tester (validates test quality) ← YOU ARE HERE
        ↓
Phase 6: Documentation
    documenter (updates docs)
```

---

## 📖 Quick Start

### Invocation

After developer completes implementation, invoke the Tester:
```
@skill tester
```

Or as part of Phase 5 review:
```
@skill reviewer  # Invokes tester automatically
```

### Inputs Required

1. `changes/[change-id]/tasks.md` - Task completion status
2. `changes/[change-id]/spec.md` - BDD scenarios to verify
3. Implemented code files
4. Implemented test files

### Outputs Produced

1. **Test quality report**
2. **Coverage analysis**
3. **Missing test cases** (if any)
4. **Test improvement suggestions** (if needed)
5. **Approval or request for fixes**

---

## 🔄 Related Skills

### Prerequisites (must complete before):
- **developer** - Implements code and tests

### Works with (parallel/collaborative):
- **reviewer** - Reviews code quality (Phase 5)
- **tester** works alongside reviewer

### Follows this skill (typical flow):
- **documenter** - Updates documentation (Phase 6)

---

## 📊 Test Validation Checklist

### 1. BDD Scenario Coverage

Verify each BDD scenario from `spec.md` has corresponding tests:

```markdown
✅ Scenario 1: Register user with valid email
   → Test: "should create user with valid email"

✅ Scenario 2: Reject invalid email (no @)
   → Test: "should throw EmailInvalidoError for email without @"

✅ Scenario 3: Reject invalid email (missing domain)
   → Test: "should throw EmailInvalidoError for email without domain"

✅ Scenario 4: Reject invalid email (missing username)
   → Test: "should throw EmailInvalidoError for email without username"

✅ Scenario 5: Normalize email to lowercase
   → Test: "should normalize email to lowercase"
```

**Checklist:**
- [ ] Every BDD scenario has ≥1 corresponding test
- [ ] Test names clearly reference scenarios
- [ ] Tests follow GIVEN-WHEN-THEN structure

### 2. Test Coverage

Run coverage analysis:

```bash
npm run coverage  # or equivalent for your project
```

**Checklist:**
- [ ] Line coverage ≥80%
- [ ] Branch coverage ≥75%
- [ ] Function coverage ≥90%
- [ ] New/modified code has ≥80% coverage

### 3. Test Quality

#### Unit Tests
- [ ] Test one thing per test
- [ ] No dependencies on external services (mocked/stubbed)
- [ ] Fast execution (<100ms per test)
- [ ] Deterministic (same input = same output always)
- [ ] Clear test names (describe what is tested)
- [ ] Use AAA pattern (Arrange-Act-Assert)

#### Integration Tests
- [ ] Test complete flows (end-to-end within boundary)
- [ ] Verify interactions between components
- [ ] Use realistic test data
- [ ] Clean up after tests (no side effects)
- [ ] Test both happy path and error cases

### 4. Edge Cases

Verify edge cases are tested:
- [ ] Empty inputs
- [ ] Null/undefined inputs
- [ ] Boundary values (min, max)
- [ ] Special characters
- [ ] Whitespace handling
- [ ] Case sensitivity

### 5. Error Scenarios

Verify error scenarios are tested:
- [ ] Each error type has dedicated test
- [ ] Error messages are verified (not just error type)
- [ ] Errors are thrown at correct layer
- [ ] No partial state after error (atomicity)

### 6. Test Organization

- [ ] Tests are organized by component/feature
- [ ] Test file names match source file names (`Email.ts` → `Email.spec.ts`)
- [ ] Describe blocks group related tests
- [ ] Tests are readable (clear setup, clear assertions)

---

## ✅ Success Criteria

Tests are considered complete when:

- [ ] All BDD scenarios have corresponding tests
- [ ] Coverage ≥80% for new/modified code
- [ ] All tests pass (green)
- [ ] No flaky tests (run suite 3x, all pass)
- [ ] Edge cases covered
- [ ] Error scenarios covered
- [ ] Tests are fast (<5 seconds for unit tests)
- [ ] Tests are deterministic
- [ ] Tester approves test quality

---

## 🎓 Testing Principles

### 1. Test Behavior, Not Implementation
```typescript
// ❌ BAD: Tests implementation details
it('should call normalize() method', () => {
  const spy = jest.spyOn(email, 'normalize');
  email.valor;
  expect(spy).toHaveBeenCalled();
});

// ✅ GOOD: Tests behavior
it('should return lowercase email', () => {
  const email = new Email('User@Example.COM');
  expect(email.valor).toBe('user@example.com');
});
```

### 2. One Assertion per Test (When Possible)
```typescript
// ❌ BAD: Multiple unrelated assertions
it('should create user', () => {
  const user = criarUsuario(input);
  expect(user.nome).toBe('João');
  expect(user.email).toBe('joao@example.com');
  expect(user.senha).toBeDefined();
  expect(eventos).toHaveLength(1);
});

// ✅ GOOD: Focused assertions
describe('criar-usuario', () => {
  it('should create user with correct name', () => {
    const result = criarUsuario(input);
    expect(result.usuario.nome.valor).toBe('João Silva');
  });

  it('should create user with normalized email', () => {
    const result = criarUsuario(input);
    expect(result.usuario.email.valor).toBe('joao@example.com');
  });

  it('should generate UsuarioCriado event', () => {
    const result = criarUsuario(input);
    expect(result.eventos).toHaveLength(1);
    expect(result.eventos[0]).toBeInstanceOf(UsuarioCriado);
  });
});
```

### 3. AAA Pattern (Arrange-Act-Assert)
```typescript
it('should normalize email to lowercase', () => {
  // Arrange
  const input = 'User@Example.COM';

  // Act
  const email = new Email(input);

  // Assert
  expect(email.valor).toBe('user@example.com');
});
```

### 4. Descriptive Test Names
```typescript
// ❌ BAD: Vague name
it('works', () => { ... });
it('test email', () => { ... });

// ✅ GOOD: Descriptive name
it('should create Email with valid format', () => { ... });
it('should throw EmailInvalidoError for email without @', () => { ... });
it('should normalize email to lowercase', () => { ... });
```

### 5. Test Failures Should Be Obvious
```typescript
// ❌ BAD: Generic assertion
expect(email.isValid()).toBe(true);

// ✅ GOOD: Clear assertion
expect(() => new Email('invalid')).toThrow(EmailInvalidoError);
expect(() => new Email('invalid')).toThrow('Email inválido. Use o formato: usuario@dominio.com');
```

---

## 🚨 Common Test Smells

### ❌ Smell 1: Flaky Tests
Tests that pass sometimes, fail other times.

**Causes:**
- Race conditions (async)
- Random data (Math.random(), Date.now())
- Shared state between tests
- External dependencies (network, filesystem)

**Fix:**
- Mock/stub external dependencies
- Use fixed test data
- Clean state between tests
- Make async explicit (await, done())

### ❌ Smell 2: Slow Tests
Unit test suite takes >5 seconds.

**Causes:**
- Real database calls
- Real network calls
- Sleep/wait statements
- Too many tests in one file

**Fix:**
- Mock databases and external services
- Remove sleeps (use event-driven testing)
- Split tests into smaller files

### ❌ Smell 3: Brittle Tests
Tests break when implementation changes (but behavior doesn't).

**Causes:**
- Testing implementation details
- Too many mocks/spies
- Coupling to internal structure

**Fix:**
- Test behavior, not implementation
- Minimize mocks (only for external dependencies)
- Test through public API

### ❌ Smell 4: Unclear Test Failures
Test fails but error message doesn't explain why.

**Causes:**
- Generic assertions
- No context in test name
- Missing assertion messages

**Fix:**
- Use specific assertions
- Descriptive test names
- Add custom error messages when needed

---

## 📚 Testing Resources

### Test Frameworks
- **Jest** (JavaScript/TypeScript)
- **Vitest** (Vite-based, fast)
- **Mocha + Chai** (Classic)
- **Pytest** (Python)
- **JUnit** (Java)

### Coverage Tools
- **Istanbul/NYC** (JavaScript)
- **c8** (V8 coverage for Node)
- **Coverage.py** (Python)
- **JaCoCo** (Java)

### Testing Best Practices
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles/)
- [Martin Fowler - Testing Strategies](https://martinfowler.com/testing/)
- [Kent Beck - TDD by Example](https://www.oreilly.com/library/view/test-driven-development/0321146530/)

---

## 🔍 Example Review

### Scenario: Email Validation Feature

**Test Files Reviewed:**
- `Email.spec.ts` (unit tests for Email value object)
- `criar-usuario.spec.ts` (integration tests for factory)

**Findings:**

✅ **Good:**
- All 5 BDD scenarios have corresponding tests
- Coverage: 92% (exceeds 80% threshold)
- Tests follow AAA pattern
- Clear test names

⚠️ **Issues Found:**
- Missing edge case: whitespace-only email
- Integration test doesn't verify event payload
- One test is slow (150ms) - possible real DB call?

**Actions Required:**
1. Add test for whitespace-only email
2. Add assertion for event payload in integration test
3. Mock DB call in slow test

**After Fixes:**
✅ All tests pass
✅ Coverage: 94%
✅ All tests <50ms
✅ **APPROVED**

---

**Version**: 2.0.0
**Created**: 2025-11-17
**Last Updated**: 2025-11-17

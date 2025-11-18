# Documenter Skill - Documentation

**📚 The Documentation Maintainer**

Responsible for updating all project documentation after implementation is complete and approved.

---

## 📁 Files in This Skill

```
documenter/
├── SKILL.md                  # Documenter agent instructions
├── README.md                 # This file - documentation for humans
└── CONVENÇÃO-TEMPLATES.md    # Template usage conventions
```

---

## 🎯 Purpose

The Documenter skill is responsible for **Phase 6: Documentation**, ensuring all documentation is updated after implementation:

- **README.md**: Update installation, usage, API reference
- **Code Comments**: Add/update doc comments for public APIs
- **specs/**: Update architectural documentation (using Arc42 templates)
- **Examples**: Create/update usage examples
- **CHANGELOG**: Document changes (if exists)

**When to Use:**
- ✅ After code review approved (reviewer skill completed)
- ✅ Before final validation (analyst final validation)
- ✅ When implementation changes affect user-facing documentation

**When NOT to Use:**
- ❌ Before implementation is complete
- ❌ Before tests are passing
- ❌ Before code review approval

---

## 🔗 Workflow Position

```
Phase 4: Implementation
    developer (implements code)
        ↓
Phase 5: Review
    reviewer (approves code) + tester (validates tests)
        ↓
Phase 6: Documentation
    documenter ← YOU ARE HERE
        ↓
Phase 7: Final Validation
    analyst (final validation)
        ↓
    guardian (commit/push/release) [optional]
```

---

## 📖 Quick Start

### Invocation

After code review approval, invoke the Documenter:
```
@skill documenter
```

### Inputs Required

1. `changes/[change-id]/tasks.md` - Task completion status
2. `changes/[change-id]/spec.md` - Specification (to understand what was implemented)
3. Implemented code files
4. Reviewer approval confirmation

### Outputs Produced

1. **Updated README.md** (if needed)
2. **Updated doc comments** in code
3. **Updated specs/** (if architectural changes)
4. **Created/updated examples**
5. **Updated CHANGELOG** (if exists)

---

## 🔄 Related Skills

### Prerequisites (must complete before):
- **developer** - Provides implemented code
- **reviewer** - Provides code review approval
- **tester** - Validates tests are passing

### Follows this skill (typical flow):
- **analyst** - Final validation of complete implementation + docs

### Works with (parallel/collaborative):
- None (Documenter works independently in Phase 6)

---

## 📊 Documentation Types

### 1. README.md Updates

Update if:
- [ ] New features added (update Features section)
- [ ] Installation process changed
- [ ] API surface changed (update API reference)
- [ ] Usage examples need updating
- [ ] New troubleshooting scenarios

### 2. Code Comments (Doc Comments)

**IMPORTANT**: Explain "WHY", not "WHAT"

```typescript
// ❌ BAD: Documents the obvious
/// Returns the user ID
get id(): string { return this._id; }

// ✅ GOOD: Explains why/when
/// Returns the immutable user identifier.
/// This ID is generated once at creation and never changes,
/// ensuring referential integrity across the system.
get id(): string { return this._id; }
```

Add doc comments for:
- [ ] All public classes/interfaces
- [ ] All public methods/functions
- [ ] Complex algorithms (explain logic)
- [ ] Non-obvious parameters
- [ ] Error conditions

### 3. specs/ Updates (Arc42)

**CRITICAL**: Always use templates from `.claude/templates/arc42/`

Update specs/ if:
- [ ] New bounded context added
- [ ] Architectural decisions made (ADRs)
- [ ] New cross-cutting concern
- [ ] Integration with external systems
- [ ] Quality requirements changed

**See**: `CONVENÇÃO-TEMPLATES.md` for template usage.

### 4. Examples

Create/update examples in `examples/` if:
- [ ] New feature added
- [ ] API changed
- [ ] Usage pattern changed

**Examples must**:
- [ ] Be executable (run and work)
- [ ] Be self-contained
- [ ] Include comments explaining key points

### 5. CHANGELOG (if exists)

Follow [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## [Unreleased]

### Added
- Email validation in user registration (#123)

### Changed
- Usuario entity now uses Email value object instead of string

### Fixed
- N/A
```

---

## ✅ Success Criteria

Documentation is complete when:

- [ ] All user-facing changes documented in README
- [ ] All public APIs have doc comments
- [ ] specs/ updated if architectural changes
- [ ] Examples created/updated and tested (they run!)
- [ ] CHANGELOG updated (if exists)
- [ ] No broken links in documentation
- [ ] Documentation reviewed by analyst (Phase 7)

---

## 🎓 Documentation Principles

### 1. Write for Humans
Documentation is for humans, not machines. Be clear, concise, friendly.

### 2. Examples Over Prose
One working example > 1000 words of explanation.

### 3. Up-to-Date Always
Outdated documentation is worse than no documentation. Keep it current.

### 4. Link to Source
Link to actual code when possible:
```markdown
See `src/user-management/api/usuario/Email.ts:15` for validation logic.
```

### 5. Use Templates
**ALWAYS** use Arc42 templates from `.claude/templates/arc42/` when updating specs/.

---

## 📚 Template References

### Arc42 Templates
Location: `.claude/templates/arc42/`

- **01_introduction.md** - Goals, stakeholders, constraints
- **02_constraints.md** - Technical and organizational constraints
- **03_context.md** - System boundaries, external interfaces
- **06_runtime.md** - Runtime scenarios (BDD)
- **10_quality.md** - Quality requirements and scenarios

### ADR Templates
Location: `.claude/templates/adr/decision.md`

Use for documenting architectural decisions in specs/.

### BDD Templates
Location: `.claude/templates/bdd/scenario.md`

Use for documenting behavioral scenarios in specs/.

---

## 🔍 Common Updates

### Scenario 1: New Feature Added
```
✅ Update README.md - Features section
✅ Update spec.md - Add new BDD scenarios
✅ Create example in examples/
✅ Update CHANGELOG - [Unreleased] Added
✅ Add doc comments to new public APIs
```

### Scenario 2: API Changed (Breaking)
```
✅ Update README.md - API reference + migration guide
✅ Update spec.md - Document breaking change
✅ Update examples (ensure they still work!)
✅ Update CHANGELOG - [Unreleased] Changed (mark BREAKING)
✅ Update doc comments
```

### Scenario 3: Bug Fix
```
✅ Update CHANGELOG - [Unreleased] Fixed
✅ Update spec.md if behavior changed
✅ Consider adding example demonstrating fix
❌ Usually no README update needed
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Documenting Implementation Details
Don't document HOW code works internally. Document WHAT it does and WHY.

### ❌ Mistake 2: Forgetting to Test Examples
Examples that don't run are misleading. Always test examples!

### ❌ Mistake 3: Ignoring Templates
Don't freestyle Arc42 docs. Use templates from `.claude/templates/arc42/`.

### ❌ Mistake 4: Duplicate Documentation
Don't repeat information. Link to single source of truth.

### ❌ Mistake 5: Technical Jargon
Avoid jargon unless necessary. Write for your audience.

---

**Version**: 2.0.0
**Created**: 2025-11-17
**Last Updated**: 2025-11-17

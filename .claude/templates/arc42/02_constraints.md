# 02. Architecture Constraints

**Template ID**: TPL-ARC42-02
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 2 (Architecture Constraints)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-02
**Status**: [Draft | In Review | Approved]

---

## Overview

This chapter documents constraints that limit the freedom in architectural decisions. Constraints are immovable requirements that must be satisfied.

---

## Technical Constraints

### TC-001: [Constraint Name]

**Category**: [Programming Language | Framework | Platform | Database | Protocol]

**Constraint**: [Description]

**Reason**: [Why this constraint exists]

**Impact**: [How this affects architecture]

**Mitigation**: [How to work within this constraint]

---

### Example: Programming Language

**TC-001: Backend Must Use Node.js**

**Category**: Programming Language

**Constraint**: All backend services must be written in Node.js (TypeScript preferred).

**Reason**:
- Existing team expertise (5 developers with 3+ years Node.js)
- Existing infrastructure optimized for Node.js
- Shared code between frontend and backend (TypeScript)

**Impact**:
- ✅ Fast development (team expertise)
- ✅ NPM ecosystem (large library selection)
- ❌ CPU-intensive tasks less efficient than Go/Rust
- ❌ Memory usage higher than compiled languages

**Mitigation**:
- Use worker threads for CPU-intensive operations
- Offload heavy processing to dedicated services (Python/Go)
- Optimize memory usage (profiling, caching strategies)

---

### TC-002: [Database Constraint]

**Example: Database Must Be PostgreSQL**

**Category**: Database

**Constraint**: Primary database must be PostgreSQL 14+.

**Reason**:
- Existing infrastructure and expertise
- ACID compliance required
- JSON support needed (JSONB columns)
- License: Open source (no vendor lock-in)

**Impact**:
- ✅ ACID guarantees
- ✅ Rich query capabilities (joins, aggregations)
- ✅ Strong ecosystem (ORMs, tools)
- ❌ Horizontal scaling complexity (need sharding)
- ❌ Not ideal for write-heavy workloads

**Mitigation**:
- Use read replicas for scalability
- Implement caching layer (Redis)
- Consider partitioning for large tables
- Use connection pooling (PgBouncer)

---

### TC-003: [Cloud Platform Constraint]

**Example: Must Deploy to AWS**

**Category**: Platform

**Constraint**: All infrastructure must run on AWS.

**Reason**:
- Existing enterprise contract ($100K credits)
- Compliance certifications (SOC 2, HIPAA)
- Team expertise with AWS services

**Impact**:
- ✅ Rich service ecosystem (RDS, S3, Lambda, etc)
- ✅ Compliance pre-certified
- ❌ Vendor lock-in
- ❌ Multi-cloud deployment not possible

**Mitigation**:
- Use abstraction layers for cloud-specific services
- Use containers (ECS/EKS) for portability
- Document migration path to other clouds (if needed)

---

### TC-004: [Protocol/API Constraint]

**Example: Must Support REST API**

**Category**: Protocol

**Constraint**: External API must be RESTful (HTTP/JSON).

**Reason**:
- Existing clients expect REST
- Backward compatibility required
- Industry standard for public APIs

**Impact**:
- ✅ Widely understood
- ✅ Tooling support (Postman, Swagger)
- ❌ Over-fetching/under-fetching issues
- ❌ Multiple requests for related data

**Mitigation**:
- Provide batch endpoints where appropriate
- Consider GraphQL for internal APIs
- Optimize with field filtering (?fields=name,email)

---

### TC-005: [Security Constraint]

**Example: Must Use OAuth 2.0**

**Category**: Security

**Constraint**: Authentication must use OAuth 2.0 with Auth0.

**Reason**:
- Corporate standard
- Security team mandate
- Existing Auth0 contract

**Impact**:
- ✅ Proven security
- ✅ Offload auth complexity
- ❌ Dependency on Auth0 availability
- ❌ Migration difficulty if switching provider

**Mitigation**:
- Cache tokens (2h TTL)
- Implement graceful degradation
- Abstract auth behind interface (future flexibility)

---

## Organizational Constraints

### OC-001: [Team Constraint]

**Example: Team Size is Fixed**

**Category**: Team

**Constraint**: Development team is 5 developers (cannot grow for 12 months).

**Reason**: Budget constraints, hiring freeze.

**Impact**:
- ❌ Limited capacity (velocity ~50 story points/sprint)
- ❌ No specialization (everyone full-stack)
- ✅ Faster communication (small team)

**Mitigation**:
- Prioritize ruthlessly (MVP-first)
- Automate everything (CI/CD, testing, deployment)
- Avoid complex architectures (microservices → modular monolith)
- Simplify tech stack (fewer technologies to maintain)

---

### OC-002: [Timeline Constraint]

**Example: Must Launch in 6 Months**

**Category**: Timeline

**Constraint**: MVP must be in production by 2026-06-01 (6 months).

**Reason**:
- Market opportunity (competitor launching similar product)
- Business commitment to investors

**Impact**:
- ❌ Limited time for R&D
- ❌ Technical debt likely
- ✅ Forces focus on essentials

**Mitigation**:
- Define strict MVP scope
- Use proven technologies (no experiments)
- Plan phase 2 for technical debt paydown
- Automate testing to maintain quality under pressure

---

### OC-003: [Budget Constraint]

**Example: Infrastructure Budget is $50K/month**

**Category**: Budget

**Constraint**: Cloud infrastructure costs must be < $50K/month.

**Reason**: Startup funding constraints.

**Impact**:
- ❌ Limits scalability options
- ❌ Careful resource management required
- ✅ Forces efficient architecture

**Mitigation**:
- Use auto-scaling (scale down when idle)
- Optimize resource usage (right-sizing)
- Use reserved instances (1-year commit for 30% savings)
- Monitor costs continuously (CloudWatch, Cost Explorer)
- Consider serverless where appropriate (pay-per-use)

---

### OC-004: [Skill Constraint]

**Example: Team Has Limited DevOps Experience**

**Category**: Skills

**Constraint**: Team is strong in Node.js but has limited Kubernetes/infrastructure expertise.

**Reason**: Team composition (mainly web developers).

**Impact**:
- ❌ Complex infrastructure choices risky
- ❌ Kubernetes learning curve steep
- ✅ Faster development with familiar stack

**Mitigation**:
- Use managed services (AWS ECS/Fargate instead of K8s)
- Hire DevOps consultant for setup
- Invest in training (allocate 10% time for learning)
- Document everything (runbooks, troubleshooting guides)

---

## Legal/Compliance Constraints

### LC-001: [Data Privacy]

**Example: Must Be GDPR Compliant**

**Category**: Data Privacy

**Constraint**: System must comply with GDPR (EU regulation).

**Reason**:
- Serving EU customers
- Legal requirement

**Impact**:
- ✅ User trust (privacy by design)
- ❌ Implementation complexity
- ❌ Data handling restrictions

**Requirements**:
- Right to access (users can download their data)
- Right to erasure (users can delete their data)
- Consent management (explicit opt-in)
- Data portability (export in machine-readable format)
- Privacy by design (default to minimal data collection)
- Data breach notification (within 72 hours)

**Mitigation**:
- Use GDPR-compliant services (Auth0, SendGrid)
- Implement data retention policies
- Add consent management UI
- Maintain audit logs
- Document data flows (DPIAs)

---

### LC-002: [Regulatory Compliance]

**Example: Must Be PCI-DSS Compliant**

**Category**: Financial

**Constraint**: Must comply with PCI-DSS for credit card processing.

**Reason**: Accepting credit card payments.

**Impact**:
- ❌ Cannot store credit card numbers
- ❌ Strict security requirements
- ✅ Customer trust

**Requirements**:
- Never store CVV
- Encrypt card data in transit and at rest
- Regular security audits
- Network segmentation
- Access control (least privilege)

**Mitigation**:
- Use Stripe (PCI Level 1 certified)
- Tokenize cards immediately
- Never touch raw card data
- Limit PCI scope (payment page only)

---

### LC-003: [Accessibility]

**Example: Must Meet WCAG 2.1 Level AA**

**Category**: Accessibility

**Constraint**: Web interface must meet WCAG 2.1 Level AA standards.

**Reason**:
- Legal requirement (ADA compliance)
- Corporate policy (inclusive design)

**Impact**:
- ✅ Larger addressable market (accessibility)
- ❌ Additional development time
- ❌ Testing complexity

**Requirements**:
- Keyboard navigation
- Screen reader compatible
- Color contrast ratios (4.5:1 for text)
- Alt text for images
- Captions for videos
- Form labels and error messages

**Mitigation**:
- Use accessible component library (Radix UI, Reach UI)
- Automated testing (axe-core, Lighthouse)
- Manual testing with screen readers
- Design with accessibility from start (not retrofit)

---

## Conventions

### CV-001: [Coding Standards]

**Example: Must Follow ESLint + Prettier**

**Category**: Code Quality

**Constraint**: All code must pass ESLint + Prettier checks.

**Reason**:
- Team consistency
- Code review efficiency
- Automated quality checks

**Configuration**:
```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "max-lines": ["error", 200],
    "max-depth": ["error", 2],
    "complexity": ["error", 10]
  }
}
```

**Impact**:
- ✅ Consistent code style
- ✅ Fewer code review debates
- ❌ Initial setup time

---

### CV-002: [Git Workflow]

**Example: Must Use Git Flow**

**Category**: Version Control

**Constraint**: All development must follow Git Flow branching model.

**Reason**:
- Multiple environments (dev, staging, prod)
- Release coordination

**Branches**:
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature branches
- `release/*`: Release preparation
- `hotfix/*`: Production fixes

**Rules**:
- No direct commits to `main` or `develop`
- Pull requests required
- 1 approval minimum
- CI must pass

---

### CV-003: [Testing Requirements]

**Example: Minimum 80% Code Coverage**

**Category**: Testing

**Constraint**: All code must have minimum 80% test coverage.

**Reason**:
- Quality assurance
- Prevent regressions
- Enable safe refactoring

**Requirements**:
- Unit tests: 80% coverage
- Integration tests: Critical paths
- E2E tests: Happy paths
- CI fails if coverage drops below threshold

---

### CV-004: [Documentation Standards]

**Example: Must Follow Arc42 + C4**

**Category**: Documentation

**Constraint**: Architecture documentation must follow Arc42 template with C4 diagrams.

**Reason**:
- Consistency
- Onboarding
- Stakeholder communication

**Requirements**:
- Arc42: 12 chapters
- C4: Context, Containers, Components
- ADRs: All significant decisions
- BDD: All features (Given-When-Then)

---

## Summary Table

| ID | Category | Constraint | Impact | Mitigation Priority |
|----|----------|------------|--------|---------------------|
| TC-001 | Technical | Node.js backend | Medium | Low |
| TC-002 | Technical | PostgreSQL | Medium | Medium |
| TC-003 | Technical | AWS only | High | Medium |
| OC-001 | Org | 5 developers | High | High |
| OC-002 | Org | 6 month deadline | High | Critical |
| OC-003 | Org | $50K/mo budget | Medium | High |
| LC-001 | Legal | GDPR | High | Critical |
| LC-002 | Legal | PCI-DSS | Critical | Critical |

---

## Constraint Trade-offs

Document key trade-offs made due to constraints:

### Trade-off 1: Monolith vs Microservices

**Constraint**: Team size (5 developers), Timeline (6 months)

**Decision**: Modular monolith (not microservices)

**Rationale**:
- Small team → microservices overhead too high
- Tight deadline → simplicity critical
- Can split later if needed (plan for modularity)

**Accepted Trade-offs**:
- ❌ Less independent scalability
- ❌ Deployment coupling
- ✅ Faster development
- ✅ Easier debugging
- ✅ Lower operational complexity

---

### Trade-off 2: Build vs Buy

**Constraint**: Timeline (6 months), Budget ($50K/mo)

**Decision**: Buy for auth, payment, email (don't build)

**Rationale**:
- Auth: Complex, security-critical → Auth0
- Payment: PCI-DSS compliance → Stripe
- Email: Deliverability → SendGrid
- Focus dev time on core business logic

**Accepted Trade-offs**:
- ❌ Vendor dependencies
- ❌ Monthly costs ($5K/mo for services)
- ✅ Faster time-to-market (saved 3 months)
- ✅ Better reliability (proven services)

---

## Open Questions

Constraints that need clarification:

- [ ] **Question 1**: Can we use Redis for caching? (need security approval)
- [ ] **Question 2**: Which AWS regions are approved? (need compliance verification)
- [ ] **Question 3**: Can we use Lambda for background jobs? (need cost approval)

---

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | [Date] | [Name] | Initial version |

---

**Previous**: [01. Introduction](01_introduction.md) | **Next**: [03. Context and Scope](03_context.md)

# 09. Architectural Decisions

**Template ID**: TPL-ARC42-09
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 9 (Architectural Decisions)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-09

This chapter contains links to **ADRs** (Architectural Decision Records).

Use separate files for each decision:
- `specs/09_decisions/adr/ADR-001_[name].md`

See template: [ADR Template](../../adr/decision.md)

---

## ADR List

| ID | Title | Status | Date |
|----|-------|--------|------|
| ADR-001 | Use PostgreSQL | Accepted | 2025-10-01 |
| ADR-002 | Use Modular Monolith | Accepted | 2025-10-05 |
| ADR-003 | Use Auth0 for Authentication | Accepted | 2025-10-10 |
| ADR-004 | Use Stripe for Payments | Accepted | 2025-10-12 |
| ADR-005 | Use Redis for Caching | Accepted | 2025-10-15 |

**Details**: See `specs/09_decisions/adr/ADR-*`

---

## Decision Log (Summary)

### ADR-001: Use PostgreSQL
**Decision**: PostgreSQL as primary database
**Rationale**: ACID, team expertise, JSON support
**Trade-offs**: ❌ Horizontal scaling complexity

### ADR-002: Use Modular Monolith
**Decision**: Start with modular monolith
**Rationale**: Small team, simplicity
**Trade-offs**: ❌ Limited independent scalability

### ADR-003: Use Auth0
**Decision**: Auth0 for authentication
**Rationale**: Security, compliance, time-to-market
**Trade-offs**: ❌ Vendor lock-in

---

**Previous**: [08. Crosscutting](08_crosscutting.md) | **Next**: [10. Quality](10_quality.md)

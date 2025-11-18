# 11. Technical Risks and Technical Debt

**Template ID**: TPL-ARC42-11
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 11 (Risks and Technical Debt)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-11

---

## Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| R-001 | Database failure | Medium | High | Multi-AZ, backups |
| R-002 | DDoS attack | Low | High | CloudFlare, rate limiting |
| R-003 | Stripe outage | Low | Critical | Queue payments, fallback |
| R-004 | Team member leaves | Medium | Medium | Documentation, pair programming |
| R-005 | Budget overrun | High | Medium | Cost monitoring, reserved instances |

---

## Technical Debt

| ID | Description | Cost | Priority | Plan |
|----|-------------|------|----------|------|
| TD-001 | Auth service lacks e2e tests | 3 days | High | Sprint 5 |
| TD-002 | Duplicated validation code | 1 day | Medium | Sprint 6 |
| TD-003 | Unstructured logs | 2 days | Low | Backlog |
| TD-004 | Missing API documentation | 2 days | High | Sprint 5 |
| TD-005 | Hardcoded configuration | 1 day | Medium | Sprint 6 |

---

## Risk Management

### Monitoring
- **CloudWatch**: CPU, memory, errors
- **Alerts**: SNS → PagerDuty
- **Thresholds**: Error rate > 1%, response time > 1s

### Disaster Recovery
- **Backups**: Daily, 7-day retention
- **DR Site**: us-west-2 (passive)
- **Failover**: Manual, < 1 hour

---

**Previous**: [10. Quality](10_quality.md) | **Next**: [12. Glossary](12_glossary.md)

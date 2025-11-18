# ADR-[XXX]: [Decision Title]

**Template ID**: TPL-ADR-001
**Version**: 2.0.0
**Category**: ADR
**Used By**: architect (Phase 2: Architecture), analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Date**: [YYYY-MM-DD]
**Deciders**: [Names or roles of decision makers]
**Supersedes**: [ADR-XXX] (if applicable)
**Superseded by**: [ADR-XXX] (if deprecated)

---

## Context

What is the issue we're trying to solve? What forces are at play?

**Include**:
- Problem statement
- Current situation
- Constraints
- Requirements
- Context that influences the decision

**Example**:

We need to choose a primary database for our e-commerce platform.

**Requirements**:
- ACID transactions (critical for payments and inventory)
- Complex queries (joins, aggregations for reports)
- JSON data support (flexible product attributes)
- Strong consistency (inventory must be accurate)
- Scalability to 100K users
- Team has experience with relational databases
- Budget: $5K/month max for database

**Constraints**:
- Must deploy on AWS (existing infrastructure)
- Must support TypeScript/Node.js (team expertise)
- Must be production-ready within 3 months
- No MongoDB (company policy: no document DBs for transactional data)

---

## Decision

What is the change we're making?

**Format**: "We will [decision]"

**Example**:

We will use **PostgreSQL 14+** as our primary database.

---

## Rationale

Why did we choose this option?

**Include**:
- Reasons for the decision
- Why this solution is better than alternatives
- How it addresses the context/problem

**Example**:

**PostgreSQL is the best choice because**:

1. **ACID Compliance**: Fully ACID compliant, critical for financial transactions
2. **JSON Support**: Native JSONB type for flexible product attributes
3. **Team Expertise**: Team has 3+ years experience with PostgreSQL
4. **Rich Ecosystem**: Mature ORMs (TypeORM, Prisma), monitoring tools (pg_stat_statements)
5. **Performance**: Fast enough for our scale (10K req/s tested)
6. **Cost**: AWS RDS pricing ~$300/month for our workload (well under budget)
7. **Reliability**: Battle-tested, 20+ years of production use
8. **Open Source**: No vendor lock-in, community support

---

## Alternatives Considered

What other options did we consider? Why were they rejected?

### Alternative 1: [Option]

**Pros**:
- [Pro 1]
- [Pro 2]

**Cons**:
- [Con 1]
- [Con 2]

**Why Rejected**: [Reason]

---

### Alternative 2: [Option]

**Pros**:
- [Pro 1]
- [Pro 2]

**Cons**:
- [Con 1]
- [Con 2]

**Why Rejected**: [Reason]

---

**Example**:

### Alternative 1: MySQL

**Pros**:
- Similar to PostgreSQL (relational, ACID)
- Team has some experience
- Wide adoption
- AWS RDS support

**Cons**:
- Less feature-rich than PostgreSQL (JSON support inferior)
- Some quirks with strict mode and default values
- Less powerful query optimizer

**Why Rejected**: PostgreSQL has better JSON support and more powerful features. No compelling reason to choose MySQL over PostgreSQL.

---

### Alternative 2: MongoDB

**Pros**:
- Flexible schema (good for product catalog)
- Horizontal scaling built-in
- Popular, large ecosystem

**Cons**:
- No ACID transactions (until v4, still limited)
- Eventual consistency (not acceptable for inventory)
- Team has zero experience
- Company policy: no document DBs for transactional data

**Why Rejected**: Lack of strong consistency and ACID guarantees make it unsuitable for transactional data (payments, inventory). Company policy also forbids it.

---

### Alternative 3: DynamoDB

**Pros**:
- Fully managed (no ops)
- Horizontal scaling automatic
- AWS native (good integration)
- Pay-per-use pricing

**Cons**:
- NoSQL (complex queries difficult)
- No joins (need multiple queries)
- Vendor lock-in (AWS-specific)
- Team has zero experience
- Cost unpredictable at scale

**Why Rejected**: Complex queries (reports, aggregations) are core requirement. DynamoDB makes this very difficult. Also, vendor lock-in is concerning.

---

### Alternative 4: CockroachDB

**Pros**:
- PostgreSQL-compatible
- Distributed (horizontal scaling built-in)
- ACID + strong consistency
- Multi-region support

**Cons**:
- More complex to operate
- Higher cost (~3x PostgreSQL)
- Overkill for current scale (100K users)
- Team has zero experience

**Why Rejected**: Excellent technology but overkill for our current needs. Can migrate later if we need global distribution. Cost is 3x higher without immediate benefit.

---

## Consequences

What are the results of this decision? What trade-offs are we making?

### Positive Consequences

- ✅ [Benefit 1]
- ✅ [Benefit 2]
- ✅ [Benefit 3]

### Negative Consequences

- ❌ [Trade-off 1]
- ❌ [Trade-off 2]
- ❌ [Trade-off 3]

### Neutral Consequences

- ⚪ [Impact 1]
- ⚪ [Impact 2]

---

**Example**:

### Positive Consequences

- ✅ **ACID Guarantees**: Can safely handle financial transactions
- ✅ **Fast Development**: Team expertise means faster development
- ✅ **Rich Queries**: Joins, aggregations, CTEs available for reports
- ✅ **JSON Flexibility**: JSONB for product attributes without schema migrations
- ✅ **Cost Effective**: $300/month well under $5K budget
- ✅ **Ecosystem**: Mature ORMs, tools, monitoring
- ✅ **Reliability**: Battle-tested in production for 20+ years
- ✅ **Open Source**: No vendor lock-in

### Negative Consequences

- ❌ **Vertical Scaling Limits**: Need to shard for massive scale (10M+ users)
- ❌ **Write Bottleneck**: Single primary instance (can use read replicas for reads)
- ❌ **Complex Sharding**: Manual effort if we need horizontal scaling
- ❌ **Not Cloud-Native**: Not designed for distributed systems like DynamoDB

### Neutral Consequences

- ⚪ **Managed Service**: Will use AWS RDS (less control, more convenience)
- ⚪ **Backup Strategy**: RDS automated backups (7-day retention)
- ⚪ **Monitoring**: Use CloudWatch + pg_stat_statements

---

## Risks and Mitigation

What risks does this decision introduce? How do we mitigate them?

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk 1] | [Low/Med/High] | [Low/Med/High] | [Strategy] |

**Example**:

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Database becomes bottleneck at scale | Medium | High | Use read replicas (up to 5), implement caching (Redis), monitor query performance |
| Single point of failure | Low | High | Use Multi-AZ deployment (automatic failover), regular backups, tested DR plan |
| PostgreSQL-specific features create lock-in | Low | Medium | Use ORM abstraction (TypeORM), avoid PostgreSQL-specific features unless critical |
| Connection pool exhaustion | Medium | High | Use connection pooling (PgBouncer), set max connections = 100, monitor connections |
| Storage grows beyond budget | Low | Medium | Implement data retention policy (archive old orders after 2 years), monitor growth |

---

## Implementation Plan

How will this decision be implemented?

**Steps**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Timeline**: [Duration]

**Owner**: [Person/Team]

---

**Example**:

**Steps**:
1. **Week 1**: Provision RDS PostgreSQL instance (db.t3.large, Multi-AZ)
2. **Week 1**: Configure security groups, VPC, parameter groups
3. **Week 2**: Set up connection pooling (PgBouncer)
4. **Week 2**: Implement database migrations (using TypeORM or Knex)
5. **Week 3**: Set up monitoring (CloudWatch, pg_stat_statements)
6. **Week 3**: Configure backups (automated daily, 7-day retention)
7. **Week 4**: Load testing (simulate production traffic)
8. **Week 4**: Document runbook (backup/restore, failover, scaling)

**Timeline**: 4 weeks

**Owner**: DevOps team + Backend lead

---

## Validation

How will we know if this decision was correct?

**Success Criteria**:
- [Criterion 1]
- [Criterion 2]

**Metrics to Track**:
- [Metric 1]
- [Metric 2]

**Review Date**: [When to revisit this decision]

---

**Example**:

**Success Criteria**:
- Application meets performance requirements (p95 < 200ms)
- Zero data loss or corruption incidents
- Database costs remain under $500/month
- Team can develop features without database blocking them

**Metrics to Track**:
- Query performance (p95, p99 latency)
- Database CPU usage (< 70% avg)
- Connection count (< 80 of max 100)
- Storage growth (< 10GB/month)
- Backup success rate (100%)
- Replication lag (< 1 second)

**Review Date**: 2026-05-01 (6 months after launch)

**Trigger for Re-evaluation**:
- Database CPU consistently > 80%
- Storage costs exceed $1K/month
- Query performance degrades (p95 > 500ms)
- Need for multi-region support

---

## Related Decisions

- [ADR-001: Choice of Cloud Provider (AWS)](./ADR-001_aws.md)
- [ADR-004: Use Redis for Caching](./ADR-004_redis.md)
- [ADR-010: Database Sharding Strategy](./ADR-010_sharding.md) (future)

---

## Notes

Additional context, links, or information:

- [Link to benchmark results]
- [Link to cost analysis spreadsheet]
- [Link to team discussion notes]

**Example**:
- Benchmark results: [Link to GitHub gist]
- Cost analysis: [Link to Google Sheets]
- Discussion thread: [Link to Slack]
- PostgreSQL best practices: [Link to internal wiki]

---

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-01 | Tech Lead | Initial decision |
| 1.1 | 2025-10-15 | DevOps | Added implementation plan |
| 1.2 | 2025-11-01 | Tech Lead | Added risk mitigation |

---

## Approval

| Role | Name | Approved | Date |
|------|------|----------|------|
| Tech Lead | [Name] | ✅ | 2025-10-01 |
| CTO | [Name] | ✅ | 2025-10-01 |
| DevOps Lead | [Name] | ✅ | 2025-10-02 |

---

**Status**: Accepted
**Parent**: [09. Architectural Decisions](../../arc42/09_decisions.md)
**Type**: ADR (Architectural Decision Record)

---

## Related Templates

### Prerequisites
- **proposal.md** (TPL-WORKFLOW-001) - Problem context from proposal
- **arc42/02_constraints.md** (TPL-ARC42-02) - Technical and organizational constraints

### Part Of
- **design.md** (TPL-WORKFLOW-002) - Architecture design document (if HIGH complexity)
- **arc42/09_decisions.md** (TPL-ARC42-09) - Arc42 Chapter 9: Architecture Decisions

### Influences
- **arc42/04_solution-strategy.md** (TPL-ARC42-04) - Solution strategy
- **arc42/05_building-blocks.md** (TPL-ARC42-05) - Component design
- **c4/system-context.md** (TPL-C4-001) - External system choices
- **arc42/10_quality.md** (TPL-ARC42-10) - Quality requirements

### See Also
- **constitution.md** - Architectural principles
- **bdd/scenario.md** (TPL-BDD-001) - Behavioral implications

---

## Workflow Integration

**Phase**: 2 (Architecture) or 3 (Specification)

**Primary Skill**:
- **architect** - Creates ADRs as part of design.md (Phase 2, HIGH complexity)
- **analyst** - Documents ADRs during specification (Phase 3)

**Output Location**:
- `changes/[change-id]/design.md` (embedded in design, Phase 2)
- `specs/09_decisions/adr/ADR-*.md` (separate files, Phase 3)

**When to Create**:
- Technology selection (database, framework, cloud provider)
- Architectural pattern choice (microservices, monolith, hexagonal)
- Integration approach (REST, gRPC, messaging)
- Data model decisions (SQL vs NoSQL, schema design)
- Cross-cutting concerns (logging, monitoring, security)

**Next Steps**:
1. **Discuss with team** - Validate decision before accepting
2. **Update spec.md** - Reference ADR in Arc42 Chapter 9
3. **Implement** - Developer follows ADR during implementation
4. **Review** - Revisit ADR if context changes

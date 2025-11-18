# 05. Building Block View

**Template ID**: TPL-ARC42-05
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 5 (Building Block View)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-05

This chapter contains **C4 Level 2** (Containers) and **Level 3** (Components).

Use separate files for each container/component:
- `specs/05_building-blocks/containers/CNT-001_[name].md`
- `specs/05_building-blocks/components/CMP-001_[name].md`

See templates:
- [Container Template](../../c4/container.md)
- [Component Template](../../c4/component.md)

---

## Overview Diagram (C4 Level 2)

```
┌─────────────────────────────────────────────┐
│          System: [System Name]              │
└─────────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ↓               ↓               ↓
┌─────────┐   ┌──────────┐   ┌──────────┐
│   API   │   │   Web    │   │  Worker  │
│Container│   │Container │   │Container │
│(Node.js)│   │(Next.js) │   │(Node.js) │
└────┬────┘   └─────┬────┘   └────┬─────┘
     │              │              │
     └──────┬───────┴──────────────┘
            │
    ┌───────┼────────┐
    ↓       ↓        ↓
┌────────┐ ┌───┐ ┌────┐
│   DB   │ │Redis│ │ S3 │
└────────┘ └────┘ └────┘
```

---

## Container List

| ID | Name | Technology | Purpose |
|----|------|------------|---------|
| CNT-001 | API Server | Node.js | REST API |
| CNT-002 | Web App | Next.js | Frontend |
| CNT-003 | Database | PostgreSQL | Data persistence |
| CNT-004 | Cache | Redis | Caching |
| CNT-005 | Worker | Node.js | Background jobs |

**Details**: See `specs/05_building-blocks/containers/CNT-*`

---

## Component List (per Container)

### CNT-001: API Server

| ID | Name | Purpose |
|----|------|---------|
| CMP-001 | Auth Service | Authentication |
| CMP-002 | Product Service | Product catalog |
| CMP-003 | Cart Service | Shopping cart |
| CMP-004 | Order Service | Order processing |
| CMP-005 | Payment Service | Payment integration |

**Details**: See `specs/05_building-blocks/components/CMP-*`

---

**Previous**: [04. Solution Strategy](04_solution-strategy.md) | **Next**: [06. Runtime View](06_runtime.md)

# 07. Deployment View

**Template ID**: TPL-ARC42-07
**Version**: 2.0.0
**Category**: Arc42
**Chapter**: 7 (Deployment View)
**Used By**: analyst (Phase 3: Specification)
**Last Updated**: 2025-11-17

---

**ID**: ARC42-07

---

## Infrastructure

**Cloud Provider**: AWS
**Regions**: us-east-1 (primary), us-west-2 (backup)

---

## Deployment Diagram

```
┌─────────────────────────────────────────┐
│         AWS Region: us-east-1           │
│  ┌───────────────────────────────────┐  │
│  │  VPC: 10.0.0.0/16                 │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐ │  │
│  │  │ Public Subnet: 10.0.1.0/24  │ │  │
│  │  │                             │ │  │
│  │  │  ┌───────────────────────┐  │ │  │
│  │  │  │  Load Balancer (ALB)  │  │ │  │
│  │  │  └───────────┬───────────┘  │ │  │
│  │  └──────────────┼──────────────┘ │  │
│  │                 │                │  │
│  │  ┌──────────────┼──────────────┐ │  │
│  │  │ Private Subnet: 10.0.2.0/24│ │  │
│  │  │              │              │ │  │
│  │  │  ┌───────────┴────────┐    │ │  │
│  │  │  │  ECS Cluster       │    │ │  │
│  │  │  │  (Fargate)         │    │ │  │
│  │  │  │  - API (3 tasks)   │    │ │  │
│  │  │  │  - Worker (2 tasks)│    │ │  │
│  │  │  └────────────────────┘    │ │  │
│  │  └────────────────────────────┘ │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐ │  │
│  │  │ Data Subnet: 10.0.3.0/24    │ │  │
│  │  │                             │ │  │
│  │  │  ┌──────────┐  ┌─────────┐ │ │  │
│  │  │  │  RDS     │  │ Redis   │ │ │  │
│  │  │  │(Postgres)│  │ElastiC. │ │ │  │
│  │  │  └──────────┘  └─────────┘ │ │  │
│  │  └─────────────────────────────┘ │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────┐
│  AWS Services (External)│
│  - S3                   │
│  - CloudFront           │
│  - Secrets Manager      │
│  - CloudWatch           │
└─────────────────────────┘
```

---

## Components

### Compute
- **ECS Fargate**: Serverless containers
- **Auto-scaling**: CPU > 70% → scale up
- **Task Definition**: 2 vCPU, 4GB RAM

### Database
- **RDS PostgreSQL**: Multi-AZ, db.t3.large
- **Read Replicas**: 2 replicas
- **Backups**: Daily, 7-day retention

### Cache
- **ElastiCache Redis**: Cluster mode, 3 nodes
- **Eviction**: LRU, 4GB memory

### Storage
- **S3**: Product images, user uploads
- **CloudFront**: CDN, 24h cache TTL

### Networking
- **ALB**: Application Load Balancer
- **Security Groups**: Restrict access

---

## CI/CD Pipeline

```
Developer → Git Push → GitHub Actions → Build → Test → Deploy
```

**Stages**:
1. **Lint**: ESLint + Prettier
2. **Test**: Unit + Integration (80% coverage)
3. **Build**: Docker image
4. **Push**: ECR (Elastic Container Registry)
5. **Deploy**: ECS (rolling update, 25% at a time)

**Deployment Strategy**: Blue-Green
**Rollback**: Automatic if health checks fail

---

## Environments

| Environment | URL | Purpose | Data |
|-------------|-----|---------|------|
| Development | dev.example.com | Feature testing | Fake |
| Staging | staging.example.com | UAT | Anonymized |
| Production | api.example.com | Live | Real |

---

## Monitoring

- **Logs**: CloudWatch Logs (centralized)
- **Metrics**: CloudWatch Metrics (CPU, memory, requests)
- **Alerts**: SNS → PagerDuty
- **Dashboards**: Grafana

---

**Previous**: [06. Runtime](06_runtime.md) | **Next**: [08. Crosscutting](08_crosscutting.md)

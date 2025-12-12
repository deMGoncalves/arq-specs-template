# 07. Visão de Deployment

**ID do Template**: TPL-ARC42-07
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 7 (Visão de Deployment)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-07

---

## Infraestrutura

**Provedor Cloud**: AWS
**Regiões**: us-east-1 (primária), us-west-2 (backup)

---

## Diagrama de Deployment

```
┌─────────────────────────────────────────┐
│         AWS Region: us-east-1           │
│  ┌───────────────────────────────────┐  │
│  │  VPC: 10.0.0.0/16                 │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐ │  │
│  │  │ Subnet Pública: 10.0.1.0/24 │ │  │
│  │  │                             │ │  │
│  │  │  ┌───────────────────────┐  │ │  │
│  │  │  │  Load Balancer (ALB)  │  │  │  │
│  │  │  └───────────┬───────────┘  │ │  │
│  │  └──────────────┼──────────────┘ │  │
│  │                 │                │  │
│  │  ┌──────────────┼──────────────┐ │  │
│  │  │ Subnet Privada: 10.0.2.0/24│ │  │
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
│  │  │ Subnet de Dados: 10.0.3.0/24│ │  │
│  │  │                             │ │  │
│  │  │  ┌──────────┐  ┌─────────┐ │ │  │
│  │  │  │  RDS     │  │ Redis   │ │ │  │
│  │  │  │(Postgres)│  │ElastiC. │ │ │  │
│  │  │  └──────────┘  └─────────┘ │ │  │
│  │  └─────────────────────────────┘ │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────┐
│  AWS Services (Externos)│
│  - S3                   │
│  - CloudFront           │
│  - Secrets Manager      │
│  - CloudWatch           │
└─────────────────────────┘
```

---

## Componentes

### Computação
- **ECS Fargate**: Containers serverless
- **Auto-scaling**: CPU > 70% → scale up
- **Task Definition**: 2 vCPU, 4GB RAM

### Banco de Dados
- **RDS PostgreSQL**: Multi-AZ, db.t3.large
- **Read Replicas**: 2 réplicas
- **Backups**: Diário, retenção de 7 dias

### Cache
- **ElastiCache Redis**: Modo cluster, 3 nós
- **Eviction**: LRU, 4GB memória

### Armazenamento
- **S3**: Imagens de produtos, uploads de usuários
- **CloudFront**: CDN, TTL de cache 24h

### Rede
- **ALB**: Application Load Balancer
- **Security Groups**: Restrição de acesso

---

## Pipeline CI/CD

```
Developer → Git Push → GitHub Actions → Build → Test → Deploy
```

**Estágios**:
1. **Lint**: ESLint + Prettier
2. **Test**: Unit + Integration (80% cobertura)
3. **Build**: Imagem Docker
4. **Push**: ECR (Elastic Container Registry)
5. **Deploy**: ECS (rolling update, 25% por vez)

**Estratégia de Deployment**: Blue-Green
**Rollback**: Automático se health checks falharem

---

## Ambientes

| Ambiente | URL | Propósito | Dados |
|----------|-----|-----------|-------|
| Development | dev.example.com | Teste de features | Fake |
| Staging | staging.example.com | UAT | Anonimizados |
| Production | api.example.com | Live | Reais |

---

## Monitoramento

- **Logs**: CloudWatch Logs (centralizados)
- **Métricas**: CloudWatch Metrics (CPU, memória, requisições)
- **Alertas**: SNS → PagerDuty
- **Dashboards**: Grafana

---

**Anterior**: [06. Runtime](06_runtime.md) | **Próximo**: [08. Crosscutting](08_crosscutting.md)

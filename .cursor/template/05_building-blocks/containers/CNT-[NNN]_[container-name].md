# Container: [NOME DO CONTAINER]
<!-- markdownlint-disable MD012 MD029 MD031 MD032 MD036 -->

**ID**: CNT-[NÚMERO]
**Tipo**: [Application | Database | Cache | Queue | Worker | Gateway | BFF | Service]
**Status**: [🟢 Produção | 🟡 Staging | 🟴 Desenvolvimento | 🔴 Deprecated]

---

## 📋 Identificação

**Nome Completo**: [PREENCHER]

**Descrição**: [PREENCHER: O que este container faz em 2-3 frases]

**Repositório**: [PREENCHER: Link para repo]

**Caminho no Monorepo**: [PREENCHER: Path se aplicável - ex: apps/backend-api]

**Owner Team**: [PREENCHER: Time responsável]

---

## 🛠️ Tecnologia

### Stack Principal

- **Linguagem**: [PREENCHER: ex: TypeScript, Python, Java, Go]
- **Versão Linguagem**: [PREENCHER: ex: Node.js 20.x, Python 3.11]
- **Framework**: [PREENCHER: ex: Express, NestJS, FastAPI, Spring Boot]
- **Versão Framework**: [PREENCHER: ex: 4.18.0]

### Dependências Principais

| Dependência | Versão | Propósito | Criticidade |
|-------------|--------|-----------|-------------|
| [PREENCHER] | [^X.Y.Z] | [PREENCHER] | [🔴/🟡/🟢] |
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

**Dependências de Sistema**:

- [PREENCHER: ex: PostgreSQL 15+, Redis 7+]

### Build e Artefatos

**Ferramenta de Build**: [PREENCHER: npm, pip, maven, gradle, go build]

**Comandos**:

```bash
# Instalar dependências
[PREENCHER: npm install, pip install -r requirements.txt]

# Build
[PREENCHER: npm run build, mvn package]

# Testes
[PREENCHER: npm test, pytest]

# Lint
[PREENCHER: npm run lint]
```

**Artefatos Gerados**:

- [PREENCHER: ex: dist/, target/*.jar, bin/app]
- **Docker Image**: [PREENCHER: nome da imagem]
- **Tamanho**: [PREENCHER: ex: 150MB]

---

## 📦 Responsabilidades

### Responsabilidade Principal

[PREENCHER: Qual a principal função deste container em 1 frase]

### Funcionalidades

**Core Features**:

1. [PREENCHER: Funcionalidade crítica 1]
2. [PREENCHER: Funcionalidade crítica 2]
3. [PREENCHER: Funcionalidade crítica 3]

**Features Secundárias**:

- [PREENCHER: Feature adicional 1]
- [PREENCHER: Feature adicional 2]

### O que NÃO faz
>
> ⚠️ **Importante**: Escopo explicitamente fora deste container

- ❌ [PREENCHER: Responsabilidade explicitamente fora do escopo]
- ❌ [PREENCHER: O que deve ser feito por outro container]

---

## 🔗 Interfaces

### Interfaces Públicas Expostas

#### Interface 1: [ex: REST API]

**Tipo**: [REST | GraphQL | gRPC | WebSocket | SOAP]

**Porta**: [PREENCHER: ex: 3000]

**Base URL**:

- **Dev**: [PREENCHER: http://localhost:3000]
- **Staging**: [PREENCHER: https://staging-api.exemplo.com]
- **Prod**: [PREENCHER: https://api.exemplo.com]

**Principais Endpoints**:

```text
[PREENCHER: Listar 10-15 endpoints principais com método e path]

# Autenticação
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh

# Recursos
GET    /resources
POST   /resources
GET    /resources/:id
PUT    /resources/:id
PATCH  /resources/:id
DELETE /resources/:id

# Admin
GET    /admin/stats
POST   /admin/actions
```

**Documentação OpenAPI/Swagger**: [PREENCHER: Link]

**Postman Collection**: [PREENCHER: Link se aplicável]

**Rate Limiting**: [PREENCHER: ex: 1000 req/min por IP]

**CORS**: [PREENCHER: Origens permitidas]

---

#### Interface 2: [ex: Message Queue Consumer]

[PREENCHER: Se aplicável - descrever outra interface]

**Tipo**: [PREENCHER]

**Formato de Mensagem**: [PREENCHER]

---

### Dependências Externas (O que Consome)

| Container/Sistema | Via | Propósito | Criticidade |
|-------------------|-----|-----------|-------------|
| [CNT-002 Database] | [TCP:5432] | [Persistência de dados] | [🔴 Alta] |
| [CNT-003 Cache] | [TCP:6379] | [Cache de sessões] | [🟡 Média] |
| [SYS-001 Payment] | [HTTPS] | [Processar pagamentos] | [🔴 Alta] |

**Dependências Circulares**: [Nenhuma | PREENCHER: Listar se houver]

---

### Consumidores (Quem Depende Deste Container)

| Container/Sistema | Via | Uso | Criticidade |
|-------------------|-----|-----|-------------|
| [CNT-001 Frontend] | [HTTPS/REST] | [Buscar dados] | [🔴 Alta] |
| [CNT-004 Worker] | [Message Queue] | [Jobs assíncronos] | [🟡 Média] |

---

## 🚀 Deployment

### Ambiente de Execução

**Tipo**: [Container Docker | VM | Serverless | Kubernetes Pod | Bare Metal]

**Plataforma**: [AWS ECS | Kubernetes | AWS Lambda | Google Cloud Run | Azure App Service]

**Região Primária**: [PREENCHER: us-east-1, sa-east-1, etc]

**Região Secundária**: [PREENCHER: Para DR]

### Configuração de Recursos

**Ambiente de Desenvolvimento**:

- **CPU**: [PREENCHER: 0.5 vCPU]
- **Memória**: [PREENCHER: 512 MB]
- **Disco**: [PREENCHER: 10 GB]

**Ambiente de Produção**:

- **CPU**: [PREENCHER: 2 vCPU]
- **Memória**: [PREENCHER: 4 GB]
- **Disco**: [PREENCHER: 20 GB]
- **Rede**: [PREENCHER: VPC, Subnet, Security Groups]

### Escalabilidade

**Tipo**: [Horizontal | Vertical | Ambas | Não escalável]

**Configuração Horizontal**:

- **Min Instâncias**: [PREENCHER: 2]
- **Max Instâncias**: [PREENCHER: 10]
- **Desired**: [PREENCHER: 3]

**Auto-scaling Triggers**:

- **CPU**: [> 70% por 5 minutos → scale up]
- **Memória**: [> 80% por 5 minutos → scale up]
- **Requests**: [> 1000/s → scale up]
- **Custom**: [PREENCHER: Métrica custom se aplicável]

**Scale Down Policy**: [PREENCHER: Quando fazer scale down]

### Deployment Strategy

**Estratégia**: [Rolling Update | Blue/Green | Canary | Recreate]

**Configuração**:

```yaml
[PREENCHER: Exemplo de configuração]

# Exemplo Rolling Update
maxSurge: 1
maxUnavailable: 0
```

**Downtime**: [Zero downtime | PREENCHER: X minutos]

**Health Check durante Deploy**: [PREENCHER: Como verificar saúde]

**Rollback**:

- **Automático**: [Sim | Não] - [PREENCHER: Condições]
- **Manual**: [PREENCHER: Procedimento]
- **Tempo para Rollback**: [PREENCHER: X minutos]

---

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Exemplo | Obrigatória | Ambiente |
|----------|-----------|---------|-------------|----------|
| NODE_ENV | Ambiente de execução | production | Sim | Todos |
| PORT | Porta HTTP | 3000 | Sim | Todos |
| DATABASE_URL | Connection string DB | postgresql://... | Sim | Todos |
| REDIS_URL | Connection string Redis | redis://... | Sim | Prod/Stg |
| API_KEY_PAYMENT | Chave API pagamento | sk_live_... | Sim | Prod |
| LOG_LEVEL | Nível de log | info | Não | Todos |
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [Sim/Não] | [Dev/Stg/Prod] |

### Secrets Management

**Ferramenta**: [AWS Secrets Manager | HashiCorp Vault | Kubernetes Secrets | Azure Key Vault]

**Secrets Armazenados**:

- `database-credentials`: [User/Pass do BD]
- `api-keys`: [Chaves de APIs externas]
- `jwt-secret`: [Secret para JWT]
- [PREENCHER: Outros secrets]

**Rotação**:

- **Automática**: [PREENCHER: Ex: Senha BD a cada 90 dias]
- **Manual**: [PREENCHER: Ex: API Keys quando necessário]

**Acesso**: [PREENCHER: Como container acessa secrets]

### Feature Flags

**Ferramenta**: [LaunchDarkly | Unleash | AWS AppConfig | Custom]

**Flags Ativas**:

| Flag | Descrição | Ambientes | % Rollout |
|------|-----------|-----------|-----------|
| [PREENCHER] | [PREENCHER] | [Dev/Stg/Prod] | [100%] |

---

## 💾 Dados

### Banco de Dados

**Tipo**: [PostgreSQL | MongoDB | MySQL | DynamoDB | Cassandra]

**Versão**: [PREENCHER: 15.x]

**Connection Pool**:

- **Min**: [PREENCHER: 5]
- **Max**: [PREENCHER: 20]
- **Timeout**: [PREENCHER: 30s]

**Schemas/Collections Usados**:

- [PREENCHER: schema_name]
- [PREENCHER: collection_name]

**Migrações**:

- **Ferramenta**: [PREENCHER: Flyway, Alembic, Liquibase, Prisma]
- **Estratégia**: [PREENCHER: Como são aplicadas]
- **Localização**: [PREENCHER: path/to/migrations]

### Cache

**Tipo**: [Redis | Memcached | In-memory | CDN]

**Uso**:

- [PREENCHER: Sessions: TTL 24h]
- [PREENCHER: API responses: TTL 5min]
- [PREENCHER: User profile: TTL 1h]

**Estratégia**: [Cache-aside | Write-through | Write-behind | Read-through]

**Invalidação**: [PREENCHER: Como cache é invalidado]

**Tamanho Máximo**: [PREENCHER: ex: 2GB]

### Storage de Arquivos

**Tipo**: [S3 | Azure Blob | GCS | Local Disk | NFS]

**Bucket/Container**: [PREENCHER: nome]

**Tipos de Arquivo Armazenados**:

- [PREENCHER: Uploads de usuários]
- [PREENCHER: Relatórios gerados]

**Lifecycle Policy**: [PREENCHER: ex: Deletar após 90 dias]

**CDN**: [PREENCHER: Se usa CDN na frente]

### Mensageria (Se Aplicável)

**Broker**: [RabbitMQ | Kafka | AWS SQS | Redis Pub/Sub]

**Queues/Topics**:

| Nome | Tipo | Propósito | Retenção |
|------|------|-----------|----------|
| [PREENCHER] | [Queue/Topic] | [PREENCHER] | [7 dias] |

**Dead Letter Queue**: [PREENCHER: Configuração]

---

## 📊 Observabilidade

### Logs

**Agregação**: [CloudWatch Logs | ELK Stack | Datadog | Splunk | Loki]

**Formato**: [JSON | Plain Text]

**Campos Obrigatórios**:

```json
{
  "timestamp": "ISO8601",
  "level": "INFO|WARN|ERROR",
  "requestId": "uuid",
  "userId": "string",
  "message": "string",
  "context": {}
}
```

**Níveis**:

- **Dev**: DEBUG
- **Staging**: INFO
- **Prod**: INFO (ERROR para componentes críticos)

**Retenção**:

- **Dev**: 7 dias
- **Staging**: 30 dias
- **Prod**: 90 dias

**Custo Mensal**: [PREENCHER: Estimativa]

### Métricas

**Ferramenta**: [Prometheus | CloudWatch | Datadog | New Relic]

**Métricas Instrumentadas**:

**Business Metrics**:

- `transactions_total`: Counter - Total de transações
- `active_users`: Gauge - Usuários ativos
- [PREENCHER: Métrica de negócio específica]

**Technical Metrics**:

- `http_request_duration_seconds`: Histogram - Latência de requests
- `http_requests_total`: Counter - Total de requests por status
- `database_query_duration_seconds`: Histogram - Latência de queries
- `cache_hit_ratio`: Gauge - Taxa de acerto de cache
- `memory_usage_bytes`: Gauge - Uso de memória
- `cpu_usage_percent`: Gauge - Uso de CPU

**Dashboard**: [PREENCHER: Link para Grafana/DataDog]

### Tracing Distribuído

**Ferramenta**: [Jaeger | AWS X-Ray | Zipkin | OpenTelemetry]

**Sample Rate**:

- **Dev**: 100%
- **Staging**: 50%
- **Prod**: 10% (100% para erros)

**Trace Context Propagation**: [W3C Trace Context | B3 | Custom]

### Health Checks

**Endpoint**: `/health`

**Liveness Probe**:

```yaml
path: /health/live
initialDelaySeconds: 30
periodSeconds: 10
timeoutSeconds: 5
failureThreshold: 3
```

**Readiness Probe**:

```yaml
path: /health/ready
initialDelaySeconds: 15
periodSeconds: 5
timeoutSeconds: 3
failureThreshold: 3
```

**Critérios de Health**:

- [PREENCHER: ex: Database conectado]
- [PREENCHER: ex: Cache acessível]
- [PREENCHER: ex: Disco < 90%]

**Response**:

```json
{
  "status": "healthy|degraded|unhealthy",
  "checks": {
    "database": "ok",
    "cache": "ok",
    "disk": "ok"
  },
  "uptime": 123456,
  "version": "1.2.3"
}
```

### Alertas

| Alerta | Condição | Severidade | Canal | Ação |
|--------|----------|------------|-------|------|
| High Error Rate | error_rate > 5% por 5min | 🔴 Crítico | PagerDuty + Slack | Investigar imediatamente |
| High Latency | p95 > 1s por 10min | 🟡 Aviso | Slack | Investigar |
| Low Availability | uptime < 99.9% | 🔴 Crítico | PagerDuty | Escalar |
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

---

## 🔒 Segurança

### Autenticação de Requests

**Mecanismo**: [JWT | OAuth 2.0 | API Key | mTLS | Session Cookie]

**Implementação**:

```text
[PREENCHER: Como autentica requests recebidos]

Exemplo:
Authorization: Bearer <JWT_TOKEN>
- Valida signature
- Verifica expiration
- Extrai user context
```

**Token Expiration**: [PREENCHER: 1h access, 7d refresh]

### Autorização

**Modelo**: [RBAC | ABAC | ACL | Custom]

**Roles Suportadas**:

- `admin`: [PREENCHER: Permissões]
- `user`: [PREENCHER: Permissões]
- `guest`: [PREENCHER: Permissões]

**Implementação**: [PREENCHER: Como verifica permissões]

### Proteções Implementadas

**Input Validation**:

- [PREENCHER: Biblioteca usada - ex: Joi, Zod]
- [PREENCHER: Validação em todas as entradas]

**Output Encoding**:

- [PREENCHER: Prevenção de XSS]

**Rate Limiting**:

- **Por IP**: [PREENCHER: 1000 req/min]
- **Por Usuário**: [PREENCHER: 500 req/min]
- **Por Endpoint**: [PREENCHER: Específico por rota]

**CORS**:

```yaml
allowedOrigins:
  - https://app.exemplo.com
  - https://admin.exemplo.com
allowedMethods: [GET, POST, PUT, DELETE]
allowedHeaders: [Content-Type, Authorization]
maxAge: 86400
```

**Security Headers**:

```text
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: [PREENCHER]
```

**SQL Injection Prevention**: [PREENCHER: Prepared statements, ORM]

**Secrets no Código**:

- **Scanner**: [GitGuardian | TruffleHog | Gitleaks]
- **Pre-commit Hook**: [Sim | Não]

**Dependency Scanning**:

- **Ferramenta**: [Snyk | Dependabot | npm audit]
- **Frequência**: [Diária | Semanal]

---

## 🧪 Testes

### Cobertura Atual

- **Unitários**: [PREENCHER: XX%]
- **Integração**: [PREENCHER: YY%]
- **E2E**: [PREENCHER: ZZ%]
- **Cobertura Total**: [PREENCHER: WW%]

**Meta de Cobertura**: [PREENCHER: > 80%]

**Ferramenta de Cobertura**: [PREENCHER: Jest, Coverage.py, JaCoCo]

### Tipos de Teste

#### Testes Unitários

**Quantidade**: [PREENCHER: ~500 testes]

**Ferramenta**: [PREENCHER: Jest, PyTest, JUnit, Go Test]

**Padrão**: [AAA (Arrange-Act-Assert) | Given-When-Then]

**Exemplo**:

```typescript
[PREENCHER: Teste representativo]

describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test' };
      
      // Act
      const user = await userService.createUser(userData);
      
      // Assert
      expect(user.email).toBe('test@example.com');
      expect(user.id).toBeDefined();
    });
  });
});
```

**Localização**: [PREENCHER: src/**/*.spec.ts]

**Comando**:

```bash
npm test
npm test:coverage
```

---

#### Testes de Integração

**Quantidade**: [PREENCHER: ~100 testes]

**Ferramenta**: [PREENCHER: Supertest, TestContainers]

**Escopo**:

- [PREENCHER: Testa integração com BD]
- [PREENCHER: Testa integração com cache]
- [PREENCHER: Testa APIs externas (mocked)]

**Exemplo**:

```typescript
[PREENCHER: Teste de integração representativo]

describe('POST /users', () => {
  it('should persist user to database', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@example.com' })
      .expect(201);
    
    const userInDb = await db.users.findOne({ 
      email: 'test@example.com' 
    });
    expect(userInDb).toBeDefined();
  });
});
```

**Localização**: [PREENCHER: tests/integration/**/*.test.ts]

**Comando**:

```bash
npm run test:integration
```

---

#### Testes E2E

**Quantidade**: [PREENCHER: ~30 testes]

**Ferramenta**: [PREENCHER: Cypress, Playwright, Selenium]

**Cenários Cobertos**:

- [PREENCHER: Happy path principal]
- [PREENCHER: Fluxo de erro crítico]
- [PREENCHER: Edge cases importantes]

**Ambiente**: [PREENCHER: Staging dedicated]

**Comando**:

```bash
npm run test:e2e
```

---

#### Testes de Performance

**Ferramenta**: [PREENCHER: K6, JMeter, Artillery, Gatling]

**Cenários**:

1. **Load Test**: [PREENCHER: 1000 users por 10min]
2. **Stress Test**: [PREENCHER: Aumentar até breaking point]
3. **Spike Test**: [PREENCHER: Picos repentinos]
4. **Soak Test**: [PREENCHER: Carga constante por 4h]

**Baseline Performance**:

- **Throughput**: [PREENCHER: 1000 req/s]
- **Latency p50**: [PREENCHER: 50ms]
- **Latência p95**: [PREENCHER: 200ms]
- **Latência p99**: [PREENCHER: 500ms]
- **Error Rate**: [PREENCHER: < 0.1%]

**Comando**:

```bash
k6 run tests/performance/load-test.js
```

---

### Ambiente de Teste Local

**Pré-requisitos**:

- [PREENCHER: Docker, Docker Compose]
- [PREENCHER: Node.js 20+]
- [PREENCHER: Outros]

**Setup**:

```bash
# Clone repo
git clone [REPO_URL]

# Install dependencies
npm install

# Start dependencies (DB, Redis, etc)
docker-compose up -d

# Run migrations
npm run migrate

# Seed test data
npm run seed

# Run tests
npm test
```

**Cleanup**:

```bash
docker-compose down -v
```

---

## 📈 Performance

### Benchmarks Atuais

**Hardware de Referência**: [PREENCHER: 2 vCPU, 4GB RAM]

**Métricas**:

| Endpoint/Operação | Throughput | p50 | p95 | p99 |
|-------------------|------------|-----|-----|-----|
| GET /users | [1000 req/s] | [50ms] | [150ms] | [300ms] |
| POST /users | [500 req/s] | [100ms] | [250ms] | [500ms] |
| GET /users/:id | [2000 req/s] | [30ms] | [100ms] | [200ms] |
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

### Otimizações Aplicadas

**Database**:

- [PREENCHER: Índices nas colunas X, Y, Z]
- [PREENCHER: Connection pooling configurado]
- [PREENCHER: Query optimization com EXPLAIN]

**Cache**:

- [PREENCHER: Cache de queries frequentes]
- [PREENCHER: Cache de sessions]
- [PREENCHER: Cache warming strategy]

**Código**:

- [PREENCHER: Algoritmo X otimizado de O(n²) para O(n log n)]
- [PREENCHER: Lazy loading de dados]
- [PREENCHER: Streaming de grandes payloads]

**Rede**:

- [PREENCHER: HTTP/2 habilitado]
- [PREENCHER: Response compression (gzip)]
- [PREENCHER: Keep-alive connections]

### Bottlenecks Conhecidos

| Componente | Descrição | Impacto | Plano de Resolução | ETA |
|------------|-----------|---------|-------------------|-----|
| [PREENCHER] | [Query N+1 em endpoint X] | [Latência +500ms] | [Usar eager loading] | [Q2 2024] |
| [PREENCHER] | [Serialização JSON lenta] | [Throughput -30%] | [Usar biblioteca mais rápida] | [Q3 2024] |

### Limites e Capacidade

**Capacidade Atual**:

- **Max Throughput**: [PREENCHER: 10K req/s]
- **Max Concurrent Users**: [PREENCHER: 50K]
- **Max Database Connections**: [PREENCHER: 100]

**Próximo Bottleneck**: [PREENCHER: Database em ~15K req/s]

**Plano de Escalabilidade**: [PREENCHER: Como escalar quando atingir limites]

---

## 💰 Custos

### Custo Mensal Atual

**Breakdown por Ambiente**:

| Recurso | Dev | Staging | Prod | Total |
|---------|-----|---------|------|-------|
| Compute (ECS/K8s) | $50 | $200 | $800 | $1,050 |
| Database | $20 | $100 | $500 | $620 |
| Cache (Redis) | $10 | $30 | $150 | $190 |
| Load Balancer | - | $20 | $50 | $70 |
| Data Transfer | $5 | $20 | $100 | $125 |
| Logs | $10 | $30 | $80 | $120 |
| Monitoring | - | $10 | $30 | $40 |
| **Total** | **$95** | **$410** | **$1,710** | **$2,215** |

### Principais Drivers de Custo

1. **Compute** (47%): [PREENCHER: Maior custo devido a X instâncias]
2. **Database** (28%): [PREENCHER: RDS com high IOPS]
3. **Cache** (9%): [PREENCHER: Redis cluster]

### Otimizações de Custo Aplicadas

- [PREENCHER: Spot instances para workers não-críticos]
- [PREENCHER: Reserved instances com 1 ano commitment (-30%)]
- [PREENCHER: Auto-scaling agressivo em horários de baixo uso]

### Projeção de Crescimento

**Estimativa com Crescimento de 2x Usuários**:

- **Compute**: $800 → $1,400 (+75%)
- **Database**: $500 → $900 (+80%)
- **Cache**: $150 → $250 (+67%)
- **Total**: $1,710 → $2,900 (+70%)

---

## 🔄 CI/CD

### Pipeline Overview

```text
[PREENCHER: Fluxo visual do pipeline]

Commit → Lint → Unit Tests → Build → Integration Tests → 
Security Scan → Deploy Staging → Smoke Tests → Deploy Prod
```

### Stages Detalhadas

#### 1. Code Quality

```yaml
lint:
  - ESLint
  - Prettier check
  - TypeScript check
```

**Duração**: ~1 min

---

#### 2. Unit Tests

```yaml
test:
  - Run unit tests
  - Generate coverage report
  - Fail if coverage < 80%
```

**Duração**: ~3 min

---

#### 3. Build

```yaml
build:
  - npm run build
  - Build Docker image
  - Tag image with commit SHA
  - Push to ECR/Docker Hub
```

**Duração**: ~5 min

---

#### 4. Integration Tests

```yaml
integration:
  - Start test containers (DB, Redis)
  - Run integration tests
  - Stop containers
```

**Duração**: ~5 min

---

#### 5. Security Scan

```yaml
security:
  - Snyk scan dependencies
  - Trivy scan Docker image
  - SAST with SonarQube
```

**Duração**: ~3 min

---

#### 6. Deploy Staging

```yaml
deploy_staging:
  - Update ECS task definition
  - Deploy to staging
  - Wait for health checks
```

**Duração**: ~5 min

---

#### 7. Smoke Tests

```yaml
smoke_tests:
  - Run critical path tests
  - Verify deployment health
```

**Duração**: ~2 min

---

#### 8. Deploy Production (Manual Approval)

```yaml
deploy_production:
  - Require manual approval
  - Blue/Green deployment
  - Monitor metrics for 30min
  - Auto-rollback if errors > 1%
```

**Duração**: ~10 min

---

### Tempo Total de Deploy

- **Staging**: ~15 minutos (automático)
- **Produção**: ~25 minutos (com aprovação manual)

### Triggers

**Staging**:

- Automático em push para `main`
- Automático em pull request (apenas build e test)

**Produção**:

- Manual via GitHub Release
- Tag com formato `v*.*.*`

### Rollback

**Automático**:

- Error rate > 5% por 5 minutos
- Health check failures > 50%
- Latência p99 > 5s

**Manual**:

```bash
# Via CLI
aws ecs update-service --service api --task-definition api:PREVIOUS_VERSION

# Via Terraform
terraform apply -var="image_tag=v1.2.3"
```

**Tempo para Rollback**: ~3 minutos

---

## 📝 Runbooks

### Como Deployar Manualmente

```bash
# 1. Build local
npm run build

# 2. Build Docker image
docker build -t my-api:latest .

# 3. Tag image
docker tag my-api:latest 123456.dkr.ecr.us-east-1.amazonaws.com/my-api:v1.2.3

# 4. Push image
docker push 123456.dkr.ecr.us-east-1.amazonaws.com/my-api:v1.2.3

# 5. Update service
aws ecs update-service \
  --cluster production \
  --service api \
  --force-new-deployment
```

---

### Como Fazer Rollback

```bash
# 1. Identificar versão anterior
aws ecs describe-services --cluster prod --service api

# 2. Deploy versão anterior
aws ecs update-service \
  --cluster production \
  --service api \
  --task-definition api:123  # task definition anterior

# 3. Verificar deploy
aws ecs wait services-stable \
  --cluster production \
  --services api
```

---

### Como Debugar em Produção

**1. Verificar Logs**:

```bash
# Via CloudWatch Logs
aws logs tail /ecs/api --follow

# Via kubectl (se Kubernetes)
kubectl logs -f deployment/api -n production
```

**2. Verificar Métricas**:

- Dashboard: [PREENCHER: Link]
- Verificar erro rate, latência, throughput

**3. Acessar Container** (emergência):

```bash
# ECS Exec
aws ecs execute-command \
  --cluster production \
  --task TASK_ID \
  --container api \
  --interactive \
  --command "/bin/bash"

# Kubernetes
kubectl exec -it POD_NAME -n production -- /bin/bash
```

**4. Verificar Database**:

```bash
# Queries lentas
SELECT * FROM pg_stat_activity WHERE state = 'active';

# Conexões ativas
SELECT count(*) FROM pg_stat_activity;
```

---

### Como Investigar Problema de Performance

**1. Identificar Endpoint Lento**:

```bash
# APM (ex: DataDog)
- Verificar traces por endpoint
- Identificar operações lentas (queries, external calls)
```

**2. Analisar Queries**:

```sql
-- PostgreSQL slow query log
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
```

**3. Profiling** (se necessário):

```bash
# Node.js
node --inspect app.js
# Conectar Chrome DevTools

# Python
python -m cProfile -o output.prof app.py
```

---

### Como Escalar Manualmente

**Horizontal Scaling**:

```bash
# ECS
aws ecs update-service \
  --cluster production \
  --service api \
  --desired-count 10

# Kubernetes
kubectl scale deployment api --replicas=10 -n production
```

**Vertical Scaling**:

```bash
# Atualizar task definition com mais CPU/RAM
# Fazer novo deploy
```

---

## 🚨 Incidentes Conhecidos

| Data | Severidade | Problema | Causa Raiz | Solução | Prevenção |
|------|------------|----------|------------|---------|-----------|
| 2024-01-15 | 🔴 Crítico | API indisponível por 2h | Database connection pool esgotado | Aumentado max connections | Monitoramento de pool |
| 2024-02-03 | 🟡 Médio | Latência alta | Cache miss ratio alto após deploy | Implementado cache warming | Cache warming no deploy |
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

### Post-Mortems

- [2024-01-15 - Outage de 2h](./incidents/2024-01-15-database-pool.md)
- [2024-02-03 - Degradação de Performance](./incidents/2024-02-03-cache-miss.md)

---

## 🔗 Referências

**Documentação Interna**:

- [Arquitetura Detalhada](../../05_building-blocks/005_building-block-view.md)
- [ADRs Relacionadas](../../09_decisions/009_architectural-decisions.md)
- [Componentes Internos](../components/CNT-[XXX]_[nome]/)

**Documentação Externa**:

- [Framework Docs](https://example.com)
- [Database Docs](https://example.com)

**Dashboards e Monitoramento**:

- [Grafana Dashboard](https://grafana.exemplo.com/dashboard/api)
- [Logs](https://cloudwatch.amazonaws.com/logs/api)
- [Traces](https://jaeger.exemplo.com/trace/api)
- [Alertas](https://pagerduty.com/service/api)

**Repositório**:

- [GitHub/GitLab](https://github.com/org/repo)
- [CI/CD Pipelines](https://github.com/org/repo/actions)

---

## 🔗 Navegação

**Hierarquia**:

- ⬆️ **Parent**: [Building Blocks Overview](../005_building-block-view.md)
- ⬇️ **Children** (Componentes):
  - [CMP-XXX Nome](../components/CNT-[XXX]_[nome]/CMP-XXX_nome.md)
  - [Ver todos](../components/CNT-[XXX]_[nome]/)

**Relacionados**:

- 🌐 **Context**:
  - Usado por [ACT-XXX](../../03_context/actors/ACT-XXX_nome.md)
  - Integra com [SYS-XXX](../../03_context/systems/SYS-XXX_nome.md)
- 🎬 **Runtime**: [Cenários de Uso](../../06_runtime/006_runtime-view.md)
- 🚀 **Deployment**: [Infraestrutura](../../07_deployment/007_deployment-view.md)
- 🔐 **Security**: [Crosscutting Concepts](../../08_crosscutting/008_crosscutting-concepts.md)
- 📝 **Decisões**: [ADRs Relevantes](../../09_decisions/009_architectural-decisions.md)
- 🎯 **Quality**: [Requisitos](../../10_quality/010_quality-requirements.md)
- ⚠️ **Riscos**: [Risks & Debt](../../11_risks/011_risks-and-technical-debt.md)
- 📖 **Glossário**: [Termos](../../12_glossary/012_glossary.md)

---

**Criado em**: [YYYY-MM-DD]  
**Atualizado em**: [YYYY-MM-DD]  
**Responsável**: [PREENCHER]  
**Team**: [PREENCHER]  
**On-call**: [PREENCHER: Link para rotação]

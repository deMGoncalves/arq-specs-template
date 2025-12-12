# Container: [Nome do Container]

**ID do Template**: TPL-C4-002
**ID**: CNT-[XXX]
**Versão**: 2.0.0
**Categoria**: Modelo C4
**Nível**: C4 Nível 2 (Container)
**Tipo**: Container (C4 Nível 2)
**Status**: [Rascunho | Ativo | Depreciado]
**Usado Por**: analyst (Fase 3: Especificação), architect (Fase 2: Design)
**Última Atualização**: 2025-11-17

---

## Visão Geral

**Nome**: [Nome do Container]

**Propósito**: [Descrição de uma linha do que este container faz]

**Exemplo**:
> Servidor de API que fornece endpoints RESTful para catálogo de produtos, carrinho de compras e gestão de pedidos.

---

## Stack Tecnológica

**Tecnologia Principal**: [Linguagem/Framework/Plataforma]

**Versão**: [Número da versão]

**Runtime**: [Detalhes do ambiente]

**Exemplo**:
- **Principal**: Node.js + TypeScript + Express
- **Versão**: Node.js 20.x, TypeScript 5.x
- **Runtime**: AWS ECS Fargate (2 vCPU, 4GB RAM)

---

## Responsabilidades

Liste as principais responsabilidades deste container:

1. **[Responsabilidade 1]**: [Descrição]
2. **[Responsabilidade 2]**: [Descrição]
3. **[Responsabilidade 3]**: [Descrição]

**Exemplo**:
1. **Endpoints de API**: Expor REST API para clientes (web, mobile)
2. **Lógica de Negócio**: Executar regras de negócio e validações
3. **Acesso a Dados**: Consultar e persistir dados no banco de dados
4. **Integração Externa**: Chamar APIs externas (Stripe, Auth0, SendGrid)

---

## Dependências

### Dependências Internas (Outros Containers)

| Container ID | Nome | Relacionamento | Protocolo |
|--------------|------|----------------|-----------|
| [CNT-XXX] | [Nome] | [Tipo] | [Protocolo] |

**Exemplo**:

| Container ID | Nome | Relacionamento | Protocolo |
|--------------|------|----------------|-----------|
| CNT-003 | Banco de Dados PostgreSQL | Armazenamento de dados | Protocolo PostgreSQL |
| CNT-004 | Cache Redis | Caching | Protocolo Redis |
| CNT-005 | Background Worker | Jobs assíncronos | Event bus interno |

---

### Dependências Externas (Sistemas Externos)

| Sistema | Propósito | Protocolo | SLA | Fallback |
|---------|-----------|-----------|-----|----------|
| [Nome] | [Propósito] | [Protocolo] | [SLA] | [Estratégia] |

**Exemplo**:

| Sistema | Propósito | Protocolo | SLA | Fallback |
|---------|-----------|-----------|-----|----------|
| Auth0 | Autenticação | HTTPS/OIDC | 99.9% | Tokens em cache (2h) |
| Stripe | Pagamentos | HTTPS/REST | 99.99% | Enfileirar pagamentos, retry |
| SendGrid | Email | HTTPS/REST | 99.95% | Enfileirar emails, não-bloqueante |
| AWS S3 | Armazenamento de arquivos | HTTPS/S3 API | 99.9% | Cache CDN, placeholders |

---

## Interfaces

### Entrada (APIs Expostas)

#### API 1: [Nome]

**Protocolo**: [HTTP/REST | WebSocket | gRPC | GraphQL]

**URL Base**: `[URL]`

**Autenticação**: [Método]

**Endpoints**:

| Método | Caminho | Descrição | Auth Obrigatória |
|--------|---------|-----------|------------------|
| [GET] | [/path] | [Descrição] | [Sim/Não] |

**Exemplo**:

**Protocolo**: HTTP/REST (JSON)

**URL Base**: `https://api.example.com/v1`

**Autenticação**: Token JWT Bearer (opcional para endpoints públicos)

**Endpoints**:

| Método | Caminho | Descrição | Auth Obrigatória |
|--------|---------|-----------|------------------|
| GET | /products | Listar produtos (paginado) | Não |
| GET | /products/{id} | Obter detalhes do produto | Não |
| POST | /cart | Adicionar item ao carrinho | Sim |
| GET | /cart | Ver carrinho | Sim |
| POST | /orders | Criar pedido | Sim |
| GET | /orders/{id} | Obter status do pedido | Sim |

**Limites de Taxa**:
- Anônimo: 100 req/hora
- Autenticado: 1.000 req/hora

**Formato de Erro** (RFC 7807):
```json
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validação Falhou",
  "status": 400,
  "detail": "Formato de email é inválido",
  "instance": "/users"
}
```

---

### Saída (APIs Consumidas)

Liste APIs externas que este container chama:

| API | Propósito | Endpoint | Auth |
|-----|-----------|----------|------|
| [Nome] | [Propósito] | [URL] | [Método] |

**Exemplo**:

| API | Propósito | Endpoint | Auth |
|-----|-----------|----------|------|
| Auth0 | Verificar JWT | `https://auth.example.com/userinfo` | Bearer token |
| Stripe | Criar pagamento | `https://api.stripe.com/v1/payment_intents` | API Key |
| SendGrid | Enviar email | `https://api.sendgrid.com/v3/mail/send` | API Key |

---

## Modelo de Dados

### Tabelas do Banco de Dados (se aplicável)

| Tabela | Propósito | Colunas-Chave |
|--------|-----------|---------------|
| [table_name] | [Propósito] | [Colunas] |

**Exemplo**:

| Tabela | Propósito | Colunas-Chave |
|--------|-----------|---------------|
| products | Catálogo de produtos | id, sku, name, price, stock |
| orders | Pedidos de clientes | id, user_id, status, total, created_at |
| order_items | Itens de linha do pedido | id, order_id, product_id, quantity, price |
| users | Contas de usuário | id, email, created_at |

**Detalhes do Schema**: Ver `docs/database/schema.md`

---

### Chaves de Cache (se aplicável)

| Padrão de Chave | Propósito | TTL |
|-----------------|-----------|-----|
| [padrão] | [Propósito] | [Duração] |

**Exemplo**:

| Padrão de Chave | Propósito | TTL |
|-----------------|-----------|-----|
| `product:{id}` | Detalhes de produto em cache | 1 hora |
| `cart:{userId}` | Carrinho de compras do usuário | 24 horas |
| `session:{token}` | Sessão de usuário | 2 horas |

---

## Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatória | Padrão | Exemplo |
|----------|-----------|-------------|--------|---------|
| [VAR_NAME] | [Descrição] | [Sim/Não] | [Valor] | [Exemplo] |

**Exemplo**:

| Variável | Descrição | Obrigatória | Padrão | Exemplo |
|----------|-----------|-------------|--------|---------|
| PORT | Porta HTTP | Não | 3000 | 8080 |
| DATABASE_URL | String de conexão PostgreSQL | Sim | - | `postgresql://...` |
| REDIS_URL | String de conexão Redis | Sim | - | `redis://...` |
| AUTH0_DOMAIN | Domínio Auth0 | Sim | - | `example.auth0.com` |
| STRIPE_API_KEY | Chave secreta Stripe | Sim | - | `sk_live_...` |
| LOG_LEVEL | Nível de logging | Não | info | debug |

---

## Deployment

### Infraestrutura

**Plataforma**: [AWS ECS | Kubernetes | Docker | VM]

**Escalabilidade**:
- **Instâncias Mín**: [X]
- **Instâncias Máx**: [Y]
- **Gatilho de Auto-scale**: [Métrica] > [Limiar]

**Recursos**:
- **CPU**: [X] vCPU
- **Memória**: [Y] GB
- **Disco**: [Z] GB

**Exemplo**:

**Plataforma**: AWS ECS Fargate

**Escalabilidade**:
- **Instâncias Mín**: 2
- **Instâncias Máx**: 20
- **Gatilho de Auto-scale**: CPU > 70% ou Memória > 80%

**Recursos**:
- **CPU**: 2 vCPU
- **Memória**: 4 GB
- **Disco**: 10 GB (efêmero)

---

### Rede

**Portas**:
- [Porta]: [Propósito]

**Exemplo**:
- 3000: HTTP API
- 9090: Métricas (Prometheus)

**Load Balancer**:
- Tipo: Application Load Balancer (ALB)
- Health Check: GET /health a cada 30s
- Timeout: 5s

---

### Monitoramento

**Logs**:
- **Formato**: JSON (estruturado)
- **Destino**: CloudWatch Logs
- **Retenção**: 7 dias

**Métricas**:
- **Uso de CPU**: % utilização
- **Uso de Memória**: % utilização
- **Taxa de Requisições**: req/s
- **Taxa de Erros**: erros/s
- **Tempo de Resposta**: p50, p95, p99

**Alertas**:
- Taxa de erro > 1% → PagerDuty
- Tempo de resposta p95 > 1s → Slack
- CPU > 90% → Email

---

## Atributos de Qualidade

### Performance

- **Tempo de Resposta**: p95 < [X]ms, p99 < [Y]ms
- **Throughput**: [X] req/s
- **Conexões Concorrentes**: [X]

**Exemplo**:
- **Tempo de Resposta**: p95 < 200ms, p99 < 500ms
- **Throughput**: 5.000 req/s
- **Conexões Concorrentes**: 10.000

---

### Disponibilidade

- **SLA**: [X]% uptime
- **RTO**: < [X] minutos
- **RPO**: < [X] minutos

**Exemplo**:
- **SLA**: 99.9% uptime (~43 min downtime/mês)
- **RTO**: < 5 minutos (auto-restart)
- **RPO**: N/A (stateless)

---

### Segurança

- **TLS**: Versão [X]
- **Autenticação**: [Método]
- **Validação de Input**: [Sim/Não]
- **Rate Limiting**: [Limites]
- **Gestão de Secrets**: [Método]

**Exemplo**:
- **TLS**: 1.3 (forçado)
- **Autenticação**: Tokens JWT Bearer
- **Validação de Input**: Schemas Joi em todos os inputs
- **Rate Limiting**: 1.000 req/hora por usuário
- **Gestão de Secrets**: AWS Secrets Manager

---

## Componentes

Liste componentes principais dentro deste container (C4 Nível 3):

| Component ID | Nome | Propósito |
|--------------|------|-----------|
| [CMP-XXX] | [Nome] | [Propósito] |

**Exemplo**:

| Component ID | Nome | Propósito |
|--------------|------|-----------|
| CMP-001 | Auth Service | Lidar com autenticação/autorização |
| CMP-002 | Product Service | Gerenciar catálogo de produtos |
| CMP-003 | Cart Service | Gerenciar carrinhos de compra |
| CMP-004 | Order Service | Processar pedidos |
| CMP-005 | Payment Service | Integrar com Stripe |

**Detalhes**: Ver `specs/05_building-blocks/components/CMP-*`

---

## Testes

### Estratégia de Testes

- **Testes Unitários**: [X]% cobertura
- **Testes de Integração**: [Escopo]
- **Testes E2E**: [Caminhos críticos]

**Exemplo**:
- **Testes Unitários**: 80% cobertura (lógica de negócio)
- **Testes de Integração**: Endpoints de API + banco de dados
- **Testes E2E**: Fluxo de checkout (caminho feliz)

### Dados de Teste

- **Desenvolvimento**: Dados fake (Faker.js)
- **Staging**: Dados de produção anonimizados
- **Produção**: Dados reais

---

## Notas de Migração

### Da Versão [X] para [Y]

- **Mudanças Quebradas**: [Lista]
- **Passos de Migração**: [Passos]
- **Plano de Rollback**: [Plano]

**Exemplo**:

### Da v1.0 para v2.0

- **Mudanças Quebradas**:
  - API: `/api/v1/products` → `/api/v2/products`
  - Formato de resposta mudou (camelCase → snake_case)

- **Passos de Migração**:
  1. Deployar v2.0 junto com v1.0 (ambas versões rodando)
  2. Atualizar clientes para usar `/api/v2`
  3. Monitorar por 1 semana
  4. Depreciar `/api/v1` (retornar 410 Gone)

- **Plano de Rollback**: Tráfego de volta para v1.0 via regras ALB

---

## Documentos Relacionados

- [Visão Geral da Arquitetura](../../arc42/01_introduction.md)
- [Detalhes de Componentes](../components/CMP-*)
- [Documentação da API](docs/api.md)
- [Runbook](docs/runbook.md)

---

## Templates Relacionados

### Pré-requisitos
- **system-context.md** (TPL-C4-001) - Diagrama de Contexto do Sistema deve existir primeiro

### Segue Este Template
- **component.md** (TPL-C4-003) - Zoom nos containers para mostrar componentes (C4 Nível 3)

### Parte De
- **arc42/05_building-blocks.md** (TPL-ARC42-05) - Capítulo 5 do Arc42: Building Blocks

### Veja Também
- **arc42/04_solution-strategy.md** (TPL-ARC42-04) - Estratégia de solução e escolhas de tecnologia
- **arc42/07_deployment.md** (TPL-ARC42-07) - Visão de deployment
- **design.md** (TPL-WORKFLOW-002) - Documento de design de arquitetura

---

## Integração com Workflow

**Fase**: 2 (Arquitetura) ou 3 (Especificação)

**Skill Principal**:
- **analyst** - Cria como parte do spec.md (Fase 3)
- **architect** - Cria como parte do design.md para complexidade HIGH (Fase 2)

**Localização de Output**:
- `changes/[change-id]/design.md` (se Fase 2)
- `specs/05_building-blocks/containers/CNT-*.md` (se Fase 3)

**Pré-requisitos**:
- Diagrama de Contexto do Sistema criado (C4 Nível 1)
- Limites do sistema definidos

**Próximos Passos**:
- Criar diagramas de Componente para containers complexos (C4 Nível 3)
- Definir cenários de runtime (Capítulo 6 do Arc42)

---

## Histórico de Mudanças

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 2.0.0 | 2025-11-17 | Padronização de Templates | Adicionado Template ID, Templates Relacionados, Integração com Workflow |
| 1.0.0 | [Data] | [Nome] | Versão inicial |

---

**Parent**: [05. Building Blocks](../../arc42/05_building-blocks.md)
**Tipo**: Container (C4 Nível 2)

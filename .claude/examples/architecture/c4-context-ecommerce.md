# Exemplo: Diagrama C4 Contexto - Sistema E-Commerce

**Tipo**: Exemplo de Arquitetura
**Nível C4**: 1 (Contexto do Sistema)
**Domínio**: E-Commerce B2C
**Última Atualização**: 2025-11-17

---

## Visão Geral

Este é um exemplo de diagrama C4 Nível 1 (Contexto do Sistema) para uma plataforma de e-commerce.

## Diagrama de Contexto

```
                    ┌─────────────────┐
                    │     Cliente     │
                    │   (Web/Mobile)  │
                    └────────┬────────┘
                             │ HTTPS
                             ↓
        ┌────────────────────────────────────────────┐
        │                                            │
        │      Plataforma E-Commerce                 │
        │                                            │
        │  - Catálogo de produtos                    │
        │  - Carrinho de compras                     │
        │  - Checkout e pagamentos                   │
        │  - Rastreamento de pedidos                 │
        │                                            │
        └──┬──────┬──────┬──────┬──────┬──────┬─────┘
           │      │      │      │      │      │
    ┌──────┘      │      │      │      │      └──────┐
    │             │      │      │      │             │
    ↓             ↓      ↓      ↓      ↓             ↓
┌────────┐  ┌────────┐ ┌────┐ ┌────┐ ┌─────┐  ┌─────────┐
│ Auth0  │  │Stripe  │ │AWS │ │Send│ │Mix  │  │Sistema  │
│(OAuth2)│  │(Pagam.)│ │ S3 │ │Grid│ │panel│  │Estoque  │
└────────┘  └────────┘ └────┘ └────┘ └─────┘  │(ERP)    │
                                                └─────────┘
```

## Atores

### ATR-001: Cliente
**Tipo**: Humano (Web/Mobile)

**Descrição**: Pessoa que compra produtos na plataforma

**Objetivos**:
- Encontrar produtos rapidamente
- Completar compra com segurança
- Rastrear status do pedido

**Interações**:
- Navegar catálogo de produtos (leitura)
- Buscar produtos (leitura)
- Adicionar itens ao carrinho (escrita)
- Completar checkout (escrita)
- Ver histórico de pedidos (leitura)

**Autenticação**: Opcional (checkout como convidado) ou OAuth 2.0 (usuário registrado)

**Volume**: ~50K usuários ativos/dia, 200K usuários registrados

---

## Sistemas Externos

### SIS-001: Auth0
**Provedor**: Okta (Auth0)
**Propósito**: Autenticação e autorização de usuários
**Protocolo**: HTTPS/REST + OIDC
**SLA**: 99,9% uptime
**Dependência**: Crítica
**Fallback**: Cache de tokens (2h TTL), modo somente leitura

**Fluxo de Dados**:
- **Para Auth0**: Login requests, token refresh
- **De Auth0**: JWT tokens, perfil de usuário

---

### SIS-002: Stripe
**Provedor**: Stripe, Inc.
**Propósito**: Processamento de pagamentos com cartão
**Protocolo**: HTTPS/REST
**SLA**: 99,99% uptime
**Dependência**: Crítica
**Fallback**: Enfileirar pagamentos, processamento manual

**Fluxo de Dados**:
- **Para Stripe**: Payment intents, dados de cliente (tokenizados)
- **De Stripe**: Status de pagamento, webhooks (payment.succeeded)

---

### SIS-003: AWS S3
**Provedor**: Amazon Web Services
**Propósito**: Armazenamento de imagens de produtos
**Protocolo**: HTTPS/REST (S3 API)
**SLA**: 99,9% uptime
**Dependência**: Alta
**Fallback**: CDN cache (CloudFront, 24h TTL), imagens placeholder

**Fluxo de Dados**:
- **Para S3**: Upload de imagens (multipart)
- **De S3**: URLs de imagens (via CloudFront CDN)

---

### SIS-004: SendGrid
**Provedor**: Twilio SendGrid
**Propósito**: Emails transacionais (confirmação, notificações)
**Protocolo**: HTTPS/REST
**SLA**: 99,95% uptime
**Dependência**: Média
**Fallback**: Enfileirar emails, retry com backoff, não-bloqueante

**Fluxo de Dados**:
- **Para SendGrid**: Templates, destinatários, variáveis
- **De SendGrid**: Status de entrega, webhooks (delivered, bounced)

---

### SIS-005: Mixpanel
**Provedor**: Mixpanel, Inc.
**Propósito**: Analytics de produto e comportamento de usuário
**Protocolo**: HTTPS/REST
**SLA**: 99,9% uptime
**Dependência**: Baixa
**Fallback**: Dados em buffer local, envio assíncrono

**Fluxo de Dados**:
- **Para Mixpanel**: Eventos de usuário, propriedades, métricas
- **De Mixpanel**: N/A (apenas análise)

---

### SIS-006: Sistema de Estoque (ERP Legado)
**Provedor**: Sistema interno da empresa
**Propósito**: Sincronização de inventário e estoque
**Protocolo**: REST API (JSON)
**SLA**: 99% uptime
**Dependência**: Alta
**Fallback**: Cache local de inventário, sincronização noturna

**Fluxo de Dados**:
- **Para ERP**: Pedidos confirmados, reservas de estoque
- **Do ERP**: Atualizações de inventário, webhooks (stock.updated)

---

## Interfaces

### INT-001: API REST Pública
**Protocolo**: HTTPS/REST
**Formato**: JSON
**URL Base**: `https://api.exemplo.com/v1`

**Autenticação**:
- Endpoints públicos: Nenhuma
- Endpoints protegidos: JWT Bearer token

**Endpoints Principais**:
```
GET    /products              # Listar produtos
GET    /products/{id}         # Detalhes do produto
POST   /cart                  # Adicionar ao carrinho
GET    /cart                  # Ver carrinho
POST   /orders                # Criar pedido
GET    /orders/{id}           # Status do pedido
```

**Rate Limiting**:
- Anônimo: 100 req/hora
- Autenticado: 1000 req/hora

---

## Padrões de Comunicação

### Requisição/Resposta (Síncrono)
**Usado para**: Navegação de produtos, checkout
**Timeout**: 30s
**Retry**: Não (operações idempotentes apenas)

### Webhooks (Assíncrono)
**Usado para**: Notificações de pagamento, atualizações de estoque
**Retry**: Backoff exponencial (1s, 2s, 4s, 8s, 16s)
**Tentativas máximas**: 5

### Processamento em Lote
**Usado para**: Sincronização de inventário noturna
**Frequência**: Diária (2:00 AM)
**Volume**: ~10K atualizações/dia

---

## Decisões de Limite

### ✅ Dentro do Sistema
- Gestão de catálogo de produtos
- Lógica de carrinho de compras
- Workflow de pedidos
- Gestão de sessão de usuário

### ❌ Fora do Sistema
- Autenticação (Auth0)
- Processamento de pagamentos (Stripe)
- Armazenamento de imagens (S3)
- Entrega de email (SendGrid)
- Analytics (Mixpanel)
- Gestão de inventário (ERP)

**Fundamentação**: Foco em lógica de negócio core, usar serviços especializados para infraestrutura.

---

## Riscos & Mitigação

| Sistema Externo | Risco | Probabilidade | Impacto | Mitigação |
|-----------------|-------|---------------|---------|-----------|
| Auth0 | Outage | Baixa | Alto | Cache de tokens, modo read-only |
| Stripe | Outage | Baixa | Crítico | Enfileirar pagamentos, fallback manual |
| S3 | Outage | Baixa | Médio | CDN cache, imagens placeholder |
| SendGrid | Falha | Média | Baixo | Enfileirar, retry, não-bloqueante |
| ERP | Outage | Média | Alto | Cache local, sincronização noturna |

---

## Métricas de Integração

| Integração | Volume | Latência Alvo | SLA |
|------------|--------|---------------|-----|
| Auth0 | 10K req/dia | <200ms | 99,9% |
| Stripe | 2K transações/dia | <500ms | 99,99% |
| S3 | 50K imagens/dia | <100ms (CDN) | 99,9% |
| SendGrid | 5K emails/dia | Assíncrono | 99,95% |
| ERP | 10K sync/dia | <2s | 99% |

---

**Exemplo criado para**: Demonstrar estrutura C4 Nível 1 completa
**Use como referência para**: Documentar contexto do seu sistema em `specs/03_context/`

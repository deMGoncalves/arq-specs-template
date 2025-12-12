# 03. Contexto e Escopo

**ID do Template**: TPL-ARC42-03
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 3 (Contexto e Escopo)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-03
**Status**: [Rascunho | Em Revisão | Aprovado]

---

## Visão Geral

Este capítulo descreve o contexto do sistema - como ele se encaixa em seu ambiente e quais são seus limites. Este é o **C4 Nível 1** (Contexto do Sistema).

---

## Contexto de Negócio

### C4 Nível 1: Diagrama de Contexto do Sistema

```
┌─────────────┐
│   End User  │
│  (Browser)  │
└──────┬──────┘
       │ HTTPS
       ↓
┌─────────────────────────────────────┐
│                                     │
│      [Nome do Sistema]              │
│                                     │
│   [Descrição breve]                 │
│                                     │
└──────┬──────────────┬───────────────┘
       │              │
       │              │ HTTPS/REST
       ↓              ↓
┌──────────────┐  ┌─────────────┐
│    Auth0     │  │   Stripe    │
│  (OAuth 2.0) │  │  (Payment)  │
└──────────────┘  └─────────────┘
```

**Exemplo (Plataforma E-Commerce)**:
```
         ┌─────────────┐                    ┌──────────────┐
         │  Cliente    │                    │  Admin User  │
         │   (Web)     │                    │   (Web)      │
         └──────┬──────┘                    └──────┬───────┘
                │ HTTPS                            │ HTTPS
                │                                  │
                ↓                                  ↓
         ┌──────────────────────────────────────────────┐
         │                                              │
         │       Plataforma E-Commerce                  │
         │                                              │
         │  Navegar produtos, gerenciar carrinho,       │
         │  checkout, rastrear pedidos                  │
         │                                              │
         └────┬──────┬──────┬───────┬──────────┬────────┘
              │      │      │       │          │
     ┌────────┘      │      │       │          └────────┐
     │               │      │       │                   │
     ↓               ↓      ↓       ↓                   ↓
┌─────────┐   ┌─────────┐ ┌────────┐ ┌──────────┐ ┌─────────┐
│  Auth0  │   │ Stripe  │ │SendGrid│ │   AWS    │ │Analytics│
│(OAuth2.0)│  │(Payment)│ │(Email) │ │   S3     │ │(Mixpanel)│
└─────────┘   └─────────┘ └────────┘ └──────────┘ └─────────┘
```

---

## Atores (Usuários)

### Atores Primários

#### ATR-001: [Nome do Ator]

**Tipo**: [Humano | Sistema | Dispositivo]

**Descrição**: [Quem/o que é este ator]

**Objetivos**:
- [Objetivo 1]
- [Objetivo 2]

**Interações**:
- [Interação 1]: [Descrição]
- [Interação 2]: [Descrição]

**Autenticação**: [Método]

**Autorização**: [Permissões/papéis]

---

**Exemplo:**

#### ATR-001: Cliente Final

**Tipo**: Humano (Navegador Web)

**Descrição**: Pessoa comprando na plataforma de e-commerce

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

**Autorização**:
- Leitura: Produtos públicos
- Escrita: Próprio carrinho, próprios pedidos

---

#### ATR-002: Administrador

**Tipo**: Humano (Navegador Web)

**Descrição**: Equipe gerenciando inventário, pedidos, clientes

**Objetivos**:
- Gerenciar inventário de produtos
- Processar pedidos
- Lidar com suporte ao cliente

**Interações**:
- CRUD de produtos
- Ver todos os pedidos
- Atualizar status de pedido
- Ver dados de clientes

**Autenticação**: OAuth 2.0 (obrigatório)

**Autorização**:
- Papel: Admin
- Permissões: Acesso total

---

### Atores Secundários

#### ATR-003: [Sistema Externo]

**Exemplo:**

#### ATR-003: Sistema de Inventário (Legado)

**Tipo**: Sistema (REST API)

**Descrição**: Sistema ERP legado rastreando inventário de armazém

**Interações**:
- Sistema chama API de inventário para verificar estoque
- Sistema de inventário envia atualizações de estoque via webhook

**Protocolo**: REST (JSON sobre HTTPS)

**Autenticação**: API Key

---

## Sistemas Externos

### SIS-001: [Nome do Sistema]

**Tipo**: [Serviço | Banco de Dados | API]

**Provedor**: [Empresa/organização]

**Propósito**: [O que faz por nós]

**Protocolo**: [Método de comunicação]

**SLA**: [Garantia de uptime]

**Fluxo de Dados**: [Quais dados são trocados]

**Nível de Dependência**: [Crítico | Alto | Médio | Baixo]

**Estratégia de Fallback**: [O que acontece se indisponível]

---

**Exemplo:**

### SIS-001: Auth0

**Tipo**: Serviço de Autenticação

**Provedor**: Auth0 (Okta)

**Propósito**: Autenticação e autorização de usuários (OAuth 2.0)

**Protocolo**: HTTPS/REST + OIDC

**SLA**: 99,9% de uptime

**Fluxo de Dados**:
- **Para Auth0**: Requisições de login, refresh de token
- **Do Auth0**: Tokens JWT, perfil de usuário

**Nível de Dependência**: Crítico

**Estratégia de Fallback**:
- Tokens em cache (2h TTL)
- Degradação graciosa (modo somente leitura)
- Fallback manual para autenticação em banco de dados (apenas emergência)

---

### SIS-002: Stripe

**Tipo**: Gateway de Pagamento

**Provedor**: Stripe, Inc.

**Propósito**: Processar pagamentos com cartão de crédito

**Protocolo**: HTTPS/REST

**SLA**: 99,99% de uptime

**Fluxo de Dados**:
- **Para Stripe**: Payment intents, dados de cliente (tokenizados)
- **Do Stripe**: Status de pagamento, webhooks (payment.succeeded)

**Nível de Dependência**: Crítico

**Estratégia de Fallback**:
- Enfileirar pagamentos (retry até 24h)
- Mostrar mensagem de manutenção aos usuários
- Processamento manual de pagamento (fallback)

---

### SIS-003: SendGrid

**Tipo**: Serviço de Email

**Provedor**: Twilio SendGrid

**Propósito**: Emails transacionais (confirmação de pedido, reset de senha)

**Protocolo**: HTTPS/REST

**SLA**: 99,95% de uptime

**Fluxo de Dados**:
- **Para SendGrid**: Templates de email, lista de destinatários, variáveis
- **Do SendGrid**: Status de entrega, webhooks (delivered, bounced)

**Nível de Dependência**: Médio

**Estratégia de Fallback**:
- Enfileirar emails (retry com backoff exponencial)
- Logar falhas para follow-up manual
- Sistema permanece operacional (email não bloqueante)

---

### SIS-004: AWS S3

**Tipo**: Object Storage

**Provedor**: Amazon Web Services

**Propósito**: Armazenar imagens de produtos, uploads de usuários

**Protocolo**: HTTPS/REST (S3 API)

**SLA**: 99,9% de uptime

**Fluxo de Dados**:
- **Para S3**: Uploads de imagens (multipart)
- **Do S3**: URLs de imagens (via CloudFront CDN)

**Nível de Dependência**: Alto

**Estratégia de Fallback**:
- Cache CDN (CloudFront, 24h TTL)
- Imagens placeholder se S3 indisponível
- Retry de uploads em background

---

## Interfaces

### Interfaces Técnicas

#### INT-001: [Nome da Interface]

**Protocolo**: [HTTP/REST | WebSocket | gRPC | Fila de Mensagens]

**Formato**: [JSON | XML | Protocol Buffers]

**Autenticação**: [Método]

**Endpoints**: [Lista ou link para doc da API]

**Limites de Taxa**: [Limites]

---

**Exemplo:**

#### INT-001: API REST Pública

**Protocolo**: HTTPS/REST

**Formato**: JSON

**Autenticação**:
- Endpoints públicos: Nenhuma
- Endpoints protegidos: Token JWT Bearer

**URL Base**: `https://api.example.com/v1`

**Endpoints**:
```
GET    /products              # Listar produtos
GET    /products/{id}         # Obter detalhes do produto
POST   /cart                  # Adicionar ao carrinho
GET    /cart                  # Ver carrinho
POST   /orders                # Criar pedido
GET    /orders/{id}           # Obter status do pedido
```

**Limites de Taxa**:
- Anônimo: 100 req/hora
- Autenticado: 1000 req/hora

**Formato de Erro** (RFC 7807):
```json
{
  "type": "https://api.example.com/errors/rate-limit",
  "title": "Limite de taxa excedido",
  "status": 429,
  "detail": "Você excedeu 100 requisições por hora",
  "instance": "/products"
}
```

---

#### INT-002: Webhooks (Entrada)

**Protocolo**: HTTPS/POST

**Formato**: JSON

**Autenticação**: Verificação de assinatura HMAC-SHA256

**Fontes**:
- Stripe: `payment.succeeded`, `payment.failed`
- SendGrid: `delivered`, `bounced`, `opened`

**Endpoint**: `https://api.example.com/webhooks/{provider}`

**Política de Retry**:
- Backoff exponencial: 1s, 2s, 4s, 8s, 16s
- Tentativas máximas: 5
- Timeout: 30s

---

### Interfaces de Dados

#### Troca de Dados com Sistemas Externos

**Formato**: [JSON | CSV | XML]

**Frequência**: [Tempo real | Por hora | Diário]

**Volume**: [Registros por dia]

**Exemplo:**

**Sincronização de Inventário**:
- **Direção**: Sistema de Inventário → Plataforma
- **Formato**: JSON
- **Frequência**: Tempo real (webhook) + lote noturno
- **Volume**: ~10K atualizações/dia
- **Schema**:
```json
{
  "sku": "LAPTOP-001",
  "quantity": 50,
  "updated_at": "2025-11-15T10:30:00Z"
}
```

---

## Padrões de Comunicação

### Padrão 1: Requisição/Resposta

**Usado para**: Chamadas de API (REST)

**Características**:
- Síncrono
- Cliente aguarda resposta
- Timeout: 30s

**Exemplo**: Usuário busca por produtos → API retorna resultados

---

### Padrão 2: Orientado a Eventos (Webhooks)

**Usado para**: Notificações assíncronas

**Características**:
- Assíncrono
- Consistência eventual
- Retry com backoff exponencial

**Exemplo**: Pagamento Stripe sucede → Webhook → Pedido confirmado

---

### Padrão 3: Processamento em Lote

**Usado para**: Operações em massa não urgentes

**Características**:
- Agendado (cron)
- Grande volume
- Baixa prioridade

**Exemplo**: Sincronização de inventário noturna do ERP

---

## Visão Geral do Fluxo de Dados

### Exemplo de Fluxo de Checkout

```
Cliente          Plataforma        Auth0         Stripe        SendGrid
   │                 │              │              │              │
   │  Adicionar cart │              │              │              │
   ├────────────────>│              │              │              │
   │                 │              │              │              │
   │  Checkout       │              │              │              │
   ├────────────────>│              │              │              │
   │                 │  Verificar JWT│             │              │
   │                 ├─────────────>│              │              │
   │                 │<─────────────┤              │              │
   │                 │  (válido)    │              │              │
   │                 │              │              │              │
   │                 │  Criar Payment Intent       │              │
   │                 ├──────────────────────────>  │              │
   │                 │<──────────────────────────┤  │              │
   │                 │  (client_secret)           │              │
   │                 │              │              │              │
   │  Inserir cartão │              │              │              │
   │  (Stripe.js)    │              │              │              │
   ├─────────────────────────────────────────────>│              │
   │                 │              │  (pagamento) │              │
   │                 │              │              │              │
   │                 │<─────────────────────────── ┤              │
   │<────────────────┤  Webhook: payment.succeeded │              │
   │  (sucesso)      │              │              │              │
   │                 │              │              │              │
   │                 │  Enviar email de confirmação│              │
   │                 ├──────────────────────────────────────────>│
   │                 │              │              │              │
   │<────────────────┤  Confirmação de pedido                     │
   │  (email)        │              │              │              │
```

---

## Decisões de Limite

### O Que Está Dentro do Sistema

✅ **Responsabilidades deste sistema**:
- Gestão de catálogo de produtos
- Lógica de carrinho de compras
- Workflow de processamento de pedidos
- Gestão de sessão de usuário
- Lógica de negócio

### O Que Está Fora do Sistema

❌ **Não é nossa responsabilidade**:
- Autenticação de usuários (Auth0)
- Processamento de pagamentos (Stripe)
- Entrega de email (SendGrid)
- Armazenamento de imagens (AWS S3)
- Analytics (Mixpanel)

**Fundamentação**: Focar em lógica de negócio core, aproveitar serviços best-in-class para preocupações de infraestrutura.

---

## Riscos e Mitigação

| Dependência Externa | Risco | Probabilidade | Impacto | Mitigação |
|---------------------|-------|---------------|---------|-----------|
| Outage Auth0 | Usuários não conseguem logar | Baixa | Alto | Tokens em cache, modo somente leitura |
| Outage Stripe | Não pode processar pagamentos | Baixa | Crítico | Enfileirar pagamentos, fallback manual |
| Outage SendGrid | Emails não enviados | Média | Baixo | Enfileirar e retry, não-bloqueante |
| Outage S3 | Imagens indisponíveis | Baixa | Médio | Cache CDN, imagens placeholder |

---

## Histórico de Mudanças

| Versão | Data | Autor | Mudanças |
|--------|------|--------|----------|
| 1.0.0 | [Data] | [Nome] | Versão inicial |

---

**Anterior**: [02. Restrições](02_constraints.md) | **Próximo**: [04. Estratégia de Solução](04_solution-strategy.md)

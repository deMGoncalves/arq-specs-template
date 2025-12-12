# Exemplo: Cenário BDD - Checkout e Pagamento

**ID**: SCN-EXEMPLO-002
**Feature**: Processamento de Pedido e Pagamento
**Prioridade**: Crítica
**Status**: ✅ Exemplo Completo
**Ator**: Cliente (ATR-001)
**Container**: API de Pedidos (CNT-003), Integração Stripe (CNT-004)

---

## Feature

```gherkin
Feature: Checkout e Pagamento
  Como um cliente
  Eu quero completar o checkout e pagar meu pedido
  Para receber os produtos que comprei

  Background:
    Given cliente está autenticado
    And carrinho tem pelo menos 1 item
    And estoque está disponível para todos os itens
    And serviço Stripe está operacional
```

---

## Cenário 1: Checkout bem-sucedido com cartão de crédito

```gherkin
Scenario: Checkout bem-sucedido com cartão de crédito
  Given cliente "maria@exemplo.com" está autenticado
  And carrinho contém:
    | Produto      | Quantidade | Preço Unit | Total    |
    | Notebook XYZ | 1          | R$ 3.500   | R$ 3.500 |
    | Mouse ABC    | 2          | R$ 50      | R$ 100   |
  And frete para CEP "01310-100" é R$ 25,00
  And total do pedido é R$ 3.625,00
  When cliente completa checkout com cartão "4242 4242 4242 4242"
  Then pedido é criado com status "pagamento_pendente"
  And payment intent é criado no Stripe
  And cliente é redirecionado para página de pagamento
  And cliente confirma pagamento no Stripe
  And webhook "payment.succeeded" é recebido
  Then pedido muda para status "confirmado"
  And estoque é decrementado:
    | Produto      | Quantidade |
    | Notebook XYZ | -1         |
    | Mouse ABC    | -2         |
  And email de "confirmação de pedido" é enviado
  And evento "order.confirmed" é publicado
  And notificação push é enviada ao cliente
```

### Detalhes de Implementação

**Given (Estado Inicial)**:
- `carts` table:
```sql
cart_id: "cart_123"
user_id: "usr_maria"
items: [
  {product_id: "prod_001", quantity: 1, price: 3500.00},
  {product_id: "prod_002", quantity: 2, price: 50.00}
]
subtotal: 3600.00
```

- `products` table (inventário):
```sql
prod_001: stock = 50
prod_002: stock = 200
```

**When (Ação 1 - Iniciar Checkout)**:
```json
POST /api/v1/orders/checkout
{
  "cart_id": "cart_123",
  "shipping_address": {
    "street": "Av. Paulista, 1000",
    "city": "São Paulo",
    "state": "SP",
    "zip_code": "01310-100"
  },
  "shipping_method": "standard"
}
```

**Response (Checkout Iniciado)**:
```json
{
  "order_id": "ord_456",
  "status": "payment_pending",
  "payment_intent": {
    "client_secret": "pi_abc123_secret_xyz789",
    "amount": 362500,
    "currency": "brl"
  },
  "stripe_publishable_key": "pk_test_xxx"
}
```

**When (Ação 2 - Confirmar Pagamento - Client-side)**:
```javascript
// Frontend usa Stripe.js
const {error} = await stripe.confirmCardPayment(
  'pi_abc123_secret_xyz789',
  {
    payment_method: {
      card: cardElement,
      billing_details: {name: 'Maria Silva'}
    }
  }
);
```

**When (Ação 3 - Webhook do Stripe)**:
```json
POST /api/v1/webhooks/stripe
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_abc123",
      "amount": 362500,
      "status": "succeeded",
      "metadata": {
        "order_id": "ord_456"
      }
    }
  }
}
```

**Then (Resultados)**:
1. Banco de dados - `orders` table:
```sql
order_id: "ord_456"
user_id: "usr_maria"
status: "confirmed"
subtotal: 3600.00
shipping: 25.00
total: 3625.00
payment_status: "paid"
payment_method: "credit_card"
stripe_payment_intent: "pi_abc123"
confirmed_at: "2025-11-17T10:30:00Z"
```

2. Inventário atualizado:
```sql
UPDATE products SET stock = stock - 1 WHERE id = 'prod_001'; -- 50 -> 49
UPDATE products SET stock = stock - 2 WHERE id = 'prod_002'; -- 200 -> 198
```

3. Email enviado:
```
Para: maria@exemplo.com
Assunto: Pedido #ord_456 confirmado!
Template: order-confirmation
Anexos: invoice.pdf
```

4. Evento publicado:
```json
{
  "event": "order.confirmed",
  "order_id": "ord_456",
  "user_id": "usr_maria",
  "total": 3625.00,
  "timestamp": "2025-11-17T10:30:00Z"
}
```

---

## Cenário 2: Pagamento falha - Cartão recusado

```gherkin
Scenario: Pagamento falha por cartão recusado
  Given cliente está no checkout
  And payment intent foi criado
  When cliente tenta pagar com cartão que será recusado "4000 0000 0000 0002"
  Then Stripe retorna erro "card_declined"
  And webhook "payment_intent.payment_failed" é recebido
  Then pedido permanece com status "pagamento_pendente"
  And cliente vê mensagem "Pagamento recusado. Tente outro cartão."
  And estoque NÃO é decrementado
  And cliente pode tentar novamente com outro cartão
  And evento "order.payment_failed" é publicado
```

### Detalhes de Implementação

**When (Pagamento Falha)**:
Stripe retorna erro:
```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "Your card was declined"
  }
}
```

**Then**:
1. Pedido permanece:
```sql
order_id: "ord_456"
status: "payment_pending"
payment_status: "failed"
payment_error: "card_declined"
payment_attempts: 1
```

2. Response para cliente:
```json
{
  "error": {
    "code": "PAYMENT_001",
    "message": "Pagamento recusado. Tente outro cartão.",
    "retry_allowed": true
  }
}
```

3. Inventário não alterado (ainda reservado por 15 minutos)

---

## Cenário 3: Estoque insuficiente durante checkout

```gherkin
Scenario: Checkout falha por falta de estoque
  Given carrinho contém Notebook XYZ (quantidade 2)
  And estoque disponível de Notebook XYZ é apenas 1
  When cliente tenta completar checkout
  Then checkout é bloqueado
  And cliente vê mensagem "Estoque insuficiente para: Notebook XYZ"
  And quantidade disponível atual é mostrada (1 unidade)
  And cliente pode ajustar quantidade no carrinho
  And pedido NÃO é criado
```

### Detalhes de Implementação

**Given**:
```sql
-- Carrinho
cart_items: {product_id: "prod_001", quantity: 2}

-- Estoque
products WHERE id = "prod_001": stock = 1
```

**When**:
```json
POST /api/v1/orders/checkout
{
  "cart_id": "cart_123"
}
```

**Then**:
1. HTTP Status: `400 Bad Request`
2. Response:
```json
{
  "error": {
    "code": "CART_002",
    "message": "Estoque insuficiente",
    "details": [
      {
        "product_id": "prod_001",
        "product_name": "Notebook XYZ",
        "requested": 2,
        "available": 1
      }
    ]
  }
}
```

3. Pedido não criado
4. Estoque não alterado

---

## Cenário 4: Timeout no pagamento - Expiração

```gherkin
Scenario: Payment intent expira após 15 minutos
  Given pedido foi criado às 10:00
  And payment intent foi criado
  And cliente NÃO completou pagamento
  When passam 15 minutos (10:15)
  Then payment intent expira automaticamente
  And pedido muda para status "expirado"
  And estoque reservado é liberado
  And carrinho volta ao estado anterior
  And cliente recebe notificação "Pedido expirado. Tente novamente."
  And evento "order.expired" é publicado
```

### Detalhes de Implementação

**Background Job (cron a cada minuto)**:
```javascript
// Encontrar pedidos expirados
const expiredOrders = await db.orders.findMany({
  where: {
    status: 'payment_pending',
    created_at: { lt: now() - 15 minutes }
  }
});

// Para cada pedido expirado
for (const order of expiredOrders) {
  // 1. Cancelar payment intent no Stripe
  await stripe.paymentIntents.cancel(order.stripe_payment_intent);

  // 2. Atualizar status do pedido
  await db.orders.update({
    where: {id: order.id},
    data: {status: 'expired', expired_at: now()}
  });

  // 3. Publicar evento
  await eventBus.publish('order.expired', {order_id: order.id});
}
```

**Then**:
1. Banco de dados:
```sql
UPDATE orders
SET status = 'expired', expired_at = '2025-11-17T10:15:00Z'
WHERE id = 'ord_456';
```

2. Estoque liberado (nenhuma transação foi efetivada)

---

## Cenário 5: Webhook duplicado (Idempotência)

```gherkin
Scenario: Webhook payment.succeeded é recebido 2 vezes
  Given webhook "payment.succeeded" foi processado para pedido "ord_456"
  And pedido já está com status "confirmed"
  When webhook "payment.succeeded" é recebido novamente (retry do Stripe)
  Then webhook é reconhecido como duplicado
  And processamento é pulado (idempotente)
  And status do pedido permanece "confirmed"
  And estoque NÃO é decrementado novamente
  And HTTP 200 OK é retornado ao Stripe
```

### Detalhes de Implementação

**Idempotency Key Check**:
```javascript
const webhookEvent = request.body;
const idempotencyKey = webhookEvent.id; // "evt_abc123"

// Verificar se webhook já foi processado
const processed = await db.webhook_events.findUnique({
  where: {stripe_event_id: idempotencyKey}
});

if (processed) {
  // Já processado - retornar 200 OK sem processar
  return response.status(200).json({received: true});
}

// Processar webhook + salvar idempotency key
await db.transaction(async (tx) => {
  await processPaymentWebhook(webhookEvent, tx);
  await tx.webhook_events.create({
    data: {
      stripe_event_id: idempotencyKey,
      type: webhookEvent.type,
      processed_at: now()
    }
  });
});
```

---

## Mapeamento de Testes

### Testes Unitários
- `src/orders/domain/criar-pedido.spec.ts`
  - ✅ Calcula total corretamente (subtotal + frete)
  - ✅ Valida estoque disponível
  - ✅ Lança erro se estoque insuficiente

- `src/payments/domain/processar-pagamento.spec.ts`
  - ✅ Marca pedido como confirmado quando pagamento sucede
  - ✅ Mantém pendente quando pagamento falha
  - ✅ Decrementa estoque apenas após pagamento confirmado

### Testes de Integração
- `src/orders/api/checkout.integration.spec.ts`
  - ✅ Cria pedido e payment intent
  - ✅ Rejeita checkout se estoque insuficiente
  - ✅ Processa webhook payment.succeeded
  - ✅ Garante idempotência de webhooks

### Testes E2E
- `tests/e2e/checkout/full-checkout.e2e.spec.ts`
  - ✅ Fluxo completo: carrinho → checkout → pagamento → confirmação
  - ✅ Fluxo de erro: pagamento recusado → tentar novamente
  - ✅ Fluxo de timeout: aguardar expiração → verificar estoque liberado

---

## Requisitos Não-Funcionais

### Consistência de Dados
- 🔐 Transações ACID para atualização de estoque
- 🔄 Idempotência de webhooks (Stripe pode reenviar)
- ⏰ Reserva de estoque por 15 minutos durante checkout

### Performance
- ⏱️ Checkout: < 500ms
- 💳 Confirmação de pagamento: < 2s
- 📊 Webhook processing: < 1s

### Segurança
- 🔒 PCI-DSS: Nunca armazenar dados de cartão
- 🔑 Webhook signature validation (HMAC)
- 🛡️ Rate limiting: 10 checkouts/usuário/minuto

### Observabilidade
- 📊 Métricas: checkout_initiated, payment_succeeded, payment_failed, order_expired
- 📝 Logs: Todos os eventos de pagamento
- 🔔 Alertas: Taxa de falha > 10%, timeout de Stripe

---

**Exemplo criado para**: Demonstrar cenário BDD complexo com integrações externas
**Use como referência para**: Criar cenários de processos de negócio em `specs/06_runtime/scenarios/`

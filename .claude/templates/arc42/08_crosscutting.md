# 08. Conceitos Transversais

**ID do Template**: TPL-ARC42-08
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 8 (Conceitos Transversais)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-08

---

## Segurança

### Autenticação

- **Método**: OAuth 2.0 (Auth0)
- **Tokens**: JWT, TTL 2h, refresh tokens
- **Armazenamento**: Cookies HTTP-only (web), armazenamento seguro (mobile)

### Autorização

- **Modelo**: RBAC (Role-Based Access Control)
- **Papéis**: Guest, Customer, Admin
- **Implementação**: Middleware verifica claims JWT

### Criptografia

- **Em Trânsito**: TLS 1.3
- **Em Repouso**: AES-256
- **Secrets**: AWS Secrets Manager

---

## Logging & Observabilidade

### Logging Estruturado

```json
{
  "timestamp": "2025-11-15T10:30:00Z",
  "level": "info",
  "message": "Order created",
  "orderId": "ORD-001",
  "userId": "USR-123",
  "correlationId": "abc-def-ghi"
}
```

### Níveis de Log

- **ERROR**: Erros do sistema (500s)
- **WARN**: Erros de negócio (400s), performance degradada
- **INFO**: Eventos de negócio importantes
- **DEBUG**: Execução detalhada (apenas dev)

### Correlação

- **X-Request-ID**: Rastrear requisições entre serviços
- **Propagação**: Passar em todas as chamadas internas

---

## Tratamento de Erros

### Formato de Resposta de Erro (RFC 7807)

```json
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Failed",
  "status": 400,
  "detail": "Email format is invalid",
  "instance": "/users",
  "invalid_fields": [{ "field": "email", "reason": "Invalid format" }]
}
```

### Códigos de Erro

- **AUTH_001**: Credenciais inválidas
- **AUTH_002**: Token expirado
- **PRODUCT_001**: Produto não encontrado
- **CART_001**: Carrinho vazio
- **PAYMENT_001**: Pagamento falhou

---

## Validação de Dados

### Validação de Input

- **Biblioteca**: Joi (Node.js)
- **Validação**: Todos os inputs de API
- **Fail-fast**: Retornar 400 imediatamente

### Exemplo

```typescript
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
```

---

## Gerenciamento de Transações

### Transações de Banco de Dados

- **Nível**: Read Committed
- **Escopo**: Casos de uso (camada de aplicação)
- **Rollback**: Em qualquer erro

### Transações Distribuídas

- **Padrão**: Saga (coreografia)
- **Compensação**: Transações compensatórias
- **Exemplo**: Pedido → Pagamento (se pagamento falhar, cancelar pedido)

---

## Estratégia de Caching

### Camadas

1. **CDN**: Assets estáticos (CloudFront, 24h)
2. **Aplicação**: Respostas de API (Redis, 5min)
3. **Banco de Dados**: Resultados de query (Redis, 1h)

### Invalidação de Cache

- **TTL**: Expiração baseada em tempo
- **Eventos**: Invalidação explícita em atualizações

---

## Internacionalização (i18n)

### Idiomas Suportados

- Inglês (en-US) - Padrão
- Português (pt-BR)
- Espanhol (es-ES)

### Implementação

- **Biblioteca**: i18next
- **Formato**: Arquivos JSON por idioma
- **Detecção**: Header Accept-Language

---

## Estratégia de Testes

### Pirâmide de Testes

```
        /  \
       /E2E \      10% - End-to-end (caminhos críticos)
      /------\
     /Integr. \    20% - Integração (API, BD)
    /----------\
   /   Unit     \  70% - Unitários (lógica de negócio)
  /--------------\
```

### Requisitos de Cobertura

- **Unitários**: 80% mínimo
- **Integração**: Caminhos críticos
- **E2E**: Caminhos felizes

---

**Anterior**: [07. Deployment](07_deployment.md) | **Próximo**: [09. Decisions](09_decisions.md)

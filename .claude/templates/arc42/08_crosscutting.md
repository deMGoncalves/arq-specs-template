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

**📘 Templates de Segurança Disponíveis**:
- `.claude/templates/security/owasp-asvs.md` - Checklist OWASP ASVS 4.0
- `.claude/templates/security/stride-analysis.md` - Threat Modeling
- `.claude/templates/security/owasp-top10.md` - OWASP Top 10 (2021)
- `.claude/templates/security/cwe-top25.md` - CWE Top 25
- `.claude/templates/security/nist-ssdf.md` - NIST SSDF v1.1

**🛡️ Security Rules**: 040-064 (25 regras) em `.claude/rules/`

**👤 Skill**: `security-analyst` para análise de segurança

### Autenticação

- **Método**: OAuth 2.0 (Auth0)
- **Tokens**: JWT, TTL 2h, refresh tokens
- **Armazenamento**: Cookies HTTP-only (web), armazenamento seguro (mobile)
- **Password Hashing**: Argon2id (work factor 4, memory 65536 KB)
- **MFA**: TOTP disponível para contas sensíveis
- **Rate Limiting**: 5 tentativas/15 min

**Regras Aplicáveis**: 041 (Autenticação Segura), 042 (Sessão), 060 (Spoofing)

### Autorização

- **Modelo**: RBAC (Role-Based Access Control)
- **Papéis**: Guest, Customer, Admin
- **Implementação**: Middleware verifica claims JWT
- **IDOR Prevention**: Verificar ownership de recursos

**Regras Aplicáveis**: 043 (Controle de Acesso)

### Criptografia

- **Em Trânsito**: TLS 1.3, HSTS habilitado
- **Em Repouso**: AES-256-GCM
- **Secrets**: AWS Secrets Manager (rotação trimestral)
- **IVs**: Aleatórios e únicos (CSPRNG)

**Regras Aplicáveis**: 045 (Criptografia), 048 (TLS)

### Threat Modeling

- **Framework**: STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
- **Documentação**: `specs/08_crosscutting/security/stride-threat-model.md`
- **Top Ameaças**: Documentadas com mitigações

**Template**: `.claude/templates/security/stride-analysis.md`

### Análise de Vulnerabilidades

- **OWASP ASVS**: Checklist completo (V1-V14)
- **OWASP Top 10**: Cobertura das 10 vulnerabilidades críticas
- **CWE Top 25**: Análise das 25 fraquezas mais perigosas

**Documentação**:
- `specs/08_crosscutting/security/asvs-analysis.md`
- `specs/10_quality/security-requirements.md`
- `specs/11_risks/vulnerability-analysis.md`

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

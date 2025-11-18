# Templates BDD - Cenários Comportamentais Determinísticos

**Versão**: 2.1.0
**Última Atualização**: 2025-11-17
**Status**: 🟢 Ativo

---

## Visão Geral

Este diretório contém **templates BDD (Behavior-Driven Development)** para especificação de comportamento observável do sistema.

### O Que é BDD?

**BDD** é uma prática de desenvolvimento que usa **linguagem natural** (Gherkin) para descrever comportamento de software de forma executável.

**Formato**: Given-When-Then

```gherkin
Given [pré-condição]
When [ação]
Then [resultado esperado]
```

**Por que BDD?**:
- ✅ **Linguagem ubíqua**: Compreensível por todos (dev, QA, PO)
- ✅ **Executável**: Cenários viram testes automatizados
- ✅ **Determinístico**: Elimina ambiguidade sobre comportamento
- ✅ **Documentação viva**: Specs sempre sincronizadas com código
- ✅ **Reconhecível**: IA foi treinada em milhões de exemplos Gherkin

---

## Estrutura Gherkin

### Sintaxe Básica

```gherkin
Feature: [Nome da funcionalidade]
  [Descrição opcional em texto livre]

Scenario: [Nome do cenário]
  Given [pré-condição 1]
  And [pré-condição 2]
  When [ação do usuário]
  Then [resultado esperado 1]
  And [resultado esperado 2]
```

### Palavras-Chave

| Palavra | Propósito | Exemplo |
|---------|-----------|---------|
| `Feature` | Agrupa cenários de uma funcionalidade | `Feature: Autenticação de Usuário` |
| `Scenario` | Define um caso de uso específico | `Scenario: Login com credenciais válidas` |
| `Given` | Estado inicial do sistema | `Given usuário existe com email "user@example.com"` |
| `When` | Ação executada | `When usuário submete formulário de login` |
| `Then` | Resultado esperado | `Then usuário é autenticado` |
| `And` | Continua linha anterior | `And usuário vê dashboard` |
| `But` | Negação (menos comum) | `But usuário não vê mensagem de erro` |

---

## Template BDD

**Arquivo**: `scenario.md`

### Estrutura Completa

```markdown
# Scenario - SCN-XXX: [Nome do Cenário]

**ID**: SCN-XXX
**Feature**: [Nome da Feature]
**Priority**: High | Medium | Low
**Status**: 🔴 Draft | 🟡 In Progress | 🟢 Implemented
**Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD

---

## Feature Description

[Descrição da funcionalidade em alto nível]

---

## Scenarios

### Scenario 1: [Happy Path - Fluxo Principal]

```gherkin
Scenario: [Nome descritivo]
  Given [pré-condição 1]
  And [pré-condição 2]
  When [ação do usuário]
  Then [resultado esperado 1]
  And [resultado esperado 2]
  And [efeito colateral 1]
  And [log/métrica registrado]
```

### Scenario 2: [Error Case - Caso de Erro]

```gherkin
Scenario: [Nome descritivo do erro]
  Given [situação que causa erro]
  When [ação do usuário]
  Then [resposta de erro apropriada]
  And [sistema permanece em estado consistente]
  And [log de erro registrado]
```

### Scenario 3: [Edge Case - Caso Extremo]

```gherkin
Scenario: [Nome descritivo do caso extremo]
  Given [situação extrema ou rara]
  When [ação do usuário]
  Then [comportamento esperado em caso extremo]
```

---

## Acceptance Criteria

- [ ] Todos os cenários passam
- [ ] Cobertura de teste ≥ 80%
- [ ] Performance atende SLOs
- [ ] Logs estruturados registrados
- [ ] Métricas coletadas

---

## Related Artifacts

- **Arc42 Chapter 6**: Runtime View
- **Containers**: [Lista de CNT-XXX afetados]
- **Components**: [Lista de CMP-XXX implementados]
- **ADRs**: [Lista de ADR-XXX relevantes]

---

## Implementation Notes

**Files**:
- Code: `src/[context]/[container]/[component]/`
- Tests: `src/[context]/[container]/[component]/*.spec.ts`

**Test Framework**: [Jest, Vitest, Playwright, etc]
```

---

## Princípios BDD Determinísticos

### 1. Dado-Quando-Então É Obrigatório

**❌ Ruim (imperativo)**:
```markdown
1. Usuário abre página de login
2. Usuário digita email e senha
3. Usuário clica em "Entrar"
4. Sistema valida credenciais
5. Sistema redireciona para dashboard
```

**✅ Bom (declarativo)**:
```gherkin
Given usuário existe com email "user@example.com"
And senha é "StrongPass123"
When usuário submete formulário de login
Then usuário é autenticado
And usuário vê dashboard
```

### 2. Comportamento Observável, Não Implementação

**❌ Ruim (implementação)**:
```gherkin
Given usuário no banco de dados
When função authenticateUser() é chamada
Then JWT token é retornado
And sessão é salva em Redis
```

**✅ Bom (comportamento)**:
```gherkin
Given usuário existe com email "user@example.com"
When usuário faz login com credenciais válidas
Then usuário recebe token de autenticação
And token expira em 24 horas
```

### 3. Valores Específicos

**❌ Ruim (vago)**:
```gherkin
Given usuário com email válido
When login com senha correta
Then acesso permitido
```

**✅ Bom (específico)**:
```gherkin
Given usuário existe com email "user@example.com"
And senha hash é "$2b$12$KIX..."
When usuário submete login com senha "StrongPass123"
Then resposta é 200 OK
And token JWT é retornado (expires: 24h)
```

### 4. Efeitos Colaterais Explícitos

**❌ Ruim (incompleto)**:
```gherkin
When usuário cria pedido
Then pedido é salvo
```

**✅ Bom (completo)**:
```gherkin
When usuário cria pedido
Then pedido é salvo no banco de dados
And evento "order.created" é publicado
And email de confirmação é enviado
And inventário é reservado
And log: INFO "Order created: {orderId}"
And métrica "orders.created" é incrementada
```

---

## Exemplos Práticos

### Exemplo 1: Autenticação

```gherkin
Feature: Autenticação de Usuário

Scenario: Login com credenciais válidas
  Given usuário existe com email "user@example.com"
  And senha é "StrongPass123"
  And conta está ativa
  When usuário submete formulário de login
  Then resposta é 200 OK
  And token JWT é retornado
  And token expira em 24 horas
  And usuário vê dashboard
  And log: INFO "User logged in: {userId}"

Scenario: Login com senha incorreta
  Given usuário existe com email "user@example.com"
  And senha fornecida é "WrongPassword"
  When usuário submete formulário de login
  Then resposta é 401 INVALID_CREDENTIALS
  And tentativa é registrada (rate limiting)
  And após 5 tentativas, conta bloqueada por 15min
  And log: WARN "Failed login attempt: {email}"

Scenario: Login com conta bloqueada
  Given usuário existe com email "user@example.com"
  And conta foi bloqueada há 10 minutos (5 tentativas falhas)
  When usuário submete formulário de login
  Then resposta é 403 ACCOUNT_LOCKED
  And mensagem: "Conta bloqueada. Tente novamente em 5 minutos"
  And log: WARN "Login attempt on locked account: {email}"
```

### Exemplo 2: Criação de Pedido

```gherkin
Feature: Criação de Pedido

Scenario: Criar pedido com itens válidos
  Given usuário está autenticado
  And carrinho contém 3 itens
  And total do carrinho é R$ 299,99
  And método de pagamento é cartão de crédito válido
  When usuário confirma pedido
  Then pedido é criado com status "pending_payment"
  And resposta é 201 Created
  And orderId é retornado (formato: UUID)
  And inventário é reservado por 15 minutos
  And evento "order.created" é publicado
  And email "Pedido #XXX confirmado" é enviado
  And log: INFO "Order created: {orderId}, total: R$ 299.99"

Scenario: Criar pedido com estoque insuficiente
  Given usuário está autenticado
  And carrinho contém item "Product-A" (quantidade: 10)
  And estoque de "Product-A" é 5 unidades
  When usuário confirma pedido
  Then resposta é 422 INSUFFICIENT_STOCK
  And mensagem: "Produto 'Product-A' tem apenas 5 unidades disponíveis"
  And carrinho NÃO é esvaziado
  And log: WARN "Insufficient stock for order: {userId}, product: {productId}"
```

### Exemplo 3: Validação de Email

```gherkin
Feature: Validação de Email

Scenario: Email válido
  Given email é "user@example.com"
  When validação é executada
  Then email é aceito
  And usuário pode prosseguir

Scenario: Email com formato inválido
  Given email é "invalid-email"
  When validação é executada
  Then resposta é 400 INVALID_EMAIL
  And mensagem: "Formato de email inválido"

Scenario: Email muito longo
  Given email tem 300 caracteres
  When validação é executada
  Then resposta é 400 EMAIL_TOO_LONG
  And mensagem: "Email deve ter no máximo 255 caracteres"

Scenario: Email vazio
  Given email é ""
  When validação é executada
  Then resposta é 400 MISSING_EMAIL
  And mensagem: "Email é obrigatório"
```

---

## Integração com Workflow

### Phase 3: Specification (analyst)

Analyst usa `/feature` para criar cenários BDD:

```bash
/feature User completes checkout with payment, inventory reservation, and order confirmation
```

Output: `specs/06_runtime/scenarios/SCN-001_checkout.md`

### Phase 4: Implementation (developer)

Developer mapeia cenários para testes:

```typescript
// user-login.spec.ts
describe('Feature: User Authentication', () => {
  describe('Scenario: Login with valid credentials', () => {
    it('should authenticate user and return JWT token', async () => {
      // Given
      const user = await createUser({ email: 'user@example.com', password: 'StrongPass123' });

      // When
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: 'StrongPass123' });

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.token).toMatch(/^eyJ.*/); // JWT pattern
      // ... more assertions
    });
  });
});
```

---

## Ferramentas BDD

### Recomendadas

1. **Cucumber.js** (https://cucumber.io/)
   - Executa Gherkin diretamente
   - Integra com Jest/Mocha

2. **Jest + BDD matchers** (https://jestjs.io/)
   - `describe()`/`it()` mapeiam para Given/When/Then
   - Amplamente usado

3. **Playwright BDD** (https://playwright.dev/)
   - BDD para testes E2E
   - Executa Gherkin

4. **SpecFlow** (.NET) - https://specflow.org/
5. **Behave** (Python) - https://behave.readthedocs.io/

---

## Referências

### Internas
- **Arc42 Templates**: `.claude/templates/arc42/README.md`
- **C4 Templates**: `.claude/templates/c4/README.md`
- **ADR Templates**: `.claude/templates/adr/README.md`
- **Commands**: `.claude/commands/feature.md` (comando `/feature`)

### Externas
- **Gherkin Reference**: https://cucumber.io/docs/gherkin/reference/
- **BDD Practices**: https://cucumber.io/docs/bdd/
- **Cucumber**: https://cucumber.io/
- **Given-When-Then**: https://martinfowler.com/bliki/GivenWhenThen.html

---

**Mantido por**: Sistema de Workflow de Especificações Determinísticas v2.1.0
**Licença**: Ver raiz do projeto

---

**BDD = Comportamento especificado de forma executável e determinística.** ✅

# 06. Visão de Runtime

**ID do Template**: TPL-ARC42-06
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 6 (Visão de Runtime)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-06

Este capítulo documenta **comportamento em runtime** usando **cenários BDD** (Given-When-Then).

Use arquivos separados para cada cenário:
- `specs/06_runtime/scenarios/SCN-001_[nome].md`

Veja template: [Template de Cenário BDD](../../bdd/scenario.md)

---

## Lista de Cenários

| ID | Nome | Prioridade | Status |
|----|------|------------|--------|
| SCN-001 | Login de Usuário | Crítica | ✅ Implementado |
| SCN-002 | Busca de Produtos | Alta | ✅ Implementado |
| SCN-003 | Fluxo de Checkout | Crítica | 🚧 Em Progresso |
| SCN-004 | Rastreamento de Pedidos | Média | ⏸️ Planejado |

**Detalhes**: Veja `specs/06_runtime/scenarios/SCN-*`

---

## Exemplo de Cenário (Inline)

### SCN-001: Login de Usuário

```gherkin
Feature: Login de Usuário

Scenario: Login bem-sucedido com credenciais válidas
  Given usuário existe com email "user@example.com"
  And senha é "SecurePass123"
  When usuário submete formulário de login
  Then usuário é autenticado
  And token JWT é emitido
  And usuário vê dashboard
  And sessão expira após 2 horas

Scenario: Login falha com senha inválida
  Given usuário existe com email "user@example.com"
  And senha está incorreta
  When usuário submete formulário de login
  Then login falha
  And usuário vê erro "Credenciais inválidas"
  And tentativa falha é registrada
  And conta bloqueia após 5 tentativas falhas
```

---

## Diagramas de Sequência

### Fluxo de Checkout

```
Cliente      API      Auth0    Stripe   SendGrid   Database
   │          │         │        │         │          │
   │ Checkout │         │        │         │          │
   ├─────────>│         │        │         │          │
   │          │ Verificar│       │         │          │
   │          ├────────>│        │         │          │
   │          │<────────┤        │         │          │
   │          │         │        │         │          │
   │          │ Criar Pagamento  │         │          │
   │          ├─────────────────>│         │          │
   │          │<─────────────────┤         │          │
   │          │         │        │         │          │
   │ Pagar    │         │        │         │          │
   ├──────────┴─────────┴───────>│         │          │
   │          │         │ Webhook│         │          │
   │          │<─────────────────┤         │          │
   │          │         │        │         │          │
   │          │ Salvar Pedido    │         │          │
   │          ├─────────────────────────────────────>│
   │          │         │        │         │          │
   │          │ Enviar Email     │         │          │
   │          ├─────────────────────────>│            │
   │<─────────┤         │        │         │          │
   │ Sucesso  │         │        │         │          │
```

---

**Anterior**: [05. Building Blocks](05_building-blocks.md) | **Próximo**: [07. Deployment](07_deployment.md)

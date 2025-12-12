# Claude Code Snippets & Macros

**Version**: 3.0.0
**Last Updated**: 2025-12-10

---

## 🎯 Quick Commands (Aliases)

Comandos rápidos para tarefas comuns:

### 📚 Documentation Quick Start

```bash
# Alias: quick-start
/vision [descrição do projeto]
/stack [tech stack]
/actor [ator principal]
```

**Uso**:
```
Crie setup inicial para e-commerce B2B com Node.js, PostgreSQL
```

### 🏗️ Architecture Setup

```bash
# Alias: arch-setup
/stack [tech stack e constraints]
/adr [decisão tecnológica principal]
/cross [conceitos transversais]
```

**Uso**:
```
Configure arquitetura microserviços com: Node.js 20, K8s, PostgreSQL 15, Redis
Decisão: Usar event sourcing para audit trail
Conceitos: Autenticação JWT, Rate limiting, CQRS
```

### 🎭 Feature Complete Flow

```bash
# Alias: feature-flow
/feature [descrição da feature em BDD]
/plan
/code
/stats
```

**Uso**:
```
Feature: Usuario pode resetar senha via email
  Scenario: Usuario solicita reset de senha
    Given usuario com email cadastrado
    When solicita reset de senha
    Then recebe email com link temporário
    And link expira em 1 hora
```

### 🔍 Quality Check

```bash
# Alias: quality-check
/stats
[check specs health]
[check for TODOs]
[validate coverage]
```

### 🚀 Release Preparation

```bash
# Alias: prep-release
/stats
[validate all specs complete]
[check ADRs updated]
[verify test coverage ≥80%]
[update CHANGELOG.md]
```

---

## 📝 Common Prompts

### 1. Create New Actor

```
/actor [Nome do Ator]

Descrição: [quem é o ator]
Responsabilidades: [o que faz]
Interações: [com quais containers interage]
Autenticação: [método de auth]
Permissões: [níveis de acesso]
```

**Exemplo**:
```
/actor Admin do Sistema

Descrição: Usuário com permissões administrativas
Responsabilidades: Gerenciar usuários, configurar sistema, visualizar logs
Interações: API Gateway, Admin Panel, Audit Log
Autenticação: OAuth2 + 2FA
Permissões: Full access (nível 10)
```

### 2. Create Container

```
/container [Nome do Container]

Tipo: [web app | api | database | message queue]
Responsabilidade: [responsabilidade única]
Tecnologia: [stack]
Portas: [portas expostas]
Dependências: [outros containers]
```

**Exemplo**:
```
/container API Gateway

Tipo: api
Responsabilidade: Roteamento, autenticação, rate limiting
Tecnologia: Node.js 20 + Express + Redis
Portas: 3000 (HTTP), 3001 (gRPC)
Dependências: Auth Service, Redis Cache
```

### 3. Create BDD Scenario

```
/feature [Título da Feature]

Feature: [descrição da feature]

Scenario: [cenário principal]
  Given [pré-condições]
  When [ação]
  Then [resultado esperado]
  And [efeitos colaterais]

Scenario: [cenário de erro]
  Given [condição de erro]
  When [ação]
  Then [erro esperado]
```

**Exemplo**:
```
/feature Processamento de Pagamento com Cartão

Feature: Processar pagamento com cartão de crédito

Scenario: Pagamento aprovado
  Given carrinho com valor de R$ 499,99
  And cartão de crédito válido
  When usuário submete pagamento
  Then pagamento é processado via Stripe
  And status do pedido muda para "paid"
  And email de confirmação é enviado
  And resposta 201 Created com orderId

Scenario: Cartão recusado
  Given carrinho com valor de R$ 499,99
  And cartão de crédito inválido
  When usuário submete pagamento
  Then erro 422 CARD_DECLINED
  And status do pedido permanece "pending"
  And usuário recebe mensagem clara
```

### 4. Document Architectural Decision

```
/adr [Título da Decisão]

## Context
[Contexto da decisão, problema a resolver]

## Decision
[Decisão tomada]

## Alternatives
[Alternativas consideradas e por que foram descartadas]

## Consequences
✅ Positivas:
- [benefício 1]
- [benefício 2]

❌ Negativas:
- [trade-off 1]
- [trade-off 2]
```

**Exemplo**:
```
/adr Usar PostgreSQL como Banco Principal

## Context
Precisamos escolher banco de dados para aplicação transacional com necessidade de ACID compliance e suporte a JSON.

## Decision
Usar PostgreSQL 15 como banco de dados principal.

## Alternatives
- MongoDB: Descartado por falta de transações ACID completas
- MySQL: Descartado por suporte JSON inferior
- DynamoDB: Descartado por complexidade de modelagem

## Consequences
✅ Positivas:
- ACID compliance garantido
- Suporte nativo a JSON (jsonb)
- Ecosystem maduro
- Performance excelente

❌ Negativas:
- Escalabilidade horizontal mais complexa
- Requer mais memória que alternativas NoSQL
```

### 5. Create Quality Rule

```
/rule [ID]_[nome-da-regra]

## Description
[O que a regra valida]

## Problem
[Problema que a regra resolve]

## Solution
[Como aplicar a regra]

## Incorrect Example
```[language]
[código que viola a regra]
```

## Correct Example
```[language]
[código que segue a regra]
```

## Validation
[Como validar automaticamente]
```

---

## 🔄 Workflow Macros

### Macro 1: New Project Setup

```
1. /vision [descrição do projeto]
2. /stack [tech stack principal]
3. /actor Usuario Principal
4. /actor Sistema Externo Principal
5. /container API Principal
6. /cross Autenticação, Segurança, Logs
7. /build Docker, K8s, CI/CD com GitHub Actions
8. /stats
```

### Macro 2: New Feature Implementation

```
1. /feature [nova feature em BDD]
2. /plan
3. /stats (validar specs)
4. /code
5. [executar testes]
6. [executar linters]
7. /stats (validar implementação)
```

### Macro 3: Architecture Review

```
1. /stats
2. [revisar Arc42 chapters]
3. [revisar ADRs]
4. [revisar BDD scenarios]
5. [validar coverage de requisitos]
6. [criar ADRs para decisões pendentes]
```

### Macro 4: Quality Validation

```
1. Executar linters
2. Executar testes (coverage ≥80%)
3. Executar builds
4. Validar 39 regras de qualidade
5. Validar specs atualizadas
6. Validar TODOs resolvidos
```

---

## 💡 Pro Tips

### Tip 1: Context Size Management

Quando trabalhar com specs grandes:
```
❌ Não carregue spec.md inteiro (5000+ linhas)
✅ Use orchestrator para decompor em tasks <100 LOC
```

### Tip 2: Specification-First Always

```
❌ User: "Add login feature"
   [escreve código diretamente]

✅ User: "Add login feature"
   "Vou criar a especificação primeiro com /feature..."
```

### Tip 3: Use Stats Frequently

```
# Após cada comando de documentação
/vision ...
/stats

/feature ...
/stats

/code
/stats
```

### Tip 4: BDD Scenario Quality

```
✅ GOOD BDD:
  Given usuario autenticado com email "user@example.com"
  And carrinho contém produto SKU "ABC123"
  When clica em "Finalizar Compra"
  Then pedido é criado com status "pending"
  And resposta 201 com { "orderId": "uuid", "total": 499.99 }

❌ VAGUE BDD:
  Given usuario logado
  When compra produto
  Then funciona
```

### Tip 5: ADR Traceability

Todo ADR deve referenciar:
- Specs relacionadas (capítulos Arc42)
- BDD scenarios afetados
- Containers/componentes impactados
- Rules de qualidade aplicáveis

---

## 🎯 Command Cheatsheet

| Comando | Quando Usar | Output |
|---------|-------------|--------|
| `/vision` | Início do projeto | specs/01, 03 |
| `/stack` | Definir tech stack | specs/02, 04 |
| `/actor` | Documentar atores | specs/03 |
| `/container` | Documentar serviços | specs/05 |
| `/component` | Documentar módulos | specs/05 |
| `/plan` | Estruturar arquitetura | specs/05, 06 |
| `/feature` | Criar BDD scenarios | specs/06 |
| `/flow` | Fluxos alternativos | specs/06 |
| `/build` | Deploy e qualidade | specs/07, 10 |
| `/cross` | Conceitos transversais | specs/08 |
| `/adr` | Decisões arquiteturais | specs/09 |
| `/rule` | Padrões de código | .claude/rules/ |
| `/code` | Implementar specs | src/ |
| `/import` | Importar docs externos | specs/ |
| `/stats` | Validar saúde | Dashboard |

---

## 📚 Advanced Patterns

### Pattern 1: Complexity-Driven Development

```
1. Analisar requisito
2. Avaliar complexidade (LOW/MEDIUM/HIGH)
3. Escolher workflow:
   - LOW: /feature + /code
   - MEDIUM: /feature + /plan + /code
   - HIGH: Full workflow (phases 1-7)
```

### Pattern 2: Specification Evolution

```
1. changes/[id]/proposal.md (Phase 1)
2. changes/[id]/design.md (Phase 2, if HIGH)
3. changes/[id]/spec.md (Phase 3)
4. changes/[id]/tasks.md (Phase 3.5)
5. src/ (Phase 4)
6. Merge to specs/ (after validation)
```

### Pattern 3: Continuous Validation

```
# Após cada mudança
1. Executar hooks (automático)
2. /stats
3. Validar TODOs
4. Validar coverage
5. Commit apenas se ✅
```

---

**Version**: 3.0.0
**Maintained by**: Documentation-First Approach Community
**License**: MIT

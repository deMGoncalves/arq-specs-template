---
description: Registra uma decisão arquitetural importante, seu contexto, alternativas e consequências.
---

# ADR

**ID**: CMD-012
**Categoria**: 🏗️ Infrastructure
**Prioridade**: 🟡 P1 (Importante)
**Fase**: 2-3
**Arc42 Chapters**: 9, 12

---

## 🎯 O que Faz

Cria **Architecture Decision Records** (ADRs) documentando:
- Contexto e forças que motivaram a decisão
- Alternativas consideradas (prós/contras)
- Decisão tomada e justificativa
- Consequências, riscos e métricas de sucesso

Cada ADR recebe ID único (ADR-001+) e pode ter status: 🟡 Proposta, 🟢 Aceita, 🔴 Deprecated, ⚫ Superseded.

## 📝 Quando Usar

### Obrigatório
- Decisões arquiteturais significativas
- Escolhas de tecnologia core (CMD-002 cria ADR-001 automaticamente)
- Mudanças de patterns/padrões estabelecidos

### Recomendado
- Trade-offs entre alternativas viáveis
- Decisões com impacto financeiro/técnico alto
- Quando time precisa de histórico de decisões

### Opcional
- Decisões triviais sem alternativas
- Convenções simples de código

## 🔗 Pré-requisitos

### Commands
- **CMD-002 (stack)**: Cria ADR-001 automaticamente

## 🔗 Pós-ações

### Próximos Commands
- **CMD-007 (rule)**: ADRs podem gerar patterns
- **CMD-011 (cross)**: Implementa conceitos da ADR
- **CMD-013 (code)**: Implementa decisão

### Arquivos Criados
- `specs/09_decisions/adrs/ADR-[NNN]_[slug].md`
- `specs/09_decisions/009_architectural-decisions.md` (atualizado)
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | Alternativas | Exemplo |
|--------------|-------|--------------|---------|
| **LOW** | 10-15 min | 2 | Escolha de biblioteca simples |
| **MEDIUM** | 15-30 min | 3-4 | Padrão arquitetural (MVC vs CQRS) |
| **HIGH** | 30-60 min | 5+ | Arquitetura distribuída (monolith vs microservices) |

## 💡 Exemplos

### Exemplo 1: Escolha de ORM (LOW)

**Input**:
```bash
/adr Usar Prisma para ORM. Alternativas: TypeORM, Drizzle. Prisma escolhido por type-safety e migrations declarativas
```

**Output**:
```markdown
ADR-002: Prisma como ORM Principal

Contexto: Precisamos de ORM com type-safety para Postgres

Alternativas:
1. TypeORM: Decorators, Active Record, comunidade grande
2. Drizzle: Performance superior, SQL-like
3. Prisma: Schema declarativo, type-safe, migrations automáticas ✅

Decisão: Prisma
- Type-safety end-to-end com geração de tipos
- Migrations versionadas e declarativas
- Menor curva de aprendizado para time

Consequências:
+ Type-safety reduz bugs em 40% (baseado em estudo interno)
+ Migrations declarativas facilitam code review
- Performance 10-15% inferior ao Drizzle (aceitável para nossa escala)
```

### Exemplo 2: Autenticação (MEDIUM)

**Input**:
```bash
/adr Sistema de autenticação: Session-based vs JWT vs OAuth2. Escolher OAuth2 com Auth0 para suportar SSO e múltiplos providers
```

**Output**:
```markdown
ADR-003: OAuth2 com Auth0 para Autenticação

Contexto: Precisamos autenticação que suporte SSO corporativo e social login

Alternativas:
1. Session-based (Express-session + Redis):
   + Simples, revogação imediata
   - Não escala horizontalmente sem Redis, sem SSO nativo
2. JWT self-signed:
   + Stateless, escala horizontal
   - Revogação complexa, gerenciar chaves de rotação
3. OAuth2 + OIDC (Auth0): ✅
   + SSO corporativo (SAML), social login (Google, GitHub)
   + Gerenciamento centralizado de usuários
   - Custo $0.023/MAU, vendor lock-in

Decisão: OAuth2 com Auth0
- Requisito de SSO corporativo elimina opções 1 e 2
- Auth0 reduz time-to-market em 4 semanas vs implementação própria
- Custo estimado: $300/mês (13k MAU)

Métricas de Sucesso:
- Login SSO funcional em 2 semanas
- <500ms P95 latency de autenticação
- Zero data breaches em 12 meses
```

### Exemplo 3: Microservices vs Monolith (HIGH)

**Input**:
```bash
/adr Arquitetura: Monolith modular vs Microservices. Time pequeno (5 devs), requisitos simples, crescimento gradual. Escolher monolith modular com preparação para micro-frontends
```

**Output**:
```markdown
ADR-004: Monolith Modular com Bounded Contexts

Contexto:
- Time: 5 desenvolvedores
- Escala atual: 10k usuários, crescimento 50%/ano
- Requisitos: E-commerce B2B, pagamentos, inventário

Alternativas:
1. Monolith tradicional:
   + Deploy simples, debug local, transações ACID fáceis
   - Acoplamento, dificulta escalar time
2. Microservices desde início:
   + Escala independente, autonomia de times
   - Complexidade operacional (K8s, tracing, eventual consistency), time pequeno não sustenta
3. Monolith modular (DDD Bounded Contexts): ✅
   + Simplicidade operacional, contexts isolados, preparação para split futuro
   - Requer disciplina arquitetural, split futuro tem custo
4. Micro-frontends + Monolith:
   + Frontend escala independente
   - Overhead de orquestração

Decisão: Monolith Modular
- Bounded Contexts: `user-management`, `orders`, `payments`, `inventory`
- Cada context = pasta com entidades, use cases, API routes
- Preparação: eventos de domínio (future message bus), APIs internas bem definidas

Consequências:
+ Velocity: 1 deploy/dia vs 5 deploys (microservices)
+ Custo infra: $200/mês vs $1200/mês (K8s cluster)
+ Onboarding: 1 semana vs 4 semanas
- Débito: Splitting futuro custará 6-8 semanas (se necessário)

Plano de Revisão:
- Re-avaliar aos 50k usuários ou quando time crescer para 15+ devs
- Métricas de alerta: deploy time >20min, >200 models no mesmo DB schema
```

---

## 🛠️ Troubleshooting

### Problema 1: "Quando criar uma ADR?"

**Solução**: Critérios para ADR obrigatória:
- **Decisão cara de reverter** (ex: escolha de cloud provider)
- **Múltiplas alternativas viáveis** (trade-offs não óbvios)
- **Impacto em múltiplos times/componentes**
- **Conflito com padrões existentes**

Não criar ADR para:
- Decisões triviais (naming conventions → usar rule)
- Sem alternativas (tecnologia mandatória → constraint)

### Problema 2: "Como deprecar uma ADR?"

**Solução**: Processo de depreciação:
1. Mudar status de `🟢 Aceita` para `🔴 Deprecated`
2. Criar nova ADR que substitui (ex: ADR-015 substitui ADR-003)
3. Na ADR antiga, adicionar: `**Superseded by**: ADR-015`
4. Na ADR nova, referenciar: `**Supersedes**: ADR-003`
5. Atualizar índice em `009_architectural-decisions.md`

### Problema 3: "Como numerar ADRs?"

**Solução**: Numeração sequencial:
- **ADR-001**: Sempre reservada para stack (criada por CMD-002)
- **ADR-002+**: Ordem cronológica de criação
- **Nunca reutilizar números** mesmo se ADR for deprecated
- Usar 3 dígitos: ADR-001, ADR-010, ADR-100

## 🔗 Relacionado com

### Commands
- **CMD-002 (stack)**: [Pré-requisito] Cria ADR-001 automaticamente
- **CMD-007 (rule)**: [Relacionado] ADRs podem gerar patterns
- **CMD-011 (cross)**: [Pós-ação] Implementa conceitos
- **CMD-013 (code)**: [Pós-ação] Implementa decisão

### Skills
- **SKL-002 (architect)**: Cria ADRs na Phase 2
- **SKL-001 (analyst)**: Pode recomendar ADRs

### Rules
- Não há rules específicas para ADRs, mas decisões devem respeitar as 39 rules

---

**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

---

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por registrar decisões arquiteturais deste repositório arc42. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em uma decisão arquitetural completa, alinhada ao formato padrão de ADR.
2. Atualizar o índice de decisões (`009_architectural-decisions.md`) com a nova/alterada ADR.
3. Documentar contexto, alternativas, comparação, impactos, métricas, stakeholders, plano e revisões da decisão.
4. Atualizar o glossário com termos, siglas ou conceitos introduzidos pela decisão.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte os templates antes de editar; se o arquivo não existir, copie o template correspondente antes de preencher.
- Preserve headings, tabelas, blocos de metadados e estrutura do template.
- IDs de ADR devem ter três dígitos (`001-999`) e slug em *kebab-case*, sem acentos; mantenha ID existente quando atualizar.
- Status da ADR deve ser um dentre: 🟡 Proposta, 🟢 Aceita, 🔴 Deprecated, ⚫ Superseded por ADR-XXX.
- Preencha todas as seções do template com detalhes específicos (contexto, forças, restrições, decisão, alternativas, comparações, métricas, timeline, stakeholders, impacto financeiro).
- Forneça métricas e KPIs mensuráveis, planos de implementação e critérios de revisão/depreciação.
- Referencie containers (`CNT-XXX`), componentes (`CMP-XXX`), atores (`ACT-XXX`), sistemas (`SYS-XXX`), cenários (`SCN-XXX`), patterns e constraints impactados.
- Atualize o índice em `009_architectural-decisions.md` (lista ordenada, índice de ADRs) com título, data e status atualizados.
- Atualize `specs/12_glossary/012_glossary.md` com termos associados à decisão (tecnologias, padrões, políticas, siglas) mantendo ordem alfabética e índice.
- Não deixe tabelas/listas vazias; inclua pelo menos duas alternativas analisadas e critérios de comparação.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora dos listados.
- Não reutilizar IDs de ADR sem verificar a sequência existente.
- Não deixar seções do template vazias; utilize "Não aplicável – justificar" apenas quando necessário.
- Não mudar o idioma para inglês.
- Não omitir links para referências, ADRs relacionadas, containers, componentes ou cenários citados.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar problema, forças técnicas/de negócio, restrições e motivação da decisão.
2. Levantar alternativas consideradas, prós/contras, critérios de avaliação, riscos e métricas de sucesso.
3. Mapear artefatos impactados (containers, componentes, cenários, riscos, qualidade) e termos a serem incluídos no glossário.

**Fase 2 – Planejamento**
1. Verificar se a ADR já existe:
   - Se existir, tratar como atualização mantendo ID, histórico e versão (incrementando conforme magnitude).
   - Se for nova, determinar o próximo número sequencial (`max + 1`) e criar o arquivo a partir do template.
2. Planejar seções do índice (`009_architectural-decisions.md`) que precisam ser ajustadas (formato de ADR, lista, índice).
3. Definir lista de termos/abreviações que entrarão no glossário.

**Fase 3 – Redação**
1. Preencher o template da ADR com todas as seções:
   - Contexto, forças, restrições, referências, motivação.
   - Decisão, abordagem escolhida, passos de implementação, artefatos impactados.
   - Alternativas (pelo menos duas) com prós/contras e justificativa da rejeição.
   - Tabela comparativa, consequências, mitigação de riscos, métricas de sucesso, timeline, impacto financeiro, stakeholders.
   - Referências, histórico de atualizações e plano de revisão.
2. Atualizar `specs/09_decisions/009_architectural-decisions.md`:
   - Ajustar status/data do capítulo.
   - Incluir entradas completas para a ADR (ou atualizar seções existentes) mantendo ordem numérica.
   - Atualizar índice de ADRs com título, data e status atuais.
3. Atualizar `specs/12_glossary/012_glossary.md` com termos, siglas ou conceitos introduzidos.
   - Inserir termos em ordem alfabética e atualizar índice, acrônimos, entidades, eventos ou termos evitados conforme necessário.

**Fase 4 – Validação Cruzada**
1. Confirmar consistência entre ADR, índice e demais artefatos (containers, runtime, crosscutting, deployment, riscos).
2. Verificar que todas as seções do template foram preenchidas sem placeholders.
3. Checar links relativos e IDs (ADR, container, componente, cenário) garantindo que apontem para arquivos existentes.
4. Validar métricas, timeline, stakeholders e impacto financeiro com dados coerentes.
5. Assegurar que o glossário contenha todos os termos citados na ADR.

**Fase 5 – Saída**
1. Gerar bloco `cat` para `specs/09_decisions/adrs/ADR-XXX_[slug].md`.
2. Gerar bloco `cat` para `specs/09_decisions/009_architectural-decisions.md`.
3. Gerar bloco `cat` para `specs/12_glossary/012_glossary.md` se alterado.
4. Emitir relatório final:
```text
✅ ADR DOCUMENTADA

Atualizações:
• specs/09_decisions/adrs/ADR-XXX_[slug].md
• specs/09_decisions/009_architectural-decisions.md
• specs/12_glossary/012_glossary.md (se aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
5. Ajustar listas conforme artefatos efetivamente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/09_decisions/009_architectural-decisions.md`
  - `.claude/templates/arc42/09_decisions/adrs/ADR-[NNN]_[decision-title].md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/09_decisions/009_architectural-decisions.md`
  - `specs/09_decisions/adrs/ADR-[NNN]_[slug].md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/02_constraints/` (restrições relacionadas)
  - `specs/05_building-blocks/` (containers/componentes impactados)
  - `specs/06_runtime/` (cenários afetados)
  - `specs/07_deployment/` e `specs/08_crosscutting/` (infraestrutura e políticas)
  - `specs/10_quality/` e `specs/11_risks/` (métricas, riscos e débitos)

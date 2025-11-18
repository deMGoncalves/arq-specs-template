# 🎯 PLANO DE IMPLEMENTAÇÃO: WORKFLOW MELHORADO

**Versão**: 1.0.0
**Data**: 2025-11-17
**Status**: 🟡 Em Planejamento

---

## 🎯 QUICK REFERENCE: BASE DAS ESPECIFICAÇÕES

**FUNDAÇÃO INABALÁVEL**: Todas as especificações seguem:

```
🏛️ Arc42 (12 capítulos) ← Base estrutural principal
   ├── Capítulo 3: Contexto ← integra C4 Level 1
   ├── Capítulo 5: Building Blocks ← integra C4 Level 2/3
   ├── Capítulo 6: Runtime ← integra BDD Scenarios (OBRIGATÓRIO)
   ├── Capítulo 9: Decisões ← integra ADRs
   └── Capítulo 10: Quality (OBRIGATÓRIO)

📐 C4 Model ← Visualização de arquitetura (4 níveis)

🥒 BDD (Given-When-Then) ← Especificação de comportamento

📝 ADR ← Documentação de decisões arquiteturais
```

**Por quê Arc42 + C4 + BDD + ADR?**
- **Specs Determinísticas** = IA gera EXATAMENTE o que você quer
- **Ambiguidade eliminada** = 10²⁰ possibilidades → 1 solução correta
- **Padrões comprovados** = IA reconhece e aplica corretamente
- **Documentação viva** = Código e specs sempre sincronizados

**Leia a seção completa**: [Fundação Arquitetural](#6-arc42--c4--bdd--adr-fundação-arquitetural)

---

## 📖 PRINCÍPIOS FUNDAMENTAIS

### 1. Intent as Truth (80/20 Rule)
- **Especificações = 80% do valor** | Código = 20%
- Specs capturam contexto, decisões e intenção
- Código é apenas uma expressão da spec

### 2. Specs + Changes (Separação Clara)
```
specs/        → O que ESTÁ (fonte de verdade)
changes/      → O que DEVE mudar (propostas)
archive/      → O que FOI (histórico)
```

### 3. Constitution-Driven (Princípios Imutáveis)
- Define DNA do projeto uma vez
- Validações automáticas garantem compliance
- Mudanças requerem consenso explícito

### 4. Automated Gates (Qualidade sem Fricção)
- Validações automáticas em pontos críticos
- Bloqueia apenas quando necessário
- Feedback imediato e acionável

### 5. DDD Semantic (Estrutura que Grita o Domínio)
```
src/[context]/[container]/[component]/
  - criar.ts      # Factory
  - persistir.ts  # Repository
  - confirmar.ts  # Use case
```

### 6. **Arc42 + C4 + BDD + ADR** (Fundação Arquitetural)
**Especificações determinísticas eliminam ambiguidade = IA gera EXATAMENTE o que você quer**

#### 🏛️ Arc42: Base Estrutural (12 Capítulos)
Arc42 é o **framework principal** para documentação de sistema:

1. **Introdução e Objetivos** - Visão, requisitos, stakeholders
2. **Restrições** - Técnicas, organizacionais, legais
3. **Contexto e Escopo** - Limites do sistema, integrações externas
4. **Estratégia de Solução** - Stack tecnológico, decisões de alto nível
5. **Building Blocks** - Decomposição em containers e componentes
6. **Runtime** - Cenários de execução, comportamento observável
7. **Deployment** - Infraestrutura, CI/CD, ambientes
8. **Conceitos Transversais** - Segurança, i18n, logging, patterns
9. **Decisões de Arquitetura** - ADRs (registros de decisão)
10. **Requisitos de Qualidade** - Performance, segurança, confiabilidade
11. **Riscos e Débito Técnico** - Mitigações e trade-offs
12. **Glossário** - Terminologia do domínio

**Aplicação Adaptativa**:
- **Sistema Novo**: Arc42 completo (capítulos 1-12)
- **Container/Service**: Arc42 parcial (capítulos 3, 5, 6, 8, 9)
- **Feature Simples**: Arc42 mínimo (capítulos 6, 9, 10)

#### 📐 C4 Model: Visualização em 4 Níveis
Complementa Arc42 com diagramas estruturados:

- **C1: System Context** - Sistema e seus usuários/sistemas externos
- **C2: Container** - Aplicações, bancos de dados, microsserviços
- **C3: Component** - Módulos, classes, serviços internos
- **C4: Code** (opcional) - Diagramas de classe (raramente necessário)

**Integração com Arc42**:
- C1 → Arc42 Capítulo 3 (Contexto)
- C2/C3 → Arc42 Capítulo 5 (Building Blocks)
- Diagramas de sequência → Arc42 Capítulo 6 (Runtime)

#### 🥒 BDD: Especificação de Comportamento
Given-When-Then para comportamento observável:

```gherkin
Scenario: [Descrição clara]
  GIVEN [estado inicial / pré-condições]
  WHEN [ação / trigger]
  THEN [resultado esperado / pós-condições]
  AND [condições adicionais]
```

**Aplicação**:
- Requirements no nível de capability → BDD scenarios
- Testes automatizados derivados direto dos scenarios
- Linguagem ubíqua do domínio (DDD)

#### 📝 ADR: Decisões de Arquitetura
Architecture Decision Records documentam o "porquê":

```markdown
# ADR-XXX: [Título da Decisão]

## Status
[Proposto | Aceito | Rejeitado | Depreciado]

## Context
[Por que essa decisão é necessária]

## Decision
[O que foi decidido]

## Consequences
[Impactos positivos e negativos]

## Alternatives Considered
[Outras opções avaliadas + razões para rejeição]
```

**Integração com Arc42**:
- ADRs → Arc42 Capítulo 9 (Decisões)
- Referenciados em outros capítulos quando relevante

#### 🎯 Princípio Central: Specs Determinísticas

**❌ Spec Ambígua** (O que NÃO fazer):
```markdown
O sistema deve permitir registro de usuários.
```
→ IA interpreta de 10²⁰ maneiras diferentes

**✅ Spec Determinística** (O que fazer com Arc42 + C4 + BDD + ADR):
```markdown
## POST /api/auth/register

**Requisição:**
{
  "email": "string (formato: email, máx 255 caracteres)",
  "password": "string (mín 8 caracteres, 1 maiúscula, 1 número)"
}

**Resposta (201 Created):**
{
  "userId": "string (formato: uuid)",
  "email": "string",
  "status": "pending_verification"
}

**Scenario: Registro com dados válidos**
GIVEN usuário não existe no sistema
WHEN usuário submete email válido e senha forte
THEN sistema cria usuário com status "pending_verification"
AND evento user.registered é publicado
AND email de verificação é enviado
AND resposta 201 Created é retornada

**Scenario: Email duplicado**
GIVEN usuário já existe com email "user@example.com"
WHEN usuário tenta registrar com mesmo email
THEN sistema retorna 409 Conflict
AND mensagem "Email já cadastrado"

**Performance**: p95 < 500ms
**Security**: Senha com bcrypt (min 10 rounds), Rate limit 5/hora por IP
**ADR-015**: Escolha de bcrypt sobre argon2 (compatibilidade)
```
→ IA sabe EXATAMENTE o que construir

---

## 🏗️ ESTRUTURA DE ARQUIVOS OTIMIZADA

```
arq-specs-template-master/
├── .claude/
│   ├── constitution.md          # 🆕 Princípios imutáveis do projeto
│   ├── rules/                   # Regras de código
│   └── skills/
│       ├── README.md           # Overview do sistema
│       ├── analyst/            # Discovery + Validation
│       ├── architect/          # 🆕 Solution Design
│       ├── developer/          # 🔄 Implementation (renomeado)
│       ├── tester/             # 🔄 Quality Assurance (renomeado)
│       ├── reviewer/           # 🔄 Code Review (renomeado)
│       ├── documenter/         # 🔄 Documentation (renomeado)
│       ├── orchestrator/       # Workflow Coordination (aprimorado)
│       ├── gatekeeper/         # 🔄 Automated Validation (renomeado)
│       └── guardian/           # Pre-commit Validation
│
├── specs/                       # FONTE DE VERDADE (commitado)
│   └── [capability]/
│       ├── spec.md             # Requirements + Scenarios
│       ├── design.md           # ADRs (opcional)
│       └── contracts/          # API contracts (opcional)
│
├── changes/                     # 🆕 PROPOSTAS (work in progress)
│   ├── [change-id]/
│   │   ├── proposal.md         # Why, What, Impact
│   │   ├── tasks.md            # Checklist de implementação
│   │   ├── design.md           # Design decisions (se complexo)
│   │   └── specs/              # Spec DELTAS
│   │       └── [capability]/
│   │           └── spec.md     # ADDED/MODIFIED/REMOVED/RENAMED
│   └── archive/                # 🆕 HISTÓRICO
│       └── YYYY-MM-DD-[name]/
│
├── .workflow/                   # 🆕 Estado do workflow (git-ignored)
│   ├── current-change.json     # Change ativa
│   ├── metrics.json            # Métricas de saúde
│   └── history.log             # Histórico de execuções
│
├── plano.md                    # Este documento
└── README.md
```

---

## 🔄 WORKFLOW MELHORADO

### Visão Geral (9 Fases)

```
0. Constitution     → Define princípios do projeto (uma vez)
1. Discovery        → Proposta de mudança (por feature)
2. Architecture     → Design técnico (se complexo)
3. Specification    → Deltas de requisitos (Arc42 + BDD)
3.5 Task Decomposition → 🆕 Quebra specs em tasks atômicas (CRÍTICO)
4. Implementation   → Código + Testes task-by-task (TDD + DDD)
5. Review           → Validação de qualidade (12 critérios)
6. Documentation    → Docs adaptativas (Arc42)
7. Archive          → Aplicação de deltas + histórico
8. Deployment       → Commit + Push (opcional)
```

**⚠️ CRÍTICO**: A fase **3.5 Task Decomposition** é o que impede alucinações do Claude Code.
Sem tasks atômicas, o contexto explode e a IA perde o foco determinístico.

### Workflow Detalhado

```
┌─────────────────────────────────────────────────────┐
│ 0. CONSTITUTION (Uma vez por projeto)               │
│    Skill: Analyst                                   │
│    Output: .claude/constitution.md                  │
│    Define: Princípios, constraints, quality gates   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 1. DISCOVERY (Por mudança)                          │
│    Skill: Analyst                                   │
│    Output: changes/[id]/proposal.md                 │
│    ┌───────────────────────────────────────┐        │
│    │ ## Why                                │        │
│    │ [Problema/oportunidade]               │        │
│    │                                       │        │
│    │ ## What Changes                       │        │
│    │ - [Lista de mudanças]                 │        │
│    │ - [Breaking changes]                  │        │
│    │                                       │        │
│    │ ## Impact                             │        │
│    │ - Complexity: LOW | MEDIUM | HIGH     │        │
│    │ - Affected specs: [lista]             │        │
│    │ - Requires Design: YES/NO             │        │
│    └───────────────────────────────────────┘        │
│    Gate: 📋 User approval                           │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 2. ARCHITECTURE (Se Complexity = HIGH)              │
│    Skill: Architect                                 │
│    Output: changes/[id]/design.md                   │
│    ┌───────────────────────────────────────┐        │
│    │ ## Context & Goals                    │        │
│    │ ## Decisions & Trade-offs             │        │
│    │ ## Constitution Compliance            │        │
│    │ ## Migration Plan                     │        │
│    └───────────────────────────────────────┘        │
│    Gate: 📋 Design approval                         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 3. SPECIFICATION                                    │
│    Skill: Analyst + Architect                       │
│    Output: changes/[id]/specs/[cap]/spec.md         │
│    ┌───────────────────────────────────────┐        │
│    │ ## ADDED Requirements                 │        │
│    │ ### Requirement: Nova Feature         │        │
│    │ #### Scenario: Given-When-Then        │        │
│    │                                       │        │
│    │ ## MODIFIED Requirements              │        │
│    │ [Requisito completo com mudanças]     │        │
│    │                                       │        │
│    │ ## REMOVED Requirements               │        │
│    │ ## RENAMED Requirements               │        │
│    └───────────────────────────────────────┘        │
│    Gate: 🤖 Automated format validation             │
│          - Requirements format válido               │
│          - Scenarios presentes                      │
│          - Sem placeholders (TODO, TBD)             │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 3.5 TASK DECOMPOSITION 🆕 CRÍTICO                   │
│    Skill: Orchestrator                              │
│    Input: changes/[id]/specs/[cap]/spec.md          │
│    Output: changes/[id]/tasks.md                    │
│    ┌───────────────────────────────────────┐        │
│    │ ## Phase 0: Setup                     │        │
│    │ - [ ] TASK-001: Estrutura DDD         │        │
│    │ - [ ] TASK-002: Setup de testes       │        │
│    │                                       │        │
│    │ ## Phase 1: Core Requirements         │        │
│    │ ### Requirement: User Registration    │        │
│    │                                       │        │
│    │ - [ ] TASK-003: Criar factory         │        │
│    │   - BDD: "Registro com dados válidos" │        │
│    │   - Acceptance: GIVEN-WHEN-THEN passa │        │
│    │                                       │        │
│    │ - [ ] TASK-004: Criar repository      │        │
│    │   - Depends: TASK-003                 │        │
│    │                                       │        │
│    │ - [ ] TASK-005: Use case registrar    │        │
│    │   - Depends: TASK-003, TASK-004       │        │
│    │   - BDD: Todos scenarios              │        │
│    │                                       │        │
│    │ ## Phase 2: Error Handling            │        │
│    │ ## Phase 3: Tests                     │        │
│    │ ## Phase 4: Quality                   │        │
│    └───────────────────────────────────────┘        │
│    Algoritmo:                                       │
│      1. Para cada Requirement:                      │
│         - Identificar BDD scenarios                 │
│         - Mapear para DDD components (factory,      │
│           repository, use case)                     │
│         - Criar tasks atômicas (< 100 LOC cada)    │
│         - Mapear dependências entre tasks           │
│      2. Organizar em fases sequenciais              │
│      3. Adicionar acceptance criteria por task      │
│    Gate: 🤖 Tasks validadas                         │
│          - Cada task tem acceptance criteria        │
│          - Dependências mapeadas                    │
│          - Rastreável para BDD scenarios            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 4. IMPLEMENTATION (Task-by-Task)                    │
│    Skill: Developer + Tester                        │
│    Process:                                         │
│      FOR EACH task in tasks.md:                     │
│        1. Ler contexto APENAS da task atual:        │
│           - constitution.md                         │
│           - proposal.md                             │
│           - design.md (se existir)                  │
│           - spec.md (APENAS requirement da task)    │
│           - task details + acceptance criteria      │
│        2. Implementar APENAS a task atual           │
│        3. Validar acceptance criteria               │
│        4. Marcar: [x] TASK-XXX                      │
│        5. Próxima task                              │
│    Output: Código + Testes (incremental)            │
│    Gate: 🤖 Automated quality validation            │
│          - Todos os testes passando                 │
│          - Cobertura >= target                      │
│          - Linters sem erros                        │
│          - Build succeeds                           │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 5. REVIEW                                           │
│    Skill: Reviewer                                  │
│    Validação:                                       │
│      - Constitution compliance                      │
│      - 12 critérios Software Quality                │
│      - Cross-artifact consistency                   │
│      - Code patterns & best practices               │
│    Output: Relatório de review                      │
│    Gate: 📋 Reviewer approval                       │
│    Loop: Se issues críticos → volta para Developer  │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 6. DOCUMENTATION                                    │
│    Skill: Documenter                                │
│    Adaptativo por complexidade:                     │
│      LOW: README + comments                         │
│      MEDIUM: + API docs + CHANGELOG                 │
│      HIGH: + ADRs + Migration guides                │
│    Gate: 🤖 Exemplos funcionais testados            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 7. ARCHIVE                                          │
│    Skill: Orchestrator                              │
│    Process:                                         │
│      1. Aplicar deltas programaticamente em specs/  │
│         - RENAMED → REMOVED → MODIFIED → ADDED      │
│      2. Mover change para archive/YYYY-MM-DD-[id]/  │
│      3. Atualizar métricas de saúde                 │
│    Gate: 🤖 Deltas aplicáveis sem conflitos         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 8. DEPLOYMENT (Opcional)                            │
│    Skill: Guardian                                  │
│    Validação: Linters, tests, builds, CI/CD sim     │
│    Ações: Commit + Push + Tag (se solicitado)       │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 MODOS DE OPERAÇÃO

### Modo Completo (Features Complexas)
```
Constitution → Discovery → Architecture → Specification →
Implementation → Review → Documentation → Archive → Deploy
```
**Quando usar**: Nova feature significativa, mudanças arquiteturais, breaking changes

### Modo Lite (Features Simples)
```
Constitution → Discovery → Specification →
Implementation → Review → Documentation → Archive
```
**Quando usar**: Features simples, adições incrementais, melhorias menores

### Modo Hotfix (Correções Urgentes)
```
Discovery (mínimo) → Implementation → Review → Archive
```
**Quando usar**: Bug fixes urgentes, correções de segurança

### Modo Exploratório (Design-Only)
```
Discovery → Architecture → Archive (sem implementação)
```
**Quando usar**: Spike técnico, avaliação de tecnologias, POCs

---

## 📋 MELHORIAS POR SKILL

### 1. Analyst (Aprimorado)
**Status**: 🟡 A atualizar

**Responsabilidades Atualizadas**:
- Fase Inicial: Criação de `proposal.md` (inspirado em OpenSpec)
- Análise de deterioração (mantido)
- Definição de critérios de aceitação (mantido)
- **NOVO**: Identificar se requer design complexo

**Novo Output**: `changes/[id]/proposal.md`
```markdown
## Why
[Problema/oportunidade - 1-2 sentenças]

## What Changes
- [Lista de mudanças]
- [Marcar breaking changes]

## Impact
- Affected specs: [lista]
- Affected code: [sistemas]
- Complexity: LOW | MEDIUM | HIGH

## Next Steps
- [ ] Requires Design Phase? YES/NO
- [ ] Affected capabilities: [lista]
```

**Decisão**:
- Se Complexity = HIGH ou Requires Design = YES → Invocar **Architect**
- Senão → Prosseguir diretamente para Specification

---

### 2. Architect (NOVA SKILL)
**Status**: 🔴 A criar

**Propósito**: Design de solução técnica (inspirado em fury_maxwell-sdd)

**Responsabilidades**:
- Definir abordagem técnica
- Avaliar trade-offs
- Criar ADRs (Architecture Decision Records)
- Research de bibliotecas/frameworks
- Validação de constraints de constitution.md

**Output**: `changes/[id]/design.md`
```markdown
## Context
[Background, constraints, stakeholders]

## Goals / Non-Goals
- Goals: [...]
- Non-Goals: [...]

## Decisions
- Decision: [O quê e por quê]
- Alternatives considered: [Opções + rationale]

## Risks / Trade-offs
- [Risco] → Mitigação

## Migration Plan
[Passos, rollback]

## Constitution Compliance
- [Verificação contra princípios]
```

**Output Adicional**: `changes/[id]/research.md` (opcional)
- Benchmarks de performance
- Compatibilidade de bibliotecas
- Implicações de segurança

---

### 3. Developer (Renomeado de Development)
**Status**: 🟡 A renomear e atualizar

**Melhorias**:
- **ADICIONAR**: Workflow task-by-task (CRÍTICO para evitar alucinações)
- **ADICIONAR**: Contexto focado por task (< 100 LOC)
- **ADICIONAR**: Validação automática de acceptance criteria
- **ADICIONAR**: Validação automática de constitution compliance
- **ADICIONAR**: Leitura obrigatória de `changes/[id]/design.md` (se existir)
- **MANTER**: DDD Tático Co-Located
- **MANTER**: Consulta a tatical-design.md

**Novo Fluxo Task-by-Task** (CRÍTICO):

```
┌─────────────────────────────────────────────────┐
│ FOR EACH task in changes/[id]/tasks.md          │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 1. PREPARAR CONTEXTO FOCADO                     │
│    Ler APENAS:                                  │
│    - constitution.md (full)                     │
│    - proposal.md (full)                         │
│    - design.md (full, se existir)               │
│    - spec.md (APENAS o Requirement da task)     │
│    - tasks.md (APENAS task atual)               │
│                                                 │
│    🚫 NÃO ler:                                  │
│    - Outros requirements de spec.md            │
│    - Outras tasks de tasks.md                  │
│    - Código de outras tasks                    │
│                                                 │
│    Contexto pequeno = sem alucinações           │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 2. IMPLEMENTAR APENAS A TASK ATUAL              │
│    - Criar arquivos conforme task.files         │
│    - Implementar código conforme task.impl      │
│    - Seguir DDD Co-Located                      │
│    - Aplicar TDD (se constitution define)       │
│    - Escrever tests para acceptance criteria    │
│                                                 │
│    Estimativa: < 100 LOC                        │
│    Tempo: < 2 horas                             │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 3. VALIDAR ACCEPTANCE CRITERIA                  │
│    Para cada critério da task:                  │
│    - [ ] Implementação funcional                │
│    - [ ] BDD scenario passa                     │
│    - [ ] Tests passando                         │
│    - [ ] Linters sem erros                      │
│    - [ ] Constitution compliance                │
│                                                 │
│    Se TODOS passam → marcar [x]                 │
│    Se ALGUM falha → corrigir e re-validar       │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 4. MARCAR TASK COMO COMPLETA                    │
│    Atualizar tasks.md:                          │
│    - [x] TASK-XXX: [título]                     │
│                                                 │
│    Commit incremental (opcional):               │
│    git commit -m "feat: [task title]"           │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 5. PRÓXIMA TASK                                 │
│    Seguir dependency graph:                     │
│    - Se task tem dependências não completas:    │
│      → Esperar                                  │
│    - Se dependências satisfeitas:               │
│      → Iniciar próxima task                     │
│    - Se todas tasks completas:                  │
│      → Prosseguir para Review                   │
└─────────────────────────────────────────────────┘
```

**Exemplo de Contexto Focado**:

**Task Atual**: TASK-003 - Implementar factory criar-usuario.ts

**Contexto Carregado** (~500 linhas total):
```
constitution.md                      # ~200 linhas
proposal.md                          # ~50 linhas
design.md                            # ~100 linhas (se existir)
spec.md (APENAS Requirement: User Registration)  # ~80 linhas
tasks.md (APENAS TASK-003)           # ~70 linhas
```

**Total**: ~500 linhas de contexto (vs 5000+ sem task decomposition)

**Resultado**: Claude Code foca APENAS em criar factory, sem se distrair com repository, use case, testes, etc.

**Vantagens do Workflow Task-by-Task**:

1. **Contexto Pequeno** (< 1000 linhas)
   - Claude Code processa menos informação
   - Menos chance de alucinação
   - Foco determinístico

2. **Acceptance Criteria Claro**
   - Cada task tem critérios verificáveis
   - Não avança até satisfazer todos

3. **Build Incremental**
   - Cada task adiciona valor
   - Pode commitar incrementalmente
   - Rollback granular se necessário

4. **Rastreabilidade Total**
   - Cada linha de código rastreia para task
   - Cada task rastreia para BDD scenario
   - Cada scenario rastreia para requirement

5. **Paralelização** (futuro)
   - Tasks independentes podem ser paralelizadas
   - Diferentes developers/agents em diferentes tasks

---

### 4. Tester (Renomeado de Testing)
**Status**: 🟡 A renomear e atualizar

**Melhorias**:
- **ADICIONAR**: Validação de constitution.md para padrões de teste
- **ADICIONAR**: Geração automática de casos de teste baseado em spec deltas
- **MANTER**: Cobertura mínima >80%

**Novo Output**: `changes/[id]/test-report.md`
```markdown
## Test Coverage
- Total Coverage: X%
- Unit Tests: Y passando / Z total
- Integration Tests: A passando / B total

## Requirements Coverage
| Requirement | Scenarios | Test Cases | Status |
|-------------|-----------|------------|--------|
| REQ-001     | 3         | 5          | ✅     |

## Constitution Compliance
- Test-First Imperative: ✅ Seguido
- Integration-First Testing: ✅ Seguido
```

---

### 5. Reviewer (Renomeado de Code-Review)
**Status**: 🟡 A renomear e atualizar

**Melhorias**:
- **ADICIONAR**: Validação automática de constitution compliance
- **ADICIONAR**: Análise cross-artifact (spec → design → code consistency)
- **MANTER**: Framework de 12 critérios Software Quality
- **ADICIONAR**: Automated linting results integration

**Novo Output Estruturado**:
```markdown
## Review Summary
Status: ✅ APPROVED | ⚠️ APPROVED WITH RESERVATIONS | ❌ CHANGES REQUIRED

## Constitution Compliance
- [Lista de verificações contra constitution.md]

## Software Quality Assessment
### 📋 Operation (6/6)
- ✅ Correctness
- ✅ Reliability
...

### 🔄 Revision (3/3)
### 🔀 Transition (3/3)

## Cross-Artifact Consistency
- Spec → Code: ✅ Aligned
- Design Decisions → Implementation: ✅ Aligned
- Test Coverage → Requirements: ⚠️ 85% (target 90%)

## Issues Found
| ID | Severity | Category | Description | Location |
|----|----------|----------|-------------|----------|
| R-1 | 🟠 High | Performance | N+1 query detected | user.service.ts:45 |

## Decision
- [ ] Approved - Proceed to Documentation
- [ ] Approved with Reservations - Note concerns but proceed
- [x] Changes Required - Return to Developer
```

---

### 6. Documenter (Renomeado de Documentation)
**Status**: 🟡 A renomear e atualizar

**Melhorias**:
- **MANTER**: Arc42 como base estrutural (SEMPRE)
- **ADICIONAR**: Documentação Arc42 adaptativa baseada em complexity
- **ADICIONAR**: Geração automática de CHANGELOG baseado em spec deltas
- **ADICIONAR**: Integração com C4 Model para diagramas
- **ADICIONAR**: Validação de BDD scenarios
- **ADICIONAR**: Geração de ADRs estruturados

**Estrutura Arc42 Adaptativa**:

**LOW Complexity** (Arc42 Mínimo - Feature Simples):
- Arc42 Capítulo 6: Runtime (BDD scenarios)
- Arc42 Capítulo 9: Decisões (ADR se necessário)
- Arc42 Capítulo 10: Qualidade (requirements mínimos)
- README.md atualizado
- Inline code comments
- CHANGELOG entry

**MEDIUM Complexity** (Arc42 Parcial - Container/Service):
- Arc42 Capítulo 3: Contexto (C4 Level 1/2)
- Arc42 Capítulo 5: Building Blocks (C4 Level 2/3)
- Arc42 Capítulo 6: Runtime (BDD scenarios + sequence diagrams)
- Arc42 Capítulo 8: Conceitos Transversais (patterns aplicados)
- Arc42 Capítulo 9: Decisões (ADRs)
- Arc42 Capítulo 10: Qualidade (performance, security)
- API documentation (OpenAPI/Swagger)
- User guide (se aplicável)
- CHANGELOG entry

**HIGH Complexity** (Arc42 Completo - Sistema Novo):
- Arc42 Todos os 12 Capítulos
- C4 Model completo (C1, C2, C3, diagramas de sequência)
- BDD scenarios para todos os requisitos críticos
- ADRs para todas as decisões significativas
- API documentation completa
- Architecture documentation
- Deployment guides
- Migration guides
- User guides
- CHANGELOG detalhado

**Validações Obrigatórias**:
- ✅ Todos os requirements têm BDD scenarios
- ✅ Decisões arquiteturais têm ADRs
- ✅ Estrutura Arc42 mínima presente
- ✅ C4 diagrams para componentes principais
- ✅ CHANGELOG atualizado com spec deltas

---

### 7. Orchestrator (Aprimorado)
**Status**: 🟡 A atualizar

**Responsabilidades Atualizadas**:
- **ADICIONAR**: Task Decomposition Engine (CRÍTICO) - Fase 3.5
- **ADICIONAR**: Task Dependency Graph Management
- **ADICIONAR**: Task-by-Task Execution Control
- **ADICIONAR**: Geração de `changes/[id]/tasks.md` automaticamente
- **ADICIONAR**: Aplicação programática de deltas (inspirado em OpenSpec)
- **MANTER**: Coordenação de workflow

**Novo Capability 1: Task Decomposition Engine** 🆕 CRÍTICO

**Propósito**: Quebrar specs (Arc42 + BDD) em tasks atômicas e executáveis

**Input**:
- `changes/[id]/specs/[cap]/spec.md` (Requirements + BDD Scenarios)
- `constitution.md` (princípios do projeto)
- `design.md` (se existir)

**Output**:
- `changes/[id]/tasks.md` (tasks atômicas com dependencies)

**Algoritmo de Decomposição**:

```typescript
function decomposeSpecIntoTasks(spec: Spec): TaskList {
  const tasks: Task[] = [];
  let taskId = 1;

  // Phase 0: Setup
  tasks.push({
    id: `TASK-${taskId++}`,
    title: "Criar estrutura DDD Co-Located",
    priority: "P0",
    estimatedLOC: 20,
    dependencies: [],
    description: "Criar estrutura de diretórios conforme constitution",
    acceptanceCriteria: [
      "Diretórios criados conforme DDD Co-Located",
      "Arquivos vazios com exports criados",
      "Estrutura validada contra tatical-design.md"
    ]
  });

  tasks.push({
    id: `TASK-${taskId++}`,
    title: "Setup de testes e configuração",
    priority: "P0",
    estimatedLOC: 50,
    dependencies: [`TASK-${taskId-2}`],
    acceptanceCriteria: [
      "Framework de testes configurado",
      "Tests podem ser executados",
      "Coverage configurado"
    ]
  });

  // Phase 1-N: Para cada Requirement
  for (const requirement of spec.requirements) {
    const bddScenarios = requirement.scenarios;

    // Mapear requirement para DDD components
    const components = mapToDDDComponents(requirement);
    // components = [factory, repository, use case]

    // Para cada component, criar task
    for (const component of components) {
      tasks.push({
        id: `TASK-${taskId++}`,
        title: `Implementar ${component.type} ${component.name}`,
        priority: "P1",
        estimatedLOC: component.estimatedLOC,
        dependencies: component.dependencies,
        bddScenario: component.relatedScenarios,
        description: component.description,
        implementation: component.codeTemplate,
        acceptanceCriteria: [
          ...component.functionalCriteria,
          `BDD: ${component.relatedScenarios.join(", ")}`,
          "Unit/Integration tests passando"
        ]
      });
    }
  }

  // Phase N: Error Handling
  for (const errorScenario of extractErrorScenarios(spec)) {
    tasks.push({
      id: `TASK-${taskId++}`,
      title: `Implementar tratamento: ${errorScenario.name}`,
      priority: "P2",
      estimatedLOC: 30,
      dependencies: [/* tasks das funcionalidades principais */],
      bddScenario: errorScenario.name,
      acceptanceCriteria: [
        "Erro customizado implementado",
        `BDD: ${errorScenario.name}`,
        "Test passando"
      ]
    });
  }

  // Phase N+1: Tests
  // Phase N+2: Quality

  return {
    tasks,
    phases: organizePhasesFromTasks(tasks),
    dependencyGraph: buildDependencyGraph(tasks)
  };
}

function mapToDDDComponents(requirement: Requirement): DDDComponent[] {
  // Mapeia requirement para padrão DDD Tático
  // Factory → Repository → Use Case

  return [
    {
      type: "factory",
      name: `criar-${entity}`,
      estimatedLOC: 60,
      dependencies: ["TASK-001", "TASK-002"],
      relatedScenarios: [requirement.scenarios[0].name],
      codeTemplate: generateFactoryTemplate(requirement),
      functionalCriteria: [
        "Entidade criada corretamente",
        "Value objects validados",
        "Eventos de domínio gerados"
      ]
    },
    {
      type: "repository",
      name: `persistir-${entity}`,
      estimatedLOC: 80,
      dependencies: [`TASK-${previous+1}`], // depende do factory
      relatedScenarios: [requirement.scenarios[0].name],
      codeTemplate: generateRepositoryTemplate(requirement),
      functionalCriteria: [
        "Persiste no banco de dados",
        "Trata erros de duplicação",
        "Usa transactions"
      ]
    },
    {
      type: "usecase",
      name: `${action}-${entity}`,
      estimatedLOC: 100,
      dependencies: [`TASK-${previous+1}`, `TASK-${previous+2}`],
      relatedScenarios: requirement.scenarios.map(s => s.name),
      codeTemplate: generateUseCaseTemplate(requirement),
      functionalCriteria: [
        "Orquestra factory e repository",
        "Publica eventos de domínio",
        "Todos BDD scenarios satisfeitos"
      ]
    }
  ];
}
```

**Características**:
- **Atomicidade**: Tasks < 100 LOC, implementáveis em < 2h
- **Rastreabilidade**: Cada task rastreia para BDD scenario
- **Dependências explícitas**: Grafo de dependências claro
- **Acceptance-driven**: Critérios verificáveis por task
- **DDD-aware**: Entende padrões DDD Tático (factory, repository, use case)

**Novo Capability 2: Task-by-Task Execution Control**

**Propósito**: Coordenar execução sequencial respeitando dependências

**Workflow**:
```typescript
async function executeTaskByTask(tasksFile: string) {
  const tasks = parseTasksFile(tasksFile);
  const graph = buildDependencyGraph(tasks);

  for (const task of topologicalSort(graph)) {
    if (task.status === "completed") continue;

    console.log(`Executando: ${task.id} - ${task.title}`);

    // Preparar contexto APENAS para esta task
    const context = {
      constitution: readFile("constitution.md"),
      proposal: readFile("changes/[id]/proposal.md"),
      design: readFile("changes/[id]/design.md"), // if exists
      spec: extractRelevantRequirement(task.bddScenario), // APENAS requirement desta task
      task: task // detalhes da task atual
    };

    // Invocar Developer skill com contexto focado
    await invokeDeveloperSkill(context);

    // Validar acceptance criteria
    const passed = await validateAcceptanceCriteria(task);

    if (passed) {
      markTaskAsCompleted(task.id);
    } else {
      console.error(`Task ${task.id} falhou acceptance criteria`);
      break; // para execução
    }
  }
}
```

**Novo Capability 3: Delta Application**

Algoritmo de aplicação de deltas:
```
1. RENAMED: Renomear headers de requisitos
2. REMOVED: Remover blocos de requisitos por header normalizado
3. MODIFIED: Substituir requisitos existentes por header
4. ADDED: Adicionar novos requisitos ao final
5. Mover change para archive/YYYY-MM-DD-[id]/
```

---

### 8. Gatekeeper (Renomeado + Aprimorado)
**Status**: 🟡 A renomear e atualizar

**Responsabilidades Atualizadas**:
- **ADICIONAR**: Validação automática de formato de specs (inspirado em OpenSpec Validator)
- **ADICIONAR**: Validação de constitution compliance
- **ADICIONAR**: Análise de consistência cross-artifact
- **MANTER**: Sistema de gates

**Automated Validations**:

**Gate 1: Design Approval**
- ✅ design.md completo (se necessário)
- ✅ Trade-offs documentados
- ✅ Constitution compliance verificada
- ⏸️ Requer aprovação do usuário

**Gate 2: Specification Format** (Arc42 + C4 + BDD + ADR Compliance)
- ✅ Formato de Requirements válido (`### Requirement:`)
- ✅ Formato de Scenarios válido (`#### Scenario:`) com BDD (GIVEN-WHEN-THEN)
- ✅ Todo requirement tem >= 1 scenario BDD
- ✅ Deltas bem formados (ADDED/MODIFIED/REMOVED/RENAMED)
- ✅ Sem placeholders (TODO, TBD, FIXME)
- ✅ **Arc42 Chapter 6 presente** (Runtime com BDD scenarios) - OBRIGATÓRIO
- ✅ **Arc42 Chapter 10 presente** (Quality Requirements) - OBRIGATÓRIO
- ✅ **Arc42 Chapters adicionais** conforme complexity:
  - LOW: Capítulos 6, 10 (mínimo)
  - MEDIUM: Capítulos 3, 5, 6, 8, 9, 10
  - HIGH: Todos os 12 capítulos
- ✅ **C4 Diagrams** referenciados quando aplicável (Capítulos 3, 5)
- ✅ **ADRs** presentes para decisões arquiteturais (Capítulo 9)
- ❌ Bloqueia se validação falha (automático, sem user input)

**Gate 3: Implementation Quality**
- ✅ Todos os testes passando
- ✅ Cobertura >= 80% (ou target de constitution)
- ✅ Linters passando sem erros
- ✅ Build succeeds
- ❌ Bloqueia se falha (automático)

**Gate 4: Code Review Approval**
- ✅ Sem issues críticos ou altos
- ⚠️ Issues médios/baixos não bloqueiam
- ⏸️ Requer aprovação do reviewer

**Gate 5: Documentation Complete**
- ✅ README atualizado (se aplicável)
- ✅ API docs atualizadas (se aplicável)
- ✅ CHANGELOG atualizado
- ✅ Exemplos funcionais testados
- ❌ Bloqueia se exemplos quebrados

**Gate 6: Archiving Validation**
- ✅ Todos os gates anteriores aprovados
- ✅ Spec deltas aplicáveis (sem conflitos)
- ✅ Métricas de saúde coletadas
- ✅ Tasks marcadas como completas
- ❌ Bloqueia se pré-condições não satisfeitas

**Output Format**:
```json
{
  "gate": "GATE-2-SPECIFICATION",
  "status": "BLOCKED",
  "timestamp": "2025-11-17T...",
  "validations": [
    {
      "check": "Requirements format",
      "status": "PASS",
      "details": "All requirements follow ### Requirement: format"
    },
    {
      "check": "Scenarios presence",
      "status": "FAIL",
      "details": "Requirement 'User Authentication' has 0 scenarios (minimum 1)",
      "severity": "CRITICAL"
    }
  ],
  "decision": "BLOCKED - Fix 2 CRITICAL/HIGH issues before proceeding"
}
```

---

### 9. Guardian (Mantido + Aprimorado)
**Status**: 🟡 A atualizar

**Melhorias**:
- **ADICIONAR**: Validação de constitution compliance pré-commit
- **ADICIONAR**: Checklist dinâmico baseado em constitution.md
- **MANTER**: Validações de linters, testes, builds

**Checklist Dinâmico**:

Se `constitution.md` define:
```markdown
## Core Principles
- Library-First Principle
- Test-First Imperative (TDD)
- Integration-First Testing
```

Então Guardian executa:
1. ✅ Verificar que cada feature está em lib/ standalone
2. ✅ Verificar que tests foram escritos antes do código (git history)
3. ✅ Verificar que há testes de integração para cada feature

---

## 🏛️ CONSTITUTION.MD (Template)

**Localização**: `.claude/constitution.md`
**Status**: 🔴 A criar

```markdown
# Project Constitution
Version: 1.0.0
Created: YYYY-MM-DD
Last Updated: YYYY-MM-DD

## Preamble
This constitution establishes the immutable principles and governance for [Project Name].
Changes to this document require explicit team consensus.

## Article I: Core Principles

### 1. Specification-Driven Development
Every feature SHALL begin with a specification in changes/[id]/specs/.

### 2. Library-First Principle
Every feature SHALL be developed as a standalone, reusable library.

### 3. Test-First Imperative
**NON-NEGOTIABLE**: All features SHALL be developed using Test-Driven Development (TDD).

### 4. Integration-First Testing
Tests SHALL run in realistic environments, not mocked contexts.

### 5. DDD Tactical Structure
Code organization: src/[bounded-context]/[container]/[component]/

### 6. [Custom Principle]
[Adicionar princípios específicos do projeto]

## Article II: Architectural Constraints

### Code Organization
- Structure: DDD Tactical Co-Located
- Naming: Semantic actions over technical suffixes
- Location: `src/[bounded-context]/[container]/[component]/`

### Quality Standards
- Test Coverage: >= 80%
- Linters: Must pass with zero errors
- Documentation: Inline comments + README per bounded context

### Performance Requirements
- API Response Time: <= 200ms (P95)
- Build Time: <= 60s
- Test Suite: <= 120s

## Article III: Development Workflow

### Specification-Driven
- Every feature begins with a specification
- Specifications use OpenSpec delta format
- Implementation follows approved specs

### Quality Gates
- All code changes require peer review
- 12 Software Quality criteria must be satisfied
- Guardian validation before commit

## Article IV: Technology Stack

### Languages & Frameworks
- Primary: [Language X version Y]
- Testing: [Framework Z]
- Build: [Tool A]

### External Dependencies
- Approval required for new dependencies
- Security vulnerability threshold: NONE (zero tolerance)

## Article V: Governance & Evolution

### Amendment Process
Changes to this constitution require:
1. Proposal with rationale
2. Team review period (7 days minimum)
3. Consensus approval (>75% team agreement)
4. Version increment

### Enforcement
- Gatekeeper validates constitution compliance automatically
- Guardian enforces pre-commit
- Violations block workflow progression

## Appendix A: Glossary
[Define termos específicos do projeto]

## Appendix B: References
[Links para documentação adicional]
```

---

## 📊 FORMATO UNIFICADO DE SPECS (Base: Arc42 + C4 + BDD + ADR)

**Fundação**: Todos os specs seguem Arc42 como estrutura base, complementado por C4 Model, BDD e ADR.

### specs/[capability]/spec.md (Estado Atual)

```markdown
# [Capability Name]

## Metadata
- ID: CAP-XXX
- Version: 1.0.0
- Status: Active | Deprecated
- Last Updated: YYYY-MM-DD
- Arc42 Chapters: [6, 9, 10] (mínimo) ou [3, 5, 6, 8, 9, 10] ou [1-12] (completo)

## Arc42 Chapter 3: Context (Se aplicável - MEDIUM/HIGH complexity)
**C4 Level 1/2: System Context / Container Diagram**

### External Systems
- [Sistema Externo 1]: [Propósito da integração]
- [Sistema Externo 2]: [Propósito da integração]

### Integration Patterns
- [REST API | WebSocket | Event Bus | etc]

## Arc42 Chapter 5: Building Blocks (Se aplicável - MEDIUM/HIGH complexity)
**C4 Level 2/3: Container / Component Diagram**

### Components
- [Componente 1]: [Responsabilidade]
- [Componente 2]: [Responsabilidade]

## Arc42 Chapter 6: Runtime (SEMPRE - BDD Scenarios)

### Requirements

### Requirement: [Nome do Requisito]
O sistema SHALL [comportamento normativo].

#### Scenario: [Descrição do cenário] (BDD Format)
- **GIVEN** [estado inicial / pré-condições]
- **WHEN** [ação / trigger]
- **THEN** [resultado esperado / pós-condições]
- **AND** [condições/resultados adicionais]

#### Scenario: [Cenário de erro]
- **GIVEN** [condição de erro]
- **WHEN** [ação que causa erro]
- **THEN** [comportamento de erro esperado]
- **AND** [side effects do erro]

### Requirement: [Outro Requisito]
...

## Arc42 Chapter 8: Crosscutting Concepts (Se aplicável - MEDIUM/HIGH complexity)
- **Security**: [Autenticação, autorização, encryption]
- **Logging**: [Formato, níveis, agregação]
- **Error Handling**: [Estratégia de erros, retry policies]
- **Validation**: [Input validation, business rules]

## Arc42 Chapter 9: Architecture Decisions (ADRs - quando necessário)

### ADR-XXX: [Título da Decisão]
**Status**: Aceito | Proposto | Depreciado
**Context**: [Por que essa decisão]
**Decision**: [O que foi decidido]
**Consequences**: [Trade-offs]
**Alternatives**: [Outras opções consideradas]

## Arc42 Chapter 10: Quality Requirements (SEMPRE)

### Performance
- Response Time: [< Xms (p95)]
- Throughput: [Y req/s]

### Security
- Authentication: [OAuth2 | JWT | etc]
- Rate Limiting: [X req/min]
- Encryption: [TLS 1.3, bcrypt, etc]

### Reliability
- Availability: [99.9%]
- Error Rate: [< 0.1%]

## Contracts (Opcional - se expõe API)
[Contratos de API OpenAPI/Swagger]

```json
POST /api/endpoint
Request: { ... }
Response: { ... }
Errors: 400, 404, 409, 422, 429, 500
```

## Notes
[Referências cruzadas, considerações adicionais]
```

### changes/[id]/specs/[capability]/spec.md (Deltas)

```markdown
# [Capability Name] - Change Deltas

## ADDED Requirements

### Requirement: Nova Feature X
O sistema SHALL fornecer funcionalidade X.

#### Scenario: Caso de sucesso
- **WHEN** usuário realiza ação A
- **THEN** sistema responde com B

#### Scenario: Caso de erro
- **GIVEN** condição de erro
- **WHEN** usuário tenta ação A
- **THEN** sistema retorna erro Y

## MODIFIED Requirements

### Requirement: Feature Existente Y
[COPIAR O REQUISITO COMPLETO COM AS MODIFICAÇÕES]

O sistema SHALL fazer Z (modificado de "fazer W").

#### Scenario: Novo comportamento
...

## REMOVED Requirements

### Requirement: Feature Antiga Z
**Reason**: [Por que está sendo removido]
**Migration**: [Como usuários devem se adaptar]

## RENAMED Requirements

- FROM: `### Requirement: Nome Antigo`
- TO: `### Requirement: Nome Novo`
- **Reason**: [Justificativa para renomeação]
```

---

## 📋 TEMPLATE DE TASKS.MD (Task Decomposition)

**Localização**: `changes/[id]/tasks.md`
**Gerado por**: Orchestrator (fase 3.5)
**Propósito**: Decompor specs em tasks atômicas para execução determinística

### Estrutura Completa de tasks.md

```markdown
# Implementation Tasks: [Change ID]

**Change**: [change-id]
**Capability**: [capability-name]
**Generated**: YYYY-MM-DD
**Total Tasks**: XX
**Estimated LOC**: ~XXX lines

---

## 📊 Progress Tracker

- Total: [ ] 0/XX tasks completed
- Phase 0: [ ] 0/2 (Setup)
- Phase 1: [ ] 0/5 (Core Requirements)
- Phase 2: [ ] 0/3 (Error Handling)
- Phase 3: [ ] 0/4 (Tests)
- Phase 4: [ ] 0/2 (Quality)

---

## Phase 0: Setup & Infrastructure

**Purpose**: Preparar estrutura base antes da implementação

### TASK-001: Criar estrutura DDD Co-Located
**Priority**: P0 (Blocker)
**Estimated LOC**: ~20 lines
**Dependencies**: None

**Description**:
Criar estrutura de diretórios seguindo DDD Tático Co-Located conforme constitution.md

**File Structure**:
```
src/auth/user/registration/
  - index.ts              # Aggregate root (export)
  - criar-usuario.ts      # Factory
  - persistir-usuario.ts  # Repository
  - registrar.ts          # Use case
  - Usuario.ts            # Entity
  - Email.ts              # Value object
  - Senha.ts              # Value object
  - registration.spec.ts  # Tests
```

**Acceptance Criteria**:
- [ ] Diretórios criados conforme DDD Co-Located
- [ ] Arquivos vazios com exports criados
- [ ] Index.ts exporta interfaces públicas
- [ ] Estrutura validada contra tatical-design.md

---

### TASK-002: Setup de testes e configuração
**Priority**: P0 (Blocker)
**Estimated LOC**: ~50 lines
**Dependencies**: TASK-001

**Description**:
Configurar framework de testes e setup inicial

**Files**:
- `src/auth/user/registration/registration.spec.ts`
- `vitest.config.ts` (ou jest.config.js)

**Acceptance Criteria**:
- [ ] Framework de testes configurado
- [ ] Tests podem ser executados: `npm test`
- [ ] Coverage configurado: `npm run coverage`
- [ ] Primeiro test "smoke" passando

---

## Phase 1: Core Requirements

**Purpose**: Implementar requisitos principais mapeados dos BDD scenarios

### Requirement: User Registration (CAP-AUTH-001)

**BDD Scenarios Mapeados**:
1. Scenario: "Registro com dados válidos" → TASK-003, TASK-004, TASK-005
2. Scenario: "Email duplicado" → TASK-006
3. Scenario: "Senha fraca" → TASK-007

---

### TASK-003: Implementar factory criar-usuario.ts
**Priority**: P1
**Estimated LOC**: ~60 lines
**Dependencies**: TASK-001, TASK-002
**BDD Scenario**: "Registro com dados válidos" (partial)

**Description**:
Criar factory que constrói entidade Usuario a partir de dados brutos

**Implementation**:
```typescript
// src/auth/user/registration/criar-usuario.ts

interface CriarUsuarioInput {
  email: string;
  password: string;
}

interface CriarUsuarioOutput {
  usuario: Usuario;
  eventos: DomainEvent[];
}

export function criarUsuario(input: CriarUsuarioInput): CriarUsuarioOutput {
  // 1. Validar email (formato)
  // 2. Validar senha (requisitos mínimos)
  // 3. Hash da senha (bcrypt)
  // 4. Criar value objects: Email, Senha
  // 5. Criar entidade Usuario
  // 6. Gerar evento: UsuarioCriado
  // 7. Retornar usuario + eventos
}
```

**Acceptance Criteria**:
- [ ] Função `criarUsuario` implementada
- [ ] Email validado (formato via regex)
- [ ] Senha validada (min 8 chars, 1 uppercase, 1 number)
- [ ] Senha com hash bcrypt (min 10 rounds)
- [ ] Value objects Email e Senha criados
- [ ] Entidade Usuario criada com ID (uuid)
- [ ] Evento UsuarioCriado gerado
- [ ] **BDD Partial**: GIVEN válido → Usuario criado
- [ ] Unit test: `describe('criarUsuario')` passando

---

### TASK-004: Implementar repository persistir-usuario.ts
**Priority**: P1
**Estimated LOC**: ~80 lines
**Dependencies**: TASK-003
**BDD Scenario**: "Registro com dados válidos" (partial)

**Description**:
Criar repository para persistir Usuario no banco de dados

**Implementation**:
```typescript
// src/auth/user/registration/persistir-usuario.ts

interface PersistirUsuarioInput {
  usuario: Usuario;
}

interface PersistirUsuarioOutput {
  usuarioId: string;
  success: boolean;
}

export async function persistirUsuario(
  input: PersistirUsuarioInput
): Promise<PersistirUsuarioOutput> {
  // 1. Conectar com banco de dados
  // 2. Verificar se email já existe (unique constraint)
  // 3. Inserir registro na tabela users
  // 4. Retornar usuarioId
}
```

**Acceptance Criteria**:
- [ ] Função `persistirUsuario` implementada
- [ ] Conexão com banco de dados (via config)
- [ ] Verificação de email único (query before insert)
- [ ] Insert na tabela users com transaction
- [ ] Error handling para duplicate email
- [ ] **BDD Partial**: Usuario persiste no banco
- [ ] Integration test: `describe('persistirUsuario')` passando

---

### TASK-005: Implementar use case registrar.ts
**Priority**: P1
**Estimated LOC**: ~100 lines
**Dependencies**: TASK-003, TASK-004
**BDD Scenario**: "Registro com dados válidos" (complete)

**Description**:
Orquestrar todo o fluxo de registro de usuário

**Implementation**:
```typescript
// src/auth/user/registration/registrar.ts

interface RegistrarUsuarioInput {
  email: string;
  password: string;
}

interface RegistrarUsuarioOutput {
  userId: string;
  email: string;
  status: 'pending_verification';
}

export async function registrarUsuario(
  input: RegistrarUsuarioInput
): Promise<RegistrarUsuarioOutput> {
  // 1. Criar usuario (TASK-003)
  // 2. Persistir usuario (TASK-004)
  // 3. Publicar evento user.registered
  // 4. Enviar email de verificação (side effect)
  // 5. Log: INFO "Usuário registrado: {userId}"
  // 6. Retornar resultado
}
```

**Acceptance Criteria**:
- [ ] Função `registrarUsuario` implementada
- [ ] Chama `criarUsuario` e `persistirUsuario`
- [ ] Publica evento `user.registered` no event bus
- [ ] Envia email de verificação (integração SendGrid/mock)
- [ ] Log estruturado: INFO level
- [ ] Retorna userId, email, status
- [ ] **BDD Complete**: GIVEN-WHEN-THEN completo
  - GIVEN: usuário não existe
  - WHEN: usuário submete dados válidos
  - THEN: usuario criado + evento + email + log + resposta 201
- [ ] Integration test: `describe('registrarUsuario')` passando
- [ ] Test coverage >= 80%

---

## Phase 2: Error Handling

**Purpose**: Implementar cenários de erro mapeados dos BDD scenarios

### TASK-006: Implementar erro de email duplicado
**Priority**: P2
**Estimated LOC**: ~40 lines
**Dependencies**: TASK-005
**BDD Scenario**: "Email duplicado"

**Description**:
Tratar erro quando email já existe no sistema

**Implementation**:
- Criar classe de erro: `EmailJaExisteError`
- Adicionar tratamento em `persistirUsuario`
- Propagar erro até `registrarUsuario`
- Retornar resposta HTTP 409 Conflict

**Acceptance Criteria**:
- [ ] `EmailJaExisteError` implementado
- [ ] `persistirUsuario` lança erro se duplicate
- [ ] `registrarUsuario` captura e trata erro
- [ ] **BDD Complete**:
  - GIVEN: usuário já existe com email "user@example.com"
  - WHEN: usuário tenta registrar com mesmo email
  - THEN: erro 409 Conflict + mensagem "Email já cadastrado"
- [ ] Test: `describe('Email duplicado')` passando

---

### TASK-007: Implementar validação de senha fraca
**Priority**: P2
**Estimated LOC**: ~30 lines
**Dependencies**: TASK-005
**BDD Scenario**: "Senha fraca"

**Description**:
Validar requisitos de senha forte

**Implementation**:
- Criar classe de erro: `SenhaFracaError`
- Adicionar validação em `criarUsuario`
- Validar: min 8 chars, 1 uppercase, 1 number

**Acceptance Criteria**:
- [ ] `SenhaFracaError` implementado
- [ ] Validação de senha em `criarUsuario`
- [ ] **BDD Complete**:
  - GIVEN: usuário fornece senha fraca
  - WHEN: usuário tenta registrar
  - THEN: erro 422 Unprocessable + mensagem requisitos
- [ ] Test: `describe('Senha fraca')` passando

---

## Phase 3: Tests

**Purpose**: Garantir cobertura e qualidade dos testes

### TASK-008: Unit tests para criar-usuario.ts
**Priority**: P2
**Estimated LOC**: ~150 lines
**Dependencies**: TASK-003

**Test Cases**:
- [ ] Should create user with valid email and password
- [ ] Should hash password with bcrypt
- [ ] Should throw error for invalid email format
- [ ] Should throw error for weak password
- [ ] Should generate UsuarioCriado event
- [ ] Should generate unique UUID for user ID

---

### TASK-009: Unit tests para persistir-usuario.ts
**Priority**: P2
**Estimated LOC**: ~120 lines
**Dependencies**: TASK-004

**Test Cases**:
- [ ] Should persist user to database
- [ ] Should throw EmailJaExisteError for duplicate
- [ ] Should use database transaction
- [ ] Should return userId on success

---

### TASK-010: Integration tests para registrar.ts
**Priority**: P2
**Estimated LOC**: ~200 lines
**Dependencies**: TASK-005, TASK-006, TASK-007

**Test Cases**:
- [ ] End-to-end: Registro com dados válidos
- [ ] End-to-end: Email duplicado (409)
- [ ] End-to-end: Senha fraca (422)
- [ ] Event bus: user.registered published
- [ ] Email verification sent
- [ ] Logs generated correctly

---

### TASK-011: Coverage validation
**Priority**: P2
**Estimated LOC**: N/A
**Dependencies**: TASK-008, TASK-009, TASK-010

**Acceptance Criteria**:
- [ ] Total coverage >= 80%
- [ ] All BDD scenarios have corresponding tests
- [ ] All edge cases covered
- [ ] Run: `npm run coverage` - passes

---

## Phase 4: Quality & Compliance

**Purpose**: Validar conformidade e qualidade final

### TASK-012: Constitution compliance check
**Priority**: P3
**Estimated LOC**: N/A
**Dependencies**: All previous tasks

**Validation**:
- [ ] DDD Co-Located structure followed
- [ ] Semantic naming (no technical suffixes)
- [ ] Test-First followed (if TDD in constitution)
- [ ] Integration tests in realistic environment
- [ ] No hardcoded values (use config)

---

### TASK-013: Code review self-check
**Priority**: P3
**Estimated LOC**: N/A
**Dependencies**: TASK-012

**Checklist**:
- [ ] Linters pass (0 errors)
- [ ] Build succeeds
- [ ] All tests pass
- [ ] No TODO/FIXME/HACK comments
- [ ] Code follows .claude/rules/
- [ ] Ready for peer review

---

## 📝 Notes

**Task Execution Order**:
1. Always start with TASK-001 (blocking all others)
2. Follow dependency chain strictly
3. Mark task as [x] only when ALL acceptance criteria met
4. If blocked, document blocker and notify

**Context Per Task**:
When implementing TASK-XXX, Developer should read ONLY:
- constitution.md (full)
- proposal.md (full)
- design.md (full, if exists)
- spec.md (ONLY the Requirement mentioned in task)
- Current task details + acceptance criteria

**Do NOT read**:
- Other requirements from spec.md
- Other tasks from tasks.md
- Implementation of other tasks

This keeps context small and focused = deterministic output.
```

### Princípios de Task Decomposition

**1. Atomicidade** (< 100 LOC por task)
- Task deve ser implementável em < 2 horas
- Contexto focado = sem alucinações

**2. Rastreabilidade**
- Cada task rastreia para BDD scenario
- Cada acceptance criteria valida GIVEN-WHEN-THEN

**3. Dependências Explícitas**
- Grafo de dependências claro
- Ordem de execução determinística

**4. Acceptance-Driven**
- Cada task tem acceptance criteria verificável
- Só marca [x] quando criteria satisfeito

**5. Incremental**
- Build incremental (cada task adiciona valor)
- Tests incrementais (coverage cresce task a task)

---

## 🚀 ROTEIRO DE IMPLEMENTAÇÃO

### Fase 1: Foundation (Semana 1) - PRIORIDADE ALTA
**Objetivo**: Criar estrutura básica e constitution

- [ ] **1.1** Criar diretórios `changes/` e `archive/`
- [ ] **1.2** Criar template de `constitution.md`
- [ ] **1.3** Criar skill **Architect** (SKILL.md + templates)
- [ ] **1.4** Renomear skills:
  - [ ] `development/` → `developer/`
  - [ ] `testing/` → `tester/`
  - [ ] `code-review/` → `reviewer/`
  - [ ] `documentation/` → `documenter/`
  - [ ] `gate-keeper/` → `gatekeeper/`
- [ ] **1.5** Atualizar `SKILL.md` do Analyst com novo output (proposal.md)

**Entregáveis**:
- ✅ Estrutura de diretórios criada
- ✅ constitution.md template disponível
- ✅ Architect skill operacional
- ✅ Skills renomeadas
- ✅ Analyst atualizado

---

### Fase 2: Automation (Semana 2-3) - PRIORIDADE ALTA
**Objetivo**: Implementar validações automáticas e delta system

- [ ] **2.1** Implementar Gatekeeper automated validations
  - [ ] Validação de formato de requirements
  - [ ] Validação de scenarios
  - [ ] Detecção de placeholders
  - [ ] Validação de constitution compliance
- [ ] **2.2** Criar parser de spec deltas
  - [ ] Parser de ADDED requirements
  - [ ] Parser de MODIFIED requirements
  - [ ] Parser de REMOVED requirements
  - [ ] Parser de RENAMED requirements
- [ ] **2.3** Implementar delta application no Orchestrator
  - [ ] Algoritmo de aplicação de deltas
  - [ ] Testes de aplicação correta
  - [ ] Tratamento de conflitos
- [ ] **2.4** Atualizar todos os SKILL.md com novas responsabilidades

**Entregáveis**:
- ✅ Gatekeeper com validações automáticas
- ✅ Parser de deltas funcional
- ✅ Orchestrator aplicando deltas automaticamente
- ✅ Documentação atualizada

---

### Fase 3: Integration (Semana 4) - PRIORIDADE MÉDIA
**Objetivo**: Integrar métricas e testar workflow completo

- [ ] **3.1** Implementar sistema de métricas
  - [ ] Criar `.workflow/metrics.json` structure
  - [ ] Coletar métricas por change
  - [ ] Coletar métricas agregadas do projeto
- [ ] **3.2** Testar workflow completo end-to-end
  - [ ] Criar change de teste
  - [ ] Executar todas as fases
  - [ ] Validar aplicação de deltas
  - [ ] Verificar métricas coletadas
- [ ] **3.3** Ajustar baseado em feedback
  - [ ] Coletar problemas encontrados
  - [ ] Fazer ajustes necessários
  - [ ] Re-testar workflow

**Entregáveis**:
- ✅ Sistema de métricas operacional
- ✅ Workflow testado end-to-end
- ✅ Ajustes implementados

---

### Fase 4: Documentation (Semana 5) - PRIORIDADE MÉDIA
**Objetivo**: Documentar novo sistema e criar guias

- [ ] **4.1** Atualizar README.md principal
  - [ ] Documentar novo workflow
  - [ ] Adicionar exemplos
  - [ ] Documentar structure de arquivos
- [ ] **4.2** Criar templates de exemplo
  - [ ] Exemplo de proposal.md
  - [ ] Exemplo de design.md
  - [ ] Exemplo de spec deltas
  - [ ] Exemplo de constitution.md
- [ ] **4.3** Criar guia de migração
  - [ ] Comparação sistema antigo vs novo
  - [ ] Passos de migração
  - [ ] FAQs
- [ ] **4.4** Criar guia de troubleshooting
  - [ ] Problemas comuns
  - [ ] Soluções

**Entregáveis**:
- ✅ README atualizado
- ✅ Templates de exemplo
- ✅ Guia de migração
- ✅ Guia de troubleshooting

---

### Fase 5: Polish (Semana 6) - PRIORIDADE BAIXA
**Objetivo**: Refinamentos finais e otimizações

- [ ] **5.1** Otimizar performance
  - [ ] Parser de deltas
  - [ ] Validações do Gatekeeper
- [ ] **5.2** Melhorar mensagens de erro
  - [ ] Feedback mais claro
  - [ ] Sugestões de correção
- [ ] **5.3** Adicionar testes automatizados
  - [ ] Testes do parser
  - [ ] Testes de validação
  - [ ] Testes de delta application
- [ ] **5.4** Criar changelog inicial
  - [ ] Documentar todas as mudanças

**Entregáveis**:
- ✅ Sistema otimizado
- ✅ Mensagens de erro melhoradas
- ✅ Testes automatizados
- ✅ CHANGELOG.md

---

## 🎯 QUICK WINS (Implementar Primeiro)

### 🔥 1. Task Decomposition (CRÍTICO - Evita Alucinações)
**Impacto**: 🔴 CRÍTICO | **Esforço**: 🟡 MÉDIO | **Prioridade**: P0+
**O MAIS IMPORTANTE** - Sem isso, Claude Code alucina por contexto grande

**Por quê é crítico**:
- Specs completas = 5000+ linhas de contexto → Claude Code perde foco → alucina
- Tasks atômicas = ~500 linhas por task → Claude Code mantém foco → determinístico
- **Resultado**: Passa de probabilístico para determinístico

**Ações**:
- [ ] Criar template de `tasks.md` (já está no plano - seção "TEMPLATE DE TASKS.MD")
- [ ] Atualizar Orchestrator SKILL.md com Task Decomposition Engine
- [ ] Implementar algoritmo de decomposição (BDD scenarios → DDD components → tasks)
- [ ] Atualizar Developer SKILL.md para workflow task-by-task
- [ ] Criar exemplo completo de decomposição
- [ ] Testar com uma feature real

**Entregável**:
```
changes/[id]/tasks.md com:
- Tasks atômicas (< 100 LOC cada)
- Dependências explícitas
- Acceptance criteria por task
- Rastreabilidade para BDD scenarios
- Progress tracker
```

**Validação de sucesso**:
- [ ] Developer consegue implementar task em < 2 horas
- [ ] Contexto carregado < 1000 linhas
- [ ] 0 alucinações (código fora do escopo da task)
- [ ] Acceptance criteria satisfeito antes de marcar [x]

---

### 2. Constitution.md
**Impacto**: 🔴 ALTO | **Esforço**: 🟢 BAIXO | **Prioridade**: P0
Criar template e incorporar em Analyst

**Ações**:
- [ ] Criar `.claude/constitution.md` template
- [ ] Atualizar Analyst SKILL.md para incluir criação de constitution
- [ ] Adicionar exemplos ao template

---

### 3. Changes/ Structure
**Impacto**: 🔴 ALTO | **Esforço**: 🟢 BAIXO | **Prioridade**: P0
Criar estrutura de diretórios

**Ações**:
- [ ] Criar `changes/` directory
- [ ] Criar `changes/archive/` directory
- [ ] Adicionar `.gitkeep` ou README explicativo

---

### 4. Proposal.md Format
**Impacto**: 🔴 ALTO | **Esforço**: 🟢 BAIXO | **Prioridade**: P0
Padronizar output do Analyst

**Ações**:
- [ ] Criar template de `proposal.md`
- [ ] Atualizar Analyst SKILL.md com novo formato
- [ ] Adicionar exemplo

---

### 5. Spec Deltas Format
**Impacto**: 🔴 ALTO | **Esforço**: 🟡 MÉDIO | **Prioridade**: P1
Implementar ADDED/MODIFIED/REMOVED/RENAMED

**Ações**:
- [ ] Documentar formato de deltas
- [ ] Criar template
- [ ] Atualizar Analyst/Architect para gerar deltas
- [ ] Criar exemplos

---

### 6. Gatekeeper Automated Checks
**Impacto**: 🔴 ALTO | **Esforço**: 🟡 MÉDIO | **Prioridade**: P1
Reduzir validações manuais

**Ações**:
- [ ] Implementar validação de formato de requirements
- [ ] Implementar validação de scenarios
- [ ] Implementar detecção de placeholders
- [ ] Implementar validação de constitution compliance
- [ ] Validar Task Decomposition (cada task tem acceptance criteria)

---

## 📈 MÉTRICAS DE SUCESSO

### Leading Indicators (Semana 1-4)
- [ ] 🔥 **Task Decomposition implementado** (CRÍTICO)
- [ ] 🔥 **Developer usando workflow task-by-task** (CRÍTICO)
- [ ] Constitution.md criado e aprovado
- [ ] 3+ changes usando novo formato
- [ ] Gatekeeper bloqueando specs inválidos
- [ ] 0 deltas aplicados manualmente
- [ ] **Contexto médio por task < 1000 linhas**
- [ ] **0 alucinações detectadas** (código fora do escopo)

### Lagging Indicators (Mês 1-3)
- [ ] 📉 Tempo de ciclo: -20% (baseline atual: [TBD])
- [ ] 📉 Iterações de review: -30% (baseline atual: [TBD])
- [ ] 📉 **Taxa de alucinações: -90%** (NOVO - baseline: [TBD])
- [ ] 📈 Cobertura de testes: +15% (baseline atual: [TBD])
- [ ] 📈 Constitution compliance: 90%+
- [ ] 📈 **Tasks completadas no primeiro attempt: 80%+** (NOVO)

### KPIs Principais
| Métrica | Baseline | Target Mês 1 | Target Mês 2 | Target Mês 3 |
|---------|----------|--------------|--------------|--------------|
| **Cycle Time** | TBD | -10% | -20% | -30% |
| **Rework Rate** | TBD | -15% | -25% | -40% |
| **Alucinação Rate** 🔥 | TBD | -50% | -75% | -90% |
| **Task Success Rate** 🔥 | 0% | 70% | 80% | 90% |
| **Contexto Médio/Task** 🔥 | 5000L | 1500L | 1000L | <800L |
| **Test Coverage** | TBD | +5% | +10% | +15% |
| **Constitution Compliance** | 0% | 60% | 80% | 90%+ |
| **Automated Gates Passing** | 0% | 70% | 85% | 95% |

**Legenda**:
- 🔥 = KPI crítico relacionado a Task Decomposition
- L = Linhas de código de contexto

---

## ✅ CHECKLIST DE ADOÇÃO

### Para Começar (Dia 1)
- [ ] Ler este documento completo
- [ ] Criar `changes/` e `archive/` directories
- [ ] Copiar template de `constitution.md`
- [ ] Preencher constitution.md com princípios do projeto
- [ ] Atualizar Analyst skill com novo output

### Primeira Semana
- [ ] Criar skill Architect completa
- [ ] Renomear todas as skills existentes
- [ ] Implementar formato de spec deltas
- [ ] Completar 1 change end-to-end usando novo workflow
- [ ] Documentar lições aprendidas

### Primeiro Mês
- [ ] Implementar Gatekeeper automated checks
- [ ] Implementar delta application no Orchestrator
- [ ] Completar 5+ changes usando workflow completo
- [ ] Coletar métricas de baseline
- [ ] Coletar feedback do time
- [ ] Iterar baseado em feedback

---

## 🔄 PROCESS DE ITERAÇÃO

### Cadência Semanal
**Segunda-feira**: Review & Plan (30 min)
- Revisar changes da semana anterior
- Identificar friction points
- Propor micro-ajustes
- Atribuir experimentos

**Quarta-feira**: Checkpoint (Async)
- Verificação assíncrona de progresso
- Sincronização se houver bloqueadores

**Sexta-feira**: Iterate & Celebrate (15 min)
- Mini-retro
- Decisão sobre adoção permanente de melhorias
- Celebração de conquistas

### Sinais de Alerta (Red Flags)
⚠️ **Yellow Flags** (Atenção):
- Specs tomam mais tempo cada semana
- Mesmo feedback repetido 3 vezes
- Champions menos engajados
- Templates crescendo sem controle

🚨 **Red Flags** (Ação Imediata):
- 3 tentativas de workflow falhadas seguidas
- Métricas principais piorando
- > 50% do time desengajado
- Specs abandonadas > specs usadas

### Protocolo "Circuit Breaker"
PAUSAR e REAVALIAR se 3 destas condições ocorrerem:
- Champion principal se retira
- > 50% da equipe contra
- Métricas pioram 2 semanas seguidas
- Novo manager com filosofia oposta
- Reorganização iminente

---

## 📚 REFERÊNCIAS E FONTES

### Frameworks Analisados
1. **arq-specs-template-master** (Sistema Atual)
   - DDD Tático Co-Located
   - 12 Critérios Software Quality
   - Sistema de gates
   - Análise de deterioração

2. **OpenSpec**
   - Sistema de deltas (ADDED/MODIFIED/REMOVED/RENAMED)
   - Arquivamento automático
   - Specs como verdade
   - Suporte multi-ferramenta

3. **fury_maxwell-sdd**
   - Intent as Truth (80/20 rule)
   - Estratégia de adoção Stealth Mode
   - SDD Planner com matching semântico
   - Sistema de iteração em 3 camadas

4. **spec-kit**
   - Specifications executáveis
   - Constitution-based governance
   - Template-driven quality
   - Workflow em 7 etapas

### Conceitos-Chave Incorporados
- **Document-First Development**: Specs antes de código
- **Executable Specifications**: Specs geram código
- **Constitutional Governance**: Princípios imutáveis
- **Automated Quality Gates**: Validações automáticas
- **Delta-Based Changes**: Mudanças como deltas aplicáveis
- **DDD Semantic Structure**: Organização orientada a domínio
- **Adaptive Documentation**: Docs proporcionais à complexidade

---

## 📝 NOTAS FINAIS

### Filosofia de Implementação
- **Incremental**: Implementar por fases, validar, iterar
- **Pragmático**: Começar simples, adicionar complexidade quando necessário
- **Baseado em Dados**: Medir tudo, decidir baseado em métricas
- **Centrado no Time**: Adoção vem de valor percebido, não imposição

### Próximos Passos
1. ✅ **Validar este plano** com o time
2. ⏳ **Começar Fase 1** (Foundation)
3. ⏳ **Iterar baseado em feedback**
4. ⏳ **Expandir gradualmente**

### Contato e Suporte
Para dúvidas ou sugestões sobre este plano:
- Abrir issue no repositório
- Discutir em reuniões semanais
- Propor melhorias via PR

---

---

## 🎓 RESUMO: FUNDAÇÃO ARQUITETURAL (Arc42 + C4 + BDD + ADR)

### A Base Inabalável das Especificações

```
┌─────────────────────────────────────────────────────────────┐
│                    FUNDAÇÃO ARQUITETURAL                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🏛️ ARC42 (Base Estrutural - 12 Capítulos)                  │
│     ↓                                                        │
│     1-2:  Introdução + Restrições                           │
│     3:    Contexto ← integra C4 Level 1                      │
│     4:    Estratégia                                         │
│     5:    Building Blocks ← integra C4 Level 2/3             │
│     6:    Runtime ← integra BDD Scenarios (OBRIGATÓRIO)      │
│     7:    Deployment                                         │
│     8:    Crosscutting Concepts                              │
│     9:    Decisões ← integra ADRs (quando necessário)        │
│     10:   Quality Requirements (OBRIGATÓRIO)                 │
│     11:   Riscos                                             │
│     12:   Glossário                                          │
│                                                              │
│  📐 C4 MODEL (Visualização - 4 Níveis)                       │
│     ↓                                                        │
│     C1: System Context → Arc42 Cap 3                         │
│     C2: Container → Arc42 Cap 5                              │
│     C3: Component → Arc42 Cap 5                              │
│     C4: Code (raramente usado)                               │
│                                                              │
│  🥒 BDD (Comportamento Observável)                           │
│     ↓                                                        │
│     GIVEN → pré-condições                                    │
│     WHEN → ação/trigger                                      │
│     THEN → resultado esperado                                │
│     AND → condições adicionais                               │
│     ↓                                                        │
│     Integra Arc42 Cap 6 (Runtime)                            │
│     Testes automatizados derivam dos scenarios               │
│                                                              │
│  📝 ADR (Decisões de Arquitetura)                            │
│     ↓                                                        │
│     Status + Context + Decision + Consequences               │
│     ↓                                                        │
│     Integra Arc42 Cap 9 (Decisões)                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘

                           ↓

┌─────────────────────────────────────────────────────────────┐
│                  SPECS DETERMINÍSTICAS                       │
│                                                              │
│  Ambiguidade → 10²⁰ implementações possíveis ❌              │
│  Determinístico → 1 implementação correta ✅                 │
│                                                              │
│  IA gera EXATAMENTE o que você quer                          │
└─────────────────────────────────────────────────────────────┘
```

### Aplicação por Complexity

| Complexity | Arc42 Chapters | C4 Levels | BDD | ADR |
|------------|----------------|-----------|-----|-----|
| **LOW** (Feature Simples) | 6, 10 | - | ✅ Todos requirements | Se necessário |
| **MEDIUM** (Container/Service) | 3, 5, 6, 8, 9, 10 | C1, C2 | ✅ Todos requirements | ✅ Decisões chave |
| **HIGH** (Sistema Novo) | 1-12 (Completo) | C1, C2, C3 | ✅ Todos requirements | ✅ Todas decisões |

### Validação Automática (Gatekeeper)

**OBRIGATÓRIO em TODAS as specs**:
- ✅ Arc42 Chapter 6 (Runtime com BDD)
- ✅ Arc42 Chapter 10 (Quality Requirements)
- ✅ BDD scenarios para todos requirements
- ✅ Formato GIVEN-WHEN-THEN

**OBRIGATÓRIO conforme complexity**:
- ✅ C4 Diagrams (MEDIUM/HIGH)
- ✅ ADRs para decisões (MEDIUM/HIGH)
- ✅ Arc42 completo (HIGH)

### Referências

**Arc42**: https://arc42.org/
**C4 Model**: https://c4model.com/
**BDD**: https://cucumber.io/docs/bdd/
**ADR**: https://adr.github.io/

---

**Última Atualização**: 2025-11-17
**Versão**: 1.0.0
**Status**: 🟡 Em Planejamento → 🟢 Pronto para Execução
**Fundação**: Arc42 + C4 Model + BDD + ADR (INABALÁVEL)

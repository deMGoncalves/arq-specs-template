# Orchestrator - Checklist de Validação

**ID**: SKL-003
**Categoria**: 🎯 Task Decomposition
**Fase**: 3.5
**Criticidade**: 🔴 CRITICAL (previne AI hallucinations)

---

## 🎯 Propósito

Este checklist garante que o Orchestrator decomponha specs grandes em tasks atômicas (<100 LOC, ~500 lines context) para prevenir hallucinations durante implementação.

**Por quê crítico?**
```
Large context (5000+ lines) → AI loses focus → Hallucinations ❌
Small context (~500 lines/task) → AI stays deterministic → Correct code ✅
```

---

## ✅ Checklist - Pré-decomposição

### 1. Validar Inputs Disponíveis

```markdown
- [ ] spec.md existe e está aprovado (Gate 2: Specification Format)
- [ ] proposal.md existe (contexto e complexidade)
- [ ] design.md existe (se HIGH complexity)
- [ ] .claude/specs/ (quality rules, architectural principles) foi consultado (principles)
- [ ] .claude/rules/ foi consultado (39+ regras)
```

**Critério de Sucesso**: Todos os inputs estão disponíveis

---

### 2. Analisar Spec.md

#### 2.1 Contar LOC e Contexto

```markdown
- [ ] spec.md foi lido completamente
- [ ] LOC total foi contado (wc -l)
- [ ] Complexidade foi estimada baseada em LOC:
      - < 500 LOC: LOW (5-15 tasks)
      - 500-2000 LOC: MEDIUM (15-40 tasks)
      - > 2000 LOC: HIGH (40-100 tasks)
```

#### 2.2 Extrair BDD Scenarios

```markdown
- [ ] Todos os cenários BDD foram identificados (SCN-XXX)
- [ ] Para cada cenário:
      - [ ] Feature está clara
      - [ ] Given/When/Then estão bem definidos
      - [ ] Tipo foi identificado (happy-path, error-case, edge-case)
- [ ] Cenários foram priorizados (P0 → P1 → P2)
```

#### 2.3 Mapear DDD Components

```markdown
- [ ] Bounded contexts foram identificados
- [ ] Containers foram mapeados (CNT-XXX)
- [ ] Componentes foram mapeados (CMP-XXX)
- [ ] Para cada componente, tipo foi identificado:
      - [ ] Aggregate
      - [ ] Entity
      - [ ] Value Object
      - [ ] Factory
      - [ ] Repository
      - [ ] Use Case
      - [ ] Domain Event
```

**Critério de Sucesso**: Mapa completo BDD → DDD components

---

## ✅ Checklist - Decomposição

### 3. Gerar Tasks por Fase

#### Phase 0: Setup Tasks

```markdown
- [ ] TASK-000: Criar estrutura de diretórios (DDD Co-Located)
- [ ] TASK-001: Criar módulos base (mod.rs, index.ts)
- [ ] TASK-002: Configurar testes (setup test fixtures)
```

**Critério**: 2-3 setup tasks

#### Phase 1: Core Domain Tasks

```markdown
- [ ] Para cada Aggregate:
      - [ ] TASK: Criar aggregate root (index.ts, mod.rs)
      - [ ] TASK: Criar entity principal (Entity.ts)
      - [ ] TASK: Criar value objects (≤100 LOC)
      - [ ] TASK: Criar factory (criar-entity.ts)

- [ ] Para cada Use Case:
      - [ ] TASK: Implementar use case (action-entity.ts)
      - [ ] TASK: Integrar com aggregate

- [ ] Para cada Repository:
      - [ ] TASK: Criar interface (abstração)
      - [ ] TASK: Implementar adapter (infraestrutura)
```

**Critério**: Cada task ≤100 LOC estimado

#### Phase 2: Error Handling Tasks

```markdown
- [ ] Para cada cenário BDD error-case:
      - [ ] TASK: Implementar validação
      - [ ] TASK: Criar custom error type
      - [ ] TASK: Adicionar error handling no use case

- [ ] TASK: Implementar Result<T, E> pattern
- [ ] TASK: Adicionar logging de erros
```

**Critério**: 1 task por tipo de erro + 2 tasks gerais

#### Phase 3: Test Tasks

```markdown
- [ ] Para cada componente:
      - [ ] TASK: Testes unitários (entity, value object, factory)
      - [ ] TASK: Testes de integração (use case, repository)

- [ ] Para cada cenário BDD:
      - [ ] TASK: Teste e2e (happy path)
      - [ ] TASK: Testes de error cases
      - [ ] TASK: Testes de edge cases
```

**Critério**: Cobertura esperada ≥80%

#### Phase 4: Quality Tasks

```markdown
- [ ] TASK: Aplicar Object Calisthenics (39 rules)
- [ ] TASK: Refatorar para SRP
- [ ] TASK: Adicionar doc comments
- [ ] TASK: Atualizar README/CHANGELOG
- [ ] TASK: Executar lint e fix warnings
```

**Critério**: 3-5 quality tasks

---

### 4. Estabelecer Dependências

```markdown
- [ ] Para cada task, dependências foram identificadas:
      - [ ] Prerequisites (quais tasks devem completar antes?)
      - [ ] Blockers (quais tasks bloqueiam outras?)

- [ ] DAG (Directed Acyclic Graph) foi validado:
      - [ ] Sem ciclos (A depende de B, B depende de A)
      - [ ] Ordem topológica está correta

- [ ] Critical path foi identificado (tasks sequenciais)
```

**Critério**: DAG válido sem ciclos

---

### 5. Definir Contexto por Task

Para **CADA task**, definir:

```markdown
- [ ] Files to Load (contexto):
      - Specs: spec.md (seção relevante, ~100 lines)
      - Design: design.md (seção relevante, se aplicável)
      - Rules: .claude/rules/XXX.md (2-3 regras aplicáveis)
      - Code: src/ (arquivos relacionados, ~200 lines)
      - Tests: tests/ (exemplos existentes, ~100 lines)
      - **Total context**: ~500 lines (CRÍTICO: não exceder)

- [ ] Acceptance Criteria (específico para task):
      - [ ] Critério 1: Função X implementada
      - [ ] Critério 2: Testes Y passando
      - [ ] Critério 3: Regras Z seguidas

- [ ] Definition of Done:
      - [ ] Código implementado
      - [ ] Testes escritos e passando
      - [ ] Lint sem warnings
      - [ ] Revisado (opcional, dependendo da task)
```

**Critério**: CADA task tem contexto ≤500 lines

---

## ✅ Checklist - Geração de tasks.md

### 6. Estrutura do tasks.md

```markdown
- [ ] Metadados:
      - [ ] Versão, Data, Status
      - [ ] Total de tasks (N)
      - [ ] Estimativa de tempo total

- [ ] Resumo:
      - [ ] Visão geral da decomposição
      - [ ] Estratégia utilizada
      - [ ] Fases (0-4) com contagem

- [ ] Para cada task (TASK-NNN):
      - [ ] ID único (TASK-001, TASK-002, ...)
      - [ ] Phase (0-4)
      - [ ] Priority (P0/P1/P2/P3)
      - [ ] Title (curto, claro)
      - [ ] Description (detalhada)
      - [ ] Estimated LOC (<100)
      - [ ] Estimated Time (<2h)
      - [ ] Dependencies (lista de TASK-XXX)
      - [ ] Files to Load (contexto completo)
      - [ ] Acceptance Criteria (3-5)
      - [ ] Definition of Done

- [ ] Ordem de Execução:
      - [ ] Lista topológica (sequência correta)
      - [ ] Parallelization opportunities destacadas

- [ ] Validação Final:
      - [ ] Total tasks: N
      - [ ] Max LOC por task: <100
      - [ ] Max context por task: ~500 lines
      - [ ] Cobertura de spec.md: 100%
```

**Critério de Sucesso**: tasks.md completo e estruturado

---

## ✅ Checklist - Validação

### 7. Validar Qualidade da Decomposição

#### 7.1 Métricas Quantitativas

```markdown
- [ ] Total tasks: N (dentro da faixa esperada?)
      - LOW: 5-15 tasks ✅
      - MEDIUM: 15-40 tasks ✅
      - HIGH: 40-100 tasks ✅

- [ ] LOC por task:
      - [ ] Max: ≤100 LOC
      - [ ] Média: 40-80 LOC
      - [ ] Nenhuma task >100 LOC (CRÍTICO)

- [ ] Context por task:
      - [ ] Max: ~500 lines
      - [ ] Média: 400-500 lines
      - [ ] Nenhuma task >600 lines (CRÍTICO)

- [ ] Dependências:
      - [ ] DAG válido (sem ciclos)
      - [ ] Critical path: <50% das tasks (paralelização possível)
```

**Critério**: Todas as métricas dentro dos limites

#### 7.2 Cobertura

```markdown
- [ ] 100% dos cenários BDD foram cobertos por tasks
- [ ] 100% dos componentes DDD foram cobertos por tasks
- [ ] Todas as regras (.claude/rules/) aplicáveis foram referenciadas
- [ ] Todos os error cases foram cobertos
- [ ] Todos os edge cases foram cobertos
```

**Critério**: Cobertura completa (100%)

#### 7.3 Atomicidade

```markdown
- [ ] Cada task tem responsabilidade única (SRP)
- [ ] Cada task pode ser implementada independentemente (após deps)
- [ ] Cada task tem critérios de aceitação verificáveis
- [ ] Nenhuma task é "implementar feature X" (muito vago)
```

**Critério**: Tasks atômicas e claras

---

### 8. Gate de Qualidade

**Critérios Obrigatórios** (TODOS devem passar):

```markdown
- [ ] ✅ Spec.md foi analisado completamente
- [ ] ✅ BDD scenarios → DDD components mapeados
- [ ] ✅ Tasks geradas para todas as fases (0-4)
- [ ] ✅ Dependências estabelecidas (DAG válido)
- [ ] ✅ Contexto definido para cada task (≤500 lines)
- [ ] ✅ tasks.md completo com todas as seções
- [ ] ✅ Métricas dentro dos limites:
      - Max LOC/task: ≤100
      - Max context/task: ~500 lines
      - Total tasks: dentro da faixa esperada
- [ ] ✅ Cobertura 100% (BDD scenarios, components, rules)
- [ ] ✅ Tasks atômicas (SRP, independentes, verificáveis)
```

**Pass**: 100% dos critérios ✅ → Prosseguir para Phase 4 (developer)
**Fail**: <100% → Refinar decomposição, re-executar orchestrator

---

## 🚨 Alertas Críticos

### ❌ Bloqueador 1: Task >100 LOC

**Problema**: Task com estimativa >100 LOC encontrada

**Impacto**: Alto risco de hallucinations

**Ação**:
1. Dividir task em 2-3 sub-tasks menores
2. Re-calcular dependências
3. Re-validar métricas

### ❌ Bloqueador 2: Context >600 lines

**Problema**: Task precisa de contexto >600 lines

**Impacto**: AI perde foco, hallucinations garantidas

**Ação**:
1. Simplificar contexto (remover arquivos não essenciais)
2. Dividir task em 2 tasks com contextos menores
3. Re-validar

### ❌ Bloqueador 3: Ciclo nas Dependências

**Problema**: DAG tem ciclo (A → B → C → A)

**Impacto**: Impossível determinar ordem de execução

**Ação**:
1. Identificar ciclo (usar algoritmo de detecção)
2. Quebrar ciclo removendo dependência desnecessária
3. Re-validar DAG

---

## 📊 Métricas de Eficiência

| Métrica | Meta | Como Medir |
|---------|------|------------|
| **Tasks geradas** | Dentro da faixa (5-100) | Contar TASK-NNN em tasks.md |
| **LOC máximo/task** | ≤100 | Estimativa em cada task |
| **Context máximo/task** | ~500 lines | Soma de Files to Load |
| **Cobertura BDD** | 100% | Cenários BDD cobertos / Total |
| **Cobertura Components** | 100% | Componentes DDD cobertos / Total |
| **DAG válido** | Sim | Algoritmo de detecção de ciclos |
| **Tempo de decomposição** | 15-60min | Medido |

---

## 🔗 Relacionado com

### Skills Dependentes (Prerequisites)
- **analyst** (SKL-001): Cria spec.md (Phase 3)
- **architect** (SKL-002): Cria design.md (Phase 2, se HIGH)

### Skills Dependentes (Follows)
- **developer** (SKL-004): Implementa tasks sequencialmente
- **gatekeeper** (SKL-005): Valida conformidade durante implementação

### Commands Relacionados
- **/feature** (CMD-008): Gera cenários BDD que alimentam orchestrator
- **/component** (CMD-005): Define componentes DDD usados na decomposição

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

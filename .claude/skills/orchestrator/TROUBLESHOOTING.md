# Orchestrator - Troubleshooting

**ID**: SKL-003
**Categoria**: 🎯 Task Decomposition
**Fase**: 3.5
**Criticidade**: 🔴 CRITICAL

---

## 🚨 Problema 1: Task com >100 LOC

### Sintomas

```markdown
❌ TASK-015: Implement NotificationManager (LOC: 180) ← EXCEDEU
❌ Context muito grande para ser atômico
❌ Developer reports: "Task muito complexa"
```

### Causa Raiz

- Orchestrator não decompôs suficientemente
- Aggregate muito grande (God Object)
- Múltiplas responsabilidades em um componente

### Solução

#### Dividir em Sub-tasks

```markdown
# ❌ Original (180 LOC)
TASK-015: Implement NotificationManager aggregate

# ✅ Decomposto (3 tasks de ~60 LOC cada)
TASK-015a: Implement NotificationManager aggregate root (60 LOC)
TASK-015b: Implement notification queuing logic (55 LOC)
TASK-015c: Implement retry mechanism (65 LOC)

Dependencies:
- TASK-015b depends on TASK-015a
- TASK-015c depends on TASK-015b
```

### Prevenção

- **Regra**: Se task >80 LOC, considerar split
- **Validação**: Gate de qualidade deve rejeitar tasks >100 LOC
- **Re-executar**: orchestrator com hint "Decompose further"

---

## 🚨 Problema 2: Context >600 lines per Task

### Sintomas

```markdown
❌ TASK-025: Files to Load = 780 lines ← EXCEDEU
❌ Developer reports hallucinations
❌ Código gerado não segue spec
```

### Causa Raiz

- Muitos arquivos carregados (spec.md completo + design.md completo)
- Context inclui exemplos muito longos
- Regras muito verbosas

### Solução

#### Otimizar Files to Load

```markdown
# ❌ Context muito grande (780 lines)
Files to Load:
- spec.md (COMPLETO: 400 lines) ← Problema
- design.md (COMPLETO: 250 lines) ← Problema
- .claude/rules/010_srp.md (80 lines)
- examples/ (50 lines)

# ✅ Context otimizado (490 lines)
Files to Load:
- spec.md (SEÇÃO SCN-020 APENAS: 120 lines) ← Filtrado
- design.md (SEÇÃO OAuth2Provider APENAS: 100 lines) ← Filtrado
- .claude/rules/010_srp.md (RESUMO: 40 lines) ← Compactado
- .claude/rules/029_error-handling.md (RESUMO: 50 lines)
- examples/oauth2-provider-example.ts (80 lines) ← Apenas 1 exemplo
- TASK-015 output (OAuth2Provider interface: 100 lines)
```

### Prevenção

- **Seções específicas**: Nunca carregar spec.md/design.md completo
- **Resumos de regras**: Usar summaries quando possível
- **1-2 exemplos máximo**: Evitar examples/ completo
- **Validação**: Gate deve rejeitar context >600 lines

---

## 🚨 Problema 3: Dependências Circulares (Ciclo no DAG)

### Sintomas

```markdown
❌ TASK-010 depends on TASK-015
❌ TASK-015 depends on TASK-020
❌ TASK-020 depends on TASK-010 ← CICLO!
❌ Impossível determinar ordem de execução
```

### Causa Raiz

- Componentes acoplados (design problem)
- Orchestrator não validou DAG
- Dependências bidirecionais (A precisa de B, B precisa de A)

### Solução

#### Identificar e Quebrar Ciclo

```typescript
// Algoritmo de detecção de ciclos
function detectCycle(tasks: Task[]): string[] {
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function dfs(taskId: string, path: string[]): string[] | null {
    visited.add(taskId);
    recStack.add(taskId);

    const task = tasks.find(t => t.id === taskId);
    for (const dep of task.dependencies) {
      if (!visited.has(dep)) {
        const cycle = dfs(dep, [...path, taskId]);
        if (cycle) return cycle;
      } else if (recStack.has(dep)) {
        return [...path, taskId, dep]; // Cycle found!
      }
    }

    recStack.delete(taskId);
    return null;
  }

  for (const task of tasks) {
    if (!visited.has(task.id)) {
      const cycle = dfs(task.id, []);
      if (cycle) return cycle;
    }
  }

  return []; // No cycle
}

// Usar:
const cycle = detectCycle(tasks);
if (cycle.length > 0) {
  console.log("Ciclo detectado:", cycle.join(" → "));
}
```

#### Quebrar Ciclo com Abstração

```markdown
# Problema: TASK-010 e TASK-015 dependem um do outro

# Solução: Introduzir interface/trait
TASK-009: Define NotificationChannel interface (abstração)
  ↓
TASK-010: Implement EmailChannel (implements interface)
  ↓
TASK-015: Use NotificationChannel (depende da interface, não da implementação)

Ciclo quebrado! ✅
```

### Prevenção

- **Validar DAG**: Algoritmo de detecção em Gate de qualidade
- **Design patterns**: Dependency Inversion Principle (DIP)
- **Abstrações**: Interfaces/traits para quebrar acoplamento

---

## 🚨 Problema 4: Cobertura Incompleta (BDD Scenarios Não Cobertos)

### Sintomas

```markdown
❌ spec.md tem SCN-001, SCN-002, SCN-003
❌ tasks.md cobre apenas SCN-001 e SCN-002
❌ SCN-003 esquecido! ← Gap
```

### Causa Raiz

- Orchestrator não leu spec.md completamente
- Cenário BDD mal formatado (não detectado)
- Filtro de prioridade muito agressivo (P2 ignorado)

### Solução

#### Checklist de Cobertura

```markdown
## Validar Cobertura

Para cada cenário BDD em spec.md:

- [ ] SCN-001 (Valid email) → TASK-004, TASK-005 ✅
- [ ] SCN-002 (Invalid email) → TASK-004, TASK-005 ✅
- [ ] SCN-003 (Edge cases) → ❌ NENHUMA TASK!

**Ação**: Adicionar tasks para SCN-003:
- TASK-008: Implement edge case handling
- TASK-009: Test edge cases
```

#### Re-executar Orchestrator com Hint

```bash
@skill orchestrator "Decompor spec.md garantindo 100% de cobertura.
                     IMPORTANTE: Verificar que SCN-003 está coberto.
                     spec.md tem 3 cenários BDD, tasks.md deve cobrir os 3."
```

### Prevenção

- **Checklist**: Validar cobertura no Gate de qualidade
- **Contagem**: `grep "SCN-" spec.md | wc -l` vs tasks que referenciam SCN-XXX
- **P2 não ignora**: Mesmo cenários P2 devem gerar tasks (apenas executadas depois)

---

## 🚨 Problema 5: Tasks Muito Genéricas

### Sintomas

```markdown
❌ TASK-010: "Implement authentication" ← Vago
❌ TASK-015: "Add tests" ← Qual teste? Onde?
❌ TASK-020: "Refactor code" ← Qual código?
```

### Causa Raiz

- Orchestrator não especificou detalhes suficientes
- Falta de acceptance criteria clara
- Description muito curta

### Solução

#### Transformar Generic em Specific

```markdown
# ❌ Genérico
TASK-010: Implement authentication
**Description**: Add authentication to the app
**Acceptance Criteria**: Authentication should work

# ✅ Específico
TASK-010: Implement JWT Authentication Middleware
**Description**: Create Express middleware that validates JWT tokens in Authorization header.
                 Must extract user ID from token, attach to req.user, and return 401 if invalid.

**Acceptance Criteria**:
1. Middleware extracts token from "Authorization: Bearer <token>" header
2. Validates token using JWT_SECRET from env
3. Extracts userId from payload and attaches to req.user
4. Returns 401 with error "Invalid token" if validation fails
5. Returns 401 with error "Token expired" if token is expired
6. Calls next() if validation succeeds

**Files to Load**: (490 lines)
- spec.md (SCN-015 Authentication flow: 120 lines)
- .claude/rules/030_security.md (80 lines)
- .claude/rules/029_error-handling.md (70 lines)
- examples/middleware/auth-example.ts (120 lines)
- TASK-008 (JWT utils: 100 lines)

**Definition of Done**:
- Middleware implemented in src/middleware/auth.ts
- 5 unit tests covering all acceptance criteria
- Integration test with real JWT
- Lint 0 warnings
```

### Prevenção

- **Template**: Usar template específico para cada tipo de task
- **5 W's**: What, Why, Where, When, Who
- **Acceptance Criteria**: Mínimo 3-5 critérios verificáveis
- **Gate**: Rejeitar tasks com description <3 linhas

---

## 🚨 Problema 6: Ordem de Execução Subótima

### Sintomas

```markdown
❌ Critical path: 60/78 tasks (77%) ← Muito sequencial
❌ Parallelization: Apenas 23%
❌ Tempo de implementação: 3 semanas (esperado: 2 semanas)
```

### Causa Raiz

- Dependências desnecessárias
- Tasks que poderiam ser paralelas estão marcadas como sequenciais
- Não identificou oportunidades de paralelização

### Solução

#### Análise de Dependências

```markdown
## Identificar Dependências Reais vs Falsas

# ❌ Dependência Falsa
TASK-010: Implement EmailChannel
TASK-015: Implement PushChannel
- TASK-015 depende de TASK-010? NÃO! Ambos implementam NotificationChannel interface

# ✅ Podem ser Paralelos
TASK-010: Implement EmailChannel [Phase 1]
TASK-015: Implement PushChannel [Phase 1]
- Ambos dependem de TASK-005 (NotificationChannel interface)
- Após TASK-005, TASK-010 e TASK-015 podem executar em paralelo

## Otimização

Antes:
TASK-005 → TASK-010 → TASK-015 → TASK-020
(4 tasks sequenciais, 8 horas)

Depois:
TASK-005 → [TASK-010, TASK-015, TASK-020 em paralelo]
(1 task + 3 paralelas, 2 horas)
```

#### Aumentar Paralelização

**Meta**: Critical path <30% das tasks

**Estratégias**:
1. Dividir components em módulos independentes
2. Testes podem rodar em paralelo (1 task/component)
3. Documentation pode começar antes de todos testes completarem

### Prevenção

- **Análise de dependências**: Questionar cada dependência
- **Graph visualization**: Visualizar DAG para identificar gargalos
- **Critical path**: Medir e otimizar (meta: <30%)

---

## 📊 Checklist de Troubleshooting

### Antes de Gerar tasks.md

```markdown
- [ ] spec.md foi lido completamente?
- [ ] BDD scenarios foram contados (total: N)?
- [ ] DDD components foram listados (total: M)?
- [ ] Complexidade foi estimada (LOW/MEDIUM/HIGH)?
- [ ] design.md está disponível (se HIGH)?
```

### Após Gerar tasks.md

```markdown
- [ ] Total tasks dentro da faixa esperada?
      - LOW: 5-15 ✅
      - MEDIUM: 15-40 ✅
      - HIGH: 40-100 ✅
- [ ] NENHUMA task >100 LOC?
- [ ] NENHUMA task com context >600 lines?
- [ ] DAG válido (sem ciclos)?
- [ ] Cobertura 100% (BDD scenarios)?
- [ ] Cobertura 100% (DDD components)?
- [ ] Tasks específicas (não genéricas)?
- [ ] Critical path <50%?
```

---

## 🔗 Relacionado com

### Skills
- **analyst** (SKL-001): Cria spec.md
- **architect** (SKL-002): Cria design.md (se HIGH)
- **developer** (SKL-004): Implementa tasks

### Commands
- **/feature** (CMD-008): Cria BDD scenarios
- **/component** (CMD-005): Define DDD components

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

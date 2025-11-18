# Orchestrator Integration with Task Master & Gate Keeper

Este documento estende `SKILL.md` com integração dos novos sistemas Task Master e Gate Keeper.

## Workflow Integrado

```
Developer fornece requisito
    ↓
┌─────────────────────────────────────────┐
│  TASK MASTER                            │
│  /task create "Implementar auth JWT"   │
│  → Cria .agent-task.json estruturado   │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  PHASE: Vision                          │
│  @skill development (specs de vision)   │
│  → 01_introduction, 03_context          │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  GATE 1: Vision Validation              │
│  @skill gate-keeper                     │
│  /gate validate vision                  │
│  → ✅ Aprovado / ❌ Bloqueado           │
└──────┬──────────────────────────────────┘
       │ (se aprovado)
┌──────v──────────────────────────────────┐
│  PHASE: Stack                           │
│  @skill development (ADRs, constraints) │
│  → ADR-001, 02_constraints, 04_strategy │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  GATE 2: Stack Validation               │
│  @skill gate-keeper                     │
│  /gate validate stack                   │
│  → ✅ Aprovado / ❌ Bloqueado           │
└──────┬──────────────────────────────────┘
       │ (se aprovado)
┌──────v──────────────────────────────────┐
│  PHASE: Plan                            │
│  @skill development (containers C4)     │
│  → 05_building-blocks, containers       │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  GATE 3: Plan Validation                │
│  @skill gate-keeper                     │
│  /gate validate plan                    │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  PHASE: Feature                         │
│  @skill development (BDD scenarios)     │
│  → 06_runtime, scenarios                │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  GATE 4: Feature Validation             │
│  @skill gate-keeper                     │
│  /gate validate feature                 │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  PHASE: Build                           │
│  @skill development (deployment, quality│
│  → 07_deployment, 10_quality            │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  GATE 5: Build Validation               │
│  @skill gate-keeper                     │
│  /gate validate build                   │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  PHASE: Code                            │
│  @skill development (implementação)     │
│  @skill testing (testes)                │
│  @skill code-review (revisão)           │
│  @skill documentation (docs)            │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  GATE 6: Code Validation                │
│  @skill gate-keeper                     │
│  /gate validate code                    │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  VALIDATION FINAL                       │
│  @skill analyst (validação final)       │
│  → Relatório completo                   │
└──────┬──────────────────────────────────┘
       │
┌──────v──────────────────────────────────┐
│  OPTIONAL: Deploy                       │
│  @skill guardian                        │
│  → Commit, push, release                │
└─────────────────────────────────────────┘
```

## Comandos do Orchestrator

### `/workflow start <requisito>`

Inicia workflow completo com Task Master.

**Exemplo**:
```
@skill orchestrator
/workflow start "Implementar autenticação JWT"
```

**Passos**:
1. Chama Task Master: `/task create "Implementar autenticação JWT"`
2. Aguarda criação de `.agent-task.json`
3. Inicia fase Vision
4. Loop através de todas as fases com gates

### `/workflow resume`

Retoma workflow interrompido.

**Exemplo**:
```
@skill orchestrator
/workflow resume
```

**Passos**:
1. Lê `.agent-task.json`
2. Identifica fase atual
3. Continua de onde parou

### `/workflow status`

Mostra status do workflow atual.

**Exemplo**:
```
@skill orchestrator
/workflow status
```

**Output**:
```
📊 Workflow Status

Task: TASK-001 (Implementar autenticação JWT)
Status: In Progress
Current Phase: Stack (Gate 2 pending)

Progress:
✅ Vision (completed)
🟡 Stack (in_progress)
⏸️ Plan (pending)
⏸️ Feature (pending)
⏸️ Build (pending)
⏸️ Code (pending)

Next Action: Complete ADR-002, then validate gate 2
```

## Integração com Task Master

### Criação de Task

Orchestrator sempre inicia chamando Task Master:

```javascript
// Pseudo-código
async function startWorkflow(requisito) {
  // 1. Criar task
  const task = await taskMaster.create(requisito);

  // 2. Obter fases
  const phases = task.workflow.phases;

  // 3. Executar cada fase
  for (const phase of phases) {
    await executePhase(phase);
    await validateGate(phase);
  }

  // 4. Validação final
  await finalValidation();
}
```

### Atualização de Status

Orchestrator atualiza `.agent-task.json` após cada fase:

```javascript
async function executePhase(phase) {
  // Marcar como in_progress
  await taskMaster.updatePhaseStatus(phase.name, 'in_progress');

  // Executar skill apropriada
  await executeSkillForPhase(phase);

  // Marcar como completed
  await taskMaster.updatePhaseStatus(phase.name, 'completed');
}
```

## Integração com Gate Keeper

### Validação de Gate

Orchestrator chama Gate Keeper após cada fase:

```javascript
async function validateGate(phase) {
  // 1. Chamar gate keeper
  const result = await gateKeeper.validate(phase.name);

  // 2. Processar resultado
  switch (result.status) {
    case 'approved':
      // Continuar para próxima fase
      return { continue: true };

    case 'approved_with_warnings':
      // Mostrar warnings mas continuar
      console.warn(result.warnings);
      return { continue: true };

    case 'blocked':
      // Pausar workflow
      console.error(result.errors);
      console.log('Gaps:', result.gaps);
      return {
        continue: false,
        action: 'fix_gaps',
        gaps: result.gaps
      };
  }
}
```

### Loop de Correção

Se gate bloqueia, Orchestrator entra em loop de correção:

```javascript
async function correctionLoop(phase) {
  let gateResult;

  do {
    // 1. Developer corrige gaps
    await waitForCorrections();

    // 2. Re-validar gate
    gateResult = await gateKeeper.validate(phase.name);

  } while (gateResult.status === 'blocked');

  return gateResult;
}
```

## Mapeamento de Fases para Skills

| Fase | Skill Principal | Skills Secundárias | Gate |
|------|----------------|-------------------|------|
| Vision | Analyst, Development | Documentation | Gate 1 |
| Stack | Development | Documentation | Gate 2 |
| Plan | Development | Documentation | Gate 3 |
| Feature | Development | Documentation | Gate 4 |
| Build | Development | Documentation | Gate 5 |
| Code | Development | Testing, Code Review, Documentation | Gate 6 |

## Comunicação via .agent-task.json

Todos os agentes lêem e atualizam `.agent-task.json`:

### Task Master
- **Escreve**: Estrutura inicial, fases, artefatos esperados
- **Lê**: Status atual para comandos `/task next`, `/task status`

### Orchestrator
- **Escreve**: Status de fase, timestamps
- **Lê**: Fases a executar, fase atual

### Gate Keeper
- **Escreve**: Resultados de validação, gaps identificados
- **Lê**: Artefatos esperados, checklist de validação

### Development/Testing/etc
- **Escreve**: Artefatos produzidos, checklist completo
- **Lê**: Artefatos esperados, checklist a completar

## Exemplo Completo: Feature de Autenticação

```bash
# Developer inicia
@skill orchestrator
/workflow start "Implementar autenticação JWT"

# ──────────────────────────────────────────
# Task Master cria task
# ──────────────────────────────────────────
✅ Task TASK-001 created
   Phases: Vision → Stack → Plan → Feature → Build → Code
   Expected artifacts: 16

# ──────────────────────────────────────────
# PHASE: Vision
# ──────────────────────────────────────────
🔄 Starting phase: Vision
   @skill development (specs de vision)
   ...
✅ Artifacts created:
   - specs/01_introduction/001_introduction-and-goals.md
   - specs/03_context/003_context-and-scope.md
   - specs/03_context/actors/ACT-001_user.md

# ──────────────────────────────────────────
# GATE 1: Vision Validation
# ──────────────────────────────────────────
🛡️ Validating gate: Vision
   @skill gate-keeper /gate validate vision
   ...
✅ APPROVED
   All prerequisites met
   0 gaps found

# ──────────────────────────────────────────
# PHASE: Stack
# ──────────────────────────────────────────
🔄 Starting phase: Stack
   @skill development (ADRs, constraints)
   ...
✅ Artifacts created:
   - specs/02_constraints/002_constraints.md
   - specs/04_solution-strategy/004_solution-strategy.md
   - specs/09_decisions/adrs/ADR-001_tech-stack.md
   - specs/09_decisions/adrs/ADR-002_jwt-strategy.md

# ──────────────────────────────────────────
# GATE 2: Stack Validation
# ──────────────────────────────────────────
🛡️ Validating gate: Stack
   @skill gate-keeper /gate validate stack
   ...
⚠️ APPROVED WITH WARNINGS
   ADR-002 line 45: Consider adding TTL justification
   Glossary: Add "TTL" term

# ──────────────────────────────────────────
# [... outras fases ...]
# ──────────────────────────────────────────

# ──────────────────────────────────────────
# FINAL: Validation
# ──────────────────────────────────────────
✅ Workflow completed successfully!

📊 Summary:
   - Total time: 8 hours
   - Phases completed: 6/6
   - Gates passed: 6/6
   - Artifacts created: 16
   - Quality score: 95/100

📝 Next steps:
   - Optional: @skill guardian push (deploy)
   - Review: .agent-task.json for details
```

## Tratamento de Erros

### Gate Bloqueado

```
❌ Gate 2 (Stack) BLOCKED

Gaps identified:
1. ADR-001 missing tech stack justification
2. Constraints incomplete: database not specified

Actions required:
1. Complete ADR-001 with justification for Node.js choice
2. Add database constraint in 02_constraints.md

To retry:
@skill orchestrator
/workflow resume
```

### Fase Falha

```
❌ Phase: Code FAILED

Testing failed:
- 3 tests failing
- Coverage: 65% (< 80% required)

Actions required:
1. Fix failing tests
2. Add tests to reach 80% coverage

To retry:
@skill orchestrator
/workflow resume
```

## Configuração

Orchestrator pode ser configurado em `.arq-cli.config.json`:

```json
{
  "orchestrator": {
    "auto_gates": true,
    "strict_mode": true,
    "allow_phase_skip": false,
    "parallel_phases": false,
    "notification": {
      "on_gate_fail": true,
      "on_phase_complete": false,
      "on_workflow_complete": true
    }
  }
}
```

## Métricas

Orchestrator coleta métricas de cada workflow:

```javascript
{
  "workflow_id": "TASK-001",
  "total_time_hours": 8,
  "phases": {
    "vision": { "time_hours": 1, "gates_passed": 1, "retries": 0 },
    "stack": { "time_hours": 2, "gates_passed": 1, "retries": 1 },
    // ...
  },
  "quality_score": 95,
  "artifacts_created": 16,
  "tests_coverage": 92
}
```

## Referências

- [Task Master SKILL.md](../task-master/SKILL.md)
- [Gate Keeper SKILL.md](../gate-keeper/SKILL.md)
- [CONSTITUTION.md](../../CONSTITUTION.md)
- [GOVERNANCE.md](../../GOVERNANCE.md)
- `.agent-task.json` - Estado da task
- `.agent-task.schema.json` - Schema de validação

---

**Versão**: 1.0.0
**Compatível com**: arq-specs-template v2.0+

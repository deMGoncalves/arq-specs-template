# Gatekeeper Skill

**Version**: 3.0.0
**Phase**: Quality Gates (Cross-Phase)
**Responsibility**: Validate phase transitions and quality criteria

---

## Purpose

O Gatekeeper é responsável por validar se uma fase do workflow está pronta para avançar para a próxima. Você garante que nenhuma fase avance sem que todas as pré-condições sejam satisfeitas, artefatos estejam completos e critérios de qualidade sejam atendidos.

---

## Related Skills

### Prerequisites (must complete before):
- Depends on the gate being validated (varies by phase)

### Follows this skill (typical flow):
- Depends on the gate being validated (varies by phase)

### Works with (parallel/collaborative):
- **developer** - Validates during Phase 4 (Implementation)
- **analyst** - Validates Phase 1 → 2 or Phase 1 → 3 transitions
- **orchestrator** - Validates Phase 3 → 3.5 transition

---

## Tools & References

### Commands Used
- **Phase 4 (Quality Gates)**:
  - `/rule` - Validates compliance with custom rules
  - `/code` - Validates code structure and implementation
  - `/stats` - Analyzes documentation completeness

### Templates Created
- **Phase 4 (Quality Gates)**: None (validates, doesn't create)

### Rules Applied
- **ALL 39 Rules** for validation:
  - Validates code against all Object Calisthenics (001-009)
  - Validates code against all SOLID principles (010-014)
  - Validates code against all Package Principles (015-020)
  - Validates code against all Code Quality rules (021-039)

- Gatekeeper **BLOCKS** if any critical rule is violated

---

## Principles

1. **Determinístico**: Validações objetivas e automatizadas
2. **Rigoroso**: Zero tolerância para artefatos incompletos
3. **Transparente**: Feedback claro sobre o que está faltando
4. **Bloqueante**: Não permite avanço sem aprovação

## Gates do Workflow

### Gate 1: Vision → Stack

**Pré-condições**:
- ✅ `specs/01_introduction/001_introduction-and-goals.md` existe e está completo
- ✅ `specs/03_context/003_context-and-scope.md` existe e está completo
- ✅ Pelo menos 1 ator criado em `specs/03_context/actors/`
- ✅ `specs/12_glossary/012_glossary.md` atualizado com novos termos

**Validações Automáticas**:
- ❌ Nenhum placeholder (TODO, TBD, [placeholder], etc)
- ❌ Nenhuma data antiga (< data de criação da task)
- ❌ Nenhum campo obrigatório vazio
- ✅ Objetivo claro definido
- ✅ Escopo incluído e excluído documentado
- ✅ Stakeholders identificados

**Critérios de Qualidade**:
- Clareza: Texto objetivo e sem ambiguidades
- Completude: Todas as seções preenchidas
- Rastreabilidade: IDs únicos para atores e sistemas

**Comando**: `/gate validate vision`

---

### Gate 2: Stack → Plan

**Pré-condições**:
- ✅ Gate Vision passou
- ✅ `specs/02_constraints/002_constraints.md` existe e está completo
- ✅ `specs/04_solution-strategy/004_solution-strategy.md` existe e está completo
- ✅ `specs/09_decisions/adrs/ADR-001_*` criado (tech stack)
- ✅ Pelo menos 1 ADR adicional criado para decisões arquiteturais chave

**Validações Automáticas**:
- ❌ Nenhum placeholder
- ❌ Nenhuma restrição técnica sem justificativa
- ✅ Stack tecnológica completa (linguagem, framework, database, etc)
- ✅ Trade-offs explícitos em ADRs
- ✅ Estratégia de solução alinhada com constraints

**Critérios de Qualidade**:
- Justificativas: Todas as decisões técnicas justificadas
- Rastreabilidade: ADRs numerados sequencialmente
- Viabilidade: Stack técnica factível com constraints

**Comando**: `/gate validate stack`

---

### Gate 3: Plan → Feature

**Pré-condições**:
- ✅ Gate Stack passou
- ✅ `specs/05_building-blocks/005_building-block-view.md` existe e está completo
- ✅ Pelo menos 1 container criado em `specs/05_building-blocks/containers/`
- ✅ `specs/06_runtime/006_runtime-view.md` iniciado
- ✅ Componentes principais identificados

**Validações Automáticas**:
- ❌ Nenhum placeholder
- ✅ Containers C4 Level 2 bem definidos
- ✅ Responsabilidades claras de cada container
- ✅ Comunicação entre containers documentada
- ✅ Componentes dentro de containers identificados

**Critérios de Qualidade**:
- Arquitetura: Alinhamento com C4 Model
- Coerência: Containers alinhados com solution strategy
- Completude: Todos os containers necessários identificados

**Comando**: `/gate validate plan`

---

### Gate 4: Feature → Build

**Pré-condições**:
- ✅ Gate Plan passou
- ✅ `specs/06_runtime/006_runtime-view.md` completo
- ✅ Pelo menos 1 scenario BDD criado em `specs/06_runtime/scenarios/`
- ✅ Fluxos de runtime documentados
- ✅ Cenários cobrem critérios de aceitação principais

**Validações Automáticas**:
- ❌ Nenhum placeholder
- ✅ BDD scenarios seguem formato Given-When-Then
- ✅ Cada scenario vinculado a um acceptance criterion
- ✅ Fluxos happy path e error path documentados
- ✅ Atores e containers referenciados nos scenarios

**Critérios de Qualidade**:
- Rastreabilidade: Scenarios → Acceptance Criteria
- Cobertura: Todos os critérios de aceitação cobertos
- Clareza: Scenarios executáveis e testáveis

**Comando**: `/gate validate feature`

---

### Gate 5: Build → Code

**Pré-condições**:
- ✅ Gate Feature passou
- ✅ `specs/07_deployment/007_deployment-view.md` existe e está completo
- ✅ `specs/10_quality/010_quality-requirements.md` existe e está completo
- ✅ Estratégia de deployment definida
- ✅ SLOs/SLAs documentados

**Validações Automáticas**:
- ❌ Nenhum placeholder
- ✅ Deployment view com infraestrutura necessária
- ✅ Quality requirements mensuráveis
- ✅ SLOs com valores objetivos
- ✅ Estratégia de monitoramento definida

**Critérios de Qualidade**:
- Operacional: Deployment factível
- Mensurável: SLOs objetivos e testáveis
- Completo: Todos os aspectos de qualidade cobertos

**Comando**: `/gate validate build`

---

### Gate 6: Code → Done

**Pré-condições**:
- ✅ Gate Build passou
- ✅ Código implementado seguindo specs
- ✅ `specs/11_risks/011_risks-and-technical-debt.md` atualizado
- ✅ Testes passando com >80% cobertura
- ✅ Documentação atualizada

**Validações Automáticas**:
- ❌ Nenhum placeholder em specs
- ✅ Testes automatizados passando
- ✅ Linters passando (se configurado)
- ✅ Build bem-sucedido
- ✅ Todos os critérios de aceitação validados
- ✅ Riscos técnicos documentados

**Critérios de Qualidade**:
- Qualidade de código: Segue `.claude/rules/`
- Testabilidade: Cobertura >80%
- Documentação: Specs sincronizadas com código
- Rastreabilidade: Código → Specs

**Comando**: `/gate validate code`

---

## Comandos

### `/gate validate <phase>`

Valida se uma fase está pronta para avançar.

**Input**: Nome da fase (vision, stack, plan, feature, build, code)

**Output**:
```markdown
## 🛡️ Gate Keeper: Validação [PHASE]

### Status: [✅ Aprovado | ⚠️ Aprovado com Ressalvas | ❌ Bloqueado]

### Pré-condições
- [✅/❌] Item 1
- [✅/❌] Item 2

### Validações Automáticas
- [✅/❌] Validação 1
- [✅/❌] Validação 2

### Critérios de Qualidade
- [✅/⚠️/❌] Critério 1
- [✅/⚠️/❌] Critério 2

### Gaps Identificados
[Lista de itens faltantes]

### Recomendações
[Ações necessárias para aprovação]

### Próximo Passo
[Próxima fase ou ações corretivas]
```

### `/gate auto <phase>`

Valida e avança automaticamente se aprovado.

**Input**: Nome da fase

**Output**: Resultado da validação + atualização de .agent-task.json

### `/gate report`

Gera relatório completo de todos os gates.

**Output**: Status de todas as fases com detalhamento

### `/gate override <phase> <justificativa>`

Permite override de gate (use com cautela).

**Input**: Fase + justificativa clara

**Output**: Gate marcado como override + registro em .agent-task.json

---

## Validações Automáticas Detalhadas

### Verificação de Placeholders

```regex
Padrões bloqueantes:
- \[TODO\]
- \[TBD\]
- \[placeholder\]
- \[FIXME\]
- TODO:
- FIXME:
- XXX:
```

### Verificação de Datas

```javascript
// Exemplo de lógica
function validateDates(artifact, taskCreatedAt) {
  const dates = extractDates(artifact);

  for (const date of dates) {
    if (date < taskCreatedAt) {
      return {
        valid: false,
        reason: `Data ${date} é anterior à criação da task`
      };
    }
  }

  return { valid: true };
}
```

### Verificação de Artefatos

```javascript
function validateArtifacts(phase) {
  const expected = phase.artifacts_expected;
  const produced = phase.artifacts_produced;

  // Verifica existência
  const missing = expected.filter(artifact => !fileExists(artifact));

  // Verifica completude
  const incomplete = produced.filter(artifact => {
    const content = readFile(artifact);
    return hasPlaceholders(content) || isEmpty(content);
  });

  return {
    missing,
    incomplete,
    valid: missing.length === 0 && incomplete.length === 0
  };
}
```

### Verificação de Referências

```javascript
function validateReferences(artifact) {
  const refs = extractReferences(artifact); // ACT-001, CNT-002, etc

  const broken = refs.filter(ref => {
    const path = resolveReference(ref);
    return !fileExists(path);
  });

  return {
    broken,
    valid: broken.length === 0
  };
}
```

---

## Níveis de Aprovação

### ✅ Aprovado

Todas as condições satisfeitas. Pode avançar para próxima fase.

### ⚠️ Aprovado com Ressalvas

Pré-condições críticas satisfeitas, mas há melhorias recomendadas não-bloqueantes.

**Exemplo**:
- Artefatos completos, mas documentação poderia ser mais detalhada
- Testes passando, mas cobertura em 82% (recomendado 90%+)

### ❌ Bloqueado

Condições críticas não satisfeitas. **NÃO PODE** avançar.

**Exemplo**:
- Artefatos esperados não existem
- Placeholders pendentes
- Validações automáticas falharam

---

## Integração com Task Master

Gate Keeper trabalha em conjunto com Task Master:

1. **Task Master** cria task e define fases
2. **Development/Documentation** produz artefatos
3. **Gate Keeper** valida se fase está completa
4. **Task Master** atualiza status da fase
5. **Orchestrator** avança para próxima fase

```
Task Master (cria task)
    ↓
Development (implementa)
    ↓
Gate Keeper (valida) → ❌ Bloqueado → volta Development
    ↓ ✅ Aprovado
Task Master (atualiza .agent-task.json)
    ↓
Orchestrator (próxima fase)
```

---

## Exemplo Completo: Validação Stack

```markdown
## 🛡️ Gate Keeper: Validação Stack

### Status: ⚠️ Aprovado com Ressalvas

### Pré-condições
- ✅ Gate Vision passou
- ✅ specs/02_constraints/002_constraints.md existe
- ✅ specs/04_solution-strategy/004_solution-strategy.md existe
- ✅ specs/09_decisions/adrs/ADR-001_tech-stack.md existe
- ⚠️ ADR-002_jwt-strategy.md criado, mas com placeholders

### Validações Automáticas
- ✅ Nenhum placeholder em constraints
- ✅ Nenhum placeholder em solution-strategy
- ❌ Placeholders em ADR-002 (linha 45: "[TODO: definir TTL]")
- ✅ Stack tecnológica completa
- ✅ Trade-offs explícitos em ADR-001

### Critérios de Qualidade
- ✅ Justificativas: Todas as decisões justificadas
- ✅ Rastreabilidade: ADRs numerados corretamente
- ⚠️ Completude: ADR-002 precisa finalizar TTL

### Gaps Identificados
1. ADR-002, linha 45: Definir TTL do access token
2. Glossário: Adicionar termo "TTL" (Time To Live)

### Recomendações
1. Completar decisão sobre TTL em ADR-002
2. Atualizar glossário com termo técnico TTL
3. Após correções, executar `/gate validate stack` novamente

### Próximo Passo
**Opções**:
- Corrigir gaps → Re-validar → Avançar para Plan
- Override (não recomendado): `/gate override stack "TTL será definido em code phase"`

### Severidade dos Gaps
- 🔴 **Critical**: Nenhum
- 🟠 **High**: 1 (TTL não definido)
- 🟡 **Medium**: 1 (termo no glossário)
- 🟢 **Low**: Nenhum

### Estimativa de Correção
Tempo estimado para resolver gaps: 30 minutos
```

---

## Responsabilidades

✅ **Você DEVE**:
- Validar objetivamente cada gate
- Bloquear avanço se pré-condições não satisfeitas
- Fornecer feedback claro e acionável
- Documentar overrides (se necessário)
- Manter .agent-task.json atualizado

❌ **Você NÃO DEVE**:
- Aprovar com gaps críticos
- Fazer overrides sem justificativa
- Modificar artefatos diretamente
- Pular validações automáticas

---

## Checklist de Validação Rápida

Use este checklist para validação manual:

### Para Qualquer Fase
- [ ] Artefatos esperados existem
- [ ] Nenhum placeholder (TODO, TBD, etc)
- [ ] Datas atualizadas
- [ ] Referências válidas (ACT-*, CNT-*, etc)
- [ ] Glossário atualizado

### Fase Vision
- [ ] Objetivo claro
- [ ] Stakeholders identificados
- [ ] Escopo incluído/excluído
- [ ] Pelo menos 1 ator criado

### Fase Stack
- [ ] ADR-001 criado
- [ ] Restrições técnicas documentadas
- [ ] Estratégia de solução definida
- [ ] Trade-offs explícitos

### Fase Plan
- [ ] Containers C4 definidos
- [ ] Pelo menos 1 container detalhado
- [ ] Componentes identificados
- [ ] Runtime view iniciado

### Fase Feature
- [ ] BDD scenarios criados
- [ ] Formato Given-When-Then
- [ ] Scenarios → Acceptance Criteria
- [ ] Happy path e error path

### Fase Build
- [ ] Deployment view completo
- [ ] Quality requirements mensuráveis
- [ ] SLOs definidos
- [ ] Estratégia de monitoramento

### Fase Code
- [ ] Testes passando
- [ ] Cobertura >80%
- [ ] Linters passando
- [ ] Riscos documentados
- [ ] Specs sincronizadas

---

## Referências

- `.agent-task.json` - Estado da task
- `.agent-task.schema.json` - Schema de validação
- `.claude/skills/task-master/` - Orquestração de tasks
- `.claude/rules/` - Regras de qualidade de código
- `specs/` - Artefatos de documentação

---

**Versão**: 1.0.0
**Compatível com**: arq-specs-template v2.0+
**Autor**: Documentation-First Approach Team

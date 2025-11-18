# Governance & Processes

**Version**: 1.0.0
**Last Updated**: 2025-11-15
**Companion to**: [CONSTITUTION.md](./CONSTITUTION.md)

---

## Table of Contents

1. [Overview](#overview)
2. [Workflow Processes](#workflow-processes)
3. [Approval Processes](#approval-processes)
4. [Quality Gates](#quality-gates)
5. [Change Management](#change-management)
6. [Escalation Procedures](#escalation-procedures)
7. [Metrics and Reporting](#metrics-and-reporting)

---

## Overview

Este documento detalha os processos operacionais de governança para projetos baseados em Documentation-First Approach. Complementa os princípios estabelecidos em [CONSTITUTION.md](./CONSTITUTION.md).

### Princípios de Governança

1. **Transparência**: Todos os processos são documentados e auditáveis
2. **Autonomia**: Agentes e developers têm autonomia dentro de limites claros
3. **Responsabilidade**: Toda decisão tem um dono identificável
4. **Melhoria Contínua**: Processos são revisados e melhorados regularmente

---

## Workflow Processes

### Standard Workflow

```
┌─────────────┐
│  Developer  │  Requisito/Feature Request
└──────┬──────┘
       │
       v
┌─────────────────────────────────────────┐
│  PHASE 1: Vision                        │
│  ────────────────────────────────────── │
│  Skills: Task Master → Analyst          │
│  Output: 01_introduction, 03_context    │
│  Approval: Tech Lead                    │
└──────┬──────────────────────────────────┘
       │
       v [GATE 1: Vision Validation]
       │
┌─────────────────────────────────────────┐
│  PHASE 2: Stack                         │
│  ────────────────────────────────────── │
│  Skills: Development → Documentation    │
│  Output: 02_constraints, 04_strategy,   │
│          ADR-001, ADR-00X               │
│  Approval: Tech Lead + Security Review  │
└──────┬──────────────────────────────────┘
       │
       v [GATE 2: Stack Validation]
       │
┌─────────────────────────────────────────┐
│  PHASE 3: Plan                          │
│  ────────────────────────────────────── │
│  Skills: Development → Documentation    │
│  Output: 05_building-blocks, containers │
│  Approval: Tech Lead                    │
└──────┬──────────────────────────────────┘
       │
       v [GATE 3: Plan Validation]
       │
┌─────────────────────────────────────────┐
│  PHASE 4: Feature                       │
│  ────────────────────────────────────── │
│  Skills: Development → Documentation    │
│  Output: 06_runtime, BDD scenarios      │
│  Approval: Tech Lead + Stakeholder      │
└──────┬──────────────────────────────────┘
       │
       v [GATE 4: Feature Validation]
       │
┌─────────────────────────────────────────┐
│  PHASE 5: Build                         │
│  ────────────────────────────────────── │
│  Skills: Development → Documentation    │
│  Output: 07_deployment, 10_quality      │
│  Approval: Tech Lead + DevOps           │
└──────┬──────────────────────────────────┘
       │
       v [GATE 5: Build Validation]
       │
┌─────────────────────────────────────────┐
│  PHASE 6: Code                          │
│  ────────────────────────────────────── │
│  Skills: Development → Testing →        │
│          Code Review → Documentation    │
│  Output: Implementation + Tests + Docs  │
│  Approval: Code Review + CI/CD          │
└──────┬──────────────────────────────────┘
       │
       v [GATE 6: Code Validation]
       │
┌─────────────────────────────────────────┐
│  PHASE 7: Deploy (Optional)             │
│  ────────────────────────────────────── │
│  Skills: Guardian                       │
│  Output: Deployed to environment        │
│  Approval: Tech Lead + DevOps           │
└─────────────────────────────────────────┘
```

### Accelerated Workflow (Import Mode)

Para projetos com especificação externa completa (RFP, BRD):

```
Import → Code
   ↓       ↓
 Vision   Implementation
 Stack
 Plan
 Feature
 Build
```

**Quando usar**: Documento externo completo, requisitos estáveis, time experiente.

**Approval**: Tech Lead deve validar que documento externo é suficiente.

---

## Approval Processes

### 1. Vision Approval

**Quem aprova**: Tech Lead ou Product Owner

**Critérios**:
- [ ] Objetivo claro e mensurável
- [ ] Stakeholders identificados
- [ ] Escopo incluído/excluído definido
- [ ] Pelo menos 1 ator principal identificado

**Timeline**: Máximo 2 dias úteis

**Processo**:
1. Development cria specs de vision
2. Task Master cria `.agent-task.json`
3. Gate Keeper valida pré-condições
4. Developer solicita approval via PR ou issue
5. Tech Lead revisa e aprova/rejeita
6. Se aprovado, avança para Stack

**Rejection**: Feedback documentado, developer corrige e resubmete.

---

### 2. Stack Approval

**Quem aprova**: Tech Lead + Security Lead (para decisões de segurança)

**Critérios**:
- [ ] ADR-001 (Tech Stack) criado e justificado
- [ ] Restrições técnicas documentadas
- [ ] Estratégia de solução alinhada com constraints
- [ ] Trade-offs explícitos
- [ ] Aprovação de security review (se necessário)

**Timeline**: Máximo 3 dias úteis

**Processo**:
1. Development cria ADRs e strategy
2. Gate Keeper valida completude
3. Developer solicita approval via PR
4. Tech Lead revisa ADRs
5. Security Lead revisa se aplicável
6. Aprovação ou feedback para correção

**Special Cases**:
- Decisões de segurança críticas: Security Lead obrigatório
- Decisões de custo alto: Finance approval necessário
- Tecnologias novas: PoC pode ser requerido

---

### 3. Plan Approval

**Quem aprova**: Tech Lead

**Critérios**:
- [ ] Containers C4 bem definidos
- [ ] Responsabilidades claras
- [ ] Comunicação entre containers documentada
- [ ] Alinhamento com solution strategy

**Timeline**: Máximo 2 dias úteis

**Processo**:
1. Development cria building blocks
2. Gate Keeper valida arquitetura
3. Developer solicita approval
4. Tech Lead revisa C4 diagrams
5. Aprovação ou correções

---

### 4. Feature Approval

**Quem aprova**: Tech Lead + Stakeholder

**Critérios**:
- [ ] BDD scenarios completos (Given-When-Then)
- [ ] Cenários cobrem acceptance criteria
- [ ] Happy path e error paths documentados
- [ ] Stakeholder valida scenarios

**Timeline**: Máximo 3 dias úteis

**Processo**:
1. Development cria BDD scenarios
2. Gate Keeper valida formato
3. Developer solicita approval
4. Stakeholder valida funcionalidade
5. Tech Lead valida viabilidade técnica
6. Aprovação dupla necessária

---

### 5. Build Approval

**Quem aprova**: Tech Lead + DevOps Lead

**Critérios**:
- [ ] Deployment view completo e factível
- [ ] Quality requirements mensuráveis
- [ ] SLOs definidos
- [ ] Estratégia de monitoramento viável
- [ ] DevOps aprova infraestrutura

**Timeline**: Máximo 2 dias úteis

**Processo**:
1. Development cria deployment e quality specs
2. Gate Keeper valida completude
3. Developer solicita approval
4. DevOps Lead valida infraestrutura
5. Tech Lead valida SLOs
6. Aprovação dupla necessária

---

### 6. Code Approval

**Quem aprova**: Code Reviewer (peer) + CI/CD (automated)

**Critérios**:
- [ ] Código implementado seguindo specs
- [ ] Testes passando (>80% cobertura)
- [ ] Linters passando
- [ ] Documentação atualizada
- [ ] Specs sincronizadas com código
- [ ] CI/CD green

**Timeline**: Máximo 2 dias úteis

**Processo**:
1. Development implementa código
2. Testing escreve testes
3. Guardian executa validações
4. Developer abre PR
5. CI/CD executa checks
6. Code Reviewer revisa
7. Aprovação se todos os critérios atendidos

**Fast-track**: PRs pequenos (<200 linhas) podem ser aprovados em <1 dia.

---

## Quality Gates

### Gate Structure

Cada gate segue a mesma estrutura:

```yaml
gate:
  name: "Stack Validation"
  phase_before: "stack"
  phase_after: "plan"

  prerequisites:
    - gate: "vision"
      status: "passed"
    - artifacts:
        - "specs/02_constraints/002_constraints.md"
        - "specs/04_solution-strategy/004_solution-strategy.md"
        - "specs/09_decisions/adrs/ADR-001_*.md"

  validations:
    automated:
      - no_placeholders
      - no_broken_references
      - metadata_updated
      - dates_current
    manual:
      - tech_lead_approval

  criteria:
    blocking:
      - "ADR-001 existe e está completo"
      - "Restrições técnicas documentadas"
    non_blocking:
      - "Glossário atualizado"

  actions:
    on_pass:
      - update_task_status: "stack:completed"
      - advance_phase: "plan"
      - notify: "tech_lead"
    on_fail:
      - block_advance
      - create_feedback_issue
      - notify: "developer"
```

### Gate Overrides

**Quando permitido**:
- Decisão documentada em `.agent-task.json`
- Justificativa clara e riscos identificados
- Plano de mitigação definido
- Aprovação de Tech Lead

**Processo**:
```bash
# Via CLI
arq gate override stack "TTL será definido em code phase após testes de performance"

# Via skill
@skill gate-keeper
/gate override stack "Justificativa aqui"
```

**Registro**:
```json
{
  "phase": "stack",
  "override": {
    "authorized_by": "tech-lead@example.com",
    "date": "2025-11-15T14:00:00Z",
    "reason": "TTL será definido em code phase após testes de performance",
    "risks": ["Possível retrabalho em ADR-002"],
    "mitigation": "Testes de performance serão priorizados em code phase"
  }
}
```

---

## Change Management

### Types of Changes

#### 1. Spec Changes

**Processo**:
```
1. Developer identifica necessidade de mudança
2. Cria branch de specs
3. Atualiza artefatos afetados
4. Metadata registra mudança
5. Solicita approval via PR
6. Gate Keeper valida
7. Code Reviewer aprova
8. Merge + deploy docs
```

**Impact Analysis**:
- Alto: ADRs, containers, constraints
- Médio: Scenarios, components, quality requirements
- Baixo: Glossário, typos, formatação

**Approval**:
- Alto impacto: Tech Lead obrigatório
- Médio impacto: Code Reviewer
- Baixo impacto: Automated

#### 2. Code Changes

**Processo**:
```
1. Specs atualizadas primeiro (se necessário)
2. Developer implementa código
3. Testes escritos
4. CI/CD valida
5. PR aberto
6. Code Review
7. Merge
8. Deploy (se aplicável)
```

**Requirements**:
- Branch de specs merged (se houver)
- Testes passando
- Linters passando
- Coverage >80%
- Docs atualizadas

#### 3. Breaking Changes

**Definição**: Mudanças que quebram compatibilidade ou requerem mudança em consumers.

**Processo Especial**:
```
1. ADR criado explicando necessidade
2. Impact analysis completo
3. Migration plan documentado
4. Stakeholders notificados
5. Approval de Tech Lead obrigatório
6. Changelog com BREAKING CHANGE
7. Major version bump
```

**Examples**:
- Remoção de container
- Mudança de API pública
- Alteração de contrato
- Remoção de feature

---

## Escalation Procedures

### Level 1: Developer → Tech Lead

**Quando escalar**:
- Gate bloqueado sem solução clara
- Conflito entre specs e requisitos
- Decisão técnica crítica
- Desvio do workflow padrão

**Timeline**: Resposta em 1 dia útil

**Processo**:
1. Developer documenta problema em issue
2. Tag `escalation:tech-lead`
3. Tech Lead analisa
4. Decisão documentada em ADR (se aplicável)
5. Comunicação ao time

### Level 2: Tech Lead → Architecture Review Board

**Quando escalar**:
- Decisão arquitetural estratégica
- Mudança breaking significativa
- Conflito entre Tech Leads
- Impacto cross-projeto

**Timeline**: Resposta em 3 dias úteis

**Processo**:
1. Tech Lead documenta em RFC
2. Architecture Review Board convocado
3. Revisão e discussão
4. Votação (maioria simples)
5. Decisão em ADR
6. Comunicação formal

### Level 3: Architecture Board → CTO/VP Engineering

**Quando escalar**:
- Decisão estratégica company-wide
- Orçamento significativo
- Risco de segurança crítico
- Conflito não resolvido

**Timeline**: Resposta em 5 dias úteis

**Processo**:
1. Architecture Board documenta em Executive Brief
2. CTO/VP Engineering analisa
3. Decisão executiva
4. Cascata para todos os projetos
5. Atualização de CONSTITUTION.md (se necessário)

---

## Metrics and Reporting

### Weekly Metrics

**Coletado automaticamente via**:
```bash
arq report --weekly
```

**Métricas**:
- Tasks criadas/concluídas
- Gates aprovados/reprovados
- Cobertura de testes
- Quality score
- Tempo médio por fase

**Destinatários**: Tech Lead, Team

### Monthly Metrics

**Coletado via**:
```bash
arq report --monthly --format html
```

**Métricas**:
- ROI: Tempo economizado vs baseline
- Qualidade: Bugs em produção, hotfixes
- Produtividade: Features entregues, velocity
- Dívida técnica: Riscos identificados/mitigados
- Satisfação: Survey de stakeholders

**Destinatários**: Tech Lead, Product Owner, Management

### Quarterly Reviews

**Processo**:
1. Consolidação de métricas trimestrais
2. Análise de tendências
3. Identificação de melhorias
4. Atualização de processos (se necessário)
5. Apresentação para stakeholders
6. Definição de OKRs para próximo trimestre

**Métricas Chave**:
- Objetivos de CONSTITUTION.md atingidos?
- ROI vs expectativa (>300%)?
- Satisfação do time (>80%)?
- Dívida técnica sob controle?

---

## Review and Updates

### Governance Review

**Frequência**: Trimestral

**Processo**:
1. Tech Leads coletam feedback
2. Análise de métricas
3. Identificação de gaps
4. Propostas de melhorias
5. Discussão em Architecture Review Board
6. Aprovação de mudanças
7. Atualização de GOVERNANCE.md
8. Comunicação ao time

### Constitution Amendments

**Frequência**: Anual (ou conforme necessário)

**Processo**: Ver CONSTITUTION.md Article VIII

---

## Appendix A: Templates

### PR Template

```markdown
## Description
[Descrição clara da mudança]

## Type of Change
- [ ] Spec change
- [ ] Code change
- [ ] Breaking change
- [ ] Documentation

## Related Task
Closes #TASK-XXX

## Checklist
- [ ] Specs atualizadas (se aplicável)
- [ ] Testes adicionados/atualizados
- [ ] Linters passando
- [ ] Docs atualizadas
- [ ] Metadata atualizado
- [ ] Gate validation passou

## Screenshots/Evidence
[Se aplicável]

## Reviewers
@tech-lead @code-reviewer
```

### ADR Template

Ver `.claude/skills/documentation/template/009_architectural-decisions.md`

### Issue Template

```markdown
## Problem
[Descrição do problema]

## Impact
[Alto/Médio/Baixo] - [Quem/o que é impactado]

## Proposed Solution
[Solução proposta]

## Alternatives Considered
[Alternativas consideradas e descartadas]

## Next Steps
1. [Passo 1]
2. [Passo 2]

## Related
- Task: #TASK-XXX
- ADR: #ADR-XXX
- Docs: [link]
```

---

## Appendix B: Contacts

### Roles and Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| Tech Lead | tech-lead@example.com | Mon-Fri 9-18h |
| DevOps Lead | devops@example.com | Mon-Fri 9-18h |
| Security Lead | security@example.com | Mon-Fri 9-18h |
| Product Owner | po@example.com | Mon-Fri 9-18h |

### Escalation Path

```
Developer
    ↓
Tech Lead (1 dia)
    ↓
Architecture Board (3 dias)
    ↓
CTO/VP Engineering (5 dias)
```

---

## Appendix C: FAQ

**Q: Posso pular uma fase do workflow?**
A: Não. O workflow é determinístico. Use accelerated workflow (Import) se aplicável.

**Q: Gate está bloqueado, o que fazer?**
A: Corrija os gaps identificados ou solicite override com justificativa ao Tech Lead.

**Q: Como fazer breaking change?**
A: Siga processo especial em Change Management > Breaking Changes.

**Q: Quanto tempo leva cada fase?**
A: Varia por complexidade. Estimativas em `.agent-task.json`.

**Q: Posso trabalhar em múltiplas tasks simultaneamente?**
A: Sim, mas cada task deve seguir workflow completo independentemente.

---

**Este documento é vivo e evolui com o projeto. Contribua com melhorias via PR.**

---

**Version History**:
- 1.0.0 (2025-11-15): Versão inicial

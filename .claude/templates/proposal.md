# Proposal: [Change ID]

**Template ID**: TPL-WORKFLOW-001
**Version**: 2.0.0
**Category**: Workflow
**Used By**: analyst (Phase 1: Discovery)
**Last Updated**: 2025-11-17

---

**Change ID**: [change-id]
**Created**: YYYY-MM-DD
**Author**: [Team/Person]
**Status**: 🟡 Proposed | 🟢 Approved | 🔴 Rejected

---

## Why

[Descreva o problema ou oportunidade em 1-2 sentenças]

**Contexto adicional**:
- Problema específico que estamos resolvendo
- Impacto no usuário/negócio se não for resolvido
- Oportunidade de melhoria
- Feedback de stakeholders

---

## What Changes

[Lista concisa de mudanças propostas]

- [ ] Mudança 1
- [ ] Mudança 2
- [ ] Mudança 3
- [ ] **BREAKING**: Mudança que quebra compatibilidade (se aplicável)

**Detalhes**:
- Escopo da mudança
- O que será adicionado/modificado/removido
- Impacto em integrações existentes

---

## Impact

### Affected Specs
- `specs/[capability-1]/` - [Tipo de impacto]
- `specs/[capability-2]/` - [Tipo de impacto]

### Affected Code
- `src/[path]/` - [Descrição]
- `tests/[path]/` - [Descrição]

### Complexity
- [ ] **LOW**: Mudança simples, poucos arquivos, sem design complexo
- [ ] **MEDIUM**: Mudança moderada, múltiplos arquivos, pode requerer design
- [ ] **HIGH**: Mudança significativa, cross-cutting, requer design detalhado

### Breaking Changes
- [ ] **NO**: Backward compatible
- [ ] **YES**: Quebra compatibilidade ← Requer migration guide

**Se breaking, explicar**:
- O que quebra
- Como usuários devem migrar
- Timeline de deprecação

---

## Next Steps

### Requires Design Phase?
- [ ] **NO**: Pode prosseguir direto para Specification
- [ ] **YES**: Requer fase de Architecture (design.md)

**Se YES, justificar**:
- Decisões arquiteturais necessárias
- Trade-offs a avaliar
- Alternativas a considerar

### Affected Capabilities
[Lista de capabilities que terão specs modificados]

1. `[capability-1]` - [Tipo de mudança: ADDED/MODIFIED/REMOVED]
2. `[capability-2]` - [Tipo de mudança: ADDED/MODIFIED/REMOVED]

---

## Approval

### Stakeholders
- [ ] Product Owner: [Nome]
- [ ] Tech Lead: [Nome]
- [ ] Team: [Aprovação do time]

### Decision
- [ ] ✅ Approved - Proceed to next phase
- [ ] ⏸️ Pending - Waiting for clarifications
- [ ] ❌ Rejected - Document reason below

**If rejected, why?**:
[Explicação]

---

## Notes

[Quaisquer notas adicionais, considerações, links de referência]

---

## Checklist

Antes de submeter esta proposal para aprovação:

- [ ] "Why" está claro e conciso
- [ ] "What Changes" está completo
- [ ] Complexity avaliado corretamente
- [ ] Breaking changes identificados (se aplicável)
- [ ] Next steps definidos
- [ ] Stakeholders identificados

---

## Related Templates

### Prerequisites
- None (proposal.md is the starting point of the workflow)

### Follows This Proposal
- **If HIGH complexity**: design.md (TPL-WORKFLOW-002) - Architecture design by architect (Phase 2)
- **If LOW/MEDIUM complexity**: spec.md (Arc42 chapters) - Specification by analyst (Phase 3)

### See Also
- **constitution.md** - Core principles and DDD tactical patterns
- **arc42/01_introduction.md** (TPL-ARC42-01) - Goals and requirements context
- **adr/decision.md** (TPL-ADR-001) - Document key decisions

---

## Workflow Integration

**Phase**: 1 (Discovery)

**Primary Skill**: analyst

**Output Location**: `changes/[change-id]/proposal.md`

**Prerequisites**: User request or business need identified

**Next Steps**:
- **If Complexity = HIGH**: Invoke architect → creates `design.md` (Phase 2)
- **If Complexity = LOW/MEDIUM**: Analyst proceeds directly to `spec.md` (Phase 3)
- **After Specification**: Invoke orchestrator → creates `tasks.md` (Phase 3.5)

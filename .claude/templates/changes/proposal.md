# Proposta: [Change ID]

**ID do Template**: TPL-WORKFLOW-001
**Versão**: 2.0.0
**Categoria**: Workflow
**Usado Por**: analyst (Fase 1: Discovery)
**Última Atualização**: 2025-11-17

---

**ID da Mudança**: [change-id]
**Criado**: YYYY-MM-DD
**Autor**: [Time/Pessoa]
**Status**: 🟡 Proposto | 🟢 Aprovado | 🔴 Rejeitado

---

## Por Quê

[Descreva o problema ou oportunidade em 1-2 sentenças]

**Contexto adicional**:
- Problema específico que estamos resolvendo
- Impacto no usuário/negócio se não for resolvido
- Oportunidade de melhoria
- Feedback de stakeholders

---

## O Que Muda

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

## Impacto

### Specs Afetadas
- `specs/[capability-1]/` - [Tipo de impacto]
- `specs/[capability-2]/` - [Tipo de impacto]

### Código Afetado
- `src/[path]/` - [Descrição]
- `tests/[path]/` - [Descrição]

### Complexidade
- [ ] **LOW**: Mudança simples, poucos arquivos, sem design complexo
- [ ] **MEDIUM**: Mudança moderada, múltiplos arquivos, pode requerer design
- [ ] **HIGH**: Mudança significativa, cross-cutting, requer design detalhado

### Mudanças Quebram Compatibilidade
- [ ] **NÃO**: Compatível com versões anteriores
- [ ] **SIM**: Quebra compatibilidade ← Requer guia de migração

**Se quebrar compatibilidade, explicar**:
- O que quebra
- Como usuários devem migrar
- Timeline de deprecação

---

## Próximos Passos

### Requer Fase de Design?
- [ ] **NÃO**: Pode prosseguir direto para Specification
- [ ] **SIM**: Requer fase de Architecture (design.md)

**Se SIM, justificar**:
- Decisões arquiteturais necessárias
- Trade-offs a avaliar
- Alternativas a considerar

### Capabilities Afetadas
[Lista de capabilities que terão specs modificados]

1. `[capability-1]` - [Tipo de mudança: ADDED/MODIFIED/REMOVED]
2. `[capability-2]` - [Tipo de mudança: ADDED/MODIFIED/REMOVED]

---

## Aprovação

### Stakeholders
- [ ] Product Owner: [Nome]
- [ ] Tech Lead: [Nome]
- [ ] Time: [Aprovação do time]

### Decisão
- [ ] ✅ Aprovado - Prosseguir para próxima fase
- [ ] ⏸️ Pendente - Aguardando esclarecimentos
- [ ] ❌ Rejeitado - Documentar razão abaixo

**Se rejeitado, por quê?**:
[Explicação]

---

## Notas

[Quaisquer notas adicionais, considerações, links de referência]

---

## Checklist

Antes de submeter esta proposta para aprovação:

- [ ] "Por Quê" está claro e conciso
- [ ] "O Que Muda" está completo
- [ ] Complexidade avaliada corretamente
- [ ] Mudanças que quebram compatibilidade identificadas (se aplicável)
- [ ] Próximos passos definidos
- [ ] Stakeholders identificados

---

## Templates Relacionados

### Pré-requisitos
- Nenhum (proposal.md é o ponto de partida do workflow)

### Segue Esta Proposta
- **Se complexidade HIGH**: design.md (TPL-WORKFLOW-002) - Design de arquitetura pelo architect (Fase 2)
- **Se complexidade LOW/MEDIUM**: spec.md (capítulos Arc42) - Especificação pelo analyst (Fase 3)

### Veja Também
- **specs/ (princípios fundamentais, decisões arquiteturais)** - Princípios fundamentais e padrões táticos DDD
- **arc42/01_introduction.md** (TPL-ARC42-01) - Contexto de objetivos e requisitos
- **adr/decision.md** (TPL-ADR-001) - Documentar decisões-chave

---

## Integração com Workflow

**Fase**: 1 (Discovery)

**Skill Principal**: analyst

**Localização de Output**: `changes/[change-id]/proposal.md`

**Pré-requisitos**: Requisição do usuário ou necessidade de negócio identificada

**Próximos Passos**:
- **Se Complexidade = HIGH**: Invocar architect → cria `design.md` (Fase 2)
- **Se Complexidade = LOW/MEDIUM**: Analyst prossegue diretamente para `spec.md` (Fase 3)
- **Após Especificação**: Invocar orchestrator → cria `tasks.md` (Fase 3.5)

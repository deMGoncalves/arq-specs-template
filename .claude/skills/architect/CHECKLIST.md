# Architect - Checklist de Validação

**ID**: SKL-002
**Fase**: 2 (Architecture)
**Quando Usar**: Score <13/16 OU HIGH complexity

## ✅ 1. Análise de Contexto

```markdown
- [ ] proposal.md lido (complexity, score de saúde)
- [ ] spec.md lido (requirements)
- [ ] Sinais de deterioração identificados
```

## ✅ 2. Design Arquitetural

```markdown
- [ ] Diagramas C4 Level 3 (components)
- [ ] DDD patterns definidos (Aggregates, Entities, VOs, Repos, Use Cases)
- [ ] Bounded contexts mapeados
- [ ] Integrações externas documentadas
```

## ✅ 3. ADRs (Architecture Decision Records)

```markdown
- [ ] Mínimo 3-5 ADRs para HIGH complexity
- [ ] Para cada decisão crítica:
      - Contexto e forças
      - Alternativas consideradas
      - Decisão e justificativa
      - Consequências e riscos
```

## ✅ 4. Validação

```markdown
- [ ] design.md completo
- [ ] ADRs criadas
- [ ] Recomendações para orchestrator
```

---

**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

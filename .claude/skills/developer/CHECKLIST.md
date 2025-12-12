# Developer - Checklist de Validação

**ID**: SKL-004
**Categoria**: 💻 Implementation
**Fase**: 4
**Criticidade**: 🔴 CRITICAL

---

## ✅ Pré-implementação

### 1. Validar Tasks Disponíveis

```markdown
- [ ] tasks.md existe (gerado por orchestrator)
- [ ] Task atual (TASK-NNN) foi identificada
- [ ] Task tem todos os campos obrigatórios:
      - ID, Phase, Priority, Title, Description
      - Estimated LOC (<100), Estimated Time (<2h)
      - Dependencies, Files to Load, Acceptance Criteria, Definition of Done
- [ ] Dependências da task foram completadas (TASK-XXX predecessores)
```

---

### 2. Carregar Contexto (Files to Load)

```markdown
- [ ] Todos os arquivos em "Files to Load" foram lidos
- [ ] Context total ≤500 lines (CRÍTICO: previne hallucinations)
- [ ] Context inclui:
      - spec.md (seção relevante)
      - design.md (se aplicável)
      - .claude/rules/ (2-3 regras aplicáveis)
      - Código existente (tasks anteriores)
      - Exemplos/templates
```

**Gate**: Se context >600 lines, reportar ao orchestrator para re-decomposição

---

## ✅ Durante Implementação

### 3. Implementar Código

```markdown
- [ ] DDD Co-Located structure respeitada:
      src/[bounded-context]/[container]/[component]/
- [ ] Object Calisthenics aplicado (39 rules):
      - [ ] Max 1 nível indentação (Rule 001)
      - [ ] Sem ELSE (Rule 002)
      - [ ] Encapsular primitivos (Rule 003)
      - [ ] SRP (Rule 010)
      - [ ] OCP (Rule 011)
      - [ ] LSP (Rule 012)
      - [ ] ISP (Rule 013)
      - [ ] DIP (Rule 014)
- [ ] Error handling robusto (Result<T, E> pattern)
- [ ] Nomes claros e descritivos (Rule 034)
```

---

### 4. Escrever Testes

```markdown
- [ ] Testes escritos JUNTO com código (TDD)
- [ ] Para cada função pública:
      - [ ] 1+ teste de happy path
      - [ ] 1+ teste de error case
      - [ ] Edge cases cobertos
- [ ] Cobertura ≥80% (medida com tarpaulin/coverage tool)
- [ ] Todos os testes passando (100%)
```

---

### 5. Validar Acceptance Criteria

```markdown
- [ ] Todos os critérios da task foram testados
- [ ] Evidências coletadas:
      - Testes passando (logs)
      - Cobertura (%)
      - Lint (0 warnings)
```

---

## ✅ Pós-implementação

### 6. Atualizar Documentação

```markdown
- [ ] .agent-task.md atualizado:
      - Task marcada como ✅ completada
      - Evidências adicionadas
- [ ] Doc comments em funções públicas
- [ ] README atualizado (se necessário)
```

---

### 7. Gate de Qualidade

```markdown
- [ ] LOC implementado ≤100 (conforme estimativa)
- [ ] Testes 100% passando
- [ ] Cobertura ≥80%
- [ ] Lint 0 warnings
- [ ] Acceptance criteria 100% atendidos
- [ ] Definition of Done completo
```

**Pass**: ✅ → Próxima task
**Fail**: ❌ → Refinar implementação

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

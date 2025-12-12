# Analyst Agent - Checklist de Validação

**ID**: SKL-001
**Categoria**: 📋 Planning & Validation
**Fase**: 1 (Discovery) + Final (Validation)

---

## 🎯 Propósito

Este checklist garante que o Analyst Agent execute suas responsabilidades completamente em ambas as fases:
- **Fase 1 (Início)**: Planejamento completo antes da implementação
- **Fase Final**: Validação abrangente após todas as fases

---

## ✅ Checklist - Fase 1: Planejamento Inicial

### 1. Entendimento do Requisito

```markdown
- [ ] Requisito está claro e sem ambiguidades
- [ ] Problema a ser resolvido está identificado
- [ ] Contexto adicional foi coletado (issues, PRs, discussões)
- [ ] Stakeholders foram identificados
- [ ] Prioridade foi estabelecida (P0/P1/P2)
```

**Critério de Sucesso**: Todos os itens marcados ✅

---

### 2. Análise de Contexto

#### 2.1 Regras de Código (.claude/rules/)

```markdown
- [ ] Regras relevantes foram identificadas
- [ ] Pelo menos 3-5 regras aplicáveis listadas
- [ ] Regras críticas destacadas (SRP, DRY, Testing, Naming)
- [ ] Regras foram documentadas no .agent-task.md
```

#### 2.2 Especificações (specs/)

```markdown
- [ ] Arquitetura do projeto foi consultada
- [ ] Padrões de design foram identificados
- [ ] Camadas/módulos afetados foram mapeados
- [ ] ADRs relevantes foram consultadas
- [ ] Building blocks (containers, componentes) foram identificados
```

#### 2.3 Sinais de Deterioração

```markdown
- [ ] Checklist sinais-deterioracao.md foi consultado
- [ ] 4 dimensões foram avaliadas:
      - [ ] 🔒 Rigidez (Centralização, acoplamento, coesão)
      - [ ] 💔 Fragilidade (Isolamento, side effects, dependências)
      - [ ] ⚓ Imobilidade (Reutilização, duplicação, organização)
      - [ ] 🐌 Viscosidade (Design preservation, ambiente)
- [ ] Score de saúde foi calculado (X/16)
- [ ] Status foi classificado (Saudável/Atenção/Moderado/Severo)
- [ ] Recomendações foram documentadas
```

**Critério de Sucesso**: Score de saúde ≥10/16 (Saudável ou Atenção)

---

### 3. Criação de .agent-task.md

#### 3.1 Estrutura Básica

```markdown
- [ ] Arquivo .agent-task.md foi criado
- [ ] Metadados preenchidos (Data, Status, Fase)
- [ ] Objetivo está claro e específico
- [ ] Escopo está dividido em "Incluído" e "Não incluído"
```

#### 3.2 Contexto

```markdown
- [ ] Seção "Regras Aplicáveis" está completa
- [ ] Seção "Arquitetura" está completa
- [ ] Seção "Sinais de Deterioração" está preenchida
```

#### 3.3 Checklist por Fase

```markdown
- [ ] Fase Development tem tasks específicas (3-8 items)
- [ ] Fase Testing tem critérios claros (3-5 items)
- [ ] Fase Code Review tem verificações (3-5 items)
- [ ] Fase Documentation tem entregas (2-4 items)
```

#### 3.4 Arquivos Afetados

```markdown
- [ ] Lista de arquivos a modificar está completa
- [ ] Lista de arquivos a criar está completa
- [ ] Paths são absolutos e corretos
```

**Critério de Sucesso**: .agent-task.md com todas as seções preenchidas

---

### 4. Definição de Escopo

#### 4.1 Princípio SMART

```markdown
- [ ] Specific (Específico): Escopo é claro, não vago
- [ ] Measurable (Mensurável): Pode-se verificar completude
- [ ] Achievable (Alcançável): Realista para o tempo/recursos
- [ ] Relevant (Relevante): Alinhado com objetivos do projeto
- [ ] Time-bound (Temporal): Estimativa de tempo definida
```

#### 4.2 Escopo Incluído

```markdown
- [ ] Mínimo 3 items específicos listados
- [ ] Cada item é verificável (checkbox)
- [ ] Sem ambiguidades ("implementar X" vs "melhorar Y")
```

#### 4.3 Escopo NÃO Incluído

```markdown
- [ ] Mínimo 2 items de out-of-scope listados
- [ ] Justificativa para cada item excluído
- [ ] Referências a issues futuras (se aplicável)
```

**Critério de Sucesso**: Escopo atende SMART + justificativas claras

---

### 5. Critérios de Aceitação

```markdown
- [ ] Mínimo 3-5 critérios definidos
- [ ] Cada critério é mensurável/testável
- [ ] Cada critério tem exemplos concretos
- [ ] Critérios cobrem funcionalidade, testes, qualidade e docs
- [ ] Sem critérios vagos ("código deve ser bom" ❌)
```

**Exemplo de Critério Válido:**
```
✅ Email deve validar formato correto (user@domain.com)
   - Testa: john@example.com ✅
   - Testa: invalid ❌
```

**Critério de Sucesso**: Todos os critérios são objetivos e verificáveis

---

### 6. Validação Final da Fase 1

```markdown
- [ ] .agent-task.md está completo
- [ ] Escopo está claro (SMART)
- [ ] Critérios são mensuráveis
- [ ] Sinais de deterioração foram avaliados
- [ ] Contexto (rules, specs, arquitetura) foi documentado
- [ ] Estimativa de tempo/esforço foi definida
```

**Critério de Sucesso**: 100% dos itens marcados ✅

**Gate de Qualidade**: Se <80% completo, re-planejar antes de prosseguir

---

## ✅ Checklist - Fase Final: Validação

### 1. Revisão de Completude

#### 1.1 Checklist Development

```markdown
- [ ] Todos os items de Development foram completados
- [ ] Código foi implementado conforme spec
- [ ] Nenhum item marcado como "pendente" ou "WIP"
```

#### 1.2 Checklist Testing

```markdown
- [ ] Todos os testes foram escritos
- [ ] Todos os testes estão passando (100%)
- [ ] Cobertura de código foi medida
- [ ] Cobertura atende meta (≥80%)
```

#### 1.3 Checklist Code Review

```markdown
- [ ] Code review foi executado
- [ ] Regras de código foram verificadas
- [ ] Software Quality (12 critérios) foi avaliado
- [ ] Arquitetura foi validada
```

#### 1.4 Checklist Documentation

```markdown
- [ ] README foi atualizado (se necessário)
- [ ] Doc comments foram adicionados
- [ ] CHANGELOG foi atualizado (se release)
- [ ] specs/ foi atualizado (se mudança arquitetural)
```

**Critério de Sucesso**: 100% de todas as 4 fases completas

---

### 2. Validação de Critérios de Aceitação

```markdown
- [ ] Cada critério foi testado individualmente
- [ ] Evidências foram coletadas (logs, screenshots, métricas)
- [ ] Todos os critérios foram ATENDIDOS
- [ ] Nenhum critério foi relaxado/ignorado
```

**Formato de Validação:**

| Critério | Status | Evidência |
|----------|--------|-----------|
| 1. Feature X funciona | ✅ | 5 testes passando |
| 2. Cobertura ≥80% | ✅ | 92% (tarpaulin) |
| 3. Docs atualizadas | ✅ | README, CHANGELOG |

**Critério de Sucesso**: Todos os critérios com Status ✅

---

### 3. Verificação de Conformidade

#### 3.1 Regras de Código (.claude/rules/)

```markdown
- [ ] 100% das regras aplicáveis foram seguidas
- [ ] Nenhuma violação detectada (gatekeeper)
- [ ] Se violações, justificativas documentadas
```

#### 3.2 Software Quality (12 Critérios)

```markdown
📋 Operação (6 critérios):
- [ ] 1. Executabilidade
- [ ] 2. Corretitude
- [ ] 3. Confiabilidade
- [ ] 4. Disponibilidade
- [ ] 5. Performance
- [ ] 6. Segurança

🔄 Revisão (3 critérios):
- [ ] 7. Manutenibilidade
- [ ] 8. Testabilidade
- [ ] 9. Entendibilidade

🔀 Transição (3 critérios):
- [ ] 10. Portabilidade
- [ ] 11. Adaptabilidade
- [ ] 12. Instalabilidade
```

**Critério de Sucesso**: 12/12 atendidos (ou justificativas para N/A)

#### 3.3 Arquitetura (specs/)

```markdown
- [ ] Mudanças estão alinhadas com specs/
- [ ] Decisões arquiteturais foram respeitadas (ADRs)
- [ ] Containers/componentes foram atualizados corretamente
- [ ] Cenários BDD foram implementados fielmente
```

**Critério de Sucesso**: 100% alinhado com especificações

---

### 4. Avaliação de Saúde do Sistema (Pós-Mudança)

```markdown
- [ ] Score de saúde foi recalculado (Y/16)
- [ ] Score não piorou (Y ≥ X inicial)
- [ ] Se piorou, débito técnico foi documentado
- [ ] Recomendações foram atualizadas
```

**Matriz de Comparação:**

| Dimensão | Antes | Depois | Status |
|----------|-------|--------|--------|
| 🔒 Rigidez | 4/4 | 4/4 | ✅ |
| 💔 Fragilidade | 3/4 | 4/4 | ✅ Melhorou |
| ⚓ Imobilidade | 4/4 | 4/4 | ✅ |
| 🐌 Viscosidade | 3/4 | 3/4 | ✅ |
| **TOTAL** | **14/16** | **15/16** | ✅ **+1** |

**Critério de Sucesso**: Score mantido ou melhorado

---

### 5. Geração de Relatório Final

#### 5.1 Estatísticas

```markdown
- [ ] Arquivos criados (contagem)
- [ ] Arquivos modificados (contagem)
- [ ] Linhas adicionadas/removidas
- [ ] Testes adicionados
- [ ] Cobertura de código (%)
- [ ] Fases completadas (X/4)
- [ ] Tempo estimado/real
```

#### 5.2 Resumo de Mudanças

```markdown
- [ ] Descrição clara de cada mudança principal (3-5 itens)
- [ ] Para cada mudança: o quê, onde (file:line), por quê
- [ ] Impacto de cada mudança documentado
```

#### 5.3 Validação de Critérios

```markdown
- [ ] Tabela com todos os critérios e status
- [ ] Todos marcados como ✅ ATENDIDO
- [ ] Se não atendido, justificativa documentada
```

#### 5.4 Conformidade

```markdown
- [ ] Seção de conformidade com regras (100% ou justificativa)
- [ ] Seção de conformidade com qualidade (12/12 ou justificativa)
- [ ] Seção de conformidade com arquitetura (✅ alinhado)
```

#### 5.5 Saúde do Sistema

```markdown
- [ ] Score antes vs depois
- [ ] Classificação (Saudável/Atenção/Moderado/Severo)
- [ ] Recomendações futuras (2-3 items)
```

#### 5.6 Issues Encontrados

```markdown
- [ ] Lista de issues por severidade (🔴 Alto, 🟡 Médio, 🟢 Baixo)
- [ ] Issues bloqueantes foram resolvidos
- [ ] Issues não-bloqueantes documentados para futuro
```

#### 5.7 Próximos Passos

```markdown
- [ ] 2-4 próximos passos recomendados
- [ ] Comandos específicos (ex: @skill guardian, git commit)
- [ ] Referências a issues futuras
```

#### 5.8 Métricas de Qualidade

```markdown
- [ ] Corretitude (1-5 ⭐)
- [ ] Confiabilidade (1-5 ⭐)
- [ ] Manutenibilidade (1-5 ⭐)
- [ ] Testabilidade (1-5 ⭐)
- [ ] Documentação (1-5 ⭐)
```

**Critério de Sucesso**: Relatório completo com todas as 8 seções

---

### 6. Validação Final Global

```markdown
- [ ] Completude: 100% dos checklists marcados
- [ ] Critérios: 100% atendidos
- [ ] Conformidade: 100% (regras, qualidade, arquitetura)
- [ ] Saúde: Score mantido ou melhorado
- [ ] Relatório: Completo e profissional
- [ ] Nenhum bloqueador remanescente
```

**Critério de Sucesso**: Todos os itens ✅

**Gate de Qualidade**: Se <95% completo, refinar antes de marcar como DONE

---

## 🚦 Gates de Qualidade

### Gate 1: Planejamento (Fase 1)

**Critério**: ≥80% do checklist de planejamento completo

- ✅ **Pass**: Prosseguir para Development
- ❌ **Fail**: Re-planejar, refinar escopo, esclarecer requisitos

### Gate 2: Validação Final (Fase Final)

**Critério**: ≥95% do checklist de validação completo

- ✅ **Pass**: Marcar tarefa como DONE, prosseguir para Guardian
- ❌ **Fail**: Resolver pendências, re-executar fases incompletas

---

## 📊 Métricas de Eficiência

| Métrica | Meta | Como Medir |
|---------|------|------------|
| **Completude Planejamento** | ≥80% | Items marcados / Total items (Fase 1) |
| **Completude Validação** | ≥95% | Items marcados / Total items (Fase Final) |
| **Cobertura de Testes** | ≥80% | cargo tarpaulin, jest --coverage |
| **Score de Saúde** | ≥10/16 | Checklist sinais-deterioracao.md |
| **Conformidade Regras** | 100% | gatekeeper validation |
| **Software Quality** | 12/12 | reviewer validation |

---

## 🔗 Relacionado com

### Skills Dependentes
- **architect** (SKL-002): Pode ser invocado se HIGH complexity
- **orchestrator** (SKL-003): Usa .agent-task.md para decompor
- **developer** (SKL-004): Implementa usando .agent-task.md
- **gatekeeper** (SKL-005): Valida conformidade com regras
- **reviewer** (SKL-006): Valida Software Quality
- **guardian** (SKL-009): Validação pré-commit final

### Commands Relacionados
- **/vision** (CMD-001): Analyst pode recomendar atualizar
- **/feature** (CMD-008): Analyst pode criar cenários BDD
- **/code** (CMD-013): Analyst precede code (planejamento)

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

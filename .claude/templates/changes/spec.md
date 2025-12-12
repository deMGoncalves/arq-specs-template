# Template de Especificação

**ID do Template**: TPL-SPEC
**Versão**: 3.0.0
**Categoria**: Changes (Workflow)
**Fase**: 3 (Specification)
**Usado Por**: analyst
**Última Atualização**: 2025-12-10

---

## Propósito

Este template integra **Arc42** (documentação de arquitetura), **C4** (visualização), **BDD** (cenários comportamentais), e **ADR** (decisões) em um documento de especificação completo.

---

## Estrutura do Documento

### 1. Introdução (Arc42 Capítulo 1)
→ Use: `../arc42/01_introduction.md`

### 2. Restrições (Arc42 Capítulo 2)
→ Use: `../arc42/02_constraints.md`

### 3. Contexto do Sistema (Arc42 Capítulo 3 + C4 Nível 1)
→ Use: `../arc42/03_context.md` + `../c4/context.md`

### 4. Estratégia de Solução (Arc42 Capítulo 4)
→ Use: `../arc42/04_solution-strategy.md`

### 5. Blocos de Construção (Arc42 Capítulo 5 + C4 Nível 2-3)
→ Use: `../arc42/05_building-blocks.md` + `../c4/container.md` + `../c4/component.md`

### 6. Visão de Runtime (Arc42 Capítulo 6 + Cenários BDD)
→ Use: `../arc42/06_runtime.md` + `../bdd/scenario.md`

### 7. Deployment (Arc42 Capítulo 7)
→ Use: `../arc42/07_deployment.md`

### 8. Conceitos Transversais (Arc42 Capítulo 8)
→ Use: `../arc42/08_crosscutting.md`

### 9. Decisões Arquiteturais (Arc42 Capítulo 9 + ADRs)
→ Use: `../arc42/09_decisions.md` + `../adr/decision.md`

### 10. Requisitos de Qualidade (Arc42 Capítulo 10)
→ Use: `../arc42/10_quality.md`

### 11. Riscos e Débito Técnico (Arc42 Capítulo 11)
→ Use: `../arc42/11_risks.md`

### 12. Glossário (Arc42 Capítulo 12)
→ Use: `../arc42/12_glossary.md`

---

## Como Usar

### Para Complexidade LOW
**Capítulos necessários**:
- Capítulo 6 (Runtime) + cenários BDD (2-3 cenários)
- Capítulo 10 (Quality) - opcional

### Para Complexidade MEDIUM
**Capítulos necessários**:
- Capítulos 3, 5, 6, 8, 9, 10
- C4 Nível 2 (Container) - se múltiplos containers
- Cenários BDD (5-10 cenários)
- ADRs (2-3 decisões)

### Para Complexidade HIGH
**Capítulos necessários**:
- Todos os 12 capítulos Arc42
- C4 Níveis 1, 2, 3
- Cenários BDD (10-20 cenários)
- ADRs (4-6 decisões)

---

## Checklist

### Documentação Arc42
- [ ] Capítulo 1: Introdução e Objetivos
- [ ] Capítulo 2: Restrições
- [ ] Capítulo 3: Contexto do Sistema
- [ ] Capítulo 4: Estratégia de Solução
- [ ] Capítulo 5: Blocos de Construção
- [ ] Capítulo 6: Visão de Runtime
- [ ] Capítulo 7: Deployment
- [ ] Capítulo 8: Conceitos Transversais
- [ ] Capítulo 9: Decisões Arquiteturais
- [ ] Capítulo 10: Requisitos de Qualidade
- [ ] Capítulo 11: Riscos e Débito Técnico
- [ ] Capítulo 12: Glossário

### Diagramas C4
- [ ] Nível 1: Contexto do Sistema (se MEDIUM/HIGH)
- [ ] Nível 2: Container (se MEDIUM/HIGH)
- [ ] Nível 3: Component (se HIGH)

### Cenários BDD
- [ ] Cenários de caminho feliz
- [ ] Cenários de tratamento de erro
- [ ] Cenários de casos extremos

### ADRs
- [ ] Decisões arquiteturais críticas documentadas
- [ ] Alternativas consideradas e rejeitadas
- [ ] Consequências documentadas

---

## Integração

Este spec.md serve como **input** para:
- **Fase 3.5**: orchestrator usa para criar `tasks.md`
- **Fase 4**: developer implementa baseado nas specs
- **Fase 5**: tester valida cenários BDD
- **Fase 7**: analyst valida completude

---

**Versão**: 3.0.0
**Mantido por**: Time Documentation-First Approach
**Última Atualização**: 2025-12-10

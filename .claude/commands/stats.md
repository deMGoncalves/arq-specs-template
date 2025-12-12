---
description: Gera um dashboard Markdown com a saúde documental de `specs/`, destacando lacunas, riscos e débitos técnicos.
---

# Stats

**ID**: CMD-015
**Categoria**: 🔧 Meta
**Prioridade**: 🟢 P2 (Útil)
**Fase**: - (auditoria)
**Arc42 Chapters**: 1-12 (todos)

---

## 🎯 O que Faz

**Audita** a saúde documental do repositório:
- Varre specs/ completo (12 capítulos Arc42)
- Mede completude (placeholders, status, datas)
- Analisa riscos e débitos técnicos
- Gera dashboard Markdown executivo

Útil para **governança**, **health checks** e **identificar gaps**.

## 📝 Quando Usar

### Obrigatório
- Nunca (é ferramenta de auditoria)

### Recomendado
- **Antes de /code**: Validar que specs estão completas
- **Pós-import**: Avaliar qualidade das specs geradas
- **Weekly**: Health check semanal de documentação
- **Pré-release**: Garantir specs atualizadas

### Opcional
- Durante desenvolvimento incremental (usar comandos individuais)

## 🔗 Pré-requisitos

### Commands
- Nenhum (stats é comando de auditoria)

## 🔗 Pós-ações

### Próximos Commands
- Comandos individuais para corrigir gaps identificados
- **CMD-013 (code)**: Somente após specs ≥80% completas

### Arquivos Criados
- Nenhum (apenas lê e reporta)
- Output: Dashboard Markdown no console

## 📊 Complexidade

| Complexidade | Tempo | Arquivos | Exemplo |
|--------------|-------|----------|---------|
| **LOW** | 30s-1min | <50 | Projeto pequeno, specs básicas |
| **MEDIUM** | 1-3min | 50-200 | Projeto médio, specs parciais |
| **HIGH** | 3-5min | >200 | Projeto grande, specs completas |

## 💡 Exemplos

### Exemplo 1: Projeto Saudável (LOW)

**Input**:
```bash
/stats
```

**Output**:
```markdown
# Painel de Status das Specs

## Visão Geral

- **Cobertura Geral**: 95.2%
- **Placeholders Totais**: 3
- **Capítulos**: 🟢 10 | 🟡 2 | 🔴 0
- **Arquivos sem status/datas**: 0

## Cobertura por Capítulo

| Capítulo | Arquivo | Status Declarado | Status Avaliado | Cobertura | Placeholders | Última Atualização | Observações |
|----------|---------|------------------|-----------------|-----------|--------------|-------------------|-------------|
| 01 | introduction-and-goals.md | 🟢 | 🟢 | 100% | 0 | 2025-12-08 | Completo |
| 02 | constraints.md | 🟢 | 🟢 | 100% | 0 | 2025-12-08 | 3 patterns ativos |
| 03 | context-and-scope.md | 🟢 | 🟢 | 100% | 0 | 2025-12-07 | 2 atores, 3 sistemas |
| 04 | solution-strategy.md | 🟢 | 🟢 | 100% | 0 | 2025-12-07 | ADR-001 referenciada |
| 05 | building-block-view.md | 🟢 | 🟢 | 98% | 1 | 2025-12-08 | 1 diagrama placeholder |
| 06 | runtime-view.md | 🟢 | 🟢 | 100% | 0 | 2025-12-08 | 4 cenários BDD |
| 07 | deployment-view.md | 🟢 | 🟢 | 100% | 0 | 2025-12-08 | Docker + Railway |
| 08 | crosscutting-concepts.md | 🟡 | 🟡 | 85% | 2 | 2025-12-06 | Falta seção 8.8 (i18n) |
| 09 | architectural-decisions.md | 🟢 | 🟢 | 100% | 0 | 2025-12-08 | 1 ADR ativa |
| 10 | quality-requirements.md | 🟢 | 🟢 | 100% | 0 | 2025-12-08 | 5 cenários qualidade |
| 11 | risks-and-technical-debt.md | 🟡 | 🟡 | 90% | 0 | 2025-12-05 | Data antiga (3 dias) |
| 12 | glossary.md | 🟢 | 🟢 | 100% | 0 | 2025-12-08 | 47 termos |

## Riscos e Débitos Técnicos

### Riscos
1. **R-001** (Técnico - MÉDIO): Dependência de API externa sem SLA - Mitigar com circuit breaker
2. **R-003** (Negócio - BAIXO): Mudança regulatória Q2/2026 - Monitorar legislação

### Débitos
1. **TD-002** (Alto): Testes e2e ausentes - Esforço: 5 dias - Prioridade: P1
2. **TD-005** (Médio): Logging estruturado parcial - Esforço: 2 dias - Prioridade: P2

## Alertas Prioritários

1. 🟡 **Crosscutting incompleto**: Seção 8.8 (i18n) não documentada - Impacto se houver internacionalização futura
2. 🟡 **Riscos desatualizados**: specs/11_risks última atualização há 3 dias - Revisar status
3. 🟢 **Cobertura excelente**: 95.2% - Pronto para implementação

## Próximas Ações Sugeridas

1. Completar specs/08_crosscutting (seção 8.8)
2. Atualizar specs/11_risks (data antiga)
3. Adicionar diagrama em specs/05_building-blocks
4. ✅ Executar `/code` (specs ≥80% completas)

## Confiança da Análise

**Alta** — Todos os 56 arquivos revisados manualmente, 0 erros de parsing.
```

### Exemplo 2: Projeto com Gaps (MEDIUM)

**Input**:
```bash
/stats
```

**Output**:
```markdown
# Painel de Status das Specs

## Visão Geral

- **Cobertura Geral**: 62.8%
- **Placeholders Totais**: 47
- **Capítulos**: 🟢 4 | 🟡 5 | 🔴 3
- **Arquivos sem status/datas**: 8

## Cobertura por Capítulo

| Capítulo | Status Avaliado | Cobertura | Placeholders | Observações |
|----------|-----------------|-----------|--------------|-------------|
| 01 | 🟢 | 95% | 2 | OK |
| 02 | 🔴 | 15% | 18 | Apenas 2 constraints definidas, patterns vazios |
| 03 | 🟡 | 70% | 5 | Atores OK, sistemas externos faltam |
| 04 | 🔴 | 10% | 12 | Essencialmente template vazio |
| 05 | 🟡 | 55% | 8 | 2 containers OK, componentes incompletos |
| 06 | 🔴 | 25% | 15 | 1 cenário BDD completo, 5 parciais |
| 07 | 🟡 | 65% | 4 | Deploy básico, falta observabilidade |
| 08 | 🟡 | 50% | 10 | Domínio OK, segurança falta |
| 09 | 🟡 | 70% | 3 | ADR-001 OK, faltam outras decisões |
| 10 | 🟢 | 85% | 1 | Qualidade bem definida |
| 11 | 🟢 | 90% | 0 | Riscos documentados |
| 12 | 🟢 | 95% | 1 | Glossário parcial |

## Alertas Prioritários

1. 🔴 **BLOQUEADOR**: Capítulos 02, 04, 06 críticos (<50%) - **NÃO executar /code**
2. 🔴 **Cenários BDD insuficientes**: Apenas 1/6 completo - Implementação sem specs = alucinação
3. 🟡 **Segurança não documentada**: specs/08_crosscutting#8.2 vazia - Risco alto

## Próximas Ações Sugeridas

1. **URGENTE**: Completar specs/02_constraints (patterns obrigatórios)
2. **URGENTE**: Completar specs/06_runtime (cenários BDD)
3. **URGENTE**: Completar specs/04_solution-strategy
4. Documentar segurança em specs/08_crosscutting#8.2
5. ⛔ **NÃO executar /code** até cobertura ≥80%

## Confiança da Análise

**Alta** — 143 arquivos analisados, 8 arquivos com datas pendentes identificados.
```

### Exemplo 3: Projeto Legado (HIGH)

**Input**:
```bash
/stats
```

**Output**:
```markdown
# Painel de Status das Specs

## Visão Geral

- **Cobertura Geral**: 8.3%
- **Placeholders Totais**: 312
- **Capítulos**: 🟢 0 | 🟡 1 | 🔴 11
- **Arquivos sem status/datas**: 47

## Cobertura por Capítulo

| Capítulo | Status Avaliado | Cobertura | Observações |
|----------|-----------------|-----------|-------------|
| 01-12 | 🔴 | 5-15% | Essencialmente templates vazios |

## Alertas Prioritários

1. 🔴 **CRITICAL**: Specs praticamente inexistentes - Executar `/import` ou preencher manualmente
2. 🔴 **Código sem specs**: Projeto com 15k LOC mas specs vazias - Alto risco de inconsistência
3. 🔴 **Débito técnico massivo**: 312 placeholders - Estimativa: 40-80h para completar

## Próximas Ações Sugeridas

1. **OPÇÃO A (Recomendada)**: Executar `/import [doc-existente]` se houver doc técnico
2. **OPÇÃO B**: Preencher manualmente via comandos:
   - `/vision` (1h)
   - `/stack` (30min)
   - `/actor` (30min por ator)
   - `/container` (1h por container)
   - `/feature` (30min por cenário)
   - `/build` (1-2h)
3. ⛔ **BLOQUEADOR ABSOLUTO**: NÃO modificar código até specs ≥80%

## Confiança da Análise

**Média** — Templates detectados, mas ausência de conteúdo impede análise profunda.
```

---

## 🛠️ Troubleshooting

### Problema 1: "Como interpretar cobertura?"

**Métricas**:
- **100%**: Zero placeholders, todos os campos preenchidos
- **70-99%**: 1-5 placeholders, campos críticos OK
- **40-69%**: 6-15 placeholders, lacunas significativas
- **<40%**: >15 placeholders ou essencialmente template vazio

**Status**:
- 🟢 **Saudável** (≥90%): Pronto para /code
- 🟡 **Parcial** (50-89%): Completar antes de /code
- 🔴 **Crítico** (<50%): BLOQUEADOR para /code

### Problema 2: "Stats mostra cobertura alta mas specs parecem incompletas"

**Causa**: Stats conta apenas placeholders explícitos, não avalia profundidade

**Solução**:
1. Revisar manualmente seções críticas:
   - specs/06_runtime/scenarios/ (cenários BDD completos?)
   - specs/02_constraints/patterns/ (regras definidas?)
   - specs/09_decisions/adrs/ (decisões documentadas?)
2. Stats é métrica quantitativa, não qualitativa
3. Usar bom senso: "Esta spec é suficiente para implementar sem ambiguidade?"

### Problema 3: "Quais gaps priorizar?"

**Priorização** (ordem de urgência):
1. **P0 (Bloqueadores)**: Cenários BDD (specs/06), Constraints (specs/02), Building Blocks (specs/05)
2. **P1 (Importantes)**: Crosscutting (specs/08), Deployment (specs/07), Quality (specs/10)
3. **P2 (Úteis)**: Riscos (specs/11), Glossário (specs/12)

Regra: **NÃO executar /code se P0 <80% completo**

---

## 🔗 Relacionado com

### Commands
- **Analisa outputs de**: TODOS os commands (CMD-001 a CMD-013)
- **Recomenda executar**:
  - CMD-014 (/import): Se cobertura <30%
  - Comandos individuais: Se gaps específicos (ex: /feature para cenários faltantes)
  - CMD-013 (/code): Somente se cobertura ≥80%

### Skills
- **SKL-001 (analyst)**: Pode invocar /stats como parte de discovery
- **SKL-009 (guardian)**: Usa /stats como validação pré-commit

### Rules
- Não aplicável (stats é meta-comando)

---

**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

---

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um analista de documentação responsável por auditar a pasta `specs/` e produzir um panorama executivo da maturidade arc42. O comando `/stats` precisa varrer todos os capítulos (01 a 12), medir completude com base em placeholders remanescentes e status declarados, e gerar um relatório Markdown conciso para stakeholders e agentes. Realce riscos e dívidas técnicas, apontando ações de follow-up sempre em português brasileiro técnico.

### Objetivos

1. Consolidar métricas gerais de preenchimento das specs (placeholders remanescentes, capítulos completos/parciais/críticos).
2. Construir tabela por capítulo indicando status declarado, cobertura estimada, quantidade de placeholders e observações relevantes.
3. Resumir os principais riscos (`specs/11_risks/011_risks-and-technical-debt.md`) e débitos técnicos ativos, com foco em impacto e próximos passos.
4. Destacar alertas prioritários (top 3 lacunas ou riscos) e recomendar ações imediatas.
5. Informar o grau de confiança na análise (ex.: Alta/Média/Baixa) justificando critérios.

## Operating Constraints

### Alcance e fontes

- Analise **apenas** arquivos sob `specs/`.
- Considere todos os capítulos arc42 (`01_introduction` a `12_glossary`) e seus subdiretórios.
- Quando o comando citar templates ou estruturas esperadas, use `.claude/templates/arc42/` como referência para comparar preenchimento.

### Regras de avaliação

- Trate como **placeholder** qualquer ocorrência contendo `PREENCHER`, `YYYY-MM-DD`, `NOME DO`, `Nome do`, `Inserir`, `ex:`, `[Slug]`, `[...]` ou texto em colchetes com instrução explícita; cada ocorrência contabiliza um ponto de lacuna.
- Calcule a cobertura aproximada do arquivo:
  - `100%` quando `placeholders == 0`.
  - `70%` quando `1 ≤ placeholders ≤ 5`.
  - `40%` quando `6 ≤ placeholders ≤ 15`.
  - `10%` quando `placeholders > 15` ou o arquivo está essencialmente igual ao template.
- Classifique o estado real:
  - `🟢 Saudável`: cobertura ≥ 90%.
  - `🟡 Parcial`: 50% ≤ cobertura < 90%.
  - `🔴 Crítico`: cobertura < 50% ou múltiplos placeholders estruturais.
- Se o arquivo declarar `**Status**` inconsistente (placeholder, ausente ou divergindo da avaliação), sinalize em observações.
- Considere a data de `**Última atualização**`; se ainda estiver com placeholder, registre como "Data pendente".
- Para riscos/débitos, liste ao menos os três itens com maior exposição (Probabilidade × Impacto) ou maior prioridade.

### Formato de saída obrigatório

O relatório final **sempre** deve ser Markdown estruturado nesta ordem:

1. `# Painel de Status das Specs`
2. `## Visão Geral`
   - Lista com: Cobertura Geral (%), Placeholders Totais, Capítulos 🟢/🟡/🔴, Arquivos sem status/datas.
3. `## Cobertura por Capítulo`
   - Tabela com colunas: `Capítulo`, `Arquivo`, `Status Declarado`, `Status Avaliado`, `Cobertura Estimada`, `Placeholders`, `Última Atualização`, `Observações`.
4. `## Riscos e Débitos Técnicos`
   - Subdivida em `Riscos` e `Débitos`, cada um com bullets enumerando ID, categoria/tipo, impacto, status e ação recomendada.
5. `## Alertas Prioritários`
   - Top 3 lacunas ou riscos críticos em ordem de severidade, com contexto e impacto.
6. `## Próximas Ações Sugeridas`
   - Liste até 5 ações priorizadas, referenciando capítulos (ex.: `Atualizar 05_building-blocks`).
7. `## Confiança da Análise`
   - Informe `Alta`, `Média` ou `Baixa` e justifique (ex.: "Alta — todos os arquivos revisados manualmente").

Garanta que cada tabela tenha cabeçalho e que números percentuais usem uma casa decimal (ex.: `72.5%`). Utilize negrito apenas para destacar métricas chave ou rótulos.

### Restrições

- Não edite arquivos nem execute comandos de escrita; apenas leia e produza relatório.
- Não solicite interação adicional ao usuário.
- Não deixe campos vazios; quando não houver informação, escreva `Não informado – justificar`.
- Não mude o idioma para inglês.
- Não minimize problemas críticos: se um capítulo está praticamente vazio, declare como `🔴 Crítico`.

## Execution Steps

1. Listar todos os arquivos relevantes em `specs/`, agrupando por capítulo (01–12).
2. Para cada arquivo:
   - Ler conteúdo completo.
   - Capturar `**Status**` e `**Última atualização**`.
   - Contar placeholders segundo as regras e calcular cobertura estimada.
   - Identificar lacunas específicas (ex.: tabelas vazias, seções não preenchidas, diagramas ausentes).
3. Consolidar métricas globais (placeholders totais, média de cobertura, distribuição 🟢/🟡/🔴, arquivos com datas pendentes).
4. Ler `specs/11_risks/011_risks-and-technical-debt.md` e extrair:
   - Riscos ativos com maior exposição.
   - Débitos técnicos de maior prioridade ou impacto.
   - Problemas conhecidos relevantes, se existirem.
5. Montar o relatório Markdown respeitando a estrutura obrigatória, preenchendo tabelas e seções com dados analisados.
6. Revisar o texto garantindo coerência, ausência de placeholders e uso consistente de tons (🔴/🟡/🟢).

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Documentação: `specs/01_introduction` até `specs/12_glossary`
- Riscos e débitos: `specs/11_risks/011_risks-and-technical-debt.md`
- Templates de referência: `.claude/templates/arc42/`
- Inventário sumarizado: `specs/SUMMARY.md`

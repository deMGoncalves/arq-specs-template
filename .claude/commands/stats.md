---
description: Gera um dashboard Markdown com a saúde documental de `specs/`, destacando lacunas, riscos e débitos técnicos.
---

# Stats

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

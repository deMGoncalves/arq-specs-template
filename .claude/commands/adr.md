---
description: Registra uma decisão arquitetural importante, seu contexto, alternativas e consequências.
---

# Adr

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por registrar decisões arquiteturais deste repositório arc42. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em uma decisão arquitetural completa, alinhada ao formato padrão de ADR.
2. Atualizar o índice de decisões (`009_architectural-decisions.md`) com a nova/alterada ADR.
3. Documentar contexto, alternativas, comparação, impactos, métricas, stakeholders, plano e revisões da decisão.
4. Atualizar o glossário com termos, siglas ou conceitos introduzidos pela decisão.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte os templates antes de editar; se o arquivo não existir, copie o template correspondente antes de preencher.
- Preserve headings, tabelas, blocos de metadados e estrutura do template.
- IDs de ADR devem ter três dígitos (`001-999`) e slug em *kebab-case*, sem acentos; mantenha ID existente quando atualizar.
- Status da ADR deve ser um dentre: 🟡 Proposta, 🟢 Aceita, 🔴 Deprecated, ⚫ Superseded por ADR-XXX.
- Preencha todas as seções do template com detalhes específicos (contexto, forças, restrições, decisão, alternativas, comparações, métricas, timeline, stakeholders, impacto financeiro).
- Forneça métricas e KPIs mensuráveis, planos de implementação e critérios de revisão/depreciação.
- Referencie containers (`CNT-XXX`), componentes (`CMP-XXX`), atores (`ACT-XXX`), sistemas (`SYS-XXX`), cenários (`SCN-XXX`), patterns e constraints impactados.
- Atualize o índice em `009_architectural-decisions.md` (lista ordenada, índice de ADRs) com título, data e status atualizados.
- Atualize `specs/12_glossary/012_glossary.md` com termos associados à decisão (tecnologias, padrões, políticas, siglas) mantendo ordem alfabética e índice.
- Não deixe tabelas/listas vazias; inclua pelo menos duas alternativas analisadas e critérios de comparação.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora dos listados.
- Não reutilizar IDs de ADR sem verificar a sequência existente.
- Não deixar seções do template vazias; utilize "Não aplicável – justificar" apenas quando necessário.
- Não mudar o idioma para inglês.
- Não omitir links para referências, ADRs relacionadas, containers, componentes ou cenários citados.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar problema, forças técnicas/de negócio, restrições e motivação da decisão.
2. Levantar alternativas consideradas, prós/contras, critérios de avaliação, riscos e métricas de sucesso.
3. Mapear artefatos impactados (containers, componentes, cenários, riscos, qualidade) e termos a serem incluídos no glossário.

**Fase 2 – Planejamento**
1. Verificar se a ADR já existe:
   - Se existir, tratar como atualização mantendo ID, histórico e versão (incrementando conforme magnitude).
   - Se for nova, determinar o próximo número sequencial (`max + 1`) e criar o arquivo a partir do template.
2. Planejar seções do índice (`009_architectural-decisions.md`) que precisam ser ajustadas (formato de ADR, lista, índice).
3. Definir lista de termos/abreviações que entrarão no glossário.

**Fase 3 – Redação**
1. Preencher o template da ADR com todas as seções:
   - Contexto, forças, restrições, referências, motivação.
   - Decisão, abordagem escolhida, passos de implementação, artefatos impactados.
   - Alternativas (pelo menos duas) com prós/contras e justificativa da rejeição.
   - Tabela comparativa, consequências, mitigação de riscos, métricas de sucesso, timeline, impacto financeiro, stakeholders.
   - Referências, histórico de atualizações e plano de revisão.
2. Atualizar `specs/09_decisions/009_architectural-decisions.md`:
   - Ajustar status/data do capítulo.
   - Incluir entradas completas para a ADR (ou atualizar seções existentes) mantendo ordem numérica.
   - Atualizar índice de ADRs com título, data e status atuais.
3. Atualizar `specs/12_glossary/012_glossary.md` com termos, siglas ou conceitos introduzidos.
   - Inserir termos em ordem alfabética e atualizar índice, acrônimos, entidades, eventos ou termos evitados conforme necessário.

**Fase 4 – Validação Cruzada**
1. Confirmar consistência entre ADR, índice e demais artefatos (containers, runtime, crosscutting, deployment, riscos).
2. Verificar que todas as seções do template foram preenchidas sem placeholders.
3. Checar links relativos e IDs (ADR, container, componente, cenário) garantindo que apontem para arquivos existentes.
4. Validar métricas, timeline, stakeholders e impacto financeiro com dados coerentes.
5. Assegurar que o glossário contenha todos os termos citados na ADR.

**Fase 5 – Saída**
1. Gerar bloco `cat` para `specs/09_decisions/adrs/ADR-XXX_[slug].md`.
2. Gerar bloco `cat` para `specs/09_decisions/009_architectural-decisions.md`.
3. Gerar bloco `cat` para `specs/12_glossary/012_glossary.md` se alterado.
4. Emitir relatório final:
```text
✅ ADR DOCUMENTADA

Atualizações:
• specs/09_decisions/adrs/ADR-XXX_[slug].md
• specs/09_decisions/009_architectural-decisions.md
• specs/12_glossary/012_glossary.md (se aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
5. Ajustar listas conforme artefatos efetivamente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/09_decisions/009_architectural-decisions.md`
  - `.claude/templates/arc42/09_decisions/adrs/ADR-[NNN]_[decision-title].md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/09_decisions/009_architectural-decisions.md`
  - `specs/09_decisions/adrs/ADR-[NNN]_[slug].md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/02_constraints/` (restrições relacionadas)
  - `specs/05_building-blocks/` (containers/componentes impactados)
  - `specs/06_runtime/` (cenários afetados)
  - `specs/07_deployment/` e `specs/08_crosscutting/` (infraestrutura e políticas)
  - `specs/10_quality/` e `specs/11_risks/` (métricas, riscos e débitos)

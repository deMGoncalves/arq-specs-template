---
description: Cria cenários de teste BDD para fluxos alternativos, como erros e edge cases.
---

# Flow

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por registrar jornadas de runtime deste repositório arc42. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em jornadas de runtime claras (cenários principais, interações assíncronas, máquinas de estado, jobs).
2. Criar ou atualizar cenários detalhados (`SCN-XXX`) com passos Gherkin, métricas e rastreabilidade.
3. Atualizar o glossário com termos, eventos, estados, jobs, métricas ou siglas introduzidos.
4. Garantir consistência entre runtime, building blocks, atores/sistemas e crosscutting.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte os templates antes de editar; se um arquivo não existir, copie o template correspondente antes de preencher.
- Preserve headings, tabelas, blocos de metadados (`Status`, `Última atualização`) e formatação original.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (`YYYY-MM-DD`) em todos os arquivos tocados.
- IDs de cenários devem ter três dígitos (`001-999`) e slug em *kebab-case*, sem acentos; não reutilize IDs existentes inadvertidamente.
- Preencha cada seção com detalhes completos: gatilhos, passos, estados, payload, frequência, políticas de retry, métricas e alertas.
- Utilize diagrama textual ou Mermaid quando especificado (eventos, máquinas de estado).
- Referencie containers (`CNT-XXX`), componentes (`CMP-XXX`), atores (`ACT-XXX`), sistemas (`SYS-XXX`), ADRs e patterns conforme necessário.
- Atualize `specs/12_glossary/012_glossary.md` sempre que surgirem novos termos, estados, eventos ou jobs; mantenha ordem alfabética e índice.
- Não deixe tabelas/listas vazias; forneça pelo menos dois itens quando aplicável (eventos, transições, fluxos paralelos).

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora dos listados.
- Não reutilizar IDs de cenários sem confirmar sequência atual.
- Não deixar seções vazias; use "Não aplicável – justificar" somente quando necessário.
- Não mudar o idioma para inglês.
- Não omitir referências a atores, sistemas, containers, ADRs ou padrões mencionados no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar jornadas mencionadas (fluxos de usuário, integrações, eventos, jobs).
2. Levantar atores, sistemas, containers e componentes participantes.
3. Mapear estados, eventos, mensagens, métricas e políticas de retry/falha que precisam ser documentados.
4. Anotar termos que devem constar no glossário.

**Fase 2 – Planejamento**
1. Revisar `specs/06_runtime/006_runtime-view.md` para entender conteúdo atual e lacunas.
2. Decidir quais cenários principais precisam ser atualizados/criados e quais seções (6.1 a 6.4) serão impactadas.
3. Verificar cenários existentes em `specs/06_runtime/scenarios/`; reaproveitar IDs quando atualizar, ou calcular o próximo (`max + 1`) para novos cenários.
4. Planejar links cruzados com building blocks, atores, sistemas, containers e glossário.

**Fase 3 – Redação**
1. `specs/06_runtime/006_runtime-view.md`:
   - Atualizar 6.1 com descrição narrativa de cada jornada, referenciando arquivos `SCN-XXX`.
   - Documentar interações assíncronas (gatilhos, produtores, consumidores, payload, diagramas).
   - Definir máquinas de estado (diagramas Mermaid, tabelas de transições, validações).
   - Descrever jobs/processos em background (frequência, passos, retry, timeout).
2. `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md`:
   - Criar/atualizar arquivos com contexto, participantes, pré-condições, fluxo Gherkin (Given/When/Then), métricas, SLAs, monitoração.
   - Documentar evidências (logs, dashboards) e referências a containers/atores.
3. `specs/12_glossary/012_glossary.md`:
   - Adicionar ou ajustar termos (eventos, estados, filas, jobs, métricas) citados nesta jornada.
   - Atualizar seções de acrônimos, entidades, value objects, eventos e índice alfabético.

**Fase 4 – Validação Cruzada**
1. Conferir que cenários listados em 6.1 possuem arquivos `SCN-XXX` correspondentes e vice-versa.
2. Validar consistência de nomes, IDs e links com building blocks, atores, sistemas e glossário.
3. Garantir ausência de placeholders, dados conflitantes ou tabelas incompletas.
4. Revisar métricas, SLIs/SLOs, políticas de retry e diagramas para conferir precisão.

**Fase 5 – Saída**
1. Gerar bloco `cat` para `specs/06_runtime/006_runtime-view.md`.
2. Gerar blocos `cat` para cada cenário `SCN-XXX` criado/atualizado.
3. Gerar bloco `cat` para `specs/12_glossary/012_glossary.md` se alterado.
4. Emitir relatório final:
```text
✅ FLOW DOCUMENTADO

Atualizações:
• specs/06_runtime/006_runtime-view.md
• specs/06_runtime/scenarios/SCN-XXX_[slug].md (lista)
• specs/12_glossary/012_glossary.md (se aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
5. Ajustar listas conforme artefatos realmente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/06_runtime/006_runtime-view.md`
  - `.claude/templates/arc42/06_runtime/scenarios/SCN-[NNN]_[slug].md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/06_runtime/006_runtime-view.md`
  - `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/05_building-blocks/` (containers/componentes citados)
  - `specs/03_context/actors/` e `systems/` (atores/sistemas envolvidos)
  - `specs/08_crosscutting/` (políticas aplicáveis)
  - `specs/09_decisions/` (ADRs)

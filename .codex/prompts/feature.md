---
description: Cria um novo Cenário BDD (SCN) para uma funcionalidade, ligando-o ao Ator e ao Container responsáveis.
---

# Feature
<!-- markdownlint-disable MD012 MD029 MD031 MD032 MD036 -->

## User Input

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por atualizar a visão de runtime e o glossário deste repositório arc42. Utilize pensamento estruturado, siga os templates em `.codex/template/` e elimine quaisquer marcadores `[PREENCHER]`, entregando conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em cenários de runtime claros, cobrindo fluxos principais, eventos assíncronos, estados e processamento em background.
2. Atualizar ou criar cenários detalhados (`SCN-XXX`) mantendo rastreabilidade com componentes e condições de sucesso.
3. Sincronizar o glossário com termos, eventos, estados, jobs e métricas introduzidos nos cenários.
4. Garantir consistência entre nomes utilizados em runtime, cenários e glossário.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte os templates antes de editar; se um arquivo não existir, copie o template correspondente antes de preencher.
- Preserve headings, tabelas, blocos de metadados (`**Status**`, `**Última atualização**`) e formatação.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (`YYYY-MM-DD`) em todos os arquivos tocados.
- Substitua todos os placeholders por conteúdo específico; quando a informação não se aplicar, registre “Não aplicável – justificar”.
- IDs de cenários (`SCN-XXX`) e slugs devem ter três dígitos (`001-999`) em *kebab-case* sem acentos; não reutilize IDs já existentes.
- Cenários devem seguir formato Gherkin (Given/When/Then) e indicar componentes (`CMP-XXX`) envolvidos.
- Eventos assíncronos precisam trazer triggers, produtores, consumidores, payload e diagrama/descrição de fluxo.
- Máquinas de estado precisam de diagrama Mermaid e tabela de transições com validações.
- Jobs em background devem detalhar frequência, responsabilidades, política de retry e timeout.
- Glossário deve listar termos em ordem alfabética, incluindo definições, contexto, exemplos e relações.
- Referencie padrões, ADRs ou restrições quando influenciar comportamento descrito.
- Não deixe tabelas ou listas incompletas.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não reutilizar IDs existentes inadvertidamente; sempre incrementar para novos cenários.
- Não deixar seções vazias; utilize “Não aplicável – justificar” se necessário.
- Não mudar o idioma para inglês.
- Não omitir referências relevantes (links, padrões, ADRs) mencionadas no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar fluxos de usuário, integrações externas e eventos descritos.
2. Levantar estados do domínio, jobs agendados e mecanismos de comunicação (sync/async).
3. Extrair termos técnicos e de negócio que necessitam definição no glossário.

**Fase 2 – Planejamento dos Cenários**
1. Revisar cenários existentes em `specs/06_runtime/scenarios/` verificando possíveis atualizações.
2. Definir quais cenários novos precisam ser criados e qual ID utilizar (máximo atual + 1).
3. Mapear componentes (`CMP-XXX`) ou containers (`CTR-XXX`) associados a cada cenário.
4. Planejar diagramas e tabelas necessários para eventos, estados e jobs mencionados.

**Fase 3 – Redação**
1. `specs/06_runtime/006_runtime-view.md`:
   - Atualizar seção 6.1 com descrição dos cenários principais referenciando arquivos `SCN-XXX`.
   - Preencher interações assíncronas com triggers, produtores, consumidores, payload e fluxo visual/textual.
   - Documentar máquinas de estado e tabelas de transição coerentes com o briefing.
   - Detalhar processamento em background com frequência, passos, retry e timeout.
2. `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md`:
   - Criar ou atualizar arquivos de cenário conforme necessário usando template oficial (Contexto, Fluxo Gherkin, Resultados, Métricas).
3. `specs/12_glossary/012_glossary.md`:
   - Adicionar/ajustar termos técnicos, eventos, estados, jobs e acrônimos citados no capítulo 6.
   - Atualizar seções de entidades, value objects, eventos de domínio, estados e termos evitados conforme aplicável.
   - Garantir que o índice alfabético contenha links para os novos termos.

**Fase 4 – Validação Cruzada**
1. Conferir consistência de nomenclatura entre runtime, cenários e glossário.
2. Verificar que cada cenário em 6.1 aponta para arquivos `SCN-XXX` existentes e vice-versa.
3. Checar que eventos e estados documentados possuem entradas correspondentes no glossário.
4. Garantir ausência de placeholders, datas antigas ou inconsistências de formatação.

**Fase 5 – Saída**
1. Para cada arquivo tocado, gerar bloco `cat` completo:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após todos os blocos `cat`, emitir o relatório final:
```text
✅ FEATURE DOCUMENTADA

Atualizações:
• specs/06_runtime/006_runtime-view.md
• specs/12_glossary/012_glossary.md
• specs/06_runtime/scenarios/SCN-XXX_[slug].md (quando aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar a lista de atualizações e destaques conforme artefatos realmente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.codex/template/06_runtime/006_runtime-view.md`
  - `.codex/template/06_runtime/scenarios/SCN-[NNN]_[slug].md`
  - `.codex/template/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/06_runtime/006_runtime-view.md`
  - `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md` (quando necessário)
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/06_runtime/scenarios/` (cenários existentes)
  - `specs/12_glossary/012_glossary.md` (termos previamente definidos)

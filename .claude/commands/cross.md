---
description: Refina conceitos que afetam toda a arquitetura, como modelo de domínio, segurança e tratamento de erros.
---

# Cross

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por registrar conceitos transversais deste repositório arc42. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua marcadores `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em documentação completa dos aspectos transversais (domínio, segurança, persistência, comunicação, testes, configuração, i18n, auditoria).
2. Descrever decisões, práticas, ferramentas e métricas associadas a cada seção, com justificativas mensuráveis.
3. Atualizar o glossário com termos, abreviações, entidades, value objects, eventos e políticas introduzidos.
4. Garantir coerência entre crosscutting, outros capítulos arc42 e padrões/ADRs existentes.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Antes de editar, abra o template correspondente; se o arquivo alvo não existir, replique o template antes de preencher.
- Preserve headings, numeração, tabelas, blocos de metadados e formatação original.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (`YYYY-MM-DD`) em todos os arquivos tocados.
- Substitua todos os placeholders por conteúdo específico; quando alguma informação não se aplicar, registre "Não aplicável – justificar".
- Cite tecnologias, versões, métricas, limites e SLAs concretos sempre que possível.
- Referencie padrões (`patterns/`), ADRs, constraints e containers quando descrever regras ou integrações.
- Mantenha alinhamento com outros capítulos: se citar entidades, eventos, APIs ou fluxos, garanta que existam em building blocks, runtime, deployment ou decisões relevantes.
- Glossário deve ser atualizado mantendo ordem alfabética, índice e seções (termos, acrônimos, entidades, value objects, eventos, estados, termos evitados).
- Não deixe tabelas ou listas vazias; ofereça pelo menos dois itens por subseção crítica (ex: proteções de segurança, estratégias de teste).

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não reaproveitar conteúdo sem validar com o template correspondente.
- Não deixar seções vazias; utilize "Não aplicável – justificar" apenas quando houver motivação explícita.
- Não mudar o idioma para inglês.
- Não omitir links/referências para padrões, ADRs ou documentação citada no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar conceitos transversais mencionados (segurança, persistência, integração, testes, configuração, domínio, auditoria, i18n).
2. Levantar ferramentas, padrões, métricas, políticas de segurança/compliance, fluxos de dados e validações.
3. Mapear entidades do domínio, value objects, eventos e termos que devem aparecer no glossário.

**Fase 2 – Planejamento**
1. Revisar `specs/08_crosscutting/008_crosscutting-concepts.md` para avaliar conteúdo existente e lacunas.
2. Determinar quais seções do template exigem atualização ou criação de conteúdo (8.1 a 8.10).
3. Planejar referências cruzadas com outros capítulos (containers, cenários, ADRs, patterns) necessárias para manter consistência.
4. Definir lista de termos que precisarão ser atualizados/inseridos no glossário.

**Fase 3 – Redação**
1. `specs/08_crosscutting/008_crosscutting-concepts.md`:
   - Atualizar cada subseção com descrições detalhadas, exemplos de código (quando aplicável), fluxos passo a passo, políticas e métricas.
   - Informar responsabilidades de times, ferramentas adotadas, processos de revisão e monitoramento.
   - Documentar regras de segurança, criptografia, tratamento de erros, validação, integração, testes e configuração, citando padrões/ADRs relevantes.
   - Descrever entidades, value objects e eventos alinhados ao modelo de domínio, com referências a runtime/building blocks.
2. `specs/12_glossary/012_glossary.md`:
   - Inserir/atualizar termos relacionados às seções transversais (ex: nomes de políticas, mecanismos de segurança, ferramentas, métricas).
   - Ajustar seções de acrônimos, entidades, value objects, eventos, estados e termos evitados conforme necessário.
   - Atualizar o índice alfabético para incluir os novos termos.

**Fase 4 – Validação Cruzada**
1. Conferir que todos os termos, entidades, eventos e políticas citados no crosscutting estão refletidos no glossário.
2. Verificar consistência com padrões, ADRs, runtime, deployment e constraints; ajustar links e referências.
3. Garantir ausência de placeholders, listas vazias ou informações contraditórias.
4. Validar datas, status e formatação (tabelas, blocos de código, listas).

**Fase 5 – Saída**
1. Gerar bloco `cat` para cada arquivo atualizado:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após os blocos `cat`, emitir o relatório final:
```text
✅ CROSSCUTTING DOCUMENTADO

Atualizações:
• specs/08_crosscutting/008_crosscutting-concepts.md
• specs/12_glossary/012_glossary.md

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar destaques conforme as principais decisões, políticas ou métricas documentadas.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/08_crosscutting/008_crosscutting-concepts.md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/08_crosscutting/008_crosscutting-concepts.md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/02_constraints/patterns/` (padrões vinculados)
  - `specs/05_building-blocks/` (containers/componentes mencionados)
  - `specs/06_runtime/` (cenários relacionados)
  - `specs/09_decisions/` (ADRs relevantes)

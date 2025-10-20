---
description: Cria os artefatos do design inicial: Container, Componente e Cenário BDD principal.
---

# Plan
<!-- markdownlint-disable MD012 MD029 MD031 MD032 MD036 -->

## User Input

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por detalhar blocos de construção e cenários de runtime deste repositório arc42. Utilize pensamento estruturado, siga os templates em `.codex/template/` e elimine qualquer marcador `[PREENCHER]`, produzindo conteúdo completo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em visão de blocos coerente, com diagramas, responsabilidades e dependências claras.
2. Descrever cenários de runtime, eventos e processamento em background alinhados aos componentes existentes.
3. Manter glossário atualizado com termos, estados e eventos citados nos capítulos 5 e 6.
4. Garantir rastreabilidade entre containers (`CTR-`), componentes (`CMP-`), cenários (`SCN-`) e vocabulário do glossário.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte o template correspondente antes de editar; se um arquivo alvo não existir, copie o template apropriado antes de preencher.
- Preserve headings, numeração, tabelas e blocos de metadados (`**Status**`, `**Última atualização**`).
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (`YYYY-MM-DD`) em todos os arquivos modificados.
- Use slug em *kebab-case* sem acentos, até 50 caracteres; IDs numéricos devem ter três dígitos (`001-999`) e não podem ser duplicados.
- Remova placeholders substituindo-os por conteúdo específico; quando uma informação não se aplicar, registre “Não aplicável – justificar”.
- Diagramas podem ser expressos em Mermaid ou ASCII seguindo o template; sempre descreva a intenção textual caso o diagrama seja simplificado.
- Cada container (`CTR-`) e componente (`CMP-`) deve listar responsabilidades, dependências e vínculo com restrições/padrões relevantes.
- Cenários de runtime (`SCN-`) devem seguir Gherkin e referenciar components/containers envolvidos.
- Garanta que termos do glossário aparecem em ordem alfabética e espelham nomenclatura utilizada nos outros capítulos (containers, componentes, eventos, estados).
- Referencie patterns, regras ou ADRs quando a responsabilidade/comportamento depender de diretrizes existentes.
- Não deixe tabelas parcialmente preenchidas nem listas vazias.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não reutilizar IDs existentes inadvertidamente; incremente sequência para novos arquivos.
- Não deixar seções vazias; utilize "Não aplicável – justificar" quando for o caso.
- Não mudar o idioma para inglês.
- Não omitir referências a padrões, ADRs ou restrições que fundamentem as decisões descritas.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Extrair os principais módulos, serviços, integrações e fluxos mencionados.
2. Identificar containers e componentes críticos, incluindo tecnologias e responsabilidades.
3. Levantar cenários de runtime (sincronos/assíncronos), eventos, estados e jobs recorrentes.
4. Mapear termos de domínio, siglas, estados e eventos que precisam ser acrescentados ao glossário.

**Fase 2 – Planejamento dos Artefatos**
1. Revisar `specs/05_building-blocks` e `specs/06_runtime` para avaliar se componentes, containers ou cenários já existem.
2. Se necessário criar novos arquivos:
   - Usar próximo ID sequencial (máximo existente + 1) para `CTR-`, `CMP-` e `SCN-`.
   - Replicar o template correspondente antes de preencher.
3. Definir granulação do diagrama de blocos (nível de container) e do diagrama de componentes (nível de módulo).
4. Planejar a cobertura de cenários: pelo menos um fluxo principal de usuário, um evento assíncrono e um job/background se citados no briefing.
5. Listar todos os termos que precisarão ser adicionados ou atualizados no glossário.

**Fase 3 – Redação**
1. `specs/05_building-blocks/005_building-block-view.md`:
   - Atualizar visão geral com diagrama (ou descrição textual) abrangendo containers e relações.
   - Preencher detalhes de cada container com tipo, tecnologia, responsabilidade e dependências.
   - Descrever decomposição de componentes críticos, incluindo camadas, interfaces e regras aplicáveis.
   - Atualizar estrutura de diretórios e convenções conforme realidade do projeto.
   - Documentar componentes críticos com responsabilidades, assinaturas principais e dependências externas.
2. `specs/05_building-blocks/components/` e `containers/`:
   - Criar/atualizar arquivos individuais quando for necessário detalhamento adicional, mantendo histórico (`Criado em`, `Atualizado em`, `Versão`).
3. `specs/06_runtime/006_runtime-view.md`:
   - Documentar cenários de execução referenciando `SCN-XXX`; incluir passo a passo Gherkin quando aplicável.
   - Preencher eventos assíncronos com triggers, produtores, consumidores, payload e diagramas de fluxo.
   - Definir máquinas de estado com diagramas Mermaid e tabelas de transições contendo validações e efeitos.
   - Registrar jobs/rotinas em background com frequência, responsabilidades, fluxo, política de retry e timeout.
4. `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md`:
   - Criar ou atualizar arquivos de cenário usando o template oficial, descrevendo contexto, fluxo Gherkin e rastreabilidade com componentes (`CMP-XXX`).
5. `specs/12_glossary/012_glossary.md`:
   - Atualizar termos de negócio, técnicos, acrônimos, entidades, value objects, eventos e estados citados nos capítulos 5 e 6.
   - Preencher “Termos Evitados” quando o briefing apontar nomenclaturas ambíguas.
   - Manter índice alfabético incluindo novos termos adicionados.

**Fase 4 – Validação Cruzada**
1. Conferir que todos os containers, componentes e cenários citados possuem arquivos dedicados (ou justificativa de ausência).
2. Validar coerência entre diagramas, descrições textuais e cenários: nomes e responsabilidades devem coincidir.
3. Checar que cenários (`SCN-`) referenciam componentes/containers corretos e que o glossário contém seus termos.
4. Garantir que datas, versões e status estejam atualizados em cada arquivo tocado.
5. Revisar ortografia, formatação (listas, tabelas, blocos de código) e ausência de placeholders.

**Fase 5 – Saída**
1. Para cada arquivo criado ou atualizado, gerar bloco `cat` completo:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após todos os blocos `cat`, emitir o relatório final:
```text
✅ PLANO DOCUMENTADO

Atualizações:
• specs/05_building-blocks/005_building-block-view.md
• specs/06_runtime/006_runtime-view.md
• specs/12_glossary/012_glossary.md
• specs/05_building-blocks/components/CMP-XXX_[slug].md (quando aplicável)
• specs/05_building-blocks/containers/CTR-XXX_[slug].md (quando aplicável)
• specs/06_runtime/scenarios/SCN-XXX_[slug].md (quando aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar listas de atualizações e destaques conforme artefatos realmente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.codex/template/05_building-blocks/005_building-block-view.md`
  - `.codex/template/05_building-blocks/components/CMP-[NNN]_[slug].md`
  - `.codex/template/05_building-blocks/containers/CTR-[NNN]_[slug].md`
  - `.codex/template/06_runtime/006_runtime-view.md`
  - `.codex/template/06_runtime/scenarios/SCN-[NNN]_[slug].md`
  - `.codex/template/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/05_building-blocks/005_building-block-view.md`
  - `specs/05_building-blocks/components/CMP-[NNN]_[slug].md` (quando necessário)
  - `specs/05_building-blocks/containers/CTR-[NNN]_[slug].md` (quando necessário)
  - `specs/06_runtime/006_runtime-view.md`
  - `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md` (quando necessário)
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/05_building-blocks/` (componentes e containers existentes)
  - `specs/06_runtime/scenarios/` (cenários já documentados)
  - `specs/12_glossary/012_glossary.md` (termos previamente definidos)

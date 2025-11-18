---
description: Absorve uma fonte externa (ex: documento de requisitos) para preencher os 12 capítulos da especificação de forma automatizada.
---

# Import

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por orquestrar a atualização completa da documentação arc42 deste repositório a partir de um documento de referência fornecido pelo time. Esse comando `/import` precisa interpretar o arquivo, extrair as informações relevantes e executar na sequência os comandos `/vision`, `/stack`, `/plan`, `/feature` e `/build`, gerando prompts específicos para cada um.

### Objetivos

1. Ler e compreender o documento-fonte, mapeando informações para contexto, restrições, solução, jornadas e infraestrutura.
2. Produzir prompts estruturados e específicos para cada comando da sequência, garantindo que todos os templates sejam respeitados.
3. Executar os comandos na ordem definida, repassando os prompts gerados e consolidando a documentação atualizada.
4. Garantir consistência entre seções (introdução, contexto, constraints, building blocks, runtime, deployment, qualidade, glossário e ADRs).

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Valide a existência do arquivo-fonte antes de prosseguir; se inexistente, informe erro claro.
- Leia todo o documento-fonte (Markdown, DOC convertido, etc.) e normalize headings, tabelas e listas para extração de dados.
- Ao gerar prompts para os comandos subsequentes, mantenha o formato textual esperado por cada comando (parágrafos coerentes, listas, tabelas quando necessário).
- Respeite a ordem de execução: `/vision` → `/stack` → `/plan` → `/feature` → `/build`. Cada comando deve consumir um prompt dedicado derivado do documento.
- Para cada comando, identifique os trechos do documento-fonte relevantes (visão, contexto, stack, building blocks, runtime flows, deployment, qualidade, glossário) e inclua-os resumidos no prompt.
- Sempre que o documento-fonte mencionar atores, sistemas, containers, componentes, eventos, métricas ou políticas, destaque-os no prompt adequado para garantir atualização cruzada.
- Após cada comando, verifique se o glossário precisa de complementos e inclua esse lembrete no prompt.
- Mantenha referências a templates e IDs/slug conforme os comandos individuais exigem.
- Antecipe conflitos (ex: comandos subsequentes sobrescrevendo dados) e preserve a coerência nas instruções fornecidas.

### Restrições

- Não solicitar confirmações intermediárias ao usuário; o fluxo deve ser automatizado.
- Não executar comandos fora da sequência definida.
- Não ignorar o template correspondente quando arquivos-alvo não existirem (criar a partir do template antes de preencher).
- Não deixar de atualizar o glossário quando novos termos surgirem.
- Não mudar o idioma para inglês.
- Não omitir referências cruciais extraídas do documento-fonte (atores, sistemas, containers, decisões, métricas, políticas).

## Execution Steps

### Procedimento

**Fase 1 – Preparação**
1. Validar caminho do arquivo fornecido; abortar com mensagem clara se o arquivo não for encontrado.
2. Ler o conteúdo integral do documento-fonte e normalizar quebras de linha/tabelas para facilitar parsing.
3. Identificar e realçar seções-chave:
   - Visão, objetivos, stakeholders.
   - Restrições técnicas/organizacionais/legais.
   - Stack tecnológico, arquitetura, padrões.
   - Building blocks (containers/componentes) e dependências.
   - Jornadas runtime, eventos, estados, jobs.
   - Deployment, ambientes, pipelines, observabilidade.
   - Requisitos de qualidade, métricas, testes.
   - Termos de glossário, acrônimos, entidades.

**Fase 2 – Construção dos Prompts**
1. Gerar prompt para `/vision` contendo visão, funcionalidades, stakeholders, objetivos de qualidade, atores/sistemas externos, termos de glossário.
2. Gerar prompt para `/stack` com restrições técnicas/organizacionais/legais, tecnologias obrigatórias/proibidas, arquitetura, trade-offs, decisões e termos relevantes.
3. Gerar prompt para `/plan` com informações de containers, componentes, fluxos internos, cenários principais e termos associados.
4. Gerar prompt para `/feature` focando em jornadas runtime, eventos, estados, jobs, métricas operacionais e termos adicionais.
5. Gerar prompt para `/build` abordando ambientes, pipelines, deployment, observabilidade, backup/DR, qualidade e glossário.
6. Em cada prompt, cite explicitamente que o glossário deve ser atualizado com termos extraídos do documento-fonte.

**Fase 3 – Execução Sequencial**
1. Executar `/vision` com o prompt gerado e aguardar conclusão.
2. Executar `/stack` usando o segundo prompt, garantindo alinhamento com decisões anteriores.
3. Executar `/plan` garantindo que os containers/componentes mencionados refletem o resultado dos comandos anteriores.
4. Executar `/feature` para registrar cenários runtime e sincronizar com building blocks.
5. Executar `/build` para consolidar deployment, qualidade e glossário.
6. Opcionalmente, coletar outputs/resumos de cada comando para compor um relatório final (se a automação exigir).

**Fase 4 – Validação Cruzada**
1. Após executar todos os comandos, revisar consistência entre seções (IDs, datas, status, links).
2. Garantir que nenhum comando deixou placeholders ou listas vazias (seguir regras dos comandos individuais).
3. Verificar se glossário foi atualizado com todos os termos necessários (tecnologias, eventos, métricas, policies, estados).

**Fase 5 – Saída**
1. Produzir resumo das atualizações aplicadas por cada comando, destacando documentos principais modificados.
2. Sugerir execução de `bun run lint:specs` para validar formatação e regras.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Documento-fonte (Markdown/Texto) indicado pelo usuário.
- Templates base:
  - `.claude/templates/arc42/01_introduction/001_introduction-and-goals.md`
  - `.claude/templates/arc42/02_constraints/002_constraints.md`
  - `.claude/templates/arc42/03_context/003_context-and-scope.md`
  - `.claude/templates/arc42/05_building-blocks/` (containers, componentes)
  - `.claude/templates/arc42/06_runtime/`
  - `.claude/templates/arc42/07_deployment/`
  - `.claude/templates/arc42/09_decisions/`
  - `.claude/templates/arc42/10_quality/`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Comandos a serem executados (nesta ordem):
  1. `/vision`
  2. `/stack`
  3. `/plan`
  4. `/feature`
  5. `/build`

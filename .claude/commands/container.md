---
description: Cria ou detalha um bloco de construção de alto nível (ex: API web, app, banco de dados).
---

# Container

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por criar ou atualizar a documentação de containers deste repositório arc42. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em documentação completa do container (tecnologia, responsabilidades, interfaces, dependências, observabilidade, operação).
2. Registrar métricas, planos de contingência, runbooks e histórico de incidentes associados.
3. Garantir alinhamento com building blocks, runtime, deployment, crosscutting e ADRs existentes.
4. Atualizar o glossário com termos, siglas e entidades introduzidos ou detalhados no container.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte o template antes de editar; se o arquivo destino não existir, copie o template antes de preencher.
- Preserve headings, blocos, tabelas, listas e metadados (`Criado em`, `Atualizado em`, `Responsável`, `Status`).
- IDs devem ter três dígitos (`001-999`) e ser únicos; mantenha o ID existente ao atualizar um container já documentado.
- Slugs devem estar em *kebab-case*, sem acentos, com no máximo 60 caracteres.
- Preencha todas as seções do template com dados concretos; quando a informação não se aplicar, use "Não aplicável – justificar".
- Especifique versões de linguagem, frameworks, dependências e ferramentas citadas.
- Forneça comandos reais para build/test/lint/deploy; cite artefatos gerados e imagens Docker.
- Descreva responsabilidades, escopos e limitações, listando explicitamente o que o container não faz.
- Detalhe interfaces expostas (protocolos, portas, endpoints, autenticação), integrações internas/externas e dependências de infraestrutura.
- Documente observabilidade (logs, métricas, traces, alertas), escalabilidade, backups, planos de recuperação e incidentes conhecidos.
- Atualize `specs/12_glossary/012_glossary.md` com termos do container (nomes de filas, eventos, variáveis, processos), mantendo ordem alfabética e índice.
- Referencie patterns, constraints, ADRs, cenários e sistemas relacionados usando links relativos corretos.
- Não deixe tabelas/listas vazias; ofereça pelo menos dois itens onde o template espera múltiplos valores (ex: dependências, features, alertas).

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora dos listados (container e glossário).
- Não reutilizar IDs existentes inadvertidamente; sempre verificar a numeração atual.
- Não deixar seções vazias; utilize "Não aplicável – justificar" somente quando houver motivação clara.
- Não mudar o idioma para inglês.
- Não omitir referências para padrões, ADRs, cenários ou sistemas citados no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar o papel do container, tecnologias, fluxos de dados, integrações, métricas e requisitos operacionais.
2. Levantar dependências internas/externas, ambientes suportados, processos de deploy e observabilidade.
3. Mapear termos que precisarão entrar no glossário (filas, tópicos, variáveis, nomes de jobs, métricas).

**Fase 2 – Planejamento**
1. Verificar se já existe arquivo `CNT-XXX` para o slug informado; se sim, tratar como atualização mantendo ID e histórico.
2. Caso seja novo, determinar o próximo número sequencial disponível (`max + 1`) na pasta `specs/05_building-blocks/containers/`.
3. Listar componentes (`CMP-XXX`), cenários (`SCN-XXX`), atores (`ACT-XXX`), sistemas (`SYS-XXX`) e ADRs que precisam ser referenciados.
4. Planejar quais seções do template exigem dados do briefing e onde buscar informações adicionais (deployment, crosscutting, quality).

**Fase 3 – Redação**
1. Preencher o template do container com informações detalhadas:
   - Identificação, stack tecnológica, dependências, comandos de build/test.
   - Responsabilidades, features, escopo negativo.
   - Interfaces públicas, integrações, contratos de API/mensageria, modelos de autenticação.
   - Dependências internas e externas, tolerância a falhas, fluxos de dados.
   - Observabilidade, alertas, escalabilidade, backups, incidentes, runbooks.
   - Navegação e links cruzados (building blocks, context, runtime, deployment, crosscutting, ADRs, glossário).
2. Atualizar `specs/12_glossary/012_glossary.md` com novos termos ou ajustes decorrentes do container.
   - Inserir termos em ordem alfabética e atualizar índice, acrônimos, entidades, value objects, eventos, estados e termos evitados conforme necessário.

**Fase 4 – Validação Cruzada**
1. Checar consistência de nomes, IDs e links em building blocks, runtime, deployment, crosscutting, decisions e glossário.
2. Garantir que todas as seções do template estejam preenchidas e sem placeholders.
3. Validar que comandos e métricas estejam corretos e coerentes com o briefing.
4. Conferir datas, status e histórico (`Criado em`, `Atualizado em`, `Versão`) mantendo rastreabilidade.

**Fase 5 – Saída**
1. Gerar bloco `cat` para o arquivo do container:
```text
cat > specs/05_building-blocks/containers/CNT-XXX_[slug].md <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Gerar bloco `cat` para `specs/12_glossary/012_glossary.md` se tiver sido atualizado.
3. Após os blocos `cat`, emitir relatório:
```text
✅ CONTAINER DOCUMENTADO

Atualizações:
• specs/05_building-blocks/containers/CNT-XXX_[slug].md
• specs/12_glossary/012_glossary.md (se aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
4. Ajustar listas e destaques conforme arquivos realmente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/05_building-blocks/containers/CNT-[NNN]_[container-name].md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/05_building-blocks/containers/CNT-[NNN]_[slug].md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/05_building-blocks/005_building-block-view.md`
  - `specs/05_building-blocks/components/` (componentes relacionados)
  - `specs/06_runtime/` (cenários que citam o container)
  - `specs/07_deployment/` (infraestrutura associada)
  - `specs/08_crosscutting/` (políticas transversais)
  - `specs/09_decisions/009_architectural-decisions.md` (ADRs relevantes)

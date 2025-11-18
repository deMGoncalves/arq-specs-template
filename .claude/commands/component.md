---
description: Cria ou detalha um módulo de código dentro de um container, focando na sua responsabilidade única (SRP).
---

# Component

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por criar ou atualizar componentes (módulos) deste repositório arc42. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua todo marcador `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em documentação completa do componente, alinhada ao container pai.
2. Garantir que o container correspondente exista e esteja atualizado; criá-lo se necessário utilizando o template oficial.
3. Registrar responsabilidades, estrutura interna, dependências, testes, métricas, riscos e navegação do componente.
4. Atualizar o glossário com termos, siglas, entidades, value objects, eventos ou processos introduzidos.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte o template do componente (e do container, se precisar criá-lo) antes de editar; se o arquivo não existir, copie o template para criar a estrutura inicial.
- Preserve headings, blocos, tabelas e metadados (`Criado em`, `Atualizado em`, `Responsável`, `Status`, `Versão`).
- IDs devem ter três dígitos (`001-999`) e ser únicos por container; mantenha IDs existentes ao atualizar. Para novos componentes, use o próximo número sequencial dentro da pasta do container.
- Slugs devem estar em *kebab-case*, sem acentos, com no máximo 60 caracteres.
- Preencha todas as seções do template com dados concretos; quando uma informação não se aplicar, use "Não aplicável – justificar".
- Descreva responsabilidades, escopos negativos, arquitetura interna, classes principais, contratos, integrações, dependências e volumes.
- Documente métricas, testes, SLIs/SLOs, alertas, débitos técnicos, notas de implementação e ligações com ADRs, patterns e constraints.
- Sempre atualize `specs/12_glossary/012_glossary.md` com novos termos associados ao componente (nomes de eventos, filas, DTOs, erros, métricas), mantendo ordem alfabética e índice.
- Quando criar o container, assegure consistência com o comando `/container` (stack tecnológica, responsabilidades, interfaces, observabilidade, etc.).
- Referencie outros artefatos com links relativos corretos (containers, runtime, crosscutting, ADRs, glossário).
- Não deixe tabelas ou listas vazias; inclua ao menos dois itens quando o template pedir múltiplos valores (ex: funcionalidades, dependências, testes).

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora dos listados (componentes, containers correlatos, glossário).
- Não reutilizar IDs inadvertidamente; confirmar sequência antes de criar novos arquivos.
- Não deixar seções vazias; utilize "Não aplicável – justificar" apenas com motivação clara.
- Não mudar o idioma para inglês.
- Não omitir referências a padrões, ADRs, cenários ou regras de negócio mencionadas no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar qual container abriga o componente, responsabilidades, fluxos de dados, integrações e dependências.
2. Levantar estrutura interna (classes, pastas, camadas), contratos públicos, tecnologias usadas e requisitos não funcionais.
3. Mapear termos e siglas que precisam entrar no glossário.

**Fase 2 – Planejamento**
1. Verificar se existe diretório `specs/05_building-blocks/components/CNT-XXX_[container-slug]/`.
   - Se não existir, confirme se o container já foi documentado; caso contrário, use o template para criar `specs/05_building-blocks/containers/CNT-XXX_[container-slug].md` com o próximo ID disponível.
2. Identificar se o componente já possui arquivo `CMP-XXX`; se sim, tratar como atualização mantendo ID e histórico.
3. Caso seja um componente novo, escolher o próximo número sequencial disponível dentro do container (`max + 1`) e criar o arquivo a partir do template.
4. Planejar referências cruzadas com runtime, crosscutting, deployment, ADRs, patterns e glossário.

**Fase 3 – Redação**
1. Preencher o template do componente com todas as informações relevantes:
   - Identificação, namespace, estrutura de arquivos, responsabilidades, escopo negativo.
   - Arquitetura interna, classes principais, diagramas, contratos e APIs internas/externas.
   - Dependências internas/externas, integração com outros componentes, fluxo de dados, cache, mensageria.
   - Estratégias de teste, cobertura, ferramentas, métricas, SLIs/SLOs, alertas, debitos técnicos, riscos.
   - Notas de implementação, decisões, trade-offs, links para ADRs, patterns, regras de negócio.
2. Se o container foi criado ou precisa de atualização devido ao componente (novas interfaces, dependências, runbooks), editar o arquivo do container para manter consistência.
3. Atualizar `specs/12_glossary/012_glossary.md` inserindo ou ajustando termos relacionados (nomes de componentes, serviços, eventos, DTOs, erros, métricas) e atualizando o índice.

**Fase 4 – Validação Cruzada**
1. Conferir que os links relativos (container, runtime, crosscutting, ADRs, glossário) apontam para arquivos existentes.
2. Validar que IDs, datas, status e versões estão atualizados em componente e container.
3. Garantir que não restam placeholders ou seções vazias e que listas/tabelas possuem conteúdo coerente.
4. Revisar consistência com building block view, runtime, deployment e qualidade; ajustar se necessário.

**Fase 5 – Saída**
1. Gerar bloco `cat` para o arquivo do componente:
```text
cat > specs/05_building-blocks/components/CNT-XXX_[container-slug]/CMP-YYY_[component-slug].md <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Se o container foi criado/atualizado, gerar bloco `cat` correspondente.
3. Gerar bloco `cat` para `specs/12_glossary/012_glossary.md`.
4. Após os blocos `cat`, emitir relatório:
```text
✅ COMPONENTE DOCUMENTADO

Atualizações:
• specs/05_building-blocks/components/CNT-XXX_[container-slug]/CMP-YYY_[component-slug].md
• specs/05_building-blocks/containers/CNT-XXX_[container-slug].md (se aplicável)
• specs/12_glossary/012_glossary.md

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
5. Ajustar listas e destaques conforme artefatos realmente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/05_building-blocks/components/CNT-[NNN]_[container-name]/CMP-[NNN]_[component-name].md`
  - `.claude/templates/arc42/05_building-blocks/containers/CNT-[NNN]_[container-name].md` (caso o container ainda não exista)
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/05_building-blocks/components/CNT-[NNN]_[container-slug]/CMP-[NNN]_[component-slug].md`
  - `specs/05_building-blocks/containers/CNT-[NNN]_[container-slug].md` (quando precisar ser criado/atualizado)
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/05_building-blocks/005_building-block-view.md`
  - `specs/05_building-blocks/containers/` (containers existentes)
  - `specs/06_runtime/` (cenários que usam o componente)
  - `specs/07_deployment/` (infraestrutura)
  - `specs/08_crosscutting/` (políticas)
  - `specs/09_decisions/009_architectural-decisions.md`
  - `specs/12_glossary/012_glossary.md` (termos consolidados)

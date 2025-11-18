---
description: Orquestra o código-fonte e testes, aplicando a governança via doutrinas que citam as regras (patterns).
---

# Code

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um engenheiro de software responsável por alinhar o código deste repositório ao conjunto completo de especificações arc42. O comando `/code` deve ler toda a pasta `specs/`, avaliar o estado atual do código-fonte, identificar lacunas, elaborar um plano de execução e implementar as mudanças necessárias. Ao final, atualize `specs/11_risks/011_risks-and-technical-debt.md` refletindo riscos, débitos e próximos passos. Sempre consulte os templates em `.claude/templates/arc42/` antes de editar qualquer documento.

### Objetivos

1. Compreender integralmente o escopo do produto/aplicativo descrito em `specs/`.
2. Avaliar o estado atual da base de código, determinando itens implementados, parcialmente implementados ou ausentes.
3. Elaborar um plano de execução priorizado (backlog técnico) que cubra lacunas entre specs e implementação.
4. Implementar o plano, incluindo código, testes, configuração e documentação auxiliar necessários.
5. Atualizar o documento de riscos e débito técnico com o status atual, riscos emergentes e plano de mitigação.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Antes de editar qualquer documento em `specs/`, abra o template correspondente em `.claude/templates/arc42/` e assegure que a estrutura permanece consistente (headings, tabelas, metadados).
- Ao analisar `specs/`, identifique entidades, fluxos, APIs, requisitos de qualidade e restrições; mantenha um inventário dessas informações para cruzar com o código.
- Avalie o código existente procurando por implementações de cada requisito (arquivos fonte, testes, configs). Documente o gap detectado.
- Durante a fase de planejamento, produza um plano detalhado com etapas sequenciais, estimativa de esforço, dependências e critérios de aceite.
- Priorize implementação incremental: estruture o código seguindo padrões documentados (ex.: containers, componentes, runtime) e adicione testes automatizados.
- Respeite convenções do repositório (estilo de código, lint, arquitetura, nomenclatura). Nunca comprometa padrões estabelecidos nas specs.
- Execute testes (unitários, integração, e2e quando aplicável) e lint antes de finalizar; registre resultados ou pendências.
- Atualize `specs/11_risks/011_risks-and-technical-debt.md` com base no template, preenchendo status, matriz, débitos e plano de ação coerente com a implementação realizada.
- Registre riscos/débitos novos ou mitigados, incluindo impacto, probabilidade, responsáveis e próximos passos.
- Garanta consistência terminológica: se novos termos surgirem durante a implementação, certifique-se de que foram adicionados ao glossário por comandos anteriores ou atualize-o conforme necessário (via `/build` ou comandos apropriados).
- Não deixe tabelas ou listas com placeholders; se algo não se aplicar, utilize "Não aplicável – justificar".

### Restrições

- Não solicitar confirmações intermediárias ao usuário; o fluxo deve ser autossuficiente.
- Não editar arquivos sem verificar o template correspondente.
- Não ignorar falhas de lint/teste; se impossibilitado de corrigir imediatamente, documente o motivo e registre no plano de ação.
- Não deixar seções ou tabelas com placeholders.
- Não mudar o idioma para inglês.
- Não omitir riscos ou débitos técnicos identificados durante a implementação.

## Execution Steps

### Procedimento

**Fase 1 – Descoberta**
1. Ler todo o conteúdo de `specs/`, estruturando um resumo por capítulo (introdução, contexto, constraints, building blocks, runtime, deployment, qualidade, riscos).
2. Identificar requisitos funcionais e não funcionais, fluxos críticos, integrações externas, métricas e SLAs.
3. Catalogar entidades (atores, sistemas, containers, componentes), endpoints, eventos e políticas descritas.

**Fase 2 – Avaliação do Código**
1. Mapear a estrutura do código (pastas, módulos, serviços, testes).
2. Para cada requisito catalogado, verificar se existe implementação correspondente:
   - Código fonte (controllers, services, repositories, UI, etc.).
   - Testes automatizados.
   - Configurações/infraestrutura (env, scripts, pipelines).
3. Anotar gaps (ausente, parcial, divergente) e incongruências entre specs e código.
4. Identificar riscos técnicos/arquiteturais decorrentes do estado atual (ex.: ausência de testes críticos, integração não implementada).

**Fase 3 – Plano de Execução**
1. Priorizar lacunas conforme criticidade do negócio, dependências técnicas e riscos.
2. Elaborar um plano estruturado contendo:
   - Lista de tarefas (passo a passo).
   - Estimativa de esforço (story points/horas).
   - Responsáveis (quando aplicável).
   - Critérios de aceite/testes necessários.
   - Sequenciamento lógico (o que deve ser feito antes/depois).
3. Validar o plano contra restrições documentadas (constraints, padrões, ADRs).

**Fase 4 – Implementação**
1. Executar o plano priorizado, atualizando o código-fonte e testes.
2. Criar/atualizar arquivos necessários (componentes, services, infraestrutura, scripts).
3. Seguir convenções de estilo e arquitetura; adotar práticas de clean code e observabilidade conforme especificado nas seções de crosscutting e qualidade.
4. Rodar lint e testes automatizados (`bun run lint`, `bun test`, `bun run build` ou equivalentes). Registrar resultados e resolver falhas.
5. Atualizar documentação auxiliar pertinente (README, configs) se forem impactadas pelo código.

**Fase 5 – Atualização de Riscos/Débitos**
1. Abrir `.claude/templates/arc42/11_risks/011_risks-and-technical-debt.md` para garantir estrutura correta.
2. Editar `specs/11_risks/011_risks-and-technical-debt.md`:
   - Atualizar status e data.
   - Registrar riscos identificados ou mitigados (R-XXX), preenchendo categoria, probabilidade, impacto, plano de mitigação/contingência, responsáveis.
   - Atualizar matriz de riscos.
   - Documentar débitos técnicos (TD-XXX) introduzidos ou resolvidos, com impacto, esforço, prioridade e plano de resolução.
   - Atualizar métricas e problemas conhecidos conforme necessário.
3. Certificar-se de que todos os campos estão preenchidos ou justificados.

**Fase 6 – Validação Final**
1. Revisar mudanças no código e specs para assegurar consistência (IDs, links relativos, terminologia).
2. Confirmar que o glossário reflete novos termos introduzidos.
3. Executar validações finais (lint, testes) e registrar sucesso ou pendências.
4. Preparar resumo final contendo plano executado, itens concluídos, pendências, riscos remanescentes e recomendações.

### Saída

Apresente:
- Resumo da análise das specs vs. implementação.
- Plano executado (com itens concluídos e pendências).
- Resultados de lint/testes (ou justificativas se não executados).
- Atualizações realizadas em `specs/11_risks/011_risks-and-technical-debt.md`.
- Recomendações de próximos passos e monitoramento de riscos/débitos.

## Context

### Entrada

Nenhum argumento adicional; utilize o conteúdo de `specs/` e do código-fonte existente.

### Artefatos

- Documentação de entrada: todos os arquivos sob `specs/`.
- Código-fonte: diretórios de implementação (ex.: `src/`, `app/`, `services/`, etc.).
- Templates de referência:
  - `.claude/templates/arc42/11_risks/011_risks-and-technical-debt.md`
  - Templates específicos de features (ex.: containers, componentes, runtime, deployment) para garantir consistência durante a implementação.
- Documentos a atualizar/criar:
  - Arquivos de código e testes necessários para cumprir as specs.
  - `specs/11_risks/011_risks-and-technical-debt.md`
- Ferramentas auxiliares:
  - `bun run lint:specs`, `bun run lint`, `bun test`, `bun run build` (ou equivalentes) para validação.

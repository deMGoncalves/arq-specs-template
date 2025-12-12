---
description: Orquestra o código-fonte e testes, aplicando a governança via doutrinas que citam as regras (patterns).
---

# Code

**ID**: CMD-013
**Categoria**: 💻 Implementation
**Prioridade**: 🔴 P0 (Crítico)
**Fase**: 4
**Arc42 Chapters**: 11

---

## 🎯 O que Faz

Implementa código **guiado por especificações** (spec-driven):
- Lê specs/ completo (Arc42 + BDD + ADRs + Patterns)
- Analisa gap entre especificação e código atual
- Gera plano de implementação priorizado
- Implementa código + testes aplicando as 39 rules
- Atualiza `specs/11_risks/011_risks-and-technical-debt.md`

**IMPORTANTE**: Código sem spec = Alucinação. Sempre spec ANTES de code.

## 📝 Quando Usar

### Obrigatório
- **SEMPRE** após specs estarem completas (após CMD-001 a CMD-012)
- Implementação deve ser última fase, nunca primeira

### Recomendado
- Após `/build` definir infraestrutura
- Com orchestrator (SKL-003) para tasks grandes

### Opcional
- Nunca (código sem spec é anti-pattern)

## 🔗 Pré-requisitos

### Commands
- **TODOS os commands de documentação** (CMD-001 a CMD-012) devem estar executados
- **Essenciais**:
  - CMD-001 (vision): Requisitos funcionais
  - CMD-004 (container): Arquitetura deployável
  - CMD-005 (component): Módulos internos
  - CMD-008 (feature): Cenários BDD
  - CMD-011 (cross): Conceitos transversais
  - CMD-010 (build): Testes e qualidade

## 🔗 Pós-ações

### Próximos Commands
- Nenhum (code é última fase)

### Arquivos Criados/Modificados
- `src/**/*.ts` (código fonte seguindo DDD Co-Located)
- `src/**/*.spec.ts` (testes unitários + integração)
- `specs/11_risks/011_risks-and-technical-debt.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | LOC | Exemplo |
|--------------|-------|-----|---------|
| **LOW** | 1-3h | <500 | Single feature, 1-2 componentes |
| **MEDIUM** | 1-3 dias | 500-2000 | Módulo completo, 3-8 componentes |
| **HIGH** | 1-2 semanas | >2000 | Sistema completo, múltiplos containers |

**CRÍTICO**: HIGH complexity **SEMPRE** requer decomposição via orchestrator (SKL-003) em tasks <100 LOC.

## 💡 Exemplos

### Exemplo 1: Feature Simples (LOW)

**Input**:
```bash
/code
```

**Output**:
```text
📖 Lendo specs/...
  ✓ 12 capítulos Arc42
  ✓ 4 cenários BDD (SCN-001 a SCN-004)
  ✓ 8 patterns ativos

🔍 Gap Analysis:
  SCN-001 (Login): ⚠️ Implementado parcialmente
  SCN-002 (Registro): ❌ Ausente
  SCN-003 (Reset senha): ❌ Ausente
  SCN-004 (Profile): ✅ Completo

📋 Plano de Execução:
  1. [P0] Implementar SCN-002_registro (2h)
  2. [P0] Completar SCN-001_login (validações faltantes) (1h)
  3. [P1] Implementar SCN-003_reset-senha (3h)

🔨 Implementando...
  ✓ src/user-management/api/usuario/registrar-usuario.ts
  ✓ src/user-management/api/usuario/registrar-usuario.spec.ts
  ✓ src/user-management/api/usuario/Usuario.ts (updated)
  ✓ src/user-management/api/usuario/index.ts (updated)

✅ Tests: 142/142 passing (95% coverage)
✅ Lint: No issues
✅ Build: Successful

📝 Atualizado: specs/11_risks/011_risks-and-technical-debt.md
  - Removido: TD-003 (Registro não implementado)
  - Adicionado: TD-008 (Reset senha com rate limit básico, melhorar)
```

### Exemplo 2: Módulo Completo (MEDIUM)

**Input**:
```bash
/code
```

**Pré-condição**: Specs com 8-15 cenários BDD, 3-5 containers, 10-20 componentes

**Output**:
```text
📖 Gap Analysis: 12 features ausentes, 8 parciais, 5 completas

📋 Plano (3 dias, 8 tasks):
  Task 1: [Autenticação] Login + JWT (4h)
  Task 2: [Autenticação] Refresh token (2h)
  Task 3: [Usuários] CRUD usuários (6h)
  Task 4: [Produtos] CRUD produtos (5h)
  Task 5: [Pedidos] Criar pedido (4h)
  Task 6: [Pedidos] Processar pagamento (6h)
  Task 7: [Notificações] Email transacional (3h)
  Task 8: [Integração] Testes e2e críticos (4h)

⚠️ COMPLEXIDADE ALTA DETECTADA: Invocando orchestrator...
[orchestrator decompõe cada task em subtasks <100 LOC]

🔨 Executando tasks sequencialmente...
[developer implementa cada task...]

✅ Resultado:
  - 1847 LOC produzidas
  - 89% cobertura de testes
  - 0 violações das 39 rules
  - 3 débitos técnicos documentados
```

### Exemplo 3: Sistema Completo (HIGH)

**Input**:
```bash
/code
```

**Pré-condição**: Specs completa (todos os 12 capítulos), 30+ cenários BDD

**Fluxo Automático**:
```text
🤖 Analyst detecta complexity=HIGH
  → Invoca architect para design detalhado
  → Architect gera design.md com 15 componentes
  → Invoca orchestrator para decomposição
  → Orchestrator gera tasks.md com 47 tasks de ~80 LOC cada
  → Developer implementa tasks sequencialmente
  → Reviewer valida cada 5 tasks
  → Tester executa suíte completa
  → Documenter atualiza README/docs
  → Guardian valida pré-commit

✅ 2 semanas, 8457 LOC, 92% coverage, 0 regressions
```

---

## 🛠️ Troubleshooting

### Problema 1: "Code gerou código diferente da spec"

**Causa**: Spec ambígua ou contexto muito grande (>5000 linhas)

**Solução**:
1. Revisar spec para ambiguidades:
   - Cenários BDD mal escritos
   - Requisitos contraditórios
   - Falta de acceptance criteria
2. Se spec >2000 LOC, **obrigatório usar orchestrator** para decomposição
3. Implementar incrementalmente (1 cenário por vez)

### Problema 2: "Testes falhando após /code"

**Causa**: Código violou constraints/patterns existentes

**Solução**:
1. Checar `specs/02_constraints/patterns/` - regras violadas?
2. Checar `specs/09_decisions/adrs/` - ADRs respeitadas?
3. Executar gatekeeper (SKL-005) para validação automática:
```bash
# Via skill orchestration
/gatekeeper
```

### Problema 3: "Gap analysis incorreto"

**Causa**: Specs desatualizadas ou código fora de padrão

**Solução**:
1. Executar `/stats` para avaliar saúde das specs
2. Se specs <80% completas, atualizar ANTES de /code
3. Se código existe mas não segue DDD Co-Located:
   - Refatorar para estrutura padrão ANTES de /code
   - Ou aceitar débito técnico e documentar em specs/11_risks

---

## 🛠️ Fluxo Interno Detalhado

### Fase 1: Discovery (Leitura de Specs)
```
1. Ler specs/01_introduction → requisitos funcionais
2. Ler specs/03_context → atores, sistemas externos
3. Ler specs/05_building-blocks → containers, componentes
4. Ler specs/06_runtime/scenarios → cenários BDD (SCN-XXX)
5. Ler specs/08_crosscutting → conceitos transversais (DDD, segurança, etc)
6. Ler specs/02_constraints/patterns → 39+ regras a aplicar
7. Ler specs/09_decisions → ADRs impactantes
```

### Fase 2: Gap Analysis
```
Para cada SCN-XXX em specs/06_runtime/scenarios:
  1. Extrair Given/When/Then
  2. Identificar componentes envolvidos (CMP-XXX)
  3. Buscar implementação em src/
  4. Classificar: ✅ Completo | ⚠️ Parcial | ❌ Ausente
  5. Calcular prioridade: P0 (crítico) > P1 (importante) > P2 (útil)
```

### Fase 3: Planejamento
```
1. Priorizar gaps: P0 → P1 → P2
2. Estimar LOC total
3. SE LOC > 500:
     Invocar orchestrator (SKL-003) para decomposição
   SENÃO:
     Criar plano sequencial direto
4. Definir ordem de implementação (respeitar dependências)
```

### Fase 4: Implementação
```
Para cada task no plano:
  1. Criar/atualizar arquivos em src/ seguindo DDD Co-Located:
     src/[bounded-context]/[container]/[component]/
       - index.ts (aggregate root)
       - criar-[entidade].ts (factory)
       - [acao]-[entidade].ts (use case)
       - [Entidade].ts (entity/value object)
       - [component].spec.ts (tests)

  2. Aplicar Object Calisthenics + SOLID (39 rules):
     - Máx 1 nível de indentação
     - Sem cláusula ELSE
     - Encapsular primitivos
     - Etc. (ver .claude/rules/)

  3. Escrever testes TDD:
     - Unit tests para use cases
     - Integration tests para adapters
     - e2e tests para fluxos críticos

  4. Executar validação:
     - npm test (ou equivalente)
     - npm run lint
     - npm run build
```

### Fase 5: Atualização de Riscos/Débitos
```
1. Abrir specs/11_risks/011_risks-and-technical-debt.md
2. Atualizar:
   - Riscos mitigados (código implementado reduz riscos)
   - Débitos resolvidos (gaps fechados)
   - Novos débitos (atalhos tomados, TODOs)
   - Problemas conhecidos (bugs encontrados durante implementação)
3. Garantir consistência com template
```

---

## 🔗 Relacionado com

### Commands
- **Todos os anteriores** (CMD-001 a CMD-012): [Pré-requisito] Specs completas
- **CMD-008 (feature)**: [Crítico] Cenários BDD são entrada principal
- **CMD-011 (cross)**: [Crítico] Define conceitos técnicos (DDD, segurança)
- **CMD-010 (build)**: [Crítico] Define testes e qualidade

### Skills
- **SKL-003 (orchestrator)**: [OBRIGATÓRIO] Para tasks >500 LOC
- **SKL-004 (developer)**: Implementa código
- **SKL-005 (gatekeeper)**: Valida conformidade durante implementação
- **SKL-007 (tester)**: Executa testes automatizados
- **SKL-006 (reviewer)**: Revisa código pós-implementação

### Rules
- **TODAS as 39 rules** em `.claude/rules/` aplicam durante implementação
- Rules críticas:
  - 001 (1 nível indentação)
  - 002 (Sem ELSE)
  - 003 (Encapsular primitivos)
  - 010 (SRP)
  - 011 (OCP)
  - 014 (DIP)
  - 029 (Error Handling)
  - 035-036 (Testing)

---

**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

---

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

---
description: Cria ou detalha um bloco de construção de alto nível (ex: API web, app, banco de dados).
---

# Container

**ID**: CMD-004
**Categoria**: 🔨 Building
**Prioridade**: 🔴 P0 (Crítico)
**Fase**: 3
**Arc42 Chapters**: 5, 12

---

## 🎯 O que Faz

Documenta **containers** (C4 Model Level 2) - unidades de deployment executáveis:
- Web apps, APIs REST/GraphQL, Workers, CLIs
- Databases (PostgreSQL, MongoDB, Redis)
- Message queues (RabbitMQ, Kafka)
- Serviços externos gerenciados

Cada container recebe ID único (CNT-XXX), tecnologia, responsabilidades, interfaces e dependências.

## 📝 Quando Usar

### Obrigatório
- Após definir stack (CMD-002)
- Antes de criar componentes (CMD-005)
- Antes de implementar código (CMD-013)

### Recomendado
- Para cada serviço/aplicação independente
- Quando arquitetura tem múltiplos processos
- Para documentar boundaries de deployment

### Opcional
- Sistemas monolíticos simples (1 container apenas)

## 🔗 Pré-requisitos

### Commands
- **CMD-001 (vision)**: Fornece contexto
- **CMD-002 (stack)**: Define tecnologias permitidas

### Arquivos Necessários
- `specs/04_solution-strategy/004_solution-strategy.md`

## 🔗 Pós-ações

### Próximos Commands
- **CMD-005 (component)**: Detalhar módulos internos do container
- **CMD-008 (feature)**: Criar cenários que usam containers
- **CMD-010 (build)**: Definir deployment dos containers

### Arquivos Criados
- `specs/05_building-blocks/containers/CNT-[NNN]_[slug].md`
- `specs/05_building-blocks/005_building-block-view.md` (atualizado)
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | Containers | Exemplo |
|--------------|-------|------------|---------|
| **LOW** | 5-10 min | 1-3 | Monolito + DB |
| **MEDIUM** | 10-20 min | 4-8 | Microserviços básicos |
| **HIGH** | 20-40 min | 9-20 | Arquitetura distribuída |

## 💡 Exemplos

### Exemplo 1: Monolito (LOW)

**Input**:
```bash
/container API REST em Node.js 20 + Express que serve frontend React, conecta PostgreSQL 15 e Redis 7 para cache
```

**Output**:
```markdown
- CNT-001_api-rest.md (Node.js + Express + React SSR)
- CNT-002_postgresql.md (Database)
- CNT-003_redis.md (Cache)
```

### Exemplo 2: Microserviços (MEDIUM)

**Input**:
```bash
/container Arquitetura com API Gateway (Node), Auth Service (Node + JWT), Product Service (Node), Payment Service (Python + Stripe), PostgreSQL, Redis, RabbitMQ
```

**Output**:
```markdown
- CNT-001_api-gateway.md (Node.js, roteamento, rate limiting)
- CNT-002_auth-service.md (JWT generation/validation)
- CNT-003_product-service.md (CRUD produtos)
- CNT-004_payment-service.md (Python, integra Stripe)
- CNT-005_postgresql.md
- CNT-006_redis.md
- CNT-007_rabbitmq.md
```

---

## 🛠️ Troubleshooting

### Problema 1: "Container vs Component?"

**Causa**: Confusão entre níveis C4

**Solução**:
- **Container**: Processo separado, deployável independentemente (ex: API, Worker, DB)
- **Component**: Módulo de código dentro de um container (ex: UserService, ProductRepository)

### Problema 2: "Quantos containers criar?"

**Causa**: Over-engineering ou under-engineering

**Solução**: Regra prática:
- **1 container**: Monolito simples (<50 KLOC)
- **3-5 containers**: Bounded contexts claros
- **6-10 containers**: Microserviços
- **>10 containers**: Apenas se justificado (escala, times, linguagens)

## 🔗 Relacionado com

### Commands
- **CMD-002 (stack)**: [Pré-requisito] Define tecnologias
- **CMD-005 (component)**: [Pós-ação] Detalha internamente containers
- **CMD-008 (feature)**: [Pós-ação] Cenários usam containers
- **CMD-010 (build)**: [Pós-ação] Deploy de containers

### Skills
- **SKL-001 (analyst)**: Invoca na Phase 3
- **SKL-002 (architect)**: Invoca na Phase 2 (HIGH complexity)

### Rules
- Não aplicável (apenas documentação)

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

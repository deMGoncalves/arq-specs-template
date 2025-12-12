---
description: Refina conceitos que afetam toda a arquitetura, como modelo de domínio, segurança e tratamento de erros.
---

# Cross

**ID**: CMD-011
**Categoria**: 🏗️ Infrastructure
**Prioridade**: 🟡 P1 (Importante)
**Fase**: 3-4
**Arc42 Chapters**: 8, 12

---

## 🎯 O que Faz

Documenta **conceitos transversais** que afetam múltiplos containers/componentes:
- Modelo de domínio (entidades, value objects, agregados)
- Segurança (autenticação, autorização, criptografia)
- Tratamento de erros e logging
- Persistência, transações e integração
- Testes, configuração, i18n

Complementa building blocks (CMD-004/CMD-005) com aspectos que atravessam a arquitetura.

## 📝 Quando Usar

### Obrigatório
- Após definir building blocks (CMD-004)
- Antes de implementar código (CMD-013)

### Recomendado
- Para padronizar abordagens transversais
- Quando múltiplos containers compartilham conceitos

### Opcional
- Projetos triviais sem conceitos compartilhados

## 🔗 Pré-requisitos

### Commands
- **CMD-002 (stack)**: Define tecnologias base
- **CMD-004 (container)**: Define o que será afetado

## 🔗 Pós-ações

### Próximos Commands
- **CMD-010 (build)**: Operacionaliza conceitos (logs, métricas)
- **CMD-013 (code)**: Implementa práticas documentadas

### Arquivos Criados
- `specs/08_crosscutting/008_crosscutting-concepts.md`
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | Conceitos | Exemplo |
|--------------|-------|-----------|---------|
| **LOW** | 15-25 min | 1-3 | Logging standards básicos |
| **MEDIUM** | 25-40 min | 4-7 | DDD + Segurança + Persistência |
| **HIGH** | 40-60 min | 8-10 | Arquitetura completa multi-concern |

## 💡 Exemplos

### Exemplo 1: Logging Padrão (LOW)

**Input**:
```bash
/cross Logging estruturado com Winston, níveis: ERROR/WARN/INFO/DEBUG, formato JSON
```

**Output**:
```markdown
8.6 Logging e Auditoria:
- Winston (transporte: console + file)
- Formato: JSON com timestamp, level, message, context
- Níveis: ERROR (prod), INFO (staging), DEBUG (dev)
- Não logar: senhas, tokens, PII
```

### Exemplo 2: DDD + Segurança (MEDIUM)

**Input**:
```bash
/cross Entidades: User, Order, Payment. Value objects: Email, CPF. Segurança: JWT com refresh token, bcrypt para senhas
```

**Output**:
```markdown
8.1 Modelo de Domínio:
- Entidades: User (id, email, password), Order (id, items), Payment (id, status)
- Value Objects: Email (validação RFC 5322), CPF (validação dígitos)

8.2 Segurança:
- Autenticação: JWT (access 15min, refresh 7d)
- Passwords: bcrypt rounds=10
- Headers: Authorization: Bearer <token>
```

### Exemplo 3: Arquitetura Completa (HIGH)

**Input**:
```bash
/cross DDD tático completo, OAuth2+OIDC, Postgres transações ACID, RabbitMQ eventos, i18n pt-BR/en-US, Prometheus métricas
```

**Output**:
```markdown
8.1 Domínio: Agregados (User, Order, Product), Repositories, Domain Events
8.2 Segurança: OAuth2 Authorization Code + OIDC (Auth0)
8.3 Persistência: Postgres 15, Prisma ORM, transações SERIALIZABLE
8.4 Comunicação: RabbitMQ exchanges (topic), retry 3x, DLQ
8.5 Testes: Vitest unit (80%), Playwright e2e (críticos)
8.7 Configuração: dotenv, 12-factor, secrets via AWS SSM
8.8 i18n: next-intl, namespaces por módulo
8.9 Monitoramento: Prometheus + Grafana, SLIs response_time, error_rate
```

---

## 🛠️ Troubleshooting

### Problema 1: "Quantos conceitos documentar?"

**Solução**: Priorize por impacto:
- **Crítico**: Segurança, persistência, tratamento de erros
- **Importante**: Logging, testes, configuração
- **Opcional**: i18n (se não internacional), UX patterns

### Problema 2: "Cross vs Building Blocks?"

**Solução**: Critério de decisão:
- **Building Blocks (CMD-004/005)**: O QUE (containers/componentes)
- **Crosscutting (CMD-011)**: COMO (práticas aplicadas a vários blocos)

Exemplo:
- `specs/05_building-blocks/containers/CNT-001_api.md` → container API
- `specs/08_crosscutting/008_crosscutting-concepts.md#8.2` → autenticação aplicada na API e outros containers

## 🔗 Relacionado com

### Commands
- **CMD-002 (stack)**: [Pré-requisito] Stack define conceitos disponíveis
- **CMD-004 (container)**: [Pré-requisito] Containers afetados
- **CMD-010 (build)**: [Pós-ação] Operacionaliza logs/métricas
- **CMD-013 (code)**: [Pós-ação] Implementa conceitos

### Skills
- **SKL-001 (analyst)**: Documenta cross na Phase 3
- **SKL-002 (architect)**: Define conceitos HIGH complexity

### Rules
- **029 (Error Handling)**: Cross 8.6 deve documentar estratégia
- **033 (Logging)**: Cross 8.6 define padrões
- Todas as 39 rules aplicam via crosscutting

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

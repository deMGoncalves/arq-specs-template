---
description: Absorve uma fonte externa (ex: documento de requisitos) para preencher os 12 capítulos da especificação de forma automatizada.
---

# Import

**ID**: CMD-014
**Categoria**: 🔧 Meta
**Prioridade**: 🟢 P2 (Útil)
**Fase**: - (orquestrador)
**Arc42 Chapters**: 1-12 (todos)

---

## 🎯 O que Faz

**Orquestrador** que transforma documentos externos em specs Arc42:
- Lê documento-fonte (PDF, MD, DOC, etc.)
- Extrai informações (visão, stack, building blocks, features, build)
- Executa sequência automática: /vision → /stack → /plan → /feature → /build
- Gera specs/ completa sem intervenção manual

Ideal para **migrar projetos existentes** ou **importar RFPs/propostas**.

## 📝 Quando Usar

### Obrigatório
- Nunca (é um atalho opcional)

### Recomendado
- Migração de projeto legado para Documentation-First
- RFP/proposta técnica a ser transformada em specs
- Sincronizar specs com documento Word do cliente

### Opcional
- Projetos novos (preferir comandos individuais)

## 🔗 Pré-requisitos

### Commands
- Nenhum (import é comando inicial)

## 🔗 Pós-ações

### Próximos Commands
- **CMD-013 (code)**: Implementar specs geradas
- Comandos individuais para ajustes finos

### Arquivos Criados
- Todos os arquivos gerados por /vision, /stack, /plan, /feature, /build
- Potencialmente specs/ completa (12 capítulos)

## 📊 Complexidade

| Complexidade | Tempo | Doc Pages | Exemplo |
|--------------|-------|-----------|---------|
| **LOW** | 10-20 min | 1-5 | README.md de projeto existente |
| **MEDIUM** | 20-40 min | 5-20 | Proposta técnica estruturada |
| **HIGH** | 40-90 min | 20-100 | RFP completa multi-seção |

## 💡 Exemplos

### Exemplo 1: README.md Simples (LOW)

**Input**:
```bash
/import docs/PROJECT.md
```

**Conteúdo de PROJECT.md**:
```markdown
# E-commerce Platform

Sistema de e-commerce B2B para atacadistas.

Stack: Node.js 20, PostgreSQL 15, React 18

Features:
- Login (admin/cliente)
- Catálogo de produtos
- Carrinho e checkout
- Painel admin

Deploy: Docker + Railway
```

**Output**:
```text
📖 Importando docs/PROJECT.md...

🔄 Executando pipeline:
  1/5 → /vision E-commerce B2B para atacadistas...
     ✅ specs/01_introduction/001_introduction-and-goals.md
     ✅ specs/03_context/003_context-and-scope.md

  2/5 → /stack Node.js 20, PostgreSQL 15, React 18...
     ✅ specs/02_constraints/002_constraints.md
     ✅ specs/09_decisions/adrs/ADR-001_stack-tecnologico.md

  3/5 → /plan Sistema com 4 features principais...
     ✅ specs/05_building-blocks/containers/CNT-001_api.md
     ✅ specs/05_building-blocks/containers/CNT-002_web-app.md

  4/5 → /feature Login, Catálogo, Carrinho, Admin...
     ✅ specs/06_runtime/scenarios/SCN-001_login.md (4 cenários)

  5/5 → /build Docker + Railway, PostgreSQL...
     ✅ specs/07_deployment/007_deployment-view.md
     ✅ specs/10_quality/010_quality-requirements.md

✅ IMPORT COMPLETO

Specs geradas:
• 12 capítulos Arc42
• 2 containers (API, Web App)
• 4 cenários BDD
• 1 ADR (stack)

Próximos passos:
- Revisar specs para ajustes finos
- Executar /code para implementar
```

### Exemplo 2: Proposta Técnica (MEDIUM)

**Input**:
```bash
/import proposta-cliente-xyz.pdf
```

**Conteúdo do PDF** (20 páginas):
- Contexto de negócio
- 15 requisitos funcionais
- Stack mandatória (AWS, Java Spring Boot)
- Integrações (Salesforce, SAP)
- SLAs (99.9% uptime, <200ms P95)

**Output**:
```text
📖 Lendo proposta-cliente-xyz.pdf (20 páginas)...

🔍 Extração:
  ✓ 3 stakeholders identificados
  ✓ 15 requisitos funcionais
  ✓ 8 requisitos não-funcionais
  ✓ Stack: AWS, Java Spring Boot, PostgreSQL
  ✓ 2 integrações externas
  ✓ 4 ambientes (dev, staging, prod-us, prod-eu)

🔄 Pipeline (35 min estimado):
  [/vision] → 8 min
  [/stack] → 5 min (+ ADR-001)
  [/actor] → 3 min (Salesforce, SAP como sistemas externos)
  [/plan] → 12 min (3 containers, 8 componentes)
  [/feature] → 10 min (15 cenários BDD)
  [/build] → 7 min (AWS ECS, RDS Multi-AZ, CloudWatch)

✅ Specs completas: 89% cobertura
⚠️ Ações manuais necessárias:
  - Revisar SCN-007 (integração SAP) - detalhes técnicos ausentes no PDF
  - Definir estratégia de testes (specs/10_quality) - não especificada no PDF
```

### Exemplo 3: RFP Complexa (HIGH)

**Input**:
```bash
/import rfp-government-system.docx
```

**Conteúdo** (80 páginas, múltiplas seções, tabelas, diagramas)

**Output**:
```text
📖 Processando RFP (80 páginas)...
⚠️ Documento complexo detectado - executando em modo HIGH

🔍 Análise estrutural:
  Seção 1: Business Case (15 páginas)
  Seção 2: Functional Requirements (30 páginas, 47 requisitos)
  Seção 3: Technical Architecture (20 páginas, diagramas C4)
  Seção 4: Quality Requirements (10 páginas, SLAs/SLOs)
  Seção 5: Deployment Strategy (5 páginas)

🤖 Invocando analyst para processar...
  [analyst orquestra pipeline completo automaticamente]

⏱️ 78 minutos de processamento...

✅ IMPORT COMPLETO

Specs geradas:
• 12 capítulos Arc42 (100% cobertura)
• 47 requisitos funcionais → 47 cenários BDD
• 5 sistemas externos (ACT/SYS)
• 8 containers, 23 componentes
• 12 ADRs (decisões arquiteturais)
• 18 patterns customizados
• SLAs/SLOs completos

📊 Métricas:
- 8947 linhas de specs geradas
- 0 placeholders remanescentes
- 3 seções marcadas para revisão manual

⚠️ Revisão Manual Necessária:
1. specs/06_runtime/scenarios/SCN-032 - Fluxo de auditoria complexo (diagrama ilegível no PDF)
2. specs/08_crosscutting#8.2 - Segurança: RFP menciona "padrão governamental X" não especificado
3. specs/11_risks - Adicionar riscos específicos do contexto governamental
```

---

## 🛠️ Troubleshooting

### Problema 1: "Import gerou specs incompletas"

**Causa**: Documento-fonte ambíguo, mal estruturado ou com informações faltantes

**Solução**:
1. Verificar qualidade do doc: headings claros, seções organizadas?
2. Executar `/stats` para avaliar cobertura das specs geradas
3. Completar gaps manualmente com comandos individuais:
   ```bash
   /feature [requisito faltante]
   /adr [decisão não capturada]
   /cross [conceito transversal ausente]
   ```

### Problema 2: "Formato do documento não suportado"

**Formatos suportados**:
- ✅ Markdown (.md)
- ✅ PDF (.pdf) - via pdftotext
- ✅ Word (.docx) - via pandoc
- ✅ Text (.txt)

**Solução se não suportado**:
1. Converter para Markdown manualmente
2. Usar `/vision`, `/stack`, etc. com copy-paste do conteúdo

### Problema 3: "Pipeline falhou no meio"

**Causa**: Erro em um dos comandos intermediários

**Solução**:
1. Identificar qual comando falhou (logs mostram progresso)
2. Executar comando manualmente para debug:
   ```bash
   /feature [argumentos extraídos do doc]
   ```
3. Continuar pipeline a partir do ponto de falha

---

## 🔗 Relacionado com

### Commands
- **Invoca internamente**:
  - CMD-001 (/vision)
  - CMD-002 (/stack)
  - CMD-003 (/actor) - se houver sistemas externos
  - CMD-006 (/plan) OU CMD-004+CMD-005+CMD-008 individuais
  - CMD-010 (/build)
- **Pós-import**:
  - CMD-013 (/code): Implementar specs geradas
  - CMD-015 (/stats): Avaliar qualidade das specs

### Skills
- **SKL-001 (analyst)**: Pode ser invocado automaticamente para docs complexos (HIGH)

### Rules
- Não aplicável (import é meta-comando)

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

---
description: Define a stack tecnológica, restrições e cria o ADR-001 para justificar a escolha.
---

# Stack

**ID**: CMD-002
**Categoria**: 🏗️ Infrastructure
**Prioridade**: 🔴 P0 (Crítico)
**Fase**: 2
**Arc42 Chapters**: 2, 4, 9, 12

---

## 🎯 O que Faz

Define a fundação técnica do projeto através de:
- Stack tecnológica completa (linguagens, frameworks, databases, infraestrutura)
- Restrições técnicas e organizacionais
- Estratégia de solução de alto nível
- ADR-001 (Architecture Decision Record) justificando escolhas tecnológicas
- Atualização do glossário com termos técnicos

Este comando estabelece o **contrato tecnológico** do projeto, definindo o que pode/deve ser usado e justificando cada escolha com critérios objetivos.

## 📝 Quando Usar

### Obrigatório
- Após definir visão do projeto (CMD-001)
- Antes de criar containers/componentes (CMD-004/CMD-005)
- Quando não existe definição clara de tecnologias
- Antes de iniciar implementação (CMD-013)

### Recomendado
- Ao avaliar mudança significativa de tecnologia
- Para documentar decisões arquiteturais importantes
- Quando stack atual tem problemas críticos

### Opcional
- Para projetos POC que usarão stack temporária

## 🔗 Pré-requisitos

### Commands
- **CMD-001 (vision)**: [Obrigatório] Fornece requisitos não-funcionais que influenciam escolha de stack

### Skills
- Pode ser invocado diretamente ou via **architect** (Phase 2: Architecture - HIGH complexity)

### Arquivos Necessários
- `specs/01_introduction/001_introduction-and-goals.md` (para entender NFRs)

## 🔗 Pós-ações

### Próximos Commands
- **CMD-007 (rule)**: Definir padrões de código específicos da stack escolhida (recomendado)
- **CMD-012 (adr)**: Criar ADRs adicionais para decisões específicas (recomendado)
- **CMD-004 (container)**: Documentar serviços usando a stack definida (**obrigatório**)
- **CMD-011 (cross)**: Definir conceitos transversais baseados na stack (recomendado)

### Arquivos Criados
- `specs/02_constraints/002_constraints.md`
- `specs/04_solution-strategy/004_solution-strategy.md`
- `specs/09_decisions/009_architectural-decisions.md` (índice de ADRs)
- `specs/09_decisions/adrs/ADR-001_stack-tecnologica.md` (primeira ADR)
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo Estimado | ADRs Gerados | Exemplo |
|--------------|----------------|--------------|---------|
| **LOW** | 10-15 min | 1 | Stack padrão (Node.js + PostgreSQL) |
| **MEDIUM** | 15-30 min | 2-3 | Microserviços com mensageria |
| **HIGH** | 30-60 min | 4-6 | Multi-cloud, multi-linguagem, compliance |

## 💡 Exemplos

### Exemplo 1: Stack Simples (LOW Complexity)

**Input**:
```bash
/stack Node.js 20 LTS, PostgreSQL 15, Redis 7, Docker, deploys em Railway
```

**Output**:
```markdown
Arquivos criados/atualizados:
- specs/02_constraints/002_constraints.md
  → Restrições técnicas: Node.js ≥20, PostgreSQL ≥15
  → Restrições organizacionais: Deploy em Railway (PaaS)
  → Convenções: ESLint, Prettier, Conventional Commits

- specs/04_solution-strategy/004_solution-strategy.md
  → Abordagem: API REST monolítica
  → Stack: Node + Express + TypeORM + PostgreSQL + Redis (cache)
  → Justificativa: Simplicidade, produtividade, custo baixo

- specs/09_decisions/adrs/ADR-001_stack-tecnologica.md
  → Status: Aceita
  → Decisão: Node.js 20 + PostgreSQL 15
  → Alternativas avaliadas: Python/Django, Go/Gin
  → Consequências: +Produtividade -Performance (vs Go)

- specs/12_glossary/012_glossary.md
  → Termos: TypeORM, Railway, Redis, Express
```

### Exemplo 2: Microserviços (MEDIUM Complexity)

**Input**:
```bash
/stack Backend: Node.js 20 + NestJS, Python 3.11 (ML service), PostgreSQL 15, MongoDB 6, RabbitMQ 3.12, Redis 7. Frontend: React 18 + Vite. Infra: Docker, Kubernetes, AWS EKS
```

**Output**:
```markdown
Arquivos criados (5 ADRs):
- ADR-001_arquitetura-microservicos.md
  → Decisão: Microserviços vs Monolito
  → Escolhido: Microserviços (4 serviços iniciais)

- ADR-002_linguagens-backend.md
  → Node.js (APIs principais) + Python (ML)
  → Justificativa: Expertise do time + bibliotecas ML

- ADR-003_mensageria-rabbitmq.md
  → RabbitMQ vs Kafka vs SQS
  → Escolhido: RabbitMQ (simplicidade, menor volume)

- ADR-004_databases-poliglota.md
  → PostgreSQL (transacional) + MongoDB (analytics)
  → Trade-off: +Flexibilidade -Complexidade operacional

- ADR-005_orquestracao-kubernetes.md
  → K8s + AWS EKS
  → Justificativa: Escala horizontal, zero-downtime deploys
```

### Exemplo 3: Enterprise (HIGH Complexity)

**Input**:
```bash
/stack Multi-cloud (AWS + Azure), Backend Java 17 Spring Boot + Go 1.21 (gateways), Oracle 19c (legado) + PostgreSQL 15 (novos), Kafka, Redis Cluster, Elasticsearch, Observability: Datadog, Security: Vault, LGPD compliance, ISO 27001
```

**Output**:
```markdown
Arquivos criados (6 ADRs + restrições complexas):
- ADR-001_multi-cloud-strategy.md
  → AWS (compute, databases) + Azure (AD integration)
  → Consequências: +Resiliência +Vendor lock-in mitigation -Complexidade

- ADR-002_java-vs-go.md
  → Java Spring Boot (business logic) + Go (API gateways)
  → Performance crítica: Go (latency <10ms P95)

- ADR-003_oracle-migration-strategy.md
  → Dual-write Oracle + PostgreSQL (fase 1-2 anos)
  → Change Data Capture via Debezium

- ADR-004_event-streaming-kafka.md
  → Kafka vs Pulsar vs EventBridge
  → 100k msgs/sec, retention 30 dias

- ADR-005_observability-datadog.md
  → Métricas + APM + Logs centralizados
  → Compliance: Dados sensíveis não enviados (LGPD)

- ADR-006_secrets-management-vault.md
  → HashiCorp Vault (on-prem)
  → Rotation automática, auditoria completa
```

---

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por documentar a pilha tecnológica e decisões chave deste repositório arc42 em pt-BR. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo.

### Objetivos

1. Transformar o briefing em restrições técnicas/organizacionais coerentes e rastreáveis.
2. Descrever a estratégia de solução e o stack tecnológico completo com justificativas mensuráveis.
3. Registrar decisões arquiteturais (ADRs) consistentes, mantendo histórico, indexação e status atualizados.
4. Garantir que o glossário cubra termos de negócio/técnicos mencionados, evitando ambiguidade.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Sempre consulte o template correspondente em `.claude/templates/arc42/` antes de criar/editar; se o arquivo alvo não existir, replique a estrutura do template antes de preencher.
- Preserve headings, numeração, tabelas e bloco de metadados de cada documento.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (YYYY-MM-DD) em todos os arquivos tocados.
- Remova placeholders quando informação não se aplica, substituindo por "Não aplicável – justificar".
- As tabelas devem ficar totalmente preenchidas com dados concretos (evite "N/A" genérico).
- Use datas reais (YYYY-MM-DD) em todas as decisões/entradas de histórico.
- Para ADRs:
  - O ID segue `ADR-XXX`, com três dígitos sequenciais; mantenha numeração existente ao atualizar.
  - Status deve ser um dentre: Proposta, Aceita, Deprecated, Superseded por ADR-YYY.
  - Atualize índice ao final com título, data e status consistentes.
- No glossário:
  - Ordene termos alfabeticamente por seção.
  - Garanta que sinônimos, contexto e exemplos reflitam o domínio descrito.
- Quando mencionar ferramentas, cite versões (mínimo major) e justificar impactos (performance, segurança, compliance, custo).
- Toda restrição deve apontar impacto (Alto/Médio/Baixo) coerente com justificativa.
- Mantenha consistência entre seções: tecnologias obrigatórias ↔ stack tecnológico ↔ ADRs ↔ glossário.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não reutilizar IDs de ADR já documentados para novas decisões.
- Não deixar seções vazias; quando inaplicável, justificar explicitamente.
- Não sair do idioma português brasileiro.
- Não omitir referências relevantes (links, documentos de apoio) quando citados no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Extrair objetivos de negócio, públicos, restrições pré-existentes e ambientes alvo.
2. Identificar componentes do stack (linguagens, frameworks, infraestrutura, observabilidade, CI/CD).
3. Levantar decisões já tomadas ou pendentes (trade-offs, alternativas rejeitadas, riscos).
4. Listar termos de domínio e siglas que precisam constar no glossário.

**Fase 2 – Planejamento dos Artefatos**
1. Revisar versões atuais dos quatro arquivos verificando campos já preenchidos.
2. Se algum arquivo não existir, copiar o template correspondente antes de iniciar a redação.
3. Mapear quais restrições impactam diretamente as escolhas de tecnologia e decisões posteriores.
4. Determinar quantos ADRs precisam ser criados/atualizados (mínimo um ADR Aceito que represente o stack resultante do briefing).
5. Definir termos obrigatórios no glossário que suportem a linguagem ubíqua do documento.

**Fase 3 – Redação das Seções**
1. `specs/02_constraints/002_constraints.md`:
   - Preencher tabelas de restrições técnicas, organizacionais e legais com IDs, impacto e justificativa alinhados ao briefing.
   - Completar listas de tecnologias obrigatórias/proibidas e convenções (branches, commits, variáveis).
   - Documentar processos de desenvolvimento, compliance e padrões de código referenciando `patterns/` quando necessário.
2. `specs/04_solution-strategy/004_solution-strategy.md`:
   - Completar stack tecnológico principal com versões, justificativas e coerência com restrições.
   - Descrever arquitetura escolhida, camadas, regras de dependência e diagramas textuais (ASCII/Mermaid).
   - Explicitar comunicação interna/externa, gerenciamento de estado, tratamento de erros e estratégias para objetivos de qualidade (com técnicas + ferramentas).
   - Registrar trade-offs arquiteturais comparando alternativas rejeitadas.
3. `specs/09_decisions/009_architectural-decisions.md`:
   - Atualizar ou criar ADRs detalhando contexto, decisão, alternativas, consequências positivas/negativas e riscos.
   - Preencher notas de implementação com diretrizes práticas.
   - Garantir atualização do índice com dados consistentes.
4. `specs/12_glossary/012_glossary.md`:
   - Criar entradas para termos de negócio/técnicos, acrônimos, entidades, value objects, eventos e estados mencionados nos outros documentos.
   - Adicionar seção "Termos Evitados" apontando nomenclaturas ambíguas e alternativas recomendadas.
   - Atualizar índice alfabético cobrindo todos os termos criados.

**Fase 4 – Validação Cruzada**
1. Conferir que restrições e tecnologias citadas aparecem consistentemente em estratégia, ADRs e glossário.
2. Validar que cada ADR possui correspondência com restrições/trade-offs descritos.
3. Revisar ortografia, concordância e formatação (listas, tabelas, negritos).
4. Confirmar que não restaram placeholders, colchetes ou marcações de template.
5. Checar que datas/versões/IDs não conflitam com históricos anteriores.

**Fase 5 – Saída**
1. Para cada arquivo tocado, gerar bloco `cat` completo:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após os blocos `cat`, emitir o relatório final:
```text
✅ STACK DOCUMENTADA

Atualizações:
• specs/02_constraints/002_constraints.md
• specs/04_solution-strategy/004_solution-strategy.md
• specs/09_decisions/009_architectural-decisions.md
• specs/12_glossary/012_glossary.md

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar destaques conforme principais decisões/tecnologias documentadas.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/02_constraints/002_constraints.md`
  - `.claude/templates/arc42/04_solution-strategy/004_solution-strategy.md`
  - `.claude/templates/arc42/09_decisions/009_architectural-decisions.md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/02_constraints/002_constraints.md`
  - `specs/04_solution-strategy/004_solution-strategy.md`
  - `specs/09_decisions/009_architectural-decisions.md`
  - `specs/12_glossary/012_glossary.md`

---

## 🛠️ Troubleshooting

### Problema 1: "Como escolher entre tecnologias similares?"

**Sintoma**: Dúvida entre Node.js vs Python, PostgreSQL vs MySQL, etc.

**Causa**: Falta de critérios objetivos de decisão

**Solução**: Use a matriz de decisão no ADR:

| Critério | Tecnologia A | Tecnologia B | Peso | Vencedor |
|----------|--------------|--------------|------|----------|
| Performance | 8 | 9 | 3x | B (+3) |
| Expertise Time | 9 | 5 | 5x | A (+20) |
| Custo Operacional | 7 | 8 | 2x | B (+2) |
| Ecossistema | 9 | 7 | 2x | A (+4) |
| **Total Ponderado** | **A: +24** | **B: +5** | | **A vence** |

### Problema 2: "ADR-001 já existe - como atualizar stack?"

**Sintoma**: Comando tenta criar ADR-001 mas arquivo já existe

**Causa**: Stack já foi definida anteriormente

**Solução**:
- Se for evolução da stack: Criar ADR-00X (próximo ID) e marcar ADR-001 como "Superseded by ADR-00X"
- Se for correção/atualização: Editar ADR-001 manualmente, atualizar data e adicionar nota no histórico

### Problema 3: "Restrições conflitantes"

**Sintoma**: Requisito pede alta performance MAS baixo custo MAS expertise apenas em Python (que é mais lenta)

**Causa**: Trade-offs não resolvidos

**Solução**:
1. Priorizar requisitos com stakeholders (Performance > Custo > Produtividade?)
2. Documentar trade-off explicitamente no ADR
3. Propor abordagem híbrida (Python + Go para partes críticas)
4. Estabelecer SLOs mensuráveis para validar decisão

**Exemplo de ADR com trade-off**:
```markdown
## Decisão
Usar Python 3.11 apesar de performance inferior ao Go.

## Trade-off Explícito
- ❌ Performance: ~3x mais lento que Go (medido: 300ms vs 100ms P95)
- ✅ Time Expertise: 5 devs Python vs 0 Go
- ✅ Time-to-Market: 2 meses vs 6 meses (estimado)

## Mitigação
- SLO: Response time <500ms P95 (Python atende)
- Plano B: Reescrever gargalos em Go se SLO quebrar (ROI: 6 meses)
```

### Problema 4: "Como documentar dependências de versão?"

**Sintoma**: Incerteza sobre nível de detalhe (Node 20 vs Node 20.10.0)

**Causa**: Falta de padrão de versionamento

**Solução**: Use SemVer consciente:
- **Major version**: Sempre documentar (Node **20**, PostgreSQL **15**)
- **Minor version**: Documentar se feature-specific (Redis **7.2** para Redis Streams)
- **Patch version**: Omitir (gerenciado por Dependabot/Renovate)

**Restrição técnica recomendada**:
```markdown
### Versionamento de Dependências

| Tipo | Política | Exemplo |
|------|----------|---------|
| Runtime | Major fixo | `Node.js ≥20.x <21` |
| Database | Major + Minor | `PostgreSQL ≥15.3` |
| Libraries | Caret (^) | `^20.10.0` (npm) |
```

---

## 🔗 Relacionado com

### Commands
- **CMD-001 (vision)**: [Pré-requisito obrigatório] Fornece NFRs que guiam escolha de stack
- **CMD-007 (rule)**: [Pós-ação recomendada] Define code patterns específicos da stack (ex: TypeScript strict mode, linting ESLint)
- **CMD-012 (adr)**: [Complementar] Cria ADRs adicionais para decisões específicas (ex: ADR-002 escolha de ORM, ADR-003 estratégia de cache)
- **CMD-004 (container)**: [Pós-ação obrigatória] Containers devem usar tecnologias definidas neste comando
- **CMD-011 (cross)**: [Pós-ação recomendada] Conceitos transversais (logging, monitoring) dependem da stack
- **CMD-010 (build)**: [Pós-ação obrigatória] Deployment/CI-CD baseado na stack escolhida

### Skills
- **SKL-002 (architect)**: Invoca este command automaticamente na Phase 2 (Architecture) para projetos HIGH complexity
- **SKL-001 (analyst)**: Pode invocar diretamente para projetos LOW/MEDIUM complexity

### Rules
Não há regras de código aplicadas diretamente (este comando gera documentação), mas as escolhas de stack influenciam quais rules aplicar:

**Se Node.js/TypeScript**:
- Todas as 39 rules aplicam
- Ênfase em 027 (imports organizados), 030 (evitar eval), 033 (max 3 params)

**Se Java/Spring**:
- Rules SOLID (010-014) são críticas
- Rules de Package (015-020) fortemente aplicadas
- Calisthenics adaptadas para Java idioms

**Se Go**:
- Rules estruturais (001-009) aplicam com adaptações (Go não tem classes)
- Ênfase em simplicidade (022 KISS, 023 YAGNI)

---

**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

---
description: Define a estratégia de deploy, pipeline, RTO/RPO e os requisitos de qualidade como SLOs e métricas.
---

# Build

**ID**: CMD-010
**Categoria**: 🏗️ Infrastructure
**Prioridade**: 🔴 P0 (Crítico)
**Fase**: 3-4
**Arc42 Chapters**: 7, 10, 12

---

## 🎯 O que Faz

Define **estratégia de deployment e qualidade**:
- Ambientes (dev, staging, prod)
- Pipeline CI/CD (build, test, deploy)
- Infraestrutura (Docker, K8s, cloud)
- SLOs, métricas, monitoramento
- RTO/RPO, backup, disaster recovery

## 📝 Quando Usar

### Obrigatório
- Antes de fazer primeiro deploy
- Antes de implementar código (CMD-013)

### Recomendado
- Após definir containers (CMD-004)
- Para documentar requisitos não-funcionais

### Opcional
- POCs que não vão para produção

## 🔗 Pré-requisitos

### Commands
- **CMD-002 (stack)**: Define tecnologias de infra
- **CMD-004 (container)**: Define o que será deployado

## 🔗 Pós-ações

### Próximos Commands
- **CMD-011 (cross)**: Conceitos transversais (logging, monitoring)
- **CMD-013 (code)**: Implementação

### Arquivos Criados
- `specs/07_deployment/007_deployment-view.md`
- `specs/10_quality/010_quality-requirements.md`
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | Ambientes | Exemplo |
|--------------|-------|-----------|---------|
| **LOW** | 15-25 min | 2 | Dev + Prod em PaaS (Railway, Render) |
| **MEDIUM** | 25-40 min | 3 | Dev + Staging + Prod em cloud |
| **HIGH** | 40-90 min | 4+ | Multi-cloud, multi-region, DR |

## 💡 Exemplos

### Exemplo 1: PaaS Simples (LOW)

**Input**:
```bash
/build Deploy em Railway, CI via GitHub Actions, PostgreSQL gerenciado, backup diário, RTO 4h
```

**Output**:
```markdown
- Ambientes: dev (local), prod (Railway)
- Pipeline: GitHub Actions → build → test → deploy Railway
- SLOs: Uptime 99%, response time <500ms P95
- Backup: Automated daily (Railway)
```

### Exemplo 2: Kubernetes (HIGH)

**Input**:
```bash
/build Deploy em AWS EKS multi-AZ, ArgoCD GitOps, RDS Multi-AZ, Redis Cluster, monitoring Datadog, RTO 1h, RPO 15min, Blue-Green deployment
```

**Output**:
```markdown
- Ambientes: dev, staging, prod-us-east-1, prod-eu-west-1
- Pipeline: GitHub Actions → ArgoCD → EKS (Blue-Green)
- Infrastructure: EKS 3 AZs, RDS Multi-AZ, Redis Cluster 6 nodes
- SLOs: 99.9% uptime, <200ms P95, <1s P99
- DR: Multi-region active-passive, RPO 15min, RTO 1h
```

---

## 🛠️ Troubleshooting

### Problema 1: "Qual RTO/RPO definir?"

**Solução**: Baseie em impacto de negócio:
- **RTO** (Recovery Time Objective): Quanto tempo pode ficar fora?
  - Sistema crítico: <1h
  - Sistema importante: <4h
  - Sistema secundário: <24h
- **RPO** (Recovery Point Objective): Quanto dado pode perder?
  - Transacional: <5min
  - Analítico: <1h
  - Arquivo: <24h

### Problema 2: "Quantos ambientes criar?"

**Solução**: Mínimo recomendado:
- **2 ambientes**: dev (local) + prod
- **3 ambientes**: dev + staging + prod (recomendado)
- **4+ ambientes**: +DR, +canary (enterprise)

## 🔗 Relacionado com

### Commands
- **CMD-002 (stack)**: [Pré-requisito] Stack define infra
- **CMD-004 (container)**: [Pré-requisito] O que deployar
- **CMD-011 (cross)**: [Pós-ação] Logging/monitoring
- **CMD-013 (code)**: [Pós-ação] Implementação

### Skills
- **SKL-001 (analyst)**: Define build na Phase 3
- **SKL-009 (guardian)**: Valida antes de deploy

### Rules
- **035-036 (Testing)**: Pipeline deve rodar testes
- Todas as rules aplicam no build

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

Você é um arquiteto de software responsável por registrar infraestrutura, processos de deploy e requisitos de qualidade deste repositório arc42. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em documentação completa de deployment, abrangendo ambientes, pipelines, observabilidade e escalabilidade.
2. Definir cenários e métricas de qualidade mensuráveis, incluindo estratégias de teste e monitoramento contínuo.
3. Manter o glossário sincronizado com novos termos técnicos, ambientes, ferramentas e indicadores introduzidos.
4. Garantir consistência e rastreabilidade entre infraestrutura, requisitos de qualidade e vocabulário comum do time.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte o template correspondente em `.claude/templates/arc42/` antes de editar; se o arquivo destino não existir, copie o template e só então preencha.
- Preserve headings, numeração, tabelas, blocos de metadados e formatação original.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (`YYYY-MM-DD`) em todos os arquivos tocados.
- Remova placeholders substituindo por dados específicos; quando a informação não se aplicar, utilize "Não aplicável – justificar".
- Tabelas devem ser preenchidas com valores concretos (números, URLs, ferramentas, versões) sempre que possível.
- Diagramas podem ser representados em ASCII ou Mermaid, desde que acompanhados de descrição textual clara.
- Para métricas e requisitos de qualidade, forneça metas numéricas e ferramentas de medição.
- Alinhe ambientes, pipelines e testes com restrições e decisões prévias (patterns, ADRs, constraints).
- Garanta que termos adicionados ao glossário reflitam nomenclatura usada nos arquivos atualizados.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não deixar seções vazias; utilize "Não aplicável – justificar" quando necessário.
- Não reutilizar datas anteriores; sempre registrar a data atual nas atualizações.
- Não mudar o idioma para inglês.
- Não omitir referências relevantes (links para runbooks, ferramentas, dashboards) quando existirem no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Extrair informações sobre ambientes (dev/staging/prod), infraestrutura, ferramentas de CI/CD, observabilidade e políticas de backup.
2. Identificar requisitos não funcionais prioritários, metas de desempenho, segurança, disponibilidade e manutenibilidade.
3. Levantar práticas de testes (performance, carga, stress, segurança) e monitoramento (SLI/SLO/SLA).
4. Listar termos técnicos, ferramentas, siglas e indicadores que precisam ser registrados no glossário.

**Fase 2 – Planejamento dos Artefatos**
1. Revisar os arquivos atuais para entender conteúdo existente e lacunas.
2. Definir estrutura de ambientes e componentes de infraestrutura a serem descritos (computação, rede, dados, observabilidade).
3. Mapear cenários de qualidade necessários (mínimo cinco, cobrindo diferentes atributos) e respectivas métricas.
4. Determinar quais termos novos serão incluídos no glossário e como mantê-los alfabeticamente organizados.

**Fase 3 – Redação**
1. `specs/07_deployment/007_deployment-view.md`:
   - Atualizar diagrama/descrição da infraestrutura incluindo regiões, VPCs, sub-redes, clusters, filas, etc.
   - Documentar ambientes (produção, staging, desenvolvimento) com componentes, quantidades, configurações, URLs e comandos de setup local.
   - Preencher variáveis de ambiente, gestão de segredos e diferenças entre ambientes.
   - Descrever pipeline de deploy, estratégia (blue/green/canary/rolling), etapas de CI/CD, gatilhos, rollback e monitoramento.
   - Definir ferramentas de observabilidade, dashboards, alertas, backup/DR, RTO/RPO e estratégias de escalabilidade.
2. `specs/10_quality/010_quality-requirements.md`:
   - Construir árvore de qualidade refletindo prioridades do briefing.
   - Documentar cenários de qualidade (`Q-XXX`) com atributo, estímulo, artefato, ambiente, resposta, medida, prioridade e status.
   - Preencher métricas por atributo, especificando metas, métodos de medição e ferramentas.
   - Descrever testes (performance, carga, stress, segurança) com ferramentas, parâmetros e frequência.
   - Registrar SLIs, SLOs e SLAs com definições e metas.
3. `specs/12_glossary/012_glossary.md`:
   - Adicionar/atualizar termos técnicos (ex: nomes de ambientes, ferramentas, pipelines, métricas) e de negócio relacionados às seções 7 e 10.
   - Atualizar acrônimos, entidades, eventos, estados e termos evitados quando introduzidos no briefing.
   - Manter índice alfabético cobrindo todos os termos novos.

**Fase 4 – Validação Cruzada**
1. Conferir consistência entre ambientes, componentes e pipelines descritos e os requisitos de qualidade associados.
2. Validar que cada cenário/métrica de qualidade possui monitoramento ou teste correspondente no deployment.
3. Checar se termos presentes nos arquivos atualizados constam no glossário com definições claras.
4. Revisar alinhamento com restrições/princípios previamente definidos (patterns, ADRs).
5. Garantir ausência de placeholders, datas desatualizadas ou informações contraditórias.

**Fase 5 – Saída**
1. Para cada arquivo criado ou atualizado, gerar bloco `cat` completo:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após todos os blocos `cat`, emitir o relatório final:
```text
✅ BUILD DOCUMENTADO

Atualizações:
• specs/07_deployment/007_deployment-view.md
• specs/10_quality/010_quality-requirements.md
• specs/12_glossary/012_glossary.md

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar destaques conforme principais decisões ou métricas documentadas.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/07_deployment/007_deployment-view.md`
  - `.claude/templates/arc42/10_quality/010_quality-requirements.md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/07_deployment/007_deployment-view.md`
  - `specs/10_quality/010_quality-requirements.md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/07_deployment/` (runbooks, diagramas existentes)
  - `specs/10_quality/` (cenários e métricas já registrados)
  - `specs/12_glossary/012_glossary.md` (termos já definidos)

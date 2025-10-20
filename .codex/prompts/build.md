---
description: Define a estratégia de deploy, pipeline, RTO/RPO e os requisitos de qualidade como SLOs e métricas.
---

# Build
<!-- markdownlint-disable MD012 MD029 MD031 MD032 MD036 -->

## User Input

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por registrar infraestrutura, processos de deploy e requisitos de qualidade deste repositório arc42. Use pensamento estruturado, siga os templates em `.codex/template/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em documentação completa de deployment, abrangendo ambientes, pipelines, observabilidade e escalabilidade.
2. Definir cenários e métricas de qualidade mensuráveis, incluindo estratégias de teste e monitoramento contínuo.
3. Manter o glossário sincronizado com novos termos técnicos, ambientes, ferramentas e indicadores introduzidos.
4. Garantir consistência e rastreabilidade entre infraestrutura, requisitos de qualidade e vocabulário comum do time.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte o template correspondente em `.codex/template/` antes de editar; se o arquivo destino não existir, copie o template e só então preencha.
- Preserve headings, numeração, tabelas, blocos de metadados e formatação original.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (`YYYY-MM-DD`) em todos os arquivos tocados.
- Remova placeholders substituindo por dados específicos; quando a informação não se aplicar, utilize “Não aplicável – justificar”.
- Tabelas devem ser preenchidas com valores concretos (números, URLs, ferramentas, versões) sempre que possível.
- Diagramas podem ser representados em ASCII ou Mermaid, desde que acompanhados de descrição textual clara.
- Para métricas e requisitos de qualidade, forneça metas numéricas e ferramentas de medição.
- Alinhe ambientes, pipelines e testes com restrições e decisões prévias (patterns, ADRs, constraints).
- Garanta que termos adicionados ao glossário reflitam nomenclatura usada nos arquivos atualizados.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não deixar seções vazias; utilize “Não aplicável – justificar” quando necessário.
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
  - `.codex/template/07_deployment/007_deployment-view.md`
  - `.codex/template/10_quality/010_quality-requirements.md`
  - `.codex/template/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/07_deployment/007_deployment-view.md`
  - `specs/10_quality/010_quality-requirements.md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/07_deployment/` (runbooks, diagramas existentes)
  - `specs/10_quality/` (cenários e métricas já registrados)
  - `specs/12_glossary/012_glossary.md` (termos já definidos)

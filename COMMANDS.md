# ADR-004: Especificação de Comandos do Co-Piloto Arquitetural (CLI/AI)

**Data**: 2025-10-10 **Status**: 🟢 Proposta **Decisores**: [PREENCHER: Time de Desenvolvimento e Arquitetura] **Área de Impacto**: Workflow de Desenvolvimento, Governança de Código, Documentação.

## 📋 Contexto

O projeto adota o **Spec Driven Development (SDD)**, onde a documentação (`/specs`) é o *blueprint* que guia a implementação e a qualidade. A manutenção manual desta estrutura (arc42, C4, ADRs) é demorada, propensa a erros e gera alto custo cognitivo, resultando em débito de documentação e desvio arquitetural.

Esta proposta formaliza a implementação de **14 comandos de palavra única** no Co-Piloto Arquitetural, projetados para preencher e manter a especificação de forma automatizada. O objetivo é transformar a documentação em um ativo acionável, garantindo que a **Governança Técnica** (Padrões do Capítulo 2) seja aplicada desde a fase de design, conforme a missão do Co-Piloto [cite: demgoncalves/arq-specs-template/arq-specs-template-6fe0630c1d9c33feacc33bb68b02e1cbb432e1d7/.GEMINI.md].

## ✅ Decisão: Implementar Fluxos de Comando por Nível

A interface do Co-Piloto será baseada em dois níveis de comandos para otimizar o fluxo de trabalho:

1. **Comandos Standard:** Um conjunto de 6 comandos que cobrem o ciclo de vida essencial de uma feature, desde a visão até a implementação e o deploy.
2. **Comandos Avançados:** Um conjunto de 8 comandos para refinamento, detalhamento de C4, gestão de regras e outras tarefas granulares.

## 🚀 Fluxos de Trabalho Propostos

O time terá dois caminhos principais para desenvolver, ambos culminando no comando `code`.

### Opção A: Fluxo Acelerado com `import` (O "Comando Moleza")

Ideal para quando uma especificação detalhada (ex: um documento de requisitos, um spike técnico ou um RFC) já existe.

1. **`import`**: Absorve a fonte externa, cria os ADRs de justificativa e preenche a Visão, Stack, Plano de Design e Estratégia de Build em uma única etapa.
2. **`code`**: Implementa o código-fonte e os testes, aplicando a governança com base na especificação importada.

### Opção B: Fluxo Iterativo e Detalhado

Ideal para projetos *greenfield* ou quando o design está sendo construído de forma incremental.

1. **`vision`** (Definir o Quê) → **`stack`** (Definir a Tecnologia) → **`plan`** (Definir o Design C4) → **`build`** (Definir a Entrega e Qualidade).
2. **`code`** (Implementar e Finalizar).

## 🛠️ Mapeamento Detalhado dos Comandos (Ações em Arquivos)

Abaixo, o detalhamento completo do que cada comando deve implementar ou alterar.

### I. Comandos Standard (6 Comandos Essenciais)

| **Comando** | **Foco Principal** | **Fase CDD** | **Criação/Alteração de Arquivos na specs/** |
|:---|:---|:---|:---|
| **`vision`** | Constituição e Escopo | SPECIFY | **Altera:**  `specs/README.md` (Título), `01_introduction/001_introduction-and-goals.md` (Visão, Objetivos), `03_context/003_context-and-scope.md` (Escopo), `12_glossary/012_glossary.md` (Termos Iniciais). |
| **`stack`** | Estratégia Técnica | SPECIFY / PLAN | **Altera:**  `04_solution-strategy/004_solution-strategy.md` (Stack Principal), `02_constraints/002_constraints.md` (Restrições Técnicas). **Cria:**  `09_decisions/adrs/ADR-001_stack.md` (Justificativa da Stack). |
| **`plan`** | Orquestração do Design C4 | PLAN | **Cria:**  `05_building-blocks/containers/CNT-001_[...].md`, `05_building-blocks/components/CNT-001_[...]/CMP-001_[...].md`, e `06_runtime/scenarios/SCN-001_[...].md` (Cenário BDD). **Altera:**  `05_building-blocks/005_building-block-view.md`. |
| **`import`** | Importação Massiva de Fonte Externa | SPECIFY / PLAN | **Cria/Altera:** Potencialmente **todos os 12 capítulos**, traduzindo a fonte externa para a estrutura interna. Cria múltiplos `ADR-XXX.md` para justificar as decisões importadas. |
| **`build`** | Implantação e Qualidade | IMPLEMENT / REFINE | **Altera:**  `07_deployment/007_deployment-view.md` (Infraestrutura, Pipeline, RTO/RPO) e `10_quality/010_quality-requirements.md` (SLIs/SLOs, Métricas de Qualidade). |
| **`code`** | Implementação de Código | IMPLEMENT / REFINE | **Cria:** Arquivo de **código-fonte** (`src/...`) e **teste unitário/integração** (`tests/...`). **Aplica Governança:** O código gerado DEVE conter docstrings que citam `PATTERN-ID`s críticos (ex: DIP, SRP) e o `SCN-XXX` relevante. **Altera:**  `11_risks/011_risks-and-technical-debt.md` se houver introdução de Débito Técnico. |

### II. Comandos Avançados (8 Comandos de Refinamento)

| **Comando** | **Foco Principal** | **Criação/Alteração de Arquivos na specs/** |
|:---|:---|:---|
| **`actor`** | Ator/Sistema (C4 L1) | **Cria:**  `03_context/actors/ACT-XXX.md` (se tipo `user`) ou `03_context/systems/SYS-XXX.md` (se tipo `system`). **Altera:**  `03_context/003_context-and-scope.md` (Tabelas de Atores/Sistemas). |
| **`cross`** | Conceitos Transversais | **Altera:**  `08_crosscutting/008_crosscutting-concepts.md` (Modelo de Domínio, Segurança, Persistência, Tratamento de Erros) e `12_glossary/012_glossary.md` (Value Objects, Entidades). |
| **`container`** | Detalhe de Container (C4 L2) | **Cria/Altera:**  `05_building-blocks/containers/CNT-XXX.md`, detalhando Tecnologias, Interfaces e Dependências. |
| **`module`** | Detalhe de Componente (C4 L3) | **Cria/Altera:**  `05_building-blocks/components/CNT-XXX/CMP-XXX.md`, detalhando SRP, Estrutura Interna (Service/Repo/Controller), e DTOs. |
| **`feature`** | Rastreabilidade Funcional | **Cria:** Novo `06_runtime/scenarios/SCN-XXX.md`. **Altera:**  `ACT-XXX.md` (Funcionalidades Usadas) e `CNT-XXX.md` (Funcionalidades). |
| **`flow`** | Refino de Cenário BDD | **Cria:** Novo `06_runtime/scenarios/SCN-XXX.md` para fluxos alternativos (erros, *edge cases*). **Altera:**  `06_runtime/006_runtime-view.md` (Visão de Runtime). |
| **`adr`** | Decisão Arquitetural | **Cria/Altera:**  `09_decisions/adrs/ADR-XXX.md`. **Altera:**  `09_decisions/009_architectural-decisions.md` (Índice de ADRs). |
| **`rule`** | Governança Técnica | **Cria/Altera:**  `02_constraints/patterns/PATTERN-ID.md`, garantindo **Critérios Objetivos** mensuráveis, conforme o `pattern.toml`. |

## 🎯 Consequências e Trade-offs

| **Consequência** | **Impacto** | **Mitigação** |
|:---|:---|:---|
| **Redução do Custo Cognitivo** | **Positivo:** O desenvolvedor foca na intenção (ex: `plan`), e o Co-Piloto lida com a numeração, links e a estrutura de arquivos. | A interface de CLI deve ser clara e fornecer feedback sobre os arquivos criados/alterados. |
| **Governança no Ponto de Dor** | **Positivo:** A aplicação das `RULE`s (DIP, SRP) é feita pelo comando `code`, reduzindo o débito técnico inerente e reforçando a qualidade. | A base de `rule`s deve ser mantida atualizada e com critérios objetivos claros. |
| **Risco do Comando `import`** | **Negativo:** O comando `import` pode preencher a especificação com dados insuficientes ou ambíguos se a fonte for de baixa qualidade. | Forçar o `import` a criar **ADRs incompletos** (Status: Proposta) e marcar seções críticas como `[PREENCHER: REVISÃO NECESSÁRIA]`, exigindo validação humana. |

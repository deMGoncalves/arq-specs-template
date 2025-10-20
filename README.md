# Documentation-First Approach

> Documentar antes de codar não é burocracia — é como times seniores criam software antifrágil em plena era de agentes.

## Por que agora

- 🕒 Times distribuídos queimam **12 horas por semana** em reuniões síncronas tentando alinhar requisitos (McKinsey Global Institute, 2023).
- 📉 **25% da produtividade** de desenvolvimento se perde em transferência de conhecimento ad-hoc (Stack Overflow Developer Survey, 2024).
- 🧠 **67% dos líderes de engenharia** apontam “conhecimento tribal” como maior risco de escala (State of DevOps, 2024).
- 📈 Organizações que adotam Documentation-First relatam **até 60% menos tempo de reunião** e **40% de onboarding mais rápido** para novos devs (Full Scale, 2024).
- 💸 Iniciativas estruturadas de documentação-first entregam **ROI superior a 300% no primeiro ano**, graças à redução de incidentes, re-trabalho e desalinhamentos.

Agentes de IA só são tão bons quanto a base documental que os alimenta. Sem uma fonte de verdade versionada, agentes geram código divergente, definem arquitetura por conta própria e criam débitos técnicos invisíveis. O Documentation-First Approach transforma o repositório em um oráculo auditável, pronto para humanos e máquinas.

## Como usar este boilerplate

 Este repositório é um boilerplate Documentation-First. Ao iniciar um novo projeto, copie apenas os artefatos relacionados ao agente que pretende operar localmente:

- **Gemini CLI**: duplique a pasta `./.gemini/`; as instruções ficam centralizadas em `AGENTS.md`, seguindo o padrão [AGENTS.md](https://agents.md/).
- **Cursor IDE/CLI**: duplique a pasta `./.cursor/` (prompts e templates), mantenha os artefatos em `.cursor/template/` sincronizados com o conteúdo de `specs/` e referencie `AGENTS.md` como manual.
- **Codex CLI**: duplique a pasta `./.codex/` e utilize `AGENTS.md` para preservar a estrutura de prompts e o manual de operação.

Adotamos o padrão [AGENTS.md](https://agents.md/) para organizar instruções de agentes: “README.md files are for humans: quick starts, project descriptions, and contribution guidelines.” O `AGENTS.md` deste repositório expande essas diretrizes para o contexto Documentation-First.

Outros agentes devem seguir o mesmo padrão (`@pasta-do-agente/` + guia principal em Markdown). Após copiar, ajuste IDs, datas e status para refletir o contexto do novo repositório.

## Filosofia Documentation-Driven Development

1. Escreva a documentação **antes** do código; o que não está documentado oficialmente ainda não existe.
2. Colete feedback sobre a doc e ajuste até que a equipe concorde com o escopo.
3. Desenvolva com TDD alinhando testes ao que foi descrito.
4. Promova para staging e valide com testes funcionais guiados pela doc.
5. Entregue a feature, publique a documentação atualizada e incremente versões.
6. Se algo mudar, **a doc é o primeiro artefato a ser alterado**; testes e código acompanham.

Essa cadência elimina amnésia decisória e garante que agentes, revisores e executivos leiam a mesma narrativa técnica.

## Benefícios comprovados

| Métrica monitorada                              | Impacto médio após adoção do Documentation-First Approach |
| ---------------------------------------------- | --------------------------------------------------------- |
| Tempo de onboarding de novos devs              | 30–45% mais rápido |
| Solicitações de conhecimento em chat/email     | 40% de redução |
| Tempo de resolução de bugs                     | 25% de redução |
| Eficiência de code review                      | 28% de melhora |
| Previsibilidade de entrega de features         | 35% de melhora |
| Horas semanais de reunião (caso fintech 200 devs) | 15h → 6h (**-60%**) |
| Time-to-market médio de novidades (caso fintech) | 48 dias → 35 dias (**-27%**) |

## Fluxos de trabalho recomendados

### Opção A — Fluxo Acelerado (“Moleza”)

Ideal quando já existe uma especificação robusta (RFP, BRD, discovery completo).

1. `import` — absorve a fonte externa e preenche os 12 capítulos do arc42 de uma vez.
2. `code` — implementa código e testes conforme a especificação consolidada.

### Opção B — Desenvolvimento Iterativo

Perfeito para projetos greenfield ou times que precisam de checkpoints formais.

1. `vision` — define visão, escopo, objetivos e stakeholders.
2. `stack` — consolida stack tecnológica, restrições e ADR-001.
3. `plan` — planeja containers/componentes alinhados ao escopo aprovado.
4. `feature` — escreve o cenário BDD prioritário conectando ator, container e requisitos.
5. `build` — documenta deployment, qualidade e métricas operacionais.
6. `code` — executa o plano, entrega o incremento e atualiza riscos técnicos.

Cada fluxo mantém o arc42 atualizado a cada passo, permitindo auditoria contínua e rastreabilidade automática entre requisitos, decisões e commits.

## Como rodar localmente

- Pré-requisito: [Bun](https://bun.sh/) ≥ 1.1.
- Instale dependências: `bun install`
- Desenvolvimento com HMR: `bun run dev`
- Build de produção: `bun run build` seguido de `bun run preview`
- Testes unitários e de integração: `bun test`
- Validação estrutural das specs: `bun run lint:specs`

## Cultura e responsabilidades

- **Documentação é o contrato.** Não há código sem capítulo correspondente em `specs/`.
- **Agentes são cidadãos de primeira classe.** Prompts minimamente detalhados exigem documentação sólida e versionada.
- **Decisões têm dono.** Toda mudança arquitetural nasce com `/adr` e impacta `/stack`, `/cross` ou `/rule`.
- **Qualidade é mensurável.** `/build` define SLOs, RTO/RPO e métricas de pipeline; `code` valida implementação.

## Mapa dos comandos arc42

| Comando | Objetivo | Artefatos em `specs/` |
| ------- | -------- | --------------------- |
| `/vision` | Constituição/Escopo inicial | `01_introduction/001_introduction-and-goals.md`, `03_context/003_context-and-scope.md`, `03_context/actors/ACT-`, `03_context/systems/SYS-`, `12_glossary/012_glossary.md` |
| `/stack` | Estratégia técnica e ADR-001 | `02_constraints/002_constraints.md`, `04_solution-strategy/004_solution-strategy.md`, `09_decisions/009_architectural-decisions.md`, `12_glossary/012_glossary.md` |
| `/plan` | Orquestração C4 (containers e runtime) | `05_building-blocks/005_building-block-view.md`, `06_runtime/006_runtime-view.md`, `12_glossary/012_glossary.md` |
| `/feature` | Rastreabilidade funcional via cenário BDD | `06_runtime/006_runtime-view.md`, `12_glossary/012_glossary.md` |
| `/build` | Implantação e qualidade | `07_deployment/007_deployment-view.md`, `10_quality/010_quality-requirements.md`, `12_glossary/012_glossary.md` |
| `/code` | Implementação alinhada às specs + riscos | lê todo `specs/`, atualiza `11_risks/011_risks-and-technical-debt.md` |
| `/import` | Automação massiva de especificação | Executa `/vision`, `/stack`, `/plan`, `/feature`, `/build` em sequência com prompts derivados |
| `/actor` | Cadastro de pessoa/sistema externo (C4 L1) | `03_context/actors/ACT-` **ou** `03_context/systems/SYS-` + `12_glossary/012_glossary.md` |
| `/cross` | Conceitos transversais e padrões operacionais | `08_crosscutting/008_crosscutting-concepts.md`, `12_glossary/012_glossary.md` |
| `/container` | Detalhe de container (C4 L2) | `05_building-blocks/containers/CNT-[NNN]_[slug].md`, `12_glossary/012_glossary.md` |
| `/component` | Detalhe de componente (C4 L3) | `05_building-blocks/components/CNT-[NNN]_[container]/CMP-[NNN]_[slug].md`, cria container se necessário, `12_glossary/012_glossary.md` |
| `/rule` | Governança técnica (patterns) | `02_constraints/patterns/[NNN]_[slug].md`, `12_glossary/012_glossary.md` |
| `/flow` | Refinamento de cenário BDD | `06_runtime/006_runtime-view.md`, `06_runtime/scenarios/SCN-[NNN]_[slug].md`, `12_glossary/012_glossary.md` |
| `/adr` | Decisão arquitetural estruturada | `09_decisions/009_architectural-decisions.md`, `09_decisions/adrs/ADR-[NNN]_[slug].md`, `12_glossary/012_glossary.md` |

## Próximos passos

1. Rode `/vision` com seu briefing atual para criar o artefato zero.
2. Use `/stack` para transformar suposições em restrições documentadas.
3. Escolha um fluxo (A ou B), execute os comandos e integre agentes ao pipeline.
4. Traga as métricas do seu time e compare com os benchmarks acima — a disciplina Documentation-First faz o resto.

---

*“Se uma feature não está documentada, ela não existe. Se está documentada errado, está quebrada.”* — Documentation-First Approach

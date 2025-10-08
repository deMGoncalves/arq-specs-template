# 🤝 Guia de Contribuição para ARQ-SPECS-TEMPLATE

Agradecemos imensamente seu interesse em contribuir para o **ARQ-SPECS-TEMPLATE**. Este projeto é guiado pelo princípio do **Spec Driven Development (SDD)**, onde a clareza da especificação é mais importante que o volume de código.

Sua contribuição pode ser em três áreas principais:

## 🎯 1. Contribuição de Documentação (Melhorando a Estrutura)

Seu feedback sobre a clareza do nosso framework arc42/C4/ADR é vital.

### Tipos de Contribuição

- **Refinamento de Seções:** Sugestões para melhorar a clareza e o fluxo de leitura nas seções principais (ex: `04_solution-strategy/`).
- **Atualização de Links:** Correção de quaisquer links quebrados ou referências cruzadas incorretas.
- **Melhoria da Rastreabilidade:** Adicionar ou refinar o `## 🔗 Navegação` nos templates.

## 📝 2. Contribuição de Padrões de Engenharia (Patterns)

A camada `specs/02_constraints/patterns/` é o coração da nossa governança de código.

### Requisitos para Novos Patterns

1. **Foco em Engenharia:** O padrão deve reforçar princípios arquiteturais (SOLID, Clean Code, DDD) ou prevenir um *anti-pattern* de larga escala (ex: The Blob).
2. **Mensurabilidade:** Deve conter **Critérios Objetivos** que possam ser verificados manualmente (code review) ou automaticamente (ESLint, SonarQube, Biome).
3. **Formato:** Use o template ADR `ADR-[NNN]_[decision-title].md` para documentar a **proposta** e o **racional** para inclusão de um novo Pattern.
4. **Numeração:** Use a taxonomia existente (`ESTRUTURAL`, `COMPORTAMENTAL`, `CRIACIONAL`) e **siga a numeração sequencial** na criação do arquivo.

## 💻 3. Fluxo de Trabalho (Workflow)

Siga sempre a filosofia **Trabalho Mínimo, Impacto Máximo**.

1. **Fork:** Crie um *fork* do repositório.
2. **Branch:** Crie um *branch* descritivo (ex: `feature/refinar-naming-patterns` ou `fix/link-adr-002`).
3. **Commit:** Use **Conventional Commits** (ex: `feat:`, `fix:`, `docs:`) e, se aplicável, mencione o ID da regra ou seção (ex: `docs(005): refina o criterio objetivo do maximo de uma chamada`).
4. **Pull Request (PR):**
    - Direcione o PR para o *branch* principal (main/master).
    - O título deve seguir o formato do Conventional Commit.
    - O corpo do PR deve explicar o **porquê** da mudança e o impacto na filosofia SDD.

Obrigado por ajudar a construir o futuro da documentação de software!

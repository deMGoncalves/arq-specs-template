# 💎 **ARQ-SPECS-TEMPLATE:** O Manifesto do Desenvolvimento Orientado a Contexto (Context Driven Development)

[![Licença MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Padrões de Qualidade](https://img.shields.io/badge/Rules-39%2B-brightgreen.svg)](specs/02_constraints/patterns/)
[![Status Geral](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)](specs/README.md)

---

## 🚀 **Context Driven Development (CDD): Transforme a Documentação em Conhecimento Acionável**

A maioria dos projetos sofre de "Deriva Arquitetural" porque a documentação é um artefato passivo. O **ARQ-SPECS-TEMPLATE** inverte essa lógica.

Implementamos o **Context Driven Development (CDD)**: a especificação (`/specs`) não é apenas uma lista de requisitos, mas sim o **mapa completo de contexto** que responde ao *Porquê*, *O Quê* e *Onde* antes mesmo de você escrever a primeira linha de código.

Nossa metodologia unifica as **quatro** práticas mais sólidas do mercado, garantindo clareza, rastreabilidade e **assistência no ponto de dor**:

| Fundamento | Foco Principal | O Que Ele Responde |
| :--- | :--- | :--- |
| **arc42** | Escopo e Estratégia | *O Porquê* e *O Quê* da arquitetura. |
| **C4 Model** | Visualização Estrutural | *Onde está* e *Como se conecta* (Contexto, Containers, Componentes). |
| **ADRs** | História da Decisão | *Por que Decidimos Isso* (Preservando o contexto e os *trade-offs*). |
| **BDD/Gherkin** | Critérios de Aceitação | *Como* o sistema se comporta e *Como testá-lo* (Given/When/Then). |

---

## ✨ **O Valor Essencial: Governança de Código Explicita**

O maior valor do CDD é traduzir princípios de design abstratos (SOLID, Clean Code) em **regras de código mensuráveis e rastreáveis**.

Nossa camada de governança (`02_constraints/patterns/`) atua como o seu *co-piloto de arquitetura*, garantindo a Qualidade Inerente do projeto.

| Problema Comum | Solução CDD no Template | Ganho Estratégico |
| :--- | :--- | :--- |
| **Drift Arquitetural** | **Camada de Governança com 39+ Patterns:** Regras explícitas para SRP, DIP, Limite de Linhas e Nomenclatura. | **Qualidade Inerente:** A arquitetura se defende, minimizando o débito técnico. |
| **Alto Custo Cognitivo** | **Rastreabilidade total:** Todo Componente (`CMP-XXX`) liga-se diretamente à **ADR** que o justifica e à **Regra** que o governa. | **Onboarding Instantâneo:** O desenvolvedor entende o *contexto* imediatamente. |
| **Fragilidade do Deploy** | **Visão de Runtime (06) e Quality (10):** Cenários de execução (Gherkin/BDD) e SLIs/SLOs são especificados *antes* do código ser escrito. | **Confiança no Deploy:** Aumente a resiliência e a previsibilidade do sistema. |

---

## 🧭 **Guia de Navegação Rápida (Developer Flow)**

Para o desenvolvedor que acabou de clonar o projeto ou está iniciando uma nova *feature*, este é o caminho para obter o contexto imediato:

| Objetivo | Comece em | O que você encontra |
| :--- | :--- | :--- |
| **Entender o Problema** | `01_introduction/` | A missão, os objetivos e os Stakeholders. |
| **Entender a Estrutura** | `03_context/` e `05_building-blocks/` | O diagrama C4 (L1-L3): Quem interage (Actors) e onde o código vive (Containers/Componentes). |
| **Implementar uma Feature** | `06_runtime/` | A sequência de passos (Diagramas) e o formato BDD (Given/When/Then) para testes. |
| **Justificar uma Escolha** | `09_decisions/adrs/` | O racional por trás da Stack, do DB, do Padrão, etc. (O histórico da evolução). |
| **Garantir a Qualidade** | `02_constraints/patterns/` | Regras técnicas de governança (SOLID, Clean Code) para a refatoração. |

---

## 🛠️ **Quick Start: Adote o Padrão CDD**

Você só precisa da pasta `/specs`. Use-a como o ativo de documentação primário do seu repositório.

### 1. Clonar e Isolar a Estrutura Base

```bash
# 1. Clone o template temporariamente (apenas a estrutura)
git clone --depth 1 [https://github.com/seu-org/arq-specs-template.git](https://github.com/seu-org/arq-specs-template.git) spec-template-temp

# 2. Copie a pasta 'specs' para a raiz do seu projeto
cp -r spec-template-temp/specs /caminho/do/seu/projeto/

# 3. Limpe o diretório temporário
rm -rf spec-template-temp

# PRONTO. Seu projeto agora possui a estrutura em /seu/projeto/specs.
````

### 2\. Configure a Linguagem Ubíqua

Comece preenchendo o **Glossário** (`12_glossary/012_glossary.md`) e os **Arquitetos/Sistemas Externos** (`03_context/`). O contexto de negócio deve sempre vir em primeiro lugar.

-----

## 🤝 **Contribuições e Comunidade**

Este é um projeto *open source* e cresce com a contribuição da comunidade. Se você encontrou uma melhoria para uma regra de código ou quer adicionar um novo pattern de arquitetura, seu PR é bem-vindo.

  * **Guias de Contribuição**: Leia o [CONTRIBUTING.md](https://www.google.com/search?q=CONTRIBUTING.md) para o fluxo de trabalho.
  * **Código de Conduta**: Revisado no [CODE\_OF\_CONDUCT.md](https://www.google.com/search?q=CODE_OF_CONDUCT.md).
  * **Licença**: Distribuído sob a [Licença MIT](https://www.google.com/search?q=LICENSE).

### 🔍 **Índices Rápidos**

| Artefato | Localização | Exemplo de Arquivo |
| :--- | :--- | :--- |
| **Patterns/Regras de Código** | `specs/02_constraints/patterns/` | [010\_principio-responsabilidade-unica.md](https://www.google.com/search?q=specs/02_constraints/patterns/010_principio-responsabilidade-unica.md) |
| **Decisões Arquiteturais (ADRs)** | `specs/09_decisions/adrs/` | [ADR-[NNN]\_[decision-title].md](https://www.google.com/search?q=specs/09_decisions/adrs/ADR-%5BNNN%5D_%5Bdecision-title%5D.md) |
| **Visão de Runtime (Fluxos)** | `specs/06_runtime/scenarios/` | [SCN-[NÚMERO]\_[nome-do-cenario].md](https://www.google.com/search?q=specs/06_runtime/scenarios/SCN-%5BN%C3%9AMERO%5D_%5Bnome-do-cenario%5D.md) |
| **Glossário (Linguagem Ubíqua)** | `specs/12_glossary/` | [012\_glossary.md](https://www.google.com/search?q=specs/12_glossary/012_glossary.md) |

-----

## 🔗 **Referências e Links**

  * **[arc42 Official](https://arc42.org/)**
  * **[C4 Model](https://c4model.com/)**
  * **[ADR (Architecture Decision Records)](https://adr.github.io/)**
  * **[BDD (Behavior Driven Development)](https://www.google.com/search?q=https://cucumber.io/docs/bdd/gherkin/)**

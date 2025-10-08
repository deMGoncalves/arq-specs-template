# 💎 **ARQ-SPECS-TEMPLATE:** O Manifesto da Arquitetura Orientada a Especificação

## 🚀 **Spec Driven Development (SDD): Governança de Código como Ativo de Engenharia**

Este repositório é o **Blueprint de Arquitetura** construído para a comunidade de engenharia que recusa a documentação desatualizada e o conhecimento tribal. Implementamos o **Spec Driven Development (SDD)**, onde a especificação (`/specs`) não é um subproduto, mas sim o **motor principal** que guia o desenvolvimento e reduz o custo cognitivo do time.

Nosso template é uma convergência das três metodologias mais sólidas do mercado, garantindo clareza, rastreabilidade e evolução:

1.  **arc42:** Define o escopo, objetivos e estratégia (*O Porquê* e *O Quê* da arquitetura).
2.  **C4 Model:** Proporciona uma visualização hierárquica e escalável da estrutura (*Onde está e Como se conecta*).
3.  **ADRs:** Registra cada decisão de alto risco/impacto, preservando o contexto e os *trade-offs* (*Por que Decidimos Isso*).

-----

## ✨ **A Filosofia do Desenvolvimento Assistido**

O objetivo primário do **ARQ-SPECS-TEMPLATE** é capacitar o desenvolvedor. Ao invés de forçá-lo a vasculhar o código para entender as regras, o template oferece o **contexto** e a **assistência** no ponto exato da necessidade.

| Problema de Engenharia | Solução SDD no Template | Ganho Estratégico |
| :--- | :--- | :--- |
| **Drift Arquitetural** | **Camada de Governança Explicita:** Os `patterns/` em `02_constraints/` traduzem SOLID, DRY e Object Calisthenics em critérios de código mensuráveis. | **Qualidade Inerente:** A arquitetura se defende, minimizando o débito técnico. |
| **Alto Custo Cognitivo** | **Princípio da Rastreabilidade:** Todo Componente (`CMP-XXX`) linka diretamente para a **ADR** que o justifica e a **Regra** que o governa. | **Onboarding Instantâneo:** Reduza o *ramp-up* de novos engenheiros ao fornecer um mapa completo do sistema. |
| **Regressão/Fragilidade** | **Visão de Runtime (06) e Quality (10):** Fluxos de execução (sequência/estado) e requisitos de qualidade (SLIs/SLOs) são especificados antes do código. | **Confiança no Deploy:** Aumente a resiliência e a previsibilidade do sistema. |

-----

## 🛠️ **Quick Start: Adote o Padrão SDD**

Você só precisa da pasta `/specs`. Use-a como o ativo de documentação primário do seu repositório.

### 1\. Clonar e Isolar a Estrutura Base

Use o comando `git clone --depth 1` para obter apenas a estrutura essencial e economizar espaço e tempo.

```bash
# 1. Clone o template temporariamente
git clone --depth 1 https://github.com/seu-org/arq-specs-template.git spec-template-temp

# 2. Copie a pasta 'specs' para a raiz do seu projeto
cp -r spec-template-temp/specs /caminho/do/seu/projeto/

# 3. Mova os padrões para o local correto (Opcional, mas recomendado)
# Certifique-se de que a pasta 'patterns' esteja em /caminho/do/seu/projeto/specs/02_constraints/
# (Se você tiver um diretório .rules no seu código, esta etapa pode variar)

# 4. Limpe o diretório temporário
rm -rf spec-template-temp

# PRONTO. Seu projeto agora possui a estrutura em /seu/projeto/specs.
```

### 2\. Onde Começar o SDD

O fluxo de leitura para um novo desenvolvedor ou para iniciar uma *feature* é:

1.  **`01_introduction/`**: Entenda a missão e os objetivos (O PORQUÊ).
2.  **`03_context/`**: Mapeie quem interage (C4 L1).
3.  **`06_runtime/`**: Entenda a sequência de passos da *feature*.
4.  **`05_building-blocks/`**: Localize o Componente (`CMP-XXX`) responsável por essa etapa.
5.  **Use Referências Cruzadas**: Clique nos links `📝 ADR` ou `🎯 Quality` no final do documento do componente para obter a assistência de engenharia que você precisa.

-----

## 📘 **Guia de Elementos e Rastreabilidade**

A estrutura é organizada em 12 seções principais, cada uma responsável por um nível de abstração.

| Pasta | Foco Principal | Exemplo de Artefato | Rastreabilidade Chave |
| :--- | :--- | :--- | :--- |
| `02_constraints/patterns/` | **GOVERNANÇA DE CÓDIGO** (Regras) | `010_principio-responsabilidade-unica.md` | Liga a qualidade do método ao SRP. |
| `03_context/actors/` | Contexto do Sistema (C4 L1) | `ACT-001_end-user.md` | Liga a Persona às funcionalidades no `05_building-blocks`*[actor-name].md]. |
| `05_building-blocks/` | Estrutura Lógica (C4 L2/L3) | `CNT-003_backend-api.md` | Define os limites do Contêiner e onde o código-fonte reside*[container-name].md]. |
| `09_decisions/adrs/` | Histórico da Evolução | `ADR-002_database-choice.md` | Justifica o *trade-off* para a equipe e auditores\_[decision-title].md]. |
| `11_risks/` | Matriz de Riscos/Débito | `011_risks-and-technical-debt.md` | Liga um `TD-XXX` à sua origem no código e à mitigação necessária. |

-----

**Leitura Adicional Recomendada:**

  * [arc42 Official](https://arc42.org/)
  * [C4 Model](https://c4model.com/)
  * [ADR (Architecture Decision Records)](https://adr.github.io/)

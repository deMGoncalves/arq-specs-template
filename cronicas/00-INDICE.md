# Crônicas: Minha Jornada com IAs e Arquitetura de Software

**Autor**: Cleber de Moraes Gonçalves
**Instituição**: PUCPR (Pontifícia Universidade Católica do Paraná)
**Área**: Inteligência Artificial e Arquitetura de Software

---

## Sobre Esta Série

Esta série documenta minha jornada como estudante de Inteligência Artificial pela PUCPR e amante de arquitetura de software na busca por uma forma **inteligente** de trabalhar com IAs generativas.

**Nota importante**: Estas crônicas não estão abertas a discussão. Representam minha forma de trabalhar, baseada em fundamentos científicos sólidos, e os resultados mensuráveis que obtive. Se você busca debate filosófico sobre o futuro da IA, este não é o lugar. Se busca uma abordagem pragmática e fundamentada, continue lendo.

---

## Crônicas

### Parte I: O Despertar do Problema

1. **[O Desenvolvedor Iludido](01-desenvolvedor-iludido.md)**
   Como percebi que a maioria dos desenvolvedores está trabalhando de forma ingênua com IAs, achando que elas "pensam" e "entendem" o que fazem.

2. **[A Matemática da Frustração](02-matematica-da-frustracao.md)**
   Por que seus prompts não funcionam: a explosão combinatória da ambiguidade explicada matematicamente (10²⁰ implementações possíveis).

3. **[Contra as Specs (Aparentemente)](03-contra-specs-aparentemente.md)**
   Por que eu disse que era "contra specs" - e como isso era apenas contra specs **ambíguas e inúteis**.

### Parte II: A Busca pela Solução

4. **[Fundamentos: Shannon e a Teoria da Informação](04-fundamentos-shannon.md)**
   Como aprendi que o problema não é tecnológico, é **informacional**. Entropia H(X) = -Σ P(xᵢ) log₂(P(xᵢ)) e suas implicações.

5. **[O Paper que Mudou Tudo](05-paper-documentation-first.md)**
   Como descobri "The Documentation-First Approach: Transforming Distributed Team Communication" e percebi que a solução já existia - mas ninguém estava aplicando para IAs.

6. **[Arquitetura Transformer: O n² que Ninguém Te Conta](06-arquitetura-transformer.md)**
   Liu et al. (2023) "Lost in the Middle" e como a complexidade O(n²) da atenção destrói outputs de IA com contextos grandes.

### Parte III: A Construção da Solução

7. **[Arc42 + C4 + BDD + ADR: O Framework Definitivo](07-framework-definitivo.md)**
   Como combinei 4 frameworks estabelecidos para colapsar o espaço de probabilidades de 10²⁰ para ~10 implementações.

8. **[Task Decomposition: A Fase 3.5 Crítica](08-task-decomposition.md)**
   Por que decompor especificações em tasks de ~100 LOC não é "nice to have", é **matematicamente necessário**.

9. **[DDD Co-Located: Organização que a IA Entende](09-ddd-co-located.md)**
   Como organizei código por domínio (não camadas técnicas) e por que isso melhora drasticamente a geração de código.

### Parte IV: Resultados Mensuráveis

10. **[Redução de 85% na Taxa de Alucinação](10-reducao-alucinacao.md)**
    Métricas concretas: de 60-80% de alucinações para <10%. Como medi e como reproduzir.

11. **[ROI de 300%: Os Números Não Mentem](11-roi-300-porcento.md)**
    Retorno sobre investimento superior a 300% no primeiro ano. Tempo de desenvolvimento reduzido de 72h para 10h por feature.

12. **[Caso Real: 200 Desenvolvedores, Resultados Reais](12-caso-real-200-devs.md)**
    Fintech que escalou de 50 para 120 desenvolvedores mantendo qualidade consistente. 127 ADRs documentados. Time-to-market reduzido 27%.

### Parte V: A Verdade Inconveniente

13. **[Por Que a Indústria Ignora Isso?](13-industria-ignora.md)**
    Por que empresas e desenvolvedores continuam trabalhando com IAs de forma ingênua, mesmo com evidências científicas contrárias.

14. **[Você Não Precisa Acreditar em Mim](14-nao-precisa-acreditar.md)**
    Todas as referências científicas citadas nesta série: Vaswani et al. (2017), Liu et al. (2023), Shannon (1948), e mais.

15. **[Esta É Minha Forma de Trabalhar](15-minha-forma-trabalhar.md)**
    Fechamento: Por que não estou interessado em debater, apenas em compartilhar o que funciona para mim, fundamentado em ciência.

---

## Fundamentos Científicos

Esta série baseia-se em:

- **Vaswani et al. (2017)**: "Attention is All You Need" - Arquitetura Transformer
- **Liu et al. (2023)**: "Lost in the Middle: How Language Models Use Long Contexts"
- **Shannon (1948)**: "A Mathematical Theory of Communication" - Teoria da Informação
- **Arc42**: Framework de documentação arquitetural estruturada
- **C4 Model**: Visualização arquitetural hierárquica (Simon Brown)
- **Behavior-Driven Development (BDD)**: Especificações executáveis
- **Architecture Decision Records (ADR)**: Rastreabilidade de decisões

---

## Aviso Legal

Estas crônicas representam minha jornada pessoal e minha abordagem de trabalho. Os resultados mencionados são baseados em métricas reais e pesquisas científicas citadas.

**Não estou vendendo nada. Não estou promovendo nenhuma ferramenta comercial. Estou compartilhando conhecimento técnico fundamentado.**

Se você discorda, sinta-se livre para trabalhar de outra forma. Eu continuarei trabalhando assim, porque **funciona**.

---

**Versão**: 1.0.0
**Data**: 2025-01-17
**Licença**: CC BY-NC-SA 4.0 (Atribuição-NãoComercial-CompartilhaIgual)

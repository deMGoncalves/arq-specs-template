# Priorização da Simplicidade e Clareza (Princípio KISS)

**ID**: ESTRUTURAL-022
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Impõe que o design e o código devem ser mantidos o mais simples e direto possível, evitando soluções excessivamente inteligentes ou complexas quando uma alternativa clara existe.

## Por que importa

A complexidade desnecessária é um débito que afeta a legibilidade e a manutenibilidade. Soluções simples são mais fáceis de entender, testar, depurar e escalar, reduzindo a tendência a erros e o custo cognitivo.

## Critérios Objetivos

- [ ] O **Índice de Complexidade Ciclomática (CC)** de qualquer método não deve exceder **5**.
- [ ] Funções e métodos devem realizar apenas uma única tarefa.
- [ ] É proibido o uso de metaprogramação ou recursos avançados da linguagem se o mesmo resultado puder ser alcançado com código direto.

## Exceções Permitidas

- **Bibliotecas de Infraestrutura**: Componentes de baixo nível (ex: *parser*, *serializer*) onde a complexidade é inerente à tarefa, mas isolada.

## Como Detectar

### Manual

Verificar se o código exige mais de 5 segundos de análise para entender seu propósito e fluxo de controle.

### Automático

SonarQube/ESLint: `complexity.max-cycles: 5`.

## Relacionada com

- [001 - Nível Único de Indentação](001_nivel-unico-indentacao.md): reforça
- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): reforça
- [005 - Restrição de Encadeamento de Chamadas](005_maximo-uma-chamada-por-linha.md): complementa
- [006 - Proibição de Nomes Abreviados](006_proibicao-nomes-abreviados.md): complementa
- [007 - Limite Máximo de Linhas por Classe](007_limite-maximo-linhas-classe.md): complementa
- [021 - Proibição da Duplicação de Lógica](021_proibicao-duplicacao-logica.md): complementa
- [026 - Qualidade de Comentários](026_qualidade-comentarios-porque.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

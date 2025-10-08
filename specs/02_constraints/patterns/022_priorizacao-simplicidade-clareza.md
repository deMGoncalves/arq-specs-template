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
- [ ] É proibido o uso de metaprogramação ou recursos avançados da linguagem (como reflexão) se o mesmo resultado puder ser alcançado com código direto.

## Exceções Permitidas

- **Bibliotecas de Infraestrutura**: Componentes de baixo nível (ex: *parser*, *serializer*) onde a complexidade é inerente à tarefa, mas isolada.

## Como Detectar

### Manual
Verificar se o código exige mais de 5 segundos de análise para entender seu propósito e fluxo de controle.

### Automático
SonarQube/ESLint: `complexity.max-cycles: 5`.

## Relacionada com

- [ESTRUTURAL-001]: reforça (1 Nível de Indentação)
- [COMPORTAMENTAL-010]: reforça (SRP)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

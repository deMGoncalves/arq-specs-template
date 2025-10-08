# Restrição de Nível de Indentação por Método

**ID**: ESTRUTURAL-001
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Limita a complexidade de um método ou função ao impor um único nível de indentação para blocos de código (condicionais, *loops* ou *try-catch*), forçando a extração de lógica em métodos separados.

## Por que importa

Reduz a Complexidade Ciclomática (CC), melhorando drasticamente a legibilidade e a manutenibilidade do método, e facilitando a escrita de testes unitários focados em uma única responsabilidade.

## Critérios Objetivos

- [ ] Métodos e funções devem conter, no máximo, um único nível de indentação de bloco de código (após o escopo inicial do método).
- [ ] O uso de *guard clauses* para retornos antecipados não conta como um novo nível de indentação.
- [ ] Funções anônimas passadas como *callbacks* não devem introduzir um segundo nível de indentação no método pai.

## Exceções Permitidas

- **Estruturas de Controle Específicas**: *Try/Catch/Finally* em escopo de tratamento de erro que não possa ser delegado.

## Como Detectar

### Manual
Verificar a existência de um bloco de código aninhado (ex: um `if` dentro de um `for`, ou um `for` dentro de um `if`).

### Automático
SonarQube/ESLint: `complexity.max-depth: 1`

## Relacionada com

- [COMPORTAMENTAL-002]: reforça
- [ESTRUTURAL-007]: complementa

---

**Criada em**: 2025-10-04
**Versão**: 1.0

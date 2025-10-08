# Proibição de Constantes Mágicas (Magic Strings e Numbers)

**ID**: CRIACIONAL-024
**Severidade**: 🔴 Crítica
**Categoria**: Criacional

---

## O que é

Proíbe o uso direto de valores literais (números ou strings) que possuam um significado contextual ou de negócio (ex: códigos de status, limites de tempo) em vez de constantes nomeadas ou *Value Objects*.

## Por que importa

Números e strings mágicas degradam a legibilidade. Uma alteração de valor (ex: de 10 para 12) em vários locais introduz erros graves e dificulta a manutenção, pois o contexto do valor é perdido.

## Critérios Objetivos

- [ ] Valores numéricos (exceto 0 e 1) usados em lógica de negócio ou condições devem ser substituídos por constantes `UPPER_SNAKE_CASE`.
- [ ] Strings usadas para representar estados, tipos, URLs base ou *tokens* devem ser substituídas por `Enums` ou constantes.
- [ ] Constantes devem ser definidas em um módulo centralizado (ou no *Value Object* de domínio) e importadas, e não duplicadas.

## Exceções Permitidas

- **Matemática Pura**: Valores numéricos usados em operações matemáticas básicas (ex: `total / 2`).
- **Frameworks/Infraestrutura**: Strings exigidas por APIs de baixo nível (ex: `Bun.file(path).text()`).

## Como Detectar

### Manual
Busca por `string` ou `number` literal dentro de `if`, `switch` ou cálculos de negócio.

### Automático
SonarQube/ESLint: `no-magic-numbers`, `no-magic-strings`.

## Relacionada com

- [CRIACIONAL-003]: reforça (Encapsulamento de Primitivos)
- [ESTRUTURAL-006]: complementa (Nomes Abreviados)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

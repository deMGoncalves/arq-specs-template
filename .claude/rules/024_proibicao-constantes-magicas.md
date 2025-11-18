# Proibição de Constantes Mágicas (Magic Strings e Numbers)

**ID**: CRIACIONAL-024
**Severidade**: 🔴 Crítica
**Categoria**: Criacional

---

## O que é

Proíbe o uso direto de valores literais (números ou strings) que possuam um significado contextual ou de negócio (ex: códigos de status, limites de tempo) em vez de constantes nomeadas ou *Value Objects*.

## Por que importa

Constantes mágicas degradam a legibilidade. Uma alteração de valor em vários locais introduz erros graves e dificulta a manutenção, pois o contexto do valor é perdido.

## Critérios Objetivos

- [ ] Valores numéricos (exceto 0 e 1) usados em lógica de negócio ou condições devem ser substituídos por constantes `UPPER_SNAKE_CASE`.
- [ ] Strings usadas para representar estados, tipos, URLs base ou *tokens* devem ser substituídas por `Enums` ou constantes.
- [ ] Constantes devem ser definidas em um módulo centralizado e importadas, e não duplicadas.

## Exceções Permitidas

- **Matemática Pura**: Valores numéricos usados em operações matemáticas básicas (ex: `total / 2`).
- **Frameworks/Infraestrutura**: Strings exigidas por APIs de baixo nível.

## Como Detectar

### Manual

Busca por `string` ou `number` literal dentro de `if`, `switch` ou cálculos de negócio.

### Automático

SonarQube/ESLint: `no-magic-numbers`, `no-magic-strings`.

## Relacionada com

- [003 - Encapsulamento de Primitivos](003_encapsulamento-primitivos.md): reforça
- [006 - Proibição de Nomes Abreviados](006_proibicao-nomes-abreviados.md): complementa
- [030 - Proibição de Funções Inseguras](030_proibicao-funcoes-inseguras.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

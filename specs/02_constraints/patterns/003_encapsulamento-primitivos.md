# Encapsulamento de Primitivos de Domínio (Value Objects)

**ID**: CRIACIONAL-003
**Severidade**: 🔴 Crítica
**Categoria**: Criacional

---

## O que é

Exige que tipos primitivos (como `number`, `boolean`) e a classe `String` que representam conceitos de domínio (ex: *Email*, *CPF*, *Moeda*) sejam encapsulados em seus próprios *Value Objects* imutáveis.

## Por que importa

Garante que a validação, formatação e as regras de negócio intrínsecas ao dado sejam definidas e verificadas uma única vez no construtor, evitando inconsistências e bugs graves por passagem de dados inválidos entre métodos.

## Critérios Objetivos

- [ ] Parâmetros de entrada e valores de retorno de métodos públicos não devem ser tipos primitivos/String se representarem um conceito de domínio específico.
- [ ] Todos os *Value Objects* devem ser imutáveis.
- [ ] A lógica de validação do formato e regras de negócio do valor deve estar contida e ser executada no construtor do *Value Object*.

## Exceções Permitidas

- **Primitivos Genéricos**: Tipos primitivos usados para contagem (`i`, `index`), booleanos de controle (`isValid`), ou números sem significado de domínio (ex: delta temporal).

## Como Detectar

### Manual
Identificar String ou Number sendo passado como argumento em múltiplos métodos, representando, por exemplo, um *ID* ou *Path*.

### Automático
TypeScript: Detectar o uso excessivo de `string` ou `number` para campos tipados que deveriam ser classes dedicadas.

## Relacionada com

- [COMPORTAMENTAL-008]: reforça
- [COMPORTAMENTAL-009]: reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0

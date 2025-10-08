# Proibição de Exposição Direta de Estado (Getters/Setters)

**ID**: COMPORTAMENTAL-008
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Proíbe a criação de métodos puramente para acesso ou modificação direta do estado interno do objeto (como `getPropriedade()` e `setPropriedade()`), reforçando o encapsulamento e o princípio "Diga, Não Pergunte".

## Por que importa

A exposição direta do estado interno viola o encapsulamento, forçando o código cliente a decidir a lógica de negócio (*procedural programming*), resultando em classes anêmicas e acoplamento a detalhes de implementação.

## Critérios Objetivos

- [ ] Métodos que retornam o valor exato de uma propriedade interna sem transformações ou lógica são proibidos (puros *getters*).
- [ ] Métodos que apenas atribuem um valor a uma propriedade interna são proibidos (puros *setters*).
- [ ] A interação com o objeto deve ocorrer por métodos que expressam *intenção* de negócio (ex: `agendarReuniao()` em vez de `setStatus(Agendado)`).

## Exceções Permitidas

- **Objetos de Transferência de Dados (DTOs)**: Classes puras usadas apenas para transferência de dados entre camadas, sem lógica de negócio.
- **Frameworks de Serialização**: Bibliotecas que exigem *getters* e *setters* para mapeamento.

## Como Detectar

### Manual
Busca por métodos que contenham prefixos `get` ou `set` seguidos por um nome de propriedade, ou métodos que não possuam lógica de negócio própria.

### Automático
ESLint: Regras customizadas para identificar padrões de métodos `get/set` vazios ou triviais.

## Relacionada com

- [COMPORTAMENTAL-009]: reforça
- [CRIACIONAL-003]: complementa

---

**Criada em**: 2025-10-04
**Versão**: 1.0

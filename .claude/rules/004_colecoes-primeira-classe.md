# Uso Obrigatório de Coleções de Primeira Classe

**ID**: ESTRUTURAL-004
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Determina que qualquer coleção (lista, array, mapa) com lógica de negócio ou comportamento associado deve ser encapsulada em uma classe dedicada (*First Class Collection*).

## Por que importa

As coleções nativas violam o SRP se tiverem lógica de manipulação distribuída. Encapsular a coleção centraliza a responsabilidade, facilita a adição de comportamentos (ex: filtros, somas) e previne que o estado interno seja exposto e modificado por clientes.

## Critérios Objetivos

- [ ] Tipos nativos de coleção (Array, List, Map) não devem ser passados como parâmetros ou retornados por métodos públicos, exceto para DTOs puros.
- [ ] Cada coleção com significado de domínio deve ser envolvida por uma classe dedicada (ex: `ListaDePedidos`, `Funcionarios`).
- [ ] A classe de coleção deve fornecer métodos de comportamento (ex: `adicionar()`, `filtrarPorStatus()`), e não apenas acesso direto aos elementos.

## Exceções Permitidas

- **Interfaces de Baixo Nível**: Coleções usadas puramente como estruturas de dados internas sem lógica de negócio associada (ex: `tokens` em um *scanner*).
- **APIs de Framework**: Uso de coleções em interfaces de Frameworks (ex: React, ORMs) que as exigem.

## Como Detectar

### Manual

Verificar o uso de `Array.prototype` (map, filter, reduce) em métodos de classes que não sejam *First Class Collections*.

### Automático

ESLint: Regras personalizadas para proibir o retorno de `Array` em classes de domínio.

## Relacionada com

- [007 - Limite Máximo de Linhas por Classe](007_limite-maximo-linhas-classe.md): reforça
- [008 - Proibição de Getters/Setters](008_proibicao-getters-setters.md): reforça
- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): reforça
- [009 - Diga, Não Pergunte](009_diga-nao-pergunte.md): complementa
- [003 - Encapsulamento de Primitivos](003_encapsulamento-primitivos.md): complementa

---

**Criada em**: 2025-10-04
**Versão**: 1.0

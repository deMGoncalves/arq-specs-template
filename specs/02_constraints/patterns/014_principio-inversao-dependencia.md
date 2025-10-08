# Aplicação do Princípio de Inversão de Dependência (DIP)

**ID**: COMPORTAMENTAL-014
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações (interfaces).

## Por que importa

O DIP é crucial para desacoplar a política de negócio da implementação. A violação cria acoplamento rígido, dificultando testes (unidade e integração) e impedindo que o módulo de alto nível seja reutilizado em um novo contexto.

## Critérios Objetivos

- [ ] A criação de novas instâncias de classes concretas (*new Class()*) é proibida dentro de classes de alto nível (ex: *Services* e *Controllers*).
- [ ] Módulos de alto nível devem referenciar apenas interfaces ou classes abstratas (o que será injetado).
- [ ] O número de *imports* para classes concretas em construtores deve ser zero (apenas injeção de abstrações).

## Exceções Permitidas

- **Entidades e Value Objects**: Classes de dados puras que podem ser instanciadas livremente.
- **Root Composer**: O módulo de inicialização do sistema onde a injeção de dependência é configurada.

## Como Detectar

### Manual
Busca por `new NomeConcreto()` dentro do código de *Services* ou *Business Logic*.

### Automático
ESLint: `no-new-without-abstraction` (com regras customizadas).

## Relacionada com

- [COMPORTAMENTAL-011]: reforça (Permite a extensão OCP)
- [ESTRUTURAL-015]: reforça (Princípio de Pacote REP)
- [CRIACIONAL-003]: complementa (Encapsulamento de Primitivos)

---

**Criada em**: 2025-10-04
**Atualizada em**: 2025-10-04
**Versão**: 1.1

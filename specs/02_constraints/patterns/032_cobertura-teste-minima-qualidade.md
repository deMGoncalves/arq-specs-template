# Cobertura Mínima de Teste e Qualidade (TDD)

**ID**: COMPORTAMENTAL-032
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Estabelece um limite mínimo obrigatório de Cobertura de Código para o Módulo de Domínio/Negócio (Use Cases e Entities) e exige que os testes unitários sigam o princípio AAA (Arrange, Act, Assert).

## Por que importa

Garante a confiabilidade e facilita a refatoração. O código sem testes unitários de alta qualidade é inerentemente frágil e viola o OCP (Princípio Aberto/Fechado) em ambientes dinâmicos como o JavaScript/Bun.

## Critérios Objetivos

- [ ] A cobertura de testes por linha (Line Coverage) deve ser de, no mínimo, **85%** para todos os módulos de domínio/negócio.
- [ ] É proibido usar lógica de controle (ex: `if`, `for`, `while`) diretamente dentro do corpo de um teste unitário.
- [ ] Cada teste unitário deve focar em uma única assertiva (máximo 2) e seguir a estrutura AAA (Preparação, Ação, Verificação).

## Exceções Permitidas

- **Módulos de Inicialização**: Arquivos de configuração e *root composers* (que não contêm lógica de negócio) podem ter cobertura baixa ou zero.

## Como Detectar

### Manual
Busca por `if` ou `for` dentro de blocos `test()` ou `it()`.

### Automático
Bun Test Runner/Jest: Configuração de `coverageThresholds`.

## Relacionada com

- [COMPORTAMENTAL-011]: reforça (OCP)
- [COMPORTAMENTAL-010]: reforça (SRP)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

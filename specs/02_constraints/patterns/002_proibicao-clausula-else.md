# Proibição da Cláusula ELSE para Fluxo de Controle

**ID**: COMPORTAMENTAL-002
**Severidade**: 🟠 Alta
**Categoria**: Comportamental

---

## O que é

Restringe o uso das cláusulas `else` e `else if`, promovendo a substituição por *guard clauses* (retorno antecipado) ou padrões de polimorfismo para lidar com diferentes caminhos de execução.

## Por que importa

Melhora a clareza do fluxo de controle, evita a Complexidade Ciclomática desnecessária e força a aderência ao Princípio da Responsabilidade Única (SRP), pois cada bloco de código lida com uma condição específica.

## Critérios Objetivos

- [ ] O uso explícito das palavras-chave `else` ou `else if` é proibido.
- [ ] Condicionais devem ser usados primariamente como *guard clauses* (verificação de pré-condições e retorno/lançamento de erro).
- [ ] Lógica de ramificação complexa deve ser resolvida via polimorfismo (padrões *Strategy* ou *State*).

## Exceções Permitidas

- **Estruturas de Controle de Linguagem**: Estruturas como `switch` (que geralmente se comportam como `if/else if`) podem ser usadas, desde que cada `case` retorne ou encerre a execução.

## Como Detectar

### Manual
Busca por ` else ` ou ` else if ` no código.

### Automático
ESLint: `no-else-return` e `no-lonely-if` com configurações para forçar a saída antecipada.

## Relacionada com

- [ESTRUTURAL-001]: reforça
- [COMPORTAMENTAL-008]: reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0

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

- [001 - Nível Único de Indentação](001_nivel-unico-indentacao.md): reforça
- [008 - Proibição de Getters/Setters](008_proibicao-getters-setters.md): reforça
- [011 - Princípio Aberto/Fechado](011_principio-aberto-fechado.md): reforça
- [022 - Priorização da Simplicidade e Clareza](022_priorizacao-simplicidade-clareza.md): complementa
- [027 - Qualidade no Tratamento de Erros](027_qualidade-tratamento-erros-dominio.md): complementa

---

**Criada em**: 2025-10-04
**Versão**: 1.0

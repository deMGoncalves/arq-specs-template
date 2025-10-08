# Restrição de Funções com Efeitos Colaterais (Side Effects)

**ID**: COMPORTAMENTAL-036
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Exige que as funções ou métodos, exceto aqueles explicitamente designados como **Comandos** (que alteram estado), sejam puras e **não alterem o estado** de variáveis de instância, objetos globais ou objetos externos passados por referência.

## Por que importa

Efeitos colaterais inesperados introduzem erros graves e dificultam o raciocínio sobre o código, quebrando a **previsibilidade** e o **Princípio da Surpresa Mínima**. O código impuro é difícil de testar e debugar.

## Critérios Objetivos

- [ ] Funções que são puramente **Consultas (Queries)** não devem modificar variáveis de instância da classe ou objetos globais/externos.
- [ ] Objetos mutáveis passados como parâmetro devem ser clonados antes de qualquer modificação, a menos que a modificação seja a intenção de negócio do método.
- [ ] Funções que alteram o estado devem ter nomes que começam com verbos de Comando (ex: `update`, `save`, `delete`).

## Exceções Permitidas

- **Comandos de Persistência**: Métodos de `Repository` ou `Service` que explicitamente alteram o estado do sistema (ex: `save`, `delete`).
- **Interfaces Fluidas/Builders**: Classes que retornam `this` para modificar o próprio objeto.

## Como Detectar

### Manual

Busca por métodos que retornam um valor de consulta, mas também chamam um `setter` ou modificam um atributo interno/externo.

### Automático

ESLint: `no-side-effects-in-conditions` e análise de *mutability*.

## Relacionada com


---

**Criada em**: 2025-10-08
**Versão**: 1.0

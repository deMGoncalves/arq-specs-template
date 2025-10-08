# Conformidade com o Princípio Aberto/Fechado (OCP)

**ID**: COMPORTAMENTAL-011
**Severidade**: 🟠 Alta
**Categoria**: Comportamental

---

## O que é

Módulos, classes ou funções devem ser abertos para extensão e fechados para modificação, permitindo a adição de novos comportamentos sem alterar o código existente da unidade.

## Por que importa

A violação do OCP leva a código frágil. A conformidade reduz o risco de regressão e aumenta a manutenibilidade, pois novas funcionalidades são adicionadas sem a necessidade de reescrever lógica já testada.

## Critérios Objetivos

- [ ] A adição de um novo "tipo" de comportamento deve ser implementada por herança ou composição, e **não** por novos `if/switch` no código existente.
- [ ] Métodos com mais de **3** cláusulas `if/else if/switch case` que lidam com *tipos* (ex: `if (type === 'A')`) violam o OCP.
- [ ] Módulos de alto nível não devem ter dependência direta de mais de **2** classes concretas que implementam uma mesma abstração.

## Exceções Permitidas

- **Classes de Orquestração**: Módulos que atuam como *Factory* para instanciar tipos, onde a lógica `switch` é centralizada.

## Como Detectar

### Manual
Sempre que for necessário adicionar uma nova funcionalidade, verificar se foi preciso modificar a classe base (se sim, OCP violado).

### Automático
ESLint: Regras que detectam alto número de *switch/if-else* em um método.

## Relacionada com

- [COMPORTAMENTAL-002]: reforça (Proibição da Cláusula ELSE)
- [COMPORTAMENTAL-012]: depende (LSP é um pré-requisito para o OCP funcionar)
- [COMPORTAMENTAL-014]: complementa (O uso de Interfaces de ISP ajuda na extensão OCP)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

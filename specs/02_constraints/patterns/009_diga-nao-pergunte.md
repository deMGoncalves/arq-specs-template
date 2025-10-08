# Aplicação do Princípio do "Diga, Não Pergunte" (Law of Demeter)

**ID**: COMPORTAMENTAL-009
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Exige que um método chame métodos ou acesse propriedades apenas de seus "vizinhos imediatos": o próprio objeto, objetos passados como argumento, objetos que ele cria ou objetos que são propriedades internas diretas.

## Por que importa

Violações do Princípio de Demeter resultam em acoplamento alto e transitivo (*train wrecks*), tornando o código frágil a mudanças internas em objetos distantes na cadeia de dependência, e obscurecendo a responsabilidade de cada objeto.

## Critérios Objetivos

- [ ] Um método deve evitar chamar métodos de um objeto retornado por outro método (ex: `a.getB().getC().f()`).
- [ ] A chamada de métodos deve ser restrita aos objetos que o método tem conhecimento direto.
- [ ] O objeto cliente deve *dizer* ao objeto dependente o que fazer, em vez de *perguntar* pelo estado interno para tomar uma decisão.

## Exceções Permitidas

- **Padrões de Interface Fluida (Chaining)**: Desde que o método retorne `this` (ou a mesma interface), como em Builders.
- **Acesso a DTOs/Value Objects**: Acesso a dados de objetos que são puramente recipientes de dados.

## Como Detectar

### Manual
Busca por encadeamento de chamadas (*dot-chaining*) com três ou mais chamadas consecutivas, indicando conhecimento de objetos aninhados.

### Automático
ESLint: `no-chaining` com alta profundidade e `no-access-target` (com plugins customizados).

## Relacionada com

- [COMPORTAMENTAL-008]: reforça
- [ESTRUTURAL-005]: reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0

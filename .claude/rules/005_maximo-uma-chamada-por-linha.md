# Restrição de Encadeamento de Chamadas (*Method Chaining*)

**ID**: ESTRUTURAL-005
**Severidade**: 🟡 Média
**Categoria**: Estrutural

---

## O que é

Limita o encadeamento de chamadas de métodos e o acesso a propriedades encadeadas (*train wrecks*), permitindo no máximo uma chamada de método ou acesso a propriedade por linha.

## Por que importa

O encadeamento excessivo (ex: `a.b().c().d()`) viola o Princípio de Demeter (Lei do Conhecimento Mínimo), aumentando o acoplamento do cliente a detalhes internos da estrutura de objetos. A restrição melhora a legibilidade ao forçar a quebra de linha ou o uso de variáveis temporárias.

## Critérios Objetivos

- [ ] Cada instrução deve conter, no máximo, uma chamada de método ou um acesso a propriedade (ex: `a.b()`).
- [ ] Múltiplas chamadas na mesma linha (ex: `objeto.getA().getB()`) são proibidas.
- [ ] Múltiplas chamadas devem ser quebradas em linhas separadas ou delegadas a um novo método.

## Exceções Permitidas

- **Fluent Interfaces/Builders**: Padrões de projeto (*Builder* ou *Chaining*) que retornam `this` para configurar um objeto (ex: `new Query().where().limit()`).
- **Constantes Estáticas**: Acessos a constantes estáticas de classes de utilidade.

## Como Detectar

### Manual

Busca por dois ou mais pontos (`.`) consecutivos (excluindo ponto flutuante) em uma única linha de instrução.

### Automático

ESLint: `no-chaining` (com plugins customizados).

## Relacionada com

- [009 - Diga, Não Pergunte](009_diga-nao-pergunte.md): reforça
- [006 - Proibição de Nomes Abreviados](006_proibicao-nomes-abreviados.md): complementa
- [008 - Proibição de Getters/Setters](008_proibicao-getters-setters.md): reforça
- [022 - Priorização da Simplicidade e Clareza](022_priorizacao-simplicidade-clareza.md): complementa

---

**Criada em**: 2025-10-04
**Versão**: 1.0

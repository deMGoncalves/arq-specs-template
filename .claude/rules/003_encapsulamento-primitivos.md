# Encapsulamento de Primitivos de Domínio (Value Objects)

**ID**: CRIACIONAL-003
**Severidade**: 🔴 Crítica
**Categoria**: Criacional

---

## O que é

Exige que tipos primitivos (como `number`, `boolean`) e a classe `String` que representam conceitos de domínio (ex: *Email*, *CPF*, *Moeda*) sejam encapsulados em seus próprios *Value Objects* imutáveis.

## Por que importa

Garante que a validação, formatação e as regras de negócio intrínsecas ao dado sejam definidas e verificadas uma única vez no construtor, evitando inconsistências e bugs graves por passagem de dados inválidos entre métodos.

## Critérios Objetivos

- [ ] Parâmetros de entrada e valores de retorno de métodos públicos não devem ser tipos primitivos/String se representarem um conceito de domínio específico.
- [ ] Todos os *Value Objects* devem ser imutáveis.
- [ ] A lógica de validação do formato e regras de negócio do valor deve estar contida e ser executada no construtor do *Value Object*.

## Exceções Permitidas

- **Primitivos Genéricos**: Tipos primitivos usados para contagem (`i`, `index`), booleanos de controle (`isValid`), ou números sem significado de domínio (ex: delta temporal).

## Como Detectar

### Manual

Identificar String ou Number sendo passado como argumento em múltiplos métodos, representando, por exemplo, um *ID* ou *Path*.

### Automático

TypeScript: Detectar o uso excessivo de `string` ou `number` para campos tipados que deveriam ser classes dedicadas.

## Relacionada com

- [008 - Proibição de Getters/Setters](008_proibicao-getters-setters.md): reforça
- [009 - Diga, Não Pergunte](009_diga-nao-pergunte.md): reforça
- [024 - Proibição de Constantes Mágicas](024_proibicao-constantes-magicas.md): reforça
- [006 - Proibição de Nomes Abreviados](006_proibicao-nomes-abreviados.md): reforça
- [033 - Limite de Parâmetros por Função](033_limite-parametros-funcao.md): reforça
- [029 - Imutabilidade de Objetos](029_imutabilidade-objetos-freeze.md): reforça
- [012 - Princípio de Substituição de Liskov](012_principio-substituicao-liskov.md): complementa
- [014 - Princípio de Inversão de Dependência](014_principio-inversao-dependencia.md): complementa
- [035 - Proibição de Nomes Enganosos](035_proibicao-nomes-enganosos.md): reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0

# Qualidade no Tratamento de Erros: Use Exceções de Domínio

**ID**: COMPORTAMENTAL-027
**Severidade**: 🟠 Alta
**Categoria**: Comportamental

---

## O que é

Exige que a lógica de negócio use **exceções (erros)** para relatar problemas, em vez de códigos de retorno ou valores nulos. Exceções devem ser específicas do domínio (ex: `UsuarioNaoEncontradoError`).

## Por que importa

Códigos de erro ou valores nulos (ex: `return null`) forçam o cliente a verificar o retorno em cada chamada, espalhando lógica de erro. Exceções garantem que o erro não seja ignorado e fornecem *stack trace*.

## Critérios Objetivos

- [ ] Métodos de negócio (Services, Use Cases) devem retornar tipos válidos ou lançar exceção, **proibindo** `return null` ou `return undefined`.
- [ ] É proibido o uso de `catch` vazio ou que apenas loga o erro e continua o fluxo (deve relançar ou tratar).
- [ ] Exceções lançadas devem ser customizadas para o domínio (ex: estender uma classe `BaseDomainError`).

## Exceções Permitidas

- **Funções de Parse/Utilidade**: Funções de baixo nível que podem retornar `null` ou `undefined` para indicar falha na leitura ou conversão.

## Como Detectar

### Manual

Busca por `return null`, `return -1`, ou `catch (e) {}` no código de negócio.

### Automático

ESLint: `no-return-null`, `no-empty-catch`.

## Relacionada com

- [002 - Proibição da Cláusula ELSE](002_proibicao-clausula-else.md): complementa
- [022 - Priorização da Simplicidade e Clareza](022_priorizacao-simplicidade-clareza.md): reforça
- [028 - Tratamento de Exceção Assíncrona](028_tratamento-excecao-assincrona.md): reforça
- [036 - Restrição de Funções com Efeitos Colaterais](036_restricao-funcoes-efeitos-colaterais.md): reforça

---

**Criada em**: 2025-10-08
**Versão**: 1.0

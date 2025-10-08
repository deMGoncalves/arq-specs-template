# Qualidade no Tratamento de Erros: Use Exceções de Domínio

**ID**: COMPORTAMENTAL-027
**Severidade**: 🟠 Alta
**Categoria**: Comportamental

---

## O que é

Exige que a lógica de negócio use exceções (erros) para relatar problemas, em vez de códigos de retorno ou valores nulos. Exceções devem ser específicas do domínio (ex: `UsuarioNaoEncontradoError`).

## Por que importa

Códigos de erro ou valores nulos (ex: `return null`) forçam o cliente a verificar o retorno em cada chamada, espalhando lógica de erro e esquecendo verificações. Exceções garantem que o erro não seja ignorado e fornecem *stack trace* para depuração.

## Critérios Objetivos

- [ ] Métodos de negócio (Services, Use Cases) devem retornar tipos válidos ou lançar exceção, **proibindo** `return null` ou `return undefined`.
- [ ] É proibido o uso de `catch` vazio ou que apenas loga o erro e continua o fluxo (deve relançar ou tratar).
- [ ] Exceções lançadas devem ser customizadas para o domínio (ex: estender uma classe `BaseDomainError`) e não genéricas.

## Exceções Permitidas

- **Funções de Parse/Utilidade**: Funções de baixo nível que podem retornar `null` ou `undefined` para indicar falha na leitura ou conversão (Ex: `JSON.parse` falhar).

## Como Detectar

### Manual
Busca por `return null`, `return -1`, ou `catch (e) {}` no código de negócio.

### Automático
ESLint: `no-return-null`, `no-empty-catch`.

## Relacionada com

- [COMPORTAMENTAL-002]: complementa (Proibição da Cláusula ELSE)
- [ESTRUTURAL-022]: reforça (Simplicidade no tratamento do fluxo)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

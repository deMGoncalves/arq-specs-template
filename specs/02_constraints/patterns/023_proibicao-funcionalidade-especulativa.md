# Proibição de Funcionalidade Especulativa (Princípio YAGNI)

**ID**: COMPORTAMENTAL-023
**Severidade**: 🟡 Média
**Categoria**: Comportamental

---

## O que é

Exige que o código seja implementado apenas quando uma funcionalidade é *necessária* (e não *talvez necessária* no futuro), evitando a inclusão de código ou abstrações desnecessárias.

## Por que importa

A funcionalidade especulativa aumenta a complexidade e o código morto, desperdiçando tempo de desenvolvimento e dificultando o uso e a manutenção. Aumenta a superfície de ataque e reduz a agilidade na resposta a mudanças reais.

## Critérios Objetivos

- [ ] Classes ou métodos *vazios* que visam ser *placeholders* para funcionalidades futuras são proibidos.
- [ ] É proibida a adição de parâmetros ou opções de configuração que não são usados imediatamente pelo menos por **um** cliente.
- [ ] O código não deve conter mais de **5%** de linhas marcadas como desabilitadas ou com comentários indicando "TODO: futura implementação".

## Exceções Permitidas

- **Requisitos de Interface**: Métodos de interface exigidos por um contrato externo (ex: `Disposable` ou `Closable`) que são trivialmente implementados.

## Como Detectar

### Manual
Busca por métodos vazios, parâmetros não utilizados, ou código que nunca é chamado (código morto).

### Automático
SonarQube/ESLint: `no-unused-vars`, `no-empty-function`.

## Relacionada com

- [ESTRUTURAL-007]: reforça (Limite de Linhas)
- [ESTRUTURAL-022]: complementa (Simplicidade)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

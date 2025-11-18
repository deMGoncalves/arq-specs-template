# Tratamento Completo de Exceção Assíncrona (Promises)

**ID**: COMPORTAMENTAL-028
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Exige que todas as Promises retornadas sejam explicitamente tratadas (consumidas) com **`await`**, **`.catch()`**, ou um padrão de resultado, para prevenir *Uncaught Promise Rejections* (erros não capturados).

## Por que importa

Em ambientes como Node.js, exceções não tratadas em Promises são fatais e derrubam o processo principal. Garante que a **estabilidade** do sistema não seja comprometida por chamadas assíncronas "flutuantes" ou erros ignorados.

## Critérios Objetivos

- [ ] Todas as chamadas de função que retornam `Promise` devem ser seguidas por `await` ou `Promise.then().catch()`.
- [ ] É proibido o uso de `async` em um método sem que haja pelo menos um `await` ou uma chamada assíncrona dentro de seu corpo.
- [ ] O código não deve lançar Promises sem capturar o erro em um contexto tratável.

## Exceções Permitidas

- **Event Emitters/Listeners**: Código que se integra a *Event Loops* internos ou padrões Observer, onde o tratamento do erro é delegado ao *listener* central.

## Como Detectar

### Manual

Busca por chamadas de função que retornam Promises sem `await` ou `.catch()` imediatamente após.

### Automático

ESLint: `no-floating-promises`, `require-await`.

## Relacionada com

- [027 - Qualidade no Tratamento de Erros](027_qualidade-tratamento-erros-dominio.md): reforça
- [014 - Princípio de Inversão de Dependência](014_principio-inversao-dependencia.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

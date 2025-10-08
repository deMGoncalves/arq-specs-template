# Tratamento Completo de Exceção Assíncrona

**ID**: COMPORTAMENTAL-028
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Exige que todas as Promises retornadas sejam explicitamente tratadas (consumidas) com `await`, `.catch()`, ou um padrão de resultado (ex: `Result Pattern`), para prevenir *Uncaught Promise Rejections* (erros não capturados).

## Por que importa

Em ambientes Bun/Node.js, exceções não tratadas em Promises são fatais e derrubam o processo principal. Esta regra garante que a estabilidade do sistema não seja comprometida por chamadas assíncronas "flutuantes" ou erros silenciosamente ignorados.

## Critérios Objetivos

- [ ] Todas as chamadas de função que retornam `Promise` devem ser seguidas por `await` ou `Promise.then().catch()`.
- [ ] É proibido o uso de `async` em um método sem que haja pelo menos um `await` ou uma chamada assíncrona dentro de seu corpo.
- [ ] O código não deve lançar Promises sem capturar o erro em um contexto tratável (ex: *Top-Level Await* deve ser envolvido por *try/catch*).

## Exceções Permitidas

- **Event Emitters/Listeners**: Código que se integra a *Event Loops* internos ou padrões Observer, onde o tratamento do erro é delegado ao *listener* central.

## Como Detectar

### Manual
Busca por chamadas de função que retornam Promises sem `await` ou `.catch()` imediatamente após.

### Automático
ESLint: `no-floating-promises`, `require-await`.

## Relacionada com

- [COMPORTAMENTAL-027]: reforça (Qualidade no Tratamento de Erros)
- [COMPORTAMENTAL-014]: complementa (DIP em funções de I/O)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

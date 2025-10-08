# Proibição de Funções Inseguras (eval, new Function, Hardcoding de Segredos)

**ID**: COMPORTAMENTAL-030
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Proíbe o uso de funções JavaScript que executam código arbitrário a partir de strings (ex: `eval()`) ou que criam vulnerabilidades de segurança graves.

## Por que importa

Funções inseguras como `eval()`, `new Function()` e `setTimeout` com string como argumento são vetores de ataque para execução remota de código (RCE) e injeção de código, sendo inaceitáveis em qualquer aplicação de produção.

## Critérios Objetivos

- [ ] O uso das funções `eval()`, `new Function()` (sem a finalidade de compilação isolada) e `setTimeout`/`setInterval` com argumento *string* é proibido.
- [ ] É proibida a concatenação de *strings* de entrada de usuário em consultas diretas ao sistema de arquivos (Bun.file) ou a comandos de *shell* (Bun.spawn).
- [ ] Chaves de API ou segredos devem ser injetados exclusivamente via `process.env` ou ferramenta de gerenciamento de segredos.

## Exceções Permitidas

- **Tooling/Build Steps**: Uso controlado de *eval* ou *new Function* em *build scripts* para otimizar *bundling* ou *hot-reloading*.

## Como Detectar

### Manual
Busca por `eval`, `new Function`, ou `process.env.HARDCODED_SECRET`.

### Automático
ESLint: `no-eval`, `no-implied-eval`.

## Relacionada com

- [CRIACIONAL-024]: complementa (Constantes Mágicas)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

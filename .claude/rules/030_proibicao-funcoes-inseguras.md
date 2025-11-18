# Proibição de Funções Inseguras (eval, new Function, Secrets)

**ID**: COMPORTAMENTAL-030
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Proíbe o uso de funções que executam código arbitrário a partir de strings (ex: `eval()`) ou que criam vulnerabilidades de segurança graves, como o *hardcoding* de segredos.

## Por que importa

Funções como `eval()` são vetores de ataque para **Execução Remota de Código (RCE)** e injeção de código. O *hardcoding* de segredos viola a política de segurança, tornando o *deployment* inseguro.

## Critérios Objetivos

- [ ] O uso das funções `eval()` e `new Function()` (sem a finalidade de compilação isolada) é proibido.
- [ ] Chaves de API ou segredos devem ser injetados exclusivamente via `process.env` ou ferramenta de gerenciamento de segredos.
- [ ] É proibida a concatenação de *strings* de entrada de usuário em consultas diretas ao sistema de arquivos ou a comandos de *shell*.

## Exceções Permitidas

- **Tooling/Build Steps**: Uso controlado de *eval* ou *new Function* em *build scripts* para otimizar *bundling*.

## Como Detectar

### Manual

Busca por `eval`, `new Function`, ou chaves de API *hardcoded*.

### Automático

ESLint: `no-eval`, `no-implied-eval`.

## Relacionada com

- [024 - Proibição de Constantes Mágicas](024_proibicao-constantes-magicas.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

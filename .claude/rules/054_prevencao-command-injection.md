# Prevenção de Command Injection

**ID**: SEGURANÇA-054
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Evitar execução de shell commands com input de usuário. Se necessário, usar bibliotecas que não invocam shell ou passar argumentos como array separado (não string interpolation) e validar input com whitelist estrita.

## Por que importa

Command injection permite execução arbitrária de comandos no servidor, possibilitando RCE (Remote Code Execution), exfiltração de dados e comprometimento completo do sistema. É uma das vulnerabilidades mais críticas. Substituir por bibliotecas nativas ou APIs seguras elimina o risco.

## Critérios Objetivos

- [ ] Evitar completamente exec, eval, system, shell_exec ou equivalentes com input de usuário
- [ ] Se shell execution é necessário, usar child_process.execFile com argumentos array (não interpolação)
- [ ] Input de usuário é validado com whitelist estrita (regex ou enum de valores permitidos)
- [ ] Nunca construir comandos concatenando strings com input de usuário
- [ ] Usar bibliotecas nativas que não invocam shell (ex: fs para file operations, não "rm -rf")

## Exceções Permitidas

- **Admin tools**: Ferramentas administrativas internas podem permitir command execution com autenticação forte e auditoria
- **Build pipelines**: Scripts de build podem executar comandos predefinidos sem input externo

## Como Detectar

### Manual

Code review procurando por imports de child_process, execução de comandos shell ou concatenação de strings em comandos. Verificar todos paths que processam input de usuário.

### Automático

SAST tools detectam uso de functions perigosas como exec. Testes automatizados podem tentar injetar payloads de command injection (ex: ; ls).

## Relacionada com

- [030 - Proibição de Funções Inseguras](030_proibicao-funcoes-inseguras.md): complementa
- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa
- [050 - Prevenção SQL Injection](050_prevencao-sql-injection.md): similar
- [053 - Prevenção Path Traversal](053_prevencao-path-traversal.md): similar

---

**Criada em**: 2025-12-16
**Versão**: 1.0

# Guardian Agent - Documentação

**O Guardião da Qualidade** 🛡️

Esta skill atua como um guardião antes de commit, push e release, garantindo que workflows do GitHub não vão quebrar.

## 📁 Arquivos da Skill

```
guardian/
├── SKILL.md           # Instruções principais do agente
├── README.md          # Esta documentação
└── checklist.md       # Checklist completo de validações
```

## 🎯 Objetivo

Garantir que **antes** de fazer commit, push ou release:

1. ✅ **Linters passam** (formatação e qualidade)
2. ✅ **Testes passam** (100% de sucesso)
3. ✅ **Builds funcionam** (compila sem erros)
4. ✅ **CI/CD vai passar** (simula localmente)
5. ✅ **Versionamento correto** (se release)
6. ✅ **CHANGELOG atualizado** (se release)

## 🚀 Modos de Operação

### 1. Modo Commit (Padrão)

**Uso:**

```
@skill guardian
```

**O que faz:**

- ✅ Executa validações essenciais (linters + testes + build)
- ✅ Gera mensagem de commit (Conventional Commits)
- ✅ Faz `git add` e `git commit`
- ❌ **NÃO** faz push

**Quando usar:** Após completar uma tarefa, antes de push

---

### 2. Modo Push

**Uso:**

```
@skill guardian push
```

**O que faz:**

- ✅ Executa validações completas (inclui simulação CI)
- ✅ Faz commit
- ✅ Faz `git push origin <branch>`

**Quando usar:** Quando tiver certeza que quer enviar para repositório remoto

⚠️ **Aviso:** Nunca faz force push em branches principais

---

### 3. Modo Release

**Uso:**

```
@skill guardian release
```

**O que faz:**

- ✅ Executa validações completas + extras
- ✅ Valida versionamento (SemVer)
- ✅ Valida CHANGELOG.md
- ✅ Faz commit
- ✅ Cria tag anotada (`v1.2.3`)
- ✅ Faz push (branch + tag)
- ✅ Prepara release notes

**Quando usar:** Criar uma nova versão do projeto

---

### 4. Modo Dry-Run

**Uso:**

```
@skill guardian dry-run
```

**O que faz:**

- ✅ Executa **todas as validações**
- ❌ **NÃO** faz operações Git (commit/push/tag)
- ✅ Gera relatório completo

**Quando usar:** Verificar se está tudo ok antes de decidir commitar

---

## 📋 Validações Executadas

### Validação Rápida (Modo Commit)

```bash
✅ cargo fmt --check
✅ cargo clippy -- -D warnings
✅ cargo test --all
✅ cargo build --release
✅ Verificar arquivos sensíveis
```

**Tempo**: ~2-5 minutos

### Validação Completa (Modo Push)

```bash
✅ Linters (Rust, JS, Python, Markdown)
✅ Testes (unitários + integração)
✅ Build (core + bindings)
✅ Simulação CI/CD
✅ Cargo audit (vulnerabilidades)
✅ Documentação gera sem erros
```

**Tempo**: ~5-15 minutos

### Validação de Release (Modo Release)

```bash
✅ Todas as validações anteriores
✅ Versionamento SemVer correto
✅ CHANGELOG atualizado
✅ Tags não existentes
✅ Release notes preparadas
```

**Tempo**: ~15-30 minutos

## 🔴 Bloqueadores Críticos

Estas validações **SEMPRE BLOQUEIAM**:

| Problema                         | Solução                            |
| -------------------------------- | ---------------------------------- |
| 🔴 Linter falhou                 | `cargo fmt` e `cargo clippy --fix` |
| 🔴 Testes falharam               | Corrigir testes quebrados          |
| 🔴 Build falhou                  | Corrigir erros de compilação       |
| 🔴 Vulnerabilidades críticas     | Atualizar dependências             |
| 🔴 Arquivos sensíveis detectados | Remover .env, secrets              |

**Ação**: Guardian para e mostra o erro. Corrigir antes de tentar novamente.

## 🟡 Avisos (Não Bloqueiam)

Estes avisos **NÃO BLOQUEIAM** mas são reportados:

| Aviso                          | Recomendação             |
| ------------------------------ | ------------------------ |
| ⚠️ CHANGELOG não atualizado    | Adicionar entrada        |
| ⚠️ Dependências desatualizadas | Considerar atualizar     |
| ⚠️ Cobertura baixa (<80%)      | Adicionar mais testes    |
| ⚠️ Warnings de compilação      | Corrigir quando possível |

**Ação**: Guardian continua mas sugere melhorias.

## 📊 Exemplo de Relatório

```markdown
## 🛡️ Guardian Report

**Data**: 2025-11-04 15:30:00
**Modo**: Push
**Resultado**: ✅ Sucesso

### Validações Executadas

#### ✅ Linters

- ✅ cargo fmt --check (0.5s)
- ✅ cargo clippy (3.2s)

#### ✅ Testes

- ✅ cargo test --all (45.8s)
- 127 testes executados
- 127 passaram, 0 falharam
- Cobertura: 89%

#### ✅ Builds

- ✅ cargo build --release (1m 23s)
- ✅ wasm build (18.3s)
- ✅ node build (12.1s)

#### ✅ CI Simulation

- ✅ Simulou workflow ci.yml
- ✅ Todos os comandos passaram

### Git Operations

**Commit:**

- Branch: feature/email-validation
- Hash: a1b2c3d4
- Mensagem:
```

feat(validation): add email validation

- Implemented validate_email() with RFC 5322 regex
- Added 12 tests with 92% coverage
- Updated README and CHANGELOG

```

**Push:**
- Remote: origin
- Branch: feature/email-validation
- Status: ✅ Pushed successfully

### Arquivos Commitados (7)

- src/validation.rs (novo)
- src/auth.rs
- src/error.rs
- tests/validation_test.rs (novo)
- tests/integration_test.rs
- README.md
- CHANGELOG.md

### Tempo Total

2m 45s

### Próximos Passos

1. ✅ Criar Pull Request no GitHub
2. ⏳ Aguardar CI/CD passar
3. 👤 Solicitar code review
4. 🔀 Merge após aprovação
```

## 🔒 Segurança

### Proteções Implementadas

✅ **Nunca** faz `git push --force` em `main` ou `master`
✅ **Sempre** verifica .gitignore antes de adicionar arquivos
✅ **Sempre** detecta arquivos sensíveis (.env, secrets, tokens)
✅ **Sempre** pede confirmação antes de push (a menos que explícito)
✅ **Sempre** usa mensagens de commit estruturadas (Conventional Commits)

### Permissões Necessárias

| Operação          | Permissão   | Quando                |
| ----------------- | ----------- | --------------------- |
| Validações apenas | Nenhuma     | Dry-run               |
| Commit            | `git_write` | Commit, Push, Release |
| Push              | `git_write` | Push, Release         |
| Tag               | `git_write` | Release               |

## 🔗 Integração com Workflow

### Uso Integrado

```
Developer
    ↓
Orchestrator (executa Analyst → Development → Testing → Review → Documentation)
    ↓
Analyst (validação final)
    ↓
Guardian (commit/push) ← Você está aqui
    ↓
GitHub (CI/CD)
    ↓
Pull Request
```

### Uso Standalone

```bash
# Você fez mudanças manualmente
git status

# Valida e commita
@skill guardian

# Ou valida, commita e push
@skill guardian push
```

## 🎯 Casos de Uso

### Caso 1: Após Workflow Completo

```
# Completou todo o workflow
@skill orchestrator
[Tarefa implementada]

# Agora quer fazer push
@skill guardian push
```

### Caso 2: Mudanças Manuais

```
# Você fez mudanças manuais no código
vim src/file.rs

# Quer commitar com segurança
@skill guardian
```

### Caso 3: Criar Release

```
# Atualizar versão em Cargo.toml
# Atualizar CHANGELOG.md

# Criar release
@skill guardian release
```

### Caso 4: Verificar Antes de Commitar

```
# Quer apenas verificar, sem commitar ainda
@skill guardian dry-run

# Se tudo ok, commita
@skill guardian
```

## 📚 Referências

- **checklist.md**: Checklist completo de todas as validações
- **SKILL.md**: Instruções detalhadas para o agente
- **Conventional Commits**: https://www.conventionalcommits.org/
- **SemVer**: https://semver.org/
- **Keep a Changelog**: https://keepachangelog.com/

## 🆚 Comparação com CI/CD

| Aspecto        | Guardian (Local)    | GitHub Actions (CI) |
| -------------- | ------------------- | ------------------- |
| **Velocidade** | ⚡ Rápido (2-5 min) | 🐌 Lento (5-15 min) |
| **Quando**     | Antes de push       | Após push           |
| **Feedback**   | ✅ Imediato         | ⏳ Aguardar         |
| **Custo**      | 🆓 Grátis (local)   | 💰 Consome minutos  |
| **Objetivo**   | Prevenir erros      | Validar final       |

**Conclusão**: Guardian previne problemas **antes** de push, economizando tempo e minutos de CI.

## ❓ FAQ

### P: Guardian substitui CI/CD?

**R:** Não! Guardian **complementa** CI/CD. Ele previne erros localmente antes de push, mas CI/CD continua sendo a validação final autoritativa.

### P: O que acontece se Guardian falhar?

**R:** Guardian para e mostra o erro. Você corrige o problema e executa novamente. **Nada é commitado** se houver falhas.

### P: Guardian pode quebrar meu repositório?

**R:** Não. Guardian tem proteções de segurança:

- Nunca force push
- Detecta arquivos sensíveis
- Valida antes de commit
- Pede confirmação antes de push

### P: Posso pular validações?

**R:** Não é recomendado. Validações existem para prevenir problemas. Se REALMENTE necessário, faça commit manualmente com `git commit --no-verify`.

### P: Quanto tempo demora?

**R:**

- Commit: 2-5 minutos
- Push: 5-15 minutos
- Release: 15-30 minutos

Depende do tamanho do projeto e número de bindings.

### P: Guardian funciona em qualquer linguagem?

**R:** Sim! Guardian detecta automaticamente:

- Rust (cargo)
- Node (npm/yarn)
- Python (pip/poetry)
- Go (go)
- Java (maven/gradle)

---

**Versão**: 1.0
**Última atualização**: 2025-11-04
**Compatível com**: Qualquer projeto com Git

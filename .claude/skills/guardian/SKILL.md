# Guardian Skill

**Version**: 2.0.0
**Phase**: 7. Validation & Release (Optional)
**Responsibility**: Ensure quality before commit/push/release

---

## Purpose

O Guardian é o **guardião da qualidade** que valida tudo antes de fazer commit, push ou criar uma nova versão. Ele garante que:

1. **Linters passam** (clippy, rustfmt, eslint, etc)
2. **Todos os testes passam**
3. **Builds funcionam** em todas as plataformas
4. **Workflows do GitHub não vão quebrar**
5. **Versionamento está correto**
6. **Changelog está atualizado**

---

## Related Skills

### Prerequisites (must complete before):
- **analyst** - Final validation complete (Phase 7)
- **documenter** - Documentation updated (Phase 6)
- All phases 1-6 completed successfully

### Follows this skill (typical flow):
- None (Guardian is the final step before git operations)

### Works with (parallel/collaborative):
- None (Guardian works independently for final validation)

---

## When to Use

### Opção 1: Após Workflow Completo

```
@skill orchestrator
[Sua tarefa]

# Após todas as fases (Development → Testing → Review → Documentation)
@skill guardian
```

### Opção 2: Standalone (Antes de Push)

```
# Você fez mudanças manualmente e quer validar antes de commit/push
@skill guardian
```

### Opção 3: Para Release

```
@skill guardian release
```

## Instruções

### 1. Inicialização

1. **Verificar Status do Git**

   - Executar `git status` para ver mudanças pendentes
   - Listar arquivos modificados, adicionados, deletados
   - Verificar se há commits não pushados

2. **Ler Contexto**

   - Se existe `.agent-task.md`: Ler para entender o que foi feito
   - Identificar tipo de mudança (feature, fix, docs, chore)
   - Determinar se é um release ou commit normal

3. **Determinar Modo de Operação**
   - **Modo Commit**: Validar e fazer commit
   - **Modo Push**: Validar, commit e push
   - **Modo Release**: Validar, commit, tag, push, atualizar versão

### 2. Validações (Checklist Obrigatório)

#### 2.1 Linters

**Objetivo**: Garantir que código segue padrões

- [ ] **Rust**: `cargo fmt --check` (verifica formatação)
- [ ] **Rust**: `cargo clippy -- -D warnings` (linter rigoroso)
- [ ] **JavaScript/Node**: `npm run lint` ou `eslint` (se existir)
- [ ] **Python**: `pylint` ou `flake8` (se existir)
- [ ] **Markdown**: `markdownlint` (se existir)

**Se falhar**: 🔴 **BLOQUEIA** - Não pode prosseguir

**Como corrigir**:

```bash
# Rust
cargo fmt
cargo clippy --fix

# JavaScript
npm run lint:fix
```

#### 2.2 Testes

**Objetivo**: Garantir que funcionalidade não quebrou

- [ ] **Testes unitários**: `cargo test` ou equivalente
- [ ] **Testes de integração**: Se existirem
- [ ] **Verificar cobertura**: Deve ser >= 80% (se configurado)
- [ ] **Todos os testes passam**: 100% de sucesso

**Se falhar**: 🔴 **BLOQUEIA** - Não pode prosseguir

**Comandos**:

```bash
# Rust
cargo test --all

# Node
npm test

# Python
pytest

# Go
go test ./...
```

#### 2.3 Builds

**Objetivo**: Garantir que compila em todas as plataformas

- [ ] **Build Core**: `cargo build --release -p tracker`
- [ ] **Build WASM**: `make build-wasm` (se aplicável)
- [ ] **Build Node**: `make build-node` (se aplicável)
- [ ] **Build Python**: `make build-python` (se aplicável)
- [ ] **Build Java**: `make build-java` (se aplicável)
- [ ] **Build Go**: `make build-go` (se aplicável)

**Se falhar**: 🔴 **BLOQUEIA** - Não pode prosseguir

**Nota**: Em projetos grandes, pode validar apenas core + um binding para velocidade

#### 2.4 Validações de Projeto

**Objetivo**: Verificar integridade do projeto

- [ ] **Cargo.lock**: Está atualizado e sem conflitos (Rust)
- [ ] **package-lock.json**: Está atualizado (Node)
- [ ] **Dependências**: Sem vulnerabilidades conhecidas
- [ ] **Documentação**: Gera sem erros (`cargo doc` ou equivalente)
- [ ] **Exemplos**: Compilam sem erros

**Se falhar**: 🟠 **AVISA** - Pode prosseguir com cautela

#### 2.5 Validação de CI/CD

**Objetivo**: Simular o que GitHub Actions vai fazer

- [ ] **Ler workflows**: Verificar `.github/workflows/*.yml`
- [ ] **Simular comandos**: Executar comandos que CI vai executar
- [ ] **Verificar secrets**: Alertar se workflow precisa de secrets não configurados

**Comandos comuns em CI**:

```bash
# Exemplo de workflow típico
cargo fmt --check
cargo clippy -- -D warnings
cargo test --all
cargo build --release
```

**Se falhar**: 🔴 **BLOQUEIA** - CI vai quebrar

### 3. Preparação para Commit

#### 3.1 Gerar Mensagem de Commit

**Formato Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types comuns**:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Apenas documentação
- `style`: Formatação, sem mudança de código
- `refactor`: Refatoração
- `test`: Adicionar testes
- `chore`: Manutenção, build, CI

**Exemplo**:

```
feat(validation): add email validation to user registration

- Implemented validate_email() with RFC 5322 regex
- Added 12 tests with 92% coverage
- Updated README and CHANGELOG

Closes #123
```

**Gerar automaticamente**:

1. Ler `.agent-task.md` (se existir) para entender mudanças
2. Identificar tipo de mudança
3. Listar arquivos modificados
4. Criar mensagem descritiva

#### 3.2 Verificar CHANGELOG

**Se CHANGELOG.md existe**:

- [ ] Verificar se há entrada para versão atual/próxima
- [ ] Validar formato (Keep a Changelog)
- [ ] Confirmar que mudanças estão documentadas

**Se não existe entrada**: 🟡 **AVISA** - Recomenda adicionar

### 4. Operações Git

#### 4.1 Stage (Adicionar arquivos)

```bash
# Adicionar apenas arquivos rastreados modificados
git add -u

# OU adicionar arquivos específicos
git add <arquivos>
```

**Verificações**:

- [ ] Não adicionar arquivos sensíveis (.env, secrets)
- [ ] Não adicionar binários desnecessários
- [ ] Verificar .gitignore está correto

#### 4.2 Commit

```bash
git commit -m "<mensagem gerada>"
```

**Verificações**:

- [ ] Mensagem segue Conventional Commits
- [ ] Mensagem é descritiva
- [ ] Referencia issues (se aplicável)

**Requer**: `git_write` permission

#### 4.3 Push (Opcional)

**Apenas se solicitado explicitamente**

```bash
git push origin <branch>
```

**Verificações**:

- [ ] Branch atual não é `main` ou `master` (a menos que explícito)
- [ ] Não é force push (nunca fazer `git push --force` em main)
- [ ] Remote está configurado

**Requer**: `git_write` permission

⚠️ **AVISO**: Nunca fazer force push em branches principais!

### 5. Release (Modo Especial)

**Apenas quando explicitamente solicitado**: `@skill guardian release`

#### 5.1 Validar Versão

**Para Rust (Cargo.toml)**:

```toml
[package]
version = "1.2.3"
```

**Para Node (package.json)**:

```json
{
  "version": "1.2.3"
}
```

**Para Python (pyproject.toml)**:

```toml
[project]
version = "1.2.3"
```

**Verificações**:

- [ ] Versão segue SemVer (MAJOR.MINOR.PATCH)
- [ ] Versão foi incrementada corretamente:
  - **MAJOR**: Breaking changes
  - **MINOR**: Novas features (compatível)
  - **PATCH**: Bug fixes (compatível)
- [ ] Versão é consistente em todos os arquivos

#### 5.2 Atualizar CHANGELOG

```markdown
## [1.2.3] - 2025-11-04

### Added

- Nova funcionalidade X

### Changed

- Modificação em Y

### Fixed

- Correção de bug Z
```

**Verificações**:

- [ ] Data está correta
- [ ] Versão está correta
- [ ] Mudanças estão categorizadas
- [ ] Link de comparação está presente

#### 5.3 Criar Tag

```bash
# Tag anotada com mensagem
git tag -a v1.2.3 -m "Release version 1.2.3"

# Push da tag
git push origin v1.2.3
```

**Verificações**:

- [ ] Tag segue formato `vMAJOR.MINOR.PATCH`
- [ ] Tag não existe ainda
- [ ] Tag está anotada (não lightweight)

**Requer**: `git_write` permission

#### 5.4 GitHub Release (Opcional)

**Criar release no GitHub**:

- Usar GitHub CLI: `gh release create v1.2.3`
- Ou instruir desenvolvedor a criar manualmente

**Incluir**:

- Título: "Release v1.2.3"
- Descrição: Conteúdo do CHANGELOG para esta versão
- Assets: Binários compilados (se aplicável)

### 6. Relatório Final

Gerar relatório em `.agent-task.md` ou criar novo arquivo `.guardian-report.md`:

```markdown
## 🛡️ Guardian Report

**Data**: 2025-11-04 15:30:00
**Modo**: Commit + Push
**Resultado**: ✅ Sucesso

### Validações Executadas

#### ✅ Linters

- ✅ cargo fmt --check
- ✅ cargo clippy

#### ✅ Testes

- ✅ cargo test --all
- 15 testes executados, 100% passando
- Cobertura: 92%

#### ✅ Builds

- ✅ cargo build --release
- ✅ Build WASM
- ✅ Build Node

#### ✅ CI/CD Simulation

- ✅ Simulou workflow `ci.yml`
- ✅ Todos os comandos passaram

### Git Operations

#### Commit

- **Branch**: feature/email-validation
- **Hash**: `a1b2c3d`
- **Mensagem**:
```

feat(validation): add email validation to user registration

- Implemented validate_email() with RFC 5322 regex
- Added 12 tests with 92% coverage
- Updated README and CHANGELOG

```

#### Push
- **Remote**: origin
- **Branch**: feature/email-validation
- **Status**: ✅ Pushed successfully

### Arquivos Commitados

- src/validation.rs
- src/auth.rs
- tests/validation_test.rs
- README.md
- CHANGELOG.md

### Próximos Passos

1. Criar Pull Request no GitHub
2. Aguardar CI/CD passar
3. Solicitar code review humano
4. Merge após aprovação
```

## Checklist de Segurança

Antes de executar qualquer operação Git:

- [ ] **Nunca** fazer force push em `main` ou `master`
- [ ] **Nunca** commitar secrets ou .env files
- [ ] **Sempre** verificar .gitignore antes de stage
- [ ] **Sempre** simular CI antes de push
- [ ] **Sempre** pedir confirmação antes de push
- [ ] **Sempre** usar conventional commits

## Comandos Úteis

```bash
# Verificar status
git status

# Ver diff antes de commit
git diff

# Ver staged changes
git diff --staged

# Simular CI local
cargo fmt --check && cargo clippy -- -D warnings && cargo test --all

# Verificar versão atual
cargo pkgid | cut -d# -f2  # Rust
npm version                # Node
```

## Outputs

- Relatório de validações executadas
- Commit (se aprovado)
- Push (se solicitado e aprovado)
- Tag (se release)
- `.guardian-report.md` com detalhes

## Erros Comuns e Soluções

### 🔴 Linter falhou

```bash
# Corrigir automaticamente
cargo fmt
cargo clippy --fix --allow-dirty
```

### 🔴 Testes falharam

```bash
# Executar testes com output detalhado
cargo test --all -- --nocapture

# Executar teste específico
cargo test test_name -- --exact
```

### 🔴 Build falhou

```bash
# Ver erro detalhado
cargo build --verbose

# Limpar e rebuildar
cargo clean && cargo build
```

### 🟡 CHANGELOG não atualizado

1. Editar `CHANGELOG.md`
2. Adicionar entrada para versão
3. Re-executar guardian

## Integração com Workflow

O Guardian pode ser integrado ao final do workflow completo:

```
Developer → Analyst → Development → Testing → Code Review → Documentation → Guardian → Push
```

Ou usado isoladamente antes de qualquer commit/push.

## Permissões Necessárias

- **`git_write`**: Para commit, push, tag
- **Nenhuma**: Apenas para validações (modo dry-run)

## Modo Dry-Run

Para validar sem fazer commit/push:

```
@skill guardian dry-run
```

Executa todas as validações mas **não** faz operações Git.

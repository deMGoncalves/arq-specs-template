# Guardian Validation Checklist

Este checklist deve ser executado **antes de qualquer commit, push ou release**.

## 🎯 Validação Rápida (Essencial)

Use este checklist mínimo para commits normais:

```bash
# 1. Linters
- [ ] cargo fmt --check
- [ ] cargo clippy -- -D warnings

# 2. Testes
- [ ] cargo test --all

# 3. Build core
- [ ] cargo build --release

# 4. Status Git
- [ ] git status (verificar arquivos)
- [ ] Sem arquivos sensíveis (.env, secrets)
```

**Tempo estimado**: ~2-5 minutos

---

## 🛡️ Validação Completa (Antes de Push)

Use este checklist completo antes de fazer push:

### 1. Linters e Formatação

#### Rust

```bash
- [ ] cargo fmt --check
      # Se falhar: cargo fmt

- [ ] cargo clippy --all-targets --all-features -- -D warnings
      # Se falhar: cargo clippy --fix --allow-dirty
```

#### JavaScript/Node (se existir)

```bash
- [ ] npm run lint
      # Se falhar: npm run lint:fix

- [ ] prettier --check .
      # Se falhar: prettier --write .
```

#### Python (se existir)

```bash
- [ ] black --check .
      # Se falhar: black .

- [ ] pylint src/
```

#### Markdown

```bash
- [ ] markdownlint **/*.md --ignore node_modules
```

**Critério**: 100% dos linters devem passar

---

### 2. Testes

#### Testes Unitários

```bash
- [ ] cargo test --lib
      # Testa apenas library code
```

#### Testes de Integração

```bash
- [ ] cargo test --test '*'
      # Testa integration tests
```

#### Testes Completos

```bash
- [ ] cargo test --all --all-features
      # Testa tudo
```

#### Cobertura (Opcional)

```bash
- [ ] cargo tarpaulin --out Html
      # Gera relatório de cobertura
      # Meta: >= 80%
```

**Critério**: 100% dos testes devem passar

---

### 3. Builds

#### Core

```bash
- [ ] cargo build --release -p tracker
      # Build do core em modo release
```

#### Documentação

```bash
- [ ] cargo doc --no-deps
      # Docs devem gerar sem erros
```

#### Bindings (Se aplicável)

```bash
- [ ] make build-wasm
- [ ] make build-node
- [ ] make build-python
- [ ] make build-java
- [ ] make build-go
```

**Nota**: Para velocidade, pode testar apenas 1-2 bindings críticos

**Critério**: Todos os builds devem suceder

---

### 4. Validações de Dependências

#### Vulnerabilidades

```bash
- [ ] cargo audit
      # Verifica vulnerabilidades conhecidas
```

#### Dependências Atualizadas

```bash
- [ ] cargo outdated
      # Mostra dependências desatualizadas
      # Não bloqueia, apenas informa
```

#### Lock File

```bash
- [ ] Cargo.lock está commitado e atualizado
- [ ] package-lock.json está commitado (Node)
```

**Critério**: Sem vulnerabilidades críticas

---

### 5. Simulação de CI/CD

Simular exatamente o que `.github/workflows/ci.yml` vai executar:

#### Workflow Típico

```bash
# 1. Setup
- [ ] Rust version correta (ver rust-toolchain.toml)

# 2. Cache
- [ ] Cargo cache limpo (se problemas)

# 3. Checks
- [ ] cargo fmt --check
- [ ] cargo clippy -- -D warnings

# 4. Build
- [ ] cargo build --release

# 5. Test
- [ ] cargo test --all

# 6. Doc
- [ ] cargo doc --no-deps
```

#### Ler Workflow Real

```bash
- [ ] Ler .github/workflows/*.yml
- [ ] Identificar comandos executados
- [ ] Executar mesmos comandos localmente
```

**Critério**: Todos os comandos do CI devem passar localmente

---

### 6. Validações de Documentação

```bash
- [ ] README.md está atualizado
- [ ] CHANGELOG.md tem entrada (se release)
- [ ] Doc comments existem em APIs públicas
- [ ] Exemplos compilam (cargo test --examples)
```

**Critério**: Documentação sincronizada com código

---

### 7. Validações Git

#### Status

```bash
- [ ] git status
      # Ver arquivos modificados

- [ ] git diff
      # Revisar mudanças
```

#### Segurança

```bash
- [ ] Sem arquivos .env ou secrets
- [ ] Sem binários desnecessários (target/, node_modules/)
- [ ] .gitignore está correto
```

#### Branch

```bash
- [ ] Branch atual é feature/* ou fix/* (não main)
      # OU tem permissão explícita para commitar em main
```

**Critério**: Apenas arquivos necessários serão commitados

---

## 🚀 Validação de Release (Apenas para Releases)

Use este checklist adicional antes de criar uma nova versão:

### 1. Versionamento

```bash
- [ ] Versão incrementada corretamente em:
      - [ ] Cargo.toml (Rust)
      - [ ] package.json (Node)
      - [ ] pyproject.toml (Python)

- [ ] Versão segue SemVer (MAJOR.MINOR.PATCH)

- [ ] Tipo de incremento está correto:
      - [ ] MAJOR: Breaking changes
      - [ ] MINOR: Novas features (compatível)
      - [ ] PATCH: Bug fixes (compatível)
```

### 2. CHANGELOG

```bash
- [ ] CHANGELOG.md atualizado com:
      - [ ] Nova versão e data
      - [ ] Seções: Added, Changed, Deprecated, Removed, Fixed, Security
      - [ ] Link de comparação entre versões

- [ ] Todas as mudanças relevantes estão documentadas

- [ ] Formato segue Keep a Changelog
```

### 3. Documentação de Release

```bash
- [ ] README tem informações da nova versão

- [ ] Migration guide (se breaking changes)

- [ ] Release notes preparadas para GitHub
```

### 4. Builds de Release

```bash
- [ ] cargo build --release (otimizado)

- [ ] Build de todos os bindings em modo release

- [ ] Artefatos testados (wheel, .node, .wasm, etc)
```

### 5. Tags Git

```bash
- [ ] Tag ainda não existe: git tag -l | grep vX.Y.Z

- [ ] Tag será anotada (não lightweight)

- [ ] Mensagem da tag está preparada
```

### 6. Validação Final

```bash
- [ ] Todas as validações anteriores passaram

- [ ] CI/CD está verde

- [ ] Nenhum issue blocker aberto

- [ ] PR aprovado (se aplicável)
```

---

## 📋 Checklist Matriz por Tipo de Mudança

| Validação        | Commit Normal | Push           | Release        |
| ---------------- | ------------- | -------------- | -------------- |
| Linters          | ✅            | ✅             | ✅             |
| Testes unitários | ✅            | ✅             | ✅             |
| Build core       | ✅            | ✅             | ✅             |
| Build bindings   | ⚠️ Opcional   | ✅             | ✅             |
| Cargo audit      | ❌            | ⚠️ Recomendado | ✅             |
| Simulação CI     | ❌            | ✅             | ✅             |
| CHANGELOG        | ⚠️ Se mudança | ⚠️ Se mudança  | ✅ Obrigatório |
| Versão           | ❌            | ❌             | ✅ Obrigatório |
| Tag              | ❌            | ❌             | ✅ Obrigatório |

**Legenda:**

- ✅ Obrigatório
- ⚠️ Recomendado
- ❌ Não necessário

---

## 🔴 Bloqueadores Críticos

Estas validações **SEMPRE BLOQUEIAM** commit/push/release:

1. ❌ **Linters falharam** → Código não está formatado
2. ❌ **Testes falharam** → Funcionalidade quebrada
3. ❌ **Build falhou** → Código não compila
4. ❌ **Vulnerabilidades críticas** → Segurança comprometida
5. ❌ **Arquivos sensíveis detectados** → Vazamento de secrets

**Ação**: Corrigir problemas antes de prosseguir

---

## 🟡 Avisos (Não Bloqueiam)

Estes avisos **NÃO BLOQUEIAM** mas devem ser considerados:

1. ⚠️ **CHANGELOG não atualizado** → Recomenda atualizar
2. ⚠️ **Dependências desatualizadas** → Considera atualizar
3. ⚠️ **Cobertura de testes baixa** → Adicionar mais testes
4. ⚠️ **Documentação incompleta** → Melhorar docs
5. ⚠️ **Warnings de compilação** → Corrigir quando possível

**Ação**: Revisar e decidir se corrige agora ou depois

---

## 🚦 Fluxo de Decisão

```
Executar Validações
        ↓
   Tem Bloqueadores? ──YES──> 🔴 PARAR
        ↓                      Corrigir e re-executar
       NO
        ↓
   Tem Avisos? ──YES──> ⚠️ REVISAR
        ↓                Decidir: corrigir agora ou depois
       NO
        ↓
   ✅ PROSSEGUIR
   Commit/Push/Release
```

---

## ⏱️ Tempo Estimado

| Tipo         | Tempo     | Validações                            |
| ------------ | --------- | ------------------------------------- |
| **Quick**    | 2-5 min   | Linters + Testes core + Build         |
| **Normal**   | 5-10 min  | Quick + Simulação CI + 1-2 bindings   |
| **Completo** | 15-30 min | Todas as validações + Todos bindings  |
| **Release**  | 30-60 min | Completo + Versionamento + Tag + Docs |

---

## 🛠️ Script de Automação (Sugestão)

Criar script `.guardian.sh` para automatizar:

```bash
#!/bin/bash
# Guardian Validation Script

echo "🛡️ Guardian: Starting validations..."

# 1. Linters
echo "📝 Running linters..."
cargo fmt --check || { echo "❌ Format failed"; exit 1; }
cargo clippy -- -D warnings || { echo "❌ Clippy failed"; exit 1; }

# 2. Tests
echo "🧪 Running tests..."
cargo test --all || { echo "❌ Tests failed"; exit 1; }

# 3. Build
echo "🔨 Building..."
cargo build --release || { echo "❌ Build failed"; exit 1; }

# 4. Audit
echo "🔒 Checking vulnerabilities..."
cargo audit || echo "⚠️ Vulnerabilities found"

echo "✅ All validations passed!"
```

Uso:

```bash
chmod +x .guardian.sh
./.guardian.sh
```

---

**Última atualização**: 2025-11-04
**Compatível com**: Rust, Node, Python, Go, Java

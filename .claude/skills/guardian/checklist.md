# Guardian - Checklist de Validação Pré-Commit

**ID**: SKL-009
**Categoria**: 🛡️ Pre-commit Validation
**Fase**: 7 (Final gate)
**Criticidade**: 🔴 CRITICAL (previne commits ruins)

---

## ✅ 1. Linters e Formatação

```markdown
- [ ] cargo fmt --check (Rust) OU prettier --check (JS/TS)
- [ ] cargo clippy -- -D warnings OU eslint
- [ ] 0 warnings, 0 errors
```

**Critério**: 100% clean

---

## ✅ 2. Testes

```markdown
- [ ] cargo test --all OU npm test
- [ ] 100% dos testes passando
- [ ] Cobertura ≥80% (cargo tarpaulin OU jest --coverage)
```

**Critério**: All tests passing + coverage ≥80%

---

## ✅ 3. Build

```markdown
- [ ] cargo build --release OU npm run build
- [ ] Build sucedeu sem erros
```

**Critério**: Clean build

---

## ✅ 4. Conformidade com Constitution

```markdown
- [ ] Código segue DDD Co-Located structure
- [ ] Object Calisthenics aplicado (39 rules)
- [ ] Spec-driven (código tem spec correspondente)
- [ ] Testes escritos junto com código (TDD)
```

**Critério**: 100% conforme

---

## ✅ 5. Segurança

```markdown
- [ ] Sem arquivos sensíveis (.env, secrets)
- [ ] Sem credenciais hardcoded
- [ ] cargo audit OU npm audit (sem vulnerabilidades críticas)
```

**Critério**: 0 security issues

---

## ✅ 6. Documentação

```markdown
- [ ] README atualizado (se necessário)
- [ ] CHANGELOG atualizado (se release)
- [ ] Doc comments em APIs públicas
- [ ] specs/ atualizado (se mudança arquitetural)
```

**Critério**: Docs sincronizados com código

---

## 🚦 Gate Final

**TODOS os critérios devem passar**:
- [x] Linters: 100% clean
- [x] Testes: 100% passing, ≥80% coverage
- [x] Build: Sucesso
- [x] Constitution: Conforme
- [x] Segurança: 0 issues
- [x] Docs: Sincronizados

**Pass**: ✅ Commit autorizado
**Fail**: ❌ BLOQUEAR commit, corrigir problemas

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

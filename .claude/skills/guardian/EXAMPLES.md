# Guardian - Exemplos de Uso

**ID**: SKL-009
**Fase**: 7 (Pre-commit validation)

## Exemplo: Validação Pré-Commit Bem-Sucedida

**Trigger**: User executa `git commit`

**Process**:
1. ✅ Linters: 0 warnings (cargo fmt, clippy)
2. ✅ Tests: 147 passing, 89% coverage
3. ✅ Build: Success
4. ✅ Constitution: Conforme
5. ✅ Security: 0 issues
6. ✅ Docs: Sincronizados

**Output**: ✅ Commit autorizado

## Exemplo: Validação Rejeitada

**Trigger**: User tenta commit com testes falhando

**Process**:
1. ✅ Linters: OK
2. ❌ Tests: 5/147 failing
3. ⏸️ Build: Not executed (blocked by tests)

**Output**: ❌ BLOQUEADOR
```
🛡️ Guardian: Commit REJEITADO

Razão: 5 testes falhando
- test_email_validation: FAIL
- test_rate_limiting: FAIL
- test_token_rotation: FAIL
- test_audit_log: FAIL
- test_2fa_validation: FAIL

Ação: Corrigir testes antes de commit
```

---

**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

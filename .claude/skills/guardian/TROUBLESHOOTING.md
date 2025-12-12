# Guardian - Troubleshooting

**ID**: SKL-009

## Problema: Lint Falhando

**Sintomas**: cargo fmt --check fails

**Solução**: 
```bash
cargo fmt  # Format code
cargo fmt --check  # Verify
```

## Problema: Testes Falhando

**Sintomas**: Tests failing

**Solução**: Debug tests, fix code, re-run
```bash
cargo test -- --nocapture  # Ver logs
```

## Problema: Build Falhando

**Sintomas**: Compilation errors

**Solução**: Fix compilation errors, ensure dependencies correct

## Problema: Vulnerabilidades Encontradas

**Sintomas**: cargo audit reports vulnerabilities

**Solução**:
```bash
cargo update  # Update dependencies
cargo audit  # Re-check
```

---

**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

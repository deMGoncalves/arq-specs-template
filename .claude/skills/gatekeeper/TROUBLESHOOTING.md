# Gatekeeper - Troubleshooting

**ID**: SKL-005

## Problema: Violações de Object Calisthenics

**Sintomas**: Multiple rule violations detected

**Solução**:
1. Identificar regra violada
2. Refatorar código
3. Re-executar gatekeeper

**Exemplo**:
```
Rule 001 (Max 1 level indentation): 
Extrair nested logic para funções privadas
```

## Problema: Spec Misalignment

**Sintomas**: Código difere da spec.md

**Solução**:
1. Re-ler spec.md
2. Identificar divergências
3. Implementar conforme spec
4. Re-validar

---

**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

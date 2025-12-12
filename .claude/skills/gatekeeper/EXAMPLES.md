# Gatekeeper - Exemplos de Uso

**ID**: SKL-005
**Fase**: 4 (Durante implementation)

## Exemplo: Validação Durante Dev

**Trigger**: developer completa TASK-015

**Process**:
1. Validar Object Calisthenics (39 rules)
2. Validar alinhamento com spec.md
3. Validar Constitution principles

**Output (Pass)**:
```
✅ TASK-015 validada

Conformidade:
- 39 rules: 100% ✅
- Spec alignment: 100% ✅
- Constitution: Conforme ✅
```

**Output (Fail)**:
```
❌ TASK-015 REJEITADA

Violações encontradas:
- Rule 001: 3 níveis de indentação (max 1) ← CRÍTICO
- Rule 002: Cláusula ELSE detectada em função X
- Rule 010 (SRP): Classe com 2 responsabilidades

Ação: Refatorar código antes de continuar
```

---

**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

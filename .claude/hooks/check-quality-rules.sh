#!/bin/bash
# check-quality-rules.sh - Verifica conformidade com regras de qualidade
# Hook executado após implementação de código

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Checking quality rules compliance..."

# Verifica se src/ existe
if [ ! -d "src" ]; then
    echo -e "${YELLOW}⚠️  No src/ directory found - skipping quality checks${NC}"
    exit 0
fi

# Contador de violações
violations=0

# Rule 001: Max 1 indentation level (aproximação)
# Procura por mais de 2 níveis de indentação (8 espaços ou mais)
deep_indent=$(grep -r "^        " src/ --include="*.ts" --include="*.js" 2>/dev/null | wc -l)
if [ "$deep_indent" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Rule 001: Found ${deep_indent} lines with >1 indentation level${NC}"
    ((violations++))
fi

# Rule 002: No ELSE clause
else_count=$(grep -r "\selse\s*{" src/ --include="*.ts" --include="*.js" 2>/dev/null | wc -l)
if [ "$else_count" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Rule 002: Found ${else_count} ELSE clauses${NC}"
    ((violations++))
fi

# Rule 030: No unsafe functions
unsafe=$(grep -r "eval\|Function\|innerHTML" src/ --include="*.ts" --include="*.js" 2>/dev/null | wc -l)
if [ "$unsafe" -gt 0 ]; then
    echo -e "${RED}❌ Rule 030: Found ${unsafe} unsafe functions (eval, Function, innerHTML)${NC}"
    ((violations++))
fi

# Rule 032: Test coverage (se tiver jest/vitest configurado)
if [ -f "package.json" ]; then
    if grep -q "\"coverage\"" package.json 2>/dev/null; then
        echo "📊 Running coverage check..."
        # Apenas informa, não bloqueia
        npm run coverage --silent 2>&1 | grep -E "All files|Statements" || true
    fi
fi

# Resultado final
if [ "$violations" -eq 0 ]; then
    echo -e "${GREEN}✅ Quality rules: COMPLIANT${NC}"
else
    echo -e "${YELLOW}⚠️  Found ${violations} potential quality rule violations${NC}"
    echo "💡 Tip: Review .claude/rules/ for details"
fi

exit 0

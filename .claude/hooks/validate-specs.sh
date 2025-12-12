#!/bin/bash
# validate-specs.sh - Valida a saúde das especificações
# Hook executado após comandos de especificação

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Validating specifications health..."

# Verifica se specs/ existe
if [ ! -d "specs" ]; then
    echo -e "${YELLOW}⚠️  Warning: specs/ directory not found${NC}"
    exit 0
fi

# Conta capítulos Arc42 presentes
chapters_found=0
for i in {01..12}; do
    if [ -d "specs/${i}_"* ] 2>/dev/null; then
        ((chapters_found++))
    fi
done

echo "📚 Arc42 chapters: ${chapters_found}/12"

# Conta cenários BDD
if [ -d "specs/06_runtime/scenarios" ]; then
    bdd_count=$(find specs/06_runtime/scenarios -name "SCN-*.md" 2>/dev/null | wc -l)
    echo "🎭 BDD scenarios: ${bdd_count}"
fi

# Conta ADRs
if [ -d "specs/09_decisions/adrs" ]; then
    adr_count=$(find specs/09_decisions/adrs -name "ADR-*.md" 2>/dev/null | wc -l)
    echo "📋 ADRs documented: ${adr_count}"
fi

# Verifica se há TODOs ou placeholders
todo_count=$(grep -r "TODO\|FIXME\|\[PLACEHOLDER\]" specs/ 2>/dev/null | wc -l)
if [ "$todo_count" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found ${todo_count} TODOs/placeholders in specs/${NC}"
fi

# Validação de saúde
if [ "$chapters_found" -ge 8 ]; then
    echo -e "${GREEN}✅ Specification health: GOOD${NC}"
    exit 0
elif [ "$chapters_found" -ge 5 ]; then
    echo -e "${YELLOW}⚠️  Specification health: ADEQUATE${NC}"
    exit 0
else
    echo -e "${RED}❌ Specification health: INCOMPLETE${NC}"
    echo "💡 Tip: Use /vision, /plan, /feature to complete specs"
    exit 0
fi

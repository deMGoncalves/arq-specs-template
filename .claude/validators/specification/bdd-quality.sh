#!/bin/bash
# bdd-quality.sh - Valida qualidade de cenários BDD
# Versão: 3.0.0

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🎭 Validando Qualidade de Cenários BDD${NC}"
echo ""

# Verificar se o diretório de cenários existe
if [ ! -d "specs/06_runtime/scenarios" ]; then
    echo -e "${YELLOW}⚠️  Diretório de cenários não encontrado${NC}"
    echo "💡 Use /feature para criar cenários BDD"
    exit 0
fi

# Encontrar todos os arquivos de cenário
scenarios=$(find specs/06_runtime/scenarios -name "SCN-*.md" 2>/dev/null)
scenario_count=$(echo "$scenarios" | wc -l | tr -d ' ')

if [ "$scenario_count" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Nenhum cenário BDD encontrado${NC}"
    echo "💡 Use /feature para criar cenários BDD"
    exit 0
fi

echo "📋 Encontrados ${scenario_count} cenários BDD"
echo ""

# Inicializar contadores
total_scenarios=0
valid_scenarios=0
warnings=0
errors=0

# Validar cada cenário
while IFS= read -r scenario_file; do
    if [ -z "$scenario_file" ]; then
        continue
    fi

    ((total_scenarios++))
    scenario_name=$(basename "$scenario_file")
    has_issues=false

    echo -e "${BLUE}Validando: ${scenario_name}${NC}"

    # Verificação 1: Tem declaração de Feature
    if grep -q "^Feature:" "$scenario_file"; then
        echo "  ✅ Declaração de Feature encontrada"
    else
        echo -e "  ${RED}❌ Declaração de Feature ausente${NC}"
        ((errors++))
        has_issues=true
    fi

    # Verificação 2: Tem pelo menos um Scenario
    if grep -q "^Scenario:" "$scenario_file"; then
        scenario_count_in_file=$(grep -c "^Scenario:" "$scenario_file")
        echo "  ✅ Scenarios: ${scenario_count_in_file}"
    else
        echo -e "  ${RED}❌ Nenhuma declaração de Scenario encontrada${NC}"
        ((errors++))
        has_issues=true
    fi

    # Verificação 3: Tem estrutura Given-When-Then
    has_given=$(grep -c "^\s*Given" "$scenario_file" || echo 0)
    has_when=$(grep -c "^\s*When" "$scenario_file" || echo 0)
    has_then=$(grep -c "^\s*Then" "$scenario_file" || echo 0)

    if [ "$has_given" -gt 0 ] && [ "$has_when" -gt 0 ] && [ "$has_then" -gt 0 ]; then
        echo "  ✅ Estrutura Given-When-Then completa"
    else
        echo -e "  ${YELLOW}⚠️  Given-When-Then incompleto (G:${has_given} W:${has_when} T:${has_then})${NC}"
        ((warnings++))
        has_issues=true
    fi

    # Verificação 4: Sem assertivas vagas
    if grep -qi "works\|functions\|is ok\|is good" "$scenario_file"; then
        echo -e "  ${YELLOW}⚠️  Assertivas vagas detectadas (works, functions, is ok)${NC}"
        echo "     💡 Use resultados específicos e mensuráveis"
        ((warnings++))
        has_issues=true
    fi

    # Verificação 5: Tem cenários de erro
    if grep -qi "error\|invalid\|fail\|exception" "$scenario_file"; then
        echo "  ✅ Cenários de erro incluídos"
    else
        echo -e "  ${YELLOW}⚠️  Nenhum cenário de erro encontrado${NC}"
        echo "     💡 Adicione cenários de tratamento de erro"
        ((warnings++))
    fi

    # Verificação 6: Valores específicos (não genéricos)
    if grep -qE "\[.*\]|<.*>|{.*}" "$scenario_file"; then
        echo -e "  ${YELLOW}⚠️  Placeholders detectados [ ] < > { }${NC}"
        echo "     💡 Use valores concretos (ex: 'usuario@exemplo.com' não <email>)"
        ((warnings++))
        has_issues=true
    fi

    # Verificação 7: Tem cláusulas And para efeitos colaterais
    has_and=$(grep -c "^\s*And" "$scenario_file" || echo 0)
    if [ "$has_and" -gt 0 ]; then
        echo "  ✅ Efeitos colaterais documentados (cláusulas And: ${has_and})"
    else
        echo -e "  ${YELLOW}⚠️  Nenhuma cláusula 'And' (faltam efeitos colaterais?)${NC}"
        ((warnings++))
    fi

    if [ "$has_issues" = false ]; then
        ((valid_scenarios++))
    fi

    echo ""
done <<< "$scenarios"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Resumo
echo -e "${BLUE}📊 Resumo${NC}"
echo "Total de cenários: ${total_scenarios}"
echo "Cenários válidos: ${valid_scenarios}"
echo "Avisos: ${warnings}"
echo "Erros: ${errors}"

# Avaliação de qualidade
if [ "$errors" -eq 0 ] && [ "$warnings" -eq 0 ]; then
    echo -e "Qualidade: ${GREEN}EXCELENTE ✨${NC}"
    exit 0
elif [ "$errors" -eq 0 ] && [ "$warnings" -le 3 ]; then
    echo -e "Qualidade: ${GREEN}BOA ✅${NC}"
    exit 0
elif [ "$errors" -le 2 ]; then
    echo -e "Qualidade: ${YELLOW}PRECISA MELHORAR ⚠️${NC}"
    exit 0
else
    echo -e "Qualidade: ${RED}RUIM ❌${NC}"
    exit 1
fi

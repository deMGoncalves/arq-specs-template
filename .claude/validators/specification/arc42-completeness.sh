#!/bin/bash
# arc42-completeness.sh - Valida completude da documentação Arc42
# Versão: 3.0.0

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Sem Cor

echo -e "${BLUE}🔍 Validando Completude da Documentação Arc42${NC}"
echo ""

# Inicializar contadores
chapters_found=0
chapters_missing=()
chapters_incomplete=()
total_score=0

# Capítulos Arc42 com requisitos mínimos de linhas
declare -A chapter_requirements=(
  ["01_introduction"]="100"
  ["02_constraints"]="50"
  ["03_context"]="150"
  ["04_solution-strategy"]="100"
  ["05_building-blocks"]="200"
  ["06_runtime"]="150"
  ["07_deployment"]="100"
  ["08_crosscutting"]="100"
  ["09_decisions"]="50"
  ["10_quality"]="100"
  ["11_risks"]="50"
  ["12_glossary"]="50"
)

# Verificar se o diretório specs existe
if [ ! -d "specs" ]; then
    echo -e "${RED}❌ Erro: diretório specs/ não encontrado${NC}"
    exit 1
fi

# Validar cada capítulo
for i in {01..12}; do
    chapter_found=false
    chapter_name=""

    # Encontrar diretório do capítulo
    for dir in specs/${i}_*/; do
        if [ -d "$dir" ]; then
            chapter_found=true
            chapter_name=$(basename "$dir")
            ((chapters_found++))

            # Contar linhas no capítulo
            line_count=0
            if [ -f "${dir}${i}_*.md" ]; then
                line_count=$(cat "${dir}"*.md 2>/dev/null | wc -l | tr -d ' ')
            fi

            # Obter linhas necessárias para este capítulo
            chapter_key="${chapter_name%_*}_${chapter_name#*_}"
            required=${chapter_requirements[$chapter_key]:-50}

            # Verificar completude
            if [ "$line_count" -ge "$required" ]; then
                echo -e "${GREEN}✅ Capítulo ${i}: ${chapter_name} (${line_count} linhas)${NC}"
                ((total_score+=10))
            elif [ "$line_count" -gt 0 ]; then
                echo -e "${YELLOW}⚠️  Capítulo ${i}: ${chapter_name} (${line_count}/${required} linhas - incompleto)${NC}"
                chapters_incomplete+=("$chapter_name")
                ((total_score+=5))
            else
                echo -e "${YELLOW}⚠️  Capítulo ${i}: ${chapter_name} (vazio)${NC}"
                chapters_incomplete+=("$chapter_name")
                ((total_score+=2))
            fi
            break
        fi
    done

    if [ "$chapter_found" = false ]; then
        echo -e "${RED}❌ Capítulo ${i}: Ausente${NC}"
        chapters_missing+=("Capítulo $i")
    fi
done

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Calcular porcentagem
percentage=$((chapters_found * 100 / 12))
score_percentage=$((total_score * 100 / 120))

# Resumo
echo -e "${BLUE}📊 Resumo${NC}"
echo "Capítulos encontrados: ${chapters_found}/12 (${percentage}%)"
echo "Pontuação de qualidade: ${score_percentage}% (${total_score}/120 pontos)"

# Avaliação de saúde
if [ "$chapters_found" -ge 10 ] && [ "$score_percentage" -ge 80 ]; then
    echo -e "Saúde: ${GREEN}EXCELENTE ✨${NC}"
elif [ "$chapters_found" -ge 8 ] && [ "$score_percentage" -ge 70 ]; then
    echo -e "Saúde: ${GREEN}BOA ✅${NC}"
elif [ "$chapters_found" -ge 6 ]; then
    echo -e "Saúde: ${YELLOW}ADEQUADA ⚠️${NC}"
else
    echo -e "Saúde: ${RED}INSUFICIENTE ❌${NC}"
fi

# Capítulos ausentes
if [ ${#chapters_missing[@]} -gt 0 ]; then
    echo ""
    echo -e "${RED}Capítulos ausentes:${NC}"
    for chapter in "${chapters_missing[@]}"; do
        echo "  - $chapter"
    done
fi

# Capítulos incompletos
if [ ${#chapters_incomplete[@]} -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}Capítulos incompletos:${NC}"
    for chapter in "${chapters_incomplete[@]}"; do
        echo "  - $chapter"
    done
fi

# Recomendações
echo ""
echo -e "${BLUE}💡 Recomendações${NC}"

if [ "$chapters_found" -lt 8 ]; then
    echo "  - Adicione pelo menos $((8 - chapters_found)) capítulos para atender requisito mínimo"
    echo "  - Use comandos /vision, /plan, /build, /cross"
fi

if [ ${#chapters_incomplete[@]} -gt 0 ]; then
    echo "  - Complete capítulos incompletos com mais detalhes"
    echo "  - Cada capítulo deve ter conteúdo substancial"
fi

if [ "$chapters_found" -ge 8 ]; then
    echo "  - ✅ Conformidade mínima Arc42 atendida"
    echo "  - Continue melhorando a qualidade da documentação"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Código de saída baseado em requisito mínimo
if [ "$chapters_found" -ge 8 ]; then
    exit 0
else
    exit 1
fi

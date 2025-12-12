#!/bin/bash
# ddd-structure.sh - Valida estrutura DDD Tactical Co-Located
# Versão: 3.0.0

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏗️  Validando Estrutura DDD Tactical Co-Located${NC}"
echo ""

# Verificar se o diretório src existe
if [ ! -d "src" ]; then
    echo -e "${YELLOW}⚠️  Diretório src/ não encontrado${NC}"
    echo "💡 Crie src/ com estrutura DDD Tactical Co-Located"
    exit 0
fi

# Inicializar contadores
violations=0
warnings=0
valid_contexts=0

# Detecção de anti-padrões
echo -e "${BLUE}🚫 Verificando Anti-Padrões${NC}"

# Verificar organização por camadas técnicas (anti-padrão)
if [ -d "src/services" ] || [ -d "src/repositories" ] || [ -d "src/controllers" ]; then
    echo -e "${RED}❌ Organização por camadas técnicas detectada${NC}"
    echo "   Encontrado: services/, repositories/, ou controllers/"
    echo "   💡 Use DDD Co-Located: src/[contexto]/[container]/[componente]/"
    ((violations++))
else
    echo -e "${GREEN}✅ Sem anti-padrões de camadas técnicas${NC}"
fi

# Verificar src/domain, src/application, src/infrastructure (anti-padrão de camadas)
if [ -d "src/domain" ] || [ -d "src/application" ] || [ -d "src/infrastructure" ]; then
    echo -e "${RED}❌ Arquitetura em camadas detectada${NC}"
    echo "   Encontrado: domain/, application/, ou infrastructure/"
    echo "   💡 Use DDD Co-Located: src/[contexto]/[container]/[componente]/"
    ((violations++))
else
    echo -e "${GREEN}✅ Sem anti-padrões de arquitetura em camadas${NC}"
fi

echo ""

# Validar estrutura DDD
echo -e "${BLUE}📦 Validando Contextos Delimitados${NC}"

# Encontrar potenciais contextos delimitados (diretórios de nível superior em src/)
contexts=$(find src -maxdepth 1 -type d ! -name src 2>/dev/null)

if [ -z "$contexts" ]; then
    echo -e "${YELLOW}⚠️  Nenhum contexto delimitado encontrado em src/${NC}"
    echo "💡 Crie estrutura: src/[contexto]/[container]/[componente]/"
    exit 0
fi

while IFS= read -r context; do
    if [ -z "$context" ]; then
        continue
    fi

    context_name=$(basename "$context")
    echo ""
    echo -e "${BLUE}Contexto: ${context_name}${NC}"

    # Verificar containers
    containers=$(find "$context" -maxdepth 1 -type d ! -name "$context_name" 2>/dev/null)

    if [ -z "$containers" ]; then
        echo -e "  ${YELLOW}⚠️  Nenhum container encontrado${NC}"
        ((warnings++))
        continue
    fi

    # Validar cada container
    while IFS= read -r container; do
        if [ -z "$container" ]; then
            continue
        fi

        container_name=$(basename "$container")
        echo "  Container: ${container_name}"

        # Verificar componentes
        components=$(find "$container" -maxdepth 1 -type d ! -name "$container_name" 2>/dev/null)

        if [ -z "$components" ]; then
            echo -e "    ${YELLOW}⚠️  Nenhum componente encontrado${NC}"
            ((warnings++))
            continue
        fi

        # Validar cada componente
        while IFS= read -r component; do
            if [ -z "$component" ]; then
                continue
            fi

            component_name=$(basename "$component")
            echo "    Componente: ${component_name}"

            # Verificar index.ts (aggregate root)
            if [ -f "${component}/index.ts" ] || [ -f "${component}/index.js" ]; then
                echo "      ✅ index.ts (aggregate root)"
            else
                echo -e "      ${YELLOW}⚠️  Faltando index.ts (aggregate root)${NC}"
                ((warnings++))
            fi

            # Verificar testes
            if ls "${component}"/*.spec.* 1> /dev/null 2>&1; then
                echo "      ✅ Testes encontrados"
            else
                echo -e "      ${RED}❌ Nenhum teste encontrado${NC}"
                ((violations++))
            fi

            # Verificar padrões DDD
            has_factory=$(ls "${component}"/criar-* 2>/dev/null | wc -l)
            has_use_case=$(find "$component" -maxdepth 1 -name "*-*.ts" -o -name "*-*.js" 2>/dev/null | wc -l)
            has_entity=$(find "$component" -maxdepth 1 -name "[A-Z]*.ts" -o -name "[A-Z]*.js" 2>/dev/null | wc -l)

            if [ "$has_factory" -gt 0 ]; then
                echo "      ✅ Factory encontrado (criar-*)"
            fi

            if [ "$has_use_case" -gt 0 ]; then
                echo "      ✅ Use cases encontrados (*-*)"
            fi

            if [ "$has_entity" -gt 0 ]; then
                echo "      ✅ Entities/VOs encontrados ([A-Z]*)"
            fi

            # Verificar convenção de nomenclatura
            if echo "$component_name" | grep -q "[A-Z]"; then
                echo -e "      ${YELLOW}⚠️  Nome do componente tem maiúsculas (deveria ser minúsculas)${NC}"
                ((warnings++))
            fi

        done <<< "$components"

    done <<< "$containers"

    ((valid_contexts++))

done <<< "$contexts"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Resumo
echo -e "${BLUE}📊 Resumo${NC}"
echo "Contextos delimitados: ${valid_contexts}"
echo "Violações: ${violations}"
echo "Avisos: ${warnings}"

# Avaliação
if [ "$violations" -eq 0 ] && [ "$warnings" -eq 0 ]; then
    echo -e "Estrutura: ${GREEN}EXCELENTE ✨${NC}"
    exit 0
elif [ "$violations" -eq 0 ]; then
    echo -e "Estrutura: ${GREEN}BOA ✅${NC}"
    exit 0
elif [ "$violations" -le 2 ]; then
    echo -e "Estrutura: ${YELLOW}PRECISA MELHORAR ⚠️${NC}"
    exit 0
else
    echo -e "Estrutura: ${RED}RUIM ❌${NC}"
    exit 1
fi

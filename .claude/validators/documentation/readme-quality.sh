#!/bin/bash
# readme-quality.sh - Valida qualidade do README.md
# Versão: 3.0.0

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📖 Validando Qualidade do README.md${NC}"
echo ""

# Verificar se README.md existe
if [ ! -f "README.md" ]; then
    echo -e "${RED}❌ Erro: README.md não encontrado${NC}"
    exit 1
fi

# Inicializar contadores
warnings=0
errors=0
score=0

# Leitura do README
readme_content=$(cat README.md)
readme_lines=$(wc -l < README.md | tr -d ' ')

echo "📄 README.md: ${readme_lines} linhas"
echo ""

# ========================================
# Validações de Conteúdo Obrigatório
# ========================================

echo -e "${BLUE}🔍 Verificando Seções Obrigatórias${NC}"

# 1. Título do Projeto
if echo "$readme_content" | grep -q "^# "; then
    echo "  ✅ Título do projeto encontrado"
    ((score+=10))
else
    echo -e "  ${RED}❌ Título do projeto ausente (# Título)${NC}"
    ((errors++))
fi

# 2. Descrição
if echo "$readme_content" | grep -qi "descrição\|description\|overview"; then
    echo "  ✅ Seção de descrição encontrada"
    ((score+=10))
else
    echo -e "  ${YELLOW}⚠️  Seção de descrição ausente ou não identificada${NC}"
    ((warnings++))
fi

# 3. Instruções de Instalação
if echo "$readme_content" | grep -qi "instalação\|installation\|install\|setup"; then
    echo "  ✅ Instruções de instalação encontradas"
    ((score+=10))
else
    echo -e "  ${RED}❌ Instruções de instalação ausentes${NC}"
    ((errors++))
fi

# 4. Como Usar / Getting Started
if echo "$readme_content" | grep -qi "uso\|usage\|como usar\|getting started\|quick start"; then
    echo "  ✅ Seção de uso encontrada"
    ((score+=10))
else
    echo -e "  ${RED}❌ Seção de uso ausente${NC}"
    ((errors++))
fi

# 5. Exemplos de Código
code_blocks=$(echo "$readme_content" | grep -c "^\`\`\`" || echo 0)
if [ "$code_blocks" -gt 0 ]; then
    echo "  ✅ Exemplos de código encontrados (${code_blocks} blocos)"
    ((score+=10))
else
    echo -e "  ${YELLOW}⚠️  Nenhum exemplo de código encontrado${NC}"
    ((warnings++))
fi

# 6. Licença
if echo "$readme_content" | grep -qi "licença\|license"; then
    echo "  ✅ Informações de licença encontradas"
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  Informações de licença ausentes${NC}"
    ((warnings++))
fi

# 7. Contribuindo
if echo "$readme_content" | grep -qi "contribuindo\|contributing\|contribution"; then
    echo "  ✅ Guia de contribuição encontrado"
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  Guia de contribuição ausente${NC}"
    ((warnings++))
fi

# 8. Badges
if echo "$readme_content" | grep -q "!\[.*\](.*badge.*)\|!\[.*\](.*shields.io.*)"; then
    echo "  ✅ Badges encontrados"
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  Nenhum badge encontrado (build status, coverage, etc)${NC}"
    ((warnings++))
fi

echo ""

# ========================================
# Validações de Qualidade
# ========================================

echo -e "${BLUE}🎯 Verificando Qualidade do Conteúdo${NC}"

# 9. Links funcionais
broken_links=$(echo "$readme_content" | grep -o "\[.*\](.*)" | grep -c "TODO\|FIXME\|#$" || echo 0)
if [ "$broken_links" -eq 0 ]; then
    echo "  ✅ Sem links quebrados detectados"
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  Possíveis links quebrados: ${broken_links}${NC}"
    ((warnings++))
fi

# 10. Tamanho adequado
if [ "$readme_lines" -ge 50 ] && [ "$readme_lines" -le 500 ]; then
    echo "  ✅ Tamanho adequado (${readme_lines} linhas)"
    ((score+=10))
elif [ "$readme_lines" -lt 50 ]; then
    echo -e "  ${YELLOW}⚠️  README muito curto (${readme_lines} linhas, recomendado: ≥50)${NC}"
    ((warnings++))
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  README muito longo (${readme_lines} linhas, considere dividir)${NC}"
    ((warnings++))
    ((score+=5))
fi

# 11. Estrutura de Headers
headers=$(echo "$readme_content" | grep -c "^## " || echo 0)
if [ "$headers" -ge 4 ]; then
    echo "  ✅ Boa estrutura de seções (${headers} seções)"
    ((score+=10))
elif [ "$headers" -ge 2 ]; then
    echo -e "  ${YELLOW}⚠️  Poucas seções (${headers}, recomendado: ≥4)${NC}"
    ((warnings++))
    ((score+=5))
else
    echo -e "  ${RED}❌ Estrutura inadequada (${headers} seções)${NC}"
    ((errors++))
fi

# 12. Imagens/Diagramas
images=$(echo "$readme_content" | grep -c "!\[.*\](.*\.\(png\|jpg\|gif\|svg\))" || echo 0)
if [ "$images" -gt 0 ]; then
    echo "  ✅ Imagens/diagramas incluídos (${images})"
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  Sem imagens/diagramas (considere adicionar)${NC}"
    ((warnings++))
fi

# 13. Table of Contents
if echo "$readme_content" | grep -qi "table of contents\|índice\|sumário"; then
    echo "  ✅ Índice (Table of Contents) encontrado"
    ((score+=5))
else
    if [ "$readme_lines" -gt 150 ]; then
        echo -e "  ${YELLOW}⚠️  README longo sem índice (recomendado)${NC}"
        ((warnings++))
    else
        echo "  ℹ️  Índice não necessário para README curto"
    fi
fi

# 14. Pré-requisitos
if echo "$readme_content" | grep -qi "pré-requisitos\|prerequisites\|requirements"; then
    echo "  ✅ Pré-requisitos documentados"
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  Pré-requisitos não especificados${NC}"
    ((warnings++))
fi

# 15. Scripts de exemplo
if echo "$readme_content" | grep -q "\`\`\`bash\|\`\`\`sh\|\`\`\`shell"; then
    echo "  ✅ Comandos shell documentados"
    ((score+=5))
else
    echo -e "  ${YELLOW}⚠️  Sem exemplos de comandos shell${NC}"
    ((warnings++))
fi

echo ""

# ========================================
# Detecção de Problemas
# ========================================

echo -e "${BLUE}🔎 Detectando Problemas Comuns${NC}"

# 16. TODOs não resolvidos
todos=$(echo "$readme_content" | grep -ci "TODO\|FIXME\|XXX" || echo 0)
if [ "$todos" -eq 0 ]; then
    echo "  ✅ Sem TODOs pendentes"
else
    echo -e "  ${YELLOW}⚠️  TODOs encontrados: ${todos}${NC}"
    ((warnings++))
fi

# 17. Links quebrados (localhost, example.com genérico)
localhost_links=$(echo "$readme_content" | grep -c "localhost\|127.0.0.1\|example.com" || echo 0)
if [ "$localhost_links" -eq 0 ]; then
    echo "  ✅ Sem links de desenvolvimento"
else
    echo -e "  ${YELLOW}⚠️  Links de desenvolvimento encontrados: ${localhost_links}${NC}"
    echo "     💡 Substitua localhost/example.com por URLs reais"
    ((warnings++))
fi

# 18. Informações de contato
if echo "$readme_content" | grep -qi "email\|discord\|slack\|twitter\|contact"; then
    echo "  ✅ Informações de contato incluídas"
else
    echo -e "  ${YELLOW}⚠️  Sem informações de contato${NC}"
    ((warnings++))
fi

# 19. Versionamento
if echo "$readme_content" | grep -qi "version\|versão\|v[0-9]"; then
    echo "  ✅ Informações de versão encontradas"
else
    echo -e "  ${YELLOW}⚠️  Versão do projeto não especificada${NC}"
    ((warnings++))
fi

# 20. Troubleshooting / FAQ
if echo "$readme_content" | grep -qi "troubleshooting\|faq\|problems\|issues"; then
    echo "  ✅ Seção de troubleshooting/FAQ encontrada"
else
    echo -e "  ${YELLOW}⚠️  Sem seção de troubleshooting/FAQ${NC}"
    ((warnings++))
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# ========================================
# Resumo e Pontuação
# ========================================

echo -e "${BLUE}📊 Resumo${NC}"
echo "Linhas: ${readme_lines}"
echo "Seções (##): ${headers}"
echo "Blocos de código: ${code_blocks}"
echo "Imagens: ${images}"
echo "TODOs pendentes: ${todos}"
echo ""
echo "Pontuação: ${score}/100"
echo "Erros: ${errors}"
echo "Avisos: ${warnings}"

# Avaliação de qualidade
if [ "$score" -ge 90 ] && [ "$errors" -eq 0 ]; then
    echo -e "Qualidade: ${GREEN}EXCELENTE ✨${NC}"
    exit 0
elif [ "$score" -ge 70 ] && [ "$errors" -eq 0 ]; then
    echo -e "Qualidade: ${GREEN}BOA ✅${NC}"
    exit 0
elif [ "$score" -ge 50 ]; then
    echo -e "Qualidade: ${YELLOW}ADEQUADA ⚠️${NC}"
    exit 0
else
    echo -e "Qualidade: ${RED}PRECISA MELHORAR ❌${NC}"
    exit 1
fi

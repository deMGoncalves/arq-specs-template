#!/bin/bash
# sync-changes.sh - Sincroniza mudanças em changes/ com specs/
# Hook executado após criação/atualização de specs

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔄 Checking for changes to sync..."

# Verifica se changes/ existe e tem conteúdo
if [ ! -d "changes" ] || [ -z "$(ls -A changes 2>/dev/null)" ]; then
    echo -e "${YELLOW}⚠️  No active changes found - skipping sync${NC}"
    exit 0
fi

# Conta quantas mudanças ativas existem
active_changes=$(find changes -maxdepth 1 -type d ! -name changes | wc -l)

if [ "$active_changes" -gt 0 ]; then
    echo "📦 Active changes: ${active_changes}"

    # Lista as mudanças
    for change_dir in changes/*/; do
        if [ -d "$change_dir" ]; then
            change_name=$(basename "$change_dir")
            echo "  - ${change_name}"

            # Verifica se tem spec.md pronto para mesclar
            if [ -f "${change_dir}spec.md" ]; then
                echo -e "${GREEN}    ✅ spec.md ready${NC}"
            fi

            # Verifica se tem tasks.md
            if [ -f "${change_dir}tasks.md" ]; then
                tasks_total=$(grep -c "^### TASK-" "${change_dir}tasks.md" 2>/dev/null || echo 0)
                tasks_done=$(grep -c "^- \[x\]" "${change_dir}tasks.md" 2>/dev/null || echo 0)
                echo "    📋 Tasks: ${tasks_done}/${tasks_total} completed"
            fi
        fi
    done

    echo ""
    echo "💡 Tip: Use /stats to validate before merging to specs/"
else
    echo -e "${YELLOW}⚠️  No changes to sync${NC}"
fi

exit 0

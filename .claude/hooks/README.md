# Hooks do Claude Code

**Versão**: 3.0.0
**Última Atualização**: 2025-12-10

---

## 🎯 O Que São Hooks?

**Hooks** são gatilhos automáticos que executam scripts shell em resposta a eventos do Claude Code. Eles permitem:

- ✅ **Validação automática** de especificações
- ✅ **Verificação de qualidade** após geração de código
- ✅ **Sincronização** de mudanças
- ✅ **Enforce** de padrões e regras

---

## 📁 Hooks Disponíveis

### 1. `validate-specs.sh`

**Quando executa**: Após comandos de documentação (`/vision`, `/feature`, `/plan`, etc.)

**O que faz**:
- 📊 Conta capítulos Arc42 presentes (x/12)
- 🎭 Conta cenários BDD
- 📋 Conta ADRs documentados
- ⚠️ Detecta TODOs e placeholders
- ✅ Avalia saúde geral das specs

**Output exemplo**:
```bash
🔍 Validando saúde das especificações...
📚 Capítulos Arc42: 9/12
🎭 Cenários BDD: 5
📋 ADRs documentados: 3
✅ Saúde das especificações: BOA
```

### 2. `check-quality-rules.sh`

**Quando executa**: Após comando `/code`

**O que faz**:
- 🔍 Verifica Regra 001 (máx 1 nível de indentação)
- 🔍 Verifica Regra 002 (sem cláusula ELSE)
- 🔍 Verifica Regra 030 (sem funções inseguras: eval, innerHTML)
- 📊 Executa coverage (se configurado)
- ✅ Reporta conformidade com regras

**Output exemplo**:
```bash
🔍 Verificando conformidade com regras de qualidade...
⚠️  Regra 001: Encontradas 3 linhas com >1 nível de indentação
⚠️  Regra 002: Encontradas 2 cláusulas ELSE
📊 Executando verificação de cobertura...
  Todos os arquivos: 85% de cobertura
⚠️  Encontradas 2 possíveis violações de regras de qualidade
💡 Dica: Revise .claude/rules/ para detalhes
```

### 3. `sync-changes.sh`

**Quando executa**: Após qualquer comando (matcher: `*`)

**O que faz**:
- 📦 Lista mudanças ativas em `changes/`
- ✅ Verifica se `spec.md` está pronto
- 📋 Mostra progresso de tasks (x/y completadas)
- 💡 Sugere validação com `/stats`

**Output exemplo**:
```bash
🔄 Verificando mudanças para sincronizar...
📦 Mudanças ativas: 2
  - auth-oauth2
    ✅ spec.md pronto
    📋 Tasks: 15/47 completadas
  - payment-gateway
    ✅ spec.md pronto
    📋 Tasks: 8/23 completadas

💡 Dica: Use /stats para validar antes de fazer merge para specs/
```

---

## 🚀 Como Ativar os Hooks

### Opção 1: Configuração Local (Recomendado)

Copie o exemplo para seu projeto:

```bash
cp .claude/hooks/settings.json.example .claude/settings.json
```

Edite `.claude/settings.json` conforme necessário.

### Opção 2: Configuração Global

Se quiser que os hooks funcionem em **todos** os projetos Documentation-First:

```bash
# Copie os scripts para ~/.claude/hooks/
mkdir -p ~/.claude/hooks
cp .claude/hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh

# Configure em ~/.claude/settings.json
```

---

## ⚙️ Configuração Avançada

### Matcher Patterns

Você pode configurar hooks para comandos específicos:

```json
{
  "matcher": "/vision|/feature|/plan",
  "hooks": [...]
}
```

Ou para todos os comandos:

```json
{
  "matcher": "*",
  "hooks": [...]
}
```

### Timeout

Defina timeout apropriado (em segundos):

```json
{
  "timeout": 30,  // 30 segundos
}
```

### Tipos de Hooks

Atualmente suportado:
- `"type": "command"` - Executa comando shell

---

## 📋 Boas Práticas

### ✅ FAÇA

- Mantenha hooks **rápidos** (< 30 segundos)
- Use hooks para **validação**, não para lógica complexa
- Sempre retorne **exit 0** (não bloqueia workflow)
- Forneça **output colorido** e informativo
- Torne scripts **idempotentes**

### ❌ NÃO FAÇA

- Não execute operações **longas** (builds completos, etc.)
- Não **bloqueie** o workflow (sempre exit 0)
- Não adicione **lógica de negócio** em hooks
- Não use hooks para **modificar arquivos** (apenas validar)

---

## 🔧 Criando Seus Próprios Hooks

### Template Básico

```bash
#!/bin/bash
# my-hook.sh - Descrição do hook

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Minha validação customizada..."

# Sua lógica aqui
if [ condition ]; then
    echo -e "${GREEN}✅ Validação aprovada${NC}"
else
    echo -e "${YELLOW}⚠️  Aviso: Algo para verificar${NC}"
fi

# SEMPRE exit 0 (não bloqueia)
exit 0
```

### Registrar o Hook

Em `settings.json`:

```json
{
  "matcher": "/mycommand",
  "hooks": [
    {
      "type": "command",
      "command": ".claude/hooks/my-hook.sh",
      "timeout": 30,
      "description": "Minha validação customizada"
    }
  ]
}
```

### Dar Permissão de Execução

```bash
chmod +x .claude/hooks/my-hook.sh
```

---

## 🎓 Exemplos de Hooks Úteis

### 1. Auto-formatar Código

```bash
#!/bin/bash
# auto-format.sh
if [ -f "package.json" ]; then
    npm run format --silent 2>&1
    echo "✅ Código formatado"
fi
exit 0
```

### 2. Verificar Status do Git

```bash
#!/bin/bash
# check-git.sh
uncommitted=$(git status --porcelain | wc -l)
if [ "$uncommitted" -gt 10 ]; then
    echo "⚠️  Aviso: ${uncommitted} arquivos não commitados"
    echo "💡 Dica: Considere commitar as mudanças"
fi
exit 0
```

### 3. Notificar ao Completar

```bash
#!/bin/bash
# notify.sh
# Notificação macOS
osascript -e 'display notification "Tarefa completada!" with title "Claude Code"'
exit 0
```

---

## 🐛 Troubleshooting

### Hook não executa

1. **Verificar permissões**:
   ```bash
   chmod +x .claude/hooks/*.sh
   ```

2. **Verificar settings.json**:
   ```bash
   cat .claude/settings.json
   ```

3. **Testar hook manualmente**:
   ```bash
   ./.claude/hooks/validate-specs.sh
   ```

### Hook muito lento

- Reduza timeout
- Simplifique lógica
- Mova operações pesadas para CI/CD

### Hook quebrando workflow

- Sempre retorne `exit 0`
- Capture erros: `command 2>/dev/null || true`
- Teste em ambiente isolado primeiro

---

## 📊 Diretrizes de Performance

| Tipo de Hook | Timeout Recomendado | Complexidade |
|---------------|---------------------|--------------|
| Validação simples | 10-20s | Baixa |
| Verificação de código | 20-40s | Média |
| Coverage + linting | 40-60s | Alta |
| Build completo | ❌ Não usar | N/A |

---

## 🔗 Integração com Workflow

```
Comando do Usuário
    ↓
Claude Code executa
    ↓
Tool completa
    ↓
🎣 Hook PostToolUse dispara
    ↓
Script executa (validações)
    ↓
Output mostrado ao usuário
    ↓
Workflow continua
```

---

## 📚 Recursos

- **Documentação Claude Code**: [https://claude.ai/code](https://claude.ai/code)
- **Exemplos de Hooks**: `.claude/hooks/*.sh` (este diretório)
- **Schema de Settings**: `settings.json.example`

---

## 🤝 Contribuindo

Para adicionar novos hooks úteis:

1. Crie o script em `.claude/hooks/`
2. Adicione documentação neste README
3. Atualize `settings.json.example`
4. Teste extensivamente
5. Abra PR no GitHub

---

**Versão**: 3.0.0
**Mantido por**: Comunidade Documentation-First Approach
**Licença**: MIT

# Validadores Customizados

**Versão**: 3.0.0
**Última Atualização**: 2025-12-10

---

## 🎯 Propósito

Este diretório contém **scripts de validação customizados** que impõem princípios Documentation-First, padrões de qualidade e conformidade arquitetural.

---

## 📁 Estrutura de Diretórios

```
validators/
├── specification/          # Valida documentação specs/
│   ├── arc42-completeness.sh
│   ├── bdd-quality.sh
│   └── adr-traceability.sh
├── code/                   # Valida código src/
│   ├── ddd-structure.sh
│   ├── quality-rules.sh
│   └── test-coverage.sh
├── documentation/          # Valida sincronia de docs
│   ├── spec-code-sync.sh
│   └── todo-checker.sh
└── README.md              # Este arquivo
```

---

## 🚀 Validadores Disponíveis

### Validadores de Especificação

#### 1. arc42-completeness.sh
**Propósito**: Valida completude e qualidade da documentação Arc42

**Verificações**:
- ✅ Todos os 12 capítulos Arc42 presentes
- ✅ Contagem mínima de linhas por capítulo
- ✅ Cálculo de pontuação de qualidade
- ✅ Avaliação de saúde

**Uso**:
```bash
./.claude/validators/specification/arc42-completeness.sh
```

**Saída**:
```
🔍 Validando Completude da Documentação Arc42

✅ Capítulo 01: 01_introduction (120 linhas)
✅ Capítulo 02: 02_constraints (75 linhas)
⚠️  Capítulo 03: 03_context (80/150 linhas - incompleto)
...

📊 Resumo
Capítulos encontrados: 9/12 (75%)
Pontuação de qualidade: 72% (87/120 pontos)
Saúde: BOM ✅
```

**Códigos de Saída**:
- `0`: ≥8 capítulos encontrados (mínimo atendido)
- `1`: <8 capítulos encontrados (insuficiente)

---

#### 2. bdd-quality.sh
**Propósito**: Valida qualidade e completude de cenários BDD

**Verificações**:
- ✅ Declaração de Feature presente
- ✅ Declarações de Scenario
- ✅ Estrutura Given-When-Then completa
- ✅ Sem assertivas vagas
- ✅ Cenários de erro incluídos
- ✅ Valores concretos (sem placeholders)
- ✅ Efeitos colaterais documentados (cláusulas And)

**Uso**:
```bash
./.claude/validators/specification/bdd-quality.sh
```

**Saída**:
```
🎭 Validando Qualidade de Cenários BDD

📋 Encontrados 5 cenários BDD

Validando: SCN-001_user-registration.md
  ✅ Declaração de Feature encontrada
  ✅ Scenarios: 3
  ✅ Estrutura Given-When-Then completa
  ⚠️  Nenhum cenário de erro encontrado
  ✅ Efeitos colaterais documentados (cláusulas And: 4)

📊 Resumo
Total de cenários: 5
Cenários válidos: 4
Avisos: 3
Erros: 0
Qualidade: BOA ✅
```

**Códigos de Saída**:
- `0`: Qualidade aceitável
- `1`: Muitos erros (>2)

---

### Validadores de Código

#### 3. ddd-structure.sh
**Propósito**: Valida estrutura DDD Tactical Co-Located

**Verificações**:
- ❌ Sem organização por camadas técnicas (services/, repositories/)
- ❌ Sem arquitetura em camadas (domain/, application/, infrastructure/)
- ✅ Contextos delimitados presentes
- ✅ Containers organizados corretamente
- ✅ Componentes têm index.ts (aggregate root)
- ✅ Testes presentes
- ✅ Padrões DDD (factories, use cases, entities)
- ✅ Convenções de nomenclatura (lowercase)

**Uso**:
```bash
./.claude/validators/code/ddd-structure.sh
```

**Saída**:
```
🏗️  Validando Estrutura DDD Tactical Co-Located

🚫 Verificando Anti-Padrões
✅ Sem anti-padrões de camadas técnicas
✅ Sem anti-padrões de arquitetura em camadas

📦 Validando Contextos Delimitados

Contexto: user-management
  Container: api
    Componente: usuario
      ✅ index.ts (aggregate root)
      ✅ Testes encontrados
      ✅ Factory encontrado (criar-*)
      ✅ Use cases encontrados (*-*)
      ✅ Entities/VOs encontrados ([A-Z]*)

📊 Resumo
Contextos delimitados: 2
Violações: 0
Avisos: 1
Estrutura: BOA ✅
```

**Códigos de Saída**:
- `0`: Estrutura conforme (0-2 violações)
- `1`: Estrutura ruim (>2 violações)

---

## 🔧 Como Usar

### Método 1: Execução Manual

```bash
# Executar validador específico
./.claude/validators/specification/arc42-completeness.sh

# Executar todos os validadores de especificação
for script in .claude/validators/specification/*.sh; do
    bash "$script"
done
```

### Método 2: Em Hooks

Adicionar ao `.claude/hooks/settings.json`:

```json
{
  "PostToolUse": [
    {
      "matcher": "/feature",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/validators/specification/bdd-quality.sh",
          "timeout": 30
        }
      ]
    },
    {
      "matcher": "/code",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/validators/code/ddd-structure.sh",
          "timeout": 30
        }
      ]
    }
  ]
}
```

### Método 3: Em CI/CD

Adicionar ao `.github/workflows/validate.yml`:

```yaml
- name: Validar Arc42
  run: ./.claude/validators/specification/arc42-completeness.sh

- name: Validar BDD
  run: ./.claude/validators/specification/bdd-quality.sh

- name: Validar Estrutura DDD
  run: ./.claude/validators/code/ddd-structure.sh
```

### Método 4: Hook Pre-commit

Adicionar ao `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "Executando validadores..."

# Validar specs
./.claude/validators/specification/arc42-completeness.sh || exit 1
./.claude/validators/specification/bdd-quality.sh || exit 1

# Validar estrutura de código
./.claude/validators/code/ddd-structure.sh || exit 1

echo "✅ Todas as validações passaram"
```

---

## 📝 Criando Novos Validadores

### Estrutura de Template

```bash
#!/bin/bash
# validator-name.sh - Breve descrição
# Versão: 3.0.0

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Nome do Validador${NC}"
echo ""

# Lógica de validação aqui
violations=0
warnings=0

# Verificação 1
if [condição]; then
    echo -e "${GREEN}✅ Verificação passou${NC}"
else
    echo -e "${RED}❌ Verificação falhou${NC}"
    ((violations++))
fi

# Resumo
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Resumo${NC}"
echo "Violações: ${violations}"
echo "Avisos: ${warnings}"

# Código de saída
if [ "$violations" -eq 0 ]; then
    exit 0
else
    exit 1
fi
```

### Melhores Práticas

1. **Saída clara**: Use cores e emojis para legibilidade
2. **Feedback acionável**: Diga aos usuários COMO corrigir problemas
3. **Códigos de saída**: 0 = passou, 1 = falhou
4. **Execução rápida**: <10 segundos para a maioria dos validadores
5. **Idempotente**: Seguro para executar múltiplas vezes

---

## 🎯 Estratégia de Validação

### Quando Executar Validadores

| Validador | Quando | Gatilho |
|-----------|------|------------|
| arc42-completeness | Após /vision, /plan | Hook |
| bdd-quality | Após /feature | Hook |
| ddd-structure | Após /code | Hook |
| test-coverage | Antes do commit | Pre-commit |
| spec-code-sync | Antes do push | Pre-push |

### Níveis de Validação

1. **Bloqueante** (Exit 1): Problemas críticos que DEVEM ser corrigidos
   - arc42-completeness (<8 capítulos)
   - test-coverage (<80%)
   - ddd-structure (anti-padrões)

2. **Aviso** (Exit 0): Problemas que DEVERIAM ser corrigidos
   - bdd-quality (assertivas vagas)
   - Capítulos incompletos
   - Cenários de erro faltando

3. **Info** (Exit 0): Recomendações
   - Sugestões de otimização
   - Melhores práticas

---

## 📊 Métricas de Validação

Rastreie a efetividade dos validadores:

| Validador | Tempo de Execução | Taxa de Falsos Positivos | Problemas Detectados |
|-----------|----------------|---------------------|-------------------|
| arc42-completeness | ~2s | 0% | Alto |
| bdd-quality | ~3s | 5% | Médio |
| ddd-structure | ~1s | 10% | Alto |

---

## 🤝 Contribuindo com Validadores

1. **Identifique necessidade**: O que não está sendo validado?
2. **Crie script**: Siga o template acima
3. **Teste exaustivamente**: Execute em projetos reais
4. **Documente**: Adicione a este README
5. **Envie PR**: Inclua exemplos

---

## 📚 Referências

- **Arc42**: https://arc42.org
- **BDD**: https://cucumber.io/docs/bdd/
- **DDD**: Domain-Driven Design (Eric Evans)
- **Shell Scripting**: https://www.shellscript.sh/

---

**Versão**: 3.0.0
**Mantido por**: Comunidade Documentation-First Approach
**Licença**: MIT

# Prompts Reutilizáveis

**Versão**: 3.0.0
**Última Atualização**: 2025-12-10

---

## 🎯 Propósito

Este diretório contém **templates de prompts reutilizáveis** para diferentes fases do workflow Documentation-First. Estes templates garantem consistência, completude e qualidade em todos os outputs gerados por IA.

---

## 📁 Estrutura de Diretórios

```
prompts/
├── analysis/               # Fase 1: Discovery
│   ├── feature-discovery.txt
│   ├── scope-definition.txt
│   └── complexity-assessment.txt
├── design/                 # Fase 2: Architecture
│   ├── architecture-proposal.txt
│   ├── component-design.txt
│   └── data-model-design.txt
├── implementation/         # Fase 4: Implementation
│   ├── code-generation.txt
│   ├── test-generation.txt
│   └── refactoring.txt
├── review/                 # Fase 5: Code Review
│   ├── code-review.txt
│   ├── security-review.txt
│   └── performance-review.txt
└── documentation/          # Fase 6: Documentation
    ├── api-documentation.txt
    ├── architecture-docs.txt
    └── user-guide.txt
```

---

## 🚀 Como Usar

### Método 1: Copiar e Preencher

```bash
# Copiar template
cp .claude/prompts/analysis/feature-discovery.txt my-feature-prompt.txt

# Substituir placeholders
# {{FEATURE_REQUEST}} → Sua requisição de feature real
# {{COMPLEXITY}} → LOW/MEDIUM/HIGH
# etc.

# Usar no Claude Code
[Colar prompt modificado]
```

### Método 2: Referenciar em Skills

Skills podem referenciar estes prompts:

```markdown
## analyst/SKILL.md

Ao analisar features, use:
`.claude/prompts/analysis/feature-discovery.txt`

Carregue o prompt, substitua {{PLACEHOLDERS}}, e execute.
```

### Método 3: Automação (Avançado)

```bash
# Script para auto-preencher prompts
#!/bin/bash
TEMPLATE=".claude/prompts/analysis/feature-discovery.txt"
FEATURE_REQUEST="Adicionar autenticação de usuário"

# Substituir placeholders
sed "s/{{FEATURE_REQUEST}}/$FEATURE_REQUEST/g" $TEMPLATE > prompt.txt

# Usar com IA
cat prompt.txt | claude-code execute
```

---

## 📋 Prompts Disponíveis

### Fase de Análise

#### 1. feature-discovery.txt
**Propósito**: Analisar requisições de features e extrair requisitos
**Placeholders**:
- `{{FEATURE_REQUEST}}`: A descrição da feature do usuário

**Output**: Análise estruturada com:
- Requisitos principais
- Atores envolvidos
- Avaliação de complexidade
- Escopo de implementação
- Riscos e recomendações

**Quando usar**: Fase 1 (Discovery), quando usuário solicita nova feature

---

### Fase de Design

#### 2. architecture-proposal.txt
**Propósito**: Projetar arquitetura de alto nível para features complexas
**Placeholders**:
- `{{FEATURE_NAME}}`: Nome da feature
- `{{COMPLEXITY}}`: LOW/MEDIUM/HIGH

**Output**: Design arquitetural completo com:
- Diagramas C4 (Contexto, Container, Componente)
- Stack tecnológica
- ADRs (Registros de Decisão Arquitetural)
- Modelo de dados
- Atributos de qualidade

**Quando usar**: Fase 2 (Architecture), para features de complexidade HIGH

---

### Fase de Implementação

#### 3. code-generation.txt
**Propósito**: Guiar implementação seguindo todas as regras de qualidade
**Placeholders**:
- `{{TASK_ID}}`: Identificador da tarefa (ex: TASK-003)
- `{{TASK_NAME}}`: Descrição da tarefa
- `{{SPEC_REFERENCE}}`: Referência à seção da spec
- `{{ESTIMATED_LOC}}`: Linhas de código estimadas

**Output**: Implementação com:
- Estrutura DDD Tactical Co-Located
- Testes (abordagem TDD)
- Todas as 39 regras de qualidade aplicadas
- Cobertura de cenários BDD

**Quando usar**: Fase 4 (Implementation), para cada tarefa

---

### Fase de Revisão

#### 4. code-review.txt
**Propósito**: Checklist abrangente de revisão de código
**Placeholders**:
- `{{TASK_ID}}`: Tarefa sendo revisada
- `{{FILE_LIST}}`: Lista de arquivos modificados

**Output**: Relatório de revisão detalhado com:
- Conformidade com regras de qualidade (todas as 39)
- Cobertura de cenários BDD
- Avaliação de qualidade de testes
- Code smells detectados
- Feedback acionável

**Quando usar**: Fase 5 (Code Review), após implementação

---

## 💡 Melhores Práticas

### 1. Sempre Substitua TODOS os Placeholders
```
❌ RUIM:
{{FEATURE_REQUEST}} → Feature não preenchida

✅ BOM:
{{FEATURE_REQUEST}} → Usuário pode resetar senha via email
```

### 2. Mantenha Prompts com Controle de Versão
- Prompts são documentos vivos
- Atualize quando regras de qualidade mudarem
- Rastreie evolução ao longo do tempo

### 3. Customize para Seu Domínio
```
# Criar prompts específicos de domínio
.claude/prompts/domain/
├── e-commerce-feature.txt
├── fintech-security.txt
└── healthcare-compliance.txt
```

### 4. Use com Skills
```markdown
# Na documentação do skill
@skill analyst "Use .claude/prompts/analysis/feature-discovery.txt"
```

### 5. Mantenha Consistência
- Mesma estrutura em todos os prompts
- Nomenclatura clara de placeholders (`{{MAIUSCULAS_COM_UNDERSCORES}}`)
- Especificações detalhadas de output

---

## 🎯 Princípios de Design de Prompt

### 1. Determinístico
Prompts devem guiar IA a produzir outputs consistentes

### 2. Estruturado
Seções claras, checklists e templates

### 3. Completo
Cobrir todos os aspectos (não apenas happy path)

### 4. Acionável
Outputs devem ser diretamente utilizáveis

### 5. Rastreável
Linkar para specs, regras e padrões

---

## 🔧 Criando Novos Prompts

### Estrutura de Template

```
# Título
Você é o [AGENTE] na Fase [N] ([NOME_DA_FASE]). [AÇÃO]:

[VARIÁVEIS DE CONTEXTO]

Sua tarefa:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

Use esta estrutura:

## [Título do Output]

### [Seção 1]
[Formato/checklist]

### [Seção 2]
[Formato/checklist]

### [Seção N]
[Formato/checklist]
```

### Exemplo: Criando Prompt de Revisão de Segurança

```
# Arquivo: .claude/prompts/review/security-review.txt

Você é o revisor de segurança na Fase 5 (Revisão). Revise vulnerabilidades:

ARQUIVOS: {{FILE_LIST}}

Sua tarefa:
1. Verificar OWASP Top 10
2. Verificar validação de entrada
3. Verificar autenticação/autorização
4. Revisar uso de criptografia
5. Escanear por segredos hardcoded

Use esta estrutura:

## Revisão de Segurança

### Verificação OWASP Top 10
- [ ] A01: Broken Access Control
  - Status: [PASSOU/FALHOU]
  - Problemas: [Lista]
...
```

---

## 📊 Métricas de Efetividade de Prompts

Rastreie quão bem os prompts funcionam:

| Prompt | Contagem de Uso | Taxa de Sucesso | Tempo Médio | Pontuação de Qualidade |
|--------|-------------|--------------|----------|---------------|
| feature-discovery | 45 | 95% | 5min | 4.8/5 |
| architecture-proposal | 12 | 90% | 15min | 4.6/5 |
| code-generation | 180 | 92% | 10min | 4.7/5 |
| code-review | 165 | 88% | 8min | 4.5/5 |

---

## 🤝 Contribuindo com Novos Prompts

1. **Identifique lacuna**: O que está faltando?
2. **Crie template**: Siga estrutura acima
3. **Teste exaustivamente**: Use em cenários reais
4. **Documente**: Adicione a este README
5. **Envie PR**: Inclua exemplos

---

## 📚 Referências

- **Prompt Engineering**: https://www.promptingguide.ai/
- **Claude Best Practices**: https://docs.anthropic.com/
- **Arc42**: https://arc42.org (para prompts de arquitetura)
- **BDD**: https://cucumber.io/docs/bdd/ (para prompts de cenários)

---

**Versão**: 3.0.0
**Mantido por**: Comunidade Documentation-First Approach
**Licença**: MIT

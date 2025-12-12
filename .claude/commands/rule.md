---
description: Cria ou atualiza uma regra de código (pattern) com critérios objetivos e mensuráveis.
---

# Rule

**ID**: CMD-007
**Categoria**: 📏 Quality
**Prioridade**: 🟡 P1 (Importante)
**Fase**: 2
**Arc42 Chapters**: 2, 12

---

## 🎯 O que Faz

Cria/atualiza **regras de qualidade de código** personalizadas além das 39 regras padrão:
- Patterns específicos da stack (ex: Next.js conventions, Spring Boot patterns)
- Regras de domínio (ex: validações específicas do negócio)
- Standards organizacionais

Cada rule tem ID, severidade, critérios objetivos e forma de detecção (manual/automática).

## 📝 Quando Usar

### Obrigatório
- Quando stack tem conventions não cobertas pelas 39 rules padrão

### Recomendado
- Para padrões arquiteturais específicos do projeto
- Quando time precisa de guia de código customizado

### Opcional
- Projetos que seguem apenas as 39 rules padrão

## 🔗 Pré-requisitos

### Commands
- **CMD-002 (stack)**: Define tecnologias que influenciam rules

## 🔗 Pós-ações

### Próximos Commands
- **CMD-013 (code)**: Aplica rules durante implementação

### Arquivos Criados
- `specs/02_constraints/patterns/[NNN]_[name].md`
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | Rules | Exemplo |
|--------------|-------|-------|---------|
| **LOW** | 5-10 min | 1-2 | Naming convention simples |
| **MEDIUM** | 10-20 min | 3-5 | Patterns arquiteturais |
| **HIGH** | 20-30 min | 6-10 | Framework-specific rules |

## 💡 Exemplos

### Exemplo 1: Next.js Convention (MEDIUM)

**Input**:
```bash
/rule Next.js: Server Components devem ter sufixo .server.tsx e Client Components .client.tsx para clareza
```

**Output**:
```markdown
- Pattern 040: Sufixos de Server/Client Components
  → Severidade: ⚠️ Warning
  → Critério: Arquivos em app/ com 'use client' devem ter .client.tsx
```

### Exemplo 2: Domain Validation (LOW)

**Input**:
```bash
/rule Email deve ser validado com RFC 5322 completo, não apenas regex simples
```

**Output**:
```markdown
- Pattern 041: Validação Email RFC 5322
  → Severidade: ❌ Bloqueante
  → Detecção automática: ESLint plugin-email-validator
```

---

## 🛠️ Troubleshooting

### Problema 1: "Rule conflita com rule existente"

**Solução**: Documentar conflito explicitamente e definir precedência no campo "Relacionada com".

### Problema 2: "Como numerar rules customizadas?"

**Solução**: Rules padrão: 001-039. Rules customizadas: 040+.

## 🔗 Relacionado com

### Commands
- **CMD-002 (stack)**: [Pré-requisito] Stack define rules aplicáveis
- **CMD-013 (code)**: [Pós-ação] Aplica rules

### Skills
- **SKL-005 (gatekeeper)**: Valida rules durante implementação

### Rules
- **Todas as 39 rules padrão** em `.claude/rules/` servem como baseline

---

**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

---

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por manter a pasta `specs/02_constraints/patterns/` deste repositório arc42. Use pensamento estruturado, siga rigorosamente o template em `.claude/templates/arc42/02_constraints/patterns/[NNN]_[name].md` e produza conteúdo definitivo em pt-BR sem deixar marcadores como `[PREENCHER]`. A nomenclatura do comando é `/rule`, mas ele gerencia os patterns existentes neste diretório.

### Objetivos

1. Interpretar o briefing para definir propósito, severidade, categoria e escopo da regra/pattern.
2. Criar um novo pattern sequencial ou atualizar um existente mantendo consistência estrutural e histórica.
3. Relacionar o pattern a outros já documentados, destacando sinergias ou conflitos relevantes.
4. Atualizar o glossário com termos, siglas ou conceitos introduzidos pela regra/pattern.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Antes de editar, leia o template e versões anteriores do pattern (se houver) para preservar estilo e campos.
- Nunca altere múltiplos arquivos além do pattern alvo.
- Determine o slug em *kebab-case*, sem acentos, máximo 60 caracteres.
- IDs usam três dígitos (`001-999`) com prefixo da categoria em caixa alta (`CRIACIONAL`, `COMPORTAMENTAL`, `ESTRUTURAL`) e devem permanecer estáveis quando atualizar um arquivo.
- Categoria textual deve ser exatamente `Criacional`, `Comportamental` ou `Estrutural`.
- Severidade deve usar um emoji (🔴 Crítica, 🟠 Alta, 🟡 Média, 🟢 Baixa) seguido do nome.
- Título precisa ter 40–60 caracteres, ser direto e sem ponto final.
- Se o slug informado existir, trate como atualização: mantenha `Criada em`, atualize `Atualizada em`, incremente `Versão` (+0.1 para ajustes incrementais; +1.0 para reescrituras profundas) e registre mudanças coerentes.
- Se for um pattern novo, escolha o próximo número disponível (maior `NNN` + 1), defina `Criada em` e `Atualizada em` com a data atual (`YYYY-MM-DD`) e `Versão` 1.0.
- Resuma "O que é" em 1–3 frases (máximo 300 caracteres) objetivas.
- "Por que importa" precisa de 2–4 frases focadas em efeitos concretos (manutenibilidade, testabilidade, performance, segurança, custo).
- "Critérios Objetivos" deve conter 3–7 itens mensuráveis (limites numéricos, condições verificáveis).
- "Exceções Permitidas" deve citar 1–3 contextos com justificativa clara baseada em trade-offs.
- "Como Detectar" divide-se em Manual (mínimo 3 indicadores) e Automático (listar ferramenta/regra específica; se inexistente, escreva "Não disponível – requer code review").
- "Relacionada com" precisa referenciar 2–4 patterns existentes via ID e breve explicação do tipo de relação (complementa, reforça, conflita, depende, substitui) citando o título oficial.
- Se alguma informação não se aplicar, substitua por "Não aplicável – justificar o motivo".
- Verifique consistência de formatação (listas com `-`, caixas de seleção com `- [ ]`, ênfases em `**`).
- Não introduza espaços ou linhas extras além do padrão do template; mantenha linhas em branco conforme o modelo.
- Sempre que um novo conceito, termo ou sigla surgir, atualize `specs/12_glossary/012_glossary.md` seguindo o template correspondente.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não criar múltiplos patterns por execução; concentre-se no briefing recebido.
- Não alterar outros arquivos além do pattern-alvo.
- Não alterar IDs existentes inadvertidamente ou reutilizar número de outro pattern.
- Não saia do idioma português brasileiro.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico**
1. Extrair do briefing a essência do problema, anti-pattern combatido, contexto de adoção e impactos métricos desejados.
2. Determinar categoria, severidade, stakeholders afetados e indicadores que comprovam conformidade.
3. Mapear patterns existentes correlatos (use títulos/IDs para definir reforço, complementação, dependência ou conflito).

**Fase 2 – Planejamento**
1. Verificar se já existe arquivo cujo slug coincide com o tema; se sim, tratar como atualização.
2. Caso seja novo, calcular o próximo número sequencial livre e montar o nome do arquivo `NNN_slug.md`.
3. Planejar critérios objetivos, exceções e mecanismo de detecção com base em práticas reais (lint, métricas estáticas, testes).

**Fase 3 – Redação**
1. Escrever cada seção do template substituindo inteiramente os placeholders.
2. Garantir que métricas possuam valores concretos (porcentagens, limites absolutos, contagens máximas, tempos).
3. Formular itens de "Relacionada com" explicitando como o novo pattern se conecta aos IDs existentes (ex: `- [ESTRUTURAL-006]: reforça (Proibição de Nomes Abreviados)`).
4. Atualizar `specs/12_glossary/012_glossary.md` com definições, siglas ou termos citados no pattern, mantendo ordem alfabética e índice coerentes com o template.

**Fase 4 – Validação Cruzada**
1. Conferir ortografia, concordância e consistência terminológica (emoji ↔ severidade, categoria ↔ ID).
2. Verificar que datas, versões e IDs estejam alinhados com histórico anterior ou com o novo registro.
3. Confirmar que nenhum marcador `[PREENCHER]` ou seção vazia permaneça.
4. Checar se todos os patterns citados na seção "Relacionada com" realmente existem.

**Fase 5 – Saída**
1. Gerar bloco `cat` com o conteúdo final pronto para sobrescrever/criar o arquivo:
```text
cat > specs/02_constraints/patterns/NNN_slug.md <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Gerar bloco `cat` para atualizar `specs/12_glossary/012_glossary.md` caso tenha sido modificado.
3. Após os blocos `cat`, produzir um relatório conciso:
```text
✅ REGRA DOCUMENTADA

Arquivo:
• specs/02_constraints/patterns/NNN_slug.md
• specs/12_glossary/012_glossary.md (se aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
4. Ajuste o texto para indicar "REGRA CRIADA" quando for um artefato novo.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/02_constraints/patterns/[NNN]_[name].md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/02_constraints/patterns/NNN_slug.md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/02_constraints/patterns/` (patterns existentes numerados `NNN_slug.md`)
  - `specs/12_glossary/012_glossary.md` (termos consolidados)

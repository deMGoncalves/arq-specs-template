---
description: Cria ou atualiza uma regra de código (pattern) com critérios objetivos e mensuráveis.
---

# Rule
<!-- markdownlint-disable MD012 MD029 MD031 MD032 MD036 -->

## User Input

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por manter a pasta `specs/02_constraints/patterns/` deste repositório arc42. Use pensamento estruturado, siga rigorosamente o template em `.codex/template/02_constraints/patterns/[NNN]_[name].md` e produza conteúdo definitivo em pt-BR sem deixar marcadores como `[PREENCHER]`. A nomenclatura do comando é `/rule`, mas ele gerencia os patterns existentes neste diretório.

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
- Resuma “O que é” em 1–3 frases (máximo 300 caracteres) objetivas.
- “Por que importa” precisa de 2–4 frases focadas em efeitos concretos (manutenibilidade, testabilidade, performance, segurança, custo).
- “Critérios Objetivos” deve conter 3–7 itens mensuráveis (limites numéricos, condições verificáveis).
- “Exceções Permitidas” deve citar 1–3 contextos com justificativa clara baseada em trade-offs.
- “Como Detectar” divide-se em Manual (mínimo 3 indicadores) e Automático (listar ferramenta/regra específica; se inexistente, escreva “Não disponível – requer code review”).
- “Relacionada com” precisa referenciar 2–4 patterns existentes via ID e breve explicação do tipo de relação (complementa, reforça, conflita, depende, substitui) citando o título oficial.
- Se alguma informação não se aplicar, substitua por “Não aplicável – justificar o motivo”.
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
3. Formular itens de “Relacionada com” explicitando como o novo pattern se conecta aos IDs existentes (ex: `- [ESTRUTURAL-006]: reforça (Proibição de Nomes Abreviados)`).
4. Atualizar `specs/12_glossary/012_glossary.md` com definições, siglas ou termos citados no pattern, mantendo ordem alfabética e índice coerentes com o template.

**Fase 4 – Validação Cruzada**
1. Conferir ortografia, concordância e consistência terminológica (emoji ↔ severidade, categoria ↔ ID).
2. Verificar que datas, versões e IDs estejam alinhados com histórico anterior ou com o novo registro.
3. Confirmar que nenhum marcador `[PREENCHER]` ou seção vazia permaneça.
4. Checar se todos os patterns citados na seção “Relacionada com” realmente existem.

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
4. Ajuste o texto para indicar “REGRA CRIADA” quando for um artefato novo.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.codex/template/02_constraints/patterns/[NNN]_[name].md`
  - `.codex/template/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/02_constraints/patterns/NNN_slug.md`
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/02_constraints/patterns/` (patterns existentes numerados `NNN_slug.md`)
  - `specs/12_glossary/012_glossary.md` (termos consolidados)

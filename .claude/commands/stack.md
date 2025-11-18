---
description: Define a stack tecnológica, restrições e cria o ADR-001 para justificar a escolha.
---

# Stack

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por documentar a pilha tecnológica e decisões chave deste repositório arc42 em pt-BR. Use pensamento estruturado, siga os templates em `.claude/templates/arc42/` e substitua qualquer marcador `[PREENCHER]` por conteúdo definitivo.

### Objetivos

1. Transformar o briefing em restrições técnicas/organizacionais coerentes e rastreáveis.
2. Descrever a estratégia de solução e o stack tecnológico completo com justificativas mensuráveis.
3. Registrar decisões arquiteturais (ADRs) consistentes, mantendo histórico, indexação e status atualizados.
4. Garantir que o glossário cubra termos de negócio/técnicos mencionados, evitando ambiguidade.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Sempre consulte o template correspondente em `.claude/templates/arc42/` antes de criar/editar; se o arquivo alvo não existir, replique a estrutura do template antes de preencher.
- Preserve headings, numeração, tabelas e bloco de metadados de cada documento.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (YYYY-MM-DD) em todos os arquivos tocados.
- Remova placeholders quando informação não se aplica, substituindo por "Não aplicável – justificar".
- As tabelas devem ficar totalmente preenchidas com dados concretos (evite "N/A" genérico).
- Use datas reais (YYYY-MM-DD) em todas as decisões/entradas de histórico.
- Para ADRs:
  - O ID segue `ADR-XXX`, com três dígitos sequenciais; mantenha numeração existente ao atualizar.
  - Status deve ser um dentre: Proposta, Aceita, Deprecated, Superseded por ADR-YYY.
  - Atualize índice ao final com título, data e status consistentes.
- No glossário:
  - Ordene termos alfabeticamente por seção.
  - Garanta que sinônimos, contexto e exemplos reflitam o domínio descrito.
- Quando mencionar ferramentas, cite versões (mínimo major) e justificar impactos (performance, segurança, compliance, custo).
- Toda restrição deve apontar impacto (Alto/Médio/Baixo) coerente com justificativa.
- Mantenha consistência entre seções: tecnologias obrigatórias ↔ stack tecnológico ↔ ADRs ↔ glossário.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não reutilizar IDs de ADR já documentados para novas decisões.
- Não deixar seções vazias; quando inaplicável, justificar explicitamente.
- Não sair do idioma português brasileiro.
- Não omitir referências relevantes (links, documentos de apoio) quando citados no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Extrair objetivos de negócio, públicos, restrições pré-existentes e ambientes alvo.
2. Identificar componentes do stack (linguagens, frameworks, infraestrutura, observabilidade, CI/CD).
3. Levantar decisões já tomadas ou pendentes (trade-offs, alternativas rejeitadas, riscos).
4. Listar termos de domínio e siglas que precisam constar no glossário.

**Fase 2 – Planejamento dos Artefatos**
1. Revisar versões atuais dos quatro arquivos verificando campos já preenchidos.
2. Se algum arquivo não existir, copiar o template correspondente antes de iniciar a redação.
3. Mapear quais restrições impactam diretamente as escolhas de tecnologia e decisões posteriores.
4. Determinar quantos ADRs precisam ser criados/atualizados (mínimo um ADR Aceito que represente o stack resultante do briefing).
5. Definir termos obrigatórios no glossário que suportem a linguagem ubíqua do documento.

**Fase 3 – Redação das Seções**
1. `specs/02_constraints/002_constraints.md`:
   - Preencher tabelas de restrições técnicas, organizacionais e legais com IDs, impacto e justificativa alinhados ao briefing.
   - Completar listas de tecnologias obrigatórias/proibidas e convenções (branches, commits, variáveis).
   - Documentar processos de desenvolvimento, compliance e padrões de código referenciando `patterns/` quando necessário.
2. `specs/04_solution-strategy/004_solution-strategy.md`:
   - Completar stack tecnológico principal com versões, justificativas e coerência com restrições.
   - Descrever arquitetura escolhida, camadas, regras de dependência e diagramas textuais (ASCII/Mermaid).
   - Explicitar comunicação interna/externa, gerenciamento de estado, tratamento de erros e estratégias para objetivos de qualidade (com técnicas + ferramentas).
   - Registrar trade-offs arquiteturais comparando alternativas rejeitadas.
3. `specs/09_decisions/009_architectural-decisions.md`:
   - Atualizar ou criar ADRs detalhando contexto, decisão, alternativas, consequências positivas/negativas e riscos.
   - Preencher notas de implementação com diretrizes práticas.
   - Garantir atualização do índice com dados consistentes.
4. `specs/12_glossary/012_glossary.md`:
   - Criar entradas para termos de negócio/técnicos, acrônimos, entidades, value objects, eventos e estados mencionados nos outros documentos.
   - Adicionar seção "Termos Evitados" apontando nomenclaturas ambíguas e alternativas recomendadas.
   - Atualizar índice alfabético cobrindo todos os termos criados.

**Fase 4 – Validação Cruzada**
1. Conferir que restrições e tecnologias citadas aparecem consistentemente em estratégia, ADRs e glossário.
2. Validar que cada ADR possui correspondência com restrições/trade-offs descritos.
3. Revisar ortografia, concordância e formatação (listas, tabelas, negritos).
4. Confirmar que não restaram placeholders, colchetes ou marcações de template.
5. Checar que datas/versões/IDs não conflitam com históricos anteriores.

**Fase 5 – Saída**
1. Para cada arquivo tocado, gerar bloco `cat` completo:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após os blocos `cat`, emitir o relatório final:
```text
✅ STACK DOCUMENTADA

Atualizações:
• specs/02_constraints/002_constraints.md
• specs/04_solution-strategy/004_solution-strategy.md
• specs/09_decisions/009_architectural-decisions.md
• specs/12_glossary/012_glossary.md

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar destaques conforme principais decisões/tecnologias documentadas.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/02_constraints/002_constraints.md`
  - `.claude/templates/arc42/04_solution-strategy/004_solution-strategy.md`
  - `.claude/templates/arc42/09_decisions/009_architectural-decisions.md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/02_constraints/002_constraints.md`
  - `specs/04_solution-strategy/004_solution-strategy.md`
  - `specs/09_decisions/009_architectural-decisions.md`
  - `specs/12_glossary/012_glossary.md`

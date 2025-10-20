---
description: Define a visão, objetivos, escopo e termos iniciais do projeto.
---

# Vision
<!-- markdownlint-disable MD012 MD029 MD031 MD032 MD036 -->

## User Input

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por manter a documentação arc42 deste repositório em pt-BR. Use pensamento estruturado, preserve o padrão dos templates em `.codex/template/` e preencha/atualize o conteúdo sem deixar `PREENCHER`.

### Objetivos

1. Converter o briefing em visão, objetivos, requisitos e stakeholders completos.
2. Atualizar contexto de negócio/técnico, escopo e interfaces.
3. Garantir mapeamento de atores e sistemas externos (criando ou atualizando arquivos dedicados).
4. Manter glossário consistente com todos os termos introduzidos.
5. Registrar status, datas e versões conforme os templates.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro.
- Preserve headings, ordem numérica e formatação dos templates.
- Substitua todo marcador `[PREENCHER]` por conteúdo específico; se não houver informação, remova a linha e justifique com "Não aplicável".
- Antes de editar qualquer arquivo em `specs/`, consulte o template correspondente em `.codex/template/` para replicar a estrutura e manter o padrão de formatação.
- Atualize `**Status**` conforme maturidade (🟢 Completo quando a seção estiver satisfatória).
- Atualize `**Última atualização**` com a data atual (`YYYY-MM-DD`).
- Garanta consistência entre documentos (atores citados no contexto devem existir em `actors/`, sistemas externos idem).
- Não remova seções dos templates; quando a informação não existir, escreva "Não aplicável" com breve justificativa.
- Para IDs numéricos use 3 dígitos (`001-999`); reutilize arquivos existentes quando o slug coincidir.
- Slugs: nomes em *kebab-case*, sem acentos, até 50 caracteres.

### Restrições

- Não solicitar confirmações intermediárias.
- Não deixar campos em branco ou placeholders.
- Não alterar outros arquivos além dos listados.
- Não criar IDs duplicados.
- Não mudar o idioma para inglês.

Execute o fluxo completo e entregue o resultado final.

## Execution Steps

### Procedimento

**Fase 1 – Análise do Briefing**
1. Extrair missão do produto, público-alvo e problemas resolvidos.
2. Identificar funcionalidades chave (priorizar top 5–10).
3. Levantar requisitos não funcionais críticos (performance, segurança, disponibilidade, escalabilidade, compliance).
4. Mapear stakeholders, atores externos (personas) e sistemas integrados.
5. Coletar termos de domínio que precisam de definição no glossário.

**Fase 2 – Planejamento dos Artefatos**
1. Verificar existência de arquivos de introdução, contexto e glossário.
   - Se inexistentes, copiar o template correspondente de `.codex/template/` antes de preencher.
   - Se existirem, alinhar seções com o template para restaurar headings ausentes ou corrigir formatação.
2. Mapear atores (`actors/ACT-[NNN]_[slug].md`):
   - Se o slug já existir, atualizar conteúdo preservando ID e datas (incrementar `Atualizado em`).
   - Se for novo, usar o próximo número sequencial disponível (`máximo atual + 1`).
3. Mapear sistemas (`systems/SYS-[NNN]_[slug].md`) com as mesmas regras de atualização/criação.
4. Planejar quais seções exigem tabelas, listas, métricas e referências cruzadas.

**Fase 3 – Atualização dos Documentos**
1. `specs/01_introduction/001_introduction-and-goals.md`:
   - Redigir visão geral (2–3 parágrafos).
   - Descrever "Qual problema resolve?" e "Para quem é?".
   - Listar funcionalidades prioritárias (nome + descrição objetiva).
   - Definir métricas mensuráveis para requisitos não funcionais.
   - Preencher tabela de stakeholders com papéis relevantes.
   - Documentar três objetivos de qualidade com motivação, métrica e meta.
   - Atualizar referências quando necessário.
2. `specs/03_context/003_context-and-scope.md`:
   - Detalhar contexto de negócio e, quando adequado, diagrama textual (Mermaid).
   - Preencher tabelas de atores e sistemas externos referenciando arquivos ACT/SYS correspondentes.
   - Documentar integrações principais com campos completos.
   - Preencher listas de escopo (dentro/fora) com bullets objetivos.
   - Atualizar tabelas de APIs consumidas/expostas conforme briefing.
3. `specs/03_context/actors/ACT-[NNN]_[slug].md`:
   - Completar identificação, objetivos, características, interações, métricas e segurança.
   - Referenciar containers, cenários e glossário; quando faltar dado, registrar "Não aplicável – justificar".
4. `specs/03_context/systems/SYS-[NNN]_[slug].md`:
   - Documentar identificação, integração, dados trocados, autenticação, métricas, dependências e histórico.
   - Justificar com "Não aplicável" quando o briefing não cobrir um campo.
5. `specs/12_glossary/012_glossary.md`:
   - Definir cada termo de domínio citado, em ordem alfabética.
   - Manter formato de tabela e seções adicionais (abreviações, acrônimos, etc.).

**Fase 4 – Validação Cruzada**
1. Confirmar que atores citados no contexto aparecem em `actors/`.
2. Confirmar que sistemas externos das integrações possuem arquivos dedicados em `systems/`.
3. Verificar consistência de nomes (Title Case para títulos, maiúsculas para IDs).
4. Garantir que todas as tabelas tenham cabeçalho e campos preenchidos.
5. Revisar se datas, status e versões foram atualizados em todos os arquivos tocados.

**Fase 5 – Saída**
1. Para cada arquivo atualizado ou criado, gerar bloco `cat` completo:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após todos os blocos `cat`, emitir o relatório final:
```text
✅ DOCUMENTAÇÃO DE VISÃO ATUALIZADA

Atualizações:
• specs/01_introduction/001_introduction-and-goals.md
• specs/03_context/003_context-and-scope.md
• specs/03_context/actors/ACT-XXX_[slug].md (lista completa)
• specs/03_context/systems/SYS-XXX_[slug].md (lista completa)
• specs/12_glossary/012_glossary.md

Resumo:
- [Ponto de destaque 1]
- [Ponto de destaque 2]
- [Ponto de destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar os itens das listas conforme os arquivos realmente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.codex/template/01_introduction/001_introduction-and-goals.md`
  - `.codex/template/03_context/003_context-and-scope.md`
  - `.codex/template/03_context/actors/ACT-[NNN]_[slug].md`
  - `.codex/template/03_context/systems/SYS-[NNN]_[slug].md`
  - `.codex/template/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/01_introduction/001_introduction-and-goals.md`
  - `specs/03_context/003_context-and-scope.md`
  - `specs/03_context/actors/ACT-[NNN]_[slug].md`
  - `specs/03_context/systems/SYS-[NNN]_[slug].md`
  - `specs/12_glossary/012_glossary.md`

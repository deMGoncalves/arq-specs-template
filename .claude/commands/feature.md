---
description: Cria um novo Cenário BDD (SCN) para uma funcionalidade, ligando-o ao Ator e ao Container responsáveis.
---

# Feature

**ID**: CMD-008
**Categoria**: 🎬 Runtime
**Prioridade**: 🔴 P0 (Crítico)
**Fase**: 3
**Arc42 Chapters**: 6, 12

---

## 🎯 O que Faz

Cria **cenários BDD** (Behavior-Driven Development) em formato Gherkin:
- Fluxos principais (happy path)
- Especificação executável (Given/When/Then)
- Ligação com atores (ACT-XXX) e containers (CNT-XXX)

Cada cenário recebe ID único (SCN-XXX) e pode ser automatizado como teste.

## 📝 Quando Usar

### Obrigatório
- Para toda funcionalidade que será implementada
- Antes de escrever código (CMD-013)

### Recomendado
- Para documentar comportamento esperado
- Como base para testes automatizados

### Opcional
- Nunca (sempre documentar comportamento)

## 🔗 Pré-requisitos

### Commands
- **CMD-003 (actor)**: Define atores que usarão a feature
- **CMD-004 (container)**: Define containers que implementam

## 🔗 Pós-ações

### Próximos Commands
- **CMD-009 (flow)**: Documentar fluxos alternativos/erros
- **CMD-013 (code)**: Implementar cenário

### Arquivos Criados
- `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md`
- `specs/06_runtime/006_runtime-view.md` (atualizado)
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | Cenários | Exemplo |
|--------------|-------|----------|---------|
| **LOW** | 10-15 min | 1-2 | CRUD simples |
| **MEDIUM** | 15-30 min | 3-5 | Workflow com validações |
| **HIGH** | 30-60 min | 6-10 | Processo multi-step complexo |

## 💡 Exemplos

### Exemplo 1: Login (LOW)

**Input**:
```bash
/feature Usuário faz login com email e senha
```

**Output**:
```gherkin
Cenário: Login bem-sucedido
  Dado que o usuário está na página de login
  E o usuário fornece email "user@example.com"
  E o usuário fornece senha "SecurePass123"
  Quando o usuário clica em "Entrar"
  Então o sistema valida as credenciais
  E o sistema cria uma sessão JWT
  E o usuário é redirecionado para /dashboard
```

### Exemplo 2: Checkout (HIGH)

**Input**:
```bash
/feature Cliente completa checkout com pagamento via cartão de crédito
```

**Output**:
```gherkin
Cenário: Checkout com cartão válido
  Dado que o cliente tem 3 itens no carrinho (total R$ 299,99)
  E o cliente fornece endereço de entrega válido
  E o cliente seleciona "Cartão de Crédito"
  E o cliente fornece cartão Visa válido (4111...)
  Quando o cliente confirma o pagamento
  Então o sistema processa via Stripe API
  E o pedido muda para status "Pago"
  E um email de confirmação é enviado
  E o estoque é decrementado
```

---

## 🛠️ Troubleshooting

### Problema 1: "Como escrever bom Gherkin?"

**Solução**: Regras:
- **Given**: Estado inicial (setup)
- **When**: Ação do usuário
- **Then**: Resultado esperado
- Evitar detalhes de implementação

### Problema 2: "Quantos cenários criar?"

**Solução**:
- **1 cenário**: Happy path (feature)
- **2-5 cenários**: Fluxos alternativos (flow)
- **Evitar**: Explosion combinatória (use flow para edge cases)

## 🔗 Relacionado com

### Commands
- **CMD-003 (actor)**: [Pré-requisito] Define atores
- **CMD-004 (container)**: [Pré-requisito] Define implementação
- **CMD-009 (flow)**: [Complementar] Fluxos alternativos
- **CMD-013 (code)**: [Pós-ação] Implementação

### Skills
- **SKL-001 (analyst)**: Cria features na Phase 3
- **SKL-007 (tester)**: Valida cenários automatizados

### Rules
- **035 (Testes)**: Cenários BDD → testes automatizados
- **036 (Coverage)**: ≥80% cenários cobertos

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

Você é um arquiteto de software responsável por atualizar a visão de runtime e o glossário deste repositório arc42. Utilize pensamento estruturado, siga os templates em `.claude/templates/arc42/` e elimine quaisquer marcadores `[PREENCHER]`, entregando conteúdo definitivo em português brasileiro técnico.

### Objetivos

1. Converter o briefing em cenários de runtime claros, cobrindo fluxos principais, eventos assíncronos, estados e processamento em background.
2. Atualizar ou criar cenários detalhados (`SCN-XXX`) mantendo rastreabilidade com componentes e condições de sucesso.
3. Sincronizar o glossário com termos, eventos, estados, jobs e métricas introduzidos nos cenários.
4. Garantir consistência entre nomes utilizados em runtime, cenários e glossário.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Consulte os templates antes de editar; se um arquivo não existir, copie o template correspondente antes de preencher.
- Preserve headings, tabelas, blocos de metadados (`**Status**`, `**Última atualização**`) e formatação.
- Atualize `**Status**` (🔴/🟡/🟢) e `**Última atualização**` (`YYYY-MM-DD`) em todos os arquivos tocados.
- Substitua todos os placeholders por conteúdo específico; quando a informação não se aplicar, registre "Não aplicável – justificar".
- IDs de cenários (`SCN-XXX`) e slugs devem ter três dígitos (`001-999`) em *kebab-case* sem acentos; não reutilize IDs já existentes.
- Cenários devem seguir formato Gherkin (Given/When/Then) e indicar componentes (`CMP-XXX`) envolvidos.
- Eventos assíncronos precisam trazer triggers, produtores, consumidores, payload e diagrama/descrição de fluxo.
- Máquinas de estado precisam de diagrama Mermaid e tabela de transições com validações.
- Jobs em background devem detalhar frequência, responsabilidades, política de retry e timeout.
- Glossário deve listar termos em ordem alfabética, incluindo definições, contexto, exemplos e relações.
- Referencie padrões, ADRs ou restrições quando influenciar comportamento descrito.
- Não deixe tabelas ou listas incompletas.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora da lista de artefatos.
- Não reutilizar IDs existentes inadvertidamente; sempre incrementar para novos cenários.
- Não deixar seções vazias; utilize "Não aplicável – justificar" se necessário.
- Não mudar o idioma para inglês.
- Não omitir referências relevantes (links, padrões, ADRs) mencionadas no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Diagnóstico do Briefing**
1. Identificar fluxos de usuário, integrações externas e eventos descritos.
2. Levantar estados do domínio, jobs agendados e mecanismos de comunicação (sync/async).
3. Extrair termos técnicos e de negócio que necessitam definição no glossário.

**Fase 2 – Planejamento dos Cenários**
1. Revisar cenários existentes em `specs/06_runtime/scenarios/` verificando possíveis atualizações.
2. Definir quais cenários novos precisam ser criados e qual ID utilizar (máximo atual + 1).
3. Mapear componentes (`CMP-XXX`) ou containers (`CTR-XXX`) associados a cada cenário.
4. Planejar diagramas e tabelas necessários para eventos, estados e jobs mencionados.

**Fase 3 – Redação**
1. `specs/06_runtime/006_runtime-view.md`:
   - Atualizar seção 6.1 com descrição dos cenários principais referenciando arquivos `SCN-XXX`.
   - Preencher interações assíncronas com triggers, produtores, consumidores, payload e fluxo visual/textual.
   - Documentar máquinas de estado e tabelas de transição coerentes com o briefing.
   - Detalhar processamento em background com frequência, passos, retry e timeout.
2. `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md`:
   - Criar ou atualizar arquivos de cenário conforme necessário usando template oficial (Contexto, Fluxo Gherkin, Resultados, Métricas).
3. `specs/12_glossary/012_glossary.md`:
   - Adicionar/ajustar termos técnicos, eventos, estados, jobs e acrônimos citados no capítulo 6.
   - Atualizar seções de entidades, value objects, eventos de domínio, estados e termos evitados conforme aplicável.
   - Garantir que o índice alfabético contenha links para os novos termos.

**Fase 4 – Validação Cruzada**
1. Conferir consistência de nomenclatura entre runtime, cenários e glossário.
2. Verificar que cada cenário em 6.1 aponta para arquivos `SCN-XXX` existentes e vice-versa.
3. Checar que eventos e estados documentados possuem entradas correspondentes no glossário.
4. Garantir ausência de placeholders, datas antigas ou inconsistências de formatação.

**Fase 5 – Saída**
1. Para cada arquivo tocado, gerar bloco `cat` completo:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Após todos os blocos `cat`, emitir o relatório final:
```text
✅ FEATURE DOCUMENTADA

Atualizações:
• specs/06_runtime/006_runtime-view.md
• specs/12_glossary/012_glossary.md
• specs/06_runtime/scenarios/SCN-XXX_[slug].md (quando aplicável)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar a lista de atualizações e destaques conforme artefatos realmente modificados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/06_runtime/006_runtime-view.md`
  - `.claude/templates/arc42/06_runtime/scenarios/SCN-[NNN]_[slug].md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/06_runtime/006_runtime-view.md`
  - `specs/06_runtime/scenarios/SCN-[NNN]_[slug].md` (quando necessário)
  - `specs/12_glossary/012_glossary.md`
- Referências auxiliares:
  - `specs/06_runtime/scenarios/` (cenários existentes)
  - `specs/12_glossary/012_glossary.md` (termos previamente definidos)

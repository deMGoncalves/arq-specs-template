---
description: Cria e detalha uma entidade externa (Pessoa ou Sistema) que interage com a aplicação.
---

# Actor

**ID**: CMD-003
**Categoria**: 📖 Vision
**Prioridade**: 🟡 P1 (Importante)
**Fase**: 1-3
**Arc42 Chapters**: 3, 12

---

## 🎯 O que Faz

Documenta atores externos que interagem com o sistema:
- **Atores humanos** (personas/usuários): ACT-XXX
- **Sistemas externos** (APIs/integrações): SYS-XXX

Cria arquivo dedicado com objetivos, características, interações, métricas e segurança. Atualiza contexto e glossário automaticamente.

## 📝 Quando Usar

### Obrigatório
- Quando visão (CMD-001) lista atores mas não os detalha
- Antes de criar cenários (CMD-008) que envolvem atores específicos

### Recomendado
- Para sistemas com múltiplos perfis de usuário
- Quando integrações externas têm SLAs/contratos
- Para documentar permissões e responsabilidades

### Opcional
- Sistemas com único tipo de usuário genérico
- Integrações triviais sem SLA

## 🔗 Pré-requisitos

### Commands
- **CMD-001 (vision)**: [Recomendado] Lista atores inicialmente

### Arquivos Necessários
- `specs/03_context/003_context-and-scope.md` (atualizado pelo CMD-001)

## 🔗 Pós-ações

### Próximos Commands
- **CMD-004 (container)**: Criar serviços que atendem esses atores
- **CMD-008 (feature)**: Criar cenários onde atores interagem

### Arquivos Criados
- `specs/03_context/actors/ACT-[NNN]_[slug].md` (humanos)
- `specs/03_context/systems/SYS-[NNN]_[slug].md` (externos)
- `specs/03_context/003_context-and-scope.md` (atualizado)
- `specs/12_glossary/012_glossary.md` (atualizado)

## 📊 Complexidade

| Complexidade | Tempo | Arquivos | Exemplo |
|--------------|-------|----------|---------|
| **LOW** | 3-5 min | 1-2 | Usuário comum + Admin |
| **MEDIUM** | 5-10 min | 3-5 | Multi-tenant com roles |
| **HIGH** | 10-20 min | 6-10 | B2B com integrações complexas |

## 💡 Exemplos

### Exemplo 1: Ator Humano (LOW)

**Input**:
```bash
/actor Médico - profissional que acessa prontuários, prescreve medicamentos e agenda consultas
```

**Output**:
```markdown
- specs/03_context/actors/ACT-003_medico.md
  → Objetivos: Acesso rápido a prontuários, prescrever com segurança
  → Características: 200 médicos, 50-100 acessos/dia cada
  → Interações: Consulta prontuário, cria prescrição, agenda consulta
  → Métricas: Tempo de acesso <2s, disponibilidade 99.9%
```

### Exemplo 2: Sistema Externo (MEDIUM)

**Input**:
```bash
/actor Sistema Stripe - gateway de pagamento que processa transações via webhook e retorna confirmações em tempo real
```

**Output**:
```markdown
- specs/03_context/systems/SYS-002_stripe-gateway.md
  → Tipo: API REST + Webhooks
  → Integração: POST /v1/charges (criar cobrança)
  → Dados trocados: card_token, amount, currency → charge_id, status
  → Autenticação: API Key (sk_live_...)
  → SLA: 99.99% uptime, latência P95 <500ms
  → Dependências: CNT-003 (payment-service)
```

### Exemplo 3: Multi-perfil (HIGH)

**Input**:
```bash
/actor Sistema B2B com 4 perfis: Comprador (realiza pedidos), Vendedor (gerencia catálogo), Admin (configura sistema), Financeiro (aprova pagamentos). Integração com ERP SAP via BAPI calls.
```

**Output**:
```markdown
4 atores humanos:
- ACT-004_comprador-b2b.md
- ACT-005_vendedor.md
- ACT-006_admin-sistema.md
- ACT-007_financeiro.md

1 sistema externo:
- SYS-003_erp-sap.md (BAPI RFC calls)
```

---

## 🛠️ Troubleshooting

### Problema 1: "É ator ou sistema externo?"

**Causa**: Briefing ambíguo

**Solução**: Regra de decisão:
- **Ator humano**: Tem objetivos, necessidades, perfil, toma decisões
- **Sistema externo**: API, protocolo, SLA, sem julgamento humano
- **Ambos**: Cliente usa app (ACT) E app integra com CRM do cliente (SYS)

### Problema 2: "IDs duplicados"

**Sintoma**: ACT-001 já existe

**Solução**:
- Se mesmo ator: Atualizar arquivo existente
- Se ator diferente: Usar próximo ID disponível (ACT-002, ACT-003...)

## 🔗 Relacionado com

### Commands
- **CMD-001 (vision)**: [Pré-requisito] Lista atores inicialmente
- **CMD-004 (container)**: [Pós-ação] Containers atendem atores
- **CMD-008 (feature)**: [Pós-ação] Cenários envolvem atores

### Skills
- **SKL-001 (analyst)**: Invoca este command na Phase 1/3

### Rules
- Não aplicável (apenas documentação)

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

Você é um arquiteto de software responsável por registrar atores deste repositório arc42. Use pensamento estruturado para identificar se o briefing descreve um ator humano (persona/usuário) ou um sistema externo e atualize os artefatos adequados sem deixar marcadores `[PREENCHER]`.

### Objetivos

1. Classificar corretamente o briefing como ator humano ou sistema externo.
2. Criar ou atualizar o documento do ator/sistema seguindo o template correspondente e preenchendo todas as seções com dados concretos.
3. Garantir que o ator/sistema esteja referenciado nas seções de contexto, runtime e glossário quando aplicável.
4. Preservar histórico (`Criado em`, `Atualizado em`, `Versão`) e metadados de status.

## Operating Constraints

### Regras Gerais

- Idioma obrigatório: Português brasileiro técnico.
- Antes de editar, abra o template correspondente; se o arquivo destino não existir, copie o template antes de preencher.
- Preserve headings, listas, tabelas, blocos de metadados e navegação.
- Atualize `**Status**` e `**Última atualização**` (`YYYY-MM-DD`) no arquivo criado/ajustado.
- Mantenha IDs com três dígitos (`001-999`), em sequência crescente, evitando duplicações:
  - Atores humanos → `ACT-XXX`.
  - Sistemas externos → `SYS-XXX`.
- Slugs devem estar em *kebab-case*, sem acentos, até 50 caracteres.
- Determinação do tipo:
  - Considere **ator humano** se o briefing mencionar personas, usuários, papéis organizacionais, necessidades humanas, interfaces de uso ou características pessoais.
  - Considere **sistema externo** se descrever APIs, serviços SaaS, integrações técnicas, provedores, plataformas, bases de dados ou componentes automatizados que interagem via protocolos.
  - Se o briefing misturar ambos, priorize criar dois artefatos distintos (um `ACT-` e um `SYS-`) e explicite a relação entre eles.
- Preencha todas as seções do template; quando a informação não se aplicar, use "Não aplicável – justificar".
- Referencie containers (`CNT-XXX`), componentes (`CMP-XXX`), cenários (`SCN-XXX`), ADRs e padrões relevantes sempre que o briefing mencionar interações específicas.
- Atualize `specs/03_context/003_context-and-scope.md` se for necessário refletir o novo ator/sistema nas tabelas correspondentes.
- Atualize `specs/12_glossary/012_glossary.md` quando novos termos, papéis, integrações ou siglas forem introduzidos.
- Não deixe tabelas ou listas incompletas; forneça valores mensuráveis (frequência, volume, SLAs, RTO/RPO) sempre que possível.

### Restrições

- Não solicitar confirmações intermediárias ou assistência externa.
- Não alterar arquivos fora dos listados nos artefatos.
- Não reutilizar IDs já existentes inadvertidamente.
- Não deixar seções vazias; use "Não aplicável – justificar" quando apropriado.
- Não mudar o idioma para inglês.
- Não omitir referências ou links obrigatórios mencionados no briefing.

## Execution Steps

### Procedimento

**Fase 1 – Análise do Briefing**
1. Identificar palavras-chave que indiquem natureza humana (usuário, persona, operador, papel) ou sistêmica (API, serviço, plataforma, integração).
2. Levantar objetivos, responsabilidades, fluxos de interação, protocolos, dados manipulados e requisitos de segurança.
3. Mapear relacionamentos com containers, cenários runtime e termos de glossário existentes.

**Fase 2 – Planejamento**
1. Verificar se já existe arquivo `ACT-XXX` ou `SYS-XXX` com o mesmo slug; se existir, tratar como atualização mantendo ID e histórico.
2. Caso seja novo, determinar o próximo número sequencial disponível:
   - Liste arquivos existentes (`ls specs/03_context/actors` ou `ls specs/03_context/systems`) e selecione `max + 1`.
3. Decidir quais seções necessitam cruzamento com outros artefatos (contexto, building blocks, runtime, glossário) e preparar links relativos.
4. Planejar métricas, frequências, volumes ou SLAs que comprovem a criticidade citada no briefing.

**Fase 3 – Redação**
1. Preencher o template escolhido (`ACT-` ou `SYS-`) com informações completas:
   - Metadados (tipo, categoria, criticidade, status).
   - Responsabilidades, objetivos, características, protocolos, autenticação, dados trocados.
   - Cenários de uso, integrações, métricas, riscos, plano de mitigação.
   - Navegação e referências cruzadas.
2. Ajustar ou criar entradas em `specs/03_context/003_context-and-scope.md` para incluir o novo ator/sistema nas tabelas apropriadas.
3. Atualizar o glossário (`specs/12_glossary/012_glossary.md`) com termos, siglas ou eventos mencionados e inserir/atualizar links no índice alfabético.

**Fase 4 – Validação Cruzada**
1. Confirmar que os nomes utilizados coincidam em todos os documentos (contexto, runtime, glossário).
2. Verificar consistência de IDs, datas, status e versões com registros anteriores.
3. Checar se todas as seções do template foram preenchidas e que não restaram placeholders.
4. Garantir que links relativos (containers, cenários, ADRs, glossário) apontem para arquivos existentes.

**Fase 5 – Saída**
1. Gerar bloco `cat` para cada arquivo atualizado/criado:
```text
cat > specs/... <<'EOF'
[CONTEÚDO FINAL]
EOF
```
2. Ao final, retornar relatório:
```text
✅ ACTOR DOCUMENTADO

Atualizações:
• specs/03_context/actors/ACT-XXX_[slug].md (se aplicável)
• specs/03_context/systems/SYS-XXX_[slug].md (se aplicável)
• specs/03_context/003_context-and-scope.md (se alterado)
• specs/12_glossary/012_glossary.md (se alterado)

Resumo:
- [Destaque 1]
- [Destaque 2]
- [Destaque 3]

Verificações sugeridas:
- bun run lint:specs
```
3. Ajustar listas conforme artefatos realmente modificados e atualizar o título para "ACTOR(S) DOCUMENTADO(S)" quando ambos forem criados/atualizados.

## Context

### Entrada

Briefing do time: {{args}}

### Artefatos

- Templates base:
  - `.claude/templates/arc42/03_context/actors/ACT-[NNN]_[actor-name].md`
  - `.claude/templates/arc42/03_context/systems/SYS-[NNN]_[system-name].md`
- Documentos a atualizar/criar:
  - `specs/03_context/actors/ACT-[NNN]_[slug].md` (atores humanos)
  - `specs/03_context/systems/SYS-[NNN]_[slug].md` (sistemas externos)
- Referências auxiliares:
  - `specs/03_context/003_context-and-scope.md` (tabelas de atores/sistemas)
  - `specs/05_building-blocks/` (containers referenciados)
  - `specs/06_runtime/` (cenários relacionados)
  - `specs/12_glossary/012_glossary.md` (termos existentes)

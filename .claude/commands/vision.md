---
description: Define a visão, objetivos, escopo e termos iniciais do projeto.
---

# Vision

**ID**: CMD-001
**Categoria**: 📖 Vision
**Prioridade**: 🔴 P0 (Crítico)
**Fase**: 1
**Arc42 Chapters**: 1, 3, 12

---

## 🎯 O que Faz

Converte um briefing inicial em documentação Arc42 estruturada, criando:
- Visão geral do projeto com objetivos e stakeholders
- Contexto de negócio e técnico com atores e sistemas externos
- Glossário com termos de domínio
- Escopo claro (o que está dentro/fora)

Este comando estabelece a **fundação documental** de qualquer projeto, sendo o ponto de partida obrigatório do processo Documentation-First.

## 📝 Quando Usar

### Obrigatório
- No início de qualquer projeto novo
- Quando não existe documentação Arc42 no repositório
- Antes de definir stack tecnológica ou implementar código

### Recomendado
- Quando requisitos mudarem significativamente
- Ao onboarding de novos membros do time
- Para sincronizar visão entre stakeholders

### Opcional
- Para projetos POC/protótipos descartáveis (não recomendado)

## 🔗 Pré-requisitos

### Commands
- Nenhum (este é o primeiro comando a ser executado)

### Skills
- Pode ser invocado diretamente ou via **analyst** (Phase 1: Discovery)

### Arquivos Necessários
- Nenhum (cria documentação inicial)

## 🔗 Pós-ações

### Próximos Commands
- **CMD-002 (stack)**: Definir tech stack e constraints (**obrigatório**)
- **CMD-003 (actor)**: Detalhar atores individuais (recomendado)
- **CMD-004 (container)**: Documentar serviços/aplicações (obrigatório)

### Arquivos Criados
- `specs/01_introduction/001_introduction-and-goals.md`
- `specs/03_context/003_context-and-scope.md`
- `specs/03_context/actors/ACT-[NNN]_[slug].md` (N atores)
- `specs/03_context/systems/SYS-[NNN]_[slug].md` (N sistemas)
- `specs/12_glossary/012_glossary.md`

## 📊 Complexidade

| Complexidade | Tempo Estimado | Arquivos Gerados | Exemplo |
|--------------|----------------|------------------|---------|
| **LOW** | 5-10 min | 3-5 | App CRUD simples com 2 atores |
| **MEDIUM** | 10-20 min | 5-10 | API REST com múltiplas integrações |
| **HIGH** | 20-40 min | 10-20 | Plataforma com microserviços |

## 💡 Exemplos

### Exemplo 1: Projeto Simples (LOW Complexity)

**Input**:
```bash
/vision Sistema de gerenciamento de tarefas colaborativo para equipes pequenas
```

**Output**:
```markdown
Arquivos criados:
- specs/01_introduction/001_introduction-and-goals.md
  → Visão: Facilitar organização de tarefas para times de 3-10 pessoas
  → Stakeholders: Usuário Final, Product Owner, DevOps
  → Qualidade: Response time <200ms, 99% uptime

- specs/03_context/003_context-and-scope.md
  → Atores: ACT-001_usuario-colaborador
  → Sistemas externos: Nenhum
  → Escopo: Criar/editar/remover tarefas (dentro), Analytics avançado (fora)

- specs/12_glossary/012_glossary.md
  → 5 termos: Tarefa, Colaborador, Projeto, Status, Prioridade
```

### Exemplo 2: E-commerce (MEDIUM Complexity)

**Input**:
```bash
/vision Plataforma e-commerce B2B com catálogo de produtos, carrinho, checkout e integração com gateway de pagamento Stripe
```

**Output**:
```markdown
Arquivos criados:
- specs/01_introduction/001_introduction-and-goals.md
  → Visão: Marketplace B2B para fornecedores industriais
  → Stakeholders: 6 perfis (Comprador, Vendedor, Admin, Financeiro, Suporte, DevOps)
  → NFRs: 5000 pedidos/dia, PCI-DSS compliance

- specs/03_context/003_context-and-scope.md
  → Atores: ACT-001_comprador-b2b, ACT-002_vendedor, ACT-003_admin
  → Sistemas: SYS-001_stripe-gateway, SYS-002_correios-api
  → Integrações: 2 APIs REST, 1 Webhook

- specs/12_glossary/012_glossary.md
  → 15 termos: Produto, SKU, Carrinho, Pedido, Pagamento, etc.
```

### Exemplo 3: Plataforma Complexa (HIGH Complexity)

**Input**:
```bash
/vision Sistema de gestão hospitalar com prontuário eletrônico, agendamento, faturamento, integração com laboratórios e farmácias externas, conformidade LGPD e HIPAA
```

**Output**:
```markdown
Arquivos criados (18 total):
- specs/01_introduction/001_introduction-and-goals.md
  → Visão: Digitalizar operações de hospitais de médio/grande porte
  → Stakeholders: 10 perfis
  → NFRs: 99.9% uptime, encryption at-rest/in-transit, audit log completo

- specs/03_context/003_context-and-scope.md
  → Atores: 7 perfis (Médico, Enfermeiro, Paciente, Recepcionista, etc.)
  → Sistemas: 8 integrações (labs, farmácias, planos de saúde, SUS)
  → Compliance: LGPD, HIPAA, CFM 1821/2007

- specs/12_glossary/012_glossary.md
  → 40+ termos médicos e técnicos
```

---

## User Input

```text
{{args}}
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (quando fornecida).

## Goal

Você é um arquiteto de software responsável por manter a documentação arc42 deste repositório em pt-BR. Use pensamento estruturado, preserve o padrão dos templates em `.claude/templates/arc42/` e preencha/atualize o conteúdo sem deixar `PREENCHER`.

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
- Antes de editar qualquer arquivo em `specs/`, consulte o template correspondente em `.claude/templates/arc42/` para replicar a estrutura e manter o padrão de formatação.
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
   - Se inexistentes, copiar o template correspondente de `.claude/templates/arc42/` antes de preencher.
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
  - `.claude/templates/arc42/01_introduction/001_introduction-and-goals.md`
  - `.claude/templates/arc42/03_context/003_context-and-scope.md`
  - `.claude/templates/arc42/03_context/actors/ACT-[NNN]_[slug].md`
  - `.claude/templates/arc42/03_context/systems/SYS-[NNN]_[slug].md`
  - `.claude/templates/arc42/12_glossary/012_glossary.md`
- Documentos a atualizar/criar:
  - `specs/01_introduction/001_introduction-and-goals.md`
  - `specs/03_context/003_context-and-scope.md`
  - `specs/03_context/actors/ACT-[NNN]_[slug].md`
  - `specs/03_context/systems/SYS-[NNN]_[slug].md`
  - `specs/12_glossary/012_glossary.md`

---

## 🛠️ Troubleshooting

### Problema 1: "Briefing muito vago ou incompleto"

**Sintoma**: Comando gera documentação genérica com muitos placeholders

**Causa**: Briefing não contém informações suficientes sobre problema, público-alvo ou funcionalidades

**Solução**:
1. Re-executar comando com briefing expandido incluindo:
   - Problema que o sistema resolve
   - Quem são os usuários/stakeholders
   - Top 3-5 funcionalidades principais
   - Requisitos não-funcionais críticos (performance, segurança, etc.)

**Exemplo**:
```bash
# ❌ Vago
/vision Sistema de vendas

# ✅ Completo
/vision Sistema de vendas online B2C para varejo de moda com catálogo de 10k produtos, checkout via Stripe, integração com Correios, target de 1000 pedidos/dia, usuários: Cliente, Vendedor, Admin
```

### Problema 2: "IDs de atores/sistemas duplicados"

**Sintoma**: Erro ao criar arquivo `ACT-001_usuario.md` - arquivo já existe

**Causa**: Comando detectou que o slug do ator/sistema já tem arquivo correspondente

**Solução**:
- Se o conteúdo existente estiver correto, o comando automaticamente atualiza em vez de criar
- Se o ID estiver duplicado para entidades diferentes, renomeie o ator/sistema no briefing para gerar slug único

### Problema 3: "Glossário com termos duplicados"

**Sintoma**: Termos aparecem múltiplas vezes no glossário

**Causa**: Comando adicionou termos sem verificar existência prévia

**Solução**:
1. Editar manualmente `specs/12_glossary/012_glossary.md`
2. Consolidar definições duplicadas
3. Ordenar alfabeticamente

### Problema 4: "Não sei quais stakeholders documentar"

**Sintoma**: Dúvida sobre quais perfis incluir na tabela de stakeholders

**Causa**: Briefing não especifica quem interage com o sistema

**Solução**: Inclua pelo menos:
- **Usuário Final**: Quem usa o sistema diariamente
- **Product Owner**: Quem define requisitos
- **DevOps/SRE**: Quem mantém infraestrutura
- Adicione conforme necessário: Admin, Suporte, Financeiro, Compliance, etc.

---

## 🔗 Relacionado com

### Commands
- **CMD-002 (stack)**: [Pós-ação obrigatória] Define tech stack baseado nos requisitos não-funcionais identificados aqui
- **CMD-003 (actor)**: [Pós-ação recomendada] Detalha individualmente cada ator criado neste comando
- **CMD-004 (container)**: [Pós-ação obrigatória] Define serviços/aplicações da arquitetura
- **CMD-014 (import)**: [Alternativa] Pode ser usado para importar briefing de documento externo antes de rodar /vision

### Skills
- **SKL-001 (analyst)**: Invoca este command automaticamente na Phase 1 (Discovery)
- **SKL-008 (documenter)**: Atualiza introdução/contexto quando código muda significativamente

### Rules
Não há regras de código aplicadas diretamente (este comando gera apenas documentação), mas a documentação gerada deve seguir:
- Clareza e objetividade
- Português brasileiro técnico
- Ausência de placeholders/ambiguidades

---

**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Versão**: 2.0.0
**Mantido por**: Documentation-First Approach Team

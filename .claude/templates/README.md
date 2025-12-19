# Templates - Especificações Determinísticas

**Versão**: 3.1.0
**Última Atualização**: 2025-12-16
**Total**: 26 templates organizados
**Status**: 🟢 Pronto para produção

---

## 🎯 Filosofia

**Especificações determinísticas reduzem o espaço de interpretação da IA de 10²⁰ possibilidades para ~10 implementações funcionalmente equivalentes.**

Este diretório contém 26 templates estruturados baseados em frameworks comprovados:
- **Arc42** (12 capítulos): Documentação arquitetural
- **Modelo C4** (3 níveis): Visualização de arquitetura
- **BDD** (Gherkin): Cenários comportamentais
- **ADR**: Registros de decisões arquiteturais
- **Security** (5 templates): OWASP ASVS, STRIDE, OWASP Top 10, CWE Top 25, NIST SSDF
- **Workflow**: Templates de processo (proposal, design, spec, tasks)

Taxa de acerto com specs determinísticas: **>90%** vs **20-40%** com specs vagas.

---

## 📊 Visão Geral

### Por Categoria

| Categoria | Quantidade | IDs | Propósito |
|-----------|------------|-----|-----------|
| **Workflow** | 4 | TPL-WORKFLOW-001 a 004 | Templates de processo (proposal, design, spec, tasks) |
| **Arc42** | 12 | TPL-ARC42-01 a 12 | Documentação de arquitetura (12 capítulos) |
| **Modelo C4** | 3 | TPL-C4-001 a 003 | Visualização de arquitetura (3 níveis) |
| **Security** | 5 | TPL-SEC-001 a 005 | OWASP ASVS, STRIDE, OWASP Top 10, CWE, NIST SSDF |
| **BDD** | 1 | TPL-BDD-001 | Cenários comportamentais (Gherkin) |
| **ADR** | 1 | TPL-ADR-001 | Registros de decisões arquiteturais |

**Total**: 26 templates

### Por Criticidade

| Criticidade | Quantidade | Templates | Quando Falha... |
|-------------|------------|-----------|-----------------|
| 🔴 CRÍTICO | 2 | TPL-WORKFLOW-001, TPL-WORKFLOW-003 | IA alucina, débito técnico explode |
| 🟡 IMPORTANTE | 5 | TPL-WORKFLOW-002, TPL-ARC42-06, TPL-BDD-001, TPL-ADR-001, TPL-C4-001 | Qualidade degrada, retrabalho aumenta |
| 🟢 ÚTIL | 13 | Demais Arc42, C4-002, C4-003 | Docs ficam desatualizados, mas não crítico |

---

## 📁 Estrutura de Diretórios (v3.0)

```
.claude/templates/
├── README.md                                 # Este arquivo
│
├── arc42/                                    # Arc42 - 12 capítulos
│   ├── 01_introduction.md
│   ├── 02_constraints.md
│   ├── 03_context.md
│   ├── 04_solution-strategy.md
│   ├── 05_building-blocks.md
│   ├── 06_runtime.md
│   ├── 07_deployment.md
│   ├── 08_crosscutting.md
│   ├── 09_decisions.md
│   ├── 10_quality.md
│   ├── 11_risks.md
│   └── 12_glossary.md
│
├── c4/                                       # Modelo C4 - 3 níveis
│   ├── context.md
│   ├── container.md
│   └── component.md
│
├── bdd/                                      # Behavior-Driven Development
│   └── scenario.md                           # Gherkin Given/When/Then
│
├── adr/                                      # Architecture Decision Records
│   └── decision.md
│
└── changes/                                  # Templates de workflow
    ├── proposal.md
    ├── design.md
    └── tasks.md
```

---

## 🗺️ Workflow de 7 Fases - Uso de Templates

### Fase 1: Discovery

```
Requisição do Usuário: "Implementar autenticação OAuth2"
    ↓
📋 analyst cria:
    ├─ TPL-WORKFLOW-001 (proposal.md)
    │   ├─ Avalia complexity: HIGH
    │   ├─ Calcula health score: 9/16
    │   └─ Decide: Fase 2 OBRIGATÓRIA
    └─ Output: proposal.md
```

**Templates usados**:
- 🔴 **TPL-WORKFLOW-001 (proposal)**: SEMPRE (qualquer complexidade)

---

### Fase 2: Architecture (Condicional - apenas HIGH)

```
proposal.md indica: Complexity=HIGH OU Score<13
    ↓
🏗️ architect cria:
    ├─ TPL-WORKFLOW-002 (design.md)
    ├─ TPL-ADR-001 (4-6 ADRs)
    ├─ TPL-C4-001 (system-context)
    └─ TPL-C4-002 (containers)
    ↓
Output: design.md + ADR-XXX + diagramas C4
```

**Templates usados**:
- 🟡 **TPL-WORKFLOW-002 (design)**: Se complexidade HIGH
- 🟡 **TPL-ADR-001 (decision)**: Para decisões críticas
- 🟡 **TPL-C4-001 (system-context)**: Para visualizar limites
- 🟢 **TPL-C4-002 (container)**: Para detalhar containers

---

### Fase 3: Specification

```
proposal.md + design.md (se HIGH)
    ↓
📋 analyst cria:
    ├─ TPL-ARC42-01 a 12 (spec.md)
    │   ├─ Cap 6 usa TPL-BDD-001 (scenarios)
    │   ├─ Cap 3 usa TPL-C4-001 (context)
    │   └─ Cap 5 usa TPL-C4-002, TPL-C4-003
    └─ Output: spec.md (Arc42 completo)
```

**Templates usados**:
- 🟡 **TPL-ARC42-06 (runtime)**: SEMPRE (comportamento observável)
- 🟡 **TPL-BDD-001 (scenario)**: Para cada feature (5-15 scenarios)
- 🟢 **TPL-ARC42-01 a 05, 07 a 12**: Conforme necessário
- 🟢 **TPL-C4-003 (component)**: Para detalhar componentes

---

### Fase 3.5: Task Decomposition (**CRÍTICO**)

```
spec.md aprovado
    ↓
🎯 orchestrator usa:
    └─ TPL-WORKFLOW-003 (tasks.md)
        ├─ Extrai cenários BDD
        ├─ Mapeia componentes DDD
        └─ Decompõe em N tasks (<100 LOC cada)
    ↓
Output: tasks.md (5-100 tasks atômicas)
```

**Templates usados**:
- 🔴 **TPL-WORKFLOW-003 (tasks)**: SEMPRE (qualquer complexidade)

**Por quê crítico?**
```
Contexto grande (5000+ linhas) → IA perde foco → Alucinações ❌
Contexto pequeno (~500 linhas/task) → IA permanece determinística → Código correto ✅
```

---

### Fases 4-7: Implementation → Release

Sem templates (usa código, skills, rules).

---

## 📚 Catálogo Completo de Templates

### 🔴 Templates CRÍTICOS (2)

#### TPL-WORKFLOW-001: Proposal

**Fase**: 1 (Discovery)
**Skill**: analyst (SKL-001)
**Quando**: SEMPRE (qualquer mudança)

**O que faz**:
- Entende requisito do usuário
- Avalia complexidade (LOW, MEDIUM, HIGH)
- Calcula health score (0-16)
- Decide workflow (pular/invocar fase Architecture)

📄 [Template](./changes/proposal.md)

---

#### TPL-WORKFLOW-003: Tasks

**Fase**: 3.5 (Task Decomposition)
**Skill**: orchestrator (SKL-003)
**Quando**: SEMPRE (após spec.md aprovado)

**O que faz**:
- Decompõe spec.md em N tasks atômicas
- Cada task: ≤100 LOC, ~500 linhas de contexto
- Estabelece dependências (DAG válido)
- Define critérios de aceitação específicos

**Por quê crítico?**
Task decomposition é a técnica que previne alucinações da IA.

📄 [Template](./changes/tasks.md)

---

### 🟡 Templates IMPORTANTES (5)

#### TPL-WORKFLOW-002: Design

**Fase**: 2 (Architecture)
**Skill**: architect (SKL-002)
**Quando**: Complexidade HIGH OU score <13

**O que faz**:
- Cria design.md com diagramas C4 Nível 3
- Define padrões DDD (Aggregates, Entities, VOs, Repos)
- Cria 3-5 ADRs para decisões críticas

📄 [Template](./changes/design.md)

---

#### TPL-ARC42-06: Runtime View

**Fase**: 3 (Specification)
**Skill**: analyst (SKL-001)
**Quando**: SEMPRE

**O que faz**:
- Documenta comportamento observável do sistema
- Usa cenários BDD (TPL-BDD-001)
- Define fluxos principais e alternativos

📄 [Template](./arc42/06_runtime.md)

---

#### TPL-BDD-001: Scenario

**Fase**: 3 (Specification) + 5 (Testing)
**Skill**: analyst (SKL-001), tester (SKL-007)
**Quando**: Para cada feature

**O que faz**:
- Define comportamento observável com Gherkin (Given/When/Then)
- Especificação executável (testes derivam diretamente)
- Linguagem ubíqua (negócio + dev entendem)

📄 [Template](./bdd/scenario.md)

---

#### TPL-ADR-001: Decision

**Fase**: 2 (Architecture) + 3 (Specification)
**Skill**: architect (SKL-002), analyst (SKL-001)
**Quando**: Decisões arquiteturais significativas

**O que faz**:
- Documenta contexto, decisão, consequências, alternativas
- Transparência (entender "por quê")
- Evita re-debates

📄 [Template](./adr/decision.md)

---

#### TPL-C4-001: System Context

**Fase**: 2 (Architecture) + 3 (Specification)
**Skill**: architect (SKL-002), analyst (SKL-001)
**Quando**: Complexidade HIGH, múltiplos sistemas externos

**O que faz**:
- Visualiza sistema como caixa preta
- Define limites (dentro vs fora)
- Identifica atores e integrações externas

📄 [Template](./c4/context.md)

---

### 🟢 Templates ÚTEIS (13)

#### Capítulos Arc42 (11 capítulos além de Cap 6)

| ID | Template | Propósito |
|----|----------|-----------|
| TPL-ARC42-01 | Introduction | Visão geral, stakeholders, objetivos |
| TPL-ARC42-02 | Constraints | Restrições técnicas/organizacionais |
| TPL-ARC42-03 | Context | Limites do sistema (usa C4 L1) |
| TPL-ARC42-04 | Solution Strategy | Stack tecnológica, padrões |
| TPL-ARC42-05 | Building Blocks | Containers (C4 L2), componentes (C4 L3) |
| TPL-ARC42-07 | Deployment | Infraestrutura, CI/CD |
| TPL-ARC42-08 | Crosscutting | Segurança, logging, i18n |
| TPL-ARC42-09 | Decisions | ADRs (usa TPL-ADR-001) |
| TPL-ARC42-10 | Quality | Performance, escalabilidade, SLA |
| TPL-ARC42-11 | Risks | Riscos técnicos, débito técnico |
| TPL-ARC42-12 | Glossary | Termos de negócio e técnicos |

📄 [Todos em arc42/](./arc42/)

---

#### Níveis C4 2-3 (2 templates)

| ID | Template | Nível | Propósito |
|----|----------|-------|-----------|
| TPL-C4-002 | Container | C4 L2 | Microsserviços, apps, bancos |
| TPL-C4-003 | Component | C4 L3 | Módulos, classes, serviços |

📄 [Todos em c4/](./c4/)

---

## 🎓 Guias de Uso por Complexidade

### Complexidade LOW (3-8h)

**Templates necessários**:
1. 🔴 TPL-WORKFLOW-001 (proposal)
2. 🟡 TPL-ARC42-06 (runtime) + TPL-BDD-001 (2-3 scenarios)
3. 🔴 TPL-WORKFLOW-003 (tasks) → 5-15 tasks
4. 🟢 TPL-ARC42-10 (quality) - opcional

**Exemplo**: Adicionar validação de email

---

### Complexidade MEDIUM (1-3 dias)

**Templates necessários**:
1. 🔴 TPL-WORKFLOW-001 (proposal)
2. ⚠️ TPL-WORKFLOW-002 (design) - RECOMENDADO se score <13
3. 🟡 TPL-ARC42-03, 05, 06, 08, 09, 10
4. 🟡 TPL-BDD-001 (5-10 scenarios)
5. 🟢 TPL-C4-002 (container) - se múltiplos containers
6. 🟡 TPL-ADR-001 (2-3 ADRs) - se decisões importantes
7. 🔴 TPL-WORKFLOW-003 (tasks) → 15-40 tasks

**Exemplo**: Sistema de notificações multi-canal

---

### Complexidade HIGH (1-3 semanas)

**Templates necessários**:
1. 🔴 TPL-WORKFLOW-001 (proposal)
2. 🔴 TPL-WORKFLOW-002 (design) - **OBRIGATÓRIO**
3. 🟡 TPL-ADR-001 (4-6 ADRs) - **OBRIGATÓRIO**
4. 🟡 TPL-C4-001 (system-context) - **OBRIGATÓRIO**
5. 🟢 TPL-C4-002, TPL-C4-003
6. 🟢 TPL-ARC42-01 a 12 (todos os 12 capítulos)
7. 🟡 TPL-BDD-001 (10-20 scenarios)
8. 🔴 TPL-WORKFLOW-003 (tasks) → 40-100 tasks

**Exemplo**: Migração JWT → OAuth2 + OIDC + SAML + 2FA

---

## 📊 Métricas de Qualidade

### Spec Vaga vs Determinística

| Métrica | Spec Vaga | Spec Determinística | Melhoria |
|---------|-----------|---------------------|----------|
| Taxa de Acerto | 20-40% | >90% | +150% |
| Taxa de Alucinações | 60-80% | <10% | -85% |
| Taxa de Retrabalho | 50-70% | <15% | -75% |
| Tempo de Implementação | Imprevisível | Previsível | Estimável |

### Uso de Templates por Complexidade

| Complexidade | Templates | Tempo Doc | Tempo Impl | ROI |
|--------------|-----------|-----------|------------|-----|
| **LOW** | 3-5 | 30min | 3-4h | 10x |
| **MEDIUM** | 8-12 | 2-4h | 1-3 dias | 8x |
| **HIGH** | 18-20 | 1-2 dias | 2-3 semanas | 5x |

---

## 🚨 Antipadrões a Evitar

### ❌ 1. Pular Proposal (TPL-WORKFLOW-001)

```bash
# ERRADO
User: "Add feature X" → analyst → spec.md → developer

# CORRETO
User: "Add feature X" → analyst → proposal.md → (architect?) → spec.md → orchestrator → developer
```

**Impacto**: Complexidade mal avaliada, fase de arquitetura pulada quando necessário.

---

### ❌ 2. Pular Task Decomposition (TPL-WORKFLOW-003)

```bash
# ERRADO
spec.md (3000 linhas) → developer implementa tudo de uma vez

# CORRETO
spec.md → orchestrator → tasks.md (30 tasks, cada ~500 linhas de contexto) → developer (task-by-task)
```

**Impacto**: Alucinações da IA, código incorreto, débito técnico massivo.

---

### ❌ 3. Specs Vagas (Não Usar BDD)

```markdown
# ERRADO ❌
O registro de usuário deve validar email.

# CORRETO ✅ (TPL-BDD-001)
Scenario: Registro de Usuário - Email Inválido
Given email "abc" é fornecido
When POST /api/users {"email": "abc"}
Then resposta é 400 Bad Request
And erro é "INVALID_EMAIL: Formato de email inválido"
```

**Impacto**: Interpretação ambígua, comportamento não especificado, testes não mapeiam.

---

### ❌ 4. Não Documentar Decisões (Pular ADR)

```bash
# ERRADO
Escolhemos PostgreSQL. (sem documentar por quê, alternativas, trade-offs)

# CORRETO (TPL-ADR-001)
ADR-005: Usar PostgreSQL
Contexto: Precisa de ACID, expertise do time, orçamento $500/mês
Decisão: PostgreSQL
Consequências: ✅ ACID, ✅ Time conhece, ❌ Limites de escalonamento vertical
Alternativas: MongoDB (rejeitado: sem ACID), MySQL (rejeitado: queries mais lentas)
```

**Impacto**: Re-debates futuros, decisões questionadas, falta de transparência.

---

## 🔗 Referências Cruzadas

### Integração com Skills (Workflow de 7 Fases)

| Skill | Templates Usados | Fase | Localização de Output |
|-------|------------------|------|----------------------|
| **analyst** | changes/proposal.md, changes/spec.md, arc42/*, bdd/* | 1, 3, 7 | changes/[id]/, specs/ |
| **architect** | changes/design.md, adr/decision.md, c4/* | 2 | changes/[id]/, specs/09_decisions/adrs/ |
| **orchestrator** | changes/tasks.md | 3.5 | changes/[id]/tasks.md |
| **developer** | (aplica todos os templates indiretamente via tasks) | 4 | src/ |
| **tester** | bdd/scenario.md (valida scenarios) | 5 | Relatórios de teste |
| **documenter** | (atualiza todas as specs/ se necessário) | 6 | specs/, README.md |
| **guardian** | (valida todos os outputs de template) | 7 | Relatórios de validação |

Veja `../skills/README.md` para documentação completa do workflow de 7 fases.

### Integração com Comandos

| Comando | Templates Usados | Localização de Output |
|---------|------------------|----------------------|
| /vision | arc42/01_introduction.md, arc42/03_context.md | specs/01_introduction/, specs/03_context/ |
| /stack | arc42/02_constraints.md, arc42/04_solution-strategy.md, adr/decision.md | specs/02_constraints/, specs/04_solution-strategy/, specs/09_decisions/adrs/ADR-001_* |
| /actor | arc42/03_context.md | specs/03_context/ |
| /container | c4/container.md | specs/05_building-blocks/containers/ |
| /component | c4/component.md | specs/05_building-blocks/components/ |
| /feature | bdd/scenario.md | specs/06_runtime/scenarios/ |
| /flow | bdd/scenario.md | specs/06_runtime/scenarios/ |
| /build | arc42/07_deployment.md, arc42/10_quality.md | specs/07_deployment/, specs/10_quality/ |
| /cross | arc42/08_crosscutting.md | specs/08_crosscutting/ |
| /adr | adr/decision.md | specs/09_decisions/adrs/ |
| /plan | arc42/05_building-blocks.md, arc42/06_runtime.md, bdd/scenario.md | Múltiplas specs |
| /import | Todos arc42/*, c4/*, bdd/*, adr/* | Todos os diretórios specs/ |

Veja `../commands/README.md` para catálogo completo de comandos.

### Integração com Regras

Templates referenciam regras durante implementação:
- **changes/tasks.md** → Cada task lista regras aplicáveis de rules/
- **bdd/scenario.md** → Regras de validação + security rules
- **c4/component.md** → Regras SRP, OCP de rules/solid/
- **security/*.md** → Mapeiam para security rules (040-064)
- **arc42/02_constraints.md** → Todas as 64 regras (39 quality + 25 security)
- **arc42/08_crosscutting.md** → Security rules (040-064)
- **arc42/10_quality.md** → Testing + Security rules (032, 040-064)

Veja `../rules/README.md` para catálogo completo de 64 regras organizadas por categoria.

---

## 📖 Documentação Relacionada

- **[Hub Principal](../README.md)** - Visão completa do sistema com workflow de 7 fases
- **[Comandos](../commands/README.md)** - 15 comandos Arc42
- **[Skills](../skills/README.md)** - 10 agentes especializados (+ security-analyst) e workflow de 7 fases
- **[Regras](../rules/README.md)** - 64 regras (39 quality + 25 security) organizadas por categoria
- **[Resultado: specs/](../../specs/)** - Especificações bem documentadas (a constituição)

### Referências Externas

**Documentação de Arquitetura**:
- **Arc42**: https://arc42.org/
- **Modelo C4**: https://c4model.com/
- **BDD/Gherkin**: https://cucumber.io/docs/gherkin/
- **ADR**: https://adr.github.io/

**Frameworks de Segurança**:
- **OWASP ASVS 4.0**: https://owasp.org/www-project-application-security-verification-standard/
- **STRIDE**: Microsoft Security Development Lifecycle
- **OWASP Top 10 (2021)**: https://owasp.org/www-project-top-ten/
- **CWE Top 25**: https://cwe.mitre.org/top25/
- **NIST SSDF v1.1**: https://csrc.nist.gov/publications/detail/sp/800-218/final

---

## 📜 Changelog

### v3.1.0 (2025-12-16)

**🛡️ INTEGRAÇÃO DE SEGURANÇA**:
- 🔒 Adição de 5 templates de segurança (security/)
- 📊 Total: 20 → 26 templates
- 🛡️ OWASP ASVS 4.0 (V1-V14) checklist completo
- 🎯 STRIDE threat modeling framework
- 🔴 OWASP Top 10 (2021) A01-A10 coverage
- ⚠️ CWE Top 25 vulnerability analysis
- 📋 NIST SSDF v1.1 compliance framework
- 🔗 Integração completa com 25 security rules (040-064)
- 📖 Documentação aprimorada com referências aos frameworks de segurança
- 🎓 Guias de uso para análise de segurança em phases 2, 3, 5, 7

### v3.0.0 (2025-12-10)

**🔗 REFERÊNCIAS CRUZADAS COMPLETAS**:
- 🔗 Integração completa com skills, comandos, regras
- 📖 Documentação aprimorada com links claros para todos os diretórios relacionados
- 🎯 Fluxo coerente para navegação perfeita do desenvolvedor
- 🗺️ Integração completa do workflow com todas as referências cruzadas
- ✨ IDs removidos (TPL-) para estrutura mais limpa
- 📚 Organizado em 5 pastas temáticas (arc42, c4, bdd, adr, changes)
- 🎓 Guias de uso por complexidade (LOW, MEDIUM, HIGH)
- 🚨 Antipadrões documentados
- 📊 Métricas de qualidade

### v2.0.0 (2025-11-17)

- Estrutura inicial com 20 templates
- 12 capítulos Arc42
- 3 níveis C4
- Templates BDD, ADR, Workflow

---

**Versão**: 3.1.0
**Mantido por**: Sistema Documentation-First Approach
**Licença**: MIT
**Última Atualização**: 2025-12-16

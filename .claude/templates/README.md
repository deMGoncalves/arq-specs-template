# Templates - Especificações Determinísticas

**Versão**: 2.0.0 | **Atualizado**: 2025-11-17

---

## O Que São?

Templates estruturados para criação de especificações determinísticas baseadas em frameworks comprovados da indústria: **Arc42** (12 capítulos de documentação arquitetural), **C4 Model** (visualização de arquitetura em 4 níveis), **BDD** (cenários comportamentais Given-When-Then) e **ADR** (registros de decisões arquiteturais).

Especificações determinísticas reduzem o espaço de interpretação da IA de 10²⁰ possibilidades para ~10 implementações funcionalmente equivalentes, aumentando a taxa de acerto de 20-40% para >90%.

---

## Por Que Usar?

### Comparação: Vago vs Determinístico

**Spec Vaga** ❌:
```markdown
Criar endpoint de registro de usuário com email e senha
```
**Resultado**: 10²⁰ interpretações possíveis, código errado em 60-80% das vezes.

**Spec Determinística** ✅:
```markdown
## POST /api/auth/register

Request: {"email": "string (format: email, max 255)", "password": "string (min 8, 1 upper, 1 digit, 1 special)"}
Response 201: {"userId": "uuid", "status": "pending_verification"}
Errors:
- 400 INVALID_EMAIL: Formato inválido
- 409 DUPLICATE_EMAIL: Email já existe
- 422 WEAK_PASSWORD: Senha não atende requisitos

Side Effects:
- User criado com status "pending_verification"
- Evento user.registered publicado
- Email de verificação enviado
- Log: INFO "User registered: {userId}"

Security:
- Password hash bcrypt (min 12 rounds)
- Rate limit: 5 tentativas/hora por IP
- HTTPS obrigatório (TLS 1.3)
```
**Resultado**: ~10 implementações equivalentes, código correto em >90% das vezes.

---

## Estrutura (20 Templates)

```
.claude/templates/
├── README.md                    # Este arquivo
├── proposal.md                  # TPL-WORKFLOW-001 (Phase 1: Discovery)
├── design.md                    # TPL-WORKFLOW-002 (Phase 2: Architecture - HIGH only)
├── tasks.md                     # TPL-WORKFLOW-003 (Phase 3.5: Task Decomposition)
│
├── arc42/                       # 12 capítulos Arc42 (Phase 3: Specification)
│   ├── 01_introduction.md       # TPL-ARC42-01: Visão geral e objetivos
│   ├── 02_constraints.md        # TPL-ARC42-02: Restrições técnicas/organizacionais
│   ├── 03_context.md            # TPL-ARC42-03: Limites do sistema (C4 Level 1)
│   ├── 04_solution-strategy.md  # TPL-ARC42-04: Stack e padrões arquiteturais
│   ├── 05_building-blocks.md    # TPL-ARC42-05: Containers e componentes (C4 L2-3)
│   ├── 06_runtime.md            # TPL-ARC42-06: Comportamento observável (BDD)
│   ├── 07_deployment.md         # TPL-ARC42-07: Infraestrutura e CI/CD
│   ├── 08_crosscutting.md       # TPL-ARC42-08: Segurança, logging, i18n
│   ├── 09_decisions.md          # TPL-ARC42-09: Decisões arquiteturais (ADRs)
│   ├── 10_quality.md            # TPL-ARC42-10: Performance, escalabilidade, SLA
│   ├── 11_risks.md              # TPL-ARC42-11: Riscos e débito técnico
│   └── 12_glossary.md           # TPL-ARC42-12: Terminologia do domínio
│
├── c4/                          # C4 Model (Níveis 1-3)
│   ├── system-context.md        # TPL-C4-001: Sistema + atores + sistemas externos
│   ├── container.md             # TPL-C4-002: Microsserviços, apps, bancos de dados
│   └── component.md             # TPL-C4-003: Módulos, classes, serviços
│
├── bdd/                         # Behavior-Driven Development
│   └── scenario.md              # TPL-BDD-001: Cenários Given-When-Then
│
└── adr/                         # Architecture Decision Records
    └── decision.md              # TPL-ADR-001: Registro de decisões arquiteturais
```

---

## Registro de Templates

### Formato de IDs

`TPL-[CATEGORY]-[NUMBER]`
- **CATEGORY**: WORKFLOW, ARC42, C4, BDD, ADR
- **NUMBER**: Sequencial (001, 002...) ou capítulo Arc42 (01-12)

### Workflow (3 templates)

| ID | Arquivo | Skill | Fase | Descrição |
|----|---------|-------|------|-----------|
| TPL-WORKFLOW-001 | proposal.md | analyst | 1 | Discovery e avaliação de complexidade |
| TPL-WORKFLOW-002 | design.md | architect | 2 | Design arquitetural (HIGH only) |
| TPL-WORKFLOW-003 | tasks.md | orchestrator | 3.5 | Decomposição em tarefas atômicas |

### Arc42 (12 capítulos)

| ID | Arquivo | Fase | Descrição |
|----|---------|------|-----------|
| TPL-ARC42-01 | 01_introduction.md | 3 | Introdução, requisitos, stakeholders |
| TPL-ARC42-02 | 02_constraints.md | 3 | Restrições técnicas, organizacionais, convenções |
| TPL-ARC42-03 | 03_context.md | 3 | Contexto do sistema (C4 L1), atores, integrações |
| TPL-ARC42-04 | 04_solution-strategy.md | 3 | Stack tecnológica, padrões, trade-offs |
| TPL-ARC42-05 | 05_building-blocks.md | 3 | Containers (C4 L2), componentes (C4 L3) |
| TPL-ARC42-06 | 06_runtime.md | 3 | Comportamento observável, cenários BDD |
| TPL-ARC42-07 | 07_deployment.md | 3 | Infraestrutura, CI/CD, monitoramento |
| TPL-ARC42-08 | 08_crosscutting.md | 3 | Segurança, observabilidade, erro handling |
| TPL-ARC42-09 | 09_decisions.md | 3 | Decisões arquiteturais (ADRs) |
| TPL-ARC42-10 | 10_quality.md | 3 | Performance, escalabilidade, confiabilidade |
| TPL-ARC42-11 | 11_risks.md | 3 | Riscos técnicos, débito técnico |
| TPL-ARC42-12 | 12_glossary.md | 3 | Termos de negócio e técnicos |

### C4 Model (3 níveis)

| ID | Arquivo | Nível | Descrição |
|----|---------|-------|-----------|
| TPL-C4-001 | system-context.md | C4 L1 | Sistema + atores + sistemas externos |
| TPL-C4-002 | container.md | C4 L2 | Microsserviços, apps, bancos de dados |
| TPL-C4-003 | component.md | C4 L3 | Módulos, classes, serviços |

### BDD (1 template)

| ID | Arquivo | Fase | Descrição |
|----|---------|------|-----------|
| TPL-BDD-001 | scenario.md | 3 | Cenários Given-When-Then (happy path, errors, edge cases) |

### ADR (1 template)

| ID | Arquivo | Fase | Descrição |
|----|---------|------|-----------|
| TPL-ADR-001 | decision.md | 2-3 | Registro de decisão arquitetural (status, contexto, consequências) |

**Total**: 20 templates

---

## Como Usar

### Seleção por Fase do Workflow

| Fase | Complexidade | Templates Necessários |
|------|--------------|------------------------|
| **1 - Discovery** | Todas | proposal.md (TPL-WORKFLOW-001) |
| **2 - Architecture** | HIGH apenas | design.md (TPL-WORKFLOW-002) + ADRs + C4 L1-2 |
| **3 - Specification** | LOW/MEDIUM | Arc42 cap 6, 10 + BDD scenarios |
| **3 - Specification** | HIGH | Arc42 completo (12 capítulos) + C4 + BDD + ADRs |
| **3.5 - Task Decomp** | Todas | tasks.md (TPL-WORKFLOW-003) |
| **4-7** | Todas | Sem templates (implementação, review, docs, validation) |

### Seleção por Objetivo

**Quero documentar um novo sistema completo**
→ Use todos os 12 capítulos Arc42 + C4 L1-3 + ADRs para decisões importantes

**Quero documentar uma nova feature**
→ Use Arc42 cap 6 (Runtime) + BDD scenarios para a feature específica

**Quero documentar uma decisão arquitetural**
→ Use ADR (TPL-ADR-001)

**Quero decompor uma spec em tarefas**
→ Use tasks.md (TPL-WORKFLOW-003)

**Quero documentar comportamento observável**
→ Use BDD scenario.md (TPL-BDD-001)

**Quero documentar estrutura de containers/componentes**
→ Use C4 container.md (TPL-C4-002) ou component.md (TPL-C4-003)

---

## Exemplos Práticos

### Exemplo 1: Nova Feature de Login

**Objetivo**: Implementar autenticação com email e senha

**Templates usados**:
1. **proposal.md** → Avalia complexidade (MEDIUM)
2. **Arc42 cap 6** + **BDD scenario.md** → Define comportamento:
   ```gherkin
   Scenario: Login com credenciais válidas
     Given usuário existe com email "user@example.com"
     And senha é "StrongPass123"
     When usuário submete formulário
     Then usuário é autenticado
     And token JWT criado (expires 24h)
     And log: INFO "User logged in: {userId}"
   ```
3. **tasks.md** → Decompõe em tarefas atômicas (ex: criar endpoint, validar credenciais, gerar JWT)
4. **developer** → Implementa task-by-task

### Exemplo 2: Sistema de Pagamentos (HIGH Complexity)

**Objetivo**: Novo subsistema de processamento de pagamentos

**Templates usados**:
1. **proposal.md** → Avalia complexidade (HIGH)
2. **design.md** → Estratégia arquitetural
3. **ADR decision.md** → ADR-001: Use Stripe como gateway
4. **C4 system-context.md** → Sistema + Stripe + bancos
5. **C4 container.md** → Payment API, Payment DB, Event Bus
6. **Arc42 completo** (12 capítulos) → Documentação completa
7. **BDD scenarios** → Cenários de pagamento (sucesso, falha, timeout)
8. **tasks.md** → Decomposição em 50+ tarefas atômicas

### Exemplo 3: Decisão de Migração de Banco

**Objetivo**: Migrar de MySQL para PostgreSQL

**Templates usados**:
1. **ADR decision.md** → ADR-005: Migrate to PostgreSQL
   - **Context**: Performance issues com queries complexas
   - **Decision**: Migrar para PostgreSQL
   - **Consequences**: ✅ Melhor performance em queries, ✅ JSON nativo, ❌ Downtime de 2h
   - **Alternatives**: Aurora MySQL (rejected: custo 3x maior)

---

## Workflow Integration

### Fluxo Visual por Fase

```
FASE 1 (Discovery)
    proposal.md (TPL-WORKFLOW-001)
    ↓
    [Avalia complexidade: LOW/MEDIUM/HIGH]
    ↓
    ├─→ [if HIGH] FASE 2 (Architecture)
    │       design.md (TPL-WORKFLOW-002)
    │       ├─→ ADR templates (TPL-ADR-001)
    │       └─→ C4 System Context (TPL-C4-001)
    │               └─→ C4 Container (TPL-C4-002)
    │
    └─→ FASE 3 (Specification)
            Arc42 12 capítulos (TPL-ARC42-01 a 12)
            ├─→ Cap 3: Usa TPL-C4-001 (System Context)
            ├─→ Cap 5: Usa TPL-C4-002, TPL-C4-003 (Containers, Components)
            ├─→ Cap 6: Usa TPL-BDD-001 (Scenarios)
            └─→ Cap 9: Usa TPL-ADR-001 (ADRs)
            ↓
        FASE 3.5 (Task Decomposition)
            tasks.md (TPL-WORKFLOW-003)
            ↓
        FASE 4-7 (Implementation → Release)
            [Sem templates, usa constitution.md e skills]
```

### Aplicação Adaptativa por Complexidade

| Complexidade | Arc42 Obrigatórios | Arc42 Opcionais | C4 Necessário | ADR Necessário |
|--------------|-------------------|-----------------|---------------|----------------|
| **LOW** | Cap 6, 10 | Demais como referência | Não | Apenas se decisão importante |
| **MEDIUM** | Cap 3, 5, 6, 8, 9, 10 | Cap 1, 2, 4, 7, 11, 12 | C4 L2-3 (se múltiplos componentes) | Sim (decisões importantes) |
| **HIGH** | Todos (1-12) | Nenhum | C4 L1-3 completo | Sim (todas decisões) |

---

## Princípios de Specs Determinísticas

### 1. Defina O QUÊ, Não COMO

❌ **Ruim** (implementação):
```markdown
Use bcrypt para hash de senha com 12 rounds
```

✅ **Bom** (comportamento):
```markdown
Senha deve ser armazenada com hash seguro:
- Resistente a rainbow tables
- Mínimo 10^12 operações para brute force
- Salt único por usuário
```

### 2. Comportamento Observável

❌ **Ruim** (interno):
```markdown
Método privado validateEmail() deve usar regex
```

✅ **Bom** (observável):
```markdown
POST /api/users {"email": "string"}
Response 201: {"userId": "uuid"}
Response 400: INVALID_EMAIL - Formato inválido
```

### 3. Valores Específicos e Mensuráveis

❌ **Ruim** (vago):
```markdown
Sistema deve ser rápido
```

✅ **Bom** (mensurável):
```markdown
- Latência p95 < 200ms
- Latência p99 < 500ms
- Throughput > 10,000 req/s
```

### 4. Condições de Erro Explícitas

❌ **Ruim** (omisso):
```markdown
Sistema deve validar email
```

✅ **Bom** (completo):
```markdown
Validação de email:
✅ Válidos: user@example.com, user+tag@example.co.uk
❌ Inválidos:
   - "invalid" → 400 INVALID_EMAIL
   - "" → 400 MISSING_EMAIL
   - (> 255 chars) → 400 EMAIL_TOO_LONG
```

---

## Próximos Passos

1. **Explorar Templates**: Navegue em `arc42/`, `c4/`, `bdd/`, `adr/` para ver estrutura completa
2. **Entender o Workflow**: Leia `.claude/skills/README.md` para workflow completo de 7 fases
3. **Ver Comandos Arc42**: Consulte `.claude/commands/README.md` para 15 comandos de documentação
4. **Aplicar em Projeto Real**: Use analyst skill para criar primeira spec: "Adicionar [sua feature]"

---

## Referências

- **Workflow Completo**: `.claude/skills/README.md`
- **Princípios Core**: `.claude/constitution.md`
- **Comandos Arc42**: `.claude/commands/README.md`
- **Arc42 Docs**: https://arc42.org/
- **C4 Model**: https://c4model.com/
- **BDD/Gherkin**: https://cucumber.io/docs/gherkin/
- **ADR**: https://adr.github.io/

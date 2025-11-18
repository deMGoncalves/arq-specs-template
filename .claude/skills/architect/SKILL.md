# Architect Skill

**Version**: 2.0.0
**Phase**: 2. Architecture (Design)
**Trigger**: Quando proposal.md tem `Complexity: HIGH` ou `Requires Design Phase: YES`

---

## Purpose

O Architect é responsável por criar o design arquitetural e técnico de mudanças complexas **ANTES** da especificação detalhada.

**Quando usar**:
- ✅ Complexity = HIGH (mudança cross-cutting, múltiplos bounded contexts)
- ✅ Requires Design Phase = YES (decisões arquiteturais significativas)
- ✅ Impacto em infraestrutura, integrações externas, ou performance crítica
- ✅ Trade-offs técnicos precisam ser avaliados

**Quando NÃO usar**:
- ❌ Complexity = LOW ou MEDIUM (prosseguir direto para Specification)
- ❌ Mudança isolada em um único componente
- ❌ Padrões arquiteturais já estabelecidos no projeto

---

## Related Skills

### Prerequisites (must complete before):
- **analyst** - Creates `proposal.md` with complexity = HIGH assessment (Phase 1)

### Follows this skill (typical flow):
- **analyst** - Creates `spec.md` referencing `design.md` (Phase 3)

### Works with (parallel/collaborative):
- **analyst** - May consult for requirements clarification during design
- **orchestrator** - Will use `design.md` during task decomposition (Phase 3.5)

---

## Responsibilities

### 1. Análise de Contexto
- Ler e entender `proposal.md` completamente
- Identificar affected specs e affected code
- Mapear dependências e integrações existentes
- Validar contra `constitution.md`

### 2. Decisões Arquiteturais (ADRs)
- Identificar decisões arquiteturais que precisam ser tomadas
- Avaliar alternativas (mínimo 2 opções)
- Documentar trade-offs (pros, cons, riscos)
- Escolher solução justificada
- Criar ADRs para cada decisão significativa

### 3. Design de Componentes (DDD)
- Mapear bounded contexts afetados
- Definir aggregates, entities, value objects
- Definir domain events
- Projetar repositories e use cases
- Garantir estrutura DDD Tactical Co-Located

### 4. Visualização (C4 Model)
- Criar diagramas C4 conforme necessário:
  - **C1: System Context** - Para mudanças que afetam integrações externas
  - **C2: Container** - Para mudanças em múltiplos containers (services, databases)
  - **C3: Component** - Para mudanças cross-component
  - **C4: Code** - Raramente necessário (apenas para lógica muito complexa)

### 5. Validação de Qualidade
- Design segue constitution.md?
- DDD Tactical Co-Located aplicado corretamente?
- Testability considerada?
- Performance implications avaliadas?
- Security considerations endereçadas?

---

## Inputs

### Required
1. **changes/[change-id]/proposal.md** - Proposta aprovada
2. **.claude/constitution.md** - Princípios do projeto
3. **specs/** - Specs atuais (context)

### Optional
- **src/** - Código existente (para entender arquitetura atual)
- **docs/** - Documentação técnica existente
- ADRs anteriores (para consistência de decisões)

---

## Outputs

### 1. design.md (Main Output)
Localização: `changes/[change-id]/design.md`

Estrutura:
```markdown
# Design: [Change ID]

## Overview
[Visão geral da solução arquitetural em 2-3 sentenças]

## Architecture Decisions (ADRs)

### ADR-001: [Título da Decisão]
**Status**: Proposed | Accepted | Rejected | Superseded
**Context**: [Por que precisamos tomar esta decisão?]
**Decision**: [O que decidimos fazer?]
**Consequences**: [Implicações desta decisão - positivas e negativas]
**Alternatives Considered**:
1. [Alternativa 1] - [Por que não escolhemos]
2. [Alternativa 2] - [Por que não escolhemos]

### ADR-002: [Próxima decisão]
...

## C4 Diagrams

### C1: System Context
[Diagrama ou descrição textual]
- Sistemas externos afetados
- Atores envolvidos
- Fronteiras do sistema

### C2: Container Diagram
[Diagrama ou descrição textual]
- Containers afetados (services, databases, message queues)
- Protocolos de comunicação
- Responsabilidades de cada container

### C3: Component Diagram
[Diagrama ou descrição textual]
- Componentes DDD afetados
- Bounded contexts
- Aggregates principais

## DDD Tactical Design

### Bounded Contexts Affected
1. **[Context Name]**
   - **Aggregates**: [Lista]
   - **Entities**: [Lista]
   - **Value Objects**: [Lista]
   - **Domain Events**: [Lista]
   - **Repositories**: [Lista]
   - **Use Cases**: [Lista]

### Estrutura de Diretórios
```
src/[context]/[container]/[component]/
  - index.ts
  - criar-[entity].ts
  - persistir-[entity].ts
  - [action]-[entity].ts
  - [Entity].ts
  - [ValueObject].ts
  - [Event].ts
  - [component].spec.ts
```

### Domain Events
- [EventName]Criado (past tense)
- [EventName]Atualizado
- [EventName]Removido

## Technical Considerations

### Database Schema Changes
- Tables: [NEW/MODIFIED/REMOVED]
- Migrations: [Lista]
- Indexes: [Lista]

### API Changes
- Endpoints: [NEW/MODIFIED/REMOVED/RENAMED]
- Request/Response formats
- Versioning strategy (if breaking)

### Performance Implications
- Expected load increase: [estimativa]
- Caching strategy: [se aplicável]
- Query optimization: [se aplicável]

### Security Considerations
- Authentication requirements
- Authorization rules
- Data encryption (in-transit, at-rest)
- PII handling

### Testability
- Como testar este design?
- Integration test strategy
- Test data requirements
- Test environment needs

## Open Questions
- [ ] Questão 1 não resolvida
- [ ] Questão 2 para discutir com time
- [ ] Questão 3 pendente de decisão

## Next Steps
1. Review design com Tech Lead
2. Validar com Gatekeeper (Gate 1: Design Approval)
3. Se aprovado, prosseguir para Specification (Phase 3)
```

### 2. ADRs (Architecture Decision Records)
Se ADRs complexos, criar arquivos separados:
`changes/[change-id]/adr/001-[titulo].md`

---

## Workflow

### Step 1: Read Context (~30 min)
```bash
# Load necessary context
- Read changes/[change-id]/proposal.md (full)
- Read .claude/constitution.md (full)
- Read affected specs from specs/ (selective)
- Skim affected code from src/ (optional)
```

**Output**: Understanding of problem space and constraints

### Step 2: Identify Architecture Decisions (~45 min)
```typescript
// Para cada decisão significativa, pergunte:
const decisionsToMake = [
  {
    question: "Qual padrão arquitetural usar?",
    alternatives: ["Opção A", "Opção B", "Opção C"],
    criteria: ["Performance", "Maintainability", "Cost"]
  },
  {
    question: "Como estruturar os bounded contexts?",
    // ...
  }
];

// Para cada decisão:
// 1. Liste >= 2 alternativas
// 2. Avalie pros/cons de cada
// 3. Escolha uma com justificativa clara
// 4. Documente como ADR
```

**Output**: Lista de ADRs documentados

### Step 3: Design DDD Components (~60 min)
```typescript
// Mapeie os componentes DDD necessários
const dddDesign = {
  boundedContexts: [
    {
      name: "UserManagement",
      aggregates: ["Usuario"],
      entities: ["Usuario"],
      valueObjects: ["Email", "CPF", "Nome"],
      domainEvents: ["UsuarioCriado", "UsuarioAtualizado"],
      repositories: ["persistir-usuario"],
      useCases: ["criar-usuario", "atualizar-usuario"]
    }
  ]
};

// Valide contra constitution.md:
// - DDD Tactical Co-Located? ✓
// - Semantic naming? ✓
// - Screaming Architecture? ✓
```

**Output**: Estrutura DDD completa

### Step 4: Create C4 Diagrams (~45 min)
```markdown
# Crie apenas os níveis necessários:

## HIGH complexity:
- C1: System Context (sempre)
- C2: Container (sempre)
- C3: Component (sempre)

## MEDIUM complexity:
- C2: Container (se múltiplos containers)
- C3: Component (sempre)

## LOW complexity:
- Não requer Architect (skip this phase)

# Use PlantUML, Mermaid, ou descrição textual estruturada
```

**Output**: Diagramas C4 apropriados

### Step 5: Technical Considerations (~30 min)
```markdown
# Analise e documente:
1. Database schema changes
2. API changes (se aplicável)
3. Performance implications
4. Security considerations
5. Testability strategy

# Cada item deve responder:
- What changes?
- Why this approach?
- What are the risks?
- How do we mitigate?
```

**Output**: Seções técnicas documentadas

### Step 6: Write design.md (~30 min)
Compile tudo em `changes/[change-id]/design.md` seguindo o template acima.

**Total Time**: ~3-4 hours para HIGH complexity

### Step 7: Self-Validation (~15 min)
```markdown
Checklist:
- [ ] Todas ADRs têm >= 2 alternativas?
- [ ] Trade-offs claramente documentados?
- [ ] Design segue constitution.md?
- [ ] DDD Tactical Co-Located aplicado?
- [ ] C4 diagrams apropriados criados?
- [ ] Technical considerations endereçadas?
- [ ] Testability strategy definida?
- [ ] Open questions documentadas?
```

### Step 8: Request Gate 1 Validation
Após self-validation, solicitar Gatekeeper para Gate 1: Design Approval.

---

## Quality Criteria

### Design Approval (Gate 1)
Para design.md ser aprovado, deve satisfazer:

1. **Completeness**
   - [ ] Todos ADRs necessários documentados
   - [ ] Alternativas avaliadas (>= 2 por decisão)
   - [ ] C4 diagrams presentes (níveis apropriados)
   - [ ] DDD design completo
   - [ ] Technical considerations endereçadas

2. **Constitution Compliance**
   - [ ] DDD Tactical Co-Located seguido
   - [ ] Semantic naming aplicado
   - [ ] Test-First strategy definida
   - [ ] Library-First principle respeitado

3. **Clarity**
   - [ ] Decisões justificadas claramente
   - [ ] Trade-offs explicados
   - [ ] Riscos identificados
   - [ ] Next steps definidos

4. **Feasibility**
   - [ ] Solução é implementável?
   - [ ] Tecnologias são viáveis?
   - [ ] Performance é aceitável?
   - [ ] Security é adequada?

---

## Best Practices

### 1. Start Simple, Add Complexity Only If Needed
```markdown
# Não crie design over-engineered
# Comece com a solução mais simples que atende requisitos

❌ BAD: 10 microservices para feature simples
✅ GOOD: 1 bounded context bem estruturado, escalável depois
```

### 2. Document Trade-offs Explicitly
```markdown
# Toda decisão tem trade-offs

❌ BAD: "Vamos usar PostgreSQL porque é bom"
✅ GOOD: "Escolhi PostgreSQL sobre MongoDB porque:
  - PRO: ACID transactions (crítico para billing)
  - PRO: JSON support (suficiente para flexibilidade)
  - CON: Menos flexible schema que MongoDB
  - CON: Mais complexo para setup inicial
  - RISK: Equipe tem menos experiência com PG
  - MITIGATION: Training sessions + pair programming"
```

### 3. Validate Against Constitution Early
```markdown
# Leia constitution.md ANTES de criar design

- Arc42 + C4 + BDD + ADR foundation? ✓
- DDD Tactical Co-Located? ✓
- Test-First? ✓
- Integration-First Testing? ✓
- Library-First? ✓
```

### 4. Focus on Boundaries and Contracts
```markdown
# Design deve clarificar:
- Bounded contexts boundaries
- API contracts (inputs/outputs)
- Domain events (integration points)
- Repository interfaces
- Use case signatures

# Implementação detalhada vem depois (Phase 4)
```

### 5. Use Existing Patterns
```markdown
# Reutilize padrões existentes no projeto

1. Check specs/ para padrões similares
2. Check src/ para arquitetura atual
3. Check ADRs anteriores para consistência
4. Só introduza novos padrões se justificado
```

---

## Anti-Patterns

### ❌ Over-Design
```markdown
# Não crie arquitetura para problemas que não existem

BAD:
- Microservices para aplicação com 100 users
- Event sourcing sem justificativa clara
- CQRS para operações CRUD simples
```

### ❌ Under-Design
```markdown
# Não ignore decisões importantes

BAD:
- "Vamos resolver isso depois"
- "Detalhes de implementação"
- "Qualquer banco de dados serve"
```

### ❌ Design Sem Trade-offs
```markdown
# Toda decisão tem desvantagens

BAD:
"Microservices: Escalabilidade, Flexibilidade, Performance"

GOOD:
"Microservices:
  PRO: Escalabilidade independente
  PRO: Deploy independente
  CON: Complexidade operacional aumentada
  CON: Latência de rede entre services
  RISK: Eventual consistency challenges"
```

### ❌ Ignorar Constitution
```markdown
# Constitution é NON-NEGOTIABLE

BAD:
- Design que viola DDD Tactical Co-Located
- Estrutura que não permite Test-First
- Arquitetura acoplada (não Library-First)
```

---

## Examples

### Example 1: Simple Design (Complexity: MEDIUM → Skip Architect)
```markdown
# Proposal: add-user-profile
Complexity: MEDIUM

Decision: Prosseguir direto para Specification (Phase 3)
Reason: Mudança isolada em bounded context existente, padrões claros
```

### Example 2: Complex Design (Complexity: HIGH → Use Architect)
```markdown
# Proposal: add-payment-gateway-integration
Complexity: HIGH
Requires Design Phase: YES

Architect Output: design.md with:
- ADR-001: Escolha de payment gateway (Stripe vs PayPal vs Mercado Pago)
- ADR-002: Estratégia de retry para falhas
- ADR-003: Event-driven vs Polling para webhooks
- C1: System Context (nossa app + gateway externo + banco)
- C2: Container (payment-service + event-bus + database)
- C3: Component (payment bounded context com aggregates)
- DDD Design: Payment aggregate, PaymentCreated event, etc
- Technical: Database schema, API versioning, security considerations
```

---

## Interaction with Other Skills

### Before Architect
- **Analyst** criou `proposal.md` → Trigger para Architect se `Complexity: HIGH`

### After Architect
- **Gatekeeper** valida `design.md` → Gate 1: Design Approval
- Se aprovado → **Analyst** prossegue para Phase 3: Specification
- Se rejeitado → Architect revisa design baseado em feedback

### Collaboration
- **Tech Lead** review design antes de Gate 1
- **Team** pode comentar em open questions
- **Orchestrator** usa design.md como input para task decomposition

---

## Constitution Compliance

O Architect deve **SEMPRE** validar design contra:

### Article I: Core Principles
1. ✅ Specification-Driven (design vem antes de spec detalhado)
2. ✅ Arc42 + C4 + BDD + ADR Foundation (design usa C4 + ADR)
3. ✅ Library-First (design permite modularidade)
4. ✅ Test-First (design define testability strategy)
5. ✅ Integration-First Testing (design considera test environment)
6. ✅ DDD Tactical Structure (design usa DDD patterns)

### Article II: Architectural Constraints
- Code Organization (DDD Tactical Co-Located)
- Quality Standards (testability, maintainability)
- Performance Requirements (design avalia performance)
- Security Requirements (design endereça security)

---

## Success Criteria

Design is complete and ready for Gate 1 when:

- [ ] `design.md` created in `changes/[change-id]/`
- [ ] All significant architecture decisions documented as ADRs
- [ ] >= 2 alternatives evaluated per decision
- [ ] Trade-offs explicitly documented
- [ ] Appropriate C4 diagrams created
- [ ] DDD Tactical design complete (bounded contexts, aggregates, events)
- [ ] Technical considerations addressed (DB, API, performance, security)
- [ ] Testability strategy defined
- [ ] Constitution compliance validated (self-check)
- [ ] Open questions documented (if any)
- [ ] Next steps clear
- [ ] Ready for Gatekeeper validation (Gate 1)

---

**Last Updated**: 2025-11-17
**Template Version**: 1.0.0
**Maintained By**: Architecture Team

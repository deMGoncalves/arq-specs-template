# Sistema Arq-Kit - Especificações Determinísticas

**Versão**: 2.1.0 | **Atualizado**: 2025-11-17 | **Status**: 🟢 Ativo

---

## O Que é Arq-Kit?

Sistema completo para **gerar código preciso com IA** através de **especificações determinísticas**.

### O Problema

Modelos de IA são **máquinas probabilísticas**. Prompts vagos → código aleatório.

```
❌ "Crie um sistema de autenticação"
   → 10²⁰ interpretações possíveis
   → IA adivinha
   → Código errado (60-80% das vezes)
```

### A Solução

**Especificações determinísticas** colapsam o espaço de probabilidade:

```
✅ POST /api/auth/login
   Request: {email: string, password: string}
   Response 201: {token: jwt, expiresIn: 3600}
   Errors: 400 INVALID_CREDENTIALS, 429 RATE_LIMIT
   → ~10 implementações equivalentes
   → Código correto (>90% das vezes)
```

---

## Estrutura

```
.claude/
├── README.md              📖 Este arquivo
├── constitution.md        📜 Princípios fundamentais
│
├── commands/              🔧 15 comandos Arc42
│   ├── vision.md          Define visão, objetivos, stakeholders
│   ├── stack.md           Define tech stack, constraints, ADRs
│   ├── actor.md           Documenta atores/sistemas externos
│   ├── container.md       Documenta containers (serviços, apps)
│   ├── component.md       Documenta componentes (módulos)
│   ├── plan.md            Cria building blocks + runtime
│   ├── rule.md            Cria/atualiza patterns
│   ├── feature.md         Cria cenários BDD
│   ├── flow.md            Documenta jornadas runtime
│   ├── build.md           Define deployment, quality
│   ├── cross.md           Documenta conceitos transversais
│   ├── adr.md             Registra decisões arquiteturais
│   ├── code.md            Implementa código das specs
│   ├── import.md          Importa documentos externos
│   └── stats.md           Gera dashboard de saúde
│
├── skills/                🤖 9 agentes (7 fases)
│   ├── analyst/           Phase 1 + 3: Discovery + Specification
│   ├── architect/         Phase 2: Architecture (HIGH complexity)
│   ├── orchestrator/      Phase 3.5: Task Decomposition (CRÍTICO)
│   ├── developer/         Phase 4: Implementation
│   ├── gatekeeper/        Phase 4: Quality gates
│   ├── reviewer/          Phase 5: Code review
│   ├── tester/            Phase 5: Test validation
│   ├── documenter/        Phase 6: Documentation
│   └── guardian/          Phase 7: Pre-commit/release validation
│
├── templates/             📚 Arc42 + C4 + BDD + ADR
│   ├── arc42/             12 capítulos Arc42
│   ├── c4/                4 níveis C4 Model
│   ├── bdd/               Cenários BDD (Given-When-Then)
│   └── adr/               Architecture Decision Records
│
└── rules/                 📏 39 regras de qualidade
    ├── Object Calisthenics (9)
    ├── SOLID (5)
    ├── Package Principles (6)
    └── Code Quality (19)
```

---

## Como Funciona

### Workflow de 7 Fases

```
User Request: "Add user authentication"
    ↓
Phase 1: Discovery (analyst)
    → proposal.md
    ↓
Phase 2: Architecture (architect) - se HIGH complexity
    → design.md
    → usa: /stack, /adr, /rule, /cross
    ↓
Phase 3: Specification (analyst)
    → spec.md
    → usa: /vision, /plan, /feature, /build
    ↓
Phase 3.5: Task Decomposition (orchestrator) ⚠️ CRÍTICO
    → tasks.md
    → Quebra specs em tarefas <100 LOC
    ↓
Phase 4: Implementation (developer)
    → source code
    → usa: /code
    ↓
Phase 5: Review (reviewer + tester)
    → quality reports
    ↓
Phase 6: Documentation (documenter)
    → updated docs
    ↓
Phase 7: Validation (guardian)
    → release checklist
```

### Por Que Phase 3.5 é CRÍTICA?

```
❌ Sem Task Decomposition:
   Spec 5000+ linhas → IA processa tudo de uma vez
   → Contexto grande → Alucinações → Código errado

✅ Com Task Decomposition:
   Spec 5000+ linhas → Dividida em 50 tarefas de ~100 linhas
   → Contexto pequeno → Determinístico → Código correto
```

---

## Uso Rápido

### 1. Comandos Diretos (Slash Commands)

```bash
# Criar visão do projeto
/vision Criar plataforma de e-commerce para pequenos negócios

# Definir stack tecnológico
/stack Node.js 20, PostgreSQL 15, Redis, Docker

# Documentar ator
/actor Admin com permissões para gerenciar usuários e sistema

# Documentar container
/container API Gateway em Node.js para endpoints REST

# Criar feature BDD
/feature Usuário completa checkout com pagamento e confirmação

# Verificar saúde das specs
/stats
```

### 2. Via Skills (Recomendado)

```bash
# User: "Add email validation feature"

# Analyst executa automaticamente:
# → Phase 1: proposal.md
# → Phase 3: /vision → /stack → /plan → /feature → /build → spec.md
# → Phase 3.5: Orchestrator → tasks.md
# → Phase 4: Developer → /code → source code
# → Phase 5-7: Review, docs, validation
```

---

## Conceitos-Chave

### 1. Especificações Determinísticas

**Defina O QUÊ, não COMO**:
- ✅ Comportamento observável (API response, eventos, logs)
- ✅ Contratos explícitos (JSON Schema, tipos)
- ✅ Condições de erro (400, 404, 409, 422, 503)
- ✅ Métricas mensuráveis (< 200ms, 99.9%, p95)
- ❌ Detalhes de implementação (bcrypt, PostgreSQL, Redis)
- ❌ Lógica interna (métodos privados, algoritmos)

**Exemplo**:
```markdown
❌ Vago: "O sistema deve validar emails"

✅ Determinístico:
   Validação de Email:
   - Formato: RFC 5322
   - Max length: 255 caracteres
   - DNS verification: Sim (MX record)
   - Disposable email: Bloqueado
   - Error 400: INVALID_EMAIL_FORMAT
   - Error 422: DISPOSABLE_EMAIL_REJECTED
```

### 2. Arc42 (12 Capítulos)

Framework de documentação arquitetural:

| Capítulo | Comando | Conteúdo |
|----------|---------|----------|
| 1. Introdução | `/vision` | Visão, objetivos, stakeholders |
| 2. Restrições | `/stack`, `/rule` | Constraints técnicas, patterns |
| 3. Contexto | `/vision`, `/actor` | Atores, sistemas externos |
| 4. Solução | `/stack` | Stack tecnológico, estratégia |
| 5. Building Blocks | `/container`, `/component`, `/plan` | Decomposição do sistema |
| 6. Runtime | `/feature`, `/flow`, `/plan` | Cenários, fluxos, estados |
| 7. Deployment | `/build` | Infraestrutura, CI/CD |
| 8. Crosscutting | `/cross` | Segurança, domínio, padrões |
| 9. Decisões | `/adr`, `/stack` | ADRs |
| 10. Qualidade | `/build` | SLOs, métricas, testes |
| 11. Riscos | `/code` | Débitos técnicos |
| 12. Glossário | ALL | Terminologia |

### 3. C4 Model (4 Níveis)

Visualização de arquitetura:

- **Level 1: System Context** → `/vision` - Atores + sistemas externos
- **Level 2: Container** → `/container` - Serviços, apps, DBs
- **Level 3: Component** → `/component` - Módulos, classes
- **Level 4: Code** → `/code` - Implementação

### 4. BDD (Behavior-Driven Development)

Cenários determinísticos:

```gherkin
# Via /feature
Funcionalidade: Processar Pagamento

Cenário: Pagamento com cartão válido
  Dado que o usuário tem itens no carrinho totalizando R$ 499,99
  E o usuário fornece um cartão de crédito válido
  Quando o usuário submete o pagamento
  Então o pagamento é processado via Stripe API
  E o status do pedido muda para "pago"
  E um email de confirmação é enviado
  E a resposta é 201 Created com orderId
```

### 5. ADR (Architecture Decision Records)

Registra decisões importantes:

```markdown
# Via /adr
# ADR-001: Usar PostgreSQL como Banco Principal

## Contexto
Precisamos escolher banco de dados para aplicação transacional.

## Decisão
Usar PostgreSQL 15 como banco principal.

## Consequências
✅ ACID compliance garantido
✅ JSON support para flexibilidade
✅ Ecossistema maduro
❌ Escalabilidade horizontal mais complexa
```

### 6. 39 Regras de Qualidade

- **Object Calisthenics (9)**: Código limpo (1 nível indentação, sem ELSE, etc.)
- **SOLID (5)**: Princípios OOP (SRP, OCP, LSP, ISP, DIP)
- **Package Principles (6)**: Coesão e acoplamento
- **Code Quality (19)**: DRY, KISS, YAGNI, Law of Demeter, etc.

---

## Complexidade de Features

O **analyst** avalia complexidade para determinar o workflow:

### LOW Complexity
- **Critérios**: 1 bounded context, <5 arquivos, padrões estabelecidos
- **Path**: Phase 1 → 3 → 3.5 → 4 → 5 → 6 → 7 (pula Phase 2)
- **Exemplo**: Adicionar validação de email, novo CRUD endpoint
- **Tempo**: 2-6 horas

### MEDIUM Complexity
- **Critérios**: Múltiplos componentes em 1 contexto, 5-15 arquivos, alguns padrões novos
- **Path**: Phase 1 → 3 → 3.5 → 4 → 5 → 6 → 7 (pula Phase 2)
- **Exemplo**: Feature com 3-5 use cases
- **Tempo**: 1-3 dias

### HIGH Complexity
- **Critérios**: Múltiplos bounded contexts, >15 arquivos, decisões arquiteturais necessárias
- **Path**: Phase 1 → **2** → 3 → 3.5 → 4 → 5 → 6 → 7 (inclui Phase 2)
- **Exemplo**: Sistema de pagamentos, autenticação, mensageria
- **Tempo**: 1-2 semanas

**Diferença-Chave**: HIGH complexity adiciona Phase 2 (Architecture) com architect skill.

---

## Métricas Esperadas

| Métrica | Antes Arq-Kit | Depois Arq-Kit |
|---------|---------------|----------------|
| Taxa de Alucinação IA | 60-80% | <10% |
| Taxa de Retrabalho | 50-70% | <15% |
| Cobertura de Testes | Variável | >80% |
| Débito Técnico | Alto | Baixo |
| Tempo de Implementação | Imprevisível | Previsível |
| Qualidade de Código | Inconsistente | Consistente |

---

## Pontos de Entrada

### 👤 Iniciante
1. **Comece aqui**: Este arquivo (README.md)
2. **Workflow**: `skills/README.md` - 7 fases explicadas
3. **Filosofia**: `constitution.md` - Princípios DDD, Library-First, Test-First

### 👨‍💻 Desenvolvedor
1. **Comandos**: `commands/README.md` - 15 comandos
2. **Regras**: `rules/README.md` - 39 regras de qualidade
3. **Templates**: `templates/README.md` - Arc42 + C4 + BDD + ADR

### 👨‍🔬 Arquiteto
1. **Arc42**: `templates/arc42/README.md` - 12 capítulos
2. **C4 Model**: `templates/c4/README.md` - 4 níveis
3. **ADRs**: `templates/adr/README.md` - Decisões arquiteturais

### 👨‍💼 Product Owner
1. **BDD**: `templates/bdd/README.md` - Cenários Given-When-Then
2. **Features**: `commands/feature.md` - Como documentar features
3. **Vision**: `commands/vision.md` - Como definir visão do produto

---

## Princípios Fundamentais

### 1. Document-First (Documentação em Primeiro Lugar)

```
Specs → Design → Tasks → Code → Tests → Deploy
```

**Por quê?**
- Specs determinísticas = código correto (>90%)
- Specs vagas = código aleatório (<40%)

### 2. DDD Tactical Co-Located

```
✅ CERTO:
src/user-management/          # Bounded Context
    api/usuario/              # Aggregate Root
        index.ts              # Aggregate
        criar.ts              # Factory
        Email.ts              # Value Object

❌ ERRADO:
src/domain/entities/Usuario.ts
src/application/services/UsuarioService.ts
src/infrastructure/repositories/UsuarioRepository.ts
```

### 3. Library-First

Construa componentes reutilizáveis desde o dia 1:
- Facilita extração para libs compartilhadas
- Promove modularidade
- Reduz duplicação

### 4. Test-First

Testes junto (ou antes) da implementação:
- TDD reduz bugs
- Documenta comportamento
- Aumenta confiança

---

## FAQ

**Q: Qual skill usar?**
A: Sempre comece com **analyst** (Phase 1: Discovery). Ele orquestra o workflow completo.

**Q: Quando usar architect?**
A: Apenas para HIGH complexity (>15 arquivos, decisões arquiteturais).

**Q: O que é task decomposition?**
A: Quebrar specs grandes (5000+ linhas) em tarefas pequenas (<100 LOC) para evitar alucinações da IA.

**Q: Posso usar comandos diretamente?**
A: Sim! Skills usam comandos internamente, mas você pode invocar diretamente (ex: `/vision`, `/actor Admin`).

**Q: Como funcionam as 39 regras?**
A: Checklist de qualidade aplicada no código. Ver `rules/README.md`.

**Q: O que são specs determinísticas?**
A: Especificações sem ambiguidade que colapsam 10²⁰ opções da IA para ~10 implementações corretas.

---

## Próximos Passos

### 1. Teste um comando
```bash
/vision Criar sistema de gestão de tarefas com colaboração em tempo real
```

### 2. Use o workflow completo
```bash
# User: "Add user authentication with OAuth2"
# → Analyst executa automaticamente todas as fases
```

### 3. Verifique saúde das specs
```bash
/stats
```

### 4. Explore a documentação
```bash
cd .claude/
ls -la commands/    # 15 comandos
ls -la skills/      # 9 agentes
ls -la templates/   # Arc42 + C4 + BDD + ADR
ls -la rules/       # 39 regras
```

---

## Recursos Externos

- **Arc42**: https://arc42.org/
- **C4 Model**: https://c4model.com/
- **BDD**: https://cucumber.io/docs/bdd/
- **ADR**: https://adr.github.io/
- **DDD**: Domain-Driven Design by Eric Evans

---

## Versão e Licença

- **Versão**: 2.1.0
- **Última Atualização**: 2025-11-17
- **Licença**: MIT
- **Mantido por**: Arq-Kit System

---

**🎯 Sistema completo para especificações determinísticas!**

**Pare de lutar contra a IA. Comece a direcioná-la.** 🚀

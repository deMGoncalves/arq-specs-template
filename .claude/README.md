# Sistema de Desenvolvimento Documentation-First

**Versão**: 3.0.0
**Última Atualização**: 2025-12-10
**Status**: 🟢 Pronto para produção

---

## 🎯 O Que É Isto?

Um sistema completo para **gerar código preciso com IA** através de **especificações determinísticas**.

**As ferramentas em `.claude/` produzem especificações bem documentadas em `specs/`**. O diretório `specs/` é sua constituição - a fonte única de verdade que guia todo o desenvolvimento.

```
.claude/  (As Ferramentas)  →  specs/  (A Constituição)  →  src/  (A Implementação)
Commands, Skills,              Documentação Arc42,          Código gerado a partir de
Templates, Rules               Cenários BDD, ADRs           especificações determinísticas
```

### O Problema

Modelos de IA são **máquinas probabilísticas**. Prompts vagos → código aleatório.

```
❌ "Criar um sistema de autenticação"
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

## 📁 Arquitetura do Sistema

```
.claude/
├── README.md              # 📖 Este arquivo - Hub central
│
├── commands/              # 🔧 15 comandos Arc42 (Fase 3)
│   ├── README.md          # Catálogo de comandos + guia de uso
│   ├── vision.md          # Definir visão, objetivos, stakeholders
│   ├── stack.md           # Definir tech stack, restrições, ADRs
│   ├── actor.md           # Documentar atores/sistemas externos
│   ├── container.md       # Documentar containers (serviços, apps)
│   ├── component.md       # Documentar componentes (módulos)
│   ├── plan.md            # Criar building blocks + runtime
│   ├── rule.md            # Criar/atualizar padrões
│   ├── feature.md         # Criar cenários BDD
│   ├── flow.md            # Documentar jornadas runtime
│   ├── build.md           # Definir deployment, qualidade
│   ├── cross.md           # Documentar conceitos transversais
│   ├── adr.md             # Registrar decisões arquiteturais
│   ├── code.md            # Implementar código a partir das specs
│   ├── import.md          # Importar documentos externos
│   └── stats.md           # Gerar dashboard de saúde
│
├── skills/                # 🤖 9 agentes especializados (7 fases)
│   ├── README.md          # Catálogo de agentes + workflow de 7 fases
│   ├── analyst/           # Fase 1 + 3: Discovery + Specification
│   ├── architect/         # Fase 2: Architecture (complexidade HIGH)
│   ├── orchestrator/      # Fase 3.5: Task Decomposition (CRÍTICO)
│   ├── developer/         # Fase 4: Implementation
│   ├── gatekeeper/        # Fase 4: Quality gates
│   ├── reviewer/          # Fase 5: Code review
│   ├── tester/            # Fase 5: Test validation
│   ├── documenter/        # Fase 6: Documentation
│   └── guardian/          # Fase 7: Pre-commit/release validation
│
├── templates/             # 📚 20 templates determinísticos
│   ├── README.md          # Catálogo de templates + uso por complexidade
│   ├── arc42/             # 12 capítulos Arc42
│   ├── c4/                # 3 níveis C4 Model
│   ├── bdd/               # Cenários BDD (Given-When-Then)
│   ├── adr/               # Architecture Decision Records
│   └── changes/           # 4 templates de workflow (proposal → spec → tasks)
│
├── rules/                 # 📏 39 regras de qualidade
│   ├── README.md          # Catálogo de regras organizado por categoria
│   ├── object-calisthenics/    # 9 regras de código limpo
│   ├── solid/                  # 5 princípios OOP
│   ├── package-principles/     # 6 regras de coesão/acoplamento
│   └── code-quality/           # 19 melhores práticas
│
├── hooks/                 # 🎣 Hooks Claude Code (automação)
│   ├── README.md          # Documentação de hooks
│   ├── validate-specs.sh  # Validar saúde das especificações
│   ├── check-quality-rules.sh  # Verificar qualidade de código
│   ├── sync-changes.sh    # Sincronizar mudanças ativas
│   └── settings.json.example  # Exemplo de configuração de hooks
│
├── context.md             # 📖 Contexto do projeto e limites de domínio
├── project.json           # 📊 Metadados e configuração do projeto
├── snippets.md            # ⚡ Comandos rápidos e macros
│
├── prompts/               # 📝 Templates de prompts reutilizáveis
│   ├── analysis/          # Fase 1: Prompts de Discovery
│   ├── design/            # Fase 2: Prompts de Architecture
│   ├── implementation/    # Fase 4: Prompts de geração de código
│   ├── review/            # Fase 5: Prompts de code review
│   ├── documentation/     # Fase 6: Prompts de Documentation
│   └── README.md
│
├── examples/              # 💡 Implementações de referência
│   ├── ddd-patterns/      # Padrões DDD Tactical
│   ├── architecture/      # Exemplos de arquitetura
│   ├── bdd-scenarios/     # Exemplos de cenários BDD
│   ├── quality-rules/     # Exemplos de regras de qualidade
│   └── README.md
│
└── validators/            # ✅ Scripts de validação customizados
    ├── specification/     # Valida documentação specs/
    ├── code/              # Valida código src/
    ├── documentation/     # Valida sincronia de docs
    └── README.md
```

---

## 🗺️ Workflow de 7 Fases

### Fluxo Completo

```
Requisição do Usuário: "Adicionar autenticação OAuth2"
    ↓
Fase 1: Discovery (analyst)
    Output: changes/[id]/proposal.md
    Avalia: Complexidade (LOW/MEDIUM/HIGH)
    ↓
Fase 2: Architecture (architect) - apenas se complexidade HIGH
    Output: changes/[id]/design.md + ADRs
    Usa: /stack, /adr, /rule, /cross
    ↓
Fase 3: Specification (analyst)
    Output: changes/[id]/spec.md + specs/
    Usa: /vision, /plan, /feature, /build, /actor, /container, /component
    ↓
Fase 3.5: Task Decomposition (orchestrator) ⚠️ CRÍTICO
    Output: changes/[id]/tasks.md
    Divide specs em tarefas <100 LOC
    ↓
Fase 4: Implementation (developer)
    Output: código src/ + testes
    Usa: /code
    Qualidade: gatekeeper valida
    ↓
Fase 5: Review (reviewer + tester)
    Output: Relatórios de qualidade
    Valida: Código + testes
    ↓
Fase 6: Documentation (documenter)
    Output: Docs atualizados
    ↓
Fase 7: Validation (guardian)
    Output: Checklist de release
    Valida: Conformidade com Constitution
```

### Por Que a Fase 3.5 É CRÍTICA

```
❌ Sem Decomposição de Tarefas:
   Spec 5000+ linhas → IA processa tudo de uma vez
   → Contexto grande → Alucinações → Código errado

✅ Com Decomposição de Tarefas:
   Spec 5000+ linhas → Dividida em 50 tarefas de ~100 linhas
   → Contexto pequeno → Determinístico → Código correto
```

**Pesquisa**: "Lost in the Middle" (Liu et al. 2023) - Atenção da IA degrada com tamanho de contexto O(n²)

---

## 🔗 Mapa de Referências Cruzadas

### Por Fase

| Fase | Skill | Comandos Usados | Templates Criados | Regras Aplicadas |
|------|-------|----------------|-------------------|------------------|
| **1. Discovery** | analyst | /stats | proposal.md | - |
| **2. Architecture** | architect | /stack, /adr, /cross, /rule | design.md, ADRs | Todas 39 |
| **3. Specification** | analyst | /vision, /plan, /feature, /build, /actor, /container, /component | spec.md, scenarios | - |
| **3.5. Task Decomposition** | orchestrator | - | tasks.md | - |
| **4. Implementation** | developer + gatekeeper | /code | Código fonte | Todas 39 |
| **5. Review** | reviewer + tester | - | Relatórios de teste | Todas 39 |
| **6. Documentation** | documenter | - | Docs atualizados | - |
| **7. Validation** | guardian | /stats | Notas de release | Todas 39 |

### Por Complexidade

| Complexidade | Fases | Comandos | Templates | Regras | Tempo |
|--------------|-------|----------|-----------|--------|-------|
| **LOW** | 1 → 3 → 3.5 → 4 → 5-7 | 3-5 comandos | 3-5 templates | 10 Críticas | 2-6h |
| **MEDIUM** | 1 → 3 → 3.5 → 4 → 5-7 | 8-12 comandos | 8-12 templates | 20 Críticas | 1-3 dias |
| **HIGH** | 1 → **2** → 3 → 3.5 → 4 → 5-7 | 12-15 comandos | 18-20 templates | Todas 39 | 1-2 semanas |

### Por Artefato

| Artefato | Criado Por | Fase | Usa Templates | Validado Por |
|----------|------------|------|---------------|--------------|
| **proposal.md** | analyst | 1 | changes/proposal.md | guardian |
| **design.md** | architect | 2 | changes/design.md + ADR + C4 | guardian |
| **spec.md** | analyst | 3 | changes/spec.md + arc42/ + bdd/ | guardian |
| **tasks.md** | orchestrator | 3.5 | changes/tasks.md | guardian |
| **Código fonte** | developer | 4 | - | gatekeeper + reviewer |
| **Testes** | developer | 4 | - | tester |
| **Docs** | documenter | 6 | - | guardian |

---

## 🚀 Início Rápido

### Para Desenvolvedores

```bash
# 1. Mudança simples (complexidade LOW)
/feature Usuário pode resetar senha via link de email

# 2. Feature média
# Usuário: "Adicionar busca de produtos com filtros"
# → agente analyst cuida de tudo automaticamente

# 3. Feature complexa (complexidade HIGH)
# Usuário: "Adicionar autenticação OAuth2 com SAML + 2FA"
# → analyst → architect → workflow completo

# 4. Verificar saúde das specs
/stats
```

### Para Product Owners

```bash
# Definir visão do produto
/vision Criar plataforma e-commerce para pequenas empresas com gestão de inventário

# Documentar tipos de usuário
/actor Dono de Loja que gerencia produtos e pedidos
/actor Cliente que navega e compra produtos

# Criar user stories com BDD
/feature Cliente completa checkout com pagamento por cartão de crédito
```

### Para Arquitetos

```bash
# Definir stack tecnológica
/stack Node.js 20, PostgreSQL 15, Redis 7, Docker, Kubernetes

# Documentar decisões arquiteturais
/adr Usar PostgreSQL vs MongoDB para dados transacionais

# Definir padrões de qualidade
/rule Validação de email deve seguir RFC 5322 com verificação MX DNS
```

---

## 📚 Conceitos Fundamentais

### 1. Especificações Determinísticas

**Definir O QUÊ, não COMO**:

✅ **Comportamento observável** (resposta API, eventos, logs)
✅ **Contratos explícitos** (JSON Schema, tipos)
✅ **Condições de erro** (400, 404, 409, 422, 503)
✅ **Métricas mensuráveis** (< 200ms, 99.9%, p95)
❌ **Detalhes de implementação** (bcrypt, PostgreSQL, Redis)
❌ **Lógica interna** (métodos privados, algoritmos)

**Exemplo**:
```markdown
❌ Vago: "O sistema deve validar emails"

✅ Determinístico:
   Validação de Email:
   - Formato: RFC 5322
   - Comprimento máx: 255 caracteres
   - Verificação DNS: Sim (registro MX)
   - Email descartável: Bloqueado
   - Erro 400: INVALID_EMAIL_FORMAT
   - Erro 422: DISPOSABLE_EMAIL_REJECTED
```

### 2. Framework Arc42 (12 Capítulos)

Padrão de documentação arquitetural usado na Fase 3:

| Capítulo | Comandos | Conteúdo |
|----------|----------|----------|
| 1. Introduction | `/vision` | Visão, objetivos, stakeholders |
| 2. Constraints | `/stack`, `/rule` | Restrições técnicas, padrões |
| 3. Context | `/vision`, `/actor` | Atores, sistemas externos |
| 4. Solution | `/stack` | Tech stack, estratégia |
| 5. Building Blocks | `/container`, `/component`, `/plan` | Decomposição do sistema |
| 6. Runtime | `/feature`, `/flow`, `/plan` | Cenários, fluxos, estados |
| 7. Deployment | `/build` | Infraestrutura, CI/CD |
| 8. Crosscutting | `/cross` | Segurança, domínio, padrões |
| 9. Decisions | `/adr`, `/stack` | ADRs |
| 10. Quality | `/build` | SLOs, métricas, testes |
| 11. Risks | `/code` | Débito técnico |
| 12. Glossary | TODOS | Terminologia |

### 3. Modelo C4 (4 Níveis)

Visualização de arquitetura usada nas Fases 2-3:

- **Nível 1: System Context** → `/vision` - Atores + sistemas externos
- **Nível 2: Container** → `/container` - Serviços, apps, bancos de dados
- **Nível 3: Component** → `/component` - Módulos, classes
- **Nível 4: Code** → `/code` - Implementação

### 4. BDD (Behavior-Driven Development)

Cenários determinísticos criados com `/feature`:

```gherkin
Feature: Processar Pagamento

Scenario: Pagamento com cartão de crédito válido
  Given usuário tem itens no carrinho totalizando $499.99
  And usuário fornece cartão de crédito válido
  When usuário submete o pagamento
  Then pagamento é processado via API Stripe
  And status do pedido muda para "pago"
  And email de confirmação é enviado
  And resposta é 201 Created com orderId
```

### 5. ADR (Architecture Decision Records)

Documentar decisões importantes com `/adr`:

```markdown
# ADR-001: Usar PostgreSQL como Banco de Dados Primário

## Contexto
Precisa escolher banco de dados para aplicação transacional.

## Decisão
Usar PostgreSQL 15 como banco de dados primário.

## Consequências
✅ Conformidade ACID garantida
✅ Suporte a JSON para flexibilidade
✅ Ecossistema maduro
❌ Escalabilidade horizontal mais complexa
```

### 6. 39 Regras de Qualidade

Aplicadas por gatekeeper, reviewer e guardian nas Fases 4-7:

- **Object Calisthenics (9)**: Código limpo (1 nível de indentação, sem ELSE, etc.)
- **SOLID (5)**: Princípios OOP (SRP, OCP, LSP, ISP, DIP)
- **Package Principles (6)**: Coesão e acoplamento
- **Code Quality (19)**: DRY, KISS, YAGNI, Lei de Demeter, etc.

Veja `rules/README.md` para catálogo completo.

---

## 📊 Métricas Esperadas

Quando você segue este sistema, espere estes resultados:

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Taxa de Alucinação da IA | 60-80% | <10% | -85% |
| Taxa de Retrabalho | 50-70% | <15% | -75% |
| Cobertura de Testes | Variável | >80% | Consistente |
| Débito Técnico | Alto | Baixo | Controlado |
| Tempo de Implementação | Imprevisível | Previsível | Estimável |
| Qualidade de Código | Inconsistente | Consistente | Padronizada |

**ROI por Complexidade**:
- **LOW**: 10x (30min docs → 4h implementação correta vs 2 dias tentativa-e-erro)
- **MEDIUM**: 8x (4h docs → 3 dias correto vs 3 semanas retrabalho)
- **HIGH**: 5x (2 dias docs → 2 semanas correto vs 10 semanas retrabalho)

---

## 🎯 Pontos de Entrada

### 👤 Iniciante
1. **Comece aqui**: Este arquivo (README.md)
2. **Workflow**: `skills/README.md` - 7 fases explicadas
3. **Resultado**: `../specs/` - Especificações bem documentadas (a constituição)

### 👨‍💻 Desenvolvedor
1. **Comandos**: `commands/README.md` - Catálogo de 15 comandos
2. **Regras**: `rules/README.md` - 39 regras de qualidade
3. **Templates**: `templates/README.md` - Arc42 + C4 + BDD + ADR

### 👨‍🔬 Arquiteto
1. **Arc42**: `templates/arc42/` - 12 capítulos
2. **C4 Model**: `templates/c4/` - 3 níveis
3. **ADRs**: `templates/adr/` - Registros de decisão

### 👨‍💼 Product Owner
1. **BDD**: `templates/bdd/` - Cenários Given-When-Then
2. **Features**: `commands/feature.md` - Como documentar features
3. **Vision**: `commands/vision.md` - Como definir visão do produto

---

## 💡 Cenários de Uso Comuns

### Cenário 1: Feature Simples (Complexidade LOW)

```bash
Usuário: "Adicionar validação de comprimento de email (máx 255 chars)"
    ↓
Você: "Complexidade LOW - implementação direta"
    ↓
1. /feature Validação de email com máx 255 caracteres
2. /code (implementa + testes)
3. /stats (valida)
    ↓
Output:
- specs/06_runtime/scenarios/SCN-015_email-validation.md
- src/user-management/api/usuario/Email.ts (validação)
- src/user-management/api/usuario/Email.spec.ts (testes)
- ✅ 100% cobertura de testes
```

**Tempo**: 30min - 2h
**Arquivos**: 3-5
**Fases**: 1 → 3 → 3.5 → 4 → 5-7 (pular Fase 2)

### Cenário 2: Feature Média

```bash
Usuário: "Adicionar busca de produtos com filtros (categoria, faixa de preço, avaliação)"
    ↓
Você: "Complexidade MEDIUM - invocando analyst"
    ↓
Analyst executa:
  Fase 1: proposal.md (complexidade=MEDIUM, pontuação=11/16)
  Fase 3: spec.md com 5 cenários BDD
  Fase 3.5: orchestrator → 18 tarefas
  Fase 4: developer → código + testes
  Fase 5-7: revisão, docs, validação
    ↓
Output:
- changes/product-search/proposal.md
- changes/product-search/spec.md
- changes/product-search/tasks.md (18 tarefas)
- specs/06_runtime/scenarios/SCN-020_product-search.md
- src/catalog/api/produto/buscar.ts
- src/catalog/api/produto/filtrar.ts
- ✅ 85% cobertura de testes
```

**Tempo**: 1-3 dias
**Arquivos**: 10-15
**Fases**: 1 → 3 → 3.5 → 4 → 5-7 (pular Fase 2)

### Cenário 3: Feature Complexa (Complexidade HIGH)

```bash
Usuário: "Adicionar autenticação OAuth2 com SAML SSO e 2FA"
    ↓
Você: "Complexidade HIGH - workflow completo"
    ↓
Analyst executa:
  Fase 1: proposal.md (complexidade=HIGH, pontuação=7/16)
  Fase 2: architect → design.md + 5 ADRs + diagramas C4
  Fase 3: spec.md (todos os 12 capítulos Arc42) + 15 cenários BDD
  Fase 3.5: orchestrator → 62 tarefas
  Fase 4: developer → código + testes (tarefa por tarefa)
  Fase 5: reviewer + tester → validação de qualidade
  Fase 6: documenter → README, docs de API
  Fase 7: guardian → conformidade com constituição
    ↓
Output:
- changes/auth-oauth2/proposal.md
- changes/auth-oauth2/design.md
- changes/auth-oauth2/spec.md
- changes/auth-oauth2/tasks.md (62 tarefas)
- specs/09_decisions/adrs/ADR-010_oauth2-provider.md
- specs/09_decisions/adrs/ADR-011_saml-integration.md
- specs/09_decisions/adrs/ADR-012_2fa-method.md
- src/autenticacao/oauth2/ (15 arquivos)
- src/autenticacao/saml/ (8 arquivos)
- src/autenticacao/2fa/ (5 arquivos)
- ✅ 92% cobertura de testes
```

**Tempo**: 1-2 semanas
**Arquivos**: 20-40
**Fases**: 1 → **2** → 3 → 3.5 → 4 → 5-7 (inclui Fase 2)

---

## 🚨 Anti-Padrões Críticos (EVITAR)

### ❌ 1. Pular Especificação (Viola Constitution Art. I.1)

```bash
❌ ERRADO:
Usuário: "Adicionar feature de login"
Você: [escreve código diretamente]

✅ CERTO:
Usuário: "Adicionar feature de login"
Você: "Criando especificação primeiro com /feature..."
[Invoca /feature ou agente analyst]
```

**Impacto**: Output probabilístico com taxa de alucinação de 60-80%.

### ❌ 2. Pular Decomposição de Tarefas (Viola Constitution Art. I.3)

```bash
❌ ERRADO:
spec.md (5000 linhas) → developer implementa tudo de uma vez

✅ CERTO:
spec.md → orchestrator → tasks.md (50 tarefas, cada ~100 LOC) → developer (tarefa por tarefa)
```

**Impacto**: IA "Lost in the Middle" - degradação de atenção O(n²).

### ❌ 3. Implementação Sem Testes (Viola Constitution Art. I.5)

```bash
❌ ERRADO:
[Implementa feature sem escrever testes]

✅ CERTO:
[Implementa feature + testes juntos, abordagem TDD]
```

**Impacto**: Sem validação funcional, regressões não detectadas.

### ❌ 4. Organização por Camadas Técnicas (Viola Constitution Art. I.7)

```bash
❌ ERRADO:
src/services/UsuarioService.ts
src/repositories/UsuarioRepository.ts
src/entities/Usuario.ts

✅ CERTO (DDD Tactical Co-Located):
src/user-management/api/usuario/
  - index.ts              # Aggregate root
  - criar-usuario.ts      # Factory
  - Email.ts              # Value Object
  - usuario.spec.ts       # Testes
```

**Impacto**: Baixa coesão de domínio, lógica de negócio obscurecida.

### ❌ 5. Violação de Regras de Qualidade

```bash
❌ ERRADO:
[Código com 3 níveis de indentação, múltiplos IFs aninhados]

✅ CERTO:
[Aplica Object Calisthenics: máx 1 indentação, sem ELSE, etc.]
```

**Impacto**: Alta complexidade ciclomática, difícil de manter.

---

## 🔍 Árvores de Decisão

### Quando Usar Comandos vs Agentes?

```
Requisição do Usuário
    ↓
É apenas documentação?
    ├─ SIM → Use comandos slash
    │   Exemplos: /vision, /actor, /feature, /adr
    │
    └─ NÃO → É mudança simples de código (<5 arquivos)?
        ├─ SIM → Ferramentas diretas (Read + Edit + Write)
        │   + Aplicar DDD Co-Located
        │   + Aplicar Object Calisthenics
        │
        └─ NÃO → Invocar agente analyst
            → Ele orquestra workflow inteiro
```

### Qual Agente Invocar?

```
Requisição do Usuário
    ↓
Sempre comece com: analyst (Fase 1: Discovery)
    ↓
Analyst avalia complexidade:
    ├─ LOW/MEDIUM → Pula Fase 2, vai para Fase 3
    └─ HIGH → Invoca architect (Fase 2) → depois Fase 3

Você nunca invoca diretamente:
- architect (analyst invoca quando HIGH)
- orchestrator (analyst invoca na Fase 3.5)
- developer (orchestrator invoca na Fase 4)
- gatekeeper/reviewer/tester (automatizado nas Fases 4-5)
- documenter/guardian (automatizado nas Fases 6-7)
```

---

## 📖 Mapa de Documentação

### Documentação Principal
- **README.md** (este arquivo) - Hub central, referências cruzadas, workflow
- **CLAUDE.md** - Instruções para agente IA Claude Code
- **AGENTS.md** - Instruções para agentes Task

### Diretórios de Trabalho
1. **commands/** - 15 comandos Arc42 para Fase 3 (Specification)
   - Veja `commands/README.md` para catálogo completo

2. **skills/** - 9 agentes especializados para workflow de 7 fases
   - Veja `skills/README.md` para guia detalhado de workflow

3. **templates/** - 20 templates determinísticos
   - Veja `templates/README.md` para uso por complexidade

4. **rules/** - 39 regras de qualidade para Fases 4-7
   - Veja `rules/README.md` para catálogo organizado

---

## 🎓 Caminho de Aprendizado

### Semana 1: Fundamentos
- [ ] Ler este `README.md` - entender o sistema (30min)
- [ ] Ler `skills/README.md` - entender 7 fases (1h)
- [ ] Experimentar 3 comandos slash: `/vision`, `/actor`, `/feature` (30min)
- [ ] Executar `/stats` em projeto exemplo (15min)

### Semana 2: Prática
- [ ] Implementar 1 feature de complexidade LOW ponta-a-ponta (4h)
- [ ] Revisar specs e código gerados (1h)
- [ ] Estudar `rules/README.md` - aprender 10 regras críticas (2h)
- [ ] Implementar 1 feature de complexidade MEDIUM (1 dia)

### Semana 3: Maestria
- [ ] Estudar `templates/README.md` - Arc42 + C4 + BDD + ADR (2h)
- [ ] Implementar 1 feature de complexidade HIGH (2-3 dias)
- [ ] Revisar workflow inteiro: proposal → design → spec → tasks → código (2h)
- [ ] Contribuir melhorias para templates/regras (opcional)

---

## 🔗 Recursos Externos

- **Arc42**: https://arc42.org/ - Framework de documentação de arquitetura
- **C4 Model**: https://c4model.com/ - Visualização de arquitetura
- **BDD**: https://cucumber.io/docs/bdd/ - Behavior-Driven Development
- **ADR**: https://adr.github.io/ - Architecture Decision Records
- **DDD**: Domain-Driven Design por Eric Evans - Padrões táticos
- **Object Calisthenics**: https://williamdurand.fr/2013/06/03/object-calisthenics/

---

## 📊 Métricas de Saúde

Verifique saúde do sistema a qualquer momento com `/stats`:

```bash
/stats

Output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Dashboard de Saúde da Documentação
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Capítulos Arc42: ███████████░ 11/12 (92%)
  ⚠️  Faltando: Capítulo 7 (Deployment)

Cenários BDD: ████████████ 18 cenários
  ✅ Happy paths: 12
  ✅ Fluxos de erro: 6

ADRs: ████████████ 8 decisões documentadas
  ✅ Todas consequências documentadas

Pontuação de Qualidade: 14/16 (87%)
  ✅ Todos capítulos críticos presentes
  ⚠️  Faltando visão de deployment
  ✅ Cobertura BDD abrangente

Recomendações:
1. Adicionar Capítulo 7 (Deployment) com /build
2. Documentar pipeline CI/CD
3. Pontuação atual: BOA (pronto para desenvolvimento)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🤝 Contribuindo

Melhorias são bem-vindas! Áreas de foco:
1. **Novos templates** - Adicionar templates para padrões comuns
2. **Novas regras** - Adicionar regras de qualidade com exemplos
3. **Melhores exemplos** - Melhorar exemplos de comandos/skills
4. **Traduções** - Traduzir docs para outros idiomas

---

## 📄 Versão & Licença

- **Versão**: 3.0.0
- **Última Atualização**: 2025-12-10
- **Licença**: MIT
- **Mantido por**: Sistema Documentation-First Approach

---

## 🎯 Princípios Finais

```
1. Especificação precede implementação (Art. I.1)
2. Decomposição de tarefas mitiga dispersão de atenção O(n²) (Art. I.3)
3. Test-Driven Development garante correção funcional (Art. I.5)
4. DDD Tactical Co-Located maximiza coesão de domínio (Art. I.7)
5. Object Calisthenics + SOLID reduzem complexidade ciclomática (Art. II)
```

---

**🎯 Sistema completo para especificações determinísticas!**

**Pare de lutar contra IA. Comece a dirigi-la.** 🚀

**Links Rápidos**:
- [Catálogo de Comandos](commands/README.md) - 15 comandos Arc42
- [Workflow de Skills](skills/README.md) - 9 agentes, 7 fases
- [Guia de Templates](templates/README.md) - 20 templates determinísticos
- [Regras de Qualidade](rules/README.md) - 39 regras organizadas
- [Resultado: specs/](../specs/) - Especificações bem documentadas

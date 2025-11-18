# Crônica 07: Arc42 + C4 + BDD + ADR - O Framework Definitivo

**Série**: Crônicas - Minha Jornada com IAs e Arquitetura de Software
**Autor**: Cleber de Moraes Gonçalves | PUCPR

---

## A Síntese

Depois de entender:

- Shannon: Entropia deve ser < 0.5 bits
- FullScale: Documentation-First funciona
- Transformer: Contexto deve ser < 1.000 linhas

Fiquei com a pergunta: **"Como implemento isso na prática?"**

A resposta: Combinação de **4 frameworks estabelecidos**, cada um resolvendo um aspecto do problema.

## Os 4 Pilares

### Pilar 1: Arc42 (Arquitetura)

**O que é**: Template de documentação arquitetural com 12 capítulos estruturados.

**Por que funciona**: Força completude através de estrutura predefinida.

**Como reduz entropia**: Cada capítulo tem perguntas específicas que eliminam ambiguidade.

#### Os 12 Capítulos

```
01. Introdução e Objetivos
    → Visão, stakeholders, requisitos de qualidade
    → Elimina ambiguidade sobre "o quê" e "para quem"

02. Restrições
    → Constraints técnicos, legais, organizacionais
    → Elimina ambiguidade sobre limitações

03. Contexto do Sistema
    → Atores externos, sistemas integrados
    → Elimina ambiguidade sobre fronteiras

04. Estratégia de Solução
    → Decisões arquiteturais fundamentais
    → Elimina ambiguidade sobre "como" (alto nível)

05. Building Blocks
    → Estrutura de containers e componentes (C4)
    → Elimina ambiguidade sobre estrutura

06. Runtime View
    → Cenários de execução (BDD)
    → Elimina ambiguidade sobre comportamento

07. Deployment View
    → Infraestrutura, ambientes
    → Elimina ambiguidade sobre onde executa

08. Crosscutting Concepts
    → Segurança, logging, error handling
    → Elimina ambiguidade sobre aspectos transversais

09. Decisões Arquiteturais
    → ADRs (Architecture Decision Records)
    → Elimina ambiguidade sobre "por quê"

10. Requisitos de Qualidade
    → SLOs, NFRs, métricas
    → Elimina ambiguidade sobre critérios

11. Riscos e Débito Técnico
    → Riscos conhecidos, mitigações
    → Elimina ambiguidade sobre trade-offs

12. Glossário
    → Termos do domínio
    → Elimina ambiguidade sobre vocabulário
```

#### Adaptação por Complexidade

Nem todo projeto precisa de todos os capítulos:

```
LOW Complexity (|Ω| < 10³):
  Mínimo viável: Cap 6 (Runtime), 10 (Qualidade)
  H(spec) ≈ 1.5 bits

MEDIUM Complexity (10³ < |Ω| < 10⁶):
  Recomendado: Cap 3, 5, 6, 8, 9, 10
  H(spec) ≈ 0.8 bits

HIGH Complexity (|Ω| > 10⁶):
  Completo: Todos os 12 capítulos
  H(spec) ≈ 0.4 bits
```

**Entropia inversamente proporcional a completude.**

### Pilar 2: C4 Model (Visualização)

**O que é**: 4 níveis hierárquicos de visualização arquitetural.

**Por que funciona**: Hierarquia permite zoom in/out sem perder contexto.

**Como reduz entropia**: Cada nível responde perguntas específicas.

#### Os 4 Níveis

```
C1: System Context
    Questão: "O que o sistema faz e com quem interage?"
    Elementos: Seu sistema + atores externos + sistemas externos
    Entropia reduzida: Fronteiras do sistema (H ≈ 0.2)

    [Seu Sistema] ←→ [Usuários]
                  ←→ [Sistema de Pagamento]
                  ←→ [Banco de Dados Externo]

C2: Containers
    Questão: "Quais são os componentes executáveis?"
    Elementos: APIs, SPAs, bancos de dados, workers
    Entropia reduzida: Estrutura de deployment (H ≈ 0.3)

    [API Gateway] → [Auth Service] → [PostgreSQL]
                  → [Payment Service] → [Redis]
                  → [SPA Frontend]

C3: Components
    Questão: "Quais são os módulos dentro de cada container?"
    Elementos: Controllers, services, repositories
    Entropia reduzida: Estrutura interna (H ≈ 0.4)

    [Auth Service]
      ├─ LoginController
      ├─ OAuth2Handler
      ├─ JWTService
      └─ UserRepository

C4: Code (raramente necessário)
    Questão: "Como é implementado internamente?"
    Elementos: Classes, interfaces, métodos
    Entropia: Alta (H ≈ 2.0)

    EVITE este nível. Deixe a IA decidir implementação.
```

**Regra de Ouro**: Pare no C3. Não especifique C4 (código interno).

#### Por Que C4 Funciona com IAs

Cada nível alimenta o próximo:

```
C1 (contexto) → Define fronteiras → IA entende escopo
C2 (containers) → Define estrutura → IA entende arquitetura
C3 (components) → Define módulos → IA entende organização
```

**Hierarquia preserva contexto através dos níveis sem explodir n².**

### Pilar 3: BDD (Comportamento)

**O que é**: Behavior-Driven Development - especificações executáveis no formato Given-When-Then.

**Por que funciona**: Cenários testáveis eliminam interpretação.

**Como reduz entropia**: Formato estruturado força precisão.

#### Anatomia de um Cenário BDD

```gherkin
Funcionalidade: Registro de Usuário
  Como um visitante
  Eu quero criar uma conta
  Para que eu possa acessar o sistema

  Contexto:
    Dado que o sistema está operacional
    E o banco de dados está acessível

  Cenário: Registro com dados válidos
    Dado que não existe usuário com email "joao@example.com"
    E a senha "ValidPass123!" atende aos requisitos:
      | Requisito          | Valor |
      | Mínimo caracteres  | 8     |
      | Maiúsculas         | 1     |
      | Minúsculas         | 1     |
      | Números            | 1     |
    Quando o usuário submete POST /api/auth/register com:
      """json
      {
        "email": "joao@example.com",
        "password": "ValidPass123!",
        "name": "João Silva"
      }
      """
    Então a resposta tem status 201
    E a resposta JSON tem estrutura:
      """json
      {
        "userId": "uuid",
        "status": "pending_verification",
        "email": "joao@example.com"
      }
      """
    E um email de confirmação é enviado para "joao@example.com"
    E o evento "user.registered" é publicado com payload:
      """json
      {
        "userId": "uuid",
        "email": "joao@example.com",
        "timestamp": "ISO 8601"
      }
      """
    E o usuário é criado no banco com status "pending_verification"

  Cenário: Registro com email duplicado
    Dado que existe usuário com email "joao@example.com"
    Quando o usuário submete POST /api/auth/register com email "joao@example.com"
    Então a resposta tem status 409
    E a resposta JSON contém:
      """json
      {
        "error": "DUPLICATE_EMAIL",
        "message": "Email already registered",
        "field": "email"
      }
      """
    E nenhum usuário adicional é criado
    E nenhum email é enviado
    E nenhum evento é publicado
```

#### Por Que BDD Reduz Entropia

Cada linha do cenário é **verificável**:

```
"Dado que não existe usuário" → SELECT COUNT(*) WHERE email = ?
"Quando submete POST" → Executa HTTP request
"Então status 201" → Assert status == 201
"E resposta JSON tem estrutura" → JSON schema validation
```

**H(comportamento) ≈ 0.1 bits** - Quase determinístico.

### Pilar 4: ADR (Decisões)

**O que é**: Architecture Decision Records - documentação estruturada de decisões.

**Por que funciona**: Rastreia "por quê" de escolhas não-óbvias.

**Como reduz entropia**: Explicita alternativas e trade-offs.

#### Anatomia de um ADR

```markdown
# ADR-001: Usar PostgreSQL como Banco Principal

**Status**: Aceito
**Data**: 2025-01-17
**Decisores**: Cleber Goncalves (Arquiteto), Equipe Dev

## Contexto

Precisamos escolher banco de dados para aplicação transacional com:
- ACID compliance obrigatório
- Suporte a JSON para flexibilidade
- Alta disponibilidade (SLO: 99.9%)
- Escala esperada: 100K usuários, 1M transações/dia

## Decisão

Usar PostgreSQL 15 como banco de dados principal.

## Alternativas Consideradas

### 1. MySQL 8.0
**Pros**:
- Amplamente conhecido pela equipe
- Performance excelente para leituras simples
- Replicação master-slave bem estabelecida

**Cons**:
- JSON support inferior ao PostgreSQL
- Transações complexas menos eficientes
- Window functions menos completas

**Motivo de rejeição**: JSON support é requisito crítico.

### 2. MongoDB 5.0
**Pros**:
- Schema flexível nativo
- Horizontal scaling simplificado
- Queries em JSON intuitivas

**Cons**:
- Transações multi-documento com performance degradada
- ACID compliance apenas em transações, não em nível de documento
- Consultas complexas com joins custosas

**Motivo de rejeição**: ACID compliance é não-negociável.

### 3. CockroachDB
**Pros**:
- PostgreSQL-compatible
- Distributed por design
- Horizontal scaling automático

**Cons**:
- Custo significativamente maior (3-5× vs PostgreSQL)
- Latência adicional por distribuição
- Menos maturidade que PostgreSQL

**Motivo de rejeição**: Custo não justificado para escala atual.

## Consequências

### Positivas
- ✅ ACID compliance garantido
- ✅ JSON/JSONB support robusto (queries, índices, validação)
- ✅ Extensões úteis (PostGIS, pg_cron, pg_stat_statements)
- ✅ Comunidade madura, documentação extensa
- ✅ Ferramentas de monitoramento maduras

### Negativas
- ❌ Escalabilidade horizontal mais complexa (vs MongoDB)
- ❌ Requer tuning manual para performance ótima
- ❌ Maior consumo de memória que MySQL
- ❌ Custo de licença comercial se precisar support enterprise

## Notas de Implementação

- Usar connection pooling via PgBouncer
- Configurar replicação streaming para HA (1 master + 2 replicas)
- Monitorar com pg_stat_statements + Prometheus
- Backups diários com Point-in-Time Recovery (PITR) configurado
- Particionamento de tabelas grandes (>10M rows) por data

## Revisão

Este ADR deve ser revisado em:
- 12 meses (2026-01-17) - avaliar se escala atendeu expectativas
- Quando atingirmos 500K usuários - avaliar necessidade de sharding
- Se SLO de disponibilidade não for atendido por 3 meses consecutivos
```

#### Por Que ADR Reduz Entropia

Quando a IA encontra "use PostgreSQL" no código, ela sabe:

- **Por quê** foi escolhido
- Quais alternativas foram **rejeitadas**
- Quais **trade-offs** foram aceitos
- Quais **consequências** esperar

**H(decisão) sem ADR**: 2.5 bits (muitas interpretações)
**H(decisão) com ADR**: 0.3 bits (contexto claro)

## A Combinação dos 4 Pilares

### Como Eles Se Integram

```
Arc42 Cap. 1-4 (Estratégia)
    ↓ Define WHAT e WHY
ADRs
    ↓ Explicam escolhas não-óbvias
Arc42 Cap. 5 (Structure)
    ↓ Define WHO (componentes)
C4 Levels 1-3
    ↓ Visualiza hierarquia
Arc42 Cap. 6 (Runtime)
    ↓ Define HOW (comportamento)
BDD Scenarios
    ↓ Especifica comportamento testável
Arc42 Cap. 7-12 (Deployment, Quality, etc.)
    ↓ Completa contexto
```

### Redução de Entropia Combinada

```
Sem framework estruturado:
  H(sistema) ≈ 18 bits
  |Ω| = 2^18 ≈ 262.144 implementações

Com 4 pilares combinados:
  Arc42: Reduz 12 bits → H ≈ 6 bits
  C4: Reduz 2 bits → H ≈ 4 bits
  BDD: Reduz 3 bits → H ≈ 1 bit
  ADR: Reduz 0.5 bits → H ≈ 0.5 bits

H(sistema) final ≈ 0.5 bits
|Ω| = 2^0.5 ≈ 1.4 implementações
```

**Redução de 262.144 para ~1.4 = fator de 186.000×**

## Minha Implementação

Criei um template que combina os 4:

```
arq-specs-template/
├── specs/                      # Arc42 (12 capítulos)
│   ├── 01_introduction/
│   ├── 02_constraints/
│   ├── 03_context/            # Integra C4 Level 1
│   ├── 04_solution_strategy/  # Referencia ADRs
│   ├── 05_building_blocks/    # Integra C4 Levels 2-3
│   ├── 06_runtime/            # Integra BDD
│   ├── 07_deployment/
│   ├── 08_crosscutting/
│   ├── 09_decisions/          # ADRs aqui
│   ├── 10_quality/
│   ├── 11_risks/
│   └── 12_glossary/
```

## Por Que Funciona

### 1. Complementaridade

Cada framework resolve um aspecto:

- **Arc42**: Completude
- **C4**: Hierarquia
- **BDD**: Testabilidade
- **ADR**: Rastreabilidade

### 2. Redundância Controlada

Informação aparece em múltiplos lugares, mas consistente:

- Runtime View (Arc42 Cap 6) = BDD Scenarios
- Building Blocks (Arc42 Cap 5) = C4 Diagrams
- Decisions (Arc42 Cap 9) = ADRs

**Redundância reduz ambiguidade, não aumenta.**

### 3. Maturidade

Todos os 4 frameworks têm:

- Anos de uso industrial
- Comunidades ativas
- Ferramentas estabelecidas
- Documentação extensa

**Não estou inventando nada. Estou combinando soluções provadas.**

---

## Próxima Crônica

Agora que tenho o framework, surge a pergunta: **como aplico isso para specs grandes (>5.000 linhas)?**

A resposta: Task Decomposition - a Fase 3.5 que é **matematicamente necessária**.

---

**Próxima Crônica**: [Task Decomposition: A Fase 3.5 Crítica](08-task-decomposition.md) - Por que não é "nice to have".

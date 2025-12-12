# ADR-[XXX]: [Título da Decisão]

**ID do Template**: TPL-ADR-001
**Versão**: 2.0.0
**Categoria**: ADR
**Usado Por**: architect (Fase 2: Arquitetura), analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**Status**: [Proposto | Aceito | Depreciado | Substituído]
**Data**: [YYYY-MM-DD]
**Decisores**: [Nomes ou papéis dos tomadores de decisão]
**Substitui**: [ADR-XXX] (se aplicável)
**Substituído por**: [ADR-XXX] (se depreciado)

---

## Contexto

Qual é o problema que estamos tentando resolver? Quais forças estão em jogo?

**Incluir**:
- Declaração do problema
- Situação atual
- Restrições
- Requisitos
- Contexto que influencia a decisão

**Exemplo**:

Precisamos escolher um banco de dados primário para nossa plataforma de e-commerce.

**Requisitos**:
- Transações ACID (crítico para pagamentos e inventário)
- Consultas complexas (joins, agregações para relatórios)
- Suporte a dados JSON (atributos flexíveis de produto)
- Consistência forte (inventário deve ser preciso)
- Escalabilidade para 100K usuários
- Time tem experiência com bancos de dados relacionais
- Orçamento: máx $5K/mês para banco de dados

**Restrições**:
- Deve deployar na AWS (infraestrutura existente)
- Deve suportar TypeScript/Node.js (expertise do time)
- Deve estar pronto para produção em 3 meses
- Sem MongoDB (política da empresa: sem DBs de documento para dados transacionais)

---

## Decisão

Qual é a mudança que estamos fazendo?

**Formato**: "Nós iremos [decisão]"

**Exemplo**:

Nós iremos usar **PostgreSQL 14+** como nosso banco de dados primário.

---

## Fundamentação

Por que escolhemos esta opção?

**Incluir**:
- Razões para a decisão
- Por que esta solução é melhor que alternativas
- Como ela endereça o contexto/problema

**Exemplo**:

**PostgreSQL é a melhor escolha porque**:

1. **Conformidade ACID**: Totalmente compatível com ACID, crítico para transações financeiras
2. **Suporte JSON**: Tipo JSONB nativo para atributos flexíveis de produto
3. **Expertise do Time**: Time tem 3+ anos de experiência com PostgreSQL
4. **Ecossistema Rico**: ORMs maduros (TypeORM, Prisma), ferramentas de monitoramento (pg_stat_statements)
5. **Performance**: Rápido o suficiente para nossa escala (10K req/s testado)
6. **Custo**: Preço AWS RDS ~$300/mês para nossa carga de trabalho (bem abaixo do orçamento)
7. **Confiabilidade**: Testado em batalha, 20+ anos de uso em produção
8. **Open Source**: Sem vendor lock-in, suporte da comunidade

---

## Alternativas Consideradas

Quais outras opções consideramos? Por que foram rejeitadas?

### Alternativa 1: [Opção]

**Prós**:
- [Pró 1]
- [Pró 2]

**Contras**:
- [Contra 1]
- [Contra 2]

**Por que Rejeitada**: [Razão]

---

### Alternativa 2: [Opção]

**Prós**:
- [Pró 1]
- [Pró 2]

**Contras**:
- [Contra 1]
- [Contra 2]

**Por que Rejeitada**: [Razão]

---

**Exemplo**:

### Alternativa 1: MySQL

**Prós**:
- Similar ao PostgreSQL (relacional, ACID)
- Time tem alguma experiência
- Adoção ampla
- Suporte AWS RDS

**Contras**:
- Menos features que PostgreSQL (suporte JSON inferior)
- Algumas peculiaridades com modo strict e valores padrão
- Otimizador de query menos poderoso

**Por que Rejeitada**: PostgreSQL tem melhor suporte JSON e features mais poderosas. Nenhuma razão convincente para escolher MySQL sobre PostgreSQL.

---

### Alternativa 2: MongoDB

**Prós**:
- Schema flexível (bom para catálogo de produtos)
- Escalabilidade horizontal embutida
- Popular, grande ecossistema

**Contras**:
- Sem transações ACID (até v4, ainda limitado)
- Consistência eventual (não aceitável para inventário)
- Time tem zero experiência
- Política da empresa: sem DBs de documento para dados transacionais

**Por que Rejeitada**: Falta de consistência forte e garantias ACID o torna inadequado para dados transacionais (pagamentos, inventário). Política da empresa também o proíbe.

---

### Alternativa 3: DynamoDB

**Prós**:
- Totalmente gerenciado (sem ops)
- Escalabilidade horizontal automática
- AWS nativo (boa integração)
- Preço pay-per-use

**Contras**:
- NoSQL (consultas complexas difíceis)
- Sem joins (precisa múltiplas queries)
- Vendor lock-in (específico AWS)
- Time tem zero experiência
- Custo imprevisível em escala

**Por que Rejeitada**: Consultas complexas (relatórios, agregações) são requisito core. DynamoDB torna isso muito difícil. Além disso, vendor lock-in é preocupante.

---

### Alternativa 4: CockroachDB

**Prós**:
- Compatível com PostgreSQL
- Distribuído (escalabilidade horizontal embutida)
- ACID + consistência forte
- Suporte multi-região

**Contras**:
- Mais complexo para operar
- Custo maior (~3x PostgreSQL)
- Overkill para escala atual (100K usuários)
- Time tem zero experiência

**Por que Rejeitada**: Excelente tecnologia mas overkill para nossas necessidades atuais. Podemos migrar depois se precisarmos de distribuição global. Custo é 3x maior sem benefício imediato.

---

## Consequências

Quais são os resultados desta decisão? Quais trade-offs estamos fazendo?

### Consequências Positivas

- ✅ [Benefício 1]
- ✅ [Benefício 2]
- ✅ [Benefício 3]

### Consequências Negativas

- ❌ [Trade-off 1]
- ❌ [Trade-off 2]
- ❌ [Trade-off 3]

### Consequências Neutras

- ⚪ [Impacto 1]
- ⚪ [Impacto 2]

---

**Exemplo**:

### Consequências Positivas

- ✅ **Garantias ACID**: Pode lidar com segurança com transações financeiras
- ✅ **Desenvolvimento Rápido**: Expertise do time significa desenvolvimento mais rápido
- ✅ **Queries Ricas**: Joins, agregações, CTEs disponíveis para relatórios
- ✅ **Flexibilidade JSON**: JSONB para atributos de produto sem migrations de schema
- ✅ **Custo Efetivo**: $300/mês bem abaixo do orçamento de $5K
- ✅ **Ecossistema**: ORMs maduros, ferramentas, monitoramento
- ✅ **Confiabilidade**: Testado em batalha em produção por 20+ anos
- ✅ **Open Source**: Sem vendor lock-in

### Consequências Negativas

- ❌ **Limites de Escalabilidade Vertical**: Precisa sharding para escala massiva (10M+ usuários)
- ❌ **Gargalo de Escrita**: Instância primária única (pode usar read replicas para leituras)
- ❌ **Sharding Complexo**: Esforço manual se precisarmos de escalabilidade horizontal
- ❌ **Não Cloud-Native**: Não projetado para sistemas distribuídos como DynamoDB

### Consequências Neutras

- ⚪ **Serviço Gerenciado**: Usaremos AWS RDS (menos controle, mais conveniência)
- ⚪ **Estratégia de Backup**: Backups automatizados RDS (retenção 7 dias)
- ⚪ **Monitoramento**: Usar CloudWatch + pg_stat_statements

---

## Riscos e Mitigação

Quais riscos esta decisão introduz? Como os mitigamos?

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| [Risco 1] | [Baixo/Médio/Alto] | [Baixo/Médio/Alto] | [Estratégia] |

**Exemplo**:

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Banco de dados se torna gargalo em escala | Médio | Alto | Usar read replicas (até 5), implementar caching (Redis), monitorar performance de queries |
| Ponto único de falha | Baixo | Alto | Usar deployment Multi-AZ (failover automático), backups regulares, plano DR testado |
| Features específicas do PostgreSQL criam lock-in | Baixo | Médio | Usar abstração de ORM (TypeORM), evitar features específicas do PostgreSQL a menos que crítico |
| Exaustão do pool de conexões | Médio | Alto | Usar connection pooling (PgBouncer), definir max connections = 100, monitorar conexões |
| Armazenamento cresce além do orçamento | Baixo | Médio | Implementar política de retenção de dados (arquivar pedidos antigos após 2 anos), monitorar crescimento |

---

## Plano de Implementação

Como esta decisão será implementada?

**Passos**:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Timeline**: [Duração]

**Responsável**: [Pessoa/Time]

---

**Exemplo**:

**Passos**:
1. **Semana 1**: Provisionar instância RDS PostgreSQL (db.t3.large, Multi-AZ)
2. **Semana 1**: Configurar security groups, VPC, parameter groups
3. **Semana 2**: Configurar connection pooling (PgBouncer)
4. **Semana 2**: Implementar migrations de banco de dados (usando TypeORM ou Knex)
5. **Semana 3**: Configurar monitoramento (CloudWatch, pg_stat_statements)
6. **Semana 3**: Configurar backups (automatizados diários, retenção 7 dias)
7. **Semana 4**: Teste de carga (simular tráfego de produção)
8. **Semana 4**: Documentar runbook (backup/restore, failover, scaling)

**Timeline**: 4 semanas

**Responsável**: Time DevOps + Lead Backend

---

## Validação

Como saberemos se esta decisão estava correta?

**Critérios de Sucesso**:
- [Critério 1]
- [Critério 2]

**Métricas para Rastrear**:
- [Métrica 1]
- [Métrica 2]

**Data de Revisão**: [Quando revisitar esta decisão]

---

**Exemplo**:

**Critérios de Sucesso**:
- Aplicação atende requisitos de performance (p95 < 200ms)
- Zero incidentes de perda ou corrupção de dados
- Custos de banco de dados permanecem abaixo de $500/mês
- Time pode desenvolver features sem banco de dados os bloqueando

**Métricas para Rastrear**:
- Performance de query (latência p95, p99)
- Uso de CPU do banco de dados (< 70% média)
- Contagem de conexões (< 80 de máx 100)
- Crescimento de armazenamento (< 10GB/mês)
- Taxa de sucesso de backup (100%)
- Lag de replicação (< 1 segundo)

**Data de Revisão**: 2026-05-01 (6 meses após lançamento)

**Gatilho para Reavaliação**:
- CPU do banco de dados consistentemente > 80%
- Custos de armazenamento excedem $1K/mês
- Performance de query degrada (p95 > 500ms)
- Necessidade de suporte multi-região

---

## Decisões Relacionadas

- [ADR-001: Escolha de Provedor Cloud (AWS)](./ADR-001_aws.md)
- [ADR-004: Usar Redis para Caching](./ADR-004_redis.md)
- [ADR-010: Estratégia de Sharding de Banco de Dados](./ADR-010_sharding.md) (futuro)

---

## Notas

Contexto adicional, links ou informações:

- [Link para resultados de benchmark]
- [Link para planilha de análise de custo]
- [Link para notas de discussão do time]

**Exemplo**:
- Resultados de benchmark: [Link para GitHub gist]
- Análise de custo: [Link para Google Sheets]
- Thread de discussão: [Link para Slack]
- Melhores práticas PostgreSQL: [Link para wiki interna]

---

## Histórico de Mudanças

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2025-10-01 | Tech Lead | Decisão inicial |
| 1.1 | 2025-10-15 | DevOps | Adicionado plano de implementação |
| 1.2 | 2025-11-01 | Tech Lead | Adicionada mitigação de riscos |

---

## Aprovação

| Papel | Nome | Aprovado | Data |
|-------|------|----------|------|
| Tech Lead | [Nome] | ✅ | 2025-10-01 |
| CTO | [Nome] | ✅ | 2025-10-01 |
| Lead DevOps | [Nome] | ✅ | 2025-10-02 |

---

**Status**: Aceito
**Parent**: [09. Decisões Arquiteturais](../../arc42/09_decisions.md)
**Tipo**: ADR (Registro de Decisão Arquitetural)

---

## Templates Relacionados

### Pré-requisitos
- **proposal.md** (TPL-WORKFLOW-001) - Contexto do problema da proposta
- **arc42/02_constraints.md** (TPL-ARC42-02) - Restrições técnicas e organizacionais

### Parte De
- **design.md** (TPL-WORKFLOW-002) - Documento de design de arquitetura (se complexidade HIGH)
- **arc42/09_decisions.md** (TPL-ARC42-09) - Capítulo 9 do Arc42: Decisões Arquiteturais

### Influencia
- **arc42/04_solution-strategy.md** (TPL-ARC42-04) - Estratégia de solução
- **arc42/05_building-blocks.md** (TPL-ARC42-05) - Design de componentes
- **c4/system-context.md** (TPL-C4-001) - Escolhas de sistemas externos
- **arc42/10_quality.md** (TPL-ARC42-10) - Requisitos de qualidade

### Veja Também
- **specs/ (princípios arquiteturais)** - Princípios arquiteturais
- **bdd/scenario.md** (TPL-BDD-001) - Implicações comportamentais

---

## Integração com Workflow

**Fase**: 2 (Arquitetura) ou 3 (Especificação)

**Skill Principal**:
- **architect** - Cria ADRs como parte do design.md (Fase 2, complexidade HIGH)
- **analyst** - Documenta ADRs durante especificação (Fase 3)

**Localização de Output**:
- `changes/[change-id]/design.md` (embutido no design, Fase 2)
- `specs/09_decisions/adr/ADR-*.md` (arquivos separados, Fase 3)

**Quando Criar**:
- Seleção de tecnologia (banco de dados, framework, provedor cloud)
- Escolha de padrão arquitetural (microsserviços, monolito, hexagonal)
- Abordagem de integração (REST, gRPC, mensageria)
- Decisões de modelo de dados (SQL vs NoSQL, design de schema)
- Conceitos transversais (logging, monitoramento, segurança)

**Próximos Passos**:
1. **Discutir com time** - Validar decisão antes de aceitar
2. **Atualizar spec.md** - Referenciar ADR no Capítulo 9 do Arc42
3. **Implementar** - Developer segue ADR durante implementação
4. **Revisar** - Revisitar ADR se contexto mudar

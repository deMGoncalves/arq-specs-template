# Design: [Change ID]

**ID do Template**: TPL-WORKFLOW-002
**Versão**: 2.0.0
**Categoria**: Workflow
**Usado Por**: architect (Fase 2: Architecture)
**Última Atualização**: 2025-11-17

---

**ID da Mudança**: [change-id]
**Criado**: YYYY-MM-DD
**Autor**: [Arquiteto/Time]
**Status**: 🟡 Rascunho | 🟢 Aprovado | 🔴 Rejeitado | 🔵 Em Revisão

---

## Visão Geral

[Visão geral da solução arquitetural em 2-3 sentenças. Descreva a essência da solução técnica.]

**Declaração do Problema**: [Qual problema arquitetural estamos resolvendo?]

**Resumo da Solução**: [Como estamos resolvendo em alto nível?]

---

## Decisões Arquiteturais (ADRs)

### ADR-001: [Título da Decisão Principal]

**Status**: 🟡 Proposto | 🟢 Aceito | 🔴 Rejeitado | 🔵 Supersedido

**Contexto**:
[Por que precisamos tomar esta decisão? Que fatores técnicos, de negócio, ou de time influenciam esta decisão?]

**Decisão**:
[O que decidimos fazer? Seja específico e claro.]

**Consequências**:

**Positivas**:
- Benefício 1
- Benefício 2
- Benefício 3

**Negativas**:
- Trade-off 1
- Trade-off 2
- Trade-off 3

**Riscos**:
- Risco 1 → Mitigação: [Como mitigar]
- Risco 2 → Mitigação: [Como mitigar]

**Alternativas Consideradas**:

1. **[Alternativa 1]**
   - Prós: [Lista]
   - Contras: [Lista]
   - Por que rejeitada: [Razão clara]

2. **[Alternativa 2]**
   - Prós: [Lista]
   - Contras: [Lista]
   - Por que rejeitada: [Razão clara]

**Referências**:
- [Link para documentação externa, se aplicável]
- [Discussão do time, RFC, etc]

---

### ADR-002: [Segunda Decisão]

[Repita estrutura acima para cada decisão significativa]

---

### ADR-003: [Terceira Decisão]

[...]

---

## Diagramas do Modelo C4

### C1: Contexto do Sistema

**Propósito**: Mostrar o sistema em seu ambiente, com sistemas externos e atores.

```
[Diagrama PlantUML, Mermaid, ou descrição textual estruturada]

Exemplo (Mermaid):
graph LR
    A[Usuario] -->|HTTPS| B[Nossa Aplicacao]
    B -->|API| C[Payment Gateway]
    B -->|SQL| D[Database]
    B -->|Events| E[Message Queue]
```

**Sistemas**:
- **Nossa Aplicação**: [Descrição e responsabilidades]
- **Sistema Externo 1**: [Descrição e integração]
- **Sistema Externo 2**: [Descrição e integração]

**Atores**:
- **Usuário**: [Tipo de usuário e interações]
- **Admin**: [Tipo de usuário e interações]

---

### C2: Diagrama de Container

**Propósito**: Mostrar os containers (aplicações, bancos de dados, serviços) e como se comunicam.

```
[Diagrama ou descrição textual]

Exemplo:
graph LR
    A[Web App] -->|HTTPS| B[API Gateway]
    B -->|gRPC| C[User Service]
    B -->|gRPC| D[Payment Service]
    C -->|SQL| E[User DB]
    D -->|SQL| F[Payment DB]
    C -->|Pub| G[Event Bus]
    D -->|Sub| G
```

**Containers**:
- **[Container 1]**:
  - Tecnologia: [ex: Node.js, Go, Python]
  - Responsabilidade: [O que este container faz]
  - Comunicação: [Como se comunica com outros]

- **[Container 2]**:
  - Tecnologia: [...]
  - Responsabilidade: [...]
  - Comunicação: [...]

**Armazenamentos de Dados**:
- **[Database 1]**: [PostgreSQL, MongoDB, etc] - [Propósito]
- **[Cache]**: [Redis, Memcached] - [Propósito]
- **[Message Queue]**: [RabbitMQ, Kafka] - [Propósito]

**Protocolos**:
- Container 1 → Container 2: [REST/gRPC/GraphQL/Events]
- Container 2 → Database: [Protocolo SQL/NoSQL]

---

### C3: Diagrama de Componente

**Propósito**: Mostrar os componentes dentro dos containers afetados.

```
[Diagrama focado nos componentes DDD]

Exemplo (para container User Service):
User Service
├── API Layer
│   └── UserController (REST endpoints)
├── Application Layer
│   ├── criar-usuario (use case)
│   ├── atualizar-usuario (use case)
│   └── autenticar-usuario (use case)
├── Domain Layer
│   ├── Usuario (entity/aggregate)
│   ├── Email (value object)
│   ├── CPF (value object)
│   └── UsuarioCriado (domain event)
└── Infrastructure Layer
    ├── persistir-usuario (repository)
    └── UserEventPublisher
```

**Componentes por Bounded Context**:

#### [Bounded Context 1]
- **Aggregates**: [Lista com descrição breve]
- **Entities**: [Lista]
- **Value Objects**: [Lista]
- **Domain Events**: [Lista - tempo passado]
- **Use Cases**: [Lista - formato: verbo-substantivo]
- **Repositories**: [Lista - formato: persistir-entidade]

#### [Bounded Context 2]
[...]

---

### C4: Diagrama de Código (Opcional)

**Propósito**: Apenas para lógica muito complexa que requer visualização de código.

[Raramente necessário. Use apenas se realmente agregar valor.]

---

## Design Tático DDD

### Bounded Contexts Afetados

#### Contexto: [Nome do Bounded Context]

**Propósito**: [Por que este bounded context existe? Qual subdomínio representa?]

**Linguagem Ubíqua**:
- **[Termo 1]**: [Definição no contexto do negócio]
- **[Termo 2]**: [Definição no contexto do negócio]
- **[Termo 3]**: [Definição no contexto do negócio]

**Aggregates**:

##### [Nome do Aggregate]
- **Entidade Raiz**: [Nome da entidade raiz]
- **ID**: [Tipo do ID - UUID, auto-increment, composite]
- **Invariantes**:
  - [Regra de negócio 1 que SEMPRE deve ser verdade]
  - [Regra de negócio 2 que SEMPRE deve ser verdade]
- **Entidades Filhas**: [Lista, se aplicável]
- **Value Objects**: [Lista]

**Entities**:
- **[Entity 1]**: [Descrição breve e atributos principais]
- **[Entity 2]**: [Descrição breve e atributos principais]

**Value Objects**:
- **[ValueObject 1]**: [Propósito e validações]
- **[ValueObject 2]**: [Propósito e validações]

**Domain Events** (tempo passado):
- **[Event]Criado**: Quando? Payload: [campos]
- **[Event]Atualizado**: Quando? Payload: [campos]
- **[Event]Removido**: Quando? Payload: [campos]

**Repositories**:
- **persistir-[entity]**: [Responsabilidade]
- **buscar-[entity]**: [Responsabilidade]
- **atualizar-[entity]**: [Responsabilidade]

**Use Cases**:
- **criar-[entity]**: [Fluxo: input → criar entity → persistir → publish events → output]
- **atualizar-[entity]**: [Fluxo]
- **[action]-[entity]**: [Fluxo]

---

### Estrutura de Diretórios (DDD Co-Located)

```
src/
└── [bounded-context]/          # ex: user-management
    └── [container]/            # ex: api
        └── [component]/        # ex: usuario
            ├── index.ts                 # Aggregate root (exports públicos)
            ├── criar-usuario.ts         # Factory/Use case
            ├── persistir-usuario.ts     # Repository
            ├── atualizar-usuario.ts     # Use case
            ├── autenticar-usuario.ts    # Use case
            ├── Usuario.ts               # Entity (aggregate root)
            ├── Email.ts                 # Value object
            ├── CPF.ts                   # Value object
            ├── Nome.ts                  # Value object
            ├── UsuarioCriado.ts         # Domain event
            ├── UsuarioAtualizado.ts     # Domain event
            └── usuario.spec.ts          # Testes (integration-first)
```

**Convenções de Nomenclatura**:
- ✅ Ações semânticas: `criar`, `persistir`, `autenticar` (linguagem de negócio)
- ❌ Sufixos técnicos: `UserFactory`, `UserRepository`, `UserService`
- ✅ PascalCase para entities e value objects: `Usuario`, `Email`
- ✅ kebab-case para arquivos: `criar-usuario.ts`
- ✅ Tempo passado para eventos: `UsuarioCriado`, NÃO `UsuarioCriando` ou `UserCreated`

---

## Considerações Técnicas

### Mudanças no Schema do Banco de Dados

#### Novas Tabelas
```sql
-- [NomeDaTabela]
CREATE TABLE [table_name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  [column1] VARCHAR(255) NOT NULL,
  [column2] INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_[table]_[column] ON [table_name]([column]);
```

#### Tabelas Modificadas
```sql
-- [NomeDaTabela]
ALTER TABLE [existing_table] ADD COLUMN [new_column] VARCHAR(100);
ALTER TABLE [existing_table] ADD CONSTRAINT [...];
```

#### Tabelas Removidas
```sql
-- [NomeDaTabela] - BREAKING CHANGE
-- Estratégia de migração: [Como migrar dados existentes]
DROP TABLE [table_name];
```

**Estratégia de Migração**:
1. [Passo 1 - ex: Adicionar novas colunas]
2. [Passo 2 - ex: Migrar dados]
3. [Passo 3 - ex: Remover colunas antigas]

**Plano de Rollback**:
[Como reverter as migrations se necessário]

---

### Mudanças na API

#### Novos Endpoints
```
POST /api/v1/[resource]
GET /api/v1/[resource]/:id
PUT /api/v1/[resource]/:id
DELETE /api/v1/[resource]/:id
```

**Formatos Request/Response**:
```typescript
// POST /api/v1/usuarios
interface CreateUserRequest {
  email: string;      // formato: email
  nome: string;       // min: 3, max: 100
  cpf: string;        // formato: 000.000.000-00
}

interface CreateUserResponse {
  id: string;         // UUID
  email: string;
  nome: string;
  status: string;     // "active" | "pending"
  createdAt: string;  // ISO 8601
}
```

#### Endpoints Modificados
```
MODIFICADO: PUT /api/v1/[resource]/:id
- Campo adicionado: [field_name]
- Campo removido: [field_name] - BREAKING
- Tipo alterado: [field_name] de X para Y - BREAKING
```

#### Endpoints Deprecados
```
DEPRECADO: GET /api/v1/old-endpoint
- Substituto: GET /api/v2/new-endpoint
- Timeline de deprecação: Remover em 6 meses (YYYY-MM-DD)
- Guia de migração: [Link ou descrição]
```

**Estratégia de Versionamento**:
- [ ] Sem breaking changes → Mesma versão
- [ ] Breaking changes → Nova versão (v2, v3)
- [ ] Período de deprecação: [X meses]

**Respostas de Erro**:
```typescript
interface ErrorResponse {
  error: {
    code: string;       // ex: "VALIDATION_ERROR"
    message: string;    // Mensagem amigável ao usuário
    details?: object;   // Contexto adicional
  }
}
```

---

### Implicações de Performance

**Carga Esperada**:
- Requisições por segundo: [estimativa]
- Consultas ao banco por requisição: [estimativa]
- Meta de tempo de resposta médio: [ex: <200ms p95]

**Gargalos Identificados**:
1. [Potencial gargalo 1]
   - Impacto: [Descrição]
   - Mitigação: [Como resolver]

**Estratégia de Cache**:
- **O que cachear**: [Dados que raramente mudam]
- **Invalidação de cache**: [Quando invalidar]
- **TTL**: [Tempo de vida]
- **Tecnologia**: [Redis, in-memory, CDN]

**Otimização de Banco de Dados**:
- **Índices**: [Listar índices críticos]
- **Otimização de queries**: [Estratégias específicas]
- **Connection pooling**: [Configuração]

**Monitoramento**:
- Métricas para rastrear: [Tempo de resposta, taxa de erro, throughput]
- Alertas: [Quando alertar - thresholds]

---

### Considerações de Segurança

**Autenticação**:
- Método: [JWT, OAuth2, baseado em Session]
- Tempo de vida do token: [ex: 1 hora]
- Estratégia de refresh: [Como fazer refresh dos tokens]

**Autorização**:
- Modelo: [RBAC, ABAC, custom]
- Roles: [Lista de roles e permissões]
- Enforcement: [Onde e como checar permissões]

**Criptografia de Dados**:
- **Em trânsito**: TLS 1.3, apenas HTTPS
- **Em repouso**: [Criptografia de banco de dados, criptografia em nível de campo]
- **Campos PII**: [Listar campos sensíveis e tratamento]

**Validação de Entrada**:
- Todos os inputs validados na camada de API
- Sanitização: [Prevenção de XSS, prevenção de SQL injection]
- Rate limiting: [Requisições por minuto por IP/usuário]

**Gestão de Secrets**:
- Armazenamento: [Vault, AWS Secrets Manager, env vars]
- Rotação: [Frequência de rotação]
- Controle de acesso: [Quem pode acessar]

**Compliance**:
- [ ] Considerações LGPD/GDPR endereçadas
- [ ] Tratamento de dados PII documentado
- [ ] Política de retenção de dados definida
- [ ] Audit logging implementado

---

### Estratégia de Testabilidade

**Pirâmide de Testes**:
```
        /\
       /E2E\         10% - Testes E2E (fluxos críticos de usuário)
      /------\
     /Integration\   70% - Testes de integração (ambiente realista)
    /--------------\
   /  Unit Tests    \ 20% - Testes unitários (apenas lógica de negócio)
```

**Testes Integration-First**:
- Usar banco de dados real (ou testcontainers)
- Usar fila de mensagens real (ou testcontainers)
- Mockar apenas serviços externos fora do nosso controle

**Ambiente de Testes**:
- **Banco de Dados**: [PostgreSQL via Docker, testcontainers]
- **Fila de Mensagens**: [RabbitMQ em modo in-memory]
- **APIs Externas**: [Mockadas via WireMock, nock]

**Estratégia de Dados de Teste**:
- **Setup**: [Como criar dados de teste]
- **Cleanup**: [Como limpar após testes]
- **Fixtures**: [Usar fixtures ou factories?]

**Mapeamento de Cenários BDD**:
Cada cenário BDD do spec.md terá um teste de integração correspondente:
```typescript
// spec.md: Scenario "Criar usuario com dados validos"
// Test: usuario.spec.ts
describe('criar-usuario', () => {
  it('should create user with valid data (BDD)', async () => {
    // GIVEN: dados válidos de usuário
    // WHEN: criar-usuario é chamado
    // THEN: usuário é criado + evento publicado + retorna ID do usuário
  });
});
```

**Meta de Cobertura**: >= 80% (ou meta de specs/10_quality)

---

## Dependências

### Dependências Internas
- **Módulos**: [Lista de módulos internos dos quais esta mudança depende]
- **APIs**: [APIs internas que esta mudança consome]
- **Bibliotecas Compartilhadas**: [Bibliotecas compartilhadas]

### Dependências Externas
- **Novas Dependências**:
  - `[package-name]@[version]` - [Propósito] - [Licença]
  - `[package-name]@[version]` - [Propósito] - [Licença]
- **Dependências Atualizadas**:
  - `[package-name]` de [old-version] para [new-version] - [Razão]

**Checklist de Aprovação de Dependências**:
- [ ] Sem vulnerabilidades de segurança conhecidas
- [ ] Licença compatível com o projeto
- [ ] Impacto no tamanho do bundle aceitável
- [ ] Ativamente mantida (última atualização < 6 meses)
- [ ] Possui cobertura de testes suficiente
- [ ] Time possui expertise ou plano de treinamento

---

## Considerações de Deployment

**Estratégia de Deployment**:
- [ ] Rolling update (zero downtime)
- [ ] Deployment blue-green
- [ ] Canary release
- [ ] Feature flags

**Plano de Rollback**:
1. [Passo 1 se deployment falhar]
2. [Passo 2 para fazer rollback]
3. [Passo 3 para restaurar dados se necessário]

**Migrations de Banco de Dados**:
- [ ] Forward-compatible (pode rodar antes do código)
- [ ] Backward-compatible (pode fazer rollback após código)
- [ ] Scripts de migração de dados testados
- [ ] Scripts de rollback preparados

**Variáveis de Ambiente**:
```bash
# Novas env vars necessárias
NEW_FEATURE_ENABLED=true
EXTERNAL_API_KEY=xxx
DATABASE_POOL_SIZE=20
```

**Mudanças de Infraestrutura**:
- [ ] Novos serviços para deployar
- [ ] Novos bancos de dados para provisionar
- [ ] Novas filas para criar
- [ ] Mudanças de escalabilidade necessárias

---

## Questões em Aberto

[Liste questões ainda não resolvidas que precisam de decisão ou discussão]

- [ ] **Q1**: [Questão sobre tecnologia X]
  - **Responsável**: [Quem vai responder]
  - **Prazo**: [Quando precisamos decidir]
  - **Impacto**: [O que bloqueia se não resolver]

- [ ] **Q2**: [Questão sobre integração Y]
  - **Responsável**: [...]
  - **Prazo**: [...]
  - **Impacto**: [...]

---

## Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| [Descrição do risco 1] | HIGH/MED/LOW | HIGH/MED/LOW | [Como mitigar] |
| [Descrição do risco 2] | HIGH/MED/LOW | HIGH/MED/LOW | [Como mitigar] |
| [Descrição do risco 3] | HIGH/MED/LOW | HIGH/MED/LOW | [Como mitigar] |

---

## Estimativa de Timeline

**Esforço Total Estimado**: [X story points / Y horas / Z dias]

**Detalhamento**:
- Fase 3 (Specification): [X horas]
- Fase 3.5 (Task Decomposition): [X horas]
- Fase 4 (Implementation): [X horas]
  - Setup: [X horas]
  - Features principais: [X horas]
  - Tratamento de erros: [X horas]
  - Testes: [X horas]
- Fase 5 (Review): [X horas]
- Fase 6 (Documentation): [X horas]

**Premissas**:
- [Lista de premissas que afetam estimativa]

---

## Validação de Conformidade com a Constituição

### Princípios Fundamentais ✓
- [x] Specification-Driven: Design antes de spec detalhado
- [x] Arc42 + C4 + BDD + ADR: Design usa C4 + ADR
- [x] Library-First: Design permite modularidade e reuso
- [x] Test-First: Estratégia de testabilidade definida
- [x] Integration-First Testing: Estratégia de testes realistas
- [x] DDD Tactical: DDD Co-Located aplicado corretamente

### Restrições Arquiteturais ✓
- [x] Organização de Código: DDD Tactical Co-Located seguido
- [x] Padrões de Qualidade: Meta de cobertura definida
- [x] Requisitos de Performance: Implicações de performance avaliadas
- [x] Requisitos de Segurança: Considerações de segurança endereçadas

### Notas de Conformidade
[Qualquer desvio das regras de qualidade (.claude/rules/) ou specs/ deve ser justificado aqui com ADR]

---

## Próximos Passos

1. **Revisar Design**
   - [ ] Auto-revisão completa (Architect)
   - [ ] Revisão Tech Lead
   - [ ] Walkthrough com time (se necessário)

2. **Gate 1: Aprovação do Design**
   - [ ] Submeter ao Gatekeeper para validação
   - [ ] Endereçar feedback se rejeitado
   - [ ] Obter aprovação para prosseguir

3. **Prosseguir para Specification**
   - [ ] Analyst cria spec.md detalhado baseado neste design
   - [ ] spec.md usa Arc42 + cenários BDD
   - [ ] spec.md referencia este design.md

4. **Task Decomposition**
   - [ ] Orchestrator decompõe spec em tasks.md
   - [ ] Tasks seguem este design
   - [ ] Tasks mapeiam para componentes DDD deste design

---

## Referências

### Documentação Externa
- [Link para documentação de tecnologia X]
- [Link para RFC ou proposta relacionada]
- [Link para ADRs anteriores relacionados]

### Documentação Interna
- `proposal.md` - Proposta original
- `specs/ (princípios arquiteturais, regras de qualidade)` - Princípios do projeto
- `specs/[related-capability]/` - Specs relacionadas

---

**Aprovação**:
- [ ] Architect: [Nome] - [Data]
- [ ] Tech Lead: [Nome] - [Data]
- [ ] Gatekeeper: [Status Gate 1] - [Data]

---

**Change Log**:
- YYYY-MM-DD: Design inicial criado
- YYYY-MM-DD: Atualizado após feedback do Tech Lead
- YYYY-MM-DD: Aprovado pelo Gatekeeper (Gate 1)

---

## Templates Relacionados

### Pré-requisitos
- **proposal.md** (TPL-WORKFLOW-001) - Proposta aprovada com avaliação de complexidade HIGH

### Segue Este Template
- **Templates Arc42** (TPL-ARC42-*) - Analyst cria spec.md detalhado usando capítulos Arc42 (Fase 3)
- **Templates C4** (TPL-C4-*) - Diagramas de contexto do sistema, container, componente
- **adr/decision.md** (TPL-ADR-001) - Documentar cada ADR separadamente

### Veja Também
- **specs/ (princípios arquiteturais, regras de qualidade)** - Padrões táticos DDD e princípios
- **tasks.md** (TPL-WORKFLOW-003) - Decomposição de tarefas após especificação

---

## Integração com Workflow

**Fase**: 2 (Architecture)

**Skill Principal**: architect

**Gatilho**: proposal.md aprovado com **Complexidade = HIGH**

**Localização de Output**: `changes/[change-id]/design.md`

**Pré-requisitos**:
- proposal.md aprovado
- Complexidade HIGH identificada (múltiplos bounded contexts, >15 arquivos, decisões arquiteturais necessárias)

**Próximos Passos**:
1. **Gatekeeper valida** qualidade do design (Gate 1: Architecture)
2. **Analyst cria spec.md** - Especificação detalhada usando Arc42 + BDD (Fase 3)
3. **Orchestrator cria tasks.md** - Decomposição de tarefas (Fase 3.5)
4. **Developer implementa** - Implementação tarefa por tarefa (Fase 4)

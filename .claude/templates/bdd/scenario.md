# Cenário: [Nome do Cenário]

**ID do Template**: TPL-BDD-001
**Versão**: 2.0.0
**Categoria**: BDD
**Usado Por**: analyst (Fase 3: Especificação - Cenários de runtime)
**Última Atualização**: 2025-11-17

---

**ID**: SCN-[XXX]
**Feature**: [Nome da Feature]
**Prioridade**: [Crítica | Alta | Média | Baixa]
**Status**: [Rascunho | Implementado | Testado | Depreciado]
**Última Atualização**: [YYYY-MM-DD]

---

## Descrição da Feature

**Feature**: [Nome da feature]

**Como** [papel]
**Eu quero** [capacidade]
**Para que** [benefício]

**Exemplo**:

**Feature**: Login de Usuário

**Como** um cliente registrado
**Eu quero** fazer login na minha conta
**Para que** eu possa acessar meu histórico de pedidos e preferências salvas

---

## Cenários

### Cenário 1: [Caminho Feliz]

```gherkin
Scenario: [Nome do cenário]
  Given [contexto inicial]
  And [contexto adicional]
  When [ação]
  Then [resultado esperado]
  And [resultado adicional]
```

**Exemplo**:

```gherkin
Scenario: Login bem-sucedido com credenciais válidas
  Given usuário existe com email "user@example.com"
  And senha é "SecurePass123"
  And conta não está bloqueada
  When usuário submete formulário de login
  Then usuário é autenticado
  And token JWT é emitido com expiração de 2 horas
  And usuário vê dashboard
  And evento de sucesso de login é registrado
```

---

### Cenário 2: [Caso de Erro 1]

```gherkin
Scenario: [Nome do cenário]
  Given [contexto inicial]
  When [ação]
  Then [erro esperado]
  And [efeitos colaterais]
```

**Exemplo**:

```gherkin
Scenario: Login falha com senha inválida
  Given usuário existe com email "user@example.com"
  And senha está incorreta
  When usuário submete formulário de login
  Then login falha com erro "Credenciais inválidas"
  And usuário permanece não autenticado
  And tentativa de login falha é registrada
  And contador de tentativas falhas é incrementado
```

---

### Cenário 3: [Caso de Erro 2]

**Exemplo**:

```gherkin
Scenario: Login é bloqueado quando conta está bloqueada
  Given usuário existe com email "user@example.com"
  And conta tem 5 tentativas de login falhas
  And conta está bloqueada até 10:00 AM
  And horário atual é 9:30 AM
  When usuário submete formulário de login com senha válida
  Then login falha com erro "Conta temporariamente bloqueada"
  And usuário vê mensagem "Tente novamente após 10:00 AM"
  And evento de bloqueio é registrado
```

---

### Cenário 4: [Caso Extremo 1]

**Exemplo**:

```gherkin
Scenario: Login desbloqueia conta após período de bloqueio expirar
  Given conta de usuário foi bloqueada às 9:00 AM (1 hora de bloqueio)
  And horário atual é 10:05 AM (bloqueio expirado)
  And usuário fornece credenciais válidas
  When usuário submete formulário de login
  Then conta é desbloqueada automaticamente
  And usuário é autenticado com sucesso
  And contador de tentativas falhas é resetado para 0
```

---

### Cenário 5: [Caso Extremo 2]

**Exemplo**:

```gherkin
Scenario: Login com email em case diferente
  Given usuário existe com email "user@example.com"
  And usuário fornece email "USER@EXAMPLE.COM" (maiúsculo)
  And senha está correta
  When usuário submete formulário de login
  Then email é normalizado para minúsculo
  And usuário é autenticado com sucesso
```

---

## Scenario Outline (Data-Driven)

Para cenários com múltiplas combinações de inputs:

```gherkin
Scenario Outline: [Nome do cenário]
  Given [contexto com <placeholder>]
  When [ação com <placeholder>]
  Then [resultado com <placeholder>]

Examples:
  | placeholder1 | placeholder2 | expected_result |
  | value1       | value2       | result1         |
  | value3       | value4       | result2         |
```

**Exemplo**:

```gherkin
Scenario Outline: Erros de validação de login
  Given usuário fornece email "<email>"
  And usuário fornece senha "<password>"
  When usuário submete formulário de login
  Then validação falha com erro "<error>"

Examples:
  | email              | password      | error                                  |
  | email-invalido     | SecurePass123 | Formato de email inválido              |
  | user@example.com   | curta         | Senha deve ter no mínimo 8 caracteres |
  | user@example.com   |               | Senha é obrigatória                    |
  |                    | SecurePass123 | Email é obrigatório                    |
```

---

## Background (Configuração Comum)

Se múltiplos cenários compartilham a mesma configuração:

```gherkin
Background:
  Given [configuração comum]
  And [configuração comum]

Scenario: [Cenário 1]
  When [ação]
  Then [resultado]

Scenario: [Cenário 2]
  When [ação diferente]
  Then [resultado diferente]
```

**Exemplo**:

```gherkin
Background:
  Given banco de dados está populado com usuários de teste
  And serviço de autenticação está rodando
  And rate limiter está configurado para 100 req/hora

Scenario: Login bem-sucedido
  When usuário submete credenciais válidas
  Then usuário é autenticado

Scenario: Login falho
  When usuário submete credenciais inválidas
  Then login falha
```

---

## Contrato da API (Detalhes Técnicos)

### Endpoint

**Método**: [Método HTTP]
**Caminho**: [Caminho da URL]
**Autenticação**: [Obrigatória/Opcional]

**Exemplo**:

**Método**: POST
**Caminho**: `/api/v1/auth/login`
**Autenticação**: Não obrigatória (endpoint público)

---

### Request

```json
{
  "field1": "tipo (restrições)",
  "field2": "tipo (restrições)"
}
```

**Exemplo**:

```json
{
  "email": "string (formato: email, máximo 255 caracteres)",
  "password": "string (mínimo 8 caracteres)"
}
```

**Regras de Validação**:
- `email`: Obrigatório, formato de email válido, máx 255 caracteres
- `password`: Obrigatório, mín 8 caracteres

---

### Response (Sucesso)

**Status**: [Código de status HTTP]

```json
{
  "field1": "tipo",
  "field2": "tipo"
}
```

**Exemplo**:

**Status**: 200 OK

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 7200,
  "tokenType": "Bearer"
}
```

---

### Response (Erros)

| Status | Código do Erro | Descrição | Exemplo |
|--------|----------------|-----------|---------|
| [Código] | [ERR_CODE] | [Descrição] | [Mensagem de exemplo] |

**Exemplo**:

| Status | Código do Erro | Descrição | Exemplo |
|--------|----------------|-----------|---------|
| 400 | VALIDATION_ERROR | Input inválido | "Formato de email é inválido" |
| 401 | INVALID_CREDENTIALS | Email/senha incorretos | "Credenciais inválidas" |
| 403 | ACCOUNT_LOCKED | Muitas tentativas falhas | "Conta temporariamente bloqueada" |
| 429 | RATE_LIMIT_EXCEEDED | Muitas requisições | "Tente novamente em 30 minutos" |
| 500 | INTERNAL_ERROR | Erro do servidor | "Ocorreu um erro. Tente novamente mais tarde" |

**Formato de Resposta de Erro** (RFC 7807):

```json
{
  "type": "https://api.example.com/errors/invalid-credentials",
  "title": "Credenciais Inválidas",
  "status": 401,
  "detail": "O email ou senha fornecidos estão incorretos",
  "instance": "/api/v1/auth/login"
}
```

---

## Efeitos Colaterais

Documente todos os efeitos colaterais desta feature:

### Mudanças de Estado

| O Que | Antes | Depois |
|-------|-------|--------|
| [Entidade] | [Estado] | [Estado] |

**Exemplo**:

| O Que | Antes | Depois |
|-------|-------|--------|
| Sessão do usuário | Não logado | Logado (JWT emitido) |
| Contador de login falho | N | N+1 (se falhou) OU 0 (se sucesso) |
| Status da conta | Ativo | Bloqueado (após 5 tentativas falhas) |

---

### Eventos Publicados

| Nome do Evento | Quando | Payload |
|----------------|--------|---------|
| [event.name] | [Condição] | [Dados] |

**Exemplo**:

| Nome do Evento | Quando | Payload |
|----------------|--------|---------|
| `user.login.success` | Login bem-sucedido | `{userId, email, timestamp, ip}` |
| `user.login.failed` | Login falho | `{email, reason, timestamp, ip}` |
| `user.account.locked` | Conta bloqueada | `{userId, email, unlockAt, timestamp}` |

---

### Chamadas Externas

| Serviço | Chamada | Quando |
|---------|---------|--------|
| [Serviço] | [Ação] | [Condição] |

**Exemplo**:

| Serviço | Chamada | Quando |
|---------|---------|--------|
| Auth0 | Verificar credenciais | Toda tentativa de login |
| Redis | Incrementar contador | Login falho |
| Redis | Definir bloqueio | 5 tentativas falhas |
| SendGrid | Enviar email de alerta | Conta bloqueada |
| Analytics | Rastrear evento | Login bem-sucedido |

---

### Mudanças no Banco de Dados

| Tabela | Operação | Quando |
|--------|----------|--------|
| [tabela] | [INSERT/UPDATE/DELETE] | [Condição] |

**Exemplo**:

| Tabela | Operação | Quando |
|--------|----------|--------|
| login_attempts | INSERT | Toda tentativa de login |
| users | UPDATE (last_login_at) | Login bem-sucedido |
| audit_log | INSERT | Toda tentativa de login |

---

## Performance

### Performance Esperada

- **Tempo de Resposta**: p95 < [X]ms, p99 < [Y]ms
- **Throughput**: [X] req/s
- **Usuários Concorrentes**: [X]

**Exemplo**:
- **Tempo de Resposta**: p95 < 200ms, p99 < 500ms
- **Throughput**: 100 logins/s
- **Usuários Concorrentes**: 1.000

---

### Teste de Carga

**Cenário**: [Descrição]
**Esperado**: [Comportamento sob carga]

**Exemplo**:

**Cenário**: 1.000 logins concorrentes (sustentados por 5 minutos)
**Esperado**:
- Todas as requisições completam com sucesso
- p95 < 300ms (degradado mas aceitável)
- Nenhum erro de rate limit para usuários válidos
- Conexões com banco de dados permanecem < 100

---

## Segurança

### Autenticação

- [Medida de segurança 1]
- [Medida de segurança 2]

**Exemplo**:
- Senha transmitida apenas via HTTPS (TLS 1.3)
- Senha nunca registrada ou armazenada em texto plano
- Tentativas falhas registradas com IP para detecção de abuso

---

### Autorização

- [Regra de autorização 1]
- [Regra de autorização 2]

**Exemplo**:
- N/A (endpoint público, mas cria sessão autenticada)

---

### Vulnerabilidades Mitigadas

| Vulnerabilidade | Mitigação |
|-----------------|-----------|
| [Categoria OWASP] | [Como mitigado] |

**Exemplo**:

| Vulnerabilidade | Mitigação |
|-----------------|-----------|
| Força bruta | Bloqueio de conta após 5 tentativas |
| Credential stuffing | Rate limiting (100 req/hora por IP) |
| Ataques de timing | Comparação de senha em tempo constante |
| Session fixation | Gerar novo ID de sessão no login |

---

## Testes

### Testes Unitários

Casos de teste principais:
- [ ] Credenciais válidas → sucesso
- [ ] Senha inválida → erro
- [ ] Formato de email inválido → erro de validação
- [ ] Campos faltando → erro de validação
- [ ] Conta bloqueada → erro
- [ ] Bloqueio expira → sucesso

---

### Testes de Integração

- [ ] Fluxo de login end-to-end (API → Auth0 → Banco → Resposta)
- [ ] Bloqueio de conta após 5 tentativas falhas
- [ ] Bloqueio expira após 1 hora
- [ ] Contador falho reseta após login bem-sucedido

---

### Testes E2E (UI)

- [ ] Usuário pode fazer login via formulário web
- [ ] Mensagens de erro são exibidas corretamente
- [ ] Conta bloqueada mostra mensagem apropriada
- [ ] Dashboard carrega após login bem-sucedido

---

## Critérios de Aceitação

Este cenário é aceito quando:

- [ ] Todos os cenários passam (caminho feliz + casos de erro + casos extremos)
- [ ] Testes unitários: 100% de cobertura para lógica de login
- [ ] Testes de integração passam
- [ ] Testes E2E passam (caminhos críticos)
- [ ] Performance: p95 < 200ms
- [ ] Segurança: Nenhuma vulnerabilidade encontrada
- [ ] Documentação: Docs da API atualizados
- [ ] Code review: Aprovado por 2 desenvolvedores

---

## Documentos Relacionados

- [Componente: Serviço de Auth](../../05_building-blocks/components/CMP-001_auth-service.md)
- [ADR: Usar Auth0](../09_decisions/adr/ADR-003_use-auth0.md)
- [Qualidade: Requisitos de Segurança](../../10_quality.md)

---

## Histórico de Mudanças

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 2.0.0 | 2025-11-17 | Padronização de Templates | Adicionado Template ID, Templates Relacionados, Integração com Workflow |
| 1.0.0 | [Data] | [Nome] | Versão inicial |

---

## Templates Relacionados

### Pré-requisitos
- **arc42/01_introduction.md** (TPL-ARC42-01) - Contexto da feature e requisitos
- **arc42/03_context.md** (TPL-ARC42-03) - Limites do sistema e sistemas externos

### Parte De
- **arc42/06_runtime.md** (TPL-ARC42-06) - Capítulo 6 do Arc42: Visão de Runtime

### Segue Este Template
- **tasks.md** (TPL-WORKFLOW-003) - Orchestrator decompõe cenários em tarefas
- **component.md** (TPL-C4-003) - Componentes implementam comportamento do cenário

### Veja Também
- **c4/component.md** (TPL-C4-003) - Componentes envolvidos no cenário
- **adr/decision.md** (TPL-ADR-001) - Decisões arquiteturais afetando comportamento
- **arc42/10_quality.md** (TPL-ARC42-10) - Cenários de qualidade

---

## Integração com Workflow

**Fase**: 3 (Especificação)

**Skill Principal**: analyst

**Parte De**: Documento spec.md completo (Capítulo 6 do Arc42: Visão de Runtime)

**Localização de Output**: `specs/06_runtime/scenarios/SCN-*.md`

**Pré-requisitos**:
- Contexto do sistema definido (C4 Nível 1)
- Componentes identificados (C4 Nível 3)
- Requisitos de negócio compreendidos (Capítulo 1 do Arc42)

**Propósito**:
- Definir comportamento do sistema a partir da perspectiva do usuário
- Fornecer critérios de aceitação testáveis
- Mapear features para tarefas de implementação
- Habilitar BDD (Behavior-Driven Development)

**Próximos Passos**:
1. **Orchestrator decompõe** - Cenários → Tarefas atômicas (Fase 3.5)
2. **Developer implementa** - TDD baseado em cenários (Fase 4)
3. **Tester valida** - Cenários se tornam casos de teste (Fase 5)

---

**Parent**: [06. Visão de Runtime](../../arc42/06_runtime.md)
**Tipo**: Cenário BDD (Especificação de Comportamento)

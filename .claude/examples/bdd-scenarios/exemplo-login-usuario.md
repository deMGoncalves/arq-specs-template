# Exemplo: Cenário BDD - Login de Usuário

**ID**: SCN-EXEMPLO-001
**Feature**: Autenticação de Usuário
**Prioridade**: Crítica
**Status**: ✅ Exemplo Completo
**Ator**: Cliente (ATR-001)
**Container**: API de Autenticação (CNT-001)

---

## Feature

```gherkin
Feature: Login de Usuário
  Como um cliente registrado
  Eu quero fazer login na plataforma
  Para acessar minha conta e fazer compras

  Background:
    Given o sistema está operacional
    And o banco de dados está acessível
    And o serviço Auth0 está disponível
```

---

## Cenário 1: Login bem-sucedido com credenciais válidas

```gherkin
Scenario: Login bem-sucedido com credenciais válidas
  Given usuário existe com email "maria@exemplo.com"
  And senha é "Senha123!Segura"
  And usuário não está bloqueado
  And usuário verificou email
  When usuário submete formulário de login
  Then usuário é autenticado com sucesso
  And token JWT é emitido com expiração de 2 horas
  And refresh token é emitido com expiração de 7 dias
  And usuário é redirecionado para dashboard
  And evento "user.logged_in" é publicado
  And última data de login é atualizada
```

### Detalhes de Implementação

**Given (Precondições)**:
- Usuário existe na tabela `users` com `email = "maria@exemplo.com"`
- `password_hash` corresponde a bcrypt de "Senha123!Segura"
- `is_blocked = false`
- `email_verified = true`
- `failed_login_attempts = 0`

**When (Ação)**:
```json
POST /api/v1/auth/login
{
  "email": "maria@exemplo.com",
  "password": "Senha123!Segura"
}
```

**Then (Resultados Esperados)**:
1. HTTP Status: `200 OK`
2. Response body:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 7200,
  "user": {
    "id": "usr_123",
    "email": "maria@exemplo.com",
    "name": "Maria Silva"
  }
}
```
3. JWT Claims:
```json
{
  "sub": "usr_123",
  "email": "maria@exemplo.com",
  "role": "customer",
  "iat": 1699999999,
  "exp": 1700007199
}
```
4. Banco de dados atualizado:
   - `users.last_login_at` = timestamp atual
   - `users.failed_login_attempts` = 0
5. Evento publicado:
```json
{
  "event": "user.logged_in",
  "user_id": "usr_123",
  "timestamp": "2025-11-17T10:30:00Z",
  "ip_address": "192.168.1.1"
}
```

---

## Cenário 2: Login falha com senha incorreta

```gherkin
Scenario: Login falha com senha incorreta
  Given usuário existe com email "maria@exemplo.com"
  And senha correta é "Senha123!Segura"
  And usuário tem 2 tentativas falhas anteriores
  When usuário submete formulário com senha "SenhaErrada123"
  Then login falha com erro de autenticação
  And usuário vê mensagem "Credenciais inválidas"
  And contagem de tentativas falhas aumenta para 3
  And evento "user.login_failed" é publicado
  And IP do usuário é registrado
  And usuário NÃO é bloqueado (limite é 5 tentativas)
```

### Detalhes de Implementação

**Given**:
- `users.email = "maria@exemplo.com"`
- `users.password_hash = bcrypt("Senha123!Segura")`
- `users.failed_login_attempts = 2`

**When**:
```json
POST /api/v1/auth/login
{
  "email": "maria@exemplo.com",
  "password": "SenhaErrada123"
}
```

**Then**:
1. HTTP Status: `401 Unauthorized`
2. Response body:
```json
{
  "error": {
    "code": "AUTH_001",
    "message": "Credenciais inválidas",
    "remaining_attempts": 2
  }
}
```
3. Banco de dados:
   - `users.failed_login_attempts` = 3
   - `users.last_failed_login_at` = timestamp atual
   - `users.last_failed_login_ip` = "192.168.1.1"
4. Log de segurança:
```json
{
  "level": "warn",
  "event": "user.login_failed",
  "user_email": "maria@exemplo.com",
  "ip": "192.168.1.1",
  "timestamp": "2025-11-17T10:30:00Z",
  "attempts": 3
}
```

---

## Cenário 3: Conta bloqueada após 5 tentativas falhas

```gherkin
Scenario: Conta bloqueada após 5 tentativas falhas
  Given usuário existe com email "maria@exemplo.com"
  And usuário tem 4 tentativas falhas
  When usuário submete formulário com senha incorreta
  Then login falha
  And conta do usuário é bloqueada
  And usuário vê mensagem "Conta bloqueada por segurança. Redefina sua senha."
  And email de "conta bloqueada" é enviado
  And evento "user.account_locked" é publicado
  And time de segurança é notificado
```

### Detalhes de Implementação

**Given**:
- `users.failed_login_attempts = 4`

**When**:
```json
POST /api/v1/auth/login
{
  "email": "maria@exemplo.com",
  "password": "SenhaErrada"
}
```

**Then**:
1. HTTP Status: `403 Forbidden`
2. Response:
```json
{
  "error": {
    "code": "AUTH_003",
    "message": "Conta bloqueada por segurança. Redefina sua senha.",
    "locked_at": "2025-11-17T10:30:00Z"
  }
}
```
3. Banco de dados:
   - `users.is_blocked = true`
   - `users.blocked_at` = timestamp atual
   - `users.block_reason` = "max_failed_attempts"
   - `users.failed_login_attempts` = 5
4. Email enviado via SendGrid:
   - Template: `account-locked`
   - Para: maria@exemplo.com
   - Assunto: "Sua conta foi bloqueada"
5. Notificação Slack para time de segurança:
```
⚠️ Conta bloqueada: maria@exemplo.com (5 tentativas falhas)
IP: 192.168.1.1
```

---

## Cenário 4: Login com email não verificado

```gherkin
Scenario: Login bloqueado quando email não verificado
  Given usuário existe com email "joao@exemplo.com"
  And senha está correta
  And email do usuário não foi verificado
  When usuário submete formulário de login
  Then login é negado
  And usuário vê mensagem "Verifique seu email antes de fazer login"
  And link para reenviar email de verificação é mostrado
```

### Detalhes de Implementação

**Given**:
- `users.email_verified = false`
- `users.verification_token = "abc123def456"`

**When**:
```json
POST /api/v1/auth/login
{
  "email": "joao@exemplo.com",
  "password": "SenhaCorreta123!"
}
```

**Then**:
1. HTTP Status: `403 Forbidden`
2. Response:
```json
{
  "error": {
    "code": "AUTH_004",
    "message": "Verifique seu email antes de fazer login",
    "resend_verification_url": "/api/v1/auth/resend-verification"
  }
}
```

---

## Cenário 5: Token expirado - Refresh automático

```gherkin
Scenario: Token expirado é renovado automaticamente
  Given usuário está autenticado
  And access token expirou há 5 minutos
  And refresh token ainda é válido (expira em 7 dias)
  When cliente envia requisição com refresh token
  Then novo access token é emitido
  And novo refresh token é emitido (refresh token rotation)
  And refresh token antigo é revogado
  And usuário continua autenticado sem interrupção
```

### Detalhes de Implementação

**Given**:
- JWT access token expirado (exp < now)
- Refresh token válido na tabela `refresh_tokens`

**When**:
```json
POST /api/v1/auth/refresh
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Then**:
1. HTTP Status: `200 OK`
2. Response:
```json
{
  "access_token": "eyJhbGci... (novo)",
  "refresh_token": "eyJhbGci... (novo)",
  "token_type": "Bearer",
  "expires_in": 7200
}
```
3. Banco de dados:
   - `refresh_tokens.revoked = true` (token antigo)
   - Novo registro em `refresh_tokens` (token novo)

---

## Mapeamento de Testes

### Testes Unitários
- `src/auth/domain/validar-credenciais.spec.ts`
  - ✅ Testa validação de senha correta
  - ✅ Testa validação de senha incorreta
  - ✅ Testa incremento de tentativas falhas
  - ✅ Testa bloqueio após 5 tentativas

### Testes de Integração
- `src/auth/api/login.integration.spec.ts`
  - ✅ Testa endpoint POST /auth/login (sucesso)
  - ✅ Testa endpoint POST /auth/login (senha errada)
  - ✅ Testa endpoint POST /auth/login (conta bloqueada)
  - ✅ Testa endpoint POST /auth/refresh (token rotation)

### Testes E2E
- `tests/e2e/auth/login.e2e.spec.ts`
  - ✅ Fluxo completo: login → dashboard → logout
  - ✅ Fluxo de erro: 5 tentativas falhas → bloqueio → email

---

## Requisitos Não-Funcionais

### Performance
- ⏱️ Tempo de resposta: < 200ms (p95)
- 🔄 Throughput: 1000 req/s

### Segurança
- 🔐 Senha: bcrypt (cost factor 12)
- 🔑 JWT: HS256, secret rotacionado mensalmente
- 🕐 Rate limiting: 10 tentativas/IP/minuto

### Observabilidade
- 📊 Métricas: login_success, login_failed, account_locked
- 📝 Logs: Todas as tentativas (sucesso e falha)
- 🔔 Alertas: >100 falhas/minuto, pico de bloqueios

---

**Exemplo criado para**: Demonstrar cenários BDD completos e detalhados
**Use como referência para**: Criar cenários em `specs/06_runtime/scenarios/`

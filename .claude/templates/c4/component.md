# Componente: [Nome do Componente]

**ID do Template**: TPL-C4-003
**ID**: CMP-[XXX]
**Versão**: 2.0.0
**Categoria**: Modelo C4
**Nível**: C4 Nível 3 (Componente)
**Tipo**: Componente (C4 Nível 3)
**Container**: [CNT-XXX] [Nome do Container]
**Status**: [Rascunho | Ativo | Depreciado]
**Usado Por**: analyst (Fase 3: Especificação), architect (Fase 2: Design)
**Última Atualização**: 2025-11-17

---

## Visão Geral

**Nome**: [Nome do Componente]

**Propósito**: [Descrição de uma linha do que este componente faz]

**Exemplo**:
> Serviço de Autenticação que lida com login de usuário, geração de tokens e verificações de autorização.

---

## Responsabilidades

Liste as principais responsabilidades deste componente:

1. **[Responsabilidade 1]**: [Descrição]
2. **[Responsabilidade 2]**: [Descrição]
3. **[Responsabilidade 3]**: [Descrição]

**Exemplo**:
1. **Login de Usuário**: Validar credenciais contra Auth0
2. **Geração de Token**: Emitir tokens JWT com claims apropriados
3. **Autorização**: Verificar permissões de usuário para recursos protegidos
4. **Atualização de Token**: Lidar com fluxo de refresh de token

---

## Tecnologia

**Linguagem**: [Linguagem de programação]

**Framework/Biblioteca**: [Framework]

**Padrão**: [Padrão de design]

**Exemplo**:
- **Linguagem**: TypeScript
- **Framework**: Nenhum (Node.js puro)
- **Padrão**: Em Camadas (Controller → Service → Repository)

---

## Interface Pública

### Definição de Classe/Módulo

```typescript
// Exemplo de interface
interface AuthService {
  login(email: string, password: string): Promise<Result<AuthToken>>;
  refresh(refreshToken: string): Promise<Result<AuthToken>>;
  verify(token: string): Promise<Result<UserClaims>>;
  logout(token: string): Promise<Result<void>>;
}
```

---

### Métodos/Funções

#### Método 1: [Nome]

**Assinatura**: `[assinatura do método]`

**Propósito**: [O que faz]

**Parâmetros**:
- `[param1]`: [Tipo] - [Descrição]
- `[param2]`: [Tipo] - [Descrição]

**Retorna**: `[Tipo de retorno]` - [Descrição]

**Erros**:
- `[Error1]`: [Quando ocorre]
- `[Error2]`: [Quando ocorre]

**Exemplo**:

#### Método: login

**Assinatura**: `login(email: string, password: string): Promise<Result<AuthToken>>`

**Propósito**: Autenticar usuário e gerar token JWT

**Parâmetros**:
- `email`: string - Endereço de email do usuário
- `password`: string - Senha do usuário (texto plano, será verificada contra hash)

**Retorna**: `Promise<Result<AuthToken>>` - Sucesso com token OU erro

**Erros**:
- `INVALID_CREDENTIALS`: Email ou senha incorretos
- `ACCOUNT_LOCKED`: Muitas tentativas de login falhas
- `ACCOUNT_DISABLED`: Conta de usuário está desabilitada

**Comportamento**:
```gherkin
Given usuário existe com email "user@example.com"
And senha é "SecurePass123"
When login(email, password) é chamado
Then verificar credenciais com Auth0
And gerar token JWT (2h TTL)
And retornar sucesso com token
```

---

#### Método 2: refresh

**Assinatura**: `refresh(refreshToken: string): Promise<Result<AuthToken>>`

**Propósito**: Trocar refresh token por novo access token

**Parâmetros**:
- `refreshToken`: string - Refresh token válido

**Retorna**: Novo access token OU erro

**Erros**:
- `INVALID_REFRESH_TOKEN`: Token é inválido ou expirou
- `REFRESH_TOKEN_REVOKED`: Token foi revogado

---

#### Método 3: verify

**Assinatura**: `verify(token: string): Promise<Result<UserClaims>>`

**Propósito**: Verificar token JWT e extrair claims

**Parâmetros**:
- `token`: string - Token JWT para verificar

**Retorna**: Claims de usuário (userId, email, roles) OU erro

**Erros**:
- `TOKEN_EXPIRED`: Token expirou
- `INVALID_TOKEN`: Assinatura do token é inválida

---

#### Método 4: logout

**Assinatura**: `logout(token: string): Promise<Result<void>>`

**Propósito**: Revogar token (adicionar à blacklist)

**Parâmetros**:
- `token`: string - Token a revogar

**Retorna**: Sucesso OU erro

**Erros**:
- `TOKEN_ALREADY_REVOKED`: Token já foi revogado

---

## Dependências

### Dependências Internas

Liste outros componentes dos quais este componente depende:

| Component ID | Nome | Uso |
|--------------|------|-----|
| [CMP-XXX] | [Nome] | [Como é usado] |

**Exemplo**:

| Component ID | Nome | Uso |
|--------------|------|-----|
| CMP-010 | Repositório de Usuários | Buscar dados de usuário do banco de dados |
| CMP-011 | Serviço de Cache | Cachear tokens para reduzir chamadas ao Auth0 |

---

### Dependências Externas

Liste serviços/bibliotecas externos dos quais este componente depende:

| Dependência | Propósito | Versão |
|-------------|-----------|--------|
| [Nome] | [Propósito] | [Versão] |

**Exemplo**:

| Dependência | Propósito | Versão |
|-------------|-----------|--------|
| SDK Auth0 | Integração OAuth 2.0 | ^3.0.0 |
| jsonwebtoken | Geração/verificação de JWT | ^9.0.0 |
| bcrypt | Hashing de senha | ^5.1.0 |

---

## Estruturas de Dados

### Tipos de Entrada/Saída

```typescript
// Exemplos de tipos
interface LoginRequest {
  email: string;      // Formato: email, máx 255 caracteres
  password: string;   // Mín 8 caracteres
}

interface AuthToken {
  accessToken: string;   // Token JWT
  refreshToken: string;  // Refresh token
  expiresIn: number;     // Segundos até expiração (7200)
  tokenType: "Bearer";
}

interface UserClaims {
  userId: string;     // UUID
  email: string;
  roles: string[];    // ["customer"] | ["admin"]
  iat: number;        // Issued at (timestamp Unix)
  exp: number;        // Expires at (timestamp Unix)
}
```

---

## Tratamento de Erros

### Códigos de Erro

| Código | Descrição | Status HTTP | Recuperação |
|--------|-----------|-------------|-------------|
| [CODE] | [Descrição] | [Status] | [Estratégia] |

**Exemplo**:

| Código | Descrição | Status HTTP | Recuperação |
|--------|-----------|-------------|-------------|
| AUTH_001 | Credenciais inválidas | 401 | Tentar novamente com credenciais corretas |
| AUTH_002 | Token expirado | 401 | Fazer refresh do token |
| AUTH_003 | Conta bloqueada | 403 | Contatar suporte OU aguardar 1 hora |
| AUTH_004 | Refresh token inválido | 401 | Reautenticar |

---

## Lógica de Negócio

### Regras de Negócio

1. **[Regra 1]**: [Descrição]
2. **[Regra 2]**: [Descrição]

**Exemplo**:
1. **Requisitos de Senha**: Mín 8 caracteres, 1 maiúscula, 1 número, 1 caractere especial
2. **Expiração de Token**: Access tokens expiram após 2 horas
3. **Bloqueio de Conta**: Bloquear conta após 5 tentativas de login falhas em 15 minutos
4. **Refresh Token**: Válido por 30 dias, pode ser usado apenas uma vez

---

### Regras de Validação

```typescript
// Exemplo de schema de validação
const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).required()
});
```

---

## Gerenciamento de Estado

**Stateless**: [Sim/Não]

**Se stateful**:
- Armazenamento de estado: [Onde o estado é armazenado]
- Ciclo de vida do estado: [Quando criado/destruído]

**Exemplo**:
**Stateless**: Sim (tokens JWT são auto-contidos)

**Exceção**: Blacklist de tokens (tokens revogados) armazenada no Redis com TTL

---

## Performance

### Estratégia de Caching

| Dados | Cache | TTL | Invalidação |
|-------|-------|-----|-------------|
| [O Que] | [Onde] | [Duração] | [Quando] |

**Exemplo**:

| Dados | Cache | TTL | Invalidação |
|-------|-------|-----|-------------|
| Claims de usuário | Redis | 2 horas | Expiração do token |
| Chaves públicas Auth0 | Memória | 24 horas | Manual ou TTL |
| Tokens revogados | Redis | TTL do token | Automática (TTL) |

---

### Metas de Performance

- **Tempo de Resposta**: p95 < [X]ms
- **Throughput**: [X] operações/s

**Exemplo**:
- **Tempo de Resposta**: p95 < 50ms (verify), p95 < 200ms (login)
- **Throughput**: 1.000 verificações/s, 100 logins/s

---

## Segurança

### Autenticação

Como este componente autentica:
- [Método]

### Autorização

Como este componente autoriza:
- [Método]

### Proteção de Dados

- **Dados Sensíveis**: [Quais dados são sensíveis]
- **Proteção**: [Como são protegidos]

**Exemplo**:

### Autenticação
- Chama API Auth0 com credenciais de cliente
- Verifica assinatura JWT usando chaves públicas Auth0

### Autorização
- Verifica claims JWT para roles requeridos
- Exemplo: Endpoints admin requerem `roles: ["admin"]`

### Proteção de Dados
- **Dados Sensíveis**: Senhas, tokens, emails de usuário
- **Proteção**:
  - Senhas: Nunca armazenadas (Auth0 gerencia)
  - Tokens: Cookies HTTP-only (web), armazenamento seguro (mobile)
  - Emails: Criptografados em repouso (nível de banco de dados)
  - Logs: Redação de campos sensíveis

---

## Testes

### Testes Unitários

**Cobertura**: [X]%

**Casos de Teste-Chave**:
1. [Caso de teste 1]
2. [Caso de teste 2]

**Exemplo**:

**Cobertura**: 90%

**Casos de Teste-Chave**:
1. Login com credenciais válidas → sucesso com token
2. Login com senha inválida → erro AUTH_001
3. Login com conta bloqueada → erro AUTH_003
4. Verificar token válido → sucesso com claims
5. Verificar token expirado → erro AUTH_002
6. Refresh com token válido → sucesso com novo token
7. Refresh com token revogado → erro AUTH_004

---

### Testes de Integração

**Escopo**: [O que é testado]

**Exemplo**:
- Fluxo de login end-to-end (incluindo chamada Auth0)
- Verificação de token contra chaves públicas Auth0
- Fluxo de refresh de token
- Bloqueio de conta após 5 tentativas falhas

---

### Estratégia de Mocking

**Dependências Mockadas**:
- [Dependência 1]: [Estratégia de mock]

**Exemplo**:
- **API Auth0**: Mockada com test doubles (retorna respostas pré-definidas)
- **Redis**: Usar instância Redis em memória para testes
- **Banco de Dados**: Usar banco de dados de teste com fixtures

---

## Configuração

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|--------|-----------|
| [PARAM] | [Tipo] | [Sim/Não] | [Valor] | [Descrição] |

**Exemplo**:

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|--------|-----------|
| AUTH0_DOMAIN | string | Sim | - | Domínio do tenant Auth0 |
| AUTH0_CLIENT_ID | string | Sim | - | ID do cliente da aplicação Auth0 |
| AUTH0_CLIENT_SECRET | string | Sim | - | Secret da aplicação Auth0 |
| JWT_SECRET | string | Sim | - | Secret para assinatura JWT (se auto-assinado) |
| TOKEN_EXPIRATION | number | Não | 7200 | Expiração do access token (segundos) |
| REFRESH_TOKEN_EXPIRATION | number | Não | 2592000 | Expiração do refresh token (30 dias) |
| MAX_LOGIN_ATTEMPTS | number | Não | 5 | Máx tentativas de login falhas antes de bloquear |
| LOCKOUT_DURATION | number | Não | 3600 | Duração do bloqueio de conta (segundos) |

---

## Observabilidade

### Logs

**Eventos-Chave para Logar**:
- [Evento 1]: [Nível de log]
- [Evento 2]: [Nível de log]

**Exemplo**:
- Login de usuário bem-sucedido: INFO `{"event": "login_success", "userId": "USR-123"}`
- Login de usuário falhou: WARN `{"event": "login_failed", "email": "user@example.com", "reason": "invalid_password"}`
- Conta bloqueada: ERROR `{"event": "account_locked", "email": "user@example.com"}`
- Token verificado: DEBUG `{"event": "token_verified", "userId": "USR-123"}`

---

### Métricas

**Métricas-Chave**:
- [Métrica 1]: [Descrição]
- [Métrica 2]: [Descrição]

**Exemplo**:
- `auth.login.success`: Counter (logins bem-sucedidos)
- `auth.login.failed`: Counter (logins falhos por razão)
- `auth.token.verified`: Counter (verificações de token)
- `auth.token.expired`: Counter (tentativas de token expirado)
- `auth.lockout`: Counter (bloqueios de conta)
- `auth.login.duration`: Histogram (latência de login)

---

## Estrutura de Código

### Organização de Arquivos

```
src/components/auth/
├── index.ts                # Exports públicos
├── auth.service.ts         # Serviço principal
├── auth.controller.ts      # Controllers HTTP
├── auth.types.ts           # Tipos TypeScript
├── auth.validator.ts       # Validação de input
├── auth.errors.ts          # Erros customizados
├── auth.test.ts            # Testes unitários
└── auth.integration.test.ts # Testes de integração
```

---

### Classes/Funções-Chave

```typescript
// Exemplo de estrutura
export class AuthService {
  constructor(
    private auth0Client: Auth0Client,
    private userRepository: UserRepository,
    private cache: CacheService
  ) {}

  async login(email: string, password: string): Promise<Result<AuthToken>> {
    // Implementação
  }

  async refresh(refreshToken: string): Promise<Result<AuthToken>> {
    // Implementação
  }

  async verify(token: string): Promise<Result<UserClaims>> {
    // Implementação
  }

  async logout(token: string): Promise<Result<void>> {
    // Implementação
  }

  private async checkLockout(email: string): Promise<boolean> {
    // Verificar se conta está bloqueada
  }

  private async incrementFailedAttempts(email: string): Promise<void> {
    // Incrementar contador de tentativas falhas
  }
}
```

---

## Notas de Migração

### Mudanças Quebradas

- [Versão X → Y]: [Descrição]

**Exemplo**:
- **v1.0 → v2.0**: Mudou formato de token de opaco para JWT
  - Migração: Invalidar todos os tokens v1.0, usuários devem reautenticar

---

## Documentos Relacionados

- [Container: Servidor de API](../containers/CNT-001_api-server.md)
- [Cenário: Login de Usuário](../../arc42/06_runtime/scenarios/SCN-001_login.md)
- [ADR: Usar Auth0](../../arc42/09_decisions/adr/ADR-003_use-auth0.md)

---

## Templates Relacionados

### Pré-requisitos
- **container.md** (TPL-C4-002) - Container pai deve ser definido primeiro
- **system-context.md** (TPL-C4-001) - Contexto do sistema fornece estrutura geral

### Segue Este Template
- Nenhum (C4 Nível 3 é tipicamente o nível mais baixo, C4 Nível 4 é código opcional)

### Parte De
- **arc42/05_building-blocks.md** (TPL-ARC42-05) - Capítulo 5 do Arc42: Building Blocks (visão detalhada)

### Veja Também
- **bdd/scenario.md** (TPL-BDD-001) - Cenários BDD mapeiam comportamento do componente
- **arc42/06_runtime.md** (TPL-ARC42-06) - Visão de runtime mostra interações entre componentes
- **tasks.md** (TPL-WORKFLOW-003) - Tarefas de implementação decompostas dos componentes

---

## Integração com Workflow

**Fase**: 2 (Arquitetura) ou 3 (Especificação)

**Skill Principal**:
- **analyst** - Cria como parte do spec.md (Fase 3)
- **architect** - Cria como parte do design.md para complexidade HIGH (Fase 2)

**Localização de Output**:
- `changes/[change-id]/design.md` (se Fase 2)
- `specs/05_building-blocks/components/CMP-*.md` (se Fase 3)

**Pré-requisitos**:
- Diagrama de Container criado (C4 Nível 2)
- Responsabilidades de componentes identificadas

**Próximos Passos**:
- Definir cenários BDD para comportamento do componente
- Criar decomposição de tarefas (orchestrator → tasks.md)
- Implementar componentes (developer)

---

## Histórico de Mudanças

| Versão | Data | Autor | Mudanças |
|--------|------|--------|----------|
| 2.0.0 | 2025-11-17 | Padronização de Templates | Adicionado Template ID, Templates Relacionados, Integração com Workflow |
| 1.0.0 | [Data] | [Nome] | Versão inicial |

---

**Parent**: [CNT-XXX] [Nome do Container]
**Tipo**: Componente (C4 Nível 3)

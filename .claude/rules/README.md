# 64 Rules - Documentation-First Approach

**Version**: 3.1.0
**Last Updated**: 2025-12-16
**Status**: 🟢 Production-ready

---

## Visão Geral

Este diretório contém **64 regras** que garantem código limpo, manutenível, seguro e de alta qualidade em todos os projetos Documentation-First Approach.

### Filosofia

**Código de qualidade e seguro não é acidente - é resultado de princípios aplicados consistentemente.**

Estas regras são divididas em 5 categorias:

1. **Object Calisthenics** (9 regras: 001-009) - Código limpo no nível mais baixo
2. **SOLID Principles** (5 regras: 010-014) - Fundamentos de design orientado a objetos
3. **Package Principles** (6 regras: 015-020) - Coesão e acoplamento de módulos
4. **Code Quality Rules** (19 regras: 021-039) - DRY, KISS, YAGNI, segurança, testes
5. **Security Rules** (25 regras: 040-064) - OWASP ASVS, STRIDE, Top 10, CWE

---

## Por Que 64 Regras?

### Colapso do Espaço Probabilístico

Sem regras explícitas, a IA tem **infinitas** maneiras de implementar um requisito:

```
Sem regras:
  "Criar classe Usuario"
  ↓
  10^20 formas de implementar
  ↓
  Código inconsistente, baixa qualidade, inseguro

Com 64 regras:
  "Criar classe Usuario (seguindo regras 001-064)"
  ↓
  ~10 formas equivalentes
  ↓
  Código consistente, alta qualidade, seguro
```

### Prevenção de Débito Técnico + Vulnerabilidades

Cada regra previne um padrão problemático específico:

**Quality**:
- **Regra 001**: Previne complexidade ciclomática alta
- **Regra 010**: Previne classes "God Object"
- **Regra 021**: Previne duplicação de código
- **Regra 030**: Previne uso de funções inseguras

**Security**:
- **Regra 040**: Previne SQL Injection, XSS, Command Injection
- **Regra 050**: Previne 100% de SQL Injection
- **Regra 051**: Previne 95% de XSS attacks
- **Regra 060**: Previne credential stuffing e spoofing

---

## Estrutura das Regras

Cada regra segue o formato:

```markdown
# [ID] Nome da Regra

**Categoria**: Object Calisthenics | SOLID | Package Principles | Code Quality
**Severidade**: ❌ Bloqueante | ⚠️ Warning | ℹ️ Info

## Descrição

O que a regra faz e por quê.

## Problema

O problema que a regra resolve.

## Solução

Como aplicar a regra.

## Exemplo Incorreto ❌

Código que viola a regra.

## Exemplo Correto ✅

Código que segue a regra.

## Exceções

Casos válidos onde a regra pode ser relaxada.

## Validação Automática

Como verificar automaticamente (linter, testes).
```

---

## Categorias de Regras

### Categoria 1: Object Calisthenics (Regras 001-009)

**Propósito**: Código limpo no nível mais baixo (métodos, classes, linhas)

**Filosofia**: Restrições aumentam criatividade e forçam bom design.

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 001 | Nível Único de Indentação | Máximo 1 nível de indentação por método | ⚠️ Warning |
| 002 | Proibição de Cláusula Else | Evitar else, usar early return | ⚠️ Warning |
| 003 | Encapsulamento de Primitivos | Wrap primitivos em value objects | ⚠️ Warning |
| 004 | Coleções de Primeira Classe | Wrap coleções em classes dedicadas | ⚠️ Warning |
| 005 | Máximo Uma Chamada por Linha | Evitar method chaining longo | ℹ️ Info |
| 006 | Proibição de Nomes Abreviados | Usar nomes completos e descritivos | ⚠️ Warning |
| 007 | Limite Máximo de Linhas por Classe | Max 200 linhas por classe | ⚠️ Warning |
| 008 | Proibição de Getters/Setters | Tell, Don't Ask - comportamento sobre dados | ⚠️ Warning |
| 009 | Tell, Don't Ask | Objetos fazem coisas, não expõem estado | ⚠️ Warning |

**Benefícios**:
- ✅ Complexidade ciclomática baixa
- ✅ Classes pequenas e coesas
- ✅ Encapsulamento forte
- ✅ Código legível

**Arquivos**: `001_nivel-unico-indentacao.md` até `009_diga-nao-pergunte.md`

---

### Categoria 2: SOLID Principles (Regras 010-014)

**Propósito**: Fundamentos de design orientado a objetos

**Filosofia**: Princípios comprovados para sistemas extensíveis e manuteníveis.

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 010 | Single Responsibility Principle | Classe tem uma única razão para mudar | ❌ Bloqueante |
| 011 | Open/Closed Principle | Aberto para extensão, fechado para modificação | ⚠️ Warning |
| 012 | Liskov Substitution Principle | Subtipos substituem tipos base sem quebrar | ❌ Bloqueante |
| 013 | Interface Segregation Principle | Interfaces pequenas e específicas | ⚠️ Warning |
| 014 | Dependency Inversion Principle | Dependa de abstrações, não de implementações | ❌ Bloqueante |

**Benefícios**:
- ✅ Baixo acoplamento
- ✅ Alta coesão
- ✅ Testabilidade
- ✅ Extensibilidade sem quebrar código existente

**Arquivos**: `010_principio-responsabilidade-unica.md` até `014_principio-inversao-dependencia.md`

---

### Categoria 3: Package Principles (Regras 015-020)

**Propósito**: Coesão e acoplamento de módulos/pacotes

**Filosofia**: Organizar código em módulos coesos e com baixo acoplamento.

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 015 | Release-Reuse Equivalence | Se reutilizável, deve ser versionado | ⚠️ Warning |
| 016 | Common Closure Principle | Classes que mudam juntas ficam juntas | ⚠️ Warning |
| 017 | Common Reuse Principle | Classes usadas juntas ficam juntas | ⚠️ Warning |
| 018 | Acyclic Dependencies Principle | Sem dependências cíclicas entre pacotes | ❌ Bloqueante |
| 019 | Stable Dependencies Principle | Dependa de pacotes mais estáveis | ⚠️ Warning |
| 020 | Stable Abstractions Principle | Estabilidade = Abstração | ⚠️ Warning |

**Benefícios**:
- ✅ Módulos independentes
- ✅ Releases isoladas
- ✅ Sem dependências circulares
- ✅ Evolução controlada

**Arquivos**: `015_principio-equivalencia-lancamento-reuso.md` até `020_principio-abstracoes-estaveis.md`

---

### Categoria 4: Code Quality Rules (Regras 021-039)

**Propósito**: DRY, KISS, YAGNI, segurança, testes, manutenibilidade

**Filosofia**: Práticas modernas de engenharia de software.

#### Sub-categoria: Simplicidade e Clareza (021-023)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 021 | DRY (Don't Repeat Yourself) | Eliminar duplicação de lógica | ⚠️ Warning |
| 022 | KISS (Keep It Simple) | Priorizar simplicidade e clareza | ℹ️ Info |
| 023 | YAGNI (You Aren't Gonna Need It) | Não implementar funcionalidade especulativa | ⚠️ Warning |

#### Sub-categoria: Nomeação e Legibilidade (024-027)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 024 | Proibição de Constantes Mágicas | Usar constantes nomeadas | ⚠️ Warning |
| 025 | Proibição de Anti-pattern The Blob | Classes com múltiplas responsabilidades | ❌ Bloqueante |
| 026 | Qualidade de Comentários | Comentar o PORQUÊ, não o QUÊ | ℹ️ Info |
| 027 | Tratamento de Erros de Domínio | Erros explícitos e tipados | ⚠️ Warning |

#### Sub-categoria: Segurança e Robustez (028-030)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 028 | Tratamento de Exceções Assíncronas | Try-catch em async/await, Promise rejection handling | ❌ Bloqueante |
| 029 | Imutabilidade (Object.freeze) | Usar imutabilidade onde possível | ⚠️ Warning |
| 030 | Proibição de Funções Inseguras | eval(), Function(), innerHTML sem sanitização | ❌ Bloqueante |

#### Sub-categoria: Organização e Modularidade (031-033)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 031 | Restrição de Imports Relativos | Usar imports absolutos ou aliases | ⚠️ Warning |
| 032 | Cobertura de Teste Mínima | ≥80% de cobertura | ❌ Bloqueante |
| 033 | Limite de Parâmetros por Função | Max 3 parâmetros, usar objeto se mais | ⚠️ Warning |

#### Sub-categoria: Design de APIs (034-038)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 034 | Nomes de Classes/Métodos Consistentes | Seguir convenções de nomenclatura | ⚠️ Warning |
| 035 | Proibição de Nomes Enganosos | Nomes refletem comportamento real | ⚠️ Warning |
| 036 | Restrição de Funções com Efeitos Colaterais | Isolar side effects, preferir funções puras | ⚠️ Warning |
| 037 | Proibição de Argumentos Sinalizadores | Evitar boolean flags, usar métodos separados | ⚠️ Warning |
| 038 | Command-Query Separation | Comandos mudam estado, queries retornam dados | ⚠️ Warning |

#### Sub-categoria: Manutenção Contínua (039)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 039 | Regra do Escoteiro | Sempre deixar código melhor do que encontrou | ℹ️ Info |

**Arquivos**: `021_proibicao-duplicacao-logica.md` até `039_regra-escoteiro-refatoracao-continua.md`

---

### Categoria 5: Security Rules (Regras 040-064)

**Propósito**: Segurança em profundidade, prevenção de vulnerabilidades, conformidade com frameworks

**Filosofia**: Segurança não é feature opcional - é requisito fundamental desde o design.

#### Sub-categoria: OWASP ASVS (040-049)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 040 | Validação Input Whitelist | Todo input validado com whitelist positiva | 🔴 Crítica |
| 041 | Autenticação Segura | Password hashing com Argon2id/bcrypt | 🔴 Crítica |
| 042 | Gerenciamento Sessão | Cookies secure, httpOnly, sameSite, timeout | 🔴 Crítica |
| 043 | Controle Acesso RBAC | RBAC, ownership verification, deny-by-default | 🔴 Crítica |
| 044 | Sanitização Output | Context-aware escaping (HTML, JS, SQL, Shell) | 🔴 Crítica |
| 045 | Criptografia AES-256-GCM | Dados sensíveis criptografados, IVs únicos | 🔴 Crítica |
| 046 | Tratamento Erros Seguro | Mensagens genéricas, sem stack traces | 🟠 Alta |
| 047 | Proteção Dados Sensíveis | PII/PCI protegidos, GDPR/LGPD compliance | 🔴 Crítica |
| 048 | Comunicação Segura TLS | TLS 1.3/1.2, HSTS, certificate pinning | 🔴 Crítica |
| 049 | Configuração Headers | CSP, X-Frame-Options, nosniff, Referrer-Policy | 🟠 Alta |

#### Sub-categoria: OWASP Top 10 & CWE (050-059)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 050 | Prevenção SQL Injection | Prepared statements, ORM parameterizado | 🔴 Crítica |
| 051 | Prevenção XSS | Auto-escaping, CSP, sanitização HTML | 🔴 Crítica |
| 052 | Prevenção CSRF | Tokens anti-CSRF, SameSite cookies | 🟠 Alta |
| 053 | Prevenção Path Traversal | Validação paths, canonical paths, whitelist | 🔴 Crítica |
| 054 | Prevenção Command Injection | Evitar shell exec, validação whitelist estrita | 🔴 Crítica |
| 055 | Prevenção XXE | Desabilitar external entities, DTD processing | 🟠 Alta |
| 056 | Prevenção Desserialização | Preferir JSON, validar schema, whitelist classes | 🔴 Crítica |
| 057 | Prevenção SSRF | Whitelist domínios, bloquear IPs privados | 🟠 Alta |
| 058 | Gerenciamento Dependências | npm audit, Dependabot, atualização regular | 🟠 Alta |
| 059 | Logging Seguro | Sem PII/senhas nos logs, mascaramento automático | 🟠 Alta |

#### Sub-categoria: STRIDE (060-064)

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| 060 | Proteção Spoofing | MFA, rate limiting, assinaturas digitais | 🔴 Crítica |
| 061 | Proteção Tampering | HMAC, checksums, input validation, imutabilidade | 🔴 Crítica |
| 062 | Proteção Repudiation | Audit logging, timestamps, append-only logs | 🟡 Média |
| 063 | Proteção Information Disclosure | Erros genéricos, criptografia, sem metadata | 🟠 Alta |
| 064 | Proteção Denial of Service | Rate limiting, timeouts, WAF/CDN, regex DoS | 🟠 Alta |

**Benefícios**:
- ✅ Prevenção de 95% das vulnerabilidades OWASP Top 10
- ✅ Conformidade com OWASP ASVS Level 2
- ✅ Threat modeling sistemático (STRIDE)
- ✅ Análise de CWE Top 25 Most Dangerous Weaknesses
- ✅ Conformidade com NIST SSDF

**Frameworks Cobertos**:
- OWASP ASVS 4.0 (V1-V14)
- OWASP Top 10 (2021) A01-A10
- CWE Top 25
- STRIDE Threat Model
- NIST SSDF v1.1

**Arquivos**: `040_validacao-input-whitelist.md` até `064_protecao-denial-service.md`

**Skill Responsável**: `security-analyst` (agent 010) - Phases 2, 3, 5, 7

---

## Como Aplicar as Regras

### Durante Specification (Phase 3)

Analyst menciona regras relevantes no spec.md:

```markdown
## Qualidade de Código

Este componente DEVE seguir:
- Regra 010 (SRP): Uma responsabilidade por classe
- Regra 021 (DRY): Sem duplicação de lógica
- Regra 032 (Coverage): ≥80% de cobertura de testes

## Segurança

Este componente DEVE seguir:
- Regra 040 (Input Validation): Validação whitelist em todos endpoints
- Regra 050 (SQL Injection): Prepared statements obrigatórios
- Regra 060 (Spoofing): Rate limiting em autenticação
```

### Durante Implementation (Phase 4)

Developer consulta regras enquanto implementa:

```typescript
// ✅ Seguindo Regra 003 (Encapsulamento de Primitivos)
class Email {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate() {
    if (!this.value.includes('@')) {
      throw new EmailInvalidoError();
    }
  }
}

// ❌ Violando Regra 003
function criarUsuario(email: string) { // string primitivo
  if (!email.includes('@')) { // validação espalhada
    throw new Error('Email inválido');
  }
}
```

### Durante Review (Phase 5)

Reviewer valida conformidade com regras:

```markdown
## Code Review Checklist

- [ ] Regra 001: Indentação máxima de 1 nível
- [ ] Regra 010: Single Responsibility
- [ ] Regra 021: Sem duplicação de lógica
- [ ] Regra 032: Cobertura ≥80%
```

### Durante Validation (Phase 7)

Guardian bloqueia commit se regras críticas forem violadas:

```bash
🛡️ Guardian Pre-Commit Validation

❌ BLOCKED: Regra 010 violada (SRP)
   - Usuario.ts tem 3 responsabilidades (auth, profile, notifications)

❌ BLOCKED: Regra 032 violada (Coverage)
   - Cobertura: 65% (mínimo: 80%)

⚠️ WARNING: Regra 002 (No Else)
   - 5 ocorrências de else detectadas

✅ Regras 001-039: 36/39 OK
```

---

## Validação Automática

### Via Linters

```json
// .eslintrc.json
{
  "rules": {
    "max-depth": ["warn", 1],              // Regra 001
    "no-else-return": ["warn"],            // Regra 002
    "max-lines": ["warn", 200],            // Regra 007
    "max-params": ["warn", 3],             // Regra 033
    "no-eval": ["error"],                  // Regra 030
    "no-magic-numbers": ["warn"]           // Regra 024
  }
}
```

### Via Testes

```typescript
// Regra 032: Cobertura mínima
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Via Hooks

```bash
# .husky/pre-commit
#!/bin/bash

# Regra 032: Cobertura
npm run test:coverage

# Regra 018: Dependências cíclicas
npm run check:cycles

# Regras 001-039: Linter
npm run lint
```

---

## Exemplos Práticos

### Exemplo 1: Violação de Múltiplas Regras

**Código Problemático** ❌:

```typescript
// Viola Regra 007 (Max 200 linhas) - classe com 500 linhas
// Viola Regra 010 (SRP) - múltiplas responsabilidades
// Viola Regra 003 (Encapsulamento) - primitivos expostos
// Viola Regra 024 (Constantes mágicas) - números hardcoded
class Usuario {
  email: string;  // primitivo exposto
  senha: string;  // primitivo exposto

  validarEmail() {
    if (this.email.length > 255) {  // 255 = constante mágica
      return false;
    }
    // ... 50 linhas de validação
  }

  enviarEmail() {
    // ... 100 linhas de lógica SMTP
  }

  logarAtividade() {
    // ... 80 linhas de logging
  }

  processarPagamento() {
    // ... 150 linhas de lógica de pagamento
  }

  // ... mais 100 linhas
}
```

**Código Correto** ✅:

```typescript
// ✅ Regra 007: Classes pequenas (~50 linhas cada)
// ✅ Regra 010: Uma responsabilidade por classe
// ✅ Regra 003: Primitivos encapsulados
// ✅ Regra 024: Constantes nomeadas

// Value Objects (Regra 003)
class Email {
  private static readonly MAX_LENGTH = 255;  // Regra 024

  constructor(private readonly value: string) {
    this.validate();
  }

  private validate() {
    if (this.value.length > Email.MAX_LENGTH) {
      throw new EmailInvalidoError();
    }
    if (!this.value.includes('@')) {
      throw new EmailFormatoInvalidoError();
    }
  }
}

class Senha {
  constructor(private readonly hash: string) {}

  verificar(senhaPlana: string): boolean {
    return bcrypt.compareSync(senhaPlana, this.hash);
  }
}

// Aggregate Root (Regra 010: SRP)
class Usuario {
  constructor(
    readonly id: UsuarioId,
    readonly email: Email,
    private senha: Senha
  ) {}

  autenticar(senhaPlana: string): boolean {
    return this.senha.verificar(senhaPlana);
  }
}

// Serviços separados (Regra 010: SRP)
class EmailService {
  enviar(para: Email, assunto: string, corpo: string): void {
    // Lógica SMTP isolada
  }
}

class AtividadeLogger {
  logarAcao(usuario: Usuario, acao: string): void {
    // Lógica de logging isolada
  }
}

class PagamentoService {
  processar(usuario: Usuario, valor: number): void {
    // Lógica de pagamento isolada
  }
}
```

### Exemplo 2: Aplicação de SOLID

**Violação de Dependency Inversion (Regra 014)** ❌:

```typescript
class UsuarioService {
  private repo = new PostgresUsuarioRepository();  // acoplamento concreto

  criar(dados: any) {
    this.repo.save(dados);
  }
}
```

**Seguindo Dependency Inversion (Regra 014)** ✅:

```typescript
// Abstração
interface UsuarioRepository {
  salvar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: Email): Promise<Usuario | null>;
}

// Implementação
class PostgresUsuarioRepository implements UsuarioRepository {
  async salvar(usuario: Usuario): Promise<void> {
    // PostgreSQL específico
  }

  async buscarPorEmail(email: Email): Promise<Usuario | null> {
    // PostgreSQL específico
  }
}

// Serviço depende de abstração
class UsuarioService {
  constructor(private repo: UsuarioRepository) {}  // injeção de dependência

  async criar(email: Email, senha: Senha): Promise<Usuario> {
    const usuario = new Usuario(UsuarioId.gerar(), email, senha);
    await this.repo.salvar(usuario);
    return usuario;
  }
}

// Uso
const repo = new PostgresUsuarioRepository();
const service = new UsuarioService(repo);
```

---

## Severidade das Regras

### 🔴 Crítica (10 regras de segurança)
Violações **bloqueiam** commit/push - segurança:
- 040 (Input Validation Whitelist)
- 041 (Autenticação Segura)
- 042 (Gerenciamento de Sessão)
- 043 (Controle de Acesso RBAC)
- 044 (Sanitização de Output)
- 045 (Criptografia AES-256-GCM)
- 047 (Proteção de Dados Sensíveis)
- 048 (Comunicação Segura TLS)
- 050 (Prevenção SQL Injection)
- 051 (Prevenção XSS)

### ❌ Bloqueante (8 regras de qualidade)
Violações **bloqueiam** commit/push - qualidade:
- 010 (SRP)
- 012 (LSP)
- 014 (DIP)
- 018 (ADP - Acyclic Dependencies)
- 025 (The Blob)
- 028 (Async Exception Handling)
- 030 (Unsafe Functions)
- 032 (Test Coverage ≥80%)

### 🟠 Alta (10 regras de segurança)
Violações geram **avisos fortes** - segurança:
- 046 (Tratamento de Erros Seguro)
- 049 (Configuração de Headers)
- 052 (Prevenção CSRF)
- 053 (Prevenção Path Traversal)
- 054 (Prevenção Command Injection)
- 055 (Prevenção XXE)
- 056 (Prevenção Desserialização Insegura)
- 057 (Prevenção SSRF)
- 058 (Gerenciamento de Dependências)
- 059 (Logging Seguro)
- 063 (Proteção Information Disclosure)
- 064 (Proteção Denial of Service)

### ⚠️ Warning (24 regras de qualidade)
Violações geram **avisos** mas não bloqueiam - qualidade:
- Object Calisthenics (001-009)
- SOLID (011, 013)
- Package Principles (015-017, 019-020)
- Code Quality (021, 023-024, 027, 029, 031, 033-038)

### 🟡 Média (3 regras de segurança)
Violações geram **informações** - segurança:
- 060 (Proteção Spoofing)
- 061 (Proteção Tampering)
- 062 (Proteção Repudiation)

### ℹ️ Info (6 regras de qualidade)
Violações geram **informações** apenas - qualidade:
- 005 (One Dot Per Line)
- 022 (KISS)
- 026 (Comment Quality)
- 039 (Boy Scout Rule)

---

## Exceções e Override

### Quando Relaxar Regras

Algumas regras podem ser relaxadas em cenários específicos:

**Regra 001 (Indentação)**: Relaxar para algoritmos complexos (parsing, recursão)

```typescript
// Exceção justificada: Algoritmo de parsing necessita profundidade
function parseExpressaoMatematica(tokens: Token[]): AST {
  if (tokens[0].type === 'NUMBER') {
    if (tokens[1].type === 'OPERATOR') {
      if (tokens[2].type === 'NUMBER') {
        // Parsing legítimo, 3 níveis OK
      }
    }
  }
}
```

**Regra 007 (Max 200 linhas)**: Relaxar para classes de configuração ou mappers extensos

```typescript
// Exceção justificada: Mapeamento 1:1 entre tipos
class DTOMapper {
  toDomain(dto: UsuarioDTO): Usuario {
    // 300 linhas de mapeamento explícito
    // Preferível a usar bibliotecas mágicas
  }
}
```

### Como Documentar Override

```typescript
// eslint-disable-next-line max-depth -- Parsing algorithm requires depth
function parse(tokens: Token[]): AST {
  // implementação
}
```

---

## Integração com Workflow

### Phase 3: Specification
```markdown
## Regras de Qualidade Aplicáveis

- ✅ Regra 010 (SRP): Email, Senha, Usuario são classes separadas
- ✅ Regra 021 (DRY): Validação centralizada em value objects
- ✅ Regra 032 (Coverage): Testes unitários + integração (≥80%)
```

### Phase 4: Implementation
```typescript
// Developer consulta regras enquanto implementa
// .claude/rules/003_encapsulamento-primitivos.md
// .claude/rules/010_principio-responsabilidade-unica.md
```

### Phase 5: Review
```markdown
## Code Review - Conformidade com Regras

✅ Regra 001: Indentação OK
✅ Regra 010: SRP OK
❌ Regra 021: Duplicação detectada em validarEmail() e validarSenha()
⚠️ Regra 007: Usuario.ts tem 250 linhas (max 200)
```

### Phase 7: Validation
```bash
🛡️ Guardian Validation

Regras Bloqueantes:
✅ 010 (SRP): OK
✅ 032 (Coverage): 87% (≥80%)
✅ 018 (ADP): Sem ciclos

Regras Warning:
⚠️ 007 (Max Lines): 2 arquivos excedem 200 linhas
⚠️ 021 (DRY): 3 duplicações detectadas

Total: 61/64 regras OK (37/39 quality + 24/25 security)
```

---

## Checklist de Conformidade

### Para Cada Implementação

- [ ] **Object Calisthenics (001-009)**
  - [ ] Indentação ≤ 1 nível
  - [ ] Sem else (early return)
  - [ ] Primitivos encapsulados
  - [ ] Coleções encapsuladas
  - [ ] Nomes completos (sem abreviações)
  - [ ] Classes ≤ 200 linhas
  - [ ] Tell, Don't Ask

- [ ] **SOLID (010-014)**
  - [ ] Single Responsibility
  - [ ] Open/Closed
  - [ ] Liskov Substitution
  - [ ] Interface Segregation
  - [ ] Dependency Inversion

- [ ] **Package Principles (015-020)**
  - [ ] Sem dependências cíclicas
  - [ ] Pacotes coesos
  - [ ] Dependências estáveis

- [ ] **Code Quality (021-039)**
  - [ ] Sem duplicação (DRY)
  - [ ] Simplicidade (KISS)
  - [ ] Sem over-engineering (YAGNI)
  - [ ] Cobertura ≥80%
  - [ ] Sem constantes mágicas
  - [ ] Tratamento de erros explícito
  - [ ] Funções ≤ 3 parâmetros

- [ ] **Security - OWASP ASVS (040-049)**
  - [ ] Input validation com whitelist
  - [ ] Autenticação segura (Argon2id/bcrypt)
  - [ ] Sessões seguras (httpOnly, secure, sameSite)
  - [ ] Controle de acesso RBAC
  - [ ] Sanitização de output context-aware
  - [ ] Criptografia AES-256-GCM
  - [ ] Tratamento de erros sem exposição de internals
  - [ ] Proteção de dados sensíveis (PII/PCI)
  - [ ] TLS 1.3/1.2 + HSTS
  - [ ] Headers de segurança (CSP, X-Frame-Options)

- [ ] **Security - OWASP Top 10 & CWE (050-059)**
  - [ ] Prevenção SQL Injection (prepared statements)
  - [ ] Prevenção XSS (auto-escaping, CSP)
  - [ ] Prevenção CSRF (tokens anti-CSRF)
  - [ ] Prevenção Path Traversal (validação de paths)
  - [ ] Prevenção Command Injection (sem shell exec)
  - [ ] Prevenção XXE (disable external entities)
  - [ ] Prevenção Desserialização Insegura (JSON schema)
  - [ ] Prevenção SSRF (whitelist de domínios)
  - [ ] Gerenciamento de dependências (npm audit)
  - [ ] Logging seguro (sem PII/senhas)

- [ ] **Security - STRIDE (060-064)**
  - [ ] Proteção Spoofing (MFA, rate limiting)
  - [ ] Proteção Tampering (HMAC, checksums)
  - [ ] Proteção Repudiation (audit logging)
  - [ ] Proteção Information Disclosure (erros genéricos)
  - [ ] Proteção Denial of Service (rate limiting, timeouts)

---

## Ferramentas de Validação

### Recomendadas

**Linters** (Regras 001-039):
- ESLint (TypeScript/JavaScript)
- Pylint (Python)
- RuboCop (Ruby)
- Clippy (Rust)

**Coverage** (Regra 032):
- Jest (JavaScript/TypeScript)
- Pytest (Python)
- SimpleCov (Ruby)

**Análise Estática** (Regras 010-039):
- SonarQube
- CodeClimate
- DeepSource

**Dependências** (Regras 018, 058):
- dependency-cruiser (JS/TS)
- Madge (JS/TS)
- npm audit (Regra 058)
- Snyk (Regra 058)
- Dependabot (Regra 058)

**Security - SAST** (Regras 040-064):
- SonarQube Security
- Semgrep (regras OWASP)
- ESLint Security Plugin
- Bandit (Python)
- Brakeman (Ruby)

**Security - DAST** (Regras 050-057):
- OWASP ZAP
- Burp Suite
- Nuclei

**Security - Secrets Scanning** (Regra 047):
- TruffleHog
- GitLeaks
- detect-secrets

**Security - Dependency Scanning** (Regra 058):
- npm audit
- Snyk
- OWASP Dependency-Check
- GitHub Dependabot

---

## 🔗 Cross-References

### Integration with Skills (7-Phase Workflow)

| Skill | Rules Applied | Phase | Purpose |
|-------|---------------|-------|---------|
| **architect** | All 64 rules | 2 | Design decisions must follow rules |
| **security-analyst** | Security rules (040-064) | 2, 3, 5, 7 | Applies OWASP ASVS, STRIDE, Top 10, CWE, NIST SSDF |
| **developer** | All 64 rules | 4 | Implementation must follow rules |
| **gatekeeper** | All 64 rules | 4 | Validates rule compliance before completing tasks |
| **reviewer** | All 64 rules | 5 | Reviews code for rule violations |
| **guardian** | All 64 rules | 7 | Pre-commit validation ensures 100% compliance |

**Critical Integration**:
- **Phase 2 (Architecture)**: architect considers all rules + security-analyst performs threat modeling (STRIDE)
- **Phase 3 (Specification)**: security-analyst documents OWASP ASVS, Top 10, CWE, NIST SSDF requirements
- **Phase 4 (Implementation)**: developer applies rules + gatekeeper validates
- **Phase 5 (Review)**: reviewer checks compliance + security-analyst runs SAST/DAST
- **Phase 7 (Pre-commit)**: guardian + security-analyst block commit if violations found

See `../skills/README.md` for complete 7-phase workflow documentation.

### Integration with Commands

| Command | Rules Referenced | How Used |
|---------|------------------|----------|
| /stack | All 64 rules | Defines rules as constraints in specs/02_constraints/ |
| /rule | Creates custom rule | Adds project-specific rule to specs/02_constraints/patterns/ |
| /code | All 64 rules | Implementation guided by rules |
| /build | Testing + Security rules (032, 040-064) | Quality requirements reference test coverage + security rules |
| /cross | Domain + Security rules (011, 020, 024, 040-064) | DDD concepts + security requirements |

See `../commands/README.md` for complete command catalog.

### Integration with Templates

| Template | Rules Referenced | Integration |
|----------|------------------|-------------|
| changes/tasks.md | Task-specific rules | Each task lists applicable rules (e.g., "Apply rules 001, 010, 040") |
| bdd/scenario.md | Validation + Security rules | BDD scenarios validate business + security rules |
| c4/component.md | SOLID rules (010-014) | Components designed following SRP, OCP, etc |
| security/owasp-asvs.md | Security rules (040-049) | OWASP ASVS checklist maps to rules |
| security/stride-analysis.md | STRIDE rules (060-064) | Threat modeling maps to rules |
| security/owasp-top10.md | Security rules (050-059) | OWASP Top 10 maps to rules |
| arc42/02_constraints.md | All 64 rules | Lists rules as technical constraints |
| arc42/08_crosscutting.md | Security rules (040-064) | Security concepts reference security rules |
| arc42/10_quality.md | Testing + Security rules (032, 040-064) | Quality + security requirements reference rules |

See `../templates/README.md` for complete template catalog.

---

## 📖 Related Documentation

- **[Main Hub](../README.md)** - Complete system overview with 7-phase workflow
- **[Commands](../commands/README.md)** - 15 Arc42 commands
- **[Skills](../skills/README.md)** - 10 specialized agents and 7-phase workflow (+ security-analyst)
- **[Templates](../templates/README.md)** - 26 deterministic templates (Arc42, C4, BDD, ADR, Security)
- **[Result: specs/](../../specs/)** - Well-documented specifications (the constitution)

### External References

**Quality (Rules 001-039)**:
- **Object Calisthenics**: Jeff Bay (ThoughtWorks Anthology)
- **SOLID**: Robert C. Martin (Uncle Bob)
- **Package Principles**: Robert C. Martin
- **Clean Code**: Robert C. Martin
- **Domain-Driven Design**: Eric Evans

**Security (Rules 040-064)**:
- **OWASP ASVS 4.0**: [https://owasp.org/www-project-application-security-verification-standard/](https://owasp.org/www-project-application-security-verification-standard/)
- **STRIDE Threat Model**: Microsoft Security Development Lifecycle
- **OWASP Top 10 (2021)**: [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
- **CWE Top 25**: [https://cwe.mitre.org/top25/](https://cwe.mitre.org/top25/)
- **NIST SSDF v1.1**: [https://csrc.nist.gov/publications/detail/sp/800-218/final](https://csrc.nist.gov/publications/detail/sp/800-218/final)

---

## 🎓 Next Steps

1. **Read each rule**: Explore the 64 individual files (001-064)
2. **Configure linters**: Apply quality rules (001-039) in your project
3. **Configure security tools**: Apply security rules (040-064) with SAST/DAST
4. **Integrate into workflow**: Use rules in phases 2-7
5. **Review code**: Validate compliance during code review
6. **Security analysis**: Use security-analyst skill for OWASP ASVS, STRIDE, Top 10, CWE, NIST SSDF
7. **Automate**: Configure pre-commit hooks with guardian + security-analyst

---

## 📜 Changelog

### v3.1.0 (2025-12-16)
- 🛡️ **SECURITY FRAMEWORK INTEGRATION**: Added 25 security rules (040-064)
- 🔒 **5 SECURITY FRAMEWORKS**: OWASP ASVS 4.0, STRIDE, OWASP Top 10 (2021), CWE Top 25, NIST SSDF v1.1
- 🤖 **SECURITY-ANALYST SKILL**: New skill integrated in phases 2, 3, 5, 7
- 📊 **EXPANDED METRICS**: 39 → 64 rules (39 quality + 25 security)
- 🔗 **UPDATED CROSS-REFERENCES**: All skills, commands, templates reference security rules
- 🛠️ **SECURITY TOOLS**: Added SAST/DAST/secrets scanning/dependency scanning tools
- ✅ **COMPREHENSIVE CHECKLIST**: Added security checklist (OWASP ASVS, Top 10, STRIDE)
- 📈 **SEVERITY CLASSIFICATION**: Security rules classified as Critical (🔴), High (🟠), Medium (🟡)

### v3.0.0 (2025-12-10)
- 🔗 **COMPLETE CROSS-REFERENCES**: Integration with skills, commands, templates
- 📖 **ENHANCED DOCUMENTATION**: Clear links to all related directories
- 🎯 **COHERENT FLOW**: Perfect navigation for developers
- 🗺️ **WORKFLOW INTEGRATION**: Complete 7-phase workflow mapping

### v2.1.0 (2025-11-17)
- Complete reorganization into 4 categories
- 39 rules documented with examples
- Validation tools recommended

---

**Version**: 3.1.0
**Maintained by**: Documentation-First Approach System
**License**: MIT
**Last Updated**: 2025-12-16

---

**Quality code = Principles applied consistently.** 🎯

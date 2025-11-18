# 39 Regras de Qualidade - Arq-Kit

**Versão**: 2.1.0
**Última Atualização**: 2025-11-17
**Status**: 🟢 Ativo

---

## Visão Geral

Este diretório contém **39 regras de qualidade** que garantem código limpo, manutenível e de alta qualidade em todos os projetos Arq-Kit.

### Filosofia

**Código de qualidade não é acidente - é resultado de princípios aplicados consistentemente.**

Estas regras são divididas em 4 categorias:

1. **Object Calisthenics** (9 regras) - Código limpo no nível mais baixo
2. **SOLID Principles** (5 regras) - Fundamentos de design orientado a objetos
3. **Package Principles** (6 regras) - Coesão e acoplamento de módulos
4. **Code Quality Rules** (19 regras) - DRY, KISS, YAGNI, segurança, testes

---

## Por Que 39 Regras?

### Colapso do Espaço Probabilístico

Sem regras explícitas, a IA tem **infinitas** maneiras de implementar um requisito:

```
Sem regras:
  "Criar classe Usuario"
  ↓
  10^20 formas de implementar
  ↓
  Código inconsistente, baixa qualidade

Com 39 regras:
  "Criar classe Usuario (seguindo regras 001-039)"
  ↓
  ~10 formas equivalentes
  ↓
  Código consistente, alta qualidade
```

### Prevenção de Débito Técnico

Cada regra previne um padrão problemático específico:

- **Regra 001**: Previne complexidade ciclomática alta
- **Regra 010**: Previne classes "God Object"
- **Regra 021**: Previne duplicação de código
- **Regra 030**: Previne vulnerabilidades de segurança

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

## Como Aplicar as Regras

### Durante Specification (Phase 3)

Analyst menciona regras relevantes no spec.md:

```markdown
## Qualidade de Código

Este componente DEVE seguir:
- Regra 010 (SRP): Uma responsabilidade por classe
- Regra 021 (DRY): Sem duplicação de lógica
- Regra 032 (Coverage): ≥80% de cobertura de testes
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

### ❌ Bloqueante (9 regras)
Violações **bloqueiam** commit/push:
- 010 (SRP)
- 012 (LSP)
- 014 (DIP)
- 018 (ADP - Acyclic Dependencies)
- 025 (The Blob)
- 028 (Async Exception Handling)
- 030 (Unsafe Functions)
- 032 (Test Coverage ≥80%)

### ⚠️ Warning (24 regras)
Violações geram **avisos** mas não bloqueiam:
- Object Calisthenics (001-009)
- SOLID (011, 013)
- Package Principles (015-017, 019-020)
- Code Quality (021, 023-024, 027, 029, 031, 033-038)

### ℹ️ Info (6 regras)
Violações geram **informações** apenas:
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

Total: 37/39 regras OK
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

---

## Ferramentas de Validação

### Recomendadas

**Linters**:
- ESLint (TypeScript/JavaScript)
- Pylint (Python)
- RuboCop (Ruby)
- Clippy (Rust)

**Coverage**:
- Jest (JavaScript/TypeScript)
- Pytest (Python)
- SimpleCov (Ruby)

**Análise Estática**:
- SonarQube
- CodeClimate
- DeepSource

**Dependências**:
- dependency-cruiser (JS/TS)
- Madge (JS/TS)

---

## Referências

### Internas
- **Constitution**: `.claude/constitution.md` - Princípios fundamentais
- **Skills**: `.claude/skills/README.md` - Workflow de 7 fases
- **Templates**: `.claude/templates/README.md` - Templates determinísticos
- **Main README**: `.claude/README.md` - Overview do sistema

### Externas
- **Object Calisthenics**: Jeff Bay (ThoughtWorks Anthology)
- **SOLID**: Robert C. Martin (Uncle Bob)
- **Package Principles**: Robert C. Martin
- **Clean Code**: Robert C. Martin
- **Domain-Driven Design**: Eric Evans

---

## Próximos Passos

1. **Leia cada regra**: Explore os 39 arquivos individuais (001-039)
2. **Configure linters**: Aplique regras no seu projeto
3. **Integre no workflow**: Use regras nas fases 3-7
4. **Revise código**: Valide conformidade durante code review
5. **Automatize**: Configure pre-commit hooks

---

**Mantido por**: Sistema de Workflow de Especificações Determinísticas v2.1.0
**Licença**: Ver raiz do projeto

---

**Código de qualidade = Princípios aplicados consistentemente.** 🎯

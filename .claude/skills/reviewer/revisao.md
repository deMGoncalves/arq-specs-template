# Critérios de Revisão (Software Quality)

Esta checklist avalia a capacidade do software de ser **revisado e evoluído**.

## 1. ✅ Manutenibilidade

**Pergunta**: Fácil de corrigir?

### Verificações

- [ ] Código é legível e bem organizado?
- [ ] Estrutura é lógica e clara?
- [ ] Funções/métodos são pequenos e focados?
- [ ] Não há código duplicado?
- [ ] Comentários explicam "por quê", não "o quê"?
- [ ] Nomes são descritivos e claros?
- [ ] Complexidade é baixa (poucas ramificações)?
- [ ] Dependências são claras e mínimas?

### Como Validar

1. **Legibilidade**: Consegue entender o código sem esforço?
2. **Organização**: Estrutura de pastas/arquivos faz sentido?
3. **Tamanho**: Funções têm <= 20-30 linhas? Classes <= 200-300 linhas?
4. **Duplicação**: Há código repetido que deveria ser extraído?
5. **Comentários**: Comentários são úteis ou redundantes?
6. **Nomes**: Nomes revelam intenção sem precisar ler implementação?
7. **Complexidade**: Evita nesting profundo e lógica complexa?

### Referências em .claude/rules/

- **001**: Nível único de indentação
- **002**: Proibição de cláusula else
- **006**: Proibição de nomes abreviados
- **007**: Limite máximo de linhas por classe
- **021**: Proibição de duplicação de lógica (DRY)
- **022**: Priorização de simplicidade e clareza (KISS)
- **026**: Qualidade de comentários (explicar "por quê")
- **034**: Nomes de classes e métodos consistentes

### Issues Comuns

- 🟠 **Alto**: Código duplicado em múltiplos lugares
- 🟠 **Alto**: Função muito longa (>50 linhas) ou complexa
- 🟡 **Médio**: Nomes abreviados ou pouco descritivos
- 🟡 **Médio**: Nesting profundo (>2 níveis)
- 🟡 **Médio**: Comentários redundantes ou obsoletos
- 🟢 **Baixo**: Linha muito longa (>100 caracteres)

### Exemplo de Boa Manutenibilidade

```rust
// ✅ BOM: Claro, focado, nomes descritivos
fn validate_email(email: &str) -> Result<(), ValidationError> {
    if email.is_empty() {
        return Err(ValidationError::Empty);
    }

    if !EMAIL_REGEX.is_match(email) {
        return Err(ValidationError::InvalidFormat);
    }

    Ok(())
}
```

```rust
// ❌ RUIM: Nomes ruins, complexo, duplicado
fn ve(e: &str) -> bool {
    if e.len() > 0 {
        if e.contains("@") {
            if e.split("@").count() == 2 {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
```

---

## 2. ✅ Flexibilidade

**Pergunta**: Fácil de mudar?

### Verificações

- [ ] Código segue princípios SOLID?
- [ ] Acoplamento é baixo (módulos independentes)?
- [ ] Coesão é alta (cada módulo tem responsabilidade clara)?
- [ ] Usa abstrações (interfaces/traits) quando apropriado?
- [ ] Mudanças em um módulo não afetam outros?
- [ ] Extensível sem modificar código existente (OCP)?
- [ ] Não há dependências circulares?

### Como Validar

1. **SRP**: Cada classe/módulo tem uma única responsabilidade?
2. **OCP**: Pode adicionar funcionalidade sem modificar existente?
3. **LSP**: Subtipos podem substituir tipos base?
4. **ISP**: Interfaces são pequenas e focadas?
5. **DIP**: Depende de abstrações, não implementações concretas?
6. **Acoplamento**: Quantos módulos precisam mudar juntos?
7. **Coesão**: Elementos do módulo trabalham juntos?

### Referências em .claude/rules/

- **010**: Princípio da Responsabilidade Única (SRP)
- **011**: Princípio Aberto/Fechado (OCP)
- **012**: Princípio de Substituição de Liskov (LSP)
- **013**: Princípio de Segregação de Interfaces (ISP)
- **014**: Princípio de Inversão de Dependência (DIP)
- **015-020**: Princípios de Pacotes (REP, CCP, CRP, ADP, SDP, SAP)

### Issues Comuns

- 🔴 **Crítico**: Violação grave de SRP (classe faz muitas coisas)
- 🟠 **Alto**: Alto acoplamento (mudança afeta múltiplos módulos)
- 🟠 **Alto**: Dependência circular
- 🟡 **Médio**: Violação de OCP (precisa modificar para estender)
- 🟡 **Médio**: Baixa coesão (elementos do módulo não relacionados)

### Exemplo de Boa Flexibilidade

```rust
// ✅ BOM: Usa abstração (trait), baixo acoplamento
trait EmailValidator {
    fn validate(&self, email: &str) -> Result<(), ValidationError>;
}

struct RegexEmailValidator {
    pattern: Regex,
}

impl EmailValidator for RegexEmailValidator {
    fn validate(&self, email: &str) -> Result<(), ValidationError> {
        // implementação
    }
}

// Fácil adicionar novo validator sem modificar código existente
struct StrictEmailValidator;
impl EmailValidator for StrictEmailValidator { /* ... */ }
```

```rust
// ❌ RUIM: Alto acoplamento, difícil de estender
struct UserService {
    // Depende diretamente de implementação concreta
    validator: RegexEmailValidator,
    db: PostgresDatabase,
    cache: RedisCache,
    logger: FileLogger,
}

// Para mudar qualquer dependência, precisa modificar UserService
```

---

## 3. ✅ Testabilidade

**Pergunta**: Posso testar seu funcionamento?

### Verificações

- [ ] Código é modular e isolado?
- [ ] Dependências podem ser mockadas/stubadas?
- [ ] Funções têm entradas/saídas claras (sem side effects ocultos)?
- [ ] Estado é gerenciável em testes?
- [ ] Não há dependências globais ou singleton difíceis de testar?
- [ ] I/O e lógica estão separados?
- [ ] Testes podem ser executados de forma isolada?

### Como Validar

1. **Isolamento**: Pode testar cada função/módulo independentemente?
2. **Dependências**: Dependencies são injetadas ou mockáveis?
3. **Side Effects**: Funções têm efeitos colaterais documentados?
4. **Estado**: Estado é previsível e controlável?
5. **Determinismo**: Mesma entrada sempre produz mesma saída?
6. **Velocidade**: Testes podem rodar rápido (sem I/O real)?

### Referências em .claude/rules/

- **010**: SRP (responsabilidade única facilita testes)
- **014**: DIP (abstrações facilitam mocking)
- **032**: Cobertura de teste mínima e qualidade
- **036**: Restrição de funções com efeitos colaterais

### Issues Comuns

- 🟠 **Alto**: Código fortemente acoplado a dependências externas
- 🟠 **Alto**: Singleton ou estado global dificulta testes
- 🟡 **Médio**: Side effects não documentados
- 🟡 **Médio**: Difícil mockar dependências
- 🟡 **Médio**: Testes precisam de I/O real (banco, rede)

### Exemplo de Boa Testabilidade

```rust
// ✅ BOM: Dependências injetadas, fácil de testar
struct UserService<V, D>
where
    V: EmailValidator,
    D: Database,
{
    validator: V,
    database: D,
}

impl<V, D> UserService<V, D>
where
    V: EmailValidator,
    D: Database,
{
    fn register(&self, email: &str) -> Result<User, Error> {
        self.validator.validate(email)?;
        self.database.insert(email)
    }
}

// Teste é fácil: injeta mocks
#[test]
fn test_register_with_invalid_email() {
    let mock_validator = MockValidator::new();
    let mock_db = MockDatabase::new();
    let service = UserService::new(mock_validator, mock_db);

    assert!(service.register("invalid").is_err());
}
```

```rust
// ❌ RUIM: Difícil de testar (dependências hardcoded)
struct UserService;

impl UserService {
    fn register(&self, email: &str) -> Result<User, Error> {
        // Validador hardcoded - não pode mockar
        let validator = RegexEmailValidator::new();
        validator.validate(email)?;

        // Database hardcoded - precisa de DB real para testar
        let db = PostgresDatabase::connect("prod_url");
        db.insert(email)
    }
}

// Teste requer DB real e não pode controlar validação
```

---

## Resumo de Severidade

### 🔴 Crítico (Bloqueia aprovação)

- Violação grave de SRP (classe "God Object")
- Impossível ou muito difícil de testar

### 🟠 Alto (Aprovação com ressalvas)

- Alto acoplamento que dificulta mudanças
- Código duplicado extensivo
- Dependência circular

### 🟡 Médio (Não bloqueia)

- Complexidade alta (muitas ramificações)
- Nomes pouco descritivos
- Violações menores de SOLID
- Side effects não documentados

### 🟢 Baixo (Sugestão)

- Linhas muito longas
- Pequenas melhorias de organização
- Comentários redundantes

---

## Checklist Rápido

```markdown
## Revisão

- [ ] ✅ Manutenibilidade: Fácil de corrigir?
  - [ ] Código legível e bem organizado
  - [ ] Funções pequenas e focadas
  - [ ] Sem código duplicado
  - [ ] Nomes descritivos
  - [ ] Baixa complexidade
- [ ] ✅ Flexibilidade: Fácil de mudar?
  - [ ] Segue SOLID
  - [ ] Baixo acoplamento
  - [ ] Alta coesão
  - [ ] Usa abstrações
  - [ ] Sem dependências circulares
- [ ] ✅ Testabilidade: Posso testar?
  - [ ] Código modular e isolado
  - [ ] Dependências injetáveis/mockáveis
  - [ ] Sem side effects ocultos
  - [ ] Estado gerenciável
```

# Critérios de Transição (Software Quality)

Esta checklist avalia a capacidade do software de **transitar entre ambientes e contextos**.

## 1. ✅ Portabilidade

**Pergunta**: Consigo movê-lo facilmente?

### Verificações

- [ ] Não há dependências específicas de plataforma desnecessárias?
- [ ] Paths de arquivos usam separadores agnósticos de SO?
- [ ] Não há comandos específicos de shell hardcoded?
- [ ] Configuração de ambiente é externalizável?
- [ ] Funciona em diferentes sistemas operacionais (se aplicável)?
- [ ] Não há assunções sobre filesystem ou encoding?
- [ ] Dependências externas são documentadas e gerenciáveis?

### Como Validar

1. **Paths**: Usa `Path::join()` ou equivalente ao invés de concatenação manual?
2. **Environment**: Configurações usam variáveis de ambiente ou arquivos de config?
3. **Comandos**: Evita chamar comandos do shell diretamente?
4. **Encoding**: Assume UTF-8 ou lida com diferentes encodings?
5. **Dependências**: Todas as dependências estão em arquivo de manifesto?
6. **Platform-specific**: Código específico de plataforma está isolado?

### Referências em .claude/rules/

- **024**: Proibição de constantes mágicas (includes paths hardcoded)
- **031**: Restrição de imports relativos

### Issues Comuns

- 🟠 **Alto**: Path hardcoded com separador específico (`/` ou `\`)
- 🟠 **Alto**: Configuração hardcoded para ambiente específico
- 🟡 **Médio**: Comando de shell específico de plataforma
- 🟡 **Médio**: Assunção de encoding ou locale específico
- 🟢 **Baixo**: Dependência que não funciona em todas as plataformas (mas documentada)

### Exemplo de Boa Portabilidade

```rust
// ✅ BOM: Path agnóstico de plataforma
use std::path::PathBuf;
use std::env;

fn get_config_path() -> PathBuf {
    let base = env::var("CONFIG_DIR")
        .unwrap_or_else(|_| ".".to_string());
    PathBuf::from(base).join("config").join("app.toml")
}

// ✅ BOM: Configuração externalizável
struct Config {
    database_url: String,
    cache_ttl: u64,
}

impl Config {
    fn from_env() -> Result<Self, ConfigError> {
        Ok(Config {
            database_url: env::var("DATABASE_URL")?,
            cache_ttl: env::var("CACHE_TTL")?.parse()?,
        })
    }
}
```

```rust
// ❌ RUIM: Path específico de plataforma
fn get_config_path() -> String {
    // Só funciona em Unix
    "/etc/myapp/config.toml".to_string()
}

// ❌ RUIM: Configuração hardcoded
struct Config {
    database_url: String,
}

impl Config {
    fn new() -> Self {
        Config {
            // Hardcoded para ambiente específico
            database_url: "postgresql://localhost:5432/prod_db".to_string(),
        }
    }
}
```

---

## 2. ✅ Reusabilidade

**Pergunta**: Posso utilizar parte dele?

### Verificações

- [ ] Código está modularizado em componentes independentes?
- [ ] Funções/módulos têm responsabilidades claras e únicas?
- [ ] Não há acoplamento desnecessário entre módulos?
- [ ] APIs são genéricas quando apropriado?
- [ ] Não há lógica de negócio misturada com infraestrutura?
- [ ] Componentes podem ser usados isoladamente?
- [ ] Existe separação entre core e bindings/adapters?

### Como Validar

1. **Modularização**: Pode extrair um módulo e usar em outro projeto?
2. **Responsabilidade**: Cada módulo tem uma responsabilidade clara?
3. **Acoplamento**: Módulo depende de quantos outros?
4. **Genericidade**: Código é específico demais ou genérico?
5. **Camadas**: Há separação clara entre camadas (core, infra, UI)?
6. **Standalone**: Componente funciona sozinho ou precisa de todo o sistema?

### Referências em .claude/rules/

- **010**: SRP - Responsabilidade Única
- **014**: DIP - Inversão de Dependência
- **015**: REP - Princípio Equivalência Lançamento/Reuso
- **016**: CCP - Princípio Fechamento Comum
- **017**: CRP - Princípio Reuso Comum

### Issues Comuns

- 🟠 **Alto**: Lógica de negócio fortemente acoplada a framework específico
- 🟠 **Alto**: Módulo depende de muitos outros módulos
- 🟡 **Médio**: Código muito específico que deveria ser genérico
- 🟡 **Médio**: Falta de separação entre camadas
- 🟢 **Baixo**: API poderia ser mais genérica

### Exemplo de Boa Reusabilidade

```rust
// ✅ BOM: Módulo independente e reutilizável
// core/validation.rs
pub trait Validator<T> {
    fn validate(&self, value: &T) -> Result<(), ValidationError>;
}

pub struct EmailValidator {
    pattern: Regex,
}

impl Validator<String> for EmailValidator {
    fn validate(&self, email: &String) -> Result<(), ValidationError> {
        // Lógica pura, sem dependências externas
        if !self.pattern.is_match(email) {
            return Err(ValidationError::InvalidFormat);
        }
        Ok(())
    }
}

// Pode ser reutilizado em qualquer projeto que precise de validação de email
```

```rust
// ❌ RUIM: Código específico demais, não reutilizável
// Acoplado ao framework web, banco específico, etc
pub struct UserEmailValidator {
    db: PostgresConnection,
    request: HttpRequest,
    session: Session,
}

impl UserEmailValidator {
    pub fn validate(&self, email: &str) -> Result<(), Error> {
        // Lógica misturada com infraestrutura
        let user_id = self.session.get("user_id")?;
        let existing = self.db.query("SELECT * FROM users WHERE email = ?", email)?;

        // Não pode reutilizar em outros contextos (CLI, testes, outro framework)
        if existing.len() > 0 {
            self.request.flash("error", "Email já existe");
            return Err(Error::Duplicate);
        }
        Ok(())
    }
}
```

---

## 3. ✅ Interoperabilidade

**Pergunta**: Ele trabalha com outros softwares em conjunto?

### Verificações

- [ ] Usa formatos de dados padrão (JSON, XML, Protocol Buffers)?
- [ ] APIs seguem convenções conhecidas (REST, GraphQL, gRPC)?
- [ ] Interfaces são bem documentadas e estáveis?
- [ ] Suporta integração via APIs, bibliotecas ou plugins?
- [ ] Não há dependência de formatos proprietários?
- [ ] Logs e métricas seguem padrões (structured logging, OpenTelemetry)?
- [ ] Compatibilidade com versões anteriores é mantida?

### Como Validar

1. **Formatos**: Usa JSON/XML/Protobuf ao invés de formato custom?
2. **APIs**: Segue padrões REST/GraphQL/gRPC?
3. **Versionamento**: API tem versionamento e mantém compatibilidade?
4. **Documentação**: Interfaces externas estão documentadas?
5. **Padrões**: Segue padrões da indústria (OpenAPI, OpenTelemetry)?
6. **Extensibilidade**: Permite extensão via plugins/hooks?

### Referências em specs/

- Se `specs/` existe, verificar seção de integração com outros sistemas
- Verificar decisões arquiteturais sobre APIs e formatos

### Issues Comuns

- 🟠 **Alto**: Formato proprietário sem alternativa padrão
- 🟡 **Médio**: API sem versionamento ou documentação
- 🟡 **Médio**: Breaking changes sem aviso prévio
- 🟡 **Médio**: Logs não estruturados (dificulta integração com ferramentas)
- 🟢 **Baixo**: Falta de suporte a formato alternativo

### Exemplo de Boa Interoperabilidade

```rust
// ✅ BOM: Usa formatos padrão, bem documentado
use serde::{Serialize, Deserialize};

/// API v1 - User representation
///
/// # Compatibility
/// This structure maintains backward compatibility.
/// New fields are always optional.
#[derive(Serialize, Deserialize)]
pub struct UserV1 {
    pub id: String,
    pub email: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
}

/// REST API endpoint
/// GET /api/v1/users/{id}
/// Returns: application/json
pub async fn get_user(id: String) -> Result<Json<UserV1>, Error> {
    // Retorna JSON padrão, fácil integrar com qualquer cliente
    let user = fetch_user(&id).await?;
    Ok(Json(user))
}

// ✅ Structured logging (fácil integrar com ferramentas)
use tracing::{info, error};

info!(
    user_id = %user.id,
    action = "login",
    "User logged in successfully"
);
```

```rust
// ❌ RUIM: Formato proprietário, difícil integração
pub struct UserBinary {
    // Formato binário custom, difícil de consumir
    data: Vec<u8>,
}

impl UserBinary {
    pub fn to_custom_format(&self) -> Vec<u8> {
        // Serialização proprietária, outros sistemas não conseguem ler
        let mut bytes = vec![];
        // ... formato custom ...
        bytes
    }
}

// ❌ Logs não estruturados
println!("User {} logged in at {}", user.id, timestamp);
// Difícil parsear e integrar com ferramentas de observabilidade
```

### Exemplo: OpenTelemetry Integration

```rust
// ✅ BOM: Segue padrão OpenTelemetry
use opentelemetry::trace::{Tracer, SpanKind};

pub async fn process_request(request: Request) -> Response {
    let tracer = global::tracer("my-service");
    let span = tracer
        .span_builder("process_request")
        .with_kind(SpanKind::Server)
        .start(&tracer);

    // Qualquer ferramenta que suporta OpenTelemetry pode consumir
    // (Jaeger, Zipkin, Datadog, etc)

    // ... processamento ...

    span.end();
}
```

---

## Resumo de Severidade

### 🟠 Alto (Aprovação com ressalvas)

- Path ou configuração hardcoded específica de plataforma
- Lógica fortemente acoplada a infraestrutura (não reutilizável)
- Formato proprietário sem alternativa padrão

### 🟡 Médio (Não bloqueia)

- Comando específico de plataforma
- Código muito específico que deveria ser genérico
- API sem versionamento ou documentação
- Logs não estruturados

### 🟢 Baixo (Sugestão)

- API poderia ser mais genérica
- Falta de suporte a formato alternativo
- Pequenas melhorias de portabilidade

---

## Checklist Rápido

```markdown
## Transição

- [ ] ✅ Portabilidade: Consigo movê-lo facilmente?
  - [ ] Sem dependências específicas de plataforma desnecessárias
  - [ ] Paths agnósticos de SO
  - [ ] Configuração externalizável
  - [ ] Funciona em diferentes ambientes
- [ ] ✅ Reusabilidade: Posso utilizar parte dele?
  - [ ] Código modularizado
  - [ ] Responsabilidades claras
  - [ ] Baixo acoplamento
  - [ ] Separação de camadas (core/infra)
  - [ ] Componentes standalone
- [ ] ✅ Interoperabilidade: Trabalha com outros softwares?
  - [ ] Formatos padrão (JSON, XML, Protobuf)
  - [ ] APIs seguem convenções (REST, gRPC)
  - [ ] Interfaces documentadas
  - [ ] Versionamento e compatibilidade
  - [ ] Structured logging
  - [ ] Segue padrões da indústria
```

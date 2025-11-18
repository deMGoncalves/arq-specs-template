# 💀 Sinais que o Sistema Está Apodrecendo

"Signs that your system is rotting" na Arquitetura Limpa é uma metáfora que se refere aos indicadores de que um sistema está se deteriorando em termos de qualidade, manutenção e escalabilidade. Esses sinais podem incluir código confuso e difícil de entender, acoplamento excessivo entre componentes, falta de testes automatizados, dificuldade em fazer alterações sem causar efeitos colaterais indesejados e aumento da complexidade geral do sistema. Esses sintomas indicam a necessidade de uma revisão e refatoração do código para preservar a saúde e a sustentabilidade do sistema a longo prazo.

## 📋 Os 4 Sinais Principais

```
┌──────────────────────────────────────────────────┐
│     SINAIS DE DETERIORAÇÃO DO SISTEMA           │
├──────────────────────────────────────────────────┤
│                                                  │
│  1. 🔒 RIGIDEZ       - Difícil de mudar          │
│  2. 💔 FRAGILIDADE   - Quebra facilmente         │
│  3. ⚓ IMOBILIDADE   - Difícil de reutilizar     │
│  4. 🐌 VISCOSIDADE   - Gambiarra é mais fácil    │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 1. 🔒 RIGIDEZ

**Definição**: Mudança alguma é trivial, seu sistema não é coeso e suas features estão espalhadas por todo o sistema.

### Sintomas

- [ ] **Mudanças simples demoram muito tempo**
  - Uma pequena alteração que deveria levar 2 dias acaba levando semanas
  - Você precisa modificar múltiplos módulos para uma única feature
- [ ] **Features espalhadas por todo o sistema**

  - Uma funcionalidade não está centralizada em apenas um lugar
  - Está ligada diretamente ao alto acoplamento, baixa coesão e duplicidade de código

- [ ] **Alto acoplamento entre módulos**

  - Módulos dependem fortemente uns dos outros
  - Mudança em A requer mudança em B, C, D, E...

- [ ] **Baixa coesão**

  - Elementos dentro de um módulo não trabalham juntos
  - Módulo tem múltiplas responsabilidades não relacionadas

- [ ] **Duplicação de código**
  - Mesma lógica repetida em vários lugares
  - Para mudar uma regra, precisa mudar em N lugares

### Impacto

**Para Gerentes/Líderes:**

- Começam a pedir **menos mudanças**
- Percebem que mudanças estão demorando demais
- Cria política de gerência adversa por conta da rigidez do sistema

**Para Desenvolvedores:**

- Frustração constante
- Medo de fazer mudanças
- Perda de produtividade

### Como Detectar no Planejamento

Durante a **Fase Analyst**, perguntar:

```markdown
## Análise de Rigidez

### Feature Centralization

- [ ] Esta feature pode ser implementada em UM único módulo?
- [ ] Quantos módulos precisarão ser modificados? \_\_\_
- [ ] Por que está espalhada? (documentar razão)

### Coupling Analysis

- [ ] Listar dependências entre módulos
- [ ] Identificar acoplamento desnecessário
- [ ] Sugerir desacoplamento se possível

### Code Duplication

- [ ] Há código duplicado relacionado a esta mudança?
- [ ] Pode ser extraído para função/módulo compartilhado?
- [ ] Aplicar DRY (Don't Repeat Yourself)

### Time Estimation Reality Check

- [ ] Estimativa inicial: \_\_\_ dias
- [ ] Considerando rigidez: \_\_\_ dias
- [ ] Justificar diferença se >2x
```

### Soluções

- ✅ **Aplicar SRP** (Single Responsibility Principle) - Regra 010
- ✅ **Centralizar features** em módulos coesos
- ✅ **Desacoplar** componentes (usar abstrações)
- ✅ **Eliminar duplicação** (DRY - Regra 021)
- ✅ **Refatorar** módulos grandes em menores e focados

---

## 2. 💔 FRAGILIDADE

**Definição**: Diretamente relacionado com acoplamento, a fragilidade é quando alteramos algo em um módulo e acaba dando problema em outro módulo justamente por conta das coisas estarem muito acopladas.

### Sintomas

- [ ] **Mudança em A quebra B, C, D**

  - Alteração em um módulo causa bugs em módulos não relacionados
  - Efeitos colaterais inesperados e distantes

- [ ] **Alto acoplamento oculto**

  - Dependências não óbvias entre componentes
  - Não está claro o que depende do quê

- [ ] **Medo de pedir alterações (gerentes)**

  - Gerentes ficam com medo de pedir mudanças
  - "O que mais vai quebrar se eu pedir isso?"
  - Não sabem se a mudança vai impactar outras partes

- [ ] **Analogia do carro na oficina**
  - Leva carro para mexer no motor
  - Quando fica pronto, descobre que vidros elétricos pararam de funcionar
  - Mudanças têm efeitos colaterais não relacionados

### Exemplo Real

```rust
// ❌ FRÁGIL: Mudança em validation quebra auth
pub fn validate_email(email: &str) -> bool {
    // Lógica de validação
    let valid = email.contains('@');

    // Efeito colateral oculto!
    update_user_stats(email); // ⚠️ Acoplado a outro módulo

    valid
}

pub fn authenticate(email: &str, password: &str) -> Result<User> {
    // Depende de validate_email, que tem efeito colateral
    if !validate_email(email) {
        return Err(Error::InvalidEmail);
    }
    // Agora stats foram atualizadas mesmo sem autenticar!
}
```

```rust
// ✅ ROBUSTO: Separação clara, sem efeitos colaterais
pub fn validate_email(email: &str) -> bool {
    email.contains('@') && email.contains('.')
}

pub fn authenticate(email: &str, password: &str) -> Result<User> {
    if !validate_email(email) {
        return Err(Error::InvalidEmail);
    }

    let user = find_user(email)?;
    verify_password(user, password)?;

    // Stats atualizadas APENAS após autenticação
    update_user_stats(user.id);

    Ok(user)
}
```

### Como Detectar no Planejamento

Durante a **Fase Analyst**, perguntar:

```markdown
## Análise de Fragilidade

### Impact Analysis

- [ ] Quais módulos serão DIRETAMENTE afetados? \_\_\_ (listar)
- [ ] Quais módulos PODEM ser afetados indiretamente? \_\_\_ (listar)
- [ ] Há dependências ocultas não documentadas?

### Side Effects Check

- [ ] Esta mudança pode ter efeitos colaterais? Onde?
- [ ] Funções têm side effects documentados?
- [ ] Há acoplamento temporal (ordem de chamadas importa)?

### Testing Strategy

- [ ] Testes unitários são suficientes?
- [ ] Precisa de testes de integração? Quais módulos?
- [ ] Testes de regressão para prevenir quebras?

### Risk Assessment

- [ ] Risco de quebrar outros módulos: ⬜ Baixo ⬜ Médio ⬜ Alto
- [ ] Módulos de alto risco: \_\_\_ (listar)
- [ ] Plano de mitigação: \_\_\_ (descrever)
```

### Soluções

- ✅ **Eliminar side effects ocultos** (Regra 036)
- ✅ **Desacoplar** usando interfaces/traits (DIP - Regra 014)
- ✅ **Isolar mudanças** em módulos específicos
- ✅ **Aumentar cobertura de testes** (Regra 032)
- ✅ **Documentar dependências** claramente

---

## 3. ⚓ IMOBILIDADE

**Definição**: Ligado diretamente ao acoplamento e principalmente à duplicação de código, a imobilidade é quando temos uma feature e quando precisamos reutilizar ela em outro módulo não conseguimos extraí-la para outro módulo.

### Sintomas

- [ ] **Código não é reutilizável**

  - Feature útil, mas não consegue usar em outro módulo
  - Está tão acoplada ao módulo atual que extração é impossível

- [ ] **Duplicação é mais fácil que extração**

  - Copiar e colar é mais rápido que refatorar
  - Criar novo código é mais fácil que reutilizar existente

- [ ] **Alto acoplamento impede reuso**

  - Feature está tão integrada que não pode ser separada
  - Dependências circulares ou muito profundas

- [ ] **Código duplicado cresce**
  - Mesma lógica em múltiplos lugares
  - Quando precisa mudar, muda em N lugares
  - "Reinventamos a roda" constantemente

### Exemplo Real

```rust
// ❌ IMOBILIZADO: Validação de email acoplada ao módulo de usuários
pub mod users {
    pub struct User {
        email: String,
    }

    impl User {
        pub fn new(email: String) -> Result<Self, Error> {
            // Validação acoplada à struct User
            if !email.contains('@') || !email.contains('.') {
                return Err(Error::InvalidEmail);
            }

            // Outras validações específicas de User
            if email.len() > 100 {
                return Err(Error::EmailTooLong);
            }

            Ok(User { email })
        }
    }
}

// ❌ Agora queremos validar email em outro módulo (newsletter)
pub mod newsletter {
    // Não consegue reutilizar validação de User!
    // Opções:
    // 1. Duplicar código (ruim)
    // 2. Depender de users::User (acoplamento ruim)

    pub fn subscribe(email: String) -> Result<()> {
        // Duplicação! 😢
        if !email.contains('@') || !email.contains('.') {
            return Err(Error::InvalidEmail);
        }
        // ...
    }
}
```

```rust
// ✅ REUTILIZÁVEL: Validação extraída para módulo compartilhado
pub mod validation {
    pub fn validate_email(email: &str) -> Result<(), ValidationError> {
        if !email.contains('@') || !email.contains('.') {
            return Err(ValidationError::InvalidFormat);
        }

        if email.len() > 100 {
            return Err(ValidationError::TooLong);
        }

        Ok(())
    }
}

pub mod users {
    use crate::validation::validate_email;

    pub struct User {
        email: String,
    }

    impl User {
        pub fn new(email: String) -> Result<Self, Error> {
            validate_email(&email)?; // Reutiliza!
            Ok(User { email })
        }
    }
}

pub mod newsletter {
    use crate::validation::validate_email;

    pub fn subscribe(email: String) -> Result<()> {
        validate_email(&email)?; // Reutiliza!
        // ...
    }
}
```

### Como Detectar no Planejamento

Durante a **Fase Analyst**, perguntar:

```markdown
## Análise de Imobilidade

### Reusability Check

- [ ] Há código existente que poderia ser reutilizado? Onde?
- [ ] Por que não pode ser reutilizado? (documentar razões)
- [ ] Está acoplado a que módulos/componentes?

### Extraction Opportunity

- [ ] Esta lógica pode ser útil em outros lugares?
- [ ] Pode ser extraída para módulo compartilhado?
- [ ] Que dependências impedem extração?

### Duplication Analysis

- [ ] Há código similar em outros módulos?
- [ ] Quantas vezes esta lógica está duplicada? \_\_\_
- [ ] Pode consolidar em um único lugar?

### Module Organization

- [ ] Código está no módulo certo?
- [ ] Deveria estar em:
  - [ ] Core/shared module
  - [ ] Utility module
  - [ ] Domain-specific module
```

### Soluções

- ✅ **Extrair** código comum para módulos compartilhados
- ✅ **Desacoplar** usando abstrações (traits/interfaces)
- ✅ **Aplicar DRY** (Don't Repeat Yourself - Regra 021)
- ✅ **Organizar** em camadas (core, utils, domain)
- ✅ **Criar bibliotecas** internas reutilizáveis

---

## 4. 🐌 VISCOSIDADE

**Definição**: Existem dois tipos de viscosidade: a viscosidade de design e a viscosidade de ambiente.

### 4.1 Viscosidade de Design/Projeto

**Sintoma**: Quando é mais fácil fazer a gambiarra do que fazer a alteração correta e que preserva o design do sistema.

#### Exemplos

- [ ] **Gambiarra é mais rápida**

  - Solução correta leva 3 dias
  - Gambiarra leva 2 horas
  - Pressão para escolher gambiarra

- [ ] **Design patterns ignorados**

  - Sistema tem padrões definidos
  - Seguir padrão é muito trabalhoso
  - Mais fácil fazer "do jeito rápido"

- [ ] **Arquitetura é violada**
  - Camadas existem mas são ignoradas
  - Acesso direto ao banco em vez de usar repository
  - "Só desta vez" vira regra

#### Como Detectar

```markdown
## Análise de Viscosidade de Design

### Design Preservation

- [ ] Solução proposta preserva design do sistema?
- [ ] Há atalhos sendo considerados? Quais?
- [ ] Solução correta vs solução rápida:
  - Tempo correto: \_\_\_ dias
  - Tempo atalho: \_\_\_ horas
  - Débito técnico do atalho: \_\_\_

### Pattern Compliance

- [ ] Sistema tem padrões de design estabelecidos?
- [ ] Solução segue padrões existentes?
- [ ] Desvios do padrão: \_\_\_ (listar e justificar)

### Architecture Alignment

- [ ] Respeita camadas definidas em specs/?
- [ ] Segue princípios arquiteturais do projeto?
- [ ] Violações justificáveis? \_\_\_ (documentar)
```

### 4.2 Viscosidade de Ambiente

**Sintoma**: Quando nosso ambiente demora muito para compilar ou levantar o sistema.

#### Exemplos

- [ ] **Build muito lento**

  - `cargo build` leva 10+ minutos
  - Feedback lento desencoraja testes

- [ ] **Testes demoram eternidade**

  - Suite de testes leva 30+ minutos
  - Desenvolvedores evitam rodar testes

- [ ] **CI/CD lento**

  - Pipeline leva 1+ hora
  - Múltiplos pushes sem esperar resultado
  - Feedback tardio de problemas

- [ ] **Setup complicado**
  - Levantar ambiente local leva horas
  - Muitas dependências externas
  - Documentação desatualizada

#### Como Detectar

```markdown
## Análise de Viscosidade de Ambiente

### Build Performance

- [ ] Tempo de build local: \_\_\_ minutos
- [ ] Tempo de build CI: \_\_\_ minutos
- [ ] Aceitável? ⬜ Sim ⬜ Não (se >5 min)

### Test Performance

- [ ] Tempo de testes unitários: \_\_\_ minutos
- [ ] Tempo de testes integração: \_\_\_ minutos
- [ ] Tempo total: \_\_\_ minutos
- [ ] Aceitável? ⬜ Sim ⬜ Não (se >10 min)

### CI/CD Pipeline

- [ ] Tempo total de pipeline: \_\_\_ minutos
- [ ] Gargalos identificados: \_\_\_ (listar)
- [ ] Otimizações possíveis: \_\_\_ (listar)

### Developer Experience

- [ ] Setup inicial leva quanto tempo? \_\_\_ horas
- [ ] Quantas dependências externas? \_\_\_
- [ ] Documentação está atualizada? ⬜ Sim ⬜ Não
```

### Soluções

**Para Viscosidade de Design:**

- ✅ **Documentar padrões** claramente em specs/
- ✅ **Facilitar** seguir o padrão correto
- ✅ **Code review** rigoroso (rejeitar gambiarras)
- ✅ **Refatorar** para alinhar com design

**Para Viscosidade de Ambiente:**

- ✅ **Otimizar builds** (cache, builds incrementais)
- ✅ **Paralelizar testes**
- ✅ **Melhorar CI/CD** (pipeline mais rápido)
- ✅ **Simplificar setup** (Docker, scripts)
- ✅ **Manter docs atualizadas**

---

## 📊 Checklist de Análise Completa

Use este checklist durante a **Fase Analyst** para identificar sinais de deterioração:

### Análise de Saúde do Sistema

```markdown
## 💀 Sinais de Deterioração

### 🔒 Rigidez

- [ ] Features estão centralizadas? ⬜ Sim ⬜ Não
- [ ] Acoplamento é baixo? ⬜ Sim ⬜ Não
- [ ] Coesão é alta? ⬜ Sim ⬜ Não
- [ ] Sem código duplicado? ⬜ Sim ⬜ Não
- **Score**: \_\_\_/4 (meta: 4/4)

### 💔 Fragilidade

- [ ] Mudanças são isoladas? ⬜ Sim ⬜ Não
- [ ] Sem side effects ocultos? ⬜ Sim ⬜ Não
- [ ] Dependências claras? ⬜ Sim ⬜ Não
- [ ] Testes previnem regressão? ⬜ Sim ⬜ Não
- **Score**: \_\_\_/4 (meta: 4/4)

### ⚓ Imobilidade

- [ ] Código é reutilizável? ⬜ Sim ⬜ Não
- [ ] Sem duplicação desnecessária? ⬜ Sim ⬜ Não
- [ ] Pode ser extraído se necessário? ⬜ Sim ⬜ Não
- [ ] Módulos bem organizados? ⬜ Sim ⬜ Não
- **Score**: \_\_\_/4 (meta: 4/4)

### 🐌 Viscosidade

- [ ] Design preservado? ⬜ Sim ⬜ Não
- [ ] Padrões seguidos? ⬜ Sim ⬜ Não
- [ ] Build rápido (<5 min)? ⬜ Sim ⬜ Não
- [ ] Testes rápidos (<10 min)? ⬜ Sim ⬜ Não
- **Score**: \_\_\_/4 (meta: 4/4)

### 📊 Score Total

- **Total**: \_\_\_/16
- **Saúde do Sistema**:
  - 14-16: ✅ Saudável
  - 10-13: ⚠️ Atenção necessária
  - 6-9: 🟠 Deterioração moderada
  - 0-5: 🔴 Deterioração severa (refatoração urgente)
```

---

## 🎯 Recomendações por Score

### ✅ Saudável (14-16 pontos)

**Ação**: Manter boas práticas

- Continue aplicando as regras em `.claude/rules/`
- Monitore métricas regularmente
- Compartilhe boas práticas com o time

### ⚠️ Atenção (10-13 pontos)

**Ação**: Refatoração preventiva

- Identificar áreas problemáticas
- Planejar refatoração gradual
- Aumentar cobertura de testes
- Revisar arquitetura em specs/

### 🟠 Deterioração Moderada (6-9 pontos)

**Ação**: Refatoração prioritária

- Parar novas features temporariamente
- Focar em melhorias técnicas
- Aplicar Boy Scout Rule (Regra 039)
- Consultar `specs/` para realinhamento

### 🔴 Deterioração Severa (0-5 pontos)

**Ação**: Intervenção urgente

- **ALERTA**: Sistema em risco
- Considerar reescrita de módulos críticos
- Estabelecer padrões claros
- Treinamento do time em boas práticas
- Revisão arquitetural completa

---

## 🔗 Integração com Regras

Os sinais de deterioração estão diretamente relacionados às regras em `.claude/rules/`:

| Sinal              | Regras Relacionadas                               |
| ------------------ | ------------------------------------------------- |
| 🔒 **Rigidez**     | 010 (SRP), 021 (DRY), 014 (DIP)                   |
| 💔 **Fragilidade** | 014 (DIP), 036 (Side Effects), 032 (Testes)       |
| ⚓ **Imobilidade** | 021 (DRY), 010 (SRP), 015-017 (Pacotes)           |
| 🐌 **Viscosidade** | 022 (KISS), 039 (Boy Scout), Arquitetura (specs/) |

---

## 📚 Referências

- **Clean Architecture** - Robert C. Martin
- **Regras do Projeto**: `.claude/rules/`
- **Arquitetura**: `specs/`
- **Princípios SOLID**: Regras 010-014

---

**Versão**: 1.0
**Baseado em**: Clean Architecture by Uncle Bob
**Última atualização**: 2025-11-04

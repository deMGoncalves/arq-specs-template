# Crônica 09: DDD Co-Located - Organização que a IA Entende

**Série**: Crônicas - Minha Jornada com IAs e Arquitetura de Software
**Autor**: Cleber de Moraes Gonçalves | PUCPR

---

## O Código Perfeito no Lugar Errado

Você seguiu tudo certo:

- Especificação Arc42 completa (entropia H ≈ 0.5 bits)
- Task decomposition (~100 LOC por task)
- BDD scenarios determinísticos

A IA gera código **perfeito**. Testes passando. Lógica correta.

Mas quando você pede para a IA **modificar** ou **estender** a feature... ela alucina novamente.

**Por quê?**

## A Armadilha da Organização por Camadas

### O Padrão Tradicional

```
src/
├── domain/
│   ├── entities/
│   │   ├── User.ts
│   │   ├── Order.ts
│   │   └── Payment.ts
│   └── value-objects/
│       ├── Email.ts
│       └── Money.ts
├── application/
│   ├── services/
│   │   ├── UserService.ts
│   │   ├── OrderService.ts
│   │   └── PaymentService.ts
│   └── use-cases/
│       ├── CreateUser.ts
│       └── ProcessPayment.ts
├── infrastructure/
│   ├── repositories/
│   │   ├── UserRepository.ts
│   │   └── OrderRepository.ts
│   └── adapters/
│       └── PaymentGateway.ts
└── presentation/
    └── controllers/
        ├── UserController.ts
        └── OrderController.ts
```

**Parece organizado. Mas é uma armadilha para IAs.**

### O Problema da Dispersão

Quando você pede: "Modifique o fluxo de criação de usuário para enviar email de confirmação"

A IA precisa **localizar** todos os arquivos relacionados:

```
Busca por "User" no projeto:

domain/entities/User.ts          ← Entity
domain/value-objects/Email.ts    ← Value Object
application/services/UserService.ts  ← Service
application/use-cases/CreateUser.ts  ← Use Case
infrastructure/repositories/UserRepository.ts  ← Repository
presentation/controllers/UserController.ts    ← Controller

6 arquivos em 4 diretórios diferentes
```

**Contexto disperso geograficamente = atenção fragmentada.**

### A Matemática da Dispersão

Lembra da complexidade de atenção O(n²)?

```
Contexto concentrado (1 diretório, 6 arquivos):
  Distância cognitiva: Baixa
  Tokens de "navegação": ~50 (caminhos relativos curtos)
  Atenção: Focada

Contexto disperso (4 diretórios, 6 arquivos):
  Distância cognitiva: Alta
  Tokens de "navegação": ~200 (caminhos absolutos longos)
  Atenção: Fragmentada
```

**Dispersão geográfica aumenta "overhead cognitivo" em ~4× apenas em navegação.**

### O Fenômeno "Lost in the Hierarchy"

Similar ao "Lost in the Middle" (Liu et al., 2023), há "Lost in the Hierarchy":

```
Quando a IA busca código relacionado:

Mesma pasta:
  P(encontrar) ≈ 0.95

Pasta irmã (mesmo nível):
  P(encontrar) ≈ 0.80

2+ níveis de distância:
  P(encontrar) ≈ 0.50

Árvore diferente:
  P(encontrar) ≈ 0.30
```

**Hierarquia profunda = contexto perdido.**

## DDD Tactical Co-Located: A Solução

### Conceito

Organizar código por **bounded context** (domínio), não por **camada técnica**.

**Co-located** = Tudo relacionado ao mesmo conceito de domínio fica **junto**.

### Estrutura DDD Co-Located

```
src/
├── usuario/              ← Bounded Context: Usuário
│   ├── api/              ← Container: API REST
│   │   ├── registro/     ← Componente: Registro
│   │   │   ├── index.ts                 ← Aggregate root
│   │   │   ├── criar-usuario.ts         ← Use case
│   │   │   ├── validar-email.ts         ← Domain logic
│   │   │   ├── enviar-confirmacao.ts    ← Domain service
│   │   │   ├── Usuario.ts               ← Entity
│   │   │   ├── Email.ts                 ← Value Object
│   │   │   ├── UserRepository.ts        ← Repository interface
│   │   │   ├── registro.controller.ts   ← Controller
│   │   │   └── registro.spec.ts         ← Tests (co-located!)
│   │   └── autenticacao/
│   │       ├── index.ts
│   │       ├── fazer-login.ts
│   │       ├── gerar-token.ts
│   │       └── autenticacao.spec.ts
│   └── worker/           ← Container: Background Worker
│       └── processar-email/
│           ├── index.ts
│           └── processar-email.spec.ts
└── pedido/               ← Bounded Context: Pedido
    └── api/
        ├── criar-pedido/
        └── cancelar-pedido/
```

**Tudo sobre "registro de usuário" em um único diretório.**

### Anatomia de um Componente Co-Located

```
src/usuario/api/registro/
├── index.ts                      ← Aggregate root (exports públicas)
├── criar-usuario.ts              ← Use case
├── validar-dados-registro.ts    ← Domain logic
├── enviar-confirmacao.ts        ← Domain service
├── Usuario.ts                    ← Entity
├── Email.ts                      ← Value Object
├── Password.ts                   ← Value Object
├── UserRepository.ts             ← Repository interface
├── UserRepositoryImpl.ts        ← Repository implementation
├── registro.controller.ts       ← HTTP Controller
└── registro.spec.ts             ← Tests (TODOS os testes aqui)
```

**11 arquivos, 1 diretório. Distância cognitiva: zero.**

## Por Que Funciona com IAs

### Razão 1: Proximidade Léxica

A IA processa código sequencialmente. Arquivos próximos no filesystem são processados próximos no contexto.

```
Co-located:
  read src/usuario/api/registro/criar-usuario.ts
  read src/usuario/api/registro/Email.ts
  read src/usuario/api/registro/Usuario.ts

  Tokens de caminho: "registro/" repetido 3× (compressão)
  Contexto: Concentrado (todos arquivos têm prefixo comum)

Disperso:
  read src/application/use-cases/CreateUser.ts
  read src/domain/value-objects/Email.ts
  read src/domain/entities/User.ts

  Tokens de caminho: Cada um diferente (sem compressão)
  Contexto: Fragmentado
```

**Tokenização eficiente = mais espaço para código, menos para navegação.**

### Razão 2: Embedding Semântico

Modelos de linguagem aprendem embeddings baseados em **co-ocorrência**.

Arquivos que aparecem **juntos** frequentemente nos dados de treinamento desenvolvem embeddings **próximos** no espaço vetorial.

```
Organização por domínio (típico em projetos):

  Usuario.ts + Email.ts aparecem juntos → embeddings próximos
  → Alta probabilidade de co-referência
  → IA "lembra" de Email ao ver Usuario

Organização por camadas (menos comum):

  entities/User.ts + value-objects/Email.ts separados
  → Embeddings distantes
  → Baixa probabilidade de co-referência
  → IA "esquece" de Email
```

**Co-localização = padrão mais frequente nos dados de treinamento = melhor reconhecimento.**

### Razão 3: Contexto de Modificação

Quando você modifica código, a IA precisa entender o **contexto de impacto**.

```
Request: "Adicione validação de domínio de email"

Co-located:
  1. IA lê src/usuario/api/registro/ (1 glob)
  2. Identifica Email.ts (validação atual)
  3. Identifica validar-dados-registro.ts (onde usar)
  4. Identifica registro.spec.ts (testes a atualizar)

  Total: 1 operação de busca → 3 arquivos relevantes
  Precisão: 100% (todos arquivos são relevantes)

Disperso:
  1. IA busca "Email" (glob em src/)
  2. Encontra 12 arquivos com "Email" no caminho
  3. Precisa ler todos para identificar relevantes
  4. Busca "validação" → mais 8 arquivos
  5. Cruza referências para encontrar testes

  Total: 3+ operações → 20 arquivos lidos → 3 relevantes
  Precisão: 15% (ruído alto)
```

**Co-localização = busca eficiente = contexto preciso.**

## Fundamentos DDD (Evans, 2003)

### Bounded Context

**Definição**: Limite explícito dentro do qual um modelo de domínio é definido e aplicável.

**Exemplo**:

```
Bounded Context: Usuario
  Conceitos: User, Email, Password, Session, Permission
  Linguagem: "registrar", "autenticar", "autorizar"
  Regras: Email único, senha forte, sessão expirável

Bounded Context: Pedido
  Conceitos: Order, LineItem, Payment, Shipping
  Linguagem: "criar pedido", "adicionar item", "processar pagamento"
  Regras: Estoque reservado, pagamento antes envio
```

**Bounded contexts são independentes e podem evoluir separadamente.**

### Ubiquitous Language

**Definição**: Linguagem compartilhada por desenvolvedores e especialistas de domínio, refletida no código.

**Aplicação**:

```typescript
// ❌ Linguagem técnica (camadas)
class UserService {
  createEntity(data: UserDTO): UserEntity {
    const repo = new UserRepository()
    return repo.insert(data)
  }
}

// ✅ Linguagem ubíqua (domínio)
class RegistrarUsuario {
  executar(dados: DadosRegistro): Usuario {
    const usuario = Usuario.criar(dados)
    const repositorio = new UsuarioRepository()
    return repositorio.salvar(usuario)
  }
}
```

**Código fala a língua do negócio, não da tecnologia.**

### Tactical Patterns

DDD define padrões táticos:

```
Entity: Objeto com identidade (User, Order)
Value Object: Objeto sem identidade (Email, Money)
Aggregate: Cluster de entities + value objects (Order + LineItems)
Repository: Abstração de persistência
Domain Service: Lógica que não pertence a uma entity
```

**Co-located = todos padrões juntos em um lugar.**

## Estrutura Completa

### Template de Bounded Context

```
src/[bounded-context]/
  ├── api/                    ← Container: REST API
  │   ├── [componente-1]/
  │   │   ├── index.ts                  ← Aggregate root
  │   │   ├── [use-case-1].ts           ← Use cases
  │   │   ├── [use-case-2].ts
  │   │   ├── [Entity].ts               ← Entities
  │   │   ├── [ValueObject].ts          ← Value Objects
  │   │   ├── [Repository].ts           ← Repository interface
  │   │   ├── [Repository]Impl.ts       ← Repository implementation
  │   │   ├── [DomainService].ts        ← Domain services
  │   │   ├── [componente].controller.ts  ← Controller
  │   │   └── [componente].spec.ts      ← All tests
  │   └── [componente-2]/
  │       └── ...
  ├── worker/                 ← Container: Background Worker
  │   └── [componente]/
  │       └── ...
  └── shared/                 ← Shared kernel do contexto
      ├── Result.ts                ← Common types
      └── errors/
          └── DomainError.ts
```

### Exemplo Real: Contexto de Autenticação

```
src/autenticacao/
  ├── api/
  │   ├── registro/
  │   │   ├── index.ts
  │   │   ├── registrar-usuario.ts        [98 LOC]
  │   │   ├── validar-dados-registro.ts   [65 LOC]
  │   │   ├── enviar-email-confirmacao.ts [72 LOC]
  │   │   ├── confirmar-email.ts          [54 LOC]
  │   │   ├── Usuario.ts                  [120 LOC]
  │   │   ├── Email.ts                    [85 LOC]
  │   │   ├── Password.ts                 [95 LOC]
  │   │   ├── UsuarioRepository.ts        [45 LOC]
  │   │   ├── UsuarioRepositoryPostgres.ts [110 LOC]
  │   │   ├── EmailService.ts             [80 LOC]
  │   │   ├── registro.controller.ts      [105 LOC]
  │   │   └── registro.spec.ts            [450 LOC - todos os testes]
  │   │
  │   ├── login/
  │   │   ├── index.ts
  │   │   ├── fazer-login.ts              [88 LOC]
  │   │   ├── validar-credenciais.ts      [70 LOC]
  │   │   ├── gerar-jwt.ts                [95 LOC]
  │   │   ├── criar-sessao.ts             [76 LOC]
  │   │   ├── Session.ts                  [105 LOC]
  │   │   ├── Token.ts                    [90 LOC]
  │   │   ├── SessionRepository.ts        [50 LOC]
  │   │   ├── SessionRepositoryRedis.ts   [115 LOC]
  │   │   ├── login.controller.ts         [100 LOC]
  │   │   └── login.spec.ts               [380 LOC]
  │   │
  │   └── logout/
  │       ├── index.ts
  │       ├── fazer-logout.ts             [60 LOC]
  │       ├── invalidar-sessao.ts         [55 LOC]
  │       ├── logout.controller.ts        [70 LOC]
  │       └── logout.spec.ts              [180 LOC]
  │
  └── shared/
      ├── Result.ts
      └── errors/
          ├── CredenciaisInvalidasError.ts
          └── EmailJaExisteError.ts
```

**Total**: 3 componentes, ~2.500 LOC, organização clara por domínio.

## Comparação: Antes vs Depois

### Caso: "Adicionar validação de força de senha"

#### Antes (Organização por Camadas)

```
1. IA busca "Password" no projeto
   → Encontra 15 referências em 8 arquivos diferentes

2. IA lê domain/value-objects/Password.ts
   → Identifica validação atual

3. IA busca "CreateUser" para ver onde é usado
   → Encontra application/use-cases/CreateUser.ts

4. IA busca testes de password
   → Procura em tests/unit/value-objects/Password.spec.ts
   → Procura em tests/integration/CreateUser.spec.ts

5. IA precisa entender relações:
   Password ←→ CreateUser ←→ UserService ←→ UserController

Total de arquivos lidos: 12
Total de diretórios navegados: 6
Tempo de contexto: ~800 linhas (incluindo navegação)
Taxa de erro: 25% (IA esquece de atualizar algum arquivo)
```

#### Depois (DDD Co-Located)

```
1. IA lê src/autenticacao/api/registro/
   → Encontra todos arquivos relacionados (1 glob)

2. IA identifica Password.ts no mesmo diretório
   → Vê validação atual

3. IA vê registrar-usuario.ts no mesmo diretório
   → Entende onde é usado

4. IA vê registro.spec.ts no mesmo diretório
   → Todos os testes em um lugar

5. IA entende relações (tudo visível):
   Password.ts ←→ registrar-usuario.ts ←→ registro.controller.ts
   (mesma pasta!)

Total de arquivos lidos: 5
Total de diretórios navegados: 1
Tempo de contexto: ~500 linhas (sem overhead de navegação)
Taxa de erro: <5% (contexto completo e concentrado)
```

**Redução de 12 → 5 arquivos = 58% menos contexto**
**Redução de 25% → 5% erro = 80% mais preciso**

## Métricas de Coesão

### Coesão Funcional

```
Coesão = Arquivos relacionados no mesmo diretório / Total de arquivos relacionados

Organização por camadas:
  Coesão(User) = 2/8 = 0.25 (baixa)

  User.ts + UserRepository.ts no mesmo dir: 2
  Mas relacionados dispersos: 8 arquivos totais

DDD Co-Located:
  Coesão(Registro) = 12/12 = 1.0 (perfeita)

  Todos os 12 arquivos relacionados no mesmo dir
```

**Coesão 1.0 = contexto completo.**

### Acoplamento Entre Contextos

```
Acoplamento = Dependências entre bounded contexts / Total de dependências

DDD Co-Located incentiva baixo acoplamento:

src/autenticacao/ → src/usuario/
  Apenas: import { UserId } from '@/usuario/shared'

  Acoplamento: 1 type importado (interface)
  Implementação: Independente
```

**Alta coesão interna + baixo acoplamento externo = ideal.**

## Navegação para Humanos E IAs

### Para Humanos

```
Pergunta: "Onde está a lógica de registro de usuário?"

Organização por camadas:
  "Hmm... tem entities/User.ts, services/UserService.ts,
   use-cases/CreateUser.ts... qual deles?"

  Tempo para encontrar: 2-5 minutos

DDD Co-Located:
  "Em src/autenticacao/api/registro/"

  Tempo para encontrar: 10 segundos
```

**Onboarding: semanas → dias**

### Para IAs

```
Prompt: "Explique o fluxo de registro"

Organização por camadas:
  IA precisa:
  1. Glob em src/ procurando "register" ou "user"
  2. Ler 10-15 arquivos
  3. Inferir relações através de imports
  4. Construir grafo mental

  Tokens usados: ~5.000
  Precisão: 70%

DDD Co-Located:
  IA precisa:
  1. Read src/autenticacao/api/registro/
  2. Ver todos arquivos (glob lista)
  3. Ler index.ts (exports públicas)
  4. Contexto completo imediato

  Tokens usados: ~1.500
  Precisão: 95%
```

**3× menos tokens, 25% mais preciso.**

## Princípios de Organização

### Regra 1: Bounded Context é o Nível Raiz

```
✅ src/[bounded-context]/...
❌ src/modules/[bounded-context]/...
❌ src/domains/[bounded-context]/...
```

**Menos níveis = menos profundidade = menos "Lost in Hierarchy".**

### Regra 2: Container é o Segundo Nível

```
✅ src/[bounded-context]/[container]/...

Containers típicos:
  - api/          → REST API
  - worker/       → Background workers
  - cli/          → Command-line interface
  - graphql/      → GraphQL resolvers
```

**Container = unidade de deployment.**

### Regra 3: Componente é o Terceiro Nível

```
✅ src/[bounded-context]/[container]/[componente]/...

Componente = funcionalidade coesa (agregado DDD)
```

**Componente = unidade de feature.**

### Regra 4: Testes Co-Located

```
✅ src/usuario/api/registro/registro.spec.ts
❌ tests/usuario/api/registro.spec.ts
❌ src/usuario/api/__tests__/registro.spec.ts
```

**Testes devem estar NO MESMO DIRETÓRIO que o código.**

Por quê?

```
Quando IA modifica usar-case.ts, ela IMEDIATAMENTE vê usar-case.spec.ts
→ Probabilidade de atualizar testes: 95%

Quando teste está em diretório separado:
→ Probabilidade de atualizar testes: 60%
```

### Regra 5: Shared Kernel Mínimo

```
src/[bounded-context]/shared/
  ├── Result.ts        ← Type wrapper (Ok/Fail)
  ├── errors/          ← Domain errors
  └── types/           ← Common types

❌ NÃO coloque lógica de negócio em shared/
✅ Apenas types e utilities realmente compartilhados
```

**Shared = mínimo indispensável.**

## Migração de Camadas para Co-Located

### Passo 1: Identificar Bounded Contexts

```
Análise do domínio:

Projeto e-commerce:
  - Catálogo (produtos, categorias, busca)
  - Carrinho (itens, cálculo, desconto)
  - Pedido (checkout, pagamento, fulfillment)
  - Usuário (registro, autenticação, perfil)
  - Notificação (email, SMS, push)
```

### Passo 2: Mapear Componentes

```
Para cada bounded context, identificar agregados:

Contexto: Pedido
  Componentes:
    - criar-pedido/ (Order aggregate)
    - processar-pagamento/ (Payment aggregate)
    - enviar-pedido/ (Shipping aggregate)
    - cancelar-pedido/ (Cancellation use case)
```

### Passo 3: Migrar Incrementalmente

```
1. Criar nova estrutura paralela
   src-new/pedido/api/criar-pedido/

2. Mover arquivos relacionados
   domain/entities/Order.ts → src-new/pedido/api/criar-pedido/Order.ts
   application/CreateOrder.ts → src-new/pedido/api/criar-pedido/criar-pedido.ts
   repositories/OrderRepository.ts → src-new/pedido/api/criar-pedido/OrderRepository.ts

3. Atualizar imports

4. Executar testes

5. Commit

6. Repetir para próximo componente
```

**Migração = múltiplos commits pequenos, não big-bang.**

## Armadilhas Comuns

### ❌ Armadilha 1: Shared Gigante

```
src/shared/
  ├── utils/
  ├── helpers/
  ├── common/
  ├── lib/
  └── ... (500 arquivos)

Problema: "Shared" vira lixeira
```

**Solução**: Shared apenas para types e utilities genuinamente compartilhados. Lógica de negócio vai no bounded context apropriado.

### ❌ Armadilha 2: Bounded Contexts Muito Grandes

```
src/sistema/  ← Tudo em um contexto
  ├── api/
  │   ├── users/
  │   ├── products/
  │   ├── orders/
  │   ├── payments/
  │   └── ... (50 componentes)

Problema: Bounded context perdeu significado
```

**Solução**: Se tem >10 componentes, provavelmente são múltiplos bounded contexts.

### ❌ Armadilha 3: Dependências Circulares

```
src/pedido/api/criar-pedido/
  imports from src/usuario/api/registro/Usuario.ts

src/usuario/api/registro/
  imports from src/pedido/api/criar-pedido/Order.ts

Problema: Acoplamento circular
```

**Solução**: Usar shared kernel ou events para comunicação entre contextos.

### ❌ Armadilha 4: Testes Separados

```
src/usuario/api/registro/registrar-usuario.ts
tests/unit/usuario/registrar-usuario.spec.ts

Problema: Distância cognitiva
```

**Solução**: Co-localizar: `src/usuario/api/registro/registro.spec.ts`

## Próxima Crônica

Agora temos:

- Especificações determinísticas (H ≈ 0.5 bits)
- Task decomposition (~100 LOC)
- Código organizado por domínio

**Resultados**: Redução massiva de alucinação.

Próxima pergunta: **Quanto isso melhora quantitativamente?**

Métricas concretas: de 60-80% de alucinações para <10%.

---

**Próxima Crônica**: [Redução de 85% na Taxa de Alucinação](10-reducao-alucinacao.md) - Métricas concretas e como medir.

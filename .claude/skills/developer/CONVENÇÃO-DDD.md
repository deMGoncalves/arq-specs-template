# Convenção: DDD Tático e Organização de Código

## 📌 Regra Principal

> **TODO código implementado DEVE seguir os padrões de DDD Tático definidos em `tatical-design.md`**

## 🎯 Objetivo

Garantir que toda implementação de código siga princípios de Domain-Driven Design, com foco em:

- Organização por capacidade de negócio (não por camadas técnicas)
- Aplicação correta de padrões táticos (Aggregates, Entities, Value Objects, etc.)
- Linguagem ubíqua refletida no código
- Screaming Architecture (estrutura grita o negócio)

## 📂 Estrutura de Pastas Obrigatória

### Padrão Co-Located

```
/src/
  /[bounded-context]/        # Contexto delimitado (domínio)
    /[container]/            # Agrupamento funcional
      /[component]/          # Componente de negócio (agregado)
        - index.ts           # Aggregate Root
        - criar.ts           # Factory/construtor
        - persistir.ts       # Repository
        - [acao].ts          # Casos de uso (semântica de negócio)
        - [ValueObject].ts   # Value objects inline
        - [Entity].ts        # Entidades internas inline
        - [Event].ts         # Eventos de domínio
        - [Policy].ts        # Políticas/especificações
        - [component].spec.ts # Testes
        - adapters.ts        # Adaptadores infra (se necessário)
```

### ✅ Exemplo Real: Sistema de Vendas

```
/src/
  /vendas/                   # Bounded Context
    /pedidos/                # Container
      /pedido/               # Component (Agregado)
        - index.ts           # Pedido (Aggregate Root)
        - criar.ts           # Construir novos pedidos
        - persistir.ts       # Salvar e buscar pedidos
        - confirmar.ts       # Confirmar pedido
        - cancelar.ts        # Cancelar pedido
        - aplicar-desconto.ts # Aplicar desconto
        - pedido.spec.ts     # Testes
        - ValorMonetario.ts  # Value Object
        - EnderecoEntrega.ts # Value Object
        - ItemPedido.ts      # Entidade interna
        - PedidoCriado.ts    # Evento de domínio
        - PedidoConfirmado.ts # Evento
        - PodeSerCancelado.ts # Política/especificação
        - DescontoMaximo.ts  # Regra de negócio
      /carrinho/             # Outro component
        - index.ts
        - adicionar-item.ts
        - remover-item.ts
        - calcular-total.ts
        - carrinho.spec.ts
```

### ❌ Evitar: Organização por Camadas Técnicas

```
/src/
  /domain/
    /entities/
      - Pedido.ts
      - ItemPedido.ts
    /value-objects/
      - ValorMonetario.ts
    /services/
      - PedidoService.ts
  /application/
    /use-cases/
      - ConfirmarPedidoUseCase.ts
  /infrastructure/
    /repositories/
      - PedidoRepositoryImpl.ts
```

## 🎨 Convenções de Nomeação

### Arquivos de Negócio (Semântica)

| Tipo           | Padrão                | Exemplo                                     | Descrição                      |
| -------------- | --------------------- | ------------------------------------------- | ------------------------------ |
| Aggregate Root | `index.ts`            | `index.ts`                                  | Entidade principal do agregado |
| Factory        | `criar.ts`            | `criar.ts`                                  | Construção de agregados        |
| Repository     | `persistir.ts`        | `persistir.ts`                              | Persistência e recuperação     |
| Use Case       | `[acao-negocio].ts`   | `confirmar.ts`, `cancelar.ts`               | Ações de negócio               |
| Value Object   | `[Conceito].ts`       | `ValorMonetario.ts`, `Email.ts`             | Conceitos de domínio           |
| Entity         | `[Entidade].ts`       | `ItemPedido.ts`, `Endereco.ts`              | Entidades internas             |
| Domain Event   | `[EventoPassado].ts`  | `PedidoCriado.ts`, `PagamentoConfirmado.ts` | Eventos                        |
| Specification  | `[Condicao].ts`       | `PodeSerCancelado.ts`, `EstaAtivo.ts`       | Regras reutilizáveis           |
| Tests          | `[component].spec.ts` | `pedido.spec.ts`                            | Testes (sufixo obrigatório)    |

### Princípios de Nomeação

1. **Semântica sobre Sufixos**: Nome descreve O QUÊ é, não tipo técnico

   - ✅ `confirmar.ts` (ação de negócio)
   - ❌ `ConfirmarPedidoUseCase.ts` (tipo técnico)

2. **Linguagem Ubíqua**: Usar termos do domínio

   - ✅ `aplicar-desconto.ts`
   - ❌ `apply-discount-service.ts`

3. **Eventos no Passado**: Algo que JÁ aconteceu

   - ✅ `PedidoCriado.ts`
   - ❌ `CriarPedido.ts`

4. **Conceitos em PascalCase**: Value Objects e Entities

   - ✅ `ValorMonetario.ts`
   - ❌ `valor_monetario.ts`

5. **Ações em kebab-case**: Use cases e factories
   - ✅ `criar.ts`, `confirmar-pagamento.ts`
   - ❌ `Create.ts`, `ConfirmarPagamento.ts`

## 🏗️ Padrões Táticos Obrigatórios

### 1. Aggregates (Agregados)

**Regras:**

- [ ] Pequeno e coeso (máximo 5 entidades internas)
- [ ] Uma transação modifica apenas um agregado
- [ ] Aggregate Root protege invariantes
- [ ] Referências externas por ID
- [ ] Encapsula regras de negócio

**Estrutura:**

```typescript
// index.ts - Aggregate Root
export class Pedido {
  private constructor(
    private readonly id: PedidoId,
    private itens: ItemPedido[],
    private status: StatusPedido
  ) {
    this.validar();
  }

  // Protege invariante
  private validar(): void {
    if (this.itens.length === 0) {
      throw new Error("Pedido deve ter pelo menos um item");
    }
  }

  // Comportamento de negócio
  confirmar(): PedidoConfirmado {
    if (this.status !== StatusPedido.NOVO) {
      throw new Error("Apenas pedidos novos podem ser confirmados");
    }
    this.status = StatusPedido.CONFIRMADO;
    return new PedidoConfirmado(this.id);
  }
}
```

### 2. Entities (Entidades)

**Regras:**

- [ ] Tem identidade única (ID)
- [ ] Igualdade por ID
- [ ] Contém comportamento de negócio
- [ ] Sempre em estado válido

**Estrutura:**

```typescript
// ItemPedido.ts - Entity
export class ItemPedido {
  constructor(
    private readonly id: ItemId,
    private produtoId: ProdutoId,
    private quantidade: number,
    private precoUnitario: ValorMonetario
  ) {
    if (quantidade <= 0) {
      throw new Error("Quantidade deve ser positiva");
    }
  }

  alterarQuantidade(nova: number): void {
    if (nova <= 0) throw new Error("Quantidade inválida");
    this.quantidade = nova;
  }

  calcularTotal(): ValorMonetario {
    return this.precoUnitario.multiplicar(this.quantidade);
  }
}
```

### 3. Value Objects (Objetos de Valor)

**Regras:**

- [ ] Imutável (SEMPRE)
- [ ] Sem identidade (sem ID)
- [ ] Igualdade por valor
- [ ] Métodos retornam novo objeto
- [ ] Validação no construtor

**Estrutura:**

```typescript
// ValorMonetario.ts - Value Object
export class ValorMonetario {
  private constructor(
    private readonly valor: number,
    private readonly moeda: string
  ) {
    if (valor < 0) {
      throw new Error("Valor não pode ser negativo");
    }
    if (!["BRL", "USD", "EUR"].includes(moeda)) {
      throw new Error("Moeda inválida");
    }
  }

  static criar(valor: number, moeda: string): ValorMonetario {
    return new ValorMonetario(valor, moeda);
  }

  // Retorna NOVO objeto (imutável)
  somar(outro: ValorMonetario): ValorMonetario {
    if (this.moeda !== outro.moeda) {
      throw new Error("Moedas diferentes");
    }
    return new ValorMonetario(this.valor + outro.valor, this.moeda);
  }

  multiplicar(fator: number): ValorMonetario {
    return new ValorMonetario(this.valor * fator, this.moeda);
  }
}
```

### 4. Domain Events (Eventos de Domínio)

**Regras:**

- [ ] Nomeado no passado
- [ ] Imutável
- [ ] Contém timestamp
- [ ] Carrega dados relevantes do momento

**Estrutura:**

```typescript
// PedidoCriado.ts - Domain Event
export class PedidoCriado {
  readonly occurredAt: Date;

  constructor(
    readonly pedidoId: PedidoId,
    readonly clienteId: ClienteId,
    readonly total: ValorMonetario,
    readonly itens: number
  ) {
    this.occurredAt = new Date();
  }
}
```

### 5. Repositories (Repositórios)

**Regras:**

- [ ] Um repositório por agregado
- [ ] Interface no domínio
- [ ] Implementação na infraestrutura
- [ ] Retorna agregados completos
- [ ] Métodos com semântica de negócio

**Estrutura:**

```typescript
// persistir.ts - Repository Interface
export interface PedidoRepository {
  salvar(pedido: Pedido): Promise<void>;
  buscarPorId(id: PedidoId): Promise<Pedido | null>;
  buscarPendentes(clienteId: ClienteId): Promise<Pedido[]>;
  buscarPorPeriodo(inicio: Date, fim: Date): Promise<Pedido[]>;
}

// adapters.ts - Repository Implementation (Infra)
export class PedidoRepositoryPostgres implements PedidoRepository {
  async salvar(pedido: Pedido): Promise<void> {
    // Implementação com PostgreSQL
  }

  async buscarPorId(id: PedidoId): Promise<Pedido | null> {
    // Implementação
  }
}
```

### 6. Factories (Fábricas)

**Regras:**

- [ ] Encapsula criação complexa
- [ ] Garante invariantes iniciais
- [ ] Múltiplos métodos para diferentes cenários

**Estrutura:**

```typescript
// criar.ts - Factory
export class PedidoFactory {
  static criarNovo(clienteId: ClienteId, itens: ItemPedido[]): Pedido {
    if (itens.length === 0) {
      throw new Error("Pedido deve ter itens");
    }

    const id = PedidoId.gerar();
    return new Pedido(id, clienteId, itens, StatusPedido.NOVO);
  }

  static criarDeCarrinho(carrinho: Carrinho): Pedido {
    const itens = carrinho.itens.map(
      (item) =>
        new ItemPedido(
          ItemId.gerar(),
          item.produtoId,
          item.quantidade,
          item.preco
        )
    );

    return this.criarNovo(carrinho.clienteId, itens);
  }
}
```

## 🎯 Responsabilidades por Agent

### Development Agent (@skill development)

**DEVE:**

1. ✅ Consultar `tatical-design.md` antes de implementar
2. ✅ Usar estrutura Co-Located (context/container/component)
3. ✅ Aplicar nomeação semântica
4. ✅ Implementar padrões táticos corretamente
5. ✅ Manter agregados pequenos
6. ✅ Proteger invariantes
7. ✅ Usar linguagem ubíqua
8. ✅ Encapsular regras no domínio

**NÃO DEVE:**

1. ❌ Organizar por camadas técnicas
2. ❌ Criar agregados grandes (>5 entidades)
3. ❌ Usar sufixos técnicos desnecessários
4. ❌ Expor estado interno sem controle
5. ❌ Permitir objetos em estado inválido
6. ❌ Colocar lógica de negócio fora do domínio
7. ❌ Acoplar domínio à infraestrutura

### Code Review Agent (@skill code-review)

**DEVE:**

1. ✅ Validar estrutura Co-Located
2. ✅ Verificar aplicação de padrões táticos
3. ✅ Conferir nomeação semântica
4. ✅ Validar tamanho de agregados
5. ✅ Verificar imutabilidade de Value Objects
6. ✅ Confirmar encapsulamento de invariantes
7. ✅ Validar uso de linguagem ubíqua

### Analyst Agent (@skill analyst)

**DEVE:**

1. ✅ Identificar bounded contexts
2. ✅ Definir agregados e suas fronteiras
3. ✅ Estabelecer linguagem ubíqua
4. ✅ Planejar estrutura de componentes

## 📋 Checklist de Conformidade

Ao implementar código, verificar:

### Estrutura

- [ ] Organização Co-Located aplicada
- [ ] Estrutura: context/container/component
- [ ] Arquivos com nomeação semântica
- [ ] Sem subpastas técnicas desnecessárias
- [ ] Tudo relacionado junto (flat structure)

### Agregados

- [ ] Agregados pequenos e coesos (<= 5 entidades)
- [ ] Uma transação por agregado
- [ ] Invariantes protegidas no Aggregate Root
- [ ] Referências externas por ID
- [ ] Regras de negócio encapsuladas

### Objetos de Domínio

- [ ] Entities com identidade clara
- [ ] Value Objects imutáveis
- [ ] Domain Events no passado
- [ ] Objetos sempre válidos
- [ ] Comportamento nos objetos

### Infraestrutura

- [ ] Repositories interface no domínio
- [ ] Implementação separada (adapters.ts)
- [ ] Factories para criação complexa
- [ ] Domínio independente de infra

### Linguagem

- [ ] Termos ubíquos aplicados
- [ ] Nomes semânticos (não técnicos)
- [ ] Consistência de terminologia
- [ ] Código autoexplicativo

## 🔍 Exemplos de Validação

### ✅ Conformidade Correta

```typescript
// /src/vendas/pedidos/pedido/confirmar.ts

export async function confirmarPedido(
  pedidoId: PedidoId,
  repository: PedidoRepository
): Promise<PedidoConfirmado> {
  const pedido = await repository.buscarPorId(pedidoId);

  if (!pedido) {
    throw new Error("Pedido não encontrado");
  }

  // Regra de negócio no agregado
  const evento = pedido.confirmar();

  await repository.salvar(pedido);

  return evento;
}
```

**Por quê está correto:**

- ✅ Nomeação semântica (`confirmar.ts`)
- ✅ Regra no agregado (`pedido.confirmar()`)
- ✅ Repository como interface
- ✅ Retorna evento de domínio

### ❌ Não Conformidade

```typescript
// /src/application/services/PedidoService.ts

export class PedidoService {
  async confirmarPedido(pedidoId: string): Promise<void> {
    const pedido = await this.db.query(
      "SELECT * FROM pedidos WHERE id = ?",
      pedidoId
    );

    // Regra de negócio no service (ERRADO!)
    if (pedido.status !== "NOVO") {
      throw new Error("Status inválido");
    }

    await this.db.query(
      "UPDATE pedidos SET status = 'CONFIRMADO' WHERE id = ?",
      pedidoId
    );
  }
}
```

**Problemas:**

- ❌ Organização técnica (/services/)
- ❌ Sufixo técnico desnecessário (Service)
- ❌ Regra de negócio fora do agregado
- ❌ Acoplamento direto com BD
- ❌ Não usa objetos de domínio

## 📚 Referências

- **Canvas Completo**: `tatical-design.md`
- **Skill**: `SKILL.md`
- **README**: `README.md`

---

**Versão**: 1.0
**Criado em**: 2025-11-04
**Responsável**: Development Agent

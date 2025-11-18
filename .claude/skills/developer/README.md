# Development Agent - Guia de Organização de Código

Este diretório contém guias e padrões para desenvolvimento orientado a Domain-Driven Design (DDD).

## 📋 Propósito

Garantir que todo código implementado pelo Development Agent siga princípios sólidos de design de domínio, com foco em:

- ✅ **Organização Clara**: Estrutura que reflete o negócio
- ✅ **DDD Tático**: Aplicação correta de padrões DDD
- ✅ **Co-Location**: Componentes relacionados organizados juntos
- ✅ **Linguagem Ubíqua**: Código que fala a língua do negócio
- ✅ **Manutenibilidade**: Código fácil de entender e evoluir

## 📚 Arquivos Disponíveis

| Arquivo             | Descrição                            | Quando Consultar                |
| ------------------- | ------------------------------------ | ------------------------------- |
| `SKILL.md`          | Skill principal do Development Agent | Sempre ao iniciar implementação |
| `tatical-design.md` | **Guia completo de DDD Tático**      | SEMPRE ao organizar código      |
| `README.md`         | Este arquivo - visão geral           | Primeiro contato com a pasta    |
| `CONVENÇÃO-DDD.md`  | Convenção formal de aplicação DDD    | Dúvidas sobre padrões           |

## 🎯 Fluxo de Desenvolvimento

### Para Development Agent

Ao implementar código:

```bash
1. Ler .agent-task.md
   - Entender requisitos
   - Verificar checklist

2. Consultar tatical-design.md
   - Identificar bounded context
   - Planejar agregados
   - Definir estrutura de pastas
   - Escolher padrões táticos apropriados

3. Implementar seguindo padrões
   - Estrutura Co-Located
   - Nomeação semântica
   - Encapsulamento de regras
   - Linguagem ubíqua

4. Validar contra checklist tático
   - Verificar agregados
   - Validar invariantes
   - Confirmar imutabilidade
   - Revisar nomeação

5. Atualizar .agent-task.md
   - Marcar itens completos
   - Documentar decisões
```

### Para Desenvolvedores

Ao adicionar nova feature:

```bash
1. Identificar o bounded context
   - A feature pertence a qual contexto?
   - Qual é a linguagem ubíqua?

2. Planejar agregados
   - Quais são os agregados envolvidos?
   - Quais são as invariantes?
   - Qual é o tamanho apropriado?

3. Definir estrutura
   /src/[context]/[container]/[component]/
     - index.ts (Aggregate Root)
     - criar.ts (Factory)
     - persistir.ts (Repository)
     - [acao].ts (Use Cases)
     - [ValueObject].ts
     - [Entity].ts
     - [Event].ts
     - [component].spec.ts

4. Implementar padrões táticos
   - Entities com comportamento
   - Value Objects imutáveis
   - Domain Events no passado
   - Repositories por agregado
   - Factories para criação complexa
```

## 📖 Estrutura de Código (Co-Location)

### Princípio Base

> **A estrutura deve GRITAR o negócio, não as camadas técnicas**

### ✅ Bom Exemplo (Co-Located)

```
/src/vendas/pedidos/pedido/
  - index.ts              # Pedido (Aggregate Root)
  - criar.ts              # Construir pedido
  - persistir.ts          # Salvar/buscar
  - confirmar.ts          # Confirmar pedido
  - cancelar.ts           # Cancelar pedido
  - ValorMonetario.ts     # Value Object
  - ItemPedido.ts         # Entity
  - PedidoCriado.ts       # Domain Event
  - PodeSerCancelado.ts   # Specification
  - pedido.spec.ts        # Testes
```

**Por quê é bom?**

- 🎯 Nomes semânticos (confirmar, cancelar)
- 🎯 Tudo relacionado junto
- 🎯 Estrutura flat (fácil navegar)
- 🎯 Screaming Architecture

### ❌ Mau Exemplo (Técnico)

```
/src/
  /domain/
    /entities/
      - Pedido.ts
      - ItemPedido.ts
    /value-objects/
      - ValorMonetario.ts
  /application/
    /services/
      - PedidoService.ts
    /use-cases/
      - ConfirmarPedidoUseCase.ts
  /infrastructure/
    /repositories/
      - PedidoRepository.ts
```

**Por quê é ruim?**

- ❌ Organização técnica, não de negócio
- ❌ Componentes relacionados separados
- ❌ Difícil encontrar tudo sobre "pedido"
- ❌ Muitas subpastas desnecessárias

## 🔑 Padrões Táticos DDD

### 1. Aggregates (Agregados)

**O quê:** Grupo de objetos tratados como unidade para mudanças de dados.

**Regras:**

- Pequeno e coeso (evitar agregados grandes)
- Uma transação = um agregado modificado
- Referências entre agregados por ID
- Aggregate Root protege invariantes

**Exemplo:**

```typescript
// index.ts - Aggregate Root
class Pedido {
  private constructor(
    private readonly id: PedidoId,
    private itens: ItemPedido[],
    private status: StatusPedido
  ) {}

  // Protege invariante: "pedido deve ter itens"
  adicionarItem(item: ItemPedido): void {
    if (this.itens.length >= 10) {
      throw new Error("Máximo 10 itens");
    }
    this.itens.push(item);
  }
}
```

### 2. Entities (Entidades)

**O quê:** Objeto com identidade única que persiste ao longo do tempo.

**Regras:**

- Tem ID único
- Igualdade por ID
- Pode mudar atributos mas mantém identidade
- Contém comportamento de negócio

**Exemplo:**

```typescript
// ItemPedido.ts - Entity
class ItemPedido {
  constructor(
    private readonly id: ItemId,
    private produto: ProdutoId,
    private quantidade: number
  ) {}

  alterarQuantidade(nova: number): void {
    if (nova <= 0) throw new Error("Quantidade inválida");
    this.quantidade = nova;
  }
}
```

### 3. Value Objects (Objetos de Valor)

**O quê:** Objeto definido por seus atributos, sem identidade própria.

**Regras:**

- Imutável (sempre)
- Sem ID
- Igualdade por valor
- Métodos retornam novo objeto

**Exemplo:**

```typescript
// ValorMonetario.ts - Value Object
class ValorMonetario {
  private constructor(
    private readonly valor: number,
    private readonly moeda: string
  ) {
    if (valor < 0) throw new Error("Valor negativo");
  }

  somar(outro: ValorMonetario): ValorMonetario {
    return new ValorMonetario(this.valor + outro.valor, this.moeda);
  }
}
```

### 4. Domain Events (Eventos de Domínio)

**O quê:** Registro de algo que aconteceu no domínio.

**Regras:**

- Nomeado no passado (PedidoCriado, PagamentoConfirmado)
- Imutável
- Contém timestamp
- Carrega dados relevantes

**Exemplo:**

```typescript
// PedidoCriado.ts - Domain Event
class PedidoCriado {
  constructor(
    readonly pedidoId: PedidoId,
    readonly clienteId: ClienteId,
    readonly total: ValorMonetario,
    readonly occurredAt: Date = new Date()
  ) {}
}
```

### 5. Repositories (Repositórios)

**O quê:** Interface para persistir/recuperar agregados.

**Regras:**

- Um repositório por agregado
- Interface no domínio, implementação na infra
- Retorna agregados completos
- Métodos de busca com semântica de negócio

**Exemplo:**

```typescript
// persistir.ts - Repository
interface PedidoRepository {
  salvar(pedido: Pedido): Promise<void>;
  buscarPorId(id: PedidoId): Promise<Pedido | null>;
  buscarPedidosPendentes(clienteId: ClienteId): Promise<Pedido[]>;
}
```

### 6. Factories (Fábricas)

**O quê:** Encapsula lógica complexa de criação.

**Regras:**

- Usar quando criação é complexa
- Garante invariantes iniciais
- Múltiplos métodos para diferentes cenários

**Exemplo:**

```typescript
// criar.ts - Factory
class PedidoFactory {
  static criarNovo(clienteId: ClienteId): Pedido {
    const id = PedidoId.gerar();
    return new Pedido(id, clienteId, [], StatusPedido.NOVO);
  }

  static criarDeCarrinho(carrinho: Carrinho): Pedido {
    // Lógica complexa de conversão
    const itens = carrinho.itens.map(i => new ItemPedido(...));
    return new Pedido(PedidoId.gerar(), carrinho.clienteId, itens, StatusPedido.NOVO);
  }
}
```

## ⚠️ Regras Obrigatórias

### DO ✅

1. ✅ Sempre consulte `tatical-design.md` antes de implementar
2. ✅ Use estrutura Co-Located (context/container/component)
3. ✅ Nomeie arquivos semanticamente (ações, não tipos)
4. ✅ Mantenha agregados pequenos
5. ✅ Proteja invariantes no Aggregate Root
6. ✅ Torne Value Objects imutáveis
7. ✅ Nomeie eventos no passado
8. ✅ Use linguagem ubíqua do domínio
9. ✅ Encapsule regras nos objetos de domínio
10. ✅ Mantenha objetos sempre válidos

### DON'T ❌

1. ❌ Não organize por camadas técnicas (services/, repositories/)
2. ❌ Não use sufixos técnicos desnecessários (PedidoService, PedidoEntity)
3. ❌ Não crie agregados grandes (> 5 entidades)
4. ❌ Não exponha estado interno (getters/setters indiscriminados)
5. ❌ Não permita objetos em estado inválido
6. ❌ Não coloque lógica de negócio em services de aplicação
7. ❌ Não acople domínio à infraestrutura
8. ❌ Não referencie agregados diretamente (use IDs)
9. ❌ Não modifique múltiplos agregados na mesma transação
10. ❌ Não misture termos técnicos com ubíquos

## 📊 Checklist de Qualidade Tática

Use este checklist ao revisar código:

### Agregados

- [ ] Agregados são pequenos e coesos
- [ ] Um agregado por transação
- [ ] Invariantes são protegidas
- [ ] Referências entre agregados são por ID

### Entidades e Value Objects

- [ ] Entidades têm identidade clara
- [ ] Value Objects são imutáveis
- [ ] Lógica de negócio está nos objetos de domínio
- [ ] Objetos nunca em estado inválido

### Eventos

- [ ] Eventos nomeados no passado
- [ ] Eventos são imutáveis
- [ ] Eventos capturam dados relevantes

### Repositórios

- [ ] Um repositório por agregado
- [ ] Interface independente de infraestrutura
- [ ] Retornam agregados completos

### Geral

- [ ] Linguagem ubíqua no código
- [ ] Regras de negócio explícitas
- [ ] Infraestrutura separada do domínio
- [ ] Testes expressam regras de negócio
- [ ] Estrutura Co-Located aplicada
- [ ] Nomeação semântica consistente

## 🔗 Referências

- **Guia Completo**: `tatical-design.md` - Canvas completo de DDD Tático
- **Skill**: `SKILL.md` - Instruções do Development Agent
- **Convenção**: `CONVENÇÃO-DDD.md` - Regras formais de aplicação

### Literatura Recomendada

- [Domain-Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) - Eric Evans
- [Implementing Domain-Driven Design](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577) - Vaughn Vernon
- [DDD Reference](https://www.domainlanguage.com/ddd/reference/) - Eric Evans

---

**Versão**: 1.0
**Última atualização**: 2025-11-04
**Responsável**: Development Agent

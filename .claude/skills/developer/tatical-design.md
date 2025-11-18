# DDD Tactical Design Canvas - Especificação para Implementação

## Visão Geral

Este canvas guia a implementação dos padrões táticos do Domain-Driven Design, garantindo que o código reflita adequadamente o domínio de negócio.

---

## 1. BOUNDED CONTEXT

### Identificação

- **Nome do Contexto**: [Nome claro e descritivo]
- **Propósito**: [Responsabilidade principal deste contexto]
- **Linguagem Ubíqua**: [Termos-chave específicos deste contexto]

### Fronteiras

- **O que está DENTRO**: [Conceitos e responsabilidades incluídas]
- **O que está FORA**: [Conceitos que pertencem a outros contextos]
- **Integrações**: [Outros contextos com os quais se comunica]

---

## 2. AGGREGATES (Agregados)

Para cada Agregado no contexto:

### Agregado: [Nome]

#### Aggregate Root (Raiz do Agregado)

- **Entidade Raiz**: [Nome da entidade principal]
- **Identificador**: [Tipo e formato do ID]
- **Invariantes Principais**:
  - [Regra de negócio que SEMPRE deve ser verdadeira]
  - [Outra regra invariante]

#### Entidades Internas

| Entidade | Propósito          | Identificador |
| -------- | ------------------ | ------------- |
| [Nome]   | [Responsabilidade] | [Tipo de ID]  |

#### Value Objects

| Value Object | Atributos            | Validações            |
| ------------ | -------------------- | --------------------- |
| [Nome]       | [Lista de atributos] | [Regras de validação] |

#### Fronteiras do Agregado

- **Tamanho**: [Pequeno/Médio - evitar agregados grandes]
- **Consistência**: [Quais regras devem ser consistentes dentro do agregado]
- **Transação**: [Uma transação = uma instância de agregado modificada]

---

## 3. ENTITIES (Entidades)

### Entidade: [Nome]

#### Características

- **Identidade**: [Como é identificada - ID único]
- **Continuidade**: [Persiste ao longo do tempo mesmo com atributos mudando]
- **Igualdade**: [Duas entidades são iguais se seus IDs são iguais]

#### Estrutura

```
Atributos:
- [nome]: [tipo] - [descrição]
- [nome]: [tipo] - [descrição]

Comportamentos (métodos de negócio):
- [método()]: [propósito e regras de negócio]
- [método()]: [propósito e regras de negócio]
```

#### Regras de Negócio

- [Regra 1 que a entidade deve garantir]
- [Regra 2 que a entidade deve garantir]

---

## 4. VALUE OBJECTS (Objetos de Valor)

### Value Object: [Nome]

#### Características

- **Imutabilidade**: ✓ Sim (sempre)
- **Igualdade por Valor**: ✓ Comparação por todos os atributos
- **Sem Identidade**: Não possui ID próprio

#### Estrutura

```
Atributos:
- [nome]: [tipo] - [descrição]
- [nome]: [tipo] - [descrição]

Validações:
- [regra de validação]
- [regra de validação]

Métodos:
- [método()]: [operação que retorna novo Value Object]
```

#### Exemplos

- **Válido**: `[exemplo de instância válida]`
- **Inválido**: `[exemplo que violaria regras]`

---

## 5. DOMAIN EVENTS (Eventos de Domínio)

### Evento: [Nome no passado - algo que ACONTECEU]

#### Características

- **Timestamp**: [Quando ocorreu]
- **Imutável**: Não pode ser alterado após criação
- **Representa Fato**: Algo que já aconteceu no domínio

#### Estrutura

```
Dados do Evento:
- [campo]: [tipo] - [informação relevante]
- [campo]: [tipo] - [informação relevante]
- occurredAt: DateTime
- aggregateId: [tipo]
```

#### Gatilhos

- **Quando é disparado**: [Ação ou mudança de estado que gera o evento]
- **Quem se interessa**: [Outros agregados/contextos que reagem a este evento]

#### Consequências

- [O que acontece em resposta a este evento]
- [Processos ou agregados que devem reagir]

---

## 6. DOMAIN SERVICES (Serviços de Domínio)

### Serviço: [Nome do Serviço]

#### Quando Usar

- ✓ Operação não pertence naturalmente a nenhuma Entidade ou Value Object
- ✓ Operação envolve múltiplos agregados
- ✓ Lógica de domínio que é naturalmente stateless

#### Responsabilidade

[Descrição clara da operação de negócio que este serviço executa]

#### Assinatura

```
método([params]): [retorno]
  - Entrada: [o que recebe]
  - Saída: [o que retorna]
  - Efeitos: [mudanças de estado ou eventos disparados]
```

#### Regras de Negócio

- [Regra 1 que o serviço implementa]
- [Regra 2 que o serviço implementa]

---

## 7. REPOSITORIES (Repositórios)

### Repositório: [Nome + Repository]

#### Agregado Relacionado

- **Agregado**: [Nome do agregado gerenciado]
- **Aggregate Root**: [Entidade raiz]

#### Interface (Porta)

```
Operações:
- save([aggregate]): void
- findById([id]): [Aggregate] | null
- findBy[Criterio]([params]): [Aggregate[]]
- delete([id]): void
- [método de busca específico do domínio]
```

#### Responsabilidades

- ✓ Persistir e recuperar agregados completos
- ✓ Garantir que agregado seja reconstruído totalmente
- ✗ NÃO expor detalhes de infraestrutura
- ✗ NÃO retornar entidades internas do agregado

#### Queries de Negócio

- [Query 1]: [Propósito de negócio]
- [Query 2]: [Propósito de negócio]

---

## 8. FACTORIES (Fábricas)

### Factory: [Nome + Factory]

#### Quando Usar

- ✓ Criação de agregado é complexa
- ✓ Múltiplas formas de criar o objeto
- ✓ Construção requer validações elaboradas

#### Método de Criação

```
create[Contexto]([params]): [Aggregate]
  - Valida: [regras de validação]
  - Constrói: [passos de construção]
  - Garante: [invariantes iniciais]
```

#### Cenários de Criação

- **Cenário 1**: [Quando usar esta forma de criação]
- **Cenário 2**: [Quando usar outra forma]

---

## 9. SPECIFICATIONS (Especificações)

### Specification: [Nome + Specification]

#### Propósito

- Encapsular regra de negócio reutilizável
- Permitir composição de regras (AND, OR, NOT)
- Facilitar validações e queries

#### Regra

```
isSatisfiedBy([entity]): boolean
  - Verifica: [condição de negócio]
  - Retorna: true se satisfaz a especificação
```

#### Uso

- **Validação**: [Como usar para validar entidades]
- **Seleção**: [Como usar em queries/filtros]
- **Composição**: [Como combinar com outras specs]

---

## 10. CAMADA ANTICORRUPÇÃO

### Para integração com: [Sistema/Contexto Externo]

#### Tradutor

```
Entrada Externa -> Value Objects/Entidades do Domínio
- [Formato externo] -> [Formato interno]
- [Formato externo] -> [Formato interno]

Domínio -> Saída Externa
- [Formato interno] -> [Formato externo]
```

#### Proteções

- [Validação 1 antes de aceitar dados externos]
- [Transformação necessária para proteger o modelo]

---

## 11. CHECKLIST DE QUALIDADE TÁTICA

### Agregados

- [ ] Agregados são pequenos e coesos
- [ ] Um agregado por transação
- [ ] Invariantes são protegidas
- [ ] Referências entre agregados são por ID

### Entidades e Value Objects

- [ ] Entidades têm identidade clara
- [ ] Value Objects são imutáveis
- [ ] Lógica de negócio está nos objetos de domínio

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

---

## 12. PADRÕES DE IMPLEMENTAÇÃO

### Estrutura de Pastas Co-Located (Baseada em Componentes)

```
/src
  /[bounded-context]              # Contexto delimitado (linguagem ubíqua)
    /[container]                  # Container/módulo funcional
      /[component]                # Componente de negócio (agregado)
        - index.ts                # Aggregate Root
        - persistir.ts            # Repositório
        - criar.ts                # Factory/construtor
        - [component].spec.ts     # Testes (exigência framework)
        - [ValueObject].ts        # Value objects inline
        - [Entity].ts             # Entidades internas inline
        - [Event].ts              # Eventos inline
        - [Policy].ts             # Políticas/especificações inline
        - [UseCase].ts            # Casos de uso inline
        - adapters.ts             # Adaptadores de infraestrutura (se necessário)
```

**Exemplo Prático:**

```
/src
  /vendas                         # Bounded Context
    /pedidos                      # Container
      /pedido                     # Component (Agregado)
        - index.ts                # Pedido (Aggregate Root)
        - persistir.ts            # Salvar/buscar pedidos
        - criar.ts                # Construir novos pedidos
        - pedido.spec.ts          # Testes
        - ValorMonetario.ts       # Value Object
        - EnderecoEntrega.ts      # Value Object
        - ItemPedido.ts           # Entidade interna
        - PedidoCriado.ts         # Evento de domínio
        - PedidoConfirmado.ts     # Evento de domínio
        - PodeSerCancelado.ts     # Política/especificação
        - DescontoMaximo.ts       # Política/regra
        - ConfirmarPedido.ts      # Caso de uso
        - CancelarPedido.ts       # Caso de uso
        - adapters.ts             # Impl. persistência (opcional)
      /carrinho                   # Outro component
        - index.ts
        - adicionar-item.ts
        - calcular-total.ts
        - ...
```

**Princípio Chave:**
A estrutura deve ser **autoexplicativa** pela semântica de negócio, não por sufixos técnicos.

### Princípios de Código

1. **Sempre Válido**: Objetos de domínio nunca em estado inválido
2. **Tell, Don't Ask**: Comandos, não getters para regras
3. **Encapsulamento**: Proteger invariantes
4. **Imutabilidade**: Preferir objetos imutáveis quando possível
5. **Linguagem Ubíqua**: Nomes refletem o negócio
6. **Co-location**: Componentes relacionados ficam juntos
7. **Screaming Architecture**: Estrutura grita o negócio, não as camadas
8. **Semântica sobre Sufixos**: Nomes descrevem AÇÃO/CONCEITO, não tipo técnico

### Princípios de Organização (Co-location)

- **Contexto → Container → Component → Arquivos Semânticos**
- Organize por **capacidade de negócio**, não por tipo técnico
- **Sem subpastas técnicas**: tudo flat dentro do component
- **Nomes de alto nível**: `criar.ts`, `persistir.ts`, `confirmar.ts`
- **Sufixos apenas se framework exigir**: `.spec.ts`, `.test.ts`, `.e2e.ts`
- **index.ts** é o Aggregate Root (ponto de entrada)
- **Autoexplicativo**: desenvolvedor entende pelo contexto e nome semântico
- Infraestrutura inline (`adapters.ts`) ou externa se crescer muito

---

## 13. EXEMPLO PRÁTICO COM CO-LOCATION

### Contexto: Gestão de Pedidos (vendas)

**Estrutura Real:**

```
/src/vendas/pedidos/pedido
  - index.ts                  # Pedido (Aggregate Root)
  - criar.ts                  # Construir novos pedidos
  - persistir.ts              # Salvar e buscar pedidos
  - confirmar.ts              # Caso de uso: confirmar pedido
  - cancelar.ts               # Caso de uso: cancelar pedido
  - pedido.spec.ts            # Testes (sufixo obrigatório framework)
  - ValorMonetario.ts         # Value Object
  - EnderecoEntrega.ts        # Value Object
  - ItemPedido.ts             # Entidade interna
  - PedidoCriado.ts           # Evento de domínio
  - PedidoConfirmado.ts       # Evento
  - PodeSerCancelado.ts       # Política/especificação
  - DescontoMaximo.ts         # Regra de negócio
  - adapters.ts               # Adaptadores infra (opcional)
```

**Como Ler a Estrutura:**

```
Desenvolvedor abre /pedido e vê:
- "index.ts" → Ah, é o pedido em si
- "criar.ts" → Forma de criar pedidos
- "persistir.ts" → Como salvar/recuperar
- "confirmar.ts" → Ação de confirmar
- "cancelar.ts" → Ação de cancelar
- "PodeSerCancelado.ts" → Regra sobre cancelamento
- "ValorMonetario.ts" → Conceito de valor
```

**Vantagens:**

- ✅ **Semântica clara**: nomes dizem O QUE é, não o tipo técnico
- ✅ **Flat structure**: tudo em um nível, fácil de navegar
- ✅ **Screaming Architecture**: grita o negócio
- ✅ **Menos cerimônia**: sem sufixos desnecessários
- ✅ **Entendimento rápido**: desenvolvedor entende em segundos

---

## NOTAS DE USO

Este canvas deve ser preenchido iterativamente:

1. Comece identificando o Bounded Context
2. Descubra os Agregados principais
3. Refine Entidades e Value Objects
4. Identifique Eventos de Domínio importantes
5. Adicione Serviços apenas quando necessário
6. Defina Repositórios para cada Agregado

**Lembre-se**: DDD é sobre modelar o CONHECIMENTO do negócio em código, não sobre padrões técnicos.

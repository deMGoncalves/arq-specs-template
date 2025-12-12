# Exemplo: Regra 001 - Máximo 1 Nível de Indentação

**Regra**: Object Calisthenics - Regra 1
**Categoria**: Estrutura de Código
**Prioridade**: Alta
**Referência**: `.claude/rules/001-max-one-level-indentation.md`

---

## ❌ Código Ruim (Violação)

```typescript
// ❌ RUIM: 3 níveis de indentação
function processarPedidos(pedidos: Pedido[]): void {
  for (const pedido of pedidos) {                    // Nível 1
    if (pedido.status === 'pendente') {              // Nível 2
      if (pedido.valor > 1000) {                     // Nível 3 ❌
        pedido.aplicarDesconto(0.10);
      }
      pedido.confirmar();
    }
  }
}
```

**Problemas**:
- 😵 Complexidade cognitiva alta
- 🐛 Difícil de testar
- 📏 Viola Object Calisthenics Regra #1
- 🔄 Lógica aninhada é difícil de modificar

---

## ✅ Código Bom (Solução 1 - Early Return)

```typescript
// ✅ BOM: Máximo 1 nível de indentação com early return
function processarPedidos(pedidos: Pedido[]): void {
  for (const pedido of pedidos) {                    // Nível 1
    if (!deveSer Processado(pedido)) continue;       // Early return

    aplicarDescontoSeElegivel(pedido);
    pedido.confirmar();
  }
}

function deveSerProcessado(pedido: Pedido): boolean {
  return pedido.status === 'pendente';
}

function aplicarDescontoSeElegivel(pedido: Pedido): void {
  if (pedido.valor <= 1000) return;                  // Early return

  pedido.aplicarDesconto(0.10);
}
```

**Benefícios**:
- ✅ Apenas 1 nível de indentação
- ✅ Funções pequenas e focadas
- ✅ Fácil de testar individualmente
- ✅ Lógica de negócio clara

---

## ✅ Código Bom (Solução 2 - Extrair Métodos)

```typescript
// ✅ BOM: Extrair lógica para métodos
class ProcessadorDePedidos {
  processar(pedidos: Pedido[]): void {
    const pedidosPendentes = this.filtrarPendentes(pedidos);

    for (const pedido of pedidosPendentes) {         // Nível 1
      this.processarPedido(pedido);
    }
  }

  private filtrarPendentes(pedidos: Pedido[]): Pedido[] {
    return pedidos.filter(p => p.status === 'pendente');
  }

  private processarPedido(pedido: Pedido): void {
    this.aplicarDescontoSeAplicavel(pedido);
    pedido.confirmar();
  }

  private aplicarDescontoSeAplicavel(pedido: Pedido): void {
    if (pedido.valor <= 1000) return;

    pedido.aplicarDesconto(0.10);
  }
}
```

**Benefícios**:
- ✅ Cada método tem responsabilidade única
- ✅ Nomes de métodos documentam intenção
- ✅ Fácil de adicionar novos comportamentos
- ✅ Testável individualmente

---

## ✅ Código Bom (Solução 3 - Polimorfismo)

```typescript
// ✅ BOM: Usar polimorfismo para eliminar condicionais aninhadas
interface ProcessadorDePedido {
  processar(pedido: Pedido): void;
}

class ProcessadorPedidoPendente implements ProcessadorDePedido {
  processar(pedido: Pedido): void {
    this.aplicarDescontoSeAplicavel(pedido);
    pedido.confirmar();
  }

  private aplicarDescontoSeAplicavel(pedido: Pedido): void {
    if (pedido.valor <= 1000) return;

    pedido.aplicarDesconto(0.10);
  }
}

class ProcessadorPedidoConfirmado implements ProcessadorDePedido {
  processar(pedido: Pedido): void {
    // Lógica diferente para pedidos já confirmados
  }
}

// Factory pattern
class ProcessadorFactory {
  static criar(status: string): ProcessadorDePedido {
    const processadores: Record<string, ProcessadorDePedido> = {
      'pendente': new ProcessadorPedidoPendente(),
      'confirmado': new ProcessadorPedidoConfirmado(),
    };

    return processadores[status] || new ProcessadorPedidoNulo();
  }
}

// Uso
function processarPedidos(pedidos: Pedido[]): void {
  for (const pedido of pedidos) {                    // Nível 1
    const processador = ProcessadorFactory.criar(pedido.status);
    processador.processar(pedido);
  }
}
```

**Benefícios**:
- ✅ Elimina condicionais aninhadas completamente
- ✅ Open/Closed Principle (aberto para extensão)
- ✅ Adicionar novo status = nova classe (não modificar código existente)
- ✅ Cada processador é isolado e testável

---

## 📊 Comparação

| Aspecto | Código Ruim | Solução 1 | Solução 2 | Solução 3 |
|---------|-------------|-----------|-----------|-----------|
| Níveis de indentação | 3 ❌ | 1 ✅ | 1 ✅ | 1 ✅ |
| Complexidade ciclomática | 5 | 2 | 2 | 1 |
| Testabilidade | Baixa | Média | Alta | Muito Alta |
| Extensibilidade | Difícil | Média | Boa | Excelente |
| Linhas de código | 8 | 15 | 20 | 35 |

---

## 🧪 Testes

### Código Ruim (Difícil de Testar)
```typescript
// ❌ Precisa testar tudo junto
describe('processarPedidos', () => {
  it('deve processar pedido pendente com desconto', () => {
    const pedido = new Pedido({status: 'pendente', valor: 1500});
    processarPedidos([pedido]);

    expect(pedido.desconto).toBe(0.10);
    expect(pedido.status).toBe('confirmado');
  });

  // Difícil testar casos isolados
});
```

### Código Bom (Fácil de Testar)
```typescript
// ✅ Testa cada função independentemente
describe('deveSerProcessado', () => {
  it('retorna true para pedido pendente', () => {
    const pedido = new Pedido({status: 'pendente'});
    expect(deveSerProcessado(pedido)).toBe(true);
  });

  it('retorna false para pedido confirmado', () => {
    const pedido = new Pedido({status: 'confirmado'});
    expect(deveSerProcessado(pedido)).toBe(false);
  });
});

describe('aplicarDescontoSeElegivel', () => {
  it('aplica desconto para pedido acima de R$ 1000', () => {
    const pedido = new Pedido({valor: 1500});
    aplicarDescontoSeElegivel(pedido);
    expect(pedido.desconto).toBe(0.10);
  });

  it('não aplica desconto para pedido abaixo de R$ 1000', () => {
    const pedido = new Pedido({valor: 500});
    aplicarDescontoSeElegivel(pedido);
    expect(pedido.desconto).toBe(0);
  });
});
```

---

## 💡 Dicas Práticas

### Como Refatorar Código com Muita Indentação

1. **Identifique condições de guarda** → Use early return
2. **Extraia blocos de código** → Crie funções auxiliares
3. **Use polimorfismo** → Substitua condicionais por classes
4. **Inverta dependências** → Dependency Injection

### Sinais de Alerta
- 🚩 Mais de 2 níveis de indentação
- 🚩 Função com mais de 10 linhas
- 🚩 Múltiplos IFs aninhados
- 🚩 Loop dentro de loop com lógica complexa

### Exceções Raras
```typescript
// ⚠️ Aceitável em casos extremos bem justificados
function parseComplexData(data: unknown): ParsedData {
  try {                                              // Nível 1
    return JSON.parse(data);
  } catch (error) {                                  // Nível 1 (catch = mesmo nível)
    throw new ParseError('Dados inválidos');
  }
}
```

---

## 📚 Referências

- [Object Calisthenics - Jeff Bay](https://www.cs.helsinki.fi/u/luontola/tdd-2009/ext/ObjectCalisthenics.pdf)
- [Clean Code - Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- Regra completa: `.claude/rules/001-max-one-level-indentation.md`

---

**Exemplo criado para**: Demonstrar aplicação prática da Regra 001
**Use como referência**: Ao refatorar código existente ou escrever código novo

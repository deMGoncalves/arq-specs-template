# Exemplo: Regra 002 - Sem Cláusula ELSE

**Regra**: Object Calisthenics - Regra 2
**Categoria**: Estrutura de Código
**Prioridade**: Alta
**Referência**: `.claude/rules/002-no-else-clause.md`

---

## ❌ Código Ruim (Com ELSE)

```typescript
// ❌ RUIM: Usa ELSE
function calcularDesconto(cliente: Cliente): number {
  if (cliente.tipo === 'vip') {
    return 0.20;
  } else if (cliente.tipo === 'premium') {
    return 0.10;
  } else if (cliente.tipo === 'regular') {
    return 0.05;
  } else {
    return 0;
  }
}
```

**Problemas**:
- 😵 Caminhos de execução complexos
- 🐛 Difícil adicionar novos tipos sem modificar função
- 📏 Viola Open/Closed Principle
- 🔄 Cada mudança requer teste de todos os casos

---

## ✅ Código Bom (Solução 1 - Early Return)

```typescript
// ✅ BOM: Early return elimina ELSE
function calcularDesconto(cliente: Cliente): number {
  if (cliente.tipo === 'vip') return 0.20;
  if (cliente.tipo === 'premium') return 0.10;
  if (cliente.tipo === 'regular') return 0.05;

  return 0;
}
```

**Benefícios**:
- ✅ Sem cláusulas ELSE
- ✅ Fluxo linear e claro
- ✅ Fácil adicionar novos tipos
- ✅ Menos complexidade ciclomática

---

## ✅ Código Bom (Solução 2 - Lookup Table)

```typescript
// ✅ BOM: Usar objeto de lookup (melhor para dados)
const DESCONTOS_POR_TIPO: Record<TipoCliente, number> = {
  vip: 0.20,
  premium: 0.10,
  regular: 0.05,
  basico: 0,
};

function calcularDesconto(cliente: Cliente): number {
  return DESCONTOS_POR_TIPO[cliente.tipo] ?? 0;
}
```

**Benefícios**:
- ✅ Configuração separada de lógica
- ✅ Fácil manter/atualizar descontos
- ✅ Pode ser movido para configuração externa
- ✅ Zero condicionais

---

## ✅ Código Bom (Solução 3 - Polimorfismo)

```typescript
// ✅ BOM: Polimorfismo para lógica complexa
interface Cliente {
  calcularDesconto(): number;
}

class ClienteVIP implements Cliente {
  calcularDesconto(): number {
    return 0.20;
  }
}

class ClientePremium implements Cliente {
  calcularDesconto(): number {
    return 0.10;
  }
}

class ClienteRegular implements Cliente {
  calcularDesconto(): number {
    return 0.05;
  }
}

class ClienteBasico implements Cliente {
  calcularDesconto(): number {
    return 0;
  }
}

// Uso
function aplicarDesconto(cliente: Cliente, valor: number): number {
  const desconto = cliente.calcularDesconto();
  return valor * (1 - desconto);
}
```

**Benefícios**:
- ✅ Cada tipo tem sua própria lógica
- ✅ Adicionar novo tipo = nova classe
- ✅ Single Responsibility Principle
- ✅ Open/Closed Principle

---

## ✅ Código Bom (Solução 4 - Strategy Pattern)

```typescript
// ✅ BOM: Strategy Pattern para lógica variável
interface EstrategiaDesconto {
  calcular(valorBase: number): number;
}

class DescontoVIP implements EstrategiaDesconto {
  calcular(valorBase: number): number {
    const desconto = valorBase * 0.20;
    const descontoExtra = valorBase > 1000 ? 50 : 0;
    return desconto + descontoExtra;
  }
}

class DescontoPremium implements EstrategiaDesconto {
  calcular(valorBase: number): number {
    return valorBase * 0.10;
  }
}

class DescontoRegular implements EstrategiaDesconto {
  calcular(valorBase: number): number {
    return valorBase * 0.05;
  }
}

class SemDesconto implements EstrategiaDesconto {
  calcular(valorBase: number): number {
    return 0;
  }
}

// Factory
class DescontoFactory {
  static criar(tipoCliente: TipoCliente): EstrategiaDesconto {
    const estrategias: Record<TipoCliente, EstrategiaDesconto> = {
      vip: new DescontoVIP(),
      premium: new DescontoPremium(),
      regular: new DescontoRegular(),
      basico: new SemDesconto(),
    };

    return estrategias[tipoCliente] ?? new SemDesconto();
  }
}

// Uso
function calcularValorFinal(cliente: Cliente, valorBase: number): number {
  const estrategia = DescontoFactory.criar(cliente.tipo);
  const desconto = estrategia.calcular(valorBase);
  return valorBase - desconto;
}
```

**Benefícios**:
- ✅ Lógica complexa isolada por estratégia
- ✅ Fácil adicionar regras de desconto complexas
- ✅ Testável individualmente
- ✅ Extensível sem modificar código existente

---

## 📊 Exemplo Complexo: Sistema de Aprovação

### ❌ Ruim (Nested IF-ELSE)
```typescript
// ❌ RUIM: Nested IF-ELSE
function aprovarCompra(compra: Compra): string {
  if (compra.valor < 100) {
    return 'aprovado_automaticamente';
  } else {
    if (compra.usuario.tipo === 'vip') {
      if (compra.valor < 5000) {
        return 'aprovado_automaticamente';
      } else {
        return 'requer_aprovacao_gerente';
      }
    } else {
      if (compra.valor < 1000) {
        return 'aprovado_automaticamente';
      } else {
        return 'requer_aprovacao_gerente';
      }
    }
  }
}
```

### ✅ Bom (Chain of Responsibility)
```typescript
// ✅ BOM: Chain of Responsibility Pattern
interface AprovadorDeCompra {
  setProximo(aprovador: AprovadorDeCompra): AprovadorDeCompra;
  aprovar(compra: Compra): string;
}

class AprovadorAutomatico implements AprovadorDeCompra {
  private proximo?: AprovadorDeCompra;

  setProximo(aprovador: AprovadorDeCompra): AprovadorDeCompra {
    this.proximo = aprovador;
    return aprovador;
  }

  aprovar(compra: Compra): string {
    if (compra.valor < 100) {
      return 'aprovado_automaticamente';
    }

    if (!this.proximo) {
      return 'rejeitado';
    }

    return this.proximo.aprovar(compra);
  }
}

class AprovadorVIP implements AprovadorDeCompra {
  private proximo?: AprovadorDeCompra;

  setProximo(aprovador: AprovadorDeCompra): AprovadorDeCompra {
    this.proximo = aprovador;
    return aprovador;
  }

  aprovar(compra: Compra): string {
    if (compra.usuario.tipo !== 'vip') {
      if (!this.proximo) return 'rejeitado';
      return this.proximo.aprovar(compra);
    }

    if (compra.valor < 5000) {
      return 'aprovado_automaticamente';
    }

    if (!this.proximo) {
      return 'requer_aprovacao_gerente';
    }

    return this.proximo.aprovar(compra);
  }
}

class AprovadorRegular implements AprovadorDeCompra {
  private proximo?: AprovadorDeCompra;

  setProximo(aprovador: AprovadorDeCompra): AprovadorDeCompra {
    this.proximo = aprovador;
    return aprovador;
  }

  aprovar(compra: Compra): string {
    if (compra.valor < 1000) {
      return 'aprovado_automaticamente';
    }

    return 'requer_aprovacao_gerente';
  }
}

// Setup da chain
const aprovadorAutomatico = new AprovadorAutomatico();
const aprovadorVIP = new AprovadorVIP();
const aprovadorRegular = new AprovadorRegular();

aprovadorAutomatico
  .setProximo(aprovadorVIP)
  .setProximo(aprovadorRegular);

// Uso
function aprovarCompra(compra: Compra): string {
  return aprovadorAutomatico.aprovar(compra);
}
```

**Benefícios**:
- ✅ Cada aprovador tem responsabilidade única
- ✅ Fácil adicionar novos níveis de aprovação
- ✅ Ordem da chain configurável
- ✅ Zero ELSE clauses

---

## 🧪 Testabilidade

### Código Ruim (Difícil de Testar)
```typescript
// ❌ Precisa testar todas as combinações
describe('calcularDesconto', () => {
  it('deve calcular desconto para todos os tipos', () => {
    expect(calcularDesconto({tipo: 'vip'})).toBe(0.20);
    expect(calcularDesconto({tipo: 'premium'})).toBe(0.10);
    expect(calcularDesconto({tipo: 'regular'})).toBe(0.05);
    expect(calcularDesconto({tipo: 'basico'})).toBe(0);
  });
});
```

### Código Bom (Fácil de Testar)
```typescript
// ✅ Testa cada estratégia isoladamente
describe('DescontoVIP', () => {
  it('aplica 20% de desconto', () => {
    const estrategia = new DescontoVIP();
    expect(estrategia.calcular(1000)).toBe(200);
  });

  it('adiciona R$ 50 de desconto extra acima de R$ 1000', () => {
    const estrategia = new DescontoVIP();
    expect(estrategia.calcular(1500)).toBe(350); // 300 + 50
  });
});

describe('DescontoPremium', () => {
  it('aplica 10% de desconto', () => {
    const estrategia = new DescontoPremium();
    expect(estrategia.calcular(1000)).toBe(100);
  });
});
```

---

## 💡 Quando Usar Cada Solução

| Cenário | Solução Recomendada |
|---------|---------------------|
| Lógica simples, poucos casos | Early Return |
| Dados estáticos, muitos casos | Lookup Table |
| Lógica complexa por tipo | Polimorfismo |
| Lógica variável, runtime | Strategy Pattern |
| Múltiplos aprovadores sequenciais | Chain of Responsibility |

---

## 🚫 Exceção: Ternário Simples

```typescript
// ✅ Aceitável: Ternário simples e legível
const desconto = cliente.tipo === 'vip' ? 0.20 : 0.10;

// ❌ Evite: Ternário aninhado (equivalente a IF-ELSE aninhado)
const desconto = cliente.tipo === 'vip'
  ? cliente.valorTotal > 1000 ? 0.25 : 0.20
  : cliente.valorTotal > 500 ? 0.15 : 0.10;

// ✅ Melhor: Extrair para função
const desconto = calcularDesconto(cliente);
```

---

## 📚 Referências

- [Object Calisthenics - Regra 2](https://williamdurand.fr/2013/06/03/object-calisthenics/#2-dont-use-the-else-keyword)
- [Replace Conditional with Polymorphism - Martin Fowler](https://refactoring.com/catalog/replaceConditionalWithPolymorphism.html)
- Regra completa: `.claude/rules/002-no-else-clause.md`

---

**Exemplo criado para**: Demonstrar aplicação prática da Regra 002
**Use como referência**: Ao refatorar condicionais ou escrever lógica de decisão

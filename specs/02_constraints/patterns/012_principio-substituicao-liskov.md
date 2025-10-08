# Conformidade com o Princípio de Substituição de Liskov (LSP)

**ID**: COMPORTAMENTAL-012
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Exige que as classes derivadas (subclasses) sejam substituíveis pelas suas classes base (superclasses) sem alterar o comportamento esperado do programa.

## Por que importa

A violação do LSP quebra a coesão do sistema de tipos e o contrato de herança, forçando os clientes a verificar o tipo do objeto, o que leva à violação do OCP e introduz bugs graves em tempo de execução.

## Critérios Objetivos

- [ ] Subclasses não devem lançar exceções que não são lançadas pela classe base (comportamento).
- [ ] Subclasses não devem enfraquecer pré-condições ou fortalecer pós-condições da classe base (assinatura/contrato).
- [ ] É proibido o uso de verificações de tipo (`instanceof` ou *type guards* complexos) em código cliente que utiliza a interface da classe base.

## Exceções Permitidas

- **Frameworks de Teste**: Uso de *mocks* e *spies* em testes unitários para simular comportamentos de substituição de forma controlada.

## Como Detectar

### Manual
Busca por `if (objeto instanceof Subclasse)` ou uso de um método da classe base que lança `UnsupportedOperationException`.

### Automático
TypeScript/Compilador: Verificação de tipagem rígida de parâmetros e retornos de métodos sobrescritos.

## Relacionada com

- [COMPORTAMENTAL-011]: reforça (LSP é essencial para a Extensão do OCP)
- [COMPORTAMENTAL-009]: reforça (Princípio do "Diga, Não Pergunte")
- [CRIACIONAL-003]: complementa (Reforça o contrato de *Value Objects*)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

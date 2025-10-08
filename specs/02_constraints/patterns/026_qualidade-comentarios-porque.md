# Qualidade de Comentários: Apenas o Porquê, Não o O Quê

**ID**: ESTRUTURAL-026
**Severidade**: 🟡 Média
**Categoria**: Estrutural

---

## O que é

Exige que os comentários expliquem o **porquê** ou a **intenção** do código, o contexto legal, as desvantagens (trade-offs) ou a lógica não óbvia, e **proíbe** comentários redundantes que descrevem o que o código já mostra.

## Por que importa

Comentários redundantes poluem o código e, mais grave, tendem a ficar desatualizados, criando mentiras no sistema. Aumenta a legibilidade ao forçar que o código seja auto-documentado por bons nomes.

## Critérios Objetivos

- [ ] É proibido o uso de comentários para descrever o que uma função óbvia faz (ex: `// retorna o valor`).
- [ ] Comentários devem ser usados para explicar regras de negócio não evidentes, *trade-offs* de performance ou solução de bugs específicos.
- [ ] Funções públicas devem ter no máximo **20%** de seu corpo ocupado por linhas de comentários.

## Exceções Permitidas

- **Documentação de API**: Comentários JSDoc ou TSDoc usados para gerar documentação de interface pública.
- **Marcações Especiais**: Comentários como `// TODO:` ou `// FIXME:` (em quantidade limitada).

## Como Detectar

### Manual
Verificar se o código pode ser lido e compreendido sem a necessidade de ler os comentários.

### Automático
ESLint: Regras para detectar comentários em linhas de código simples (ex: `return x; // retorna x`).

## Relacionada com

- [ESTRUTURAL-006]: reforça (Nomes Abreviados)
- [ESTRUTURAL-022]: complementa (Simplicidade)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

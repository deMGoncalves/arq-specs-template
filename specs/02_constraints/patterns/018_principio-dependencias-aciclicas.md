# Princípio de Dependências Acíclicas (ADP)

**ID**: ESTRUTURAL-018
**Severidade**: 🔴 Crítica
**Categoria**: Estrutural

---

## O que é

O grafo de dependência entre pacotes deve ser acíclico, ou seja, não deve haver dependências circulares entre os módulos.

## Por que importa

Dependências circulares criam um nó rígido onde as classes em módulos envolvidos se tornam inseparáveis. Isso impede testes isolados, torna a implantação mais complexa e impossibilita o reuso de módulos individualmente.

## Critérios Objetivos

- [ ] É proibido que o Módulo A dependa do Módulo B, e o Módulo B dependa do Módulo A.
- [ ] Módulos circulares (com laços de dependência) devem ser imediatamente quebrados via DIP (extraindo interface comum).
- [ ] A análise do grafo de dependências deve resultar em um Grafo Direcionado Acíclico (DAG).

## Exceções Permitidas

- **Classes de Infraestrutura**: Dependências circulares entre classes *internas* a um mesmo pacote, desde que não envolvam a interface pública.

## Como Detectar

### Manual
Busca por `import { B } from 'module-b'` em `module-a` e `import { A } from 'module-a'` em `module-b`.

### Automático
Análise de dependências: `dependency-graph-analysis` (detecta ciclos).

## Relacionada com

- [COMPORTAMENTAL-014]: reforça (DIP é a solução mais comum para quebrar ciclos ADP)
- [COMPORTAMENTAL-009]: reforça (Princípio do "Diga, Não Pergunte")

---

**Criada em**: 2025-10-04
**Versão**: 1.0

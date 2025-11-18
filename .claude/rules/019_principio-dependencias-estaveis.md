# Princípio de Dependências Estáveis (SDP)

**ID**: ESTRUTURAL-019
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

As dependências de um módulo devem apontar na direção da estabilidade. Módulos instáveis (que mudam muito) devem depender de módulos estáveis.

## Por que importa

Violações do SDP fazem com que módulos de alto nível (mais importantes para o negócio) dependam de módulos de baixo nível e voláteis, espalhando mudanças e reduzindo a testabilidade.

## Critérios Objetivos

- [ ] A **instabilidade** do pacote (I), calculada como (Dependências de Saída / Total de Dependências), deve ser **menor** que 0.5.
- [ ] Módulos de política de negócio (alto nível) devem ter a Instabilidade mais baixa (próxima de 0).
- [ ] Pacotes mais utilizados (alto grau de estabilidade) não devem depender de pacotes com baixo grau de estabilidade (alto I).

## Exceções Permitidas

- **Boundary Elements**: Elementos na fronteira do sistema (ex: *Adapters*, *Controllers*) que, por natureza, são voláteis.

## Como Detectar

### Manual

Identificar a camada de alto nível (ex: *Domain*) importando classes concretas de camadas externas (ex: *Infrastructure*).

### Automático

Análise de dependências: Cálculo de métricas de estabilidade (I) do pacote.

## Relacionada com

- [014 - Princípio de Inversão de Dependência](014_principio-inversao-dependencia.md): reforça
- [018 - Princípio de Dependências Acíclicas](018_principio-dependencias-aciclicas.md): complementa
- [020 - Princípio de Abstrações Estáveis](020_principio-abstracoes-estaveis.md): complementa

---

**Criada em**: 2025-10-04
**Versão**: 1.0

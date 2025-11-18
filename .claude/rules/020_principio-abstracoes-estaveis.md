# Princípio de Abstrações Estáveis (SAP)

**ID**: ESTRUTURAL-020
**Severidade**: 🔴 Crítica
**Categoria**: Estrutural

---

## O que é

Um pacote deve ser o mais abstrato possível (possuir interfaces) se for estável, e o mais concreto possível se for instável.

## Por que importa

O SAP liga a estabilidade do pacote (SDP) à sua abstração (DIP). A violação ocorre quando um módulo altamente estável (difícil de mudar) é concreto, impedindo a extensão. Ou quando um módulo instável (fácil de mudar) é abstrato, atrasando a implementação.

## Critérios Objetivos

- [ ] A **Abstração** do pacote (A), calculada como (Total de Abstrações / Total de Classes), deve ser **alta** (próxima de 1) se a sua **Instabilidade (I)** for baixa (próxima de 0).
- [ ] A distância do pacote à *Main Sequence* (D) no plano A/I não deve ser maior que **0.1** (D = |A + I - 1|).
- [ ] Pacotes de alto nível (política) devem ter mais de **60%** de classes abstratas ou interfaces.

## Exceções Permitidas

- **Pacotes de Dados Puros**: Módulos que contêm apenas *Value Objects* ou DTOs e não são projetados para polimorfismo (A e I podem ser baixos).

## Como Detectar

### Manual

Identificar um módulo de negócio importante (estável) que é composto apenas por classes concretas.

### Automático

Análise de dependências: Cálculo de métricas de abstração (A), instabilidade (I) e distância (D) do pacote.

## Relacionada com

- [014 - Princípio de Inversão de Dependência](014_principio-inversao-dependencia.md): reforça
- [019 - Princípio de Dependências Estáveis](019_principio-dependencias-estaveis.md): complementa
- [012 - Princípio de Substituição de Liskov](012_principio-substituicao-liskov.md): reforça
- [011 - Princípio Aberto/Fechado](011_principio-aberto-fechado.md): reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0

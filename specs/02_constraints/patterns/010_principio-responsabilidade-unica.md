# Aplicação do Princípio da Responsabilidade Única (SRP)

**ID**: COMPORTAMENTAL-010
**Severidade**: 🔴 Crítica
**Categoria**: Comportamental

---

## O que é

Exige que uma classe ou módulo tenha apenas uma razão para mudar, o que implica que deve ter uma única responsabilidade.

## Por que importa

A violação do SRP causa **baixa coesão** e **alto acoplamento**, tornando as classes frágeis e difíceis de testar. Aumenta o custo de manutenção, pois uma mudança em uma área de negócio pode quebrar outra.

## Critérios Objetivos

- [ ] Uma classe não deve conter lógica de negócio e lógica de persistência (ex: *Service* e *Repository* juntos).
- [ ] O número de métodos públicos de uma classe não deve exceder **7**.
- [ ] O **Lack of Cohesion in Methods (LCOM)** deve ser inferior a 0.75.

## Exceções Permitidas

- **Classes de Utilidade/Helpers**: Classes estáticas que agrupam funções puras sem estado para manipulação de dados genéricos (ex: formatadores de data).

## Como Detectar

### Manual
Perguntar: "Se houver uma mudança no requisito X e no requisito Y, esta classe precisa ser alterada em ambas as situações?" (SRP violado se a resposta for sim).

### Automático
SonarQube: Alta `Cognitive Complexity` e `LCOM (Lack of Cohesion in Methods)` alto.

## Relacionada com

- [ESTRUTURAL-007]: reforça (Limite Máximo de Linhas por Classe)
- [ESTRUTURAL-004]: reforça (Uso Obrigatório de Coleções de Primeira Classe)
- [COMPORTAMENTAL-011]: complementa (Garante que a extensão não quebre a responsabilidade)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

# Limite Máximo de Parâmetros por Função

**ID**: ESTRUTURAL-033
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Define um limite máximo de **3 parâmetros** por função ou método para reduzir a complexidade da assinatura e forçar a coesão, promovendo o uso de *Parameter Objects* (DTOs).

## Por que importa

Funções com muitos parâmetros (*Long Parameter List*) aumentam a **complexidade cognitiva**, dificultam a testabilidade e frequentemente indicam uma violação do Princípio da Responsabilidade Única (SRP).

## Critérios Objetivos

- [ ] Funções e métodos não devem ter mais de **3** parâmetros.
- [ ] Para mais de 3 parâmetros, um objeto de parâmetro (DTO ou *Value Object*) deve ser criado para agrupar os dados.
- [ ] Construtores de classes podem exceder o limite se estiverem configurando um objeto via injeção de dependência.

## Exceções Permitidas

- **Funções de Bibliotecas Externas**: Funções que implementam uma assinatura exigida por um *framework* ou biblioteca de terceiros.

## Como Detectar

### Manual

Identificar assinaturas de métodos com 4 ou mais parâmetros.

### Automático

Biome/ESLint: `max-params: ["error", 3]`.

## Relacionada com

- [003 - Encapsulamento de Primitivos](003_encapsulamento-primitivos.md): reforça
- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): reforça
- [037 - Proibição de Argumentos Sinalizadores](037_proibicao-argumentos-sinalizadores.md): reforça

---

**Criada em**: 2025-10-08
**Versão**: 1.0

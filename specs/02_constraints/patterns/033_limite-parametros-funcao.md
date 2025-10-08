# Limite Máximo de Parâmetros por Função

**ID**: ESTRUTURAL-033
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Define um limite máximo de 3 parâmetros por função ou método para reduzir a complexidade da assinatura e forçar a coesão, promovendo o uso de objetos de parâmetro (Parameter Objects).

## Por que importa

Funções com muitos parâmetros (Long Parameter List) são um *code smell* que aumenta a complexidade cognitiva, dificulta a testabilidade e frequentemente indica uma violação do Princípio da Responsabilidade Única (SRP). Limitar os parâmetros força a criação de abstrações mais ricas.

## Critérios Objetivos

- [ ] Funções e métodos não devem ter mais de **3** parâmetros.
- [ ] Para mais de 3 parâmetros, um objeto de parâmetro (DTO ou *Value Object*) deve ser criado para agrupar os dados.
- [ ] Construtores de classes podem exceder o limite se estiverem configurando um objeto via injeção de dependência.

## Exceções Permitidas

- **Funções de Bibliotecas Externas**: Funções que implementam uma assinatura exigida por um framework ou biblioteca de terceiros.
- **Coordenadas ou Pontos**: Funções que recebem um número fixo e baixo de coordenadas (ex: `x`, `y`, `z`).

## Como Detectar

### Manual
- Identificar assinaturas de métodos com 4 ou mais parâmetros.
- Verificar se múltiplos parâmetros primitivos podem ser agrupados em um objeto.

### Automático
- Biome/ESLint: `max-params: ["error", 3]`

## Relacionada com

- [CRIACIONAL-003]: reforça
- [COMPORTAMENTAL-010]: reforça

---

**Criada em**: 2025-10-06
**Versão**: 1.0

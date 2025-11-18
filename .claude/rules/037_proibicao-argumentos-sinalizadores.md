# Proibição de Argumentos Sinalizadores (Flag Arguments)

**ID**: COMPORTAMENTAL-037
**Severidade**: 🟠 Alta
**Categoria**: Comportamental

---

## O que é

Proíbe o uso de parâmetros booleanos (*boolean flags*) em assinaturas de funções ou métodos, pois eles são um forte indicador de que a função possui mais de uma responsabilidade.

## Por que importa

Argumentos sinalizadores (ex: `process(data, shouldLog: boolean)`) violam o Princípio da Responsabilidade Única (SRP) e o Princípio Aberto/Fechado (OCP), pois a função se ramifica internamente, tornando-a difícil de testar e manter.

## Critérios Objetivos

- [ ] Funções não devem ter argumentos booleanos que alteram o caminho de execução principal (ex: `if (flag) { ... } else { ... }`).
- [ ] Funções com *boolean flags* devem ser divididas em métodos separados, com nomes que expressam a intenção de cada ramificação (ex: `processAndLog(data)` e `process(data)`).
- [ ] Limite de **zero** *boolean flags* nos métodos públicos de classes de domínio (`Services`, `Entities`).

## Exceções Permitidas

- **Módulos de Controle de Sistema**: Funções de baixo nível que controlam *debugging* ou *mode* (ex: `isVerbose`).
- **Frameworks/Libraries**: Funções que implementam uma assinatura exigida por um framework de terceiros.

## Como Detectar

### Manual

Busca por parâmetros de função tipados como `boolean` ou com nomes como `isX`, `shouldY`, `withZ`.

### Automático

ESLint: `no-flag-args` (regra customizada) ou `max-params`.

## Relacionada com

- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): reforça
- [011 - Princípio Aberto/Fechado](011_principio-aberto-fechado.md): reforça
- [033 - Limite de Parâmetros por Função](033_limite-parametros-funcao.md): reforça
- [013 - Princípio de Segregação de Interface](013_principio-segregacao-interfaces.md): reforça

---

**Criada em**: 2025-10-08
**Versão**: 1.0

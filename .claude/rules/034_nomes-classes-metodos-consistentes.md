# Nomes de Classes e Métodos Consistentes (Funções são Verbos)

**ID**: ESTRUTURAL-034
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Exige que nomes de classes sejam **substantivos singulares** (ex: `User`, `Order`) e que nomes de métodos sejam **verbos ou frases verbais** que descrevem a intenção (ex: `calculateFee`, `sendNotification`).

## Por que importa

A consistência na nomenclatura é fundamental para a **legibilidade** e **previsibilidade** do código. Uma violação quebra o modelo mental do leitor, aumentando o **custo cognitivo** e o risco de má interpretação da intenção e do sistema de tipos.

## Critérios Objetivos

- [ ] Nomes de classes e interfaces devem ser substantivos e usar `PascalCase`.
- [ ] Nomes de métodos públicos devem começar com um verbo (ex: `get`, `create`, `validate`) e usar `camelCase`.
- [ ] Variáveis que armazenam valores booleanos (predicados) devem usar prefixos claros (ex: `is`, `has`, `can`).

## Exceções Permitidas

- **Factories/Builders**: Classes com o sufixo `Factory` ou `Builder` são aceitas, pois seu papel é estritamente criacional.

## Como Detectar

### Manual

Verificar classes que terminam em verbos (`Manager`, `Processor`) ou funções com nomes de substantivos (`User`).

### Automático

ESLint: `naming-convention` com regras para classes e funções.

## Relacionada com

- [006 - Proibição de Nomes Abreviados](006_proibicao-nomes-abreviados.md): reforça
- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): reforça
- [035 - Proibição de Nomes Enganosos](035_proibicao-nomes-enganosos.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

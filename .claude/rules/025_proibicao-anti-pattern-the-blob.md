# Proibição do Anti-Pattern The Blob (God Object)

**ID**: ESTRUTURAL-025
**Severidade**: 🔴 Crítica
**Categoria**: Estrutural

---

## O que é

Proíbe a criação de classes que concentram a maior parte da lógica e dados do sistema, resultando em um **Objeto Deus** (The Blob) que outras classes pequenas apenas orbitam e acessam.

## Por que importa

Viola o Princípio da Responsabilidade Única (SRP) de forma severa, resultando na **pior forma de acoplamento e baixa coesão**. Torna a classe impossível de testar e o sistema extremamente frágil a mudanças.

## Critérios Objetivos

- [ ] Uma classe não deve conter mais de **10** métodos públicos (excluindo *getters* e *setters* permitidos).
- [ ] O número de dependências (imports) de classes concretas em uma única classe não deve exceder **5**.
- [ ] Se a classe violar os limites de `ESTRUTURAL-007` (50 linhas) e `COMPORTAMENTAL-010` (7 métodos) deve ser classificada como um *Blob* e refatorada.

## Exceções Permitidas

- **Encapsulamento de Legado**: Grandes classes podem ser aceitas ao encapsular um sistema legado não-OO para acessá-lo a partir do sistema OO.

## Como Detectar

### Manual

Identificar classes que estão em constante modificação por vários *feature requests* diferentes.

### Automático

SonarQube: LCOM (Lack of Cohesion in Methods) e WMC (Weighted Methods Per Class) muito altos.

## Relacionada com

- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): substitui
- [007 - Limite Máximo de Linhas por Classe](007_limite-maximo-linhas-classe.md): reforça
- [039 - Regra do Escoteiro](039_regra-escoteiro-refatoracao-continua.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

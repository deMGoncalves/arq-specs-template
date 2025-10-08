# Restrição de Imports Relativos (Caminhos Absolutos e Paths)

**ID**: ESTRUTURAL-031
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Proíbe o uso de caminhos relativos de alta profundidade (ex: `../../../../`) e impõe o uso de *path aliases* ou *module imports* baseados em módulos ou pacotes nomeados (como no seu `package.json`).

## Por que importa

*Imports* relativos de alta profundidade quebram a portabilidade e a legibilidade do código. A regra reforça a **Arquitetura Limpa**, garantindo que módulos de alto nível não façam *imports* de baixo nível fora de suas regras de dependência (DIP/ADP).

## Critérios Objetivos

- [ ] É proibido o uso de `../` mais de **2** vezes em um único caminho de *import*.
- [ ] Todos os módulos de domínio ou *core* devem ser importados por seus nomes de pacote (ex: `import { X } from "domain-module"`) e não por caminhos.
- [ ] O arquivo `tsconfig.json` deve ser configurado com `paths` para facilitar a resolução de módulos internos de forma absoluta.

## Exceções Permitidas

- **Arquivos Irmãos**: *Imports* diretos para arquivos no mesmo diretório (`./file`) ou um nível acima (`../file`).

## Como Detectar

### Manual
Busca por `../../..` ou caminhos longos de diretório.

### Automático
ESLint: `no-relative-imports`, ou ferramentas de análise de dependência que verificam profundidade.

## Relacionada com

- [COMPORTAMENTAL-014]: reforça (DIP)
- [ESTRUTURAL-018]: reforça (ADP)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

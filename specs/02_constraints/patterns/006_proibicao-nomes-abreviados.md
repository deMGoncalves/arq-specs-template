# Proibição de Nomes Abreviados e Acrônimos Ambíguos

**ID**: ESTRUTURAL-006
**Severidade**: 🟡 Média
**Categoria**: Estrutural

---

## O que é

Exige que nomes de variáveis, métodos, classes e parâmetros sejam completos, autoexplicativos e não utilizem abreviações ou acrônimos que não sejam amplamente reconhecidos no domínio do problema.

## Por que importa

A clareza do código depende diretamente da clareza dos nomes. Abreviações reduzem a legibilidade, tornam o código menos pesquisável e forçam o desenvolvedor a decodificar o significado, aumentando o custo cognitivo.

## Critérios Objetivos

- [ ] Nomes de classes, métodos e variáveis devem ter, no mínimo, 3 caracteres (exceto exceções).
- [ ] Acrônimos (ex: `Mngr` para `Manager`, `Calc` para `Calculate`) são proibidos, exceto exceções.
- [ ] Nomes devem representar o significado sem a necessidade de olhar a documentação.

## Exceções Permitidas

- **Convenções de Loop**: Variáveis de iteração únicas e de curta duração (ex: `i`, `j`).
- **Acrônimos Ubíquos**: Acrônimos comuns na indústria (ex: `ID`, `URL`, `API`, `HTTP`).

## Como Detectar

### Manual
Busca por nomes de variáveis que sejam incompreensíveis para um leitor novo sem contexto.

### Automático
ESLint: `naming-convention` com limites mínimos de caracteres.

## Relacionada com

- [ESTRUTURAL-005]: complementa
- [CRIACIONAL-003]: reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0

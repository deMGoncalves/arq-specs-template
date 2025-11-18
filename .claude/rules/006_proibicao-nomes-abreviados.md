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

- [005 - Restrição de Encadeamento de Chamadas](005_maximo-uma-chamada-por-linha.md): complementa
- [003 - Encapsulamento de Primitivos](003_encapsulamento-primitivos.md): reforça
- [024 - Proibição de Constantes Mágicas](024_proibicao-constantes-magicas.md): complementa
- [026 - Qualidade de Comentários](026_qualidade-comentarios-porque.md): reforça
- [034 - Nomes de Classes e Métodos Consistentes](034_nomes-classes-metodos-consistentes.md): reforça
- [035 - Proibição de Nomes Enganosos](035_proibicao-nomes-enganosos.md): complementa
- [022 - Priorização da Simplicidade e Clareza](022_priorizacao-simplicidade-clareza.md): complementa

---

**Criada em**: 2025-10-04
**Versão**: 1.0

# Limite Máximo de Linhas por Arquivo de Classe

**ID**: ESTRUTURAL-007
**Severidade**: 🔴 Crítica
**Categoria**: Estrutural

---

## O que é

Impõe um limite máximo no número de linhas de código em um arquivo de classe (entidade, *service*, controlador), forçando a extração de responsabilidades para outras classes.

## Por que importa

A violação do limite de linhas é um forte indicador de que a classe está violando o Princípio da Responsabilidade Única (SRP), resultando em classes com baixa coesão, alto acoplamento e dificuldade extrema na manutenção e testes.

## Critérios Objetivos

- [ ] Arquivos de classe (incluindo declarações, métodos e propriedades) devem ter, no máximo, 50 linhas de código (excluindo linhas em branco e comentários).
- [ ] Classes que atingem 40 linhas devem ser imediatamente candidatas à refatoração.
- [ ] Métodos individuais devem ter, no máximo, 15 linhas de código.

## Exceções Permitidas

- **Classes de Configuração/Inicialização**: Classes que apenas declaram constantes ou mapeamentos (ex: *Mappers*, *Configuration*).
- **Classes de Teste**: *Suites* de teste onde cada método de teste é pequeno, mas o arquivo cresce devido ao número de cenários.

## Como Detectar

### Manual
Contagem visual ou uso de ferramentas de análise de métricas de arquivo.

### Automático
SonarQube/ESLint: `max-lines-per-file: 50` e `max-lines-per-method: 5`.

## Relacionada com

- [ESTRUTURAL-001]: reforça
- [ESTRUTURAL-004]: reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0

# Proibição da Duplicação de Lógica (Princípio DRY)

**ID**: ESTRUTURAL-021
**Severidade**: 🔴 Crítica
**Categoria**: Estrutural

---

## O que é

Exige que cada peça de conhecimento tenha uma representação única, não ambígua e autoritativa dentro do sistema. Proíbe a duplicação de lógica ou código funcionalmente idêntico.

## Por que importa

A duplicação cria um débito técnico severo, pois uma alteração em um trecho de código exige a modificação de N outros trechos duplicados, aumentando o risco de bugs de regressão e o custo de manutenção de forma exponencial.

## Critérios Objetivos

- [ ] É proibida a cópia direta de blocos de código com mais de **5** linhas entre classes ou métodos.
- [ ] Lógica de validação ou cálculo complexo usada em mais de **2** locais deve ser extraída para uma função ou classe reutilizável.
- [ ] A reuso deve ser feito via abstração (função, classe, interface) e não via *copy-paste* com pequenas modificações.

## Exceções Permitidas

- **Configurações de Baixo Nível**: Pequenas repetições em arquivos de configuração ou DTOs puramente estruturais.
- **Testes Unitários**: Configuração de *fixtures* ou *setups* para cenários de teste específicos.

## Como Detectar

### Manual
Busca por trechos de código que parecem ser idênticos, mas têm pequenas variações (duplicação sutil).

### Automático
SonarQube/ESLint: `no-duplicated-code` (com análise semântica).

## Relacionada com

- [COMPORTAMENTAL-010]: reforça (SRP é o caminho para o DRY)
- [ESTRUTURAL-007]: reforça (Limite de Linhas)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

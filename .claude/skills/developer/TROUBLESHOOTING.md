# Developer - Troubleshooting

**ID**: SKL-004
**Fase**: 4

---

## Problema 1: Código Não Segue Spec

**Sintomas**: Código implementado difere da spec.md

**Causa**: Context >600 lines (hallucinations)

**Solução**:
1. Verificar Files to Load (deve ser ≤500 lines)
2. Re-ler spec.md seção relevante
3. Re-implementar seguindo spec

**Prevenção**: Validar context antes de iniciar task

---

## Problema 2: Testes Falhando

**Sintomas**: Tests failing após implementação

**Causa**: Código violou regras ou não atende acceptance criteria

**Solução**:
1. Ler logs de erro dos testes
2. Verificar se acceptance criteria foram atendidos
3. Verificar se Object Calisthenics foi aplicado
4. Refatorar código

**Prevenção**: TDD (escrever testes ANTES do código)

---

## Problema 3: Cobertura <80%

**Sintomas**: Coverage tool mostra <80%

**Causa**: Testes insuficientes (faltam error cases, edge cases)

**Solução**:
1. Identificar código não coberto (coverage report)
2. Adicionar testes para branches não cobertas
3. Re-executar coverage

**Prevenção**: Escrever 1 teste/branch (happy, error, edge)

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

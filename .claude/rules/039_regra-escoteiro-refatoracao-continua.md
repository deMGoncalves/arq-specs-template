# Regra do Escoteiro Aplicada à Refatoração Contínua

**ID**: COMPORTAMENTAL-039
**Severidade**: 🟡 Média
**Categoria**: Comportamental

---

## O que é

Obriga o desenvolvedor a **sempre deixar o código melhor do que o encontrou** (*Boy Scout Rule*). Mesmo que uma alteração seja pequena, o desenvolvedor deve aproveitar a oportunidade para corrigir pequenos *code smells* próximos ao local de trabalho.

## Por que importa

Este princípio incentiva a **refatoração contínua e emergente**, prevenindo a acumulação de débito técnico pequeno. É a chave para manter a manutenibilidade a longo prazo e reduzir a incidência do Anti-Pattern The Blob.

## Critérios Objetivos

- [ ] Pequenos *code smells* (ex: nomes de variáveis ruins, *guard clause* ausente) encontrados no escopo de alteração devem ser corrigidos.
- [ ] Arquivos que estão sendo modificados e violam `ESTRUTURAL-022` (Complexidade Ciclomática > 5) devem ser refatorados para um nível menor.
- [ ] O *diff* do *Pull Request* deve mostrar melhorias de qualidade, mesmo que não solicitadas.

## Exceções Permitidas

- **Alterações de Emergência**: *Hotfixes* críticos em produção onde o risco de refatoração excede o ganho de qualidade imediato.

## Como Detectar

### Manual

Code review: Verificar se o desenvolvedor apenas corrigiu o bug, ou se melhorou a qualidade do código circundante.

### Automático

Análise de *commits*: Verificar se a refatoração está sendo feita em pequenas doses.

## Relacionada com

- [022 - Priorização da Simplicidade e Clareza](022_priorizacao-simplicidade-clareza.md): reforça
- [025 - Proibição do Anti-Pattern The Blob](025_proibicao-anti-pattern-the-blob.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

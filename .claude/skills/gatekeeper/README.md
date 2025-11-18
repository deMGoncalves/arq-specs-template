# Gate Keeper

Sistema de validação de aprovação entre fases do workflow documentation-first.

## O que é?

Gate Keeper é o guardião do determinismo. Ele garante que nenhuma fase avance sem que todas as pré-condições sejam satisfeitas, artefatos estejam completos e critérios de qualidade sejam atendidos.

## Por que usar?

1. **Determinismo**: Validações objetivas e automatizadas
2. **Qualidade**: Zero tolerância para artefatos incompletos
3. **Rastreabilidade**: Todas as validações documentadas
4. **Confiança**: Nada avança sem estar realmente pronto

## Como usar?

### Validar fase atual

```
@skill gate-keeper

/gate validate stack
```

### Validar e avançar automaticamente

```
@skill gate-keeper

/gate auto stack
```

### Ver relatório de todos os gates

```
@skill gate-keeper

/gate report
```

### Override (use com cautela)

```
@skill gate-keeper

/gate override stack "TTL será definido em code phase após testes de performance"
```

## Gates do Workflow

```
Vision → [GATE 1] → Stack → [GATE 2] → Plan → [GATE 3] → Feature → [GATE 4] → Build → [GATE 5] → Code → [GATE 6] → Done
```

Cada gate valida:
- ✅ Pré-condições (dependências de fases anteriores)
- ✅ Artefatos (existência e completude)
- ✅ Qualidade (critérios específicos da fase)
- ✅ Referências (links entre artefatos)

## Níveis de Aprovação

- ✅ **Aprovado**: Pode avançar
- ⚠️ **Aprovado com Ressalvas**: Pode avançar, mas há melhorias recomendadas
- ❌ **Bloqueado**: NÃO pode avançar

## Validações Automáticas

Cada gate verifica automaticamente:
- ❌ Placeholders (TODO, TBD, FIXME)
- ❌ Datas antigas
- ❌ Campos obrigatórios vazios
- ❌ Referências quebradas (ACT-*, CNT-*, etc)
- ✅ Artefatos completos
- ✅ Formato correto

## Integração

Gate Keeper trabalha com:
- **Task Master**: Lê estado da task para validar fase
- **Development**: Aguarda artefatos serem produzidos
- **Documentation**: Valida completude de specs
- **Orchestrator**: Gerencia transições entre fases

## Exemplo de Uso

```bash
# Desenvolvedor completa fase stack
@skill development
# ... implementa specs/02, specs/04, ADR-001, ADR-002 ...

# Gate Keeper valida
@skill gate-keeper
/gate validate stack

# Output:
# ⚠️ Aprovado com Ressalvas
# - ADR-002 tem placeholder na linha 45
# - Falta adicionar "TTL" ao glossário
#
# Estimativa de correção: 30 minutos

# Desenvolvedor corrige
@skill development
# ... remove placeholder e atualiza glossário ...

# Gate Keeper re-valida
@skill gate-keeper
/gate validate stack

# Output:
# ✅ Aprovado
# Pode avançar para fase Plan
```

## Checklist Rápido

### Qualquer Fase
- [ ] Artefatos existem
- [ ] Sem placeholders
- [ ] Datas atualizadas
- [ ] Referências válidas
- [ ] Glossário atualizado

### Ver checklists específicos em SKILL.md

## Arquivos Relacionados

- `SKILL.md` - Especificação completa
- `.agent-task.json` - Estado da task (lido)
- `../.claude/skills/task-master/` - Orquestração
- `../../rules/` - Regras de qualidade

---

**Versão**: 1.0.0

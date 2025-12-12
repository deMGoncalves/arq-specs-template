# Analyst Agent - Troubleshooting

**ID**: SKL-001
**Categoria**: 📋 Planning & Validation
**Fase**: 1 (Discovery) + Final (Validation)

---

## 🎯 Propósito

Este documento apresenta problemas comuns encontrados ao usar o Analyst Agent e suas soluções práticas, organizados por:
- Sintomas observados
- Causas raízes
- Soluções passo a passo
- Prevenção futura

---

## 🚨 Problema 1: .agent-task.md Vago ou Incompleto

### Sintomas

```markdown
❌ Escopo vago: "Implementar feature de usuários"
❌ Critérios subjetivos: "Código deve ser bom"
❌ Sem estimativa de tempo/esforço
❌ Seções vazias ou com "TODO"
❌ Nenhuma regra/spec referenciada
```

### Causa Raiz

- Analyst não foi fornecido com contexto suficiente
- Requisito original do usuário era ambíguo
- .claude/rules/ ou specs/ não existem/não foram consultados
- Analyst executou planejamento rápido demais (falta de detalhamento)

### Solução

#### Passo 1: Fornecer Mais Contexto

```bash
# ❌ Requisito vago
@skill analyst "Implementar autenticação"

# ✅ Requisito detalhado
@skill analyst "Implementar autenticação JWT no endpoint POST /auth/login.
                Deve aceitar email+senha, retornar access_token + refresh_token,
                validar formato de email, rate limit de 5 tentativas/min por IP.
                Stack: Node.js + Express + PostgreSQL.
                Specs existente: specs/06_runtime/scenarios/SCN-001_login.md"
```

#### Passo 2: Garantir Contexto Disponível

```bash
# Verificar se .claude/rules/ existe
ls -la .claude/rules/

# Verificar se specs/ existe
ls -la specs/

# Se não existir, criar estrutura mínima
/vision "Sistema de autenticação com JWT"
/stack "Node.js 20, Express 4, PostgreSQL 15"
```

#### Passo 3: Revisar e Refinar .agent-task.md

```bash
# Após Analyst gerar .agent-task.md inicial
# Revisar e adicionar detalhes manualmente se necessário

# Seções críticas para verificar:
1. Escopo → Deve ter 5+ itens específicos
2. Critérios → Deve ter 3-5 critérios mensuráveis
3. Contexto → Deve referenciar regras e specs
4. Sinais de Deterioração → Score calculado (X/16)
```

### Prevenção Futura

- **Sempre fornecer**: O quê, Por quê, Onde, Stack, Referências a specs
- **Validar**: .agent-task.md antes de prosseguir (Gate 1: ≥80% completo)
- **Usar**: /vision e /stack para criar contexto mínimo

---

## 🚨 Problema 2: Score de Saúde Sempre 16/16 (Falso Positivo)

### Sintomas

```markdown
❌ Score sempre 16/16 mesmo em sistema complexo
❌ Todas as 4 dimensões marcadas como 4/4
❌ Nenhuma recomendação de melhoria
❌ Analyst não detecta código acoplado/frágil
```

### Causa Raiz

- Analyst não leu codebase atual
- Checklist sinais-deterioracao.md não foi consultado
- Avaliação superficial (apenas baseada no plano, não no código existente)

### Solução

#### Passo 1: Fornecer Contexto do Código Existente

```bash
# Antes de invocar Analyst
# Fazer code review manual rápido

# Verificar acoplamento (Rigidez)
grep -r "import.*from.*\.\.\/\.\.\/" src/  # Imports profundos?
grep -r "class.*extends" src/              # Herança profunda?

# Verificar fragilidade
git log --oneline -20  # Quebras recentes?

# Verificar imobilidade
grep -r "copy-paste" src/  # Código duplicado?

# Verificar viscosidade
time cargo build  # Build lento? (>5min = problema)
time cargo test   # Testes lentos? (>10min = problema)
```

#### Passo 2: Informar Analyst sobre Problemas Conhecidos

```bash
@skill analyst "Feature X precisa refatorar módulo Y que está acoplado.
                git log mostra 5 quebras nas últimas 10 commits.
                Build demora 8 minutos (lento).
                Considere esses problemas na análise de saúde."
```

#### Passo 3: Revisar sinais-deterioracao.md Manualmente

Ler `analyst/sinais-deterioracao.md` e responder:

```markdown
## 🔒 Rigidez
- Feature será centralizada? ⬜ Sim ⬜ Não
- Quantos módulos precisa modificar? ___ (>5 = rigidez alta)

## 💔 Fragilidade
- Mudanças em A quebram B, C, D? ⬜ Sim ⬜ Não
- Testes quebram frequentemente? ⬜ Sim ⬜ Não

## ⚓ Imobilidade
- Código duplicado? ⬜ Sim ⬜ Não
- Pode extrair para lib compartilhada? ⬜ Sim ⬜ Não

## 🐌 Viscosidade
- Build >5min? ⬜ Sim ⬜ Não
- Testes >10min? ⬜ Sim ⬜ Não
```

#### Passo 4: Ajustar Score Manualmente

Se Analyst deu 16/16 mas você identificou problemas:

```markdown
## Sinais de Deterioração (CORRIGIDO)

- 🔒 Rigidez: 2/4 (Alta - feature precisa modificar 8 arquivos)
- 💔 Fragilidade: 3/4 (Média - 5 quebras recentes)
- ⚓ Imobilidade: 3/4 (Média - algum código duplicado)
- 🐌 Viscosidade: 2/4 (Alta - build 8min, testes 12min)

**Score Total**: 10/16 (⚠️ Atenção)

**Decisão**: Invocar architect (SKL-002) para design cuidadoso
```

### Prevenção Futura

- **Sempre revisar** score manualmente se parecer otimista demais
- **Considerar histórico** do projeto (git log, issues)
- **Medir objetivamente**: Build time, test time, acoplamento
- **Quando em dúvida**: Assumir score MENOR e ser conservador

---

## 🚨 Problema 3: Critérios de Aceitação Não Mensuráveis

### Sintomas

```markdown
❌ "Código deve ser bom"
❌ "Feature deve funcionar bem"
❌ "Sistema deve ser rápido"
❌ "Documentação deve estar adequada"
```

### Causa Raiz

- Critérios vagos não permitem validação objetiva
- Analyst não foi instruído a criar critérios SMART
- Requisito original não tinha acceptance criteria

### Solução

#### Transformar Critérios Vagos em Mensuráveis

| ❌ Vago | ✅ Mensurável |
|---------|---------------|
| "Código deve ser bom" | "Código deve seguir 100% das regras em .claude/rules/ (verificado por gatekeeper)" |
| "Feature deve funcionar bem" | "Feature deve passar 10+ testes cobrindo happy path, error cases, edge cases (100% passando)" |
| "Sistema deve ser rápido" | "Endpoint deve responder em <200ms P95 (verificado por load test com 1000 req/s)" |
| "Documentação adequada" | "README deve ter seção da feature + doc comments em funções públicas + entrada em CHANGELOG" |

#### Template de Critério Mensurável

```markdown
## Critério [N]: [Descrição Clara]

**O que**: [Comportamento esperado]
**Como medir**: [Métrica objetiva]
**Evidência**: [Onde encontrar prova]

**Exemplo**:

✅ Aceita: john@example.com → retorna 200 OK
✅ Aceita: user+tag@domain.co.uk → retorna 200 OK
❌ Rejeita: invalid → retorna 400 Bad Request
❌ Rejeita: user@ → retorna 400 Bad Request

**Como verificar**: Executar `cargo test test_email_validation` (5 testes devem passar)
```

### Prevenção Futura

- **Sempre incluir**: Como medir, Como verificar, Exemplos concretos
- **Evitar**: "deve ser", "adequado", "bom", "rápido" sem números
- **Preferir**: "≥80%", "<200ms P95", "100% dos testes", "5+ exemplos"

---

## 🚨 Problema 4: Validação Final Superficial

### Sintomas

```markdown
❌ Relatório final com seções vazias
❌ "Todos os critérios atendidos" sem evidências
❌ Métricas faltando (cobertura, LOC, tempo)
❌ Score de saúde não recalculado
❌ Nenhuma recomendação futura
```

### Causa Raiz

- Analyst executou validação rápida demais
- Fases anteriores não atualizaram .agent-task.md
- developer/reviewer/tester não documentaram outputs
- Gate 2 (≥95%) não foi respeitado

### Solução

#### Passo 1: Garantir Fases Anteriores Documentaram

Antes de invocar Analyst para validação final:

```bash
# Verificar se .agent-task.md foi atualizado por cada fase
cat .agent-task.md | grep "✅"  # Quantos items marcados?

# Verificar se testes rodaram
ls tests/ | wc -l              # Quantos arquivos de teste?
cargo test -- --nocapture | grep "test result: ok"

# Verificar cobertura
cargo tarpaulin --out Stdout | grep "Coverage"

# Verificar lint
cargo clippy -- -D warnings
```

#### Passo 2: Fornecer Evidências ao Analyst

```bash
@skill analyst "Validação final para feature X.

                EVIDÊNCIAS:
                - 12 testes adicionados em tests/email_tests.rs (100% passando)
                - Cobertura: 92% (cargo tarpaulin)
                - Lint: 0 warnings (cargo clippy)
                - Arquivos modificados: 4 (git status)
                - Linhas adicionadas: 187 (git diff --stat)
                - Todos os 5 critérios foram testados e ATENDIDOS
                - README.md:42 atualizado, CHANGELOG.md:8 atualizado

                Gere relatório final completo com todas as seções."
```

#### Passo 3: Revisar Relatório e Adicionar Detalhes

Se relatório estiver incompleto, adicionar manualmente:

```markdown
## Estatísticas

- **Arquivos criados**: 2 (listar)
- **Arquivos modificados**: 4 (listar)
- **Linhas adicionadas**: 187 (git diff --stat)
- **Linhas removidas**: 8
- **Testes adicionados**: 12 (listar arquivos)
- **Cobertura de código**: 92% (cargo tarpaulin)
- **Fases completadas**: 4/4 (100%)
- **Tempo estimado**: 4h
- **Tempo real**: 3h 45min

## Validação de Critérios

| Critério | Status | Evidência |
|----------|--------|-----------|
| 1. Valida formato correto | ✅ | tests/email_tests.rs:15-30 (5 testes) |
| 2. Rejeita inválidos | ✅ | tests/email_tests.rs:32-48 (5 testes) |
| 3. Cobertura ≥80% | ✅ | 92% (cargo tarpaulin) |
| 4. Segue regras | ✅ | 0 warnings (cargo clippy) |
| 5. Docs atualizadas | ✅ | README.md:42, CHANGELOG.md:8 |

## Saúde do Sistema

**Score Recalculado**: 16/16 (✅ Saudável - melhorou de 15→16)

- 🔒 Rigidez: 4/4 (Baixa)
- 💔 Fragilidade: 4/4 (Baixa)
- ⚓ Imobilidade: 4/4 (Baixa - extraído para módulo reutilizável) ⬆️
- 🐌 Viscosidade: 4/4 (Baixa)
```

### Prevenção Futura

- **Gate 2**: Exigir relatório ≥95% completo antes de marcar como DONE
- **Automatizar métricas**: Script que coleta LOC, testes, cobertura
- **Template**: Usar template de relatório final com todas as seções

---

## 🚨 Problema 5: Architect Não Foi Invocado (Quando Deveria)

### Sintomas

```markdown
❌ Score de saúde <13/16 mas não invocou architect
❌ Complexidade HIGH mas não invocou architect
❌ Múltiplas decisões arquiteturais sem ADRs
❌ Design ad-hoc, retrabalho durante implementação
```

### Causa Raiz

- Analyst não detectou complexidade corretamente
- Score de saúde foi falso positivo (ver Problema 2)
- Usuário não informou que sistema era complexo
- Regra "Invoke architect if score <13" não foi seguida

### Solução

#### Passo 1: Critérios para Invocar Architect

**SEMPRE invocar architect** se:

1. **Score de saúde** <13/16 (Moderado ou Severo)
2. **Complexidade** HIGH (múltiplos bounded contexts, >15 arquivos)
3. **Decisões críticas** (escolha de stack, arquitetura distribuída, migração)
4. **Breaking changes** (afeta contratos externos, APIs públicas)
5. **Débito técnico alto** (refatoração grande, >1000 LOC afetadas)

#### Passo 2: Adicionar Manualmente ao .agent-task.md

```markdown
## Complexidade Detectada

**Score de Saúde**: 11/16 (⚠️ Atenção)
**Rigidez**: 3/4 (Média)
**Fragilidade**: 2/4 (Alta) ← ALERTA
**Arquivos afetados**: 23 (>15 = HIGH)

**Decisão**: Invocar **architect** (SKL-002) para design.md detalhado antes de implementar.

**Justificativa**: Fragilidade alta + múltiplos arquivos indica necessidade de design cuidadoso.

---

**Próximo passo**: @skill architect "Design para migração OAuth2. Score 11/16, fragilidade alta."
```

#### Passo 3: Invocar Architect Explicitamente

```bash
@skill architect "Criar design.md para [feature/sistema].
                  Context: Score de saúde 11/16, fragilidade alta.
                  Precisamos de design robusto para evitar quebras."
```

### Prevenção Futura

- **Regra automática**: Score <13 → architect OBRIGATÓRIO
- **Checklist**: Revisar decisão de invocar architect no Gate 1
- **Conservador**: Quando em dúvida, invocar architect (melhor prevenir)

---

## 🚨 Problema 6: Débitos Técnicos Não Documentados

### Sintomas

```markdown
❌ Atalhos tomados durante implementação não registrados
❌ TODOs espalhados no código sem rastreamento
❌ Issues conhecidos não documentados
❌ Score de saúde piorou mas não foi explicado
```

### Causa Raiz

- Relatório final não documentou débitos
- developer tomou atalhos sem avisar Analyst
- Pressão de prazo levou a pular documentação
- specs/11_risks/ não foi atualizado

### Solução

#### Passo 1: Identificar Débitos Durante Validação

```bash
# Procurar TODOs
grep -r "TODO" src/ | wc -l

# Procurar FIXMEs
grep -r "FIXME" src/ | wc -l

# Procurar HACKs
grep -r "HACK" src/ | wc -l

# Comparar score de saúde
# Antes: 15/16
# Depois: 13/16 ← Piorou!
```

#### Passo 2: Documentar no Relatório Final

```markdown
## Débitos Técnicos Introduzidos

1. **TD-008** (Alto): Reset senha com rate limit básico, melhorar para sliding window
   - **Impacto**: Vulnerável a distributed rate limit bypass
   - **Esforço**: 2 dias
   - **Prioridade**: P1 (resolver em Sprint+1)
   - **Issue**: #489

2. **TD-009** (Médio): Regex de email poderia ser constante lazy_static
   - **Impacto**: Performance (compile regex toda vez)
   - **Esforço**: 30min
   - **Prioridade**: P2 (resolver quando tiver tempo)
   - **Issue**: #490

## Saúde do Sistema

**Score**: 13/16 (antes era 15/16) ← PIOROU

**Por quê piorou?**
- Viscosidade 4→3: CI ficou mais lento (+2min) devido a novos testes

**Plano de Mitigação**:
- Otimizar cache do CI (issue #491)
- Paralelizar testes (issue #492)
```

#### Passo 3: Atualizar specs/11_risks/

```bash
# Adicionar débitos técnicos em specs/11_risks/011_risks-and-technical-debt.md

/code # Comando code deve atualizar risks automatically
```

### Prevenção Futura

- **Gate 2**: Relatório deve ter seção "Débitos Técnicos" (mesmo que vazia)
- **Comparar scores**: Antes vs Depois no relatório final
- **Criar issues**: Para cada débito (rastreabilidade)
- **Priorizar**: TD-XXX com esforço e prioridade

---

## 📊 Padrões de Problemas por Complexidade

### LOW Complexity

**Problemas Comuns**:
- ✅ Poucos problemas (planejamento simples)
- ⚠️ Critérios vagos (falta de detalhamento)

**Soluções**:
- Focar em critérios mensuráveis
- Validação final rápida mas completa

### MEDIUM Complexity

**Problemas Comuns**:
- ⚠️ Score de saúde otimista (falso positivo)
- ⚠️ Architect não invocado quando deveria
- ⚠️ Débitos não documentados

**Soluções**:
- Revisar score manualmente
- Considerar invocar architect se score <13
- Documentar débitos proativamente

### HIGH Complexity

**Problemas Comuns**:
- 🔴 Planejamento incompleto (contexto insuficiente)
- 🔴 Architect não invocado (CRÍTICO)
- 🔴 Specs incompletas (faltam ADRs, cenários BDD)
- 🔴 Orchestrator não usado (hallucinations)

**Soluções**:
- Architect OBRIGATÓRIO
- Specs Arc42 completas antes de código
- Orchestrator para decomposição
- Múltiplas ADRs para decisões críticas

---

## 🚦 Checklist de Troubleshooting

### Antes de Invocar Analyst (Fase 1)

```markdown
- [ ] Requisito está claro e detalhado?
- [ ] Contexto está disponível (.claude/rules/, specs/)?
- [ ] Stack tecnológica está definida?
- [ ] Complexidade foi estimada (LOW/MEDIUM/HIGH)?
```

### Após .agent-task.md Gerado

```markdown
- [ ] Escopo tem 5+ items específicos?
- [ ] Critérios são mensuráveis (3-5)?
- [ ] Score de saúde foi calculado (X/16)?
- [ ] Score parece realista (não otimista demais)?
- [ ] Architect foi invocado se score <13?
- [ ] Gate 1 passou (≥80% completo)?
```

### Após Implementação (Fase Final)

```markdown
- [ ] Todas as fases foram completadas (Dev, Test, Review, Docs)?
- [ ] Evidências foram coletadas (testes, cobertura, lint)?
- [ ] Score de saúde foi recalculado?
- [ ] Débitos técnicos foram documentados?
- [ ] Relatório final tem todas as seções?
- [ ] Gate 2 passou (≥95% completo)?
```

---

## 🔗 Relacionado com

### Documentos
- **CHECKLIST.md**: Validações detalhadas fase 1 e final
- **EXAMPLES.md**: Exemplos práticos de uso
- **README.md**: Visão geral do Analyst
- **sinais-deterioracao.md**: Checklist de saúde do sistema

### Skills Relacionadas
- **architect** (SKL-002): Invocar se score <13 ou HIGH complexity
- **orchestrator** (SKL-003): Decomposição de tasks
- **guardian** (SKL-009): Validação pré-commit

### Commands Relacionados
- **/vision** (CMD-001): Criar contexto mínimo
- **/stack** (CMD-002): Definir stack antes de planejar
- **/feature** (CMD-008): Criar cenários BDD

---

**Versão**: 2.0.0
**Criado em**: 2025-12-09
**Última Atualização**: 2025-12-09
**Mantido por**: Documentation-First Approach Team

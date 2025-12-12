# Tarefas de Implementação: [Change ID]

**ID do Template**: TPL-WORKFLOW-003
**Versão**: 2.0.0
**Categoria**: Workflow
**Usado Por**: orchestrator (Fase 3.5: Decomposição de Tarefas)
**Última Atualização**: 2025-11-17

---

**Mudança**: [change-id]
**Capability**: [capability-name]
**Gerado**: YYYY-MM-DD
**Total de Tarefas**: XX
**LOC Estimado**: ~XXX linhas

---

## 📊 Rastreador de Progresso

- **Total**: [ ] 0/XX tarefas completadas (0%)
- **Fase 0**: [ ] 0/2 (Configuração)
- **Fase 1**: [ ] 0/X (Requisitos Principais)
- **Fase 2**: [ ] 0/X (Tratamento de Erros)
- **Fase 3**: [ ] 0/X (Testes)
- **Fase 4**: [ ] 0/X (Qualidade)

**Status**: 🟡 Em Progresso | 🟢 Completo | 🔴 Bloqueado

---

## Fase 0: Configuração & Infraestrutura

**Propósito**: Preparar estrutura base antes da implementação

### TASK-001: Criar estrutura DDD Co-Located
**Prioridade**: P0 (Bloqueador)
**LOC Estimado**: ~20 linhas
**Tempo Estimado**: 30 min
**Dependências**: Nenhuma

**Descrição**:
Criar estrutura de diretórios seguindo DDD Tático Co-Located conforme specs/ e rules/

**Estrutura de Arquivos**:
```
src/[context]/[container]/[component]/
  - index.ts              # Aggregate root (export)
  - criar-[entity].ts     # Factory
  - persistir-[entity].ts # Repository
  - [action]-[entity].ts  # Use case
  - [Entity].ts           # Entity
  - [ValueObject].ts      # Value objects
  - [Event].ts            # Domain events
  - [component].spec.ts   # Tests
```

**Critérios de Aceitação**:
- [ ] Diretórios criados conforme DDD Co-Located
- [ ] Arquivos vazios com exports criados
- [ ] Index.ts exporta interfaces públicas
- [ ] Estrutura validada contra `.claude/skills/development/tatical-design.md`

**Contexto a Carregar** (~200 linhas):
- specs/ (conceitos DDD do cap. 5, 8)
- rules/package-principles/ (regras de coesão)
- .claude/skills/developer/SKILL.md (padrões táticos)

---

### TASK-002: Setup de testes e configuração
**Prioridade**: P0 (Bloqueador)
**LOC Estimado**: ~50 linhas
**Tempo Estimado**: 45 min
**Dependências**: TASK-001

**Descrição**:
Configurar framework de testes e setup inicial

**Arquivos a Criar**:
- `src/[path]/[component].spec.ts`
- Atualizar `vitest.config.ts` ou `jest.config.js` se necessário

**Critérios de Aceitação**:
- [ ] Framework de testes configurado
- [ ] Testes podem ser executados: `npm test`
- [ ] Coverage configurado: `npm run coverage`
- [ ] Primeiro teste "smoke" passando

**Contexto a Carregar** (~300 linhas):
- specs/ (padrões táticos DDD, regras de qualidade) (seção Test-First)
- proposal.md
- Documentação do framework de testes (se necessário)

---

## Fase 1: Requisitos Principais

**Propósito**: Implementar requisitos principais mapeados dos cenários BDD

### Requisito: [Nome do Requisito]

**Cenários BDD Mapeados**:
1. Cenário: "[Nome do Cenário 1]" → TASK-003, TASK-004, TASK-005
2. Cenário: "[Nome do Cenário 2]" → TASK-006
3. Cenário: "[Nome do Cenário 3]" → TASK-007

---

### TASK-003: Implementar factory criar-[entity].ts
**Prioridade**: P1
**LOC Estimado**: ~60 linhas
**Tempo Estimado**: 1.5 horas
**Dependências**: TASK-001, TASK-002
**Cenário BDD**: "[Nome do Cenário]" (parcial)

**Descrição**:
Criar factory que constrói entidade [Entity] a partir de dados brutos

**Guia de Implementação**:
```typescript
// src/[path]/criar-[entity].ts

interface Criar[Entity]Input {
  field1: string;
  field2: string;
}

interface Criar[Entity]Output {
  entity: [Entity];
  eventos: DomainEvent[];
}

export function criar[Entity](input: Criar[Entity]Input): Criar[Entity]Output {
  // 1. Validar inputs
  // 2. Criar value objects
  // 3. Criar entidade
  // 4. Gerar domain events
  // 5. Retornar entity + eventos
}
```

**Critérios de Aceitação**:
- [ ] Função `criar[Entity]` implementada
- [ ] Inputs validados (formato, requisitos mínimos)
- [ ] Value objects criados
- [ ] Entidade criada com ID (uuid)
- [ ] Domain events gerados
- [ ] **BDD Parcial**: GIVEN válido → Entity criado
- [ ] Teste unitário: `describe('criar[Entity]')` passando
- [ ] Sem valores hardcoded (use config/env)

**Contexto a Carregar** (~500 linhas):
- specs/ (padrões táticos DDD, regras de qualidade) (seção DDD)
- proposal.md
- design.md (se existir)
- spec.md (APENAS o Requisito correspondente)
- tasks.md (APENAS TASK-003)

**NÃO Carregar**:
- Outros requisitos do spec.md
- Outras tarefas
- Implementação de outras tarefas

---

### TASK-004: Implementar repository persistir-[entity].ts
**Prioridade**: P1
**LOC Estimado**: ~80 linhas
**Tempo Estimado**: 2 horas
**Dependências**: TASK-003
**Cenário BDD**: "[Nome do Cenário]" (parcial)

**Descrição**:
Criar repository para persistir [Entity] no banco de dados

**Guia de Implementação**:
```typescript
// src/[path]/persistir-[entity].ts

interface Persistir[Entity]Input {
  entity: [Entity];
}

interface Persistir[Entity]Output {
  entityId: string;
  success: boolean;
}

export async function persistir[Entity](
  input: Persistir[Entity]Input
): Promise<Persistir[Entity]Output> {
  // 1. Conectar com banco de dados
  // 2. Verificar unique constraints
  // 3. Inserir registro (com transaction)
  // 4. Retornar entityId
}
```

**Critérios de Aceitação**:
- [ ] Função `persistir[Entity]` implementada
- [ ] Conexão com banco de dados (via config)
- [ ] Verificação de unique constraints
- [ ] Insert com transaction
- [ ] Tratamento de erro para duplicatas
- [ ] **BDD Parcial**: Entity persiste no banco
- [ ] Teste de integração: `describe('persistir[Entity]')` passando
- [ ] Teste usa banco de dados real (ou testcontainers)

**Contexto a Carregar** (~600 linhas):
- specs/ (padrões táticos DDD, regras de qualidade) (Integration-First Testing)
- proposal.md
- design.md (schema do banco de dados)
- spec.md (APENAS o Requisito)
- tasks.md (APENAS TASK-004)
- Implementação TASK-003 (para entender estrutura Entity)

---

### TASK-005: Implementar use case [action]-[entity].ts
**Prioridade**: P1
**LOC Estimado**: ~100 linhas
**Tempo Estimado**: 2 horas
**Dependências**: TASK-003, TASK-004
**Cenário BDD**: "[Nome do Cenário]" (completo)

**Descrição**:
Orquestrar todo o fluxo do use case

**Guia de Implementação**:
```typescript
// src/[path]/[action]-[entity].ts

interface [Action][Entity]Input {
  field1: string;
  field2: string;
}

interface [Action][Entity]Output {
  entityId: string;
  field1: string;
  status: string;
}

export async function [action][Entity](
  input: [Action][Entity]Input
): Promise<[Action][Entity]Output> {
  // 1. Criar entity (TASK-003)
  // 2. Persistir entity (TASK-004)
  // 3. Publicar domain events
  // 4. Side effects (notificações, etc)
  // 5. Logs estruturados
  // 6. Retornar resultado
}
```

**Critérios de Aceitação**:
- [ ] Função `[action][Entity]` implementada
- [ ] Chama `criar[Entity]` e `persistir[Entity]`
- [ ] Publica domain events no event bus
- [ ] Side effects executados (emails, notificações)
- [ ] Logs estruturados (nível INFO)
- [ ] Retorna output correto
- [ ] **BDD Completo**: GIVEN-WHEN-THEN completo
  - GIVEN: [pré-condições]
  - WHEN: [ação]
  - THEN: [resultado + side effects]
- [ ] Teste de integração: `describe('[action][Entity]')` passando
- [ ] Cobertura de teste >= 80%

**Contexto a Carregar** (~800 linhas):
- specs/ (padrões táticos DDD, regras de qualidade)
- proposal.md
- design.md
- spec.md (APENAS o Requisito - com TODOS os cenários)
- tasks.md (APENAS TASK-005)
- Implementações TASK-003 + TASK-004

---

## Fase 2: Tratamento de Erros

**Propósito**: Implementar cenários de erro mapeados dos cenários BDD

### TASK-006: Implementar erro [ErrorType]
**Prioridade**: P2
**LOC Estimado**: ~40 linhas
**Tempo Estimado**: 1 hora
**Dependências**: TASK-005
**Cenário BDD**: "[Nome do Cenário de Erro]"

**Descrição**:
Tratar erro quando [condição de erro]

**Implementação**:
- Criar classe de erro: `[Error]Error`
- Adicionar tratamento em componente apropriado
- Propagar erro até use case
- Retornar resposta HTTP apropriada (400, 404, 409, 422, etc)

**Critérios de Aceitação**:
- [ ] `[Error]Error` implementado (extends Error)
- [ ] Erro lançado quando condição detectada
- [ ] Use case captura e trata erro
- [ ] **BDD Completo**:
  - GIVEN: [condição de erro]
  - WHEN: [ação]
  - THEN: [erro correto + mensagem clara]
- [ ] Teste: `describe('[ErrorType] error')` passando
- [ ] Mensagem de erro é amigável ao usuário

**Contexto a Carregar** (~600 linhas):
- specs/ (padrões táticos DDD, regras de qualidade)
- proposal.md
- spec.md (APENAS o Cenário de Erro)
- tasks.md (APENAS TASK-006)
- Implementação do use case relevante

---

## Fase 3: Testes

**Propósito**: Garantir cobertura e qualidade dos testes

### TASK-007: Testes unitários para criar-[entity].ts
**Prioridade**: P2
**LOC Estimado**: ~150 linhas
**Tempo Estimado**: 2 horas
**Dependências**: TASK-003

**Casos de Teste**:
- [ ] Deve criar entidade com inputs válidos
- [ ] Deve lançar erro para input1 inválido
- [ ] Deve lançar erro para input2 inválido
- [ ] Deve gerar domain events
- [ ] Deve gerar ID único
- [ ] [Adicionar mais baseado nos requisitos]

**Critérios de Aceitação**:
- [ ] Todos os casos de teste implementados
- [ ] Todos os testes passando
- [ ] Cobertura para criar-[entity].ts >= 90%
- [ ] Casos extremos cobertos

---

### TASK-008: Testes unitários para persistir-[entity].ts
**Prioridade**: P2
**LOC Estimado**: ~120 linhas
**Tempo Estimado**: 2 horas
**Dependências**: TASK-004

**Casos de Teste**:
- [ ] Deve persistir entidade no banco de dados
- [ ] Deve lançar erro para duplicata
- [ ] Deve usar transaction do banco de dados
- [ ] Deve fazer rollback em caso de erro
- [ ] Deve retornar entityId em caso de sucesso

---

### TASK-009: Testes de integração para [action]-[entity].ts
**Prioridade**: P2
**LOC Estimado**: ~200 linhas
**Tempo Estimado**: 2.5 horas
**Dependências**: TASK-005, TASK-006

**Casos de Teste**:
- [ ] End-to-end: Caminho feliz (todos os cenários)
- [ ] End-to-end: Cenários de erro
- [ ] Event bus: Domain events publicados
- [ ] Side effects: Executados corretamente
- [ ] Logs: Gerados corretamente

---

### TASK-010: Validação de cobertura
**Prioridade**: P2
**LOC Estimado**: N/A
**Tempo Estimado**: 30 min
**Dependências**: TASK-007, TASK-008, TASK-009

**Critérios de Aceitação**:
- [ ] Cobertura total >= 80% (ou meta de specs/)
- [ ] Todos os cenários BDD têm testes correspondentes
- [ ] Todos os casos extremos cobertos
- [ ] Executar: `npm run coverage` - passa
- [ ] Nenhum caminho crítico sem teste

---

## Fase 4: Qualidade & Conformidade

**Propósito**: Validar conformidade e qualidade final

### TASK-011: Verificação de conformidade com a Constituição
**Prioridade**: P3
**LOC Estimado**: N/A
**Tempo Estimado**: 1 hora
**Dependências**: Todas as tarefas anteriores

**Checklist de Validação**:
- [ ] Estrutura DDD Co-Located seguida
- [ ] Nomenclatura semântica (sem sufixos técnicos)
- [ ] Test-First seguido (se TDD em specs/10_quality)
- [ ] Testes de integração em ambiente realista
- [ ] Sem valores hardcoded (usar config)
- [ ] Todos os critérios de quality gates atendidos
- [ ] Nenhuma violação de regras de qualidade (ver .claude/rules/)

**Se violações forem encontradas**:
- Documentar cada violação
- Criar tarefas para corrigir
- NÃO prosseguir até corrigir

---

### TASK-012: Auto-revisão de código
**Prioridade**: P3
**LOC Estimado**: N/A
**Tempo Estimado**: 30 min
**Dependências**: TASK-011

**Checklist**:
- [ ] Linters passam (0 erros, 0 avisos)
- [ ] Build bem-sucedido
- [ ] Todos os testes passam
- [ ] Sem comentários TODO/FIXME/HACK
- [ ] Código segue .claude/rules/
- [ ] Sem console.log (usar logging apropriado)
- [ ] Sem código comentado
- [ ] Pronto para revisão por pares

---

## 📝 Notas de Execução

### Ordem de Execução de Tarefas

1. **Sempre comece com TASK-001** (bloqueia todas as outras)
2. **Siga a cadeia de dependências estritamente**
3. **Marque tarefa como [x] APENAS quando TODOS os critérios de aceitação forem atendidos**
4. **Se bloqueado, documente o bloqueador e notifique**

### Gerenciamento de Contexto (CRÍTICO para evitar alucinações)

**Ao implementar TASK-XXX, Developer deve carregar APENAS**:
- `specs/ (padrões táticos DDD, regras de qualidade)` (completo)
- `proposal.md` (completo)
- `design.md` (completo, se existir)
- `spec.md` (**APENAS** o Requisito mencionado na tarefa)
- `tasks.md` (**APENAS** a tarefa atual)
- Implementações de tarefas anteriores (se houver dependências)

**NÃO carregar**:
- Outros requisitos do spec.md
- Outras tarefas do tasks.md
- Implementação de tarefas não relacionadas
- Contexto completo da codebase

**Por quê?**: Isso mantém o contexto pequeno (~500-800 linhas) e focado = output determinístico sem alucinações.

### Rastreamento de Progresso

Atualize o rastreador de progresso no topo do arquivo após cada conclusão de tarefa:
```
- **Total**: [x] 3/12 tarefas completadas (25%)
```

### Estratégia de Commit (Opcional)

- Commit após cada tarefa: `git commit -m "feat: [task-id] [título da tarefa]"`
- Ou commit após cada fase
- Ou commit único no final

Escolha baseado na sua preferência de workflow.

### Tarefas Bloqueadas

Se uma tarefa estiver bloqueada:
1. Marque como 🔴 Bloqueado no título da tarefa
2. Documente o bloqueador nas notas da tarefa
3. Crie nova tarefa para desbloquear se necessário
4. Trabalhe em tarefas não bloqueadas em paralelo

---

## 🎯 Critérios de Sucesso

Este tasks.md está completo quando:

- [ ] Todas as tarefas marcadas como [x]
- [ ] Todos os critérios de aceitação satisfeitos
- [ ] Cobertura total de testes >= meta
- [ ] Build passa
- [ ] Linters passam
- [ ] Conformidade com a Constituição validada
- [ ] Auto-revisão de código passou
- [ ] Pronto para revisão por pares (Reviewer skill)

---

**Gerado por**: Orchestrator (Motor de Decomposição de Tarefas)
**Algoritmo**: Cenários BDD → Componentes DDD → Tarefas Atômicas
**Versão do Template**: 2.0.0

---

## Templates Relacionados

### Pré-requisitos
- **spec.md** (capítulos Arc42) - Especificação completa deve existir (Fase 3)
- **design.md** (TPL-WORKFLOW-002) - Design de arquitetura (se complexidade HIGH, Fase 2)
- **bdd/scenario.md** (TPL-BDD-001) - Cenários BDD para decompor

### Segue Este Template
- **Developer implementa** - Implementação tarefa por tarefa (Fase 4)
- **Gatekeeper valida** - Quality gates entre tarefas (Fase 4)

### Veja Também
- **specs/ (padrões táticos DDD, regras de qualidade)** - Guia de padrões táticos DDD estrutura as tarefas
- **orchestrator/SKILL.md** - Detalhes do algoritmo de decomposição
- **developer/SKILL.md** - Instruções de implementação por tarefa

---

## Integração com Workflow

**Fase**: 3.5 (Decomposição de Tarefas)

**Skill Principal**: orchestrator

**Gatilho**: spec.md (Arc42 + BDD) completado e aprovado

**Localização de Output**: `changes/[change-id]/tasks.md`

**Pré-requisitos**:
- spec.md existe com cenários BDD e arquitetura Arc42
- design.md existe (se complexidade HIGH)
- Especificação aprovada pelo analyst

**Propósito Crítico**:
Esta fase **previne alucinações da IA** ao:
- Decompor specs grandes (5000+ linhas) em tarefas atômicas (<100 LOC cada)
- Limitar contexto por tarefa para ~500 linhas (comportamento determinístico da IA)
- Criar critérios de aceitação claros por tarefa
- Mapear tarefas para componentes DDD e cenários BDD

**Próximos Passos**:
1. **Developer implementa** - Executar tarefas sequencialmente (Fase 4)
2. **Gatekeeper valida** - Verificar quality gates entre tarefas
3. **Reviewer + Tester validam** - Após todas as tarefas completadas (Fase 5)

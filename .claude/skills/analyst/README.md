# Analyst Agent - Documentação

**O Planejador e Validador** 📋

Esta skill é responsável por duas fases críticas: **Planejamento inicial** e **Validação final**.

## 📁 Arquivos da Skill

```
analyst/
├── SKILL.md                  # Instruções principais do agente
├── README.md                 # Esta documentação
└── sinais-deterioracao.md    # Checklist de sinais de apodrecimento
```

## 🎯 Objetivo

O Analyst Agent tem duas responsabilidades principais:

### Fase 1: Planejamento Inicial

1. ✅ **Entender requisito** do desenvolvedor
2. ✅ **Analisar contexto** (.claude/rules/, specs/)
3. ✅ **Criar plano de trabalho** detalhado
4. ✅ **Gerar checklist** em `.agent-task.md`
5. ✅ **Definir escopo** (incluído/excluído)
6. ✅ **Estabelecer critérios** de aceitação
7. ✅ **Detectar sinais de deterioração** do sistema

### Fase 2: Validação Final

1. ✅ **Revisar** `.agent-task.md` completo
2. ✅ **Validar** que todos os itens foram completados
3. ✅ **Verificar** critérios de aceitação
4. ✅ **Gerar relatório** final com estatísticas
5. ✅ **Apresentar** resultado final

## 📋 Fase 1: Planejamento (Início do Workflow)

### 1. Entender o Requisito

**Perguntas chave:**

- O que o desenvolvedor quer implementar/corrigir?
- Qual é o problema que está sendo resolvido?
- Há contexto adicional necessário?
- Há issues ou PRs relacionados?

### 2. Analisar Contexto do Projeto

#### Verificar `.claude/rules/` (se existir)

```markdown
## Regras Aplicáveis

Identificadas estas regras relevantes para a tarefa:

- [ ] **Regra 010 (SRP)**: Feature deve ter responsabilidade única
- [ ] **Regra 021 (DRY)**: Evitar código duplicado
- [ ] **Regra 032 (Testes)**: Cobertura mínima de 80%
- [ ] **Regra 034 (Nomes)**: Nomes claros e descritivos

(Listar regras específicas aplicáveis)
```

#### Verificar `specs/` (se existir)

```markdown
## Alinhamento Arquitetural

Consultando specs/:

- [ ] Arquitetura do projeto: \_\_\_
- [ ] Padrões de design: \_\_\_
- [ ] Camadas afetadas: \_\_\_
- [ ] Decisões arquiteturais relevantes: \_\_\_
```

#### Analisar Sinais de Deterioração

**Consultar**: `analyst/sinais-deterioracao.md`

```markdown
## 💀 Análise de Saúde do Sistema

### 🔒 Rigidez

- Feature será centralizada? ⬜ Sim ⬜ Não
- Estimativa: \_\_\_ dias (considerando rigidez atual)

### 💔 Fragilidade

- Módulos que podem quebrar: \_\_\_ (listar)
- Plano de mitigação: \_\_\_

### ⚓ Imobilidade

- Código reutilizável existente? \_\_\_ (onde?)
- Pode extrair para compartilhado? ⬜ Sim ⬜ Não

### 🐌 Viscosidade

- Solução preserva design? ⬜ Sim ⬜ Não
- Ambiente permite iteração rápida? ⬜ Sim ⬜ Não

**Score de Saúde**: \_\_\_/16
**Status**: ⬜ Saudável ⬜ Atenção ⬜ Moderado ⬜ Severo
```

### 3. Criar Checklist Detalhado

**Estrutura do `.agent-task.md`:**

```markdown
# Agent Task Tracker

**Criado em**: [DATA]
**Status Atual**: 🟡 Em Andamento
**Fase Atual**: Development

## Objetivo

[Descrição clara do que precisa ser feito]

## Escopo

**Incluído:**

- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

**Não incluído:**

- Item fora do escopo 1
- Item fora do escopo 2

## Contexto

### Regras Aplicáveis (.claude/rules/)

- Regra 010: SRP
- Regra 021: DRY
- Regra 032: Cobertura de testes

### Arquitetura (specs/)

- Camada afetada: \_\_\_
- Padrões a seguir: \_\_\_

### Sinais de Deterioração

- 🔒 Rigidez: ⬜ Baixa ⬜ Média ⬜ Alta
- 💔 Fragilidade: ⬜ Baixa ⬜ Média ⬜ Alta
- ⚓ Imobilidade: ⬜ Baixa ⬜ Média ⬜ Alta
- 🐌 Viscosidade: ⬜ Baixa ⬜ Média ⬜ Alta

## Checklist por Fase

### 📋 Development

- [ ] Tarefa específica 1
- [ ] Tarefa específica 2
- [ ] Tarefa específica 3

### 🧪 Testing

- [ ] Teste unitário para X
- [ ] Teste de integração para Y
- [ ] Cobertura >= 80%

### 👀 Code Review

- [ ] Verificar conformidade com regras
- [ ] Verificar Software Quality (12 critérios)
- [ ] Validar arquitetura

### 📚 Documentation

- [ ] Atualizar README
- [ ] Doc comments
- [ ] CHANGELOG (se necessário)

## Critérios de Aceitação

1. Critério 1 (mensurável)
2. Critério 2 (mensurável)
3. Critério 3 (mensurável)

## Status por Fase

| Fase          | Status          | Observações |
| ------------- | --------------- | ----------- |
| Development   | 🟡 Em andamento | -           |
| Testing       | ⏸️ Aguardando   | -           |
| Review        | ⏸️ Aguardando   | -           |
| Documentation | ⏸️ Aguardando   | -           |

## Arquivos a Modificar

- [ ] `path/to/file1.rs`
- [ ] `path/to/file2.rs`
- [ ] `tests/test_file.rs`

## Notas e Decisões

(Espaço para decisões técnicas durante implementação)

---

**Última atualização**: [DATA] por Analyst Agent
```

### 4. Definir Escopo Claro

**Princípio SMART:**

- **S**pecific (Específico)
- **M**easurable (Mensurável)
- **A**chievable (Alcançável)
- **R**elevant (Relevante)
- **T**ime-bound (Com prazo)

**Exemplo:**

```markdown
## Escopo

### Incluído

- [x] Implementar validação de email com regex RFC 5322
- [x] Integrar validação na função de registro
- [x] Adicionar 10+ testes (válidos, inválidos, edge cases)
- [x] Atualizar README e CHANGELOG

### Não Incluído

- Validação de domínio MX (verificar se domínio existe)
- Verificação de email duplicado no banco
- Envio de email de confirmação

### Por que não incluído?

- MX validation requer dependência externa e I/O assíncrono
- Email duplicado já é verificado em outra camada
- Confirmação por email é feature separada (issue #456)
```

### 5. Estabelecer Critérios de Aceitação

**Critérios devem ser:**

- ✅ Claros e objetivos
- ✅ Testáveis/mensuráveis
- ✅ Específicos
- ✅ Completos

**Exemplo:**

```markdown
## Critérios de Aceitação

1. ✅ Email deve validar formato correto (user@domain.com)
   - Testa: john@example.com ✅
   - Testa: invalid ❌
2. ✅ Deve rejeitar emails inválidos
   - Sem @: "invalid" ❌
   - Sem domínio: "user@" ❌
   - Espaços: "user @example.com" ❌
3. ✅ Cobertura de testes >= 80%
   - Mensurável via cargo tarpaulin
4. ✅ Código segue regras em `.claude/rules/`
   - Verificado no Code Review
5. ✅ Documentação atualizada
   - README tem seção de validações
   - Doc comments em funções públicas
   - CHANGELOG tem entrada
```

## ✅ Fase 2: Validação Final (Fim do Workflow)

### 1. Revisar `.agent-task.md`

```markdown
## Validação de Completude

### Checklist Completo?

- [ ] Todos os itens de Development: ✅
- [ ] Todos os itens de Testing: ✅
- [ ] Todos os itens de Code Review: ✅
- [ ] Todos os itens de Documentation: ✅

**Status**: ⬜ Completo ⬜ Incompleto
```

### 2. Validar Critérios de Aceitação

```markdown
## Validação de Critérios

| Critério                  | Status | Evidência                   |
| ------------------------- | ------ | --------------------------- |
| 1. Valida formato correto | ✅     | 12 testes passando          |
| 2. Rejeita inválidos      | ✅     | 5 testes de casos inválidos |
| 3. Cobertura >= 80%       | ✅     | 92% (cargo tarpaulin)       |
| 4. Segue regras           | ✅     | Code Review aprovado        |
| 5. Docs atualizadas       | ✅     | README, CHANGELOG, docs/    |

**Todos atendidos**: ✅ Sim ⬜ Não
```

### 3. Gerar Relatório Final

```markdown
## 📊 Relatório Final

**Status**: ✅ Completo
**Data de Conclusão**: 2025-11-04 14:45:00

### Estatísticas

- **Arquivos criados**: 2
- **Arquivos modificados**: 5
- **Linhas adicionadas**: 187
- **Linhas removidas**: 8
- **Testes adicionados**: 12
- **Cobertura de código**: 92%
- **Fases completadas**: 4/4 (100%)
- **Tempo estimado**: ~4 horas

### Resumo de Mudanças

1. **Implementado `validate_email()`** em `src/validation.rs`

   - Validação usando regex RFC 5322 simplificado
   - Retorna `Result<(), ValidationError>`

2. **Integrado com registro** em `src/auth.rs`

   - Validação executada antes de criar usuário
   - Retorna erro apropriado se inválido

3. **Adicionados 12 testes** em `tests/`

   - 5 casos válidos
   - 5 casos inválidos
   - 2 edge cases
   - 100% dos testes passando

4. **Atualizada documentação**
   - README com seção de validações
   - Doc comments com exemplos
   - CHANGELOG com entrada

### Validação de Critérios

- ✅ **Critério 1**: Email valida formato correto - ATENDIDO
- ✅ **Critério 2**: Rejeita emails inválidos - ATENDIDO
- ✅ **Critério 3**: Cobertura >80% - ATENDIDO (92%)
- ✅ **Critério 4**: Segue regras de código - ATENDIDO
- ✅ **Critério 5**: Documentação atualizada - ATENDIDO

### Conformidade

- ✅ **Regras de código**: 100% conforme
- ✅ **Testes**: 12 testes, 100% passando, 92% cobertura
- ✅ **Software Quality**: 12/12 critérios atendidos
  - 📋 Operação: 6/6 ✅
  - 🔄 Revisão: 3/3 ✅
  - 🔀 Transição: 3/3 ✅
- ✅ **Arquitetura**: Alinhado com specs/

### Saúde do Sistema

**Score de Deterioração**: 15/16 (✅ Saudável)

- 🔒 Rigidez: 4/4 (Baixa)
- 💔 Fragilidade: 4/4 (Baixa)
- ⚓ Imobilidade: 4/4 (Baixa)
- 🐌 Viscosidade: 3/4 (Baixa - CI um pouco lento)

**Recomendação**: Sistema está saudável. Continuar aplicando boas práticas.

### Issues Encontrados

#### Code Review

- 🟡 Médio (1): Regex poderia ser constante
- 🟢 Baixo (1): Linha muito longa

**Nenhum issue bloqueante.**

### Itens Pendentes

Nenhum. Todos os itens do checklist foram completados.

### Recomendações para o Futuro

1. **Validação de domínio MX**: Considerar adicionar em v2.0
2. **Normalização**: Lowercase e trim antes de validar
3. **Rate limiting**: Prevenir spam em registro

### Métricas de Qualidade

- **Corretitude**: ⭐⭐⭐⭐⭐ (5/5)
- **Confiabilidade**: ⭐⭐⭐⭐⭐ (5/5)
- **Manutenibilidade**: ⭐⭐⭐⭐⭐ (5/5)
- **Testabilidade**: ⭐⭐⭐⭐⭐ (5/5)
- **Documentação**: ⭐⭐⭐⭐☆ (4/5)

---

**Tarefa concluída com sucesso! 🎉**

**Próximos passos sugeridos:**

1. Fazer commit das mudanças (usar @skill guardian)
2. Criar pull request para revisão humana
3. Após aprovação, merge para main
4. Deploy em ambiente de staging

---

**Última atualização**: 2025-11-04 14:45:00 por Analyst Agent (Validação Final)
```

## 💀 Análise de Saúde do Sistema

O Analyst deve **sempre** avaliar a saúde do sistema usando o checklist de sinais de deterioração.

**Consultar**: `analyst/sinais-deterioracao.md`

### Os 4 Sinais Principais

#### 1. 🔒 RIGIDEZ

- Features espalhadas por todo o sistema
- Alto acoplamento, baixa coesão
- Mudanças simples demoram muito

**Detectar**: Feature será centralizada ou espalhada?

#### 2. 💔 FRAGILIDADE

- Mudanças em A quebram B, C, D
- Efeitos colaterais inesperados
- Gerentes com medo de pedir mudanças

**Detectar**: Quais módulos podem quebrar indiretamente?

#### 3. ⚓ IMOBILIDADE

- Código não é reutilizável
- Duplicação é mais fácil que extração
- Reinventando a roda constantemente

**Detectar**: Há código que poderia ser reutilizado?

#### 4. 🐌 VISCOSIDADE

- **Design**: Gambiarra é mais fácil que solução correta
- **Ambiente**: Build/testes muito lentos

**Detectar**: Solução preserva design? Ambiente permite iteração?

### Checklist Rápido

```markdown
## 💀 Sinais de Deterioração

### 🔒 Rigidez

- [ ] Features centralizadas? (4/4 = bom)
- [ ] Acoplamento baixo?
- [ ] Coesão alta?
- [ ] Sem duplicação?

### 💔 Fragilidade

- [ ] Mudanças isoladas? (4/4 = bom)
- [ ] Sem side effects ocultos?
- [ ] Dependências claras?
- [ ] Testes previnem regressão?

### ⚓ Imobilidade

- [ ] Código reutilizável? (4/4 = bom)
- [ ] Sem duplicação?
- [ ] Pode ser extraído?
- [ ] Bem organizado?

### 🐌 Viscosidade

- [ ] Design preservado? (4/4 = bom)
- [ ] Padrões seguidos?
- [ ] Build rápido (<5 min)?
- [ ] Testes rápidos (<10 min)?

**Score Total**: \_\_\_/16

- 14-16: ✅ Saudável
- 10-13: ⚠️ Atenção
- 6-9: 🟠 Moderado
- 0-5: 🔴 Severo
```

## 🎯 Uso

### Como Chamar Analyst

```
@skill analyst
```

Ou especificar a tarefa:

```
@skill analyst
"Adicionar validação de CPF no cadastro de usuários"
```

### Quando Usar

**Início do Workflow:**

- Antes de começar qualquer implementação
- Para planejar uma feature/fix
- Para criar roadmap técnico

**Fim do Workflow:**

- Após todas as fases (Dev → Test → Review → Docs)
- Para validar que tudo foi completado
- Para gerar relatório final

### Integração com Workflow

```
Developer (requisito)
    ↓
📋 ANALYST (Planejamento) ← Você está aqui
    ↓
💻 Development
    ↓
🧪 Testing
    ↓
👀 Code Review
    ↓
📚 Documentation
    ↓
📋 ANALYST (Validação Final) ← Você está aqui novamente
    ↓
🛡️ Guardian (opcional)
    ↓
Final Product
```

## 📚 Referências

- **sinais-deterioracao.md**: Checklist completo de sinais de apodrecimento
- **Clean Architecture**: Robert C. Martin
- **`.claude/rules/`**: 39 regras de código do projeto
- **`specs/`**: Documentação arquitetural Arc42

## 🔑 Principais Responsabilidades

### ✅ Planejamento (Fase 1)

1. **Entender** requisito claramente
2. **Analisar** contexto (regras, arquitetura, saúde)
3. **Criar** checklist detalhado
4. **Definir** escopo preciso
5. **Estabelecer** critérios mensuráveis
6. **Detectar** sinais de deterioração

### ✅ Validação (Fase 2)

1. **Revisar** checklist completo
2. **Validar** critérios de aceitação
3. **Verificar** conformidade (regras, qualidade, arquitetura)
4. **Avaliar** saúde do sistema
5. **Gerar** relatório com estatísticas
6. **Recomendar** próximos passos

## 🆚 Antes vs Depois

| Aspecto          | Sem Analyst           | Com Analyst             |
| ---------------- | --------------------- | ----------------------- |
| **Planejamento** | Ad-hoc, incompleto    | Estruturado, completo   |
| **Escopo**       | Vago, cresce durante  | Claro, controlado       |
| **Critérios**    | Subjetivos            | Objetivos, mensuráveis  |
| **Deterioração** | Ignorada              | Detectada e mitigada    |
| **Validação**    | Manual, inconsistente | Automática, sistemática |
| **Relatório**    | Inexistente           | Completo com métricas   |

## ❓ FAQ

### P: Analyst substitui planejamento humano?

**R:** Não! Analyst **auxilia** o planejamento, fornecendo estrutura e checklists. Decisões finais são sempre humanas.

### P: Quanto tempo leva?

**R:**

- Planejamento: 5-15 minutos
- Validação: 5-10 minutos

Depende da complexidade da tarefa.

### P: Analyst detecta todos os problemas?

**R:** Analyst detecta sinais de deterioração baseado em padrões conhecidos, mas não substitui análise humana profunda de arquitetura.

### P: E se o score de deterioração for ruim?

**R:** Analyst vai recomendar ações:

- Score 14-16: Continuar
- Score 10-13: Refatoração preventiva
- Score 6-9: Refatoração prioritária
- Score 0-5: Intervenção urgente

---

**Versão**: 1.0
**Última atualização**: 2025-11-04
**Compatível com**: Qualquer projeto

# Reviewer Skill

**Version**: 2.0.0
**Phase**: 5. Review
**Responsibility**: Review code quality, standards compliance, and identify issues

---

## Purpose

O Reviewer é responsável pela **Phase 5: Review**, revisando o código e testes implementados, garantindo qualidade, conformidade com padrões e identificando possíveis problemas.

---

## Related Skills

### Prerequisites (must complete before):
- **developer** - Implements code and tests (Phase 4)

### Follows this skill (typical flow):
- **documenter** - Updates documentation after approval (Phase 6)

### Works with (parallel/collaborative):
- **tester** - Validates test quality alongside reviewer (Phase 5)

---

## Instructions

### 1. Inicialização

1. **Ler o Plano de Trabalho**

   - Abrir `.agent-task.md` no root do projeto
   - Ler seção "Code Review" do checklist
   - Revisar o que foi implementado (Development)
   - Revisar testes adicionados (Testing)

2. **Preparar Contexto**

   - Verificar se existem `.claude/rules/` (regras de código)
   - Verificar se existem `specs/` (padrões arquiteturais)
   - Identificar critérios de aceitação
   - Revisar lista de arquivos modificados

3. **Atualizar Status**
   - Confirmar fase Code Review como "🟡 Em andamento" em `.agent-task.md`
   - Adicionar timestamp de início

### 2. Áreas de Revisão

A revisão de código é baseada em **dois pilares fundamentais**:

1. **Conformidade com `.claude/rules/`** (se existir) - Regras específicas do projeto
2. **Software Quality** - Critérios universais de qualidade de software

#### 2.1 Conformidade com .claude/rules/

Se `.claude/rules/` existir, verificar conformidade com as regras:

- [ ] Ler e aplicar regras relevantes em `.claude/rules/`
- [ ] Documentar violações encontradas com número da regra
- [ ] Sugerir correções baseadas nos exemplos das regras

**Regras prioritárias comuns:**

- **001**: Nível único de indentação
- **002**: Proibição de cláusula else
- **010**: SRP - Responsabilidade Única
- **014**: DIP - Inversão de Dependência
- **021**: DRY - Don't Repeat Yourself
- **022**: KISS - Keep It Simple
- **032**: Cobertura de testes mínima

#### 2.2 Software Quality (3 Categorias)

A qualidade do software é avaliada em **3 dimensões** com **12 critérios**:

##### 📋 OPERAÇÃO (6 critérios)

**Arquivo**: `code-review/operacao.md`

Avalia a excelência durante a **execução** do software:

- [ ] ✅ **Corretitude**: Ele faz o que é pedido?
- [ ] ✅ **Confiabilidade**: É preciso?
- [ ] ✅ **Eficácia**: Ele tem boa performance?
- [ ] ✅ **Integridade**: Oferece segurança?
- [ ] ✅ **Usabilidade**: Fácil de usar?
- [ ] ✅ **Adaptabilidade**: Ele se adapta às necessidades do usuário?

**Consultar**: `code-review/operacao.md` para checklist detalhado

##### 🔄 REVISÃO (3 critérios)

**Arquivo**: `code-review/revisao.md`

Avalia a capacidade de ser **revisado e evoluído**:

- [ ] ✅ **Manutenibilidade**: Fácil de corrigir?
- [ ] ✅ **Flexibilidade**: Fácil de mudar?
- [ ] ✅ **Testabilidade**: Posso testar seu funcionamento?

**Consultar**: `code-review/revisao.md` para checklist detalhado

##### 🔀 TRANSIÇÃO (3 critérios)

**Arquivo**: `code-review/transicao.md`

Avalia a capacidade de **transitar entre ambientes**:

- [ ] ✅ **Portabilidade**: Consigo movê-lo facilmente?
- [ ] ✅ **Reusabilidade**: Posso utilizar parte dele?
- [ ] ✅ **Interoperabilidade**: Ele trabalha com outros softwares em conjunto?

**Consultar**: `code-review/transicao.md` para checklist detalhado

#### 2.3 Arquitetura e Padrões

Se `specs/` existir:

- [ ] Código segue arquitetura definida em `specs/`?
- [ ] Padrões de design são consistentes?
- [ ] Dependências seguem princípios arquiteturais?
- [ ] Camadas estão bem separadas?

#### 2.4 Testes (Verificação Adicional)

- [ ] Testes cobrem código implementado?
- [ ] Testes são claros e bem nomeados?
- [ ] Testes são independentes?
- [ ] Todos os testes passam?
- [ ] Cobertura é adequada (>80%)?

### 3. Processo de Revisão

1. **Revisar Arquivo por Arquivo**

   - Ir pela lista de arquivos modificados em `.agent-task.md`
   - Para cada arquivo:
     - Ler código linha por linha
     - Aplicar checklist de `.claude/rules/` (se existir)
     - Aplicar checklist de **Software Quality**:
       - Consultar `operacao.md` - 6 critérios
       - Consultar `revisao.md` - 3 critérios
       - Consultar `transicao.md` - 3 critérios
     - Anotar issues encontrados
     - Classificar severidade (🔴 Crítico / 🟠 Alto / 🟡 Médio / 🟢 Baixo)

2. **Aplicar Checklists de Software Quality**

   **Para cada arquivo/módulo, verificar:**

   a) **OPERAÇÃO** (`operacao.md`):

   - Corretitude: Implementa o requisito corretamente?
   - Confiabilidade: Produz resultados precisos e consistentes?
   - Eficácia: Performance é adequada?
   - Integridade: Tem vulnerabilidades de segurança?
   - Usabilidade: API/interface é intuitiva?
   - Adaptabilidade: É configurável quando necessário?

   b) **REVISÃO** (`revisao.md`):

   - Manutenibilidade: Código é legível e bem organizado?
   - Flexibilidade: Segue SOLID, baixo acoplamento?
   - Testabilidade: É fácil de testar?

   c) **TRANSIÇÃO** (`transicao.md`):

   - Portabilidade: Funciona em diferentes ambientes?
   - Reusabilidade: Componentes são modulares e reutilizáveis?
   - Interoperabilidade: Usa formatos/APIs padrão?

3. **Documentar Issues**

   - Criar lista de issues encontrados
   - Para cada issue:
     - **Categoria**: Operação / Revisão / Transição / Rules
     - **Critério**: Qual critério foi violado (ex: "Corretitude", "Manutenibilidade", "Regra 010")
     - **Localização**: arquivo:linha
     - **Descrição**: O que está errado
     - **Severidade**: 🔴 Crítico / 🟠 Alto / 🟡 Médio / 🟢 Baixo
     - **Sugestão**: Como corrigir

4. **Determinar Ação**
   - **✅ Aprovado**: Sem issues críticos/altos → Prosseguir para Documentation
   - **⚠️ Aprovado com ressalvas**: Apenas issues baixos/médios → Prosseguir, documentar
   - **❌ Requer mudanças**: Issues críticos/altos → Voltar para Development

### 4. Finalização

1. **Criar Relatório de Revisão**

```markdown
## 👀 Code Review Report

**Data**: [DATA]
**Revisor**: Code Review Agent
**Resultado**: ✅ Aprovado / ⚠️ Aprovado com ressalvas / ❌ Requer mudanças

### Issues Encontrados

#### 🔴 Críticos (0)

Nenhum.

#### 🟠 Altos (0)

Nenhum.

#### 🟡 Médios (2)

1. **[Revisão/Manutenibilidade]** `arquivo.rs:42` - Nome de variável pouco descritivo (`d` → `data`)
2. **[Revisão/Manutenibilidade]** `utils.rs:15` - Comentário redundante

#### 🟢 Baixos (1)

1. **[Revisão/Manutenibilidade]** `module.rs:88` - Linha muito longa (>100 caracteres)

### Conformidade com .claude/rules/

- ✅ Regra 001: Indentação única
- ✅ Regra 002: Sem else clauses
- ✅ Regra 010: SRP
- ✅ Regra 021: DRY
- ⚠️ Regra 034: Nomes (2 issues médios)

### Software Quality

#### 📋 Operação

- ✅ **Corretitude**: Implementa requisito corretamente
- ✅ **Confiabilidade**: Resultados precisos e consistentes
- ✅ **Eficácia**: Performance adequada
- ✅ **Integridade**: Sem vulnerabilidades de segurança
- ✅ **Usabilidade**: API intuitiva
- ✅ **Adaptabilidade**: Configurável quando necessário

#### 🔄 Revisão

- ⚠️ **Manutenibilidade**: Bom, com 2 issues menores de nomenclatura
- ✅ **Flexibilidade**: Segue SOLID, baixo acoplamento
- ✅ **Testabilidade**: Fácil de testar, dependências injetáveis

#### 🔀 Transição

- ✅ **Portabilidade**: Funciona em diferentes ambientes
- ✅ **Reusabilidade**: Componentes modulares e reutilizáveis
- ✅ **Interoperabilidade**: Usa formatos padrão (JSON)

### Arquitetura

- ✅ Segue padrões definidos em specs/
- ✅ Separação de camadas adequada
- ✅ Dependências corretas

### Métricas de Qualidade

- **Operação**: ⭐⭐⭐⭐⭐ (6/6 critérios atendidos)
- **Revisão**: ⭐⭐⭐⭐☆ (3/3 critérios, com ressalvas menores)
- **Transição**: ⭐⭐⭐⭐⭐ (3/3 critérios atendidos)
- **Testes**: ⭐⭐⭐⭐⭐ (cobertura 92%, todos passando)

### Recomendações

1. Considerar renomear variáveis em arquivo.rs:42 (melhora Manutenibilidade)
2. Remover comentário redundante em utils.rs:15 (melhora Manutenibilidade)

### Decisão

✅ **Aprovado com ressalvas menores**
Issues encontrados são de baixa severidade e não bloqueiam.
Software Quality atende todos os 12 critérios.
Pode prosseguir para Documentation.
```

2. **Atualizar .agent-task.md**

```markdown
## Status por Fase

| Fase          | Status          | Observações                                            |
| ------------- | --------------- | ------------------------------------------------------ |
| Development   | ✅ Completo     | -                                                      |
| Testing       | ✅ Completo     | 15 testes, 100% passando                               |
| Review        | ✅ Completo     | Aprovado com ressalvas menores (3 issues não-críticos) |
| Documentation | 🟡 Em andamento | Pronto para documentação                               |

## Notas e Decisões

- **Code Review**:
  - 0 issues críticos/altos
  - 2 issues médios (nomes)
  - 1 issue baixo (linha longa)
  - Qualidade geral: ⭐⭐⭐⭐⭐
  - Aprovado para prosseguir

---

**Última atualização**: [DATA] por Code Review Agent
```

3. **Comunicar Próxima Fase**
   - Indicar que Documentation Agent pode iniciar
   - Passar contexto da revisão

## Outputs

- Relatório de Code Review detalhado
- `.agent-task.md` atualizado com:
  - Checklist de Review marcado como completo
  - Relatório de issues
  - Decisão (Aprovado/Com ressalvas/Requer mudanças)
  - Status atualizado para Documentation

## Checklist de Auto-validação

Antes de passar para Documentation, verificar:

- [ ] Todos os arquivos modificados foram revisados
- [ ] Regras em `.claude/rules/` foram verificadas (se existir)
- [ ] Padrões em `specs/` foram verificados (se existir)
- [ ] Issues foram documentados e classificados
- [ ] Decisão foi tomada (Aprovar/Ressalvas/Requer mudanças)
- [ ] Relatório de revisão foi criado
- [ ] `.agent-task.md` foi atualizado

## Quando Retornar para Development

Se issues críticos (🔴) ou altos (🟠) forem encontrados:

1. Marcar Review como "❌ Requer mudanças"
2. Documentar issues claramente
3. Voltar para Development Agent com lista de correções
4. Aguardar correções e revisar novamente

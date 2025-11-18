# Code Review Agent - Documentação

Esta skill realiza revisão de código baseada em **Software Quality** e **regras do projeto**.

## 📁 Arquivos da Skill

```
code-review/
├── SKILL.md           # Instruções principais do agente
├── README.md          # Esta documentação
├── operacao.md        # 6 critérios de OPERAÇÃO
├── revisao.md         # 3 critérios de REVISÃO
└── transicao.md       # 3 critérios de TRANSIÇÃO
```

## 🎯 Objetivo

Revisar código e testes implementados, garantindo:

1. **Conformidade com `.claude/rules/`** (se existir)
2. **Software Quality** - 12 critérios universais
3. **Alinhamento com arquitetura** (se `specs/` existir)

## 📊 Software Quality - 12 Critérios

A revisão avalia **3 dimensões** da qualidade de software:

### 📋 OPERAÇÃO (6 critérios)

**Arquivo**: `operacao.md`

Avalia a excelência durante a **execução** do software:

1. ✅ **Corretitude**: Ele faz o que é pedido?
2. ✅ **Confiabilidade**: É preciso?
3. ✅ **Eficácia**: Ele tem boa performance?
4. ✅ **Integridade**: Oferece segurança?
5. ✅ **Usabilidade**: Fácil de usar?
6. ✅ **Adaptabilidade**: Ele se adapta às necessidades do usuário?

### 🔄 REVISÃO (3 critérios)

**Arquivo**: `revisao.md`

Avalia a capacidade de ser **revisado e evoluído**:

1. ✅ **Manutenibilidade**: Fácil de corrigir?
2. ✅ **Flexibilidade**: Fácil de mudar?
3. ✅ **Testabilidade**: Posso testar seu funcionamento?

### 🔀 TRANSIÇÃO (3 critérios)

**Arquivo**: `transicao.md`

Avalia a capacidade de **transitar entre ambientes**:

1. ✅ **Portabilidade**: Consigo movê-lo facilmente?
2. ✅ **Reusabilidade**: Posso utilizar parte dele?
3. ✅ **Interoperabilidade**: Ele trabalha com outros softwares em conjunto?

## 🔍 Como Funciona

### 1. Leitura de Contexto

- Lê `.agent-task.md` para entender o que foi implementado
- Verifica se existem `.claude/rules/` (regras de código)
- Verifica se existem `specs/` (padrões arquiteturais)

### 2. Revisão Sistemática

Para cada arquivo modificado:

1. **Aplica `.claude/rules/`** (se existir)

   - Verifica conformidade com cada regra
   - Documenta violações com número da regra

2. **Aplica Software Quality**

   - **Operação**: 6 critérios (ver `operacao.md`)
   - **Revisão**: 3 critérios (ver `revisao.md`)
   - **Transição**: 3 critérios (ver `transicao.md`)

3. **Valida Arquitetura** (se `specs/` existir)
   - Segue padrões definidos?
   - Dependências corretas?
   - Camadas bem separadas?

### 3. Classificação de Issues

Cada issue encontrado é classificado por:

- **Categoria**: Operação / Revisão / Transição / Rules
- **Critério**: Qual foi violado (ex: "Corretitude", "Manutenibilidade", "Regra 010")
- **Severidade**:
  - 🔴 **Crítico**: Bloqueia aprovação (ex: funcionalidade não implementada, vulnerabilidade)
  - 🟠 **Alto**: Aprovação com ressalvas (ex: performance muito degradada, alto acoplamento)
  - 🟡 **Médio**: Não bloqueia (ex: nomes pouco descritivos, usabilidade comprometida)
  - 🟢 **Baixo**: Sugestão (ex: linhas muito longas, pequenas melhorias)

### 4. Decisão

- **✅ Aprovado**: Sem issues críticos/altos → Prossegue para Documentation
- **⚠️ Aprovado com ressalvas**: Apenas issues médios/baixos → Prossegue, documenta
- **❌ Requer mudanças**: Issues críticos/altos → Volta para Development

## 📋 Exemplo de Relatório

```markdown
## 👀 Code Review Report

**Resultado**: ✅ Aprovado com ressalvas menores

### Issues Encontrados

#### 🔴 Críticos (0)

Nenhum.

#### 🟠 Altos (0)

Nenhum.

#### 🟡 Médios (2)

1. **[Revisão/Manutenibilidade]** `user.rs:42` - Nome de variável pouco descritivo
2. **[Operação/Usabilidade]** `api.rs:88` - Mensagem de erro genérica

#### 🟢 Baixos (1)

1. **[Revisão/Manutenibilidade]** `utils.rs:120` - Linha muito longa

### Conformidade com .claude/rules/

- ✅ Regra 001: Indentação única
- ✅ Regra 010: SRP
- ⚠️ Regra 034: Nomes (1 issue médio)

### Software Quality

#### 📋 Operação (6/6)

- ✅ Corretitude
- ✅ Confiabilidade
- ✅ Eficácia
- ✅ Integridade
- ⚠️ Usabilidade (1 issue médio)
- ✅ Adaptabilidade

#### 🔄 Revisão (3/3)

- ⚠️ Manutenibilidade (2 issues menores)
- ✅ Flexibilidade
- ✅ Testabilidade

#### 🔀 Transição (3/3)

- ✅ Portabilidade
- ✅ Reusabilidade
- ✅ Interoperabilidade

### Métricas

- **Operação**: ⭐⭐⭐⭐☆ (5/6)
- **Revisão**: ⭐⭐⭐⭐☆ (3/3 com ressalvas)
- **Transição**: ⭐⭐⭐⭐⭐ (3/3)

### Decisão

✅ **Aprovado com ressalvas menores**
Pode prosseguir para Documentation.
```

## 🎯 Uso

### Standalone

```
@skill code-review
```

### Como Parte do Workflow

O Code Review Agent é automaticamente chamado após Testing Agent no workflow completo.

## 📊 Software Quality - Detalhamento dos 12 Critérios

### Visão Geral

A qualidade do software é medida da excelência de um programa, abrangendo critérios essenciais como **corretitude**, **confiabilidade**, **eficácia**, **integridade** e **usabilidade**. Além disso, inclui a capacidade de **adaptação**, **portabilidade** e **reusabilidade**, assegurando a **interoperabilidade** e facilitando a **manutenção**. Sua **flexibilidade** e **testabilidade** são fundamentais para garantir um software duradouro e de alto desempenho.

### 3 Dimensões da Qualidade

```
┌─────────────────────────────────────────────────┐
│           SOFTWARE QUALITY (12 critérios)       │
├─────────────────────────────────────────────────┤
│                                                 │
│  📋 OPERAÇÃO (6)        Durante execução        │
│  🔄 REVISÃO (3)         Evolução do código      │
│  🔀 TRANSIÇÃO (3)       Entre ambientes         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 📋 OPERAÇÃO (6 critérios)

**Avalia**: Excelência durante a **execução** do software

#### 1. ✅ Corretitude

**Pergunta**: Ele faz o que é pedido?

- Implementa exatamente o requisito?
- Atende critérios de aceitação?
- Edge cases tratados?

**Severidade de violação**: 🔴 Crítico

#### 2. ✅ Confiabilidade

**Pergunta**: É preciso?

- Produz resultados corretos e consistentes?
- Sem comportamento não-determinístico?
- Sem race conditions?

**Severidade de violação**: 🔴 Crítico / 🟠 Alto

#### 3. ✅ Eficácia

**Pergunta**: Ele tem boa performance?

- Sem loops/recursões desnecessárias?
- Estruturas de dados apropriadas?
- Algoritmos adequados?

**Severidade de violação**: 🟠 Alto / 🟡 Médio

#### 4. ✅ Integridade

**Pergunta**: Oferece segurança?

- Sem vulnerabilidades óbvias?
- Inputs validados e sanitizados?
- Dados sensíveis protegidos?

**Severidade de violação**: 🔴 Crítico / 🟠 Alto

#### 5. ✅ Usabilidade

**Pergunta**: Fácil de usar?

- API/interface intuitiva?
- Mensagens de erro úteis?
- Documentação suficiente?

**Severidade de violação**: 🟡 Médio / 🟢 Baixo

#### 6. ✅ Adaptabilidade

**Pergunta**: Ele se adapta às necessidades do usuário?

- Configurável quando apropriado?
- Sem valores hardcoded?
- Lida com diferentes ambientes?

**Severidade de violação**: 🟠 Alto / 🟡 Médio

### 🔄 REVISÃO (3 critérios)

**Avalia**: Capacidade de ser **revisado e evoluído**

#### 7. ✅ Manutenibilidade

**Pergunta**: Fácil de corrigir?

- Código legível e bem organizado?
- Funções pequenas e focadas?
- Sem código duplicado?

**Relacionado com .claude/rules/**: 001, 002, 006, 007, 021, 022, 026, 034

**Severidade de violação**: 🟠 Alto / 🟡 Médio

#### 8. ✅ Flexibilidade

**Pergunta**: Fácil de mudar?

- Segue princípios SOLID?
- Baixo acoplamento?
- Extensível sem modificar existente?

**Relacionado com .claude/rules/**: 010, 011, 012, 013, 014, 015-020

**Severidade de violação**: 🔴 Crítico / 🟠 Alto

#### 9. ✅ Testabilidade

**Pergunta**: Posso testar seu funcionamento?

- Código modular e isolado?
- Dependências mockáveis?
- Sem side effects ocultos?

**Relacionado com .claude/rules/**: 010, 014, 032, 036

**Severidade de violação**: 🟠 Alto / 🟡 Médio

### 🔀 TRANSIÇÃO (3 critérios)

**Avalia**: Capacidade de **transitar entre ambientes**

#### 10. ✅ Portabilidade

**Pergunta**: Consigo movê-lo facilmente?

- Sem dependências específicas de plataforma?
- Paths agnósticos de SO?
- Configuração externalizável?

**Relacionado com .claude/rules/**: 024, 031

**Severidade de violação**: 🟠 Alto / 🟡 Médio

#### 11. ✅ Reusabilidade

**Pergunta**: Posso utilizar parte dele?

- Código modularizado?
- Responsabilidades claras?
- Componentes standalone?

**Relacionado com .claude/rules/**: 010, 014, 015, 016, 017

**Severidade de violação**: 🟠 Alto / 🟡 Médio

#### 12. ✅ Interoperabilidade

**Pergunta**: Ele trabalha com outros softwares em conjunto?

- Usa formatos padrão (JSON, XML)?
- APIs seguem convenções (REST, gRPC)?
- Versionamento mantido?

**Severidade de violação**: 🟠 Alto / 🟡 Médio

## 🔗 Integração com .claude/rules/

Os critérios de Software Quality **complementam** (não substituem) as regras em `.claude/rules/`:

| Software Quality | .claude/rules/ Relacionadas            |
| ---------------- | -------------------------------------- |
| Manutenibilidade | 001, 002, 006, 007, 021, 022, 026, 034 |
| Flexibilidade    | 010, 011, 012, 013, 014, 015-020       |
| Testabilidade    | 010, 014, 032, 036                     |
| Portabilidade    | 024, 031                               |
| Reusabilidade    | 010, 014, 015, 016, 017                |

**Fluxo de revisão:**

1. Aplicar `.claude/rules/` (regras específicas do projeto)
2. Aplicar Software Quality (critérios universais)
3. Documentar issues de ambos
4. Tomar decisão (Aprovar/Ressalvas/Requer mudanças)

## 📚 Referências

- **Software Quality**: Baseado em ISO/IEC 25010 (Software Quality Model)
- **`.claude/rules/`**: Regras específicas do projeto (39 regras se existir)
- **`specs/`**: Documentação arquitetural Arc42 (se existir)

## 🔑 Principais Diferenças

### Antes

- Revisão manual e subjetiva
- Critérios não documentados
- Inconsistente entre revisões

### Agora

- **12 critérios objetivos** de Software Quality
- **Checklists detalhados** (operacao.md, revisao.md, transicao.md)
- **Classificação clara** de severidade
- **Rastreável** e consistente
- **Integrado com regras do projeto**

---

**Versão**: 1.0
**Baseado em**: ISO/IEC 25010
**Compatível com**: Qualquer linguagem de programação

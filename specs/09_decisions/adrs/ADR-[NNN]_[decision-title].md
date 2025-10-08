# ADR-[NÚMERO]: [Título da Decisão]

**Data**: [YYYY-MM-DD]  
**Status**: [🟢 Aceita | 🟡 Proposta | 🔴 Deprecated | ⚫ Superseded por ADR-XXX]  
**Decisores**: [PREENCHER: Nome1, Nome2, Nome3]  
**Área de Impacto**: [Frontend | Backend | Infraestrutura | DevOps | Segurança | Dados | Todas]

---

## 📋 Contexto

[PREENCHER: Qual o problema ou situação que motivou esta decisão?]

### Forças em Jogo

**Forças Técnicas**:

- [PREENCHER: Força técnica 1]
- [PREENCHER: Força técnica 2]

**Forças de Negócio**:

- [PREENCHER: Força de negócio 1]
- [PREENCHER: Força de negócio 2]

**Restrições**:

- [PREENCHER: Restrição 1 - ex: Budget, Prazo]
- [PREENCHER: Restrição 2 - ex: Tecnologia legada]

### Contexto Adicional

**Referências Externas**:

- [PREENCHER: Link para RFC, Spike, POC]
- [PREENCHER: Link para discussão relevante]

**Motivação**: [PREENCHER: Por que esta decisão é necessária agora?]

---

## ✅ Decisão

[PREENCHER: O que foi decidido? Seja claro e objetivo.]

### Abordagem Escolhida

[PREENCHER: Descrição detalhada da solução escolhida]

**Resumo Técnico**:

```
[PREENCHER: Pseudo-código, diagrama, ou descrição técnica]

Exemplo:
- Usar PostgreSQL como banco principal
- Implementar cache com Redis
- Pattern: Repository + Unit of Work
```

**Implementação**:

1. [PREENCHER: Passo 1 de implementação]
2. [PREENCHER: Passo 2 de implementação]
3. [PREENCHER: Passo 3 de implementação]

**Containers Afetados**: [CNT-XXX], [CNT-YYY]

**Componentes Afetados**: [CMP-XXX], [CMP-YYY]

---

## 🔀 Alternativas Consideradas

### Alternativa 1: [Nome da Alternativa]

**Descrição**: [PREENCHER]

**Prós**:

- ✅ [PREENCHER: Vantagem 1]
- ✅ [PREENCHER: Vantagem 2]
- ✅ [PREENCHER: Vantagem 3]

**Contras**:

- ❌ [PREENCHER: Desvantagem 1]
- ❌ [PREENCHER: Desvantagem 2]
- ❌ [PREENCHER: Desvantagem 3]

**Por que foi rejeitada**: [PREENCHER]

---

### Alternativa 2: [Nome da Alternativa]

**Descrição**: [PREENCHER]

**Prós**:

- ✅ [PREENCHER]

**Contras**:

- ❌ [PREENCHER]

**Por que foi rejeitada**: [PREENCHER]

---

### Alternativa 3: [Nome da Alternativa]

[PREENCHER: Repetir estrutura acima]

---

## 📊 Comparação das Alternativas

| Critério | Decisão Escolhida | Alt 1 | Alt 2 | Alt 3 |
|----------|-------------------|-------|-------|-------|
| **Custo** | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |
| **Performance** | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |
| **Manutenibilidade** | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |
| **Curva de Aprendizado** | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |
| **Escalabilidade** | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |
| **Risco** | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

---

## 🎯 Consequências

### Positivas ✅

- [PREENCHER: Consequência positiva 1]
- [PREENCHER: Consequência positiva 2]
- [PREENCHER: Consequência positiva 3]

### Negativas ❌

- [PREENCHER: Consequência negativa 1 - como será mitigada]
- [PREENCHER: Consequência negativa 2 - como será mitigada]
- [PREENCHER: Consequência negativa 3 - como será mitigada]

### Neutras 🔄

- [PREENCHER: Mudança que é apenas diferente, não melhor/pior]

---

## ⚠️ Riscos

| ID | Risco | Probabilidade | Impacto | Mitigação |
|----|-------|---------------|---------|-----------|
| R-[XXX] | [PREENCHER] | [Alta/Média/Baixa] | [Alto/Médio/Baixo] | [PREENCHER] |
| R-[XXX] | [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

**Riscos Residuais**: [PREENCHER: Riscos que permanecerão mesmo após mitigação]

---

## 📝 Notas de Implementação

### Impacto em Containers

| Container | Impacto | Ação Necessária | Prazo |
|-----------|---------|-----------------|-------|
| [CNT-XXX] | [Alto/Médio/Baixo] | [PREENCHER] | [YYYY-MM-DD] |
| [CNT-YYY] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

### Impacto em Componentes

| Componente | Modificação | Esforço | Owner |
|------------|-------------|---------|-------|
| [CMP-XXX] | [Reescrita/Adaptação/Novo] | [Alto/Médio/Baixo] | [PREENCHER] |
| [CMP-YYY] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

### Dependências

**Tecnologias/Bibliotecas Novas**:

- [PREENCHER: Nome] - [Versão] - [Por quê]
- [PREENCHER: Nome] - [Versão] - [Por quê]

**Integrações Externas**:

- [PREENCHER: Sistema X - nova integração necessária]

### Requisitos de Infraestrutura

- [PREENCHER: ex: Provisionamento de novo serviço]
- [PREENCHER: ex: Mudança em configuração de rede]
- [PREENCHER: ex: Novos secrets/credenciais]

### Migration Path

**Para Sistemas Existentes**:

1. [PREENCHER: Passo 1 de migração]
2. [PREENCHER: Passo 2 de migração]
3. [PREENCHER: Passo 3 de migração]

**Rollback Plan**:

- [PREENCHER: Como reverter se necessário]

**Feature Flags**:

- [PREENCHER: Flags necessárias para rollout gradual]

---

## 📈 Métricas de Sucesso

**Como saberemos que esta decisão foi bem-sucedida?**

| Métrica | Baseline (Antes) | Target (Depois) | Prazo para Atingir |
|---------|------------------|-----------------|-------------------|
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [YYYY-MM-DD] |
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [YYYY-MM-DD] |

**KPIs de Acompanhamento**:

- [PREENCHER: KPI 1 e como medir]
- [PREENCHER: KPI 2 e como medir]

---

## 🗓️ Timeline

| Fase | Descrição | Início | Fim | Status |
|------|-----------|--------|-----|--------|
| 1 | [PREENCHER: ex: Design detalhado] | [YYYY-MM-DD] | [YYYY-MM-DD] | [🟢/🟡/🔴] |
| 2 | [PREENCHER: ex: Implementação] | [YYYY-MM-DD] | [YYYY-MM-DD] | [STATUS] |
| 3 | [PREENCHER: ex: Testes] | [YYYY-MM-DD] | [YYYY-MM-DD] | [STATUS] |
| 4 | [PREENCHER: ex: Deploy produção] | [YYYY-MM-DD] | [YYYY-MM-DD] | [STATUS] |

**Milestones**:

- [YYYY-MM-DD]: [PREENCHER: Milestone 1]
- [YYYY-MM-DD]: [PREENCHER: Milestone 2]

---

## 💰 Impacto Financeiro

**Investimento Inicial**: [PREENCHER: Custo de implementação]

**Custo Recorrente**: [PREENCHER: Mudança no custo operacional]

**ROI Esperado**: [PREENCHER: Retorno sobre investimento]

**Break-even**: [PREENCHER: Quando custo se paga]

---

## 👥 Stakeholders Impactados

| Stakeholder | Impacto | Comunicação | Data |
|-------------|---------|-------------|------|
| [Time Dev] | [Alto/Médio/Baixo] | [PREENCHER: Como foi comunicado] | [YYYY-MM-DD] |
| [Time Ops] | [PREENCHER] | [PREENCHER] | [YYYY-MM-DD] |
| [Usuários] | [PREENCHER] | [PREENCHER] | [YYYY-MM-DD] |

---

## 📚 Referências

**Documentação**:

- [PREENCHER: Link para spike técnico]
- [PREENCHER: Link para POC]
- [PREENCHER: Link para RFC]

**Artigos/Papers**:

- [PREENCHER: Artigo que influenciou a decisão]

**Discussões**:

- [PREENCHER: Link para thread no Slack/Teams]
- [PREENCHER: Link para issue/ticket]

**Código de Exemplo**:

- [PREENCHER: Link para branch/commit de POC]

---

## 🔄 Revisão e Validade

**Data de Revisão Planejada**: [YYYY-MM-DD]

**Condições para Revisão**:

- [PREENCHER: ex: Após 6 meses de uso]
- [PREENCHER: ex: Se métrica X não for atingida]
- [PREENCHER: ex: Se tecnologia Y lançar nova versão]

**Critérios para Deprecation**:

- [PREENCHER: Quando esta decisão deve ser revista]

---

## 🔗 Navegação

**Hierarquia**:

- ⬆️ **Parent**: [Architectural Decisions Index](../009_architectural-decisions.md)
- ⬇️ **Children**: N/A

**Relacionados**:

- 📋 **ADRs Relacionadas**:
  - [ADR-XXX Título](./ADR-XXX_titulo.md) - [Como se relaciona]
- 🏗️ **Containers Impactados**:
  - [CNT-XXX Nome](../../05_building-blocks/containers/CNT-XXX_nome.md)
- 🔧 **Componentes Impactados**:
  - [CMP-XXX Nome](../../05_building-blocks/components/CNT-XXX_container/CMP-XXX_nome.md)
- 📖 **Conceitos**: [Crosscutting Concepts](../../08_crosscutting/008_crosscutting-concepts.md)
- ⚠️ **Riscos**: [Risks](../../11_risks/011_risks-and-technical-debt.md)
- 🎯 **Quality**: [Quality Requirements](../../10_quality/010_quality-requirements.md)

---

## 📝 Histórico de Atualizações

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| [YYYY-MM-DD] | 1.0 | Criação da ADR | [Nome] |
| [YYYY-MM-DD] | 1.1 | [Atualização X] | [Nome] |

---

**Criado em**: [YYYY-MM-DD]  
**Atualizado em**: [YYYY-MM-DD]  
**Autor Principal**: [PREENCHER]  
**Revisores**: [PREENCHER: Nome1, Nome2]  
**Aprovado por**: [PREENCHER]

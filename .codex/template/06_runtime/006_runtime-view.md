# 6. Visão de Runtime
<!-- markdownlint-disable MD012 MD029 MD031 MD032 MD036 -->

**Status**: [🔴 Não Iniciado | 🟡 Em Progresso | 🟢 Completo]
**Última atualização**: [YYYY-MM-DD]

---

## 6.1 Cenários Principais

Os cenários de execução detalhados e seus respectivos critérios de aceitação automatizáveis são documentados utilizando o formato Gherkin (Given/When/Then).

**Localização dos Cenários**: `scenarios/`

**Formato dos Arquivos**:

- `SCN-[NÚMERO]_[nome-do-cenario].md`
- **Template**: (Reutilizar template do Capítulo 10/anterior)
- **Rastreabilidade**: Cada SCN deve referenciar um cenário principal (`6.1`) e um componente (`CMP-XXX`).

---

## 6.2 Interações Assíncronas

### [Evento 1: Nome do Evento]

**Trigger**: [PREENCHER: O que dispara este evento]

**Produtores**: [PREENCHER]

**Consumidores**: [PREENCHER]

**Payload**:

```json
[PREENCHER: Estrutura do evento]
{
  "eventType": "...",
  "timestamp": "...",
  "data": { }
}
```

**Diagrama de Fluxo**:

```text
[PREENCHER: Diagrama mostrando propagação do evento]
```

---

## 6.3 Estados e Transições

### [Entidade Principal]: Máquina de Estados

**Diagrama**:

```mermaid
[PREENCHER: State diagram]

Exemplo:
stateDiagram-v2
    [*] --> Criado
    Criado --> Ativo: ativar()
    Ativo --> Suspenso: suspender()
    Suspenso --> Ativo: reativar()
    Ativo --> Cancelado: cancelar()
    Cancelado --> [*]
```

**Estados Possíveis**:

- **[Estado 1]**: [Descrição]
- **[Estado 2]**: [Descrição]

**Transições**:

| De | Para | Trigger | Validações |
|----|------|---------|------------|
| [PREENCHER] | [PREENCHER] | [PREENCHER] | [PREENCHER] |

---

## 6.4 Processamento em Background

### [Job/Worker 1]

**Frequência**: [PREENCHER: Cron, event-driven, etc]

**Responsabilidade**: [PREENCHER]

**Fluxo**:

1. [PREENCHER]
2. [PREENCHER]

**Retry Policy**: [PREENCHER]

**Timeout**: [PREENCHER]

---

**Referências**: [Links para diagramas detalhados, logs de exemplo]

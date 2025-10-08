# Sistema Externo: [NOME DO SISTEMA]

**ID**: SYS-[NÚMERO]
**Tipo**: Sistema Externo
**Categoria**: [API | SaaS | Legacy | Database | Service]
**Criticidade**: [🔴 Alta | 🟡 Média | 🟢 Baixa]
**Status**: [🟢 Integrado | 🟡 Em Integração | 🔴 Planejado | 🔴 Deprecated]

---

## 📋 Identificação

**Nome Oficial**: [PREENCHER]

**Fornecedor/Proprietário**: [PREENCHER: Empresa ou time responsável]

**Versão Atual**: [PREENCHER: v1.2.3]

**Propósito**: [PREENCHER: O que este sistema faz em 1-2 frases]

**Documentação Oficial**: [PREENCHER: Link para docs]

**Portal do Desenvolvedor**: [PREENCHER: Link se aplicável]

---

## 🔗 Integração

### Tipo de Comunicação

- **Direção**: [Nosso Sistema → Externo | Externo → Nosso Sistema | Bidirecional]
- **Padrão**: [Síncrono | Assíncrono | Híbrido]
- **Iniciador**: [Quem inicia a comunicação]

### Protocolo

- **Tipo**: [REST | SOAP | GraphQL | gRPC | Mensageria | Webhook | FTP | Outro]
- **Versão API**: [PREENCHER: v1, v2, etc]
- **Endpoint Base**: [PREENCHER: URL base]
- **Ambiente Sandbox**: [PREENCHER: URL de teste]

### Autenticação

- **Método**: [API Key | OAuth 2.0 | JWT | Basic Auth | mTLS | Certificate | Outro]
- **Escopo/Permissões**: [PREENCHER]
- **Renovação Credenciais**: [PREENCHER: Como/quando renovar]
- **Localização Secrets**: [PREENCHER: AWS Secrets Manager, Vault, etc]

---

## 📊 Dados Trocados

### Request (Nosso Sistema → Externo)

**Formato**: [JSON | XML | Protocol Buffers | Form-Data | Outro]

**Headers Obrigatórios**:

```
Authorization: Bearer {token}
Content-Type: application/json
[PREENCHER: outros headers]
```

**Estrutura de Payload**:

```json
[PREENCHER: Exemplo de payload de request]
{
  "campo1": "valor",
  "campo2": 123,
  "nested": {
    "campo3": true
  }
}
```

**Validações**:

- [PREENCHER: Campo obrigatório 1]
- [PREENCHER: Restrição de valor 2]

**Frequência**: [PREENCHER: X requests/segundo, por dia, etc]

---

### Response (Externo → Nosso Sistema)

**Formato**: [JSON | XML | Protocol Buffers | Outro]

**Status Codes Esperados**:

- `200`: [PREENCHER: Sucesso]
- `400`: [PREENCHER: Erro de validação]
- `401`: [PREENCHER: Não autorizado]
- `429`: [PREENCHER: Rate limit]
- `500`: [PREENCHER: Erro interno]

**Estrutura de Payload de Sucesso**:

```json
[PREENCHER: Exemplo de payload de response]
{
  "status": "success",
  "data": {
    "id": "123",
    "result": "..."
  },
  "metadata": {
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Estrutura de Payload de Erro**:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Descrição do erro"
  }
}
```

---

## ⚙️ SLA e Disponibilidade

**SLA Contratado**: [PREENCHER: ex: 99.9%]

**Uptime Histórico**: [PREENCHER: ex: 99.95%]

**Tempo de Resposta Esperado**:

- **p50**: [PREENCHER: ex: 100ms]
- **p95**: [PREENCHER: ex: 200ms]
- **p99**: [PREENCHER: ex: 500ms]

**Rate Limit**: [PREENCHER: ex: 1000 requests/min por chave]

**Throttling**: [PREENCHER: Como sistema throttles requests]

**Horário de Manutenção**: [PREENCHER: Quando o sistema fica indisponível]

**Status Page**: [PREENCHER: Link para página de status]

---

## 🔒 Segurança

**Dados Sensíveis Trafegados**:

- [PREENCHER: PII, Financeiros, Saúde, etc]
- [PREENCHER: Detalhes]

**Criptografia em Trânsito**: [TLS 1.2 | TLS 1.3 | Outro]

**Criptografia em Repouso**: [PREENCHER: Se aplicável]

**Compliance**:

- [PREENCHER: LGPD]
- [PREENCHER: PCI-DSS]
- [PREENCHER: Outros]

**IP Whitelist**: [PREENCHER: IPs permitidos se aplicável]

**Auditoria**: [PREENCHER: Como são auditadas as chamadas]

---

## 🚨 Tratamento de Erros

### Códigos de Erro Principais

| Código | Significado | Ação do Nosso Sistema | Retry? |
|--------|-------------|-----------------------|--------|
| [PREENCHER: 400] | [Erro de validação] | [Log + retornar erro ao client] | Não |
| [PREENCHER: 429] | [Rate limit] | [Backoff exponencial] | Sim |
| [PREENCHER: 500] | [Erro interno] | [Retry + Alert] | Sim |
| [PREENCHER: 503] | [Serviço indisponível] | [Fallback + Alert] | Sim |

### Estratégia de Retry

- **Tentativas**: [PREENCHER: 3 tentativas]
- **Backoff**: [Exponencial | Linear | Fixo] - [PREENCHER: ex: 1s, 2s, 4s]
- **Timeout**: [PREENCHER: 30 segundos]
- **Circuit Breaker**: [Sim | Não] - [PREENCHER: Configuração]

### Fallback

[PREENCHER: O que fazer quando sistema está indisponível]

**Estratégia**:

- [PREENCHER: ex: Usar cache local]
- [PREENCHER: ex: Degradação graciosa]
- [PREENCHER: ex: Sistema alternativo]

**Impacto no Usuário**: [PREENCHER: O que usuário experimenta]

---

## 💰 Custos

**Modelo de Cobrança**: [PREENCHER: Por request, Mensal fixo, Freemium, Tier-based]

**Custo Atual Mensal**: [PREENCHER: R$ XXX,00 / $XXX.00]

**Custo por Request/Transação**: [PREENCHER: Se aplicável]

**Limite do Plano Atual**: [PREENCHER: ex: 1M requests/mês]

**Projeção de Custo**: [PREENCHER: Crescimento esperado baseado em uso]

**Budget Alerts**: [PREENCHER: Threshold de alerta]

---

## 📈 Monitoramento

**Dashboard**: [PREENCHER: Link para dashboard interno]

**Métricas Principais Monitoradas**:

- **Latência** (p95): [Target: < Xms]
- **Taxa de Erro**: [Target: < Y%]
- **Taxa de Sucesso**: [Target: > Z%]
- **Disponibilidade**: [Target: > 99.X%]

**Alertas Configurados**:

| Alerta | Condição | Severidade | Ação |
|--------|----------|------------|------|
| [PREENCHER] | [Taxa de erro > 5%] | [🔴 Crítico] | [PagerDuty + Slack] |
| [PREENCHER] | [Latência p95 > 1s] | [🟡 Aviso] | [Slack] |
| [PREENCHER] | [Disponibilidade < 99%] | [🔴 Crítico] | [PagerDuty] |

**Logs**:

- **Todas as chamadas**: [Sim | Apenas erros]
- **Retenção**: [PREENCHER: 90 dias]
- **Ferramenta**: [PREENCHER: CloudWatch, DataDog, etc]

---

## 🔄 Dependências

### Nosso Sistema Depende Deste Sistema Para

- [PREENCHER: Funcionalidade crítica 1] - **Container**: [CNT-XXX]
- [PREENCHER: Funcionalidade crítica 2] - **Container**: [CNT-YYY]

### Impacto se Ficar Indisponível

**Severidade**: [🔴 Crítica | 🟡 Alta | 🟢 Baixa]

**Consequência Imediata**:

- [PREENCHER: O que para de funcionar]
- [PREENCHER: Impacto no usuário]

**Consequência de Longo Prazo**:

- [PREENCHER: Se ficar indisponível por > 1h]

**Mitigação/Plano B**:

1. [PREENCHER: Ação imediata]
2. [PREENCHER: Alternativa temporária]
3. [PREENCHER: Plano de recuperação]

**RTO** (Recovery Time Objective): [PREENCHER: Quanto tempo podemos ficar sem]

---

## 🔄 Webhooks (Se Aplicável)

### Webhooks Recebidos

**Endpoint Nosso**: [PREENCHER: https://nosso-sistema/webhooks/sistema-externo]

**Eventos Recebidos**:

- `[EVENTO_1]`: [Descrição e payload]
- `[EVENTO_2]`: [Descrição e payload]

**Validação**:

- [PREENCHER: Como validamos que webhook é legítimo]
- [PREENCHER: Signature, IP whitelist, etc]

**Retry Policy Deles**: [PREENCHER: Como sistema externo re-tenta]

**Idempotência**: [PREENCHER: Como garantimos processamento único]

---

## 📝 Histórico de Mudanças

| Data | Versão | Mudança | Impacto | Responsável |
|------|--------|---------|---------|-------------|
| [YYYY-MM-DD] | [v1.0] | [Integração inicial] | [Nenhum] | [Nome] |
| [YYYY-MM-DD] | [v1.1] | [Adicionado endpoint X] | [Feature Y] | [Nome] |
| [YYYY-MM-DD] | [v2.0] | [Breaking change Z] | [🔴 Alto] | [Nome] |

### Versão Atual vs Próxima

**Versão em Uso**: [PREENCHER: v1.2]

**Próxima Versão**: [PREENCHER: v2.0]

**Migration Path**: [PREENCHER: Como vamos migrar]

**Deadline**: [PREENCHER: Data limite para migrar]

---

## 🔗 Referências

- **Documentação Técnica**: [PREENCHER: Link]
- **OpenAPI/Swagger**: [PREENCHER: Link]
- **Portal do Desenvolvedor**: [PREENCHER: Link]
- **Status Page**: [PREENCHER: Link]
- **Changelog**: [PREENCHER: Link]
- **Suporte**: [PREENCHER: Email/Chat/Ticket]
- **Slack Channel**: [PREENCHER: Se houver]

---

## 🔗 Navegação

**Hierarquia**:

- ⬆️ **Parent**: [System Context](../003_context-and-scope.md)
- ⬇️ **Children**: N/A

**Relacionados**:

- 🏗️ **Containers que Integram**:
  - [CNT-XXX Nome](../../05_building-blocks/containers/CNT-XXX_nome.md)
- 🎬 **Cenários de Integração**: [Runtime View](../../06_runtime/006_runtime-view.md#integracao-sistema-X)
- ⚠️ **Riscos**: [Risks](../../11_risks/011_risks-and-technical-debt.md#R-XXX)
- 📝 **ADRs Relacionadas**: [ADR-XXX](../../09_decisions/adrs/ADR-XXX_titulo.md)
- 📖 **Glossário**: [Termos](../../12_glossary/012_glossary.md)

---

**Criado em**: [YYYY-MM-DD]  
**Atualizado em**: [YYYY-MM-DD]  
**Responsável**: [PREENCHER]  
**Contato do Fornecedor**: [PREENCHER]

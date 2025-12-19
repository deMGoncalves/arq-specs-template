# Logging Seguro sem Dados Sensíveis

**ID**: SEGURANÇA-059
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Logs devem excluir dados sensíveis (senhas, tokens, PII, cartões de crédito). Implementar mascaramento automático, log apenas identifiers hasheados, e controlar acesso a logs com RBAC.

## Por que importa

Logs contendo dados sensíveis violam GDPR/LGPD e expõem informações em caso de vazamento de logs ou acesso não autorizado. 30% dos vazamentos de dados ocorrem via logs mal protegidos. Logs são frequentemente replicados para múltiplos sistemas (SIEM, Cloudwatch, Splunk), ampliando superfície de exposição.

## Critérios Objetivos

- [ ] Senhas, tokens, session IDs nunca são logados (nem em debug mode)
- [ ] PII é mascarado (mostrar apenas 4 últimos dígitos de cartão, hash de emails)
- [ ] Bibliotecas de logging têm mascaramento automático configurado (regex patterns)
- [ ] Logs estruturados (JSON) facilitam redaction automática de campos sensíveis
- [ ] Acesso a logs em produção é restrito via RBAC e auditado

## Exceções Permitidas

- **Logs de auditoria**: Podem conter hashes de identificadores sensíveis (não valores em texto plano)
- **Debug temporário**: Em desenvolvimento local pode logar mais detalhes, desde que não vá para produção

## Como Detectar

### Manual

Revisar código de logging procurando por variáveis sensíveis. Analisar sample de logs de produção verificando exposição de dados.

### Automático

Secret scanners como TruffleHog analisam logs procurando por patterns de dados sensíveis. SIEM rules podem alertar sobre presença de PII em logs.

## Relacionada com

- [046 - Tratamento de Erros Seguro](046_tratamento-erros-seguro.md): complementa
- [047 - Proteção de Dados Sensíveis](047_protecao-dados-sensiveis.md): implementa
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): implementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

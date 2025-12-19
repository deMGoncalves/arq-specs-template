# Proteção de Dados Sensíveis (PII, PCI, HIPAA)

**ID**: SEGURANÇA-047
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Dados pessoais identificáveis (PII), dados de pagamento (PCI) e dados de saúde (HIPAA) devem ter proteções especiais incluindo criptografia, controle de acesso restrito, mascaramento em logs e conformidade com regulamentações.

## Por que importa

Vazamento de dados sensíveis resulta em multas regulatórias (GDPR até €20M ou 4% do faturamento), danos reputacionais e processos judiciais. 60% das pequenas empresas fecham em 6 meses após vazamento de dados. Conformidade com GDPR, LGPD, PCI-DSS e HIPAA é obrigatória.

## Critérios Objetivos

- [ ] Dados PII são minimizados (coletar apenas o necessário) e criptografados em repouso
- [ ] Logs e monitoring mascaram dados sensíveis (mostrar apenas 4 últimos dígitos de cartão, hash de emails)
- [ ] Dados de pagamento seguem PCI-DSS (tokenização, nunca armazenar CVV)
- [ ] Direitos GDPR implementados: acesso, retificação, apagamento, portabilidade
- [ ] Retenção de dados configurada com deleção automática após período legal

## Exceções Permitidas

- **Logs de auditoria**: Podem reter hashes de dados sensíveis para investigação forense (não dados em texto plano)
- **Backups legais**: Podem reter dados além do período de retenção se houver litígio ativo

## Como Detectar

### Manual

Revisar código que manipula PII/PCI procurando por criptografia e mascaramento em logs. Auditar banco de dados verificando campos sensíveis.

### Automático

Secret scanners como TruffleHog detectam dados sensíveis em logs e código. DLP (Data Loss Prevention) tools monitoram exfiltração de dados.

## Relacionada com

- [045 - Criptografia de Dados](045_criptografia-dados-aes256.md): implementa
- [059 - Logging Seguro](059_logging-seguro-sem-pii.md): complementa
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): implementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

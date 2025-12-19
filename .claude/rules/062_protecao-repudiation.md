# Proteção contra Repudiation (STRIDE)

**ID**: SEGURANÇA-062
**Severidade**: 🟡 Média
**Categoria**: Segurança

---

## O que é

Implementar audit logging de todas operações críticas (autenticação, transações financeiras, mudanças de dados sensíveis) com timestamps, user IDs e detalhes de operação imutáveis.

## Por que importa

Repudiation permite que usuários neguem ter realizado ações, causando disputas em transações financeiras e dificultando investigações forenses. Logs de auditoria imutáveis fornecem não-repúdio e compliance com regulamentações (SOX, PCI-DSS). 60% dos incidentes de segurança requerem análise de logs para investigação.

## Critérios Objetivos

- [ ] Todas operações críticas são logadas (login, logout, mudanças de permissão, transações)
- [ ] Logs incluem: timestamp (UTC), user ID, IP address, operação, resultado (sucesso/falha)
- [ ] Audit logs são append-only e imutáveis (write-once storage ou blockchain)
- [ ] Logs têm retenção adequada conforme regulamentação (mínimo 1 ano para PCI-DSS)
- [ ] Acesso a audit logs é restrito e monitorado

## Exceções Permitidas

- **Operações read-only**: Leituras de dados não sensíveis podem não ser auditadas para reduzir volume
- **Health checks**: Endpoints de monitoring podem não gerar audit logs

## Como Detectar

### Manual

Revisar código de operações críticas verificando presença de logging. Verificar configuração de log storage para imutabilidade.

### Automático

Testes automatizados verificam se operações críticas geram logs apropriados. Compliance scanners verificam retenção e configuração de audit logs.

## Relacionada com

- [046 - Tratamento de Erros Seguro](046_tratamento-erros-seguro.md): complementa
- [059 - Logging Seguro](059_logging-seguro-sem-pii.md): implementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

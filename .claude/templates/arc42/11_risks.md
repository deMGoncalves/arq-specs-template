# 11. Riscos Técnicos e Débito Técnico

**ID do Template**: TPL-ARC42-11
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 11 (Riscos e Débito Técnico)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-11

---

## Riscos

| ID | Risco | Probabilidade | Impacto | Mitigação |
|----|-------|---------------|---------|-----------|
| R-001 | Falha de banco de dados | Média | Alto | Multi-AZ, backups |
| R-002 | Ataque DDoS | Baixa | Alto | CloudFlare, rate limiting |
| R-003 | Outage Stripe | Baixa | Crítico | Enfileirar pagamentos, fallback |
| R-004 | Membro do time sai | Média | Médio | Documentação, pair programming |
| R-005 | Estouro de orçamento | Alta | Médio | Monitoramento de custos, instâncias reservadas |

---

## Débito Técnico

| ID | Descrição | Custo | Prioridade | Plano |
|----|-----------|-------|------------|-------|
| TD-001 | Serviço Auth sem testes e2e | 3 dias | Alta | Sprint 5 |
| TD-002 | Código de validação duplicado | 1 dia | Média | Sprint 6 |
| TD-003 | Logs não estruturados | 2 dias | Baixa | Backlog |
| TD-004 | Documentação de API faltando | 2 dias | Alta | Sprint 5 |
| TD-005 | Configuração hardcoded | 1 dia | Média | Sprint 6 |

---

## Gerenciamento de Riscos

### Monitoramento
- **CloudWatch**: CPU, memória, erros
- **Alertas**: SNS → PagerDuty
- **Thresholds**: Taxa de erro > 1%, tempo de resposta > 1s

### Disaster Recovery
- **Backups**: Diário, retenção de 7 dias
- **DR Site**: us-west-2 (passivo)
- **Failover**: Manual, < 1 hora

---

**Anterior**: [10. Quality](10_quality.md) | **Próximo**: [12. Glossary](12_glossary.md)

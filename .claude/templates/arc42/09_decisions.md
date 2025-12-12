# 09. Decisões Arquiteturais

**ID do Template**: TPL-ARC42-09
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 9 (Decisões Arquiteturais)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-09

Este capítulo contém links para **ADRs** (Architectural Decision Records).

Use arquivos separados para cada decisão:
- `specs/09_decisions/adr/ADR-001_[nome].md`

Veja template: [Template ADR](../../adr/decision.md)

---

## Lista de ADRs

| ID | Título | Status | Data |
|----|--------|--------|------|
| ADR-001 | Usar PostgreSQL | Aceito | 2025-10-01 |
| ADR-002 | Usar Monolito Modular | Aceito | 2025-10-05 |
| ADR-003 | Usar Auth0 para Autenticação | Aceito | 2025-10-10 |
| ADR-004 | Usar Stripe para Pagamentos | Aceito | 2025-10-12 |
| ADR-005 | Usar Redis para Caching | Aceito | 2025-10-15 |

**Detalhes**: Veja `specs/09_decisions/adr/ADR-*`

---

## Log de Decisões (Resumo)

### ADR-001: Usar PostgreSQL
**Decisão**: PostgreSQL como banco de dados primário
**Fundamentação**: ACID, expertise do time, suporte JSON
**Trade-offs**: ❌ Complexidade de escalabilidade horizontal

### ADR-002: Usar Monolito Modular
**Decisão**: Começar com monolito modular
**Fundamentação**: Time pequeno, simplicidade
**Trade-offs**: ❌ Escalabilidade independente limitada

### ADR-003: Usar Auth0
**Decisão**: Auth0 para autenticação
**Fundamentação**: Segurança, conformidade, time-to-market
**Trade-offs**: ❌ Vendor lock-in

---

**Anterior**: [08. Crosscutting](08_crosscutting.md) | **Próximo**: [10. Quality](10_quality.md)

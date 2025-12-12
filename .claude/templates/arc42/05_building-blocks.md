# 05. Visão de Building Blocks

**ID do Template**: TPL-ARC42-05
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 5 (Visão de Building Blocks)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-05

Este capítulo contém **C4 Nível 2** (Containers) e **Nível 3** (Componentes).

Use arquivos separados para cada container/componente:
- `specs/05_building-blocks/containers/CNT-001_[nome].md`
- `specs/05_building-blocks/components/CMP-001_[nome].md`

Veja templates:
- [Template Container](../../c4/container.md)
- [Template Componente](../../c4/component.md)

---

## Diagrama de Visão Geral (C4 Nível 2)

```
┌─────────────────────────────────────────────┐
│         Sistema: [Nome do Sistema]          │
└─────────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ↓               ↓               ↓
┌─────────┐   ┌──────────┐   ┌──────────┐
│   API   │   │   Web    │   │  Worker  │
│Container│   │Container │   │Container │
│(Node.js)│   │(Next.js) │   │(Node.js) │
└────┬────┘   └─────┬────┘   └────┬─────┘
     │              │              │
     └──────┬───────┴──────────────┘
            │
    ┌───────┼────────┐
    ↓       ↓        ↓
┌────────┐ ┌───┐ ┌────┐
│   BD   │ │Redis│ │ S3 │
└────────┘ └────┘ └────┘
```

---

## Lista de Containers

| ID | Nome | Tecnologia | Propósito |
|----|------|------------|-----------|
| CNT-001 | Servidor API | Node.js | REST API |
| CNT-002 | App Web | Next.js | Frontend |
| CNT-003 | Banco de Dados | PostgreSQL | Persistência de dados |
| CNT-004 | Cache | Redis | Caching |
| CNT-005 | Worker | Node.js | Jobs em background |

**Detalhes**: Veja `specs/05_building-blocks/containers/CNT-*`

---

## Lista de Componentes (por Container)

### CNT-001: Servidor API

| ID | Nome | Propósito |
|----|------|-----------|
| CMP-001 | Serviço Auth | Autenticação |
| CMP-002 | Serviço Produtos | Catálogo de produtos |
| CMP-003 | Serviço Carrinho | Carrinho de compras |
| CMP-004 | Serviço Pedidos | Processamento de pedidos |
| CMP-005 | Serviço Pagamentos | Integração de pagamentos |

**Detalhes**: Veja `specs/05_building-blocks/components/CMP-*`

---

**Anterior**: [04. Estratégia de Solução](04_solution-strategy.md) | **Próximo**: [06. Visão de Runtime](06_runtime.md)

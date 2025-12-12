# Exemplo: ADR-002 - Usar Monolito Modular ao invés de Microsserviços

**Status**: Aceito ✅
**Data**: 2025-10-05
**Autor(es)**: Tech Lead, Arquiteto de Software
**Contexto**: Decisão de Arquitetura Inicial
**Categoria**: Estratégia de Deployment

---

## Contexto

Estamos iniciando o desenvolvimento de uma nova plataforma de e-commerce. A equipe de desenvolvimento é pequena (5 desenvolvedores) e o prazo é apertado (6 meses para MVP). Precisamos decidir entre uma arquitetura de microsserviços ou um monolito modular.

### Situação Atual
- Time: 5 desenvolvedores full-stack
- Experiência: 3+ anos Node.js, pouca experiência com Kubernetes/microserviços
- Prazo: 6 meses para MVP
- Orçamento de infraestrutura: R$ 50K/mês
- Expectativa inicial de tráfego: ~10K usuários/dia

### Problema
Microsserviços são frequentemente vistos como "melhores práticas", mas trazem complexidade significativa:
- Comunicação entre serviços (latência, falhas de rede)
- Deploy independente (CI/CD complexo)
- Debugging distribuído
- Consistência de dados
- Overhead operacional

### Forças em Conflito
1. **Escalabilidade independente** (pró microsserviços)
2. **Velocidade de desenvolvimento** (pró monolito)
3. **Complexidade operacional** (contra microsserviços)
4. **Tamanho do time** (pró monolito)
5. **Expertise técnica** (pró monolito)
6. **Orçamento limitado** (pró monolito)

---

## Decisão

**Decisão**: Implementar um **Monolito Modular** organizado por contextos delimitados (DDD) com clara separação de módulos, preparando para possível extração futura de microsserviços se necessário.

### Estrutura do Monolito Modular

```
src/
├── auth/                    # Módulo de autenticação
│   ├── api/                 # HTTP handlers
│   ├── domain/              # Lógica de negócio
│   └── infra/               # Banco, cache
│
├── products/                # Catálogo de produtos
│   ├── api/
│   ├── domain/
│   └── infra/
│
├── cart/                    # Carrinho de compras
│   ├── api/
│   ├── domain/
│   └── infra/
│
├── orders/                  # Processamento de pedidos
│   ├── api/
│   ├── domain/
│   └── infra/
│
└── payments/                # Integração de pagamentos
    ├── api/
    ├── domain/
    └── infra/
```

### Regras de Módulos
1. **Comunicação entre módulos**: Apenas via interfaces públicas (APIs internas)
2. **Banco de dados**: Schemas separados por módulo (preparação para split)
3. **Sem dependências cíclicas**: Módulos não podem depender uns dos outros diretamente
4. **Event bus interno**: Comunicação assíncrona via eventos (preparação para mensageria distribuída)

---

## Alternativas Consideradas

### Alternativa 1: Microsserviços desde o início
**Prós**:
- ✅ Escalabilidade independente por serviço
- ✅ Deploy independente
- ✅ Isolamento de falhas
- ✅ Stack tecnológica por serviço

**Contras**:
- ❌ Complexidade operacional alta (K8s, service mesh, etc)
- ❌ Debugging distribuído complexo
- ❌ Overhead de comunicação (latência, serialização)
- ❌ Requer expertise em sistemas distribuídos
- ❌ Custos de infraestrutura 2-3x maiores
- ❌ Velocidade de desenvolvimento reduzida (contratos entre serviços)

**Por que não escolhemos**: Complexidade desproporcional ao tamanho do time e prazo.

---

### Alternativa 2: Monolito tradicional (não modular)
**Prós**:
- ✅ Desenvolvimento mais rápido inicialmente
- ✅ Deploy simples
- ✅ Debugging simples
- ✅ Sem overhead de rede

**Contras**:
- ❌ Código rapidamente se torna "big ball of mud"
- ❌ Difícil de escalar (apenas vertical)
- ❌ Impossível extrair serviços no futuro
- ❌ Testes lentos (tudo junto)
- ❌ Deploy all-or-nothing

**Por que não escolhemos**: Falta de modularização causa débito técnico insustentável.

---

### Alternativa 3: Serverless Functions (AWS Lambda)
**Prós**:
- ✅ Pay-per-use
- ✅ Auto-scaling automático
- ✅ Sem gerenciamento de infraestrutura

**Contras**:
- ❌ Cold starts (latência imprevisível)
- ❌ Vendor lock-in forte (AWS)
- ❌ Limitações de runtime (timeout 15min)
- ❌ Debugging complexo
- ❌ Custo pode explodir em alta escala

**Por que não escolhemos**: Cold starts inaceitáveis para e-commerce, vendor lock-in excessivo.

---

## Consequências

### Positivas ✅
1. **Velocidade de desenvolvimento**: Time pequeno pode trabalhar com rapidez sem overhead de microsserviços
2. **Operações simplificadas**: Deploy único, debugging simples, logs centralizados
3. **Custos reduzidos**: Infraestrutura simples (ECS Fargate, RDS, Redis)
4. **Transações ACID**: Banco de dados único permite transações consistentes
5. **Preparação para futuro**: Módulos bem isolados podem virar microsserviços se necessário
6. **Time-to-market**: MVP em 6 meses viável

### Negativas ❌
1. **Escalabilidade limitada**: Não podemos escalar módulos independentemente
2. **Deploy acoplado**: Mudança em um módulo requer deploy de tudo
3. **Falha cascata**: Bug em um módulo pode derrubar o sistema inteiro
4. **Tamanho do build**: Com o tempo, builds e testes ficam mais lentos
5. **Lock-in de tecnologia**: Todos os módulos devem usar o mesmo stack (Node.js)

### Mitigações ⚙️
1. **Escalabilidade**: Auto-scaling horizontal com múltiplas instâncias do monolito
2. **Deploy acoplado**: CI/CD rápido (< 10min) com feature flags
3. **Falhas**: Circuit breakers internos, timeouts, retries
4. **Build lento**: Paralelizar testes, cache de dependências
5. **Lock-in**: Isolar lógica de negócio de framework (Hexagonal Architecture)

---

## Métricas de Sucesso

Reavaliaremos esta decisão quando:
- [ ] **Tamanho do time > 15 desenvolvedores**: Microsserviços podem fazer sentido
- [ ] **Tráfego > 100K usuários/dia**: Escalabilidade independente necessária
- [ ] **Build time > 20 minutos**: Monolito ficou muito grande
- [ ] **Deploy frequency < 1x/dia**: Deploy acoplado está limitando agilidade
- [ ] **Um módulo precisa escalar 10x mais que outros**: Caso de negócio claro

### Checkpoint: Sprint 24 (6 meses)
Avaliar:
- Tempo médio de build
- Frequência de deploy
- Incidentes causados por acoplamento
- Crescimento de tráfego

---

## Referências

- [Monolith First - Martin Fowler](https://martinfowler.com/bliki/MonolithFirst.html)
- [Modular Monoliths - Simon Brown](https://www.youtube.com/watch?v=5OjqD-ow8GE)
- [The Majestic Monolith - DHH](https://m.signalvnoise.com/the-majestic-monolith/)

---

## Histórico de Mudanças

| Versão | Data | Autor | Mudança |
|--------|------|-------|---------|
| 1.0 | 2025-10-05 | Tech Lead | Decisão inicial aceita |

---

**Exemplo criado para**: Demonstrar estrutura completa de ADR
**Use como referência para**: Documentar decisões arquiteturais em `specs/09_decisions/adr/`

# 02. Restrições de Arquitetura

**ID do Template**: TPL-ARC42-02
**Versão**: 2.0.0
**Categoria**: Arc42
**Capítulo**: 2 (Restrições de Arquitetura)
**Usado Por**: analyst (Fase 3: Especificação)
**Última Atualização**: 2025-11-17

---

**ID**: ARC42-02
**Status**: [Rascunho | Em Revisão | Aprovado]

---

## Visão Geral

Este capítulo documenta restrições que limitam a liberdade nas decisões arquiteturais. Restrições são requisitos imutáveis que devem ser satisfeitos.

---

## Restrições Técnicas

### RT-001: [Nome da Restrição]

**Categoria**: [Linguagem de Programação | Framework | Plataforma | Banco de Dados | Protocolo]

**Restrição**: [Descrição]

**Razão**: [Por que esta restrição existe]

**Impacto**: [Como isto afeta a arquitetura]

**Mitigação**: [Como trabalhar dentro desta restrição]

---

### Exemplo: Linguagem de Programação

**RT-001: Backend Deve Usar Node.js**

**Categoria**: Linguagem de Programação

**Restrição**: Todos os serviços de backend devem ser escritos em Node.js (TypeScript preferido).

**Razão**:
- Expertise existente do time (5 desenvolvedores com 3+ anos Node.js)
- Infraestrutura existente otimizada para Node.js
- Código compartilhado entre frontend e backend (TypeScript)

**Impacto**:
- ✅ Desenvolvimento rápido (expertise do time)
- ✅ Ecossistema NPM (grande seleção de bibliotecas)
- ❌ Tarefas CPU-intensivas menos eficientes que Go/Rust
- ❌ Uso de memória maior que linguagens compiladas

**Mitigação**:
- Usar worker threads para operações CPU-intensivas
- Descarregar processamento pesado para serviços dedicados (Python/Go)
- Otimizar uso de memória (profiling, estratégias de caching)

---

### RT-002: [Restrição de Banco de Dados]

**Exemplo: Banco de Dados Deve Ser PostgreSQL**

**Categoria**: Banco de Dados

**Restrição**: Banco de dados primário deve ser PostgreSQL 14+.

**Razão**:
- Infraestrutura e expertise existentes
- Conformidade ACID requerida
- Suporte JSON necessário (colunas JSONB)
- Licença: Open source (sem vendor lock-in)

**Impacto**:
- ✅ Garantias ACID
- ✅ Capacidades ricas de query (joins, agregações)
- ✅ Ecossistema forte (ORMs, ferramentas)
- ❌ Complexidade de escalabilidade horizontal (necessita sharding)
- ❌ Não ideal para workloads write-heavy

**Mitigação**:
- Usar réplicas de leitura para escalabilidade
- Implementar camada de caching (Redis)
- Considerar particionamento para tabelas grandes
- Usar connection pooling (PgBouncer)

---

### RT-003: [Restrição de Plataforma Cloud]

**Exemplo: Deve Fazer Deploy na AWS**

**Categoria**: Plataforma

**Restrição**: Toda infraestrutura deve rodar na AWS.

**Razão**:
- Contrato empresarial existente ($100K em créditos)
- Certificações de conformidade (SOC 2, HIPAA)
- Expertise do time com serviços AWS

**Impacto**:
- ✅ Ecossistema rico de serviços (RDS, S3, Lambda, etc)
- ✅ Conformidade pré-certificada
- ❌ Vendor lock-in
- ❌ Deploy multi-cloud não é possível

**Mitigação**:
- Usar camadas de abstração para serviços específicos da cloud
- Usar containers (ECS/EKS) para portabilidade
- Documentar caminho de migração para outras clouds (se necessário)

---

### RT-004: [Restrição de Protocolo/API]

**Exemplo: Deve Suportar API REST**

**Categoria**: Protocolo

**Restrição**: API externa deve ser RESTful (HTTP/JSON).

**Razão**:
- Clientes existentes esperam REST
- Compatibilidade retroativa requerida
- Padrão da indústria para APIs públicas

**Impacto**:
- ✅ Amplamente compreendido
- ✅ Suporte de ferramentas (Postman, Swagger)
- ❌ Problemas de over-fetching/under-fetching
- ❌ Múltiplas requisições para dados relacionados

**Mitigação**:
- Fornecer endpoints batch quando apropriado
- Considerar GraphQL para APIs internas
- Otimizar com filtragem de campos (?fields=name,email)

---

### RT-005: [Restrição de Segurança]

**Exemplo: Deve Usar OAuth 2.0**

**Categoria**: Segurança

**Restrição**: Autenticação deve usar OAuth 2.0 com Auth0.

**Razão**:
- Padrão corporativo
- Mandato do time de segurança
- Contrato Auth0 existente

**Impacto**:
- ✅ Segurança comprovada
- ✅ Descarregar complexidade de autenticação
- ❌ Dependência da disponibilidade do Auth0
- ❌ Dificuldade de migração se trocar de provedor

**Mitigação**:
- Cachear tokens (2h TTL)
- Implementar degradação graciosa
- Abstrair autenticação atrás de interface (flexibilidade futura)

---

## Restrições Organizacionais

### RO-001: [Restrição de Time]

**Exemplo: Tamanho do Time é Fixo**

**Categoria**: Time

**Restrição**: Time de desenvolvimento é de 5 desenvolvedores (não pode crescer por 12 meses).

**Razão**: Restrições de orçamento, congelamento de contratações.

**Impacto**:
- ❌ Capacidade limitada (velocidade ~50 story points/sprint)
- ❌ Sem especialização (todos full-stack)
- ✅ Comunicação mais rápida (time pequeno)

**Mitigação**:
- Priorizar impiedosamente (MVP-first)
- Automatizar tudo (CI/CD, testes, deployment)
- Evitar arquiteturas complexas (microsserviços → monolito modular)
- Simplificar tech stack (menos tecnologias para manter)

---

### RO-002: [Restrição de Cronograma]

**Exemplo: Deve Lançar em 6 Meses**

**Categoria**: Cronograma

**Restrição**: MVP deve estar em produção até 2026-06-01 (6 meses).

**Razão**:
- Oportunidade de mercado (concorrente lançando produto similar)
- Compromisso de negócio com investidores

**Impacto**:
- ❌ Tempo limitado para R&D
- ❌ Débito técnico provável
- ✅ Força foco nos essenciais

**Mitigação**:
- Definir escopo MVP estrito
- Usar tecnologias comprovadas (sem experimentos)
- Planejar fase 2 para pagamento de débito técnico
- Automatizar testes para manter qualidade sob pressão

---

### RO-003: [Restrição de Orçamento]

**Exemplo: Orçamento de Infraestrutura é R$ 50K/mês**

**Categoria**: Orçamento

**Restrição**: Custos de infraestrutura cloud devem ser < R$ 50K/mês.

**Razão**: Restrições de funding da startup.

**Impacto**:
- ❌ Limita opções de escalabilidade
- ❌ Gestão cuidadosa de recursos requerida
- ✅ Força arquitetura eficiente

**Mitigação**:
- Usar auto-scaling (scale down quando ocioso)
- Otimizar uso de recursos (right-sizing)
- Usar instâncias reservadas (commit 1 ano para 30% de economia)
- Monitorar custos continuamente (CloudWatch, Cost Explorer)
- Considerar serverless quando apropriado (pay-per-use)

---

### RO-004: [Restrição de Habilidades]

**Exemplo: Time Tem Experiência Limitada em DevOps**

**Categoria**: Habilidades

**Restrição**: Time é forte em Node.js mas tem expertise limitada em Kubernetes/infraestrutura.

**Razão**: Composição do time (principalmente web developers).

**Impacto**:
- ❌ Escolhas complexas de infraestrutura são arriscadas
- ❌ Curva de aprendizado de Kubernetes é íngreme
- ✅ Desenvolvimento mais rápido com stack familiar

**Mitigação**:
- Usar serviços gerenciados (AWS ECS/Fargate em vez de K8s)
- Contratar consultor DevOps para setup
- Investir em treinamento (alocar 10% do tempo para aprendizado)
- Documentar tudo (runbooks, guias de troubleshooting)

---

## Restrições Legais/Conformidade

### RL-001: [Privacidade de Dados]

**Exemplo: Deve Ser Compatível com GDPR**

**Categoria**: Privacidade de Dados

**Restrição**: Sistema deve estar em conformidade com GDPR (regulação EU).

**Razão**:
- Servir clientes EU
- Requisito legal

**Impacto**:
- ✅ Confiança do usuário (privacy by design)
- ❌ Complexidade de implementação
- ❌ Restrições de tratamento de dados

**Requisitos**:
- Direito de acesso (usuários podem baixar seus dados)
- Direito ao esquecimento (usuários podem deletar seus dados)
- Gestão de consentimento (opt-in explícito)
- Portabilidade de dados (exportar em formato legível por máquina)
- Privacy by design (padrão para coleta mínima de dados)
- Notificação de violação de dados (em 72 horas)

**Mitigação**:
- Usar serviços compatíveis com GDPR (Auth0, SendGrid)
- Implementar políticas de retenção de dados
- Adicionar UI de gestão de consentimento
- Manter logs de auditoria
- Documentar fluxos de dados (DPIAs)

---

### RL-002: [Conformidade Regulatória]

**Exemplo: Deve Ser Compatível com PCI-DSS**

**Categoria**: Financeiro

**Restrição**: Deve estar em conformidade com PCI-DSS para processamento de cartão de crédito.

**Razão**: Aceitar pagamentos com cartão de crédito.

**Impacto**:
- ❌ Não pode armazenar números de cartão de crédito
- ❌ Requisitos de segurança estritos
- ✅ Confiança do cliente

**Requisitos**:
- Nunca armazenar CVV
- Criptografar dados de cartão em trânsito e em repouso
- Auditorias de segurança regulares
- Segmentação de rede
- Controle de acesso (least privilege)

**Mitigação**:
- Usar Stripe (certificado PCI Level 1)
- Tokenizar cartões imediatamente
- Nunca tocar dados brutos de cartão
- Limitar escopo PCI (apenas página de pagamento)

---

### RL-003: [Acessibilidade]

**Exemplo: Deve Atender WCAG 2.1 Nível AA**

**Categoria**: Acessibilidade

**Restrição**: Interface web deve atender padrões WCAG 2.1 Nível AA.

**Razão**:
- Requisito legal (conformidade ADA)
- Política corporativa (design inclusivo)

**Impacto**:
- ✅ Mercado endereçável maior (acessibilidade)
- ❌ Tempo de desenvolvimento adicional
- ❌ Complexidade de testes

**Requisitos**:
- Navegação por teclado
- Compatível com leitores de tela
- Taxas de contraste de cor (4.5:1 para texto)
- Texto alt para imagens
- Legendas para vídeos
- Labels de formulário e mensagens de erro

**Mitigação**:
- Usar biblioteca de componentes acessíveis (Radix UI, Reach UI)
- Testes automatizados (axe-core, Lighthouse)
- Testes manuais com leitores de tela
- Design com acessibilidade desde o início (não retrofit)

---

## Convenções

### CV-001: [Padrões de Código]

**Exemplo: Deve Seguir ESLint + Prettier**

**Categoria**: Qualidade de Código

**Restrição**: Todo código deve passar verificações ESLint + Prettier.

**Razão**:
- Consistência do time
- Eficiência de code review
- Verificações de qualidade automatizadas

**Configuração**:
```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "max-lines": ["error", 200],
    "max-depth": ["error", 2],
    "complexity": ["error", 10]
  }
}
```

**Impacto**:
- ✅ Estilo de código consistente
- ✅ Menos debates em code review
- ❌ Tempo de setup inicial

---

### CV-002: [Workflow Git]

**Exemplo: Deve Usar Git Flow**

**Categoria**: Controle de Versão

**Restrição**: Todo desenvolvimento deve seguir o modelo de branching Git Flow.

**Razão**:
- Múltiplos ambientes (dev, staging, prod)
- Coordenação de releases

**Branches**:
- `main`: Código pronto para produção
- `develop`: Branch de integração
- `feature/*`: Branches de features
- `release/*`: Preparação de release
- `hotfix/*`: Correções de produção

**Regras**:
- Sem commits diretos em `main` ou `develop`
- Pull requests requeridos
- 1 aprovação mínima
- CI deve passar

---

### CV-003: [Requisitos de Testes]

**Exemplo: Mínimo 80% de Cobertura de Código**

**Categoria**: Testes

**Restrição**: Todo código deve ter mínimo 80% de cobertura de testes.

**Razão**:
- Garantia de qualidade
- Prevenir regressões
- Habilitar refatoração segura

**Requisitos**:
- Testes unitários: 80% de cobertura
- Testes de integração: Caminhos críticos
- Testes E2E: Caminhos felizes
- CI falha se cobertura cair abaixo do limiar

---

### CV-004: [Padrões de Documentação]

**Exemplo: Deve Seguir Arc42 + C4**

**Categoria**: Documentação

**Restrição**: Documentação de arquitetura deve seguir template Arc42 com diagramas C4.

**Razão**:
- Consistência
- Onboarding
- Comunicação com stakeholders

**Requisitos**:
- Arc42: 12 capítulos
- C4: Contexto, Containers, Componentes
- ADRs: Todas as decisões significativas
- BDD: Todas as features (Given-When-Then)

---

## Tabela Resumo

| ID | Categoria | Restrição | Impacto | Prioridade de Mitigação |
|----|-----------|-----------|---------|-------------------------|
| RT-001 | Técnica | Backend Node.js | Médio | Baixa |
| RT-002 | Técnica | PostgreSQL | Médio | Média |
| RT-003 | Técnica | Apenas AWS | Alto | Média |
| RO-001 | Org | 5 desenvolvedores | Alto | Alta |
| RO-002 | Org | Prazo 6 meses | Alto | Crítica |
| RO-003 | Org | R$ 50K/mês orçamento | Médio | Alta |
| RL-001 | Legal | GDPR | Alto | Crítica |
| RL-002 | Legal | PCI-DSS | Crítico | Crítica |

---

## Trade-offs de Restrições

Documente trade-offs-chave feitos devido às restrições:

### Trade-off 1: Monolito vs Microsserviços

**Restrição**: Tamanho do time (5 desenvolvedores), Cronograma (6 meses)

**Decisão**: Monolito modular (não microsserviços)

**Fundamentação**:
- Time pequeno → overhead de microsserviços muito alto
- Prazo apertado → simplicidade crítica
- Pode dividir depois se necessário (planejar para modularidade)

**Trade-offs Aceitos**:
- ❌ Menos escalabilidade independente
- ❌ Acoplamento de deployment
- ✅ Desenvolvimento mais rápido
- ✅ Debug mais fácil
- ✅ Complexidade operacional menor

---

### Trade-off 2: Build vs Buy

**Restrição**: Cronograma (6 meses), Orçamento (R$ 50K/mês)

**Decisão**: Comprar para auth, pagamento, email (não construir)

**Fundamentação**:
- Auth: Complexo, crítico para segurança → Auth0
- Pagamento: Conformidade PCI-DSS → Stripe
- Email: Deliverability → SendGrid
- Focar tempo de dev em lógica de negócio core

**Trade-offs Aceitos**:
- ❌ Dependências de vendors
- ❌ Custos mensais (R$ 5K/mês para serviços)
- ✅ Time-to-market mais rápido (economizou 3 meses)
- ✅ Melhor confiabilidade (serviços comprovados)

---

## Questões Abertas

Restrições que precisam de esclarecimento:

- [ ] **Questão 1**: Podemos usar Redis para caching? (precisa aprovação de segurança)
- [ ] **Questão 2**: Quais regiões AWS são aprovadas? (precisa verificação de conformidade)
- [ ] **Questão 3**: Podemos usar Lambda para jobs background? (precisa aprovação de custo)

---

## Histórico de Mudanças

| Versão | Data | Autor | Mudanças |
|--------|------|--------|----------|
| 1.0.0 | [Data] | [Nome] | Versão inicial |

---

**Anterior**: [01. Introdução](01_introduction.md) | **Próximo**: [03. Contexto e Escopo](03_context.md)

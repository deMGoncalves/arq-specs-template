# Contexto do Projeto

**Versão**: 3.0.0
**Última Atualização**: 2025-12-10
**Status**: 🟢 Ativo

---

## 🎯 Identidade do Projeto

**Nome**: Documentation-First Approach
**Tipo**: Framework de Desenvolvimento / Boilerplate
**Domínio**: Arquitetura de Software & Desenvolvimento Orientado por IA
**Propósito**: Eliminar alucinações de IA através de especificações determinísticas

---

## 🌍 Limites de Domínio

### Contextos Delimitados

#### 1. Gestão de Especificações
**Responsabilidade**: Criar, manter e validar documentação Arc42
**Componentes**:
- 12 capítulos Arc42
- Cenários BDD (formato Gherkin)
- Registros de Decisão Arquitetural (ADRs)
- Diagramas C4 Model

**Regras**:
- Especificações sempre precedem implementação
- Todas as specs devem ser determinísticas (sem ambiguidade)
- Mínimo de 8/12 capítulos Arc42 obrigatório

#### 2. Geração de Código
**Responsabilidade**: Gerar código a partir de especificações
**Componentes**:
- Estrutura DDD Tactical Co-Located
- Value Objects, Entidades, Agregados
- Casos de Uso (operações de domínio)
- Testes (abordagem TDD)

**Regras**:
- Código deve seguir 39 regras de qualidade
- Cobertura de testes ≥80%
- Sem implementação sem spec

#### 3. Garantia de Qualidade
**Responsabilidade**: Impor padrões de qualidade
**Componentes**:
- 39 regras de qualidade (Object Calisthenics + SOLID + mais)
- Hooks automatizados (validate-specs, check-quality-rules)
- Validações do gatekeeper
- Verificações pre-commit do guardian

**Regras**:
- Todas as regras devem ser mensuráveis
- Violações devem ser reportadas claramente
- Regras críticas são bloqueantes

#### 4. Orquestração de Workflow
**Responsabilidade**: Gerenciar workflow de desenvolvimento em 7 fases
**Componentes**:
- 9 skills especializados (analyst, architect, orchestrator, etc.)
- 15 comandos slash
- Decomposição de tarefas (Fase 3.5)
- Gestão de mudanças (diretório changes/)

**Regras**:
- Tamanho de tarefa deve ser <100 LOC
- Dependências devem ser explícitas
- Fases executam sequencialmente

---

## 🔗 Interações Externas

### Interfaces de Sistema

#### 1. Claude Code (Interface Primária)
**Tipo**: Ambiente de Desenvolvimento com IA
**Protocolo**: Tool calls, slash commands, skills
**Fluxo de Dados**:
- Usuário → Claude Code → Commands/Skills → Specs → Código
**Restrições**:
- Limitações de tamanho de contexto (usar orchestrator para >500 LOC)
- Permissões de ferramentas requeridas

#### 2. Git/GitHub (Controle de Versão)
**Tipo**: Gerenciamento de Controle de Fonte
**Protocolo**: Git CLI, GitHub API
**Fluxo de Dados**:
- Mudanças de código → Git → GitHub → Actions → Validação
**Restrições**:
- Commits convencionais obrigatórios
- Template de PR deve ser seguido

#### 3. Pipeline CI/CD (Automação)
**Tipo**: Integração Contínua
**Protocolo**: GitHub Actions
**Fluxo de Dados**:
- Push → Actions → Validar specs → Lint markdown → Relatório
**Restrições**:
- Deve passar todas as validações

---

## 📚 Linguagem Ubíqua

### Conceitos Fundamentais

| Termo | Definição | Exemplo |
|------|------------|---------|
| **Specification** | Documentação determinística que precede código | Capítulo Arc42, cenário BDD |
| **Constitution** | Diretório `specs/` como fonte única de verdade | specs/06_runtime/scenarios/SCN-001.md |
| **Hallucination** | IA gerando código incorreto/inconsistente | Output probabilístico sem spec |
| **Deterministic** | Interpretação única correta | "POST /api/users → 201 {userId: uuid}" |
| **Complexity** | Classificação de feature (LOW/MEDIUM/HIGH) | HIGH = >15 arquivos, múltiplos contextos |
| **Phase** | Etapa no workflow de 7 fases | Fase 3.5 = Decomposição de Tarefas |
| **Skill** | Agente de IA especializado | analyst, orchestrator, developer |
| **Rule** | Restrição de qualidade | Regra 001: Máx. 1 nível de indentação |
| **Hook** | Gatilho de validação automatizado | validate-specs.sh após /feature |
| **Task** | Unidade de implementação decomposta | <100 LOC, responsabilidade única |
| **BDD** | Behavior-Driven Development | Cenários Given-When-Then |
| **ADR** | Architecture Decision Record | ADR-001: Usar PostgreSQL |
| **C4** | Modelo de arquitetura em 4 níveis | Contexto, Container, Componente, Código |
| **DDD** | Domain-Driven Design | Padrões táticos co-localizados |

### Termos DDD Táticos

| Termo | Definição | Localização |
|------|------------|----------|
| **Bounded Context** | Área de domínio autônoma | Diretório de nível superior em src/ |
| **Aggregate** | Limite de consistência | Exports do index.ts |
| **Entity** | Objeto com identidade | Usuario.ts (tem ID) |
| **Value Object** | Valor imutável | Email.ts (sem ID) |
| **Repository** | Abstração de persistência | persistir-usuario.ts |
| **Factory** | Lógica de criação | criar-usuario.ts |
| **Use Case** | Operação de domínio | registrar-usuario.ts |
| **Domain Event** | Algo que aconteceu | UsuarioCriado.ts |

---

## 🎭 Atores

### Atores Primários

#### 1. Desenvolvedor
**Papel**: Usa Documentation-First Approach para construir software
**Objetivos**:
- Reduzir alucinações de IA
- Gerar código consistente
- Manter padrões de alta qualidade
**Interações**:
- Usa comandos slash para criar specs
- Invoca skills para features complexas
- Revisa código e testes gerados

#### 2. Arquiteto
**Papel**: Projeta arquitetura do sistema
**Objetivos**:
- Documentar decisões arquiteturais
- Garantir coerência do sistema
- Orientar equipe sobre padrões
**Interações**:
- Cria ADRs
- Define contextos delimitados
- Revisa conformidade arquitetural

#### 3. Product Owner
**Papel**: Define features e requisitos
**Objetivos**:
- Especificações claras de features
- Requisitos rastreáveis
- Iteração rápida
**Interações**:
- Cria cenários BDD
- Documenta atores e casos de uso
- Valida implementação contra specs

### Atores de Suporte

#### 4. Agente IA (Claude Code)
**Papel**: Gera código a partir de especificações
**Objetivos**:
- Output determinístico
- Seguir regras de qualidade
- Manter consistência
**Interações**:
- Lê specs de specs/
- Aplica regras de .claude/rules/
- Gera código em src/

#### 5. Sistema CI/CD
**Papel**: Automatiza validação
**Objetivos**:
- Impor quality gates
- Detectar regressões
- Fornecer feedback
**Interações**:
- Executa em push/PR
- Valida completude de specs
- Faz lint de arquivos markdown

---

## 🔒 Restrições de Qualidade

### Restrições Rígidas (DEVE)

1. **Specification-Driven**: Código NÃO PODE ser escrito sem spec
2. **Cobertura de Testes**: DEVE ser ≥80% ou build falha
3. **Regras de Qualidade**: Regras críticas (001-010) DEVEM ser satisfeitas
4. **Estrutura DDD**: DEVE seguir padrão Tactical Co-Located
5. **Tamanho de Tarefa**: Tarefas DEVEM ter <100 LOC

### Restrições Flexíveis (DEVERIA)

1. **Capítulos Arc42**: DEVERIA ter ≥10/12 capítulos
2. **Cenários BDD**: DEVERIA cobrir todas as features
3. **ADRs**: DEVERIA documentar todas as decisões maiores
4. **Documentação**: DEVERIA estar atualizada
5. **TODOs**: DEVERIAM ser resolvidos antes do merge

---

## 📊 Métricas de Sucesso

### Métricas de Qualidade

- **Taxa de Alucinação**: <10% (alvo)
- **Cobertura de Testes**: ≥80% (obrigatório)
- **Completude de Spec**: ≥8/12 capítulos Arc42
- **Qualidade de Código**: 0 violações de regras críticas
- **Sincronia de Documentação**: <5% de diferença entre specs e código

### Métricas de Performance

- **Tempo de Implementação**: Previsível (±20%)
- **Taxa de Retrabalho**: <15%
- **Débito Técnico**: Controlado (medido por TODOs)
- **Sucesso de Build**: >95%

---

## 🚫 Anti-Padrões a Evitar

### Desenvolvimento Code-First
❌ Escrever código antes de specs
✅ Criar specs primeiro, depois código

### Implementação Big Bang
❌ Implementar spec de 5000+ linhas de uma vez
✅ Usar orchestrator para decompor em tarefas de <100 LOC

### Especificações Ambíguas
❌ "O sistema deve validar emails"
✅ "Validação de email: RFC 5322, máx. 255 chars, verificação MX record"

### Organização por Camadas Técnicas
❌ src/services/, src/repositories/, src/entities/
✅ src/user-management/api/usuario/

### Pular Testes
❌ Implementar sem testes
✅ Abordagem TDD (testes com código)

---

## 🎯 Princípios de Design

### 1. Specification-Driven
Toda decisão de implementação deve rastrear de volta a uma especificação.

### 2. Output Determinístico
Especificações devem colapsar o espaço de interpretação de 10²⁰ para ~10.

### 3. Decomposição de Tarefas
Contextos grandes causam degradação de atenção O(n²). Decompor para <100 LOC.

### 4. Test-First
Testes validam correção. Sem implementação sem testes.

### 5. DDD Tactical Co-Located
Organização por domínio maximiza coesão.

### 6. Imposição de Regras de Qualidade
39 regras reduzem complexidade e garantem manutenibilidade.

### 7. Documentação Viva
Specs devem evoluir com código. Manter sincronizados.

---

## 🔄 Gestão de Mudanças

### Mudanças Ativas
Todo trabalho em progresso vive em `changes/[id]/`:
- proposal.md (Fase 1: Discovery)
- design.md (Fase 2: Architecture, se HIGH)
- spec.md (Fase 3: Specification)
- tasks.md (Fase 3.5: Decomposition)

### Merge para Constitution
Quando mudança está completa e validada:
1. Specs fazem merge para `specs/`
2. Código é colocado em `src/`
3. Diretório de mudança é arquivado/deletado

---

## 📖 Referências

### Padrões
- **Arc42**: https://arc42.org
- **C4 Model**: https://c4model.com
- **BDD**: https://cucumber.io/docs/bdd/
- **DDD**: Domain-Driven Design (Eric Evans)

### Pesquisa
- **Lost in the Middle** (Liu et al. 2023): Degradação de atenção da IA com contextos grandes

### Regras
- **Object Calisthenics**: 9 regras de código limpo
- **SOLID**: 5 princípios de OOP
- **Package Principles**: 6 regras de coesão/acoplamento

---

**Este contexto é a lente através da qual todas as decisões são tomadas.**

**Versão**: 3.0.0
**Mantido por**: Comunidade Documentation-First Approach
**Licença**: MIT

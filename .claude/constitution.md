# Constituição do Projeto

**Versão**: 1.0.0
**Criado em**: AAAA-MM-DD
**Última Atualização**: AAAA-MM-DD
**Status**: 🟢 Ativo

---

## Preâmbulo

Esta constituição estabelece os **princípios imutáveis e governança** para [Nome do Projeto].

Mudanças neste documento requerem consenso explícito da equipe seguindo o Processo de Emenda definido no Artigo V.

**Propósito**: Definir o DNA deste projeto - princípios que guiam todas as decisões arquiteturais, técnicas e de processo.

---

## Artigo I: Princípios Fundamentais

### 1. Desenvolvimento Orientado a Especificações

**Princípio**: Toda funcionalidade DEVE começar com uma especificação.

- Especificações são escritas ANTES da implementação
- Especificações seguem o formato Arc42 + C4 + BDD + ADR
- Especificações usam formato delta OpenSpec (ADDED/MODIFIED/REMOVED/RENAMED)
- Implementação segue specs aprovadas

**Justificativa**: Specs = 80% do valor. Código = 20%. Especificações determinísticas eliminam ambiguidade e previnem alucinações de IA.

---

### 2. Fundação Arc42 + C4 + BDD + ADR

**Princípio**: Todas as especificações DEVEM seguir esta estrutura fundamental.

#### Arc42 (Base Estrutural - 12 Capítulos)
- Aplicação adaptativa por complexidade:
  - **BAIXA**: Capítulos 6, 10 (mínimo)
  - **MÉDIA**: Capítulos 3, 5, 6, 8, 9, 10
  - **ALTA**: Todos os 12 capítulos

#### Modelo C4 (Visualização)
- C1: Contexto do Sistema
- C2: Container
- C3: Componente
- C4: Código (raramente usado)

#### BDD (Especificação de Comportamento)
- Todos os requisitos DEVEM ter cenários BDD
- Formato: DADO-QUANDO-ENTÃO-E
- Cenários são executáveis e testáveis

#### ADR (Decisões de Arquitetura)
- Todas as decisões significativas DEVEM ser documentadas
- Formato: Contexto, Decisão, Consequências, Alternativas

**Justificativa**: Especificações determinísticas = IA gera EXATAMENTE o que você quer. Sem ambiguidade = sem alucinações.

---

### 3. Decomposição de Tarefas (CRÍTICO)

**Princípio**: Toda especificação DEVE ser decompostas em tarefas atômicas antes da implementação.

- Tarefas geradas pelo Orchestrator (automatizado)
- Cada tarefa < 100 LOC, < 2 horas
- Cada tarefa tem dependências explícitas
- Cada tarefa tem critérios de aceite verificáveis
- Cada tarefa rastreia para cenário BDD

**Justificativa**: **Isto é o que previne alucinações de IA**. Contexto grande (5000+ linhas) = IA perde foco. Contexto pequeno por tarefa (~500 linhas) = IA permanece determinística.

**INEGOCIÁVEL**: Desenvolvedor implementa tarefa-por-tarefa, NÃO a spec completa de uma vez.

---

### 4. Princípio Library-First

**Princípio**: Toda funcionalidade DEVE ser desenvolvida como uma biblioteca standalone e reutilizável.

- Funcionalidades são módulos autocontidos
- Sem acoplamento forte a especificidades da aplicação
- Pode ser extraída e reutilizada em outros projetos

**Justificativa**: Modularidade, reusabilidade, testabilidade.

---

### 5. Imperativo Test-First

**Princípio**: **INEGOCIÁVEL** - Todas as funcionalidades DEVEM ser desenvolvidas usando Test-Driven Development (TDD).

- Escreva teste ANTES da implementação
- Teste segue cenários BDD da spec
- Testes são critérios de aceite executáveis

**Justificativa**: Testes = especificação executável. TDD garante que código atende requisitos desde o início.

---

### 6. Testes Integration-First

**Princípio**: Testes DEVEM rodar em ambientes realistas, não contextos mockados.

- Prefira testes de integração sobre testes unitários com muito mocking
- Use banco de dados real, APIs reais (ou test containers)
- Mocks apenas para dependências externas fora do seu controle

**Justificativa**: Testes de integração capturam problemas do mundo real que testes unitários perdem.

---

### 7. Estrutura Tática DDD

**Princípio**: Organização de código DEVE seguir o padrão DDD Tactical Co-Located.

**Estrutura**:
```
src/[contexto-delimitado]/[container]/[componente]/
  - index.ts              # Raiz do agregado (exports)
  - criar-[entidade].ts     # Factory
  - persistir-[entidade].ts # Repository
  - [acao]-[entidade].ts    # Caso de uso (ex: registrar-usuario.ts)
  - [Entidade].ts           # Entidade
  - [ObjetoDeValor].ts      # Objetos de valor
  - [Evento].ts             # Eventos de domínio (passado)
  - [componente].spec.ts    # Testes
```

**Nomenclatura**:
- **Ações semânticas** sobre sufixos técnicos
- Use linguagem de negócio (linguagem ubíqua)
- Exemplos: `criar`, `persistir`, `confirmar`, `cancelar`, NÃO `UserFactory`, `UserRepository`

**Princípios**:
- **Screaming Architecture**: Estrutura revela o domínio
- **Co-Located**: Todo código relacionado em um lugar
- **Estrutura plana**: Sem subdiretórios aninhados
- **Baixa cerimônia**: Sem termos técnicos desnecessários

**Justificativa**: Estrutura deve comunicar intenção do domínio, não padrões técnicos.

---

### 8. [Princípio Customizado]

Adicione princípios específicos do projeto aqui.

Exemplos:
- Desenvolvimento API-First
- Design Mobile-First
- GraphQL sobre REST
- etc.

---

## Artigo II: Restrições Arquiteturais

### Organização de Código

- **Estrutura**: DDD Tactical Co-Located (veja Artigo I.7)
- **Nomenclatura**: Ações semânticas sobre sufixos técnicos
- **Localização**: `src/[contexto-delimitado]/[container]/[componente]/`

### Padrões de Qualidade

- **Cobertura de Testes**: >= 80% (ou especifique maior)
- **Linters**: Devem passar com zero erros
- **Documentação**: Comentários inline + README por contexto delimitado
- **Segurança de Tipos**: Modo strict habilitado (se TypeScript/similar)

### Requisitos de Performance

- **Tempo de Resposta API**: <= 200ms (p95) (ajuste conforme necessário)
- **Tempo de Build**: <= 60s (ajuste conforme necessário)
- **Suite de Testes**: <= 120s (ajuste conforme necessário)

### Requisitos de Segurança

- **Autenticação**: [Especifique: OAuth2, JWT, etc.]
- **Autorização**: [Especifique: RBAC, ABAC, etc.]
- **Criptografia**: [Especifique: TLS 1.3, criptografia em repouso, etc.]
- **Gerenciamento de Segredos**: [Especifique: Vault, env vars, etc.]

---

## Artigo III: Fluxo de Desenvolvimento

### Orientado a Especificações

1. Toda funcionalidade começa com uma especificação em `changes/[id]/specs/`
2. Especificações usam formato delta OpenSpec
3. Especificações seguem Arc42 + C4 + BDD + ADR
4. Implementação segue specs aprovadas

### Decomposição de Tarefas (Fase 3.5)

1. Orchestrator decompõe specs em `changes/[id]/tasks.md`
2. Cada tarefa é atômica (< 100 LOC, < 2 horas)
3. Cada tarefa tem dependências e critérios de aceite
4. Desenvolvedor implementa tarefa-por-tarefa (NÃO spec completa de uma vez)

### Portões de Qualidade

1. **Portão 1: Aprovação de Design** (se complexidade = ALTA)
2. **Portão 2: Formato da Especificação** (automatizado - conformidade Arc42 + BDD)
3. **Portão 3: Qualidade da Implementação** (automatizado - testes + cobertura + linters)
4. **Portão 4: Aprovação de Code Review** (12 critérios de Qualidade de Software)
5. **Portão 5: Documentação Completa** (adaptativa por complexidade)
6. **Portão 6: Validação de Arquivamento** (automatizado - deltas aplicáveis)

### Conformidade com a Constituição

- **Guardian** valida pré-commit
- **Gatekeeper** valida em cada portão
- Violações bloqueiam progressão do workflow

---

## Artigo IV: Stack Tecnológico

### Linguagens & Frameworks

- **Linguagem Primária**: [ex: TypeScript 5.3+]
- **Runtime**: [ex: Node.js 20+, Deno, Bun]
- **Framework de Testes**: [ex: Vitest, Jest, Playwright]
- **Ferramenta de Build**: [ex: Vite, esbuild, turbo]

### Dependências Externas

- **Aprovação necessária** para novas dependências
- **Threshold de vulnerabilidade de segurança**: NENHUM (tolerância zero)
- **Compatibilidade de licença**: Deve ser compatível com licença do projeto
- **Impacto no tamanho do bundle**: Considere antes de adicionar

### Infraestrutura

- **Banco de Dados**: [ex: PostgreSQL 16+]
- **Cache**: [ex: Redis 7+]
- **Fila de Mensagens**: [ex: RabbitMQ, Kafka]
- **Deploy**: [ex: Docker + Kubernetes]

---

## Artigo V: Governança & Evolução

### Processo de Emenda

Mudanças nesta constituição requerem:

1. **Proposta** com justificativa detalhada
2. **Período de revisão da equipe**: Mínimo 7 dias
3. **Aprovação por consenso**: > 75% de concordância da equipe
4. **Incremento de versão**: Atualizar número da versão
5. **Documentação**: Atualizar `CHANGELOG.md` com raciocínio

### Exceções de Imutabilidade

Os seguintes artigos são **INEGOCIÁVEIS** e não podem ser emendados:

- Artigo I.2: Fundação Arc42 + C4 + BDD + ADR
- Artigo I.3: Decomposição de Tarefas
- Artigo I.5: Imperativo Test-First

Todos os outros artigos podem ser emendados seguindo o Processo de Emenda.

### Execução

- **Gatekeeper**: Valida conformidade com constituição automaticamente em cada portão
- **Guardian**: Reforça validação pré-commit
- **Violações**: Bloqueiam progressão do workflow até serem resolvidas

### Mecanismo de Override

Em circunstâncias excepcionais, conformidade com constituição pode ser sobreposta:

1. **Requer**: Justificativa explícita + aprovação da equipe
2. **Documentado**: Razão do override registrada em ADR
3. **Temporário**: Com limite de tempo (ex: "até refatoração no Q2")
4. **Revisado**: Overrides revisados trimestralmente

---

## Apêndice A: Glossário

### Termos

- **Arc42**: Framework de documentação de arquitetura (12 capítulos)
- **Modelo C4**: Visualização Context, Containers, Components, Code
- **BDD**: Behavior-Driven Development (DADO-QUANDO-ENTÃO)
- **ADR**: Architecture Decision Record (Registro de Decisão de Arquitetura)
- **DDD**: Domain-Driven Design (Design Orientado a Domínio)
- **Decomposição de Tarefas**: Quebrar specs em tarefas atômicas (< 100 LOC)
- **Co-Located**: Todo código relacionado em um diretório
- **Screaming Architecture**: Estrutura revela intenção do domínio
- **Linguagem Ubíqua**: Termos de negócio usados no código

### Localizações de Arquivos

- **Constituição**: `.claude/constitution.md` (este arquivo)
- **Specs (verdade)**: `specs/[capability]/spec.md`
- **Mudanças (propostas)**: `changes/[id]/`
- **Tarefas**: `changes/[id]/tasks.md`
- **Arquivado**: `changes/archive/AAAA-MM-DD-[id]/`

---

## Apêndice B: Referências

### Documentação

- **Arc42**: https://arc42.org/
- **Modelo C4**: https://c4model.com/
- **BDD**: https://cucumber.io/docs/bdd/
- **ADR**: https://adr.github.io/
- **DDD**: Domain-Driven Design por Eric Evans

### Específico do Projeto

- **Plano do Projeto**: `plano.md`
- **Skills**: `.claude/skills/`
- **Regras**: `.claude/rules/`

---

## Registro de Mudanças

### Versão 1.0.0 (AAAA-MM-DD)

- Constituição inicial
- Definidos 8 princípios fundamentais
- Estabelecidos portões de qualidade
- Documentado workflow

---

**Última Revisão**: AAAA-MM-DD
**Próxima Revisão**: AAAA-MM-DD (trimestral)
**Status**: 🟢 Ativo e Aplicado

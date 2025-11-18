# Changelog

All notable changes to arq-specs-template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-15

### Added - Major Features

#### Task Master System
- **Task Master Skill** (`.claude/skills/task-master/`)
  - Orquestração determinística de tasks
  - Criação de `.agent-task.json` estruturado
  - Comandos: `/task create`, `/task status`, `/task next`, `/task validate`
  - Gerenciamento de fases: Vision → Stack → Plan → Feature → Build → Code
  - Tracking de artefatos esperados vs produzidos
  - Critérios de aceitação rastreáveis

#### Gate Keeper System
- **Gate Keeper Skill** (`.claude/skills/gate-keeper/`)
  - 6 gates de validação entre fases
  - Validações automáticas: placeholders, referências, datas
  - Checklist de validação por fase
  - Níveis de aprovação: ✅ Aprovado / ⚠️ Ressalvas / ❌ Bloqueado
  - Override com justificativa documentada
  - Comandos: `/gate validate`, `/gate auto`, `/gate report`

#### Specs Metadata Tracking
- **Metadata System** (`.specs-metadata/`)
  - Tracking de mudanças em specs
  - Versionamento semântico de artefatos
  - Changelog consolidado automático
  - Análise de impacto de mudanças
  - Delta tracking entre versões
  - Quality metrics por artefato

#### CLI Tool
- **arq-cli** (`bin/arq-cli`)
  - `validate` - Validar specs completos
  - `audit` - Auditar consistência
  - `report` - Gerar relatórios (text, json, html)
  - `graph` - Visualizar dependências
  - `metadata` - Gerenciar metadata e changelog
  - `task` - Gerenciar tasks
  - `gate` - Validar gates
  - `doc` - Gerenciar documentação (mdBook)

#### Governance Framework
- **CONSTITUTION.md** - Princípios fundamentais e governança
  - Princípios: Documentation-First, Determinismo, Rastreabilidade
  - Hierarquia de artefatos (Vision → Stack → ... → Code)
  - Critérios de qualidade (Specs e Code)
  - Roles e responsabilidades (Agentes e Humanos)
  - Processos de governança
  - KPIs e métricas de sucesso

- **GOVERNANCE.md** - Processos detalhados
  - Workflow processes (6 fases + 6 gates)
  - Approval processes por fase
  - Quality gates estrutura e validações
  - Change management (specs, code, breaking changes)
  - Escalation procedures (3 níveis)
  - Metrics and reporting (weekly, monthly, quarterly)

#### Orchestrator Integration
- Integração do Orchestrator com Task Master e Gate Keeper
- **INTEGRATION.md** - Documentação completa da integração
  - Workflow integrado end-to-end
  - Comandos de orchestração
  - Mapeamento de fases para skills
  - Comunicação via `.agent-task.json`
  - Tratamento de erros e retry logic

### Changed

#### AGENTS.md
- Atualizado para versão 2.0.0
- Adicionada seção "Workflow Determinístico com Task Master e Gates"
- Integração com novos sistemas
- Comandos principais documentados
- Exemplo prático completo
- Troubleshooting guide

#### Workflow
- De probabilístico para **determinístico**
- Gates obrigatórios entre fases
- Validações automáticas em cada transição
- Tracking completo de progresso
- Rollback automático se gate falhar

#### Skills
- **task-master** - Nova skill para orquestração
- **gate-keeper** - Nova skill para validação
- **orchestrator** - Integrado com Task Master e Gates
- **analyst**, **development**, **testing**, etc - Integrados no novo workflow

### Schema Files

- `.agent-task.schema.json` - Schema JSON para tasks
- `.agent-task.example.json` - Exemplo completo de task
- `.specs-metadata/metadata.schema.json` - Schema para metadata
- `.specs-metadata/changelog.example.yaml` - Exemplo de changelog

### Documentation

- Documentação completa em cada skill (`SKILL.md`, `README.md`)
- CLI documentation (`bin/README.md`)
- Integration guides (`.claude/skills/orchestrator/INTEGRATION.md`)
- Metadata documentation (`.specs-metadata/README.md`)

### Improvements

- **Determinismo**: Workflow 100% determinístico com gates bloqueantes
- **Rastreabilidade**: Task → Artefatos → Commits → Changelog
- **Automação**: CLI tool para operações comuns
- **Qualidade**: Validações automáticas em cada fase
- **Visibilidade**: Tracking completo de progresso em `.agent-task.json`
- **Governança**: Processos claros e documentados

## [1.0.0] - 2025-11-01

### Added

- Estrutura arc42 completa (12 capítulos)
- Sistema de skills para agentes IA
- Templates de documentação
- 39 regras de qualidade de código (`.claude/rules/`)
- Convenções de DDD Tático
- Integração com mdBook
- README.md com filosofia Documentation-First
- AGENTS.md com manual de operação
- Suporte a múltiplos agentes (Gemini, Cursor, Codex)

## Comparison: v1.0 → v2.0

| Aspecto | v1.0 | v2.0 |
|---------|------|------|
| Workflow | Manual, probabilístico | Determinístico com gates |
| Task Management | `.agent-task.md` básico | `.agent-task.json` estruturado |
| Validation | Manual | Automática com Gate Keeper |
| Tracking | Git only | Delta tracking + metadata |
| Automation | Scripts npm básicos | CLI completo (arq-cli) |
| Governance | Implícita | Explícita (CONSTITUTION + GOVERNANCE) |
| Quality | Code rules apenas | Specs + Code + Gates |
| Orchestration | Manual skill-by-skill | Task Master + Orchestrator integrados |

## Migration Guide: v1.0 → v2.0

### Para Projetos Existentes

1. **Copiar novos arquivos**:
   ```bash
   cp CONSTITUTION.md your-project/
   cp GOVERNANCE.md your-project/
   cp -r .claude/skills/task-master your-project/.claude/skills/
   cp -r .claude/skills/gate-keeper your-project/.claude/skills/
   cp -r .specs-metadata your-project/
   cp -r bin your-project/
   cp .agent-task.schema.json your-project/
   ```

2. **Atualizar AGENTS.md**:
   - Merge seção "Workflow Determinístico" do novo AGENTS.md

3. **Atualizar Orchestrator**:
   - Copy `.claude/skills/orchestrator/INTEGRATION.md`

4. **Inicializar sistemas**:
   ```bash
   # Criar primeira task
   @skill task-master
   /task create "Migrar para v2.0"

   # Inicializar metadata
   ./bin/arq-cli metadata init
   ```

5. **Validar migração**:
   ```bash
   ./bin/arq-cli validate
   ./bin/arq-cli audit
   ```

### Para Novos Projetos

Use v2.0 diretamente:
```bash
# Copiar template completo
cp -r arq-specs-template-master/ my-new-project/

# Inicializar
cd my-new-project/
bun install

# Criar primeira task
@skill task-master
/task create "Primeira feature"
```

## Breaking Changes

### v1.0 → v2.0

1. **`.agent-task.md` → `.agent-task.json`**
   - Formato mudou de Markdown para JSON estruturado
   - Migração manual necessária para projetos em andamento

2. **Workflow obrigatório**
   - Gates são agora obrigatórios (bloqueantes)
   - Não é mais possível pular fases sem justificativa

3. **Skills modificadas**
   - Orchestrator requer Task Master
   - Analyst integrado no workflow com Task Master

4. **Comandos CLI**
   - Substituem scripts npm custom (se houver)

## Deprecations

- `.agent-task.md` (deprecado, use `.agent-task.json`)
- Workflow manual sem gates (deprecado, use Task Master + Gates)

## Known Issues

- CLI commands `init`, `sync`, `audit`, `report`, `graph` ainda não implementados completamente (apenas estrutura)
- Metadata tracking requer implementação manual de collectors
- Multi-model research (Phase 5 do roadmap) ainda não implementado

## Future Roadmap

### v2.1.0 (Planned)
- Implementação completa de todos os comandos CLI
- Collectors automáticos para metadata
- GitHub Actions integration templates
- VS Code extension para validação inline

### v2.2.0 (Planned)
- Multi-model research integration (MCP)
- Research skill para validação cruzada
- Alternative architecture suggestions

### v3.0.0 (Future)
- AI-powered code generation from specs
- Automatic synchronization specs ↔ code
- Real-time collaboration features

## Contributors

- Documentation-First Team
- Claude Sonnet 4

## License

MIT License - See LICENSE file

---

**For full details, see**: [CONSTITUTION.md](./CONSTITUTION.md), [GOVERNANCE.md](./GOVERNANCE.md), [AGENTS.md](./AGENTS.md)

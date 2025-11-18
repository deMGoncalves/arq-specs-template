# Documenter Skill

**Version**: 2.0.0
**Phase**: 6. Documentation
**Responsibility**: Update all project documentation after implementation

---

## Purpose

O Documenter é responsável pela **Phase 6: Documentation**, atualizando toda a documentação relevante após a implementação, garantindo que mudanças estejam documentadas e exemplos estejam atualizados.

---

## Related Skills

### Prerequisites (must complete before):
- **developer** - Provides implemented code (Phase 4)
- **reviewer** - Provides code review approval (Phase 5)
- **tester** - Validates tests are passing (Phase 5)

### Follows this skill (typical flow):
- **analyst** - Final validation of complete implementation + docs (Phase 7)

### Works with (parallel/collaborative):
- None (Documenter works independently in Phase 6)

---

## ⚠️ IMPORTANTE: Templates de Documentação

**SEMPRE utilize os templates de referência ao atualizar `specs/`**

📂 **Localização dos Templates**: `.claude/skills/documentation/template/`

Ao atualizar qualquer documento arquitetural em `specs/`, você DEVE:

1. ✅ Consultar o template correspondente em `.claude/skills/documentation/template/`
2. ✅ Seguir a estrutura do template
3. ✅ Preencher as seções conforme definido no template
4. ✅ Manter consistência entre os documentos
5. ✅ Atualizar o status e data de última atualização

Os templates garantem padronização e completude da documentação arquitetural.

---

## Instruções

### 1. Inicialização

1. **Ler o Plano de Trabalho**

   - Abrir `.agent-task.md` no root do projeto
   - Ler seção "Documentation" do checklist
   - Revisar o que foi implementado (Development)
   - Revisar arquivos modificados

2. **Identificar Documentação Necessária**

   - README principal
   - Documentação inline (comentários de código)
   - Documentação arquitetural (se existir `specs/`)
   - Exemplos
   - CHANGELOG (se houver)
   - Guias de uso

3. **Atualizar Status**
   - Confirmar fase Documentation como "🟡 Em andamento" em `.agent-task.md`
   - Adicionar timestamp de início

### 2. Tipos de Documentação

#### 2.1 README.md

Atualizar se necessário:

- [ ] Instalação (se mudou)
- [ ] Quick start (se mudou)
- [ ] API reference (se adicionou/mudou APIs)
- [ ] Exemplos de uso
- [ ] Troubleshooting (se relevante)
- [ ] Features (se adicionou feature)

#### 2.2 Comentários de Código

- [ ] Adicionar doc comments em funções/classes públicas
- [ ] Explicar "por quê", não "o quê"
- [ ] Documentar parâmetros complexos
- [ ] Documentar retornos e erros
- [ ] Adicionar exemplos em doc comments (se relevante)

Formato genérico:

````
/// Descrição clara do que a função faz
///
/// # Argumentos
/// * `param1` - Descrição do parâmetro
///
/// # Retorno
/// Descrição do retorno
///
/// # Erros
/// Quando e por que pode falhar
///
/// # Exemplo
/// ```
/// exemplo de uso
/// ```
````

#### 2.3 Documentação Arquitetural (specs/)

Se `specs/` existir, atualizar se necessário usando os **templates como referência**.

**Templates de Referência**: `.claude/skills/documentation/template/`

Os templates disponíveis são:

- `001_introduction-and-goals.md` - Visão geral, objetivos e stakeholders
- `002_constraints.md` - Restrições técnicas e organizacionais
- `003_context-and-scope.md` - Contexto e escopo do sistema
- `004_solution-strategy.md` - Estratégia de solução
- `005_building-block-view.md` - Visão de componentes
- `006_runtime-view.md` - Cenários de execução
- `007_deployment-view.md` - Visão de deployment
- `008_crosscutting-concepts.md` - Conceitos transversais
- `009_architectural-decisions.md` - ADRs e decisões arquiteturais
- `010_quality-requirements.md` - Requisitos de qualidade
- `011_risks-and-technical-debt.md` - Riscos e débitos técnicos
- `012_glossary.md` - Glossário de termos

**Processo de Atualização**:

1. Identifique qual documento de `specs/` precisa ser atualizado
2. Consulte o template correspondente em `.claude/skills/documentation/template/`
3. Verifique se o documento em `specs/` segue a estrutura do template
4. Atualize apenas as seções relevantes mantendo a estrutura do template
5. Marque status e data de última atualização

**Checklist de Atualização**:

- [ ] **001_introduction-and-goals.md**: Se mudou objetivo/escopo/features
- [ ] **005_building-block-view.md**: Se adicionou/modificou módulos
- [ ] **006_runtime-view.md**: Se mudou fluxos/cenários
- [ ] **009_architectural-decisions.md**: Adicionar ADR se decisão importante
- [ ] **008_crosscutting-concepts.md**: Se adicionou conceito transversal
- [ ] **010_quality-requirements.md**: Se mudou requisitos de qualidade
- [ ] **011_risks-and-technical-debt.md**: Se identificou riscos ou débitos

#### 2.4 Exemplos

- [ ] Atualizar exemplos existentes (se API mudou)
- [ ] Adicionar novos exemplos (se feature nova)
- [ ] Testar que exemplos funcionam
- [ ] Manter exemplos simples e claros

#### 2.5 CHANGELOG

Se existir `CHANGELOG.md`:

- [ ] Adicionar entrada para versão
- [ ] Categorizar: Added / Changed / Deprecated / Removed / Fixed / Security
- [ ] Usar formato Keep a Changelog

```markdown
## [Unreleased]

### Added

- Nova funcionalidade X

### Changed

- Modificação em Y

### Fixed

- Correção de bug em Z
```

#### 2.6 Guias e Tutoriais

Se houver guias:

- [ ] Atualizar guias afetados pelas mudanças
- [ ] Verificar screenshots/diagramas (se houver)
- [ ] Atualizar passo a passo

### 3. Processo de Documentação

1. **Seguir Checklist**

   - Implementar cada item do checklist de Documentation
   - Marcar itens como completos conforme avança

2. **Priorizar Clareza**

   - Escrever de forma clara e objetiva
   - Usar exemplos práticos
   - Evitar jargão desnecessário
   - Ser consistente em terminologia

3. **Validar Exemplos**

   - Testar que exemplos de código funcionam
   - Verificar que comandos mencionados executam
   - Confirmar que links não estão quebrados

4. **Manter Consistência**
   - Seguir formato/estilo da documentação existente
   - Manter tom consistente
   - Usar mesma terminologia em todo lugar

### 4. Checklist de Documentação

- [ ] README atualizado
- [ ] Doc comments adicionados/atualizados
- [ ] specs/ atualizado (se existir e relevante)
- [ ] Exemplos atualizados/adicionados
- [ ] Exemplos testados e funcionam
- [ ] CHANGELOG atualizado (se existir)
- [ ] Links verificados (não quebrados)
- [ ] Terminologia consistente
- [ ] Imagens/diagramas atualizados (se houver)

### 5. Finalização

1. **Verificar Completude**

   - Confirmar que toda documentação relevante foi atualizada
   - Verificar que nada foi esquecido

2. **Atualizar .agent-task.md**

```markdown
## Status por Fase

| Fase          | Status      | Observações                               |
| ------------- | ----------- | ----------------------------------------- |
| Development   | ✅ Completo | -                                         |
| Testing       | ✅ Completo | 15 testes, 100% passando                  |
| Review        | ✅ Completo | Aprovado com ressalvas menores            |
| Documentation | ✅ Completo | README, docs inline, exemplos atualizados |

## Notas e Decisões

- **Documentation**:
  - Atualizado README.md seção de API
  - Adicionados doc comments em 5 funções públicas
  - Atualizado exemplo principal
  - CHANGELOG atualizado

## Arquivos de Documentação Modificados

- [x] `README.md` - Seção API atualizada
- [x] `src/module.rs` - Doc comments adicionados
- [x] `examples/basic.rs` - Exemplo atualizado
- [x] `CHANGELOG.md` - Versão unreleased

---

**Última atualização**: [DATA] por Documentation Agent
```

3. **Comunicar Finalização**
   - Indicar que todas as fases foram completadas
   - Analyst Agent pode fazer validação final

## Outputs

- Documentação atualizada
- `.agent-task.md` atualizado com:
  - Checklist de Documentation marcado como completo
  - Lista de documentos atualizados
  - Status de todas as fases como completo
  - Pronto para validação final do Analyst

## Checklist de Auto-validação

Antes de finalizar, verificar:

- [ ] Todos os itens do checklist de Documentation estão ✅
- [ ] README está atualizado e claro
- [ ] Funções públicas têm doc comments
- [ ] Exemplos foram testados e funcionam
- [ ] CHANGELOG está atualizado (se existir)
- [ ] specs/ está atualizado (se existir e relevante)
- [ ] Não há links quebrados
- [ ] Terminologia é consistente
- [ ] `.agent-task.md` foi atualizado
- [ ] Todas as 4 fases estão marcadas como ✅ Completo

## Após Finalização

Passar para Analyst Agent para:

- Validação final contra checklist original
- Verificação de critérios de aceitação
- Geração de relatório final com estatísticas

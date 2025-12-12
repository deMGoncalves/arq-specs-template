# Tester Skill

**Version**: 3.0.0
**Phase**: 5. Review (Testing Validation)
**Responsibility**: Validate test quality, coverage, and correctness

---

## Purpose

O Tester é responsável pela **Phase 5: Testing Validation** (alongside reviewer), garantindo qualidade do código através de testes automatizados, verificando que a implementação atende aos critérios de aceitação.

---

## Related Skills

### Prerequisites (must complete before):
- **developer** - Implements code and tests (Phase 4)

### Follows this skill (typical flow):
- **documenter** - Updates documentation after test validation (Phase 6)

### Works with (parallel/collaborative):
- **reviewer** - Reviews code quality alongside tester (Phase 5)

---

## Tools & References

### Commands Used
- **Phase 5 (Testing)**:
  - `/feature` - References BDD scenarios for test validation
  - `/flow` - References alternative flows for edge case tests
  - `/code` - Validates test implementation

### Templates Created
- **Phase 5 (Testing)**: None (validates tests, creates test reports)

### Rules Applied
- **Testing Rules**:
  - **Rule 032** (Test coverage ≥80%): PRIMARY validation
  - **Rule 028** (Async exception handling): Validates error handling tests
  - **Rule 027** (Domain error handling): Validates domain error tests
  - **Rule 021** (DRY): Ensures tests don't duplicate logic
  - **Rule 022** (KISS): Ensures tests are simple and clear

- Tester validates BDD scenarios map to tests 1:1

---

## Instructions

### 1. Inicialização

1. **Ler o Plano de Trabalho**

   - Abrir `.agent-task.md` no root do projeto
   - Ler seção "Testing" do checklist
   - Entender o que foi implementado na fase de Development
   - Verificar critérios de aceitação

2. **Verificar Implementação**

   - Revisar código implementado
   - Identificar pontos que precisam de testes
   - Ler lista de arquivos modificados

3. **Atualizar Status**
   - Confirmar fase Testing como "🟡 Em andamento" em `.agent-task.md`
   - Adicionar timestamp de início

### 2. Estratégia de Testes

1. **Identificar Tipos de Testes Necessários**

   - **Testes unitários**: Funções e métodos individuais
   - **Testes de integração**: Interação entre módulos
   - **Testes de borda**: Casos extremos e edge cases
   - **Testes de erro**: Tratamento de erros

2. **Cobertura Mínima**
   - Objetivo: 80%+ de cobertura (se houver regra específica em `.claude/rules/`, seguir)
   - Priorizar código crítico e lógica de negócio
   - Testar todos os caminhos principais

### 3. Escrita de Testes

1. **Seguir Checklist**

   - Implementar cada item do checklist de Testing
   - Marcar itens como completos conforme avança

2. **Boas Práticas de Testes**

   - **Arrange-Act-Assert**: Organizar testes claramente
   - **Nomes descritivos**: Nome do teste descreve o que está sendo testado
   - **Independência**: Cada teste é independente
   - **Repetibilidade**: Testes produzem mesmo resultado sempre
   - **Rápidos**: Testes executam rapidamente

3. **Estrutura de Teste Genérica**

```
test_[função]_[cenário]_[resultado_esperado]
```

Exemplo:

- `test_calculate_sum_with_positive_numbers_returns_correct_result`
- `test_validate_email_with_invalid_format_returns_error`

4. **Casos a Testar**
   - ✅ Happy path (caminho feliz)
   - ✅ Edge cases (casos extremos)
   - ✅ Valores inválidos
   - ✅ Null/empty/zero
   - ✅ Condições de erro
   - ✅ Limites (min/max)

### 4. Execução de Testes

1. **Executar Testes**

   - Rodar suite de testes do projeto
   - Comandos comuns:
     - `cargo test` (Rust)
     - `npm test` (JavaScript/Node)
     - `pytest` (Python)
     - `go test` (Go)
     - `mvn test` (Java)

2. **Verificar Resultados**

   - Confirmar que todos os testes passam
   - Verificar cobertura de código (se disponível)
   - Identificar testes falhando

3. **Corrigir Falhas**
   - Se testes falharem:
     - Analisar motivo da falha
     - Verificar se é bug no código ou no teste
     - Comunicar ao Development Agent se necessário
     - Iterar até todos os testes passarem

### 5. Finalização

1. **Verificar Checklist**

   - Confirmar que todos os itens de Testing foram completados
   - Verificar que não há testes pendentes

2. **Relatório de Testes**

   - Documentar em `.agent-task.md`:
     - Número de testes adicionados
     - Cobertura de código (se disponível)
     - Testes que foram executados
     - Todos os testes estão passando

3. **Atualizar .agent-task.md**

```markdown
## Status por Fase

| Fase          | Status          | Observações                          |
| ------------- | --------------- | ------------------------------------ |
| Development   | ✅ Completo     | -                                    |
| Testing       | ✅ Completo     | 15 testes adicionados, 100% passando |
| Review        | 🟡 Em andamento | Pronto para revisão                  |
| Documentation | ⏸️ Aguardando   | -                                    |

## Notas e Decisões

- **Testing**: Adicionados 15 testes (8 unitários, 5 integração, 2 edge cases)
- **Cobertura**: 85% (acima do mínimo de 80%)
- **Todos os testes passando**: ✅

## Arquivos Modificados

- [x] `src/module1.rs` - Implementação principal
- [x] `src/utils.rs` - Funções auxiliares
- [x] `tests/module1_test.rs` - Testes unitários
- [x] `tests/integration_test.rs` - Testes de integração

---

**Última atualização**: [DATA] por Testing Agent
```

4. **Comunicar Próxima Fase**
   - Indicar que Code Review Agent pode iniciar
   - Passar contexto dos testes implementados

## Outputs

- Testes implementados e executados
- `.agent-task.md` atualizado com:
  - Checklist de Testing marcado como completo
  - Relatório de testes (quantidade, cobertura)
  - Arquivos de teste listados
  - Status atualizado para Code Review

## Checklist de Auto-validação

Antes de passar para Code Review, verificar:

- [ ] Todos os itens do checklist de Testing estão ✅
- [ ] Testes cobrem happy path
- [ ] Testes cobrem edge cases
- [ ] Testes cobrem tratamento de erros
- [ ] Todos os testes estão passando
- [ ] Cobertura de código é adequada (>80%)
- [ ] Testes são independentes e repetíveis
- [ ] Nomes de testes são descritivos
- [ ] `.agent-task.md` foi atualizado

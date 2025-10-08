# Cenário de Teste (BDD): [Título Descritivo]

**ID**: SCN-[NÚMERO]
**Atributo de Qualidade**: [Performance | Segurança | Manutenibilidade | Disponibilidade | Funcionalidade]
**Componente Afetado**: [CMP-XXX Nome do Componente] → [Link para o componente]
**Status**: [🟢 Automatizado | 🟡 Manual | 🔴 Falhando | 🟣 Em Revisão]
**Data de Criação**: [YYYY-MM-DD]

---

## 📋 Funcionalidade / User Story

**Como um**: [Ator (Ref: ACT-XXX)]
**Eu quero**: [Funcionalidade (Ação do Ator)]
**Para que**: [Benefício (Valor de Negócio)]

---

## 🧪 Cenário: [Título Conciso e Expressivo do Teste]

**Descrição**: [PREENCHER: Explicação concisa do fluxo que está sendo validado.]

### Rastreabilidade SDD

- **Requisito Funcional**: [FR-XXX]
- **Regra de Negócio/Padrão Violado**: [BUS-XXX] ou [PATTERN-ID]
- **Cenário de Runtime**: [Link para o fluxo em 06_runtime/]
- **Débito Técnico Relacionado**: [TD-XXX] (Se for um teste de regressão)

### Passos (Given When Then)

#### Given (Contexto / Pré-condições)
- Dado que [PREENCHER: O sistema, o ator ou os dados estão em um estado inicial necessário]
- E que [PREENCHER: Uma condição adicional é verdadeira]

#### When (Ação / Estímulo)
- Quando [PREENCHER: O ator executa a ação que dispara o comportamento (o estímulo)]
- E [PREENCHER: Uma condição de tempo ou ação secundária ocorre]

#### Then (Resultado / Pós-condições)
- Então [PREENCHER: O sistema deve responder com o resultado esperado (a resposta)]
- E [PREENCHER: O estado do sistema deve ser atualizado para o novo estado]
- E [PREENCHER: Uma exceção ou evento específico deve ser lançado/emitido]

### Dados de Teste

| Variável/Dado | Valor/Descrição | Uso no Cenário |
|----------|-----------------|----------------|
| `login_valido` | `user@exemplo.com`, `Senha123!` | Login no *Given* |
| `erro_esperado` | `InvalidCredentialsError` | Verificação no *Then* |

---

## 🔗 Detalhes de Automação

**Ferramenta de Automação**: [Cypress, Playwright, K6, etc]

**Localização no Código**: `[path/to/test-file/scn-xxx.spec.ts]`

**Última Execução**: [YYYY-MM-DD] ([Sucesso | Falha])

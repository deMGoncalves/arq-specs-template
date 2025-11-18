# Critérios de Operação (Software Quality)

Esta checklist avalia a excelência do software durante sua **operação/execução**.

## 1. ✅ Corretitude

**Pergunta**: Ele faz o que é pedido?

### Verificações

- [ ] O código implementa exatamente o que foi solicitado no requisito?
- [ ] Todos os critérios de aceitação foram atendidos?
- [ ] O comportamento está de acordo com a especificação?
- [ ] Não há desvios ou funcionalidades extras não solicitadas?
- [ ] Edge cases estão corretamente tratados?

### Como Validar

1. Comparar implementação com requisitos em `.agent-task.md`
2. Verificar que todos os itens do checklist de Development foram atendidos
3. Confirmar que testes cobrem os requisitos
4. Validar que não há "feature creep" (funcionalidades não solicitadas)

### Issues Comuns

- 🔴 **Crítico**: Funcionalidade solicitada não foi implementada
- 🔴 **Crítico**: Comportamento diferente do especificado
- 🟠 **Alto**: Requisito parcialmente atendido
- 🟡 **Médio**: Edge case importante não tratado

---

## 2. ✅ Confiabilidade

**Pergunta**: É preciso?

### Verificações

- [ ] O código produz resultados corretos e consistentes?
- [ ] Não há comportamento não-determinístico indesejado?
- [ ] Cálculos e lógica estão matematicamente corretos?
- [ ] Não há race conditions ou problemas de concorrência?
- [ ] Tratamento de erros está robusto?

### Como Validar

1. Revisar lógica de negócio linha a linha
2. Verificar cálculos e fórmulas
3. Confirmar que testes incluem casos de precisão
4. Validar tratamento de condições assíncronas/paralelas
5. Verificar que erros não são silenciados

### Issues Comuns

- 🔴 **Crítico**: Lógica incorreta que produz resultados errados
- 🔴 **Crítico**: Race condition que causa comportamento imprevisível
- 🟠 **Alto**: Arredondamento ou precisão numérica inadequada
- 🟡 **Médio**: Falta de logs em pontos críticos

---

## 3. ✅ Eficácia

**Pergunta**: Ele tem boa performance?

### Verificações

- [ ] Não há loops ou recursões desnecessárias?
- [ ] Estruturas de dados são apropriadas (complexidade O(n) adequada)?
- [ ] Não há consultas N+1 ou operações repetidas?
- [ ] Alocações de memória são eficientes?
- [ ] I/O é minimizado e otimizado?
- [ ] Algoritmos escolhidos são adequados ao tamanho dos dados?

### Como Validar

1. Analisar complexidade algorítmica (Big O)
2. Identificar gargalos óbvios
3. Verificar uso de cache quando apropriado
4. Validar que operações custosas não estão em loops
5. Confirmar que queries/chamadas são otimizadas

### Issues Comuns

- 🟠 **Alto**: Algoritmo ineficiente (ex: O(n²) quando poderia ser O(n))
- 🟠 **Alto**: Query N+1 ou chamadas repetidas em loop
- 🟡 **Médio**: Estrutura de dados não otimizada (ex: lista quando deveria ser Set)
- 🟡 **Médio**: Falta de cache em operações custosas

### Exceções

- Performance pode ser sacrificada por legibilidade em código não-crítico
- Otimização prematura deve ser evitada (KISS > Performance)

---

## 4. ✅ Integridade

**Pergunta**: Oferece segurança?

### Verificações

- [ ] Não há vulnerabilidades de segurança óbvias?
- [ ] Inputs são validados e sanitizados?
- [ ] Não há SQL injection, XSS, ou CSRF possíveis?
- [ ] Dados sensíveis são protegidos (criptografia, hashing)?
- [ ] Autenticação e autorização estão corretas?
- [ ] Não há exposição de informações sensíveis (logs, erros)?
- [ ] Dependências não têm vulnerabilidades conhecidas?

### Como Validar

1. Verificar validação de todos os inputs externos
2. Confirmar sanitização antes de usar dados em queries/HTML
3. Validar que senhas/tokens são criptografados
4. Verificar que informações sensíveis não aparecem em logs
5. Confirmar permissões e controle de acesso

### Issues Comuns

- 🔴 **Crítico**: SQL injection ou XSS possível
- 🔴 **Crítico**: Senha ou token em plain text
- 🔴 **Crítico**: Falta de autenticação/autorização
- 🟠 **Alto**: Input não validado
- 🟠 **Alto**: Dados sensíveis em logs
- 🟡 **Médio**: Falta de rate limiting

### Referências

- OWASP Top 10
- CWE (Common Weakness Enumeration)
- Regras específicas em `.claude/rules/` sobre segurança

---

## 5. ✅ Usabilidade

**Pergunta**: Fácil de usar?

### Verificações (Para APIs/Bibliotecas)

- [ ] API é intuitiva e consistente?
- [ ] Nomes de funções/métodos são claros?
- [ ] Parâmetros são em ordem lógica?
- [ ] Mensagens de erro são claras e úteis?
- [ ] Documentação é suficiente?
- [ ] Exemplos de uso são fornecidos?

### Verificações (Para UIs)

- [ ] Interface é intuitiva?
- [ ] Feedback ao usuário é claro?
- [ ] Estados de erro são bem apresentados?
- [ ] Loading states são indicados?

### Como Validar

1. Tentar usar a API/interface "na mente" (mental model)
2. Verificar se nomes seguem convenções (.claude/rules/)
3. Confirmar que erros têm mensagens úteis
4. Validar que doc comments existem

### Issues Comuns

- 🟡 **Médio**: Nome de função/método confuso
- 🟡 **Médio**: Mensagem de erro genérica ou pouco útil
- 🟡 **Médio**: Falta de doc comments em API pública
- 🟢 **Baixo**: Ordem de parâmetros não intuitiva

---

## 6. ✅ Adaptabilidade

**Pergunta**: Ele se adapta às necessidades do usuário?

### Verificações

- [ ] Código é configurável quando apropriado?
- [ ] Não há valores hardcoded que deveriam ser configuráveis?
- [ ] Aceita diferentes formatos/tipos de entrada?
- [ ] Lida com diferentes ambientes (dev, staging, prod)?
- [ ] Comportamento pode ser ajustado sem mudar código?

### Como Validar

1. Identificar constantes mágicas que deveriam ser configuráveis
2. Verificar se valores de ambiente são usados corretamente
3. Confirmar que configuração é externalizável
4. Validar que não há paths ou URLs hardcoded

### Issues Comuns

- 🟠 **Alto**: Valores hardcoded que mudam entre ambientes
- 🟡 **Médio**: Configuração não externalizável
- 🟡 **Médio**: Falta de suporte a variáveis de ambiente
- 🟢 **Baixo**: Constante que poderia ser configurável

### Relacionado com

- Regra de constantes mágicas (`.claude/rules/024_*`)

---

## Resumo de Severidade

### 🔴 Crítico (Bloqueia aprovação)

- Funcionalidade não implementada ou incorreta
- Vulnerabilidade de segurança
- Lógica que produz resultados errados

### 🟠 Alto (Aprovação com ressalvas)

- Input não validado
- Performance muito degradada
- Requisito parcialmente atendido

### 🟡 Médio (Não bloqueia)

- Usabilidade comprometida
- Falta de configurabilidade
- Estruturas de dados não otimizadas

### 🟢 Baixo (Sugestão)

- Pequenas melhorias de usabilidade
- Otimizações não críticas

---

## Checklist Rápido

```markdown
## Operação

- [ ] ✅ Corretitude: Faz o que é pedido?
- [ ] ✅ Confiabilidade: É preciso?
- [ ] ✅ Eficácia: Boa performance?
- [ ] ✅ Integridade: Oferece segurança?
- [ ] ✅ Usabilidade: Fácil de usar?
- [ ] ✅ Adaptabilidade: Se adapta às necessidades?
```

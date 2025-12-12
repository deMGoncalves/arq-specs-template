# Política de Segurança

## Versões Suportadas

Mantenemos suporte de segurança para as seguintes versões do projeto:

| Versão | Suportada          | Status                  |
|--------|--------------------|-----------------------|
| 3.x.x  | :white_check_mark: | Ativamente mantida    |
| 2.x.x  | :x:                | Descontinuada         |
| 1.x.x  | :x:                | Descontinuada         |
| < 1.0  | :x:                | Descontinuada         |

**Recomendação**: Sempre use a versão mais recente para garantir que você tenha as últimas correções de segurança.

---

## Reportando uma Vulnerabilidade

A segurança de nossos usuários é nossa prioridade máxima. Se você descobrir uma vulnerabilidade de segurança, ajude-nos a resolvê-la de forma responsável.

### ⚠️ NÃO Reporte Publicamente

**Importante**: **NÃO** abra uma issue pública do GitHub para vulnerabilidades de segurança. Issues públicas podem expor usuários a ataques antes que uma correção esteja disponível.

### ✅ Como Reportar com Segurança

#### Método 1: GitHub Security Advisories (Preferencial)

1. Acesse [https://github.com/yourusername/arq-specs-template/security/advisories](https://github.com/yourusername/arq-specs-template/security/advisories)
2. Clique em **"Report a vulnerability"**
3. Preencha o formulário com detalhes da vulnerabilidade
4. Aguarde nossa resposta

#### Método 2: Email Criptografado

Envie um email para:

**Email**: security@example.com (ou use GitHub Security Advisories)

**Assunto**: `[SECURITY] Breve descrição da vulnerabilidade`

**Para comunicação segura**, você pode usar:
- **PGP Key**: [Link para chave PGP pública]
- **Keybase**: [Link para perfil Keybase]

### 📝 O Que Incluir no Relatório

Para nos ajudar a entender e resolver o problema rapidamente, inclua:

1. **Descrição detalhada** da vulnerabilidade
2. **Passos para reproduzir** o problema
3. **Impacto potencial** (confidencialidade, integridade, disponibilidade)
4. **Versões afetadas** (se conhecido)
5. **Prova de conceito** (PoC) - se aplicável e seguro
6. **Sugestões de correção** - se você tiver ideias
7. **Informações de contato** - para acompanhamento

### 📋 Template de Relatório

```markdown
## Resumo
[Breve descrição da vulnerabilidade em 1-2 frases]

## Detalhes
[Descrição técnica detalhada]

## Impacto
- **Severidade**: [Crítica | Alta | Média | Baixa]
- **Vetores de ataque**: [Como a vulnerabilidade pode ser explorada]
- **Dados em risco**: [Quais dados ou sistemas estão em risco]

## Passos para Reproduzir
1. Passo 1
2. Passo 2
3. Passo 3

## Prova de Conceito
[Código, screenshots ou descrição de PoC - se aplicável]

## Ambiente
- Versão do projeto: [ex: 3.2.1]
- Sistema operacional: [ex: Ubuntu 22.04]
- Outras dependências relevantes

## Sugestões de Correção
[Suas ideias para corrigir o problema - opcional]

## Contato
- Nome: [Seu nome ou pseudônimo]
- Email: [Seu email]
- Outras formas de contato: [Opcional]
```

---

## Processo de Resposta

### Timeline de Resposta

Levamos vulnerabilidades de segurança a sério. Nosso timeline típico:

| Fase | Prazo | Descrição |
|------|-------|-----------|
| **Confirmação de Recebimento** | 24 horas | Confirmaremos que recebemos seu relatório |
| **Avaliação Inicial** | 72 horas | Avaliaremos a severidade e validaremos a vulnerabilidade |
| **Plano de Correção** | 1 semana | Criaremos um plano de correção e timeline |
| **Desenvolvimento de Correção** | 2-4 semanas* | Desenvolveremos e testaremos a correção |
| **Release de Segurança** | Após testes | Lançaremos patch de segurança |
| **Divulgação Pública** | 7 dias após release | Publicaremos advisory de segurança |

_* O tempo pode variar dependendo da complexidade da vulnerabilidade_

### O Que Você Pode Esperar

1. **Confirmação rápida**: Responderemos em até 24 horas reconhecendo seu relatório
2. **Atualizações regulares**: Manteremos você informado sobre o progresso
3. **Crédito apropriado**: Com sua permissão, daremos crédito a você no advisory de segurança
4. **Colaboração**: Podemos pedir informações adicionais ou colaboração para validar a correção

### Divulgação Coordenada

Seguimos o princípio de **divulgação coordenada**:

- Trabalhamos com você para entender e corrigir a vulnerabilidade
- Solicitamos que você **não divulgue publicamente** até que tenhamos lançado uma correção
- Publicaremos um **security advisory** após o release da correção
- Daremos crédito a você (se desejar) no advisory

---

## Severidade de Vulnerabilidades

Classificamos vulnerabilidades usando **CVSS v3.1** (Common Vulnerability Scoring System):

### 🔴 Crítica (9.0 - 10.0)

**Exemplos**:
- Execução remota de código (RCE) sem autenticação
- Acesso completo ao sistema
- Exposição de chaves/credenciais de infraestrutura

**Ação**: Correção emergencial, release imediato

### 🟠 Alta (7.0 - 8.9)

**Exemplos**:
- Injeção SQL que expõe dados sensíveis
- Cross-Site Scripting (XSS) que permite roubo de sessão
- Bypass de autenticação

**Ação**: Correção priorizada, release em 1-2 semanas

### 🟡 Média (4.0 - 6.9)

**Exemplos**:
- Cross-Site Request Forgery (CSRF)
- Exposição de informações sensíveis a usuários autenticados
- Denial of Service (DoS) de baixo impacto

**Ação**: Correção em próxima versão regular, 2-4 semanas

### 🟢 Baixa (0.1 - 3.9)

**Exemplos**:
- Vazamento menor de informações
- Questões de configuração que requerem pré-condições incomuns
- Vulnerabilidades teóricas sem exploração prática conhecida

**Ação**: Correção planejada, incluída em release futuro

---

## Escopo de Segurança

### ✅ No Escopo

Vulnerabilidades nas seguintes áreas são consideradas no escopo:

- **Core system** (`.claude/` - comandos, skills, templates)
- **Documentação** que contenha exemplos de código inseguro
- **Scripts de validação** (`.claude/validators/`)
- **Templates** que possam levar a implementações inseguras
- **Dependências** diretas do projeto

### ❌ Fora de Escopo

As seguintes áreas **NÃO** estão no escopo de segurança:

- **Ataques de engenharia social**
- **Vulnerabilidades em código gerado** pelo usuário (não pelo template)
- **Vulnerabilidades em dependências de terceiros** (reporte aos mantenedores originais)
- **Issues de usabilidade** que não afetam segurança
- **Bugs funcionais** sem impacto de segurança
- **Ataques de força bruta** em ambientes de desenvolvimento local

---

## Programa de Recompensas (Bug Bounty)

Atualmente, **não oferecemos recompensas monetárias** para relatórios de vulnerabilidade. No entanto, reconhecemos contribuições de segurança da seguinte forma:

### 🏆 Reconhecimento

- **Hall of Fame**: Listaremos pesquisadores de segurança em nosso `SECURITY_HALL_OF_FAME.md`
- **Crédito em Advisory**: Mencionaremos você no advisory de segurança
- **Badge de Contribuidor**: Badge especial de "Security Researcher" no GitHub
- **Prioridade em PRs**: Seus pull requests futuros terão revisão prioritária

### 📧 Como Ser Creditado

Ao reportar uma vulnerabilidade, indique:

- **Nome ou pseudônimo** que deseja que usemos
- **Link** (Twitter, GitHub, website) que deseja que incluamos
- **Se prefere anonimato** - respeitaremos totalmente

---

## Melhores Práticas de Segurança

### Para Usuários do Template

Se você está usando este template em seu projeto:

1. **✅ Mantenha atualizado**: Use sempre a versão mais recente
2. **✅ Revise código gerado**: Valide todo código gerado pela IA
3. **✅ Siga Object Calisthenics**: As 39 regras ajudam a prevenir vulnerabilidades
4. **✅ Testes de segurança**: Inclua testes de segurança em seus projetos
5. **✅ Validação de entrada**: Sempre valide inputs de usuário
6. **✅ Princípio do menor privilégio**: Conceda apenas permissões necessárias
7. **✅ Secrets management**: NUNCA commite credenciais ou chaves

### Para Contribuidores

Se você está contribuindo para o projeto:

1. **✅ Revise dependências**: Use `npm audit` / ferramentas similares
2. **✅ Evite padrões inseguros**: Não introduza SQL injection, XSS, etc.
3. **✅ Valide inputs**: Valide todas as entradas em templates e exemplos
4. **✅ Documentação segura**: Exemplos devem mostrar práticas seguras
5. **✅ Code review**: Submeta código para revisão de segurança

---

## Histórico de Segurança

### Advisories Publicados

Manteremos um registro de todos os advisories de segurança:

#### 2025

- **Nenhum advisory publicado ainda** 🎉

### Como Acompanhar Advisories

- **GitHub Security Advisories**: [https://github.com/yourusername/arq-specs-template/security/advisories](https://github.com/yourusername/arq-specs-template/security/advisories)
- **RSS Feed**: Assine notificações do GitHub
- **Watch Repository**: Configure para receber notificações de "Security alerts"

---

## Dependências e Supply Chain

### Monitoramento de Dependências

Usamos ferramentas automáticas para monitorar dependências:

- **GitHub Dependabot**: Atualiza dependências automaticamente
- **npm audit**: Executa regularmente em CI/CD
- **Snyk** (se aplicável): Scan contínuo de vulnerabilidades

### Política de Atualização

- **Vulnerabilidades críticas**: Atualização imediata
- **Vulnerabilidades altas**: Atualização em 1 semana
- **Vulnerabilidades médias/baixas**: Próximo release regular

---

## Contato

### Questões de Segurança

- **Email**: security@example.com
- **GitHub Security Advisories**: [Link]
- **PGP Key**: [Link para chave pública]

### Questões Gerais (Não de Segurança)

- **GitHub Issues**: [https://github.com/yourusername/arq-specs-template/issues](https://github.com/yourusername/arq-specs-template/issues)
- **GitHub Discussions**: [https://github.com/yourusername/arq-specs-template/discussions](https://github.com/yourusername/arq-specs-template/discussions)

---

## Recursos Adicionais

### Leitura Recomendada

- **OWASP Top 10**: [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
- **CWE Top 25**: [https://cwe.mitre.org/top25/](https://cwe.mitre.org/top25/)
- **CVSS Calculator**: [https://www.first.org/cvss/calculator/3.1](https://www.first.org/cvss/calculator/3.1)

### Ferramentas de Segurança

- **npm audit**: Auditoria de dependências Node.js
- **Snyk**: Scan de vulnerabilidades
- **OWASP ZAP**: Testing de segurança web
- **Bandit** (Python): Static analysis de segurança

---

**Última Atualização**: 2025-12-11
**Versão**: 1.0.0

---

**Obrigado por ajudar a manter o projeto seguro!** 🔒

_Se você tiver dúvidas sobre esta política de segurança, abra uma [Discussion](https://github.com/yourusername/arq-specs-template/discussions) (para questões gerais) ou entre em contato via security@example.com (para questões sensíveis)._

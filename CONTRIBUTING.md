# Guia de Contribuição

Obrigado por considerar contribuir com o **Documentation-First Approach**! 🎉

Este documento fornece diretrizes para contribuir com o projeto. Seguir estas diretrizes ajuda a comunicar que você respeita o tempo dos desenvolvedores que gerenciam e desenvolvem este projeto open source.

---

## 📋 Índice

- [Código de Conduta](#-código-de-conduta)
- [Como Posso Contribuir?](#-como-posso-contribuir)
- [Processo de Desenvolvimento](#-processo-de-desenvolvimento)
- [Configuração do Ambiente](#-configuração-do-ambiente)
- [Diretrizes de Código](#-diretrizes-de-código)
- [Diretrizes de Commit](#-diretrizes-de-commit)
- [Processo de Pull Request](#-processo-de-pull-request)
- [Diretrizes de Documentação](#-diretrizes-de-documentação)
- [Relatando Bugs](#-relatando-bugs)
- [Sugerindo Melhorias](#-sugerindo-melhorias)
- [Comunidade](#-comunidade)

---

## 📜 Código de Conduta

Este projeto adere ao [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, espera-se que você mantenha este código. Por favor, reporte comportamentos inaceitáveis para [INSERIR EMAIL].

---

## 🤝 Como Posso Contribuir?

Existem várias formas de contribuir com o projeto:

### 1. 🐛 Reportar Bugs

Encontrou um bug? Ajude-nos a corrigi-lo:

1. **Verifique** se o bug já não foi reportado em [Issues](https://github.com/yourusername/arq-specs-template/issues)
2. **Abra uma issue** usando o template de bug report
3. **Descreva** o problema claramente com passos para reprodução
4. **Inclua** informações de ambiente (SO, versão do Claude Code, etc.)

### 2. 💡 Sugerir Melhorias

Tem uma ideia para melhorar o projeto?

1. **Verifique** se a sugestão já não existe em [Issues](https://github.com/yourusername/arq-specs-template/issues)
2. **Abra uma issue** usando o template de feature request
3. **Descreva** claramente a melhoria e sua motivação
4. **Explique** como isso beneficia os usuários do projeto

### 3. 📖 Melhorar Documentação

Documentação clara é essencial:

- Corrigir erros de digitação ou gramática
- Adicionar exemplos práticos
- Melhorar explicações existentes
- Traduzir documentação (atualmente em Português BR)
- Criar tutoriais e guias

### 4. 💻 Contribuir com Código

Quer implementar uma nova feature ou corrigir um bug?

- Escolha uma issue marcada como `good first issue` para começar
- Issues marcadas como `help wanted` precisam de contribuidores
- Siga o [Processo de Desenvolvimento](#-processo-de-desenvolvimento) abaixo

### 5. 🧪 Adicionar Exemplos

Exemplos práticos são muito valiosos:

- Novos cenários BDD (`.claude/examples/bdd-scenarios/`)
- Novos exemplos de arquitetura (`.claude/examples/architecture/`)
- Novos exemplos de regras de qualidade (`.claude/examples/quality-rules/`)

### 6. 🎨 Melhorar Templates

Aprimore os templates existentes:

- Templates Arc42 (`.claude/templates/arc42/`)
- Templates C4 (`.claude/templates/c4/`)
- Templates BDD (`.claude/templates/bdd/`)
- Templates ADR (`.claude/templates/adr/`)

---

## 🔄 Processo de Desenvolvimento

Este projeto segue a **abordagem Documentation-First**. Isso significa:

### 1. Documentação ANTES de Código

```
❌ ERRADO: Escrever código → Documentar depois
✅ CORRETO: Especificar → Implementar → Atualizar docs
```

### 2. Workflow Completo

Para features não-triviais:

```bash
# 1. Criar proposta (se feature complexa)
# Arquivo: changes/[feature-id]/proposal.md

# 2. Especificar (Arc42 + BDD)
# Arquivo: changes/[feature-id]/spec.md

# 3. Implementar código
# Seguindo DDD Tactical Co-Located

# 4. Escrever testes (cobertura ≥80%)
# Junto com o código

# 5. Atualizar documentação
# specs/, README.md, etc.
```

### 3. Organização de Código

**✅ Use DDD Tactical Co-Located**:
```
src/[contexto]/[container]/[componente]/
  - index.ts
  - criar-[entidade].ts
  - [acao]-[entidade].ts
  - [Entidade].ts
  - [componente].spec.ts
```

**❌ NÃO use organização por camadas técnicas**:
```
src/domain/entities/
src/application/services/
src/infrastructure/repositories/
```

### 4. Qualidade de Código

Aplique as **39 regras de qualidade** (`.claude/rules/`):

- ✅ Máximo 1 nível de indentação
- ✅ Sem cláusula ELSE
- ✅ Encapsular primitivos
- ✅ Coleções como primeira classe
- ✅ Funções pequenas (<20 linhas)
- ✅ SOLID principles
- ✅ Testes com ≥80% cobertura

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

```bash
✅ Claude Code instalado → https://claude.ai/code
✅ Git 2.x+
✅ Node.js 18+ (opcional, para validações)
```

### Setup Inicial

```bash
# 1. Fork o repositório
# Clique em "Fork" no GitHub

# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/arq-specs-template.git
cd arq-specs-template

# 3. Adicione o upstream
git remote add upstream https://github.com/yourusername/arq-specs-template.git

# 4. Crie uma branch para sua feature
git checkout -b feature/minha-feature

# 5. (Opcional) Configure validações
chmod +x .claude/hooks/*.sh
chmod +x .claude/validators/**/*.sh
```

### Mantendo seu Fork Atualizado

```bash
# Buscar mudanças do upstream
git fetch upstream

# Atualizar sua main
git checkout main
git merge upstream/main

# Atualizar sua branch de feature
git checkout feature/minha-feature
git rebase main
```

---

## 📝 Diretrizes de Código

### Estilo de Código

1. **TypeScript/JavaScript**:
   - Use TypeScript sempre que possível
   - Siga as regras do `.claude/rules/`
   - Use `const` ao invés de `let` sempre que possível
   - Prefira funções puras

2. **Nomenclatura**:
   - **Arquivos**: kebab-case (`criar-usuario.ts`)
   - **Classes**: PascalCase (`Usuario`, `EmailValueObject`)
   - **Funções**: camelCase (`criarUsuario`, `validarEmail`)
   - **Constantes**: UPPER_SNAKE_CASE (`MAX_TENTATIVAS`)

3. **Comentários**:
   - Em Português (Brasil)
   - Explique o "por quê", não o "o quê"
   - Use JSDoc para funções públicas

### Exemplo de Código Bom

```typescript
/**
 * Cria um novo usuário validando email e senha
 *
 * @param dados - Dados do usuário (email, senha, nome)
 * @returns Usuário criado com ID gerado
 * @throws {EmailInvalidoError} Se email for inválido
 * @throws {SenhaFracaError} Se senha não atender critérios
 */
export function criarUsuario(dados: DadosUsuario): Usuario {
  const email = Email.criar(dados.email);
  const senha = Senha.criar(dados.senha);

  return {
    id: gerarId(),
    email: email.valor,
    senha: senha.hash,
    nome: dados.nome,
    criadoEm: new Date(),
  };
}
```

### Testes

**Estrutura de Teste**:

```typescript
describe('criarUsuario', () => {
  describe('quando dados são válidos', () => {
    it('cria usuário com sucesso', () => {
      const dados = {
        email: 'maria@exemplo.com',
        senha: 'Senha123!',
        nome: 'Maria Silva',
      };

      const usuario = criarUsuario(dados);

      expect(usuario.id).toBeDefined();
      expect(usuario.email).toBe('maria@exemplo.com');
      expect(usuario.nome).toBe('Maria Silva');
    });
  });

  describe('quando email é inválido', () => {
    it('lança EmailInvalidoError', () => {
      const dados = {
        email: 'email-invalido',
        senha: 'Senha123!',
        nome: 'Maria Silva',
      };

      expect(() => criarUsuario(dados)).toThrow(EmailInvalidoError);
    });
  });
});
```

**Cobertura Mínima**: ≥80% (lines, branches, functions, statements)

---

## 📋 Diretrizes de Commit

### Formato de Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição curta>

<corpo opcional>

<rodapé opcional>
```

### Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(auth): adiciona autenticação OAuth2` |
| `fix` | Correção de bug | `fix(email): corrige validação RFC 5322` |
| `docs` | Apenas documentação | `docs(readme): atualiza exemplo de uso` |
| `style` | Formatação, ponto e vírgula, etc | `style(user): formata código com Prettier` |
| `refactor` | Refatoração de código | `refactor(payment): simplifica lógica de desconto` |
| `test` | Adicionar ou corrigir testes | `test(auth): adiciona testes de integração` |
| `chore` | Tarefas de manutenção | `chore(deps): atualiza dependências` |
| `perf` | Melhoria de performance | `perf(db): otimiza query de busca` |

### Exemplos de Bons Commits

```bash
# Feature nova
feat(checkout): implementa validação de estoque antes do checkout

Adiciona verificação de disponibilidade de estoque antes de
permitir que o usuário complete o checkout.

Closes #123

# Correção de bug
fix(auth): corrige expiração de token JWT

O token estava expirando após 1 hora ao invés de 2 horas
conforme especificado em specs/06_runtime/scenarios/SCN-001.md

Fixes #456

# Documentação
docs(contributing): adiciona seção sobre testes

# Refatoração
refactor(user): remove cláusula ELSE conforme regra 002

Aplica Object Calisthenics Regra 2 - Sem cláusula ELSE.
Usa early return para simplificar lógica.

Refs: .claude/rules/002-no-else-clause.md
```

### Regras de Commit

- ✅ Mensagem em Português (Brasil)
- ✅ Use presente do indicativo ("adiciona", não "adicionou")
- ✅ Primeira linha ≤72 caracteres
- ✅ Corpo do commit explica "por quê", não "o quê"
- ✅ Referencie issues relacionadas (#123)
- ❌ Não commite código não testado
- ❌ Não commite código que quebra o build

---

## 🔀 Processo de Pull Request

### Antes de Abrir o PR

**Checklist**:

- [ ] Código segue as [Diretrizes de Código](#-diretrizes-de-código)
- [ ] Commits seguem [Conventional Commits](#-diretrizes-de-commit)
- [ ] Todos os testes passam localmente
- [ ] Cobertura de testes ≥80%
- [ ] Documentação atualizada (se necessário)
- [ ] Specs atualizadas (se feature nova)
- [ ] CHANGELOG.md atualizado (se aplicável)
- [ ] Sem conflitos com branch `main`

### Abrindo o PR

1. **Título descritivo** seguindo Conventional Commits:
   ```
   feat(auth): adiciona autenticação OAuth2 com Google e GitHub
   ```

2. **Preencha o template** de PR com todas as seções:
   - Descrição
   - Tipo de mudança
   - Checklist
   - Testes realizados
   - Capturas de tela (se aplicável)

3. **Linke issues relacionadas**:
   ```markdown
   Closes #123
   Relates to #456
   ```

4. **Solicite review** de pelo menos 1 mantenedor

### Durante o Review

- **Responda aos comentários** de forma construtiva
- **Faça mudanças solicitadas** em novos commits
- **Não force-push** após o review inicial (dificulta acompanhar mudanças)
- **Marque conversas como resolvidas** quando aplicável

### Merge

- PRs são mergeados por mantenedores após aprovação
- Usamos **Squash and Merge** para manter histórico limpo
- Sua branch será automaticamente deletada após merge

---

## 📚 Diretrizes de Documentação

### Estrutura de Documentação

Este projeto usa **Arc42** com 12 capítulos em `specs/`:

```
specs/
├── 01_introduction/     # Visão, objetivos, stakeholders
├── 02_constraints/      # Restrições técnicas
├── 03_context/          # Contexto do sistema
├── 04_solution-strategy/# Estratégia de solução
├── 05_building-blocks/  # Containers + Componentes
├── 06_runtime/          # Cenários BDD
├── 07_deployment/       # Deployment
├── 08_crosscutting/     # Conceitos transversais
├── 09_decisions/        # ADRs
├── 10_quality/          # Requisitos de qualidade
├── 11_risks/            # Riscos
└── 12_glossary/         # Glossário
```

### Escrevendo Documentação

1. **Linguagem**: Português (Brasil)
2. **Formato**: Markdown com GitHub Flavored Markdown
3. **Clareza**: Explique conceitos como se para alguém novo no projeto
4. **Exemplos**: Sempre que possível, inclua exemplos práticos
5. **Diagramas**: Use Mermaid, PlantUML ou imagens
6. **Referências**: Linke para outros documentos quando relevante

### Exemplo de Documentação Boa

```markdown
## Autenticação JWT

O sistema utiliza **JSON Web Tokens (JWT)** para autenticação stateless.

### Fluxo de Autenticação

1. Usuário envia credenciais (email + senha)
2. Sistema valida credenciais contra banco de dados
3. Sistema gera 2 tokens:
   - **Access Token**: Expira em 2 horas
   - **Refresh Token**: Expira em 7 dias
4. Cliente armazena tokens (localStorage ou httpOnly cookie)
5. Cliente inclui access token em todas as requisições

### Estrutura do Token

```json
{
  "sub": "user-uuid",
  "email": "maria@exemplo.com",
  "roles": ["user"],
  "iat": 1699999999,
  "exp": 1700007199
}
```

### Segurança

- Tokens são assinados com RS256 (chave assimétrica)
- Chave privada mantida em secret management (AWS Secrets Manager)
- Tokens não podem ser revogados (design stateless)
- Para logout, cliente descarta tokens localmente

### Referências

- Especificação: `specs/06_runtime/scenarios/SCN-001_login.md`
- Implementação: `src/autenticacao/jwt/`
- ADR: `specs/09_decisions/adrs/ADR-003_jwt-authentication.md`
```

---

## 🐛 Relatando Bugs

### Antes de Reportar

1. **Verifique** se o bug já foi reportado
2. **Teste** na versão mais recente
3. **Confirme** que não é um erro de configuração

### Reportando

Use o [template de bug report](https://github.com/yourusername/arq-specs-template/issues/new?template=bug_report.md):

**Informações Necessárias**:

- **Descrição clara** do problema
- **Passos para reproduzir**:
  1. Execute comando X
  2. Faça Y
  3. Observe erro Z
- **Comportamento esperado**: O que deveria acontecer
- **Comportamento atual**: O que está acontecendo
- **Ambiente**:
  - SO: macOS 13.0
  - Claude Code: v1.2.3
  - Node.js: v20.0.0
- **Logs/Screenshots**: Se aplicável
- **Possível solução**: Se você tem ideia de como corrigir

---

## 💡 Sugerindo Melhorias

### Antes de Sugerir

1. **Verifique** se a sugestão já existe
2. **Considere** se alinha com os objetivos do projeto
3. **Pense** em implementação e impacto

### Sugerindo

Use o [template de feature request](https://github.com/yourusername/arq-specs-template/issues/new?template=feature_request.md):

**Informações Necessárias**:

- **Problema que resolve**: Qual dor você está tentando aliviar?
- **Solução proposta**: Como você imagina que isso funcione?
- **Alternativas consideradas**: Que outras abordagens você pensou?
- **Contexto adicional**: Mockups, exemplos, referências
- **Impacto estimado**: Quem se beneficiaria e como?

---

## 🌍 Comunidade

### Onde Obter Ajuda

- **Documentação**: Leia `.claude/README.md` e `specs/`
- **Issues**: Procure em [Issues fechadas](https://github.com/yourusername/arq-specs-template/issues?q=is%3Aissue+is%3Aclosed)
- **Discussions**: Use [GitHub Discussions](https://github.com/yourusername/arq-specs-template/discussions)
- **Discord**: [Junte-se ao servidor](https://discord.gg/INSERIR-LINK)

### Como Ajudar Outros

- Responda perguntas em Discussions
- Ajude a reproduzir bugs em Issues
- Melhore documentação com base em suas dúvidas
- Compartilhe suas experiências usando o projeto

---

## 🙏 Agradecimentos

Obrigado por contribuir! Suas contribuições tornam este projeto melhor para todos.

**Principais Contribuidores**: Veja [Contributors](https://github.com/yourusername/arq-specs-template/graphs/contributors)

---

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [Licença MIT](LICENSE).

---

**Dúvidas sobre este guia?** Abra uma [Discussion](https://github.com/yourusername/arq-specs-template/discussions/new) ou entre em contato com os mantenedores.

**Pronto para contribuir?** [Abra uma issue](https://github.com/yourusername/arq-specs-template/issues/new/choose) ou [fork o repositório](https://github.com/yourusername/arq-specs-template/fork)! 🚀

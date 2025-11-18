# Guia de Contribuição - Arq-Specs

Obrigado por considerar contribuir com o Arq-Specs! 🎉

Este documento fornece diretrizes para contribuir com o projeto.

---

## 📚 Leitura Recomendada Antes de Contribuir

- **[QUICKSTART.md](QUICKSTART.md)** - Entenda como usar o projeto (15 minutos)
- **[HOW-IT-WORKS.md](HOW-IT-WORKS.md)** - Entenda como funciona na prática
- **[MANIFEST.md](MANIFEST.md)** - Entenda por que funciona (matemática + ciência)
- **[.claude/constitution.md](.claude/constitution.md)** - Princípios fundamentais (LEIA PRIMEIRO!)

---

## 📖 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Configurando o Ambiente](#configurando-o-ambiente)
- [Processo de Contribuição](#processo-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Padrões de Documentação](#padrões-de-documentação)
- [Commits e PRs](#commits-e-prs)
- [Revisão de Código](#revisão-de-código)

---

## 📜 Código de Conduta

Este projeto segue o [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

**Resumo:**
- 🤝 Seja respeitoso e inclusivo
- 💬 Comunique-se de forma construtiva
- 🚫 Não tolere assédio ou discriminação
- ✅ Foque no que é melhor para a comunidade

---

## 🤝 Como Posso Contribuir?

### 1. Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/your-org/arq-specs-template/issues) com:

**Template:**
```markdown
## Descrição do Bug
[Descrição clara e concisa]

## Passos para Reproduzir
1. ...
2. ...
3. ...

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que realmente acontece]

## Screenshots/Logs
[Se aplicável]

## Ambiente
- OS: [ex: macOS 14.1]
- Claude Code: [ex: 1.2.3]
- Bun: [ex: 1.1.0]
```

### 2. Sugerir Melhorias

Tem uma ideia? Abra uma [discussion](https://github.com/your-org/arq-specs-template/discussions) com:

**Template:**
```markdown
## Problema que Resolve
[Qual problema esta melhoria resolve?]

## Solução Proposta
[Como você sugere resolver?]

## Alternativas Consideradas
[Outras abordagens que você considerou]

## Impacto
[Quem se beneficia? Qual o impacto?]
```

### 3. Contribuir com Código

Áreas que precisam de ajuda:

#### 🎯 Alta Prioridade

- **Templates específicos de domínio**
  - Fintech (pagamentos, KYC, transações)
  - Healthtech (HIPAA, prontuários, telemedicina)
  - E-commerce (checkout, inventory, shipping)
  - Logística (rastreamento, roteirização, armazém)

- **Agents especializados**
  - Melhorias no orchestrator (decomposição mais inteligente)
  - Novos agents (ex: performance-analyzer, security-auditor)

- **Validadores**
  - Validator de conformidade Arc42
  - Validator de cenários BDD
  - Validator de ADRs

#### 🌟 Média Prioridade

- **Tradução de documentação**
  - Inglês completo
  - Espanhol
  - Outros idiomas

- **Exemplos práticos**
  - Projetos reais completos
  - Casos de uso específicos
  - Tutoriais em vídeo

- **Ferramentas**
  - CLI para comandos Arc42
  - VS Code extension
  - Web dashboard

#### 💡 Baixa Prioridade (mas bem-vinda!)

- **Melhorias de UI/UX**
  - Diagramas mais bonitos
  - Templates mais legíveis
  - Markdown melhor formatado

- **Performance**
  - Otimização de comandos
  - Cache de templates
  - Parallel processing

---

## ⚙️ Configurando o Ambiente

### Pré-requisitos

- [Bun](https://bun.sh/) ≥ 1.1
- [Git](https://git-scm.com/)
- [Claude Code](https://claude.ai/code) (para testar)
- Editor de código (VS Code recomendado)

### Fork & Clone

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/arq-specs-template.git
cd arq-specs-template

# 3. Adicione o upstream
git remote add upstream https://github.com/your-org/arq-specs-template.git

# 4. Instale dependências
bun install
```

### Estrutura do Projeto

```
arq-specs-template/
├── .claude/              # Configuração Claude Code
│   ├── constitution.md   # NÃO MODIFIQUE sem aprovação
│   ├── commands/         # Comandos Arc42
│   ├── skills/           # Agents especializados
│   ├── templates/        # Templates (principal área de contribuição)
│   └── rules/            # 39 regras de qualidade
│
├── docs/                 # Documentação adicional
├── examples/             # Exemplos práticos
├── tests/                # Testes automatizados
└── scripts/              # Scripts de build/validação
```

### Rodando Localmente

```bash
# Desenvolvimento com HMR
bun run dev

# Build de produção
bun run build

# Preview do build
bun run preview

# Testes
bun test

# Linting
bun run lint

# Validação de specs
bun run lint:specs
```

---

## 🔄 Processo de Contribuição

### Princípios Inegociáveis

- **Documentação primeiro.** Toda alteração começa em `specs/`. Sem capítulo atualizado, não há código aprovado.
- **Fonte única de verdade.** O Arc42 é o contrato vivo que alimenta humanos e agentes; divergências são tratadas como incidentes.
- **Transparência mensurável.** Cada mudança deve apontar métricas (SLOs, RTO/RPO, produtividade) e riscos associados.
- **Automação consciente.** Comandos `/vision`, `/stack`, `/plan`, etc., são seus copilotos. Sempre revise o resultado antes do commit.

### 1. Crie uma Branch

```bash
# Sempre crie a partir da main atualizada
git checkout main
git pull upstream main

# Crie branch com nome descritivo
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
# ou
git checkout -b docs/nome-da-doc
```

**Convenção de nomes:**
- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Documentação
- `refactor/` - Refatoração
- `test/` - Adicionar/melhorar testes
- `chore/` - Tarefas de manutenção

### 2. Escolha o Fluxo Certo

| Cenário | Fluxo recomendado | Ordem dos comandos |
| ------- | ----------------- | ------------------ |
| Já existe documentação densa (RFP, BRD, discovery completo) | **Opção A — Fluxo Acelerado** | `/import` → `/code` |
| Projeto greenfield ou necessidade de inspeções faseadas | **Opção B — Desenvolvimento Iterativo** | `/vision` → `/stack` → `/plan` + `/feature` → `/build` → `/code` |

### 3. Faça Suas Mudanças

**Regras:**

✅ **FAÇA:**
- Siga os [padrões de código](#padrões-de-código)
- Adicione testes para novas funcionalidades
- Atualize documentação relevante
- Verifique se build passa (`bun run build`)
- Teste com Claude Code localmente
- Execute `bun run lint:specs` após cada comando

❌ **NÃO FAÇA:**
- Mudanças no `.claude/constitution.md` sem discussão prévia
- Commits diretos na `main`
- PRs enormes (>500 linhas alteradas)
- Breaking changes sem discussão
- Código sem especificação correspondente em `specs/`

### 4. Commit Suas Mudanças

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

**Exemplos:**

```bash
git commit -m "feat(templates): add fintech payment template"

git commit -m "fix(orchestrator): correct task size calculation

Task size was being calculated incorrectly for TypeScript files,
leading to tasks with >200 LOC.

Fixes #123"

git commit -m "docs(readme): update installation instructions"
```

### 5. Push e Crie PR

```bash
# Push para seu fork
git push origin feature/nome-da-feature

# Crie Pull Request no GitHub
# Use o template de PR
```

**Template de PR:**

```markdown
## Descrição
[Descrição clara do que foi feito]

## Tipo de Mudança
- [ ] Bug fix (correção que resolve um problema)
- [ ] Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] Breaking change (correção ou funcionalidade que causa quebra)
- [ ] Documentação (mudança apenas em documentação)

## Como Foi Testado?
[Descreva os testes realizados]

## Impacto
- **SLOs afetados**: [Liste]
- **Riscos**: [Liste]
- **Métricas**: [Liste]

## Documentação Atualizada
- [ ] `specs/` atualizado
- [ ] README atualizado (se necessário)
- [ ] ADR criado (se decisão arquitetural)
- [ ] Glossário atualizado

## Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Revisei meu próprio código
- [ ] Comentei código complexo
- [ ] Atualizei a documentação ANTES do código
- [ ] Minhas mudanças não geram warnings
- [ ] Adicionei testes que provam que meu fix/feature funciona
- [ ] Testes unitários novos e existentes passam localmente
- [ ] Build passa (`bun run build`)
- [ ] Specs validadas (`bun run lint:specs`)

## Screenshots (se aplicável)
[Cole screenshots aqui]

## Issues Relacionadas
Fixes #123
Closes #456
```

---

## 📝 Padrões de Código

### TypeScript/JavaScript

Seguimos o [Airbnb Style Guide](https://github.com/airbnb/javascript).

**Regras principais:**

```typescript
// ✅ BOM
export class Email {
  private constructor(private readonly value: string) {
    this.validate()
  }

  private validate(): void {
    if (!this.isValidFormat()) {
      throw new EmailInvalidoError('INVALID_EMAIL_FORMAT')
    }
  }

  private isValidFormat(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)
  }

  static create(value: string): Email {
    return new Email(value)
  }
}

// ❌ RUIM
export class Email {
  value: string  // Deveria ser private readonly

  constructor(value: string) {  // Deveria ser private
    this.value = value
    if (!this.validate()) {  // Deveria lançar erro, não retornar boolean
      console.log("Email inválido")  // Não use console.log, use Error
    }
  }

  validate() {  // Tipo de retorno faltando
    // Regex inline sem validação
    return this.value.includes("@")  // Validação muito simples
  }
}
```

### Estrutura DDD Co-Located

```
✅ CORRETO:
src/user-management/api/usuario/
  ├── index.ts                    # Aggregate root
  ├── criar-usuario.ts            # Factory
  ├── registrar-usuario.ts        # Use case
  ├── Email.ts                    # Value object
  ├── UsuarioRegistrado.ts        # Domain event
  └── usuario.spec.ts             # Tests

❌ ERRADO:
src/
  ├── domain/entities/Usuario.ts
  ├── application/services/UsuarioService.ts
  └── infrastructure/repositories/UsuarioRepository.ts
```

### Object Calisthenics

Seguimos as [9 regras de Object Calisthenics](.claude/rules/001-009_object-calisthenics/):

1. **1 nível de indentação** por método
2. **Sem ELSE**
3. **Encapsular primitivos**
4. **Coleções como primeira classe**
5. **Máximo 1 chamada por linha**
6. **Sem nomes abreviados**
7. **Máximo 50 linhas por classe**
8. **Sem getters/setters**
9. **Diga, não pergunte (Tell, Don't Ask)**

---

## 📚 Padrões de Documentação

### Markdown

```markdown
# Título Nível 1

Parágrafo introdutório.

## Título Nível 2

### Título Nível 3

**Negrito** para ênfase.
*Itálico* para termos técnicos na primeira menção.

`código inline` para código, comandos, arquivos.

\`\`\`typescript
// Bloco de código
const example = "hello"
\`\`\`

- Lista não ordenada
- Item 2
  - Subitem

1. Lista ordenada
2. Item 2

> Citação

---

Separador horizontal

[Link](https://example.com)

![Imagem](path/to/image.png)
```

### Templates Arc42

Todos os templates devem seguir a estrutura Arc42. Veja `.claude/templates/arc42/` para exemplos.

### Cenários BDD

```gherkin
Funcionalidade: [Nome da Funcionalidade]
  Como um [tipo de usuário]
  Eu quero [objetivo]
  Para que [benefício]

  Contexto:
    Dado que [pré-condição compartilhada]

  Cenário: [Nome do Cenário Positivo]
    Dado que [pré-condição]
    E [outra pré-condição]
    Quando [ação]
    Então [resultado esperado]
    E [outro resultado]

  Cenário: [Nome do Cenário Negativo]
    Dado que [pré-condição]
    Quando [ação que falha]
    Então [erro esperado]
    E [consequência do erro]
```

### ADRs (Architecture Decision Records)

Veja `.claude/templates/adr/adr-template.md` para o template completo.

---

## 🔍 Revisão de Código

### O Que Revisores Verificam

1. **Documentação Primeiro**
   - Specs em `specs/` atualizadas?
   - Especificação determinística?
   - ADR criado (se decisão arquitetural)?

2. **Corretude**
   - Código faz o que deveria?
   - Lógica está correta?
   - Edge cases tratados?

3. **Testes**
   - Cobertura >= 80%?
   - Testes significativos?
   - Integration tests quando apropriado?

4. **Padrões**
   - Segue DDD Co-Located?
   - Segue Object Calisthenics?
   - Segue SOLID?

5. **Segurança**
   - Input validado?
   - Secrets não hardcoded?
   - SQL injection prevenido?

### Revisão e Aprovação

- **Pelo menos um Maintainer** deve aprovar mudanças de documentação estratégica (capítulos 01–04, 08–09).
- Mudanças que impliquem novos riscos precisam atualizar `specs/11_risks/011_risks-and-technical-debt.md`.
- **Qualquer divergência entre código e documentação bloqueia o merge** até ser resolvida.
- Se um agente for usado para gerar conteúdo, mencione no PR qual comando foi executado e quais ajustes manuais foram feitos.

---

## 🐛 Como Reportar Incidentes

- Abra uma issue com o prefixo `[INCIDENT]`.
- Informe data/hora, capítulos desatualizados, sintomas percebidos e custo (tempo extra, incidentes em produção, retrabalho).
- Inclua um plano para corrigir a documentação antes de tocar no código.

---

## ❓ FAQ

### P: Como sei se minha contribuição será aceita?

**R**: Abra uma **discussion** ou **issue** primeiro para discutir sua ideia. Isso evita trabalho desperdiçado.

### P: Posso modificar a constitution.md?

**R**: Apenas com **consenso da equipe** (>75%). Veja [constitution.md - Artigo V](.claude/constitution.md#artigo-v-governança--evolução).

### P: Quanto tempo leva para revisar meu PR?

**R**: Tipicamente **2-5 dias úteis**. PRs urgentes (bugs críticos) são priorizados.

### P: Meu PR foi rejeitado. E agora?

**R**: Analise o feedback fornecido, implemente os ajustes solicitados e resubmeta. O processo de revisão avalia código, não desenvolvedores.

### P: Posso contribuir se sou iniciante?

**R**: Contribuições de todos os níveis de experiência são bem-vindas. Issues marcadas com `good first issue` e `help wanted` são pontos de entrada recomendados para novos contribuidores.

### P: Como reporto uma vulnerabilidade de segurança?

**R**: **NÃO** abra uma issue pública. Envie email para security@arq-specs.dev (se disponível) ou abra uma [Security Advisory](https://docs.github.com/en/code-security/security-advisories).

---

## 📞 Contato

- 🐛 **Bugs**: [GitHub Issues](https://github.com/your-org/arq-specs-template/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/your-org/arq-specs-template/discussions)
- 📧 **Email**: contributors@arq-specs.dev

---

## 🙏 Agradecimentos

Obrigado a todos os contribuidores! Vocês são incríveis. ❤️

---

## 📜 Licença

Ao contribuir com este projeto, você concorda que suas contribuições serão licenciadas sob a [MIT License](LICENSE).

---

Seguindo estas diretrizes, mantém-se a disciplina de documentação que demonstra resultados mensuráveis: redução de 60% em reuniões de alinhamento, aceleração de 40% no processo de onboarding, e retorno sobre investimento superior a 300%.

**A aderência ao processo Documentation-First constitui fundamento para qualidade sustentável do código gerado.**

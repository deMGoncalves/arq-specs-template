# Guia de Início Rápido

**Versão**: 3.0.0
**Tempo estimado**: 15 minutos
**Pré-requisito**: Familiaridade básica com desenvolvimento de software

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ [Claude Code](https://claude.ai/code) instalado e configurado
- ✅ [Git](https://git-scm.com/) instalado
- ✅ [Bun](https://bun.sh/) ≥ 1.1 (opcional, para validação de specs)
- ✅ Editor de código (VS Code recomendado)

---

## ⚡ Instalação Rápida

### 1. Clone o Template

```bash
# Clone o repositório
git clone https://github.com/your-org/arq-specs-template.git meu-projeto
cd meu-projeto

# Remova o histórico do template
rm -rf .git

# Inicialize seu próprio repositório
git init
git add .
git commit -m "feat: initial commit from Arq-Specs template"
```

### 2. Verifique a Estrutura

O projeto já vem configurado com:

```
meu-projeto/
├── CLAUDE.md                    # Guia para Claude Code (importante!)
├── AGENTS.md                    # Guia para Task Agents
├── .claude/                     # Configuração Claude Code
│   ├── constitution.md          # Princípios fundamentais
│   ├── commands/                # 15 comandos Arc42
│   └── skills/                  # 9 agents especializados
├── specs/                       # Documentação Arc42 (12 capítulos)
└── src/                         # Código fonte (DDD Co-Located)
```

### 3. Instale Dependências (Opcional)

Se quiser usar validação automatizada:

```bash
bun install
```

---

## 🎯 Seus Primeiros 5 Minutos

### Escolha Seu Workflow

Existem **2 workflows** principais:

#### 🚀 Opção A: Fluxo Acelerado (Tenho Documentação)

Ideal se você **já tem** um documento com requisitos (RFP, BRD, PRD, etc.):

```bash
# No Claude Code
/import [caminho/para/documento.pdf]
# Absorve o documento e preenche os 12 capítulos Arc42

/code
# Implementa código e testes baseados na spec consolidada
```

**Quando usar**: Projetos com especificação densa existente.

---

#### 🏗️ Opção B: Desenvolvimento Iterativo (Projeto Novo)

Ideal para **projetos greenfield** ou quando precisa construir specs do zero:

```bash
# 1️⃣ Defina a visão do projeto
/vision Criar plataforma de e-commerce B2B com foco em atacado

# 2️⃣ Defina a stack tecnológica
/stack Node.js 20, PostgreSQL 15, Redis, Docker, Kubernetes

# 3️⃣ Planeje containers e componentes
/plan
# Gera estrutura Arc42 cap. 5-6 (Building Blocks + Runtime)

# 4️⃣ Escreva seu primeiro cenário BDD
/feature Usuário completa checkout com pagamento e confirmação por email

# 5️⃣ Configure deployment e qualidade
/build Docker, K8s, cobertura de testes 80%, CI/CD com GitHub Actions

# 6️⃣ Implemente o código
/code
```

**Quando usar**: Projetos novos ou necessidade de checkpoints formais.

---

## 🧪 Teste Rápido: Sua Primeira Feature

Vamos criar uma feature simples para testar o workflow:

### Exemplo: Validação de Email

```bash
# No Claude Code, digite:
/feature Validar email de usuário antes do registro
```

O Claude Code vai:
1. ✅ Criar cenário BDD em `specs/06_runtime/`
2. ✅ Atualizar glossário se necessário
3. ✅ Sugerir próximos passos

Depois, implemente:

```bash
/code
```

O Claude Code vai:
1. ✅ Ler a spec BDD
2. ✅ Criar arquivo `src/user-management/api/usuario/Email.ts`
3. ✅ Criar testes em `src/user-management/api/usuario/Email.spec.ts`
4. ✅ Aplicar Object Calisthenics + SOLID
5. ✅ Seguir DDD Co-Located

---

## 📚 Comandos Essenciais

Estes são os **comandos mais usados** no dia-a-dia:

| Comando | O Que Faz | Quando Usar |
|---------|-----------|-------------|
| `/vision` | Define visão, objetivos, stakeholders | Início do projeto |
| `/stack` | Define tecnologias, constraints | Após definir visão |
| `/feature` | Cria cenário BDD (Dado-Quando-Então) | Para cada funcionalidade |
| `/code` | Implementa código das specs | Após specs prontas |
| `/adr` | Registra decisão arquitetural | Decisões importantes |
| `/stats` | Mostra saúde da documentação | Revisão periódica |

**Lista completa**: 15 comandos disponíveis em `.claude/commands/README.md`

---

## 🎓 Conceitos em 2 Minutos

### 1. **Documentation-First Approach**

❌ **Evite** documentação ambígua:
```markdown
Crie um endpoint de registro de usuário
```

✅ **Use** Documentation-First (determinística):
```markdown
POST /api/auth/register
Request: {"email": "string (max 255)", "password": "string (min 8)"}
Response 201: {"userId": "uuid", "status": "pending_verification"}
Errors: 400 INVALID_EMAIL, 409 DUPLICATE_EMAIL
```

### 2. **Arc42 (12 Capítulos)**

Framework de documentação arquitetural. **Adapta-se à complexidade**:

- **LOW**: Cap 6, 10 (mínimo)
- **MEDIUM**: Cap 3, 5, 6, 8, 9, 10
- **HIGH**: Todos os 12 capítulos

### 3. **BDD (Behavior-Driven Development)**

Formato `DADO-QUANDO-ENTÃO`:

```gherkin
Cenário: Registro de usuário com email válido
  Dado que o email "joao@example.com" não existe no sistema
  Quando o usuário submete registro com email válido
  Então o sistema cria usuário com status "pending_verification"
  E envia email de confirmação
```

### 4. **DDD Co-Located**

Organize código por **domínio**, não camadas técnicas:

```
✅ CERTO:
src/user-management/api/usuario/
  ├── index.ts              # Aggregate root
  ├── criar-usuario.ts      # Factory
  └── usuario.spec.ts       # Tests

❌ ERRADO:
src/domain/entities/Usuario.ts
src/services/UsuarioService.ts
```

---

## 🔄 Workflow Multi-Agent (Features Complexas)

Para features grandes, o Arq-Specs usa **7 fases automatizadas**:

```
User: "Add OAuth2 authentication"
    ↓
Phase 1: analyst → proposal.md (avalia complexidade)
    ↓
Phase 2: architect → design.md + ADRs (se HIGH)
    ↓
Phase 3: analyst → spec.md (Arc42 + BDD)
    ↓
Phase 3.5: orchestrator → tasks.md (50 tasks de ~100 LOC) ⚠️ CRÍTICO
    ↓
Phase 4: developer → código + testes (task-by-task)
    ↓
Phase 5: reviewer + tester → validação de qualidade
    ↓
Phase 6: documenter → docs atualizadas
    ↓
Phase 7: guardian → checklist de release
    ↓
✅ Feature completa!
```

**Por que Phase 3.5 é crítica?**

- ❌ Sem decomposição: Spec 5000 linhas → IA alucina → Código errado
- ✅ Com decomposição: 50 tasks × 100 linhas → IA determinística → Código correto

---

## 🆘 Troubleshooting

### ❓ Comandos não são reconhecidos pelo Claude Code

**Diagnóstico**: Verifique presença dos arquivos `CLAUDE.md` e `.claude/constitution.md` no diretório raiz.

**Resolução**: Execute `ls -la .claude/constitution.md CLAUDE.md` para confirmar existência dos arquivos de configuração.

### ❓ Documentação excede tamanho recomendado

**Diagnóstico**: Documentação >500 linhas por componente resulta em dispersão de atenção (complexidade O(n²) do mecanismo de atenção).

**Resolução**: O orchestrator agent realiza decomposição automática quando detecta contextos extensos. Esta decomposição é fundamental para manter qualidade de geração.

### ❓ Organização de código não segue DDD Co-Located

**Diagnóstico**: Estrutura por camadas técnicas ao invés de domínios.

**Resolução**: Consulte `.claude/constitution.md` Artigo I.7. A constituição define organização co-localizada como princípio fundamental.

### ❓ Testes não são incluídos na geração

**Diagnóstico**: Test-Driven Development não foi especificado explicitamente.

**Resolução**: Inclua requisito de testes na especificação:
```bash
/feature [funcionalidade] incluindo testes unitários e de integração
```

---

## 📖 Próximos Passos

Agora que você completou o quickstart:

1. **📘 Leia**: [HOW-IT-WORKS.md](HOW-IT-WORKS.md) - Como funciona tecnicamente
2. **🧠 Entenda**: [MANIFEST.md](MANIFEST.md) - Por que specs determinísticas funcionam (matemática + ciência)
3. **🤝 Contribua**: [CONTRIBUTING.md](CONTRIBUTING.md) - Guia de contribuição

---

## 🎯 Checklist de Sucesso

Após 1 semana usando Documentation-First Approach, você deve ter:

- ✅ Documentação Arc42 para seu projeto (pelo menos cap. 1, 3, 6)
- ✅ Pelo menos 3 cenários BDD escritos
- ✅ Código seguindo DDD Co-Located
- ✅ Cobertura de testes ≥ 80%
- ✅ Pelo menos 1 ADR documentado

---

## 💬 Suporte

Precisa de ajuda?

- 📖 [Documentação Completa](README.md)
- 🐛 [Report Issues](https://github.com/your-org/arq-specs-template/issues)
- 💬 [Discussões](https://github.com/your-org/arq-specs-template/discussions)

---

Arq-Specs aplica princípios de teoria da informação para reduzir entropia em especificações e maximizar qualidade de código gerado.

**Documentation-First Approach fundamenta-se em pesquisa científica estabelecida.**

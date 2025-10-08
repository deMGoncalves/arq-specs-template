# Nomes que Revelam Intenção e Domínio (Linguagem Ubíqua)

**ID**: ESTRUTURAL-036
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Exige que os nomes de variáveis, classes e métodos revelem explicitamente a **intenção** do desenvolvedor e usem a **Linguagem Ubíqua** definida no Glossário do Domínio (Seção 12).

## Por que importa

Nomes que não revelam a intenção (ex: `handle()`, `process()`) forçam o leitor a ler o código-fonte para entender o propósito. O uso da linguagem de domínio (DDD) fortalece a comunicação e a coesão de negócio.

## Critérios Objetivos

- [ ] Variáveis de escopo amplo devem ser **pesquisáveis**, evitando nomes de uma ou duas letras.
- [ ] Funções devem ser nomeadas em nível de abstração que corresponda ao código (ex: `checkIfUserExists` é melhor que `check` para `if (user) return true`).
- [ ] É proibido o uso de termos vagos de programação (ex: `Manager`, `Data`, `Info`) como sufixos em classes de domínio.

## Exceções Permitidas

- **Variáveis de Loop**: Variáveis de iteração únicas e de curta duração (ex: `i`, `j`).
- **Controladores de Framework**: Funções de *callback* de *framework* (ex: `handler`, `next`).

## Como Detectar

### Manual
Verificar se o leitor precisa de mais contexto além do nome para entender o propósito do elemento.

### Automático
ESLint: `no-abbreviated-names` e `naming-convention` para proibir sufixos genéricos.

## Relacionada com

- [ESTRUTURAL-026]: reforça (Comentários - Nomes claros eliminam a necessidade de comentários de "o quê")
- [ESTRUTURAL-006]: complementa
- [COMPORTAMENTAL-027]: reforça
- [COMPORTAMENTAL-038]: reforça (CQS)

---

**Criada em**: 2025-10-08
**Versão**: 1.0

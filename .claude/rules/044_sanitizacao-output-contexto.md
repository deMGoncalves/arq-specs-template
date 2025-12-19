# Sanitização de Output por Contexto

**ID**: SEGURANÇA-044
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Todo output que inclui dados não confiáveis deve ser sanitizado/escaped de acordo com o contexto de uso (HTML, JavaScript, SQL, Shell, URL) antes de ser exibido ou executado.

## Por que importa

Output não sanitizado é a principal causa de XSS (Cross-Site Scripting), responsável por 40% das vulnerabilidades web. Permite execução de JavaScript malicioso, roubo de sessões e defacement. Sanitização context-aware previne 95% desses ataques.

## Critérios Objetivos

- [ ] HTML: usar template engines com auto-escaping (React JSX, Vue, Angular) ou biblioteca de sanitização
- [ ] JavaScript: evitar inserção dinâmica de código, usar JSON.stringify para dados
- [ ] SQL: usar prepared statements ou ORM (nunca concatenação de strings)
- [ ] Shell: evitar execução de comandos, se necessário usar bibliotecas com escaping adequado
- [ ] Sanitização ocorre no ponto de output, não no ponto de input (permite armazenar dados originais)

## Exceções Permitidas

- **Rich text editors**: Conteúdo HTML rico deve usar sanitizador específico (DOMPurify) com whitelist de tags permitidas
- **Markdown**: Pode usar parser seguro que sanitiza HTML na renderização

## Como Detectar

### Manual

Revisar código que renderiza dados de usuário verificando uso de template engines com auto-escaping ou chamadas explícitas a funções de sanitização.

### Automático

SAST tools detectam concatenação de strings em contextos sensíveis. Linters podem verificar uso de dangerouslySetInnerHTML em React sem sanitização.

## Relacionada com

- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa
- [050 - Prevenção SQL Injection](050_prevencao-sql-injection.md): complementa
- [051 - Prevenção XSS](051_prevencao-xss.md): implementa
- [054 - Prevenção Command Injection](054_prevencao-command-injection.md): complementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

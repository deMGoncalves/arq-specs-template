# Prevenção de SQL Injection

**ID**: SEGURANÇA-050
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Queries de banco de dados devem usar exclusivamente prepared statements ou ORM com parameterização. Concatenação de strings com input de usuário em queries SQL é proibida.

## Por que importa

SQL Injection é vetor de ataque crítico que permite exfiltração completa de banco de dados, modificação de dados e execução de comandos no servidor. Causa 40% dos vazamentos de dados. Prepared statements previnem 100% dos ataques de SQL Injection por separar código SQL de dados.

## Critérios Objetivos

- [ ] 100% das queries usam prepared statements, parameterized queries ou ORM
- [ ] Concatenação de strings para construir SQL é proibida
- [ ] ORMs estão configurados para prevenir SQL injection (não usar raw queries)
- [ ] Stored procedures usam parâmetros typed, não dynamic SQL
- [ ] Input de usuário nunca é interpolado diretamente em queries

## Exceções Permitidas

- **Migration scripts**: Scripts de migração de schema podem usar SQL dinâmico se não processam input de usuário
- **Admin tools internos**: Ferramentas de administração com autenticação forte podem permitir SQL queries para troubleshooting

## Como Detectar

### Manual

Code review procurando por concatenação de strings em queries SQL. Procurar por uso de template literals ou string interpolation com variáveis de usuário em SQL.

### Automático

SAST tools como Semgrep detectam padrões de SQL injection. SQLMap pode testar endpoints automaticamente para vulnerabilidades SQL Injection.

## Relacionada com

- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa
- [044 - Sanitização de Output](044_sanitizacao-output-contexto.md): complementa
- [054 - Prevenção Command Injection](054_prevencao-command-injection.md): similar
- [061 - Proteção Tampering](061_protecao-tampering.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

# Validação de Input com Whitelist Positiva

**ID**: SEGURANÇA-040
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Todo input externo (API, formulários, file uploads, headers) deve ser validado usando whitelist positiva (lista de valores permitidos) com schema estruturado antes de ser processado.

## Por que importa

Input não validado é a causa raiz de 70% das vulnerabilidades críticas: SQL injection, XSS, Command injection, Path traversal. Validação com whitelist previne 90% desses ataques e reduz drasticamente a superfície de ataque.

## Critérios Objetivos

- [ ] Todo endpoint de API possui validação de input com biblioteca (Joi, Zod, class-validator)
- [ ] Validação usa whitelist (valores permitidos) não blacklist (valores proibidos)
- [ ] Validação verifica tipo, formato, tamanho e range de todos os campos
- [ ] Validação retorna 400 Bad Request com detalhes do erro sem expor internals
- [ ] Validação ocorre na camada de controller/handler antes da lógica de negócio

## Exceções Permitidas

- **Endpoints de webhook**: APIs que recebem payloads arbitrários devem validar assinatura criptográfica
- **File uploads**: Requerem validação específica de MIME type, magic bytes e tamanho

## Como Detectar

### Manual

Revisar endpoints de API e verificar se possuem `validate()` ou `schema.validate()` no início do handler. Verificar se a validação usa whitelist com valores permitidos explícitos.

### Automático

ESLint com plugins `eslint-plugin-security` e regras customizadas para detectar endpoints sem validação.

## Relacionada com

- [030 - Proibição de Funções Inseguras](030_proibicao-funcoes-inseguras.md): complementa
- [044 - Sanitização de Output](044_sanitizacao-output-contexto.md): complementa
- [050 - Prevenção SQL Injection](050_prevencao-sql-injection.md): previne
- [051 - Prevenção XSS](051_prevencao-xss.md): previne
- [054 - Prevenção Command Injection](054_prevencao-command-injection.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

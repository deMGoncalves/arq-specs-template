# OWASP Top 10 (2021) - Security Verification

**ID do Template**: TPL-SEC-003
**Versão**: 1.0.0
**Categoria**: Security
**Framework**: OWASP Top 10 (2021)
**Usado Por**: security-analyst (Fase 3: Specification / Fase 5: Testing / Fase 7: Validation)
**Última Atualização**: 2025-12-16

---

## Propósito

Este template documenta a verificação da aplicação contra as **10 vulnerabilidades web mais críticas** identificadas pela OWASP, garantindo que todas as mitigações estejam implementadas.

---

## A01:2021 – Broken Access Control

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Vulnerabilidades Comuns

| Vulnerabilidade | CWE | Verificação | Status |
|----------------|-----|-------------|--------|
| **IDOR** (Insecure Direct Object Reference) | CWE-639 | Verificar se IDs de recursos são validados por ownership | [ ] |
| **Path Traversal** | CWE-22 | Verificar se inputs de path são sanitizados | [ ] |
| **Forced Browsing** | CWE-425 | Verificar se páginas admin requerem autenticação | [ ] |
| **Missing Function Level Access Control** | CWE-285 | Verificar se todos os endpoints verificam roles | [ ] |
| **CORS Misconfiguration** | CWE-346 | Verificar se CORS não usa wildcard (*) | [ ] |
| **Metadata Exposure** | CWE-538 | Verificar se .git/, .env não são expostos | [ ] |

### Testes de Validação

```bash
# Teste IDOR: Tentar acessar recurso de outro usuário
curl -H "Authorization: Bearer <user1-token>" \
  https://api.example.com/users/user2-id

# Esperado: 403 Forbidden

# Teste Path Traversal
curl https://api.example.com/files?path=../../etc/passwd

# Esperado: 400 Bad Request (input validation)

# Teste Forced Browsing
curl https://api.example.com/admin/dashboard

# Esperado: 401 Unauthorized (redirect to login)
```

### Evidências

- **Implementação**: `src/auth/authorization.ts` (Regra 043)
- **Testes**: `tests/security/access-control.test.ts`
- **ADR**: `specs/09_decisions/adrs/ADR-XXX_rbac-model.md`

### Regras Relacionadas
- 043: Controle de Acesso (RBAC)
- 052: Prevenção CSRF
- 053: Prevenção Path Traversal

---

## A02:2021 – Cryptographic Failures

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Vulnerabilidades Comuns

| Vulnerabilidade | CWE | Verificação | Status |
|----------------|-----|-------------|--------|
| **Clear Text Transmission** | CWE-319 | TLS 1.3 em todas as conexões | [ ] |
| **Weak Crypto** | CWE-327 | AES-256, RSA-2048+, SHA-256+ | [ ] |
| **Hardcoded Secrets** | CWE-798 | Secrets em AWS Secrets Manager/Vault | [ ] |
| **Weak Password Hashing** | CWE-916 | Argon2id, scrypt ou bcrypt (work factor adequado) | [ ] |
| **Insecure Random** | CWE-338 | Usar CSPRNG (crypto.randomBytes) | [ ] |

### Testes de Validação

```bash
# Teste TLS: Verificar se apenas TLS 1.2+ permitido
nmap --script ssl-enum-ciphers -p 443 example.com

# Teste Secrets: Buscar segredos hardcoded
trufflehog git file://. --regex --entropy=True

# Teste Password Hashing: Verificar algoritmo
# (revisar código src/auth/password-hashing.ts)
```

### Evidências

- **Implementação**: `src/crypto/encryption.ts` (Regra 045)
- **Configuração**: `nginx.conf` (TLS 1.3, cipher suites)
- **Password Hashing**: Argon2id (work factor 4, memory 65536 KB)

### Regras Relacionadas
- 045: Criptografia de Dados
- 048: Comunicação Segura

---

## A03:2021 – Injection

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Vulnerabilidades Comuns

| Vulnerabilidade | CWE | Verificação | Status |
|----------------|-----|-------------|--------|
| **SQL Injection** | CWE-89 | Usar prepared statements ou ORM | [ ] |
| **NoSQL Injection** | CWE-943 | Validar input antes de queries Mongo | [ ] |
| **Command Injection** | CWE-78 | Evitar shell commands, usar APIs nativas | [ ] |
| **LDAP Injection** | CWE-90 | Escapar caracteres especiais LDAP | [ ] |
| **XPath Injection** | CWE-643 | Usar queries parametrizadas | [ ] |
| **Template Injection** | CWE-1336 | Sanitizar input antes de renderizar templates | [ ] |
| **Cross-Site Scripting (XSS)** | CWE-79 | Escapar output, CSP | [ ] |

### Testes de Validação

```bash
# SQL Injection Test
curl -X POST https://api.example.com/login \
  -d "email=admin'--&password=any"

# Esperado: 400 Bad Request (validation error)

# XSS Test
curl https://api.example.com/search?q=<script>alert(1)</script>

# Esperado: Output escapado como &lt;script&gt;
```

### Evidências

- **SQL**: Prisma ORM (prepared statements automáticos)
- **XSS**: DOMPurify + CSP (Regra 051, 044)
- **Command Injection**: Proibido via Regra 054

### Regras Relacionadas
- 040: Validação de Input
- 044: Sanitização de Output
- 050: Prevenção SQL Injection
- 051: Prevenção XSS
- 054: Prevenção Command Injection

---

## A04:2021 – Insecure Design

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Princípios de Design Seguro

| Princípio | Verificação | Status |
|-----------|-------------|--------|
| **Threat Modeling** | STRIDE analysis completo | [ ] |
| **Secure by Default** | Defaults seguros (ex: deny-by-default) | [ ] |
| **Defense in Depth** | Múltiplas camadas de defesa | [ ] |
| **Least Privilege** | Contas com menor privilégio necessário | [ ] |
| **Separation of Duties** | Admin != Operador | [ ] |
| **Fail Securely** | Erros não expõem info sensível | [ ] |

### Evidências

- **Threat Model**: `specs/08_crosscutting/security/stride-threat-model.md`
- **ADRs**: `specs/09_decisions/adrs/` (decisões de segurança documentadas)

### Regras Relacionadas
- Todas as 64 regras contribuem para design seguro

---

## A05:2021 – Security Misconfiguration

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Configurações a Verificar

| Categoria | Verificação | Status |
|-----------|-------------|--------|
| **Hardening** | Remover features desnecessárias (debug, samples) | [ ] |
| **Security Headers** | CSP, HSTS, X-Frame-Options, etc | [ ] |
| **Error Handling** | Mensagens genéricas em produção | [ ] |
| **Default Credentials** | Sem credenciais padrão (admin/admin) | [ ] |
| **Directory Listing** | Desabilitado | [ ] |
| **Verbose Errors** | Stack traces apenas em dev | [ ] |
| **Dependency Scanning** | npm audit, Snyk, Dependabot | [ ] |

### Testes de Validação

```bash
# Security Headers Check
curl -I https://example.com | grep -E "(X-Frame|Content-Security|Strict-Transport)"

# Dependency Vulnerabilities
npm audit
```

### Evidências

- **Headers**: `middleware/security-headers.ts` (Regra 049)
- **CI/CD**: `.github/workflows/security.yml` (npm audit, Snyk)

### Regras Relacionadas
- 046: Tratamento de Erros Seguro
- 049: Configuração Segura
- 058: Gerenciamento de Dependências

---

## A06:2021 – Vulnerable and Outdated Components

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Verificações

| Item | Ferramenta | Frequência | Status |
|------|-----------|-----------|--------|
| **Dependências npm** | `npm audit` | A cada commit (CI) | [ ] |
| **Dependências Docker** | Snyk Container | Semanal | [ ] |
| **CVE Database** | NIST NVD, GitHub Advisory | Diário | [ ] |
| **SBOM** | Software Bill of Materials | A cada release | [ ] |

### Evidências

- **Lock Files**: `package-lock.json`, `Cargo.lock` (versionamento preciso)
- **Dependabot**: Ativo (auto-updates semanais)
- **Regra 058**: Gerenciamento Seguro de Dependências

---

## A07:2021 – Identification and Authentication Failures

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Verificações (overlap com ASVS V2)

| Item | Verificação | Status |
|------|-------------|--------|
| **Password Policy** | Min 12 chars, sem expiração forçada | [ ] |
| **MFA** | Disponível para contas sensíveis | [ ] |
| **Credential Stuffing** | Rate limiting + senhas comprometidas bloqueadas | [ ] |
| **Session Management** | Timeout, logout, regenerate session | [ ] |

### Evidências

- Ver **OWASP ASVS V2** (template owasp-asvs.md)
- **Regra 041**: Autenticação Segura
- **Regra 042**: Gerenciamento de Sessão

---

## A08:2021 – Software and Data Integrity Failures

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Verificações

| Item | Verificação | Status |
|------|-------------|--------|
| **CI/CD Security** | Pipeline assina artifacts | [ ] |
| **Deserialization** | Validar antes de desserializar | [ ] |
| **Auto-update** | Assinatura digital verificada | [ ] |
| **SRI** | Subresource Integrity para CDN | [ ] |

### Evidências

- **Regra 056**: Prevenção Desserialização Insegura
- **CSP**: `script-src 'self'` (sem unsafe-inline)

---

## A09:2021 – Security Logging and Monitoring Failures

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Verificações (overlap com ASVS V7)

| Item | Verificação | Status |
|------|-------------|--------|
| **Audit Trail** | Login, logout, tentativas falhas | [ ] |
| **Alertas** | SNS/PagerDuty para eventos críticos | [ ] |
| **Log Retention** | 90+ dias | [ ] |
| **No PII in Logs** | Sanitização automática | [ ] |

### Evidências

- Ver **OWASP ASVS V7** (template owasp-asvs.md)
- **Regra 059**: Logging Seguro

---

## A10:2021 – Server-Side Request Forgery (SSRF)

### Status
- [ ] ✅ Completo
- [ ] ⚠️ Parcial
- [ ] ❌ Não Iniciado

### Verificações

| Item | Verificação | Status |
|------|-------------|--------|
| **URL Whitelist** | Apenas domínios permitidos | [ ] |
| **Internal IP Block** | Bloquear 127.0.0.1, 169.254.169.254, 10.0.0.0/8 | [ ] |
| **URL Parsing** | Validar schema (http/https apenas) | [ ] |
| **Redirect Validation** | Não seguir redirects automáticos | [ ] |

### Testes de Validação

```bash
# SSRF Test: Tentar acessar metadata AWS
curl -X POST https://api.example.com/fetch \
  -d "url=http://169.254.169.254/latest/meta-data/"

# Esperado: 400 Bad Request (URL blocked)
```

### Evidências

- **Regra 057**: Prevenção SSRF
- **Implementação**: `src/http/url-validator.ts`

---

## Resumo de Conformidade

| Categoria | Status | Risco Residual |
|-----------|--------|---------------|
| A01 - Broken Access Control | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A02 - Cryptographic Failures | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A03 - Injection | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A04 - Insecure Design | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A05 - Security Misconfiguration | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A06 - Vulnerable Components | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A07 - Auth Failures | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A08 - Integrity Failures | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A09 - Logging Failures | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |
| A10 - SSRF | [ ] | [ ] Baixo / [ ] Médio / [ ] Alto |

**Conformidade Geral**: [ ] % (X/10 completos)

---

## Ferramentas de Teste

### DAST (Dynamic Application Security Testing)
- OWASP ZAP
- Burp Suite
- Nikto

### SAST (Static Application Security Testing)
- SonarQube (Security rules)
- Semgrep
- Checkmarx

### Dependency Scanning
- npm audit
- Snyk
- Dependabot

### Penetration Testing
- Manual testing (ética hacker)
- Bug Bounty program

---

## Referências

- **OWASP Top 10 (2021)**: https://owasp.org/Top10/
- **CWE Top 25**: https://cwe.mitre.org/top25/
- **Regras**: 040-059, 063 em `.claude/rules/`
- **Output**: `specs/10_quality/security-requirements.md`

---

**Anterior**: [STRIDE](stride-analysis.md) | **Próximo**: [CWE Top 25](cwe-top25.md)

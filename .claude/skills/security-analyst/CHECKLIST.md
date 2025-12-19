# Security Analyst - Validation Checklist

**Version**: 1.0.0
**Purpose**: Checklist sistemático para validação de segurança em todas as fases

---

## Phase 2: Architecture - Threat Modeling

### Preparation
- [ ] Design arquitetural completo (componentes, fluxos de dados)
- [ ] Diagrama C4 L1 (System Context) disponível
- [ ] Trust boundaries identificados

### STRIDE Analysis
- [ ] **Spoofing**: Ameaças de falsificação identificadas e mitigadas
- [ ] **Tampering**: Ameaças de adulteração identificadas e mitigadas
- [ ] **Repudiation**: Ameaças de negação identificadas e mitigadas
- [ ] **Information Disclosure**: Ameaças de divulgação identificadas e mitigadas
- [ ] **Denial of Service**: Ameaças de DoS identificadas e mitigadas
- [ ] **Elevation of Privilege**: Ameaças de elevação identificadas e mitigadas

### Documentation
- [ ] `specs/08_crosscutting/security/stride-threat-model.md` criado
- [ ] Top 10 ameaças priorizadas por risco
- [ ] ADRs de segurança criados para decisões críticas
- [ ] Mitigações documentadas com status (mitigado/parcial/pendente)

---

## Phase 3: Specification - Security Requirements

### OWASP ASVS 4.0 (14 Domínios)

#### V1. Arquitetura, Design e Modelagem de Ameaças
- [ ] V1.1: Componentes identificados, versões conhecidas
- [ ] V1.2: Threat modeling completo (STRIDE)
- [ ] V1.4: Controles de segurança documentados

#### V2. Autenticação
- [ ] V2.1: Senhas (min 12 chars, Argon2id/scrypt/bcrypt)
- [ ] V2.2: MFA disponível para funções sensíveis
- [ ] V2.3: Password hashing resistente (Argon2id work factor 4+)
- [ ] V2.4: Recuperação segura (tokens únicos, <1h TTL)
- [ ] V2.7: Rate limiting (5 tentativas/15 min)

#### V3. Gerenciamento de Sessão
- [ ] V3.1: Timeout de inatividade (15 min para apps sensíveis)
- [ ] V3.2: Nova sessão após login (previne session fixation)
- [ ] V3.3: Logout invalida sessão no servidor
- [ ] V3.4: Cookies com Secure, HttpOnly, SameSite

#### V4. Controle de Acesso
- [ ] V4.1: RBAC ou ABAC implementado, deny-by-default
- [ ] V4.2: Proteção contra IDOR (verificar ownership)
- [ ] V4.3: Least privilege aplicado

#### V5. Validação, Sanitização e Codificação
- [ ] V5.1: Input validation com whitelist (Joi/Zod)
- [ ] V5.2: Output sanitizado conforme contexto
- [ ] V5.3: Prepared statements ou ORM (sem SQL injection)

#### V6. Criptografia
- [ ] V6.1: Dados sensíveis criptografados (AES-256-GCM)
- [ ] V6.2: Algoritmos aprovados (AES, RSA-2048+, SHA-256+)
- [ ] V6.3: CSPRNG para IVs/salts
- [ ] V6.4: Chaves em Secrets Manager (não hardcoded)

#### V7. Tratamento de Erros e Logging
- [ ] V7.1: Erros genéricos em produção (sem stack traces)
- [ ] V7.2: Eventos de auth/authz logados
- [ ] V7.3: Logs protegidos (append-only, retenção 90+ dias)
- [ ] V7.4: Logs sem dados sensíveis

#### V8. Proteção de Dados
- [ ] V8.1: PII criptografado em repouso e em trânsito
- [ ] V8.2: Consentimento GDPR/LGPD
- [ ] V8.3: PII mascarado em logs/UI

#### V9. Comunicação
- [ ] V9.1: TLS 1.3 (ou 1.2+), HSTS habilitado
- [ ] V9.2: mTLS para comunicação entre serviços

#### V10. Código Malicioso
- [ ] V10.1: Dependency scanning (npm audit, Snyk)
- [ ] V10.2: SRI para CDN
- [ ] V10.3: CSP configurado

#### V11. Lógica de Negócio
- [ ] V11.1: Limites de transação, proteção race condition

#### V12. Arquivos e Recursos
- [ ] V12.1: Upload validation (MIME, magic bytes, tamanho)
- [ ] V12.2: Arquivos escaneados (antivírus)
- [ ] V12.3: Proteção path traversal
- [ ] V12.4: SSRF prevention (URL whitelist)

#### V13. APIs e Web Services
- [ ] V13.1: Rate limiting, CORS configurado
- [ ] V13.2: Content-Type validation

#### V14. Configuração
- [ ] V14.1: Hardening (remover debug, samples)
- [ ] V14.2: Dependências atualizadas
- [ ] V14.4: Security headers (CSP, HSTS, X-Frame-Options)

**Total ASVS**: ___/14 domínios completos

### OWASP Top 10 (2021)
- [ ] A01: Broken Access Control - RBAC, IDOR prevention
- [ ] A02: Cryptographic Failures - TLS 1.3, AES-256, senhas hasheadas
- [ ] A03: Injection - Prepared statements, input validation, output encoding
- [ ] A04: Insecure Design - Threat model, secure-by-default
- [ ] A05: Security Misconfiguration - Security headers, hardening
- [ ] A06: Vulnerable Components - npm audit, Dependabot
- [ ] A07: Auth Failures - MFA, rate limiting, password policy
- [ ] A08: Integrity Failures - JWT assinado, SRI, checksum
- [ ] A09: Logging Failures - Structured logs, no PII, audit trail
- [ ] A10: SSRF - URL whitelist, IP blocking

**Total Top 10**: ___/10 categorias cobertas

### CWE Top 25
- [ ] CWE-79: XSS - DOMPurify, CSP, output escaping
- [ ] CWE-89: SQL Injection - Prepared statements, ORM
- [ ] CWE-20: Input Validation - Joi/Zod, whitelist
- [ ] CWE-78: Command Injection - execFile com array, validação
- [ ] CWE-352: CSRF - Tokens, SameSite cookies
- [ ] CWE-434: File Upload - Type/size validation, rename, scan
- [ ] CWE-798: Hardcoded Credentials - Secrets Manager
- [ ] CWE-862: Missing Authorization - RBAC em todos os endpoints
- [ ] CWE-639: IDOR - Ownership verification
- [ ] CWE-22: Path Traversal - Path normalization, validation

**Total CWE**: ___/25 vulnerabilidades mitigadas

### NIST SSDF v1.1
- [ ] **PO.1**: Security requirements identificados
- [ ] **PO.2**: Roles de segurança definidos, training realizado
- [ ] **PO.3**: SAST/DAST/SCA integrados
- [ ] **PS.1**: Código em repo privado, commits assinados
- [ ] **PS.2**: Checksums, digital signatures
- [ ] **PW.1**: Design seguro, threat model
- [ ] **PW.5**: Código segue rules 040-064
- [ ] **PW.7**: Code review obrigatório, SAST automatizado
- [ ] **PW.8**: Security unit tests, DAST, pentest
- [ ] **RV.1**: Monitoring CVE, Dependabot
- [ ] **RV.2**: Post-mortems, lessons learned

**Total NIST**: ___/20 práticas implementadas

### Documentation
- [ ] `specs/08_crosscutting/security/asvs-analysis.md` completo
- [ ] `specs/10_quality/security-requirements.md` completo
- [ ] `specs/11_risks/vulnerability-analysis.md` completo
- [ ] `specs/08_crosscutting/sdlc-security.md` completo

---

## Phase 5: Testing - Security Validation

### Rules Compliance (040-064)

#### OWASP ASVS Group (040-049)
- [ ] **040**: Input validation em TODOS os endpoints (Joi/Zod)
- [ ] **041**: Argon2id/scrypt/bcrypt (work factor adequado)
- [ ] **042**: Cookies Secure, HttpOnly, SameSite; timeout; nova sessão após login
- [ ] **043**: RBAC implementado, IDOR prevention, deny-by-default
- [ ] **044**: Output escapado (DOMPurify), CSP configurado
- [ ] **045**: AES-256-GCM, chaves em Secrets Manager, IVs aleatórios
- [ ] **046**: Erros genéricos em prod, logs detalhados no servidor
- [ ] **047**: PII criptografado, mascarado em logs, GDPR compliant
- [ ] **048**: TLS 1.3, HSTS, certificado válido, cipher suites fortes
- [ ] **049**: Security headers (CSP, X-Frame-Options, HSTS, etc)

#### OWASP Top 10 & CWE Group (050-059)
- [ ] **050**: Prepared statements ou ORM (sem SQL injection)
- [ ] **051**: DOMPurify, CSP, templates escapam (sem XSS)
- [ ] **052**: CSRF tokens, SameSite cookies, Origin validation
- [ ] **053**: Path normalization, whitelist dirs, sem ../
- [ ] **054**: execFile com array (sem command injection)
- [ ] **055**: XXE desabilitado, validar XML contra XSD
- [ ] **056**: JSON (sem desserialização insegura), validar schema
- [ ] **057**: URL whitelist, bloquear IPs privados (sem SSRF)
- [ ] **058**: npm audit passa, Dependabot ativo, SBOM gerado
- [ ] **059**: Logs sem senhas/tokens, PII mascarado, structured logging

#### STRIDE Group (060-064)
- [ ] **060**: MFA, rate limiting, senhas comprometidas bloqueadas
- [ ] **061**: TLS 1.3, JWT assinado, HMAC webhooks
- [ ] **062**: Audit trail (userId, IP, timestamp), logs append-only
- [ ] **063**: Mensagens genéricas, timing-safe comparisons, TLS
- [ ] **064**: Rate limiting, request size limits, timeout, ReDoS-safe regex

**Total Rules**: ___/25 regras conformes

### Automated Testing

#### SAST (Static Application Security Testing)
- [ ] ESLint security plugin rodado
- [ ] SonarQube security scan PASSED
- [ ] Semgrep rules executed
- [ ] Zero critical/high vulnerabilities

```bash
npm run lint:security
npm audit --audit-level=high
npx semgrep --config=auto src/
```

#### DAST (Dynamic Application Security Testing)
- [ ] OWASP ZAP baseline scan executado
- [ ] Burp Suite scan (se disponível)
- [ ] Zero high-risk findings

```bash
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://app.local
```

#### SCA (Software Composition Analysis)
- [ ] npm audit PASSED (0 vulnerabilities)
- [ ] Snyk scan PASSED
- [ ] Dependências atualizadas

```bash
npm audit
snyk test
```

#### Secrets Scanning
- [ ] TruffleHog scan PASSED (sem secrets expostos)
- [ ] GitGuardian check OK

```bash
trufflehog git file://. --regex --entropy=True
```

### Manual Testing

#### Security Test Cases
- [ ] SQL Injection tests (parameterized queries)
- [ ] XSS tests (output escaping)
- [ ] CSRF tests (tokens validados)
- [ ] IDOR tests (ownership verificado)
- [ ] Path Traversal tests (input validation)
- [ ] Authentication tests (rate limiting funciona)
- [ ] Authorization tests (RBAC aplicado)

#### Penetration Testing
- [ ] Pentest interno executado (se aplicável)
- [ ] Bug bounty program ativo (se aplicável)
- [ ] Third-party pentest (anual)

---

## Phase 7: Validation - Security Audit

### Pre-Release Checklist

#### Documentation Completeness
- [ ] STRIDE threat model completo
- [ ] OWASP ASVS checklist 100% preenchido
- [ ] OWASP Top 10 validado
- [ ] CWE Top 25 analisado
- [ ] NIST SSDF práticas implementadas

#### Security Testing Results
- [ ] SAST: Zero critical/high issues
- [ ] DAST: Zero high-risk findings
- [ ] SCA: Zero vulnerabilities críticas
- [ ] Secrets scanning: Clean
- [ ] Penetration testing: Aprovado

#### Configuration Validation
- [ ] Security headers verificados (securityheaders.com)
- [ ] TLS/SSL A+ rating (ssllabs.com)
- [ ] CORS configurado corretamente (não wildcard)
- [ ] CSP sem unsafe-inline/unsafe-eval
- [ ] Secrets em Secrets Manager (não .env)

#### Runtime Validation
- [ ] Rate limiting funciona (teste com 10 requests rápidos)
- [ ] MFA funciona (se habilitado)
- [ ] Logout invalida sessão
- [ ] Erros não expõem stack traces
- [ ] Logs não contêm senhas/tokens

#### Compliance
- [ ] GDPR: Direitos do titular implementados (acesso, exclusão)
- [ ] PCI-DSS: Se aplicável (dados de pagamento)
- [ ] HIPAA: Se aplicável (dados de saúde)
- [ ] SOC 2: Se aplicável (controles de segurança)

### Final Sign-Off

- [ ] **Security Analyst Sign-Off**: ✅ APROVADO / ❌ BLOQUEADO
- [ ] **Guardian Validation**: Pre-commit checks PASSED
- [ ] **Penetration Tester Sign-Off**: Aprovado (se aplicável)

### Release Criteria

**Bloqueantes (MUST FIX antes de release)**:
- [ ] Zero vulnerabilidades críticas (CVSS ≥9.0)
- [ ] Zero high vulnerabilidades não mitigadas (CVSS 7.0-8.9)
- [ ] Todas as 25 rules de segurança (040-064) conformes
- [ ] SAST/DAST/SCA clean

**Recomendações (FIX em próximo release)**:
- [ ] Medium vulnerabilities documentadas
- [ ] Low vulnerabilities aceitáveis (com justificativa)

---

## Metrics & KPIs

### Security Posture Score

| Métrica | Alvo | Atual | Status |
|---------|------|-------|--------|
| **OWASP ASVS Compliance** | 100% | ___% | [ ] |
| **OWASP Top 10 Coverage** | 10/10 | ___/10 | [ ] |
| **CWE Top 25 Mitigated** | 25/25 | ___/25 | [ ] |
| **NIST SSDF Practices** | 20/20 | ___/20 | [ ] |
| **Security Rules (040-064)** | 25/25 | ___/25 | [ ] |
| **SAST Findings** | 0 critical/high | ___ | [ ] |
| **DAST Findings** | 0 high risk | ___ | [ ] |
| **Dependency Vulnerabilities** | 0 critical | ___ | [ ] |
| **SSL Labs Rating** | A+ | ___ | [ ] |
| **Security Headers Score** | A | ___ | [ ] |

### Time to Remediate

| Severidade | SLA | Atual | Status |
|------------|-----|-------|--------|
| Critical | 7 dias | ___ | [ ] |
| High | 30 dias | ___ | [ ] |
| Medium | 90 dias | ___ | [ ] |
| Low | Próximo release | ___ | [ ] |

---

## Notes

- Use este checklist para CADA feature/release
- Documente exceções com justificativa
- Mantenha audit trail de todas as aprovações
- Re-execute após mudanças significativas

---

**Version**: 1.0.0
**Last Updated**: 2025-12-16

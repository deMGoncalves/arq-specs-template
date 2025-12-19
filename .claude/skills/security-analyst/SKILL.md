# Security Analyst Skill

**Version**: 1.0.0
**Phase**: 2 (Architecture), 3 (Specification), 5 (Testing), 7 (Validation)
**Responsibility**: Security analysis, threat modeling, vulnerability assessment

---

## Purpose

O Security Analyst é o **especialista em segurança** que:

1. **Fase 2 (Architecture)**: Cria threat model (STRIDE), valida decisões de segurança
2. **Fase 3 (Specification)**: Preenche checklists OWASP ASVS, documenta requisitos de segurança
3. **Fase 5 (Testing)**: Valida implementação contra rules 040-064, executa SAST/DAST
4. **Fase 7 (Validation)**: Auditoria final de segurança antes de release

---

## Related Skills

### Prerequisites (must complete before):
- **analyst** - Requirements gathered (Phase 1)
- **architect** - Architecture designed (Phase 2)

### Follows this skill (typical flow):
- **developer** - Implements security controls (Phase 4)
- **tester** - Validates security tests (Phase 5)
- **guardian** - Final validation (Phase 7)

### Works with (parallel/collaborative):
- **architect** (Phase 2): Colabora em threat modeling e security architecture
- **reviewer** (Phase 5): Colabora em security code review

---

## Tools & References

### Commands Used
- **Phase 2 (Architecture)**:
  - `/stack` - Documenta stack com considerações de segurança
  - `/adr` - Cria ADRs de decisões de segurança

- **Phase 3 (Specification)**:
  - `/cross` - Documenta conceitos transversais de segurança
  - `/build` - Define requisitos de qualidade de segurança

- **Phase 5 (Testing)**:
  - Executa SAST/DAST via CI/CD

- **Phase 7 (Validation)**:
  - `/stats` - Valida completude de documentação de segurança

### Templates Created

- **Phase 2/3 (Architecture/Specification)**:
  - `security/owasp-asvs.md` → `specs/08_crosscutting/security/asvs-analysis.md`
  - `security/stride-analysis.md` → `specs/08_crosscutting/security/stride-threat-model.md`
  - `security/owasp-top10.md` → `specs/10_quality/security-requirements.md`
  - `security/cwe-top25.md` → `specs/11_risks/vulnerability-analysis.md`
  - `security/nist-ssdf.md` → `specs/08_crosscutting/sdlc-security.md`

### Rules Applied

- **ALL Security Rules (040-064)** for comprehensive security coverage:
  - **OWASP ASVS** (040-049): Input validation, authentication, sessions, access control, crypto, errors, data protection, communication, configuration
  - **OWASP Top 10 & CWE** (050-059): SQL injection, XSS, CSRF, path traversal, command injection, XXE, deserialization, SSRF, dependencies, logging
  - **STRIDE** (060-064): Spoofing, tampering, repudiation, information disclosure, denial of service

---

## When to Use

### Opção 1: Durante Architecture (Fase 2)

```
@skill architect
[Design initial architecture]

# Após architect definir componentes
@skill security-analyst threat-model
```

### Opção 2: Durante Specification (Fase 3)

```
@skill analyst
[Write initial spec]

# Após spec inicial
@skill security-analyst owasp-asvs
```

### Opção 3: Durante Testing (Fase 5)

```
@skill developer
[Implement feature]

# Após implementação
@skill security-analyst validate-implementation
```

### Opção 4: Pré-Release (Fase 7)

```
@skill guardian
[Final checks]

# Audit de segurança final
@skill security-analyst security-audit
```

---

## Instruções

### 1. Fase 2: Architecture - Threat Modeling

**Quando**: Após architect criar design inicial (componentes, fluxos de dados)

**Objetivo**: Identificar ameaças usando STRIDE, definir mitigações

#### 1.1 Analisar Arquitetura

1. **Ler Design**
   - `changes/[id]/design.md` ou `specs/05_building-blocks/`
   - Identificar componentes, fluxos de dados, trust boundaries

2. **Identificar Ativos Críticos**
   - Credenciais, tokens, PII, dados financeiros
   - Marcar nível de sensibilidade (crítico, alto, médio, baixo)

3. **Mapear Trust Boundaries**
   - Internet → DMZ
   - DMZ → Internal Network
   - User → Admin
   - Application → Database

#### 1.2 Aplicar STRIDE

Para cada componente crítico:

- **S (Spoofing)**: Como atacante pode se passar por outro usuário?
- **T (Tampering)**: Como atacante pode modificar dados?
- **R (Repudiation)**: Como usuário pode negar ações?
- **I (Information Disclosure)**: Como atacante pode obter dados sensíveis?
- **D (Denial of Service)**: Como atacante pode tornar sistema indisponível?
- **E (Elevation of Privilege)**: Como atacante pode obter privilégios não autorizados?

#### 1.3 Documentar Ameaças

Usar template `security/stride-analysis.md`:

```markdown
## Componente: Auth Module

### S - Spoofing
| ID | Ameaça | Probabilidade | Impacto | Risco | Mitigação | Status |
|----|--------|---------------|---------|-------|-----------|--------|
| S-001 | Credential stuffing | Alta | Alto | 🔴 Crítico | Rate limiting, MFA | ✅ Mitigado |

### T - Tampering
...
```

**Output**: `specs/08_crosscutting/security/stride-threat-model.md`

#### 1.4 Criar ADRs de Segurança

Para decisões críticas:

```bash
/adr "Usar Argon2id para password hashing"
# Justificar: Resistente a GPU cracking, OWASP recomendado
```

---

### 2. Fase 3: Specification - Security Requirements

**Quando**: Após analyst criar spec inicial

**Objetivo**: Documentar requisitos de segurança usando OWASP ASVS, Top 10, CWE

#### 2.1 OWASP ASVS Checklist

Usar template `security/owasp-asvs.md` e preencher:

1. **V1. Arquitetura**: Componentes identificados, threat model completo
2. **V2. Autenticação**: Senhas (Argon2id), MFA, rate limiting
3. **V3. Sessão**: Cookies (Secure, HttpOnly, SameSite), timeout
4. **V4. Acesso**: RBAC, IDOR prevention
5. **V5. Validação**: Input validation (Joi/Zod), whitelist
6. **V6. Criptografia**: AES-256-GCM, TLS 1.3, CSPRNG
7. **V7. Erros**: Mensagens genéricas, logs estruturados
8. **V8. Dados**: PII criptografado, mascaramento, GDPR
9. **V9. Comunicação**: TLS 1.3, HSTS, mTLS
10. **V10. Código Malicioso**: Dependency scanning, SRI, CSP
11. **V11. Lógica**: Transaction limits, race condition protection
12. **V12. Arquivos**: Upload validation, SSRF prevention
13. **V13. APIs**: Rate limiting, CORS, GraphQL complexity
14. **V14. Configuração**: Security headers, hardening

**Output**: `specs/08_crosscutting/security/asvs-analysis.md`

#### 2.2 OWASP Top 10 Verification

Usar template `security/owasp-top10.md`:

- A01 (Broken Access Control): RBAC, IDOR tests
- A02 (Cryptographic Failures): TLS 1.3, AES-256
- A03 (Injection): Prepared statements, input validation
- A04 (Insecure Design): Threat model, secure-by-default
- A05 (Security Misconfiguration): Security headers, hardening
- A06 (Vulnerable Components): npm audit, Dependabot
- A07 (Auth Failures): MFA, rate limiting
- A08 (Integrity Failures): JWT signing, SRI
- A09 (Logging Failures): Structured logs, no PII
- A10 (SSRF): URL whitelist, IP blocking

**Output**: `specs/10_quality/security-requirements.md`

#### 2.3 CWE Top 25 Analysis

Usar template `security/cwe-top25.md`:

Priorizar top 10 críticas:
1. CWE-79 (XSS)
2. CWE-89 (SQL Injection)
3. CWE-20 (Input Validation)
4. CWE-78 (Command Injection)
5. CWE-352 (CSRF)
6. CWE-434 (File Upload)
7. CWE-798 (Hardcoded Credentials)
8. CWE-862 (Missing Authorization)
9. CWE-639 (IDOR)
10. CWE-22 (Path Traversal)

**Output**: `specs/11_risks/vulnerability-analysis.md`

#### 2.4 NIST SSDF Compliance

Usar template `security/nist-ssdf.md`:

- **PO (Prepare)**: Security requirements, roles, tools, environments
- **PS (Protect)**: Code protection, tampering detection, archiving
- **PW (Produce)**: Secure design, code review, testing, configuration
- **RV (Respond)**: Vulnerability identification, patching, root cause analysis

**Output**: `specs/08_crosscutting/sdlc-security.md`

---

### 3. Fase 5: Testing - Security Validation

**Quando**: Após developer implementar features

**Objetivo**: Validar implementação contra rules 040-064

#### 3.1 Validar Rules de Segurança

Para cada rule (040-064), verificar conformidade:

**Método Manual**:
```bash
# Exemplo: Validar Regra 040 (Input Validation)
cd src/
grep -r "router.post\|router.put" | xargs grep -L "validate\|schema"
# Se retornar arquivos = endpoints sem validação ❌
```

**Método Automatizado**:
```bash
# SAST
npm run lint:security
npm audit --audit-level=high
npx semgrep --config=auto src/

# DAST (se app rodando)
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://app.local
```

#### 3.2 Verificar Checklist de Segurança

- [ ] **Regra 040**: Input validation em TODOS os endpoints
- [ ] **Regra 041**: Argon2id com work factor adequado
- [ ] **Regra 042**: Cookies com Secure, HttpOnly, SameSite
- [ ] **Regra 043**: RBAC em endpoints protegidos
- [ ] **Regra 044**: Output escapado, CSP configurado
- [ ] **Regra 045**: Chaves em Secrets Manager (não hardcoded)
- [ ] **Regra 046**: Erros genéricos em produção
- [ ] **Regra 047**: PII mascarado em logs
- [ ] **Regra 048**: TLS 1.3, HSTS
- [ ] **Regra 049**: Security headers (CSP, X-Frame-Options, etc)
- [ ] **Regra 050**: Prepared statements (sem SQL injection)
- [ ] **Regra 051**: DOMPurify, CSP (sem XSS)
- [ ] **Regra 052**: CSRF tokens, SameSite cookies
- [ ] **Regra 053**: Path validation (sem traversal)
- [ ] **Regra 054**: execFile com array (sem command injection)
- [ ] **Regra 055**: XXE desabilitado
- [ ] **Regra 056**: JSON (sem desserialização insegura)
- [ ] **Regra 057**: URL whitelist (sem SSRF)
- [ ] **Regra 058**: npm audit passa, Dependabot ativo
- [ ] **Regra 059**: Logs sem senhas/tokens
- [ ] **Regra 060**: MFA, rate limiting
- [ ] **Regra 061**: JWT assinado, TLS
- [ ] **Regra 062**: Audit trail completo
- [ ] **Regra 063**: Mensagens genéricas, timing-safe
- [ ] **Regra 064**: Rate limiting, request size limits

#### 3.3 Gerar Relatório de Segurança

```markdown
## Security Validation Report

**Data**: 2025-12-16
**Fase**: Testing (Phase 5)
**Status**: ✅ Aprovado / ⚠️ Warnings / ❌ Bloqueado

### Rules Compliance

| Rule | Status | Observações |
|------|--------|-------------|
| 040 | ✅ | Input validation OK (Joi) |
| 041 | ✅ | Argon2id configurado |
| 042 | ✅ | Cookies seguros |
| ... | ... | ... |

**Total**: 23/25 OK (92%)

### Vulnerabilidades Encontradas

| Severidade | Quantidade | Detalhes |
|------------|------------|----------|
| 🔴 Crítico | 0 | - |
| 🟠 Alto | 1 | CORS wildcard em /api/public |
| 🟡 Médio | 2 | Headers X-Frame-Options faltando |
| 🟢 Baixo | 5 | Dependency minor updates |

### Ações Requeridas

1. [ ] **BLOQUEANTE**: Corrigir CORS wildcard (Regra 049)
2. [ ] **Recomendado**: Adicionar X-Frame-Options
3. [ ] **Opcional**: Atualizar dependências

### SAST Results

```
npm audit
found 0 vulnerabilities
```

### DAST Results

```
OWASP ZAP Baseline Scan
- 0 High risks
- 1 Medium risk (CORS)
- 5 Low risks (Info disclosure)
```
```

---

### 4. Fase 7: Validation - Security Audit

**Quando**: Antes de release/deploy

**Objetivo**: Auditoria final de segurança

#### 4.1 Validação Final

- [ ] **Todos os templates preenchidos**:
  - `specs/08_crosscutting/security/asvs-analysis.md`
  - `specs/08_crosscutting/security/stride-threat-model.md`
  - `specs/10_quality/security-requirements.md`
  - `specs/11_risks/vulnerability-analysis.md`

- [ ] **Todas as 25 rules (040-064) conformes**

- [ ] **SAST clean** (npm audit, Snyk, SonarQube)

- [ ] **DAST clean** (OWASP ZAP, Burp Suite)

- [ ] **Penetration testing** (se aplicável)

- [ ] **Security headers** configurados

- [ ] **TLS/SSL** A+ rating (SSL Labs)

#### 4.2 Assinar Release

Se tudo OK:

```bash
# Security sign-off
echo "✅ Security Audit PASSED" >> SECURITY_AUDIT_REPORT.md
```

Se bloqueios:

```bash
# Block release
echo "❌ Security Audit FAILED - Critical issues found" >> SECURITY_AUDIT_REPORT.md
exit 1
```

---

## Outputs

### Phase 2 (Architecture)
- `specs/08_crosscutting/security/stride-threat-model.md`
- `specs/09_decisions/adrs/ADR-XXX_security-*.md`

### Phase 3 (Specification)
- `specs/08_crosscutting/security/asvs-analysis.md`
- `specs/08_crosscutting/sdlc-security.md`
- `specs/10_quality/security-requirements.md`
- `specs/11_risks/vulnerability-analysis.md`

### Phase 5 (Testing)
- `SECURITY_VALIDATION_REPORT.md`
- SAST/DAST scan results

### Phase 7 (Validation)
- `SECURITY_AUDIT_REPORT.md`
- Security sign-off ou bloqueio de release

---

## Integration with Workflow

```
Phase 1: Discovery (analyst)
    ↓
Phase 2: Architecture (architect + security-analyst)
    ↓ threat-model, ADRs de segurança
Phase 3: Specification (analyst + security-analyst)
    ↓ ASVS, Top 10, CWE, NIST SSDF
Phase 4: Implementation (developer)
    ↓ aplica rules 040-064
Phase 5: Testing (tester + security-analyst)
    ↓ valida rules, SAST/DAST
Phase 6: Documentation (documenter)
    ↓
Phase 7: Validation (guardian + security-analyst)
    ↓ audit final, sign-off
Release
```

---

## Checklist Completo

Usar `.claude/skills/security-analyst/CHECKLIST.md` para validação sistemática.

---

## Ferramentas Recomendadas

### SAST
- SonarQube (security rules)
- Semgrep (customizable rules)
- npm audit / cargo audit
- Snyk Code

### DAST
- OWASP ZAP
- Burp Suite
- Nikto
- w3af

### SCA (Software Composition Analysis)
- Snyk
- Dependabot
- OWASP Dependency-Check

### Secrets Scanning
- TruffleHog
- GitGuardian
- git-secrets

### Penetration Testing
- Manual testing
- Bug bounty program
- Third-party pentest

---

## Permissões Necessárias

- **Read**: Acesso a specs/, src/, package.json, Dockerfile
- **Write**: Criar arquivos em specs/08_crosscutting/security/, specs/10_quality/, specs/11_risks/
- **Execute**: Rodar SAST/DAST tools via CI/CD

---

## Troubleshooting

Ver `.claude/skills/security-analyst/TROUBLESHOOTING.md` para erros comuns e soluções.

---

**Version**: 1.0.0
**Maintained by**: Documentation-First Approach System
**Last Updated**: 2025-12-16

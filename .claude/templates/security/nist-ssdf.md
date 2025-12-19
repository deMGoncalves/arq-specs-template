# NIST SSDF - Secure Software Development Framework

**ID do Template**: TPL-SEC-005
**Versão**: 1.0.0
**Categoria**: Security
**Framework**: NIST SSDF v1.1
**Usado Por**: security-analyst (Todas as Fases)
**Última Atualização**: 2025-12-16

---

## Propósito

Este template documenta a conformidade com o **NIST Secure Software Development Framework**, garantindo que práticas de desenvolvimento seguro estejam integradas em todo o SDLC.

---

## PO: Prepare the Organization

### PO.1: Identificar e Documentar Requisitos de Segurança

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PO.1.1** | Requisitos de segurança identificados (OWASP ASVS, CWE) | [ ] |
| **PO.1.2** | Requisitos de conformidade documentados (GDPR, PCI-DSS) | [ ] |
| **PO.1.3** | Security requirements em specs/ | [ ] |

**Evidências**:
- `specs/02_constraints/` (Regras 001-064)
- `specs/10_quality/security-requirements.md`

---

### PO.2: Implementar Papéis e Responsabilidades de Segurança

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PO.2.1** | Security champion designado | [ ] |
| **PO.2.2** | Training de segurança para devs (anual) | [ ] |
| **PO.2.3** | Security code review obrigatório | [ ] |

**Evidências**:
- `.claude/skills/security-analyst/` (Agente especializado)
- `.claude/skills/guardian/` (Validação pré-commit)

---

### PO.3: Implementar Ferramentas e Processos de Segurança

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PO.3.1** | SAST integrado (SonarQube, Semgrep) | [ ] |
| **PO.3.2** | DAST integrado (OWASP ZAP) | [ ] |
| **PO.3.3** | SCA integrado (npm audit, Snyk) | [ ] |
| **PO.3.4** | Secret scanning (TruffleHog, GitGuardian) | [ ] |

**Evidências**:
- `.github/workflows/security.yml`
- CI/CD pipeline com gates de segurança

---

### PO.4: Definir e Usar Critérios para Aquisição de Software

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PO.4.1** | Dependências apenas de fontes confiáveis (npm, crates.io) | [ ] |
| **PO.4.2** | Verificação de licenças (FOSS Review) | [ ] |
| **PO.4.3** | Scanning de vulnerabilidades antes de adicionar deps | [ ] |

**Evidências**:
- `package-lock.json`, `Cargo.lock` (lock files)
- Dependabot ativo

---

### PO.5: Implementar e Manter Ambientes de Desenvolvimento Seguros

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PO.5.1** | Workstations com disk encryption | [ ] |
| **PO.5.2** | Acesso ao código via MFA (GitHub) | [ ] |
| **PO.5.3** | Branch protection (main/master) | [ ] |
| **PO.5.4** | Secrets em gerenciadores (não em .env local) | [ ] |

**Evidências**:
- GitHub: Branch protection rules, MFA obrigatório
- AWS Secrets Manager

---

## PS: Protect the Software

### PS.1: Proteger Todos os Componentes do Software

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PS.1.1** | Código em repositório privado (GitHub) | [ ] |
| **PS.1.2** | Commits assinados (GPG) | [ ] |
| **PS.1.3** | Access control (RBAC no GitHub) | [ ] |

**Evidências**:
- GitHub: Private repo, required signed commits

---

### PS.2: Providenciar Mecanismo de Detecção de Adulteração

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PS.2.1** | Checksums/hashes para releases | [ ] |
| **PS.2.2** | Builds assinados digitalmente | [ ] |
| **PS.2.3** | SRI (Subresource Integrity) para CDN | [ ] |

**Evidências**:
- GitHub Releases: SHA-256 checksums
- Code signing certificate

---

### PS.3: Arquivar e Proteger Cada Versão do Software

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PS.3.1** | Git tags para releases | [ ] |
| **PS.3.2** | Artifacts armazenados (GitHub Releases, npm registry) | [ ] |
| **PS.3.3** | Retenção mínima de 2 anos | [ ] |

**Evidências**:
- Git tags (vX.Y.Z)
- npm registry, crates.io

---

## PW: Produce Well-Secured Software

### PW.1: Design de Software com Segurança em Mente

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.1.1** | Threat modeling realizado (STRIDE) | [ ] |
| **PW.1.2** | Secure-by-default (deny-by-default, least privilege) | [ ] |
| **PW.1.3** | Defense-in-depth (múltiplas camadas) | [ ] |

**Evidências**:
- `specs/08_crosscutting/security/stride-threat-model.md`
- ADRs de segurança

---

### PW.2: Revisar Design de Software

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.2.1** | Security architect review (Fase 2) | [ ] |
| **PW.2.2** | Design review antes de implementação | [ ] |

**Evidências**:
- `.claude/skills/architect/` (Security considerations)
- ADRs aprovados

---

### PW.4: Reuso de Software Bem-Seguro Existente

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.4.1** | Preferir bibliotecas estabelecidas (não reinventar crypto) | [ ] |
| **PW.4.2** | Code reuse via DRY (Regra 021) | [ ] |

**Evidências**:
- Uso de bcrypt/argon2 (não crypto custom)
- Regra 021 (DRY)

---

### PW.5: Criar Source Code com Segurança

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.5.1** | Código segue 64 regras de qualidade | [ ] |
| **PW.5.2** | Input validation (Regra 040) | [ ] |
| **PW.5.3** | Output encoding (Regra 044) | [ ] |
| **PW.5.4** | Secure error handling (Regra 046) | [ ] |

**Evidências**:
- `.claude/rules/040-064` aplicadas
- Linters configurados (ESLint, Clippy)

---

### PW.6: Configurar Software com Segurança

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.6.1** | Configurações seguras por padrão | [ ] |
| **PW.6.2** | Sem credenciais hardcoded (Regra 045) | [ ] |
| **PW.6.3** | Security headers configurados (Regra 049) | [ ] |

**Evidências**:
- `config/` (sem secrets)
- `middleware/security-headers.ts`

---

### PW.7: Revisar e/ou Analisar Código Humano ou Automaticamente

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.7.1** | Code review obrigatório (PR) | [ ] |
| **PW.7.2** | SAST automatizado (SonarQube) | [ ] |
| **PW.7.3** | Peer review focado em segurança | [ ] |

**Evidências**:
- `.claude/skills/reviewer/` (Security checklist)
- GitHub: Require PR approvals

---

### PW.8: Testar Software Executável

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.8.1** | Security unit tests | [ ] |
| **PW.8.2** | DAST (OWASP ZAP) | [ ] |
| **PW.8.3** | Penetration testing (anual) | [ ] |
| **PW.8.4** | Fuzz testing | [ ] |

**Evidências**:
- `tests/security/` (Security test suite)
- `.github/workflows/dast.yml`

---

### PW.9: Configurar Binários de Software e Deployment com Segurança

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **PW.9.1** | Container hardening (non-root user) | [ ] |
| **PW.9.2** | Minimal base images (alpine, distroless) | [ ] |
| **PW.9.3** | Container scanning (Snyk, Trivy) | [ ] |

**Evidências**:
- `Dockerfile` (multi-stage, non-root)
- `.github/workflows/container-scan.yml`

---

## RV: Respond to Vulnerabilities

### RV.1: Identificar Vulnerabilidades em Releases

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **RV.1.1** | Monitoramento CVE (GitHub Advisory, Snyk) | [ ] |
| **RV.1.2** | Dependabot alertas ativos | [ ] |
| **RV.1.3** | Security mailing lists assinadas | [ ] |

**Evidências**:
- Dependabot enabled
- Snyk monitoring

---

### RV.1: Corrigir Vulnerabilidades

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **RV.1.2** | SLA para patches: Crítico (7 dias), Alto (30 dias) | [ ] |
| **RV.1.3** | Security patches priorizados | [ ] |

**Evidências**:
- Incident response playbook
- Patch management process

---

### RV.2: Analisar Vulnerabilidades para Identificar Causa Raiz

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **RV.2.1** | Post-mortem após incidentes | [ ] |
| **RV.2.2** | Lessons learned documentadas | [ ] |
| **RV.2.3** | Prevenção via novas rules ou testes | [ ] |

**Evidências**:
- `docs/security/post-mortems/`

---

### RV.3: Divulgar Vulnerabilidades de Forma Responsável

| Sub-prática | Verificação | Status |
|-------------|-------------|--------|
| **RV.3.1** | Security policy (SECURITY.md) | [ ] |
| **RV.3.2** | Bug bounty program ou email de contato | [ ] |
| **RV.3.3** | CVE assignment para vulnerabilidades | [ ] |

**Evidências**:
- `SECURITY.md` (responsible disclosure policy)
- `security@example.com`

---

## Resumo de Conformidade

| Categoria | Total Práticas | Completo | Parcial | Não Iniciado | % |
|-----------|---------------|----------|---------|--------------|---|
| **PO - Prepare** | 5 | 0 | 0 | 5 | 0% |
| **PS - Protect** | 3 | 0 | 0 | 3 | 0% |
| **PW - Produce** | 9 | 0 | 0 | 9 | 0% |
| **RV - Respond** | 3 | 0 | 0 | 3 | 0% |
| **TOTAL** | **20** | **0** | **0** | **20** | **0%** |

---

## Integração com Workflow de 7 Fases

| Fase | Prática NIST | Responsável | Validação |
|------|--------------|-------------|-----------|
| **1. Discovery** | PO.1 (Requisitos) | analyst | Specs completos |
| **2. Architecture** | PW.1, PW.2 (Design) | architect | Threat model |
| **3. Specification** | PO.1, PW.4 (Reuso) | analyst | ASVS checklist |
| **4. Implementation** | PW.5, PW.6 (Código) | developer | SAST, Rules 040-064 |
| **5. Testing** | PW.7, PW.8 (Testes) | tester | DAST, Pen test |
| **6. Documentation** | PS.3 (Arquivo) | documenter | Docs atualizados |
| **7. Validation** | PS.2 (Integridade) | guardian | Pre-commit checks |

---

## Mapeamento para Outros Frameworks

| NIST SSDF | OWASP ASVS | OWASP Top 10 | CWE | ISO 27001 |
|-----------|------------|--------------|-----|-----------|
| PW.1 (Design) | V1 (Architecture) | A04 (Insecure Design) | - | A.14.2 |
| PW.5 (Code) | V5 (Validation) | A03 (Injection) | CWE-20, 79, 89 | A.14.2 |
| PW.7 (Review) | - | - | - | A.14.2.8 |
| PW.8 (Test) | - | - | - | A.14.2.9 |
| RV.1 (Respond) | - | A06 (Vulnerable Components) | - | A.16.1 |

---

## Próximos Passos

1. [ ] Completar PO.1-PO.5 (Prepare Organization)
2. [ ] Implementar PS.1-PS.3 (Protect Software)
3. [ ] Aplicar PW.1-PW.9 (Produce Secure Software)
4. [ ] Estabelecer RV.1-RV.3 (Respond to Vulnerabilities)
5. [ ] Re-assessment em 6 meses

---

## Referências

- **NIST SSDF v1.1**: https://csrc.nist.gov/publications/detail/sp/800-218/final
- **NIST SP 800-53**: Security Controls Catalog
- **Output**: `specs/08_crosscutting/sdlc-security.md`

---

**Anterior**: [CWE Top 25](cwe-top25.md) | **Próximo**: N/A (fim dos templates de segurança)

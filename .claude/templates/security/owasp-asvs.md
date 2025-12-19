# OWASP ASVS 4.0 - Application Security Verification Standard

**ID do Template**: TPL-SEC-001
**Versão**: 1.0.0
**Categoria**: Security
**Framework**: OWASP ASVS 4.0
**Usado Por**: security-analyst (Fase 3: Specification / Fase 7: Validation)
**Última Atualização**: 2025-12-16

---

## Propósito

Este template documenta a verificação de segurança da aplicação contra os **14 domínios do OWASP ASVS 4.0**, garantindo que todos os requisitos de segurança sejam atendidos de forma mensurável e verificável.

---

## V1. Arquitetura, Design e Modelagem de Ameaças

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V1.1 Ciclo de Vida de Desenvolvimento Seguro

- [ ] **V1.1.1**: Todos os componentes da aplicação são identificados e possuem versões conhecidas
- [ ] **V1.1.2**: Arquitetura de segurança documentada com componentes de confiança claramente definidos
- [ ] **V1.1.3**: Separação de componentes de diferentes níveis de confiança (segregação lógica/física)
- [ ] **V1.1.4**: Todas as funcionalidades de alto valor possuem controles de segurança documentados

### V1.2 Modelagem de Ameaças

- [ ] **V1.2.1**: Modelagem de ameaças (STRIDE ou similar) realizada
- [ ] **V1.2.2**: Ameaças identificadas e documentadas
- [ ] **V1.2.3**: Mitigações implementadas para ameaças de alto risco
- [ ] **V1.2.4**: Revisão periódica da modelagem de ameaças

### Evidências

```markdown
- Documento: `specs/08_crosscutting/security/threat-model.md`
- Diagrama: `docs/architecture/trust-boundaries.png`
- ADR: `specs/09_decisions/adrs/ADR-XXX_security-architecture.md`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V1-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V2. Autenticação

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V2.1 Requisitos de Senha

- [ ] **V2.1.1**: Senhas com mínimo 12 caracteres ou passphrases com mínimo 64 caracteres
- [ ] **V2.1.2**: Senhas com máximo 128 caracteres permitidos
- [ ] **V2.1.3**: Truncamento de senha proibido (hash completo)
- [ ] **V2.1.4**: Caracteres Unicode permitidos em senhas
- [ ] **V2.1.5**: Usuários podem trocar senha
- [ ] **V2.1.6**: Validação contra senhas comprometidas (Have I Been Pwned ou similar)
- [ ] **V2.1.7**: Dicas de senha proibidas
- [ ] **V2.1.8**: Medidor de força de senha disponível
- [ ] **V2.1.9**: Sem regras de composição complexas (ex: obrigar símbolos)
- [ ] **V2.1.10**: Sem expiração periódica de senha (apenas se comprometida)

### V2.2 Autenticação Multi-Fator (MFA)

- [ ] **V2.2.1**: MFA disponível para funcionalidades de alto valor
- [ ] **V2.2.2**: Múltiplos fatores suportados (SMS, TOTP, U2F, etc)
- [ ] **V2.2.3**: Impossível bypassar MFA sem autenticação primária
- [ ] **V2.2.4**: Resistência a ataques de replay (nonces, timestamps)

### V2.3 Autenticadores de Segredo

- [ ] **V2.3.1**: Senhas armazenadas com algoritmo resistente (Argon2id, scrypt, bcrypt, PBKDF2)
- [ ] **V2.3.2**: Salt único e aleatório por usuário (min 32 bytes)
- [ ] **V2.3.3**: Iterações suficientes (>10000 PBKDF2, >4 bcrypt, etc)

### V2.4 Recuperação de Credenciais

- [ ] **V2.4.1**: Senhas não enviadas por email em texto plano
- [ ] **V2.4.2**: Tokens de recuperação únicos e temporários (<1 hora)
- [ ] **V2.4.3**: Tokens de recuperação de uso único
- [ ] **V2.4.4**: Processo de recuperação não revela se conta existe (timing-safe)

### V2.5 Autenticadores Baseados em Lookup

- [ ] **V2.5.1**: Códigos de backup criptografados
- [ ] **V2.5.2**: Códigos de backup de uso único

### V2.6 Autenticadores Out of Band

- [ ] **V2.6.1**: Códigos OOB únicos, aleatórios e seguros
- [ ] **V2.6.2**: Códigos OOB expiram em <10 minutos
- [ ] **V2.6.3**: Códigos OOB de uso único

### V2.7 Proteção contra Ataques Automatizados

- [ ] **V2.7.1**: Rate limiting em endpoints de autenticação (ex: 5 tentativas/15min)
- [ ] **V2.7.2**: Captcha ou mecanismo anti-bot após múltiplas falhas
- [ ] **V2.7.3**: Proteção contra credential stuffing

### Evidências

```markdown
- Implementação: `src/auth/password-hashing.ts` (Regra 041)
- Testes: `tests/auth/password-security.test.ts`
- Configuração: `config/auth.json` (Argon2id, work factor 4)
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V2-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V3. Gerenciamento de Sessão

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V3.1 Requisitos Fundamentais

- [ ] **V3.1.1**: Aplicação NÃO revela tokens de sessão em URLs
- [ ] **V3.1.2**: Logout invalida sessão no servidor
- [ ] **V3.1.3**: Logout disponível em todas as páginas
- [ ] **V3.1.4**: Timeout de inatividade (15 min para apps sensíveis)
- [ ] **V3.1.5**: Timeout absoluto de sessão (8-12 horas)

### V3.2 Vinculação de Sessão

- [ ] **V3.2.1**: Nova sessão após autenticação (previne session fixation)
- [ ] **V3.2.2**: Tokens de sessão aleatórios e criptograficamente seguros (>128 bits)
- [ ] **V3.2.3**: Sessão armazenada no servidor (stateful) ou JWT assinado (stateless)
- [ ] **V3.2.4**: Cookies com flags `Secure`, `HttpOnly`, `SameSite`

### V3.3 Encerramento de Sessão

- [ ] **V3.3.1**: Logout encerra sessão no servidor
- [ ] **V3.3.2**: Opção de encerrar todas as sessões ativas
- [ ] **V3.3.3**: Sessão encerrada após troca de senha

### V3.4 Gerenciamento Baseado em Cookie

- [ ] **V3.4.1**: Cookies com `HttpOnly` (protege contra XSS)
- [ ] **V3.4.2**: Cookies com `Secure` (apenas HTTPS)
- [ ] **V3.4.3**: Cookies com `SameSite=Strict` ou `Lax` (protege contra CSRF)
- [ ] **V3.4.4**: Cookies com `Path` e `Domain` restritos

### V3.5 Gerenciamento Baseado em Token

- [ ] **V3.5.1**: JWT com assinatura (HS256, RS256, ES256)
- [ ] **V3.5.2**: JWT com `exp` (expiration) curto (<15 min)
- [ ] **V3.5.3**: Refresh tokens para renovação
- [ ] **V3.5.4**: Refresh tokens revogáveis no servidor

### Evidências

```markdown
- Implementação: `src/auth/session-manager.ts` (Regra 042)
- Configuração: `middleware/session.ts` (Secure, HttpOnly, SameSite=Strict)
- Testes: `tests/auth/session-security.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V3-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V4. Controle de Acesso

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V4.1 Design de Controle de Acesso

- [ ] **V4.1.1**: Aplicação usa modelo de controle de acesso confiável (RBAC, ABAC)
- [ ] **V4.1.2**: Controle de acesso aplicado no servidor (nunca apenas no cliente)
- [ ] **V4.1.3**: Negação padrão (deny by default)
- [ ] **V4.1.4**: Acesso a recursos protegidos requer autorização válida

### V4.2 Controle de Acesso no Nível de Operação

- [ ] **V4.2.1**: Dados sensíveis e APIs protegidos contra ataques IDOR
- [ ] **V4.2.2**: Aplicação impede mass assignment (binding automático perigoso)

### V4.3 Outros Controles de Acesso

- [ ] **V4.3.1**: Acesso administrativo segmentado (princípio do menor privilégio)
- [ ] **V4.3.2**: Navegação forçada para páginas não autorizadas é negada
- [ ] **V4.3.3**: Referências diretas a objetos verificadas (IDOR mitigado)

### Evidências

```markdown
- Implementação: `src/auth/authorization.ts` (Regra 043)
- Middleware: `middleware/rbac.ts` (RBAC com roles: admin, user, guest)
- Testes: `tests/auth/access-control.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V4-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V5. Validação, Sanitização e Codificação

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V5.1 Validação de Input

- [ ] **V5.1.1**: Input validado usando whitelist positiva
- [ ] **V5.1.2**: Validação estruturada (schemas: Joi, Zod, JSON Schema)
- [ ] **V5.1.3**: Validação de tipos, tamanhos, ranges
- [ ] **V5.1.4**: Caracteres especiais validados (<, >, &, ", ')
- [ ] **V5.1.5**: Headers HTTP validados (Content-Type, Accept)

### V5.2 Sanitização e Sandboxing

- [ ] **V5.2.1**: Output escapado conforme contexto (HTML, JS, SQL, XML)
- [ ] **V5.2.2**: Dados não confiáveis sanitizados antes de exibição
- [ ] **V5.2.3**: Proteção contra template injection

### V5.3 Codificação de Output e Prevenção de Injection

- [ ] **V5.3.1**: Output codificado para contexto HTML
- [ ] **V5.3.2**: Output codificado para contexto JavaScript
- [ ] **V5.3.3**: Consultas SQL usam prepared statements ou ORM
- [ ] **V5.3.4**: Comandos OS usam sanitização ou APIs seguras
- [ ] **V5.3.5**: Proteção contra XML/XPath injection

### V5.4 Memória, String e Código Não Gerenciado

- [ ] **V5.4.1**: Uso de funções seguras (strncpy vs strcpy)
- [ ] **V5.4.2**: Proteção contra buffer overflow
- [ ] **V5.4.3**: Validação de tamanho em operações de memória

### V5.5 Prevenção de Desserialização

- [ ] **V5.5.1**: Desserialização usa tipos seguros
- [ ] **V5.5.2**: Validação de dados antes de desserializar
- [ ] **V5.5.3**: Proteção contra desserialização não confiável (Java, Python, PHP)

### Evidências

```markdown
- Implementação: `src/validation/input-validator.ts` (Regra 040)
- Sanitização: `src/validation/output-encoder.ts` (Regra 044)
- Testes: `tests/validation/injection-prevention.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V5-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V6. Criptografia

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V6.1 Classificação de Dados

- [ ] **V6.1.1**: Dados regulamentados identificados (PII, PCI, GDPR)
- [ ] **V6.1.2**: Dados sensíveis classificados (confidencial, privado, público)
- [ ] **V6.1.3**: Dados sensíveis criptografados em repouso

### V6.2 Algoritmos

- [ ] **V6.2.1**: Criptografia simétrica usa algoritmos aprovados (AES-256, ChaCha20)
- [ ] **V6.2.2**: IVs (Initialization Vectors) aleatórios e únicos
- [ ] **V6.2.3**: Modos seguros (GCM, CCM - não ECB)
- [ ] **V6.2.4**: Criptografia assimétrica usa algoritmos aprovados (RSA-2048, ECDSA-P256)
- [ ] **V6.2.5**: Hash criptográfico usa SHA-256 ou superior (não MD5, SHA1)

### V6.3 Valores Aleatórios

- [ ] **V6.3.1**: Gerador de números aleatórios criptograficamente seguro (CSPRNG)
- [ ] **V6.3.2**: Entropia suficiente (>128 bits)

### V6.4 Gerenciamento de Segredos

- [ ] **V6.4.1**: Segredos não hardcoded no código
- [ ] **V6.4.2**: Chaves armazenadas em serviço seguro (AWS Secrets Manager, Vault)
- [ ] **V6.4.3**: Rotação periódica de chaves
- [ ] **V6.4.4**: Chaves antigas revogadas após rotação

### Evidências

```markdown
- Implementação: `src/crypto/encryption.ts` (Regra 045)
- Configuração: `AWS Secrets Manager` (chaves rotacionadas)
- Testes: `tests/crypto/encryption.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V6-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V7. Tratamento de Erros e Logging

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V7.1 Tratamento de Erros

- [ ] **V7.1.1**: Erros não expõem stack traces em produção
- [ ] **V7.1.2**: Mensagens de erro genéricas para usuário (não revelam detalhes internos)
- [ ] **V7.1.3**: Erros logados com contexto suficiente para debug
- [ ] **V7.1.4**: Alertas de segurança em tempo real para eventos críticos

### V7.2 Logging

- [ ] **V7.2.1**: Eventos de autenticação logados (login, logout, falhas)
- [ ] **V7.2.2**: Eventos de autorização logados (tentativas de acesso negadas)
- [ ] **V7.2.3**: Logs incluem timestamp, user ID, IP, ação
- [ ] **V7.2.4**: Logs não contêm dados sensíveis (senhas, tokens, PII)

### V7.3 Proteção de Logs

- [ ] **V7.3.1**: Logs armazenados de forma segura
- [ ] **V7.3.2**: Logs não modificáveis (append-only)
- [ ] **V7.3.3**: Logs com retenção adequada (90 dias mínimo)
- [ ] **V7.3.4**: Acesso a logs restrito

### V7.4 Tratamento de Erros

- [ ] **V7.4.1**: Memória limpa após uso de dados sensíveis
- [ ] **V7.4.2**: Proteção contra time-based attacks (timing-safe comparisons)
- [ ] **V7.4.3**: Proteção contra information disclosure via timing

### Evidências

```markdown
- Implementação: `src/logging/secure-logger.ts` (Regra 046, 059)
- Configuração: `config/winston.json` (logs estruturados, sem PII)
- Testes: `tests/logging/security.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V7-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V8. Proteção de Dados

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V8.1 Proteção Geral de Dados

- [ ] **V8.1.1**: Dados sensíveis criptografados em trânsito (TLS 1.3)
- [ ] **V8.1.2**: Dados sensíveis criptografados em repouso (AES-256)
- [ ] **V8.1.3**: Cache desabilitado para páginas sensíveis
- [ ] **V8.1.4**: Autocomplete desabilitado para campos sensíveis

### V8.2 Privacidade do Cliente

- [ ] **V8.2.1**: Coleta de dados minimizada (princípio da minimização)
- [ ] **V8.2.2**: Consentimento explícito para coleta de dados
- [ ] **V8.2.3**: Usuário pode acessar seus dados (direito de acesso)
- [ ] **V8.2.4**: Usuário pode deletar seus dados (direito ao esquecimento)

### V8.3 Dados Sensíveis

- [ ] **V8.3.1**: PII mascarado em logs e interfaces
- [ ] **V8.3.2**: Números de cartão de crédito mascarados (PAN truncado)
- [ ] **V8.3.3**: Dados sensíveis não armazenados desnecessariamente
- [ ] **V8.3.4**: Dados sensíveis purgados quando não mais necessários

### Evidências

```markdown
- Implementação: `src/data/encryption.ts` (Regra 047)
- GDPR: `src/gdpr/data-subject-rights.ts`
- Testes: `tests/data/privacy.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V8-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V9. Comunicação

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V9.1 Segurança de Comunicação do Cliente

- [ ] **V9.1.1**: TLS usado para todas as conexões (HTTPS)
- [ ] **V9.1.2**: TLS versão 1.2+ (idealmente 1.3)
- [ ] **V9.1.3**: Certificados TLS válidos e confiáveis
- [ ] **V9.1.4**: HSTS (HTTP Strict Transport Security) ativado

### V9.2 Segurança de Comunicação do Servidor

- [ ] **V9.2.1**: Conexões entre serviços usam TLS ou mTLS
- [ ] **V9.2.2**: Validação de certificado em conexões de saída
- [ ] **V9.2.3**: APIs internas autenticadas (API keys, OAuth)

### Evidências

```markdown
- Configuração: `nginx.conf` (TLS 1.3, HSTS, cipher suites fortes)
- Certificado: Let's Encrypt (auto-renovado)
- Testes: SSL Labs A+ rating
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V9-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V10. Código Malicioso

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V10.1 Integridade de Código

- [ ] **V10.1.1**: Dependências verificadas quanto a vulnerabilidades (npm audit, Snyk)
- [ ] **V10.1.2**: Builds determinísticos
- [ ] **V10.1.3**: CI/CD com verificação de segurança

### V10.2 Busca de Malware

- [ ] **V10.2.1**: Uploads de arquivos escaneados (antivírus, VirusTotal)
- [ ] **V10.2.2**: Uploads armazenados fora do webroot

### V10.3 Integridade de Aplicação

- [ ] **V10.3.1**: Subresource Integrity (SRI) para CDN
- [ ] **V10.3.2**: Content Security Policy (CSP) configurado

### Evidências

```markdown
- CI/CD: `.github/workflows/security.yml` (npm audit, Snyk scan)
- CSP: `Content-Security-Policy: default-src 'self'`
- SRI: `<script src="..." integrity="sha384-..."/>`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V10-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V11. Lógica de Negócio

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V11.1 Segurança de Lógica de Negócio

- [ ] **V11.1.1**: Fluxos de negócio executados em ordem correta
- [ ] **V11.1.2**: Limites de transação (valores, quantidades)
- [ ] **V11.1.3**: Proteção contra replay attacks
- [ ] **V11.1.4**: Proteção contra race conditions (transações concorrentes)
- [ ] **V11.1.5**: Proteção contra time-of-check-time-of-use (TOCTOU)

### Evidências

```markdown
- Implementação: `src/business/transaction-manager.ts`
- Testes: `tests/business/race-condition.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V11-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V12. Arquivos e Recursos

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V12.1 Upload de Arquivos

- [ ] **V12.1.1**: Tipo de arquivo validado (whitelist)
- [ ] **V12.1.2**: Tamanho máximo de arquivo imposto
- [ ] **V12.1.3**: Conteúdo de arquivo validado (magic bytes)
- [ ] **V12.1.4**: Arquivos renomeados (não usar nome original)

### V12.2 Integridade de Arquivos

- [ ] **V12.2.1**: Arquivos escaneados para malware
- [ ] **V12.2.2**: Arquivos armazenados fora do webroot

### V12.3 Download de Arquivos

- [ ] **V12.3.1**: Proteção contra path traversal (../../etc/passwd)
- [ ] **V12.3.2**: Content-Disposition: attachment para downloads

### V12.4 SSRF (Server-Side Request Forgery)

- [ ] **V12.4.1**: URLs de saída validadas (whitelist de domínios)
- [ ] **V12.4.2**: Proteção contra acesso a recursos internos (localhost, 169.254.169.254)

### Evidências

```markdown
- Implementação: `src/files/upload-validator.ts` (Regra 053, 057)
- Scan: ClamAV integration
- Testes: `tests/files/upload-security.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V12-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V13. APIs e Web Services

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V13.1 Segurança Genérica de Web Service

- [ ] **V13.1.1**: HTTPS usado para todas as APIs
- [ ] **V13.1.2**: Autenticação em todas as APIs (exceto públicas documentadas)
- [ ] **V13.1.3**: Rate limiting configurado
- [ ] **V13.1.4**: GraphQL: query depth limiting, cost analysis

### V13.2 API RESTful

- [ ] **V13.2.1**: Métodos HTTP usados corretamente (GET, POST, PUT, DELETE)
- [ ] **V13.2.2**: Validação de Content-Type
- [ ] **V13.2.3**: CORS configurado corretamente (não usar wildcard *)

### V13.3 SOAP

- [ ] **V13.3.1**: WS-Security usado
- [ ] **V13.3.2**: XML validado contra schema (XSD)

### V13.4 GraphQL

- [ ] **V13.4.1**: Introspection desabilitada em produção
- [ ] **V13.4.2**: Query complexity limiting
- [ ] **V13.4.3**: Batching limitado

### Evidências

```markdown
- Implementação: `src/api/rate-limiter.ts`
- CORS: `cors: { origin: ['https://example.com'] }`
- Testes: `tests/api/security.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V13-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## V14. Configuração

### Status Geral
- [ ] Completo
- [ ] Parcial
- [ ] Não Iniciado

### V14.1 Hardening de Build e Deploy

- [ ] **V14.1.1**: Componentes desnecessários removidos (debug, samples)
- [ ] **V14.1.2**: Dependências atualizadas
- [ ] **V14.1.3**: Scanning de vulnerabilidades automatizado

### V14.2 Dependências

- [ ] **V14.2.1**: Dependências versionadas (lock files)
- [ ] **V14.2.2**: Componentes com vulnerabilidades conhecidas atualizados
- [ ] **V14.2.3**: SCA (Software Composition Analysis) executado

### V14.3 Divulgação de Segurança Não Intencional

- [ ] **V14.3.1**: Headers de servidor removidos/ofuscados
- [ ] **V14.3.2**: Comentários de código removidos em produção
- [ ] **V14.3.3**: Mensagens de erro genéricas (não revelam stack traces)

### V14.4 Cabeçalhos de Segurança HTTP

- [ ] **V14.4.1**: `X-Frame-Options: DENY` ou `SAMEORIGIN`
- [ ] **V14.4.2**: `X-Content-Type-Options: nosniff`
- [ ] **V14.4.3**: `Content-Security-Policy` configurado
- [ ] **V14.4.4**: `Strict-Transport-Security` (HSTS)
- [ ] **V14.4.5**: `Referrer-Policy: no-referrer` ou `strict-origin`
- [ ] **V14.4.6**: `Permissions-Policy` configurado

### V14.5 Validação de Solicitação HTTP

- [ ] **V14.5.1**: HTTP methods permitidos apenas os necessários
- [ ] **V14.5.2**: `Origin` header validado
- [ ] **V14.5.3**: Request size limits configurados

### Evidências

```markdown
- Headers: `middleware/security-headers.ts` (Regra 049)
- Hardening: `Dockerfile` (multi-stage build, non-root user)
- Testes: `tests/config/security-headers.test.ts`
```

### Riscos Identificados

| ID | Ameaça | Severidade | Mitigação | Status |
|----|--------|------------|-----------|--------|
| ASVS-V14-001 | [Descrição] | Alta/Média/Baixa | [Controle implementado] | ✅/⚠️/❌ |

---

## Resumo de Conformidade

### Estatísticas

| Domínio | Total | Completo | Parcial | Não Iniciado | % |
|---------|-------|----------|---------|--------------|---|
| V1. Arquitetura | X | X | X | X | X% |
| V2. Autenticação | X | X | X | X | X% |
| V3. Sessão | X | X | X | X | X% |
| V4. Controle de Acesso | X | X | X | X | X% |
| V5. Validação | X | X | X | X | X% |
| V6. Criptografia | X | X | X | X | X% |
| V7. Erros e Logging | X | X | X | X | X% |
| V8. Proteção de Dados | X | X | X | X | X% |
| V9. Comunicação | X | X | X | X | X% |
| V10. Código Malicioso | X | X | X | X | X% |
| V11. Lógica de Negócio | X | X | X | X | X% |
| V12. Arquivos | X | X | X | X | X% |
| V13. APIs | X | X | X | X | X% |
| V14. Configuração | X | X | X | X | X% |
| **TOTAL** | **X** | **X** | **X** | **X** | **X%** |

### Nível de Verificação Atingido

- [ ] **Nível 1**: Aplicações de baixo risco (oportunístico)
- [ ] **Nível 2**: Aplicações que contêm dados sensíveis (padrão recomendado)
- [ ] **Nível 3**: Aplicações críticas (alta segurança)

### Próximas Ações

1. [ ] Completar itens pendentes de alta severidade
2. [ ] Revisar itens parciais
3. [ ] Agendar re-assessment em 6 meses
4. [ ] Atualizar documentação de segurança

---

## Referências

- **OWASP ASVS 4.0**: https://owasp.org/www-project-application-security-verification-standard/
- **Regras Relacionadas**: 040-049 em `.claude/rules/`
- **Output**: `specs/08_crosscutting/security/asvs-analysis.md`

---

**Anterior**: N/A | **Próximo**: [STRIDE Threat Model](stride-analysis.md)

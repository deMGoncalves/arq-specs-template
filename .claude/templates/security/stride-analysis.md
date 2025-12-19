# STRIDE Threat Modeling - Análise de Ameaças

**ID do Template**: TPL-SEC-002
**Versão**: 1.0.0
**Categoria**: Security
**Framework**: STRIDE (Microsoft)
**Usado Por**: security-analyst (Fase 2: Architecture / Fase 3: Specification)
**Última Atualização**: 2025-12-16

---

## Propósito

Este template documenta a **modelagem de ameaças** da aplicação usando o framework **STRIDE**, identificando sistematicamente ameaças em cada componente do sistema e definindo mitigações apropriadas.

**STRIDE** = **S**poofing, **T**ampering, **R**epudiation, **I**nformation Disclosure, **D**enial of Service, **E**levation of Privilege

---

## 1. Visão Geral do Sistema

### 1.1 Descrição do Sistema

```markdown
[Breve descrição do sistema e seu propósito]

Exemplo:
Sistema de e-commerce que permite usuários criar contas, navegar produtos,
adicionar ao carrinho e processar pagamentos via Stripe.
```

### 1.2 Ativos Críticos

| Ativo | Tipo | Sensibilidade | Proteção Necessária |
|-------|------|---------------|---------------------|
| Credenciais de usuário | Dados | Alta | Criptografia, Hash |
| Tokens de sessão | Dados | Alta | HTTPS, HttpOnly |
| Dados de pagamento | Dados | Crítica | PCI-DSS, Tokenização |
| Informações pessoais | Dados | Alta | GDPR, Criptografia |
| API Keys | Segredos | Crítica | Secrets Manager |

### 1.3 Diagrama de Data Flow (DFD)

```markdown
[Incluir diagrama C4 L1 (System Context) ou DFD mostrando:]
- Atores externos (usuários, sistemas)
- Processos (componentes da aplicação)
- Data stores (bancos de dados, caches)
- Fluxos de dados (requests, responses)
- Trust boundaries (limites de confiança)

Exemplo:
┌─────────────┐      HTTPS       ┌──────────────┐
│   Cliente   │ ────────────────> │  Web Server  │
│   (Browser) │                   │  (Node.js)   │
└─────────────┘                   └──────┬───────┘
                                         │ TLS
                                         v
                                  ┌──────────────┐
                                  │   Database   │
                                  │  (Postgres)  │
                                  └──────────────┘
```

### 1.4 Limites de Confiança (Trust Boundaries)

| Boundary | Descrição | Ameaças Principais |
|----------|-----------|-------------------|
| Internet → DMZ | Cliente não confiável para zona pública | Spoofing, DoS |
| DMZ → Internal | Zona pública para rede interna | Tampering, Elevation |
| Application → Database | Aplicação para dados persistidos | Information Disclosure |
| User → Admin | Usuário comum para função administrativa | Elevation of Privilege |

---

## 2. Análise STRIDE por Componente

### 2.1 Componente: [Nome do Componente]

**Exemplo**: Módulo de Autenticação

#### Descrição

```markdown
[Descrever o que este componente faz]

Exemplo:
Gerencia autenticação de usuários via email/senha e OAuth (Google, GitHub).
Emite JWT tokens após autenticação bem-sucedida.
```

#### Trust Level

- [ ] Público (não requer autenticação)
- [x] Autenticado (requer login)
- [ ] Privilegiado (requer role específico)
- [ ] Interno (não exposto externamente)

#### 🔴 S - Spoofing (Falsificação de Identidade)

**Ameaça**: Atacante se passa por outro usuário

| ID | Descrição da Ameaça | Probabilidade | Impacto | Risco | Mitigação | Status |
|----|---------------------|---------------|---------|-------|-----------|--------|
| S-001 | Credential stuffing (senhas vazadas) | Alta | Alto | 🔴 Crítico | Rate limiting, MFA, senhas comprometidas bloqueadas | ✅ Mitigado |
| S-002 | Session hijacking (roubo de token) | Média | Alto | 🟠 Alto | HttpOnly cookies, SameSite, TLS | ✅ Mitigado |
| S-003 | Phishing (engenharia social) | Alta | Alto | 🔴 Crítico | MFA, educação do usuário | ⚠️ Parcial |

**Regras Relacionadas**: 041 (Autenticação Segura), 060 (Proteção Spoofing)

#### 🟠 T - Tampering (Adulteração de Dados)

**Ameaça**: Atacante modifica dados em trânsito ou em repouso

| ID | Descrição da Ameaça | Probabilidade | Impacto | Risco | Mitigação | Status |
|----|---------------------|---------------|---------|-------|-----------|--------|
| T-001 | Man-in-the-Middle (MITM) | Baixa | Alto | 🟡 Médio | TLS 1.3, HSTS, certificate pinning | ✅ Mitigado |
| T-002 | Modificação de JWT token | Média | Alto | 🟠 Alto | JWT assinado (RS256), validação no servidor | ✅ Mitigado |
| T-003 | SQL Injection em login | Média | Crítico | 🔴 Crítico | Prepared statements, ORM | ✅ Mitigado |

**Regras Relacionadas**: 050 (SQL Injection), 061 (Proteção Tampering)

#### 🟡 R - Repudiation (Repúdio/Não-Repúdio)

**Ameaça**: Usuário nega ter executado uma ação

| ID | Descrição da Ameaça | Probabilidade | Impacto | Risco | Mitigação | Status |
|----|---------------------|---------------|---------|-------|-----------|--------|
| R-001 | Usuário nega ter feito login | Média | Médio | 🟡 Médio | Logging de eventos de autenticação (IP, timestamp) | ✅ Mitigado |
| R-002 | Usuário nega ter alterado senha | Baixa | Baixo | 🟢 Baixo | Audit trail com user ID, IP, timestamp | ✅ Mitigado |

**Regras Relacionadas**: 059 (Logging Seguro), 062 (Proteção Repudiation)

#### 🔴 I - Information Disclosure (Divulgação de Informação)

**Ameaça**: Atacante obtém informações sensíveis

| ID | Descrição da Ameaça | Probabilidade | Impacto | Risco | Mitigação | Status |
|----|---------------------|---------------|---------|-------|-----------|--------|
| I-001 | Senhas expostas em logs | Baixa | Crítico | 🔴 Crítico | Sanitização de logs, nunca logar senhas | ✅ Mitigado |
| I-002 | Stack trace exposto em erro | Média | Médio | 🟡 Médio | Mensagens genéricas em produção | ✅ Mitigado |
| I-003 | Timing attack em login | Alta | Médio | 🟠 Alto | Timing-safe password comparison | ✅ Mitigado |
| I-004 | Enumeração de usuários | Alta | Baixo | 🟡 Médio | Mensagens genéricas (não revelar se email existe) | ✅ Mitigado |

**Regras Relacionadas**: 046 (Erros Seguros), 063 (Proteção Information Disclosure)

#### 🟠 D - Denial of Service (Negação de Serviço)

**Ameaça**: Atacante torna sistema indisponível

| ID | Descrição da Ameaça | Probabilidade | Impacto | Risco | Mitigação | Status |
|----|---------------------|---------------|---------|-------|-----------|--------|
| D-001 | Brute force de login | Alta | Médio | 🟠 Alto | Rate limiting (5 tentativas/15min), CAPTCHA | ✅ Mitigado |
| D-002 | Regex DoS (ReDoS) | Baixa | Alto | 🟡 Médio | Validação com bibliotecas seguras, timeout | ✅ Mitigado |
| D-003 | DDoS volumétrico | Média | Alto | 🟠 Alto | CloudFlare, rate limiting, auto-scaling | ✅ Mitigado |

**Regras Relacionadas**: 064 (Proteção DoS)

#### 🔴 E - Elevation of Privilege (Elevação de Privilégio)

**Ameaça**: Atacante obtém privilégios não autorizados

| ID | Descrição da Ameaça | Probabilidade | Impacto | Risco | Mitigação | Status |
|----|---------------------|---------------|---------|-------|-----------|--------|
| E-001 | JWT role claim adulterado | Baixa | Crítico | 🔴 Crítico | JWT assinado, validação no servidor | ✅ Mitigado |
| E-002 | Session fixation | Média | Alto | 🟠 Alto | Nova sessão após login | ✅ Mitigado |
| E-003 | IDOR para acessar conta de admin | Baixa | Crítico | 🔴 Crítico | Controle de acesso baseado em roles (RBAC) | ✅ Mitigado |

**Regras Relacionadas**: 043 (Controle de Acesso)

---

### 2.2 Componente: [Nome do Próximo Componente]

**Exemplo**: API de Produtos

#### Descrição

```markdown
[Repetir estrutura STRIDE acima para cada componente crítico]
```

---

## 3. Ameaças por Fluxo de Dados

### 3.1 Fluxo: Cliente → Web Server

**Descrição**: Requisições HTTP do navegador do usuário para o servidor web

#### Ameaças Identificadas

| STRIDE | ID | Ameaça | Mitigação | Status |
|--------|----|---------|-----------|----|---|
| S | S-010 | Session hijacking via XSS | HttpOnly cookies, CSP | ✅ |
| T | T-010 | MITM attack | TLS 1.3, HSTS | ✅ |
| I | I-010 | Packet sniffing | TLS encryption | ✅ |
| D | D-010 | HTTP flood | Rate limiting, CloudFlare | ✅ |

### 3.2 Fluxo: Web Server → Database

**Descrição**: Queries SQL do servidor para banco de dados

#### Ameaças Identificadas

| STRIDE | ID | Ameaça | Mitigação | Status |
|--------|----|---------|-----------|----|---|
| S | S-020 | Spoofing de conexão DB | Credenciais rotacionadas, TLS | ✅ |
| T | T-020 | SQL Injection | Prepared statements, ORM | ✅ |
| I | I-020 | Sniffing de queries | TLS para conexão DB | ✅ |
| R | R-020 | Falta de audit trail | Logging de queries (sem senhas) | ✅ |

---

## 4. Ameaças por Trust Boundary

### 4.1 Boundary: Internet → DMZ

**Componentes Envolvidos**: Load Balancer, Web Server, WAF

#### Controles de Segurança

- [ ] **Firewall**: Apenas portas 80/443 abertas
- [ ] **WAF**: ModSecurity ou CloudFlare WAF
- [ ] **Rate Limiting**: 100 req/s por IP
- [ ] **DDoS Protection**: CloudFlare, auto-scaling
- [ ] **Certificate**: TLS 1.3, Let's Encrypt

#### Ameaças Residuais

| ID | Ameaça | Risco | Plano de Mitigação |
|----|--------|-------|-------------------|
| TB-001 | Zero-day em web server | 🟡 Médio | Atualizações automáticas, WAF |

### 4.2 Boundary: DMZ → Internal Network

**Componentes Envolvidos**: Application Server, Database, Cache

#### Controles de Segurança

- [ ] **Network Segmentation**: VPC, subnets privadas
- [ ] **Security Groups**: Apenas portas necessárias
- [ ] **Bastion Host**: Acesso SSH apenas via bastion
- [ ] **VPN**: Acesso admin via VPN

---

## 5. Matriz de Risco Consolidada

### 5.1 Resumo por Categoria STRIDE

| Categoria | Total Ameaças | Crítico | Alto | Médio | Baixo | Mitigado | Residual |
|-----------|---------------|---------|------|-------|-------|----------|----------|
| **S - Spoofing** | 5 | 2 | 2 | 1 | 0 | 4 | 1 |
| **T - Tampering** | 6 | 3 | 2 | 1 | 0 | 5 | 1 |
| **R - Repudiation** | 3 | 0 | 0 | 2 | 1 | 3 | 0 |
| **I - Info Disclosure** | 8 | 2 | 3 | 2 | 1 | 7 | 1 |
| **D - DoS** | 4 | 0 | 3 | 1 | 0 | 4 | 0 |
| **E - Elevation** | 5 | 3 | 2 | 0 | 0 | 5 | 0 |
| **TOTAL** | **31** | **10** | **12** | **7** | **2** | **28** | **3** |

### 5.2 Top 10 Ameaças por Risco

| Rank | ID | Ameaça | STRIDE | Componente | Risco | Status |
|------|----|---------| -------|-----------|-------|--------|
| 1 | T-003 | SQL Injection | T | Login | 🔴 Crítico | ✅ Mitigado |
| 2 | E-001 | JWT role tampering | E | Auth | 🔴 Crítico | ✅ Mitigado |
| 3 | S-001 | Credential stuffing | S | Auth | 🔴 Crítico | ✅ Mitigado |
| 4 | I-001 | Senhas em logs | I | Logging | 🔴 Crítico | ✅ Mitigado |
| 5 | T-002 | JWT modificado | T | Auth | 🟠 Alto | ✅ Mitigado |
| 6 | I-003 | Timing attack | I | Auth | 🟠 Alto | ✅ Mitigado |
| 7 | D-001 | Brute force | D | Auth | 🟠 Alto | ✅ Mitigado |
| 8 | S-003 | Phishing | S | Social | 🔴 Crítico | ⚠️ Parcial |
| 9 | D-003 | DDoS | D | Infrastructure | 🟠 Alto | ✅ Mitigado |
| 10 | E-003 | IDOR | E | API | 🔴 Crítico | ✅ Mitigado |

---

## 6. Plano de Mitigação

### 6.1 Ameaças Críticas Pendentes

| ID | Ameaça | Componente | Mitigação Planejada | Responsável | Deadline |
|----|--------|-----------|---------------------|-------------|----------|
| S-003 | Phishing | Auth | Implementar MFA obrigatório | Security Team | 2025-Q1 |

### 6.2 Melhorias Futuras

| Prioridade | Melhoria | Justificativa | Esforço | Impacto |
|-----------|---------|---------------|---------|---------|
| Alta | Implementar mTLS entre serviços | Proteger comunicação interna | 3 dias | Alto |
| Média | Adicionar SIEM (Security Information and Event Management) | Detecção de ameaças em tempo real | 2 semanas | Médio |
| Baixa | Penetration testing anual | Validar mitigações | 1 semana | Médio |

---

## 7. Validação e Revisão

### 7.1 Checklist de Validação

- [ ] Todos os componentes críticos analisados
- [ ] Todos os fluxos de dados analisados
- [ ] Todas as trust boundaries analisadas
- [ ] Ameaças críticas mitigadas ou com plano de ação
- [ ] Documentação atualizada
- [ ] Time de segurança revisou

### 7.2 Cronograma de Revisão

| Evento | Frequência | Próxima Data |
|--------|-----------|--------------|
| **Revisão completa** | Anual | 2026-12-16 |
| **Revisão incremental** | Trimestral | 2025-03-16 |
| **Ad-hoc review** | Após mudanças significativas | N/A |

### 7.3 Triggers para Re-avaliação

- [ ] Nova funcionalidade adicionada
- [ ] Mudança de arquitetura
- [ ] Nova integração externa
- [ ] Incidente de segurança
- [ ] Nova vulnerabilidade descoberta
- [ ] Mudança regulatória (GDPR, PCI-DSS)

---

## 8. Rastreabilidade

### 8.1 Mapeamento para OWASP ASVS

| STRIDE | ASVS Domain | Checklist |
|--------|-------------|-----------|
| S - Spoofing | V2 (Authentication) | ✅ V2.1, V2.2, V2.7 |
| T - Tampering | V5 (Validation), V6 (Crypto) | ✅ V5.3, V6.2 |
| R - Repudiation | V7 (Logging) | ✅ V7.2 |
| I - Info Disclosure | V7 (Errors), V8 (Data Protection) | ✅ V7.1, V8.1 |
| D - DoS | V13 (API Security) | ✅ V13.1 (Rate limiting) |
| E - Elevation | V4 (Access Control) | ✅ V4.1, V4.2 |

### 8.2 Mapeamento para Rules

| STRIDE | Rules Aplicáveis |
|--------|------------------|
| S - Spoofing | 041 (Auth), 060 (Spoofing Protection) |
| T - Tampering | 050 (SQL Injection), 061 (Tampering Protection) |
| R - Repudiation | 059 (Logging), 062 (Repudiation Protection) |
| I - Information Disclosure | 046 (Errors), 063 (Info Disclosure Protection) |
| D - Denial of Service | 064 (DoS Protection) |
| E - Elevation | 043 (Access Control) |

### 8.3 Outputs Gerados

- **Especificação**: `specs/08_crosscutting/security/stride-threat-model.md`
- **Diagrama**: `docs/security/threat-model-dfd.png`
- **ADR**: `specs/09_decisions/adrs/ADR-XXX_threat-mitigation-strategy.md`

---

## 9. Ferramentas e Recursos

### 9.1 Ferramentas Recomendadas

- **Microsoft Threat Modeling Tool**: https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling
- **OWASP Threat Dragon**: https://owasp.org/www-project-threat-dragon/
- **IriusRisk**: https://www.iriusrisk.com/
- **Draw.io**: Para criar DFDs manualmente

### 9.2 Referências

- **Microsoft STRIDE**: https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats
- **OWASP Threat Modeling**: https://owasp.org/www-community/Threat_Modeling
- **STRIDE Cheat Sheet**: https://www.microsoft.com/en-us/download/details.aspx?id=58039

---

**Anterior**: [OWASP ASVS](owasp-asvs.md) | **Próximo**: [OWASP Top 10](owasp-top10.md)

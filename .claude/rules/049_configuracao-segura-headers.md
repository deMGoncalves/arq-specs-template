# Configuração Segura de Security Headers

**ID**: SEGURANÇA-049
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Aplicações web devem configurar security headers HTTP (CSP, X-Frame-Options, X-Content-Type-Options, etc) para adicionar camadas de defesa contra XSS, clickjacking e outros ataques.

## Por que importa

Security headers são defesa em profundidade (defense in depth) que reduz impacto de vulnerabilidades mesmo se outras proteções falharem. CSP adequado previne 90% dos ataques XSS. Headers faltantes facilitam clickjacking e MIME sniffing attacks. Configuração leva minutos mas adiciona proteção significativa.

## Critérios Objetivos

- [ ] Content-Security-Policy (CSP) configurado bloqueando inline scripts e limitando origens
- [ ] X-Frame-Options: DENY ou SAMEORIGIN (previne clickjacking)
- [ ] X-Content-Type-Options: nosniff (previne MIME sniffing)
- [ ] Referrer-Policy: no-referrer ou strict-origin-when-cross-origin
- [ ] Permissions-Policy configurado limitando APIs sensíveis (geolocation, camera, microphone)

## Exceções Permitidas

- **Aplicações legadas**: Pode usar CSP em report-only mode inicialmente para evitar quebras
- **Widgets third-party**: CSP pode precisar permitir origens específicas de terceiros confiáveis

## Como Detectar

### Manual

Inspecionar response headers com browser DevTools (Network tab) ou curl. Verificar presença e configuração de cada header de segurança.

### Automático

Security headers scanner como securityheaders.com gera report automatizado. CI/CD pode incluir verificação de headers em testes automatizados.

## Relacionada com

- [042 - Gerenciamento de Sessão](042_gerenciamento-sessao.md): complementa
- [048 - Comunicação Segura TLS](048_comunicacao-segura-tls.md): complementa
- [051 - Prevenção XSS](051_prevencao-xss.md): complementa
- [052 - Prevenção CSRF](052_prevencao-csrf.md): complementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

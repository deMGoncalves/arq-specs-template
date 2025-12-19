# Gerenciamento Seguro de Sessão

**ID**: SEGURANÇA-042
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Sessões devem usar tokens criptograficamente seguros, configurar cookies com flags apropriadas (secure, httpOnly, sameSite), implementar timeout e renovação de sessão após autenticação.

## Por que importa

Gerenciamento inadequado de sessão permite session hijacking, fixation attacks e CSRF. 45% dos ataques web exploram vulnerabilidades de sessão. Cookies sem flags apropriadas são vulneráveis a XSS e man-in-the-middle.

## Critérios Objetivos

- [ ] Session IDs são gerados com CSPRNG (cryptographically secure random number generator)
- [ ] Cookies possuem flags: secure (HTTPS only), httpOnly (não acessível via JavaScript), sameSite=strict
- [ ] Timeout de sessão configurado (15-30 min inatividade, 8-12h absoluto)
- [ ] Session ID é renovado após login bem-sucedido (previne fixation)
- [ ] Logout invalida sessão no servidor (não apenas deleta cookie client-side)

## Exceções Permitidas

- **Desenvolvimento local**: sameSite pode ser 'lax' para permitir testes com http://localhost
- **Remember me**: Pode estender timeout com token refresh seguro

## Como Detectar

### Manual

Revisar configuração de session middleware procurando por flags de cookie e configuração de timeout. Verificar código de login/logout para renovação de session ID.

### Automático

Security headers scanner (como securityheaders.com) detecta configuração incorreta de cookies. Testes automatizados podem verificar flags de Set-Cookie header.

## Relacionada com

- [041 - Autenticação Segura](041_autenticacao-segura.md): complementa
- [048 - Comunicação Segura TLS](048_comunicacao-segura-tls.md): complementa
- [049 - Configuração Segura Headers](049_configuracao-segura-headers.md): complementa
- [052 - Prevenção CSRF](052_prevencao-csrf.md): previne
- [060 - Proteção contra Spoofing](060_protecao-spoofing.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

# Proteção contra Spoofing (STRIDE)

**ID**: SEGURANÇA-060
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Implementar autenticação forte com MFA opcional, prevenir credential stuffing com rate limiting, validar identidade em todas comunicações e usar assinaturas digitais para verificar origem de dados.

## Por que importa

Spoofing permite que atacantes se passem por usuários ou sistemas legítimos, obtendo acesso não autorizado a recursos. 80% dos breaches envolvem credenciais comprometidas. MFA reduz risco de credential stuffing em 99.9%. Assinaturas digitais garantem autenticidade e não-repúdio.

## Critérios Objetivos

- [ ] Autenticação forte implementada com password hashing adequado (Argon2id)
- [ ] MFA disponível para usuários sensíveis (admin, acesso financeiro)
- [ ] Rate limiting em endpoints de autenticação (máximo 5 tentativas/15 minutos)
- [ ] Comunicações inter-serviços usam mutual TLS ou JWT assinado
- [ ] Webhooks e callbacks validam assinatura HMAC de payload

## Exceções Permitidas

- **APIs públicas**: Endpoints totalmente públicos não requerem autenticação (mas devem ter rate limiting)
- **Testes automatizados**: Podem desabilitar rate limiting para executar testes de integração

## Como Detectar

### Manual

Revisar implementação de autenticação verificando algoritmo de hashing, configuração de MFA e rate limiting. Testar com credential stuffing manual.

### Automático

SAST tools verificam uso de algoritmos fracos. Testes automatizados tentam brute force e verificam bloqueio. Monitoring detecta tentativas de login falhadas repetidas.

## Relacionada com

- [041 - Autenticação Segura](041_autenticacao-segura.md): implementa
- [042 - Gerenciamento de Sessão](042_gerenciamento-sessao.md): complementa
- [043 - Controle de Acesso RBAC](043_controle-acesso-rbac.md): complementa
- [064 - Proteção DoS](064_protecao-denial-service.md): complementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

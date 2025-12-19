# Prevenção de Server-Side Request Forgery (SSRF)

**ID**: SEGURANÇA-057
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Aplicações que fazem requests HTTP baseados em input de usuário (webhooks, URL fetch) devem validar URLs com whitelist de domínios permitidos, bloquear IPs privados e implementar network segmentation.

## Por que importa

SSRF permite que atacantes façam servidor acessar recursos internos (metadata service AWS, bancos de dados internos, admin panels) ou scan network interno. 12% das aplicações com funcionalidade de URL fetch são vulneráveis. Pode expor credenciais, fazer port scanning ou acessar serviços não expostos publicamente.

## Critérios Objetivos

- [ ] URLs fornecidas por usuários são validadas contra whitelist de domínios/IPs permitidos
- [ ] IPs privados são bloqueados (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.1, metadata IPs cloud)
- [ ] Resolver DNS e validar IP resultante (prevenir DNS rebinding)
- [ ] Limitar protocolos permitidos (http/https apenas, bloquear file://, gopher://, etc)
- [ ] Implementar timeout e rate limiting para requests externos

## Exceções Permitidas

- **Admin tools**: Ferramentas administrativas podem permitir SSRF controlado para debugging com autenticação forte
- **Webhooks configurados por admin**: Admin pode registrar webhooks internos com validação apropriada

## Como Detectar

### Manual

Code review procurando por bibliotecas HTTP (fetch, axios, request) com URLs construídas de input de usuário. Verificar validação de URL antes de request.

### Automático

DAST tools testam SSRF tentando acessar URLs internas (169.254.169.254, localhost). SAST detecta uso de HTTP clients sem validação de URL.

## Relacionada com

- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa
- [055 - Prevenção XXE](055_prevencao-xxe.md): relacionada
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

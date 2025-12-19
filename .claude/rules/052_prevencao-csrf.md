# Prevenção de Cross-Site Request Forgery (CSRF)

**ID**: SEGURANÇA-052
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Operações state-changing (POST, PUT, DELETE) devem implementar proteção CSRF usando tokens anti-CSRF sincronizados ou double-submit cookies, e validar origin/referer headers.

## Por que importa

CSRF permite que atacante execute ações não autorizadas em nome de usuário vítima (transferências bancárias, mudança de senha, etc). 15% das aplicações web são vulneráveis. Tokens CSRF previnem 99% dos ataques ao garantir que request originou do site legítimo.

## Critérios Objetivos

- [ ] Operações state-changing requerem token CSRF único por sessão ou por request
- [ ] Token CSRF é incluído em form hidden field ou custom header
- [ ] Servidor valida token CSRF antes de executar operação
- [ ] SameSite cookies (strict ou lax) como defesa adicional
- [ ] APIs REST usam custom headers (X-Requested-With) ou token no Authorization header

## Exceções Permitidas

- **APIs públicas stateless**: APIs que não usam cookies de sessão (apenas tokens bearer) não são vulneráveis a CSRF
- **Operações idempotentes GET**: Operações read-only não requerem proteção CSRF

## Como Detectar

### Manual

Revisar forms e handlers de POST/PUT/DELETE verificando validação de token CSRF. Testar remover token e verificar se request é bloqueado.

### Automático

DAST tools testam CSRF tentando submeter forms sem token válido. Testes automatizados podem verificar se middleware CSRF está ativo.

## Relacionada com

- [042 - Gerenciamento de Sessão](042_gerenciamento-sessao.md): complementa
- [049 - Configuração Segura Headers](049_configuracao-segura-headers.md): complementa
- [061 - Proteção Tampering](061_protecao-tampering.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

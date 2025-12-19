# Controle de Acesso Baseado em Papéis (RBAC)

**ID**: SEGURANÇA-043
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Acesso a recursos deve ser controlado por sistema de autorização baseado em papéis (RBAC) ou atributos (ABAC), verificando permissões no servidor antes de executar operações sensíveis.

## Por que importa

Broken Access Control é a vulnerabilidade número 1 do OWASP Top 10 (2021). 94% das aplicações testadas apresentam algum tipo de falha de controle de acesso. Permite acesso não autorizado a dados e funcionalidades críticas.

## Critérios Objetivos

- [ ] Todo endpoint sensível possui middleware de autorização verificando papel/permissão do usuário
- [ ] Verificação de ownership (IDOR prevention): usuário só acessa seus próprios recursos
- [ ] Controle de acesso é deny-by-default (explicitamente permitir, não explicitamente negar)
- [ ] Permissões são verificadas no servidor, nunca confiando apenas em checks client-side
- [ ] Logs de auditoria registram tentativas de acesso negado

## Exceções Permitidas

- **Endpoints públicos**: Recursos públicos documentados (landing pages, assets estáticos) não requerem autenticação
- **Health checks**: Endpoints de monitoramento podem ser liberados para ferramentas internas

## Como Detectar

### Manual

Revisar endpoints sensíveis verificando presença de middleware de autorização. Testar com usuários de diferentes papéis tentando acessar recursos não autorizados.

### Automático

Testes de integração automatizados testam acesso negado para usuários sem permissão. Ferramentas DAST como OWASP ZAP detectam IDOR e broken access control.

## Relacionada com

- [041 - Autenticação Segura](041_autenticacao-segura.md): complementa
- [042 - Gerenciamento de Sessão](042_gerenciamento-sessao.md): complementa
- [060 - Proteção contra Spoofing](060_protecao-spoofing.md): previne
- [061 - Proteção contra Tampering](061_protecao-tampering.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

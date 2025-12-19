# Prevenção de Cross-Site Scripting (XSS)

**ID**: SEGURANÇA-051
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Aplicações devem prevenir XSS usando template engines com auto-escaping, Content Security Policy (CSP), e sanitização de input rico (HTML). Nunca inserir dados não confiáveis diretamente no DOM.

## Por que importa

XSS permite execução de JavaScript malicioso no navegador da vítima, possibilitando roubo de sessões, keylogging, phishing e defacement. É responsável por 30% das vulnerabilidades web. Auto-escaping e CSP previnem 95% dos ataques XSS.

## Critérios Objetivos

- [ ] Template engines com auto-escaping habilitado (React JSX, Vue, Angular, Handlebars)
- [ ] Content-Security-Policy header bloqueia inline scripts e eval
- [ ] HTML rico é sanitizado com biblioteca dedicada (DOMPurify) antes de renderizar
- [ ] Evitar APIs perigosas: innerHTML, dangerouslySetInnerHTML, document.write, eval
- [ ] Input de usuário é tratado como texto, não código executável

## Exceções Permitidas

- **Rich text editors**: Conteúdo HTML deliberadamente rico deve usar sanitizador com whitelist de tags permitidas
- **Admin interfaces**: Usuários admin confiáveis podem ter permissão para inserir HTML em contextos específicos

## Como Detectar

### Manual

Code review procurando por innerHTML, dangerouslySetInnerHTML ou interpolação de variáveis em contextos HTML sem escaping.

### Automático

SAST tools detectam uso de APIs perigosas. DAST tools como OWASP ZAP testam XSS injetando payloads em todos inputs. DOM-based XSS scanner específico para JavaScript frameworks.

## Relacionada com

- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa
- [044 - Sanitização de Output](044_sanitizacao-output-contexto.md): implementa
- [049 - Configuração Segura Headers](049_configuracao-segura-headers.md): complementa
- [061 - Proteção Tampering](061_protecao-tampering.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

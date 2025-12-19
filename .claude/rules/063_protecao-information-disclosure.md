# Proteção contra Information Disclosure (STRIDE)

**ID**: SEGURANÇA-063
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Prevenir vazamento de informações sensíveis através de mensagens de erro genéricas, criptografia de dados em repouso e trânsito, controle de acesso apropriado e remoção de comentários/metadata de código em produção.

## Por que importa

Information Disclosure expõe dados sensíveis (PII, credenciais, estrutura interna) facilitando ataques subsequentes. 40% dos breaches envolvem exposição de dados não criptografados. Stack traces e error messages detalhadas revelam versões de frameworks e paths de arquivos. Criptografia e error handling adequados previnem exposure.

## Critérios Objetivos

- [ ] Mensagens de erro são genéricas para usuários (sem stack traces, paths, versões)
- [ ] Dados sensíveis são criptografados em repouso (AES-256-GCM) e trânsito (TLS 1.3)
- [ ] Logs não contêm PII ou dados sensíveis não mascarados
- [ ] Comentários de código e debugging info são removidos em builds de produção
- [ ] Security headers configurados (X-Powered-By removido, Server header genérico)

## Exceções Permitidas

- **Ambiente de desenvolvimento**: Pode exibir stack traces e informações detalhadas para facilitar debugging
- **Usuários admin**: Podem ter acesso a informações técnicas adicionais com autenticação forte

## Como Detectar

### Manual

Revisar error handlers e responses de API verificando ausência de informações sensíveis. Testar forçar erros e verificar responses.

### Automático

DAST tools analisam responses procurando por information disclosure. Secret scanners verificam logs e código por dados sensíveis.

## Relacionada com

- [045 - Criptografia de Dados](045_criptografia-dados-aes256.md): implementa
- [046 - Tratamento de Erros Seguro](046_tratamento-erros-seguro.md): implementa
- [047 - Proteção de Dados Sensíveis](047_protecao-dados-sensiveis.md): implementa
- [048 - Comunicação Segura TLS](048_comunicacao-segura-tls.md): implementa
- [053 - Prevenção Path Traversal](053_prevencao-path-traversal.md): previne disclosure
- [055 - Prevenção XXE](055_prevencao-xxe.md): previne disclosure
- [057 - Prevenção SSRF](057_prevencao-ssrf.md): previne disclosure
- [059 - Logging Seguro](059_logging-seguro-sem-pii.md): implementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

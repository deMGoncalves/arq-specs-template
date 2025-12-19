# Proteção contra Tampering (STRIDE)

**ID**: SEGURANÇA-061
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Proteger integridade de dados usando checksums, assinaturas digitais, HMAC para mensagens, input validation para prevenir injection attacks, e imutabilidade de dados críticos.

## Por que importa

Tampering permite modificação não autorizada de dados em trânsito ou em repouso, causando corrupção de dados, fraude financeira ou execução de código malicioso. SQL Injection e XSS são formas de tampering. HMAC e signatures previnem modificação não detectada.

## Critérios Objetivos

- [ ] Dados críticos (transações financeiras, audit logs) são append-only ou imutáveis
- [ ] Mensagens entre serviços incluem HMAC ou assinatura digital
- [ ] Input validation com whitelist previne injection (SQL, XSS, Command)
- [ ] Arquivos sensíveis têm checksum verificado antes de processar
- [ ] Banco de dados usa row-level checksums ou version tracking para detectar modificações

## Exceções Permitidas

- **Performance crítica**: Checksums podem ser opcionais para dados não críticos em trocas internas de alta frequência
- **Dados efêmeros**: Cache temporário pode não ter proteção de integridade se loss é aceitável

## Como Detectar

### Manual

Revisar código que persiste ou transmite dados críticos verificando uso de HMAC, signatures ou checksums. Verificar imutabilidade de audit logs.

### Automático

Testes automatizados tentam modificar dados e verificam se modificação é detectada. SAST detecta injection vulnerabilities.

## Relacionada com

- [040 - Validação de Input](040_validacao-input-whitelist.md): previne tampering via injection
- [044 - Sanitização de Output](044_sanitizacao-output-contexto.md): previne tampering via injection
- [048 - Comunicação Segura TLS](048_comunicacao-segura-tls.md): previne tampering em trânsito
- [050 - Prevenção SQL Injection](050_prevencao-sql-injection.md): previne tampering
- [051 - Prevenção XSS](051_prevencao-xss.md): previne tampering

---

**Criada em**: 2025-12-16
**Versão**: 1.0

# Prevenção de XML External Entity (XXE)

**ID**: SEGURANÇA-055
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Parsers XML devem desabilitar resolução de entidades externas (external entities) e DTD processing para prevenir ataques XXE que podem expor arquivos do sistema ou causar DoS.

## Por que importa

XXE permite que atacantes leiam arquivos locais (/etc/passwd), façam SSRF para sistemas internos ou causem DoS com billion laughs attack. 10% das aplicações que processam XML são vulneráveis. Desabilitar external entities é configuração simples que previne completamente o ataque.

## Critérios Objetivos

- [ ] Parsers XML têm external entities desabilitadas (libxml: noent=false, resolve_externals=false)
- [ ] DTD processing é desabilitado se não necessário
- [ ] Se DTD é necessário, usar whitelist de DTDs permitidas
- [ ] Preferir JSON sobre XML para novos designs de API
- [ ] Validar XML contra schema (XSD) antes de processar

## Exceções Permitidas

- **APIs SOAP legadas**: Podem requerer external entities para schemas W3C padrões com configuração controlada
- **XML Signing**: Alguns padrões de assinatura digital XML requerem external references limitadas

## Como Detectar

### Manual

Revisar configuração de XML parsers verificando flags de external entities e DTD processing. Procurar por uso de bibliotecas XML e verificar documentação de configuração segura.

### Automático

SAST tools detectam configuração insegura de XML parsers. DAST tools enviam payloads XXE para testar vulnerabilidade.

## Relacionada com

- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa
- [057 - Prevenção SSRF](057_prevencao-ssrf.md): previne
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

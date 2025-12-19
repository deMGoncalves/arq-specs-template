# Comunicação Segura com TLS 1.3

**ID**: SEGURANÇA-048
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Toda comunicação com dados sensíveis deve usar TLS 1.3 ou 1.2 (mínimo), desabilitar protocolos inseguros (SSL, TLS 1.0/1.1), usar cipher suites fortes e implementar certificate pinning em apps móveis.

## Por que importa

Comunicação sem TLS ou com TLS mal configurado expõe dados a ataques man-in-the-middle. 25% das aplicações ainda usam TLS 1.0/1.1 vulnerável. TLS 1.3 elimina cipher suites fracos e reduz handshake latency. Certificados auto-assinados e cipher suites fracos permitem interception.

## Critérios Objetivos

- [ ] TLS 1.3 preferencial, TLS 1.2 mínimo (SSL e TLS 1.0/1.1 desabilitados)
- [ ] Cipher suites fortes apenas (AES-GCM, ChaCha20-Poly1305) sem RC4, DES, export ciphers
- [ ] Certificados válidos de CA confiável (não auto-assinados em produção)
- [ ] HSTS header configurado com max-age mínimo de 1 ano
- [ ] Apps móveis implementam certificate pinning ou public key pinning

## Exceções Permitidas

- **Desenvolvimento local**: localhost pode usar HTTP para facilitar debugging
- **APIs internas**: Comunicação dentro de VPC privada pode relaxar alguns requisitos se houver network isolation

## Como Detectar

### Manual

Verificar configuração de servidor web (nginx, Apache) e frameworks. Testar endpoints com ssllabs.com/ssltest para validar configuração TLS.

### Automático

Security headers scanner verifica HSTS. SAST tools detectam uso de protocolos inseguros no código. Ferramentas como testssl.sh automatizam testes de configuração TLS.

## Relacionada com

- [042 - Gerenciamento de Sessão](042_gerenciamento-sessao.md): complementa
- [045 - Criptografia de Dados](045_criptografia-dados-aes256.md): complementa
- [049 - Configuração Segura Headers](049_configuracao-segura-headers.md): complementa
- [061 - Proteção Tampering](061_protecao-tampering.md): previne
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

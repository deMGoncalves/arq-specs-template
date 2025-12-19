# Autenticação Segura com Password Hashing

**ID**: SEGURANÇA-041
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Senhas devem ser armazenadas usando algoritmos de hashing modernos e resistentes a força bruta (Argon2id, bcrypt ou scrypt) com salt único por senha e work factor apropriado.

## Por que importa

Senhas em texto plano ou com hashing fraco (MD5, SHA1) permitem que atacantes obtenham credenciais em caso de vazamento de banco de dados. 81% dos vazamentos exploram senhas fracas ou mal protegidas. Argon2id é resistente a ataques GPU e ASIC.

## Critérios Objetivos

- [ ] Senhas são hasheadas com Argon2id (preferencial), bcrypt (work factor ≥12) ou scrypt
- [ ] Cada senha possui salt único gerado automaticamente pela biblioteca
- [ ] Work factor/cost é configurado para ~500ms de latência em servidor de produção
- [ ] Senhas nunca são logadas, armazenadas em texto plano ou transmitidas sem HTTPS
- [ ] Implementação usa biblioteca criptográfica auditada (não implementação customizada)

## Exceções Permitidas

- **Testes unitários**: Podem usar mock de hashing para performance
- **Migrações legacy**: Sistema antigo pode usar bcrypt temporariamente antes de migrar para Argon2id

## Como Detectar

### Manual

Revisar código de autenticação procurando por uso de bibliotecas de hashing apropriadas. Verificar ausência de MD5, SHA1 ou armazenamento em texto plano.

### Automático

SAST tools como Semgrep detectam uso de algoritmos fracos. ESLint rule customizada pode bloquear imports de crypto.createHash com algoritmos inseguros.

## Relacionada com

- [030 - Proibição de Funções Inseguras](030_proibicao-funcoes-inseguras.md): complementa
- [042 - Gerenciamento de Sessão](042_gerenciamento-sessao.md): complementa
- [045 - Criptografia de Dados](045_criptografia-dados-aes256.md): relacionada
- [060 - Proteção contra Spoofing](060_protecao-spoofing.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

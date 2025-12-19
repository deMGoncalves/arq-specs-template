# Criptografia de Dados com AES-256-GCM

**ID**: SEGURANÇA-045
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Dados sensíveis em repouso devem ser criptografados com algoritmo moderno (AES-256-GCM), usando initialization vectors (IVs) únicos e aleatórios, com chaves armazenadas em serviço de gerenciamento de segredos.

## Por que importa

Dados não criptografados em backups, logs ou banco de dados são facilmente expostos em caso de vazamento. Criptografia em repouso protege confidencialidade mesmo se atacante obtém acesso físico ao storage. AES-256-GCM é padrão da indústria e resistente a ataques conhecidos.

## Critérios Objetivos

- [ ] Dados sensíveis (PII, credenciais, tokens) são criptografados com AES-256-GCM antes de armazenar
- [ ] IV (Initialization Vector) é único e aleatório para cada operação de criptografia
- [ ] Chaves de criptografia são armazenadas em serviço externo (AWS KMS, Azure Key Vault, HashiCorp Vault)
- [ ] Rotação de chaves é implementada com re-encriptação ou key versioning
- [ ] Algoritmos fracos (DES, 3DES, RC4, AES-ECB) são proibidos

## Exceções Permitidas

- **Dados públicos**: Informações não sensíveis que serão disponibilizadas publicamente não requerem criptografia
- **Performance crítica**: Campos de alta performance podem usar criptografia seletiva apenas em campos sensíveis

## Como Detectar

### Manual

Revisar código que persiste dados sensíveis verificando chamadas a bibliotecas de criptografia. Verificar configuração de banco de dados para encryption-at-rest.

### Automático

SAST tools detectam uso de algoritmos fracos. Secret scanners identificam chaves hardcoded no código.

## Relacionada com

- [030 - Proibição de Funções Inseguras](030_proibicao-funcoes-inseguras.md): complementa
- [041 - Autenticação Segura](041_autenticacao-segura.md): relacionada
- [047 - Proteção de Dados Sensíveis](047_protecao-dados-sensiveis.md): complementa
- [048 - Comunicação Segura TLS](048_comunicacao-segura-tls.md): complementa
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

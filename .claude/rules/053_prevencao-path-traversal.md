# Prevenção de Path Traversal

**ID**: SEGURANÇA-053
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Operações de filesystem devem validar e sanitizar paths de arquivo fornecidos por usuários, prevenir navegação fora de diretórios permitidos (\.\./), e usar whitelist de paths ou canonical paths.

## Por que importa

Path traversal permite que atacantes leiam arquivos sensíveis do sistema (/etc/passwd, código fonte, configurações) ou sobrescrevam arquivos críticos. 20% das vulnerabilidades de file upload incluem path traversal. Pode levar a RCE (Remote Code Execution) se combined com file upload.

## Critérios Objetivos

- [ ] Filenames de usuário são sanitizados removendo caracteres perigosos (\.\., /, \\, null bytes)
- [ ] Operações de arquivo usam canonical path resolution e validam que resultado está dentro de diretório permitido
- [ ] Paths são construídos com path.join() ou equivalente seguro, não concatenação de strings
- [ ] Whitelist de extensões permitidas para file uploads
- [ ] Symlinks são resolvidos e validados contra directory traversal

## Exceções Permitidas

- **Admin file managers**: Interfaces administrativas podem permitir navegação completa de filesystem com autenticação forte
- **Ferramentas de desenvolvimento**: IDEs e editores podem ter acesso filesystem amplo

## Como Detectar

### Manual

Code review procurando por operações fs.readFile, fs.writeFile com paths construídos de input de usuário. Verificar uso de path.resolve e validação de bounds.

### Automático

SAST tools detectam path traversal patterns. DAST tools testam injetando payloads com \.\../ em parâmetros de filename.

## Relacionada com

- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa
- [054 - Prevenção Command Injection](054_prevencao-command-injection.md): similar
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): previne

---

**Criada em**: 2025-12-16
**Versão**: 1.0

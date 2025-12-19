# CWE Top 25 - Most Dangerous Software Weaknesses

**ID do Template**: TPL-SEC-004
**Versão**: 1.0.0
**Categoria**: Security
**Framework**: CWE Top 25 (2023)
**Usado Por**: security-analyst (Fase 4: Implementation / Fase 5: Testing)
**Última Atualização**: 2025-12-16

---

## Propósito

Este template documenta a análise de vulnerabilidades contra as **25 fraquezas de software mais perigosas** do MITRE CWE, focando em detecção e remediação no código.

---

## Top 10 Críticas

### [1] CWE-79: Cross-site Scripting (XSS)

**Score**: 63.72 | **OWASP**: A03 | **Regra**: 051

#### Descrição
Aplicação não valida ou escapa inputs antes de exibir em HTML, permitindo execução de JavaScript malicioso.

#### Variantes
- **Reflected XSS**: Input refletido imediatamente (URL, form)
- **Stored XSS**: Input armazenado no BD e exibido depois
- **DOM-based XSS**: Manipulação insegura do DOM via JavaScript

#### Detecção
```typescript
// ❌ VULNERÁVEL
app.get('/search', (req, res) => {
  res.send(`<h1>Results for: ${req.query.q}</h1>`);
});

// ✅ CORRIGIDO
import DOMPurify from 'dompurify';
app.get('/search', (req, res) => {
  const clean = DOMPurify.sanitize(req.query.q);
  res.send(`<h1>Results for: ${clean}</h1>`);
});
```

#### Testes
```bash
# XSS Test
curl "https://api.example.com/search?q=<script>alert(1)</script>"
# Esperado: &lt;script&gt;alert(1)&lt;/script&gt;
```

#### Mitigação
- [ ] Escapar output conforme contexto (HTML, JS, CSS, URL)
- [ ] Content Security Policy (CSP)
- [ ] X-XSS-Protection header
- [ ] Regra 051 aplicada

---

### [2] CWE-89: SQL Injection

**Score**: 58.57 | **OWASP**: A03 | **Regra**: 050

#### Descrição
Consultas SQL construídas com concatenação de strings não sanitizadas.

#### Detecção
```typescript
// ❌ VULNERÁVEL
const query = `SELECT * FROM users WHERE email = '${email}'`;
db.execute(query);

// ✅ CORRIGIDO (Prepared Statement)
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [email]);

// ✅ CORRIGIDO (ORM)
await prisma.user.findUnique({ where: { email } });
```

#### Testes
```bash
# SQL Injection Test
curl -X POST https://api.example.com/login \
  -d "email=admin'--&password=any"
# Esperado: 400 Bad Request (validation error)
```

#### Mitigação
- [ ] Usar prepared statements ou ORM
- [ ] Validar input (whitelist)
- [ ] Princípio do menor privilégio (DB user)
- [ ] Regra 050 aplicada

---

### [3] CWE-20: Improper Input Validation

**Score**: 54.16 | **OWASP**: A03, A04 | **Regra**: 040

#### Descrição
Aplicação não valida input antes de processar, permitindo injection, DoS, etc.

#### Detecção
```typescript
// ❌ VULNERÁVEL
app.post('/user', (req, res) => {
  const { age } = req.body;
  db.save({ age }); // age pode ser "abc", -1, 999999
});

// ✅ CORRIGIDO
import Joi from 'joi';
const schema = Joi.object({
  age: Joi.number().integer().min(0).max(150).required()
});

app.post('/user', (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  db.save(value);
});
```

#### Mitigação
- [ ] Validação em todas as entradas (API, forms, files)
- [ ] Whitelist (não blacklist)
- [ ] Schema validation (Joi, Zod, JSON Schema)
- [ ] Regra 040 aplicada

---

### [4] CWE-78: OS Command Injection

**Score**: 46.33 | **OWASP**: A03 | **Regra**: 054

#### Descrição
Aplicação executa comandos shell com input não sanitizado.

#### Detecção
```typescript
// ❌ VULNERÁVEL
const { exec } = require('child_process');
exec(`convert ${userFile} output.png`); // userFile = "input.jpg; rm -rf /"

// ✅ CORRIGIDO
const { execFile } = require('child_process');
execFile('convert', [userFile, 'output.png']); // Argumentos separados
```

#### Mitigação
- [ ] Evitar shell commands (usar APIs nativas)
- [ ] Se necessário, usar `execFile` com array de args
- [ ] Validar input (whitelist de caracteres)
- [ ] Regra 054 aplicada

---

### [5] CWE-352: Cross-Site Request Forgery (CSRF)

**Score**: 41.71 | **OWASP**: A01 | **Regra**: 052

#### Descrição
Aplicação não verifica se requisição vem do próprio site.

#### Detecção
```typescript
// ❌ VULNERÁVEL
app.post('/transfer', (req, res) => {
  const { to, amount } = req.body;
  transferMoney(req.user, to, amount); // Sem verificação de origem
});

// ✅ CORRIGIDO
import csrf from 'csurf';
app.use(csrf({ cookie: true }));

app.post('/transfer', (req, res) => {
  // Token CSRF validado automaticamente pelo middleware
  transferMoney(req.user, req.body.to, req.body.amount);
});
```

#### Mitigação
- [ ] CSRF tokens em forms
- [ ] SameSite cookies (Strict ou Lax)
- [ ] Verificar Origin/Referer headers
- [ ] Regra 052 aplicada

---

### [6] CWE-434: Unrestricted Upload of File with Dangerous Type

**Score**: 38.72 | **OWASP**: A04 | **Regra**: 053

#### Descrição
Aplicação permite upload de arquivos maliciosos (.exe, .php, .jsp).

#### Detecção
```typescript
// ❌ VULNERÁVEL
app.post('/upload', upload.single('file'), (req, res) => {
  fs.writeFileSync(`./uploads/${req.file.originalname}`, req.file.buffer);
});

// ✅ CORRIGIDO
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

app.post('/upload', upload.single('file'), (req, res) => {
  if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'File type not allowed' });
  }
  if (req.file.size > MAX_SIZE) {
    return res.status(400).json({ error: 'File too large' });
  }

  // Renomear com UUID
  const safeFilename = `${uuidv4()}.${req.file.mimetype.split('/')[1]}`;
  fs.writeFileSync(`./uploads/${safeFilename}`, req.file.buffer);
});
```

#### Mitigação
- [ ] Whitelist de tipos permitidos (MIME + magic bytes)
- [ ] Tamanho máximo
- [ ] Renomear arquivo (UUID)
- [ ] Armazenar fora do webroot
- [ ] Scanear com antivírus
- [ ] Regra 053 aplicada

---

### [7] CWE-798: Use of Hard-coded Credentials

**Score**: 36.20 | **OWASP**: A02 | **Regra**: 045

#### Descrição
Credenciais ou chaves hardcoded no código.

#### Detecção
```typescript
// ❌ VULNERÁVEL
const dbPassword = 'SuperSecret123!';
const apiKey = 'sk-1234567890abcdef';

// ✅ CORRIGIDO
const dbPassword = process.env.DB_PASSWORD;
const apiKey = process.env.API_KEY;

// Ou AWS Secrets Manager
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const secret = await client.send(new GetSecretValueCommand({ SecretId: 'db-password' }));
```

#### Mitigação
- [ ] Usar variáveis de ambiente
- [ ] Secrets Manager (AWS, HashiCorp Vault)
- [ ] Rotação periódica de secrets
- [ ] Regra 045 aplicada

---

### [8] CWE-862: Missing Authorization

**Score**: 35.33 | **OWASP**: A01 | **Regra**: 043

#### Descrição
Aplicação não verifica se usuário tem permissão para acessar recurso.

#### Detecção
```typescript
// ❌ VULNERÁVEL
app.get('/users/:id', (req, res) => {
  const user = db.find(req.params.id);
  res.json(user); // Qualquer um pode acessar qualquer usuário
});

// ✅ CORRIGIDO
app.get('/users/:id', authenticate, (req, res) => {
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = db.find(req.params.id);
  res.json(user);
});
```

#### Mitigação
- [ ] Verificar autorização em TODOS os endpoints
- [ ] RBAC (Role-Based Access Control)
- [ ] Deny-by-default
- [ ] Regra 043 aplicada

---

### [9] CWE-639: Insecure Direct Object Reference (IDOR)

**Score**: 34.09 | **OWASP**: A01 | **Regra**: 043

#### Descrição
IDs de recursos expostos sem verificação de ownership.

#### Detecção
```typescript
// ❌ VULNERÁVEL
app.get('/orders/:orderId', (req, res) => {
  const order = db.orders.find(req.params.orderId);
  res.json(order); // Usuário pode ver pedidos de outros
});

// ✅ CORRIGIDO
app.get('/orders/:orderId', authenticate, async (req, res) => {
  const order = await db.orders.findUnique({
    where: {
      id: req.params.orderId,
      userId: req.user.id // Verifica ownership
    }
  });
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});
```

#### Mitigação
- [ ] Validar ownership de recursos
- [ ] UUIDs ao invés de IDs sequenciais
- [ ] Access control em queries
- [ ] Regra 043 aplicada

---

### [10] CWE-22: Path Traversal

**Score**: 32.46 | **OWASP**: A01 | **Regra**: 053

#### Descrição
Aplicação não valida paths de arquivo, permitindo acesso a arquivos sensíveis.

#### Detecção
```typescript
// ❌ VULNERÁVEL
app.get('/download', (req, res) => {
  const file = req.query.file;
  res.sendFile(`/uploads/${file}`); // file = "../../etc/passwd"
});

// ✅ CORRIGIDO
import path from 'path';
app.get('/download', (req, res) => {
  const file = req.query.file;
  const safePath = path.normalize(file).replace(/^(\.\.(\/|\\|$))+/, '');
  const fullPath = path.join('/uploads', safePath);

  if (!fullPath.startsWith('/uploads/')) {
    return res.status(400).json({ error: 'Invalid path' });
  }
  res.sendFile(fullPath);
});
```

#### Mitigação
- [ ] Validar e normalizar paths
- [ ] Whitelist de diretórios permitidos
- [ ] Não usar input direto em file operations
- [ ] Regra 053 aplicada

---

## Resumo Top 25

| Rank | CWE | Name | Score | OWASP | Regra | Status |
|------|-----|------|-------|-------|-------|--------|
| 1 | CWE-79 | XSS | 63.72 | A03 | 051 | [ ] |
| 2 | CWE-89 | SQL Injection | 58.57 | A03 | 050 | [ ] |
| 3 | CWE-20 | Input Validation | 54.16 | A03 | 040 | [ ] |
| 4 | CWE-78 | Command Injection | 46.33 | A03 | 054 | [ ] |
| 5 | CWE-352 | CSRF | 41.71 | A01 | 052 | [ ] |
| 6 | CWE-434 | File Upload | 38.72 | A04 | 053 | [ ] |
| 7 | CWE-798 | Hardcoded Creds | 36.20 | A02 | 045 | [ ] |
| 8 | CWE-862 | Missing AuthZ | 35.33 | A01 | 043 | [ ] |
| 9 | CWE-639 | IDOR | 34.09 | A01 | 043 | [ ] |
| 10 | CWE-22 | Path Traversal | 32.46 | A01 | 053 | [ ] |
| 11 | CWE-77 | Command Injection (Generic) | 30.87 | A03 | 054 | [ ] |
| 12 | CWE-306 | Missing Authentication | 30.61 | A07 | 041 | [ ] |
| 13 | CWE-502 | Deserialization | 29.41 | A08 | 056 | [ ] |
| 14 | CWE-287 | Improper Authentication | 28.70 | A07 | 041 | [ ] |
| 15 | CWE-918 | SSRF | 28.52 | A10 | 057 | [ ] |
| 16 | CWE-94 | Code Injection | 27.35 | A03 | 054 | [ ] |
| 17 | CWE-476 | NULL Pointer Dereference | 26.83 | - | - | [ ] |
| 18 | CWE-269 | Privilege Management | 25.88 | A01 | 043 | [ ] |
| 19 | CWE-125 | Out-of-bounds Read | 25.74 | - | - | [ ] |
| 20 | CWE-863 | Incorrect Authorization | 24.90 | A01 | 043 | [ ] |
| 21 | CWE-732 | Incorrect Permissions | 24.48 | A01 | 043 | [ ] |
| 22 | CWE-611 | XXE | 23.85 | A05 | 055 | [ ] |
| 23 | CWE-276 | Incorrect Permissions | 23.34 | A01 | 043 | [ ] |
| 24 | CWE-190 | Integer Overflow | 22.94 | - | 040 | [ ] |
| 25 | CWE-327 | Broken Crypto | 22.25 | A02 | 045 | [ ] |

**Total Mitigado**: 0/25 (0%)

---

## Ferramentas de Detecção

### SAST (Static)
- **SonarQube**: Detecta CWE-79, 89, 20, 78, etc
- **Semgrep**: Rules customizadas por CWE
- **Checkmarx**: Commercial, cobertura ampla

### DAST (Dynamic)
- **OWASP ZAP**: Automated scanner
- **Burp Suite**: Manual + automated
- **Nikto**: Web server scanner

### Dependency
- **npm audit**: Vulnerabilidades em deps
- **Snyk**: SCA + container scanning
- **OWASP Dependency-Check**: Multi-linguagem

---

## Priorização de Remediação

### Fase 1: Crítico (Imediato)
- [ ] CWE-89 (SQL Injection)
- [ ] CWE-79 (XSS)
- [ ] CWE-798 (Hardcoded Creds)
- [ ] CWE-502 (Deserialization)
- [ ] CWE-918 (SSRF)

### Fase 2: Alto (30 dias)
- [ ] CWE-20 (Input Validation)
- [ ] CWE-78 (Command Injection)
- [ ] CWE-352 (CSRF)
- [ ] CWE-862/863 (Missing Authorization)

### Fase 3: Médio (90 dias)
- [ ] CWE-22 (Path Traversal)
- [ ] CWE-434 (File Upload)
- [ ] CWE-611 (XXE)
- [ ] CWE-327 (Weak Crypto)

---

## Referências

- **CWE Top 25 (2023)**: https://cwe.mitre.org/top25/
- **CWE Database**: https://cwe.mitre.org/
- **Regras**: 040-059 em `.claude/rules/`
- **Output**: `specs/11_risks/vulnerability-analysis.md`

---

**Anterior**: [OWASP Top 10](owasp-top10.md) | **Próximo**: [NIST SSDF](nist-ssdf.md)

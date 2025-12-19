# Security Analyst - Examples

**Version**: 1.0.0

---

## Example 1: Threat Modeling for E-commerce App

### Input (Architecture)
- Components: Web App, API Gateway, Auth Service, Payment Service, Database
- Sensitive Data: Credit cards, PII, passwords
- External integrations: Stripe, SendGrid

### STRIDE Analysis

**S - Spoofing**: Credential stuffing attack
- **Mitigação**: Rate limiting (5/15min), MFA, HIBP check
- **Regra**: 041, 060

**T - Tampering**: JWT token modification
- **Mitigação**: JWT assinado com RS256, validação no servidor
- **Regra**: 061

**I - Information Disclosure**: Stack traces exposed
- **Mitigação**: Mensagens genéricas em prod, logs detalhados apenas no servidor
- **Regra**: 046, 063

**D - Denial of Service**: Brute force login
- **Mitigação**: Rate limiting, CAPTCHA após 5 falhas
- **Regra**: 060, 064

### Output
`specs/08_crosscutting/security/stride-threat-model.md` com 15 ameaças identificadas, 12 mitigadas, 3 aceitas com justificativa.

---

## Example 2: OWASP ASVS Validation

### Scenario
API REST para gerenciamento de usuários (CRUD).

### V2. Autenticação
- [x] V2.1.1: Senha mínimo 12 caracteres ✅
- [x] V2.3.1: Argon2id configurado (work factor 4) ✅
- [x] V2.7.1: Rate limiting 5/15min ✅

### V4. Controle de Acesso
- [x] V4.1.1: RBAC implementado (admin, user) ✅
- [x] V4.2.1: IDOR prevention (verificar userId) ✅

### V5. Validação
- [x] V5.1.1: Input validation com Joi ✅

**Result**: 6/6 checks PASSED ✅

---

## Example 3: Security Rule Violation Detection

### Scan Results

**Regra 040 Violation**: Endpoint sem validação
```bash
$ grep -r "router.post" src/ | xargs grep -L "validate"
src/api/products.ts  # ❌ Missing validation
```

**Fix**:
```typescript
import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().max(255).required(),
  price: Joi.number().positive().required()
});

app.post('/products', (req, res) => {
  const { error, value } = createProductSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  // ...
});
```

**Regra 041 Violation**: Weak password hashing
```typescript
// ❌ Before
const hash = crypto.createHash('sha256').update(password).digest('hex');

// ✅ After
import argon2 from 'argon2';
const hash = await argon2.hash(password, { timeCost: 4 });
```

---

## Example 4: SAST/DAST Integration

### CI/CD Pipeline

```.github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm audit --audit-level=high
      - run: npx semgrep --config=auto src/

  dast:
    runs-on: ubuntu-latest
    steps:
      - run: docker run -t owasp/zap2docker-stable zap-baseline.py -t https://staging.example.com
```

**Results**:
- SAST: 0 critical, 1 medium (dependency update)
- DAST: 0 high risk, 2 info (headers missing)

---

**Version**: 1.0.0

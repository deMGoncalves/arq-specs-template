# Security Analyst - Troubleshooting

**Version**: 1.0.0

---

## Issue 1: SAST Tool Returns False Positives

### Symptom
Semgrep reports SQL injection but code uses ORM.

### Solution
Add `// nosemgrep` comment with justification:
```typescript
// nosemgrep: javascript.lang.security.audit.sql-injection.sql-injection
// Using Prisma ORM with parameterized queries
const user = await prisma.user.findUnique({ where: { id } });
```

---

## Issue 2: Rate Limiting Not Working

### Symptom
Can make 100 requests rapidly without being blocked.

### Diagnosis
Check if rate limiter middleware is applied:
```typescript
// ❌ Wrong order
app.use(routes);
app.use(rateLimiter); // Too late!

// ✅ Correct order
app.use(rateLimiter);
app.use(routes);
```

---

## Issue 3: OWASP ASVS Checklist Too Large

### Problem
1000+ checks for complex app.

### Solution
**Phase 3**: Focus on Level 2 (standard) - 300 checks
**Phase 5**: Validate Level 1 (opportunistic) - 150 checks
**Phase 7**: Audit Level 3 (high assurance) - full 1000 checks

---

## Issue 4: Threat Model Incomplete

### Symptom
Only 5 threats identified for 20-component system.

### Solution
Use systematic approach:
1. **Per component**: Apply STRIDE to EACH component
2. **Per data flow**: Apply STRIDE to EACH flow
3. **Per trust boundary**: Apply STRIDE to EACH boundary

Expected: 50-100 threats for medium app.

---

## Issue 5: Security Rules Conflict with Functionality

### Example
Regra 064 (Rate Limiting) blocks legitimate batch API calls.

### Solution
**Exceção documentada**:
```markdown
## Exceção: Regra 064
**Endpoint**: /api/batch-upload
**Justificativa**: Batch upload requer 1000 requests/min
**Mitigação alternativa**: API key authentication, monitoring
**Aprovado por**: Security Lead, 2025-12-16
```

---

## Issue 6: DAST Scan Breaks Staging

### Problem
OWASP ZAP scan creates 10,000 test users.

### Solution
1. Use read-only test account
2. Run ZAP in safe mode: `--config scan.safe=true`
3. Cleanup script after scan

---

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `npm audit` shows 100 vulnerabilities | Old dependencies | Run `npm audit fix` |
| CORS error in DAST | Scan from different origin | Whitelist ZAP IP |
| JWT signature verification fails | Clock skew | Sync NTP, allow 30s leeway |
| Rate limiter blocks health checks | Health check not whitelisted | Exclude `/health` from rate limiting |

---

**Version**: 1.0.0

# Proteção contra Denial of Service (STRIDE)

**ID**: SEGURANÇA-064
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Implementar rate limiting em APIs, timeouts em operações, limitação de tamanho de upload, proteção contra regex DoS e uso de WAF/CDN para mitigar ataques distribuídos de negação de serviço.

## Por que importa

DoS causa indisponibilidade de serviço, perda de receita e danos reputacionais. 50% das organizações sofreram ataque DDoS no último ano. Rate limiting e timeouts previnem resource exhaustion. WAF/CDN mitigam ataques volumétricos (layer 7 floods).

## Critérios Objetivos

- [ ] Rate limiting implementado em todos endpoints públicos (ex: 100 req/min por IP)
- [ ] Operações longas têm timeouts configurados (queries <10s, uploads <60s)
- [ ] Tamanho de upload limitado (ex: 10MB para imagens, 100MB para vídeos)
- [ ] Regex patterns validados contra ReDoS (regex DoS) com timeout
- [ ] WAF configurado com regras anti-DDoS ou uso de CDN com proteção DDoS

## Exceções Permitidas

- **Internal APIs**: APIs dentro de VPC privada podem ter rate limiting mais relaxado
- **Batch operations**: Operações de lote administrativas podem ter timeouts estendidos

## Como Detectar

### Manual

Revisar configuração de rate limiting em API gateway ou application middleware. Verificar timeouts em database queries e HTTP clients.

### Automático

Load testing tools verificam comportamento sob carga. Monitoring detecta spikes anormais de requests. Testes automatizados verificam rate limiting rejeitando requests excessivos.

## Relacionada com

- [033 - Limite de Parâmetros de Função](033_limite-parametros-funcao.md): relacionada
- [060 - Proteção Spoofing](060_protecao-spoofing.md): complementa (rate limiting em auth)

---

**Criada em**: 2025-12-16
**Versão**: 1.0

# Gerenciamento Seguro de Dependências

**ID**: SEGURANÇA-058
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Dependências de terceiros devem ser auditadas regularmente para vulnerabilidades conhecidas, atualizadas quando patches estão disponíveis, e gerenciadas com lock files para garantir builds reproduzíveis.

## Por que importa

80% do código moderno é de dependências de terceiros. Vulnerabilidades em dependências causam breaches massivos (Log4Shell, Heartbleed, Struts RCE). Manter dependências atualizadas e auditadas reduz risco de exploração de vulnerabilidades conhecidas. Automação de auditing permite detecção precoce.

## Critérios Objetivos

- [ ] npm audit, yarn audit ou equivalente executado em CI/CD e bloqueia build se vulnerabilidades críticas
- [ ] Dependências são atualizadas regularmente (pelo menos trimestralmente)
- [ ] Lock files (package-lock.json, yarn.lock) são commitados para garantir builds reproduzíveis
- [ ] Dependabot ou Renovate configurado para criar PRs automáticos de atualização de segurança
- [ ] Análise de composição de software (SCA) integrada em pipeline

## Exceções Permitidas

- **Vulnerabilidades não exploitáveis**: Pode aceitar temporariamente vulnerabilidade se função afetada não é usada no código
- **Dependências legadas críticas**: Pode manter versão antiga se atualização quebra funcionalidade crítica (com mitigação compensatória)

## Como Detectar

### Manual

Executar npm audit localmente e revisar relatório. Verificar idade de dependências com npm outdated.

### Automático

CI/CD executar npm audit e falhar build se vulnerabilidades críticas ou altas. Snyk, Dependabot ou WhiteSource scan automaticamente.

## Relacionada com

- [030 - Proibição de Funções Inseguras](030_proibicao-funcoes-inseguras.md): complementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

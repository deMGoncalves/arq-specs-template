# Aplicação do Princípio de Segregação de Interfaces (ISP)

**ID**: ESTRUTURAL-013
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

Exige que clientes não sejam forçados a depender de interfaces que não utilizam. Múltiplas interfaces específicas para clientes são preferíveis a uma única interface geral.

## Por que importa

Violações do ISP causam classes anêmicas (com métodos vazios ou lançando exceções) e aumentam o acoplamento desnecessário, pois clientes são forçados a depender de código que nunca será executado.

## Critérios Objetivos

- [ ] Interfaces devem ter, no máximo, **5** métodos públicos.
- [ ] Classes que implementam interfaces não devem deixar métodos vazios ou lançar exceções de "não suportado".
- [ ] Se uma interface é utilizada por mais de **3** clientes diferentes, ela deve ser revisada para segregação.

## Exceções Permitidas

- **Interfaces de Baixo Nível**: Interfaces de *Frameworks* de terceiros que exigem um alto número de métodos (ex: `HttpRequestHandler`).

## Como Detectar

### Manual
Busca por interfaces com 8 ou mais métodos, ou classes implementadoras que deixam métodos sem funcionalidade.

### Automático
SonarQube: Alta complexidade acoplada devido a métodos não utilizados.

## Relacionada com

- [COMPORTAMENTAL-010]: reforça (Classes pequenas tornam a segregação de interfaces mais fácil)
- [COMPORTAMENTAL-011]: complementa (Interfaces bem segregadas facilitam a extensão OCP)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

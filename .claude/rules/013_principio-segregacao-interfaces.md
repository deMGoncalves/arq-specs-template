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

- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): reforça
- [011 - Princípio Aberto/Fechado](011_principio-aberto-fechado.md): complementa
- [012 - Princípio de Substituição de Liskov](012_principio-substituicao-liskov.md): reforça
- [017 - Princípio do Reuso Comum](017_principio-reuso-comum.md): complementa
- [037 - Proibição de Argumentos Sinalizadores](037_proibicao-argumentos-sinalizadores.md): reforça

---

**Criada em**: 2025-10-04
**Versão**: 1.0
